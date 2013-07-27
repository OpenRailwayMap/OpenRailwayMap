<?php
	/*
	OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
	This program comes with ABSOLUTELY NO WARRANTY.
	This is free software, and you are welcome to redistribute it under certain conditions.
	See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.


	PHP-rewritten and modified version of Kothic's json_getter.py

	Contains some PHP-rewritten and modified code from 
	* twms, available under Do What The Fuck You Want To Public License: https://code.google.com/p/twms/
	* Kothic, available under GNU GPL v3: https://code.google.com/p/kothic/

	Improvements: support for hstore tags, removed support for single-tag-columns, changed table/database names, changed paths, removed dependencies
	*/


	$tiledir = "/home/www/sites/194.245.35.149/site/orm/tiles/";
	$geomcolumn = "way";
	$database = "railmap";
	$maxzoom = 21;
	$minzoom = 8;
	$tables = array("polygon"=>"railmap_polygon", "line"=>"railmap_line","point"=>"railmap_point");
	$intscalefactor = 10000;

	$z = (int)($_GET['z'].$_SERVER['argv'][1]);
	$x = (int)($_GET['x'].$_SERVER['argv'][2]);
	$y = (int)($_GET['y'].$_SERVER['argv'][3]);

	// include compiled tag-conditions-file
	require_once("condition.php");


	// checks if given zoom-parameter is valid
	function isValidZoom($value, $noMinzoom = false)
	{
		global $maxzoom;
		global $minzoom;

		if (!$value)
			return false;
		if (!is_int($value))
			return false;
		if ($value > $maxzoom)
			return false;
		if (($value < $minzoom) && ($noMinzoom == false))
			return false;

		return true;
	}


	// checks if given x/y-parameter is valid
	function isValidXY($value)
	{
		if (!$value && $value !== 0)
			return false;
		if (!is_int($value) && $value !== 0)
			return false;

		return true;
	}


	// Converts l pixels on tiles into length on zoom z
	function pixelSizeAtZoom($z, $l=1)
	{
		return $l * 20037508.342789244 / 256 * 2 / pow(2, $z);
	}


	// Wrapper around transform call for convenience. Transforms line from EPSG:4326 to EPSG:900913
	// line - a list of [lat0,lon0,lat1,lon1,...] or [(lat0,lon0),(lat1,lon1),...]
	function from4326To900913($line)
	{
		$serial = false;
		if (!is_array($line[0]))
		{
			$serial = true;
			$l1 = array();
			for ($i=0; $i<count($line); $i=$i+2)
				array_push($l1, array($line[$i], $line[$i+1]));
			$line = $l1;
		}
		$ans = array();
		foreach ($line as $point)
		{
			$latRad = deg2rad($point[1]);
		  	$xtile = $point[0] * 111319.49079327358;
		  	$ytile = log(tan($latRad) + (1 / cos($latRad))) / pi() * 20037508.342789244;
			if ($serial)
			{
				array_push($ans, $xtile);
				array_push($ans, $ytile);
			}
			else
				array_push($ans, array($xtile, $ytile));
		}
		return $ans;
	}


	// Wrapper around transform call for convenience. Transforms line from EPSG:900913 to EPSG:4326
	// line - a list of [lat0,lon0,lat1,lon1,...] or [(lat0,lon0),(lat1,lon1),...]
	function from900913To4326($line)
	{
		$serial = false;
		if (!is_array($line[0]))
		{
			$serial = true;
			$l1 = array();
			for ($i=0; $i<count($line); $i=$i+2)
				array_push($l1, array($line[$i], $line[$i+1]));
			$line = $l1;
		}
		$ans = array();
		foreach ($line as $point)
		{
			$xtile = $point[0] / 111319.49079327358;
			$ytile = rad2deg(asin(tanh($point[1]/20037508.342789244*pi())));
			if ($serial)
			{
				array_push($ans, $xtile);
				array_push($ans, $ytile);
			}
			else
				array_push($ans, array($xtile, $ytile));
		}
		return $ans;
	}


	// Tile numbers of given zoom level to EPSG:4326 bbox of a tile
	function bboxByTile($z, $x, $y)
	{
		$a = coordsByTile($z, $x, $y);
		$b = coordsByTile($z, $x+1, $y+1);
		return array($a[0], $b[1], $b[0], $a[1]);
	}


	// Converts (z,x,y) to coordinates of corner of a tile
	function coordsByTile($z, $x, $y)
	{
		$z = $z-1;
		$normalizedTile = array($x/pow(2.0, $z), 1.0-($y/pow(2.0, $z)));
		$projectedBounds = from4326To900913(array(-180.0, -85.0511287798, 180.0, 85.0511287798));
		$maxp = array($projectedBounds[2]-$projectedBounds[0], $projectedBounds[3]-$projectedBounds[1]);
		$projectedCoords = array(($normalizedTile[0]*$maxp[0])+$projectedBounds[0], ($normalizedTile[1]*$maxp[1])+$projectedBounds[1]);
		return from900913To4326($projectedCoords);
	}


	// connects do database
	function connectToDatabase($dbname)
	{
		if (!isset($dbname))
		{
			die("Database name was not given.");
			return false;
		}

		$connection = pg_pconnect("dbname=".$dbname);
		// if connection could not be set up
		if (!$connection)
		{
			die("Could not connect to database.");
			return false;
		}

		return $connection;
	}


	// performs a database request by a given query string
	function request($request, $connection)
	{
		return pg_fetch_all(pg_query($connection, $request));
	}


	// requests objects for a certain zoom level and bounding box and returns the data in JSON format
	function getVectors($bbox, $zoom, $vec)
	{
		global $geomcolumn, $database, $tables, $intscalefactor, $condition;

		$pxtolerance = 1.8;
		$bbox_p = from4326To900913($bbox);

		$connection = connectToDatabase($database);

		if ($vec == "polygon")
		{
			$query = "
						SELECT
							ST_AsGeoJSON(ST_TransScale(ST_ForceRHR(ST_Intersection(way, SetSRID('BOX3D(".$bbox_p[0]." ".$bbox_p[1].",".$bbox_p[2]." ".$bbox_p[3].")'::box3d, 900913))), ".-$bbox_p[0].", ".-$bbox_p[1].", ".$intscalefactor/($bbox_p[2]-$bbox_p[0]).", ".$intscalefactor/($bbox_p[3]-$bbox_p[1])."), 0) AS ".$geomcolumn.",
							hstore2json(CAST(hstore(tags) AS hstore)) AS tags,
							ST_AsGeoJSON(ST_TransScale(ST_ForceRHR(ST_PointOnSurface(way)), ".-$bbox_p[0].", ".-$bbox_p[1].", ".$intscalefactor/($bbox_p[2]-$bbox_p[0]).", ".$intscalefactor/($bbox_p[3]-$bbox_p[1])."), 0) AS reprpoint
						FROM
							(
								SELECT (ST_Dump(ST_Multi(ST_SimplifyPreserveTopology(ST_Buffer(way ,-".pixelSizeAtZoom($zoom, $pxtolerance)."), ".pixelSizeAtZoom($zoom, $pxtolerance).")))).geom AS ".$geomcolumn.", tags
								FROM
									(
										SELECT ST_Union(way) AS ".$geomcolumn.", tags
										FROM
											(
												SELECT ST_Buffer(way, ".pixelSizeAtZoom($zoom, $pxtolerance).") AS ".$geomcolumn.", CAST(tags AS text) AS tags
												FROM ".$tables[$vec]."
												WHERE way && SetSRID('BOX3D(".$bbox_p[0]." ".$bbox_p[1].",".$bbox_p[2]." ".$bbox_p[3].")'::box3d, 900913) AND way_area > ".pow(pixelSizeAtZoom($zoom, $pxtolerance), 2)/$pxtolerance." ".$condition[$zoom]."
											) p
										GROUP BY CAST(tags AS text)
									) p
								WHERE ST_Area(way) > ".pow(pixelSizeAtZoom($zoom, $pxtolerance), 2)."
								ORDER BY ST_Area(way)
							) p";	  
		}
		else if ($vec == "line")
		{
			$query = "
						SELECT
							ST_AsGeoJSON(ST_TransScale(ST_Intersection(way, SetSRID('BOX3D(".$bbox_p[0]." ".$bbox_p[1].",".$bbox_p[2]." ".$bbox_p[3].")'::box3d, 900913)), ".-$bbox_p[0].", ".-$bbox_p[1].", ".($intscalefactor/($bbox_p[2]-$bbox_p[0])).", ".($intscalefactor/($bbox_p[3]-$bbox_p[1]))."), 0) AS ".$geomcolumn.", hstore2json(CAST(hstore(tags) AS hstore)) as tags
						FROM
							(
								SELECT (ST_Dump(ST_Multi(ST_SimplifyPreserveTopology(ST_LineMerge(way), ".pixelSizeAtZoom($zoom, $pxtolerance).")))).geom AS ".$geomcolumn.", tags
								FROM
									(
										SELECT ST_Union(way) AS ".$geomcolumn.", CAST(tags AS text)
										FROM ".$tables[$vec]."
										WHERE way && SetSRID('BOX3D(".$bbox_p[0]." ".$bbox_p[1].",".$bbox_p[2]." ".$bbox_p[3].")'::box3d, 900913) ".$condition[$zoom]."
										GROUP BY CAST(tags AS text)
									) p
							) p";
		}
		else if ($vec == "point")
		{
			$query = "
						SELECT ST_AsGeoJSON(ST_TransScale(way, ".-$bbox_p[0].", ".-$bbox_p[1].", ".($intscalefactor/($bbox_p[2]-$bbox_p[0])).", ".($intscalefactor/($bbox_p[3]-$bbox_p[1]))."), 0) AS ".$geomcolumn.", hstore2json(tags) AS tags
						FROM ".$tables[$vec]."
						WHERE
				        way && SetSRID('BOX3D(".$bbox_p[0]." ".$bbox_p[1].",".$bbox_p[2]." ".$bbox_p[3].")'::box3d, 900913) ".$condition[$zoom]."
						LIMIT 10000";
		}

		$response = request($query, $connection);
		if ($response)
		{
			$polygons = array();
			foreach ($response as $row)
			{
				$geojson = json_decode($row[$geomcolumn], true);
				if ($geojson["type"] == "GeometryCollection")
					continue;
				if ($geom["reprpoint"] != "")
					$geojson["reprpoint"] = json_decode($row["reprpoint"]["coordinates"], true);
				$geojson["properties"] = json_decode($row["tags"], true);
				array_push($polygons, $geojson);
			}
		}
		pg_close($connection);
		return $polygons;
	}


	// override minzoom if script is called on command line
	if ($_SERVER['argv'][0] != "")
		$overrideMinzoom = true;
	else
		$overrideMinzoom = false;

	if (!isValidZoom($z, $overrideMinzoom))
		die("Param z invalid or missing.");
	if (!isValidXY($x))
		die("Param x invalid or missing.");
	if (!isValidXY($y))
		die("Param y invalid or missing.");

	$bbox = bboxByTile($z+1, $x, $y);

	$zoom = $z+2;
	$content["features"] = array();
	$content["features"] = array_merge($content["features"], (array)getVectors($bbox, $zoom, "polygon"));
	$content["features"] = array_merge($content["features"], (array)getVectors($bbox, $zoom, "line"));
	$content["features"] = array_merge($content["features"], (array)getVectors($bbox, $zoom, "point"));
	$content["granularity"] = $intscalefactor;
	$content["bbox"] = $bbox;

	header("Content-Type: application/javascript; charset=UTF-8");
	$output = "onKothicDataResponse(".json_encode($content).",".$z.",".$x.",".$y.");";
	echo $output;

	if (!file_exists($tiledir.$z."/".$x))
		mkdir($tiledir.$z."/".$x, 0777, true);

	$file = fopen($tiledir.$z."/".$x."/".$y.".js", "w");
	fwrite($file, $output);
	fclose($file);
?>
