/*
Copyright (c) 2011-2013, Darafei Praliaskouski, Vladimir Agafonkin, Maksim Gurtovenko
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are
permitted provided that the following conditions are met:

   1. Redistributions of source code must retain the above copyright notice, this list of
      conditions and the following disclaimer.

   2. Redistributions in binary form must reproduce the above copyright notice, this list
      of conditions and the following disclaimer in the documentation and/or other materials
	  provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


Kothic.style = {

    defaultCanvasStyles: {
        strokeStyle: 'rgba(0,0,0,0.5)',
        fillStyle: 'rgba(0,0,0,0.5)',
        lineWidth: 1,
        lineCap: 'round',
        lineJoin: 'round',
        textAlign: 'center',
        textBaseline: 'middle'
    },

    populateLayers: function (features, zoom, styles) {
        var layers = {},
            i, len, feature, layerId, layerStyle;

        var styledFeatures = Kothic.style.styleFeatures(features, zoom, styles);

        for (i = 0, len = styledFeatures.length; i < len; i++) {
            feature = styledFeatures[i];
            layerStyle = feature.style['-x-mapnik-layer'];
            layerId = !layerStyle ? feature.properties.layer || 0 :
                layerStyle === 'top' ? 10000 : -10000;

            layers[layerId] = layers[layerId] || [];
            layers[layerId].push(feature);
        }

        return layers;
    },

    getStyle: function (feature, zoom, styleNames) {
        var shape = feature.type,
            type, selector;
        if (shape === 'LineString' || shape === 'MultiLineString') {
            type = 'way';
            selector = 'line';
        } else if (shape === 'Polygon' || shape === 'MultiPolygon') {
            type = 'way';
            selector = 'area';
        } else if (shape === 'Point' || shape === 'MultiPoint') {
            type = 'node';
            selector = 'node';
        }

        return MapCSS.restyle(styleNames, feature.properties, zoom, type, selector);
    },

    styleFeatures: function (features, zoom, styleNames) {
        var styledFeatures = [],
            i, j, len, feature, style, restyledFeature, k;

        for (i = 0, len = features.length; i < len; i++) {
            feature = features[i];
            style = this.getStyle(feature, zoom, styleNames);

            for (j in style) {
                if (j === 'default') {
                    restyledFeature = feature;
                } else {
                    restyledFeature = {};
                    for (k in feature) {
                        restyledFeature[k] = feature[k];
                    }
                }

                restyledFeature.kothicId = i + 1;
                restyledFeature.style = style[j];
                restyledFeature.zIndex = style[j]['z-index'] || 0;
                restyledFeature.sortKey = (style[j]['fill-color'] || '') + (style[j].color || '');
                styledFeatures.push(restyledFeature);
            }
        }

        styledFeatures.sort(function (a, b) {
            return a.zIndex !== b.zIndex ? a.zIndex - b.zIndex :
                   a.sortKey < b.sortKey ? -1 :
                   a.sortKey > b.sortKey ? 1 : 0;
        });

        return styledFeatures;
    },

    getFontString: function (name, size) {
        name = name || '';
        size = size || 9;

        var family = name ? name + ', ' : '';

        name = name.toLowerCase();

        var styles = [];
        if (name.indexOf('italic') !== -1 || name.indexOf('oblique') !== -1) {
            styles.push('italic');
        }
        if (name.indexOf('bold') !== -1) {
            styles.push('bold');
            //family += '''+name.replace('bold', '')+'', ';
            family += name.replace('bold', '') + ', ';
        }

        styles.push(size + 'px');

        if (name.indexOf('serif') !== -1) {
            family += 'Georgia, serif';
        } else {
            family += '"Helvetica Neue", Arial, Helvetica, sans-serif';
        }
        styles.push(family);


        return styles.join(' ');
    },

    setStyles: function (ctx, styles) {
        var i;
        for (i in styles) {
            if (styles.hasOwnProperty(i)) {
                ctx[i] = styles[i];
            }
        }
    }
};
