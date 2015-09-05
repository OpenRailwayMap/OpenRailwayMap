#!/bin/bash

# OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
# This program comes with ABSOLUTELY NO WARRANTY.
# This is free software, and you are welcome to redistribute it under certain conditions.
# See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.


# path to the project directory
PROJECTPATH=/home/www/sites/194.245.35.149/site/orm
# directory where the planet file and other data files are stored, can be equal to PROJECTPATH
DATAPATH=/home/www/sites/194.245.35.149/site/olm/import
PATH="$PATH:$DATAPATH/bin"
PATH="$PATH:$PROJECTPATH/import/bin/osm2pgsql"

source $(dirname ${0})/func_filter.sh

cd $DATAPATH

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
echo "-----"

filter_planet --out-osm -o=old-railways.osm

echo "Loading data into database"
osm2pgsql --create --database railmap --username olm --prefix railmap --slim --style railmap.style --hstore --hstore-add-index --number-processes 3 --cache 2048 old-railways.osm
osmconvert old-railways.osm --out-o5m >old-railways.o5m
rm old-railways.osm
echo "-----"

echo "Create MapCSS styles"
cd $PROJECTPATH/styles
make
echo "-----"

echo "Prerendering tiles"
curl "http://localhost:9000/init"
echo "-----"

echo "Finished processing at $(date)."
