
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

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit'] == 'zs3' && tags['railway:signal:speed_limit:form'] == 'sign' && tags['railway:signal:speed_limit:speed'] == '60') && zoom >= 16)) {
            s_default['z-index'] = 100;
            s_default['icon-image'] = 'icons/de:zs3-60-sign-up-44px.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit_distant'] == 'zs3v' && tags['railway:signal:speed_limit_distant:form'] == 'sign' && tags['railway:signal:speed_limit_distant:speed'] == '50') && zoom >= 16)) {
            s_default['z-index'] = 200;
            s_default['icon-image'] = 'icons/de:zs3v-50-sign-down-44px.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit'] == 'lf7' && tags['railway:signal:speed_limit:form'] == 'sign' && tags['railway:signal:speed_limit:speed'] == '70') && zoom >= 14)) {
            s_default['z-index'] = 300;
            s_default['icon-image'] = 'icons/de:lf7-70-sign-32px.png';
            s_default['icon-width'] = '13';
            s_default['icon-height'] = '16';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit_distant'] == 'lf6' && tags['railway:signal:speed_limit_distant:form'] == 'sign' && tags['railway:signal:speed_limit_distant:speed'] == '30') && zoom >= 14)) {
            s_default['z-index'] = 400;
            s_default['icon-image'] = 'icons/de:lf6-30-sign-down-32px.png';
            s_default['icon-width'] = '16';
            s_default['icon-height'] = '14';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit_distant'] == 'lf6' && tags['railway:signal:speed_limit_distant:form'] == 'sign' && tags['railway:signal:speed_limit_distant:speed'] == '60') && zoom >= 14)) {
            s_default['z-index'] = 500;
            s_default['icon-image'] = 'icons/de:lf6-60-sign-down-44px.png';
            s_default['icon-width'] = '22';
            s_default['icon-height'] = '19';
            s_default['allow-overlap'] = 'true';
        }

        if (Object.keys(s_default).length) {
            style['default'] = s_default; }
        return style;
    }
    
    var sprite_images = {
        'icons/de:lf6-30-sign-down-32px.png': {
            width: 32, 
            height: 27, 
            offset: 0
        },
        'icons/de:lf6-60-sign-down-44px.png': {
            width: 44, 
            height: 38, 
            offset: 27
        },
        'icons/de:lf7-70-sign-32px.png': {
            width: 25, 
            height: 32, 
            offset: 65
        },
        'icons/de:zs3-60-sign-up-44px.png': {
            width: 44, 
            height: 38, 
            offset: 97
        },
        'icons/de:zs3v-50-sign-down-44px.png': {
            width: 44, 
            height: 38, 
            offset: 135
        }
    }, external_images = [], presence_tags = [], value_tags = ['railway:signal:speed_limit', 'railway', 'maxspeed', 'railway:signal:speed_limit:speed', 'railway:signal:speed_limit_distant:speed', 'railway:signal:speed_limit:form', 'railway:signal:speed_limit_distant:form', 'railway:signal:speed_limit_distant'];

    MapCSS.loadStyle('maxspeed', restyle, sprite_images, external_images, presence_tags, value_tags);
    MapCSS.preloadExternalImages('maxspeed');
})(MapCSS);
    
