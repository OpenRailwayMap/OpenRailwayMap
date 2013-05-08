<?php
	/*
	OpenLinkMap Copyright (C) 2010 Alexander Matheisen
	This program comes with ABSOLUTELY NO WARRANTY.
	This is free software, and you are welcome to redistribute it under certain conditions.
	See http://wiki.openstreetmap.org/wiki/OpenLinkMap for details.
	*/


	require_once("functions.php");
	// include translation file
	includeLocale($_GET['lang']);

	echo "translations = new Array();\n";
	echo "translations['back'] = '".addslashes(_("Back"))."';\n";
	echo "translations['details'] = '".addslashes(_("Details"))."';\n";
	echo "translations['contact'] = '".addslashes(_("Contact"))."';\n";
	echo "translations['info'] = '".addslashes(_("More Info"))."';\n";
	echo "translations['loading'] = '".addslashes(_("Loading..."))."';\n";
	echo "translations['nothing'] = '".addslashes(_("Nothing found."))."';\n";
	echo "translations['nothingmore'] = '".addslashes(_("No more results."))."';\n";
	echo "translations['update'] = '".addslashes(_("Last update:"))."';\n";
	echo "translations['showMarker'] = '".addslashes(_("Zoom in to show marker"))."';\n";
	echo "translations['empty'] = '".addslashes(_("Empty input."))."';\n";
	echo "translations['more'] = '".addslashes(_("More Details"))."';\n";
	echo "translations['moreresults'] = '".addslashes(_("More results..."))."';\n";
	echo "translations['less'] = '".addslashes(_("Less"))."';\n";
	echo "translations['hide'] = '".addslashes(_("Hide"))."';\n";
	echo "translations['show'] = '".addslashes(_("Show"))."';\n";
	echo "translations['permalink'] = '".addslashes(_("Permalink"))."';\n";
	echo "translations['finish'] = '".addslashes(_("Finish"))."';\n";
	echo "translations['markerLoading'] = '".addslashes(_("Loading points..."))."';\n";
	echo "translations['hillshading'] = '".addslashes(_("Hillshading"))."';\n";
	echo "translations['object'] = '".addslashes(_("POI-Details"))."';\n";
	echo "translations['marker'] = '".addslashes(_("Marker"))."';\n";
	echo "translations['publictransport'] = '".addslashes(_("Public transport"))."';\n";
	echo "translations['searchresults'] = '".addslashes(_("Search results"))."';\n";
	echo "translations['routing'] = '".addslashes(_("Route"))."';\n";
	echo "translations['searchoption'] = '".addslashes(_("Search only in the current map view"))."';\n";
	echo "translations['close'] = '".addslashes(_("Click to close"))."';\n";
	echo "translations['inolm'] = '".addslashes(_("Show in OpenLinkMap..."))."';\n";
	echo "translations['embed'] = '".addslashes(_("HTML-Code"))."';\n";
	echo "translations['embeddescription'] = '".addslashes(_("Copy this HTML code snippet into your website to show a small map with a marker."))."';\n";
	echo "translations['embedattribution'] = '".addslashes(_("Maps and data <a href=\"http://www.openstreetmap.org/copyright\">© OpenStreetMap contributors</a>.<br />Hillshading: <a href=\"http://nasa.gov/\">NASA SRTM</a>."))."';\n";
?>
