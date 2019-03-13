var t = function(t) {
    return (t = t.toString())[1] ? t : "0" + t;
};

module.exports = {
    formatTime: function(e) {
        var n = e.getFullYear(), o = e.getMonth() + 1, g = e.getDate(), r = e.getHours(), u = e.getMinutes(), s = e.getSeconds();
        return [ n, o, g ].map(t).join("/") + " " + [ r, u, s ].map(t).join(":");
    },
    timestampToTime: function(t) {
        var e = new Date(t);
        return e.getFullYear() + "/" + (e.getMonth() + 1 < 10 ? "0" + (e.getMonth() + 1) : e.getMonth() + 1) + "/" + e.getDate() + " " + (e.getHours() < 10 ? "0" + e.getHours() : e.getHours() + ":") + (e.getMinutes() < 10 ? "0" + e.getMinutes() : e.getMinutes() + ":") + (e.getSeconds() < 10 ? "0" + e.getSeconds() : e.getSeconds());
    }
};