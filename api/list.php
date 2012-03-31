<?php
	/*
	OpenLinkMap Copyright (C) 2010 Alexander Matheisen
	This program comes with ABSOLUTELY NO WARRANTY.
	This is free software, and you are welcome to redistribute it under certain conditions.
	See http://wiki.openstreetmap.org/wiki/OpenLinkMap for details.
	*/


	require_once("functions.php");

	$bbox = $_GET['bbox'];
	$callback = $_GET['callback'];
	$format = $_GET['format'];


	// correct bbox
	$coordinates = getBbox($bbox);
	if (!$coordinates)
		exit;

	$connection = connectToDatabase("olm");
	if (!$connection)
		exit;

	$list = getObjectsForBbox($connection, $coordinates);

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
				echo $line[0]."|".$line[1]."|".$line[2]."|".$line[3]."\n";
	}
	else
		echo "NULL";

	pg_close($connection);
?>
