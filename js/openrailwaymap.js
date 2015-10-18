/*
OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
This program comes with ABSOLUTELY NO WARRANTY.
This is free software, and you are welcome to redistribute it under certain conditions.
See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.
*/


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

// perform a synchron API request
function requestAPI(requestType, query, handler)
{
	$.ajax(
	{
		crossDomain: true,
		type: 'GET',
		url: 'http://api.openrailwaymap.org/'+requestType+'?'+query.replace(/ /g, "+"),
		dataType: 'json',
		success: function(response) { handler(response); },
		error: function(error) { console.log('Error: '+error); handler(false); }
	});
}

// performs a search request
function searchRequest(input)
{
	//TODO
	//this.layer.removeAllFeatures();
	//this.marker.setOpacity(0);

	if (input.length == 0)
	{
		$('#searchResults').html('<li class="uk-nav-header uk-skip">Suchergebnisse</li>');
		$('#searchResults').append('<li>Empty input</li>');
		$('#searchForm').addClass('uk-open uk-active');
		setTimeout(function() {
			$('#searchForm').removeClass('uk-open uk-active');
		}, 3500);
		//TODO
		//this.layer.removeAllFeatures();
		return false;
	}

	$('#searchResults').html('<li class="uk-nav-header uk-skip">Suchergebnisse</li>');
	$('#searchResults').append('<li>Loading</li>');
	$('#searchForm').addClass('uk-open uk-active');
	setTimeout(function() {
		$('#searchForm').removeClass('uk-active');
	}, 500);

	// TODO
	//requestAPI('search', 'q='+input+'&extended=0', function(response)
	requestAPI('facility', 'ref='+input, function(response)
	{
		$('#searchResults').html('<li class="uk-nav-header uk-skip">Suchergebnisse</li>');

		if (response && response.length > 0)
		{
			for (var i=0; i < response.length; i++)
			{
				$('#searchResults').append('<li class="uk-nav-divider uk-skip"></li>');

				if (response[i]['type'] == "milestone")
				{
					var title = translations['kilometer']+' '+response[i]['position']+', '+translations['track']+' '+response[i]['ref'];
					var description = translations['kilometer']+' '+response[i]['position']+', '+translations['track']+' '+response[i]['ref'];
				}
				else if (response[i]['type'] == "level_crossing")
				{
					var title = translations['level_crossing']+' '+response[i]['position']+', '+translations['track']+' '+response[i]['ref'];
					var description = translations['level_crossing']+' '+response[i]['position']+', '+translations['track']+' '+response[i]['ref'];
				}
				else
				{
					var title = response[i]['name'];
					var description = response[i]['name'];
				}

				// TODO operator

				$('#searchResults').append('<li data-id="'+response[i]['id']+'" data-lat="'+response[i]['lat']+'" data-lon="'+response[i]['lon']+'" class="searchItem"><a href="#">'+title+'<div>'+description+'</div></a></li>');
			}

			//TODO oder automatisch
			$('#searchResults').append('<li class="uk-nav-divider uk-skip"></li>');
			$('#searchResults').append('<li class="uk-search-moreresults" data-moreresults="true"><a href="#" onclick="" id="searchMoreResults">Weitere Ergebnisse</a></li>');

			$(".searchItem").on("click", function()
			{
				var lat = $(this).data('lat');
				var lon = $(this).data('lon');
				// TODO
				//map.setView(new L.LatLng(lat, lon), 14);
				//this.marker.setLatLng([lat, lon]);
				//this.marker.setOpacity(1);
			});
		}
		else
		{
			$('#searchResults').html('<li class="uk-nav-header uk-skip">Suchergebnisse</li>');
			$('#searchResults').append('<li>Nothing found</li>');
			$('#searchForm').addClass('uk-open uk-active');
			setTimeout(function() {
				$('#searchForm').removeClass('uk-open uk-active');
			}, 3500);
			//TODO
			//this.layer.removeAllFeatures();
			return false;
		}
	});
}

// changes the current map rendering style to the style given as parameter
function setStyle(style)
{
	/*
	for (var i=0; i<MapCSS.availableStyles.length; i++)
		if (MapCSS.availableStyles[i] != style)
			railmap.disableStyle(MapCSS.availableStyles[i]);

	railmap.enableStyle(style);
	railmap.redraw();
	*/

	// helper variable for saving current map style
	railmap.selectedStyle = style;
	// change tileserver url to load different style
	railmap._url = tiledir+style+'/{z}/{x}/{y}.png';
	// reload all tiles after style was changed
	railmap.redraw();

	/*
	updateLegend("legend", style || MapCSS.availableStyles[0]);
	*/
	map.updatePermalink();

	// mark selected item as checked
	$('.styleSelector').each(function(index, element)
	{
		if ($(this).data('id') == style)
			$(this).children().addClass('uk-icon-check');
		else
			$(this).children().removeClass('uk-icon-check');
	});
}

// updates map's center
function updateMap()
{
	map.setView(map.getCenter(), map.getZoom());
}

function zoomPrecision(zoom)
{
	return Math.max(0, Math.ceil(Math.log(zoom) / Math.LN2));
}

L.Map.ORM = L.Map.extend(
{
	getLayer: function()
	{
		for (var i in this._layers)
		{
			var layer = this._layers[i];
			if (layer.options && layer.options.code)
				return layer.options.code;
		}
	},

	getStyle: function()
	{
		for (var i in this._layers)
		{
			var layer = this._layers[i];
			if (layer.selectedStyle)
				return layer.selectedStyle;
		}
	},

	getUrl: function(marker)
	{
		var center = this.getCenter();
		var zoom = this.getZoom();
		var layer = this.getLayer();
		var style = this.getStyle();

		center = center.wrap();

		var precision = zoomPrecision(zoom);

		return 'http://www.openrailwaymap.org/beta#zoom='+zoom+'&lat='+center.lat.toFixed(precision)+'&lon='+center.lng.toFixed(precision)+'&layers='+layer+'&style='+style;
	},

	updatePermalink: function()
	{
		history.replaceState(null, "openrailwaymap", this.getUrl());
	}
});

$(document).ready(function()
{
	var params = {};

	// TODO in config auslagern
	root = 'http://www.openrailwaymap.org/';
	tiledir = 'http://{s}.tiles.openrailwaymap.org/';
	availableStyles = new Array('standard', 'maxspeed', 'signals');

	/*
	if (params['offset'] != null)
		offset = params['offset'];
	else
	{
		// get time offset to UTC
		var now = new Date();
		offset = -(now.getTimezoneOffset() / 60);
	}
	*/
	
	$(".styleSelector").on("click", function()
	{
		setStyle($(this).data('id'));
	});

	map = new L.Map.ORM('mapContainer');
	var lat = 51.58248;
	var lon = 15.6501;
	var zoom = 7;
	map.setView(new L.LatLng(lat, lon), zoom);
	history.pushState(null, 'openrailwaymap', map.getUrl());

	// setting start position
	//startposition = new Startposition(map);
	// loading timestamp
	//var timestamp = new Timestamp("info");
	// create search
	//search = new Search(map, "searchBox", "searchBar", "searchButton", "clearButton");

	// grayscale mapnik background layer
	var mapnikGray = new L.TileLayer.Grayscale('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
	{
		attribution: translations['mapnikAttribution'],
		maxZoom: 19,
		code: 'mapnikgray'
	}).addTo(map);

	// normal mapnik background layer
	var mapnik = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
	{
		attribution: translations['mapnikAttribution'],
		maxZoom: 19,
		code: 'mapnik'
	});

	// grayscale MapQuest background layer
	var mapquestGray = new L.TileLayer.Grayscale('http://otile1.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png',
	{
		attribution: translations['mapquestAttribution'],
		maxZoom: 18,
		code: 'mapquestgray'
	});

	// normal MapQuest background layer
	var mapquest = new L.TileLayer('http://otile1.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png',
	{
		attribution: translations['mapquestAttribution'],
		maxZoom: 18,
		code: 'mapquest'
	});

	// blank background map
	var blank = new L.TileLayer(root+'/img/blank.png',
	{
		maxZoom: 20,
		code: 'blank'
	});

	// TODO var
	railmap = new L.TileLayer(tiledir+'standard/{z}/{x}/{y}.png',
	{
		attribution: translations['railmapAttribution'],
		minZoom: 2,
		maxZoom: 19,
		tileSize: 256
	}).addTo(map);

	/*map.on('zoomend', function(e)
	{
		updateLegend("legend", railmap.selectedStyle);
	});*/

	var hillshading = new L.TileLayer('http://toolserver.org/~cmarqu/hill/{z}/{x}/{y}.png',
	{
		attribution: translations['hillshadingAttribution'],
		maxZoom: 17
	});

	var baseLayers = {
		[translations['mapnik']]: mapnik,
		[translations['mapnikGrayscale']]: mapnikGray,
		[translations['mapquest']]: mapquest,
		[translations['mapquestGrayscale']]: mapquestGray,
		[translations['blank']]: blank
	};

	var overlays = {
		[translations['hillshading']]: hillshading,
		[translations['railmap']]: railmap
	};

	if (params['style'] != null && availableStyles.indexOf(params['style']) >= 0)
		setStyle(params['style']);
	else
		setStyle('standard');

	var scaleLine = new L.Control.Scale({metric: true, maxWidth: 200}).addTo(map);
	var layerSwitch = new L.Control.Layers(baseLayers, overlays);
	map.addControl(layerSwitch);

	// TODO zoomstart zoomend zoomlevelschange resize layeradd layerremove baselayerchange overlayadd overlayremove
	map.on('moveend', function(e)
	{
		map.updatePermalink();
	});

	// onclick event of locate button
	$('#locateButton').on('click', function()
	{
		startposition.setPosition();
	});

	$('#searchButton').on('click', function()
	{
		searchRequest($('#searchInput').val());
	});

	$(document).keypress(function(e)
	{
		if (e.which == 13)
			searchRequest($('#searchInput').val());
	});
});
