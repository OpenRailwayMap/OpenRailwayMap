#!/bin/bash

# OpenLinkMap Copyright (C) 2010 Alexander Matheisen
# This program comes with ABSOLUTELY NO WARRANTY.
# This is free software, and you are welcome to redistribute it under certain conditions.
# See http://wiki.openstreetmap.org/wiki/OpenLinkMap for details.


# run this script not automatically! you have to change paths and modify it to your own environment!

# install necessary software
yum install gzip zlib zlib-devel postgresql-server postgresql-libs postgresql postgresql-common postgis

wget -O - http://m.m.i24.cc/osmupdate.c | cc -x c - -o osmupdate
wget -O - http://m.m.i24.cc/osmfilter.c |cc -x c - -o osmfilter
wget -O - http://m.m.i24.cc/osmconvert.c | cc -x c - -lz -o osmconvert


# set up database
su postgres
createuser olm


createdb -E UTF8 -O olm olm
createlang plpgsql olm
psql -d olm -f /usr/share/pgsql/contrib/postgis-64.sql
psql -d olm -f /usr/share/pgsql/contrib/postgis-1.5/spatial_ref_sys.sql
psql -d olm -f /usr/share/pgsql/contrib/hstore.sql
psql -d olm -f /usr/share/pgsql/contrib/_int.sql

echo "ALTER TABLE geometry_columns OWNER TO olm; ALTER TABLE spatial_ref_sys OWNER TO olm;"  | psql -d olm
echo "ALTER TABLE geography_columns OWNER TO olm;"  | psql -d olm


createdb -E UTF8 -O olm nextobjects
createlang plpgsql nextobjects

psql -d nextobjects -f /usr/share/pgsql/contrib/postgis-64.sql
psql -d nextobjects -f /usr/share/pgsql/contrib/postgis-1.5/spatial_ref_sys.sql
psql -d nextobjects -f /usr/share/pgsql/contrib/hstore.sql
psql -d nextobjects -f /usr/share/pgsql/contrib/_int.sql

echo "ALTER TABLE geometry_columns OWNER TO olm; ALTER TABLE spatial_ref_sys OWNER TO olm;"  | psql -d nextobjects
echo "ALTER TABLE geography_columns OWNER TO olm;"  | psql -d nextobjects


# database olm
echo "CREATE TABLE nodes (id bigint, tags hstore);" | psql -d olm
echo "SELECT AddGeometryColumn('nodes', 'geom', 4326, 'POINT', 2);" | psql -d olm
echo "CREATE INDEX geom_index_nodes ON nodes USING GIST(geom);" | psql -d olm
echo "CLUSTER nodes USING geom_index_nodes;" | psql -d olm
echo "CREATE INDEX id_index_nodes ON nodes (id);" | psql -d olm
echo "CLUSTER nodes USING id_index_nodes;" | psql -d olm
echo "CREATE INDEX tag_index_nodes ON nodes USING GIST (tags);" | psql -d olm
echo "CLUSTER nodes USING tag_index_nodes;" | psql -d olm

echo "CREATE TABLE ways (id bigint, tags hstore);" | psql -d olm
echo "SELECT AddGeometryColumn('ways', 'geom', 4326, 'POINT', 2);" | psql -d olm
echo "CREATE INDEX geom_index_ways ON ways USING GIST(geom);" | psql -d olm
echo "CLUSTER ways USING geom_index_ways;" | psql -d olm
echo "CREATE INDEX id_index_ways ON ways (id);" | psql -d olm
echo "CLUSTER ways USING id_index_ways;" | psql -d olm
echo "CREATE INDEX tag_index_ways ON ways USING GIST (tags);" | psql -d olm
echo "CLUSTER ways USING tag_index_ways;" | psql -d olm

echo "CREATE TABLE relations (id bigint, tags hstore);" | psql -d olm
echo "SELECT AddGeometryColumn('relations', 'geom', 4326, 'POINT', 2);" | psql -d olm
echo "CREATE INDEX geom_index_relations ON relations USING GIST(geom);" | psql -d olm
echo "CLUSTER relations USING geom_index_relations;" | psql -d olm
echo "CREATE INDEX id_index_relations ON relations (id);" | psql -d olm
echo "CLUSTER relations USING id_index_relations;" | psql -d olm
echo "CREATE INDEX tag_index_relations ON relations USING GIST (tags);" | psql -d olm
echo "CLUSTER relations USING tag_index_relations;" | psql -d olm

echo "GRANT all ON nodes TO olm;" | psql -d olm
echo "GRANT all ON ways TO olm;" | psql -d olm
echo "GRANT all ON relations TO olm;" | psql -d olm

echo "GRANT truncate ON nodes TO olm;" | psql -d olm
echo "GRANT truncate ON ways TO olm;" | psql -d olm
echo "GRANT truncate ON relations TO olm;" | psql -d olm

echo "ALTER TABLE nodes OWNER TO olm;" | psql -d olm
echo "ALTER TABLE ways OWNER TO olm;" | psql -d olm
echo "ALTER TABLE relations OWNER TO olm;" | psql -d olm


# database nextobjects
echo "CREATE TABLE nodes (id bigint, tags hstore);" | psql -d nextobjects
echo "SELECT AddGeometryColumn('nodes', 'geom', 4326, 'POINT', 2);" | psql -d nextobjects
echo "CREATE INDEX geom_index_nodes ON nodes USING GIST(geom);" | psql -d nextobjects
echo "CLUSTER nodes USING geom_index_nodes;" | psql -d nextobjects
echo "CREATE INDEX id_index_nodes ON nodes (id);" | psql -d nextobjects
echo "CLUSTER nodes USING id_index_nodes;" | psql -d nextobjects
echo "CREATE INDEX tag_index_nodes ON nodes USING GIST (tags);" | psql -d nextobjects
echo "CLUSTER nodes USING tag_index_nodes;" | psql -d nextobjects

echo "CREATE TABLE ways (id bigint, tags hstore);" | psql -d nextobjects
echo "SELECT AddGeometryColumn('ways', 'geom', 4326, 'POINT', 2);" | psql -d nextobjects
echo "CREATE INDEX geom_index_ways ON ways USING GIST(geom);" | psql -d nextobjects
echo "CLUSTER ways USING geom_index_ways;" | psql -d nextobjects
echo "CREATE INDEX id_index_ways ON ways (id);" | psql -d nextobjects
echo "CLUSTER ways USING id_index_ways;" | psql -d nextobjects
echo "CREATE INDEX tag_index_ways ON ways USING GIST (tags);" | psql -d nextobjects
echo "CLUSTER ways USING tag_index_ways;" | psql -d nextobjects

echo "CREATE TABLE relations (id bigint, tags hstore);" | psql -d nextobjects
echo "SELECT AddGeometryColumn('relations', 'geom', 4326, 'POINT', 2);" | psql -d nextobjects
echo "CREATE INDEX geom_index_relations ON relations USING GIST(geom);" | psql -d nextobjects
echo "CLUSTER relations USING geom_index_relations;" | psql -d nextobjects
echo "CREATE INDEX id_index_relations ON relations (id);" | psql -d nextobjects
echo "CLUSTER relations USING id_index_relations;" | psql -d nextobjects
echo "CREATE INDEX tag_index_relations ON relations USING GIST (tags);" | psql -d nextobjects
echo "CLUSTER relations USING tag_index_relations;" | psql -d nextobjects

echo "GRANT all ON nodes TO olm;" | psql -d nextobjects
echo "GRANT all ON ways TO olm;" | psql -d nextobjects
echo "GRANT all ON relations TO olm;" | psql -d nextobjects

echo "GRANT truncate ON nodes TO olm;" | psql -d nextobjects
echo "GRANT truncate ON ways TO olm;" | psql -d nextobjects
echo "GRANT truncate ON relations TO olm;" | psql -d nextobjects

echo "ALTER TABLE nodes OWNER TO olm;" | psql -d nextobjects
echo "ALTER TABLE ways OWNER TO olm;" | psql -d nextobjects
echo "ALTER TABLE relations OWNER TO olm;" | psql -d nextobjects


# access
echo "CREATE ROLE apache;" | psql -d olm

echo "GRANT SELECT ON nodes TO apache;" | psql -d nextobjects
echo "GRANT SELECT ON ways TO apache;" | psql -d nextobjects
echo "GRANT SELECT ON relations TO apache;" | psql -d nextobjects
echo "GRANT SELECT ON nodes TO apache;" | psql -d olm
echo "GRANT SELECT ON ways TO apache;" | psql -d olm
echo "GRANT SELECT ON relations TO apache;" | psql -d olm

echo "CREATE ROLE w3_user1;" | psql -d olm

echo "GRANT SELECT ON nodes TO w3_user1;" | psql -d nextobjects
echo "GRANT SELECT ON ways TO w3_user1;" | psql -d nextobjects
echo "GRANT SELECT ON relations TO w3_user1;" | psql -d nextobjects
echo "GRANT SELECT ON nodes TO w3_user1;" | psql -d olm
echo "GRANT SELECT ON ways TO w3_user1;" | psql -d olm
echo "GRANT SELECT ON relations TO w3_user1;" | psql -d olm