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

	Improvements: support for hstore tags, removed support for single-tag-columns, changed table/database names, improved style parsing, changed paths, removed dependencies
	*/


	$tiledir = "/home/www/sites/194.245.35.149/site/orm/tiles/";
	$geomcolumn = "way";
	$database = "railmap";
	$maxzoom = 19;
	$stylesheets = array("../styles/style.mapcss");
	$tables = array("polygon"=>"railmap_polygon", "line"=>"railmap_line","point"=>"railmap_point");
	$intscalefactor = 10000;

	$z = (int)$_GET['z'];
	$x = (int)$_GET['x'];
	$y = (int)$_GET['y'];



	// checks if given zoom-parameter is valid
	function isValidZoom($value)
	{
		global $maxzoom;

		if (!$value)
			return false;
		if (!is_int($value))
			return false;
		if ($value > $maxzoom)
			return false;

		return true;
	}


	// checks if given x/y-parameter is valid
	function isValidXY($value)
	{
		if (!$value)
			return false;
		if (!is_int($value))
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


	// parses a MapCSS v0.2 file and creates sql tag conditions
	// TODO: support for case sensitive matching missing
	function parseMapCSSFile($filename)
	{
		global $maxzoom;

		// read file
		$content = file_get_contents($filename); 
		// remove whitespace and newlines
		$content = trim(preg_replace("/\n+/", "", $content));
		// remove the CSS style 
		$content = trim(preg_replace("/\{[^{]+\}/", "|||", $content));
		// split single selectors and store them in an array
		$selectors = explode("|||", $content);

		// in first step split grouped selectors and remove whitespaces
		for ($i=0; $i<count($selectors); $i++)
		{
			$selectors[$i] = trim($selectors[$i]);
			$split = explode(',', $selectors[$i]);
			if (count($split) > 0)
			{
				$selectors[$i] = trim($split[0]);
				for ($i=1; $i<count($split); $i++)
					array_push($selectors, trim($split[1]));
			}
		}

		// then build a list of tags used in each zoom level
		foreach ($selectors as $selector)
		{
			$sql = "";
			// remove link selectors >[...]
			$temp = trim(preg_replace("/>\[.+\]/", "", $selector));
			// parse selectors: [...]
			preg_match("/\[([^[]+)\]/", $temp, $conditions);

			for ($i=1; $i<count($conditions); $i++)
			{
				$tmp = substr($conditions[$i], 1, -1);
				// conditions with just a key or value
				if ((strpos($tmp, "=") === false) && (strpos($tmp, "<") === false) && (strpos($tmp, ">") === false))
				{
					// a key not exists
					if (strpos($tmp, '!') == 0)
					{
						if ((strpos($tmp, '"') == 1) || (strpos($tmp, "'") == 1))
							$sql .= "AND (NOT (tags ? '".substr($tmp, 2, -1)."')) ";
						else
							$sql .= "AND (NOT (tags ? '".substr($tmp, 1)."')) ";
					}
					// a truth value for tag
					else if (strpos($tmp, '?') == (strlen($tmp)-1))
					{
						if ((strpos($tmp, '"') == 0) || (strpos($tmp, "'") == 0))
							$sql .= "OR (tags->'".substr($tmp, 1, -2)."'='yes') OR (tags->'".substr($tmp, 1, -2)."'='true') OR (tags->'".substr($tmp, 1, -2)."'='1') ";
						else
							$sql .= "OR (tags->'".substr($tmp, 0, -1)."'='yes') OR (tags->'".substr($tmp, 0, -1)."'='true') OR (tags->'".substr($tmp, 0, -1)."'='1') ";
					}
					// a key exists
					else
					{
						if ((strpos($tmp, '"') == 0) || (strpos($tmp, "'") == 0))
							$sql .= "OR (tags ? '".substr($tmp, 1, -1)."') ";
						else
							$sql .= "OR (tags ? '".$tmp."') ";
					}
				}
				// other conditions containing key/value-pairs, comparisions, regexes
				else
				{
					// not-equal operator
					if (strpos($tmp, '!=') !== false)
					{
						$kv = extractKeyValueFromCondition("!=", $tmp);
						$sql .= "AND (NOT (tags->'".$kv[0]."'='".$kv[1]."')) ";
					}
					// value-contains-substring operator
					else if (strpos($tmp, '*=') !== false)
					{
						$kv = extractKeyValueFromCondition("*=", $tmp);
						$sql .= "AND (tags->'".$kv[0]."' LIKE '%".$kv[1]."%') ";
					}
					// value-starts-with operator
					else if (strpos($tmp, '^=') !== false)
					{
						$kv = extractKeyValueFromCondition("^=", $tmp);
						$sql .= "AND (tags->'".$kv[0]."' LIKE '%".$kv[1]."') ";
					}
					// value-ends-with operator
					else if (strpos($tmp, '$=') !== false)
					{
						$kv = extractKeyValueFromCondition("$=", $tmp);
						$sql .= "AND (tags->'".$kv[0]."' LIKE '".$kv[1]."%') ";
					}
					// ;-separated-values-contain operator
					else if (strpos($tmp, '~=') !== false)
					{
						$kv = extractKeyValueFromCondition("~=", $tmp);
						$sql .= "AND ((tags->'".$kv[0]."' = '".$kv[1]."') OR (tags->'".$kv[0]."' LIKE '%".$kv[1].";%') OR (tags->'".$kv[0]."' LIKE '%;".$kv[1]."') ";
					}
					// greater-equal-than operator
					else if (strpos($tmp, '>=') !== false)
					{
						$kv = extractKeyValueFromCondition(">=", $tmp);
						$sql .= "AND (CAST(tags->'".$kv[0]."' AS FLOAT) >= '".$kv[1]."') ";
					}
					// smaller-equal-than operator
					else if (strpos($tmp, '<=') !== false)
					{
						$kv = extractKeyValueFromCondition("<=", $tmp);
						$sql .= "AND (CAST(tags->'".$kv[0]."' AS FLOAT) <= '".$kv[1]."') ";
					}
					// greater-than operator
					else if (strpos($tmp, '>') !== false)
					{
						$kv = extractKeyValueFromCondition(">", $tmp);
						$sql .= "AND (CAST(tags->'".$kv[0]."' AS FLOAT) > '".$kv[1]."') ";
					}
					// smaller-than operator
					else if (strpos($tmp, '<') !== false)
					{
						$kv = extractKeyValueFromCondition("<", $tmp);
						$sql .= "AND (CAST(tags->'".$kv[0]."' AS FLOAT) < '".$kv[1]."') ";
					}
					// regex operator
					else if (strpos($tmp, '=~') !== false)
					{
						$kv = extractKeyValueFromCondition("=~", $tmp);
						$sql .= "AND (tags->'".$kv[0]."' ~ '".substr($kv[1], 1, -1)."') ";
					}
					// equal operator
					else if (strpos($tmp, '=') !== false)
					{
						$kv = extractKeyValueFromCondition("=", $tmp);
						$sql .= "AND (tags->'".$kv[0]."' = '".$kv[1]."') ";
					}
				}
			}

			// parse zoom levels and set the tag condition for this zoomlevel
			$tagconditions = array();
			preg_match("/\|([^[]+)\[/", $temp, $zoomlevels);
			if (count($zoomlevels) > 1)
			{
				$tmp = substr($zoomlevels[1], 1, -1);
				// only one zoom level: way|z13 {...}
				if (strpos($tmp, "-") === false)
				{
					$z = substr($tmp, 1);
					$tagconditions[$z] .= $sql;
				}
				// more than one zoomlevel
				else
				{
					$tmp = explode("-", $tmp);
					// format way|z-12 {...}
					if (strlen($tmp[0]) == 1)
						for ($j=0; $j<$tmp[1]+1; $j++)
							$tagconditions[$j] .= $sql;
					// format way|z16- {...} or way|z13-15 {...}
					else
					{
						// format way|z13-15 {...}
						if (strlen($tmp[1]) > 0)
							for ($j=substr($tmp[0], 1); $j<$tmp[1]+1; $j++)
								$tagconditions[$j] .= $sql;
						// format way|z16- {...}
						else
							for ($j=substr($tmp[0], 1); $j<$maxzoom+1; $j++)
								$tagconditions[$j] .= $sql;
					}
				}
			}
			// every zoomlevel
			else
				for ($j=0; $j<$maxzoom+1; $j++)
					$tagconditions[$j] .= $sql;
		}

		return $tagconditions;
	}


	// splits the condition at it's separator, removes quotes if necessary and returns key/value
	function extractKeyValueFromCondition($separator, $condition)
	{
		$tmp = explode($separator, $condition);
		if ((strpos($tmp[0], '"') == 0) || (strpos($tmp[0], "'") == 0))
			$kv[0] = substr($tmp[0], 1, -1);
		else
			$kv[0] = $tmp[0];
		if ((strpos($tmp[1], '"') == 0) || (strpos($tmp[1], "'") == 0))
			$kv[1] = substr($tmp[1], 1, -1);
		else
			$kv[1] = $tmp[1];
		return $kv;
	}


	// requests objects for a certain zoom level and bounding box with a given style and returns the data in JSON format
	function getVectors($bbox, $zoom, $style, $vec)
	{
		global $geomcolumn, $database, $tables, $intscalefactor;

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
												WHERE way && SetSRID('BOX3D(".$bbox_p[0]." ".$bbox_p[1].",".$bbox_p[2]." ".$bbox_p[3].")'::box3d, 900913) AND way_area > ".pow(pixelSizeAtZoom($zoom, $pxtolerance), 2)/$pxtolerance." ".$style[$zoom]."
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
										WHERE way && SetSRID('BOX3D(".$bbox_p[0]." ".$bbox_p[1].",".$bbox_p[2]." ".$bbox_p[3].")'::box3d, 900913) ".$style[$zoom]."
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
				        way && SetSRID('BOX3D(".$bbox_p[0]." ".$bbox_p[1].",".$bbox_p[2]." ".$bbox_p[3].")'::box3d, 900913) ".$style[$zoom]."
						LIMIT 10000";
		}

		$response = request($query, $connection);
		if ($response)
		{
			$polygons = array();
			foreach ($response as $row)
			{
				$geojson = json_decode($row[$geomcolumn], true);
				if ($geom["reprpoint"] != "")
					$geojson["reprpoint"] = json_decode($row["reprpoint"]["coordinates"], true);
				$geojson["properties"] = json_decode($row["tags"], true);
				array_push($polygons, $geojson);
			}
		}
		pg_close($connection);
		return $polygons;
	}



	if (!isValidZoom($z))
		die("Param z invalid or missing.");
	if (!isValidXY($x))
		die("Param x invalid or missing.");
	if (!isValidXY($y))
		die("Param y invalid or missing.");

	$bbox = bboxByTile($z+1, $x, $y);
	// TODO: check parsing and remove comments
	//foreach ($stylesheets as $stylesheet)
		//$style .= parseMapCSSFile($stylesheet);
	$zoom = $z+2;

	$content["features"] = getVectors($bbox, $zoom, $style, "polygon");
	array_push($content["features"], getVectors($bbox, $zoom, $style, "line"));
	array_push($content["features"], getVectors($bbox, $zoom, $style, "point"));
	$content["granularity"] = $intscalefactor;
	$content["bbox"] = $bbox;

	header("Content-Type: text/html; charset=UTF-8");
	$output = "onKothicDataResponse(".json_encode($content).",".$z.",".$x.",".$y.")";
	echo $output;

	if (!file_exists($tiledir.$z."/".$x))
		mkdir($tiledir.$z."/".$x, 0755, true);

	$file = fopen($tiledir.$z."/".$x."/".$y.".js", "w");
	fwrite($file, $output);
	fclose($file);
?>
