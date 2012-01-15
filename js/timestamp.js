/*
OpenLinkMap Copyright (C) 2010 Alexander Matheisen
This program comes with ABSOLUTELY NO WARRANTY.
This is free software, and you are welcome to redistribute it under certain conditions.
See http://wiki.openstreetmap.org/wiki/OpenLinkMap for details.
*/


function Timestamp(box)
{
	// requests the timestamp
	this.get = function()
	{
		var self = this;

		// make request of timestamp of last db update
		var handler = function(response)
			{
				self.show(response.responseText);
			}
		requestApi("timestamp", "format=text&offset="+offset+"&lang="+params['lang'], handler);
    }

	// shows the requested timestamp
	this.show = function(response)
	{
		if ((response.length > 0) && (response != "NULL"))
			this.box.innerHTML = translations['update']+"<br />"+response;
	}


	this.box = gEBI(box);

	// update timestamp of last database update
	this.get();

	var self = this;
	var command = function()
		{
			self.get();
		}
	// update timestamp every minute
	timer = setInterval(command, 60000);
}
