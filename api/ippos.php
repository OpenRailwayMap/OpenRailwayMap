<?php
	/*
	OpenLinkMap Copyright (C) 2010 Alexander Matheisen
	This program comes with ABSOLUTELY NO WARRANTY.
	This is free software, and you are welcome to redistribute it under certain conditions.
	See http://wiki.openstreetmap.org/wiki/OpenLinkMap for details.
	*/


	require_once("functions.php");

	$format = $_GET['format'];
	$callback = $_GET['callback'];

	// request location for api
	$position = geoip_record_by_name($_SERVER['REMOTE_ADDR']);

	if ($position)
	{
		if ($format == "xml")
			echo xmlPositionOutput($position);
		else if ($format == "json")
			echo jsonPositionOutput($position, $callback);
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
			$output .= "<position source=\"GeoIP-Database\">";

			$output .= "<lat>".$position['latitude']."</lat>";
			$output .= "<lon>".$position['longitude']."</lon>";

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
			return $position['latitude'].",".$position['longitude'];
		}
		else
			return false;
	}


	// output of position in JSON format, given: position in format lat,lon, JSONP callback function name
	function jsonPositionOutput($position, $callback)
	{
		if ($position)
		{
			$jsonData = json_encode(
				array(
					'lat' => $position['latitude'],
					'lon' => $position['longitude'],
					'source' => 'GeoIP-Database'
				)
			);
			// JSONP request?
			if (isset($callback))
				return $callback.'('.$jsonData.')';
			else
				return $jsonData;
		}
		return false;
	}
?>