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


Kothic.CollisionBuffer = function (height, width) {
    this.buffer = rbush();
    this.height = height;
    this.width = width;
};

Kothic.CollisionBuffer.prototype = {
    addPointWH: function (point, w, h, d, id) {
        this.buffer.insert(this.getBoxFromPoint(point, w, h, d, id));
    },

    addPoints: function (params) {
        var points = [];
        for (var i = 0, len = params.length; i < len; i++) {
            points.push(this.getBoxFromPoint.apply(this, params[i]));
        }
        this.buffer.load(points);
    },

    checkBox: function (b, id) {
        var result = this.buffer.search(b),
            i, len;

        if (b[0] < 0 || b[1] < 0 || b[2] > this.width || b[3] > this.height) { return true; }

        for (i = 0, len = result.length; i < len; i++) {
            // if it's the same object (only different styles), don't detect collision
            if (id !== result[i][4]) {
                return true;
            }
        }

        return false;
    },

    checkPointWH: function (point, w, h, id) {
        return this.checkBox(this.getBoxFromPoint(point, w, h, 0), id);
    },

    getBoxFromPoint: function (point, w, h, d, id) {
        var dx = w / 2 + d,
            dy = h / 2 + d;

        return [
            point[0] - dx,
            point[1] - dy,
            point[0] + dx,
            point[1] + dy,
            id
        ];
    }
};
