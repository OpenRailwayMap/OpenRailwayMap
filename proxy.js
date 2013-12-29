/*
OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
This program comes with ABSOLUTELY NO WARRANTY.
This is free software, and you are welcome to redistribute it under certain conditions.
See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.
*/


var http = require('http');
var httpProxy = require('http-proxy');

var options =
{
	hostnameOnly: true,
	router:
	{
		'www.openrailwaymap.org': '127.0.0.1:8080',
		'tiles.openrailwaymap.org': '127.0.0.1:9000',
		'a.tiles.openrailwaymap.org': '127.0.0.1:9000',
		'b.tiles.openrailwaymap.org': '127.0.0.1:9000',
		'c.tiles.openrailwaymap.org': '127.0.0.1:9000'
	}
};

var proxyServer = httpProxy.createServer(options).listen(80);
