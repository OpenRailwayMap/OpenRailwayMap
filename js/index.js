/*
OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
This program comes with ABSOLUTELY NO WARRANTY.
This is free software, and you are welcome to redistribute it under certain conditions.
See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.
*/


// set start position by given coordinate or, if possible, by geolocation api
function Startposition(map)
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
			}
			else
			{
				// position to zoom on if no permalink is given and geolocation isn't supported
				var lat = 51.58248;
				var lon = 15.6501;
				var zoom = 3;
				this.map.setView(new L.LatLng(lat, lon), zoom);
			}
		}

		requestApi("ippos", "", handler);
	}


	// set position by geolocation api
	this.geolocate = function()
	{
		// if geolocation is available
		if (navigator.geolocation)
			this.map.locate({timeout: 3000, enableHighAccuracy: true, setView: true});
	}


	// locating by ip or fixed latlon
	this.setPosition = function()
	{
				// position to zoom on if no permalink is given and geolocation isn't supported
				var lat = 51.58248;
				var lon = 15.6501;
				var zoom = 3;
				this.map.setView(new L.LatLng(lat, lon), zoom);

		this.setPositionByIp();
		this.geolocate();
	}


	this.map = map;

	// set position if params are set
	var self = this;
	var handler = function(request)
	{
		if ((request.responseText.length > 0) && (request.responseText != "NULL"))
		{
			var results = JSON.parse(request.responseText);
			self.map.setView(new L.LatLng(results[0]['lon'], results[0]['lat']), 16);
		}
		else
			self.setPosition();
	};
	// permalink given
	if (params['lat'] && params['lon'])
	{
		if (!params['zoom'])
			params['zoom'] = 17;
		this.map.setView(new L.LatLng(params['lat'], params['lon']), params['zoom']);
	}
	// milestone given
	else if (params['position'] && params['line'])
	{
		if (params['operator'] != null)
			requestApi("milestone", "position="+params['position']+"&line="+params['line']+"&operator="+params['operator'], handler);
		else
			requestApi("milestone", "position="+params['position']+"&line="+params['line'], handler);
	}
	// facility name given
	else if (params['name'])
	{
		if (params['operator'] != null)
			requestApi("facilityinfo", "name="+params['name']+"&operator="+params['operator'], handler);
		else
			requestApi("facilityinfo", "name="+params['name'], handler);
	}
	// facility ref given
	else if (params['ref'])
	{
		if (params['operator'] != null)
			requestApi("facilityinfo", "ref="+params['ref']+"&operator="+params['operator'], handler);
		else
			requestApi("facilityinfo", "ref="+params['ref'], handler);
	}
	// no permalink
	else
		this.setPosition();
}

// perform a synchron API request
function requestAPI(requestType, query, handler)
{
	$.ajax(
	{
		crossDomain: true,
		type: 'GET',
		url: 'http://api.openrailwaymap.org/'+requestType+'?'+query.replace(/ /g, "+"),
		dataType: 'json',
		success: function(response) { handler(response); },
		error: function(error) { console.log('Error: '+error); handler(false); }
	});
}

// performs a search request
function searchRequest(input)
{
	//TODO
	//this.layer.removeAllFeatures();
	//this.marker.setOpacity(0);

	if (input.length == 0)
	{
		$('#searchResults').html('<li class="uk-nav-header uk-skip">Suchergebnisse</li>');
		$('#searchResults').append('<li>Empty input</li>');
		$('#searchForm').addClass('uk-open uk-active');
		setTimeout(function() {
			$('#searchForm').removeClass('uk-open uk-active');
		}, 3500);
		//TODO
		//this.layer.removeAllFeatures();
		return false;
	}

	$('#searchResults').html('<li class="uk-nav-header uk-skip">Suchergebnisse</li>');
	$('#searchResults').append('<li>Loading</li>');
	$('#searchForm').addClass('uk-open uk-active');
	setTimeout(function() {
		$('#searchForm').removeClass('uk-active');
	}, 500);

	// TODO
	//requestAPI('search', 'q='+input+'&extended=0', function(response)
	requestAPI('facility', 'ref='+input, function(response)
	{
		$('#searchResults').html('<li class="uk-nav-header uk-skip">Suchergebnisse</li>');

		if (response && response.length > 0)
		{
			for (var i=0; i < response.length; i++)
			{
				$('#searchResults').append('<li class="uk-nav-divider uk-skip"></li>');

				if (response[i]['type'] == "milestone")
				{
					var title = translations['kilometer']+' '+response[i]['position']+', '+translations['track']+' '+response[i]['ref'];
					var description = translations['kilometer']+' '+response[i]['position']+', '+translations['track']+' '+response[i]['ref'];
				}
				else if (response[i]['type'] == "level_crossing")
				{
					var title = translations['level_crossing']+' '+response[i]['position']+', '+translations['track']+' '+response[i]['ref'];
					var description = translations['level_crossing']+' '+response[i]['position']+', '+translations['track']+' '+response[i]['ref'];
				}
				else
				{
					var title = response[i]['name'];
					var description = response[i]['name'];
				}

				// TODO operator

				$('#searchResults').append('<li data-id="'+response[i]['id']+'" data-lat="'+response[i]['lat']+'" data-lon="'+response[i]['lon']+'" class="searchItem"><a href="#">'+title+'<div>'+description+'</div></a></li>');
			}

			//TODO oder automatisch
			$('#searchResults').append('<li class="uk-nav-divider uk-skip"></li>');
			$('#searchResults').append('<li class="uk-search-moreresults" data-moreresults="true"><a href="#" onclick="" id="searchMoreResults">Weitere Ergebnisse</a></li>');

			$(".searchItem").on("click", function()
			{
				var lat = $(this).data('lat');
				var lon = $(this).data('lon');
				// TODO
				//map.setView(new L.LatLng(lat, lon), 14);
				//this.marker.setLatLng([lat, lon]);
				//this.marker.setOpacity(1);
			});
		}
		else
		{
			$('#searchResults').html('<li class="uk-nav-header uk-skip">Suchergebnisse</li>');
			$('#searchResults').append('<li>Nothing found</li>');
			$('#searchForm').addClass('uk-open uk-active');
			setTimeout(function() {
				$('#searchForm').removeClass('uk-open uk-active');
			}, 3500);
			//TODO
			//this.layer.removeAllFeatures();
			return false;
		}
	});
}


$(document).ready(function()
{
	$.getJSON("js/config.json", function(data)
	{
		var map = new OpenRailwayMap(config);

		$(".styleSelector").on("click", function()
		{
			map.setStyle($(this).data('id'));
		});

		$('#locateButton').on('click', function()
		{
			startposition.setPosition();
		});

		$('#searchButton').on('click', function()
		{
			searchRequest($('#searchInput').val());
		});

		$(document).keypress(function(e)
		{
			if (e.which == 13)
				searchRequest($('#searchInput').val());
		});
	});
});
