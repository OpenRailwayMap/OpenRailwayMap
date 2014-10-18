/*
OpenRailwayMap Copyright (C) 2014 Alexander Matheisen
This program comes with ABSOLUTELY NO WARRANTY.
This is free software, and you are welcome to redistribute it under certain conditions.
See https://github.com/rurseekatze/OpenRailwayMap for details.
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
				"filename": 'api.log', 
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
// load configuraion file
configuration = require('./config.json');


// include necessary modules
var cluster = require('cluster');
var os = require('os');
var assert = require('assert');
var http = require("http");
var url = require("url");
var pg = require('pg');
var toobusy = require('toobusy');

// include query modules
milestone = require('./milestone.js');
facility = require('./facility.js');
networklength = require('./networklength.js');

// possible request types
var queries = ['milestone', 'facility', 'networklength'];

// number of cpus
var cpus = os.cpus().length;

// maximum count of concurrent http connections
http.globalAgent.maxSockets = configuration.maxsockets;

// response headers
var headers = {};
headers["Access-Control-Allow-Origin"] = "*";
headers["Access-Control-Allow-Methods"] = "GET";
headers["Access-Control-Allow-Credentials"] = false;
headers["Access-Control-Max-Age"] = '86400';
headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";


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
			logger.info('Server too busy. Aborting.');
			headers["Content-Type"] = "text/plain";
			response.writeHead(503, headers);
			response.end();
			return;
		}
		else
		{
			var query = url.parse(request.url, true);
			var params = query.query;

			// escape input parameters to avoid sql injections
			for (var key in params)
			{
				params[key] = params[key].trim().replace("%", "").replace("*", "").replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
					switch (char) {
						case "\0":
						    return "\\0";
						case "\x08":
						    return "\\b";
						case "\x09":
						    return "\\t";
						case "\x1a":
						    return "\\z";
						case "\n":
						    return "\\n";
						case "\r":
						    return "\\r";
						case "\"":
						case "'":
						case "\\":
						case "%":
						    return "\\"+char;
					}
				});
			}
			
			var requestType = query.pathname.substr(1);

			logger.info('Received '+requestType+' request with params '+JSON.stringify(params));

			var responseHandler = function(err, data)
			{
				if (err)
				{
					logger.warn('An error occurred during '+requestType+' request: "'+err+'" Aborting.');
					headers["Content-Type"] = "text/plain";
					response.writeHead(500, headers);
					response.end();
					return;
				}

				logger.trace('Returning response...');

				// parse GeoJSON database response to object
				if (data.rows[0] && data.rows[0].geometry)
					for (i=0; i<data.rows.length; i++)
						data.rows[i].geometry = JSON.parse(data.rows[i].geometry);

				if (data.rows.length == 0)
					data.rows = {};
				
				headers["Content-Type"] = "application/javascript";
				response.writeHead(200, headers);

				if (params.callback)
					response.end(params.callback+'('+JSON.stringify(data.rows)+')');
				else
					response.end(JSON.stringify(data.rows));

				logger.trace('Finished request.');

				client.end();
			};

			var connection = "postgres://postgres@localhost/"+configuration.database;
			var client = new pg.Client(connection);

			logger.trace('Connecting to database '+connection+'...');
			client.connect(function(err)
			{
				if (err)
				{
					logger.error('Connection to database '+connection+' failed. Returning.');
					headers["Content-Type"] = "text/plain";
					response.writeHead(500, headers);
					response.end();
					return;
				}

				// if valid request
				if (queries.indexOf(requestType) > -1)
				{
					var sqlquery = eval(requestType+"(params)");
					
					if (!sqlquery)
					{
						client.end();
						headers["Content-Type"] = "text/plain";
						response.writeHead(200, headers);
						response.end("[]");
						logger.error("Invalid parameters: "+JSON.stringify(params));
						return;
					}		

					client.query(sqlquery, responseHandler);
				}
				else
				{
					client.end();
					headers["Content-Type"] = "text/plain";
					response.writeHead(200, headers);
					response.end("[]");
					if (requestType != "favicon.ico")
						logger.error("Invalid request: "+requestType);
					return;
				}			
			});
		}
	}

	http.createServer(onRequest).listen(9002);
	logger.info('Worker has started.');
}
