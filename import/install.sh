#!/bin/bash

# OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
# This program comes with ABSOLUTELY NO WARRANTY.
# This is free software, and you are welcome to redistribute it under certain conditions.
# See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.


# run this script not automatically! you have to change paths and modify it to your own environment!

# install necessary software
yum install gzip zlib zlib-devel postgresql-server postgresql-libs postgresql postgresql-common postgis geoip GeoIP geoip-devel GeoIP-devel php-pecl-geoip libxml2 libxml2-devel bzip2 bzip2-devel proj proj-devel protobuf protobuf-devel protobuf-python protobuf-compiler python-psycopg2 protobuf-c protobuf-c-devel postgresql-devel unzip php php-pgsql autoconf automake subversion libtool cairo cairo-devel pycairo pycairo-devel python-pycha libtiff libtiff-devel libgeotiff libgeotiff-devel python-devel libjpeg libjpeg-devel libpng libpng-devel python-imaging python-imaging-devel gdal-python gcc gcc-c++ cpp python-nose binutils freetype freetype-devel python-sqlite2 sqlite sqlite-devel boost-thread boost-regex boost-python boost-iostreams boost-filesystem boost-program-options boost-serialization boost-devel libxslt libxslt-devel libicu libicu-devel libtool-ltdl libtool-ltdl-devel libsigc++20 libsigc++20-devel libpixman libpixman-devel pixman pixman-devel libstdc++ libstdc++-devel cairomm cairomm-devel glib glib-
devel gdal gdal-devel gdal-python libcurl libcurl-devel gnutls gnutls-devel python-gnutls python-pycurl

# GeoIP database
# add extension=geoip.so to php.ini
pecl install geoip
cd /usr/share/GeoIP
wget http://geolite.maxmind.com/download/geoip/database/GeoLiteCountry/GeoIP.dat.gz
gunzip GeoIP.dat.gz
wget -N -q http://geolite.maxmind.com/download/geoip/database/GeoLiteCity.dat.gz
gunzip GeoLiteCity.dat.gz
mv GeoLiteCity.dat GeoIPCity.dat

cd /home/www/sites/194.245.35.149/site/import/bin

mkdir osmosis
cd osmosis
wget -O - http://bretth.dev.openstreetmap.org/osmosis-build/osmosis-latest.tgz | tar xz
cd ..

# set up the database
su postgres
createuser olm
createdb -E UTF8 -O olm railmap
createlang plpgsql railmap
psql -d railmap -f /usr/share/pgsql/contrib/postgis-64.sql
psql -d railmap -f /usr/share/pgsql/contrib/postgis-1.5/spatial_ref_sys.sql
psql -d railmap -f /usr/share/pgsql/contrib/hstore.sql
psql -d railmap -f osm2pgsql/900913.sql

# access
echo "ALTER TABLE geometry_columns OWNER TO olm; ALTER TABLE spatial_ref_sys OWNER TO olm;"  | psql -d railmap
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

# osmconvert, etc.
wget -O - http://m.m.i24.cc/osmupdate.c | cc -x c - -o osmupdate
wget -O - http://m.m.i24.cc/osmfilter.c |cc -x c - -o osmfilter
wget -O - http://m.m.i24.cc/osmconvert.c | cc -x c - -lz -o osmconvert

# osm2pgsql
svn co http://svn.openstreetmap.org/applications/utils/export/osm2pgsql/
cd osm2pgsql
./autogen.sh
./configure --enable-64bit-ids
sed -i 's/-g -O2/-O2 -march=native -fomit-frame-pointer/' Makefile
make
cd ..

# mapnik
svn co http://svn.mapnik.org/tags/release-0.7.1/ mapnik_src
cd mapnik_src
python scons/scons.py
sudo python scons/scons.py install
ldconfig

# mapnik tools
svn export http://svn.openstreetmap.org/applications/rendering/mapnik
svn export http://mapnik-utils.googlecode.com/svn/tags/nik2img/0.7.0/ mapnik-utils
cd mapnik-utils
sudo python setup.py install
cd ..

# coastlines
cd mapnik
./get-coastlines.sh
rm *.tar.bz2 *.tgz *.zip
cd ..

# create mapnik xml stylefile
#cd mapnik
#./generate_xml.py --host localhost --user olm --dbname railmap --symbols ./symbols/ --world_boundaries ./world_boundaries/ --port '' --password ''
#cp osm.xml railmap.xml

# ab http://wiki.openstreetmap.org/wiki/Openptmap/Installation#Create_the_Map
