/*
OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
This program comes with ABSOLUTELY NO WARRANTY.
This is free software, and you are welcome to redistribute it under certain conditions.
See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.
*/


function Search(map, box, bar, searchButton, clearButton, mobilemenu)
{
	// mapping of types returned by API and human-readable strings
	this.typeMapping = {
		"track": "Track",
		"halt": "Halt",
		"station": "Station",
		"junction": "Junction",
		"yard": "Yard",
		"crossover": "Crossover",
		"site": "Site",
		"service_station": "Service station",
		"tram_stop": "Tram stop",
		"milestone": "Milestone",
		"signal": "Signal",
		"level_crossing": "Level crossing",
		"crossing": "Crossing"
	};

	this.loading = "<img class='loading' src='"+window.openrailwaymap.root+"/img/loading.gif'><br>"+_("Loading...");

	// clears the visible parts of a search
	this.clear = function()
	{
		this.box.value = "";
		this.reset();
		this.bar.className = "infoBarOut";
		this.box.focus();
		this.marker.setOpacity(0);
		this.request = "";
	}

	// resets all parameters for a new search
	this.reset = function()
	{
		this.bar.innerHTML = "";
		//TODO this.layer.removeAllFeatures();
	}

	// sends a search request
	this.send = function()
	{
		var input = this.box.value;

		// if nothing was entered
		if (input.length == 0)
		{
			this.bar.innerHTML = "<div id=\"errorResults\"><center><b>"+_("Empty input.")+"</b></center></div>";
			this.bar.className = "infoBar";
			var bar = this.bar.id;
			setTimeout("gEBI('"+bar+"').innerHTML = ''; gEBI('"+bar+"').className = 'infoBarOut';", 3500);
			//TODO this.layer.removeAllFeatures();
			return false;
		}

		// if a new string was entered or other search type
		if (input != this.request)
		{
			this.reset();
			// show search results box
			this.bar.className = "infoBar";
			// show that search results are loaded
			this.bar.innerHTML += "<div class=\"loadingMoreInfo\">"+this.loading+"</div>";
			this.request = input;

			queryRef = function(response)
			{
				self.showResults(response);
				self.sendRequest("facility", "ref=" + input, function(response)
				{
					self.finishResults(response);
				});
			}

			if((input.length != 7) || isNaN(input)) {
				self.sendRequest("facility", "name=" + input, function(response)
				{
					var words = input.split(" ");
					for (var i = 0; i<words.length; i++)
					{
						if (/[0-9][.,][0-9]/.test(words[i]))
						{
							var pos = words[i];
							words.splice(i, 1);
							break;
						}
					}

					if (pos)
					{
						var ref = words.join(" ");

						self.sendRequest("milestone", "position=" + pos.replace(',', '.') + "&ref=" + ref, queryRef);
					}
					else
						queryRef(response);
				});
			} else {
				this.sendRequest("facility", "uicref=" + input, queryRef);
			}
		}
	}

	// shows the returned search results
	this.showResults = function(response)
	{
		if (!response)
			return false;

		var results = JSON.parse(response.responseText);
		if (results.length > 0)
		{
			this.bar.removeChild(this.bar.lastChild);
			this.bar.className = 'infoBar';
			var milestoneSearch = response.responseURL.startsWith(window.openrailwaymap.apiUrl + 'milestone?');
			for (var i=0; i<results.length; i++)
			{
				var result = document.createElement("div");
				var inner = "";

				if (milestoneSearch)
					inner = _("Kilometer") + ' ' + results[i]['position'] + ', ' + _("Track") + ' ' + results[i]['ref'];
				else if (results[i]['name'])
					inner = results[i]['name'];
				else if (results[i]['ref'])
					inner = results[i]['ref'];

				if (inner)
					result.innerHTML = '<b>' + inner + '</b>';

				if (results[i]['type'] != null && typeof results[i]['type'] != undefined)
					result.innerHTML += '&nbsp;'+_(this.typeMapping[results[i]['type']]);
				if (results[i]['operator'] != null && typeof results[i]['operator'] != undefined)
					result.innerHTML += '<br /><dfn>'+results[i]['operator']+'</dfn>';
				if (results[i]['ref'] && (results[i]['type'] == 'station' || results[i]['type'] == 'halt' || results[i]['type'] == 'junction' ||
						results[i]['type'] == 'spur_junction' || results[i]['type'] == 'yard' || results[i]['type'] == 'crossover' ||
						results[i]['type'] == 'site' || results[i]['type'] == 'service_station' || results[i]['type'] == 'tram_stop'))
					result.innerHTML += ' <i>[' + results[i]['ref'] + ']</i>';

				selfSearch = this;
				result.setAttribute('class', 'resultEntry');
				result.onclick = new Function("selfSearch.showResult("+results[i]['lon']+", "+results[i]['lat']+");");

				this.bar.appendChild(result);
			}

			var loadingIndicator = document.createElement("div");
			loadingIndicator.setAttribute('class', 'loadingMoreInfo');
			loadingIndicator.innerHTML = this.loading;
			this.bar.appendChild(loadingIndicator);
		}
	}

	// finishes adding more results to the result list
	this.finishResults = function(response)
	{
		this.showResults(response);
		this.bar.removeChild(this.bar.lastChild);

		// if no results were found
		if (this.bar.innerHTML.length == 0)
		{
			var bar = this.bar.id;

			this.bar.innerHTML = "<div id=\"errorResults\"><center><b>"+_("Nothing found.")+"</b></center></div>";

			var self = this;
			var removeErrorMessage = function()
			{
				// avoid deleting search results when a new search was performed before timeout was released
				if (self.bar.getElementsByClassName("resultEntry").length == 0)
				{
					self.bar.innerHTML = '';
					self.bar.className = 'infoBarOut';
				}
			}
			setTimeout(removeErrorMessage, 3500);
			this.bar.className = "infoBar";
		}
	}

	// called when clicking on a search results, jumps to point and draws something on the map
	this.showResult = function(lat, lon)
	{
		this.map.setView(new L.LatLng(lat, lon), 14);
		// hide menu in mobile mode
		if (this.mobilemenu != null)
			this.mobilemenu.hide();

		this.marker.setLatLng([lat, lon]);
		this.marker.setOpacity(1);
	}

	// perform a synchron API request
	this.sendRequest = function(requestType, query, handler)
	{
		var request = new XMLHttpRequest();

		request.open("GET", window.openrailwaymap.apiUrl + requestType + '?' + query.replace(/ /g, "+"), true);
		request.onreadystatechange = function()
		{
			if (request.readyState === 4)
			{
				if (request.status === 200)
					handler(request);
				else
					handler(false);
			}
		};
		request.send(null);
	}


	this.map = map;
	this.layer = null;
	this.box = gEBI(box);
	this.searchButton = gEBI(searchButton);
	this.clearButton = gEBI(clearButton);
	this.bar = gEBI(bar);
	this.request = "";
	this.mobilemenu = mobilemenu || null;
	this.marker = L.marker([0, 0], {opacity: 0, clickable: false}).addTo(this.map);

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
			if (event && keyCode == 13)
				self.send();
		};

	// perform search request if search parameter is set
	if (params['searchquery'])
	{
		this.box.value = params['searchquery'];
		this.send();
	}
}
