#!/bin/bash

function filter_planet
{
	echo "Converting planet file"
	osmconvert old.pbf --drop-author --out-o5m >temp.o5m
	echo "-----"

	echo "Filtering planet file"
	osmfilter temp.o5m \
		--drop-relations \
		--keep="railway=" \
		--drop-tags="fixme= note= source= maxspeed:source= source:maxspeed= wheelchair:description= public_transport= tram=yes bus=yes train=yes subway=yes light_rail=yes lines=" \
		$*
	rm temp.o5m
	echo "-----"
}
