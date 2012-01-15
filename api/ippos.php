<?php
	/*
	OpenLinkMap Copyright (C) 2010 Alexander Matheisen
	This program comes with ABSOLUTELY NO WARRANTY.
	This is free software, and you are welcome to redistribute it under certain conditions.
	See http://wiki.openstreetmap.org/wiki/OpenLinkMap for details.
	*/


	require_once("functions.php");

	$format = $_GET['format'];


	// request location for api
	$position = getPositionByIp($_SERVER['REMOTE_ADDR']);

	if ($position)
	{
		if ($format == "xml")
			echo xmlPositionOutput($position);
		else
			echo textPositionOutput($position);
	}

	else
		echo "NULL";


	// output of position in xml format, given: position in format lat,lon
	function xmlPositionOutput($position)
	{
		if ($position)
		{
			$output = xmlStart("geolocation");
			$output .= "<position source=\"http://www.hostip.info/\">";

			$latlon = explode(",", $position);
			$output .= "<lat>".$latlon[0]."</lat>";
			$output .= "<lon>".$latlon[1]."</lon>";

			$output .= "</position>";
			$output .= "</geolocation>";

			return $output;
		}

		else
			return false;
	}


	// output of position in plain text format, given: position in format lat,lon
	function textPositionOutput($position)
	{
		if ($position)
		{
			header("Content-Type: text/plain; charset=UTF-8");
			$output =  $position;

			return $output;
		}

		else
			return false;
	}
?>
