/*
OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
This program comes with ABSOLUTELY NO WARRANTY.
This is free software, and you are welcome to redistribute it under certain conditions.
See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.
*/


// main function, creates map and layers, controls other functions
function createMap(embed)
{
	root = "http://www.openrailwaymap.org/";
	loading = "<img class='loading' src='"+root+"/img/loading.gif'><br>"+translations['loading'];

	if (params['offset'] != null)
		offset = params['offset'];
	else
	{
		// get time offset to UTC
		var now = new Date();
		offset = -(now.getTimezoneOffset() / 60);
	}

	map = L.map('mapFrame');

	// grayscale mapnik background layer
	var mapnikGray = new L.TileLayer.Grayscale('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
	{
		attribution: translations['mapnikAttribution'],
		maxZoom: 18
	}).addTo(map);
	// normal mapnik background layer
	var mapnik = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
	{
		attribution: translations['mapnikAttribution'],
		maxZoom: 18
	}).addTo(map);

	// grayscale MapQuest background layer
	var mapquestGray = new L.TileLayer.Grayscale('http://otile1.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png',
	{
		attribution: translations['mapquestAttribution'],
		maxZoom: 18
	}).addTo(map);
	// normal MapQuest background layer
	var mapquest = new L.TileLayer('http://otile1.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png',
	{
		attribution: translations['mapquestAttribution'],
		maxZoom: 18
	}).addTo(map);

	// railmap layer
	railmap = new L.TileLayer.Kothic(root+'tiles/{z}/{x}/{y}.js',
	{
		attribution: translations['railmapAttribution'],
		minZoom: 4
	});
	MapCSS.onImagesLoad = function()
	{
		map.addLayer(railmap);
	};
	MapCSS.preloadSpriteImage("standard", root+"styles/standard.png");
	MapCSS.preloadSpriteImage("signals", root+"styles/signals.png");

	// hillshading layer
	var hillshading = new L.TileLayer('http://toolserver.org/~cmarqu/hill/{z}/{x}/{y}.png',
	{
		attribution: translations['hillshadingAttribution'],
		maxZoom: 17
	}).addTo(map);

	var baseLayers = new Object();
	baseLayers[translations['mapnik']] = mapnik;
	baseLayers[translations['mapnikGrayscale']] = mapnikGray;
	baseLayers[translations['mapquest']] = mapquest;
	baseLayers[translations['mapquestGrayscale']] = mapquestGray;

	var overlays = new Object();
	overlays[translations['hillshading']] = hillshading;
	overlays[translations['railmap']] = railmap;

	// TODO: better selection of default layer, disable hillshading by default
	var scaleLine = new L.Control.Scale({metric:true, maxWidth:200}).addTo(map);
	// TODO: plugin missing
	//var permalink = new L.Control.Permalink({text: 'Permalink'}).addTo(map);
	var layerSwitch = new L.Control.Layers(baseLayers, overlays).addTo(map);

	// only in not-embed mode
	if (!embed)
	{
		// loading timestamp
		var timestamp = new Timestamp("info");
		// setting start position
		startposition = new Startposition(map, "locateButton");
		// create search
		search = new Search(map, "searchBox", "searchBar", "searchButton", "clearButton", "searchCheckbox");
		// build style selection and it's event handling
		getStyleSelection();
	}
	// set start position in embed mode
	else
		this.map.setView(new L.LatLng(params['lat'], params['lon']), params['zoom']);
}


// changes the current map rendering style to the JS stylefile given as parameter
function setStyle(style)
{
	for (var i=0; i<MapCSS.availableStyles.length; i++)
		if (MapCSS.availableStyles[i] != style)
			railmap.disableStyle(MapCSS.availableStyles[i]);

	railmap.enableStyle(style);
}


// TODO comment
function getStyleSelection()
{
	// TODO css styling layerselection
	// TODO selected item on startup
	gEBI('styleSelectionBar').innerHTML = '<form id="styleSelection"><p>'+translations['styleSelection']+':</p><p>';
	for (var i=0; i<MapCSS.availableStyles.length; i++)
		gEBI('styleSelectionBar').innerHTML += '<input onchange="setStyle(this.value)" type="radio" name="style" value="'+MapCSS.availableStyles[i]+'"> '+translations['style.'+MapCSS.availableStyles[i]]+'<br />';
	gEBI('styleSelectionBar').innerHTML += '</p></form>';
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
	var url = root+'?lang='+lang;
	var position = map.getCenter();

	if (params['id'] != null)
		url += '&id='+params['id'];

	if (params['type'] != null)
		url += '&type='+params['type'];

	if (params['lat'] != null)
		url += '&lat='+params['lat'];
	else
		url += '&lat='+position.lat;

	if (params['lon'] != null)
		url += '&lon='+params['lon'];
	else
		url += '&lon='+position.lng;

	if (params['zoom'] != null)
		url += '&zoom='+params['zoom'];
	else
		url += '&zoom='+map.getZoom();

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

	window.location = url;
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
