#!/bin/bash

function filter_planet
{
	echo "Converting planet file"
	osmconvert old.pbf --drop-author --out-o5m >temp.o5m
	echo "-----"

	echo "Filtering planet file"
	osmfilter temp.o5m \
		--keep="railway= route=tracks route=railway shop=ticket vending=public_transport_tickets" \
		--drop-tags="fixme= note= source= maxspeed:source= source:maxspeed= wheelchair:description=" \
		$*
	rm temp.o5m
	echo "-----"
}
