/*
OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
This program comes with ABSOLUTELY NO WARRANTY.
This is free software, and you are welcome to redistribute it under certain conditions.
See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.
*/


// load node.js modules and functions
var fs = require('fs');
eval(fs.readFileSync('renderer-functions.js')+'');


// include rendering styles
for (var i=0; i<styles.length; i++)
	eval(fs.readFileSync('../styles/'+styles[i]+'.js')+'');


// rendering queue
var queue = [];

// handle exceptions
process.on('uncaughtException', function(err)
{
	console.error('An uncaughtException occurred.');
	console.error(err.message);
	process.exit(1);
});

function onRequest(request, response)
{
	var command = request.url.slice(1, -1);
	if (debug)
		console.log("Request "+command+" received.");

	// render all tiles that are in the queue
	if (command == "loadlist")
	{
		addExpiredTilesToQueue('expired_tiles', function(err)
		{
			if (!err)
			{
				response.writeHead(200, {'Content-Type': 'text/plain'});
				response.end("Will refresh "+parseInt(queue.length/1000)+"k tiles as background daemon.\n");
				renderQueue();
			}
			else
			{
				console.log("Invalid command receviced: "+command);
				response.writeHead(500, {'Content-Type': 'text/plain'});
				response.end("Could not load list of expired tiles.\n");
			}
		});
	}
	// request the current status
	else if (command == "status")
	{
		var listlength = queue.length || 0;
		response.writeHead(200, {'Content-Type': 'text/plain'});
		if (listlength == 0)
			response.end("All tiles were refreshed.\n");
		else
			response.end("Tiles to render: "+parseInt(listlength/1000)+"k\n");
	}
	// render all tiles on initial run
	else if (command == "init")
	{
		var listlength = 0;
		for (var z = 0; z <= maxprerender; z++)
			listlength += Math.pow(Math.pow(2, z), 2);

		response.writeHead(200, {'Content-Type': 'text/plain'});
		response.end("Will create "+parseInt(listlength/1000)+"k tiles as background daemon.\n");
		initQueue();
	}
	else
	{
		console.log("Invalid command receviced: "+command);
		response.writeHead(403, {'Content-Type': 'text/plain'});
		response.end();
	}
}

http.createServer(onRequest).listen(9001);
