/*
OpenRailwayMap Copyright (C) 2014 Alexander Matheisen
This program comes with ABSOLUTELY NO WARRANTY.
This is free software, and you are welcome to redistribute it under certain conditions.
See https://github.com/rurseekatze/OpenRailwayMap for details.
*/


// returns the $position of a milestone on a line $ref which is operated by an $operator, missing milestones are interpolated
Milestone = function(params)
{
	// check validity of params
	// position: max. 9999.999 -> max. 8 characters
	if (params.ref == null || params.ref.length < 2 || params.position == "" || params.position == null || params.position.length > 8 || isNaN(parseFloat(params.position)) || !isFinite(params.position) || (params.position.indexOf(".") == -1 && params.position.indexOf(",") == -1))
		return false;

	var prefix = configuration.prefix;
	
	var operator = (params.operator != null && params.operator.length > 0) ? "AND (LOWER("+prefix+"_line.tags->'operator') LIKE LOWER('%"+escapeString(params.operator)+"%'))" : "";
	var ref = escapeString(params.ref);
	var position = parseFloat(escapeString(params.position).replace(",", ".")).toFixed(3).toString();

	return "SELECT ST_X(bla.geometry) AS lat, ST_Y(bla.geometry) AS lon, bla.position AS position, bla.operator AS operator, bla.type AS type, bla.ref AS ref \
				FROM ( \
					SELECT foo.geometry AS geometry, foo.position AS position, foo.operator AS operator, foo.type AS type, foo.ref AS ref, ABS(CAST(foo.position AS FLOAT)-"+position.replace(",", ".")+") AS distance \
					FROM ( \
						SELECT centroids.geom AS geometry, centroids.position AS position, centroids.operator AS operator, centroids.type AS type, centroids.ref AS ref \
						FROM ( \
							SELECT ST_Transform(ST_Centroid(ST_Collect(milestones.geom)), 4326) AS geom, milestones.position AS position, milestones.operator AS operator, milestones.type AS type, milestones.ref AS ref \
							FROM ( \
								SELECT wayjoin.geom AS geom, wayjoin.position AS position, "+prefix+"_line.tags->'operator' AS operator, wayjoin.type AS type, wayjoin.ref AS ref \
								FROM ( \
									SELECT "+prefix+"_ways.id AS osm_id, "+prefix+"_point.way AS geom, COALESCE("+prefix+"_point.tags->'railway:position:exact', "+prefix+"_point.tags->'railway:position') AS position, "+prefix+"_point.tags->'railway' AS type, '"+ref+"'::VARCHAR AS ref \
									FROM "+prefix+"_point \
									INNER JOIN "+prefix+"_ways ON "+prefix+"_point.osm_id = ANY("+prefix+"_ways.nodes) \
									WHERE \
									( \
										(ROUND( CAST( \
											REPLACE(regexp_replace("+prefix+"_point.tags->'railway:position:exact', E'\\;.+$', ''), ',', '.') \
										AS NUMERIC), 3) BETWEEN ("+position+"-10.0) AND ("+position+"+10.0) ) \
										OR \
										(ROUND( CAST( \
											REPLACE(regexp_replace("+prefix+"_point.tags->'railway:position', E'\\;.+$', ''), ',', '.') \
										AS NUMERIC), 3) BETWEEN ("+position+"-10.0) AND ("+position+"+10.0) ) \
									) \
								) AS wayjoin \
								INNER JOIN "+prefix+"_line ON wayjoin.osm_id = "+prefix+"_line.osm_id \
								WHERE (LOWER("+prefix+"_line.tags->'ref') = LOWER('"+ref+"')) "+operator+" \
							) AS milestones \
							GROUP BY ROUND(ST_X(milestones.geom)/100)*100, ROUND(ST_Y(milestones.geom)/100)*100, milestones.position, milestones.operator, milestones.type, milestones.ref \
						) AS centroids \
						ORDER BY centroids.position \
					) AS foo \
					ORDER BY distance \
					LIMIT 10 \
				) AS bla;";
};

module.exports = Milestone;
