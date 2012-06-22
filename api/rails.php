<?php
	/*
	OpenRailwayMap Copyright (C) 2010 Alexander Matheisen
	This program comes with ABSOLUTELY NO WARRANTY.
	This is free software, and you are welcome to redistribute it under certain conditions.
	See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.
	*/


	require_once("functions.php");

	$bbox = $_GET['bbox'];
	$callback = $_GET['callback'];
	$format = $_GET['format'];


	// correct bbox
	$coordinates = getBbox($bbox);
	if (!$coordinates)
		exit;

	$connection = connectToDatabase($db);
	if (!$connection)
		exit;

	$request = "SELECT ST_X(ST_Transform(way, 4326)), ST_Y(ST_Transform(way, 4326)), tags->'railway:position' AS caption
	FROM ".$db."_point
	WHERE way && ST_SetSRID(ST_MakeBox2D(ST_Transform(ST_SetSRID(ST_Point(".$coordinates[0].",".$coordinates[1]."), 4326), 900913), ST_Transform(ST_SetSRID(ST_Point(".$coordinates[2].",".$coordinates[3]."),4326), 900913)), 900913) AND tags->'railway' = 'milestone';";
	$list = getNodesForBbox($connection, $request);

	if ($list)
	{
		header("Content-Type: text/plain; charset=UTF-8");
		if ($format == "json")
		{
			$data = array();
			foreach ($list as $line)
				array_push($data, $line);
			$jsonData = json_encode($data);
			// JSONP request?
			if (isset($callback))
				echo $callback.'('.$jsonData.')';
			else
				echo $jsonData;
		}
		else
			foreach ($list as $line)
				echo $line[0]."|".$line[1]."|".str_replace(".", ",", $line[2])."\n";
	}
	else
		echo "NULL";

	pg_close($connection);
?>