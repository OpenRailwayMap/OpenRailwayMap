/*
OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
This program comes with ABSOLUTELY NO WARRANTY.
This is free software, and you are welcome to redistribute it under certain conditions.
See https://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.
*/


window.openrailwaymap = {
	'root': params['urlbase'],
	'apiUrl': 'https://api.openrailwaymap.org/',
	'tiledir': 'https://tiles.openrailwaymap.org/vector/',
	'availableStyles': {
		"standard": "Infrastructure",
		"maxspeed": "Maxspeeds",
		"signals": "Signalling",
		"electrification": "Electrification"
	},
	'availableTranslations': {
		"ca": "ca_ES",
		"cs": "cs_CZ",
		"da": "da_DK",
		"de": "de_DE",
		"el": "el_GR",
		"en": "en_GB",
		"es": "es_ES",
		"fi": "fi_FI",
		"fr": "fr_FR",
		"hu": "hu_HU",
		"ja": "ja_JP",
		"lt": "lt_LT",
		"nl": "nl_NL",
		"nqo": "nqo_GN",
		"pl": "pl_PL",
		"pt": "pt_PT",
		"ru": "ru_RU",
		"sl": "sl_SI",
		"sv": "sv_SE",
		"tr": "tr_TR",
		"uk": "uk_UA",
		"vi": "vi_VN",
		"zh": "zh_TW"
	}
};

// main function, creates map and layers, controls other functions
function createMap(embed)
{
	getRequest(window.openrailwaymap.root + "/locales/" + getUserLang() + "/LC_MESSAGES/messages.json", function(response)
	{
		window.openrailwaymap.translations = JSON.parse(response);

		if (params['offset'] != null)
			offset = params['offset'];
		else
		{
			// get time offset to UTC
			var now = new Date();
			offset = -(now.getTimezoneOffset() / 60);
		}

		map = L.map('mapFrame', { editInOSMControlOptions: { zoomThreshold: 14, editors: [ 'josm' ] }, });

		map.on('moveend', function(e)
		{
			updatePermalink(MapCSS.availableStyles[0]);
		});

		// railmap layer
		railmap = new L.TileLayer.Kothic(window.openrailwaymap.tiledir+'{z}/{x}/{y}.json',
		{
			attribution: _("Rendering: OpenRailwayMap"),
			minZoom: 2,
			maxZoom: 19
		});

		MapCSS.preloadSpriteImage("standard", window.openrailwaymap.root+"styles/standard.png");
		MapCSS.preloadSpriteImage("signals", window.openrailwaymap.root+"styles/signals.png");
		MapCSS.preloadSpriteImage("maxspeed", window.openrailwaymap.root+"styles/maxspeed.png");
		MapCSS.preloadSpriteImage("electrification", window.openrailwaymap.root+"styles/electrification.png");

		setupControls();

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
	});
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
	gEBI('styleSelectionBar').innerHTML = '<form id="styleSelection"><b>'+_("Select a map style")+':</b><br /><p>';
	for (var i=0; i<MapCSS.availableStyles.length; i++)
		gEBI('styleSelectionBar').innerHTML += '<label><input onchange="setStyle(this.value)" type="radio" name="style" value="'+MapCSS.availableStyles[i]+'">'+_(window.openrailwaymap.availableStyles[MapCSS.availableStyles[i]])+'</label><br />';
	gEBI('styleSelectionBar').innerHTML += '</p></form>';
}


// returns true if the given stylename is a valid and available style; otherwise false is returned
function styleValid(style)
{
	return (MapCSS.availableStyles.indexOf(style) >= 0);
}
