/*
#-----------------------------------------------------------------------------
# says which tiles contain data from a specified OSM XML file
# usage: tilecount planet.osm > tile_list.txt
#-----------------------------------------------------------------------------
# Original Perl implementation Copyright 2006, Oliver White
# Re-implementation by Jon Burgess, Copyright 2006
#
# This program is free software; you can redistribute it and/or
# modify it under the terms of the GNU General Public License
# as published by the Free Software Foundation; either version 2
# of the License, or (at your option) any later version.
# 
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
# 
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
#-----------------------------------------------------------------------------
*/

#define _GNU_SOURCE

#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>
#include <string.h>
#include <assert.h>
#include <math.h>

#include <libxml/xmlreader.h>

#include "bst.h"

#define MAXZOOM 18

struct osmTile {
	int x;
	int y;
};

struct bst_table *tiles[MAXZOOM+1];
unsigned int Num[MAXZOOM+1];

static int count_node;
static double LimitY, LimitY2, RangeY;

void usage(const char *arg0)
{
	fprintf(stderr, "\nUsage error:\n\t%s planet.osm  > tile_list.txt\n", arg0);
	fprintf(stderr, "\nGenerates a list of tiles to be rendered covering all nodes in planet.osm\n");
}

static inline double DegToRad(double x)
{
	return x * M_PIl / 180.0;
}

static inline double RadToDeg(double x)
{
	return x * 180.0 / M_PIl;
}

static inline double ProjectF(double lat) {
	lat = DegToRad(lat);
	return log(tan(lat) + 1.0/cos(lat));
}

void mark_tile(int z, int x, int y)
{
	struct osmTile *tile, *dupe;

	tile = malloc(sizeof(*tile));
	assert(tile);

	tile->x = x;
	tile->y = y;
	dupe = bst_insert(tiles[z], (void *)tile);
	if (dupe)
		free(tile);
}

void HandlePos(double lat, double lon)
{
	double MercY = ProjectF(lat);
	double RelY  = (LimitY - MercY) / RangeY;
	double RelX  = (lon + 180) / 360;
	int z;

	for (z=0; z<=MAXZOOM; z++) {
		int x = RelX * Num[z];
		int y = RelY * Num[z];
		mark_tile(z, x, y);
	}
}

void StartElement(xmlTextReaderPtr reader, const xmlChar *name)
{
	xmlChar *xlat, *xlon;
	double lon, lat;

	if (xmlStrEqual(name, BAD_CAST "node")) {
		xlon = xmlTextReaderGetAttribute(reader, BAD_CAST "lon");
		xlat = xmlTextReaderGetAttribute(reader, BAD_CAST "lat");
		lon = strtod((char *)xlon, NULL);
		lat = strtod((char *)xlat, NULL);
		xmlFree(xlon);
		xmlFree(xlat);
		count_node++;
		HandlePos(lat, lon);
	}
}

static void processNode(xmlTextReaderPtr reader) {
    xmlChar *name;
    name = xmlTextReaderName(reader);
    if (name == NULL)
        name = xmlStrdup(BAD_CAST "--");

   switch(xmlTextReaderNodeType(reader)) {
   case XML_READER_TYPE_ELEMENT:
	StartElement(reader, name);	
	break;
   default:
	break;
   }

   xmlFree(name);
}

void streamFile(char *filename) {
    xmlTextReaderPtr reader;
    int ret;

    reader = xmlNewTextReaderFilename(filename);
    if (reader != NULL) {
        ret = xmlTextReaderRead(reader);
        while (ret == 1) {
            processNode(reader);
            ret = xmlTextReaderRead(reader);
	    if (count_node % 10000 == 0) 
		fprintf(stderr, "processing node: %dk\r", count_node/1000);
        }

        if (ret != 0) {
            fprintf(stderr, "%s : failed to parse\n", filename);
		return;
        }
	fprintf(stderr, "\n");
        xmlFreeTextReader(reader);
    } else {
        fprintf(stderr, "Unable to open %s\n", filename);
    }
}

int compare_tile(const void *bst_a, const void *bst_b, void *bst_param)
{
	const struct osmTile *tA = bst_a;
	const struct osmTile *tB = bst_b;

	if (tA == tB) return 0;

	if (tA->x < tB->x)
		return -1;
	else if (tA->x > tB->x)
		return +1;
	
	if (tA->y < tB->y)
		return -1;
	else if (tA->y > tB->y)
		return +1;

	return 0; 
}

void outputTiles(void)
{
	int z;
	struct bst_traverser t;
	struct osmTile *tile;

	for (z=0; z<=MAXZOOM; z++) {
		bst_t_init(&t, tiles[z]);
		while ((tile = bst_t_next(&t)))
			printf("%u:%d:%d\n", z, tile->x, tile->y);
	}
}

void initTiles(void) 
{
	int z, n=1;
	for (z=0; z<=MAXZOOM; z++) {
		tiles[z] = bst_create(compare_tile, NULL, NULL);
		assert(tiles[z]);
		Num[z] = n;
		n *= 2;
	}

	LimitY  = ProjectF(85.0511);
	LimitY2 = ProjectF(-85.0511);
	RangeY = LimitY - LimitY2;
}


int main(int argc, char *argv[])
{
	if (argc != 2) {
		usage(argv[0]);
		exit(1);
	}
 
	LIBXML_TEST_VERSION
	initTiles();
	streamFile(argv[1]);
	outputTiles();
    	return 0;
}
