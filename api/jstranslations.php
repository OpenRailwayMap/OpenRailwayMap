<?php
	/*
	OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
	This program comes with ABSOLUTELY NO WARRANTY.
	This is free software, and you are welcome to redistribute it under certain conditions.
	See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.
	*/


	require_once("functions.php");
	// include translation file
	includeLocale($_GET['lang']);

	echo "translations = new Array();\n";
	echo "translations['loading'] = '".addslashes(_("Loading..."))."';\n";
	echo "translations['nothing'] = '".addslashes(_("Nothing found."))."';\n";
	echo "translations['update'] = '".addslashes(_("Last update:"))."';\n";
	echo "translations['empty'] = '".addslashes(_("Empty input."))."';\n";
	echo "translations['kilometer'] = '".addslashes(_("Kilometer"))."';\n";
	echo "translations['track'] = '".addslashes(_("Track"))."';\n";
	echo "translations['permalink'] = '".addslashes(_("Permalink"))."';\n";
	echo "translations['hillshading'] = '".addslashes(_("Hillshading"))."';\n";
	echo "translations['hillshadingAttribution'] = '".addslashes(_("Hillshading by <a href='http://nasa.gov/'>NASA SRTM</a>"))."';\n";
	echo "translations['railmap'] = '".addslashes(_("OpenRailwayMap"))."';\n";
	echo "translations['railmapAttribution'] = '".addslashes(_("Rendering: OpenRailwayMap"))."';\n";
	echo "translations['mapnik'] = '".addslashes(_("Mapnik"))."';\n";
	echo "translations['mapnikGrayscale'] = '".addslashes(_("Mapnik Grayscale"))."';\n";
	echo "translations['mapnikAttribution'] = '".addslashes(_("Map data &copy; OpenStreetMap contributors"))."';\n";
	echo "translations['mapquest'] = '".addslashes(_("MapQuest"))."';\n";
	echo "translations['mapquestGrayscale'] = '".addslashes(_("MapQuest Grayscale"))."';\n";
	echo "translations['mapquestAttribution'] = '".addslashes(_("Tiles Courtesy of <a href=\"http://www.mapquest.com/\" target=\"_blank\">MapQuest</a> <img src=\"http://developer.mapquest.com/content/osm/mq_logo.png\">"))."';\n";
	echo "translations['styleSelection'] = '".addslashes(_("Select a map style"))."';\n";
	echo "translations['publictransport'] = '".addslashes(_("Public transport"))."';\n";
	echo "translations['searchresults'] = '".addslashes(_("Search results"))."';\n";
	echo "translations['searchoption'] = '".addslashes(_("Search only in the current map view"))."';\n";
	echo "translations['embed'] = '".addslashes(_("HTML-Code"))."';\n";
	echo "translations['embeddescription'] = '".addslashes(_("Copy this HTML code snippet into your website to show a small map with a marker."))."';\n";
	echo "translations['style.standard'] = '".addslashes(_("style.standard"))."';\n";
	echo "translations['style.signals'] = '".addslashes(_("style.signals"))."';\n";
	echo "translations['style.maxspeed'] = '".addslashes(_("style.maxspeed"))."';\n";
	echo "translations['halt'] = '".addslashes(_("Halt"))."';\n";
	echo "translations['station'] = '".addslashes(_("Station"))."';\n";
	echo "translations['junction'] = '".addslashes(_("Junction"))."';\n";
	echo "translations['yard'] = '".addslashes(_("Yard"))."';\n";
	echo "translations['crossover'] = '".addslashes(_("Crossover"))."';\n";
	echo "translations['site'] = '".addslashes(_("Site"))."';\n";
	echo "translations['service_station'] = '".addslashes(_("Service station"))."';\n";
	echo "translations['tram_stop'] = '".addslashes(_("Tram stop"))."';\n";
	echo "translations['milestone'] = '".addslashes(_("Milestone"))."';\n";
	echo "translations['level_crossing'] = '".addslashes(_("Level crossing"))."';\n";
	echo "translations['crossing'] = '".addslashes(_("Crossing"))."';\n";
?>
