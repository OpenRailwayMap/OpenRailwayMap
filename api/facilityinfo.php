<?php
	/*
	OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
	This program comes with ABSOLUTELY NO WARRANTY.
	This is free software, and you are welcome to redistribute it under certain conditions.
	See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.
	*/


	require_once("functions.php");

	$callback = $_GET['callback'];

	// search by ref
	if ($_GET['ref'])
	{
		if (isValidRef($_GET['ref']))
			$result = getFacilityPositionByRef(pg_escape_string($_GET['ref']), pg_escape_string($_GET['operator']));
		else
			die("Invalid format of ref.");
	}
	// search by full name
	else if ($_GET['name'])
	{
		if (isValidName($_GET['name']))
			$result = getFacilityPositionByName(pg_escape_string($_GET['name']), pg_escape_string($_GET['operator']));
		else
			die("Invalid format of name.");
	}

	if (!$result)
		echo "NULL";
	else
		return jsonOutput($result, $callback);
?>
