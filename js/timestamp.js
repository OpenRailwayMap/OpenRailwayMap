/*
OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
This program comes with ABSOLUTELY NO WARRANTY.
This is free software, and you are welcome to redistribute it under certain conditions.
See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.
*/


function Timestamp(box)
{
	var self = this;

	// returns an human-readable string of the given time difference
	this.timeAgoString = function(diff)
	{
		// input is in milliseconds
		diff /= 1000;

		// list of units and their conversion factors
		var units = [
			[60, "%d second"],
			[60, "%d minute"],
			[24, "%d hour"],
			[7, "%d day"],
			[4, "%d week"],
			[12, "%d month"]
		];

		// calculating difference as human readable string
		for (var i=0; i<units.length; i++)
		{
			if (diff >= units[i][0])
				diff = diff / units[i][0];
			else
				break;
		}

		var human = Math.floor(diff);
		return _(units[i][1], human);
	}

	// requests the timestamp
	this.get = function()
	{
		requestAPI("timestamp", null, function(response)
		{
			if (response && response.length > 0)
			{
				var timestamp = parseInt(response);
				var lastUpdate = new Date(0);
				lastUpdate.setUTCSeconds(timestamp);
				var now = new Date();
				var lastUpdateString = lastUpdate.toLocaleString();
				var agoString = self.timeAgoString(now.getTime() - lastUpdate.getTime());
				self.box.innerHTML = _("Last update") + ":<br />" + lastUpdateString + ", " + _("%s ago").replace(/%s/, agoString);
			}
			// cannot fetch update timestamp
			else
				self.box.innerHTML = "";
		});
    }

	this.box = gEBI(box);

	// initial loading of timestamp of last database update
	this.get();

	// update timestamp every 10 minutes
	var updateTimer = setInterval(self.get, 600000);
}
