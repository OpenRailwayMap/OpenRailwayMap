<?php
	/*
	OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
	This program comes with ABSOLUTELY NO WARRANTY.
	This is free software, and you are welcome to redistribute it under certain conditions.
	See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.
	*/


	require_once("functions.php");

	$callback = $_GET['callback'];
	if (!isValidRef($_GET['ref']))
		die("Invalid format of ref.");

	$result = getFullName(pg_escape_string($_GET['ref']));
	if (!$result)
		echo "NULL";
	else
		jsonOutput($result, $callback);
?>
