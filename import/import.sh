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

echo "Started processing at $(date)"

# download planet file if not existing
echo "Getting planet file if necessary"
echo ""
if [ ! -f old.pbf ]; then
	echo "Planet file not existing, now downloading it"
	wget http://planet.openstreetmap.org/pbf/planet-latest.osm.pbf
	mv planet-latest.osm.pbf old.pbf
	# update planet file
	echo "Updating planet file"
	echo ""
	osmdate=`osmconvert old.pbf --out-timestamp | tr '[TZ]' ' ' | sed 's/ *$//g'`
	date -u -d "$osmdate" +%s > timestamp
	osmupdate old.pbf new.pbf --max-merge=2 --hourly --drop-author -v
	rm old.pbf
	mv new.pbf old.pbf
	echo ""
fi
echo ""


# convert planet file
echo "Converting planet file"
echo ""
osmconvert old.pbf --drop-author --out-o5m >temp.o5m
echo ""


# pre-filter planet file
echo "Filtering planet file"
echo ""
osmfilter temp.o5m --keep="railway= route=tracks route=railway route=train route=light_rail route=tram route=subway route_master=train route_master=light_rail route_master=tram route_master=subway shop=ticket vending=public_transport_tickets" --out-osm >old-railways.osm
rm temp.o5m
echo ""


# load data into database
echo "Loading data into database"
echo ""
osm2pgsql --create --database railmap --username olm --prefix railmap --slim --style railmap.style --hstore --cache 512 old-railways.osm
osmconvert old-railways.osm --out-o5m >old-railways.o5m
rm old-railways.osm
echo ""


# run mapcss converter
echo "Create MapCSS styles"
echo ""
cd $PROJECTPATH/styles
for stylefile in *.mapcss
do
	python mapcss_converter.py --mapcss "$stylefile" --icons-path .
done
echo ""

# prerender lowzoom tiles
echo "Prerendering tiles"
echo ""
curl "http://localhost:9001/init/"
echo ""

echo "Finished processing at $(date)."
