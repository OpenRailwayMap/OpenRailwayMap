
(function (MapCSS) {
    'use strict';

    function restyle(style, tags, zoom, type, selector) {
        var s_default = {}, s_bridges = {}, s_tunnels = {};

        if ((selector == 'meta')) {
            s_default['title'] = 'OpenRailwayMap infrastructure standard layer';
            s_default['version'] = '0';
            s_default['description'] = 'Style for a infrastructure standard layer railroad network map.';
            s_default['author'] = 'rurseekatze';
            s_default['link'] = 'http://wiki.openstreetmap.org/wiki/OpenRailwayMap';
            s_default['watch-modified'] = 'true';
        }

        if ((selector == 'canvas')) {
            s_default['default-points'] = 'true';
            s_default['default-lines'] = 'true';
        }

        if (((type == 'way' && tags['railway'] == 'rail' && tags['bridge'] == 'yes') && zoom >= 2 && zoom <= 5)) {
            s_bridges['z-index'] = 1;
            s_bridges['casing-width'] = 1.5;
            s_bridges['casing-color'] = '#797979';
            s_bridges['linejoin'] = 'butt';
        }

        if (((type == 'way' && tags['railway'] == 'rail' && tags['bridge'] == 'yes') && zoom >= 6 && zoom <= 8)) {
            s_bridges['z-index'] = 1;
            s_bridges['casing-width'] = 2.5;
            s_bridges['casing-color'] = '#797979';
            s_bridges['linejoin'] = 'butt';
        }

        if (((type == 'way' && tags['railway'] == 'rail' && tags['bridge'] == 'yes') && zoom >= 9) || ((type == 'way' && tags['railway'] == 'disused' && tags['bridge'] == 'yes') && zoom >= 9) || ((type == 'way' && tags['railway'] == 'abandoned' && tags['bridge'] == 'yes') && zoom >= 9) || ((type == 'way' && tags['railway'] == 'razed' && tags['bridge'] == 'yes') && zoom >= 9) || ((type == 'way' && tags['railway'] == 'proposed' && tags['bridge'] == 'yes') && zoom >= 9) || ((type == 'way' && tags['railway'] == 'construction' && tags['bridge'] == 'yes') && zoom >= 9) || ((type == 'way' && tags['railway'] == 'preserved' && tags['bridge'] == 'yes') && zoom >= 9) || ((type == 'way' && tags['railway'] == 'narrow_gauge' && tags['bridge'] == 'yes') && zoom >= 9)) {
            s_bridges['z-index'] = 1;
            s_bridges['casing-width'] = 3.5;
            s_bridges['casing-color'] = '#797979';
            s_bridges['linejoin'] = 'butt';
        }

        if (((type == 'way' && tags['bridge'] == 'yes') && zoom >= 12)) {
            s_bridges['z-index'] = 4000;
            s_bridges['text-position'] = 'line';
            s_bridges['text-color'] = '#585858';
            s_bridges['font-size'] = '11';
            s_bridges['font-family'] = 'Verdana Bold';
            s_bridges['font-style'] = 'italic';
            s_bridges['text-halo-radius'] = 1;
            s_bridges['text-halo-color'] = 'white';
            s_bridges['text'] = MapCSS.e_localize(tags, MapCSS.e_concat("ref", " ", "bridge:name"));
        }

        if (((type == 'way' && tags['railway'] == 'disused') && zoom >= 9) || ((type == 'way' && tags['railway'] == 'abandoned') && zoom >= 9) || ((type == 'way' && tags['railway'] == 'razed') && zoom >= 9)) {
            s_default['z-index'] = 10;
            s_default['casing-color'] = 'black';
            s_default['casing-opacity'] = 0.2;
            s_default['casing-width'] = 1;
            s_default['linejoin'] = 'butt';
            s_default['width'] = 0.8;
        }

        if (((type == 'way' && tags['tunnel'] == 'yes' && (!tags.hasOwnProperty('railway:track_ref'))))) {
            s_tunnels['z-index'] = 4001;
            s_tunnels['text-position'] = 'line';
            s_tunnels['text-color'] = '#585858';
            s_tunnels['font-size'] = '11';
            s_tunnels['font-family'] = 'Verdana Bold';
            s_tunnels['font-style'] = 'italic';
            s_tunnels['text-halo-radius'] = 1;
            s_tunnels['text-halo-color'] = 'white';
            s_tunnels['text'] = MapCSS.e_localize(tags, MapCSS.e_concat("ref", " ", "tunnel:name"));
        }

        if (((type == 'way' && tags['tunnel'] == 'yes'))) {
            s_tunnels['z-index'] = 4000;
            s_tunnels['width'] = 6;
            s_tunnels['color'] = 'white';
            s_tunnels['opacity'] = 0.6;
            s_tunnels['linecap'] = 'butt';
            s_tunnels['linejoin'] = 'butt';
        }

        if (((type == 'way' && tags['railway'] == 'rail' && (!tags.hasOwnProperty('service')) && (!tags.hasOwnProperty('bridge')) && (!tags.hasOwnProperty('tunnel')))) || ((type == 'way' && tags['railway'] == 'disused' && (!tags.hasOwnProperty('service')) && (!tags.hasOwnProperty('bridge')) && (!tags.hasOwnProperty('tunnel')))) || ((type == 'way' && tags['railway'] == 'abandoned' && (!tags.hasOwnProperty('service')) && (!tags.hasOwnProperty('bridge')) && (!tags.hasOwnProperty('tunnel')))) || ((type == 'way' && tags['railway'] == 'razed' && (!tags.hasOwnProperty('service')) && (!tags.hasOwnProperty('bridge')) && (!tags.hasOwnProperty('tunnel')))) || ((type == 'way' && tags['railway'] == 'proposed' && (!tags.hasOwnProperty('service')) && (!tags.hasOwnProperty('bridge')) && (!tags.hasOwnProperty('tunnel')))) || ((type == 'way' && tags['railway'] == 'construction' && (!tags.hasOwnProperty('service')) && (!tags.hasOwnProperty('bridge')) && (!tags.hasOwnProperty('tunnel')))) || ((type == 'way' && tags['railway'] == 'preserved' && (!tags.hasOwnProperty('service')) && (!tags.hasOwnProperty('bridge')) && (!tags.hasOwnProperty('tunnel')))) || ((type == 'way' && tags['railway'] == 'narrow_gauge' && (!tags.hasOwnProperty('service')) && (!tags.hasOwnProperty('bridge')) && (!tags.hasOwnProperty('tunnel'))))) {
            s_default['z-index'] = 10000;
            s_default['text'] = MapCSS.e_localize(tags, MapCSS.e_concat("ref", " ", "name"));
            s_default['text-position'] = 'line';
            s_default['text-color'] = '#585858';
            s_default['font-size'] = '11';
            s_default['font-family'] = 'Verdana Bold';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
        }

        if (((type == 'way' && tags['railway'] == 'rail' && (!tags.hasOwnProperty('usage')) && (!tags.hasOwnProperty('service'))) && zoom >= 10)) {
            s_default['z-index'] = 400;
            s_default['color'] = 'black';
            s_default['width'] = 2.5;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['railway'] == 'rail' && (!tags.hasOwnProperty('usage')) && tags['service'] == 'siding') && zoom >= 10)) {
            s_default['z-index'] = 870;
            s_default['color'] = 'black';
            s_default['width'] = 2;
            s_default['linejoin'] = 'round';
            s_default['text'] = MapCSS.e_localize(tags, 'railway:track_ref');
            s_default['text-position'] = 'line';
            s_default['text-color'] = 'gray';
            s_default['text-halo-radius'] = 0.5;
            s_default['text-halo-color'] = '#CCCCCC';
        }

        if (((type == 'way' && tags['railway'] == 'rail' && (!tags.hasOwnProperty('usage')) && tags['service'] == 'yard') && zoom >= 10)) {
            s_default['z-index'] = 860;
            s_default['color'] = 'black';
            s_default['width'] = 1.5;
            s_default['linejoin'] = 'round';
            s_default['text'] = MapCSS.e_localize(tags, 'railway:track_ref');
            s_default['text-position'] = 'line';
            s_default['text-color'] = 'gray';
            s_default['text-halo-radius'] = 0.5;
            s_default['text-halo-color'] = '#CCCCCC';
        }

        if (((type == 'way' && tags['railway'] == 'rail' && (!tags.hasOwnProperty('usage')) && tags['service'] == 'spur') && zoom >= 10)) {
            s_default['z-index'] = 880;
            s_default['color'] = '#87491D';
            s_default['width'] = 3;
            s_default['linejoin'] = 'round';
            s_default['text-position'] = 'line';
        }

        if (((type == 'way' && tags['railway'] == 'rail' && (!tags.hasOwnProperty('usage')) && tags['service'] == 'crossover') && zoom >= 10)) {
            s_default['z-index'] = 300;
            s_default['color'] = 'black';
            s_default['width'] = 1;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['railway'] == 'rail' && tags['usage'] == 'branch' && (!tags.hasOwnProperty('service'))) && zoom >= 2 && zoom <= 5)) {
            s_default['z-index'] = 1000;
            s_default['color'] = '#DACA00';
            s_default['width'] = 1.5;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['railway'] == 'rail' && tags['usage'] == 'branch' && (!tags.hasOwnProperty('service'))) && zoom >= 6 && zoom <= 8)) {
            s_default['z-index'] = 1000;
            s_default['color'] = '#DACA00';
            s_default['width'] = 2.5;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['railway'] == 'rail' && tags['usage'] == 'branch' && (!tags.hasOwnProperty('service'))) && zoom >= 9)) {
            s_default['z-index'] = 1000;
            s_default['color'] = '#DACA00';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['railway'] == 'rail' && tags['usage'] == 'main' && (!tags.hasOwnProperty('service'))) && zoom >= 2 && zoom <= 5)) {
            s_default['z-index'] = 1100;
            s_default['color'] = '#FF8100';
            s_default['width'] = 1.5;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['railway'] == 'rail' && tags['usage'] == 'main' && (!tags.hasOwnProperty('service'))) && zoom >= 6 && zoom <= 8)) {
            s_default['z-index'] = 1100;
            s_default['color'] = '#FF8100';
            s_default['width'] = 2.5;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['railway'] == 'rail' && tags['usage'] == 'main' && (!tags.hasOwnProperty('service'))) && zoom >= 9)) {
            s_default['z-index'] = 1100;
            s_default['color'] = '#FF8100';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['railway'] == 'rail' && tags['usage'] == 'main' && tags['highspeed'] == 'yes' && (!tags.hasOwnProperty('service'))) && zoom >= 2 && zoom <= 5)) {
            s_default['z-index'] = 2000;
            s_default['color'] = '#FF0C00';
            s_default['width'] = 1.5;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['railway'] == 'rail' && tags['usage'] == 'main' && tags['highspeed'] == 'yes' && (!tags.hasOwnProperty('service'))) && zoom >= 6 && zoom <= 8)) {
            s_default['z-index'] = 2000;
            s_default['color'] = '#FF0C00';
            s_default['width'] = 2.5;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['railway'] == 'rail' && tags['usage'] == 'main' && tags['highspeed'] == 'yes' && (!tags.hasOwnProperty('service'))) && zoom >= 9)) {
            s_default['z-index'] = 2000;
            s_default['color'] = '#FF0C00';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['railway'] == 'rail' && tags['usage'] == 'industrial' && (!tags.hasOwnProperty('service'))) && zoom >= 10)) {
            s_default['z-index'] = 850;
            s_default['color'] = '#87491D';
            s_default['width'] = 2;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['railway'] == 'rail' && tags['usage'] == 'industrial' && tags['service'] == 'siding') && zoom >= 10) || ((type == 'way' && tags['railway'] == 'rail' && tags['usage'] == 'industrial' && tags['service'] == 'spur') && zoom >= 10) || ((type == 'way' && tags['railway'] == 'rail' && tags['usage'] == 'industrial' && tags['service'] == 'yard') && zoom >= 10) || ((type == 'way' && tags['railway'] == 'rail' && tags['usage'] == 'industrial' && tags['service'] == 'crossover') && zoom >= 10)) {
            s_default['z-index'] = 850;
            s_default['color'] = '#87491D';
            s_default['width'] = 1.5;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['railway'] == 'preserved') && zoom >= 9)) {
            s_default['z-index'] = 400;
            s_default['color'] = '#70584D';
            s_default['width'] = 2;
            s_default['linejoin'] = 'butt';
            s_default['casing-width'] = 2;
            s_default['casing-color'] = '#70584D';
            s_default['casing-dashes'] = [3, 10];
        }

        if (((type == 'way' && tags['railway'] == 'construction') && zoom >= 9)) {
            s_default['z-index'] = 400;
            s_default['dashes'] = [9, 9];
            s_default['color'] = 'black';
            s_default['width'] = 3;
            s_default['linejoin'] = 'butt';
        }

        if (((type == 'way' && tags['railway'] == 'proposed') && zoom >= 9)) {
            s_default['z-index'] = 350;
            s_default['dashes'] = [2, 8];
            s_default['color'] = 'black';
            s_default['width'] = 3;
            s_default['linejoin'] = 'butt';
        }

        if (((type == 'way' && tags['railway'] == 'disused') && zoom >= 9)) {
            s_default['z-index'] = 300;
            s_default['color'] = '#70584D';
            s_default['width'] = 3;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['railway'] == 'abandoned') && zoom >= 9)) {
            s_default['z-index'] = 250;
            s_default['dashes'] = [5, 5];
            s_default['color'] = '#70584D';
            s_default['width'] = 3;
            s_default['opacity'] = 0.8;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['railway'] == 'razed') && zoom >= 9)) {
            s_default['z-index'] = 200;
            s_default['dashes'] = [11, 8];
            s_default['color'] = '#70584D';
            s_default['opacity'] = 0.6;
            s_default['width'] = 3;
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['railway'] == 'tram') && zoom >= 11)) {
            s_default['z-index'] = 1100;
            s_default['color'] = '#D877B8';
            s_default['width'] = 2.5;
            s_default['linejoin'] = 'butt';
        }

        if (((type == 'way' && tags['railway'] == 'subway') && zoom >= 10)) {
            s_default['z-index'] = 1100;
            s_default['color'] = '#0300C3';
            s_default['width'] = 2.5;
            s_default['linejoin'] = 'butt';
        }

        if (((type == 'way' && tags['railway'] == 'light_rail') && zoom >= 10)) {
            s_default['z-index'] = 1100;
            s_default['color'] = '#00BD14';
            s_default['width'] = 2.5;
            s_default['linejoin'] = 'butt';
        }

        if (((type == 'way' && tags['railway'] == 'narrow_gauge' && (!tags.hasOwnProperty('usage')) && (!tags.hasOwnProperty('service'))) && zoom >= 9)) {
            s_default['z-index'] = 1200;
            s_default['color'] = 'black';
            s_default['width'] = 1.5;
            s_default['linejoin'] = 'butt';
            s_default['casing-width'] = 1.5;
            s_default['casing-color'] = 'black';
            s_default['casing-dashes'] = [3, 3];
        }

        if (((type == 'way' && tags['railway'] == 'narrow_gauge' && (!tags.hasOwnProperty('usage')) && tags['service'] == 'siding') && zoom >= 9)) {
            s_default['z-index'] = 850;
            s_default['color'] = 'black';
            s_default['width'] = 1.5;
            s_default['linejoin'] = 'round';
            s_default['casing-width'] = 1;
            s_default['casing-color'] = 'black';
            s_default['casing-dashes'] = [3, 3];
            s_default['text'] = MapCSS.e_localize(tags, 'railway:track_ref');
            s_default['text-position'] = 'line';
            s_default['text-color'] = 'gray';
            s_default['text-halo-radius'] = 0.5;
            s_default['text-halo-color'] = '#CCCCCC';
        }

        if (((type == 'way' && tags['railway'] == 'narrow_gauge' && (!tags.hasOwnProperty('usage')) && tags['service'] == 'yard') && zoom >= 9)) {
            s_default['z-index'] = 840;
            s_default['color'] = 'black';
            s_default['width'] = 1.5;
            s_default['linejoin'] = 'round';
            s_default['casing-width'] = 1;
            s_default['casing-color'] = 'black';
            s_default['casing-dashes'] = [3, 3];
            s_default['text'] = MapCSS.e_localize(tags, 'railway:track_ref');
            s_default['text-position'] = 'line';
            s_default['text-color'] = 'gray';
            s_default['text-halo-radius'] = 0.5;
            s_default['text-halo-color'] = '#CCCCCC';
        }

        if (((type == 'way' && tags['railway'] == 'narrow_gauge' && (!tags.hasOwnProperty('usage')) && tags['service'] == 'spur') && zoom >= 9)) {
            s_default['z-index'] = 860;
            s_default['color'] = '#87491D';
            s_default['width'] = 1.5;
            s_default['casing-width'] = 1;
            s_default['casing-color'] = '#87491D';
            s_default['casing-dashes'] = [3, 3];
            s_default['linejoin'] = 'round';
            s_default['text-position'] = 'line';
        }

        if (((type == 'way' && tags['railway'] == 'narrow_gauge' && (!tags.hasOwnProperty('usage')) && tags['service'] == 'crossover') && zoom >= 9)) {
            s_default['z-index'] = 280;
            s_default['color'] = 'black';
            s_default['width'] = 1.5;
            s_default['casing-width'] = 1;
            s_default['casing-color'] = 'black';
            s_default['casing-dashes'] = [3, 3];
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['railway'] == 'narrow_gauge' && tags['usage'] == 'branch' && (!tags.hasOwnProperty('service'))) && zoom >= 9)) {
            s_default['z-index'] = 880;
            s_default['color'] = '#DACA00';
            s_default['width'] = 1.5;
            s_default['casing-width'] = 1.5;
            s_default['casing-color'] = '#DACA00';
            s_default['casing-dashes'] = [3, 3];
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['railway'] == 'narrow_gauge' && tags['usage'] == 'main' && (!tags.hasOwnProperty('service'))) && zoom >= 9)) {
            s_default['z-index'] = 1080;
            s_default['color'] = '#FF8100';
            s_default['width'] = 1.5;
            s_default['casing-width'] = 1.5;
            s_default['casing-color'] = '#FF8100';
            s_default['casing-dashes'] = [3, 3];
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['railway'] == 'narrow_gauge' && tags['usage'] == 'main' && tags['highspeed'] == 'yes' && (!tags.hasOwnProperty('service'))) && zoom >= 9)) {
            s_default['z-index'] = 2980;
            s_default['color'] = '#FF0C00';
            s_default['width'] = 1.5;
            s_default['casing-width'] = 1.5;
            s_default['casing-color'] = '#FF0C00';
            s_default['casing-dashes'] = [3, 3];
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['railway'] == 'narrow_gauge' && tags['usage'] == 'industrial' && (!tags.hasOwnProperty('service'))) && zoom >= 9)) {
            s_default['z-index'] = 830;
            s_default['color'] = '#87491D';
            s_default['width'] = 1.5;
            s_default['casing-width'] = 1.5;
            s_default['casing-color'] = '#87491D';
            s_default['casing-dashes'] = [3, 3];
            s_default['linejoin'] = 'round';
        }

        if (((type == 'way' && tags['railway'] == 'narrow_gauge' && tags['usage'] == 'industrial' && tags['service'] == 'siding') && zoom >= 9) || ((type == 'way' && tags['railway'] == 'narrow_gauge' && tags['usage'] == 'industrial' && tags['service'] == 'spur') && zoom >= 9) || ((type == 'way' && tags['railway'] == 'narrow_gauge' && tags['usage'] == 'industrial' && tags['service'] == 'yard') && zoom >= 9) || ((type == 'way' && tags['railway'] == 'narrow_gauge' && tags['usage'] == 'industrial' && tags['service'] == 'crossover') && zoom >= 9)) {
            s_default['z-index'] = 830;
            s_default['color'] = '#87491D';
            s_default['width'] = 1.5;
            s_default['casing-width'] = 1;
            s_default['casing-color'] = '#87491D';
            s_default['casing-dashes'] = [3, 3];
            s_default['linejoin'] = 'round';
        }

        if (((type == 'node' && tags['railway'] == 'switch' && tags['railway:local_operated'] == 'no') && zoom >= 16) || ((type == 'node' && tags['railway'] == 'switch' && (!tags.hasOwnProperty('railway:local_operated'))) && zoom >= 16)) {
            s_default['z-index'] = 5000;
            s_default['symbol-shape'] = 'circle';
            s_default['symbol-size'] = '8';
            s_default['symbol-stroke-color'] = 'black';
            s_default['symbol-fill-color'] = 'black';
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-position'] = 'auto';
            s_default['font-size'] = '11';
            s_default['text-color'] = 'black';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
        }

        if (((type == 'node' && tags['railway'] == 'switch' && tags['railway:local_operated'] == 'yes') && zoom >= 16)) {
            s_default['z-index'] = 5000;
            s_default['symbol-shape'] = 'circle';
            s_default['symbol-size'] = '8';
            s_default['symbol-stroke-color'] = 'black';
            s_default['symbol-fill-color'] = 'black';
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-position'] = 'auto';
            s_default['font-size'] = '11';
            s_default['text-color'] = 'black';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'yellow';
        }

        if (((type == 'node' && tags['railway'] == 'switch' && tags['railway:switch'] == 'resetting') && zoom >= 16)) {
            s_default['z-index'] = 5000;
            s_default['symbol-shape'] = 'circle';
            s_default['symbol-size'] = '8';
            s_default['symbol-stroke-color'] = 'black';
            s_default['symbol-fill-color'] = 'black';
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-position'] = 'auto';
            s_default['font-size'] = '11';
            s_default['text-color'] = 'black';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'orange';
        }

        if (((type == 'node' && tags['railway'] == 'signal_box') && zoom >= 11)) {
            s_default['z-index'] = 7000;
            s_default['text'] = MapCSS.e_localize(tags, 'name');
            s_default['font-size'] = '15';
            s_default['font-weight'] = 'bold';
            s_default['text-position'] = 'auto';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 0.5;
            s_default['text-halo-color'] = '#008206';
        }

        if (((selector == 'area' && tags['railway'] == 'signal_box') && zoom >= 11)) {
            s_default['z-index'] = 7000;
            s_default['text'] = MapCSS.e_localize(tags, 'name');
            s_default['font-size'] = '15';
            s_default['font-weight'] = 'bold';
            s_default['text-position'] = 'center';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 0.5;
            s_default['text-halo-color'] = '#008206';
            s_default['fill-color'] = '#008206';
            s_default['color'] = '#008206';
        }

        if (((type == 'node' && tags['railway'] == 'milestone') && zoom >= 11)) {
            s_default['z-index'] = 600;
            s_default['text'] = MapCSS.e_localize(tags, 'railway:position');
            s_default['text-position'] = 'auto';
            s_default['text-color'] = 'black';
            s_default['font-size'] = '11';
            s_default['font-family'] = 'Arial Black';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 0.5;
            s_default['text-halo-color'] = 'white';
        }

        if (((type == 'node' && tags['railway'] == 'station') && zoom >= 11)) {
            s_default['z-index'] = 30000;
            s_default['text'] = MapCSS.e_localize(tags, 'name');
            s_default['text-position'] = 'auto';
            s_default['font-family'] = 'Arial Black';
            s_default['font-size'] = '12';
            s_default['text-color'] = 'blue';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1.5;
            s_default['text-halo-color'] = 'white';
        }

        if (((type == 'node' && tags['railway'] == 'station') && zoom >= 1 && zoom <= 11)) {
            s_default['z-index'] = 30000;
            s_default['text'] = MapCSS.e_localize(tags, 'railway:ref');
            s_default['text-position'] = 'auto';
            s_default['font-family'] = 'Arial Black';
            s_default['font-size'] = '12';
            s_default['text-color'] = 'blue';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1.5;
            s_default['text-halo-color'] = 'white';
        }

        if (((type == 'node' && tags['railway'] == 'yard') && zoom >= 11)) {
            s_default['z-index'] = 25000;
            s_default['text'] = MapCSS.e_localize(tags, 'name');
            s_default['text-position'] = 'auto';
            s_default['font-size'] = '12';
            s_default['text-color'] = '#87491D';
            s_default['font-weight'] = 'bold';
            s_default['font-family'] = 'Arial';
            s_default['text-halo-radius'] = 1.5;
            s_default['text-halo-color'] = '#F1F1F1';
        }

        if (((type == 'node' && tags['railway'] == 'yard') && zoom >= 1 && zoom <= 11)) {
            s_default['z-index'] = 25000;
            s_default['text'] = MapCSS.e_localize(tags, 'railway:ref');
            s_default['text-position'] = 'auto';
            s_default['font-size'] = '12';
            s_default['text-color'] = '#87491D';
            s_default['font-weight'] = 'bold';
            s_default['font-family'] = 'Arial';
            s_default['text-halo-radius'] = 1.5;
            s_default['text-halo-color'] = '#F1F1F1';
        }

        if (((type == 'node' && tags['railway'] == 'halt') && zoom >= 11)) {
            s_default['z-index'] = 20000;
            s_default['text'] = MapCSS.e_localize(tags, 'name');
            s_default['text-position'] = 'auto';
            s_default['font-size'] = '12';
            s_default['text-color'] = 'blue';
            s_default['font-weight'] = 'bold';
            s_default['font-family'] = 'Arial';
            s_default['text-halo-radius'] = 1.5;
            s_default['text-halo-color'] = 'white';
        }

        if (((type == 'node' && tags['railway'] == 'halt') && zoom >= 1 && zoom <= 11)) {
            s_default['z-index'] = 20000;
            s_default['text'] = MapCSS.e_localize(tags, 'railway:ref');
            s_default['text-position'] = 'auto';
            s_default['font-size'] = '12';
            s_default['text-color'] = 'blue';
            s_default['font-weight'] = 'bold';
            s_default['font-family'] = 'Arial';
            s_default['text-halo-radius'] = 1.5;
            s_default['text-halo-color'] = 'white';
        }

        if (((type == 'node' && tags['railway'] == 'junction') && zoom >= 11) || ((type == 'node' && tags['railway'] == 'service_station') && zoom >= 11) || ((type == 'node' && tags['railway'] == 'crossover') && zoom >= 11)) {
            s_default['z-index'] = 15000;
            s_default['text'] = MapCSS.e_localize(tags, 'name');
            s_default['text-position'] = 'auto';
            s_default['font-size'] = '12';
            s_default['text-color'] = '#616161';
            s_default['font-weight'] = 'bold';
            s_default['font-family'] = 'Arial';
            s_default['text-halo-radius'] = 1.5;
            s_default['text-halo-color'] = '#F1F1F1';
        }

        if (((type == 'node' && tags['railway'] == 'junction') && zoom >= 1 && zoom <= 11) || ((type == 'node' && tags['railway'] == 'service_station') && zoom >= 1 && zoom <= 11) || ((type == 'node' && tags['railway'] == 'crossover') && zoom >= 1 && zoom <= 11)) {
            s_default['z-index'] = 15000;
            s_default['text'] = MapCSS.e_localize(tags, 'railway:ref');
            s_default['text-position'] = 'auto';
            s_default['font-size'] = '12';
            s_default['text-color'] = '#616161';
            s_default['font-weight'] = 'bold';
            s_default['font-family'] = 'Arial';
            s_default['text-halo-radius'] = 1.5;
            s_default['text-halo-color'] = '#F1F1F1';
        }

        if (((type == 'node' && tags['railway'] == 'site') && zoom >= 11)) {
            s_default['z-index'] = 10000;
            s_default['text'] = MapCSS.e_localize(tags, 'name');
            s_default['text-position'] = 'auto';
            s_default['font-size'] = '12';
            s_default['text-color'] = '#616161';
            s_default['font-weight'] = 'bold';
            s_default['font-family'] = 'Arial';
            s_default['text-halo-radius'] = 1.5;
            s_default['text-halo-color'] = '#F1F1F1';
        }

        if (((type == 'node' && tags['railway'] == 'site') && zoom >= 1 && zoom <= 11)) {
            s_default['z-index'] = 10000;
            s_default['text'] = MapCSS.e_localize(tags, 'railway:ref');
            s_default['text-position'] = 'auto';
            s_default['font-size'] = '12';
            s_default['text-color'] = '#616161';
            s_default['font-weight'] = 'bold';
            s_default['font-family'] = 'Arial';
            s_default['text-halo-radius'] = 1.5;
            s_default['text-halo-color'] = '#F1F1F1';
        }

        if (((type == 'node' && tags['railway'] == 'tram_stop') && zoom === 13)) {
            s_default['z-index'] = 6000;
            s_default['icon-image'] = 'icons/tramstop.png';
            s_default['icon-width'] = '10';
            s_default['icon-height'] = '10';
        }

        if (((type == 'node' && tags['railway'] == 'tram_stop') && zoom >= 14)) {
            s_default['z-index'] = 6000;
            s_default['text'] = MapCSS.e_localize(tags, 'name');
            s_default['text-position'] = 'auto';
            s_default['font-size'] = '10';
            s_default['text-color'] = '#D877B8';
            s_default['font-weight'] = 'bold';
            s_default['font-family'] = 'Arial';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
        }

        if (((type == 'node' && tags['railway'] == 'owner_change') && zoom >= 11)) {
            s_default['z-index'] = 10000;
            s_default['icon-image'] = 'icons/owner-change.png';
            s_default['icon-width'] = '16';
            s_default['icon-height'] = '16';
        }

        if (Object.keys(s_default).length) {
            style['default'] = s_default; }
        if (Object.keys(s_bridges).length) {
            style['bridges'] = s_bridges; }
        if (Object.keys(s_tunnels).length) {
            style['tunnels'] = s_tunnels; }
        return style;
    }
    
    var sprite_images = {
        'icons/owner-change.png': {
            width: 16, 
            height: 16, 
            offset: 0
        },
        'icons/tramstop.png': {
            width: 10, 
            height: 10, 
            offset: 16
        }
    }, external_images = [], presence_tags = [], value_tags = [MapCSS.e_concat("ref", " ", "tunnel:name"), MapCSS.e_concat("ref", " ", "bridge:name"), 'railway:position', 'railway', 'railway:local_operated', 'railway:track_ref', 'ref', 'usage', MapCSS.e_concat("ref", " ", "name"), 'highspeed', 'name', 'tunnel', 'railway:switch', 'service', 'railway:ref', 'bridge'];

    MapCSS.loadStyle('standard', restyle, sprite_images, external_images, presence_tags, value_tags);
    MapCSS.preloadExternalImages('standard');
})(MapCSS);
    
