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


Kothic.polygon = {
    render: function (ctx, feature, nextFeature, ws, hs, granularity) {
        var style = feature.style,
            nextStyle = nextFeature && nextFeature.style;

        if (!this.pathOpened) {
            this.pathOpened = true;
            ctx.beginPath();
        }

        Kothic.path(ctx, feature, false, true, ws, hs, granularity);

        if (nextFeature &&
                (nextStyle['fill-color'] === style['fill-color']) &&
                (nextStyle['fill-image'] === style['fill-image']) &&
                (nextStyle['fill-opacity'] === style['fill-opacity'])) {
            return;
        }

        this.fill(ctx, style);

        this.pathOpened = false;
    },

    fill: function (ctx, style, fillFn) {
        var opacity = style["fill-opacity"] || style.opacity, image;

        if (style.hasOwnProperty('fill-color')) {
            // first pass fills with solid color
            Kothic.style.setStyles(ctx, {
                fillStyle: style["fill-color"] || "#000000",
                globalAlpha: opacity || 1
            });
            if (fillFn) {
                fillFn();
            } else {
                ctx.fill();
            }
        }

        if (style.hasOwnProperty('fill-image')) {
            // second pass fills with texture
            image = MapCSS.getImage(style['fill-image']);
            if (image) {
                Kothic.style.setStyles(ctx, {
                    fillStyle: ctx.createPattern(image, 'repeat'),
                    globalAlpha: opacity || 1
                });
                if (fillFn) {
                    fillFn();
                } else {
                    ctx.fill();
                }
            }
        }
    }
};
