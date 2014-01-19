/*
OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
This program comes with ABSOLUTELY NO WARRANTY.
This is free software, and you are welcome to redistribute it under certain conditions.
See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.
*/


// configuring logging
var log4js = require('log4js');
log4js.configure(
{
	appenders:
	[
		{
			"type": "logLevelFilter",
			"level": "ERROR",
			"appender":
			{
				"type": "file",
				"filename": 'tileserver.log', 
				'maxLogSize': 20480,
				'backups': 0
			}
		},
		{
			"type": "logLevelFilter",
			"level": "INFO",
			"appender":
			{
				"type": "console"
			}
		}
	]
});
var logger = log4js.getLogger();
logger.setLevel('TRACE');


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
	logger.info('Master has started.');
}
// start tile server instance
else
{
	// rendering queue for expired tiles
	var queue = [];
	// continuosly render the queue in the background
	renderQueue();

	// include rendering styles
	for (var i=0; i<styles.length; i++)
		eval(fs.readFileSync('../styles/'+styles[i]+'.js')+'');


	// handle exceptions
	process.on('uncaughtException', function(err)
	{
		logger.fatal('An uncaughtException occurred:');
		logger.fatal(err.message);
		process.exit(1);
	});


	function onRequest(request, response)
	{
		if (toobusy())
		{
			logger.info('z'+zoom+'x'+x+'y'+y+' Server too busy. Aborting.');
			response.writeHead(503, {'Content-Type': 'text/plain'});
			response.end();
			return;
		}
		else
		{
			var pathname = url.parse(request.url).pathname;
			logger.info('Request for '+pathname+' received.');

			// request the current status
			if (pathname == "/status")
			{
				logger.debug('Returning current rendering status.');
				var listlength = queue.length || 0;
				response.writeHead(200, {'Content-Type': 'text/plain'});
				if (listlength == 0)
					response.end("All tiles were refreshed.\n");
				else
					response.end("Tiles to render: "+listlength+"\n");
				return;
			}
			// load list of expired tiles and mark tiles as expired
			else if (pathname == "/loadlist")
			{
				expireTileList("expired_tiles", function(err)
				{
					if (err)
					{
						response.writeHead(500, {'Content-Type': 'text/plain'});
						response.end("Tiles to render: "+listlength+"\n");
					}
					else
					{
						response.writeHead(200, {'Content-Type': 'text/plain'});
						response.end("Tiles to render: "+listlength+"\n");
					}
					return;
				});
			}
			// render all tiles on initial run
			else if (command == "/init")
			{
				logger.debug('Executing command init. Rendering all tiles on initial run.');
				var listlength = 0;
				for (var z = minZoom; z <= maxPrerender; z++)
					listlength += Math.pow(Math.pow(2, z), 2);

				response.writeHead(200, {'Content-Type': 'text/plain'});
				response.end("Will create "+parseInt(listlength/1000)+"k tiles as background daemon.\n");
				logger.debug('Initial rendering of all tiles in the background.');
				initQueue();
			}

			var params = pathname.split("/");
			if (params.length < 5 || params.length > 6)
			{
				logger.info('Request for '+pathname+' received.');
				logger.info('URL format of '+pathname+' not valid. Aborting.');
				response.writeHead(400, {'Content-Type': 'text/plain'});
				response.end();
				return;
			}

			var styleName = params[1];
			var zoom = params[2];
			var x = params[3];
			var y = params[4].replace(".png", "").replace(".js", "");
			var command = params[5];

			// check validity of parameters
			if (zoom == "" || !zoom.match(/^[0-9]+$/) || zoom < minZoom || zoom > maxZoom)
			{
				logger.info('z'+zoom+'x'+x+'y'+y+' Requested zoom level not valid. Aborting.');
				response.writeHead(403, {'Content-Type': 'text/plain'});
				response.end();
				return;
			}
			if (x == "" || !x.match(/^[0-9]+$/))
			{
				logger.info('z'+zoom+'x'+x+'y'+y+' Requested x not valid. Aborting.');
				response.writeHead(403, {'Content-Type': 'text/plain'});
				response.end();
				return;
			}
			if (y == "" || !y.match(/^[0-9]+$/))
			{
				logger.info('z'+zoom+'x'+x+'y'+y+' Requested y not valid. Aborting.');
				response.writeHead(403, {'Content-Type': 'text/plain'});
				response.end();
				return;
			}
			if (styleName == "" || (styles.indexOf(styleName) == -1 && styleName != "vector"))
			{
				logger.info('z'+zoom+'x'+x+'y'+y+' Requested rendering style '+styleName+' not valid. Aborting.');
				response.writeHead(403, {'Content-Type': 'text/plain'});
				response.end();
				return;
			}
			if (command != "dirty" && typeof command != "undefined")
			{
				logger.info('z'+zoom+'x'+x+'y'+y+' Requested command '+command+' not valid. Aborting.');
				response.writeHead(403, {'Content-Type': 'text/plain'});
				response.end();
				return;
			}


			// handle requests for vector tiles
			if (styleName == "vector")
			{
				logger.info('z'+zoom+'x'+x+'y'+y+' Vector tile requested.');
				readVectorTile(x, y, zoom, function(err, data)
				{
					if (err || command == "dirty")
					{
						if (err)
							logger.debug('z'+zoom+'x'+x+'y'+y+' Vectortile not cached, needs to be created...');
						if (command == "dirty")
							logger.debug('z'+zoom+'x'+x+'y'+y+' Vectortile dirty, needs to be refreshed...');

						getVectorData(x, y, zoom, function(err, data)
						{
							if (err)
							{
								logger.warn('z'+zoom+'x'+x+'y'+y+' Vectortile could not be created. Aborting.');
								response.writeHead(500, {'Content-Type': 'application/javascript'});
								response.end();
								return;
							}
							logger.debug('z'+zoom+'x'+x+'y'+y+' Vector tile created successfully, saving vector tile...');
							var jsondata = JSON.stringify(data);
							saveVectorTile(jsondata, x, y, zoom, function(err)
							{
								if (err)
									logger.warn('z'+zoom+'x'+x+'y'+y+' Vector tile could not be saved.');

								logger.debug('z'+zoom+'x'+x+'y'+y+' Returning vector tile...');
								response.writeHead(200, {'Content-Type': 'application/javascript'});
								response.end(getVectorDataString(jsondata, x, y, zoom));
								logger.debug('z'+zoom+'x'+x+'y'+y+' Finished request.');
							});
						});
					}
					else
					{
						// check if tile is expired and add it to the queue if necessary
						if (isTileExpired(zoom, x, y))
						{
							addTileToQueue(zoom, x, y);
							logger.debug('z'+zoom+'x'+x+'y'+y+' Tile expired, added it to the queue...');
						}

						logger.debug('z'+zoom+'x'+x+'y'+y+' Returning vector tile...');
						response.writeHead(200, {'Content-Type': 'application/javascript'});
						response.end(getVectorDataString(JSON.stringify(data), x, y, zoom));
						logger.debug('z'+zoom+'x'+x+'y'+y+' Finished request.');
					}
				});
			}
			// handle requests for bitmap tiles
			else
			{
				logger.info('z'+zoom+'x'+x+'y'+y+' Bitmap tile requested.');
				fs.exists(tiledir+'/'+styleName+'/'+zoom+'/'+x+'/'+y+'.png', function(exists)
				{
					// if tile is already rendered, return the cached image
					if (exists && typeof command == "undefined")
					{
						// check if tile is expired and add it to the queue if necessary
						if (isTileExpired(zoom, x, y))
						{
							addTileToQueue(zoom, x, y);
							logger.debug('z'+zoom+'x'+x+'y'+y+' Tile expired, added it to the queue...');
						}

						logger.debug('z'+zoom+'x'+x+'y'+y+' Bitmap tile already rendered, returning cached data...');
						fs.readFile(tiledir+'/'+styleName+'/'+zoom+'/'+x+'/'+y+'.png', function(err, data)
						{
							if (err)
							{
								logger.warn('z'+zoom+'x'+x+'y'+y+' Cannot read cached bitmap tile. Returning status 500.');
								response.writeHead(500, {'Content-Type': 'text/plain'});
								response.end();
								return;
							}

							logger.trace('z'+zoom+'x'+x+'y'+y+' Returning bitmap tile...');
							response.writeHead(200, {'Content-Type': 'image/png'});
							response.end(data);
							logger.debug('z'+zoom+'x'+x+'y'+y+' Bitmap tile returned.');
							logger.debug('z'+zoom+'x'+x+'y'+y+' Finished request.');
						});
					}
					// otherwise render the tile
					else
					{
						logger.debug('z'+zoom+'x'+x+'y'+y+' Bitmap tile not cached...');
						// get vector tile when map icons were loaded
						MapCSS.onImagesLoad = function()
						{
							logger.trace('z'+zoom+'x'+x+'y'+y+' MapCSS style successfully loaded.');
							logger.debug('z'+zoom+'x'+x+'y'+y+' Trying to open vectortile at path: '+vtiledir+'/'+zoom+'/'+x+'/'+y+'.js');
							readVectorTile(x, y, zoom, function(err, data)
							{
								var onRenderEnd = function(err, image)
								{
									if (err)
										logger.debug('z'+zoom+'x'+x+'y'+y+' Vectortile was empty.');

									var filepath = tiledir+'/'+styleName+'/'+zoom+'/'+x;
									logger.debug('z'+zoom+'x'+x+'y'+y+' Rendering successful.');
									logger.debug('z'+zoom+'x'+x+'y'+y+' Saving bitmap tile at path: '+filepath);
									mkdirp(filepath, function(err)
									{
										logger.trace('z'+zoom+'x'+x+'y'+y+' Creating path '+filepath+'...');
										if (err)
										{
											logger.error('z'+zoom+'x'+x+'y'+y+' Cannot create path: '+filepath);
											response.writeHead(500, {'Content-Type': 'text/plain'});
											response.end();
											return;
										}

										if (image == null)
										{
											logger.debug('z'+zoom+'x'+x+'y'+y+' Bitmap tile empty.');

											// return empty tile
											fs.readFile('emptytile.png', function(err, data)
											{
												if (err)
												{
													logger.warn('z'+zoom+'x'+x+'y'+y+' Could not read empty bitmap tile. Returning status 500.');
													response.writeHead(500, {'Content-Type': 'text/plain'});
													response.end();
													return;
												}

												fs.writeFile(filepath+'/'+y+'.png', data, {mode: 0777}, function(err)
												{
													if (!err)
														logger.debug('z'+zoom+'x'+x+'y'+y+' Empty bitmap tile was stored.');
													else
														logger.debug('z'+zoom+'x'+x+'y'+y+' Could not save empty bitmap file.');

													response.writeHead(200, {'Content-Type': 'image/png'});
													response.end(data);
													logger.debug('z'+zoom+'x'+x+'y'+y+' Empty bitmap tile was responded to the request.');
													logger.debug('z'+zoom+'x'+x+'y'+y+' Finished request.');
												});
											});
										}
										else
										{
											logger.trace('z'+zoom+'x'+x+'y'+y+' Bitmap tile not empty. Responding bitmap data...');
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
												out.end();
												response.end();
												logger.debug('z'+zoom+'x'+x+'y'+y+' Bitmap tile was stored.');
												logger.debug('z'+zoom+'x'+x+'y'+y+' Bitmap tile was responded to the request.');
												logger.debug('z'+zoom+'x'+x+'y'+y+' Finished request.');
											});
										}
									});
								};

								if (err || command == "dirty")
								{
									if (err)
										logger.debug('z'+zoom+'x'+x+'y'+y+' Vectortile not cached, needs to be created...');
									if (command == "dirty")
										logger.debug('z'+zoom+'x'+x+'y'+y+' Vectortile dirty, needs to be refreshed...');

									getVectorData(x, y, zoom, function(err, data)
									{
										if (err)
										{
											logger.warn('z'+zoom+'x'+x+'y'+y+' Vectortile could not be created. Aborting.');
											response.writeHead(500, {'Content-Type': 'text/plain'});
											response.end();
											return;
										}
										logger.debug('z'+zoom+'x'+x+'y'+y+' Vector tile created successfully, saving vector tile...');
										saveVectorTile(JSON.stringify(data), x, y, zoom, function(err)
										{
											if (err)
												logger.warn('z'+zoom+'x'+x+'y'+y+' Vector tile could not be saved.');

											logger.debug('z'+zoom+'x'+x+'y'+y+' Rendering bitmap tile with style '+styleName);
											renderTile(zoom, x, y, styleName, data, onRenderEnd);
										});
									});
								}
								else
								{
									// check if tile is expired and add it to the queue if necessary
									if (isTileExpired(zoom, x, y))
									{
										addTileToQueue(zoom, x, y);
										logger.debug('z'+zoom+'x'+x+'y'+y+' Tile expired, added it to the queue...');
									}

									logger.debug('z'+zoom+'x'+x+'y'+y+' Rendering bitmap tile with style '+styleName);
									renderTile(zoom, x, y, styleName, data, onRenderEnd);
								}
							});
						};
						// load map icons
						logger.trace('z'+zoom+'x'+x+'y'+y+' Loading MapCSS style '+styleName);
						MapCSS.preloadSpriteImage(styleName, "../styles/"+styleName+".png");
					}
				});
			}
		}
	}

	http.createServer(onRequest).listen(9000);
	logger.info('Worker has started.');
}
