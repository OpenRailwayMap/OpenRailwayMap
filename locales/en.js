/*
OpenLinkMap Copyright (C) 2010 Alexander Matheisen
This program comes with ABSOLUTELY NO WARRANTY.
This is free software, and you are welcome to redistribute it under certain conditions.
See http://wiki.openstreetmap.org/wiki/OpenLinkMap for details.
*/

// translations of labels
var translations =
{
	"back" : "Back",
	"details" : "Details",
	"search" : "Search",
	"spam" : "Report map errors",
	"title" : "Maps and data <a href=\"http://www.openstreetmap.org/copyright\">© OpenStreetMap contributors</a>.<br />Hillshading: <a href=\"http://nasa.gov/\">NASA SRTM</a>.",
	"info" : "More Info",
	"contact" : "Contact",
	"loading" : "Loading...",
	"nothing" : "Nothing found.",
	"nothingmore" : "No more results.",
	"update" : "Last update:",
	"showMarker" : "Zoom in to show marker",
	"empty" : "Empty input.",
	"more" : "More Details",
	"moreresults" : "More results...",
	"less" : "Less",
	"hide" : "Hide",
	"show" : "Show",
	"permalink" : "Permalink",
	"finish" : "Finish",
	"markerLoading" : "Loading points...",
	"hillshading" : "Hillshading",
	"object" : "POI-Details",
	"marker" : "Marker",
	"searchresults" : "Search results",
	"routing" : "Route",
	"searchoption" : "Search only in the current map view",
	"close" : "Click to close",
	"ad" : "Improve the data! Correct wrong website links with the new website checker from Keepright!",
	"inolm" : "Show in OpenLinkMap...",
	"embed" : "HTML-Code",
	"embeddescription" : "Copia questo codice HTML sul tuo sito web per mostrare una piccola mappa con un pennarello.",
	"embedattricution" : 'Map data &copy; <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> and contributors <a href="http://creativecommons.org/licenses/by-sa/2.0/deed.en" target="_blank">CC-BY-SA</a>'
};

// descriptions for search results
var descriptions =
{
	"city" : "#county#, #state#, #country#",
	"country" : "",
	"county" : "#state#, #country#",
	"footway" : "#city#, #county#, #country#",
	"hamlet" : "#county#, #country#",
	"house_number" : "#city#, #county#, #country#",
	"island" : "#state#, #country#",
	"isolated_dwelling" : "#county#, #state#, #country#",
	"locality" : "#county#, #state#, #country#",
	"place" : "#county#, #state#, #country#",
	"postcode" : "#county#, #state#, #country#",
	"region" : "#country#",
	"road" : "#city#, #county#, #country#",
	"state" : "#country#",
	"state_district" : "#state#, #country#",
	"suburb" : "#city#, #county#, #country#",
	"town" : "#state#, #country#",
	"village" : "#county#, #country#",
	"poi" : "#footway# #road# #house_number#, #postcode# #village# #city#, #country#",
	"name" : "#footway# #road# #house_number#"
};

// translations of OpenLayers
OpenLayers.Lang.en =
{
	'unhandledRequest': "Unhandled request return ${statusText}",
	'Permalink': "Permalink",
	'Overlays': "Overlays",
	'Base Layer': "Base Layer",
	'sameProjection': "The overview map only works when it is in the same projection as the main map",
	'readNotImplemented': "Read not implemented.",
	'writeNotImplemented': "Write not implemented.",
	'noFID': "Can't update a feature for which there is no FID.",
	'errorLoadingGML': "Error in loading GML file ${url}",
	'browserNotSupported': "Your browser does not support vector rendering. Currently supported renderers are:\n${renderers}",
	'componentShouldBe': "addFeatures : component should be an ${geomType}",
	'getFeatureError':
		"getFeatureFromEvent called on layer with no renderer. This usually means you " +
		"destroyed a layer, but not some handler which is associated with it.",
	'minZoomLevelError':
		"The minZoomLevel property is only intended for use " +
		"with the FixedZoomLevels-descendent layers. That this " +
		"wfs layer checks for minZoomLevel is a relic of the" +
		"past. We cannot, however, remove it without possibly " +
		"breaking OL based applications that may depend on it." +
		" Therefore we are deprecating it -- the minZoomLevel " +
		"check below will be removed at 3.0. Please instead " +
		"use min/max resolution setting as described here: " +
		"http://trac.openlayers.org/wiki/SettingZoomLevels",
	'commitSuccess': "WFS Transaction: SUCCESS ${response}",
	'commitFailed': "WFS Transaction: FAILED ${response}",
	'googleWarning':
		"The Google Layer was unable to load correctly.<br><br>" +
		"To get rid of this message, select a new BaseLayer " +
		"in the layer switcher in the upper-right corner.<br><br>" +
		"Most likely, this is because the Google Maps library " +
		"script was either not included, or does not contain the " +
		"correct API key for your site.<br><br>" +
		"Developers: For help getting this working correctly, " +
		"<a href='http://trac.openlayers.org/wiki/Google' " +
		"target='_blank'>click here</a>",
	'getLayerWarning':
		"The ${layerType} Layer was unable to load correctly.<br><br>" +
		"To get rid of this message, select a new BaseLayer " +
		"in the layer switcher in the upper-right corner.<br><br>" +
		"Most likely, this is because the ${layerLib} library " +
		"script was not correctly included.<br><br>" +
		"Developers: For help getting this working correctly, " +
		"<a href='http://trac.openlayers.org/wiki/${layerLib}' " +
		"target='_blank'>click here</a>",
		'Scale = 1 : ${scaleDenom}': "Scale = 1 : ${scaleDenom}",
	'W': 'W',
	'E': 'E',
	'N': 'N',
	'S': 'S',
	'graticule': 'Graticule',
	'layerAlreadyAdded': "You tried to add the layer: ${layerName} to the map, but it has already been added",
	'reprojectDeprecated':
		"You are using the 'reproject' option " +
		"on the ${layerName} layer. This option is deprecated: " +
		"its use was designed to support displaying data over commercial " +
		"basemaps, but that functionality should now be achieved by using " +
		"Spherical Mercator support. More information is available from " +
		"http://trac.openlayers.org/wiki/SphericalMercator.",
	'methodDeprecated':
		"This method has been deprecated and will be removed in 3.0. " +
		"Please use ${newMethod} instead.",
	'boundsAddError': "You must pass both x and y values to the add function.",
	'lonlatAddError': "You must pass both lon and lat values to the add function.",
	'pixelAddError': "You must pass both x and y values to the add function.",
	'unsupportedGeometryType': "Unsupported geometry type: ${geomType}",
	'pagePositionFailed': "OpenLayers.Util.pagePosition failed: element with id ${elemId} may be misplaced.",
	'filterEvaluateNotImplemented': "evaluate is not implemented for this filter type.",
	'end': '',
	'proxyNeeded': "You probably need to set OpenLayers.ProxyHost to access ${url}."+
	"See http://trac.osgeo.org/openlayers/wiki/FrequentlyAskedQuestions#ProxyHost",
};