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

	$data = array();

	// search for short names
	if (isValidRef($query))
	{
		$result = getFacilityPositionByRef(pg_escape_string($query));
		if ($result)
			array_push($data, $result);
	}

	// search for full names
	if (isValidName($query))
	{
		$result = getFacilityPositionByName(pg_escape_string($query));
		if ($result)
			array_push($data, $result);
	}

	// search for milestones
	$milestonequery = explode(" ", $query);
	if (isValidLine($milestonequery[0]) && isValidPosition($milestonequery[1]))
	{
		$result = getMilestonePosition(pg_escape_string($milestonequery[0]), pg_escape_string($milestonequery[1]));
		if ($result)
			array_push($data, $result);
	}
	if (isValidLine($milestonequery[1]) && isValidPosition($milestonequery[0]))
	{
		$result = getMilestonePosition(pg_escape_string($milestonequery[1]), pg_escape_string($milestonequery[0]));
		if ($result)
			array_push($data, $result);
	}

	jsonOutput($data, $callback);
?>
