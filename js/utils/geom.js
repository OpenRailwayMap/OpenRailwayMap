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


Kothic.geom = {
    transformPoint: function (point, ws, hs) {
        return [ws * point[0], hs * point[1]];
    },

    transformPoints: function (points, ws, hs) {
        var transformed = [], i, len;
        for (i = 0, len = points.length; i < len; i++) {
            transformed.push(this.transformPoint(points[i], ws, hs));
        }
        return transformed;
    },

    getReprPoint: function (feature) {
        var point, len;
        switch (feature.type) {
        case 'Point':
            point = feature.coordinates;
            break;
        case 'Polygon':
            point = feature.reprpoint;
            break;
        case 'LineString':
            len = Kothic.geom.getPolyLength(feature.coordinates);
            point = Kothic.geom.getAngleAndCoordsAtLength(feature.coordinates, len / 2, 0);
            point = [point[1], point[2]];
            break;
        case 'GeometryCollection':
            //TODO: Disassemble geometry collection
            return;
        case 'MultiPoint':
            //TODO: Disassemble multi point
            return;
        case 'MultiPolygon':
            point = feature.reprpoint;
            break;
        case 'MultiLineString':
            //TODO: Disassemble geometry collection
            return;
        }
        return point;
    },

    getPolyLength: function (points) {
        var pointsLen = points.length,
                c, pc, i,
                dx, dy,
                len = 0;

        for (i = 1; i < pointsLen; i++) {
            c = points[i];
            pc = points[i - 1];
            dx = pc[0] - c[0];
            dy = pc[1] - c[1];
            len += Math.sqrt(dx * dx + dy * dy);
        }
        return len;
    },

    getAngleAndCoordsAtLength: function (points, dist, width) {
        var pointsLen = points.length,
            dx, dy, x, y,
            i, c, pc,
            len = 0,
            segLen = 0,
            angle, partLen, sameseg = true,
            gotxy = false;

        width = width || 0; // by default we think that a letter is 0 px wide

        for (i = 1; i < pointsLen; i++) {
            if (gotxy) {
                sameseg = false;
            }

            c = points[i];
            pc = points[i - 1];

            dx = c[0] - pc[0];
            dy = c[1] - pc[1];
            segLen = Math.sqrt(dx * dx + dy * dy);

            if (!gotxy && len + segLen >= dist) {
                partLen = dist - len;
                x = pc[0] + dx * partLen / segLen;
                y = pc[1] + dy * partLen / segLen;

                gotxy = true;
            }

            if (gotxy && len + segLen >= dist + width) {
                partLen = dist + width - len;
                dx = pc[0] + dx * partLen / segLen;
                dy = pc[1] + dy * partLen / segLen;
                angle = Math.atan2(dy - y, dx - x);

                if (sameseg) {
                    return [angle, x, y, segLen - partLen];
                } else {
                    return [angle, x, y, 0];
                }
            }

            len += segLen;
        }
    }
};

