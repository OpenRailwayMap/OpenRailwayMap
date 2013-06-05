#!/bin/bash

# OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
# This program comes with ABSOLUTELY NO WARRANTY.
# This is free software, and you are welcome to redistribute it under certain conditions.
# See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.

# some commands are marked as comments because on the server they are merged with OpenLinkMap

# working directory, please change
cd /home/www/sites/194.245.35.149/site/olm/import
PATH="$PATH:/home/www/sites/194.245.35.149/site/olm/import/bin"
PATH="$PATH:/home/www/sites/194.245.35.149/site/orm/import/bin/osm2pgsql"
export JAVACMD_OPTIONS=-Xmx2800M


# update planet file
#echo "Updating planet file"
#echo ""
#date -u +%s > timestamp_tmp
#osmupdate old.pbf new.pbf --max-merge=2 --hourly --drop-author -v
#rm old.pbf
#mv new.pbf old.pbf
echo ""


# convert planet file
echo "Converting planet file"
echo ""
osmconvert old.pbf --drop-author --out-o5m >temp.o5m
echo ""


# pre-filter planet file
echo "Filtering planet file"
echo ""
osmfilter temp.o5m --keep="railway= route=tracks route=railway route=train route=light_rail route=tram route=subway line=rail line=light_rail line=tram line=subway route_master=train route_master=light_rail route_master=tram route_master=subway" --out-o5m >new-railways.o5m
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
osm2pgsql --database railmap --username olm --append --prefix railmap --slim --style railmap.style --hstore --cache 512 changes.osc
rm changes.osc


# run mapcss converter to update mapcss style
echo "Update MapCSS style"
echo ""
python mapcss_converter.py --mapcss style.mapcss --icons icons
echo ""
echo "Finished."
