/*
OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
This program comes with ABSOLUTELY NO WARRANTY.
This is free software, and you are welcome to redistribute it under certain conditions.
See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.
*/

// main function, creates map and layers, controls other functions
function createMap(embed)
{
	root = params['urlbase'];
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

	// railmap layer
	railmap = new L.TileLayer.Kothic(tiledir+'{z}/{x}/{y}.json',
	{
		attribution: translations['railmapAttribution'],
		minZoom: 2,
		maxZoom: 19
	});

	MapCSS.preloadSpriteImage("standard", root+"styles/standard.png");
	MapCSS.preloadSpriteImage("signals", root+"styles/signals.png");
	MapCSS.preloadSpriteImage("maxspeed", root+"styles/maxspeed.png");
	MapCSS.preloadSpriteImage("electrified", root+"styles/electrified.png");

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
	return (MapCSS.availableStyles.indexOf(style) >= 0);
}
