
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

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:main'] == 'hp' && tags['railway:signal:main:form'] == 'semaphore' && (!tags.hasOwnProperty('railway:signal:main:states'))) && zoom >= 14)) {
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

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:main'] == 'hp' && tags['railway:signal:main:form'] == 'semaphore' && (tags.hasOwnProperty('railway:signal:main:states')) && !(/.*hp2.*/.test(tags['railway:signal:main:states']))) && zoom >= 14)) {
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

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:main'] == 'hp' && tags['railway:signal:main:form'] == 'semaphore' && (tags.hasOwnProperty('railway:signal:main:states')) && /.*hp2.*/.test(tags['railway:signal:main:states'])) && zoom >= 14)) {
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

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:main'] == 'hp' && tags['railway:signal:main:form'] == 'light' && (!tags.hasOwnProperty('railway:signal:main:states'))) && zoom >= 14)) {
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

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:main'] == 'hp' && tags['railway:signal:main:form'] == 'light' && (tags.hasOwnProperty('railway:signal:main:states')) && !(/.*hp2.*/.test(tags['railway:signal:main:states']))) && zoom >= 14)) {
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

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:main'] == 'hp' && tags['railway:signal:main:form'] == 'light' && (tags.hasOwnProperty('railway:signal:main:states')) && /.*hp2.*/.test(tags['railway:signal:main:states'])) && zoom >= 14)) {
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

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:main'] == 'ne1' && tags['railway:signal:main:form'] == 'sign' && tags['railway:signal:main:function'] == 'entry') && zoom >= 14)) {
            s_default['z-index'] = 8000;
            s_default['icon-image'] = 'icons/de-ne1-32.png';
            s_default['icon-width'] = '16';
            s_default['icon-height'] = '10';
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
            s_default['icon-image'] = 'icons/de-sh1-semaphore-normal-24.png';
            s_default['icon-width'] = '10';
            s_default['icon-height'] = '12';
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
            s_default['icon-image'] = 'icons/de-sh0-semaphore-dwarf-24.png';
            s_default['icon-width'] = '12';
            s_default['icon-height'] = '11';
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
            s_default['icon-image'] = 'icons/de-sh1-light-normal-24.png';
            s_default['icon-width'] = '12';
            s_default['icon-height'] = '9';
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
            s_default['icon-image'] = 'icons/de-sh0-light-dwarf-24.png';
            s_default['icon-width'] = '12';
            s_default['icon-height'] = '8';
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

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing_distant'] == 'bü2' && (!tags.hasOwnProperty('railway:signal:crossing_distant:shortened'))) && zoom >= 15) || ((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing_distant'] == 'bü2' && tags['railway:signal:crossing_distant:shortened'] == 'no') && zoom >= 15)) {
            s_default['z-index'] = 500;
            s_default['icon-image'] = 'icons/de-bue2-ds-56.png';
            s_default['icon-width'] = '7';
            s_default['icon-height'] = '28';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (((type == 'node' && tags['railway'] == 'signal' && tags['railway:signal:crossing_distant'] == 'bü2' && tags['railway:signal:crossing_distant:shortened'] == 'yes') && zoom >= 15)) {
            s_default['z-index'] = 500;
            s_default['icon-image'] = 'icons/de-bue2-ds-reduced-distance-56.png';
            s_default['icon-width'] = '7';
            s_default['icon-height'] = '28';
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
            s_default['icon-image'] = 'icons/de-ne1-32.png';
            s_default['icon-width'] = '16';
            s_default['icon-height'] = '10';
            s_default['text-allow-overlap'] = 'true';
            s_default['allow-overlap'] = 'true';
        }

        if (Object.keys(s_default).length) {
            style['default'] = s_default; }
        return style;
    }
    
    var sprite_images = {
        'icons/de-bue2-ds-56.png': {
            width: 14, 
            height: 56, 
            offset: 0
        },
        'icons/de-bue2-ds-reduced-distance-56.png': {
            width: 14, 
            height: 56, 
            offset: 56
        },
        'icons/de-bue4-ds-32.png': {
            width: 22, 
            height: 32, 
            offset: 112
        },
        'icons/de-bue4-ds-only-transit-43.png': {
            width: 24, 
            height: 43, 
            offset: 144
        },
        'icons/de-bue5-only-transit-43.png': {
            width: 24, 
            height: 43, 
            offset: 187
        },
        'icons/de-hp0-light-32.png': {
            width: 17, 
            height: 32, 
            offset: 230
        },
        'icons/de-hp0-semaphore-32.png': {
            width: 32, 
            height: 32, 
            offset: 262
        },
        'icons/de-hp1-light-32.png': {
            width: 17, 
            height: 32, 
            offset: 294
        },
        'icons/de-hp1-semaphore-38.png': {
            width: 24, 
            height: 38, 
            offset: 326
        },
        'icons/de-hp2-light-32.png': {
            width: 17, 
            height: 32, 
            offset: 364
        },
        'icons/de-hp2-semaphore-40.png': {
            width: 25, 
            height: 40, 
            offset: 396
        },
        'icons/de-ks-combined.png': {
            width: 16, 
            height: 16, 
            offset: 436
        },
        'icons/de-ks-distant.png': {
            width: 16, 
            height: 16, 
            offset: 452
        },
        'icons/de-ks-main.png': {
            width: 16, 
            height: 16, 
            offset: 468
        },
        'icons/de-ne1-32.png': {
            width: 32, 
            height: 20, 
            offset: 484
        },
        'icons/de-ne5-ds301-32.png': {
            width: 22, 
            height: 32, 
            offset: 504
        },
        'icons/de-ne6-48.png': {
            width: 48, 
            height: 10, 
            offset: 536
        },
        'icons/de-pf1-dv-32.png': {
            width: 22, 
            height: 32, 
            offset: 546
        },
        'icons/de-pf1-dv-only-transit-43.png': {
            width: 24, 
            height: 43, 
            offset: 578
        },
        'icons/de-sh0-light-dwarf-24.png': {
            width: 24, 
            height: 15, 
            offset: 621
        },
        'icons/de-sh0-semaphore-dwarf-24.png': {
            width: 24, 
            height: 22, 
            offset: 636
        },
        'icons/de-sh1-light-normal-24.png': {
            width: 24, 
            height: 18, 
            offset: 658
        },
        'icons/de-sh1-semaphore-normal-24.png': {
            width: 21, 
            height: 24, 
            offset: 676
        },
        'icons/de-vr0-light-32.png': {
            width: 31, 
            height: 32, 
            offset: 700
        },
        'icons/de-vr0-light-repeated-32.png': {
            width: 31, 
            height: 32, 
            offset: 732
        },
        'icons/de-vr0-semaphore-52.png': {
            width: 24, 
            height: 53, 
            offset: 764
        },
        'icons/de-vr1-light-32.png': {
            width: 31, 
            height: 32, 
            offset: 817
        },
        'icons/de-vr1-light-repeated-32.png': {
            width: 31, 
            height: 32, 
            offset: 849
        },
        'icons/de-vr1-semaphore-38.png': {
            width: 24, 
            height: 38, 
            offset: 881
        },
        'icons/de-vr2-light-32.png': {
            width: 31, 
            height: 32, 
            offset: 919
        },
        'icons/de-vr2-light-repeated-32.png': {
            width: 31, 
            height: 32, 
            offset: 951
        },
        'icons/de-vr2-semaphore-53.png': {
            width: 24, 
            height: 53, 
            offset: 983
        }
    }, external_images = ['icons/de-bue5-ds-32.png', 'icons/de-ne2.png'], presence_tags = [], value_tags = ['ref', 'railway:signal:stop:form', 'railway:signal:stop', 'railway:signal:minor', 'railway:signal:ring:only_transit', 'railway:signal:crossing_distant', 'railway:signal:main:function', 'railway:signal:whistle', 'railway:signal:minor:form', 'railway:signal:crossing_distant:shortened', 'railway:signal:distant', 'railway:signal:combined:form', 'railway:signal:distant:form', 'railway:signal:distant:shortened', 'railway', 'railway:signal:minor:height', 'railway:signal:main', 'railway:signal:station_distant', 'railway:signal:main:form', 'railway:signal:combined', 'railway:signal:combined:states', 'railway:signal:ring', 'railway:signal:main:states', 'railway:signal:station_distant:form', 'railway:signal:distant:states', 'railway:signal:distant:repeated'];

    MapCSS.loadStyle('signals', restyle, sprite_images, external_images, presence_tags, value_tags);
    MapCSS.preloadExternalImages('signals');
})(MapCSS);
    