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
	loading = "<img class='loading' src='"+root+"/img/loading.gif'><br>"+translations['loading'];
	// path to the bitmap tile directory
	tiledir = "https://{s}.tiles.openrailwaymap.org/";
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

	setupControls();

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
	return (availableStyles.indexOf(style) >= 0);
}
