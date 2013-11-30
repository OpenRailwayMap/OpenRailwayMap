<?php
	/*
	OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
	This program comes with ABSOLUTELY NO WARRANTY.
	This is free software, and you are welcome to redistribute it under certain conditions.
	See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.
	*/


	// path to the timestamp file containing
	$timestampFile = "../../olm/import/timestamp";
	// email address to send error reports to
	$mail = "info@openrailwaymap.org";
	// available translations
	$langs = array(
		"cs" => array("cs_CZ", "Česky"),
		"de" => array("de_DE", "Deutsch"),
		"el" => array("el_GR", "Ελληνικά"),
		"en" => array("en_GB", "English"),
		"nqo" => array("nqo_GN", "ߒߞߏ"),
		"sl" => array("sl_SI", "Slovenščina"),
		"vi" => array("vi_VN", "Tiếng Việt")
	);
	// name of database
	$db = "railmap";
	// prefix of osm2pgsql tables
	$prefix = "railmap";
	// name of application
	$appname = "OpenRailwayMap";
	// useragent used for curl requests
	$useragent = "openrailwaymap.org";
	// path to tiles directory
	$tiledir = "/home/www/sites/194.245.35.149/site/orm/tiles/";
	// name of geometry column
	$geomcolumn = "way";
	// highest rendered zoomlevel+2
	$maxzoom = 21;
	// lowest rendered zoomlevel+2
	$minzoom = 8;
	// scale fector used for vector tiling
	$intscalefactor = 10000;
?>
