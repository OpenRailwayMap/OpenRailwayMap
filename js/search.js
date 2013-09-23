/*
OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
This program comes with ABSOLUTELY NO WARRANTY.
This is free software, and you are welcome to redistribute it under certain conditions.
See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.
*/


function Search(map, box, bar, searchButton, clearButton)
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
			input = input.replace(/ /g, "+");

			var handler = function(response)
					{
						self.showResults(response);
					}

			requestApi("search", "format=html&q="+input+"&lang="+params['lang'], handler);
		}
	}

	// shows the returned search results
	this.showResults = function(response)
    {
    	if (!response)
    	{
    		this.clear();
    		return false;
    	}

		var results = JSON.parse(response.responseText);
		if (results.length > 0)
		{
			results = results[0];
			this.bar.removeChild(this.bar.lastChild);
			for (var i=0; i<results.length; i++)
			{
				var result = document.createElement("div");
				if (results[i]['type'] == "milestone")
				{
					result.innerHTML = '<b>'+translations['kilometer']+' '+results[i]['position']+', '+translations['track']+' '+results[i]['ref']+'</b>';
					if (results[i]['type'] != null && typeof results[i]['type'] != undefined)
						result.innerHTML += '&nbsp;'+translations[results[i]['type']];
					if (results[i]['operator'] != null && typeof results[i]['operator'] != undefined)
						result.innerHTML += '<br /><dfn>'+results[i]['operator']+'</dfn>';
				}
				else
				{
					result.innerHTML = '<b>'+results[i]['name']+'</b>';
					if (results[i]['type'] != null && typeof results[i]['type'] != undefined)
						result.innerHTML += '&nbsp;'+translations[results[i]['type']];
					if (results[i]['operator'] != null && typeof results[i]['operator'] != undefined)
						result.innerHTML += '<br /><dfn>'+results[i]['operator']+'</dfn>';
				}
				result.setAttribute('class', 'resultEntry');
				selfSearch = this;
				result.onclick = new Function("selfSearch.showResult("+results[i]['lon']+", "+results[i]['lat']+");");
				this.bar.appendChild(result);
			}
		}
		// if no results were found
		else
		{
			var bar = this.bar.id;

			this.bar.innerHTML = "<div id=\"errorResults\"><center><b>"+translations['nothing']+"</b></center></div>";
			setTimeout("gEBI('"+bar+"').innerHTML = ''; gEBI('"+bar+"').className = 'infoBarOut';", 3500);
			this.bar.className = "infoBar";
		}
    }

	// called when clicking on a search results, jumps to point and draws something on the map
	this.showResult = function(lat, lon)
	{
		// move to position
		this.map.panTo(new L.LatLng(lat, lon));
		this.map.setZoom(13);
	}


	this.map = map;
	this.layer = null;
	this.box = gEBI(box);
	this.searchButton = gEBI(searchButton);
	this.clearButton = gEBI(clearButton);
	this.bar = gEBI(bar);
	this.request = "";

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
			if(event && keyCode == 13)
				self.send();
		};

	// perform search request if search parameter is set
	if (params['searchquery'])
	{
		this.box.value = params['searchquery'];
		this.send();
	}
}
