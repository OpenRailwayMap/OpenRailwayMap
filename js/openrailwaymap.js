/*
OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
This program comes with ABSOLUTELY NO WARRANTY.
This is free software, and you are welcome to redistribute it under certain conditions.
See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.
*/


OpenRailwayMap = function(config)
{
	var self = this;
	this._appName = config['appName'];
	this._mapContainerId = config['mapContainerId'];
	this._lat = config['lat'];
	this._lon = config['lon'];
	this._zoom = config['zoom'];
	this._tileUrl = config['tileUrl'];
	this._root = config['root'];
	this._apiUrl = config['apiUrl'];
	this._availableStyles = config['availableStyles'];

	this._map = new L.Map(this._mapContainerId);

	// setting start position
	//startposition = new Startposition(map);
	// loading timestamp
	//var timestamp = new Timestamp("info");
	// create search
	//search = new Search(map, "searchBox", "searchBar", "searchButton", "clearButton");

	this._railmap = new L.TileLayer(this._tileUrl+this._availableStyles[0]+'/{z}/{x}/{y}.png',
	{
		attribution: translations['railmapAttribution'],
		minZoom: 2,
		maxZoom: 19,
		tileSize: 256
	}).addTo(this._map);

	// grayscale mapnik background layer
	this._mapnikGray = new L.TileLayer.Grayscale('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
	{
		attribution: translations['mapnikAttribution'],
		maxZoom: 19,
		code: 'mapnikgray'
	}).addTo(this._map);

	// normal mapnik background layer
	this._mapnik = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
	{
		attribution: translations['mapnikAttribution'],
		maxZoom: 19,
		code: 'mapnik'
	});

	// grayscale MapQuest background layer
	this._mapquestGray = new L.TileLayer.Grayscale('http://otile1.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png',
	{
		attribution: translations['mapquestAttribution'],
		maxZoom: 18,
		code: 'mapquestgray'
	});

	// normal MapQuest background layer
	this._mapquest = new L.TileLayer('http://otile1.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png',
	{
		attribution: translations['mapquestAttribution'],
		maxZoom: 18,
		code: 'mapquest'
	});

	// blank background map
	this._blank = new L.TileLayer(this._root+'/img/blank.png',
	{
		maxZoom: 20,
		code: 'blank'
	});

	this._hillshading = new L.TileLayer('http://{s}.tiles.wmflabs.org/hillshading/{z}/{x}/{y}.png',
	{
		attribution: translations['hillshadingAttribution'],
		maxZoom: 17
	});

	this._baseLayers = {
		[translations['mapnik']]: this._mapnik,
		[translations['mapnikGrayscale']]: this._mapnikGray,
		[translations['mapquest']]: this._mapquest,
		[translations['mapquestGrayscale']]: this._mapquestGray,
		[translations['blank']]: this._blank
	};

	this._overlays = {
		[translations['hillshading']]: this._hillshading,
		[translations['railmap']]: this._railmap
	};

	var scaleLine = new L.Control.Scale({metric: true, maxWidth: 200}).addTo(this._map);
	var layerSwitch = new L.Control.Layers(this._baseLayers, this._overlays);
	this._map.addControl(layerSwitch);

	this._map.setView(new L.LatLng(this._lat, this._lon), this._zoom);
	history.pushState(null, this._appName, this.getUrl());
	this.setStyle(this._availableStyles[0]);

	/*this._map.on('zoomend', function(e)
	{
		updateLegend("legend", railmap.selectedStyle);
	});*/

	// TODO layeradd layerremove baselayerchange overlayadd overlayremove
	this._map.on('moveend', function(e)
	{
		self.updatePermalink();
	});

	$('#searchFacilityButton').on('click', function()
	{
		// TODO validate params

		var params = {};

		if ($('#facilityNameInput').val().length > 0)
			params['name'] = $('#facilityNameInput').val();
		else if ($('#facilityRefInput').val().length > 0)
			params['ref'] = $('#facilityRefInput').val();
		else if ($('#facilityUICrefInput').val().length > 0)
			params['uicref'] = $('#facilityUICrefInput').val();

		if ($('#facilityOperatorInput').val().length > 0)
			params['operator'] = $('#facilityOperatorInput').val();

		$.ajax(
		{
			context: this,
			dataType: 'json',
			data: params, 
			url: self._apiUrl+'facility',
			type: 'GET'
		})
		.done(function(data)
		{
			for (var charge in data)
			{
				console.log(data[charge]);
			}
		})
		.fail(function(jqXHR, status)
		{
			// TODO Laden fehlgeschlagen
		});
	});

	$('#searchMilestoneButton').on('click', function()
	{
		// TODO validate params

		var params = {};

		if ($('#milestoneRefInput').val().length > 0)
			params['ref'] = $('#milestoneRefInput').val();
		if ($('#milestonePositionInput').val().length > 0)
			params['position'] = $('#milestonePositionInput').val();
		if ($('#milestoneOperatorInput').val().length > 0)
			params['operator'] = $('#milestoneOperatorInput').val();

		$.ajax(
		{
			context: this,
			dataType: 'json',
			data: params, 
			url: self._apiUrl+'milestone',
			type: 'GET'
		})
		.done(function(data)
		{
			for (var charge in data)
			{
				console.log(data[charge]);
			}
		})
		.fail(function(jqXHR, status)
		{
			// TODO Laden fehlgeschlagen
		});
	});
};


OpenRailwayMap.prototype =
{
	setStyle: function(style)
	{
		$('.styleSelector').each(function(index, element)
		{
			if ($(this).data('id') == style)
				$(this).children().addClass('uk-icon-check');
			else
				$(this).children().removeClass('uk-icon-check');
		});

		/*
		for (var i=0; i<MapCSS.availableStyles.length; i++)
			if (MapCSS.availableStyles[i] != style)
				railmap.disableStyle(MapCSS.availableStyles[i]);

		railmap.enableStyle(style);
		railmap.redraw();
		*/

		// helper variable for saving current map style
		this._railmap.selectedStyle = style;
		// change tileserver url to load different style
		this._railmap._url = this._tileUrl+style+'/{z}/{x}/{y}.png';
		// reload all tiles after style was changed
		this._railmap.redraw();

		//updateLegend("legend", style || MapCSS.availableStyles[0]);
		this.updatePermalink();
	},

	getUrl: function(marker)
	{
		var center = this._map.getCenter();
		var zoom = this._map.getZoom();
		var style = this._railmap.selectedStyle;

		for (var i in this._map._layers)
		{
			var layer = this._map._layers[i];
			if (layer.options && layer.options.code)
				var layerName = layer.options.code;
		}

		center = center.wrap();

		var precision = Math.max(0, Math.ceil(Math.log(zoom) / Math.LN2));

		// TODO save lang, osmid, osmtype, searchquery, ref, name, position, line
		return this._root+'#zoom='+zoom+'&lat='+center.lat.toFixed(precision)+'&lon='+center.lng.toFixed(precision)+'&layers='+layerName+'&style='+style;
	},

	updatePermalink: function()
	{
		history.replaceState(null, this._appName, this.getUrl());
	}
};
