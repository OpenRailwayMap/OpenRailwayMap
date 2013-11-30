/*
OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
This program comes with ABSOLUTELY NO WARRANTY.
This is free software, and you are welcome to redistribute it under certain conditions.
See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.
*/


// show only error messages (false) or verbose output (true)
var debug = false;
// size of tiles
var tileSize = 256*4;
// relative or absolute path to the vector tile directory
var vtiledir = "../tiles";
// relative or absolute path to the bitmap tile directory
var tiledir = "../bitmap-tiles";
// relative or absolute path to the directory of the required scripts
var scriptdir = "../js/";
// zoom offset
var zoomOffset = 2;
// minimal and maximal zoom level
var minZoom = 2;
var maxZoom = 22;
// list of existing rendering styles
var styles = new Array("standard", "maxspeed", "signals");


// load node.js modules
var cluster = require('cluster');
var cpus = require('os').cpus().length;


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
	// load node.js modules
	var fs = require('fs');
	var Canvas = require('canvas');
	var rbush = require('rbush');
	var assert = require('assert');
	var http = require("http");
	var url = require("url");
	var mkdirp = require('mkdirp');
	var exec = require('child_process').exec;
	Image = Canvas.Image;


	// include necessary libraries
	eval(fs.readFileSync(scriptdir+'kothic.js')+'');
	eval(fs.readFileSync(scriptdir+'renderer/path.js')+'');
	eval(fs.readFileSync(scriptdir+'renderer/line.js')+'');
	eval(fs.readFileSync(scriptdir+'renderer/polygon.js')+'');
	eval(fs.readFileSync(scriptdir+'renderer/shields.js')+'');
	eval(fs.readFileSync(scriptdir+'renderer/path.js')+'');
	eval(fs.readFileSync(scriptdir+'renderer/texticons.js')+'');
	eval(fs.readFileSync(scriptdir+'renderer/path.js')+'');
	eval(fs.readFileSync(scriptdir+'renderer/text.js')+'');
	eval(fs.readFileSync(scriptdir+'style/mapcss.js')+'');
	eval(fs.readFileSync(scriptdir+'style/style.js')+'');
	eval(fs.readFileSync(scriptdir+'utils/collisions.js')+'');
	eval(fs.readFileSync(scriptdir+'utils/geom.js')+'');
	eval(fs.readFileSync(scriptdir+'utils/collisions.js')+'');


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


	// workaround to emulate browser properties
	var window = new Object;
	window.devicePixelRatio = 1;
	// workaround to emulate browser frame method
	window.requestAnimationFrame = (
		function()
		{
			return function(callback)
			{
				callback();
			};
		}
	)();
	// workaround to emulate dom functions
	var document = new Object;
	document.createElement = function()
	{
		return new Canvas();
	}


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

		fs.exists(tiledir+'/'+styleName+'/'+zoom+'/'+x+'/'+y+'.png', function(exists) {
			// if tile is already rendered, return the cached image
			if (exists && typeof command == "undefined")
			{
				if (debug)
					console.log("z"+zoom+"x"+x+"y"+y+" Tile already rendered, returning cached data...");
				fs.readFile(tiledir+'/'+styleName+'/'+zoom+'/'+x+'/'+y+'.png', function(err, data) {
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
						console.log("z"+zoom+"x"+x+"y"+y+" Rendering tile z"+zoom+" x"+x+" y"+y+" with style "+styleName);

					var filepath = vtiledir+'/'+zoom+'/'+x+'/'+y+'.js';
					if (debug)
						console.log("z"+zoom+"x"+x+"y"+y+" Trying to open vectortile at path: "+filepath);
					fs.readFile(filepath, function (err, data)
					{
						var renderTile = function(tiledata)
						{
							tiledata = tiledata.toString();
							// we need only the GeoJSON features
							tiledata = tiledata.replace("onKothicDataResponse(", "");
							tiledata = tiledata.replace(","+zoom+","+x+","+y+");", "");

							// parse JSON format
							var features = new Object;
							try
							{
								features = JSON.parse(tiledata);
							}
							catch(e)
							{
								console.log("z"+zoom+"x"+x+"y"+y+" A problem occurred while parsing json data.");
								response.writeHead(503, {'Content-Type': 'text/plain'});
								response.end();
								return;
							}

							// catch tiles without data
							if (features.features.length == 0)
							{
								if (debug)
									console.log("z"+zoom+"x"+x+"y"+y+" Vectortile was empty.");
								response.writeHead(404, {'Content-Type': 'text/plain'});
								response.end();
								return;
							}
							if (debug)
							{
								console.log("z"+zoom+"x"+x+"y"+y+" Vectortile was openend successfully.");
								console.log("z"+zoom+"x"+x+"y"+y+" Rendering data...");
							}

							// start bitmap rendering
							var canvas = new Canvas(tileSize, tileSize);
							canvas.style = new Object();
							invertYAxe(features);

							MapCSS.invalidateCache();
							MapCSS.availableStyles.length = 0;
							MapCSS.availableStyles.push(styleName);

							Kothic.render(canvas, features, parseInt(zoom)+zoomOffset, {
								styles: MapCSS.availableStyles,
								onRenderComplete: function()
								{
									var filepath = tiledir+'/'+styleName+'/'+zoom+'/'+x;
									if (debug)
									{
										console.log("z"+zoom+"x"+x+"y"+y+" Rendering successful.");
										console.log("z"+zoom+"x"+x+"y"+y+" Saving bitmap tile at path: "+filepath);
									}
									mkdirp(filepath, function (err)
									{
										if (err)
											return;

										var out = fs.createWriteStream(filepath+'/'+y+'.png', {mode: 0777});
										var stream = canvas.createPNGStream();
										response.writeHead(200, {'Content-Type': 'image/png'});

										// write PNG data stream
										stream.on('data', function(data) {
											out.write(data);
											response.write(data);
										});

										// PNG data stream ended
										stream.on('end', function() {
											response.end();
											if (debug)
											{
												console.log("z"+zoom+"x"+x+"y"+y+" Bitmap tile was stored.");
												console.log("z"+zoom+"x"+x+"y"+y+" Bitmap tile was responded to the request.");
												console.log("z"+zoom+"x"+x+"y"+y+" Finished.");
											}
										});
									});
								}
							});
						};

						if (err)
						{
							if (debug)
								console.log("z"+zoom+"x"+x+"y"+y+" Vectortile not cached, needs to be created...");

							execute("php vtiler.php "+zoom+" "+x+" "+y, function (response)
							{
								fs.readFile(filepath, function (err, data)
								{
									if (err)
									{
										console.log("z"+zoom+"x"+x+"y"+y+" Vectortile could not be created. Aborting.");
										return;
									}
									renderTile(data);
								});
							});
						}
						else if (command == "dirty")
						{
							if (debug)
								console.log("z"+zoom+"x"+x+"y"+y+" Vectortile dirty, needs to be refreshed...");

							execute("php vtiler.php "+zoom+" "+x+" "+y, function(response)
							{
								fs.readFile(filepath, function (err, data)
								{
									if (err)
									{
										console.log("z"+zoom+"x"+x+"y"+y+" Vectortile could not be created. Aborting.");
										return;
									}
									renderTile(data);
								});
							});
						}
						else
							renderTile(data);
					});
				};
				// load map icons
				MapCSS.preloadSpriteImage(styleName, "../styles/"+styleName+".png");
			}
		});
	}


	// helper function to invert the y axe of the data
	function invertYAxe(data)
	{
		var type, coordinates, tileSize = data.granularity, i, j, k, l, feature;

		for (i = 0; i < data.features.length; i++)
		{
		    feature = data.features[i];
		    coordinates = feature.coordinates;
		    type = data.features[i].type;
		    if (type === 'Point')
		        coordinates[1] = tileSize - coordinates[1];
			else if (type === 'MultiPoint' || type === 'LineString')
		        for (j = 0; j < coordinates.length; j++) 
		            coordinates[j][1] = tileSize - coordinates[j][1];
			else if (type === 'MultiLineString' || type === 'Polygon')
		        for (k = 0; k < coordinates.length; k++)
		            for (j = 0; j < coordinates[k].length; j++)
		                coordinates[k][j][1] = tileSize - coordinates[k][j][1];
			else if (type === 'MultiPolygon')
		        for (l = 0; l < coordinates.length; l++)
		            for (k = 0; k < coordinates[l].length; k++)
		                for (j = 0; j < coordinates[l][k].length; j++)
		                    coordinates[l][k][j][1] = tileSize - coordinates[l][k][j][1];
			else
		        throw "Unexpected GeoJSON type: " + type;

		    if (feature.hasOwnProperty('reprpoint'))
		        feature.reprpoint[1] = tileSize - feature.reprpoint[1];
		}
	}


	// helper function to execute commands
	function execute(command, callback)
	{
		exec(command, {maxBuffer: 4000*1024, timeout: 30000}, function(error, stdout, stderr)
		{
	console.log(stdout);
			if (stderr != "")
				console.log(stderr);
			callback(stdout);
		});
	}

	http.createServer(onRequest).listen(9000);
	console.log("Worker has started.");
}
