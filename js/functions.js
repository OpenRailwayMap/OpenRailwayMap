/*
OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
This program comes with ABSOLUTELY NO WARRANTY.
This is free software, and you are welcome to redistribute it under certain conditions.
See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.
*/


// main function, creates map and layers, controls other functions
function createMap()
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
		attribution: "Map data &copy; OpenStreetMap contributors",
		maxZoom: 18
	}).addTo(map);
	// normal mapnik background layer
	var mapnik = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
	{
		attribution: "Map data &copy; OpenStreetMap contributors",
		maxZoom: 18
	}).addTo(map);

	// railmap layer
	//var railmap = new L.TileLayer.Kothic({minZoom: 1});
	//MapCSS.onImagesLoad = function()
	//{
	//	map.addLayer(railmap);
	//};
	//MapCSS.preloadSpriteImage("osmosnimki-maps", "http://osmosnimki.ru/leaf/icons/osmosnimki.png");

	// hillshading layer
	var hillshading = new L.TileLayer('http://toolserver.org/~cmarqu/hill/{z}/{x}/{y}.png',
	{
		attribution: "Hillshading by <a href='http://nasa.gov/'>NASA SRTM</a>",
		maxZoom: 17
	}).addTo(map);

	var baseLayers =
	{
		"Mapnik": mapnik,
		"Mapnik Grayscale": mapnikGray
	};
	var overlays =
	{
		"Hillshading": hillshading
	};
	// TODO: better selection of default layer, disable hillshading by default
	//map.addControl(new OpenLayers.Control.MousePosition());
	var scaleLine = new L.Control.Scale({metric:true, maxWidth:200}).addTo(map);
	// TODO: plugin missing
	//var permalink = new L.Control.Permalink({text: 'Permalink'}).addTo(map);
	var layerSwitch = new L.Control.Layers(baseLayers, overlays).addTo(map);

	// loading timestamp
	var timestamp = new Timestamp("info");

	// setting start position
	startposition = new Startposition(map, "locateButton");

	// creating search
	//search = new Search(map, "searchBox", "searchBar", "searchButton", "clearButton", "searchCheckbox");
}


// shorter than document.get... everywhere
function gEBI(id)
{
	return document.getElementById(id);
}


// provides link to openstreetbugs
function reportSpam()
{
	// get current coordinates
	var position = map.getCenter();

	// open osb and jump to current position
	var bugWindow = window.open("http://openstreetbugs.schokokeks.org/?zoom="+map.getZoom()+"&lat="+position.lat+"&lon="+position.lng).focus();
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


// TODO: check ab hier
// returns the current map bbox
function getBounds()
{
	return map.getExtent().transform(map.getProjectionObject(), wgs84).toArray();
}


// TODO: attribution's CSS is destroyed
// workaround because of webkit's hover-silbing-selector-bug
function hoverSidebar()
{
	if (gEBI("hideText").innerHTML != '»')
		return false;

	gEBI("mapFrame").className = "mapFrameOut";
	startposition.locateButton.className = "locateButton";
	gEBI("hideSidebarButton").className = "hideSidebarButton";
}


// workaround because of webkit's hover-silbing-selector-bug
function unhoverSidebar()
{
	if (gEBI("hideText").innerHTML != '»')
		return false;

	gEBI("mapFrame").className = "mapFrame";
	startposition.locateButton.className = "locateButtonFalse";
	if (gEBI("sideBar").className == "sideBarOut")
		gEBI("hideSidebarButton").className = "hideSidebarButtonFalse";
}


// updates map's center
function updateMap()
{
	map.setCenter(map.getCenter(), map.getZoom());
}


// shows the search bar when clicking on the 'hide'-button
function showSideBar()
{
	// hide searchbar
	gEBI('sideBar').className = 'sideBar';
	var button = gEBI('hideSidebarButton');
	button.className = 'hideSidebarButton';
	button.onclick = new Function("hideSideBar()");
	button.title = translations['hide'];
	gEBI("hideText").innerHTML = '«';
	gEBI('searchBox').focus();
	gEBI("mapFrame").className = "mapFrameOut";
	gEBI("locateButton").className = "locateButton";
	updateMap();
}


// hides the search bar when clicking on the 'hide'-button or after clicking on a result
function hideSideBar()
{
	// hide searchbar
	gEBI('sideBar').className = 'sideBarOut';
	var button = gEBI('hideSidebarButton');
	button.className = 'hideSidebarButtonFalse';
	button.onclick = new Function("showSideBar()");
	button.title = translations['show'];
	gEBI("hideText").innerHTML = '»';
	gEBI("mapFrame").className = "mapFrame";
	startposition.locateButton.className = "locateButtonFalse";
	updateMap();
}


// display html code to embed with iframe
function getEmbedLink(id, type)
{
	showSideBar();
	var detailsbar = gEBI('detailsBar');
	detailsbar.className = "infoBar";
	detailsbar.innerHTML = '<div class="moreInfoBox"><center><dfn><b>'+translations['embed']+'</b></dfn><br /><dfn>'+translations['embeddescription']+'</dfn></center></div><div class="moreInfoBox"><input id="embed" type=text value=\'<iframe width="420" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="'+root+'embed.php?id='+id+'&type='+type+'" style="border: 1px solid black"></iframe>\'</div>';

	var embed = gEBI('embed');
	embed.focus();
	embed.select();
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


// reloads the page in a different language
function changeLanguage(lang)
{
	var url = root+'?lang='+lang;
	var position = map.getCenter();

	if (params['id'] != null)
		url += '&id='+params['id'];

	if (params['type'] != null)
		url += '&type='+params['type'];

	if (params['ext'] == true)
		url += '&ext=1';

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

	if (params['bounded'] == 1)
		url += '&bounded='+params['bounded'];

	window.location = url;
}
