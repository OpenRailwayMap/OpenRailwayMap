
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

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:main'] == 'hp' && tags['railway:signal:main:form'] == 'semaphore') && zoom >= 14)) {
            s_default['z-index'] = 10000;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 11;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-hp-semaphore.png';
            s_default['icon-width'] = '16';
            s_default['icon-height'] = '16';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:main'] == 'hp' && tags['railway:signal:main:form'] == 'light') && zoom >= 14)) {
            s_default['z-index'] = 10000;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 11;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-hp-light.png';
            s_default['icon-width'] = '16';
            s_default['icon-height'] = '16';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'vr' && tags['railway:signal:distant:form'] == 'semaphore' && (!tags.hasOwnProperty('railway:signal:main')) && (!tags.hasOwnProperty('railway:signal:distant:states'))) && zoom >= 14)) {
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

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'vr' && tags['railway:signal:distant:form'] == 'semaphore' && (!tags.hasOwnProperty('railway:signal:main')) && (tags.hasOwnProperty('railway:signal:distant:states')) && !(/.*vr2.*/.test(tags['railway:signal:distant:states']))) && zoom >= 14)) {
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

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'vr' && tags['railway:signal:distant:form'] == 'semaphore' && (!tags.hasOwnProperty('railway:signal:main')) && (tags.hasOwnProperty('railway:signal:distant:states')) && /.*vr2.*/.test(tags['railway:signal:distant:states'])) && zoom >= 14)) {
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

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'vr' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:repeated'] == 'no' && tags['railway:signal:distant:shortened'] == 'no' && (!tags.hasOwnProperty('railway:signal:main')) && (!tags.hasOwnProperty('railway:signal:distant:states'))) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'vr' && tags['railway:signal:distant:form'] == 'light' && (!tags.hasOwnProperty('railway:signal:distant:repeated')) && tags['railway:signal:distant:shortened'] == 'no' && (!tags.hasOwnProperty('railway:signal:main')) && (!tags.hasOwnProperty('railway:signal:distant:states'))) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'vr' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:repeated'] == 'no' && (!tags.hasOwnProperty('railway:signal:distant:shortened')) && (!tags.hasOwnProperty('railway:signal:main')) && (!tags.hasOwnProperty('railway:signal:distant:states'))) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'vr' && tags['railway:signal:distant:form'] == 'light' && (!tags.hasOwnProperty('railway:signal:distant:repeated')) && (!tags.hasOwnProperty('railway:signal:distant:shortened')) && (!tags.hasOwnProperty('railway:signal:main')) && (!tags.hasOwnProperty('railway:signal:distant:states'))) && zoom >= 14)) {
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

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'vr' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:repeated'] == 'no' && tags['railway:signal:distant:shortened'] == 'no' && (!tags.hasOwnProperty('railway:signal:main')) && (tags.hasOwnProperty('railway:signal:distant:states')) && !(/.*vr2.*/.test(tags['railway:signal:distant:states']))) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'vr' && tags['railway:signal:distant:form'] == 'light' && (!tags.hasOwnProperty('railway:signal:distant:repeated')) && tags['railway:signal:distant:shortened'] == 'no' && (!tags.hasOwnProperty('railway:signal:main')) && (tags.hasOwnProperty('railway:signal:distant:states')) && !(/.*vr2.*/.test(tags['railway:signal:distant:states']))) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'vr' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:repeated'] == 'no' && (!tags.hasOwnProperty('railway:signal:distant:shortened')) && (!tags.hasOwnProperty('railway:signal:main')) && (tags.hasOwnProperty('railway:signal:distant:states')) && !(/.*vr2.*/.test(tags['railway:signal:distant:states']))) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'vr' && tags['railway:signal:distant:form'] == 'light' && (!tags.hasOwnProperty('railway:signal:distant:repeated')) && (!tags.hasOwnProperty('railway:signal:distant:shortened')) && (!tags.hasOwnProperty('railway:signal:main')) && (tags.hasOwnProperty('railway:signal:distant:states')) && !(/.*vr2.*/.test(tags['railway:signal:distant:states']))) && zoom >= 14)) {
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

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'vr' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:repeated'] == 'no' && (!tags.hasOwnProperty('railway:signal:main')) && (tags.hasOwnProperty('railway:signal:distant:states')) && /.*vr2.*/.test(tags['railway:signal:distant:states'])) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'vr' && tags['railway:signal:distant:form'] == 'light' && (!tags.hasOwnProperty('railway:signal:distant:repeated')) && (!tags.hasOwnProperty('railway:signal:main')) && (tags.hasOwnProperty('railway:signal:distant:states')) && /.*vr2.*/.test(tags['railway:signal:distant:states'])) && zoom >= 14)) {
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

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'vr' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:repeated'] == 'yes' && (!tags.hasOwnProperty('railway:signal:main')) && (!tags.hasOwnProperty('railway:signal:distant:states'))) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'vr' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:shortened'] == 'yes' && (!tags.hasOwnProperty('railway:signal:main')) && (!tags.hasOwnProperty('railway:signal:distant:states'))) && zoom >= 14)) {
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

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'vr' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:repeated'] == 'yes' && (!tags.hasOwnProperty('railway:signal:main')) && (tags.hasOwnProperty('railway:signal:distant:states')) && !(/.*vr2.*/.test(tags['railway:signal:distant:states']))) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'vr' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:shortened'] == 'yes' && (!tags.hasOwnProperty('railway:signal:main')) && (tags.hasOwnProperty('railway:signal:distant:states')) && !(/.*vr2.*/.test(tags['railway:signal:distant:states']))) && zoom >= 14)) {
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

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'vr' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:repeated'] == 'yes' && (!tags.hasOwnProperty('railway:signal:main')) && (tags.hasOwnProperty('railway:signal:distant:states')) && /.*vr2.*/.test(tags['railway:signal:distant:states'])) && zoom >= 14) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'vr' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:shortened'] == 'yes' && (!tags.hasOwnProperty('railway:signal:main')) && (tags.hasOwnProperty('railway:signal:distant:states')) && /.*vr2.*/.test(tags['railway:signal:distant:states'])) && zoom >= 14)) {
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

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'db:ne2' && tags['railway:signal:distant:form'] == 'sign') && zoom >= 14)) {
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

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:minor'] == 'sh' && tags['railway:signal:minor:form'] == 'semaphore' && tags['railway:signal:minor:height'] == 'normal') && zoom >= 17) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:minor'] == 'sh' && tags['railway:signal:minor:form'] == 'semaphore' && (!tags.hasOwnProperty('railway:signal:minor:height'))) && zoom >= 17)) {
            s_default['z-index'] = 4000;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 11;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-sh-semaphore.png';
            s_default['icon-width'] = '16';
            s_default['icon-height'] = '16';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:minor'] == 'sh' && tags['railway:signal:minor:form'] == 'semaphore' && tags['railway:signal:minor:height'] == 'dwarf') && zoom >= 17)) {
            s_default['z-index'] = 2000;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 11;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-sh-semaphore-dwarf.png';
            s_default['icon-width'] = '16';
            s_default['icon-height'] = '16';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:minor'] == 'sh' && tags['railway:signal:minor:form'] == 'light' && tags['railway:signal:minor:height'] == 'normal') && zoom >= 17) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:minor'] == 'sh' && tags['railway:signal:minor:form'] == 'light' && (!tags.hasOwnProperty('railway:signal:minor:height'))) && zoom >= 17)) {
            s_default['z-index'] = 5000;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 11;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-sh-light.png';
            s_default['icon-width'] = '16';
            s_default['icon-height'] = '16';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:minor'] == 'sh' && tags['railway:signal:minor:form'] == 'light' && tags['railway:signal:minor:height'] == 'dwarf') && zoom >= 17)) {
            s_default['z-index'] = 3000;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 11;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-sh-light-dwarf.png';
            s_default['icon-width'] = '16';
            s_default['icon-height'] = '16';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:distant'] == 'ks' && tags['railway:signal:distant:form'] == 'light' && tags['railway:signal:distant:states'] == 'ks1;ks2') && zoom >= 14)) {
            s_default['z-index'] = 8000;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 11;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-ks-distant.png';
            s_default['icon-width'] = '16';
            s_default['icon-height'] = '16';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:main'] == 'ks' && tags['railway:signal:main:form'] == 'light' && tags['railway:signal:main:states'] == 'hp0;ks1') && zoom >= 14)) {
            s_default['z-index'] = 10100;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 11;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-ks-main.png';
            s_default['icon-width'] = '16';
            s_default['icon-height'] = '16';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:combined'] == 'ks' && tags['railway:signal:combined:form'] == 'light' && tags['railway:signal:combined:states'] == 'hp0;ks1;ks2') && zoom >= 14)) {
            s_default['z-index'] = 10200;
            s_default['text'] = MapCSS.e_localize(tags, 'ref');
            s_default['text-offset'] = 11;
            s_default['text-size'] = '12';
            s_default['text-color'] = 'black';
            s_default['text-halo-radius'] = 1;
            s_default['text-halo-color'] = 'white';
            s_default['font-weight'] = 'bold';
            s_default['icon-image'] = 'icons/de-ks-combined.png';
            s_default['icon-width'] = '16';
            s_default['icon-height'] = '16';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:stop'] == 'ne5' && tags['railway:signal:stop:form'] == 'sign') && zoom >= 17)) {
            s_default['z-index'] = 1000;
            s_default['icon-image'] = 'icons/de-ne5-ds301-32.png';
            s_default['icon-width'] = '11';
            s_default['icon-height'] = '16';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:main'] == 'ne1' && tags['railway:signal:main:form'] == 'sign' && tags['railway:signal:main:function'] == 'entry') && zoom >= 14)) {
            s_default['z-index'] = 1000;
            s_default['icon-image'] = 'icons/de-ne1.png';
            s_default['icon-width'] = '16';
            s_default['icon-height'] = '16';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:whistle'] == 'db:bü4') && zoom >= 14)) {
            s_default['z-index'] = 500;
            s_default['icon-image'] = 'icons/de-bue4-ds-32.png';
            s_default['icon-width'] = '11';
            s_default['icon-height'] = '16';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:whistle'] == 'db:bü4' && tags['railway:signal:ring:only_transit'] == 'yes') && zoom >= 14)) {
            s_default['z-index'] = 500;
            s_default['icon-image'] = 'icons/de-bue4-ds-only-transit-43.png';
            s_default['icon-width'] = '12';
            s_default['icon-height'] = '21';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:whistle'] == 'dr:pf1') && zoom >= 14)) {
            s_default['z-index'] = 500;
            s_default['icon-image'] = 'icons/de-pf1-dv-32.png';
            s_default['icon-width'] = '11';
            s_default['icon-height'] = '16';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:whistle'] == 'db:pf1' && tags['railway:signal:ring:only_transit'] == 'yes') && zoom >= 14)) {
            s_default['z-index'] = 500;
            s_default['icon-image'] = 'icons/de-pf1-dv-only-transit-43.png';
            s_default['icon-width'] = '12';
            s_default['icon-height'] = '21';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:ring'] == 'bü5') && zoom >= 15)) {
            s_default['z-index'] = 500;
            s_default['icon-image'] = 'icons/de-bue5-ds-32.png';
            s_default['icon-width'] = '11';
            s_default['icon-height'] = '16';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:ring'] == 'bü5' && tags['railway:signal:ring:only_transit'] == 'yes') && zoom >= 15)) {
            s_default['z-index'] = 500;
            s_default['icon-image'] = 'icons/de-bue5-only-transit-43.png';
            s_default['icon-width'] = '12';
            s_default['icon-height'] = '21';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:station_distant'] == 'ne6' && tags['railway:signal:station_distant:form'] == 'sign') && zoom >= 14)) {
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
            s_default['icon-image'] = 'icons/de-ne1.png';
            s_default['icon-width'] = '16';
            s_default['icon-height'] = '16';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (Object.keys(s_default).length) {
            style['default'] = s_default; }
        return style;
    }
    
    var sprite_images = {
        'icons/de-bue4-ds-32.png': {
            width: 22, 
            height: 32, 
            offset: 0
        },
        'icons/de-bue4-ds-only-transit-43.png': {
            width: 24, 
            height: 43, 
            offset: 32
        },
        'icons/de-bue5-only-transit-43.png': {
            width: 24, 
            height: 43, 
            offset: 75
        },
        'icons/de-ks-combined.png': {
            width: 16, 
            height: 16, 
            offset: 118
        },
        'icons/de-ks-distant.png': {
            width: 16, 
            height: 16, 
            offset: 134
        },
        'icons/de-ks-main.png': {
            width: 16, 
            height: 16, 
            offset: 150
        },
        'icons/de-ne1.png': {
            width: 16, 
            height: 16, 
            offset: 166
        },
        'icons/de-ne5-ds301-32.png': {
            width: 22, 
            height: 32, 
            offset: 182
        },
        'icons/de-ne6-48.png': {
            width: 48, 
            height: 10, 
            offset: 214
        },
        'icons/de-pf1-dv-32.png': {
            width: 22, 
            height: 32, 
            offset: 224
        },
        'icons/de-pf1-dv-only-transit-43.png': {
            width: 24, 
            height: 43, 
            offset: 256
        },
        'icons/de-sh-light-dwarf.png': {
            width: 16, 
            height: 16, 
            offset: 299
        },
        'icons/de-sh-light.png': {
            width: 16, 
            height: 16, 
            offset: 315
        },
        'icons/de-sh-semaphore-dwarf.png': {
            width: 16, 
            height: 16, 
            offset: 331
        },
        'icons/de-sh-semaphore.png': {
            width: 16, 
            height: 16, 
            offset: 347
        },
        'icons/de-vr0-light-32.png': {
            width: 31, 
            height: 32, 
            offset: 363
        },
        'icons/de-vr0-light-repeated-32.png': {
            width: 31, 
            height: 32, 
            offset: 395
        },
        'icons/de-vr0-semaphore-52.png': {
            width: 24, 
            height: 53, 
            offset: 427
        },
        'icons/de-vr1-light-32.png': {
            width: 31, 
            height: 32, 
            offset: 480
        },
        'icons/de-vr1-light-repeated-32.png': {
            width: 31, 
            height: 32, 
            offset: 512
        },
        'icons/de-vr1-semaphore-38.png': {
            width: 24, 
            height: 38, 
            offset: 544
        },
        'icons/de-vr2-light-32.png': {
            width: 31, 
            height: 32, 
            offset: 582
        },
        'icons/de-vr2-light-repeated-32.png': {
            width: 31, 
            height: 32, 
            offset: 614
        },
        'icons/de-vr2-semaphore-53.png': {
            width: 24, 
            height: 53, 
            offset: 646
        }
    }, external_images = ['icons/de-bue5-ds-32.png', 'icons/de-hp-light.png', 'icons/de-hp-semaphore.png', 'icons/de-ne2.png'], presence_tags = [], value_tags = ['ref', 'railway:signal:stop:form', 'railway:signal:stop', 'railway:signal:minor', 'railway:signal:ring:only_transit', 'railway:signal:main:function', 'railway:signal:whistle', 'railway:signal:minor:form', 'railway:signal:distant', 'railway:signal:combined:form', 'railway:signal:distant:form', 'railway:signal:distant:shortened', 'railway', 'railway:signal:minor:height', 'railway:signal:main', 'railway:signal:station_distant', 'railway:signal:main:form', 'railway:signal:combined', 'railway:signal:combined:states', 'railway:signal:ring', 'railway:signal:main:states', 'railway:signal:station_distant:form', 'railway:signal:distant:states', 'railway:signal:distant:repeated'];

    MapCSS.loadStyle('signals', restyle, sprite_images, external_images, presence_tags, value_tags);
    MapCSS.preloadExternalImages('signals');
})(MapCSS);
    