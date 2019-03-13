function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var e = a(require("../../../utils/cache.js")), t = a(require("../../../utils/netutils.js")), o = getApp(), i = require("../../../utils/ports.js");

Page({
    data: {
        winWidth: o.globalData.winWidth,
        winHeight: o.globalData.winHeight,
        requestCount: 3,
        isUpLoadOk: 0,
        uploadTime: 0,
        reUploadShow: !0,
        uploadTimes: 1
    },
    onLoad: function(a) {
        a.uploadData && (this.setData({
            updataData: a.uploadData,
            uploadTimes: 2 == getApp().globalData.uploadTimes ? 2 : 1
        }), this.upload(a.uploadData));
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    upload: function(a) {
        console.log("///////////////////upload");
        var t = this;
        t.uploadVal(a).then(function(a) {
            if (wx.hideLoading(), console.log(a), 200 == a.data.code) {
                getApp().globalData.checkQuestion = a.data.question, t.setData({
                    isUpLoadOk: 1
                });
                var i = a.data;

              console.log("打印意思结果key" + e.default.check_result)
              console.log("打印意思结果value" + JSON.stringify(i))
                o.save(e.default.check_result, JSON.stringify(i));
            } else t.setData({
                isUpLoadOk: 2
            });
        }, function(a) {
            wx.hideLoading(), t.setData({
                isUpLoadOk: 3
            });
        });
    },
    uploadTest: function(a) {
        console.log("///////////////////upload");
        var t = this;
        t.uploadVal(a).then(function(a) {
            if (console.log(a), t.setData({
                uploadTime: t.data.uploadTime++
            }), console.log(t.data.uploadTime), 100 == t.data.uploadTime && wx.hideLoading(), 
            200 == a.data.code && 100 == t.data.uploadTime) {
                getApp().globalData.checkQuestion = a.data.question, t.setData({
                    isUpLoadOk: 1
                });
                var i = a.data;
                o.save(e.default.check_result, JSON.stringify(i));
            } else t.setData({
                isUpLoadOk: 2
            });
        }, function(a) {
            wx.hideLoading(), t.setData({
                isUpLoadOk: 3
            });
        });
    },
    uploadVal: function(a) { 
        var u = this, s = o.globalData.netuserInfo;
        if (console.log(s), s && s instanceof Object) {
            var n = new Date(s.userBirthday.time).format("yyyy-MM-dd"), d = (o.read(e.default.id_key), 
            o.globalData.OrderId), l = s.id;
            console.log(n, s.userSex);
            var r = s.userName, p = s.userHeight, c = s.userSex, g = s.userWeight, h = s.openId;
            return console.log({
                id: l,
                userOrderId: d,
                userBirthday: n,
                userWeight: g,
                userName: r,
                userHeight: p,
                userSex: c,
                val: a,
                openId: h,
                zhuangTai: u.data.uploadTimes,
                question: getApp().globalData.question
            }), t.default.post(i.checkUser, {
                id: l,
                userOrderId: d,
                userBirthday: n,
                userWeight: g,
                userName: r,
                userHeight: p,
                userSex: c,
                val: a,
                openId: h,
                zhuangTai: u.data.uploadTimes,
                question: getApp().globalData.question
            });
        }
        return new Promise(function(e, t) {
            o.login(function() {
                s && s instanceof Object ? (u.requestCount > 0 && u.upload(a), u.requestCount--, 
                e()) : t();
            });
        });
    },
    getCheckResult: function(a) {
        1 == this.data.isUpLoadOk ? wx.navigateTo({
            url: "/pages/webResult/webResult?type=TestReport&ordersn=" + o.globalData.OrderId
        }) : 0 == this.data.isUpLoadOk || this.data.isUpLoadOk > 1 && wx.reLaunch({
            url: "../welcome/welcome2"
        });
    },
    reUpload: function() {
        this.setData({
            isUpLoadOk: 0,
            uploadTimes: 2
        }), this.upload(this.data.updataData);
    },
    reCheck: function() {
        getApp().globalData.uploadTimes = 2, wx.reLaunch({
            url: "/pages/thrid/welcome/welcome2"
        });
    }
});