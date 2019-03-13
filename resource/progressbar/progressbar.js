function t(t, i) {
    if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = function() {
    function t(t, i) {
        for (var s = 0; s < i.length; s++) {
            var e = i[s];
            e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), 
            Object.defineProperty(t, e.key, e);
        }
    }
    return function(i, s, e) {
        return s && t(i.prototype, s), e && t(i, e), i;
    };
}(), s = function() {
    function s(i) {
        t(this, s), this.id = i, this.cxt_arc = wx.createCanvasContext(i), this.number = 0, 
        this.bg = "#d2d2d2", this.fg = "#FF9600", this.isDrawing = !0, this.width = 100, 
        this.heigth = 100, this.radius = 94, this.lineMinWidth = 4, this.lineMaxWidth = 8;
    }
    return i(s, [ {
        key: "show",
        value: function() {
            this.draw(0);
        }
    }, {
        key: "draw",
        value: function(t) {
            this.isDrawing && (this.number = t || 0, this.cxt_arc.setLineWidth(this.lineMinWidth), 
            this.cxt_arc.setStrokeStyle(this.bg), this.cxt_arc.setLineCap("round"), this.cxt_arc.arc(this.width, this.heigth, this.radius, 0, 2 * Math.PI, !1), 
            this.cxt_arc.stroke(), this.cxt_arc.setLineWidth(this.lineMaxWidth), this.cxt_arc.setStrokeStyle(this.fg), 
            this.cxt_arc.setLineCap("round"), this.cxt_arc.beginPath(), this.cxt_arc.arc(this.width, this.heigth, this.radius, -.5 * Math.PI, Math.PI * t / 180 - (.5 - 1 / 1440) * Math.PI, !1), 
            this.cxt_arc.stroke(), this.cxt_arc.setLineWidth(this.lineMinWidth), this.cxt_arc.setStrokeStyle("#ffffff"), 
            this.cxt_arc.setLineCap("round"), this.cxt_arc.beginPath(), this.cxt_arc.arc(this.width, this.heigth, this.radius, Math.PI * t / 180 + (-.5 - 1 / 1440) * Math.PI, Math.PI * t / 180 - .5 * Math.PI, !1), 
            this.cxt_arc.stroke(), this.cxt_arc.draw(), 360 == t && (this.number = 0, this.puase(), 
            "function" == typeof this.callback && this.callback()));
        }
    }, {
        key: "puase",
        value: function() {
            this.isDrawing = !1;
        }
    }, {
        key: "start",
        value: function() {
            this.isDrawing = !0;
        }
    }, {
        key: "addOnListener",
        value: function(t) {
            this.callback = t;
        }
    }, {
        key: "restart",
        value: function() {
            this.isDrawing = !0, this.animation();
        }
    }, {
        key: "animation",
        value: function() {
            if (this.isDrawing) {
                var t = this;
                this.number += 2, this.draw(this.number), setTimeout(function() {
                    t.animation();
                }, 20);
            }
        }
    }, {
        key: "stop",
        value: function() {
            this.isDrawing = !1, this.number = 0;
        }
    } ]), s;
}();

exports.default = s;