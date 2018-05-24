#!/bin/bash

# OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
# This program comes with ABSOLUTELY NO WARRANTY.
# This is free software, and you are welcome to redistribute it under certain conditions.
# See https://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.


# extend environment paths by location of osmconvert, osmupdate and osmfilter
export PATH=/usr/local/bin:/usr/local/sbin:${PATH}

source $(dirname ${0})/config.cfg

# default to current directory
DATADIR=${DATADIR:-.}

cd $PROJECTPATH/import

echo "Started processing at $(date)"

echo "[1/3] Downloading planet file"
wget -O ${DATADIR}/planet-latest.osm.pbf https://planet.openstreetmap.org/pbf/planet-latest.osm.pbf
osmdate=$(osmconvert ${DATADIR}/planet-latest.osm.pbf --out-timestamp)
date -u -d "$osmdate" +%s > timestamp

echo "[2/3] Import data into database"
osmconvert ${DATADIR}/planet-latest.osm.pbf --drop-relations --out-pbf > ${DATADIR}/planet-latest-norelations.osm.pbf
osm2pgsql --database $DBNAME --username $DBUSER --prefix $DBPREFIX --create --slim --merc --hstore-all --hstore-match-only --hstore-add-index --style openrailwaymap.style --number-processes $NUMPROCESSES --flat-nodes ${DATADIR}/flatnodes --cache $CACHE --input-reader pbf ${DATADIR}/planet-latest-norelations.osm.pbf
rm ${DATADIR}/planet-latest.osm.pbf ${DATADIR}/planet-latest-norelations.osm.pbf

echo "[3/3] Prerendering tiles"
cd $PROJECTPATH/renderer
./init.sh

echo "Finished processing at $(date)"
