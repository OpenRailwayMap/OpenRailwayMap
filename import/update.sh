#!/bin/bash

# OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
# This program comes with ABSOLUTELY NO WARRANTY.
# This is free software, and you are welcome to redistribute it under certain conditions.
# See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.


source $(dirname ${0})/config.cfg
source $(dirname ${0})/func_filter.sh

cd $DATAPATH

echo "Started processing at $(date)"

echo "Updating planet file"
if [ "$SKIPUPDATE" = false ]; then
	osmupdate old.pbf new.pbf --max-merge=5 --hourly --drop-author -v
	rm old.pbf
	mv new.pbf old.pbf
	osmdate=`osmconvert old.pbf --out-timestamp | tr '[TZ]' ' ' | sed 's/ *$//g'`
	date -u -d "$osmdate" +%s > timestamp_tmp
fi
echo "-----"

filter_planet --out-o5m -o=new-railways.o5m

echo "Generate diffs"
osmconvert old-railways.o5m new-railways.o5m --diff-contents --fake-lonlat >changes.osc
rm old-railways.o5m
mv new-railways.o5m old-railways.o5m
echo "-----"

echo "Updating database"
rm $TILELIST
osm2pgsql --database $DBNAME --username $DBUSER --append --prefix $DBPREFIX --slim --style railmap.style --number-processes $NUMPROCESSES --hstore --hstore-add-index --cache $CACHE --expire-tiles 15 --expire-output expired_tiles changes.osc
rm changes.osc
echo "-----"

echo "Rerender expired tiles"
if [ -s $TILELIST ]; then
	cd $PROJECTPATH/renderer
	node expire-tiles.js $TILELIST
	cd $TILESPATH
	find 0 -exec touch -t 197001010000 {} \;
	find 1 -exec touch -t 197001010000 {} \;
	find 2 -exec touch -t 197001010000 {} \;
	find 3 -exec touch -t 197001010000 {} \;
	find 4 -exec touch -t 197001010000 {} \;
	find 5 -exec touch -t 197001010000 {} \;
	find 6 -exec touch -t 197001010000 {} \;
	find 7 -exec touch -t 197001010000 {} \;
fi
echo "-----"

echo "Finished processing at $(date)"
