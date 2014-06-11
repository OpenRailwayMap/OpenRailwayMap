/*
OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
This program comes with ABSOLUTELY NO WARRANTY.
This is free software, and you are welcome to redistribute it under certain conditions.
See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.
*/


function Search(map, box, bar, searchButton, clearButton, mobilemenu)
{
	// clears the visible parts of a search
	this.clear = function()
	{
		this.box.value = "";
		this.reset();
		this.bar.className = "infoBarOut";
		this.box.focus();
		this.marker.setOpacity(0);
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
			this.bar.innerHTML = "<div id=\"errorResults\"><center><b>"+translations['empty']+"</b></center></div>";
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
			this.bar.innerHTML += "<div class=\"loadingMoreInfo\">"+loading+"</div>";
			this.request = input;

			this.sendRequest("facility", "uicref="+input, function(response)
			{
				self.showResults(response);
				self.sendRequest("facility", "ref="+input, function(response)
				{
					self.showResults(response);
					self.sendRequest("facility", "name="+input, function(response)
					{
						var words = input.split(" ");
						for (var i=0; i<words.length; i++)
						{
							if (words[i].indexOf(",") > 0 || words[i].indexOf(".") > 0)
							{
								var pos = words[i];
								words.splice(i, 1);
								break;
							}
						}
						var ref = words.join(" ");

						if (pos)
						{
							self.sendRequest("milestone", "position="+pos+"&ref="+ref, function(response)
							{
								self.finishResults(response);
							});
						}
						else
							self.finishResults(response);
					});
				});
			});
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
			for (var i=0; i<results.length; i++)
			{
				var result = document.createElement("div");
				if (results[i]['type'] == "milestone")
					result.innerHTML = '<b>'+translations['kilometer']+' '+results[i]['position']+', '+translations['track']+' '+results[i]['ref']+'</b>';
				else if (results[i]['type'] == "level_crossing")
					result.innerHTML = '<b>'+translations['level_crossing']+' '+results[i]['position']+', '+translations['track']+' '+results[i]['ref']+'</b>';
				else
					result.innerHTML = '<b>'+results[i]['name']+'</b>';

				if (results[i]['type'] != null && typeof results[i]['type'] != undefined)
					result.innerHTML += '&nbsp;'+translations[results[i]['type']];
				if (results[i]['operator'] != null && typeof results[i]['operator'] != undefined)
					result.innerHTML += '<br /><dfn>'+results[i]['operator']+'</dfn>';

				selfSearch = this;
				result.setAttribute('class', 'resultEntry');
				result.onclick = new Function("selfSearch.showResult("+results[i]['lon']+", "+results[i]['lat']+");");

				this.bar.appendChild(result);
			}

			var loadingIndicator = document.createElement("div");
			loadingIndicator.setAttribute('class', 'loadingMoreInfo');
			loadingIndicator.innerHTML = loading;
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

			this.bar.innerHTML = "<div id=\"errorResults\"><center><b>"+translations['nothing']+"</b></center></div>";

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
		if (window.XMLHttpRequest)
			var request = new window.XMLHttpRequest;
		else
			var request = new ActiveXObject("MSXML2.XMLHTTP.3.0");

		request.open("GET", 'http://api.openrailwaymap.org/'+requestType+'?'+query.replace(/ /g, "+"), true);
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
