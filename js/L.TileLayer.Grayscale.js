/*
DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
Version 2, December 2004

Copyright © Ilya Zverev

Everyone is permitted to copy and distribute verbatim or modified
copies of this license document, and changing it is allowed as long
as the name is changed.

DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

0. You just DO WHAT THE FUCK YOU WANT TO.

See https://github.com/Zverik/leaflet-grayscale/ for details.
*/


/*
 * L.TileLayer.Grayscale is a regular tilelayer with grayscale makeover.
 */

L.TileLayer.Grayscale = L.TileLayer.extend({
	options: {
		enableCanvas: true
	},

	initialize: function (url, options) {
		var canvasEl = document.createElement('canvas');
		if( !(canvasEl.getContext && canvasEl.getContext('2d')) ) {
			options.enableCanvas = false;
		}

		L.TileLayer.prototype.initialize.call(this, url, options);
	},

	_loadTile: function (tile, tilePoint) {
		tile.setAttribute('crossorigin', 'anonymous');
		L.TileLayer.prototype._loadTile.call(this, tile, tilePoint);
	},

	_tileOnLoad: function () {
		if (this._layer.options.enableCanvas && !this.canvasContext) {
			var canvas = document.createElement("canvas");
			canvas.width = canvas.height = this._layer.options.tileSize;
			this.canvasContext = canvas.getContext("2d");
		}
		var ctx = this.canvasContext;

		if (ctx) {
			this.onload  = null; // to prevent an infinite loop
			ctx.drawImage(this, 0, 0);
			var imgd = ctx.getImageData(0, 0, this._layer.options.tileSize, this._layer.options.tileSize);
			var pix = imgd.data;
			for (var i = 0, n = pix.length; i < n; i += 4) {
				pix[i] = pix[i + 1] = pix[i + 2] = (3 * pix[i] + 4 * pix[i + 1] + pix[i + 2]) / 8;
			}
			ctx.putImageData(imgd, 0, 0);
			this.removeAttribute("crossorigin");
			this.src = ctx.canvas.toDataURL();
		}

		L.TileLayer.prototype._tileOnLoad.call(this);
	}
});

L.tileLayer.grayscale = function (url, options) {
	return new L.TileLayer.Grayscale(url, options);
};
