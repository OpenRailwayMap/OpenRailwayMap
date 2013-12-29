/*
OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
This program comes with ABSOLUTELY NO WARRANTY.
This is free software, and you are welcome to redistribute it under certain conditions.
See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.
*/


// load node.js modules and functions
var fs = require('graceful-fs');
eval(fs.readFileSync('renderer-functions.js')+'');


// fork workers
if (cluster.isMaster)
{
	for (var i=0; i<cpus; i++)
		cluster.fork();
	cluster.on("exit", function(worker, code, signal)
	{
		cluster.fork();
	});
	console.log("Master has started.");
}
// start tile server instance
else
{
	// include rendering styles
	for (var i=0; i<styles.length; i++)
		eval(fs.readFileSync('../styles/'+styles[i]+'.js')+'');

	// handle exceptions
	process.on('uncaughtException', function(err)
	{
		console.error('An uncaughtException occurred.');
		console.error(err.message);
		process.exit(1);
	});

	function onRequest(request, response)
	{
		var pathname = url.parse(request.url).pathname;
		if (debug)
			console.log("Request for "+pathname+" received.");

		var params = pathname.split("/");
		if (params.length < 5 || params.length > 6)
		{
			if (debug)
				console.log("URL format not valid. Aborting.");
			response.writeHead(400, {'Content-Type': 'text/plain'});
			response.end();
			return;
		}

		var styleName = params[1];
		var zoom = params[2];
		var x = params[3];
		var y = params[4].replace(".png", "");
		var command = params[5];

		// check validity of parameters
		if (zoom == "" || !zoom.match(/^[0-9]+$/) || zoom < minZoom || zoom > maxZoom)
		{
			console.log("z"+zoom+"x"+x+"y"+y+" Requested zoom level not valid. Aborting.");
			response.writeHead(403, {'Content-Type': 'text/plain'});
			response.end();
			return;
		}
		if (x == "" || !x.match(/^[0-9]+$/))
		{
			console.log("z"+zoom+"x"+x+"y"+y+" Requested x not valid. Aborting.");
			response.writeHead(403, {'Content-Type': 'text/plain'});
			response.end();
			return;
		}
		if (y == "" || !y.match(/^[0-9]+$/))
		{
			console.log("z"+zoom+"x"+x+"y"+y+" Requested y not valid. Aborting.");
			response.writeHead(403, {'Content-Type': 'text/plain'});
			response.end();
			return;
		}
		if (styleName == "" || styles.indexOf(styleName) == -1)
		{
			console.log("z"+zoom+"x"+x+"y"+y+" Requested rendering style not valid. Aborting.");
			response.writeHead(403, {'Content-Type': 'text/plain'});
			response.end();
			return;
		}
		if (command != "dirty" && typeof command != "undefined")
		{
			console.log("z"+zoom+"x"+x+"y"+y+" Requested command '"+command+"' not valid. Aborting.");
			response.writeHead(403, {'Content-Type': 'text/plain'});
			response.end();
			return;
		}

		fs.exists(tiledir+'/'+styleName+'/'+zoom+'/'+x+'/'+y+'.png', function(exists)
		{
			// if tile is already rendered, return the cached image
			if (exists && typeof command == "undefined")
			{
				if (debug)
					console.log("z"+zoom+"x"+x+"y"+y+" Tile already rendered, returning cached data...");
				fs.readFile(tiledir+'/'+styleName+'/'+zoom+'/'+x+'/'+y+'.png', function(err, data)
				{
					if (err)
					{
						response.writeHead(500, {'Content-Type': 'text/plain'});
						response.end();
						return;
					}

					response.writeHead(200, {'Content-Type': 'image/png'});
					response.end(data);
					if (debug)
					{
						console.log("z"+zoom+"x"+x+"y"+y+" Bitmap tile returned.");
						console.log("z"+zoom+"x"+x+"y"+y+" Finished.");
					}
				});
			}
			// otherwise render the tile
			else
			{
				// get vector tile when map icons were loaded
				MapCSS.onImagesLoad = function()
				{
					if (debug)
					{
						console.log("z"+zoom+"x"+x+"y"+y+" Rendering tile z"+zoom+" x"+x+" y"+y+" with style "+styleName);
						console.log("z"+zoom+"x"+x+"y"+y+" Trying to open vectortile at path: "+vtiledir+'/'+zoom+'/'+x+'/'+y+'.js');
					}
					readVectorTile(x, y, zoom, function(err, data)
					{
						var onRenderEnd = function(err, image)
						{
							if (err && debug)
									console.log("z"+zoom+"x"+x+"y"+y+" Vectortile was empty.");

							var filepath = tiledir+'/'+styleName+'/'+zoom+'/'+x;
							if (debug)
							{
								console.log("z"+zoom+"x"+x+"y"+y+" Rendering successful.");
								console.log("z"+zoom+"x"+x+"y"+y+" Saving bitmap tile at path: "+filepath);
							}
							mkdirp(filepath, function(err)
							{
								if (err)
									return;

								if (image == null)
								{
									if (debug)
										console.log("z"+zoom+"x"+x+"y"+y+" Tile empty.");

									// return empty tile
									fs.readFile('emptytile.png', function(err, data)
									{
										if (err)
										{
											console.log("z"+zoom+"x"+x+"y"+y+" Could not read empty bitmap tile.");
											console.log("z"+zoom+"x"+x+"y"+y+" Finished.");
											response.writeHead(500, {'Content-Type': 'text/plain'});
											response.end();
											return;
										}

										fs.writeFile(filepath+'/'+y+'.png', data, {mode: 0777}, function(err)
										{
											response.writeHead(200, {'Content-Type': 'image/png'});
											response.end(data);
											if (!err)
											{
												if (debug)
												{
													console.log("z"+zoom+"x"+x+"y"+y+" Empty bitmap tile was stored.");
													console.log("z"+zoom+"x"+x+"y"+y+" Empty bitmap tile was responded to the request.");
													console.log("z"+zoom+"x"+x+"y"+y+" Finished.");
												}
											}
											else
												console.log("z"+zoom+"x"+x+"y"+y+" Could not write empty bitmap file.");
										});
									});
								}
								else
								{
									var out = fs.createWriteStream(filepath+'/'+y+'.png', {mode: 0777});
									var stream = image.createPNGStream();
									response.writeHead(200, {'Content-Type': 'image/png'});

									// write PNG data stream
									stream.on('data', function(data)
									{
										out.write(data);
										response.write(data);
									});

									// PNG data stream ended
									stream.on('end', function()
									{
										response.end();
										if (debug)
										{
											console.log("z"+zoom+"x"+x+"y"+y+" Bitmap tile was stored.");
											console.log("z"+zoom+"x"+x+"y"+y+" Bitmap tile was responded to the request.");
											console.log("z"+zoom+"x"+x+"y"+y+" Finished.");
										}
									});
								}
							});
						};

						if (err || command == "dirty")
						{
							if (debug && err)
								console.log("z"+zoom+"x"+x+"y"+y+" Vectortile not cached, needs to be created...");
							if (debug && command == "dirty")
								console.log("z"+zoom+"x"+x+"y"+y+" Vectortile dirty, needs to be refreshed...");

							getVectorData(x, y, zoom, function(err, data)
							{
								if (err)
								{
									console.log("z"+zoom+"x"+x+"y"+y+" Vectortile could not be created. Aborting.");
									return;
								}

								saveVectorTile(JSON.stringify(data), x, y, zoom, function(err)
								{
									if (err)
										console.log("z"+zoom+"x"+x+"y"+y+" Vector tile could not be saved.");

									renderTile(zoom, x, y, styleName, data, onRenderEnd);
								});
							});
						}
						else
							renderTile(zoom, x, y, styleName, data, onRenderEnd);
					});
				};
				// load map icons
				MapCSS.preloadSpriteImage(styleName, "../styles/"+styleName+".png");
			}
		});
	}

	http.createServer(onRequest).listen(9000);
	console.log("Worker has started.");
}
