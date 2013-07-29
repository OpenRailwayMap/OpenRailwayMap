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


Kothic.texticons = {

    render: function (ctx, feature, collides, ws, hs, renderText, renderIcon) {
        var style = feature.style, img, point, w, h;

        if (renderIcon || (renderText && feature.type !== 'LineString')) {
            var reprPoint = Kothic.geom.getReprPoint(feature);
            if (!reprPoint) {
                return;
            }
            point = Kothic.geom.transformPoint(reprPoint, ws, hs);
        }

        if (renderIcon) {
            img = MapCSS.getImage(style['icon-image']);
            if (!img) { return; }

            w = img.width;
            h = img.height;

            if (style['icon-width'] || style['icon-height']){
                if (style['icon-width']) {
                    w = style['icon-width'];
                    h = img.height * w / img.width;
                }
                if (style['icon-height']) {
                    h = style['icon-height'];
                    if (!style['icon-width']) {
                        w = img.width * h / img.height;
                    }
                }
            }
            if ((style['allow-overlap'] !== 'true') &&
                    collides.checkPointWH(point, w, h, feature.kothicId)) {
                return;
            }
        }

        if (renderText) {
            Kothic.style.setStyles(ctx, {
                lineWidth: style['text-halo-radius'] * 2,
                font: Kothic.style.getFontString(style['font-family'], style['font-size'])
            });

            var text = String(style.text),
                    textWidth = ctx.measureText(text).width,
                    letterWidth = textWidth / text.length,
                    collisionWidth = textWidth,
                    collisionHeight = letterWidth * 2.5,
                    offset = style['text-offset'] || 0;

            var halo = (style.hasOwnProperty('text-halo-radius'));

            Kothic.style.setStyles(ctx, {
                fillStyle: style['text-color'] || '#000000',
                strokeStyle: style['text-halo-color'] || '#ffffff',
                globalAlpha: style['text-opacity'] || style.opacity || 1,
                textAlign: 'center',
                textBaseline: 'middle'
            });

            if (feature.type === 'Polygon' || feature.type === 'Point') {
                if ((style['text-allow-overlap'] !== 'true') &&
                        collides.checkPointWH([point[0], point[1] + offset], collisionWidth, collisionHeight, feature.kothicId)) {
                    return;
                }

                if (halo) {
                    ctx.strokeText(text, point[0], point[1] + offset);
                }
                ctx.fillText(text, point[0], point[1] + offset);

                var padding = style['-x-kot-min-distance'] || 20;
                collides.addPointWH([point[0], point[1] + offset], collisionWidth, collisionHeight, padding, feature.kothicId);

            } else if (feature.type === 'LineString') {

                var points = Kothic.geom.transformPoints(feature.coordinates, ws, hs);
                Kothic.textOnPath(ctx, points, text, halo, collides);
            }
        }

        if (renderIcon) {
            ctx.drawImage(img,
                    Math.floor(point[0] - w / 2),
                    Math.floor(point[1] - h / 2), w, h);

            var padding2 = parseFloat(style['-x-kot-min-distance']) || 0;
            collides.addPointWH(point, w, h, padding2, feature.kothicId);
        }
    }
};
