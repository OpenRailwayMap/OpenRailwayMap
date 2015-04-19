/*
OpenRailwayMap Copyright (C) 2014 Alexander Matheisen
This program comes with ABSOLUTELY NO WARRANTY.
This is free software, and you are welcome to redistribute it under certain conditions.
See https://github.com/rurseekatze/OpenRailwayMap for details.
*/


// returns details of a facility (station, junction, yard, ...) by it's $name, $uicref or $ref and an optional $operator
Facilityinfo = function(params)
{
	// check validity of params
	if ((params.ref == null && params.uicref == null && params.name == null) || (params.ref != null && params.ref.length == 0) || (params.name != null && params.name.length == 0) || (params.uicref != null && params.uicref.length != 7) || (params.uicref != null && isNaN(params.uicref)))
		return false;

	var prefix = configuration.prefix;
	
	var operator = (params.operator != null && params.operator.length > 0) ? "AND (LOWER(tags->'operator') LIKE LOWER('%"+params.operator+"%'))" : "";
	var uicref = params.uicref;
	
	if (params.uicref != null)
		var searchcondition = "LOWER(tags->'uic_ref') = LOWER('"+params.uicref+"') AND";
	else if (params.ref != null)
		var searchcondition = "LOWER(tags->'railway:ref') = LOWER('"+params.ref+"') AND";
	else if (params.name != null)
	{
		var searchcondition = "";

		if (params.name.length > 2)
		{
			var words = params.name.split(" ");
			for (var i=0; i<words.length; i++)
			{
				searchcondition += " (\
											(POSITION(LOWER('"+words[i].trim()+"') IN LOWER(tags->'name')) != 0)\
											OR (POSITION(LOWER('"+words[i].trim()+"') IN LOWER(tags->'uic_name')) != 0)\
										) AND";
			}
		}
		else
		{
			searchcondition += " (\
									(LOWER(tags->'name') = LOWER('"+params.name+"'))\
								 	OR LOWER(tags->'uic_name') = LOWER('"+params.name+"')\
								) AND";
		}
	}


	var longnames = (params.name != null && params.name.length > 2) ? "NOT(LOWER(foo.name) LIKE LOWER('"+params.name+"%'))," : "";

	return "\
					SELECT ST_X(foo.geom) AS lat, ST_Y(foo.geom) AS lon, foo.name AS name, foo.uicname AS uicname, foo.uicref AS uicref, foo.ref AS ref, foo.id AS id, foo.type AS type, foo.operator AS operator, foo.stationcategory AS stationcategory \
					FROM \
					( \
						SELECT ST_Transform(way, 4326) AS geom, tags->'name' AS name, tags->'uic_name' AS uicname, tags->'uic_ref' AS uicref, tags->'railway:ref' AS ref, tags->'railway' AS type, tags->'operator' AS operator, tags->'railway:station_category' AS stationcategory, osm_id AS id \
						FROM "+prefix+"_point \
						WHERE "+searchcondition+" ((tags->'railway'='station') OR (tags->'railway'='halt') OR (tags->'railway'='junction') OR (tags->'railway'='spur_junction') OR (tags->'railway'='yard') OR (tags->'railway'='crossover') OR (tags->'railway'='site') OR (tags->'railway'='service_station') OR (tags->'railway'='tram_stop')) "+operator+" \
					) AS foo \
					ORDER BY foo.stationcategory, NOT(LOWER(foo.name) = LOWER('"+params.name+"')), NOT(LOWER(foo.name) LIKE LOWER('"+params.name+" %')), NOT(LOWER(foo.name) LIKE LOWER('% "+params.name+"')), NOT(LOWER(foo.name) LIKE LOWER('"+params.name+"-%')), NOT(LOWER(foo.name) LIKE LOWER('%-"+params.name+"')), "+longnames+" CHAR_LENGTH(foo.name), foo.name;";
};

module.exports = Facilityinfo;
