/*
OpenLinkMap Copyright (C) 2010 Alexander Matheisen
This program comes with ABSOLUTELY NO WARRANTY.
This is free software, and you are welcome to redistribute it under certain conditions.
See http://wiki.openstreetmap.org/wiki/OpenLinkMap for details.
*/


// main function, creates map and layers, controls other functions
function createMap()
{
	root = "http://www.openlinkmap.org/";
	loading = "<img class='loading' src='"+root+"/img/loading.gif'><br>"+translations['loading'];
	// counter of clusterpopup's ids
	cluster = 0;

	if (params['offset'] != null)
		offset = params['offset'];
	else
	{
		// get time offset to utc
		var now = new Date();
		offset = -(now.getTimezoneOffset() / 60);
	}

	// translate strings
	translateStrings();

	// projections
	wgs84 = new OpenLayers.Projection("EPSG:4326");
	google = new OpenLayers.Projection("EPSG:900913");

	// set language of openlayers
	OpenLayers.Lang.setCode(params['lang']);

	// creating a map
	map = new OpenLayers.Map('mapFrame',
	{
		controls: [],
		projection: google,
		displayProjection: wgs84,
		maxExtent: new OpenLayers.Bounds(-20037508.34, -20037508.34, 20037508.34, 20037508.34),
		numZoomLevels: 19,
		maxResolution: 156543.0339,
		units: 'meters'
	});

	// adding some controls
	map.addControl(new OpenLayers.Control.PanZoomBar());
	map.addControl(new OpenLayers.Control.ScaleLine({geodesic:true, maxWidth:200, bottomOutUnits:"", bottomInUnits:""}));
	map.addControl(new OpenLayers.Control.MousePosition());
	map.addControl(new OpenLayers.Control.LayerSwitcher());
	map.addControl(new OpenLayers.Control.Permalink());
	map.addControl(new OpenLayers.Control.Navigation({dragPanOptions: {enableKinetic: true}}));

	// adding map layers
	var mapnikMap = new OpenLayers.Layer.OSM.Mapnik("Mapnik",
	{
		transitionEffect: 'resize'
	});
	var osmarenderMap = new OpenLayers.Layer.OSM.Osmarender("Osmarender",
	{
		transitionEffect: 'resize'
	});

	// adding hillshading map
	var hillMap = new OpenLayers.Layer.XYZ(translations['hillshading'], "http://toolserver.org/~cmarqu/hill/${z}/${x}/${y}.png",
	{
		sphericalMercator: true,
		opacity: 1,
		visibility: false,
		numZoomLevels: 17,
		transparent: true,
		noOpaq: true,
		isBaseLayer: false
	});

	// styles for object layer
	var objectsStyle = new OpenLayers.Style(
	{
		pointRadius: "${radius}",
		strokeColor: "#000000",
		strokeWidth: 2,
		fillColor: "#000000",
		fillOpacity: 0.2,
		cursor: "pointer"
		},
		{
			context: {
				radius: function(feature)
				{
					return Math.min(feature.attributes.count, 7) + 4;
				}
		}
	});
	var objectsStyleSelected = new OpenLayers.Style(
	{
		pointRadius: "${radius}",
		strokeColor: "#0860d5",
		strokeWidth: 4,
		fillColor: "#0860d5",
		fillOpacity: 0.3,
		cursor: "pointer"
		},
		{
			context: {
				radius: function(feature)
				{
					return Math.min(feature.attributes.count, 7) + 5;
				}
		}
	});
	var objectsStyleMap = new OpenLayers.StyleMap(
	{
		'default': objectsStyle,
		'select': objectsStyleSelected
	});
	// adding objects overlay
	objectsLayer = new OpenLayers.Layer.Vector(translations['object'],
	{
		projection: wgs84,
		maxResolution: 10.0,
		visibility: true,
		transitionEffect: 'resize',
		styleMap: objectsStyleMap,
		strategies:
		[
			new OpenLayers.Strategy.BBOX({ratio: 2.5}),
			new OpenLayers.Strategy.Cluster()
		],
		protocol: new OpenLayers.Protocol.HTTP(
		{
			url: root+'api/list.php',
			format: new OpenLayers.Format.OLM()
		})
	});

	// styles for marker layer
	var markerStyle = new OpenLayers.Style(
	{
		pointRadius: 50,
		strokeColor: "#f99c30",
		strokeWidth: 2,
		fillColor: "#f99c30",
		fillOpacity: 0.4
	});
	var markerStyleMap = new OpenLayers.StyleMap(
	{
		'default': markerStyle
	});
	// adding marker overlay
	markerLayer = new OpenLayers.Layer.Vector(translations['marker'],
	{
		projection: wgs84,
		maxResolution: 10.0,
		visibility: true,
		transitionEffect: 'resize',
		styleMap: markerStyleMap
	});

	// adding layers to map
	map.addLayers([mapnikMap, osmarenderMap, hillMap, markerLayer, objectsLayer]);

	// adding control features (clicking on markers) to overlays
	eventHandlerClick = new OpenLayers.Control.SelectFeature(objectsLayer,
	{
		multiple: true,
		toggle: true,
		onSelect: showPopup,
		onUnselect: hidePopup
	});
	map.addControl(eventHandlerClick);
	eventHandlerClick.activate();

	// register moving of map
	map.events.register('zoomend', map, mapZoomed);
	// register events of loading marker
	objectsLayer.events.register('loadstart', map, loadStart);
	objectsLayer.events.register('loadend', map, loadEnd);

	// loading timestamp
	var timestamp = new Timestamp("info");

	// setting start position
	startposition = new Startposition(map, "locateButton");

	// creating search
	search = new Search(map, "searchBox", "searchBar", "searchButton", "clearButton", "searchOption");

	// adding fullscreen feature
	fullscreen = new Fullscreen("fullscreen", "moreImage");

	// adding panorama feature
	//panorama = new Panorama("fullscreen", "morePanorama");
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
	var position = map.getCenter().transform(map.getProjectionObject(), wgs84);

	// open osb and jump to current position
	var bugWindow = window.open("http://openstreetbugs.schokokeks.org/?zoom="+map.getZoom()+"&lat="+position.lat+"&lon="+position.lon).focus();
}


// handler to advertisment element, now a link to keepright
function clickAd()
{
	// get current coordinates
	var position = map.getCenter().transform(map.getProjectionObject(), wgs84);

	// open osb and jump to current position
	var bugWindow = window.open("http://keepright.ipax.at/report_map.php?zoom="+map.getZoom()+"&lat="+position.lat+"&lon="+position.lon+"&layers=B00T&show_ign=0&show_tmpign=0&ch=0%2C411%2C412%2C413").focus();
}


// returns the current map bbox
function getBounds()
{
	return map.getExtent().transform(map.getProjectionObject(), wgs84).toArray();
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


// returns a new openlayers position, transformed from 4326/WGS84 to map's projection
function getMapLatLon(lat, lon)
{
	return new OpenLayers.LonLat(lon, lat).transform(wgs84, map.getProjectionObject());
}


// event released when map was moved
function mapZoomed(event)
{
	// show message if marker are shown up to this zoom
	if (map.getZoom() < 14)
		setMessageBarInfo(translations['showMarker'], "messageBar", 'messageBarTrue');
	else
		setMessageBarInfo("", "messageBar", 'messageBarFalse');
}


// translates strings and captions on the page to user's language
function translateStrings()
{
	gEBI('hideSidebarButton').title = translations['hide'];
	gEBI('searchButton').title = translations['search'];
	gEBI("spamButton").innerHTML = translations['spam'];
	gEBI('infoButton').innerHTML = translations['info'];
	gEBI('contactButton').innerHTML = translations['contact'];
	gEBI("osm").innerHTML = translations['title'];
	gEBI("searchOptionCaption").innerHTML = translations['searchoption'];
	gEBI("ad").innerHTML = translations['ad'];
}


// called when started to load marker
function loadStart(event)
{
	setMessageBarInfo(translations['markerLoading'], "messageBar", "messageBarTrue");
}


// called when marker are loaded
function loadEnd(event)
{
	setMessageBarInfo("", "messageBar", "messageBarFalse");
}


// displays a mesage in the message bar
function setMessageBarInfo(html, element, className)
{
	var messagebar = gEBI(element);

	messagebar.innerHTML = html;
	messagebar.className = className;
}


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
	map.updateSize();
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


// add a popup to map and set content
function showPopup(feature)
{
	// first remove all features of nearest objects
	markerLayer.removeAllFeatures();
	var item = feature.cluster[0];

	// create popup
	item.popup = new OpenLayers.Popup.FramedCloud("popup", new OpenLayers.LonLat(item.geometry.x, item.geometry.y), null, loading, {size: new OpenLayers.Size(6,6),offset: new OpenLayers.Pixel(-3,-3)}, true, function(){eventHandlerClick.unselectAll(item);});
	map.addPopup(item.popup);

	if (feature.cluster.length == 1)
	{
		// load popup contents
		var handler = function(request)
			{
				var content = request.responseText;

				if (content != "NULL")
				{
					item.popup.position = new OpenLayers.LonLat(item.geometry.x, item.geometry.y);
					item.popup.setContentHTML(editPopupContent(content, item.popup.position.lat, item.popup.position.lon, item.attributes['type'], item.attributes['id']));
					map.removePopup(item.popup);
					map.addPopup(item.popup);
				}
				else
					map.removePopup(item.popup);
			}
		requestApi("details", "id="+item.attributes['id']+"&type="+item.attributes['type']+"&format=text&offset="+offset+"&lang="+params['lang'], handler);
	}
	else
	{
		cluster++;
		item.popup.contentHTML = "<div id='clusterList"+cluster+"'>"+getNames(feature.cluster)+"</div>";

		// update popup
		map.removePopup(item.popup);
		map.addPopup(item.popup);

		// destroy cluster popup before creating selected popup
		gEBI("clusterList"+cluster).onclick =
			function()
			{
				map.removePopup(item.popup);
			}
	}
}


// removes given popup from map
function hidePopup(feature, popup)
{
	// first remove all features of nearest objects
	markerLayer.removeAllFeatures();
	map.removePopup(feature.cluster[0].popup);
}


// loads names list for popup of some clustered markers
function getNames(cluster)
{
	var content = "";
	for (var i=0; i<cluster.length; ++i)
	{
		var request = requestApi("name", "type="+cluster[i].attributes['type']+"&id="+cluster[i].attributes['id']);
		var response = request.responseText;

		if (response != "NULL")
		{
			var position = new OpenLayers.LonLat(cluster[i].geometry.x, cluster[i].geometry.y).transform(map.getProjectionObject(), wgs84);
			content += "<a href=\"javascript:zoomOnObject("+position.lat+","+position.lon+","+cluster[i].attributes['id']+",'"+cluster[i].attributes['type']+"');\">"+response+"</a>";
		}
	}
	return content;
}


// create popup and zoom on it
function zoomOnObject(lat, lon, id, type)
{
	var position = getMapLatLon(lat, lon);
	createPopup(id, type, lat, lon);
	map.zoomTo(18);
	map.panTo(position);
}


// opens window "more info"
function showMoreInfo(id, type, lat, lon)
{
	var detailsbar = gEBI('detailsBar');

	// show loading status
	detailsbar.innerHTML = "<div class='loadingMoreInfo'>"+loading+"</div>";
	// make frame visible
	detailsbar.className = "infoBar";
	showSideBar();
	search.bar.className = "infoBarOut";
	search.bar.innerHTML = "";

	// load contents
	var handler = function(request)
		{
			var content = request.responseText;
			if (content != "NULL")
			{
				detailsbar.innerHTML = content;
				detailsbar.innerHTML += "<div class='loadingMoreInfo'>"+loading+"</div>";
				fullscreen.init();
				//panorama.init();
			}
			else
			{
				detailsbar.innerHTML = "";
				detailsbar.className = "infoBarOut";
				gEBI('sideBar').className = "sideBarOut";
			}
		}
	requestApi("extdetails", "id="+id+"&type="+type+"&format=text&offset="+offset+"&lang="+params['lang']+"&lat="+lat+"&lon="+lon, handler);

	// requesting next objects
	if (detailsbar.lastChild.className == 'loadingMoreInfo')
	{
		var handler = function(request)
			{
				detailsbar.removeChild(gEBI('detailsBar').lastChild);
				var content = request.responseText;

				if (content != "NULL")
					detailsbar.innerHTML += content;
			}
		requestApi("nextobject", 'id='+id+'&type='+type+'&format=text&lat='+lon+'&lon='+lat+"&offset="+offset+"&lang="+params['lang'], handler);
	}
}


// creates a popup at a given position
function createPopup(id, type, lat, lon)
{
	// create popup
	var popup = new OpenLayers.Popup.FramedCloud("popup", getMapLatLon(lat, lon), null, loading, {size: new OpenLayers.Size(6,6),offset: new OpenLayers.Pixel(-3,-3)}, true, function(){map.removePopup(popup);});
	map.addPopup(popup);

	// request details for popup
	var handler = function(request)
		{
			var content = request.responseText;

			if (content != "NULL")
			{
				// set popup content
				popup.setContentHTML(editPopupContent(content, popup.lonlat.lat, popup.lonlat.lon, type, id));
				map.removePopup(popup);
				map.addPopup(popup);
			}
			else
				map.removePopup(popup);
		}
	requestApi("details", "id="+id+"&type="+type+"&format=text&offset="+offset+"&lang="+params['lang'], handler);
}


// doing some edits on the popup content like adding links
function editPopupContent(content, lat, lon, type, id)
{
	// get bbox of shown map
	var bounds = map.getExtent().transform(map.getProjectionObject(), wgs84).toArray();
	var l = bounds[0];
	var b = bounds[1];
	var r = bounds[2];
	var t = bounds[3];

	// getting latlon in wgs84
	var position = new OpenLayers.LonLat(lon, lat).transform(map.getProjectionObject(), wgs84);
	var lat = position.lat;
	var lon = position.lon;

	// add some links to the bottom of a popup
	content +=
		'</div><br /><small id="popupLinks">'+
		'<b><a id="moreInfoLink" href="javascript:showMoreInfo('+id+',\''+type+'\', '+lat+', '+lon+')">'+translations['more']+' >></a></b>'+
		'&nbsp;&nbsp;<a id="permalink" href="'+root+'?'+queryLatLonZoom(lat, lon, map.getZoom())+'&id='+id+'&type='+type;
	// save language in permalink
	if (params['lang'] != "")
		content += '&lang='+params['lang'];
	content += '">'+translations['permalink']+'</a>'+
		'&nbsp;&nbsp;<a href="http://www.openstreetmap.org/edit?'+queryLatLonZoom(lat, lon, map.getZoom())+'&'+type+'='+id+'&editor=potlatch2" target="_blank">Potlatch</a>'+
		'&nbsp;&nbsp;<a href="http://localhost:8111/load_and_zoom?left='+l+'&right='+r+'&top='+t+'&bottom='+b+'&select='+type+id+'" target="josm" onclick="return josm(this.href)">JOSM</a>'+
		'&nbsp;&nbsp;<a href="http://www.openstreetmap.org/browse/'+type+'/'+id+'" target="_blank">'+translations['details']+'</a>'+
		'&nbsp;&nbsp;<a href="javascript:getEmbedLink('+id+',\''+type+'\')">'+translations['embed']+'</a></small>';
	return content;
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


// jumps to a given position and marks this point
function showPoint(lon, lat, poilat, poilon)
{
	// first remove all features that only a point is visible
	markerLayer.removeAllFeatures();
	// get position
	var panPosition = getMapLatLon(lon, lat);

	// create point
	var point = new OpenLayers.Geometry.Point(panPosition.lon, panPosition.lat);
	var style = this.defaultStyle ? OpenLayers.Util.applyDefaults({}, this.defaultStyle) : null;
	var pointFeature = new OpenLayers.Feature.Vector(point, null, style);
	markerLayer.addFeatures([pointFeature]);

	// switch coordinates
	if (lat < poilat)
	{
		tmp = lat;
		lat = poilat;
		poilat = tmp;
	}
	if (lon < poilon)
	{
		tmp = lon;
		lon = poilon;
		poilon = tmp;
	}
	// show map with these positions
	var bounds = new OpenLayers.Bounds(poilat, poilon, lat, lon).transform(wgs84, map.getProjectionObject());
	map.zoomToExtent(bounds, true);
	map.zoomOut();
}


// perform a synchron API request
function requestApi(file, query, handler)
{
	if (typeof handler == 'undefined')
		return OpenLayers.Request.GET({url: root+'api/'+file+'.php?'+query, async: false});
	else
		return OpenLayers.Request.GET({url: root+'api/'+file+'.php?'+query, async: true, success: handler});
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


// gets the url of an wikipedia image by it's thumbnail url
function getWikipediaImageUrl(url)
{
	if (!url)
		return false;

	var url = url.replace("wikipedia/commons/thumb", "wikipedia/commons");

	return url.substr(0, url.lastIndexOf("/"));
}


// reloads the page in a different language
function changeLanguage(lang)
{
	var url = root+'?lang='+lang;
	var position = map.getCenter().transform(map.getProjectionObject(), wgs84);

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
		url += '&lon='+position.lon;

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