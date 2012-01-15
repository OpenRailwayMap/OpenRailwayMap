<?php
	/*
	OpenLinkMap Copyright (C) 2010 Alexander Matheisen
	This program comes with ABSOLUTELY NO WARRANTY.
	This is free software, and you are welcome to redistribute it under certain conditions.
	See http://wiki.openstreetmap.org/wiki/OpenLinkMap for details.
	*/


	require_once("functions.php");

	$bbox = $_GET['bbox'];


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
		header("Content-Type: text/html; charset=UTF-8");
		echo $list;
	}
	else
		echo "NULL";

	pg_close($connection);
?>
