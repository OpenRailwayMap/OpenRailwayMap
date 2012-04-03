#!/bin/bash

# OpenRailwayMap Copyright (C) 2010 Alexander Matheisen
# This program comes with ABSOLUTELY NO WARRANTY.
# This is free software, and you are welcome to redistribute it under certain conditions.
# See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.


# run this script not automatically! you have to change paths and modify it to your own environment!

# install necessary software
yum install gzip zlib zlib-devel postgresql-server postgresql-libs postgresql postgresql-common postgis geoip GeoIP geoip-devel GeoIP-devel php-pecl-geoip libxml2 libxml2-devel bzip2 bzip2-devel proj proj-devel protobuf protobuf-devel protobuf-python protobuf-compiler python-psycopg2 protobuf-c protobuf-c-devel postgresql-devel

pecl install geoip

# add extension=geoip.so to php.ini

cd /usr/share/GeoIP
wget http://geolite.maxmind.com/download/geoip/database/GeoLiteCountry/GeoIP.dat.gz
gunzip GeoIP.dat.gz
wget -N -q http://geolite.maxmind.com/download/geoip/database/GeoLiteCity.dat.gz
gunzip GeoLiteCity.dat.gz
mv GeoLiteCity.dat GeoIPCity.dat

wget -O - http://m.m.i24.cc/osmupdate.c | cc -x c - -o osmupdate
wget -O - http://m.m.i24.cc/osmfilter.c |cc -x c - -o osmfilter
wget -O - http://m.m.i24.cc/osmconvert.c | cc -x c - -lz -o osmconvert

cd /import/bin
svn co http://svn.openstreetmap.org/applications/utils/export/osm2pgsql/
cd osm2pgsql
./autogen.sh
./configure
sed -i 's/-g -O2/-O2 -march=native -fomit-frame-pointer/' Makefile
make

# set up the database
su postgres
createuser olm
createdb -E UTF8 -O olm railmap
createlang plpgsql railmap
psql -d railmap -f /usr/share/pgsql/contrib/postgis-64.sql
psql -d railmap -f /usr/share/pgsql/contrib/postgis-1.5/spatial_ref_sys.sql
psql -d railmap -f /usr/share/pgsql/contrib/hstore.sql

# access
echo "ALTER TABLE geometry_columns OWNER TO olm; ALTER TABLE spatial_ref_sys OWNER TO olm;"  | psql -d railmap
echo "ALTER TABLE geography_columns OWNER TO olm;"  | psql -d railmap
echo "GRANT SELECT ON geometry_columns TO apache; GRANT SELECT ON spatial_ref_sys TO apache;"  | psql -d railmap
echo "GRANT SELECT ON geography_columns TO apache;"  | psql -d railmap
echo "CREATE ROLE apache;" | psql -d railmap
echo "GRANT SELECT ON railmap_point TO apache;" | psql -d railmap
echo "GRANT SELECT ON railmap_line TO apache;" | psql -d railmap
echo "GRANT SELECT ON railmap_polygon TO apache;" | psql -d railmap
echo "CREATE ROLE w3_user1;" | psql -d railmap
echo "GRANT SELECT ON railmap_point TO w3_user1;" | psql -d railmap
echo "GRANT SELECT ON railmap_line TO w3_user1;" | psql -d railmap
echo "GRANT SELECT ON railmap_polygon TO w3_user1;" | psql -d railmap