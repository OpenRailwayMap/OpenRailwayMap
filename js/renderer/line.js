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


Kothic.line = {

    renderCasing: function (ctx, feature, nextFeature, ws, hs, granularity) {
        var style = feature.style,
            nextStyle = nextFeature && nextFeature.style;

        if (!this.pathOpened) {
            this.pathOpened = true;
            ctx.beginPath();
        }

        Kothic.path(ctx, feature, style["casing-dashes"] || style.dashes, false, ws, hs, granularity);

        if (nextFeature &&
                nextStyle.width === style.width &&
                nextStyle['casing-width'] === style['casing-width'] &&
                nextStyle['casing-color'] === style['casing-color'] &&
                nextStyle['casing-dashes'] === style['casing-dashes'] &&
                nextStyle['casing-opacity'] === style['casing-opacity']) {
            return;
        }

        Kothic.style.setStyles(ctx, {
            lineWidth: 2 * style["casing-width"] + (style.hasOwnProperty("width") ? style.width : 0),
            strokeStyle: style["casing-color"] || "#000000",
            lineCap: style["casing-linecap"] || style.linecap || "butt",
            lineJoin: style["casing-linejoin"] || style.linejoin || "round",
            globalAlpha: style["casing-opacity"] || 1
        });

        ctx.stroke();
        this.pathOpened = false;
    },

    render: function (ctx, feature, nextFeature, ws, hs, granularity) {
        var style = feature.style,
            nextStyle = nextFeature && nextFeature.style;

        if (!this.pathOpened) {
            this.pathOpened = true;
            ctx.beginPath();
        }

        Kothic.path(ctx, feature, style.dashes, false, ws, hs, granularity);

        if (nextFeature &&
                nextStyle.width === style.width &&
                nextStyle.color === style.color &&
                nextStyle.image === style.image &&
                nextStyle.opacity === style.opacity) {
            return;
        }

        if ('color' in style || !('image' in style)) {
            var t_width = style.width || 1,
                t_linejoin = "round",
                t_linecap = "round";

            if (t_width <= 2) {
                t_linejoin = "miter";
                t_linecap = "butt";
            }
            Kothic.style.setStyles(ctx, {
                lineWidth: t_width,
                strokeStyle: style.color || '#000000',
                lineCap: style.linecap || t_linecap,
                lineJoin: style.linejoin || t_linejoin,
                globalAlpha: style.opacity || 1,
                miterLimit: 4
            });
            ctx.stroke();
        }


        if ('image' in style) {
            // second pass fills with texture
            var image = MapCSS.getImage(style.image);

            if (image) {
                Kothic.style.setStyles(ctx, {
                    strokeStyle: ctx.createPattern(image, 'repeat') || "#000000",
                    lineWidth: style.width || 1,
                    lineCap: style.linecap || "round",
                    lineJoin: style.linejoin || "round",
                    globalAlpha: style.opacity || 1
                });

                ctx.stroke();
            }
        }
        this.pathOpened = false;
    },

    pathOpened: false
};
