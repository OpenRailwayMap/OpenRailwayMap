<?php
	/*
	OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
	This program comes with ABSOLUTELY NO WARRANTY.
	This is free software, and you are welcome to redistribute it under certain conditions.
	See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.
	*/


	require_once("functions.php");

	if (!isValidLine($_GET['line']))
		die("Invalid format of line ref.");
	if (!isValidPosition($_GET['position']))
		die("Invalid format of milestone position.");

	$result = getMilestonePosition($_GET['line'], $_GET['position']);
	if (!$result)
		echo "NULL";
	else
	{
		header("Content-Type: text/html; charset=UTF-8");
		echo "<meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\">";
		echo $result['0']." ".$result['1'];
	}
?>
