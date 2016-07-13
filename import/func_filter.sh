#!/bin/bash

function filter_planet
{
	echo "Converting planet file"
	osmconvert old.pbf \
		--drop-relations \
		--drop-author \
		--out-o5m > temp.o5m
	echo "-----"

	echo "Filtering planet file"
	osmfilter temp.o5m \
		--parameter-file=$(dirname ${0})/osmfilter.params \
		$*
	rm temp.o5m
	echo "-----"
}
