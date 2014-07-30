
(function (MapCSS) {
    'use strict';

    function restyle(style, tags, zoom, type, selector) {
        var s_default = {};

        if ((selector == 'meta')) {
            s_default['title'] = 'OpenRailwayMap maxspeed layer';
            s_default['version'] = '0';
            s_default['description'] = 'Style for a maxspeed layer of the railroad network.';
            s_default['author'] = 'rurseekatze';
            s_default['link'] = 'http://wiki.openstreetmap.org/wiki/OpenRailwayMap';
            s_default['watch-modified'] = 'true';
        }

        if ((selector == 'canvas')) {
            s_default['background-color'] = '#8a8a8a';
            s_default['default-points'] = 'true';
            s_default['default-lines'] = 'true';
        }

        if (((type == 'way' && tags['maxspeed'] <= 10))) {
            s_default['z-index'] = 1;
            s_default['color'] = '#0100CB';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
            s_default['text'] = MapCSS.e_localize(tags, 'maxspeed');
            s_default['text-position'] = 'line';
            s_default['text-color'] = 'black';
            s_default['font-size'] = '11';
            s_default['font-family'] = 'Verdana Bold';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['kothicjs-ignore-layer'] = 'true';
        }

        if (((type == 'way' && tags['maxspeed'] > 10 && tags['maxspeed'] <= 20))) {
            s_default['z-index'] = 2;
            s_default['color'] = '#001ECB';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
            s_default['text'] = MapCSS.e_localize(tags, 'maxspeed');
            s_default['text-position'] = 'line';
            s_default['text-color'] = 'black';
            s_default['font-size'] = '11';
            s_default['font-family'] = 'Verdana Bold';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['kothicjs-ignore-layer'] = 'true';
        }

        if (((type == 'way' && tags['maxspeed'] > 20 && tags['maxspeed'] <= 30))) {
            s_default['z-index'] = 3;
            s_default['color'] = '#003DCB';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
            s_default['text'] = MapCSS.e_localize(tags, 'maxspeed');
            s_default['text-position'] = 'line';
            s_default['text-color'] = 'black';
            s_default['font-size'] = '11';
            s_default['font-family'] = 'Verdana Bold';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['kothicjs-ignore-layer'] = 'true';
        }

        if (((type == 'way' && tags['maxspeed'] > 30 && tags['maxspeed'] <= 40))) {
            s_default['z-index'] = 4;
            s_default['color'] = '#005BCB';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
            s_default['text'] = MapCSS.e_localize(tags, 'maxspeed');
            s_default['text-position'] = 'line';
            s_default['text-color'] = 'black';
            s_default['font-size'] = '11';
            s_default['font-family'] = 'Verdana Bold';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['kothicjs-ignore-layer'] = 'true';
        }

        if (((type == 'way' && tags['maxspeed'] > 40 && tags['maxspeed'] <= 50))) {
            s_default['z-index'] = 5;
            s_default['color'] = '#007ACB';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
            s_default['text'] = MapCSS.e_localize(tags, 'maxspeed');
            s_default['text-position'] = 'line';
            s_default['text-color'] = 'black';
            s_default['font-size'] = '11';
            s_default['font-family'] = 'Verdana Bold';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['kothicjs-ignore-layer'] = 'true';
        }

        if (((type == 'way' && tags['maxspeed'] > 50 && tags['maxspeed'] <= 60))) {
            s_default['z-index'] = 6;
            s_default['color'] = '#0098CB';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
            s_default['text'] = MapCSS.e_localize(tags, 'maxspeed');
            s_default['text-position'] = 'line';
            s_default['text-color'] = 'black';
            s_default['font-size'] = '11';
            s_default['font-family'] = 'Verdana Bold';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['kothicjs-ignore-layer'] = 'true';
        }

        if (((type == 'way' && tags['maxspeed'] > 60 && tags['maxspeed'] <= 70))) {
            s_default['z-index'] = 7;
            s_default['color'] = '#00B7CB';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
            s_default['text'] = MapCSS.e_localize(tags, 'maxspeed');
            s_default['text-position'] = 'line';
            s_default['text-color'] = 'black';
            s_default['font-size'] = '11';
            s_default['font-family'] = 'Verdana Bold';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['kothicjs-ignore-layer'] = 'true';
        }

        if (((type == 'way' && tags['maxspeed'] > 70 && tags['maxspeed'] <= 80))) {
            s_default['z-index'] = 8;
            s_default['color'] = '#00CBC1';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
            s_default['text'] = MapCSS.e_localize(tags, 'maxspeed');
            s_default['text-position'] = 'line';
            s_default['text-color'] = 'black';
            s_default['font-size'] = '11';
            s_default['font-family'] = 'Verdana Bold';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['kothicjs-ignore-layer'] = 'true';
        }

        if (((type == 'way' && tags['maxspeed'] > 80 && tags['maxspeed'] <= 90))) {
            s_default['z-index'] = 9;
            s_default['color'] = '#00CBA2';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
            s_default['text'] = MapCSS.e_localize(tags, 'maxspeed');
            s_default['text-position'] = 'line';
            s_default['text-color'] = 'black';
            s_default['font-size'] = '11';
            s_default['font-family'] = 'Verdana Bold';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['kothicjs-ignore-layer'] = 'true';
        }

        if (((type == 'way' && tags['maxspeed'] > 90 && tags['maxspeed'] <= 100))) {
            s_default['z-index'] = 10;
            s_default['color'] = '#00CB84';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
            s_default['text'] = MapCSS.e_localize(tags, 'maxspeed');
            s_default['text-position'] = 'line';
            s_default['text-color'] = 'black';
            s_default['font-size'] = '11';
            s_default['font-family'] = 'Verdana Bold';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['kothicjs-ignore-layer'] = 'true';
        }

        if (((type == 'way' && tags['maxspeed'] > 100 && tags['maxspeed'] <= 110))) {
            s_default['z-index'] = 11;
            s_default['color'] = '#00CB66';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
            s_default['text'] = MapCSS.e_localize(tags, 'maxspeed');
            s_default['text-position'] = 'line';
            s_default['text-color'] = 'black';
            s_default['font-size'] = '11';
            s_default['font-family'] = 'Verdana Bold';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['kothicjs-ignore-layer'] = 'true';
        }

        if (((type == 'way' && tags['maxspeed'] > 110 && tags['maxspeed'] <= 120))) {
            s_default['z-index'] = 12;
            s_default['color'] = '#00CB47';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
            s_default['text'] = MapCSS.e_localize(tags, 'maxspeed');
            s_default['text-position'] = 'line';
            s_default['text-color'] = 'black';
            s_default['font-size'] = '11';
            s_default['font-family'] = 'Verdana Bold';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['kothicjs-ignore-layer'] = 'true';
        }

        if (((type == 'way' && tags['maxspeed'] > 120 && tags['maxspeed'] <= 130))) {
            s_default['z-index'] = 13;
            s_default['color'] = '#00CB29';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
            s_default['text'] = MapCSS.e_localize(tags, 'maxspeed');
            s_default['text-position'] = 'line';
            s_default['text-color'] = 'black';
            s_default['font-size'] = '11';
            s_default['font-family'] = 'Verdana Bold';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['kothicjs-ignore-layer'] = 'true';
        }

        if (((type == 'way' && tags['maxspeed'] > 130 && tags['maxspeed'] <= 140))) {
            s_default['z-index'] = 14;
            s_default['color'] = '#00CB0A';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
            s_default['text'] = MapCSS.e_localize(tags, 'maxspeed');
            s_default['text-position'] = 'line';
            s_default['text-color'] = 'black';
            s_default['font-size'] = '11';
            s_default['font-family'] = 'Verdana Bold';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['kothicjs-ignore-layer'] = 'true';
        }

        if (((type == 'way' && tags['maxspeed'] > 140 && tags['maxspeed'] <= 150))) {
            s_default['z-index'] = 15;
            s_default['color'] = '#14CB00';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
            s_default['text'] = MapCSS.e_localize(tags, 'maxspeed');
            s_default['text-position'] = 'line';
            s_default['text-color'] = 'black';
            s_default['font-size'] = '11';
            s_default['font-family'] = 'Verdana Bold';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['kothicjs-ignore-layer'] = 'true';
        }

        if (((type == 'way' && tags['maxspeed'] > 150 && tags['maxspeed'] <= 160))) {
            s_default['z-index'] = 16;
            s_default['color'] = '#33CB00';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
            s_default['text'] = MapCSS.e_localize(tags, 'maxspeed');
            s_default['text-position'] = 'line';
            s_default['text-color'] = 'black';
            s_default['font-size'] = '11';
            s_default['font-family'] = 'Verdana Bold';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['kothicjs-ignore-layer'] = 'true';
        }

        if (((type == 'way' && tags['maxspeed'] > 160 && tags['maxspeed'] <= 170))) {
            s_default['z-index'] = 17;
            s_default['color'] = '#51CB00';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
            s_default['text'] = MapCSS.e_localize(tags, 'maxspeed');
            s_default['text-position'] = 'line';
            s_default['text-color'] = 'black';
            s_default['font-size'] = '11';
            s_default['font-family'] = 'Verdana Bold';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['kothicjs-ignore-layer'] = 'true';
        }

        if (((type == 'way' && tags['maxspeed'] > 170 && tags['maxspeed'] <= 180))) {
            s_default['z-index'] = 18;
            s_default['color'] = '#70CB00';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
            s_default['text'] = MapCSS.e_localize(tags, 'maxspeed');
            s_default['text-position'] = 'line';
            s_default['text-color'] = 'black';
            s_default['font-size'] = '11';
            s_default['font-family'] = 'Verdana Bold';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['kothicjs-ignore-layer'] = 'true';
        }

        if (((type == 'way' && tags['maxspeed'] > 180 && tags['maxspeed'] <= 190))) {
            s_default['z-index'] = 19;
            s_default['color'] = '#8ECB00';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
            s_default['text'] = MapCSS.e_localize(tags, 'maxspeed');
            s_default['text-position'] = 'line';
            s_default['text-color'] = 'black';
            s_default['font-size'] = '11';
            s_default['font-family'] = 'Verdana Bold';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['kothicjs-ignore-layer'] = 'true';
        }

        if (((type == 'way' && tags['maxspeed'] > 190 && tags['maxspeed'] <= 200))) {
            s_default['z-index'] = 20;
            s_default['color'] = '#ADCB00';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
            s_default['text'] = MapCSS.e_localize(tags, 'maxspeed');
            s_default['text-position'] = 'line';
            s_default['text-color'] = 'black';
            s_default['font-size'] = '11';
            s_default['font-family'] = 'Verdana Bold';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['kothicjs-ignore-layer'] = 'true';
        }

        if (((type == 'way' && tags['maxspeed'] > 200 && tags['maxspeed'] <= 210))) {
            s_default['z-index'] = 21;
            s_default['color'] = '#CBCB00';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
            s_default['text'] = MapCSS.e_localize(tags, 'maxspeed');
            s_default['text-position'] = 'line';
            s_default['text-color'] = 'black';
            s_default['font-size'] = '11';
            s_default['font-family'] = 'Verdana Bold';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['kothicjs-ignore-layer'] = 'true';
        }

        if (((type == 'way' && tags['maxspeed'] > 210 && tags['maxspeed'] <= 220))) {
            s_default['z-index'] = 22;
            s_default['color'] = '#CBAD00';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
            s_default['text'] = MapCSS.e_localize(tags, 'maxspeed');
            s_default['text-position'] = 'line';
            s_default['text-color'] = 'black';
            s_default['font-size'] = '11';
            s_default['font-family'] = 'Verdana Bold';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['kothicjs-ignore-layer'] = 'true';
        }

        if (((type == 'way' && tags['maxspeed'] > 220 && tags['maxspeed'] <= 230))) {
            s_default['z-index'] = 23;
            s_default['color'] = '#CB8E00';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
            s_default['text'] = MapCSS.e_localize(tags, 'maxspeed');
            s_default['text-position'] = 'line';
            s_default['text-color'] = 'black';
            s_default['font-size'] = '11';
            s_default['font-family'] = 'Verdana Bold';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['kothicjs-ignore-layer'] = 'true';
        }

        if (((type == 'way' && tags['maxspeed'] > 230 && tags['maxspeed'] <= 240))) {
            s_default['z-index'] = 24;
            s_default['color'] = '#CB7000';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
            s_default['text'] = MapCSS.e_localize(tags, 'maxspeed');
            s_default['text-position'] = 'line';
            s_default['text-color'] = 'black';
            s_default['font-size'] = '11';
            s_default['font-family'] = 'Verdana Bold';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['kothicjs-ignore-layer'] = 'true';
        }

        if (((type == 'way' && tags['maxspeed'] > 240 && tags['maxspeed'] <= 250))) {
            s_default['z-index'] = 25;
            s_default['color'] = '#CB5100';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
            s_default['text'] = MapCSS.e_localize(tags, 'maxspeed');
            s_default['text-position'] = 'line';
            s_default['text-color'] = 'black';
            s_default['font-size'] = '11';
            s_default['font-family'] = 'Verdana Bold';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['kothicjs-ignore-layer'] = 'true';
        }

        if (((type == 'way' && tags['maxspeed'] > 250 && tags['maxspeed'] <= 260))) {
            s_default['z-index'] = 26;
            s_default['color'] = '#CB3300';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
            s_default['text'] = MapCSS.e_localize(tags, 'maxspeed');
            s_default['text-position'] = 'line';
            s_default['text-color'] = 'black';
            s_default['font-size'] = '11';
            s_default['font-family'] = 'Verdana Bold';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['kothicjs-ignore-layer'] = 'true';
        }

        if (((type == 'way' && tags['maxspeed'] > 260 && tags['maxspeed'] <= 270))) {
            s_default['z-index'] = 27;
            s_default['color'] = '#CB1400';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
            s_default['text'] = MapCSS.e_localize(tags, 'maxspeed');
            s_default['text-position'] = 'line';
            s_default['text-color'] = 'black';
            s_default['font-size'] = '11';
            s_default['font-family'] = 'Verdana Bold';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['kothicjs-ignore-layer'] = 'true';
        }

        if (((type == 'way' && tags['maxspeed'] > 270 && tags['maxspeed'] <= 280))) {
            s_default['z-index'] = 28;
            s_default['color'] = '#CB0007';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
            s_default['text'] = MapCSS.e_localize(tags, 'maxspeed');
            s_default['text-position'] = 'line';
            s_default['text-color'] = 'black';
            s_default['font-size'] = '11';
            s_default['font-family'] = 'Verdana Bold';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['kothicjs-ignore-layer'] = 'true';
        }

        if (((type == 'way' && tags['maxspeed'] > 280 && tags['maxspeed'] <= 290))) {
            s_default['z-index'] = 29;
            s_default['color'] = '#CB0025';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
            s_default['text'] = MapCSS.e_localize(tags, 'maxspeed');
            s_default['text-position'] = 'line';
            s_default['text-color'] = 'black';
            s_default['font-size'] = '11';
            s_default['font-family'] = 'Verdana Bold';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['kothicjs-ignore-layer'] = 'true';
        }

        if (((type == 'way' && tags['maxspeed'] > 290 && tags['maxspeed'] <= 300))) {
            s_default['z-index'] = 30;
            s_default['color'] = '#CB0044';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
            s_default['text'] = MapCSS.e_localize(tags, 'maxspeed');
            s_default['text-position'] = 'line';
            s_default['text-color'] = 'black';
            s_default['font-size'] = '11';
            s_default['font-family'] = 'Verdana Bold';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['kothicjs-ignore-layer'] = 'true';
        }

        if (((type == 'way' && tags['maxspeed'] > 300 && tags['maxspeed'] <= 320))) {
            s_default['z-index'] = 31;
            s_default['color'] = '#CB0062';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
            s_default['text'] = MapCSS.e_localize(tags, 'maxspeed');
            s_default['text-position'] = 'line';
            s_default['text-color'] = 'black';
            s_default['font-size'] = '11';
            s_default['font-family'] = 'Verdana Bold';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['kothicjs-ignore-layer'] = 'true';
        }

        if (((type == 'way' && tags['maxspeed'] > 320 && tags['maxspeed'] <= 340))) {
            s_default['z-index'] = 32;
            s_default['color'] = '#CB0081';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
            s_default['text'] = MapCSS.e_localize(tags, 'maxspeed');
            s_default['text-position'] = 'line';
            s_default['text-color'] = 'black';
            s_default['font-size'] = '11';
            s_default['font-family'] = 'Verdana Bold';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['kothicjs-ignore-layer'] = 'true';
        }

        if (((type == 'way' && tags['maxspeed'] > 340 && tags['maxspeed'] <= 360))) {
            s_default['z-index'] = 33;
            s_default['color'] = '#CB009F';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
            s_default['text'] = MapCSS.e_localize(tags, 'maxspeed');
            s_default['text-position'] = 'line';
            s_default['text-color'] = 'black';
            s_default['font-size'] = '11';
            s_default['font-family'] = 'Verdana Bold';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['kothicjs-ignore-layer'] = 'true';
        }

        if (((type == 'way' && tags['maxspeed'] > 360 && tags['maxspeed'] <= 380))) {
            s_default['z-index'] = 34;
            s_default['color'] = '#CB00BD';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
            s_default['text'] = MapCSS.e_localize(tags, 'maxspeed');
            s_default['text-position'] = 'line';
            s_default['text-color'] = 'black';
            s_default['font-size'] = '11';
            s_default['font-family'] = 'Verdana Bold';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['kothicjs-ignore-layer'] = 'true';
        }

        if (((type == 'way' && tags['maxspeed'] > 380 && tags['maxspeed'] <= 400))) {
            s_default['z-index'] = 35;
            s_default['color'] = '#BA00CB';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
            s_default['text'] = MapCSS.e_localize(tags, 'maxspeed');
            s_default['text-position'] = 'line';
            s_default['text-color'] = 'black';
            s_default['font-size'] = '11';
            s_default['font-family'] = 'Verdana Bold';
            s_default['font-weight'] = 'bold';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['kothicjs-ignore-layer'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit'] == 'db:zs10' && tags['railway:signal:speed_limit:form'] == 'sign' && tags['railway:signal:speed_limit:speed'] == 'none') && zoom >= 16)) {
            s_default['z-index'] = 90;
            s_default['icon-image'] = 'icons/de-zs10-sign-44.png';
            s_default['icon-width'] = '7';
            s_default['icon-height'] = '22';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit'] == 'db:zs10' && tags['railway:signal:speed_limit:form'] == 'light' && tags['railway:signal:speed_limit:speed'] == 'none') && zoom >= 16)) {
            s_default['z-index'] = 95;
            s_default['icon-image'] = 'icons/de-zs10-light-44.png';
            s_default['icon-width'] = '10';
            s_default['icon-height'] = '22';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit'] == 'zs3' && tags['railway:signal:speed_limit:form'] == 'sign' && tags['railway:signal:speed_limit:speed'] == '10') && zoom >= 16)) {
            s_default['z-index'] = 100;
            s_default['icon-image'] = 'icons/de-zs3-10-sign-up-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit'] == 'zs3' && tags['railway:signal:speed_limit:form'] == 'sign' && tags['railway:signal:speed_limit:speed'] == '20') && zoom >= 16)) {
            s_default['z-index'] = 105;
            s_default['icon-image'] = 'icons/de-zs3-20-sign-up-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit'] == 'zs3' && tags['railway:signal:speed_limit:form'] == 'sign' && tags['railway:signal:speed_limit:speed'] == '30') && zoom >= 16)) {
            s_default['z-index'] = 110;
            s_default['icon-image'] = 'icons/de-zs3-30-sign-up-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit'] == 'zs3' && tags['railway:signal:speed_limit:form'] == 'sign' && tags['railway:signal:speed_limit:speed'] == '40') && zoom >= 16)) {
            s_default['z-index'] = 115;
            s_default['icon-image'] = 'icons/de-zs3-40-sign-up-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit'] == 'zs3' && tags['railway:signal:speed_limit:form'] == 'sign' && tags['railway:signal:speed_limit:speed'] == '50') && zoom >= 16)) {
            s_default['z-index'] = 120;
            s_default['icon-image'] = 'icons/de-zs3-50-sign-up-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit'] == 'zs3' && tags['railway:signal:speed_limit:form'] == 'sign' && tags['railway:signal:speed_limit:speed'] == '60') && zoom >= 16)) {
            s_default['z-index'] = 125;
            s_default['icon-image'] = 'icons/de-zs3-60-sign-up-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit'] == 'zs3' && tags['railway:signal:speed_limit:form'] == 'sign' && tags['railway:signal:speed_limit:speed'] == '70') && zoom >= 16)) {
            s_default['z-index'] = 130;
            s_default['icon-image'] = 'icons/de-zs3-70-sign-up-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit'] == 'zs3' && tags['railway:signal:speed_limit:form'] == 'sign' && tags['railway:signal:speed_limit:speed'] == '80') && zoom >= 16)) {
            s_default['z-index'] = 135;
            s_default['icon-image'] = 'icons/de-zs3-80-sign-up-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit'] == 'zs3' && tags['railway:signal:speed_limit:form'] == 'sign' && tags['railway:signal:speed_limit:speed'] == '90') && zoom >= 16)) {
            s_default['z-index'] = 140;
            s_default['icon-image'] = 'icons/de-zs3-90-sign-up-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit'] == 'zs3' && tags['railway:signal:speed_limit:form'] == 'sign' && tags['railway:signal:speed_limit:speed'] == '100') && zoom >= 16)) {
            s_default['z-index'] = 145;
            s_default['icon-image'] = 'icons/de-zs3-100-sign-up-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit'] == 'zs3' && tags['railway:signal:speed_limit:form'] == 'sign' && tags['railway:signal:speed_limit:speed'] == '110') && zoom >= 16)) {
            s_default['z-index'] = 150;
            s_default['icon-image'] = 'icons/de-zs3-110-sign-up-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit'] == 'zs3' && tags['railway:signal:speed_limit:form'] == 'sign' && tags['railway:signal:speed_limit:speed'] == '120') && zoom >= 16)) {
            s_default['z-index'] = 155;
            s_default['icon-image'] = 'icons/de-zs3-120-sign-up-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit'] == 'zs3' && tags['railway:signal:speed_limit:form'] == 'sign' && tags['railway:signal:speed_limit:speed'] == '130') && zoom >= 16)) {
            s_default['z-index'] = 160;
            s_default['icon-image'] = 'icons/de-zs3-130-sign-up-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit'] == 'zs3' && tags['railway:signal:speed_limit:form'] == 'sign' && tags['railway:signal:speed_limit:speed'] == '140') && zoom >= 16)) {
            s_default['z-index'] = 165;
            s_default['icon-image'] = 'icons/de-zs3-140-sign-up-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit'] == 'zs3' && tags['railway:signal:speed_limit:form'] == 'sign' && tags['railway:signal:speed_limit:speed'] == '150') && zoom >= 16)) {
            s_default['z-index'] = 170;
            s_default['icon-image'] = 'icons/de-zs3-150-sign-up-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit'] == 'zs3' && tags['railway:signal:speed_limit:form'] == 'sign' && tags['railway:signal:speed_limit:speed'] == '160') && zoom >= 16)) {
            s_default['z-index'] = 175;
            s_default['icon-image'] = 'icons/de-zs3-160-sign-up-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit_distant'] == 'zs3v' && tags['railway:signal:speed_limit_distant:form'] == 'sign' && tags['railway:signal:speed_limit_distant:speed'] == '10') && zoom >= 16)) {
            s_default['z-index'] = 200;
            s_default['icon-image'] = 'icons/de-zs3v-10-sign-down-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit_distant'] == 'zs3v' && tags['railway:signal:speed_limit_distant:form'] == 'sign' && tags['railway:signal:speed_limit_distant:speed'] == '20') && zoom >= 16)) {
            s_default['z-index'] = 205;
            s_default['icon-image'] = 'icons/de-zs3v-20-sign-down-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit_distant'] == 'zs3v' && tags['railway:signal:speed_limit_distant:form'] == 'sign' && tags['railway:signal:speed_limit_distant:speed'] == '30') && zoom >= 16)) {
            s_default['z-index'] = 210;
            s_default['icon-image'] = 'icons/de-zs3v-30-sign-down-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit_distant'] == 'zs3v' && tags['railway:signal:speed_limit_distant:form'] == 'sign' && tags['railway:signal:speed_limit_distant:speed'] == '40') && zoom >= 16)) {
            s_default['z-index'] = 215;
            s_default['icon-image'] = 'icons/de-zs3v-40-sign-down-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit_distant'] == 'zs3v' && tags['railway:signal:speed_limit_distant:form'] == 'sign' && tags['railway:signal:speed_limit_distant:speed'] == '50') && zoom >= 16)) {
            s_default['z-index'] = 220;
            s_default['icon-image'] = 'icons/de-zs3v-50-sign-down-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit_distant'] == 'zs3v' && tags['railway:signal:speed_limit_distant:form'] == 'sign' && tags['railway:signal:speed_limit_distant:speed'] == '60') && zoom >= 16)) {
            s_default['z-index'] = 225;
            s_default['icon-image'] = 'icons/de-zs3v-60-sign-down-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit_distant'] == 'zs3v' && tags['railway:signal:speed_limit_distant:form'] == 'sign' && tags['railway:signal:speed_limit_distant:speed'] == '70') && zoom >= 16)) {
            s_default['z-index'] = 230;
            s_default['icon-image'] = 'icons/de-zs3v-70-sign-down-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit_distant'] == 'zs3v' && tags['railway:signal:speed_limit_distant:form'] == 'sign' && tags['railway:signal:speed_limit_distant:speed'] == '80') && zoom >= 16)) {
            s_default['z-index'] = 235;
            s_default['icon-image'] = 'icons/de-zs3v-80-sign-down-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit_distant'] == 'zs3v' && tags['railway:signal:speed_limit_distant:form'] == 'sign' && tags['railway:signal:speed_limit_distant:speed'] == '90') && zoom >= 16)) {
            s_default['z-index'] = 240;
            s_default['icon-image'] = 'icons/de-zs3v-90-sign-down-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit_distant'] == 'zs3v' && tags['railway:signal:speed_limit_distant:form'] == 'sign' && tags['railway:signal:speed_limit_distant:speed'] == '100') && zoom >= 16)) {
            s_default['z-index'] = 245;
            s_default['icon-image'] = 'icons/de-zs3v-100-sign-down-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit_distant'] == 'zs3v' && tags['railway:signal:speed_limit_distant:form'] == 'sign' && tags['railway:signal:speed_limit_distant:speed'] == '110') && zoom >= 16)) {
            s_default['z-index'] = 250;
            s_default['icon-image'] = 'icons/de-zs3v-110-sign-down-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit_distant'] == 'zs3v' && tags['railway:signal:speed_limit_distant:form'] == 'sign' && tags['railway:signal:speed_limit_distant:speed'] == '120') && zoom >= 16)) {
            s_default['z-index'] = 255;
            s_default['icon-image'] = 'icons/de-zs3v-120-sign-down-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit_distant'] == 'zs3v' && tags['railway:signal:speed_limit_distant:form'] == 'sign' && tags['railway:signal:speed_limit_distant:speed'] == '130') && zoom >= 16)) {
            s_default['z-index'] = 260;
            s_default['icon-image'] = 'icons/de-zs3v-130-sign-down-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit_distant'] == 'zs3v' && tags['railway:signal:speed_limit_distant:form'] == 'sign' && tags['railway:signal:speed_limit_distant:speed'] == '140') && zoom >= 16)) {
            s_default['z-index'] = 265;
            s_default['icon-image'] = 'icons/de-zs3v-140-sign-down-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit_distant'] == 'zs3v' && tags['railway:signal:speed_limit_distant:form'] == 'sign' && tags['railway:signal:speed_limit_distant:speed'] == '150') && zoom >= 16)) {
            s_default['z-index'] = 270;
            s_default['icon-image'] = 'icons/de-zs3v-150-sign-down-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit_distant'] == 'zs3v' && tags['railway:signal:speed_limit_distant:form'] == 'sign' && tags['railway:signal:speed_limit_distant:speed'] == '160') && zoom >= 16)) {
            s_default['z-index'] = 275;
            s_default['icon-image'] = 'icons/de-zs3v-160-sign-down-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit'] == 'lf7' && tags['railway:signal:speed_limit:form'] == 'sign' && tags['railway:signal:speed_limit:speed'] == '10') && zoom >= 14)) {
            s_default['z-index'] = 300;
            s_default['icon-image'] = 'icons/de-lf7-10-sign-32.png';
            s_default['icon-width'] = '13';
            s_default['icon-height'] = '16';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit'] == 'lf7' && tags['railway:signal:speed_limit:form'] == 'sign' && tags['railway:signal:speed_limit:speed'] == '20') && zoom >= 14)) {
            s_default['z-index'] = 305;
            s_default['icon-image'] = 'icons/de-lf7-20-sign-32.png';
            s_default['icon-width'] = '13';
            s_default['icon-height'] = '16';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit'] == 'lf7' && tags['railway:signal:speed_limit:form'] == 'sign' && tags['railway:signal:speed_limit:speed'] == '30') && zoom >= 14)) {
            s_default['z-index'] = 310;
            s_default['icon-image'] = 'icons/de-lf7-30-sign-32.png';
            s_default['icon-width'] = '13';
            s_default['icon-height'] = '16';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit'] == 'lf7' && tags['railway:signal:speed_limit:form'] == 'sign' && tags['railway:signal:speed_limit:speed'] == '40') && zoom >= 14)) {
            s_default['z-index'] = 315;
            s_default['icon-image'] = 'icons/de-lf7-40-sign-32.png';
            s_default['icon-width'] = '13';
            s_default['icon-height'] = '16';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit'] == 'lf7' && tags['railway:signal:speed_limit:form'] == 'sign' && tags['railway:signal:speed_limit:speed'] == '50') && zoom >= 14)) {
            s_default['z-index'] = 320;
            s_default['icon-image'] = 'icons/de-lf7-50-sign-32.png';
            s_default['icon-width'] = '13';
            s_default['icon-height'] = '16';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit'] == 'lf7' && tags['railway:signal:speed_limit:form'] == 'sign' && tags['railway:signal:speed_limit:speed'] == '60') && zoom >= 14)) {
            s_default['z-index'] = 325;
            s_default['icon-image'] = 'icons/de-lf7-60-sign-32.png';
            s_default['icon-width'] = '13';
            s_default['icon-height'] = '16';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit'] == 'lf7' && tags['railway:signal:speed_limit:form'] == 'sign' && tags['railway:signal:speed_limit:speed'] == '70') && zoom >= 14)) {
            s_default['z-index'] = 330;
            s_default['icon-image'] = 'icons/de-lf7-70-sign-32.png';
            s_default['icon-width'] = '13';
            s_default['icon-height'] = '16';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit'] == 'lf7' && tags['railway:signal:speed_limit:form'] == 'sign' && tags['railway:signal:speed_limit:speed'] == '80') && zoom >= 14)) {
            s_default['z-index'] = 335;
            s_default['icon-image'] = 'icons/de-lf7-80-sign-32.png';
            s_default['icon-width'] = '13';
            s_default['icon-height'] = '16';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit'] == 'lf7' && tags['railway:signal:speed_limit:form'] == 'sign' && tags['railway:signal:speed_limit:speed'] == '90') && zoom >= 14)) {
            s_default['z-index'] = 340;
            s_default['icon-image'] = 'icons/de-lf7-90-sign-32.png';
            s_default['icon-width'] = '13';
            s_default['icon-height'] = '16';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit'] == 'lf7' && tags['railway:signal:speed_limit:form'] == 'sign' && tags['railway:signal:speed_limit:speed'] == '100') && zoom >= 14)) {
            s_default['z-index'] = 345;
            s_default['icon-image'] = 'icons/de-lf7-100-sign-32.png';
            s_default['icon-width'] = '13';
            s_default['icon-height'] = '16';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit'] == 'lf7' && tags['railway:signal:speed_limit:form'] == 'sign' && tags['railway:signal:speed_limit:speed'] == '110') && zoom >= 14)) {
            s_default['z-index'] = 350;
            s_default['icon-image'] = 'icons/de-lf7-110-sign-32.png';
            s_default['icon-width'] = '13';
            s_default['icon-height'] = '16';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit'] == 'lf7' && tags['railway:signal:speed_limit:form'] == 'sign' && tags['railway:signal:speed_limit:speed'] == '120') && zoom >= 14)) {
            s_default['z-index'] = 355;
            s_default['icon-image'] = 'icons/de-lf7-120-sign-32.png';
            s_default['icon-width'] = '13';
            s_default['icon-height'] = '16';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit'] == 'lf7' && tags['railway:signal:speed_limit:form'] == 'sign' && tags['railway:signal:speed_limit:speed'] == '130') && zoom >= 14)) {
            s_default['z-index'] = 360;
            s_default['icon-image'] = 'icons/de-lf7-130-sign-32.png';
            s_default['icon-width'] = '13';
            s_default['icon-height'] = '16';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit'] == 'lf7' && tags['railway:signal:speed_limit:form'] == 'sign' && tags['railway:signal:speed_limit:speed'] == '140') && zoom >= 14)) {
            s_default['z-index'] = 365;
            s_default['icon-image'] = 'icons/de-lf7-140-sign-32.png';
            s_default['icon-width'] = '13';
            s_default['icon-height'] = '16';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit'] == 'lf7' && tags['railway:signal:speed_limit:form'] == 'sign' && tags['railway:signal:speed_limit:speed'] == '150') && zoom >= 14)) {
            s_default['z-index'] = 370;
            s_default['icon-image'] = 'icons/de-lf7-150-sign-32.png';
            s_default['icon-width'] = '13';
            s_default['icon-height'] = '16';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit'] == 'lf7' && tags['railway:signal:speed_limit:form'] == 'sign' && tags['railway:signal:speed_limit:speed'] == '160') && zoom >= 14)) {
            s_default['z-index'] = 375;
            s_default['icon-image'] = 'icons/de-lf7-160-sign-32.png';
            s_default['icon-width'] = '13';
            s_default['icon-height'] = '16';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit'] == 'lf7' && tags['railway:signal:speed_limit:form'] == 'sign' && tags['railway:signal:speed_limit:speed'] == '170') && zoom >= 14)) {
            s_default['z-index'] = 380;
            s_default['icon-image'] = 'icons/de-lf7-170-sign-32.png';
            s_default['icon-width'] = '13';
            s_default['icon-height'] = '16';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit'] == 'lf7' && tags['railway:signal:speed_limit:form'] == 'sign' && tags['railway:signal:speed_limit:speed'] == '180') && zoom >= 14)) {
            s_default['z-index'] = 390;
            s_default['icon-image'] = 'icons/de-lf7-180-sign-32.png';
            s_default['icon-width'] = '13';
            s_default['icon-height'] = '16';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit'] == 'lf7' && tags['railway:signal:speed_limit:form'] == 'sign' && tags['railway:signal:speed_limit:speed'] == '190') && zoom >= 14)) {
            s_default['z-index'] = 395;
            s_default['icon-image'] = 'icons/de-lf7-190-sign-32.png';
            s_default['icon-width'] = '13';
            s_default['icon-height'] = '16';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit'] == 'lf7' && tags['railway:signal:speed_limit:form'] == 'sign' && tags['railway:signal:speed_limit:speed'] == '200') && zoom >= 14)) {
            s_default['z-index'] = 399;
            s_default['icon-image'] = 'icons/de-lf7-200-sign-32.png';
            s_default['icon-width'] = '13';
            s_default['icon-height'] = '16';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit_distant'] == 'lf6' && tags['railway:signal:speed_limit_distant:form'] == 'sign' && tags['railway:signal:speed_limit_distant:speed'] == '10') && zoom >= 14)) {
            s_default['z-index'] = 400;
            s_default['icon-image'] = 'icons/de-lf6-10-sign-down-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit_distant'] == 'lf6' && tags['railway:signal:speed_limit_distant:form'] == 'sign' && tags['railway:signal:speed_limit_distant:speed'] == '20') && zoom >= 14)) {
            s_default['z-index'] = 415;
            s_default['icon-image'] = 'icons/de-lf6-20-sign-down-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit_distant'] == 'lf6' && tags['railway:signal:speed_limit_distant:form'] == 'sign' && tags['railway:signal:speed_limit_distant:speed'] == '30') && zoom >= 14)) {
            s_default['z-index'] = 410;
            s_default['icon-image'] = 'icons/de-lf6-30-sign-down-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit_distant'] == 'lf6' && tags['railway:signal:speed_limit_distant:form'] == 'sign' && tags['railway:signal:speed_limit_distant:speed'] == '40') && zoom >= 14)) {
            s_default['z-index'] = 415;
            s_default['icon-image'] = 'icons/de-lf6-40-sign-down-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit_distant'] == 'lf6' && tags['railway:signal:speed_limit_distant:form'] == 'sign' && tags['railway:signal:speed_limit_distant:speed'] == '50') && zoom >= 14)) {
            s_default['z-index'] = 420;
            s_default['icon-image'] = 'icons/de-lf6-50-sign-down-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit_distant'] == 'lf6' && tags['railway:signal:speed_limit_distant:form'] == 'sign' && tags['railway:signal:speed_limit_distant:speed'] == '60') && zoom >= 14)) {
            s_default['z-index'] = 425;
            s_default['icon-image'] = 'icons/de-lf6-60-sign-down-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit_distant'] == 'lf6' && tags['railway:signal:speed_limit_distant:form'] == 'sign' && tags['railway:signal:speed_limit_distant:speed'] == '70') && zoom >= 14)) {
            s_default['z-index'] = 430;
            s_default['icon-image'] = 'icons/de-lf6-70-sign-down-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit_distant'] == 'lf6' && tags['railway:signal:speed_limit_distant:form'] == 'sign' && tags['railway:signal:speed_limit_distant:speed'] == '80') && zoom >= 14)) {
            s_default['z-index'] = 435;
            s_default['icon-image'] = 'icons/de-lf6-80-sign-down-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit_distant'] == 'lf6' && tags['railway:signal:speed_limit_distant:form'] == 'sign' && tags['railway:signal:speed_limit_distant:speed'] == '90') && zoom >= 14)) {
            s_default['z-index'] = 440;
            s_default['icon-image'] = 'icons/de-lf6-90-sign-down-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit_distant'] == 'lf6' && tags['railway:signal:speed_limit_distant:form'] == 'sign' && tags['railway:signal:speed_limit_distant:speed'] == '100') && zoom >= 14)) {
            s_default['z-index'] = 445;
            s_default['icon-image'] = 'icons/de-lf6-100-sign-down-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit_distant'] == 'lf6' && tags['railway:signal:speed_limit_distant:form'] == 'sign' && tags['railway:signal:speed_limit_distant:speed'] == '110') && zoom >= 14)) {
            s_default['z-index'] = 450;
            s_default['icon-image'] = 'icons/de-lf6-110-sign-down-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit_distant'] == 'lf6' && tags['railway:signal:speed_limit_distant:form'] == 'sign' && tags['railway:signal:speed_limit_distant:speed'] == '120') && zoom >= 14)) {
            s_default['z-index'] = 455;
            s_default['icon-image'] = 'icons/de-lf6-120-sign-down-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit_distant'] == 'lf6' && tags['railway:signal:speed_limit_distant:form'] == 'sign' && tags['railway:signal:speed_limit_distant:speed'] == '130') && zoom >= 14)) {
            s_default['z-index'] = 460;
            s_default['icon-image'] = 'icons/de-lf6-130-sign-down-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit_distant'] == 'lf6' && tags['railway:signal:speed_limit_distant:form'] == 'sign' && tags['railway:signal:speed_limit_distant:speed'] == '140') && zoom >= 14)) {
            s_default['z-index'] = 465;
            s_default['icon-image'] = 'icons/de-lf6-140-sign-down-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit_distant'] == 'lf6' && tags['railway:signal:speed_limit_distant:form'] == 'sign' && tags['railway:signal:speed_limit_distant:speed'] == '150') && zoom >= 14)) {
            s_default['z-index'] = 470;
            s_default['icon-image'] = 'icons/de-lf6-150-sign-down-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit_distant'] == 'lf6' && tags['railway:signal:speed_limit_distant:form'] == 'sign' && tags['railway:signal:speed_limit_distant:speed'] == '160') && zoom >= 14)) {
            s_default['z-index'] = 475;
            s_default['icon-image'] = 'icons/de-lf6-160-sign-down-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit_distant'] == 'lf6' && tags['railway:signal:speed_limit_distant:form'] == 'sign' && tags['railway:signal:speed_limit_distant:speed'] == '170') && zoom >= 14)) {
            s_default['z-index'] = 480;
            s_default['icon-image'] = 'icons/de-lf6-170-sign-down-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit_distant'] == 'lf6' && tags['railway:signal:speed_limit_distant:form'] == 'sign' && tags['railway:signal:speed_limit_distant:speed'] == '180') && zoom >= 14)) {
            s_default['z-index'] = 485;
            s_default['icon-image'] = 'icons/de-lf6-180-sign-down-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit_distant'] == 'lf6' && tags['railway:signal:speed_limit_distant:form'] == 'sign' && tags['railway:signal:speed_limit_distant:speed'] == '190') && zoom >= 14)) {
            s_default['z-index'] = 495;
            s_default['icon-image'] = 'icons/de-lf6-190-sign-down-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit_distant'] == 'lf6' && tags['railway:signal:speed_limit_distant:form'] == 'sign' && tags['railway:signal:speed_limit_distant:speed'] == '200') && zoom >= 14)) {
            s_default['z-index'] = 499;
            s_default['icon-image'] = 'icons/de-lf6-200-sign-down-44.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (Object.keys(s_default).length) {
            style['default'] = s_default; }
        return style;
    }
    
    var sprite_images = {
        'icons/de-lf6-10-sign-down-44.png': {
            width: 44, 
            height: 38, 
            offset: 0
        },
        'icons/de-lf6-100-sign-down-44.png': {
            width: 44, 
            height: 38, 
            offset: 38
        },
        'icons/de-lf6-110-sign-down-44.png': {
            width: 44, 
            height: 38, 
            offset: 76
        },
        'icons/de-lf6-120-sign-down-44.png': {
            width: 44, 
            height: 38, 
            offset: 114
        },
        'icons/de-lf6-130-sign-down-44.png': {
            width: 44, 
            height: 38, 
            offset: 152
        },
        'icons/de-lf6-140-sign-down-44.png': {
            width: 44, 
            height: 38, 
            offset: 190
        },
        'icons/de-lf6-150-sign-down-44.png': {
            width: 44, 
            height: 38, 
            offset: 228
        },
        'icons/de-lf6-160-sign-down-44.png': {
            width: 44, 
            height: 38, 
            offset: 266
        },
        'icons/de-lf6-170-sign-down-44.png': {
            width: 44, 
            height: 38, 
            offset: 304
        },
        'icons/de-lf6-180-sign-down-44.png': {
            width: 44, 
            height: 38, 
            offset: 342
        },
        'icons/de-lf6-190-sign-down-44.png': {
            width: 44, 
            height: 38, 
            offset: 380
        },
        'icons/de-lf6-20-sign-down-44.png': {
            width: 44, 
            height: 38, 
            offset: 418
        },
        'icons/de-lf6-200-sign-down-44.png': {
            width: 44, 
            height: 38, 
            offset: 456
        },
        'icons/de-lf6-30-sign-down-44.png': {
            width: 44, 
            height: 38, 
            offset: 494
        },
        'icons/de-lf6-40-sign-down-44.png': {
            width: 44, 
            height: 38, 
            offset: 532
        },
        'icons/de-lf6-50-sign-down-44.png': {
            width: 44, 
            height: 38, 
            offset: 570
        },
        'icons/de-lf6-60-sign-down-44.png': {
            width: 44, 
            height: 38, 
            offset: 608
        },
        'icons/de-lf6-70-sign-down-44.png': {
            width: 44, 
            height: 38, 
            offset: 646
        },
        'icons/de-lf6-80-sign-down-44.png': {
            width: 44, 
            height: 38, 
            offset: 684
        },
        'icons/de-lf6-90-sign-down-44.png': {
            width: 44, 
            height: 38, 
            offset: 722
        },
        'icons/de-lf7-10-sign-32.png': {
            width: 25, 
            height: 32, 
            offset: 760
        },
        'icons/de-lf7-100-sign-32.png': {
            width: 25, 
            height: 32, 
            offset: 792
        },
        'icons/de-lf7-110-sign-32.png': {
            width: 25, 
            height: 32, 
            offset: 824
        },
        'icons/de-lf7-120-sign-32.png': {
            width: 25, 
            height: 32, 
            offset: 856
        },
        'icons/de-lf7-130-sign-32.png': {
            width: 25, 
            height: 32, 
            offset: 888
        },
        'icons/de-lf7-140-sign-32.png': {
            width: 25, 
            height: 32, 
            offset: 920
        },
        'icons/de-lf7-150-sign-32.png': {
            width: 25, 
            height: 32, 
            offset: 952
        },
        'icons/de-lf7-160-sign-32.png': {
            width: 25, 
            height: 32, 
            offset: 984
        },
        'icons/de-lf7-170-sign-32.png': {
            width: 25, 
            height: 32, 
            offset: 1016
        },
        'icons/de-lf7-180-sign-32.png': {
            width: 25, 
            height: 32, 
            offset: 1048
        },
        'icons/de-lf7-190-sign-32.png': {
            width: 25, 
            height: 32, 
            offset: 1080
        },
        'icons/de-lf7-20-sign-32.png': {
            width: 25, 
            height: 32, 
            offset: 1112
        },
        'icons/de-lf7-200-sign-32.png': {
            width: 25, 
            height: 32, 
            offset: 1144
        },
        'icons/de-lf7-30-sign-32.png': {
            width: 25, 
            height: 32, 
            offset: 1176
        },
        'icons/de-lf7-40-sign-32.png': {
            width: 25, 
            height: 32, 
            offset: 1208
        },
        'icons/de-lf7-50-sign-32.png': {
            width: 25, 
            height: 32, 
            offset: 1240
        },
        'icons/de-lf7-60-sign-32.png': {
            width: 25, 
            height: 32, 
            offset: 1272
        },
        'icons/de-lf7-70-sign-32.png': {
            width: 25, 
            height: 32, 
            offset: 1304
        },
        'icons/de-lf7-80-sign-32.png': {
            width: 25, 
            height: 32, 
            offset: 1336
        },
        'icons/de-lf7-90-sign-32.png': {
            width: 25, 
            height: 32, 
            offset: 1368
        },
        'icons/de-zs10-light-44.png': {
            width: 20, 
            height: 44, 
            offset: 1400
        },
        'icons/de-zs10-sign-44.png': {
            width: 14, 
            height: 44, 
            offset: 1444
        },
        'icons/de-zs3-10-sign-up-44.png': {
            width: 44, 
            height: 38, 
            offset: 1488
        },
        'icons/de-zs3-100-sign-up-44.png': {
            width: 44, 
            height: 39, 
            offset: 1526
        },
        'icons/de-zs3-110-sign-up-44.png': {
            width: 44, 
            height: 39, 
            offset: 1565
        },
        'icons/de-zs3-120-sign-up-44.png': {
            width: 44, 
            height: 39, 
            offset: 1604
        },
        'icons/de-zs3-130-sign-up-44.png': {
            width: 44, 
            height: 39, 
            offset: 1643
        },
        'icons/de-zs3-140-sign-up-44.png': {
            width: 44, 
            height: 39, 
            offset: 1682
        },
        'icons/de-zs3-150-sign-up-44.png': {
            width: 44, 
            height: 39, 
            offset: 1721
        },
        'icons/de-zs3-160-sign-up-44.png': {
            width: 44, 
            height: 39, 
            offset: 1760
        },
        'icons/de-zs3-20-sign-up-44.png': {
            width: 44, 
            height: 38, 
            offset: 1799
        },
        'icons/de-zs3-30-sign-up-44.png': {
            width: 44, 
            height: 39, 
            offset: 1837
        },
        'icons/de-zs3-40-sign-up-44.png': {
            width: 44, 
            height: 39, 
            offset: 1876
        },
        'icons/de-zs3-50-sign-up-44.png': {
            width: 44, 
            height: 39, 
            offset: 1915
        },
        'icons/de-zs3-60-sign-up-44.png': {
            width: 44, 
            height: 39, 
            offset: 1954
        },
        'icons/de-zs3-70-sign-up-44.png': {
            width: 44, 
            height: 39, 
            offset: 1993
        },
        'icons/de-zs3-80-sign-up-44.png': {
            width: 44, 
            height: 39, 
            offset: 2032
        },
        'icons/de-zs3-90-sign-up-44.png': {
            width: 44, 
            height: 38, 
            offset: 2071
        },
        'icons/de-zs3v-10-sign-down-44.png': {
            width: 44, 
            height: 38, 
            offset: 2109
        },
        'icons/de-zs3v-100-sign-down-44.png': {
            width: 44, 
            height: 39, 
            offset: 2147
        },
        'icons/de-zs3v-110-sign-down-44.png': {
            width: 44, 
            height: 39, 
            offset: 2186
        },
        'icons/de-zs3v-120-sign-down-44.png': {
            width: 44, 
            height: 39, 
            offset: 2225
        },
        'icons/de-zs3v-130-sign-down-44.png': {
            width: 44, 
            height: 39, 
            offset: 2264
        },
        'icons/de-zs3v-140-sign-down-44.png': {
            width: 44, 
            height: 39, 
            offset: 2303
        },
        'icons/de-zs3v-150-sign-down-44.png': {
            width: 44, 
            height: 39, 
            offset: 2342
        },
        'icons/de-zs3v-160-sign-down-44.png': {
            width: 44, 
            height: 39, 
            offset: 2381
        },
        'icons/de-zs3v-20-sign-down-44.png': {
            width: 44, 
            height: 38, 
            offset: 2420
        },
        'icons/de-zs3v-30-sign-down-44.png': {
            width: 44, 
            height: 38, 
            offset: 2458
        },
        'icons/de-zs3v-40-sign-down-44.png': {
            width: 44, 
            height: 38, 
            offset: 2496
        },
        'icons/de-zs3v-50-sign-down-44.png': {
            width: 44, 
            height: 38, 
            offset: 2534
        },
        'icons/de-zs3v-60-sign-down-44.png': {
            width: 44, 
            height: 38, 
            offset: 2572
        },
        'icons/de-zs3v-70-sign-down-44.png': {
            width: 44, 
            height: 39, 
            offset: 2610
        },
        'icons/de-zs3v-80-sign-down-44.png': {
            width: 44, 
            height: 39, 
            offset: 2649
        },
        'icons/de-zs3v-90-sign-down-44.png': {
            width: 44, 
            height: 39, 
            offset: 2688
        }
    }, external_images = [], presence_tags = [], value_tags = ['railway:signal:speed_limit', 'railway', 'maxspeed', 'railway:signal:speed_limit:speed', 'railway:signal:speed_limit_distant:speed', 'railway:signal:speed_limit:form', 'railway:signal:speed_limit_distant:form', 'railway:signal:speed_limit_distant'];

    MapCSS.loadStyle('maxspeed', restyle, sprite_images, external_images, presence_tags, value_tags);
    MapCSS.preloadExternalImages('maxspeed');
})(MapCSS);
    
