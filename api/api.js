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
var Pool = require('pg-pool');
var toobusy = require('toobusy-js');
var pgPass = require('pgpass');

// include query modules
milestone = require('./milestone.js');
facility = require('./facility.js');
networklength = require('./networklength.js');

// number of cpus
var cpus = os.cpus().length;

// maximum count of concurrent http connections
http.globalAgent.maxSockets = configuration.maxsockets;

// database connection
var connectionDetails =
{
	'host': configuration.host,
	'port': configuration.port,
	'database': configuration.database,
	'user': configuration.username,
	'max': parseInt(configuration.maxPoolSize / cpus),
	'idleTimeoutMillis': 10000
};


pgPass(connectionDetails, function(password)
{
	if (typeof password == 'undefined')
	{
		logger.fatal('PGPASS file cannot be read or no matching line for given connection info found');
		process.exit(1);
	}

	logger.debug('Successfully read password using PGPASS');
	connectionDetails['password'] = password;

	// response headers
	var headers = {};
	headers["Access-Control-Allow-Origin"] = configuration.corsAllowOrigin;
	headers["Access-Control-Allow-Methods"] = "GET";
	headers["Access-Control-Allow-Credentials"] = true;
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
				headers["Content-Type"] = "text/plain; charset=utf-8";
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

				logger.trace('Connecting to database...');
				pool.connect(function(err, client, done)
				{
					if (err)
					{
						logger.error('Fetching client from database pool failed: ' + err);
						headers["Content-Type"] = "text/plain; charset=utf-8";
						response.writeHead(500, headers);
						response.end();
						return;
					}

					// if valid request
					if (configuration.queries.indexOf(requestType) > -1)
					{
						var sqlquery = eval(requestType+"(params)");
					
						if (!sqlquery)
						{
							done();
							headers["Content-Type"] = "text/plain; charset=utf-8";
							response.writeHead(200, headers);
							response.end("[]");
							logger.error("Invalid parameters: "+JSON.stringify(params));
							return;
						}

						client.query(sqlquery, function(err, data)
						{
							// release client back to the pool
							done();

							if (err)
							{
								logger.warn('An error occurred during '+requestType+' request: "'+err+'" Aborting.');
								headers["Content-Type"] = "text/plain; charset=utf-8";
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

							headers["Content-Type"] = "application/json; charset=utf-8";
							response.writeHead(200, headers);

							if (params.callback)
								response.end(params.callback+'('+JSON.stringify(data.rows)+')');
							else
								response.end(JSON.stringify(data.rows));

							logger.trace('Finished request.');
						});
					}
					else
					{
						done();
						headers["Content-Type"] = "text/plain; charset=utf-8";
						response.writeHead(200, headers);
						response.end("[]");
						if (requestType != "favicon.ico")
							logger.error("Invalid request: "+requestType);
						return;
					}
				});
			}
		}

		var pool = new Pool(connectionDetails);
		pool.on('error', function (err, client)
		{
			logger.error('Idle database client error: ' + err.message)
		});
		http.createServer(onRequest).listen(configuration.apiPort);
		logger.info('Worker has started.');
	}
});
