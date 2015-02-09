
(function (MapCSS) {
    'use strict';

    function restyle(style, tags, zoom, type, selector) {
        var s_default = {};

        if ((selector == 'meta')) {
            s_default['title'] = 'OpenRailwayMap signalling layer';
            s_default['version'] = '0';
            s_default['description'] = 'Style for a signalling layer railroad network map.';
            s_default['author'] = 'rurseekatze';
            s_default['link'] = 'http://wiki.openstreetmap.org/wiki/OpenRailwayMap';
            s_default['watch-modified'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:main'] == 'DE-ESO:hp' && tags['railway:signal:main:form'] == 'semaphore' && (!tags.hasOwnProperty('railway:signal:main:states'))) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:main'] == 'hp' && tags['railway:signal:main:form'] == 'semaphore' && (!tags.hasOwnProperty('railway:signal:main:states'))) && zoom >= 14)) {
            s_default['z-index'] = 10000;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 12;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-hp0-semaphore-32.png';
            s_default['icon-width'] = '16';
            s_default['icon-height'] = '16';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:main'] == 'DE-ESO:hp' && tags['railway:signal:main:form'] == 'semaphore' && (tags.hasOwnProperty('railway:signal:main:states')) && !(/.*hp2.*/.test(tags['railway:signal:main:states']))) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:main'] == 'hp' && tags['railway:signal:main:form'] == 'semaphore' && (tags.hasOwnProperty('railway:signal:main:states')) && !(/.*hp2.*/.test(tags['railway:signal:main:states']))) && zoom >= 14)) {
            s_default['z-index'] = 10000;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 12;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-hp1-semaphore-38.png';
            s_default['icon-width'] = '12';
            s_default['icon-height'] = '19';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:main'] == 'DE-ESO:hp' && tags['railway:signal:main:form'] == 'semaphore' && (tags.hasOwnProperty('railway:signal:main:states')) && /.*hp2.*/.test(tags['railway:signal:main:states'])) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:main'] == 'hp' && tags['railway:signal:main:form'] == 'semaphore' && (tags.hasOwnProperty('railway:signal:main:states')) && /.*hp2.*/.test(tags['railway:signal:main:states'])) && zoom >= 14)) {
            s_default['z-index'] = 10000;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 12;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-hp2-semaphore-40.png';
            s_default['icon-width'] = '12';
            s_default['icon-height'] = '20';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:main'] == 'DE-ESO:hp' && tags['railway:signal:main:form'] == 'light' && (!tags.hasOwnProperty('railway:signal:main:states'))) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:main'] == 'hp' && tags['railway:signal:main:form'] == 'light' && (!tags.hasOwnProperty('railway:signal:main:states'))) && zoom >= 14)) {
            s_default['z-index'] = 10000;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 12;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-hp0-light-32.png';
            s_default['icon-width'] = '9';
            s_default['icon-height'] = '16';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:main'] == 'DE-ESO:hp' && tags['railway:signal:main:form'] == 'light' && (tags.hasOwnProperty('railway:signal:main:states')) && !(/.*hp2.*/.test(tags['railway:signal:main:states']))) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:main'] == 'hp' && tags['railway:signal:main:form'] == 'light' && (tags.hasOwnProperty('railway:signal:main:states')) && !(/.*hp2.*/.test(tags['railway:signal:main:states']))) && zoom >= 14)) {
            s_default['z-index'] = 10000;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 12;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-hp1-light-32.png';
            s_default['icon-width'] = '9';
            s_default['icon-height'] = '16';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:main'] == 'DE-ESO:hp' && tags['railway:signal:main:form'] == 'light' && (tags.hasOwnProperty('railway:signal:main:states')) && /.*hp2.*/.test(tags['railway:signal:main:states'])) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:main'] == 'hp' && tags['railway:signal:main:form'] == 'light' && (tags.hasOwnProperty('railway:signal:main:states')) && /.*hp2.*/.test(tags['railway:signal:main:states'])) && zoom >= 14)) {
            s_default['z-index'] = 10000;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 12;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-hp2-light-32.png';
            s_default['icon-width'] = '8';
            s_default['icon-height'] = '16';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:main'] == 'DE-ESO:hl' && tags['railway:signal:main:form'] == 'light' && (!tags.hasOwnProperty('railway:signal:main:states'))) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:main'] == 'hl' && tags['railway:signal:main:form'] == 'light' && (!tags.hasOwnProperty('railway:signal:main:states'))) && zoom >= 14)) {
            s_default['z-index'] = 10000;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 12;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-hl0-32.png';
            s_default['icon-width'] = '7';
            s_default['icon-height'] = '16';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:main'] == 'DE-ESO:hl' && tags['railway:signal:main:form'] == 'light' && (tags.hasOwnProperty('railway:signal:main:states')) && !(/.*hl2.*/.test(tags['railway:signal:main:states'])) && !(/.*hl3a.*/.test(tags['railway:signal:main:states'])) && !(/.*hl3b.*/.test(tags['railway:signal:main:states']))) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:main'] == 'hl' && tags['railway:signal:main:form'] == 'light' && (tags.hasOwnProperty('railway:signal:main:states')) && !(/.*hl2.*/.test(tags['railway:signal:main:states'])) && !(/.*hl3a.*/.test(tags['railway:signal:main:states'])) && !(/.*hl3b.*/.test(tags['railway:signal:main:states']))) && zoom >= 14)) {
            s_default['z-index'] = 10000;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 12;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-hl1-32.png';
            s_default['icon-width'] = '7';
            s_default['icon-height'] = '16';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:main'] == 'DE-ESO:hl' && tags['railway:signal:main:form'] == 'light' && (tags.hasOwnProperty('railway:signal:main:states')) && !(/.*hl2.*/.test(tags['railway:signal:main:states'])) && !(/.*hl3b.*/.test(tags['railway:signal:main:states'])) && /.*hl3a.*/.test(tags['railway:signal:main:states'])) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:main'] == 'hl' && tags['railway:signal:main:form'] == 'light' && (tags.hasOwnProperty('railway:signal:main:states')) && !(/.*hl2.*/.test(tags['railway:signal:main:states'])) && !(/.*hl3b.*/.test(tags['railway:signal:main:states'])) && /.*hl3a.*/.test(tags['railway:signal:main:states'])) && zoom >= 14)) {
            s_default['z-index'] = 10000;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 12;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-hl3a-32.png';
            s_default['icon-width'] = '7';
            s_default['icon-height'] = '16';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:main'] == 'DE-ESO:hl' && tags['railway:signal:main:form'] == 'light' && (tags.hasOwnProperty('railway:signal:main:states')) && !(/.*hl2.*/.test(tags['railway:signal:main:states'])) && /.*hl3b.*/.test(tags['railway:signal:main:states']) && /.*hl3a.*/.test(tags['railway:signal:main:states'])) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:main'] == 'hl' && tags['railway:signal:main:form'] == 'light' && (tags.hasOwnProperty('railway:signal:main:states')) && !(/.*hl2.*/.test(tags['railway:signal:main:states'])) && /.*hl3b.*/.test(tags['railway:signal:main:states']) && /.*hl3a.*/.test(tags['railway:signal:main:states'])) && zoom >= 14)) {
            s_default['z-index'] = 10000;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 12;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-hl3b-48.png';
            s_default['icon-width'] = '8';
            s_default['icon-height'] = '24';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:main'] == 'DE-ESO:hl' && tags['railway:signal:main:form'] == 'light' && (tags.hasOwnProperty('railway:signal:main:states')) && /.*hl3a.*/.test(tags['railway:signal:main:states']) && /.*hl2.*/.test(tags['railway:signal:main:states']) && !(/.*hl3b.*/.test(tags['railway:signal:main:states']))) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:main'] == 'DE-ESO:hl' && tags['railway:signal:main:form'] == 'light' && (tags.hasOwnProperty('railway:signal:main:states')) && /.*hl3a.*/.test(tags['railway:signal:main:states']) && /.*hl2.*/.test(tags['railway:signal:main:states']) && /.*hl3b.*/.test(tags['railway:signal:main:states'])) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:main'] == 'hl' && tags['railway:signal:main:form'] == 'light' && (tags.hasOwnProperty('railway:signal:main:states')) && /.*hl3a.*/.test(tags['railway:signal:main:states']) && /.*hl2.*/.test(tags['railway:signal:main:states']) && !(/.*hl3b.*/.test(tags['railway:signal:main:states']))) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:main'] == 'hl' && tags['railway:signal:main:form'] == 'light' && (tags.hasOwnProperty('railway:signal:main:states')) && /.*hl3a.*/.test(tags['railway:signal:main:states']) && /.*hl2.*/.test(tags['railway:signal:main:states']) && /.*hl3b.*/.test(tags['railway:signal:main:states'])) && zoom >= 14)) {
            s_default['z-index'] = 10000;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 12;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-hl2-48.png';
            s_default['icon-width'] = '8';
            s_default['icon-height'] = '24';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:combined'] == 'DE-ESO:hl' && tags['railway:signal:combined:form'] == 'light' && (!tags.hasOwnProperty('railway:signal:combined:states'))) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:combined'] == 'hl' && tags['railway:signal:combined:form'] == 'light' && (!tags.hasOwnProperty('railway:signal:combined:states'))) && zoom >= 14)) {
            s_default['z-index'] = 10000;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 12;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-hl0-32.png';
            s_default['icon-width'] = '7';
            s_default['icon-height'] = '16';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:combined'] == 'DE-ESO:hl' && tags['railway:signal:combined:form'] == 'light' && (tags.hasOwnProperty('railway:signal:combined:states')) && !(/.*hl11.*/.test(tags['railway:signal:combined:states'])) && !(/.*hl12a.*/.test(tags['railway:signal:combined:states'])) && !(/.*hl12b.*/.test(tags['railway:signal:combined:states']))) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:combined'] == 'hl' && tags['railway:signal:combined:form'] == 'light' && (tags.hasOwnProperty('railway:signal:combined:states')) && !(/.*hl11.*/.test(tags['railway:signal:combined:states'])) && !(/.*hl12a.*/.test(tags['railway:signal:combined:states'])) && !(/.*hl12b.*/.test(tags['railway:signal:combined:states']))) && zoom >= 14)) {
            s_default['z-index'] = 10000;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 12;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-hl10-32.png';
            s_default['icon-width'] = '7';
            s_default['icon-height'] = '16';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:combined'] == 'DE-ESO:hl' && tags['railway:signal:combined:form'] == 'light' && (tags.hasOwnProperty('railway:signal:combined:states')) && !(/.*hl11.*/.test(tags['railway:signal:combined:states'])) && !(/.*hl12b.*/.test(tags['railway:signal:combined:states'])) && /.*hl12a.*/.test(tags['railway:signal:combined:states'])) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:combined'] == 'hl' && tags['railway:signal:combined:form'] == 'light' && (tags.hasOwnProperty('railway:signal:combined:states')) && !(/.*hl11.*/.test(tags['railway:signal:combined:states'])) && !(/.*hl12b.*/.test(tags['railway:signal:combined:states'])) && /.*hl12a.*/.test(tags['railway:signal:combined:states'])) && zoom >= 14)) {
            s_default['z-index'] = 10000;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 12;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-hl12a-32.png';
            s_default['icon-width'] = '7';
            s_default['icon-height'] = '16';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:combined'] == 'DE-ESO:hl' && tags['railway:signal:combined:form'] == 'light' && (tags.hasOwnProperty('railway:signal:combined:states')) && !(/.*hl11.*/.test(tags['railway:signal:combined:states'])) && /.*hl12b.*/.test(tags['railway:signal:combined:states']) && /.*hl12a.*/.test(tags['railway:signal:combined:states'])) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:combined'] == 'hl' && tags['railway:signal:combined:form'] == 'light' && (tags.hasOwnProperty('railway:signal:combined:states')) && !(/.*hl11.*/.test(tags['railway:signal:combined:states'])) && /.*hl12b.*/.test(tags['railway:signal:combined:states']) && /.*hl12a.*/.test(tags['railway:signal:combined:states'])) && zoom >= 14)) {
            s_default['z-index'] = 10000;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 12;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-hl12b-48.png';
            s_default['icon-width'] = '8';
            s_default['icon-height'] = '24';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:combined'] == 'DE-ESO:hl' && tags['railway:signal:combined:form'] == 'light' && (tags.hasOwnProperty('railway:signal:combined:states')) && /.*hl12a.*/.test(tags['railway:signal:combined:states']) && /.*hl11.*/.test(tags['railway:signal:combined:states']) && !(/.*hl12b.*/.test(tags['railway:signal:combined:states']))) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:combined'] == 'DE-ESO:hl' && tags['railway:signal:combined:form'] == 'light' && (tags.hasOwnProperty('railway:signal:combined:states')) && /.*hl12a.*/.test(tags['railway:signal:combined:states']) && /.*hl11.*/.test(tags['railway:signal:combined:states']) && /.*hl12b.*/.test(tags['railway:signal:combined:states'])) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:combined'] == 'hl' && tags['railway:signal:combined:form'] == 'light' && (tags.hasOwnProperty('railway:signal:combined:states')) && /.*hl12a.*/.test(tags['railway:signal:combined:states']) && /.*hl11.*/.test(tags['railway:signal:combined:states']) && !(/.*hl12b.*/.test(tags['railway:signal:combined:states']))) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:combined'] == 'hl' && tags['railway:signal:combined:form'] == 'light' && (tags.hasOwnProperty('railway:signal:combined:states')) && /.*hl12a.*/.test(tags['railway:signal:combined:states']) && /.*hl11.*/.test(tags['railway:signal:combined:states']) && /.*hl12b.*/.test(tags['railway:signal:combined:states'])) && zoom >= 14)) {
            s_default['z-index'] = 10000;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 12;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-hl11-48.png';
            s_default['icon-width'] = '8';
            s_default['icon-height'] = '24';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:combined'] == 'DE-ESO:sv' && !(/.*hp0.*/.test(tags['railway:signal:combined:states'])) && /.*sv0.*/.test(tags['railway:signal:combined:states'])) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:combined'] == 'sv' && !(/.*hp0.*/.test(tags['railway:signal:combined:states'])) && /.*sv0.*/.test(tags['railway:signal:combined:states'])) && zoom >= 14)) {
            s_default['z-index'] = 10000;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 12;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-sv-sv0-16.png';
            s_default['icon-width'] = '8';
            s_default['icon-height'] = '16';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:combined'] == 'DE-ESO:sv' && /.*hp0.*/.test(tags['railway:signal:combined:states'])) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:combined'] == 'sv' && /.*hp0.*/.test(tags['railway:signal:combined:states'])) && zoom >= 14)) {
            s_default['z-index'] = 10001;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 12;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-sv-hp0-16.png';
            s_default['icon-width'] = '8';
            s_default['icon-height'] = '16';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:main'] == 'DE-ESO:ne1' && tags['railway:signal:main:form'] == 'sign' && tags['railway:signal:main:function'] == 'entry') && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:main'] == 'ne1' && tags['railway:signal:main:form'] == 'sign' && tags['railway:signal:main:function'] == 'entry') && zoom >= 14)) {
            s_default['z-index'] = 8000;
            s_default['icon-image'] = 'icons/de-ne1-32.png';
            s_default['icon-width'] = '16';
            s_default['icon-height'] = '10';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'DE-ESO:vr' && tags['railway:signal:distant:form'] == 'semaphore' && (!tags.hasOwnProperty('railway:signal:main')) && (!tags.hasOwnProperty('railway:signal:distant:states'))) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'vr' && tags['railway:signal:distant:form'] == 'semaphore' && (!tags.hasOwnProperty('railway:signal:main')) && (!tags.hasOwnProperty('railway:signal:distant:states'))) && zoom >= 14)) {
            s_default['z-index'] = 9000;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 12;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-vr0-semaphore-52.png';
            s_default['icon-width'] = '12';
            s_default['icon-height'] = '26';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'DE-ESO:vr' && tags['railway:signal:distant:form'] == 'semaphore' && (!tags.hasOwnProperty('railway:signal:main')) && (tags.hasOwnProperty('railway:signal:distant:states')) && !(/.*vr2.*/.test(tags['railway:signal:distant:states']))) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'vr' && tags['railway:signal:distant:form'] == 'semaphore' && (!tags.hasOwnProperty('railway:signal:main')) && (tags.hasOwnProperty('railway:signal:distant:states')) && !(/.*vr2.*/.test(tags['railway:signal:distant:states']))) && zoom >= 14)) {
            s_default['z-index'] = 9000;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 12;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-vr1-semaphore-38.png';
            s_default['icon-width'] = '12';
            s_default['icon-height'] = '19';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'DE-ESO:vr' && tags['railway:signal:distant:form'] == 'semaphore' && (!tags.hasOwnProperty('railway:signal:main')) && (tags.hasOwnProperty('railway:signal:distant:states')) && /.*vr2.*/.test(tags['railway:signal:distant:states'])) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'vr' && tags['railway:signal:distant:form'] == 'semaphore' && (!tags.hasOwnProperty('railway:signal:main')) && (tags.hasOwnProperty('railway:signal:distant:states')) && /.*vr2.*/.test(tags['railway:signal:distant:states'])) && zoom >= 14)) {
            s_default['z-index'] = 9000;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 12;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-vr2-semaphore-53.png';
            s_default['icon-width'] = '12';
            s_default['icon-height'] = '26';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'DE-ESO:vr' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:repeated'] == 'no' && tags['railway:signal:distant:shortened'] == 'no' && (!tags.hasOwnProperty('railway:signal:main')) && (!tags.hasOwnProperty('railway:signal:distant:states'))) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'DE-ESO:vr' && tags['railway:signal:distant:form'] == 'light' && (!tags.hasOwnProperty('railway:signal:distant:repeated')) && tags['railway:signal:distant:shortened'] == 'no' && (!tags.hasOwnProperty('railway:signal:main')) && (!tags.hasOwnProperty('railway:signal:distant:states'))) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'DE-ESO:vr' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:repeated'] == 'no' && (!tags.hasOwnProperty('railway:signal:distant:shortened')) && (!tags.hasOwnProperty('railway:signal:main')) && (!tags.hasOwnProperty('railway:signal:distant:states'))) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'DE-ESO:vr' && tags['railway:signal:distant:form'] == 'light' && (!tags.hasOwnProperty('railway:signal:distant:repeated')) && (!tags.hasOwnProperty('railway:signal:distant:shortened')) && (!tags.hasOwnProperty('railway:signal:main')) && (!tags.hasOwnProperty('railway:signal:distant:states'))) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'vr' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:repeated'] == 'no' && tags['railway:signal:distant:shortened'] == 'no' && (!tags.hasOwnProperty('railway:signal:main')) && (!tags.hasOwnProperty('railway:signal:distant:states'))) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'vr' && tags['railway:signal:distant:form'] == 'light' && (!tags.hasOwnProperty('railway:signal:distant:repeated')) && tags['railway:signal:distant:shortened'] == 'no' && (!tags.hasOwnProperty('railway:signal:main')) && (!tags.hasOwnProperty('railway:signal:distant:states'))) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'vr' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:repeated'] == 'no' && (!tags.hasOwnProperty('railway:signal:distant:shortened')) && (!tags.hasOwnProperty('railway:signal:main')) && (!tags.hasOwnProperty('railway:signal:distant:states'))) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'vr' && tags['railway:signal:distant:form'] == 'light' && (!tags.hasOwnProperty('railway:signal:distant:repeated')) && (!tags.hasOwnProperty('railway:signal:distant:shortened')) && (!tags.hasOwnProperty('railway:signal:main')) && (!tags.hasOwnProperty('railway:signal:distant:states'))) && zoom >= 14)) {
            s_default['z-index'] = 9000;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 12;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-vr0-light-32.png';
            s_default['icon-width'] = '16';
            s_default['icon-height'] = '16';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'DE-ESO:vr' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:repeated'] == 'no' && tags['railway:signal:distant:shortened'] == 'no' && (!tags.hasOwnProperty('railway:signal:main')) && (tags.hasOwnProperty('railway:signal:distant:states')) && !(/.*vr2.*/.test(tags['railway:signal:distant:states']))) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'DE-ESO:vr' && tags['railway:signal:distant:form'] == 'light' && (!tags.hasOwnProperty('railway:signal:distant:repeated')) && tags['railway:signal:distant:shortened'] == 'no' && (!tags.hasOwnProperty('railway:signal:main')) && (tags.hasOwnProperty('railway:signal:distant:states')) && !(/.*vr2.*/.test(tags['railway:signal:distant:states']))) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'DE-ESO:vr' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:repeated'] == 'no' && (!tags.hasOwnProperty('railway:signal:distant:shortened')) && (!tags.hasOwnProperty('railway:signal:main')) && (tags.hasOwnProperty('railway:signal:distant:states')) && !(/.*vr2.*/.test(tags['railway:signal:distant:states']))) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'DE-ESO:vr' && tags['railway:signal:distant:form'] == 'light' && (!tags.hasOwnProperty('railway:signal:distant:repeated')) && (!tags.hasOwnProperty('railway:signal:distant:shortened')) && (!tags.hasOwnProperty('railway:signal:main')) && (tags.hasOwnProperty('railway:signal:distant:states')) && !(/.*vr2.*/.test(tags['railway:signal:distant:states']))) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'vr' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:repeated'] == 'no' && tags['railway:signal:distant:shortened'] == 'no' && (!tags.hasOwnProperty('railway:signal:main')) && (tags.hasOwnProperty('railway:signal:distant:states')) && !(/.*vr2.*/.test(tags['railway:signal:distant:states']))) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'vr' && tags['railway:signal:distant:form'] == 'light' && (!tags.hasOwnProperty('railway:signal:distant:repeated')) && tags['railway:signal:distant:shortened'] == 'no' && (!tags.hasOwnProperty('railway:signal:main')) && (tags.hasOwnProperty('railway:signal:distant:states')) && !(/.*vr2.*/.test(tags['railway:signal:distant:states']))) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'vr' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:repeated'] == 'no' && (!tags.hasOwnProperty('railway:signal:distant:shortened')) && (!tags.hasOwnProperty('railway:signal:main')) && (tags.hasOwnProperty('railway:signal:distant:states')) && !(/.*vr2.*/.test(tags['railway:signal:distant:states']))) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'vr' && tags['railway:signal:distant:form'] == 'light' && (!tags.hasOwnProperty('railway:signal:distant:repeated')) && (!tags.hasOwnProperty('railway:signal:distant:shortened')) && (!tags.hasOwnProperty('railway:signal:main')) && (tags.hasOwnProperty('railway:signal:distant:states')) && !(/.*vr2.*/.test(tags['railway:signal:distant:states']))) && zoom >= 14)) {
            s_default['z-index'] = 9000;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 12;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-vr1-light-32.png';
            s_default['icon-width'] = '16';
            s_default['icon-height'] = '16';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'DE-ESO:vr' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:repeated'] == 'no' && (!tags.hasOwnProperty('railway:signal:main')) && (tags.hasOwnProperty('railway:signal:distant:states')) && /.*vr2.*/.test(tags['railway:signal:distant:states'])) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'DE-ESO:vr' && tags['railway:signal:distant:form'] == 'light' && (!tags.hasOwnProperty('railway:signal:distant:repeated')) && (!tags.hasOwnProperty('railway:signal:main')) && (tags.hasOwnProperty('railway:signal:distant:states')) && /.*vr2.*/.test(tags['railway:signal:distant:states'])) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'vr' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:repeated'] == 'no' && (!tags.hasOwnProperty('railway:signal:main')) && (tags.hasOwnProperty('railway:signal:distant:states')) && /.*vr2.*/.test(tags['railway:signal:distant:states'])) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'vr' && tags['railway:signal:distant:form'] == 'light' && (!tags.hasOwnProperty('railway:signal:distant:repeated')) && (!tags.hasOwnProperty('railway:signal:main')) && (tags.hasOwnProperty('railway:signal:distant:states')) && /.*vr2.*/.test(tags['railway:signal:distant:states'])) && zoom >= 14)) {
            s_default['z-index'] = 9000;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 12;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-vr2-light-32.png';
            s_default['icon-width'] = '16';
            s_default['icon-height'] = '16';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'DE-ESO:vr' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:repeated'] == 'yes' && (!tags.hasOwnProperty('railway:signal:main')) && (!tags.hasOwnProperty('railway:signal:distant:states'))) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'DE-ESO:vr' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:shortened'] == 'yes' && (!tags.hasOwnProperty('railway:signal:main')) && (!tags.hasOwnProperty('railway:signal:distant:states'))) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'vr' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:repeated'] == 'yes' && (!tags.hasOwnProperty('railway:signal:main')) && (!tags.hasOwnProperty('railway:signal:distant:states'))) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'vr' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:shortened'] == 'yes' && (!tags.hasOwnProperty('railway:signal:main')) && (!tags.hasOwnProperty('railway:signal:distant:states'))) && zoom >= 14)) {
            s_default['z-index'] = 8500;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 12;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-vr0-light-repeated-32.png';
            s_default['icon-width'] = '16';
            s_default['icon-height'] = '16';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'DE-ESO:vr' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:repeated'] == 'yes' && (!tags.hasOwnProperty('railway:signal:main')) && (tags.hasOwnProperty('railway:signal:distant:states')) && !(/.*vr2.*/.test(tags['railway:signal:distant:states']))) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'DE-ESO:vr' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:shortened'] == 'yes' && (!tags.hasOwnProperty('railway:signal:main')) && (tags.hasOwnProperty('railway:signal:distant:states')) && !(/.*vr2.*/.test(tags['railway:signal:distant:states']))) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'vr' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:repeated'] == 'yes' && (!tags.hasOwnProperty('railway:signal:main')) && (tags.hasOwnProperty('railway:signal:distant:states')) && !(/.*vr2.*/.test(tags['railway:signal:distant:states']))) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'vr' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:shortened'] == 'yes' && (!tags.hasOwnProperty('railway:signal:main')) && (tags.hasOwnProperty('railway:signal:distant:states')) && !(/.*vr2.*/.test(tags['railway:signal:distant:states']))) && zoom >= 14)) {
            s_default['z-index'] = 8500;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 12;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-vr1-light-repeated-32.png';
            s_default['icon-width'] = '16';
            s_default['icon-height'] = '16';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'DE-ESO:vr' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:repeated'] == 'yes' && (!tags.hasOwnProperty('railway:signal:main')) && (tags.hasOwnProperty('railway:signal:distant:states')) && /.*vr2.*/.test(tags['railway:signal:distant:states'])) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'DE-ESO:vr' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:shortened'] == 'yes' && (!tags.hasOwnProperty('railway:signal:main')) && (tags.hasOwnProperty('railway:signal:distant:states')) && /.*vr2.*/.test(tags['railway:signal:distant:states'])) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'vr' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:repeated'] == 'yes' && (!tags.hasOwnProperty('railway:signal:main')) && (tags.hasOwnProperty('railway:signal:distant:states')) && /.*vr2.*/.test(tags['railway:signal:distant:states'])) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'vr' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:shortened'] == 'yes' && (!tags.hasOwnProperty('railway:signal:main')) && (tags.hasOwnProperty('railway:signal:distant:states')) && /.*vr2.*/.test(tags['railway:signal:distant:states'])) && zoom >= 14)) {
            s_default['z-index'] = 8500;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 12;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-vr2-light-repeated-32.png';
            s_default['icon-width'] = '16';
            s_default['icon-height'] = '16';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'DE-ESO:hl' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:repeated'] == 'no' && (!tags.hasOwnProperty('railway:signal:main'))) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'DE-ESO:hl' && tags['railway:signal:distant:form'] == 'light' && (!tags.hasOwnProperty('railway:signal:distant:repeated')) && (!tags.hasOwnProperty('railway:signal:main'))) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'hl' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:repeated'] == 'no' && (!tags.hasOwnProperty('railway:signal:main'))) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'hl' && tags['railway:signal:distant:form'] == 'light' && (!tags.hasOwnProperty('railway:signal:distant:repeated')) && (!tags.hasOwnProperty('railway:signal:main'))) && zoom >= 14)) {
            s_default['z-index'] = 8500;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 12;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-hl1-distant-24.png';
            s_default['icon-width'] = '8';
            s_default['icon-height'] = '12';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'DE-ESO:db:ne2' && tags['railway:signal:distant:form'] == 'sign') && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'db:ne2' && tags['railway:signal:distant:form'] == 'sign') && zoom >= 14)) {
            s_default['z-index'] = 9000;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 11;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-ne2.png';
            s_default['icon-width'] = '10';
            s_default['icon-height'] = '16';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:minor'] == 'sh2') && zoom >= 17) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:minor'] == 'DE-ESO:sh2') && zoom >= 17)) {
            s_default['z-index'] = 4010;
            s_default['icon-image'] = 'icons/de-sh2-32.png';
            s_default['icon-width'] = '16';
            s_default['icon-height'] = '13';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:minor'] == 'DE-ESO:sh' && tags['railway:signal:minor:form'] == 'semaphore' && tags['railway:signal:minor:height'] == 'normal') && zoom >= 17) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:minor'] == 'DE-ESO:sh' && tags['railway:signal:minor:form'] == 'semaphore' && (!tags.hasOwnProperty('railway:signal:minor:height'))) && zoom >= 17) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:minor'] == 'sh' && tags['railway:signal:minor:form'] == 'semaphore' && tags['railway:signal:minor:height'] == 'normal') && zoom >= 17) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:minor'] == 'sh' && tags['railway:signal:minor:form'] == 'semaphore' && (!tags.hasOwnProperty('railway:signal:minor:height'))) && zoom >= 17)) {
            s_default['z-index'] = 4000;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 11;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-sh1-semaphore-normal-24.png';
            s_default['icon-width'] = '10';
            s_default['icon-height'] = '12';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:minor'] == 'DE-ESO:sh' && tags['railway:signal:minor:form'] == 'semaphore' && tags['railway:signal:minor:height'] == 'dwarf') && zoom >= 17) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:minor'] == 'sh' && tags['railway:signal:minor:form'] == 'semaphore' && tags['railway:signal:minor:height'] == 'dwarf') && zoom >= 17)) {
            s_default['z-index'] = 2000;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 11;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-sh0-semaphore-dwarf-24.png';
            s_default['icon-width'] = '12';
            s_default['icon-height'] = '11';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:minor'] == 'DE-ESO:sh' && tags['railway:signal:minor:form'] == 'light' && tags['railway:signal:minor:height'] == 'normal') && zoom >= 17) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:minor'] == 'DE-ESO:sh' && tags['railway:signal:minor:form'] == 'light' && (!tags.hasOwnProperty('railway:signal:minor:height'))) && zoom >= 17) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:minor'] == 'sh' && tags['railway:signal:minor:form'] == 'light' && tags['railway:signal:minor:height'] == 'normal') && zoom >= 17) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:minor'] == 'sh' && tags['railway:signal:minor:form'] == 'light' && (!tags.hasOwnProperty('railway:signal:minor:height'))) && zoom >= 17)) {
            s_default['z-index'] = 5000;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 11;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-sh1-light-normal-24.png';
            s_default['icon-width'] = '12';
            s_default['icon-height'] = '9';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:minor'] == 'DE-ESO:sh' && tags['railway:signal:minor:form'] == 'light' && tags['railway:signal:minor:height'] == 'dwarf') && zoom >= 17) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:minor'] == 'sh' && tags['railway:signal:minor:form'] == 'light' && tags['railway:signal:minor:height'] == 'dwarf') && zoom >= 17)) {
            s_default['z-index'] = 3000;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 10;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-sh0-light-dwarf-24.png';
            s_default['icon-width'] = '12';
            s_default['icon-height'] = '8';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'DE-ESO:ks' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:states'] == 'DE-ESO:ks1;DE-ESO:ks2') && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'ks' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:states'] == 'ks1;ks2') && zoom >= 14)) {
            s_default['z-index'] = 8000;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 12;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-ks-distant-32.png';
            s_default['icon-width'] = '10';
            s_default['icon-height'] = '16';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:main'] == 'DE-ESO:ks' && tags['railway:signal:main:form'] == 'light' && tags['railway:signal:main:states'] == 'DE-ESO:hp0;DE-ESO:ks1') && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:main'] == 'ks' && tags['railway:signal:main:form'] == 'light' && tags['railway:signal:main:states'] == 'hp0;ks1') && zoom >= 14)) {
            s_default['z-index'] = 10100;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 12;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-ks-main-32.png';
            s_default['icon-width'] = '10';
            s_default['icon-height'] = '16';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:combined'] == 'DE-ESO:ks' && tags['railway:signal:combined:form'] == 'light' && tags['railway:signal:combined:states'] == 'DE-ESO:hp0;DE-ESO:ks1;DE-ESO:ks2') && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:combined'] == 'ks' && tags['railway:signal:combined:form'] == 'light' && tags['railway:signal:combined:states'] == 'hp0;ks1;ks2') && zoom >= 14)) {
            s_default['z-index'] = 10200;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 12;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-ks-combined-32.png';
            s_default['icon-width'] = '8';
            s_default['icon-height'] = '16';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:stop'] == 'ne5' && tags['railway:signal:stop:form'] == 'sign') && zoom >= 17) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:stop'] == 'DE-ESO:ne5' && tags['railway:signal:stop:form'] == 'sign') && zoom >= 17)) {
            s_default['z-index'] = 1000;
            s_default['icon-image'] = 'icons/de-ne5-ds301-32.png';
            s_default['icon-width'] = '11';
            s_default['icon-height'] = '16';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'bü' && (!tags.hasOwnProperty('railway:signal:crossing:shortened')) && (!tags.hasOwnProperty('railway:signal:crossing:repeated')) && tags['railway:signal:crossing:from'] == 'sign') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'bü' && (!tags.hasOwnProperty('railway:signal:crossing:shortened')) && tags['railway:signal:crossing:repeated'] == 'no' && tags['railway:signal:crossing:from'] == 'sign') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'bü' && tags['railway:signal:crossing:shortened'] == 'no' && (!tags.hasOwnProperty('railway:signal:crossing:repeated')) && tags['railway:signal:crossing:from'] == 'sign') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'bü' && tags['railway:signal:crossing:shortened'] == 'no' && tags['railway:signal:crossing:repeated'] == 'no' && tags['railway:signal:crossing:from'] == 'sign') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'DE-ESO:bü' && (!tags.hasOwnProperty('railway:signal:crossing:shortened')) && (!tags.hasOwnProperty('railway:signal:crossing:repeated')) && tags['railway:signal:crossing:from'] == 'sign') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'DE-ESO:bü' && (!tags.hasOwnProperty('railway:signal:crossing:shortened')) && tags['railway:signal:crossing:repeated'] == 'no' && tags['railway:signal:crossing:from'] == 'sign') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'DE-ESO:bü' && tags['railway:signal:crossing:shortened'] == 'no' && (!tags.hasOwnProperty('railway:signal:crossing:repeated')) && tags['railway:signal:crossing:from'] == 'sign') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'DE-ESO:bü' && tags['railway:signal:crossing:shortened'] == 'no' && tags['railway:signal:crossing:repeated'] == 'no' && tags['railway:signal:crossing:from'] == 'sign') && zoom >= 15)) {
            s_default['z-index'] = 500;
            s_default['icon-image'] = 'icons/de-bue0-ds-32.png';
            s_default['icon-width'] = '7';
            s_default['icon-height'] = '16';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'DE-ESO:bü' && (!tags.hasOwnProperty('railway:signal:crossing:shortened')) && tags['railway:signal:crossing:repeated'] == 'yes' && tags['railway:signal:crossing:from'] == 'sign') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'DE-ESO:bü' && tags['railway:signal:crossing:shortened'] == 'no' && tags['railway:signal:crossing:repeated'] == 'yes' && tags['railway:signal:crossing:from'] == 'sign') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'bü' && (!tags.hasOwnProperty('railway:signal:crossing:shortened')) && tags['railway:signal:crossing:repeated'] == 'yes' && tags['railway:signal:crossing:from'] == 'sign') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'bü' && tags['railway:signal:crossing:shortened'] == 'no' && tags['railway:signal:crossing:repeated'] == 'yes' && tags['railway:signal:crossing:from'] == 'sign') && zoom >= 15)) {
            s_default['z-index'] = 500;
            s_default['icon-image'] = 'de-bue0-ds-repeated-42.png';
            s_default['icon-width'] = '9';
            s_default['icon-height'] = '21';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'DE-ESO:bü' && tags['railway:signal:crossing:shortened'] == 'yes' && tags['railway:signal:crossing:repeated'] == 'no' && tags['railway:signal:crossing:from'] == 'sign') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'DE-ESO:bü' && tags['railway:signal:crossing:shortened'] == 'yes' && (!tags.hasOwnProperty('railway:signal:crossing:repeated')) && tags['railway:signal:crossing:from'] == 'sign') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'bü' && tags['railway:signal:crossing:shortened'] == 'yes' && tags['railway:signal:crossing:repeated'] == 'no' && tags['railway:signal:crossing:from'] == 'sign') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'bü' && tags['railway:signal:crossing:shortened'] == 'yes' && (!tags.hasOwnProperty('railway:signal:crossing:repeated')) && tags['railway:signal:crossing:from'] == 'sign') && zoom >= 15)) {
            s_default['z-index'] = 500;
            s_default['icon-image'] = 'de-bue0-ds-shortened-42.png';
            s_default['icon-width'] = '9';
            s_default['icon-height'] = '21';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'DE-ESO:bü' && (!tags.hasOwnProperty('railway:signal:crossing:shortened')) && (!tags.hasOwnProperty('railway:signal:crossing:repeated')) && tags['railway:signal:crossing:form'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'DE-ESO:bü' && (!tags.hasOwnProperty('railway:signal:crossing:shortened')) && tags['railway:signal:crossing:repeated'] == 'no' && tags['railway:signal:crossing:from'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'DE-ESO:bü' && tags['railway:signal:crossing:shortened'] == 'no' && (!tags.hasOwnProperty('railway:signal:crossing:repeated')) && tags['railway:signal:crossing:from'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'DE-ESO:bü' && tags['railway:signal:crossing:shortened'] == 'no' && tags['railway:signal:crossing:repeated'] == 'no' && tags['railway:signal:crossing:from'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'bü' && (!tags.hasOwnProperty('railway:signal:crossing:shortened')) && (!tags.hasOwnProperty('railway:signal:crossing:repeated')) && tags['railway:signal:crossing:form'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'bü' && (!tags.hasOwnProperty('railway:signal:crossing:shortened')) && tags['railway:signal:crossing:repeated'] == 'no' && tags['railway:signal:crossing:from'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'bü' && tags['railway:signal:crossing:shortened'] == 'no' && (!tags.hasOwnProperty('railway:signal:crossing:repeated')) && tags['railway:signal:crossing:from'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'bü' && tags['railway:signal:crossing:shortened'] == 'no' && tags['railway:signal:crossing:repeated'] == 'no' && tags['railway:signal:crossing:from'] == 'light') && zoom >= 15)) {
            s_default['z-index'] = 500;
            s_default['icon-image'] = 'icons/de-bue1-ds-32.png';
            s_default['icon-width'] = '7';
            s_default['icon-height'] = '16';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'DE-ESO:bü' && (!tags.hasOwnProperty('railway:signal:crossing:shortened')) && tags['railway:signal:crossing:repeated'] == 'yes' && tags['railway:signal:crossing:from'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'DE-ESO:bü' && tags['railway:signal:crossing:shortened'] == 'no' && tags['railway:signal:crossing:repeated'] == 'yes' && tags['railway:signal:crossing:from'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'bü' && (!tags.hasOwnProperty('railway:signal:crossing:shortened')) && tags['railway:signal:crossing:repeated'] == 'yes' && tags['railway:signal:crossing:from'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'bü' && tags['railway:signal:crossing:shortened'] == 'no' && tags['railway:signal:crossing:repeated'] == 'yes' && tags['railway:signal:crossing:from'] == 'light') && zoom >= 15)) {
            s_default['z-index'] = 500;
            s_default['icon-image'] = 'de-bue1-ds-repeated-42.png';
            s_default['icon-width'] = '9';
            s_default['icon-height'] = '21';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'DE-ESO:bü' && tags['railway:signal:crossing:shortened'] == 'yes' && tags['railway:signal:crossing:repeated'] == 'no' && tags['railway:signal:crossing:from'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'DE-ESO:bü' && tags['railway:signal:crossing:shortened'] == 'yes' && (!tags.hasOwnProperty('railway:signal:crossing:repeated')) && tags['railway:signal:crossing:from'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'bü' && tags['railway:signal:crossing:shortened'] == 'yes' && tags['railway:signal:crossing:repeated'] == 'no' && tags['railway:signal:crossing:from'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'bü' && tags['railway:signal:crossing:shortened'] == 'yes' && (!tags.hasOwnProperty('railway:signal:crossing:repeated')) && tags['railway:signal:crossing:from'] == 'light') && zoom >= 15)) {
            s_default['z-index'] = 500;
            s_default['icon-image'] = 'de-bue1-ds-shortened-42.png';
            s_default['icon-width'] = '9';
            s_default['icon-height'] = '21';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'DE-ESO:so16' && (!tags.hasOwnProperty('railway:signal:crossing:shortened')) && (!tags.hasOwnProperty('railway:signal:crossing:repeated')) && tags['railway:signal:crossing:form'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'DE-ESO:so16' && (!tags.hasOwnProperty('railway:signal:crossing:shortened')) && tags['railway:signal:crossing:repeated'] == 'no' && tags['railway:signal:crossing:from'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'DE-ESO:so16' && tags['railway:signal:crossing:shortened'] == 'no' && (!tags.hasOwnProperty('railway:signal:crossing:repeated')) && tags['railway:signal:crossing:from'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'DE-ESO:so16' && tags['railway:signal:crossing:shortened'] == 'no' && tags['railway:signal:crossing:repeated'] == 'no' && tags['railway:signal:crossing:from'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'so16' && (!tags.hasOwnProperty('railway:signal:crossing:shortened')) && (!tags.hasOwnProperty('railway:signal:crossing:repeated')) && tags['railway:signal:crossing:form'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'so16' && (!tags.hasOwnProperty('railway:signal:crossing:shortened')) && tags['railway:signal:crossing:repeated'] == 'no' && tags['railway:signal:crossing:from'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'so16' && tags['railway:signal:crossing:shortened'] == 'no' && (!tags.hasOwnProperty('railway:signal:crossing:repeated')) && tags['railway:signal:crossing:from'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'so16' && tags['railway:signal:crossing:shortened'] == 'no' && tags['railway:signal:crossing:repeated'] == 'no' && tags['railway:signal:crossing:from'] == 'light') && zoom >= 15)) {
            s_default['z-index'] = 500;
            s_default['icon-image'] = 'icons/de-bue1-dv-32.png';
            s_default['icon-width'] = '7';
            s_default['icon-height'] = '16';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'DE-ESO:so16' && (!tags.hasOwnProperty('railway:signal:crossing:shortened')) && tags['railway:signal:crossing:repeated'] == 'yes' && tags['railway:signal:crossing:from'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'DE-ESO:so16' && tags['railway:signal:crossing:shortened'] == 'no' && tags['railway:signal:crossing:repeated'] == 'yes' && tags['railway:signal:crossing:from'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'so16' && (!tags.hasOwnProperty('railway:signal:crossing:shortened')) && tags['railway:signal:crossing:repeated'] == 'yes' && tags['railway:signal:crossing:from'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'so16' && tags['railway:signal:crossing:shortened'] == 'no' && tags['railway:signal:crossing:repeated'] == 'yes' && tags['railway:signal:crossing:from'] == 'light') && zoom >= 15)) {
            s_default['z-index'] = 500;
            s_default['icon-image'] = 'de-bue1-dv-repeated-42.png';
            s_default['icon-width'] = '9';
            s_default['icon-height'] = '21';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'DE-ESO:so16' && tags['railway:signal:crossing:shortened'] == 'yes' && tags['railway:signal:crossing:repeated'] == 'no' && tags['railway:signal:crossing:from'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'DE-ESO:so16' && tags['railway:signal:crossing:shortened'] == 'yes' && (!tags.hasOwnProperty('railway:signal:crossing:repeated')) && tags['railway:signal:crossing:from'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'so16' && tags['railway:signal:crossing:shortened'] == 'yes' && tags['railway:signal:crossing:repeated'] == 'no' && tags['railway:signal:crossing:from'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'so16' && tags['railway:signal:crossing:shortened'] == 'yes' && (!tags.hasOwnProperty('railway:signal:crossing:repeated')) && tags['railway:signal:crossing:from'] == 'light') && zoom >= 15)) {
            s_default['z-index'] = 500;
            s_default['icon-image'] = 'de-bue1-dv-shortened-42.png';
            s_default['icon-width'] = '9';
            s_default['icon-height'] = '21';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing_distant'] == 'DE-ESO:bü2' && (!tags.hasOwnProperty('railway:signal:crossing_distant:shortened'))) && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing_distant'] == 'DE-ESO:bü2' && tags['railway:signal:crossing_distant:shortened'] == 'no') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing_distant'] == 'bü2' && (!tags.hasOwnProperty('railway:signal:crossing_distant:shortened'))) && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing_distant'] == 'bü2' && tags['railway:signal:crossing_distant:shortened'] == 'no') && zoom >= 15)) {
            s_default['z-index'] = 500;
            s_default['icon-image'] = 'icons/de-bue2-ds-56.png';
            s_default['icon-width'] = '7';
            s_default['icon-height'] = '28';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing_distant'] == 'DE-ESO:bü2' && tags['railway:signal:crossing_distant:shortened'] == 'yes') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing_distant'] == 'bü2' && tags['railway:signal:crossing_distant:shortened'] == 'yes') && zoom >= 15)) {
            s_default['z-index'] = 500;
            s_default['icon-image'] = 'icons/de-bue2-ds-reduced-distance-56.png';
            s_default['icon-width'] = '7';
            s_default['icon-height'] = '28';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:whistle'] == 'DE-ESO:db:bü4') && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:whistle'] == 'db:bü4') && zoom >= 14)) {
            s_default['z-index'] = 500;
            s_default['icon-image'] = 'icons/de-bue4-ds-32.png';
            s_default['icon-width'] = '11';
            s_default['icon-height'] = '16';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:whistle'] == 'DE-ESO:db:bü4' && tags['railway:signal:ring:only_transit'] == 'yes') && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:whistle'] == 'db:bü4' && tags['railway:signal:ring:only_transit'] == 'yes') && zoom >= 14)) {
            s_default['z-index'] = 500;
            s_default['icon-image'] = 'icons/de-bue4-ds-only-transit-43.png';
            s_default['icon-width'] = '12';
            s_default['icon-height'] = '21';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:whistle'] == 'DE-ESO:dr:pf1') && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:whistle'] == 'dr:pf1') && zoom >= 14)) {
            s_default['z-index'] = 500;
            s_default['icon-image'] = 'icons/de-pf1-dv-32.png';
            s_default['icon-width'] = '11';
            s_default['icon-height'] = '16';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:whistle'] == 'DE-ESO:db:pf1' && tags['railway:signal:ring:only_transit'] == 'yes') && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:whistle'] == 'db:pf1' && tags['railway:signal:ring:only_transit'] == 'yes') && zoom >= 14)) {
            s_default['z-index'] = 500;
            s_default['icon-image'] = 'icons/de-pf1-dv-only-transit-43.png';
            s_default['icon-width'] = '12';
            s_default['icon-height'] = '21';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:ring'] == 'DE-ESO:bü5') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:ring'] == 'bü5') && zoom >= 15)) {
            s_default['z-index'] = 500;
            s_default['icon-image'] = 'icons/de-bue5-ds-32.png';
            s_default['icon-width'] = '11';
            s_default['icon-height'] = '16';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:ring'] == 'DE-ESO:bü5' && tags['railway:signal:ring:only_transit'] == 'yes') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:ring'] == 'bü5' && tags['railway:signal:ring:only_transit'] == 'yes') && zoom >= 15)) {
            s_default['z-index'] = 500;
            s_default['icon-image'] = 'icons/de-bue5-only-transit-43.png';
            s_default['icon-width'] = '12';
            s_default['icon-height'] = '21';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:station_distant'] == 'DE-ESO:ne6' && tags['railway:signal:station_distant:form'] == 'sign') && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:station_distant'] == 'ne6' && tags['railway:signal:station_distant:form'] == 'sign') && zoom >= 14)) {
            s_default['z-index'] = 550;
            s_default['icon-image'] = 'icons/de-ne6-48.png';
            s_default['icon-width'] = '24';
            s_default['icon-height'] = '5';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:main'] == 'AT:trapeztafel' && tags['railway:signal:main:form'] == 'sign' && tags['railway:signal:main:function'] == 'entry') && zoom >= 14)) {
            s_default['z-index'] = 1000;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 11;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-ne1-32.png';
            s_default['icon-width'] = '16';
            s_default['icon-height'] = '10';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'way' && tags['railway'] == 'tram') && zoom >= 10) || ((type == 'way' && tags['railway'] == 'subway') && zoom >= 10) || ((type == 'way' && tags['railway'] == 'light_rail') && zoom >= 10) || ((type == 'way' && tags['railway'] == 'narrow_gauge') && zoom >= 9) || ((type == 'way' && tags['railway'] == 'preserved') && zoom >= 9) || ((type == 'way' && tags['railway'] == 'rail') && zoom >= 10) || ((type == 'way' && tags['railway'] == 'rail' && tags['usage'] == 'main') && zoom >= 2) || ((type == 'way' && tags['railway'] == 'rail' && tags['usage'] == 'branch') && zoom >= 2)) {
            s_default['z-index'] = 0;
            s_default['color'] = 'gray';
            s_default['width'] = 3.5;
            s_default['linejoin'] = 'round';
            s_default['kothicjs-ignore-layer'] = 'true';
        }

        if (Object.keys(s_default).length) {
            style['default'] = s_default; }
        return style;
    }
    
    var sprite_images = {
        'icons/de-bue0-ds-32.png': {
            width: 14, 
            height: 32, 
            offset: 0
        },
        'icons/de-bue1-ds-32.png': {
            width: 13, 
            height: 32, 
            offset: 32
        },
        'icons/de-bue1-dv-32.png': {
            width: 15, 
            height: 32, 
            offset: 64
        },
        'icons/de-bue2-ds-56.png': {
            width: 14, 
            height: 56, 
            offset: 96
        },
        'icons/de-bue2-ds-reduced-distance-56.png': {
            width: 14, 
            height: 56, 
            offset: 152
        },
        'icons/de-bue4-ds-32.png': {
            width: 22, 
            height: 32, 
            offset: 208
        },
        'icons/de-bue4-ds-only-transit-43.png': {
            width: 24, 
            height: 43, 
            offset: 240
        },
        'icons/de-bue5-only-transit-43.png': {
            width: 24, 
            height: 43, 
            offset: 283
        },
        'icons/de-hl0-32.png': {
            width: 15, 
            height: 32, 
            offset: 326
        },
        'icons/de-hl1-32.png': {
            width: 15, 
            height: 32, 
            offset: 358
        },
        'icons/de-hl1-distant-24.png': {
            width: 16, 
            height: 24, 
            offset: 390
        },
        'icons/de-hl10-32.png': {
            width: 15, 
            height: 32, 
            offset: 414
        },
        'icons/de-hl11-48.png': {
            width: 16, 
            height: 48, 
            offset: 446
        },
        'icons/de-hl12a-32.png': {
            width: 15, 
            height: 32, 
            offset: 494
        },
        'icons/de-hl12b-48.png': {
            width: 16, 
            height: 48, 
            offset: 526
        },
        'icons/de-hl2-48.png': {
            width: 16, 
            height: 48, 
            offset: 574
        },
        'icons/de-hl3a-32.png': {
            width: 15, 
            height: 32, 
            offset: 622
        },
        'icons/de-hl3b-48.png': {
            width: 16, 
            height: 48, 
            offset: 654
        },
        'icons/de-hp0-light-32.png': {
            width: 17, 
            height: 32, 
            offset: 702
        },
        'icons/de-hp0-semaphore-32.png': {
            width: 32, 
            height: 32, 
            offset: 734
        },
        'icons/de-hp1-light-32.png': {
            width: 17, 
            height: 32, 
            offset: 766
        },
        'icons/de-hp1-semaphore-38.png': {
            width: 24, 
            height: 38, 
            offset: 798
        },
        'icons/de-hp2-light-32.png': {
            width: 17, 
            height: 32, 
            offset: 836
        },
        'icons/de-hp2-semaphore-40.png': {
            width: 25, 
            height: 40, 
            offset: 868
        },
        'icons/de-ks-combined-32.png': {
            width: 16, 
            height: 32, 
            offset: 908
        },
        'icons/de-ks-distant-32.png': {
            width: 21, 
            height: 32, 
            offset: 940
        },
        'icons/de-ks-main-32.png': {
            width: 21, 
            height: 32, 
            offset: 972
        },
        'icons/de-ne1-32.png': {
            width: 32, 
            height: 20, 
            offset: 1004
        },
        'icons/de-ne5-ds301-32.png': {
            width: 22, 
            height: 32, 
            offset: 1024
        },
        'icons/de-ne6-48.png': {
            width: 48, 
            height: 10, 
            offset: 1056
        },
        'icons/de-pf1-dv-32.png': {
            width: 22, 
            height: 32, 
            offset: 1066
        },
        'icons/de-pf1-dv-only-transit-43.png': {
            width: 24, 
            height: 43, 
            offset: 1098
        },
        'icons/de-sh0-light-dwarf-24.png': {
            width: 24, 
            height: 15, 
            offset: 1141
        },
        'icons/de-sh0-semaphore-dwarf-24.png': {
            width: 24, 
            height: 22, 
            offset: 1156
        },
        'icons/de-sh1-light-normal-24.png': {
            width: 24, 
            height: 18, 
            offset: 1178
        },
        'icons/de-sh1-semaphore-normal-24.png': {
            width: 21, 
            height: 24, 
            offset: 1196
        },
        'icons/de-sh2-32.png': {
            width: 32, 
            height: 26, 
            offset: 1220
        },
        'icons/de-sv-hp0-16.png': {
            width: 8, 
            height: 16, 
            offset: 1246
        },
        'icons/de-sv-sv0-16.png': {
            width: 8, 
            height: 16, 
            offset: 1262
        },
        'icons/de-vr0-light-32.png': {
            width: 31, 
            height: 32, 
            offset: 1278
        },
        'icons/de-vr0-light-repeated-32.png': {
            width: 31, 
            height: 32, 
            offset: 1310
        },
        'icons/de-vr0-semaphore-52.png': {
            width: 24, 
            height: 53, 
            offset: 1342
        },
        'icons/de-vr1-light-32.png': {
            width: 31, 
            height: 32, 
            offset: 1395
        },
        'icons/de-vr1-light-repeated-32.png': {
            width: 31, 
            height: 32, 
            offset: 1427
        },
        'icons/de-vr1-semaphore-38.png': {
            width: 24, 
            height: 38, 
            offset: 1459
        },
        'icons/de-vr2-light-32.png': {
            width: 31, 
            height: 32, 
            offset: 1497
        },
        'icons/de-vr2-light-repeated-32.png': {
            width: 31, 
            height: 32, 
            offset: 1529
        },
        'icons/de-vr2-semaphore-53.png': {
            width: 24, 
            height: 53, 
            offset: 1561
        }
    }, external_images = ['de-bue0-ds-repeated-42.png', 'de-bue0-ds-shortened-42.png', 'de-bue1-ds-repeated-42.png', 'de-bue1-ds-shortened-42.png', 'de-bue1-dv-repeated-42.png', 'de-bue1-dv-shortened-42.png', 'icons/de-bue5-ds-32.png', 'icons/de-ne2.png'], presence_tags = [], value_tags = ['ref', 'railway:signal:stop:form', 'railway:signal:whistle', 'railway:signal:stop', 'railway:signal:minor', 'railway:signal:ring:only_transit', 'railway:signal:crossing_distant', 'railway:signal:main:function', 'railway:signal:crossing:from', 'railway:signal:crossing:repeated', 'railway:signal:minor:form', 'railway:signal:crossing_distant:shortened', 'railway:signal:distant', 'railway:signal:combined:form', 'railway:signal:distant:form', 'railway:signal:distant:shortened', 'railway', 'railway:signal:minor:height', 'railway:signal:crossing:shortened', 'railway:signal:main', 'railway:signal:station_distant', 'railway:signal:main:form', 'railway:signal:combined', 'railway:signal:combined:states', 'railway:signal:ring', 'railway:signal:crossing:form', 'railway:signal:crossing', 'railway:signal:main:states', 'railway:signal:station_distant:form', 'railway:signal:distant:states', 'usage', 'railway:signal:distant:repeated'];

    MapCSS.loadStyle('signals', restyle, sprite_images, external_images, presence_tags, value_tags);
    MapCSS.preloadExternalImages('signals');
})(MapCSS);
    