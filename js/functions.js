/*
OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
This program comes with ABSOLUTELY NO WARRANTY.
This is free software, and you are welcome to redistribute it under certain conditions.
See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.
*/


// returns the lang-region-code that fits the best to the user
function getUserLang()
{
	// override browser settings when language is set in url
	if (window.openrailwaymap.availableTranslations.hasOwnProperty(params['lang']))
		return window.openrailwaymap.availableTranslations[params['lang']];

	var lang = navigator.language || navigator.userLanguage || 'en-GB';
	var languages = navigator.languages || [lang];

	for (var i=0; i<navigator.languages.length; i++)
	{
		// lang-country combination as first choice
		var langcountrycode = navigator.languages[i].replace('-', '_');
		for (var key in window.openrailwaymap.availableTranslations)
			if (window.openrailwaymap.availableTranslations.hasOwnProperty(key) && window.openrailwaymap.availableTranslations[key] === langcountrycode)
				return langcountrycode;

		// only lang as second choice
		var langcode = langcountrycode.split('_')[0];
		if (window.openrailwaymap.availableTranslations.hasOwnProperty(langcode))
			return window.openrailwaymap.availableTranslations[langcode];
	}

	return 'en_GB';
}


// reload the legend after changing zoomlevel or stylesheet
function updateLegend(id, style)
{
	gEBI(id).src = window.openrailwaymap.root+"api/legend-generator.php?zoom="+map.getZoom()+"&style="+style+"&lang="+params['lang'];
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


// perform an async GET request
function getRequest(url, handler)
{
	var request = new XMLHttpRequest();

	request.open("GET", url, true);

	request.onload = function()
	{
		if (request.status >= 200 && request.status < 400)
		{
			handler(request.responseText);
		}
		else
		{
			console.log('Server returned ' + request.status + ' for ' + request);
			console.log('Server response: ' + request.responseText);
			handler(false);
		}
	};

	request.onerror = function()
	{
		console.log('Error: ' + request.status);
		handler(false);
	};

	request.send();
}


// perform an async API request
function requestAPI(request, params, handler)
{
	if (params)
		getRequest(window.openrailwaymap.apiUrl + request + '?' + params.replace(/ /g, '+'), handler);
	else
		getRequest(window.openrailwaymap.apiUrl + request, handler);
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
		|| navigator.userAgent.match(/Jolla/)
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
			if (param == 'urlbase')
				continue;
			else if (params[param])
				paramlist += "&"+param+"="+params[param];

		document.location.href = params.urlbase + "mobile.php?" + paramlist.substr(1);
	}
}

// create layer and zoom controls
function setupControls()
{
	// grayscale mapnik background layer
	var mapnikGray = new L.TileLayer.Grayscale('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
	{
		attribution: _("Map data &copy; OpenStreetMap contributors"),
		maxZoom: 19
	}).addTo(map);
	// normal mapnik background layer
	var mapnik = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
	{
		attribution: _("Map data &copy; OpenStreetMap contributors"),
		maxZoom: 19
	});

	// blank background map
	var blank = new L.TileLayer(window.openrailwaymap.root+'/img/blank.png',
	{
		maxZoom: 20
	});

	var baseLayers = new Object();
	baseLayers[_("Mapnik")] = mapnik;
	baseLayers[_("Mapnik Grayscale")] = mapnikGray;
	baseLayers[_("No background map")] = blank;

	// hillshading layer
	var hillshading = new L.TileLayer('http://{s}.tiles.wmflabs.org/hillshading/{z}/{x}/{y}.png',
	{
		attribution: _("Hillshading by <a href='http://nasa.gov/'>NASA SRTM</a>"),
		maxZoom: 17
	});

	var overlays = new Object();
	overlays[_("Hillshading")] = hillshading;
	overlays[_("OpenRailwayMap")] = railmap;

	new L.Control.Scale({metric:true, maxWidth:200}).addTo(map);
	new L.Control.Layers(baseLayers, overlays).addTo(map);
}

function _(sourcemsg, n)
{
	if (typeof window.openrailwaymap.translations[sourcemsg] === 'undefined')
		return sourcemsg;

	if (n === undefined)
		return window.openrailwaymap.translations[sourcemsg][1];

	var pluralForms = window.openrailwaymap.translations[""]["Plural-Forms"].match(/plural=(.*);/)[1];
	var pluralIndex = eval(pluralForms.replace(/n/), n) + 1;
	return window.openrailwaymap.translations[sourcemsg][pluralIndex].replace(/%d/, n);
}
