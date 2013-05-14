/*
Copyright (c) 2011, Darafei Praliaskouski, Vladimir Agafonkin, Maksim Gurtovenko
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

L.TileLayer.Kothic = L.TileLayer.Canvas.extend({
    options: {
        tileSize: 256 * 4,
        zoomOffset: 2,
        minZoom: 2,
        maxZoom: 22,
        updateWhenIdle: true,
        unloadInvisibleTiles: true,
        attribution: 'Map data &copy; OpenStreetMap contributors, Rendering by <a href="http://www.openrailwaymap.org/">OpenRailwayMap</a>',
        async: true,
        buffered: false,
        styles: MapCSS.availableStyles
    },

    initialize: function(url,options) {
        L.Util.setOptions(this, options);

        this._url = url;
        this._canvases = {};
        this._scripts = {};
        this._debugMessages = [];

        window.onKothicDataResponse = L.Util.bind(this._onKothicDataResponse, this);

        this.kothic = new Kothic({
            buffered: this.options.buffered,
            styles: this.options.styles
        });
    },

    _onKothicDataResponse: function(data, zoom, x, y) {
        var key = [zoom, x, y].join('/'),
            canvas = this._canvases[key],
            zoomOffset = this.options.zoomOffset,
            layer = this;

        if (!canvas) {
            return;
        }

        function onRenderComplete(debugInfo) {
            debugInfo.x = x;
            debugInfo.y = y;
            debugInfo.zoom = zoom;
            layer._debugMessages.push(debugInfo);

            document.getElementsByTagName('head')[0].removeChild(layer._scripts[key]);
            delete layer._scripts[key];

            layer.tileDrawn(canvas);
        }

        this._invertYAxe(data);

        this.kothic.render(canvas, data, zoom + zoomOffset, onRenderComplete);
        delete this._canvases[key];
    },

    getDebugMessages: function() {
        return this._debugMessages;
    },

    drawTile: function(canvas, tilePoint, zoom) {
        var zoomOffset = this.options.zoomOffset,
            key = [(zoom - zoomOffset), tilePoint.x, tilePoint.y].join('/'),
            url=this._url.replace('{x}',tilePoint.x).
                    replace('{y}',tilePoint.y).
                    replace('{z}',zoom-zoomOffset);
        this._canvases[key] = canvas;
        this._scripts[key] = this._loadScript(url);
    },
    
    enableStyle: function(name) {
        if (MapCSS.availableStyles.indexOf(name) >= 0 && this.options.styles.indexOf(name) < 0) {
            this.options.styles.push(name);
            this.redraw();
        }
    },

    disableStyle: function(name) {
        if (this.options.styles.indexOf(name) >= 0) {
            Kothic.utils.remove_from_array(this.options.styles, name);
            this.redraw();
        }
    },

    redraw: function() {
        MapCSS.invalidateCache();
        // TODO implement layer.redraw() in Leaflet
        this._map.getPanes().tilePane.empty = false;
        if (this._map && this._map._container) {
            this._reset();
            this._update();
        }
    },
    
    _invertYAxe: function(data) {
        var type, coordinates, tileSize = data.granularity, i, j, k, l, feature;
        for (i = 0; i < data.features.length; i++) {
            feature = data.features[i];
            coordinates = feature.coordinates;
            type = data.features[i].type;
            if (type === 'Point') {
                coordinates[1] = tileSize - coordinates[1];
            } else if (type === 'MultiPoint' || type === 'LineString') {
                for (j = 0; j < coordinates.length; j++) {
                    coordinates[j][1] = tileSize - coordinates[j][1];
                }
            } else if (type === 'MultiLineString' || type === 'Polygon') {
                for (k = 0; k < coordinates.length; k++) {
                    for (j = 0; j < coordinates[k].length; j++) {
                        coordinates[k][j][1] = tileSize - coordinates[k][j][1];
                    }
                }
            } else if (type === 'MultiPolygon') {
                for (l = 0; l < coordinates.length; l++) {
                    for (k = 0; k < coordinates[l].length; k++) {
                        for (j = 0; j < coordinates[l][k].length; j++) {
                            coordinates[l][k][j][1] = tileSize - coordinates[l][k][j][1];
                        }
                    }
                }
            } else {
                throw "Unexpected GeoJSON type: " + type;
            }
            
            if (feature.hasOwnProperty('reprpoint')) {
                feature.reprpoint[1] = tileSize - feature.reprpoint[1];
            }
        }
    },

    _loadScript: function(url) {
        var script = document.createElement('script');
        script.src = url;
        script.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(script);
        return script;
    }
});
