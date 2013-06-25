/*
OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
This program comes with ABSOLUTELY NO WARRANTY.
This is free software, and you are welcome to redistribute it under certain conditions.
See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.
*/


// set start position by given coordinate or, if possible, by geolocation api
function Startposition(map, locateButton)
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
				self.geolocate();
				return true;
			}
			else
			{
				self.geolocate();
				return false;
			}
		}

		requestApi("ippos", "", handler);
	}


	// main locating function
	this.geolocate = function()
	{
		// if geolocation is available
		if (navigator.geolocation)
			this.map.locate({timeout: 3000, enableHighAccuracy: true, setView: true});
	}


	// locating by ip or fixed latlon
	this.setPosition = function()
	{
		if (!this.setPositionByIp())
		{
			// position to zoom on if no permalink is given and geolocation isn't supported
			var lat = 51.58248;
			var lon = 15.6501;
			var zoom = 3;
			this.map.setView(new L.LatLng(lat, lon), zoom);
		}
	}


	this.map = map;
	this.locateButton = gEBI(locateButton);

	// permalink given
	if (params['lat'] && params['lon'])
	{
		if (!params['zoom'])
			params['zoom'] = 17;
		this.map.setView(new L.LatLng(params['lat'], params['lon']), params['zoom']);
	}
	// no permalink
	else
		this.setPosition();

	// if position already set, create popup
	//if (params['id'] && params['type'])
	//{
		//var popupPosition = new OpenLayers.LonLat(params['lon'], params['lat']);
		//createPopup(params['id'], params['type'], params['lat'], params['lon']);
		//this.map.panTo(this.map.getCenter());
		//if (params['ext'])
			//showMoreInfo(params['id'], params['type'], params['lat'], params['lon']);
	//}

	// onclick event of locate button
	var self = this;
	this.locateButton.onclick = function()
	{
		self.setPosition();
	};

	// load markers without moving the map first
	this.map.setView(this.map.getCenter(), this.map.getZoom());
}
