/*
OpenLinkMap Copyright (C) 2010 Alexander Matheisen
This program comes with ABSOLUTELY NO WARRANTY.
This is free software, and you are welcome to redistribute it under certain conditions.
See http://wiki.openstreetmap.org/wiki/OpenLinkMap for details.
*/


// set start position by given coordinate or, if possible, by geolocation api
function Startposition(map, locateButton)
{
    // called when geolocation api caused an errors
	this.geolocationError = function(error)
	{
		return true;
	}


	// set position by geolocation api
	this.setGeolocatedPosition = function(position)
	{
		// consider accuracy
		var center = getMapLatLon(position.coords.latitude, position.coords.longitude);
		var radius = position.coords.accuracy/2;
		var bounds = new OpenLayers.Bounds(center.lon - radius, center.lat - radius, center.lon + radius, center.lat + radius);
		this.map.zoomToExtent(bounds, true);
	}


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
					self.map.setCenter(getMapLatLon(response[1], response[0]), 10);
					self.geolocate();
					return true;
				}
				else
					return false;
			}

		requestApi("ippos", "", handler);
	}


	// main locating function
	this.geolocate = function()
	{
		// if geolocation is available
		if (navigator.geolocation)
		{
			var self = this;
			// call function to jump to geolocated position
			navigator.geolocation.getCurrentPosition(
				function(position)
				{
					self.setGeolocatedPosition(position);
				},
				function(error)
				{
					self.geolocationError(error);
				}
			);
		}
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
			this.map.setCenter(getMapLatLon(lat, lon), zoom);
		}
	}


	this.map = map;
	this.locateButton = gEBI(locateButton);

	// if no position set
	if (!this.map.getCenter())
	{
		if (params['lat'] && params['lon'])
		{
			if (!params['zoom'])
				params['zoom'] = 17;
			this.map.setCenter(getMapLatLon(params['lat'], params['lon']), params['zoom']);
		}
		else
			this.geolocate();
	}

	// if position already set, create popup
	if (params['id'] && params['type'])
	{
		var popupPosition = new OpenLayers.LonLat(params['lon'], params['lat']);
		createPopup(params['id'], params['type'], params['lat'], params['lon']);
		this.map.panTo(map.getCenter());
		if (params['ext'])
			showMoreInfo(params['id'], params['type'], params['lat'], params['lon']);
	}


	// onclick event of locate button
	var self = this;
	this.locateButton.onclick = function()
		{
			self.geolocate();
		};

	// load markers without moving the map first
	map.setCenter(map.getCenter());
	// show zoom status without zooming in first
	mapZoomed(null);
}