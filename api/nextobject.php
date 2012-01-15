<?php
	/*
	OpenLinkMap Copyright (C) 2010 Alexander Matheisen
	This program comes with ABSOLUTELY NO WARRANTY.
	This is free software, and you are welcome to redistribute it under certain conditions.
	See http://wiki.openstreetmap.org/wiki/OpenLinkMap for details.
	*/


	require_once("functions.php");
	// including translation file
	require_once("../".includeLocale($_GET['lang']));

	$format = $_GET['format'];
	$id = $_GET['id'];
	$type = $_GET['type'];
	$lat = $_GET['lat'];
	$lon = $_GET['lon'];

	date_default_timezone_set('UTC');

	// request latlon if not given
	if (!$lat || !$lon)
	{
		$latlon = getLatLon($id, $type);
		$lat = $latlon[0];
		$lon = $latlon[1];
	}

	// get the most important langs of the user
	$langs = getLangs();
	if ($_GET['lang'])
		$langs[0] = $_GET['lang'];

	// connnecting to database
	$connection = connectToDatabase("nextobjects");
	// if there is no connection
	if (!$connection)
		exit;

	$next['busstops'] = getNearObjectsForId($connection, $lat, $lon,
							array(
								array("highway", "bus_stop"),
								array("highway", "bus_station")
							)
						);
	$next['stations'] = getNearObjectsForId($connection, $lat, $lon,
							array(
								array("railway", "station"),
								array("railway", "halt")
							)
						);
	$next['tramhalts'] = getNearObjectsForId($connection, $lat, $lon,
							array(
								array("railway", "tram_stop")
							)
						);
	$next['parkings'] = getNearObjectsForId($connection, $lat, $lon,
							array(
								array("amenity", "parking")
							)
						);

	pg_close($connection);

	if ($next)
	{
		if ($format == "xml")
		{
			echo xmlStart("nextobjects");
			foreach ($next as $type => $data)
				echo xmlNextobjectOut($data, $type, $lat, $lon);
			echo "</nextobjects>\n";
		}
		else
		{
			// setting header
			header("Content-Type: text/html; charset=UTF-8");
			echo "<meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\">";

			echo "<div class=\"moreInfoBox\">\n";
			echo "<strong>".$translations['captions']['publictransport']."</strong>\n";
			echo "<table>\n";

			foreach ($next as $type => $data)
				echo textNextobjectOut($data, $type, $lat, $lon);

			echo "</table>\n";
			echo "</div>\n";
		}
	}
	else
		echo "NULL";


	function textNextobjectOut($near, $caption, $lat, $lon)
	{
		global $translations;

		if ($near)
		{
			$singular = substr($caption, 0, -1);
			$output .= "<tr><td><span><u>".$translations['captions'][$caption].":</u></span></td></tr>\n";
			foreach ($near as $entry)
			{
				if (!$entry[2])
					$entry[2] = $translations['captions'][$singular];
				$entry[3] = formatDistance($entry[3]);
				$output .= "<tr><td>&nbsp;&nbsp;<span><a href=\"javascript:showPoint(".$entry[1].", ".$entry[0].", ".$lat.", ".$lon.");\">".$entry[2]."</a> (".$entry[3].")</span></td></tr>\n";
			}
		}

		return $output;
	}


	function xmlNextobjectOut($near, $caption, $lat, $lon)
	{
		if ($near)
		{
			$singular = substr($caption, 0, -1);

			$output .= "<".$caption.">\n";

			foreach ($near as $entry)
			{
				$output .= "<".$singular.">\n";
				$output .= "<id>".$entry[4]."</id>\n";
				$output .= "<lat>".$entry[1]."</lat>\n";
				$output .= "<lon>".$entry[0]."</lon>\n";
				if (!$entry[2])
					$entry[2] = "null";
				$output .= "<name>".$entry[2]."</name>\n";
				$output .= "<distance unit=\"meter\">".$entry[3]."</distance>\n";
				$output .= "</".$singular.">\n";
			}

			$output .= "</".$caption.">\n";
		}

		return $output;
	}
?>
