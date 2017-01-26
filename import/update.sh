#!/bin/bash

# OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
# This program comes with ABSOLUTELY NO WARRANTY.
# This is free software, and you are welcome to redistribute it under certain conditions.
# See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.

set -e

# extend environment paths by location of osmconvert, osmupdate and osmfilter
export PATH=/usr/local/bin:/usr/local/sbin:${PATH}

source $(dirname ${0})/config.cfg

cd $PROJECTPATH/import

echo "Started processing at $(date)"

echo "[1/3] Fetching diff"
date -u +%s > timestamp_tmp
TIMESTAMP=$(<timestamp)
UPDATE=`date -u -d "@$TIMESTAMP" +%Y-%m-%dT%H:%M:%SZ`
osmupdate $UPDATE changes.osc --day -v
osmconvert changes.osc --drop-relations --out-osc > changes-norelation.osc
rm changes.osc

echo "[2/3] Updating database"
rm expired_tiles
osm2pgsql --database $DBNAME --username $DBUSER --prefix $DBPREFIX --append --slim --merc --expire-output expired_tiles --expire-tiles 15 --hstore-all --hstore-match-only --hstore-add-index --style openrailwaymap.style --number-processes $NUMPROCESSES --flat-nodes flatnodes --cache $CACHE changes-norelation.osc
rm changes-norelation.osc

echo "[3/3] Expiring tiles"
if [ -s expired_tiles ]; then
	cd $PROJECTPATH/renderer
	node expire-tiles.js expired_tiles
	# TODO get levels from config file
	find ${TILEDIR}/tiles/[0-7] -execdir touch -t 197001010000 {} +
fi

mv ${PROJECTPATH}/import/timestamp_tmp ${PROJECTPATH}/import/timestamp

echo "Finished processing at $(date)"
