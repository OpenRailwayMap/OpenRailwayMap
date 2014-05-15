/*
OpenRailwayMap Copyright (C) 2014 Alexander Matheisen
This program comes with ABSOLUTELY NO WARRANTY.
This is free software, and you are welcome to redistribute it under certain conditions.
See https://github.com/rurseekatze/OpenRailwayMap for details.
*/


// returns the length of the railway network for each railway company / infrastructure operator
NetworkLength = function(params)
{
	var prefix = configuration.prefix;

	return "SELECT bla.operator AS operator, bla.length AS length \
			FROM ( \
				SELECT tags->'operator' AS operator, CAST(SUM(ST_LENGTH(way))/1000 AS INT) AS length \
				FROM "+prefix+"_line \
				WHERE tags ? 'operator' AND osm_id > 0 \
				GROUP BY tags->'operator' \
				ORDER BY length DESC \
			) AS bla \
			WHERE bla.length > 0;";
};

module.exports = NetworkLength;
