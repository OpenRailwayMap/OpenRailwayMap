/*
OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
This program comes with ABSOLUTELY NO WARRANTY.
This is free software, and you are welcome to redistribute it under certain conditions.
See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.
*/


// reload the legend after changing zoomlevel or stylesheet
function updateLegend(id, style)
{
	gEBI(id).src = root+"api/legend-generator.php?zoom="+map.getZoom()+"&style="+style+"&lang="+params['lang'];
}


// renews the permalink url after zooming, changing style or dragging the map
function updatePermalink(style)
{
	gEBI('permalinkButton').href = getPermalinkUrl(style);
	if (gEBI("desktopButton") != null)
		gEBI('desktopButton').href = (getPermalinkUrl(style).replace("mobile.php", "index.php"))+"&mobile=0";
}


// shorter than document.get... everywhere
function gEBI(id)
{
	return document.getElementById(id);
}


// prevent josm remote plugin of showing message
function josm(url)
{
	var josmFrame = gEBI("josmFrame");
	if (josmFrame)
	{
		josmFrame.src = url;
		return false;
	}
	return true;
}


// perform a synchron API request
function requestApi(file, query, handler)
{
	if (window.XMLHttpRequest)
		var request = new window.XMLHttpRequest;
	else
		var request = new ActiveXObject("MSXML2.XMLHTTP.3.0");

	request.open("GET", root+'api/'+file+'.php?'+query, true);
	request.onreadystatechange = function()
	{
		if (request.readyState === 4)
			if (request.status === 200)
				handler(request);
	};
	request.send(null);
}


// updates map's center
function updateMap()
{
	map.setView(map.getCenter(), map.getZoom());
}


// reloads the page in a different language
function changeLanguage(lang)
{
	window.location = getPermalinkUrl(railmap.selectedStyle, lang);
}


// returns a permalink storing all current settings (language, position, zoom, url params); style parameter is necessary, lang parameter is not necessary
function getPermalinkUrl(style, lang)
{
	var url = window.location.origin + window.location.pathname;

	url += '?lang='+((lang) ? lang : params['lang']);

	if (params['id'] != null)
		url += '&id='+params['id'];

	if (params['type'] != null)
		url += '&type='+params['type'];

	var position = map.getCenter();
	url += '&lat='+position.lat;
	url += '&lon='+position.lng;
	url += '&zoom='+map.getZoom();

	url += '&style='+style;

	if (params['offset'] != null)
		url += '&offset='+params['offset'];

	if (params['searchquery'] != "")
		url += '&q='+params['searchquery'];

	if (params['ref'] != null)
		url += '&ref='+params['ref'];

	if (params['name'] != null)
		url += '&name='+params['name'];

	if (params['position'] != null)
		url += '&position='+params['position'];

	if (params['line'] != null)
		url += '&line='+params['line'];

	return url;
}


// builds a lat-lon url parameter
function queryLatLon(lat, lon)
{
	return "lat="+lat+"&lon="+lon;
}


// builds a lat-lon url parameter with zoom
function queryLatLonZoom(lat, lon, zoom)
{
	return queryLatLon(lat, lon)+"&zoom="+zoom;
}


// resize the height of an iframe with a given id to the height of the content
function setIframeHeight(id)
{
	var legend = gEBI(id);
	var doc = legend.contentDocument ? legend.contentDocument : legend.contentWindow.document;
	legend.style.visibility = 'hidden';
	legend.style.height = "10px";
	var body = doc.body;
	var html = doc.documentElement;
	legend.style.height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight)+4+"px";
	legend.style.visibility = 'visible';
}

// check whether the visitor uses a mobile device or not
function isMobileDevice()
{
	if (navigator.userAgent.match(/Android/i)
		|| navigator.userAgent.match(/webOS/i)
		|| navigator.userAgent.match(/iPhone/i)
		|| navigator.userAgent.match(/iPad/i)
		|| navigator.userAgent.match(/iPod/i)
		|| navigator.userAgent.match(/BlackBerry/i)
		|| navigator.userAgent.match(/Windows Phone/i)
	)
		return true;

	if (window.innerWidth <= 800 && window.innerHeight <= 600)
		return true;

	return false;
}

// redirect to mobile website if necessary
function mobileRedirection()
{
	if (params['mobile'] || isMobileDevice() && params['mobile'] == null)
	{
		var paramlist = "";

		for (var param in params)
			if (params[param] != null)
				paramlist += "&"+param+"="+params[param];

		document.location.href = "http://www.openrailwaymap.org/mobile.php?"+paramlist.substr(1);
	}
}

// create layer and zoom controls
function setupControls()
{
	// grayscale mapnik background layer
	var mapnikGray = new L.TileLayer.Grayscale('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
	{
		attribution: translations['mapnikAttribution'],
		maxZoom: 19
	}).addTo(map);
	// normal mapnik background layer
	var mapnik = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
	{
		attribution: translations['mapnikAttribution'],
		maxZoom: 19
	});

	// grayscale MapQuest background layer
	var mapquestGray = new L.TileLayer.Grayscale('http://otile1.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png',
	{
		attribution: translations['mapquestAttribution'],
		maxZoom: 18
	});
	// normal MapQuest background layer
	var mapquest = new L.TileLayer('http://otile1.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png',
	{
		attribution: translations['mapquestAttribution'],
		maxZoom: 18
	});

	// blank background map
	var blank = new L.TileLayer(root+'/img/blank.png',
	{
		maxZoom: 20
	});

	var baseLayers = new Object();
	baseLayers[translations['mapnik']] = mapnik;
	baseLayers[translations['mapnikGrayscale']] = mapnikGray;
	baseLayers[translations['mapquest']] = mapquest;
	baseLayers[translations['mapquestGrayscale']] = mapquestGray;
	baseLayers[translations['blank']] = blank;

	// hillshading layer
	var hillshading = new L.TileLayer('http://{s}.tiles.wmflabs.org/hillshading/{z}/{x}/{y}.png',
	{
		attribution: translations['hillshadingAttribution'],
		maxZoom: 17
	});

	var overlays = new Object();
	overlays[translations['hillshading']] = hillshading;
	overlays[translations['railmap']] = railmap;

	new L.Control.Scale({metric:true, maxWidth:200}).addTo(map);
	new L.Control.Layers(baseLayers, overlays).addTo(map);
}
