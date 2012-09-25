#!/bin/bash

# OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
# This program comes with ABSOLUTELY NO WARRANTY.
# This is free software, and you are welcome to redistribute it under certain conditions.
# See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.

# some commands are marked as comments because on the server they are merged with OpenLinkMap

# working directory, please change
cd /home/www/sites/194.245.35.149/site/import
PATH="$PATH:/home/www/sites/194.245.35.149/site/import/bin"


# download planet file, ~ 8 hours
# echo "Downloading planet file"
# echo ""
# wget http://planet.openstreetmap.org/pbf/planet-latest.osm.pbf
# mv planet-latest.osm.pbf old.pbf
# echo ""


# update planet file
# echo "Updating planet file"
# echo ""
# date -u +%s > timestamp
# osmupdate old.pbf new.pbf --max-merge=2 --hourly --drop-author -v
# rm old.pbf
# mv new.pbf old.pbf
# echo ""


# convert planet file, ~ 25 min
echo "Converting planet file"
echo ""
osmconvert old.pbf --out-o5m >temp.o5m
echo ""


# pre-filter planet file, ~ 20 min
echo "Filtering planet file"
echo ""
osmfilter temp.o5m --keep="railway= route=railway route=train route=light_rail route=tram route=subway line=rail line=light_rail line=tram line=subway route_master=train route_master=light_rail route_master=tram route_master=subway" --out-osm >old-railways.osm
rm temp.o5m
echo ""


# load data into database, ~ 10 min
echo "Loading data into database"
echo ""
osm2pgsql/osm2pgsql --create --database railmap --username olm --prefix railmap --slim --style railmap.style --hstore --cache 512 old-railways.osm
osmconvert old-railways.osm --out-o5m >old-railways.o5m
rm old-railways.osm
echo ""
echo "Finished."