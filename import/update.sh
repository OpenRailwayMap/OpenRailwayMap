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
export JAVACMD_OPTIONS=-Xmx2800M

cd $DATAPATH


# update planet file
echo "Updating planet file"
# MAKE THE FOLLOWING COMMANDS EXECUTABLE BY REMOVING '#' IN YOUR INSTALLATION
#echo ""
#date -u +%s > timestamp_tmp
#osmupdate old.pbf new.pbf --max-merge=2 --hourly --drop-author -v
#rm old.pbf
#mv new.pbf old.pbf
# END
echo ""


# convert planet file
echo "Converting planet file"
echo ""
osmconvert old.pbf --drop-author --out-o5m >temp.o5m
echo ""


# pre-filter planet file
echo "Filtering planet file"
echo ""
osmfilter temp.o5m --keep="railway= route=tracks route=railway route=train route=light_rail route=tram route=subway route_master=train route_master=light_rail route_master=tram route_master=subway shop=ticket vending=public_transport_tickets" --out-o5m >new-railways.o5m
rm temp.o5m
echo ""


# generate diffs
echo "Generate diffs"
echo ""
osmconvert old-railways.o5m new-railways.o5m --diff-contents --fake-lonlat >changes.osc
rm old-railways.o5m
mv new-railways.o5m old-railways.o5m
echo ""


# load data into database
echo "Updating database"
echo ""
osm2pgsql --database railmap --username olm --append --prefix railmap --slim --style railmap.style --hstore --cache 512 --expire-tiles 2-21 --expire-output expired_tiles changes.osc
rm changes.osc


# run mapcss converter to update mapcss style
echo "Update MapCSS style"
echo ""
cd $PROJECTPATH/styles
rm style.js
rm style.png
python mapcss_converter.py --mapcss style.mapcss --icons-path .
echo ""
echo "Finished."
