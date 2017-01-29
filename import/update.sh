#!/bin/bash

# OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
# This program comes with ABSOLUTELY NO WARRANTY.
# This is free software, and you are welcome to redistribute it under certain conditions.
# See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.

set -e

# extend environment paths by location of osmconvert, osmupdate and osmfilter
export PATH=/usr/local/bin:/usr/local/sbin:${PATH}

source $(dirname ${0})/config.cfg

# default to current directory
DATADIR=${DATADIR:-.}

cd $PROJECTPATH/import

echo "Started processing at $(date)"

echo "[1/3] Fetching diff"
TIMESTAMP=$(<timestamp)
TIMESTAMP_NEW=$(date -u +%s)
UPDATE=`date -u -d "@$TIMESTAMP" +%Y-%m-%dT%H:%M:%SZ`
osmupdate $UPDATE ${DATADIR}/changes.osc -v

if [ ! -s ${DATADIR}/changes.osc ]; then
	echo "No new data available"
	exit 0
fi

osmconvert ${DATADIR}/changes.osc --drop-relations --out-osc > ${DATADIR}/changes-norelation.osc
rm ${DATADIR}/changes.osc

echo "[2/3] Updating database"
# remove old expire information, will be recreated by osm2pgsql according to the incoming changes
# may not exist, e.g. on first run after import
rm -f ${DATADIR}/expired_tiles
osm2pgsql --database $DBNAME --username $DBUSER --prefix $DBPREFIX --append --slim --merc --expire-output ${DATADIR}/expired_tiles --expire-tiles 15 --hstore-all --hstore-match-only --hstore-add-index --style openrailwaymap.style --number-processes $NUMPROCESSES --flat-nodes ${DATADIR}/flatnodes --cache $CACHE ${DATADIR}/changes-norelation.osc
rm ${DATADIR}/changes-norelation.osc

echo "[3/3] Expiring tiles"
if [ -s ${DATADIR}/expired_tiles ]; then
	# mark the tiles as expired where the data changed
	cd $PROJECTPATH/renderer
	node expire-tiles.js ${DATADIR}/expired_tiles
	# TODO get levels from config file
	find ${TILEDIR}/tiles/[0-7] -execdir touch -t 197001010000 {} +
fi

echo ${TIMESTAMP_NEW} > ${PROJECTPATH}/import/timestamp

echo "Finished processing at $(date)"
