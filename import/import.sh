#!/bin/bash

# OpenRailwayMap Copyright (C) 2010 Alexander Matheisen
# This program comes with ABSOLUTELY NO WARRANTY.
# This is free software, and you are welcome to redistribute it under certain conditions.
# See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.


# working directory, please change
cd /home/www/sites/194.245.35.149/site/import
PATH="$PATH:/home/www/sites/194.245.35.149/site/import/bin"


# download planet file, ~ 8 hours
echo "Downloading planet file"
echo ""
wget http://planet.openstreetmap.org/pbf-experimental/planet-latest.osm.pbf
mv planet-latest.osm.pbf old.pbf
echo ""


# update planet file
echo "Updating planet file"
echo ""
date -u +%s > timestamp
osmupdate old.pbf new.pbf --max-merge=2 --hourly --drop-author -v
rm old.pbf
mv new.pbf old.pbf
echo ""


# convert planet file, ~ 25 min
echo "Converting planet file"
echo ""
osmconvert old.pbf --out-o5m >temp.o5m
echo ""


# pre-filter planet file, ~ 35 min
echo "Filtering planet file"
echo ""
osmfilter temp.o5m --keep="railway=" --out-o5m >temp-railways.o5m
rm temp.o5m
echo ""


# TODO AB HIER ANPASSEN
# filter different object types, ~ ?? min
# osmfilter temp-railways.o5m --drop-relations --drop-ways --keep="railway=milestone" --out-o5m >temp-milestones.o5m


# some pre-processing of the filtered data, ?? min
echo "Processing milestones..."
osmfilter temp-milestones.o5m --fake-lonlat --fake-author --out-osm >temp.osm
rm temp-milestones.o5m
osmosis-0.40.1/bin/osmosis --rx file="temp.osm" enableDateParsing="no" --s --wx file="old-milestones.osm"
rm temp.osm
rm temp-railways.o5m
echo ""


# importing in database, ~ 20 min
echo "Importing in database"
echo ""
php import.php
osmconvert old-milestones.osm --drop-author --out-o5m >old-milestones.o5m
rm old-milestones.osm
echo ""