#!/bin/bash

# OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
# This program comes with ABSOLUTELY NO WARRANTY.
# This is free software, and you are welcome to redistribute it under certain conditions.
# See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.


# extend environment paths by location of osmconvert, osmupdate and osmfilter
export PATH=/usr/local/bin:/usr/local/sbin:${PATH}

source $(dirname ${0})/config.cfg
source $(dirname ${0})/func_filter.sh

cd $PROJECTPATH
cd import

echo "Started processing at $(date)"

# download planet file if not existing
echo "Getting planet file if necessary"
if [ ! -f old.pbf ]; then
	echo "Planet file not existing, now downloading it"
	wget http://planet.openstreetmap.org/pbf/planet-latest.osm.pbf
	mv planet-latest.osm.pbf old.pbf
fi
echo "-----"

echo "Updating planet file"
osmupdate old.pbf new.pbf --max-merge=5 --hourly --drop-author -v
rm old.pbf
mv new.pbf old.pbf
osmdate=`osmconvert old.pbf --out-timestamp | tr '[TZ]' ' ' | sed 's/ *$//g'`
date -u -d "$osmdate" +%s > timestamp
filter_planet --out-osm -o=old-railways.osm
echo "-----"

echo "Loading data into database"
osm2pgsql --create --database $DBNAME --username $DBUSER --prefix $DBPREFIX --slim --style railmap.style --hstore --hstore-add-index --number-processes $NUMPROCESSES --cache $CACHE old-railways.osm
osmconvert old-railways.osm --out-o5m >old-railways.o5m
rm old-railways.osm
echo "-----"

echo "Prerendering tiles"
curl "http://localhost:$TILESERVERPORT/init"
echo "-----"

echo "Finished processing at $(date)"
