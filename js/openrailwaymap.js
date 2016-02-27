/*
OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
This program comes with ABSOLUTELY NO WARRANTY.
This is free software, and you are welcome to redistribute it under certain conditions.
See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.
*/


OpenRailwayMap = function(config)
{
	var self = this;
	this.appName = config['appName'];
	this.mapContainerId = config['mapContainerId'];
	this.lat = config['lat'];
	this.lon = config['lon'];
	this.zoom = config['zoom'];
	this.tileUrl = config['tileUrl'];
	this.apiUrl = config['apiUrl'];
	this.availableStyles = config['availableStyles'];
	this.availableTranslations = config['availableTranslations'];
	this.lang = null;
	this.language = null;

	// translate website to user language
	this.lang = this.getUserLang();
	this.translate();

	// language selector
	$('ul.langSelection').on('click', 'a', function()
	{
		self.lang = $(this).data('lang');
		self.translate();
	});

	this.map = new L.Map(this.mapContainerId);

	// setting start position
	//startposition = new Startposition(map);
	// loading timestamp
	//var timestamp = new Timestamp("info");
	// create search
	//search = new Search(map, "searchBox", "searchBar", "searchButton", "clearButton");

	this.railmap = new L.TileLayer(this.tileUrl+this.availableStyles[0]+'/{z}/{x}/{y}.png',
	{
		attribution: translations['railmapAttribution'],
		minZoom: 2,
		maxZoom: 19,
		tileSize: 256
	}).addTo(this.map);

	// grayscale mapnik background layer
	this.mapnikGray = new L.TileLayer.Grayscale('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
	{
		attribution: translations['mapnikAttribution'],
		maxZoom: 19,
		code: 'mapnikgray'
	}).addTo(this.map);

	// normal mapnik background layer
	this.mapnik = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
	{
		attribution: translations['mapnikAttribution'],
		maxZoom: 19,
		code: 'mapnik'
	});

	// grayscale MapQuest background layer
	this.mapquestGray = new L.TileLayer.Grayscale('http://otile1.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png',
	{
		attribution: translations['mapquestAttribution'],
		maxZoom: 18,
		code: 'mapquestgray'
	});

	// normal MapQuest background layer
	this.mapquest = new L.TileLayer('http://otile1.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png',
	{
		attribution: translations['mapquestAttribution'],
		maxZoom: 18,
		code: 'mapquest'
	});

	// blank background map
	this.blank = new L.TileLayer(window.location.origin + window.location.pathname +'/img/blank.png',
	{
		maxZoom: 20,
		code: 'blank'
	});

	this.hillshading = new L.TileLayer('http://{s}.tiles.wmflabs.org/hillshading/{z}/{x}/{y}.png',
	{
		attribution: translations['hillshadingAttribution'],
		maxZoom: 17
	});

	this.baseLayers = {
		[translations['mapnik']]: this.mapnik,
		[translations['mapnikGrayscale']]: this.mapnikGray,
		[translations['mapquest']]: this.mapquest,
		[translations['mapquestGrayscale']]: this.mapquestGray,
		[translations['blank']]: this.blank
	};

	this.overlays = {
		[translations['hillshading']]: this.hillshading,
		[translations['railmap']]: this.railmap
	};

	var scaleLine = new L.Control.Scale({metric: true, maxWidth: 200}).addTo(this.map);
	var layerSwitch = new L.Control.Layers(this.baseLayers, this.overlays);
	this.map.addControl(layerSwitch);

	this.map.setView(new L.LatLng(this.lat, this.lon), this.zoom);
	history.pushState(null, this.appName, this.getUrl());
	this.setStyle(this.availableStyles[0]);

	/*this.map.on('zoomend', function(e)
	{
		updateLegend("legend", railmap.selectedStyle);
	});*/

	// TODO layeradd layerremove baselayerchange overlayadd overlayremove
	this.map.on('moveend', function(e)
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
			url: self.apiUrl+'facility',
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
			url: self.apiUrl+'milestone',
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
				$($(this).children()[1]).addClass('uk-icon-check');
			else
				$($(this).children()[1]).removeClass('uk-icon-check');
		});

		/*
		for (var i=0; i<MapCSS.availableStyles.length; i++)
			if (MapCSS.availableStyles[i] != style)
				railmap.disableStyle(MapCSS.availableStyles[i]);

		railmap.enableStyle(style);
		railmap.redraw();
		*/

		// helper variable for saving current map style
		this.railmap.selectedStyle = style;
		// change tileserver url to load different style
		this.railmap._url = this.tileUrl+style+'/{z}/{x}/{y}.png';
		// reload all tiles after style was changed
		this.railmap.redraw();

		//updateLegend("legend", style || MapCSS.availableStyles[0]);
		this.updatePermalink();
	},

	getUrl: function(marker)
	{
		var center = this.map.getCenter();
		var zoom = this.map.getZoom();
		var style = this.railmap.selectedStyle;

		for (var i in this.map._layers)
		{
			var layer = this.map._layers[i];
			if (layer.options && layer.options.code)
				var layerName = layer.options.code;
		}

		center = center.wrap();

		var precision = Math.max(0, Math.ceil(Math.log(zoom) / Math.LN2));

		// TODO save osmid, osmtype, searchquery, ref, name, position, line
		var baseUrl = window.location.origin + window.location.pathname;
		return baseUrl+'#zoom='+zoom+'&lat='+center.lat.toFixed(precision)+'&lon='+center.lng.toFixed(precision)+'&layers='+layerName+'&style='+style;
	},

	updatePermalink: function()
	{
		history.replaceState(null, this.appName, this.getUrl());
	},

	translate: function()
	{
		var self = this;
		var baseurl = window.location.origin + window.location.pathname.replace('index.html', '');

		$.getJSON(baseurl + 'locales/'+this.lang+'.json')
		.done(function(data)
		{
			self.language = data;
			self.replaceStringsByTranslations();

			$('ul.langSelection a i').removeClass('uk-icon-check');
			$('ul.langSelection a').each(function(index, element)
			{
				if ($(this).data('lang') == self.lang)
					$($(this).children()[0]).addClass('uk-icon-check');
					return;
			});
		})
		.fail(function(jqXHR, status)
		{
			alert('Website translation failed');
		});
	},

	replaceStringsByTranslations: function()
	{
		var stringsToTranslate = $("[data-i18n]");

		for (var i=0; i<stringsToTranslate.length; i++)
		{
			var originalText = $(stringsToTranslate[i]).data('i18n');
			var translatedText = this.translateString(originalText);
			stringsToTranslate[i].innerHTML = translatedText;
		}
	},

	translateString: function(text, n)
	{
		var translation = this.language.translations[text];

		if (!n && typeof translation == 'object')
			return translation[0];

		if (n && typeof translation == 'object')
		{
			var plural = eval(this.language.plural.replace('n', n));
			// avoid array index overflow
			plural = Math.min(plural, this.language.nplurals);
			return translation[plural].replace('%d', n);
		}

		if (typeof translation != 'undefined' && translation.length > 0)
			return translation;

		return text;
	},

	getUserLang: function()
	{
		var lang = navigator.language || navigator.userLanguage || 'en-GB';
		var languages = navigator.languages || [lang];

		for (var i=0; i<navigator.languages.length; i++)
		{
			// lang-country combination as first choice
			var langcountrycode = navigator.languages[i].replace('-', '_');
			for (var key in this.availableTranslations)
				if (this.availableTranslations.hasOwnProperty(key) && this.availableTranslations[key] === langcountrycode)
					return langcountrycode;

			// only lang as second choice
			var langcode = langcountrycode.split('_')[0];
			if (this.availableTranslations.hasOwnProperty(langcode))
				return this.availableTranslations[langcode];
		}

		return 'en_GB';
	}
};
