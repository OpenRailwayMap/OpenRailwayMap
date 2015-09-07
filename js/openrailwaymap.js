/*
OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
This program comes with ABSOLUTELY NO WARRANTY.
This is free software, and you are welcome to redistribute it under certain conditions.
See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.
*/



// TODO ### BITMAP MAP ###

// main function, creates map and layers, controls other functions
function createMap(embed)
{
	root = "http://www.openrailwaymap.org/";
	loading = "<img class='loading' src='"+root+"/img/loading.gif'><br>"+translations['loading'];
	// path to the bitmap tile directory
	tiledir = "http://{s}.tiles.openrailwaymap.org/";
	// available map rendering styles
	availableStyles = new Array("standard", "maxspeed", "signals");

	if (params['offset'] != null)
		offset = params['offset'];
	else
	{
		// get time offset to UTC
		var now = new Date();
		offset = -(now.getTimezoneOffset() / 60);
	}

	map = L.map('mapFrame');

	if (!embed)
	{
		map.on('moveend', function(e)
		{
			updatePermalink(railmap.selectedStyle);
		});
	}

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

	// railmap layer
	railmap = new L.TileLayer(tiledir+'standard/{z}/{x}/{y}.png',
	{
		attribution: translations['railmapAttribution'],
		minZoom: 2,
		maxZoom: 19,
		tileSize: 256
	}).addTo(map);

	if (!embed)
	{
		map.on('zoomend', function(e)
		{
			updateLegend("legend", railmap.selectedStyle);
			updatePermalink(railmap.selectedStyle);
		});
	}

	// hillshading layer
	var hillshading = new L.TileLayer('http://toolserver.org/~cmarqu/hill/{z}/{x}/{y}.png',
	{
		attribution: translations['hillshadingAttribution'],
		maxZoom: 17
	});

	var baseLayers = new Object();
	baseLayers[translations['mapnik']] = mapnik;
	baseLayers[translations['mapnikGrayscale']] = mapnikGray;
	baseLayers[translations['mapquest']] = mapquest;
	baseLayers[translations['mapquestGrayscale']] = mapquestGray;
	baseLayers[translations['blank']] = blank;

	var overlays = new Object();
	overlays[translations['hillshading']] = hillshading;
	overlays[translations['railmap']] = railmap;

	var scaleLine = new L.Control.Scale({metric:true, maxWidth:200}).addTo(map);
	var layerSwitch = new L.Control.Layers(baseLayers, overlays).addTo(map);

	// only in not-embed mode
	if (!embed)
	{
		// setting start position
		startposition = new Startposition(map);
		// loading timestamp
		var timestamp = new Timestamp("info");
		// create search
		search = new Search(map, "searchBox", "searchBar", "searchButton", "clearButton");
		// build style selection and it's event handling
		getStyleSelection();
		// set rendering style
		if (params['style'] != null && styleValid(params['style']))
			applyStyle(params['style']);
		else
			applyStyle("standard");
		// onclick event of locate button
		gEBI("locateButton").onclick = function()
		{
			startposition.setPosition();
		};
		// initialize the permalink url
		updatePermalink(railmap.selectedStyle);
	}
	else
	{
		// set rendering style
		if (params['style'] != null && styleValid(params['style']))
			setStyle(params['style']);
		else
			setStyle("standard");

		// setting start position
		startposition = new Startposition(map);
	}
}


// changes the current map rendering style to the style given as parameter
function setStyle(style)
{
	// helper variable for saving current map style
	railmap.selectedStyle = style;
	// change tileserver url to load different style
	railmap._url = tiledir+style+'/{z}/{x}/{y}.png';
	// reload all tiles after style was changed
	railmap.redraw();
}


// changes the current map rendering style to the style given as parameter and updates legend, permalink and style selection
function applyStyle(style)
{
	setStyle(style);

	// mark selected item as checked
	var selectableItems = gEBI('styleSelectionBar').getElementsByTagName('input');
	for (var i=0; i<selectableItems.length; i++)
		if (selectableItems[i].value == style)
			var index = i;

	selectableItems[index].checked = true;
	updateLegend("legend", style);
	updatePermalink(railmap.selectedStyle);
}


// build a radio-button list of available map styles
function getStyleSelection()
{
	gEBI('styleSelectionBar').innerHTML = '<form id="styleSelection"><b>'+translations['styleSelection']+':</b><br /><p>';
	for (var i=0; i<availableStyles.length; i++)
		gEBI('styleSelectionBar').innerHTML += '<label><input onchange="applyStyle(this.value)" type="radio" name="style" value="'+availableStyles[i]+'">'+translations['style.'+availableStyles[i]]+'</label><br />';
	gEBI('styleSelectionBar').innerHTML += '</p></form>';
}


// returns true if the given stylename is a valid and available style; otherwise false is returned
function styleValid(style)
{
	for (var i=0; i<availableStyles.length; i++)
		if (availableStyles[i] == style)
			return true;

	return false;
}







// TODO ### CANVAS MAP ###

// main function, creates map and layers, controls other functions
function createMap(embed)
{
	root = "http://www.openrailwaymap.org/";
	tiledir = "http://tiles.openrailwaymap.org/vector/";
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

	map.on('moveend', function(e)
	{
		updatePermalink(MapCSS.availableStyles[0]);
	});

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

	// railmap layer
	railmap = new L.TileLayer.Kothic(tiledir+'{z}/{x}/{y}.js',
	{
		attribution: translations['railmapAttribution'],
		minZoom: 2,
		maxZoom: 19
	});

	MapCSS.onImagesLoad = function()
	{
		map.addLayer(railmap);

		map.on('zoomend', function(e)
		{
			updateLegend("legend", MapCSS.availableStyles[0]);
			updatePermalink(MapCSS.availableStyles[0]);
			railmap.redraw();
		});

		if (params['style'] != null && styleValid(params['style']))
			setStyle(params['style']);
		else
			setStyle("standard");
	};
	MapCSS.preloadSpriteImage("standard", root+"styles/standard.png");
	MapCSS.preloadSpriteImage("signals", root+"styles/signals.png");
	MapCSS.preloadSpriteImage("maxspeed", root+"styles/maxspeed.png");

	// hillshading layer
	var hillshading = new L.TileLayer('http://toolserver.org/~cmarqu/hill/{z}/{x}/{y}.png',
	{
		attribution: translations['hillshadingAttribution'],
		maxZoom: 17
	});

	var baseLayers = new Object();
	baseLayers[translations['mapnik']] = mapnik;
	baseLayers[translations['mapnikGrayscale']] = mapnikGray;
	baseLayers[translations['mapquest']] = mapquest;
	baseLayers[translations['mapquestGrayscale']] = mapquestGray;
	baseLayers[translations['blank']] = blank;

	var overlays = new Object();
	overlays[translations['hillshading']] = hillshading;
	overlays[translations['railmap']] = railmap;

	var scaleLine = new L.Control.Scale({metric:true, maxWidth:200}).addTo(map);
	var layerSwitch = new L.Control.Layers(baseLayers, overlays).addTo(map);

	// only in not-embed mode
	if (!embed)
	{
		// loading timestamp
		var timestamp = new Timestamp("info");
		// create search
		search = new Search(map, "searchBox", "searchBar", "searchButton", "clearButton");
		// build style selection and it's event handling
		getStyleSelection();
		// setting start position
		startposition = new Startposition(map);
		// onclick event of locate button
		gEBI("locateButton").onclick = function()
		{
			startposition.setPosition();
		};
		// initialize the permalink url
		updatePermalink(MapCSS.availableStyles[0]);
	}
	else
	{
		// setting start position
		startposition = new Startposition(map);
	}
}


// changes the current map rendering style to the JS stylefile given as parameter
function setStyle(style)
{
	for (var i=0; i<MapCSS.availableStyles.length; i++)
		if (MapCSS.availableStyles[i] != style)
			railmap.disableStyle(MapCSS.availableStyles[i]);

	railmap.enableStyle(style);
	railmap.redraw();

	// mark selected item as checked
	var selectableItems = gEBI('styleSelectionBar').getElementsByTagName('input');
	for (var i=0; i<selectableItems.length; i++)
		if (selectableItems[i].value == style)
			var index = i;

	selectableItems[index].checked = true;
	updateLegend("legend", MapCSS.availableStyles[0]);
	updatePermalink(MapCSS.availableStyles[0]);
}


// build a radio-button list of available map styles
function getStyleSelection()
{
	gEBI('styleSelectionBar').innerHTML = '<form id="styleSelection"><b>'+translations['styleSelection']+':</b><br /><p>';
	for (var i=0; i<MapCSS.availableStyles.length; i++)
		gEBI('styleSelectionBar').innerHTML += '<label><input onchange="setStyle(this.value)" type="radio" name="style" value="'+MapCSS.availableStyles[i]+'">'+translations['style.'+MapCSS.availableStyles[i]]+'</label><br />';
	gEBI('styleSelectionBar').innerHTML += '</p></form>';
}


// returns true if the given stylename is a valid and available style; otherwise false is returned
function styleValid(style)
{
	for (var i=0; i<MapCSS.availableStyles.length; i++)
		if (MapCSS.availableStyles[i] == style)
			return true;

	return false;
}
















// TODO ### MOBILE MAP ###

// main function, creates map and layers, controls other functions
function createMap(embed)
{
	root = "http://www.openrailwaymap.org/";
	loading = "<img class='loading' src='"+root+"/img/loading.gif'><br>"+translations['loading'];
	// path to the bitmap tile directory
	tiledir = "http://{s}.tiles.openrailwaymap.org/";
	// available map rendering styles
	availableStyles = new Array("standard", "maxspeed", "signals");

	if (params['offset'] != null)
		offset = params['offset'];
	else
	{
		// get time offset to UTC
		var now = new Date();
		offset = -(now.getTimezoneOffset() / 60);
	}

	map = L.map('mapFrame');

	if (!embed)
	{
		map.on('moveend', function(e)
		{
			updatePermalink(railmap.selectedStyle);
		});
	}

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

	// railmap layer
	railmap = new L.TileLayer(tiledir+'standard/{z}/{x}/{y}.png',
	{
		attribution: translations['railmapAttribution'],
		minZoom: 2,
		maxZoom: 19,
		tileSize: 256
	}).addTo(map);

	if (!embed)
	{
		map.on('zoomend', function(e)
		{
			updateLegend("legend", railmap.selectedStyle);
			updatePermalink(railmap.selectedStyle);
		});
	}

	// hillshading layer
	var hillshading = new L.TileLayer('http://toolserver.org/~cmarqu/hill/{z}/{x}/{y}.png',
	{
		attribution: translations['hillshadingAttribution'],
		maxZoom: 17
	});

	var baseLayers = new Object();
	baseLayers[translations['mapnik']] = mapnik;
	baseLayers[translations['mapnikGrayscale']] = mapnikGray;
	baseLayers[translations['mapquest']] = mapquest;
	baseLayers[translations['mapquestGrayscale']] = mapquestGray;
	baseLayers[translations['blank']] = blank;

	var overlays = new Object();
	overlays[translations['hillshading']] = hillshading;
	overlays[translations['railmap']] = railmap;

	var scaleLine = new L.Control.Scale({metric:true, maxWidth:200}).addTo(map);
	var layerSwitch = new L.Control.Layers(baseLayers, overlays).addTo(map);

	// only in not-embed mode
	if (!embed)
	{
		if (gEBI("menuButton") != null)
			menu = new Mobilemenu("menu", "menuButton");

		// setting start position
		startposition = new Startposition(map);
		// loading timestamp
		var timestamp = new Timestamp("info");
		// create search
		search = new Search(map, "searchBox", "searchBar", "searchButton", "clearButton", menu);
		// build style selection and it's event handling
		getStyleSelection();
		// set rendering style
		if (params['style'] != null && styleValid(params['style']))
			setStyle(params['style']);
		else
			setStyle("standard");
		// onclick event of locate button
		gEBI("locateButton").onclick = function()
		{
			startposition.setPosition();
		};
		// initialize the permalink url
		updatePermalink(railmap.selectedStyle);
	}
	else
	{
		// setting start position
		startposition = new Startposition(map);
	}
}


// changes the current map rendering style to the style given as parameter
function setStyle(style)
{
	// helper variable for saving current map style
	railmap.selectedStyle = style;
	// change tileserver url to load different style
	railmap._url = tiledir+style+'/{z}/{x}/{y}.png';
	// reload all tiles after style was changed
	railmap.redraw();

	// mark selected item as checked
	var selectableItems = gEBI('styleSelectionBar').getElementsByTagName('div');
	for (var i=0; i<selectableItems.length; i++)
	{
		if (selectableItems[i].innerHTML == translations['style.'+style])
		{
			selectableItems[i].innerHTML = selectableItems[i].innerHTML+'<small>✓</small>';
			selectableItems[i].onclick = null;
		}
		else
		{
			selectableItems[i].innerHTML = selectableItems[i].innerHTML.replace("<small>✓</small>", "");
			selectableItems[i].onclick = Function("setStyle('"+selectableItems[i].getAttribute("value")+"')");
		}
	}

	updateLegend("legend", style);
	updatePermalink(railmap.selectedStyle);
}


// build a radio-button list of available map styles
function getStyleSelection()
{
	for (var i=0; i<availableStyles.length; i++)
		gEBI('styleSelectionBar').innerHTML += '<div class="resultEntry" onclick="setStyle(\''+availableStyles[i]+'\')" value="'+availableStyles[i]+'">'+translations['style.'+availableStyles[i]]+'</div>';
}


// returns true if the given stylename is a valid and available style; otherwise false is returned
function styleValid(style)
{
	for (var i=0; i<availableStyles.length; i++)
		if (availableStyles[i] == style)
			return true;

	return false;
}




























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
	var url = root+(window.location.pathname.substr(1));

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











function Timestamp(box)
{
	// requests the timestamp
	this.get = function()
	{
		var self = this;

		// make request of timestamp of last db update
		var handler = function(response)
			{
				self.show(response.responseText);
			}
		requestApi("timestamp", "format=text&offset="+offset+"&lang="+params['lang'], handler);
    }

	// shows the requested timestamp
	this.show = function(response)
	{
		if ((response.length > 0) && (response != "NULL"))
			this.box.innerHTML = translations['update']+":<br />"+response;
	}


	this.box = gEBI(box);

	// update timestamp of last database update
	this.get();

	var self = this;
	var command = function()
		{
			self.get();
		}
	// update timestamp every minute
	timer = setInterval(command, 60000);
}


















// set start position by given coordinate or, if possible, by geolocation api
function Startposition(map)
{
	// set position by user's ip address
	this.setPositionByIp = function()
	{
		var self = this;
		var handler = function(request)
		{
			var response = request.responseText;
			// extract coordinates and show position
			if ((response.length > 0) && (response != "NULL"))
			{
				response = response.split(",");
				self.map.setView(new L.LatLng(response[0], response[1]), 10);
			}
			else
			{
				// position to zoom on if no permalink is given and geolocation isn't supported
				var lat = 51.58248;
				var lon = 15.6501;
				var zoom = 3;
				this.map.setView(new L.LatLng(lat, lon), zoom);
			}
		}

		requestApi("ippos", "", handler);
	}


	// set position by geolocation api
	this.geolocate = function()
	{
		// if geolocation is available
		if (navigator.geolocation)
			this.map.locate({timeout: 3000, enableHighAccuracy: true, setView: true});
	}


	// locating by ip or fixed latlon
	this.setPosition = function()
	{
				// position to zoom on if no permalink is given and geolocation isn't supported
				var lat = 51.58248;
				var lon = 15.6501;
				var zoom = 3;
				this.map.setView(new L.LatLng(lat, lon), zoom);

		this.setPositionByIp();
		this.geolocate();
	}


	this.map = map;

	// set position if params are set
	var self = this;
	var handler = function(request)
	{
		if ((request.responseText.length > 0) && (request.responseText != "NULL"))
		{
			var results = JSON.parse(request.responseText);
			self.map.setView(new L.LatLng(results[0]['lon'], results[0]['lat']), 16);
		}
		else
			self.setPosition();
	};
	// permalink given
	if (params['lat'] && params['lon'])
	{
		if (!params['zoom'])
			params['zoom'] = 17;
		this.map.setView(new L.LatLng(params['lat'], params['lon']), params['zoom']);
	}
	// milestone given
	else if (params['position'] && params['line'])
	{
		if (params['operator'] != null)
			requestApi("milestone", "position="+params['position']+"&line="+params['line']+"&operator="+params['operator'], handler);
		else
			requestApi("milestone", "position="+params['position']+"&line="+params['line'], handler);
	}
	// facility name given
	else if (params['name'])
	{
		if (params['operator'] != null)
			requestApi("facilityinfo", "name="+params['name']+"&operator="+params['operator'], handler);
		else
			requestApi("facilityinfo", "name="+params['name'], handler);
	}
	// facility ref given
	else if (params['ref'])
	{
		if (params['operator'] != null)
			requestApi("facilityinfo", "ref="+params['ref']+"&operator="+params['operator'], handler);
		else
			requestApi("facilityinfo", "ref="+params['ref'], handler);
	}
	// no permalink
	else
		this.setPosition();
}
























/*
OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
This program comes with ABSOLUTELY NO WARRANTY.
This is free software, and you are welcome to redistribute it under certain conditions.
See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.
*/


function Search(map, box, bar, searchButton, clearButton, mobilemenu)
{
	// clears the visible parts of a search
	this.clear = function()
	{
		this.box.value = "";
		this.reset();
		this.bar.className = "infoBarOut";
		this.box.focus();
		this.marker.setOpacity(0);
    }

	// resets all parameters for a new search
    this.reset = function()
    {
    	this.bar.innerHTML = "";
		//TODO this.layer.removeAllFeatures();
    }

	// sends a search request
	this.send = function()
	{
		var input = this.box.value;

		// if nothing was entered
		if (input.length == 0)
		{
			this.bar.innerHTML = "<div id=\"errorResults\"><center><b>"+translations['empty']+"</b></center></div>";
			this.bar.className = "infoBar";
			var bar = this.bar.id;
			setTimeout("gEBI('"+bar+"').innerHTML = ''; gEBI('"+bar+"').className = 'infoBarOut';", 3500);
			//TODO this.layer.removeAllFeatures();
			return false;
		}

		// if a new string was entered or other search type
		if (input != this.request)
		{
			this.reset();
			// show search results box
			this.bar.className = "infoBar";
			// show that search results are loaded
			this.bar.innerHTML += "<div class=\"loadingMoreInfo\">"+loading+"</div>";
			this.request = input;

			this.sendRequest("facility", "uicref="+input, function(response)
			{
				self.showResults(response);
				self.sendRequest("facility", "ref="+input, function(response)
				{
					self.showResults(response);
					self.sendRequest("facility", "name="+input, function(response)
					{
						var words = input.split(" ");
						for (var i=0; i<words.length; i++)
						{
							if (words[i].indexOf(",") > 0 || words[i].indexOf(".") > 0)
							{
								var pos = words[i];
								words.splice(i, 1);
								break;
							}
						}
						var ref = words.join(" ");

						if (pos)
						{
							self.sendRequest("milestone", "position="+pos+"&ref="+ref, function(response)
							{
								self.finishResults(response);
							});
						}
						else
							self.finishResults(response);
					});
				});
			});
		}
	}

	// shows the returned search results
	this.showResults = function(response)
    {
    	if (!response)
    		return false;

		var results = JSON.parse(response.responseText);
		if (results.length > 0)
		{
			this.bar.removeChild(this.bar.lastChild);
			this.bar.className = 'infoBar';
			for (var i=0; i<results.length; i++)
			{
				var result = document.createElement("div");
				if (results[i]['type'] == "milestone")
					result.innerHTML = '<b>'+translations['kilometer']+' '+results[i]['position']+', '+translations['track']+' '+results[i]['ref']+'</b>';
				else if (results[i]['type'] == "level_crossing")
					result.innerHTML = '<b>'+translations['level_crossing']+' '+results[i]['position']+', '+translations['track']+' '+results[i]['ref']+'</b>';
				else
					result.innerHTML = '<b>'+results[i]['name']+'</b>';

				if (results[i]['type'] != null && typeof results[i]['type'] != undefined)
					result.innerHTML += '&nbsp;'+translations[results[i]['type']];
				if (results[i]['operator'] != null && typeof results[i]['operator'] != undefined)
					result.innerHTML += '<br /><dfn>'+results[i]['operator']+'</dfn>';

				selfSearch = this;
				result.setAttribute('class', 'resultEntry');
				result.onclick = new Function("selfSearch.showResult("+results[i]['lon']+", "+results[i]['lat']+");");

				this.bar.appendChild(result);
			}

			var loadingIndicator = document.createElement("div");
			loadingIndicator.setAttribute('class', 'loadingMoreInfo');
			loadingIndicator.innerHTML = loading;
			this.bar.appendChild(loadingIndicator);
		}
    }

	// finishes adding more results to the result list
	this.finishResults = function(response)
    {
		this.showResults(response);
		this.bar.removeChild(this.bar.lastChild);

		// if no results were found
		if (this.bar.innerHTML.length == 0)
		{
			var bar = this.bar.id;

			this.bar.innerHTML = "<div id=\"errorResults\"><center><b>"+translations['nothing']+"</b></center></div>";

			var self = this;
			var removeErrorMessage = function()
			{
				// avoid deleting search results when a new search was performed before timeout was released
				if (self.bar.getElementsByClassName("resultEntry").length == 0)
				{
					self.bar.innerHTML = '';
					self.bar.className = 'infoBarOut';
				}
			}
			setTimeout(removeErrorMessage, 3500);
			this.bar.className = "infoBar";
		}
    }

	// called when clicking on a search results, jumps to point and draws something on the map
	this.showResult = function(lat, lon)
	{
		this.map.setView(new L.LatLng(lat, lon), 14);
		// hide menu in mobile mode
		if (this.mobilemenu != null)
			this.mobilemenu.hide();

		this.marker.setLatLng([lat, lon]);
		this.marker.setOpacity(1);
	}

	// perform a synchron API request
	this.sendRequest = function(requestType, query, handler)
	{
		if (window.XMLHttpRequest)
			var request = new window.XMLHttpRequest;
		else
			var request = new ActiveXObject("MSXML2.XMLHTTP.3.0");

		request.open("GET", 'http://api.openrailwaymap.org/'+requestType+'?'+query.replace(/ /g, "+"), true);
		request.onreadystatechange = function()
		{
			if (request.readyState === 4)
			{
				if (request.status === 200)
					handler(request);
				else
					handler(false);
			}
		};
		request.send(null);
	}


	this.map = map;
	this.layer = null;
	this.box = gEBI(box);
	this.searchButton = gEBI(searchButton);
	this.clearButton = gEBI(clearButton);
	this.bar = gEBI(bar);
	this.request = "";
	this.mobilemenu = mobilemenu || null;
	this.marker = L.marker([0, 0], {opacity: 0, clickable: false}).addTo(this.map);

	var self = this;
	this.searchButton.onclick = function()
		{
			self.send();
		};
	this.clearButton.onclick = function()
		{
			self.clear();
		};

	this.box.focus();

	// set up key event
	this.box.onkeydown =
		function(event)
		{
			if (!event)
				event = window.event;
			if (event.which)
				var keyCode = event.which;
			else if (event.keyCode)
				var keyCode = event.keyCode;
			if (event && keyCode == 13)
				self.send();
		};

	// perform search request if search parameter is set
	if (params['searchquery'])
	{
		this.box.value = params['searchquery'];
		this.send();
	}
}
























window.onload = function()
{

}

$(document).ready();
