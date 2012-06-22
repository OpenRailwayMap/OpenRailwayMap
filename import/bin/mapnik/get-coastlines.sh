#!/bin/sh

# Copyright (C) 2010 Rodolphe Quiédeville <rodolphe@quiedeville.org> 
#
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation; either version 2 of the License, or
# (at your option) any later version.

UNZIP=/usr/bin/unzip
TAR=/bin/tar
BUNZIP2=/bin/bunzip2
WGET=/usr/bin/wget

if [ -z $1 ] ; then
OUTDIR=`pwd`
else
OUTDIR=$1
fi


if [ ! -x $UNZIP ]; then
    echo "unzip is not installed in $UNZIP, it is needed by this script"
    exit
fi

if [ ! -x $TAR ]; then
    echo "tar is not installed in $TAR, it is needed by this script"
    exit
fi

if [ ! -x $BUNZIP2 ]; then
    echo "bunzip2 is not installed in $BUNZIP2, it is needed by this script"
    exit
fi

if [ ! -x $WGET ]; then
    echo "wget is not installed in $WGET, it is needed by this script"
    exit
fi

if [ ! -e $OUTDIR ]; then
    mkdir $OUTDIR
fi

$WGET http://tile.openstreetmap.org/world_boundaries-spherical.tgz -O $OUTDIR/world_boundaries-spherical.tgz
$WGET http://tile.openstreetmap.org/processed_p.tar.bz2 -O $OUTDIR/processed_p.tar.bz2
$WGET http://tile.openstreetmap.org/shoreline_300.tar.bz2 -O $OUTDIR/shoreline_300.tar.bz2
$WGET http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/10m-populated-places.zip -O $OUTDIR/10m-populated-places.zip
$WGET http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/110m/cultural/110m-admin-0-boundary-lines.zip -O $OUTDIR/110m-admin-0-boundary-lines.zip

$TAR xvf $OUTDIR/world_boundaries-spherical.tgz -C $OUTDIR

if [ -d $OUTDIR/world_boundaries ]; then

	if [ -f $OUTDIR/processed_p.tar.bz2 ]; then
		$TAR xvf $OUTDIR/processed_p.tar.bz2 -C $OUTDIR
		mv $OUTDIR/processed_p.[dis]* $OUTDIR/world_boundaries/
	else
		echo 'processed_p.tar.bz2 not present'
	fi

	if [ -f $OUTDIR/shoreline_300.tar.bz2 ]; then
		$TAR xvf $OUTDIR/shoreline_300.tar.bz2 -C $OUTDIR
		mv $OUTDIR/shoreline_300.[dis]* $OUTDIR/world_boundaries/
	else
		echo 'shoreline_300.tar.bz2 not present'
	fi

	if [ -f $OUTDIR/10m-populated-places.zip ]; then
		$UNZIP -o $OUTDIR/10m-populated-places.zip -d $OUTDIR/world_boundaries
	else
		echo '10m-populated-places.zip not present'
	fi

	if [ -f $OUTDIR/110m-admin-0-boundary-lines.zip ]; then
		$UNZIP -o $OUTDIR/110m-admin-0-boundary-lines.zip -d $OUTDIR/world_boundaries
	else
		echo '110m-admin-0-boundary-lines.zip not present'
	fi

fi
