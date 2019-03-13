function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
}, r = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
    };
}(), n = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
}, u = function() {
    function u() {
        e(this, u), this.tasks = [], this._header = {
            token: "null",
            Accept: "text / html, application/xhtml+xml,application/xml;q=0.9, */*;q=0.8",
            "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
            "Content-Type": "application/x-www-form-urlencoded"
        }, this._baseUrl = null, this.interceptors = [];
        var t = wx.getStorageSync("token");
        t && (this._header.token = t);
    }
    return r(u, [ {
        key: "intercept",
        value: function(e) {
            return this.interceptors.filter(function(e) {
                return "function" == typeof e;
            }).every(function(t) {
                return t(e);
            });
        }
    }, {
        key: "request",
        value: function(e) {
            var r = this, u = e.url, a = e.method, i = e.header, o = void 0 === i ? {} : i, s = e.data;
            return new Promise(function(e, i) {
                var c = wx.request({
                    url: (r._baseUrl || "") + u,
                    method: a || n.GET,
                    data: s,
                    header: t({}, r._header, o),
                    success: function(t) {
                        return r.intercept(t) && e(t);
                    },
                    fail: i
                });
                r.tasks.push(c);
            });
        }
    }, {
        key: "get",
        value: function(e, t, r) {
            return this.request({
                url: e,
                method: n.GET,
                header: r,
                data: t
            });
        }
    }, {
        key: "post",
        value: function(e, t, r) {
            return this.request({
                url: e,
                method: n.POST,
                header: r,
                data: t
            });
        }
    }, {
        key: "put",
        value: function(e, t, r) {
            return this.request({
                url: e,
                method: n.PUT,
                header: r,
                data: t
            });
        }
    }, {
        key: "delete",
        value: function(e, t, r) {
            return this.request({
                url: e,
                method: n.DELETE,
                header: r,
                data: t
            });
        }
    }, {
        key: "token",
        value: function(e) {
            return this._header.token = e, this;
        }
    }, {
        key: "header",
        value: function(e) {
            return this._header = e, this;
        }
    }, {
        key: "baseUrl",
        value: function(e) {
            return this._baseUrl = e, this;
        }
    }, {
        key: "interceptor",
        value: function(e) {
            return "function" == typeof e && this.interceptors.push(e), this;
        }
    } ]), u;
}();

exports.default = new u(), exports.METHOD = n;