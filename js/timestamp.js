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
		// singular and plural forms of units and their conversion factors
		// TODO add translation strings here
		var units = [
			[60, "%d second", "%d seconds"],
			[60, "%d minute", "%d minutes"],
			[24, "%d hour", "%d hours"],
			[7, "%d day", "%d days"],
			[4, "%d week", "%d weeks"],
			[12, "%d month", "%d months"]
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
		// TODO parse pluralForms expression here
		//var plural = pluralIndex(human);
		var plural = 0;
		return units[i][plural+1].replace(/%s/, human);
	}

	// requests the timestamp
	this.get = function()
	{
		requestAPI("timestamp", null, function(response)
		{
			if (response && response.responseText.length > 0)
			{
				var timestamp = parseInt(response.responseText);
				var lastUpdate = new Date(0);
				lastUpdate.setUTCSeconds(timestamp);
				var now = new Date();
				var lastUpdateString = lastUpdate.toLocaleString();
				var agoString = self.timeAgoString(now.getTime() - lastUpdate.getTime());
				self.box.innerHTML = translations['update'] + ":<br />" + lastUpdateString + ", " + translations['ago'].replace(/%s/, agoString);
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
