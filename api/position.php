<?php
	/*
	OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
	This program comes with ABSOLUTELY NO WARRANTY.
	This is free software, and you are welcome to redistribute it under certain conditions.
	See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.
	*/


	require_once("functions.php");

	$query = urldecode($_GET['q']);
	$callback = $_GET['callback'];


	// search for short names
	if ($_GET['ref'])
	{
		if (isValidRef($_GET['ref']))
			$result = getFacilityPositionByRef(pg_escape_string($_GET['ref']), pg_escape_string($_GET['operator']));
		else
			die("Invalid format of ref.");
	}
	// search for full names
	else if ($_GET['name'])
	{
		if (isValidName($_GET['name']))
			$result = getFacilityPositionByName(pg_escape_string($_GET['name']), pg_escape_string($_GET['operator']));
		else
			die("Invalid format of name.");
	}
	// search for milestones
	else if ($_GET['line'] && $_GET['position'])
	{
		if (isValidLine($_GET['line']) && isValidPosition($_GET['position']))
			$result = getMilestonePosition(pg_escape_string($_GET['line']), pg_escape_string($_GET['position']), pg_escape_string($_GET['operator']));
		else
			die("Invalid format of line or position.");
	}

	if (!$result)
		echo "NULL";
	else
		return jsonOutput($result, $callback);
?>
