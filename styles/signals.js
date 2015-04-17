
(function (MapCSS) {
    'use strict';

    function restyle(style, tags, zoom, type, selector) {
        var s_default = {}, s_deactivatedcross = {}, s_blockkennzeichen = {};

        if ((selector == 'meta')) {
            s_default['title'] = 'OpenRailwayMap signalling layer';
            s_default['version'] = '0';
            s_default['description'] = 'Style for a signalling layer railroad network map.';
            s_default['author'] = 'rurseekatze';
            s_default['link'] = 'http://wiki.openstreetmap.org/wiki/OpenRailwayMap';
            s_default['watch-modified'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:main:deactivated'] == 'yes') && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant:deactivated'] == 'yes') && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:combined:deactivated'] == 'yes') && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:shunting:deactivated'] == 'yes') && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:main_repeated:deactivated'] == 'yes') && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:minor:deactivated'] == 'yes') && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:minor_distant:deactivated'] == 'yes') && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing:deactivated'] == 'yes') && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing_distant:deactivated'] == 'yes') && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:humping:deactivated'] == 'yes') && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit:deactivated'] == 'yes') && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:speed_limit_distant:deactivated'] == 'yes') && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:route:deactivated'] == 'yes') && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:route_distant:deactivated'] == 'yes') && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:wrong_road:deactivated'] == 'yes') && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:stop_demand:deactivated'] == 'yes') && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:departure:deactivated'] == 'yes') && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:resetting_switch:deactivated'] == 'yes') && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:short_route:deactivated'] == 'yes') && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:brake_test:deactivated'] == 'yes') && zoom >= 14)) {
            s_deactivatedcross['z-index'] = 11000;
            s_deactivatedcross['icon-image'] = 'icons/light-signal-deactivated-18.png';
            s_deactivatedcross['icon-width'] = '9';
            s_deactivatedcross['icon-height'] = '9';
            s_deactivatedcross['text-allow-overlap'] = 'true';
            s_deactivatedcross['allow-overlap'] = 'true';
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

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'DE-ESO:so106' && tags['railway:signal:distant:form'] == 'sign') && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'so106' && tags['railway:signal:distant:form'] == 'sign') && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'AT-V2:kreuztafel' && tags['railway:signal:distant:form'] == 'sign') && zoom >= 14)) {
            s_default['z-index'] = 9000;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 11;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-so106-32.png';
            s_default['icon-width'] = '16';
            s_default['icon-height'] = '11';
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

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:train_protection'] == 'DE-ESO:blockkennzeichen') && zoom >= 14 && zoom <= 15)) {
            s_default['z-index'] = 8500;
            s_default['icon-image'] = 'icons/de-blockkennzeichen-28.png';
            s_default['icon-width'] = '14';
            s_default['icon-height'] = '14';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:train_protection'] == 'DE-ESO:blockkennzeichen') && zoom >= 16)) {
            s_default['z-index'] = 8500;
            s_default['icon-image'] = 'icons/de-blockkennzeichen-40.png';
            s_default['icon-width'] = '20';
            s_default['icon-height'] = '20';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:train_protection'] == 'DE-ESO:blockkennzeichen') && zoom >= 16 && zoom <= 17)) {
            s_blockkennzeichen['z-index'] = 8510;
            s_blockkennzeichen['text'] = MapCSS.e_localize(tags, 'ref');
            s_blockkennzeichen['text-size'] = '12';
            s_blockkennzeichen['text-offset-x'] = '-28';
            s_blockkennzeichen['text-offset-y'] = '12';
            s_blockkennzeichen['text-color'] = 'black';
            s_blockkennzeichen['text-halo-radius'] = 1;
            s_blockkennzeichen['text-halo-color'] = 'white';
            s_blockkennzeichen['font-weight'] = 'bold';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:train_protection'] == 'DE-ESO:blockkennzeichen') && zoom >= 18)) {
            s_blockkennzeichen['z-index'] = 8500;
            s_blockkennzeichen['text'] = MapCSS.e_localize(tags, 'ref');
            s_blockkennzeichen['text-size'] = '12';
            s_blockkennzeichen['text-offset-x'] = '-28';
            s_blockkennzeichen['text-offset-y'] = '12';
            s_blockkennzeichen['text-color'] = 'black';
            s_blockkennzeichen['text-halo-radius'] = 1;
            s_blockkennzeichen['text-halo-color'] = 'white';
            s_blockkennzeichen['font-weight'] = 'bold';
            s_blockkennzeichen['text-allow-overlap'] = 'true';
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

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:shunting'] == 'ra11' && tags['railway:signal:shunting:form'] == 'sign') && zoom >= 17) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:shunting'] == 'DE-ESO:ra11' && tags['railway:signal:shunting:form'] == 'sign') && zoom >= 17) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:shunting'] == 'AT-V2:wartesignal' && tags['railway:signal:shunting:form'] == 'sign') && zoom >= 17)) {
            s_default['z-index'] = 2800;
            s_default['icon-image'] = 'icons/de-ra11-sign-32.png';
            s_default['icon-width'] = '16';
            s_default['icon-height'] = '11';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:shunting'] == 'ra11' && tags['railway:signal:shunting:form'] == 'light' && tags['railway:signal:shunting:states'] == 'ra11;sh1') && zoom >= 17) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:shunting'] == 'DE-ESO:ra11' && tags['railway:signal:shunting:form'] == 'light' && tags['railway:signal:shunting:states'] == 'DE-ESO:ra11;DE-ESO:sh1') && zoom >= 17)) {
            s_default['z-index'] = 2800;
            s_default['icon-image'] = 'icons/de-ra11-sh1-30.png';
            s_default['icon-width'] = '14';
            s_default['icon-height'] = '15';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:shunting'] == 'ra11b' && tags['railway:signal:shunting:form'] == 'sign' && tags['railway:signal:shunting:form'] == 'sign') && zoom >= 17) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:shunting'] == 'DE-ESO:ra11b' && tags['railway:signal:shunting:form'] == 'sign' && tags['railway:signal:shunting:form'] == 'sign') && zoom >= 17)) {
            s_default['z-index'] = 2800;
            s_default['icon-image'] = 'icons/de-ra11b-32.png';
            s_default['icon-width'] = '16';
            s_default['icon-height'] = '11';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'DE-ESO:ks' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:states'] == 'DE-ESO:ks1;DE-ESO:ks2' && tags['railway:signal:distant:shortened'] == 'no' && tags['railway:signal:distant:repeated'] == 'no') && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'DE-ESO:ks' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:states'] == 'DE-ESO:ks1;DE-ESO:ks2' && (!tags.hasOwnProperty('railway:signal:distant:shortened')) && tags['railway:signal:distant:repeated'] == 'no') && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'DE-ESO:ks' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:states'] == 'DE-ESO:ks1;DE-ESO:ks2' && tags['railway:signal:distant:shortened'] == 'no' && (!tags.hasOwnProperty('railway:signal:distant:repeated'))) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'DE-ESO:ks' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:states'] == 'DE-ESO:ks1;DE-ESO:ks2' && (!tags.hasOwnProperty('railway:signal:distant:shortened')) && (!tags.hasOwnProperty('railway:signal:distant:repeated'))) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'ks' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:states'] == 'ks1;ks2' && tags['railway:signal:distant:shortened'] == 'no' && tags['railway:signal:distant:repeated'] == 'no') && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'ks' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:states'] == 'ks1;ks2' && tags['railway:signal:distant:shortened'] == 'no' && (!tags.hasOwnProperty('railway:signal:distant:repeated'))) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'ks' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:states'] == 'ks1;ks2' && (!tags.hasOwnProperty('railway:signal:distant:shortened')) && tags['railway:signal:distant:repeated'] == 'no') && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'ks' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:states'] == 'ks1;ks2' && (!tags.hasOwnProperty('railway:signal:distant:shortened')) && (!tags.hasOwnProperty('railway:signal:distant:repeated'))) && zoom >= 14)) {
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

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'DE-ESO:ks' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:states'] == 'DE-ESO:ks1;DE-ESO:ks2' && tags['railway:signal:distant:repeated'] == 'yes') && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'ks' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:states'] == 'ks1;ks2' && tags['railway:signal:distant:repeated'] == 'yes') && zoom >= 14)) {
            s_default['z-index'] = 8000;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 12;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-ks-distant-repeated-32.png';
            s_default['icon-width'] = '10';
            s_default['icon-height'] = '16';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'DE-ESO:ks' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:states'] == 'DE-ESO:ks1;DE-ESO:ks2' && tags['railway:signal:distant:shortened'] == 'yes') && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'ks' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:states'] == 'ks1;ks2' && tags['railway:signal:distant:shortened'] == 'yes') && zoom >= 14)) {
            s_default['z-index'] = 8000;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 12;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-ks-distant-shortened-32.png';
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

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:combined'] == 'DE-ESO:ks' && tags['railway:signal:combined:form'] == 'light' && tags['railway:signal:combined:states'] == 'DE-ESO:hp0;DE-ESO:ks1;DE-ESO:ks2' && tags['railway:signal:combined:shortened'] == 'no') && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:combined'] == 'DE-ESO:ks' && tags['railway:signal:combined:form'] == 'light' && tags['railway:signal:combined:states'] == 'DE-ESO:hp0;DE-ESO:ks1;DE-ESO:ks2' && (!tags.hasOwnProperty('railway:signal:combined:shortened'))) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:combined'] == 'ks' && tags['railway:signal:combined:form'] == 'light' && tags['railway:signal:combined:states'] == 'hp0;ks1;ks2' && tags['railway:signal:combined:shortened'] == 'no') && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:combined'] == 'ks' && tags['railway:signal:combined:form'] == 'light' && tags['railway:signal:combined:states'] == 'hp0;ks1;ks2' && (!tags.hasOwnProperty('railway:signal:combined:shortened'))) && zoom >= 14)) {
            s_default['z-index'] = 10200;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 12;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-ks-combined-32.png';
            s_default['icon-width'] = '10';
            s_default['icon-height'] = '16';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:combined'] == 'DE-ESO:ks' && tags['railway:signal:combined:form'] == 'light' && tags['railway:signal:combined:states'] == 'DE-ESO:hp0;DE-ESO:ks1;DE-ESO:ks2' && tags['railway:signal:combined:shortened'] == 'yes') && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:combined'] == 'ks' && tags['railway:signal:combined:form'] == 'light' && tags['railway:signal:combined:states'] == 'hp0;ks1;ks2' && tags['railway:signal:combined:shortened'] == 'yes') && zoom >= 14)) {
            s_default['z-index'] = 10200;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 12;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-ks-combined-shortened-32.png';
            s_default['icon-width'] = '10';
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

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:shunting'] == 'ra10' && tags['railway:signal:shunting:form'] == 'sign') && zoom >= 17) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:shunting'] == 'DE-ESO:ra10' && tags['railway:signal:shunting:form'] == 'sign') && zoom >= 17) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:shunting'] == 'AT-V2:verschubhalttafel' && tags['railway:signal:shunting:form'] == 'sign') && zoom >= 17)) {
            s_default['z-index'] = 1010;
            s_default['icon-image'] = 'icons/de-ra10-32.png';
            s_default['icon-width'] = '16';
            s_default['icon-height'] = '11';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'bü' && (!tags.hasOwnProperty('railway:signal:crossing:shortened')) && (!tags.hasOwnProperty('railway:signal:crossing:repeated')) && tags['railway:signal:crossing:form'] == 'sign') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'bü' && (!tags.hasOwnProperty('railway:signal:crossing:shortened')) && tags['railway:signal:crossing:repeated'] == 'no' && tags['railway:signal:crossing:form'] == 'sign') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'bü' && tags['railway:signal:crossing:shortened'] == 'no' && (!tags.hasOwnProperty('railway:signal:crossing:repeated')) && tags['railway:signal:crossing:form'] == 'sign') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'bü' && tags['railway:signal:crossing:shortened'] == 'no' && tags['railway:signal:crossing:repeated'] == 'no' && tags['railway:signal:crossing:form'] == 'sign') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'DE-ESO:bü' && (!tags.hasOwnProperty('railway:signal:crossing:shortened')) && (!tags.hasOwnProperty('railway:signal:crossing:repeated')) && tags['railway:signal:crossing:form'] == 'sign') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'DE-ESO:bü' && (!tags.hasOwnProperty('railway:signal:crossing:shortened')) && tags['railway:signal:crossing:repeated'] == 'no' && tags['railway:signal:crossing:form'] == 'sign') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'DE-ESO:bü' && tags['railway:signal:crossing:shortened'] == 'no' && (!tags.hasOwnProperty('railway:signal:crossing:repeated')) && tags['railway:signal:crossing:form'] == 'sign') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'DE-ESO:bü' && tags['railway:signal:crossing:shortened'] == 'no' && tags['railway:signal:crossing:repeated'] == 'no' && tags['railway:signal:crossing:form'] == 'sign') && zoom >= 15)) {
            s_default['z-index'] = 500;
            s_default['icon-image'] = 'icons/de-bue0-ds-32.png';
            s_default['icon-width'] = '7';
            s_default['icon-height'] = '16';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'DE-ESO:bü' && (!tags.hasOwnProperty('railway:signal:crossing:shortened')) && tags['railway:signal:crossing:repeated'] == 'yes' && tags['railway:signal:crossing:form'] == 'sign') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'DE-ESO:bü' && tags['railway:signal:crossing:shortened'] == 'no' && tags['railway:signal:crossing:repeated'] == 'yes' && tags['railway:signal:crossing:form'] == 'sign') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'bü' && (!tags.hasOwnProperty('railway:signal:crossing:shortened')) && tags['railway:signal:crossing:repeated'] == 'yes' && tags['railway:signal:crossing:form'] == 'sign') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'bü' && tags['railway:signal:crossing:shortened'] == 'no' && tags['railway:signal:crossing:repeated'] == 'yes' && tags['railway:signal:crossing:form'] == 'sign') && zoom >= 15)) {
            s_default['z-index'] = 500;
            s_default['icon-image'] = 'de-bue0-ds-repeated-42.png';
            s_default['icon-width'] = '9';
            s_default['icon-height'] = '21';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'DE-ESO:bü' && tags['railway:signal:crossing:shortened'] == 'yes' && tags['railway:signal:crossing:repeated'] == 'no' && tags['railway:signal:crossing:form'] == 'sign') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'DE-ESO:bü' && tags['railway:signal:crossing:shortened'] == 'yes' && (!tags.hasOwnProperty('railway:signal:crossing:repeated')) && tags['railway:signal:crossing:form'] == 'sign') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'bü' && tags['railway:signal:crossing:shortened'] == 'yes' && tags['railway:signal:crossing:repeated'] == 'no' && tags['railway:signal:crossing:form'] == 'sign') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'bü' && tags['railway:signal:crossing:shortened'] == 'yes' && (!tags.hasOwnProperty('railway:signal:crossing:repeated')) && tags['railway:signal:crossing:form'] == 'sign') && zoom >= 15)) {
            s_default['z-index'] = 500;
            s_default['icon-image'] = 'de-bue0-ds-shortened-42.png';
            s_default['icon-width'] = '9';
            s_default['icon-height'] = '21';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'DE-ESO:bü' && (!tags.hasOwnProperty('railway:signal:crossing:shortened')) && (!tags.hasOwnProperty('railway:signal:crossing:repeated')) && tags['railway:signal:crossing:form'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'DE-ESO:bü' && (!tags.hasOwnProperty('railway:signal:crossing:shortened')) && tags['railway:signal:crossing:repeated'] == 'no' && tags['railway:signal:crossing:form'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'DE-ESO:bü' && tags['railway:signal:crossing:shortened'] == 'no' && (!tags.hasOwnProperty('railway:signal:crossing:repeated')) && tags['railway:signal:crossing:form'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'DE-ESO:bü' && tags['railway:signal:crossing:shortened'] == 'no' && tags['railway:signal:crossing:repeated'] == 'no' && tags['railway:signal:crossing:form'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'bü' && (!tags.hasOwnProperty('railway:signal:crossing:shortened')) && (!tags.hasOwnProperty('railway:signal:crossing:repeated')) && tags['railway:signal:crossing:form'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'bü' && (!tags.hasOwnProperty('railway:signal:crossing:shortened')) && tags['railway:signal:crossing:repeated'] == 'no' && tags['railway:signal:crossing:form'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'bü' && tags['railway:signal:crossing:shortened'] == 'no' && (!tags.hasOwnProperty('railway:signal:crossing:repeated')) && tags['railway:signal:crossing:form'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'bü' && tags['railway:signal:crossing:shortened'] == 'no' && tags['railway:signal:crossing:repeated'] == 'no' && tags['railway:signal:crossing:form'] == 'light') && zoom >= 15)) {
            s_default['z-index'] = 500;
            s_default['icon-image'] = 'icons/de-bue1-ds-32.png';
            s_default['icon-width'] = '7';
            s_default['icon-height'] = '16';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'DE-ESO:bü' && (!tags.hasOwnProperty('railway:signal:crossing:shortened')) && tags['railway:signal:crossing:repeated'] == 'yes' && tags['railway:signal:crossing:form'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'DE-ESO:bü' && tags['railway:signal:crossing:shortened'] == 'no' && tags['railway:signal:crossing:repeated'] == 'yes' && tags['railway:signal:crossing:form'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'bü' && (!tags.hasOwnProperty('railway:signal:crossing:shortened')) && tags['railway:signal:crossing:repeated'] == 'yes' && tags['railway:signal:crossing:form'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'bü' && tags['railway:signal:crossing:shortened'] == 'no' && tags['railway:signal:crossing:repeated'] == 'yes' && tags['railway:signal:crossing:form'] == 'light') && zoom >= 15)) {
            s_default['z-index'] = 500;
            s_default['icon-image'] = 'de-bue1-ds-repeated-42.png';
            s_default['icon-width'] = '9';
            s_default['icon-height'] = '21';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'DE-ESO:bü' && tags['railway:signal:crossing:shortened'] == 'yes' && tags['railway:signal:crossing:repeated'] == 'no' && tags['railway:signal:crossing:form'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'DE-ESO:bü' && tags['railway:signal:crossing:shortened'] == 'yes' && (!tags.hasOwnProperty('railway:signal:crossing:repeated')) && tags['railway:signal:crossing:form'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'bü' && tags['railway:signal:crossing:shortened'] == 'yes' && tags['railway:signal:crossing:repeated'] == 'no' && tags['railway:signal:crossing:form'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'bü' && tags['railway:signal:crossing:shortened'] == 'yes' && (!tags.hasOwnProperty('railway:signal:crossing:repeated')) && tags['railway:signal:crossing:form'] == 'light') && zoom >= 15)) {
            s_default['z-index'] = 500;
            s_default['icon-image'] = 'de-bue1-ds-shortened-42.png';
            s_default['icon-width'] = '9';
            s_default['icon-height'] = '21';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'DE-ESO:so16' && (!tags.hasOwnProperty('railway:signal:crossing:shortened')) && (!tags.hasOwnProperty('railway:signal:crossing:repeated')) && tags['railway:signal:crossing:form'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'DE-ESO:so16' && (!tags.hasOwnProperty('railway:signal:crossing:shortened')) && tags['railway:signal:crossing:repeated'] == 'no' && tags['railway:signal:crossing:form'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'DE-ESO:so16' && tags['railway:signal:crossing:shortened'] == 'no' && (!tags.hasOwnProperty('railway:signal:crossing:repeated')) && tags['railway:signal:crossing:form'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'DE-ESO:so16' && tags['railway:signal:crossing:shortened'] == 'no' && tags['railway:signal:crossing:repeated'] == 'no' && tags['railway:signal:crossing:form'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'so16' && (!tags.hasOwnProperty('railway:signal:crossing:shortened')) && (!tags.hasOwnProperty('railway:signal:crossing:repeated')) && tags['railway:signal:crossing:form'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'so16' && (!tags.hasOwnProperty('railway:signal:crossing:shortened')) && tags['railway:signal:crossing:repeated'] == 'no' && tags['railway:signal:crossing:form'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'so16' && tags['railway:signal:crossing:shortened'] == 'no' && (!tags.hasOwnProperty('railway:signal:crossing:repeated')) && tags['railway:signal:crossing:form'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'so16' && tags['railway:signal:crossing:shortened'] == 'no' && tags['railway:signal:crossing:repeated'] == 'no' && tags['railway:signal:crossing:form'] == 'light') && zoom >= 15)) {
            s_default['z-index'] = 500;
            s_default['icon-image'] = 'icons/de-bue1-dv-32.png';
            s_default['icon-width'] = '7';
            s_default['icon-height'] = '16';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'DE-ESO:so16' && (!tags.hasOwnProperty('railway:signal:crossing:shortened')) && tags['railway:signal:crossing:repeated'] == 'yes' && tags['railway:signal:crossing:form'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'DE-ESO:so16' && tags['railway:signal:crossing:shortened'] == 'no' && tags['railway:signal:crossing:repeated'] == 'yes' && tags['railway:signal:crossing:form'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'so16' && (!tags.hasOwnProperty('railway:signal:crossing:shortened')) && tags['railway:signal:crossing:repeated'] == 'yes' && tags['railway:signal:crossing:form'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'so16' && tags['railway:signal:crossing:shortened'] == 'no' && tags['railway:signal:crossing:repeated'] == 'yes' && tags['railway:signal:crossing:form'] == 'light') && zoom >= 15)) {
            s_default['z-index'] = 500;
            s_default['icon-image'] = 'de-bue1-dv-repeated-42.png';
            s_default['icon-width'] = '9';
            s_default['icon-height'] = '21';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'DE-ESO:so16' && tags['railway:signal:crossing:shortened'] == 'yes' && tags['railway:signal:crossing:repeated'] == 'no' && tags['railway:signal:crossing:form'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'DE-ESO:so16' && tags['railway:signal:crossing:shortened'] == 'yes' && (!tags.hasOwnProperty('railway:signal:crossing:repeated')) && tags['railway:signal:crossing:form'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'so16' && tags['railway:signal:crossing:shortened'] == 'yes' && tags['railway:signal:crossing:repeated'] == 'no' && tags['railway:signal:crossing:form'] == 'light') && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing'] == 'so16' && tags['railway:signal:crossing:shortened'] == 'yes' && (!tags.hasOwnProperty('railway:signal:crossing:repeated')) && tags['railway:signal:crossing:form'] == 'light') && zoom >= 15)) {
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
        if (Object.keys(s_deactivatedcross).length) {
            style['deactivatedcross'] = s_deactivatedcross; }
        if (Object.keys(s_blockkennzeichen).length) {
            style['blockkennzeichen'] = s_blockkennzeichen; }
        return style;
    }
    
    var sprite_images = {
        'icons/de-blockkennzeichen-28.png': {
            width: 28, 
            height: 28, 
            offset: 0
        },
        'icons/de-blockkennzeichen-40.png': {
            width: 40, 
            height: 40, 
            offset: 28
        },
        'icons/de-bue0-ds-32.png': {
            width: 14, 
            height: 32, 
            offset: 68
        },
        'icons/de-bue1-ds-32.png': {
            width: 13, 
            height: 32, 
            offset: 100
        },
        'icons/de-bue1-dv-32.png': {
            width: 15, 
            height: 32, 
            offset: 132
        },
        'icons/de-bue2-ds-56.png': {
            width: 14, 
            height: 56, 
            offset: 164
        },
        'icons/de-bue2-ds-reduced-distance-56.png': {
            width: 14, 
            height: 56, 
            offset: 220
        },
        'icons/de-bue4-ds-32.png': {
            width: 22, 
            height: 32, 
            offset: 276
        },
        'icons/de-bue4-ds-only-transit-43.png': {
            width: 24, 
            height: 43, 
            offset: 308
        },
        'icons/de-bue5-only-transit-43.png': {
            width: 24, 
            height: 43, 
            offset: 351
        },
        'icons/de-hl0-32.png': {
            width: 15, 
            height: 32, 
            offset: 394
        },
        'icons/de-hl1-32.png': {
            width: 15, 
            height: 32, 
            offset: 426
        },
        'icons/de-hl1-distant-24.png': {
            width: 16, 
            height: 24, 
            offset: 458
        },
        'icons/de-hl10-32.png': {
            width: 15, 
            height: 32, 
            offset: 482
        },
        'icons/de-hl11-48.png': {
            width: 16, 
            height: 48, 
            offset: 514
        },
        'icons/de-hl12a-32.png': {
            width: 15, 
            height: 32, 
            offset: 562
        },
        'icons/de-hl12b-48.png': {
            width: 16, 
            height: 48, 
            offset: 594
        },
        'icons/de-hl2-48.png': {
            width: 16, 
            height: 48, 
            offset: 642
        },
        'icons/de-hl3a-32.png': {
            width: 15, 
            height: 32, 
            offset: 690
        },
        'icons/de-hl3b-48.png': {
            width: 16, 
            height: 48, 
            offset: 722
        },
        'icons/de-hp0-light-32.png': {
            width: 17, 
            height: 32, 
            offset: 770
        },
        'icons/de-hp0-semaphore-32.png': {
            width: 32, 
            height: 32, 
            offset: 802
        },
        'icons/de-hp1-light-32.png': {
            width: 17, 
            height: 32, 
            offset: 834
        },
        'icons/de-hp1-semaphore-38.png': {
            width: 24, 
            height: 38, 
            offset: 866
        },
        'icons/de-hp2-light-32.png': {
            width: 17, 
            height: 32, 
            offset: 904
        },
        'icons/de-hp2-semaphore-40.png': {
            width: 25, 
            height: 40, 
            offset: 936
        },
        'icons/de-ks-combined-32.png': {
            width: 21, 
            height: 32, 
            offset: 976
        },
        'icons/de-ks-combined-shortened-32.png': {
            width: 21, 
            height: 32, 
            offset: 1008
        },
        'icons/de-ks-distant-32.png': {
            width: 21, 
            height: 33, 
            offset: 1040
        },
        'icons/de-ks-distant-repeated-32.png': {
            width: 21, 
            height: 32, 
            offset: 1073
        },
        'icons/de-ks-distant-shortened-32.png': {
            width: 21, 
            height: 33, 
            offset: 1105
        },
        'icons/de-ks-main-32.png': {
            width: 21, 
            height: 32, 
            offset: 1138
        },
        'icons/de-ne1-32.png': {
            width: 32, 
            height: 20, 
            offset: 1170
        },
        'icons/de-ne5-ds301-32.png': {
            width: 22, 
            height: 32, 
            offset: 1190
        },
        'icons/de-ne6-48.png': {
            width: 48, 
            height: 10, 
            offset: 1222
        },
        'icons/de-pf1-dv-32.png': {
            width: 22, 
            height: 32, 
            offset: 1232
        },
        'icons/de-pf1-dv-only-transit-43.png': {
            width: 24, 
            height: 43, 
            offset: 1264
        },
        'icons/de-ra10-32.png': {
            width: 32, 
            height: 22, 
            offset: 1307
        },
        'icons/de-ra11-sh1-30.png': {
            width: 27, 
            height: 30, 
            offset: 1329
        },
        'icons/de-ra11-sign-32.png': {
            width: 32, 
            height: 21, 
            offset: 1359
        },
        'icons/de-ra11b-32.png': {
            width: 32, 
            height: 21, 
            offset: 1380
        },
        'icons/de-sh0-light-dwarf-24.png': {
            width: 24, 
            height: 15, 
            offset: 1401
        },
        'icons/de-sh0-semaphore-dwarf-24.png': {
            width: 24, 
            height: 22, 
            offset: 1416
        },
        'icons/de-sh1-light-normal-24.png': {
            width: 24, 
            height: 18, 
            offset: 1438
        },
        'icons/de-sh1-semaphore-normal-24.png': {
            width: 21, 
            height: 24, 
            offset: 1456
        },
        'icons/de-sh2-32.png': {
            width: 32, 
            height: 26, 
            offset: 1480
        },
        'icons/de-so106-32.png': {
            width: 32, 
            height: 22, 
            offset: 1506
        },
        'icons/de-sv-hp0-16.png': {
            width: 8, 
            height: 16, 
            offset: 1528
        },
        'icons/de-sv-sv0-16.png': {
            width: 8, 
            height: 16, 
            offset: 1544
        },
        'icons/de-vr0-light-32.png': {
            width: 31, 
            height: 32, 
            offset: 1560
        },
        'icons/de-vr0-light-repeated-32.png': {
            width: 31, 
            height: 32, 
            offset: 1592
        },
        'icons/de-vr0-semaphore-52.png': {
            width: 24, 
            height: 53, 
            offset: 1624
        },
        'icons/de-vr1-light-32.png': {
            width: 31, 
            height: 32, 
            offset: 1677
        },
        'icons/de-vr1-light-repeated-32.png': {
            width: 31, 
            height: 32, 
            offset: 1709
        },
        'icons/de-vr1-semaphore-38.png': {
            width: 24, 
            height: 38, 
            offset: 1741
        },
        'icons/de-vr2-light-32.png': {
            width: 31, 
            height: 32, 
            offset: 1779
        },
        'icons/de-vr2-light-repeated-32.png': {
            width: 31, 
            height: 32, 
            offset: 1811
        },
        'icons/de-vr2-semaphore-53.png': {
            width: 24, 
            height: 53, 
            offset: 1843
        },
        'icons/light-signal-deactivated-18.png': {
            width: 18, 
            height: 18, 
            offset: 1896
        }
    }, external_images = ['de-bue0-ds-repeated-42.png', 'de-bue0-ds-shortened-42.png', 'de-bue1-ds-repeated-42.png', 'de-bue1-ds-shortened-42.png', 'de-bue1-dv-repeated-42.png', 'de-bue1-dv-shortened-42.png', 'icons/de-bue5-ds-32.png', 'icons/de-ne2.png'], presence_tags = [], value_tags = ['ref', 'railway:signal:stop_demand:deactivated', 'railway:signal:whistle', 'railway:signal:stop', 'railway:signal:stop:form', 'railway:signal:crossing', 'railway:signal:minor', 'railway:signal:shunting', 'railway:signal:combined:shortened', 'railway:signal:speed_limit_distant:deactivated', 'railway:signal:distant:deactivated', 'railway:signal:ring:only_transit', 'railway:signal:shunting:states', 'railway:signal:crossing_distant:deactivated', 'railway:signal:crossing_distant', 'railway:signal:main:function', 'railway:signal:humping:deactivated', 'railway:signal:crossing:deactivated', 'railway:signal:wrong_road:deactivated', 'railway:signal:main_repeated:deactivated', 'railway:signal:minor:form', 'railway:signal:combined:deactivated', 'railway:signal:crossing_distant:shortened', 'railway:signal:distant', 'railway:signal:combined:form', 'railway:signal:brake_test:deactivated', 'railway:signal:distant:form', 'railway:signal:distant:shortened', 'railway:signal:minor:deactivated', 'railway:signal:minor_distant:deactivated', 'railway', 'railway:signal:minor:height', 'railway:signal:station_distant:form', 'railway:signal:crossing:shortened', 'railway:signal:main', 'railway:signal:combined:states', 'railway:signal:route_distant:deactivated', 'railway:signal:main:deactivated', 'railway:signal:speed_limit:deactivated', 'railway:signal:main:form', 'railway:signal:resetting_switch:deactivated', 'railway:signal:ring', 'railway:signal:crossing:form', 'railway:signal:crossing:repeated', 'railway:signal:train_protection', 'railway:signal:shunting:deactivated', 'railway:signal:short_route:deactivated', 'railway:signal:main:states', 'railway:signal:departure:deactivated', 'railway:signal:route:deactivated', 'railway:signal:shunting:form', 'railway:signal:distant:states', 'usage', 'railway:signal:distant:repeated', 'railway:signal:station_distant', 'railway:signal:combined'];

    MapCSS.loadStyle('signals', restyle, sprite_images, external_images, presence_tags, value_tags);
    MapCSS.preloadExternalImages('signals');
})(MapCSS);
    