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


	// get time offset to utc
	var now = new Date();
	offset = -(now.getTimezoneOffset() / 60);

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
	map.addControl(new OpenLayers.Control.Attribution());
	map.addControl(new OpenLayers.Control.PanZoomBar());
	map.addControl(new OpenLayers.Control.ScaleLine({geodesic:true, maxWidth:200, bottomOutUnits:"", bottomInUnits:""}));
	map.addControl(new OpenLayers.Control.Navigation(
	{
		dragPanOptions:
		{
			enableKinetic: true
		}
	}));

	// adding map layers
	var mapnikMap = new OpenLayers.Layer.OSM.Mapnik("Mapnik",
	{
		transitionEffect: 'resize',
		attribution: translations['embedattribution']
	});

	// styles for marker layer
	var markerStyle = new OpenLayers.Style(
	{
		externalGraphic: OpenLayers.Util.getImagesLocation() + "marker.png",
		graphicWidth: 21,
		graphicHeight: 25,
		graphicXOffset: -10.5,
		graphicYOffset: -25,
		cursor: "pointer"
	});
	var markerStyleSelected = new OpenLayers.Style(
	{
		pointRadius: 15,
		strokeColor: "#f99c30",
		strokeWidth: 2,
		fillColor: "#f99c30",
		fillOpacity: 1
	});
	var markerStyleMap = new OpenLayers.StyleMap(
	{
		'default': markerStyle,
		'select': markerStyleSelected
	});

	// adding marker overlay
	markerLayer = new OpenLayers.Layer.Vector("Marker",
	{
		projection: wgs84,
		visibility: true,
		transitionEffect: 'resize',
		styleMap: markerStyleMap
	});

	// adding control features (clicking on markers) to overlays
	eventHandlerClick = new OpenLayers.Control.SelectFeature(markerLayer,
	{
		multiple: true,
		toggle: true,
		onSelect: showPopup,
		onUnselect: hidePopup
	});
	map.addControl(eventHandlerClick);
	eventHandlerClick.activate();

	// adding layers to map
	map.addLayers([mapnikMap, markerLayer]);


	// create popup
	if (params['id'] && params['type'])
	{
		var position = getMapLatLon(params['lat'], params['lon']);
		map.setCenter(position, 14);

		// create point
		var point = new OpenLayers.Geometry.Point(position.lon, position.lat);
		var style = this.defaultStyle ? OpenLayers.Util.applyDefaults({}, this.defaultStyle) : null;
		var pointFeature = new OpenLayers.Feature.Vector(point, {"id":params['id'], "type":params['type']}, style);
		markerLayer.addFeatures([pointFeature]);
	}
}


// shorter than document.get... everywhere
function gEBI(id)
{
	return document.getElementById(id);
}


// returns the current map bbox
function getBounds()
{
	return map.getExtent().transform(map.getProjectionObject(), wgs84).toArray();
}


// returns a new openlayers position, transformed from 4326/WGS84 to map's projection
function getMapLatLon(lat, lon)
{
	return new OpenLayers.LonLat(lon, lat).transform(wgs84, map.getProjectionObject());
}


// updates map's center
function updateMap()
{
	map.updateSize();
	map.setCenter(map.getCenter(), map.getZoom());
}


// removes given popup from map
function hidePopup(feature, popup)
{
	map.removePopup(feature.cluster[0].popup);
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

// add a popup to map and set content
function showPopup(feature)
{
	// create popup
	feature.popup = new OpenLayers.Popup.FramedCloud("popup", new OpenLayers.LonLat(feature.geometry.x, feature.geometry.y), null, loading, {size: new OpenLayers.Size(6,6),offset: new OpenLayers.Pixel(-3,-3)}, true, function(){eventHandlerClick.unselectAll(feature);});
	map.addPopup(feature.popup);

	// load popup contents
	var handler = function(request)
	{
		var content = request.responseText;

		if (content != "NULL")
		{
			feature.popup.position = new OpenLayers.LonLat(feature.geometry.x, feature.geometry.y);
			feature.popup.setContentHTML(content+'<br/><a id="popupLinks" target="_blank" href="'+root+'index.php?id='+feature.attributes['id']+'&type='+feature.attributes['type']+'">'+translations['inolm']+'</a>');
			map.removePopup(feature.popup);
			map.addPopup(feature.popup);
		}
		else
			map.removePopup(feature.popup);
	}
	requestApi("details", "id="+feature.attributes['id']+"&type="+feature.attributes['type']+"&format=text&offset="+offset+"&lang="+params['lang'], handler);
}


// removes given popup from map
function hidePopup(feature, popup)
{
	map.removePopup(feature.popup);
}