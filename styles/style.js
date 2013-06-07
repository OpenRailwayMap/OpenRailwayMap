
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

        if (((type == 'way' && tags['service'] == 'siding'))) {
            s_default['z-index'] = 900;
            s_default['color'] = '#000000';
            s_default['width'] = 2;
            s_default['linecap'] = 'square';
            s_default['text'] = MapCSS.e_localize(tags, 'railway:track_ref');
            s_default['text-position'] = 'line';
        }

        if (((type == 'way' && tags['electrified'] == 'contact_line' && tags['usage'] == 'branch'))) {
            s_default['z-index'] = 900;
            s_default['casing-color'] = '#AA9D00';
            s_default['color'] = '#DACA00';
            s_default['width'] = 3;
            s_default['casing-width'] = 3;
            s_default['linecap'] = 'square';
        }

        if (((type == 'way' && tags['electrified'] == 'contact_line' && tags['usage'] == 'main'))) {
            s_default['z-index'] = 1000;
            s_default['casing-color'] = '#9D5200';
            s_default['color'] = '#DC7503';
            s_default['width'] = 3;
            s_default['casing-width'] = 3;
            s_default['linecap'] = 'square';
        }

        if (((type == 'way' && tags['electrified'] == 'contact_line' && tags['usage'] == 'main' && (tags['highspeed'] == '1' || tags['highspeed'] == 'true' || tags['highspeed'] == 'yes')))) {
            s_default['z-index'] = 2000;
            s_default['casing-color'] = '#B30000';
            s_default['color'] = '#FF0000';
            s_default['width'] = 3;
            s_default['casing-width'] = 3;
            s_default['linecap'] = 'square';
        }

        if (((type == 'way' && tags['electrified'] == 'contact_line' && tags['usage'] == 'industrial'))) {
            s_default['z-index'] = 950;
            s_default['casing-color'] = '#5C381F';
            s_default['color'] = '#87491D';
            s_default['width'] = 2;
            s_default['casing-width'] = 3;
            s_default['linecap'] = 'square';
        }

        if (((type == 'way' && tags['electrified'] == 'contact_line' && tags['service'] == 'siding'))) {
            s_default['z-index'] = 935;
            s_default['casing-color'] = '#5C381F';
            s_default['color'] = 'black';
            s_default['width'] = 2;
            s_default['casing-width'] = 3;
            s_default['linecap'] = 'square';
        }

        if (((type == 'way' && tags['electrified'] == 'contact_line' && tags['service'] == 'yard'))) {
            s_default['z-index'] = 935;
            s_default['color'] = '#585858';
            s_default['width'] = 2;
            s_default['linecap'] = 'round';
        }

        if (((type == 'way' && tags['electrified'] == 'no' && tags['usage'] == 'branch'))) {
            s_default['z-index'] = 950;
            s_default['color'] = '#DACA00';
            s_default['width'] = 3;
            s_default['linecap'] = 'round';
        }

        if (((type == 'way' && tags['electrified'] == 'no' && tags['usage'] == 'main'))) {
            s_default['z-index'] = 1050;
            s_default['color'] = '#DC7503';
            s_default['width'] = 3;
            s_default['linecap'] = 'round';
        }

        if (((type == 'way' && tags['electrified'] == 'no' && tags['usage'] == 'main' && (tags['highspeed'] == '1' || tags['highspeed'] == 'true' || tags['highspeed'] == 'yes')))) {
            s_default['z-index'] = 2050;
            s_default['color'] = '#ff0000';
            s_default['width'] = 3;
            s_default['linecap'] = 'round';
        }

        if (((type == 'way' && tags['electrified'] == 'no' && tags['usage'] == 'industrial'))) {
            s_default['z-index'] = 970;
            s_default['color'] = '#87491D';
            s_default['width'] = 2;
            s_default['linecap'] = 'round';
        }

        if (((type == 'way' && tags['electrified'] == 'no' && tags['service'] == 'siding'))) {
            s_default['z-index'] = 960;
            s_default['color'] = 'black';
            s_default['width'] = 2;
            s_default['linecap'] = 'round';
        }

        if (((type == 'way' && tags['electrified'] == 'no' && tags['service'] == 'yard'))) {
            s_default['z-index'] = 960;
            s_default['color'] = '#585858';
            s_default['width'] = 2;
            s_default['linecap'] = 'round';
        }

        if (((type == 'way' && tags['usage'] == 'branch'))) {
            s_default['z-index'] = 900;
            s_default['color'] = '#DACA00';
            s_default['width'] = 3;
            s_default['linecap'] = 'round';
        }

        if (((type == 'way' && tags['usage'] == 'main'))) {
            s_default['z-index'] = 1000;
            s_default['color'] = '#DC7503';
            s_default['width'] = 3;
            s_default['linecap'] = 'round';
        }

        if (((type == 'way' && tags['usage'] == 'main' && (tags['highspeed'] == '1' || tags['highspeed'] == 'true' || tags['highspeed'] == 'yes')))) {
            s_default['z-index'] = 2000;
            s_default['color'] = '#ff0000';
            s_default['width'] = 3;
            s_default['linecap'] = 'round';
        }

        if (((type == 'way' && tags['usage'] == 'industrial'))) {
            s_default['z-index'] = 900;
            s_default['color'] = '#87491D';
            s_default['width'] = 2;
            s_default['linecap'] = 'round';
        }

        if (((type == 'way' && tags['service'] == 'siding'))) {
            s_default['z-index'] = 900;
            s_default['color'] = 'black';
            s_default['width'] = 2;
            s_default['linecap'] = 'round';
        }

        if (((type == 'way' && tags['service'] == 'yard'))) {
            s_default['z-index'] = 900;
            s_default['color'] = '#585858';
            s_default['width'] = 2;
            s_default['linecap'] = 'round';
        }

        if (((type == 'way' && (tags.hasOwnProperty('highway'))))) {
            s_default['z-index'] = 10;
            s_default['color'] = '#B1B1B1';
            s_default['width'] = 3;
            s_default['linecap'] = 'round';
        }

        if (((selector == 'area' && tags['landuse'] == 'forest'))) {
            s_default['z-index'] = 0;
            s_default['fill-color'] = '#2F8F28';
            s_default['color'] = 'gray';
        }

        if (((selector == 'area' && tags['natural'] == 'scrub'))) {
            s_default['z-index'] = 0;
            s_default['fill-color'] = '#2F8F28';
            s_default['color'] = 'gray';
        }

        if (((selector == 'area' && tags['landuse'] == 'farmland'))) {
            s_default['z-index'] = 0;
            s_default['fill-color'] = '#B29B55';
            s_default['color'] = 'gray';
        }

        if (((selector == 'area' && tags['landuse'] == 'meadow'))) {
            s_default['z-index'] = 0;
            s_default['fill-color'] = '#7AC53C';
            s_default['color'] = 'gray';
        }

        if (((selector == 'area' && tags['waterway'] == 'riverbank'))) {
            s_default['z-index'] = 0;
            s_default['fill-color'] = 'blue';
            s_default['opacity'] = 0.5;
        }

        if (((type == 'way' && (tags.hasOwnProperty('waterway'))))) {
            s_default['z-index'] = 1;
            s_default['color'] = 'blue';
            s_default['width'] = 3;
            s_default['linecap'] = 'round';
        }

        if (((selector == 'area' && (tags.hasOwnProperty('building'))))) {
            s_default['z-index'] = 30;
            s_default['fill-color'] = '#B26E6E';
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

        if (((type == 'node' && tags['railway'] == 'milestone'))) {
            s_default['z-index'] = 6000;
            s_default['text'] = MapCSS.e_localize(tags, 'railway:position');
            s_default['text-position'] = 'auto';
            s_default['tex-color'] = 'blue';
        }

        if (((type == 'node' && tags['railway'] == 'stop'))) {
            s_default['z-index'] = 8000;
            s_default['symbol-shape'] = 'circle';
            s_default['symbol-size'] = '8';
            s_default['symbol-stroke-color'] = 'blue';
            s_default['symbol-fill-color'] = 'blue';
        }

        if (((type == 'node' && tags['railway'] == 'station'))) {
            s_default['z-index'] = 10000;
            s_default['symbol-shape'] = 'circle';
            s_default['symbol-size'] = '8';
            s_default['symbol-stroke-color'] = 'blue';
            s_default['symbol-fill-color'] = 'blue';
            s_default['text'] = MapCSS.e_localize(tags, 'name');
            s_default['text-position'] = 'auto';
            s_default['text-size'] = '20';
        }

        if (!K.Utils.isEmpty(s_default)) {
            style['default'] = s_default; }
        return style;
    }
    
    var sprite_images = {
    }, external_images = [], presence_tags = ['building', 'highway'], value_tags = ['ref', 'railway:position', 'railway', "", 'electrified', 'railway:track_ref', 'natural', 'waterway', 'highspeed', 'name', 'usage', 'landuse', 'service'];

    MapCSS.loadStyle('style', restyle, sprite_images, external_images, presence_tags, value_tags);
    MapCSS.preloadExternalImages('style');
})(MapCSS);
    