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


Kothic.shields = {
    render: function (ctx, feature, collides, ws, hs) {
        var style = feature.style, reprPoint = Kothic.geom.getReprPoint(feature),
            point, img, len = 0, found = false, i, sgn;

        if (!reprPoint) {
            return;
        }

        point = Kothic.geom.transformPoint(reprPoint, ws, hs);

        if (style["shield-image"]) {
            img = MapCSS.getImage(style["icon-image"]);

            if (!img) {
                return;
            }
        }

        Kothic.style.setStyles(ctx, {
            font: Kothic.style.getFontString(style["shield-font-family"] || style["font-family"], style["shield-font-size"] || style["font-size"]),
            fillStyle: style["shield-text-color"] || "#000000",
            globalAlpha: style["shield-text-opacity"] || style.opacity || 1,
            textAlign: 'center',
            textBaseline: 'middle'
        });

        var text = String(style['shield-text']),
                textWidth = ctx.measureText(text).width,
                letterWidth = textWidth / text.length,
                collisionWidth = textWidth + 2,
                collisionHeight = letterWidth * 1.8;

        if (feature.type === 'LineString') {
            len = Kothic.geom.getPolyLength(feature.coordinates);

            if (Math.max(collisionHeight / hs, collisionWidth / ws) > len) {
                return;
            }

            for (i = 0, sgn = 1; i < len / 2; i += Math.max(len / 30, collisionHeight / ws), sgn *= -1) {
                reprPoint = Kothic.geom.getAngleAndCoordsAtLength(feature.coordinates, len / 2 + sgn * i, 0);
                if (!reprPoint) {
                    break;
                }

                reprPoint = [reprPoint[1], reprPoint[2]];

                point = Kothic.geom.transformPoint(reprPoint, ws, hs);
                if (img && (style["allow-overlap"] !== "true") &&
                        collides.checkPointWH(point, img.width, img.height, feature.kothicId)) {
                    continue;
                }
                if ((style["allow-overlap"] !== "true") &&
                        collides.checkPointWH(point, collisionWidth, collisionHeight, feature.kothicId)) {
                    continue;
                }
                found = true;
                break;
            }
        }

        if (!found) {
            return;
        }

        if (style["shield-casing-width"]) {
            Kothic.style.setStyles(ctx, {
                fillStyle: style["shield-casing-color"] || "#000000",
                globalAlpha: style["shield-casing-opacity"] || style.opacity || 1
            });
            ctx.fillRect(point[0] - collisionWidth / 2 - (style["shield-casing-width"] || 0) - (style["shield-frame-width"] || 0),
                    point[1] - collisionHeight / 2 - (style["shield-casing-width"] || 0) - (style["shield-frame-width"] || 0),
                    collisionWidth + 2 * (style["shield-casing-width"] || 0) + 2 * (style["shield-frame-width"] || 0),
                    collisionHeight + 2 * (style["shield-casing-width"] || 0) + 2 * (style["shield-frame-width"] || 0));
        }

        if (style["shield-frame-width"]) {
            Kothic.style.setStyles(ctx, {
                fillStyle: style["shield-frame-color"] || "#000000",
                globalAlpha: style["shield-frame-opacity"] || style.opacity || 1
            });
            ctx.fillRect(point[0] - collisionWidth / 2 - (style["shield-frame-width"] || 0),
                    point[1] - collisionHeight / 2 - (style["shield-frame-width"] || 0),
                    collisionWidth + 2 * (style["shield-frame-width"] || 0),
                    collisionHeight + 2 * (style["shield-frame-width"] || 0));
        }

        if (style["shield-color"]) {
            Kothic.style.setStyles(ctx, {
                fillStyle: style["shield-color"] || "#000000",
                globalAlpha: style["shield-opacity"] || style.opacity || 1
            });
            ctx.fillRect(point[0] - collisionWidth / 2,
                    point[1] - collisionHeight / 2,
                    collisionWidth,
                    collisionHeight);
        }

        if (img) {
            ctx.drawImage(img,
                Math.floor(point[0] - img.width / 2),
                Math.floor(point[1] - img.height / 2));
        }
        Kothic.style.setStyles(ctx, {
            fillStyle: style["shield-text-color"] || "#000000",
            globalAlpha: style["shield-text-opacity"] || style.opacity || 1
        });

        ctx.fillText(text, point[0], Math.ceil(point[1]));
        if (img) {
            collides.addPointWH(point, img.width, img.height, 0, feature.kothicId);
        }

        collides.addPointWH(point, collisionHeight, collisionWidth,
                (parseFloat(style["shield-casing-width"]) || 0) + (parseFloat(style["shield-frame-width"]) || 0) + (parseFloat(style["-x-mapnik-min-distance"]) || 30), feature.kothicId);

    }
};
