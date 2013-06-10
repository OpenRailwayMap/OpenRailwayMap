
(function (MapCSS) {
    'use strict';

    function restyle(style, tags, zoom, type, selector) {
        var s_default = {};

        if ((selector == 'meta')) {
            s_default['title'] = 'OpenRailwayMap';
            s_default['version'] = '0';
            s_default['description'] = 'Style for a railroad network map.';
            s_default['author'] = 'rurseekatze';
            s_default['link'] = 'http://wiki.openstreetmap.org/wiki/OpenRailwayMap';
            s_default['watch-modified'] = 'true';
        }

        if ((selector == 'canvas')) {
            s_default['background-color'] = '#8a8a8a';
            s_default['default-points'] = 'true';
            s_default['default-lines'] = 'true';
        }

        if ((type == 'node' && zoom >= 1 && zoom <= 20)) {
            s_default['symbol-shape'] = 'square';
            s_default['symbol-fill-opacity'] = '0';
            s_default['symbol-size'] = '0';
            s_default['text'] = MapCSS.e_localize(tags, "");
            s_default['z-index'] = -1000;
        }

        if (((type == 'way' && tags['railway'] == 'rail' && (!tags.hasOwnProperty('bridge')) && (!tags.hasOwnProperty('usage')) && (!tags.hasOwnProperty('service')))) || ((type == 'way' && tags['railway'] == 'rail' && tags['bridge'] == 'no' && (!tags.hasOwnProperty('usage')) && (!tags.hasOwnProperty('service')))) || ((type == 'way' && tags['railway'] == 'rail' && (!tags.hasOwnProperty('tunnel')) && (!tags.hasOwnProperty('usage')) && (!tags.hasOwnProperty('service')))) || ((type == 'way' && tags['railway'] == 'rail' && tags['tunnel'] == 'no' && (!tags.hasOwnProperty('usage')) && (!tags.hasOwnProperty('service'))))) {
            s_default['z-index'] = 400;
            s_default['color'] = 'black';
            s_default['width'] = 2.5;
            s_default['linecap'] = 'butt';
        }

        if (((type == 'way' && tags['railway'] == 'rail' && (tags['bridge'] == '1' || tags['bridge'] == 'true' || tags['bridge'] == 'yes') && (!tags.hasOwnProperty('usage')) && (!tags.hasOwnProperty('service'))))) {
            s_default['z-index'] = 400;
            s_default['color'] = 'black';
            s_default['width'] = 2.5;
            s_default['linecap'] = 'butt';
            s_default['casing-color'] = '#797979';
            s_default['casing-width'] = 1.5;
        }

        if (((type == 'way' && tags['railway'] == 'rail' && (tags['tunnel'] == '1' || tags['tunnel'] == 'true' || tags['tunnel'] == 'yes') && (!tags.hasOwnProperty('usage')) && (!tags.hasOwnProperty('service'))))) {
            s_default['z-index'] = 400;
            s_default['color'] = 'black';
            s_default['opacity'] = 0.5;
            s_default['width'] = 2.5;
            s_default['linecap'] = 'butt';
            s_default['casing-color'] = 'black';
            s_default['casing-width'] = 1.5;
        }

        if (((type == 'way' && tags['railway'] == 'rail' && (!tags.hasOwnProperty('bridge')) && (!tags.hasOwnProperty('usage')) && tags['service'] == 'siding')) || ((type == 'way' && tags['railway'] == 'rail' && tags['bridge'] == 'no' && (!tags.hasOwnProperty('usage')) && tags['service'] == 'siding')) || ((type == 'way' && tags['railway'] == 'rail' && (!tags.hasOwnProperty('tunnel')) && (!tags.hasOwnProperty('usage')) && tags['service'] == 'siding')) || ((type == 'way' && tags['railway'] == 'rail' && tags['tunnel'] == 'no' && (!tags.hasOwnProperty('usage')) && tags['service'] == 'siding'))) {
            s_default['z-index'] = 870;
            s_default['color'] = 'black';
            s_default['width'] = 2;
            s_default['linecap'] = 'butt';
            s_default['text'] = MapCSS.e_localize(tags, 'railway:track_ref');
            s_default['text-position'] = 'line';
            s_default['text-color'] = 'gray';
            s_default['text-halo-radius'] = 0.5;
            s_default['text-halo-color'] = '#CCCCCC';
        }

        if (((type == 'way' && tags['railway'] == 'rail' && (tags['bridge'] == '1' || tags['bridge'] == 'true' || tags['bridge'] == 'yes') && (!tags.hasOwnProperty('usage')) && tags['service'] == 'siding'))) {
            s_default['z-index'] = 870;
            s_default['color'] = 'black';
            s_default['width'] = 2;
            s_default['linecap'] = 'butt';
            s_default['text'] = MapCSS.e_localize(tags, 'railway:track_ref');
            s_default['text-position'] = 'line';
            s_default['text-color'] = 'gray';
            s_default['text-halo-radius'] = 0.5;
            s_default['text-halo-color'] = '#CCCCCC';
            s_default['casing-color'] = '#797979';
            s_default['casing-width'] = 1;
        }

        if (((type == 'way' && tags['railway'] == 'rail' && (tags['tunnel'] == '1' || tags['tunnel'] == 'true' || tags['tunnel'] == 'yes') && (!tags.hasOwnProperty('usage')) && tags['service'] == 'siding'))) {
            s_default['z-index'] = 870;
            s_default['color'] = 'black';
            s_default['opacity'] = 0.5;
            s_default['width'] = 2;
            s_default['linecap'] = 'butt';
            s_default['text'] = MapCSS.e_localize(tags, 'railway:track_ref');
            s_default['text-position'] = 'line';
            s_default['text-color'] = 'gray';
            s_default['text-halo-radius'] = 0.5;
            s_default['text-halo-color'] = '#CCCCCC';
            s_default['casing-color'] = 'black';
            s_default['casing-width'] = 1;
        }

        if (((type == 'way' && tags['railway'] == 'rail' && (!tags.hasOwnProperty('bridge')) && (!tags.hasOwnProperty('usage')) && tags['service'] == 'yard')) || ((type == 'way' && tags['railway'] == 'rail' && tags['bridge'] == 'no' && (!tags.hasOwnProperty('usage')) && tags['service'] == 'yard')) || ((type == 'way' && tags['railway'] == 'rail' && (!tags.hasOwnProperty('tunnel')) && (!tags.hasOwnProperty('usage')) && tags['service'] == 'yard')) || ((type == 'way' && tags['railway'] == 'rail' && tags['tunnel'] == 'no' && (!tags.hasOwnProperty('usage')) && tags['service'] == 'yard'))) {
            s_default['z-index'] = 860;
            s_default['color'] = 'black';
            s_default['width'] = 1.5;
            s_default['linecap'] = 'butt';
            s_default['text'] = MapCSS.e_localize(tags, 'railway:track_ref');
            s_default['text-position'] = 'line';
            s_default['text-color'] = 'gray';
            s_default['text-halo-radius'] = 0.5;
            s_default['text-halo-color'] = '#CCCCCC';
        }

        if (((type == 'way' && tags['railway'] == 'rail' && (tags['bridge'] == '1' || tags['bridge'] == 'true' || tags['bridge'] == 'yes') && (!tags.hasOwnProperty('usage')) && tags['service'] == 'yard'))) {
            s_default['z-index'] = 860;
            s_default['color'] = 'black';
            s_default['width'] = 1.5;
            s_default['linecap'] = 'butt';
            s_default['text'] = MapCSS.e_localize(tags, 'railway:track_ref');
            s_default['text-position'] = 'line';
            s_default['text-color'] = 'gray';
            s_default['text-halo-radius'] = 0.5;
            s_default['text-halo-color'] = '#CCCCCC';
            s_default['casing-color'] = '#797979';
            s_default['casing-width'] = 1;
        }

        if (((type == 'way' && tags['railway'] == 'rail' && (tags['tunnel'] == '1' || tags['tunnel'] == 'true' || tags['tunnel'] == 'yes') && (!tags.hasOwnProperty('usage')) && tags['service'] == 'yard'))) {
            s_default['z-index'] = 860;
            s_default['color'] = 'black';
            s_default['opacity'] = 0.5;
            s_default['width'] = 1.5;
            s_default['linecap'] = 'butt';
            s_default['text'] = MapCSS.e_localize(tags, 'railway:track_ref');
            s_default['text-position'] = 'line';
            s_default['text-color'] = 'gray';
            s_default['text-halo-radius'] = 0.5;
            s_default['text-halo-color'] = '#CCCCCC';
            s_default['casing-color'] = 'black';
            s_default['casing-width'] = 1;
        }

        if (((type == 'way' && tags['railway'] == 'rail' && (!tags.hasOwnProperty('bridge')) && (!tags.hasOwnProperty('usage')) && tags['service'] == 'spur')) || ((type == 'way' && tags['railway'] == 'rail' && tags['bridge'] == 'no' && (!tags.hasOwnProperty('usage')) && tags['service'] == 'spur')) || ((type == 'way' && tags['railway'] == 'rail' && (!tags.hasOwnProperty('tunnel')) && (!tags.hasOwnProperty('usage')) && tags['service'] == 'spur')) || ((type == 'way' && tags['railway'] == 'rail' && tags['tunnel'] == 'no' && (!tags.hasOwnProperty('usage')) && tags['service'] == 'spur'))) {
            s_default['z-index'] = 880;
            s_default['color'] = '#87491D';
            s_default['width'] = 3;
            s_default['linecap'] = 'butt';
            s_default['text-position'] = 'line';
        }

        if (((type == 'way' && tags['railway'] == 'rail' && (tags['bridge'] == '1' || tags['bridge'] == 'true' || tags['bridge'] == 'yes') && (!tags.hasOwnProperty('usage')) && tags['service'] == 'spur'))) {
            s_default['z-index'] = 880;
            s_default['color'] = '#87491D';
            s_default['width'] = 3;
            s_default['linecap'] = 'butt';
            s_default['text-position'] = 'line';
            s_default['casing-color'] = '#797979';
            s_default['casing-width'] = 1;
        }

        if (((type == 'way' && tags['railway'] == 'rail' && (tags['tunnel'] == '1' || tags['tunnel'] == 'true' || tags['tunnel'] == 'yes') && (!tags.hasOwnProperty('usage')) && tags['service'] == 'spur'))) {
            s_default['z-index'] = 880;
            s_default['color'] = '#87491D';
            s_default['opacity'] = 0.5;
            s_default['width'] = 3;
            s_default['linecap'] = 'butt';
            s_default['text-position'] = 'line';
            s_default['casing-color'] = '#87491D';
            s_default['casing-width'] = 1;
        }

        if (((type == 'way' && tags['railway'] == 'rail' && (!tags.hasOwnProperty('bridge')) && (!tags.hasOwnProperty('usage')) && tags['service'] == 'crossover')) || ((type == 'way' && tags['railway'] == 'rail' && tags['bridge'] == 'no' && (!tags.hasOwnProperty('usage')) && tags['service'] == 'crossover')) || ((type == 'way' && tags['railway'] == 'rail' && (!tags.hasOwnProperty('tunnel')) && (!tags.hasOwnProperty('usage')) && tags['service'] == 'crossover')) || ((type == 'way' && tags['railway'] == 'rail' && tags['tunnel'] == 'no' && (!tags.hasOwnProperty('usage')) && tags['service'] == 'crossover'))) {
            s_default['z-index'] = 300;
            s_default['color'] = 'black';
            s_default['width'] = 1;
            s_default['linecap'] = 'butt';
        }

        if (((type == 'way' && tags['railway'] == 'rail' && (tags['bridge'] == '1' || tags['bridge'] == 'true' || tags['bridge'] == 'yes') && (!tags.hasOwnProperty('usage')) && tags['service'] == 'crossover'))) {
            s_default['z-index'] = 300;
            s_default['color'] = 'black';
            s_default['width'] = 1;
            s_default['linecap'] = 'butt';
            s_default['casing-color'] = '#797979';
            s_default['casing-width'] = 1;
        }

        if (((type == 'way' && tags['railway'] == 'rail' && (tags['tunnel'] == '1' || tags['tunnel'] == 'true' || tags['tunnel'] == 'yes') && (!tags.hasOwnProperty('usage')) && tags['service'] == 'crossover'))) {
            s_default['z-index'] = 300;
            s_default['color'] = 'black';
            s_default['opacity'] = 0.5;
            s_default['width'] = 1;
            s_default['linecap'] = 'butt';
            s_default['casing-color'] = 'black';
            s_default['casing-width'] = 1;
        }

        if (((type == 'way' && tags['railway'] == 'rail' && (!tags.hasOwnProperty('bridge')) && tags['usage'] == 'branch')) || ((type == 'way' && tags['railway'] == 'rail' && tags['bridge'] == 'no' && tags['usage'] == 'branch')) || ((type == 'way' && tags['railway'] == 'rail' && (!tags.hasOwnProperty('tunnel')) && tags['usage'] == 'branch')) || ((type == 'way' && tags['railway'] == 'rail' && tags['tunnel'] == 'no' && tags['usage'] == 'branch'))) {
            s_default['z-index'] = 1000;
            s_default['color'] = '#DACA00';
            s_default['width'] = 3.5;
            s_default['linecap'] = 'butt';
        }

        if (((type == 'way' && tags['railway'] == 'rail' && (tags['bridge'] == '1' || tags['bridge'] == 'true' || tags['bridge'] == 'yes') && tags['usage'] == 'branch'))) {
            s_default['z-index'] = 1000;
            s_default['color'] = '#DACA00';
            s_default['width'] = 3.5;
            s_default['linecap'] = 'butt';
            s_default['casing-color'] = '#797979';
            s_default['casing-width'] = 1.5;
        }

        if (((type == 'way' && tags['railway'] == 'rail' && (tags['tunnel'] == '1' || tags['tunnel'] == 'true' || tags['tunnel'] == 'yes') && tags['usage'] == 'branch'))) {
            s_default['z-index'] = 1000;
            s_default['color'] = '#DACA00';
            s_default['opacity'] = 0.5;
            s_default['width'] = 3.5;
            s_default['linecap'] = 'butt';
            s_default['casing-color'] = '#DACA00';
            s_default['casing-width'] = 1.5;
        }

        if (((type == 'way' && tags['railway'] == 'rail' && (!tags.hasOwnProperty('bridge')) && tags['usage'] == 'main')) || ((type == 'way' && tags['railway'] == 'rail' && tags['bridge'] == 'no' && tags['usage'] == 'main')) || ((type == 'way' && tags['railway'] == 'rail' && (!tags.hasOwnProperty('tunnel')) && tags['usage'] == 'main')) || ((type == 'way' && tags['railway'] == 'rail' && tags['tunnel'] == 'no' && tags['usage'] == 'main'))) {
            s_default['z-index'] = 1100;
            s_default['color'] = '#DC7503';
            s_default['width'] = 3.5;
            s_default['linecap'] = 'butt';
        }

        if (((type == 'way' && tags['railway'] == 'rail' && (tags['bridge'] == '1' || tags['bridge'] == 'true' || tags['bridge'] == 'yes') && tags['usage'] == 'main'))) {
            s_default['z-index'] = 1100;
            s_default['color'] = '#DC7503';
            s_default['width'] = 3.5;
            s_default['linecap'] = 'butt';
            s_default['casing-color'] = '#797979';
            s_default['casing-width'] = 1.5;
        }

        if (((type == 'way' && tags['railway'] == 'rail' && (tags['tunnel'] == '1' || tags['tunnel'] == 'true' || tags['tunnel'] == 'yes') && tags['usage'] == 'main'))) {
            s_default['z-index'] = 1100;
            s_default['color'] = '#DC7503';
            s_default['opacity'] = 0.5;
            s_default['width'] = 3.5;
            s_default['linecap'] = 'butt';
            s_default['casing-color'] = '#DC7503';
            s_default['casing-width'] = 1.5;
        }

        if (((type == 'way' && tags['railway'] == 'rail' && (!tags.hasOwnProperty('bridge')) && tags['usage'] == 'main' && (tags['highspeed'] == '1' || tags['highspeed'] == 'true' || tags['highspeed'] == 'yes'))) || ((type == 'way' && tags['railway'] == 'rail' && tags['bridge'] == 'no' && tags['usage'] == 'main' && (tags['highspeed'] == '1' || tags['highspeed'] == 'true' || tags['highspeed'] == 'yes'))) || ((type == 'way' && tags['railway'] == 'rail' && (!tags.hasOwnProperty('tunnel')) && tags['usage'] == 'main' && (tags['highspeed'] == '1' || tags['highspeed'] == 'true' || tags['highspeed'] == 'yes'))) || ((type == 'way' && tags['railway'] == 'rail' && tags['tunnel'] == 'no' && tags['usage'] == 'main' && (tags['highspeed'] == '1' || tags['highspeed'] == 'true' || tags['highspeed'] == 'yes')))) {
            s_default['z-index'] = 2000;
            s_default['color'] = '#ff0000';
            s_default['width'] = 3.5;
            s_default['linecap'] = 'butt';
        }

        if (((type == 'way' && tags['railway'] == 'rail' && (tags['bridge'] == '1' || tags['bridge'] == 'true' || tags['bridge'] == 'yes') && tags['usage'] == 'main' && (tags['highspeed'] == '1' || tags['highspeed'] == 'true' || tags['highspeed'] == 'yes')))) {
            s_default['z-index'] = 2000;
            s_default['color'] = '#ff0000';
            s_default['width'] = 3.5;
            s_default['linecap'] = 'butt';
            s_default['casing-color'] = '#797979';
            s_default['casing-width'] = 1.5;
        }

        if (((type == 'way' && tags['railway'] == 'rail' && (tags['tunnel'] == '1' || tags['tunnel'] == 'true' || tags['tunnel'] == 'yes') && tags['usage'] == 'main' && (tags['highspeed'] == '1' || tags['highspeed'] == 'true' || tags['highspeed'] == 'yes')))) {
            s_default['z-index'] = 2000;
            s_default['color'] = '#ff0000';
            s_default['opacity'] = 0.5;
            s_default['width'] = 3.5;
            s_default['linecap'] = 'butt';
            s_default['casing-color'] = '#ff0000';
            s_default['casing-width'] = 1.5;
        }

        if (((type == 'way' && tags['railway'] == 'rail' && (!tags.hasOwnProperty('bridge')) && tags['usage'] == 'industrial' && (!tags.hasOwnProperty('service')))) || ((type == 'way' && tags['railway'] == 'rail' && tags['bridge'] == 'no' && tags['usage'] == 'industrial' && (!tags.hasOwnProperty('service')))) || ((type == 'way' && tags['railway'] == 'rail' && (!tags.hasOwnProperty('tunnel')) && tags['usage'] == 'industrial' && (!tags.hasOwnProperty('service')))) || ((type == 'way' && tags['railway'] == 'rail' && tags['tunnel'] == 'no' && tags['usage'] == 'industrial' && (!tags.hasOwnProperty('service'))))) {
            s_default['z-index'] = 850;
            s_default['color'] = '#87491D';
            s_default['width'] = 3;
            s_default['linecap'] = 'butt';
        }

        if (((type == 'way' && tags['railway'] == 'rail' && (tags['bridge'] == '1' || tags['bridge'] == 'true' || tags['bridge'] == 'yes') && tags['usage'] == 'industrial' && (!tags.hasOwnProperty('service'))))) {
            s_default['z-index'] = 850;
            s_default['color'] = '#87491D';
            s_default['width'] = 3;
            s_default['linecap'] = 'butt';
            s_default['casing-color'] = '#797979';
            s_default['casing-width'] = 1.5;
        }

        if (((type == 'way' && tags['railway'] == 'rail' && (tags['tunnel'] == '1' || tags['tunnel'] == 'true' || tags['tunnel'] == 'yes') && tags['usage'] == 'industrial' && (!tags.hasOwnProperty('service'))))) {
            s_default['z-index'] = 850;
            s_default['color'] = '#87491D';
            s_default['opacity'] = 0.5;
            s_default['width'] = 3;
            s_default['linecap'] = 'butt';
            s_default['casing-color'] = '#87491D';
            s_default['casing-width'] = 1.5;
        }

        if (((type == 'way' && tags['railway'] == 'rail' && (!tags.hasOwnProperty('bridge')) && tags['usage'] == 'industrial' && tags['service'] == 'siding')) || ((type == 'way' && tags['railway'] == 'rail' && (!tags.hasOwnProperty('bridge')) && tags['usage'] == 'industrial' && tags['service'] == 'spur')) || ((type == 'way' && tags['railway'] == 'rail' && (!tags.hasOwnProperty('bridge')) && tags['usage'] == 'industrial' && tags['service'] == 'yard')) || ((type == 'way' && tags['railway'] == 'rail' && (!tags.hasOwnProperty('bridge')) && tags['usage'] == 'industrial' && tags['service'] == 'crossover')) || ((type == 'way' && tags['railway'] == 'rail' && tags['bridge'] == 'no' && tags['usage'] == 'industrial' && tags['service'] == 'siding')) || ((type == 'way' && tags['railway'] == 'rail' && tags['bridge'] == 'no' && tags['usage'] == 'industrial' && tags['service'] == 'spur')) || ((type == 'way' && tags['railway'] == 'rail' && tags['bridge'] == 'no' && tags['usage'] == 'industrial' && tags['service'] == 'yard')) || ((type == 'way' && tags['railway'] == 'rail' && tags['bridge'] == 'no' && tags['usage'] == 'industrial' && tags['service'] == 'crossover')) || ((type == 'way' && tags['railway'] == 'rail' && (!tags.hasOwnProperty('tunnel')) && tags['usage'] == 'industrial' && tags['service'] == 'siding')) || ((type == 'way' && tags['railway'] == 'rail' && (!tags.hasOwnProperty('tunnel')) && tags['usage'] == 'industrial' && tags['service'] == 'spur')) || ((type == 'way' && tags['railway'] == 'rail' && (!tags.hasOwnProperty('tunnel')) && tags['usage'] == 'industrial' && tags['service'] == 'yard')) || ((type == 'way' && tags['railway'] == 'rail' && (!tags.hasOwnProperty('tunnel')) && tags['usage'] == 'industrial' && tags['service'] == 'crossover')) || ((type == 'way' && tags['railway'] == 'rail' && tags['tunnel'] == 'no' && tags['usage'] == 'industrial' && tags['service'] == 'siding')) || ((type == 'way' && tags['railway'] == 'rail' && tags['tunnel'] == 'no' && tags['usage'] == 'industrial' && tags['service'] == 'spur')) || ((type == 'way' && tags['railway'] == 'rail' && tags['tunnel'] == 'no' && tags['usage'] == 'industrial' && tags['service'] == 'yard')) || ((type == 'way' && tags['railway'] == 'rail' && tags['tunnel'] == 'no' && tags['usage'] == 'industrial' && tags['service'] == 'crossover'))) {
            s_default['z-index'] = 850;
            s_default['color'] = '#87491D';
            s_default['width'] = 2;
            s_default['linecap'] = 'butt';
        }

        if (((type == 'way' && tags['railway'] == 'rail' && (tags['bridge'] == '1' || tags['bridge'] == 'true' || tags['bridge'] == 'yes') && tags['usage'] == 'industrial' && tags['service'] == 'siding')) || ((type == 'way' && tags['railway'] == 'rail' && (tags['bridge'] == '1' || tags['bridge'] == 'true' || tags['bridge'] == 'yes') && tags['usage'] == 'industrial' && tags['service'] == 'spur')) || ((type == 'way' && tags['railway'] == 'rail' && (tags['bridge'] == '1' || tags['bridge'] == 'true' || tags['bridge'] == 'yes') && tags['usage'] == 'industrial' && tags['service'] == 'yard')) || ((type == 'way' && tags['railway'] == 'rail' && (tags['bridge'] == '1' || tags['bridge'] == 'true' || tags['bridge'] == 'yes') && tags['usage'] == 'industrial' && tags['service'] == 'crossover'))) {
            s_default['z-index'] = 850;
            s_default['color'] = '#87491D';
            s_default['width'] = 2;
            s_default['linecap'] = 'butt';
            s_default['casing-color'] = '#797979';
            s_default['casing-width'] = 1;
        }

        if (((type == 'way' && tags['railway'] == 'rail' && (tags['tunnel'] == '1' || tags['tunnel'] == 'true' || tags['tunnel'] == 'yes') && tags['usage'] == 'industrial' && tags['service'] == 'siding')) || ((type == 'way' && tags['railway'] == 'rail' && (tags['tunnel'] == '1' || tags['tunnel'] == 'true' || tags['tunnel'] == 'yes') && tags['usage'] == 'industrial' && tags['service'] == 'spur')) || ((type == 'way' && tags['railway'] == 'rail' && (tags['tunnel'] == '1' || tags['tunnel'] == 'true' || tags['tunnel'] == 'yes') && tags['usage'] == 'industrial' && tags['service'] == 'yard')) || ((type == 'way' && tags['railway'] == 'rail' && (tags['tunnel'] == '1' || tags['tunnel'] == 'true' || tags['tunnel'] == 'yes') && tags['usage'] == 'industrial' && tags['service'] == 'crossover'))) {
            s_default['z-index'] = 850;
            s_default['color'] = '#87491D';
            s_default['opacity'] = 0.5;
            s_default['width'] = 2;
            s_default['linecap'] = 'butt';
            s_default['casing-color'] = '#87491D';
            s_default['casing-width'] = 1;
        }

        if (((type == 'way' && tags['railway'] == 'disused' && (!tags.hasOwnProperty('bridge')))) || ((type == 'way' && tags['railway'] == 'disused' && tags['bridge'] == 'no')) || ((type == 'way' && tags['railway'] == 'disused' && (!tags.hasOwnProperty('tunnel')))) || ((type == 'way' && tags['railway'] == 'disused' && tags['tunnel'] == 'no'))) {
            s_default['z-index'] = 100;
            s_default['color'] = '#949494';
            s_default['width'] = 3;
            s_default['casing-color'] = '#ADADAD';
            s_default['casing-width'] = 0.5;
            s_default['linecap'] = 'butt';
        }

        if (((type == 'way' && tags['railway'] == 'disused' && (tags['bridge'] == '1' || tags['bridge'] == 'true' || tags['bridge'] == 'yes')))) {
            s_default['z-index'] = 100;
            s_default['color'] = '#949494';
            s_default['width'] = 3;
            s_default['casing-color'] = '#797979';
            s_default['casing-width'] = 1;
            s_default['linecap'] = 'butt';
        }

        if (((type == 'way' && tags['railway'] == 'disused' && (tags['tunnel'] == '1' || tags['tunnel'] == 'true' || tags['tunnel'] == 'yes')))) {
            s_default['z-index'] = 100;
            s_default['color'] = '#949494';
            s_default['opacity'] = 0.5;
            s_default['width'] = 3;
            s_default['casing-color'] = '#949494';
            s_default['casing-width'] = 1;
            s_default['linecap'] = 'butt';
        }

        if (((type == 'way' && tags['railway'] == 'tram' && (!tags.hasOwnProperty('bridge')))) || ((type == 'way' && tags['railway'] == 'tram' && tags['bridge'] == 'no')) || ((type == 'way' && tags['railway'] == 'tram' && (!tags.hasOwnProperty('tunnel')))) || ((type == 'way' && tags['railway'] == 'tram' && tags['tunnel'] == 'no'))) {
            s_default['z-index'] = 1100;
            s_default['color'] = 'white';
            s_default['width'] = 1.5;
            s_default['casing-color'] = '#D40096';
            s_default['casing-width'] = 1.5;
            s_default['linecap'] = 'butt';
        }

        if (((type == 'way' && tags['railway'] == 'tram' && (tags['bridge'] == '1' || tags['bridge'] == 'true' || tags['bridge'] == 'yes')))) {
            s_default['z-index'] = 1100;
            s_default['color'] = 'white';
            s_default['width'] = 1.5;
            s_default['casing-color'] = '#797979';
            s_default['casing-width'] = 1.5;
            s_default['linecap'] = 'butt';
        }

        if (((type == 'way' && tags['railway'] == 'tram' && (tags['tunnel'] == '1' || tags['tunnel'] == 'true' || tags['tunnel'] == 'yes')))) {
            s_default['z-index'] = 1100;
            s_default['color'] = 'white';
            s_default['width'] = 1.5;
            s_default['casing-color'] = '#D40096';
            s_default['casing-width'] = 1.5;
            s_default['linecap'] = 'butt';
        }

        if (((type == 'way' && tags['railway'] == 'subway' && (!tags.hasOwnProperty('bridge')))) || ((type == 'way' && tags['railway'] == 'subway' && tags['bridge'] == 'no')) || ((type == 'way' && tags['railway'] == 'subway' && (!tags.hasOwnProperty('tunnel')))) || ((type == 'way' && tags['railway'] == 'subway' && tags['tunnel'] == 'no'))) {
            s_default['z-index'] = 1100;
            s_default['color'] = 'white';
            s_default['width'] = 2;
            s_default['casing-color'] = '#0300C3';
            s_default['casing-width'] = 1.5;
            s_default['linecap'] = 'butt';
        }

        if (((type == 'way' && tags['railway'] == 'subway' && (tags['bridge'] == '1' || tags['bridge'] == 'true' || tags['bridge'] == 'yes')))) {
            s_default['z-index'] = 1100;
            s_default['color'] = 'white';
            s_default['width'] = 2;
            s_default['casing-color'] = '#797979';
            s_default['casing-width'] = 1.5;
            s_default['linecap'] = 'butt';
        }

        if (((type == 'way' && tags['railway'] == 'subway' && (tags['tunnel'] == '1' || tags['tunnel'] == 'true' || tags['tunnel'] == 'yes')))) {
            s_default['z-index'] = 1100;
            s_default['color'] = 'white';
            s_default['width'] = 2;
            s_default['casing-color'] = '#0300C3';
            s_default['casing-width'] = 1.5;
            s_default['linecap'] = 'butt';
        }

        if (((type == 'way' && tags['railway'] == 'light_rail' && (!tags.hasOwnProperty('bridge')))) || ((type == 'way' && tags['railway'] == 'light_rail' && tags['bridge'] == 'no')) || ((type == 'way' && tags['railway'] == 'light_rail' && (!tags.hasOwnProperty('tunnel')))) || ((type == 'way' && tags['railway'] == 'light_rail' && tags['tunnel'] == 'no'))) {
            s_default['z-index'] = 1100;
            s_default['color'] = 'white';
            s_default['width'] = 2;
            s_default['casing-color'] = '#00BD14';
            s_default['casing-width'] = 1.5;
            s_default['linecap'] = 'butt';
        }

        if (((type == 'way' && tags['railway'] == 'light_rail' && (tags['bridge'] == '1' || tags['bridge'] == 'true' || tags['bridge'] == 'yes')))) {
            s_default['z-index'] = 1100;
            s_default['color'] = 'white';
            s_default['width'] = 2;
            s_default['casing-color'] = '#797979';
            s_default['casing-width'] = 1.5;
            s_default['linecap'] = 'butt';
        }

        if (((type == 'way' && tags['railway'] == 'light_rail' && (tags['tunnel'] == '1' || tags['tunnel'] == 'true' || tags['tunnel'] == 'yes')))) {
            s_default['z-index'] = 1100;
            s_default['color'] = 'white';
            s_default['width'] = 2;
            s_default['casing-color'] = '#00BD14';
            s_default['casing-width'] = 1.5;
            s_default['linecap'] = 'butt';
        }

        if (((type == 'node' && tags['railway'] == 'switch'))) {
            s_default['z-index'] = 5000;
            s_default['symbol-shape'] = 'circle';
            s_default['symbol-size'] = '8';
            s_default['symbol-stroke-color'] = 'black';
            s_default['symbol-fill-color'] = 'black';
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-position'] = 'auto';
        }

        if (((type == 'node' && tags['railway'] == 'signal_box'))) {
            s_default['z-index'] = 7000;
            s_default['text'] = MapCSS.e_localize(tags, 'name');
            s_default['text-position'] = 'auto';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 0.5;
            s_default['text-halo-color'] = '#008206';
        }

        if (((selector == 'area' && tags['railway'] == 'signal_box'))) {
            s_default['z-index'] = 7000;
            s_default['text'] = MapCSS.e_localize(tags, 'name');
            s_default['text-position'] = 'center';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 0.5;
            s_default['text-halo-color'] = '#008206';
        }

        if (((type == 'node' && tags['railway'] == 'milestone'))) {
            s_default['z-index'] = 6000;
            s_default['text'] = MapCSS.e_localize(tags, 'railway:position');
            s_default['text-position'] = 'auto';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 0.5;
            s_default['text-halo-color'] = '#CCCCCC';
        }

        if (((type == 'node' && tags['railway'] == 'station') && zoom >= 11)) {
            s_default['z-index'] = 10000;
            s_default['symbol-shape'] = 'circle';
            s_default['symbol-size'] = '8';
            s_default['symbol-stroke-color'] = 'blue';
            s_default['symbol-fill-color'] = 'blue';
            s_default['text'] = MapCSS.e_localize(tags, 'name');
            s_default['text-position'] = 'auto';
            s_default['text-size'] = '30';
            s_default['text-color'] = 'blue';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
        }

        if (((type == 'node' && tags['railway'] == 'station') && zoom >= 1 && zoom <= 11)) {
            s_default['z-index'] = 10000;
            s_default['symbol-shape'] = 'circle';
            s_default['symbol-size'] = '8';
            s_default['symbol-stroke-color'] = 'blue';
            s_default['symbol-fill-color'] = 'blue';
            s_default['text'] = MapCSS.e_localize(tags, 'railway:ref');
            s_default['text-position'] = 'auto';
            s_default['text-size'] = '30';
            s_default['text-color'] = 'blue';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
        }

        if (((selector == 'area' && tags['railway'] == 'station') && zoom >= 11)) {
            s_default['z-index'] = 10000;
            s_default['symbol-shape'] = 'circle';
            s_default['symbol-size'] = '8';
            s_default['symbol-stroke-color'] = 'blue';
            s_default['symbol-fill-color'] = 'blue';
            s_default['text'] = MapCSS.e_localize(tags, 'name');
            s_default['text-position'] = 'center';
            s_default['text-size'] = '30';
            s_default['text-color'] = 'blue';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
        }

        if (((selector == 'area' && tags['railway'] == 'station') && zoom >= 1 && zoom <= 11)) {
            s_default['z-index'] = 10000;
            s_default['symbol-shape'] = 'circle';
            s_default['symbol-size'] = '8';
            s_default['symbol-stroke-color'] = 'blue';
            s_default['symbol-fill-color'] = 'blue';
            s_default['text'] = MapCSS.e_localize(tags, 'railway:ref');
            s_default['text-position'] = 'center';
            s_default['text-size'] = '30';
            s_default['text-color'] = 'blue';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
        }

        if (((type == 'node' && tags['railway'] == 'halt') && zoom >= 11)) {
            s_default['z-index'] = 10000;
            s_default['symbol-shape'] = 'circle';
            s_default['symbol-size'] = '8';
            s_default['symbol-stroke-color'] = 'blue';
            s_default['symbol-fill-color'] = 'blue';
            s_default['text'] = MapCSS.e_localize(tags, 'name');
            s_default['text-position'] = 'auto';
            s_default['text-size'] = '22';
            s_default['text-color'] = 'blue';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
        }

        if (((type == 'node' && tags['railway'] == 'halt') && zoom >= 1 && zoom <= 11)) {
            s_default['z-index'] = 10000;
            s_default['symbol-shape'] = 'circle';
            s_default['symbol-size'] = '8';
            s_default['symbol-stroke-color'] = 'blue';
            s_default['symbol-fill-color'] = 'blue';
            s_default['text'] = MapCSS.e_localize(tags, 'railway:ref');
            s_default['text-position'] = 'auto';
            s_default['text-size'] = '22';
            s_default['text-color'] = 'blue';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
        }

        if (((selector == 'area' && tags['railway'] == 'halt') && zoom >= 11)) {
            s_default['z-index'] = 10000;
            s_default['symbol-shape'] = 'circle';
            s_default['symbol-size'] = '8';
            s_default['symbol-stroke-color'] = 'blue';
            s_default['symbol-fill-color'] = 'blue';
            s_default['text'] = MapCSS.e_localize(tags, 'name');
            s_default['text-position'] = 'center';
            s_default['text-size'] = '22';
            s_default['text-color'] = 'blue';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
        }

        if (((selector == 'area' && tags['railway'] == 'halt') && zoom >= 1 && zoom <= 11)) {
            s_default['z-index'] = 10000;
            s_default['symbol-shape'] = 'circle';
            s_default['symbol-size'] = '8';
            s_default['symbol-stroke-color'] = 'blue';
            s_default['symbol-fill-color'] = 'blue';
            s_default['text'] = MapCSS.e_localize(tags, 'railway:ref');
            s_default['text-position'] = 'center';
            s_default['text-size'] = '22';
            s_default['text-color'] = 'blue';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
        }

        if (!K.Utils.isEmpty(s_default)) {
            style['default'] = s_default; }
        return style;
    }
    
    var sprite_images = {
    }, external_images = [], presence_tags = [], value_tags = ['ref', 'railway:position', "", 'railway', 'railway:track_ref', 'usage', 'highspeed', 'name', 'tunnel', 'service', 'railway:ref', 'bridge'];

    MapCSS.loadStyle('style', restyle, sprite_images, external_images, presence_tags, value_tags);
    MapCSS.preloadExternalImages('style');
})(MapCSS);
    