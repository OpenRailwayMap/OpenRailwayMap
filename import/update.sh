#!/bin/bash

# OpenLinkMap Copyright (C) 2010 Alexander Matheisen
# This program comes with ABSOLUTELY NO WARRANTY.
# This is free software, and you are welcome to redistribute it under certain conditions.
# See http://wiki.openstreetmap.org/wiki/OpenLinkMap for details.


# working directory, please change
cd /home/www/sites/194.245.35.149/site/import
PATH="$PATH:/home/www/sites/194.245.35.149/site/import/bin"



# update planet file, ~ 50 min
echo "Updating planet file"
echo ""
date -u +%s > timestamp_tmp
osmupdate old.pbf new.pbf --max-merge=2 --hourly --drop-author -v
rm old.pbf
mv new.pbf old.pbf
echo ""


# convert planet file, ~ 25 min
echo "Converting planet file"
echo ""
osmconvert old.pbf --out-o5m >temp.o5m
echo ""


# filter planet file, ~ 35 min
echo "Filtering planet file"
echo ""
osmfilter temp.o5m --keep="wikipedia= wikipedia:*= contact:phone= website= url= phone= fax= email= addr:email= image= url:official= contact:website= addr:phone= phone:mobile= contact:mobile= addr:fax= contact:email= contact:fax= image:panorama= opening_hours=" --out-o5m >temp-olm.o5m

osmfilter temp.o5m --keep="amenity=bus_station highway=bus_stop railway=station railway=halt railway=tram_stop amenity=parking" --out-o5m >temp-nextobjects.o5m
rm temp.o5m
echo ""


# create centroids, remove not-node elements, ~ 2 min
echo "Creating centroids, removing elements"
echo ""
osmconvert temp-olm.o5m --all-to-nodes --max-objects=50000000 --out-o5m >temp.o5m
rm temp-olm.o5m
osmfilter temp.o5m --drop-relations --drop-ways --keep-nodes="wikipedia= wikipedia:*= contact:phone= website= url= phone= fax= email= addr:email= image= url:official= contact:website= addr:phone= phone:mobile= contact:mobile= addr:fax= contact:email= contact:fax= image:panorama= opening_hours=" --fake-lonlat --out-osm >olm.osm
rm temp.o5m

osmconvert temp-nextobjects.o5m --all-to-nodes --max-objects=50000000 --out-o5m >temp.o5m
rm temp-nextobjects.o5m
osmfilter temp.o5m --drop-relations --drop-ways --keep-nodes="amenity=bus_station highway=bus_stop railway=station railway=halt railway=tram_stop amenity=parking" --fake-lonlat --out-osm >nextobjects.osm
rm temp.o5m
echo ""


# generate diffs, ~ 2 min
echo "Generate diffs"
echo ""
osmconvert old-olm.osm olm.osm --diff >olm.osc
rm old-olm.osm
mv olm.osm old-olm.osm

osmconvert old-nextobjects.osm nextobjects.osm --diff >nextobjects.osc
rm old-nextobjects.osm
mv nextobjects.osm old-nextobjects.osm
echo ""


# updating of database by diffs, ~ 2 min
echo "Updating of database"
echo ""
php update.php
rm olm.osc
rm nextobjects.osc
rm timestamp
mv timestamp_tmp timestamp
echo ""