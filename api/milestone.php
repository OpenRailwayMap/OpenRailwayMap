<?php
	/*
	OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
	This program comes with ABSOLUTELY NO WARRANTY.
	This is free software, and you are welcome to redistribute it under certain conditions.
	See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.
	*/


	require_once("functions.php");

	$callback = $_GET['callback'];
	if (!isValidLine($_GET['line']))
		die("Invalid format of line ref.");
	if (!isValidPosition($_GET['position']))
		die("Invalid format of milestone position.");

	$result = getMilestonePosition(pg_escape_string($_GET['line']), pg_escape_string($_GET['position']), pg_escape_string($_GET['operator']));
	if (!$result)
		echo "NULL";
	else
		jsonOutput($result, $callback);
?>
