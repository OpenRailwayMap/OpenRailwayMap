/*
OpenLinkMap Copyright (C) 2010 Alexander Matheisen
This program comes with ABSOLUTELY NO WARRANTY.
This is free software, and you are welcome to redistribute it under certain conditions.
See http://wiki.openstreetmap.org/wiki/OpenLinkMap for details.
*/


function Search(map, box, bar, searchButton, clearButton, searchOption)
{
	// clears the visible parts of a search
	this.clear = function()
	{
		this.box.value = "";
		this.reset();
		this.bar.className = "infoBarOut";
		this.box.focus();
    }

	// resets all parameters for a new search
    this.reset = function()
    {
    	this.bar.innerHTML = "";
		this.layer.removeAllFeatures();
		this.resultCount = 1;
		this.excludeList = "";
		this.extent = {};
		this.panned = false;
    }

	// sends a search request
	this.send = function()
	{
		var input = this.box.value;
		var bounded = this.option.checked == true ? 1 : 0;
		var bounds = getBounds();

		// if nothing was entered
		if (input.length == 0)
		{
			this.bar.innerHTML = "<div id=\"errorResults\"><center><b>"+translations['empty']+"</b></center></div>";
			this.bar.className = "infoBar";
			var bar = this.bar.id;
			setTimeout("gEBI('"+bar+"').innerHTML = ''; gEBI('"+bar+"').className = 'infoBarOut';", 3500);
			this.layer.removeAllFeatures();
			return false;
		}

		// if a new string was entered or other search type
		if (input != this.request || bounded != this.bounded || ((bounds != this.bounds) && (!this.panned)))
		{
			this.reset();
		}

		if ((bounded == 1) && (this.bar.innerHTML != ""))
			return false;

		if (input != this.request || this.excludeList != "" || bounded != this.bounded || bounds != this.bounds)
		{
			// show search results box
			this.bar.className = "infoBar";
			if (this.excludeList != "")
				this.bar.removeChild(this.bar.lastChild);
			// show that search results are loaded
			this.bar.innerHTML += "<div class=\"loadingMoreInfo\">"+loading+"</div>";
			this.request = input;
			this.bounded = bounded;
			input = input.replace(/ /g, "+");

			var handler = function(response)
					{
						self.showResults(response);
					}

			requestApi("proxy", "url=http://nominatim.openstreetmap.org/search/&format=xml&polygon=0&addressdetails=1&q="+input+"&accept-language="+params['lang']+"&exclude_place_ids="+this.excludeList+"&viewbox="+bounds[0]+","+bounds[3]+","+bounds[2]+","+bounds[1]+"&bounded="+this.bounded, handler);
		}
	}

	// returns the translation for a key-value pair
	this.getTagTranslation = function(key, value)
	{
		// some tests if translation (object) exists
		if (typeof tags[key] != 'undefined')
		{
			if (typeof tags[key][value] != 'undefined')
			{
				var tag = tags[key][value];

				if (tag)
					return tag;
			}
		}

		return "";
	}

	// shows the returned search results
	this.showResults = function(response)
    {
    	if (!response)
    	{
    		this.clear();
    		return false;
    	}

		var self = this;
    	var xml = response.responseXML;
    	var placesList = xml.getElementsByTagName('place');
    	var excludeList = xml.getElementsByTagName('searchresults')[0].getAttribute('exclude_place_ids');
    	this.bar.removeChild(this.bar.lastChild);
    	if (placesList.length > 0)
		{
			for (var i = 0; i < placesList.length; i++)
			{
				var place = placesList[i];
				var bbox = place.getAttribute('boundingbox');
				var key = place.getAttribute('class');
				var value = place.getAttribute('type');
				var osmType = place.getAttribute('osm_type');
				var id = place.getAttribute('osm_id');
				var searchId = place.getAttribute('place_id');
				var lat = parseFloat(place.getAttribute('lat'));
				var lon = parseFloat(place.getAttribute('lon'));
				var details = place.childNodes;
				// display name
				if (details.length > 1)
				{
					if (this.bounded == 0)
						this.setExtent(lat, lon);
					// translation of object types into user's language
					var placeType = this.getTagTranslation(key, value);
					var description = this.getDescription(details);
					if (description == "")
						description = "<br />";
					var placeName = this.getName(details, placeType, value);
					if (placeType == placeName)
						placeType = "";
					else
						placeType = "&nbsp;&nbsp;<i>"+placeType+"</i>";
					var bounds = bbox.split(",");
					if (this.even)
						var even = "even";
					else
						var even = "odd";

					searchclass = this;
					this.bar.innerHTML += "<div class=\"resultEntry "+even+"\"><div onclick=\"searchclass.showResult("+bounds[2]+", "+bounds[0]+", "+bounds[3]+", "+bounds[1]+", "+lat+", "+lon+", "+id+", '"+osmType+"');\"><div class=\"resultCount\">"+this.resultCount+"</div><b>"+placeName+"</b>"+placeType+"<br /><dfn>"+description+"</dfn></div></div>";
					this.showMarker(this.resultCount, bbox, lat, lon, id, osmType);
					this.even = !this.even;
					this.resultCount++;
				}
			}
			this.excludeList = excludeList;

			// set "more results" link
			if (this.bounded == 0)
			{
				this.bar.innerHTML += "<div id=\"moreResults\"><center><b>"+translations['moreresults']+"</b></center></div>";
				var self = this;
				gEBI('moreResults').onclick = function()
				{
					self.send();
				}
			}
			if (this.bounded == 0)
				this.setBbox();
		}
		// if nothing was found
		else
		{
			var bar = this.bar.id;

			// if no more results were found
			if (this.bar.innerHTML != "")
			{
				this.bar.innerHTML += "<div id=\"errorResults\"><center><b>"+translations['nothingmore']+"</b></center></div>";
				setTimeout("gEBI('"+bar+"').removeChild(gEBI('"+bar+"').lastChild);", 3500);
			}
			// if no results were found
			else
			{
				this.bar.innerHTML = "<div id=\"errorResults\"><center><b>"+translations['nothing']+"</b></center></div>";
				setTimeout("gEBI('"+bar+"').innerHTML = ''; gEBI('"+bar+"').className = 'infoBarOut';", 3500);
			}
			this.bar.className = "infoBar";
		}
    }

    // creates a marker of a search result
    this.showMarker = function(caption, bbox, lat, lon, id, type)
	{
		// get position
		var position = new OpenLayers.LonLat(lon, lat);
		var panPosition = new OpenLayers.LonLat(position.lon, position.lat).transform(wgs84, map.getProjectionObject());
		// create point
		var point = new OpenLayers.Geometry.Point(panPosition.lon, panPosition.lat);
		var style = this.defaultStyle ? OpenLayers.Util.applyDefaults({}, this.defaultStyle) : null;
		var pointFeature = new OpenLayers.Feature.Vector(point, {'caption' : caption, 'bbox': bbox, 'lat': lat, 'lon': lon, 'id': id, 'type': type}, style);
		this.layer.addFeatures([pointFeature]);
	}

	// called when clicking on a search results, jumps to point and creates popup
	this.showResult = function(left, bottom, right, top, lat, lon, id, type)
	{
		// show the popup at the position
		createPopup(id, type, lat, lon);
		// move to position
		this.map.panTo(getMapLatLon(lat, lon));

		// zoom and pan onto object after a while
		var zooming = function()
			{
				// switch coordinates
				if (bottom < top)
				{
					tmp = left;
					left = right;
					right = tmp;
					tmp = bottom;
					bottom = top;
					top = tmp;
				}
				var bounds = new OpenLayers.Bounds(right, top, left, bottom).transform(wgs84, map.getProjectionObject());
				map.zoomToExtent(bounds, false);
				this.map.panTo(getMapLatLon(lat, lon));
			}
		setTimeout(zooming, 1500);

	}

	// generates description of search result
    this.getDescription = function(details)
    {
		var properties = {};
		var caption = descriptions[details[0].localName];

		if (!caption && caption != "")
			var caption = descriptions["poi"];

		for (var i = 1; i < details.length; i++)
		{
			var key = details[i].localName;
			var value = details[i].firstChild.nodeValue;
			properties[key] = value;
		}

		var matching = caption.match(/#\w+#/g);
		if (!matching)
			return "";

		if (!properties['city'])
			properties['city'] = properties['county'];

		for (var i = 0; i < matching.length; i++)
		{
			var field = matching[i].replace(/#/g, "");

			if (properties[field])
				caption = caption.replace(matching[i], properties[field]);
		}

		var regex = new Array(new RegExp(/,\s#\w+#/g), new RegExp(/\s#\w+#/g), new RegExp(/#\w+#\s/g), new RegExp(/,#\w+#,/g), new RegExp(/#\w+#,\s/g), new RegExp(/#\w+#/g));
		for (var i = 0; i < regex.length; i++)
		{
			var matching = caption.match(regex[i]);
			if (matching)
				for (var j = 0; j < matching.length; j++)
					caption = caption.replace(matching[j], "");
		}

		return caption;
	}

	// generates name of search result
	this.getName = function(details, type, tag)
	{
		var properties = {};
		for (var i = 1; i < details.length; i++)
		{
			var key = details[i].localName;
			var value = details[i].firstChild.nodeValue;
			properties[key] = value;
		}

		var caption = details[0].firstChild.nodeValue;

		if (details[0].localName == "house_number")
			caption = properties['road']+" "+caption;

		//if (!properties['house_number'] && (tag != "place") && (tag != "highway") && (tag != "boundary"))
		if (tag != details[0].localName && !properties['house_number'])
			caption = type;

		return caption;
	}

	// adds new position to array of extent
	this.setExtent = function(lat, lon)
	{
		if (this.extent[0] < lat || this.extent[1] < lon || typeof this.extent[0] == 'undefined' || typeof this.extent[1] == 'undefined')
		{
			this.extent[0] = lat;
			this.extent[1] = lon;
		}
		else if (this.extent[2] > lat || this.extent[3] > lon || typeof this.extent[2] == 'undefined' || typeof this.extent[3] == 'undefined')
		{
			this.extent[2] = lat;
			this.extent[3] = lon;
		}
		this.panned = true;
	}

	// sets a bbox around of all results
	this.setBbox = function()
	{
		// if only one result was there
		if (typeof this.extent[2] == 'undefined' || typeof this.extent[3] == 'undefined')
		{
			var show = new Function(this.bar.firstChild.firstChild.getAttribute('onclick'));
			show();
		}
		// if more than one result, show them in the current map viewbox
		else
		{
			// switch coordinates
			if (this.extent[2] < this.extent[0])
			{
				tmp = this.extent[2];
				this.extent[2] = this.extent[0];
				this.extent[0] = tmp;
			}
			if (this.extent[3] < this.extent[1])
			{
				tmp = this.extent[3];
				this.extent[3] = this.extent[1];
				this.extent[1] = tmp;
			}
			var bounds = new OpenLayers.Bounds(this.extent[1], this.extent[0], this.extent[3], this.extent[2]).transform(wgs84, this.map.getProjectionObject());
			this.map.zoomToExtent(bounds, true);
			this.map.zoomOut();
			this.map.zoomOut();
		}
	}

	// sets bounded option
	this.setBounded = function(value)
	{
		this.bounded = value;

		if (this.bounded == 1)
			this.option.checked = true;
		else
			this.option.checked = false;
	}

	this.resultClick = function(feature)
	{
		var bounds = feature.attributes['bbox'].split(",");
		self.showResult(bounds[2], bounds[0], bounds[3], bounds[1], feature.attributes['lat'], feature.attributes['lon'], feature.attributes['id'], feature.attributes['type'])
	}


	this.map = map;
	this.layer = null;
	this.box = gEBI(box);
	this.searchButton = gEBI(searchButton);
	this.clearButton = gEBI(clearButton);
	this.option = gEBI(searchOption);
	this.bar = gEBI(bar);
	this.request = "";
	this.excludeList = "";
	this.resultCount = 1;
	this.bounded = 0;
	this.even = false;
	this.bounds = {};
	this.extent = {};
	this.panned = false;

	var self = this;
	this.searchButton.onclick = function()
		{
			self.send();
		};
	this.clearButton.onclick = function()
		{
			self.clear();
		};

	this.box.focus();
	this.setBounded(params['bounded']);

	// set up key event
	this.box.onkeydown =
		function(event)
		{
			if (!event)
				event = window.event;
			if (event.which)
				var keyCode = event.which;
			else if (event.keyCode)
				var keyCode = event.keyCode;
			if(event && keyCode == 13)
				self.send();
		};

	// search results layer
	// adding search results overlay
	var style = new OpenLayers.Style(
	{
		pointRadius: 10,
		strokeColor: "#0860d5",
		strokeWidth: 4,
		fillColor: "#0860d5",
		fillOpacity: 1,
		cursor: "pointer",
		label: "${caption}",
		fontSize: 14,
		fontWeight: 'bold',
		fontColor: "#ffffff",
		fontFamily: "Tahoma,sans-serif"
		},
		{
			context: {
				caption: function(feature)
				{
					return feature.attributes['caption'];
				}
		}
	});
	var styleMap = new OpenLayers.StyleMap(
	{
		'default': style,
		'select': style
	});

	this.layer = new OpenLayers.Layer.Vector(translations['searchresults'],
	{
		projection: wgs84,
		visibility: true,
		transitionEffect: 'resize',
		styleMap: styleMap
	});
	// adding control features
	var self = this;
	searchResultHandler = new OpenLayers.Control.SelectFeature(this.layer,
	{
		onSelect: self.resultClick
	});
	this.map.addControl(searchResultHandler);
	searchResultHandler.activate();

	this.map.addLayer(this.layer);

	// perform search request if search parameter is set
	if (params['searchquery'])
	{
		this.box.value = params['searchquery'];
		this.send();
	}
}