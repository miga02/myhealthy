var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../resource/bluetooth/CheckManager.js")), t = getApp();

Page({
    data: {
        winWidth: t.globalData.winWidth,
        winHeight: t.globalData.winHeight,
        imagesUrls: [ "image/zhaopian1.jpg" ],
        currentIndex: 0
    },
    sreachBlue: function() {
        e.default.getBlueState().isCanUsed ? wx.navigateTo({
            url: "../bluetooth/sreachbluetooth1"
        }) : wx.redirectTo({
            url: "welcome2"
        });
    },
    onLoad: function(a) {
        var n = this;
        t.globalData.goBackToWelcome = "../thrid/welcome/welcome4", e.default.init(), t.globalData.notifyStateChange = function() {
            n.setData({
                bluetoothState: e.default.getBlueState().isCanUsed
            });
        };
    },
    onReady: function() {},
    onShow: function() {
        this.updateHeader(), this.next = !1;
    },
    updateHeader: function() {
        var e = this;
        if (t.globalData.netuserInfo && t.globalData.netuserInfo instanceof Object) {
            var a = new Date(t.globalData.netuserInfo.userBirthday.time), n = new Date(), o = t.globalData.netuserInfo.userName;
            t.globalData.netuserInfo.userSex || (t.globalData.netuserInfo.userSex = "");
            var r = 2 == t.globalData.netuserInfo.userSex ? "女" : 1 == t.globalData.netuserInfo.userSex ? "男" : "无", u = n.getFullYear() - a.getFullYear() - (n.getMonth() < a.getMonth() || n.getMonth() == a.getMonth() && n.getDate() < a.getDate() ? 1 : 0), l = t.globalData.netuserInfo.userHeight, s = t.globalData.netuserInfo.userWeight;
            e.setData({
                name: o,
                sex: r,
                age: u,
                height: l,
                weight: s
            });
        } else t.login(function() {
            if (t.globalData.netuserInfo) {
                var a = new Date(t.globalData.netuserInfo.userBirthday.time), n = new Date(), o = t.globalData.netuserInfo.userName;
                t.globalData.netuserInfo.userSex || (t.globalData.netuserInfo.userSex = "");
                var r = 2 == t.globalData.netuserInfo.userSex ? "女" : 1 == t.globalData.netuserInfo.userSex ? "男" : "无", u = n.getFullYear() - a.getFullYear() - (n.getMonth() < a.getMonth() || n.getMonth() == a.getMonth() && n.getDate() < a.getDate() ? 1 : 0), l = t.globalData.netuserInfo.userHeight, s = t.globalData.netuserInfo.userWeight;
                e.setData({
                    name: o,
                    sex: r,
                    age: u,
                    height: l,
                    weight: s
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    startCheck: function() {
        this.next || (this.next = !1, wx.reLaunch({
            url: "../tcheck/check"
        }));
    },
    nextXZ: function(e) {
        var t = ++this.data.currentIndex;
        t > 2 && (t = 2), this.setData({
            currentIndex: t % 3
        });
    },
    prev: function(e) {
        var t = --this.data.currentIndex;
        t < 0 && (t = 0), this.setData({
            currentIndex: t % 3
        });
    },
    change: function(e) {
        var t = e.detail.current;
        console.log("out:" + JSON.stringify(e)), this.setData({
            currentIndex: t
        });
    },
    goHistory: function() {
        t.globalData.netuserInfo ? wx.navigateTo({
            url: "../../hostory/hostory?type=0",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        }) : wx.showLoading({
            title: "请稍后"
        });
    }
});