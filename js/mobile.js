/*
OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
This program comes with ABSOLUTELY NO WARRANTY.
This is free software, and you are welcome to redistribute it under certain conditions.
See https://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.
*/


window.openrailwaymap = {
	'root': params['urlbase'],
	'apiUrl': 'https://api.openrailwaymap.org/',
	'tiledir': 'https://{s}.tiles.openrailwaymap.org/',
	'availableStyles': {
		"standard": "Infrastructure",
		"maxspeed": "Maxspeeds",
		"signals": "Signalling",
		"electrification": "Electrification (beta)",
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
		"hu": "hu_HU",
		"fr": "fr_FR",
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

		if (!embed)
		{
			map.on('moveend', function(e)
			{
				updatePermalink(railmap.selectedStyle);
			});
		}

		// railmap layer
		railmap = new L.TileLayer(window.openrailwaymap.tiledir+'standard/{z}/{x}/{y}.png',
		{
			attribution: _("Rendering: OpenRailwayMap"),
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

		setupControls();

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
	});
}


// changes the current map rendering style to the style given as parameter
function setStyle(style)
{
	// helper variable for saving current map style
	railmap.selectedStyle = style;
	// change tileserver url to load different style
	railmap._url = window.openrailwaymap.tiledir+encodeURIComponent(style)+'/{z}/{x}/{y}.png';
	// reload all tiles after style was changed
	railmap.redraw();

	// mark selected item as checked
	var selectableItems = gEBI('styleSelectionBar').getElementsByTagName('div');
	for (var i=0; i<selectableItems.length; i++)
	{
		if (selectableItems[i].innerHTML == escapeForHTML(_(window.openrailwaymap.availableStyles[style])))
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
	for (var style in window.openrailwaymap.availableStyles)
		if (window.openrailwaymap.availableStyles.hasOwnProperty(style))
			gEBI('styleSelectionBar').innerHTML += '<div class="resultEntry" onclick="setStyle(\''+style+'\')" value="'+style+'">'+_(window.openrailwaymap.availableStyles[style])+'</div>';
}


// returns true if the given stylename is a valid and available style; otherwise false is returned
function styleValid(style)
{
	return (window.openrailwaymap.availableStyles.hasOwnProperty(style));
}
