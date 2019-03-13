var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../resource/bluetooth/CheckManager.js")), t = getApp();

Page({
    data: {},
    onLoad: function(e) {
        t.globalData.goBackToWelcome = "../thrid/welcome/welcome2";
    },
    onReady: function() {},
    onShow: function() {
        this.updateHeader();
    },
    updateHeader: function() {
        var e = this;
        if (t.globalData.netuserInfo && t.globalData.netuserInfo instanceof Object) {
            var a = new Date(t.globalData.netuserInfo.userBirthday.time), n = new Date(), o = t.globalData.netuserInfo.userName;
            t.globalData.netuserInfo.userSex || (t.globalData.netuserInfo.userSex = "");
            var u = 2 == t.globalData.netuserInfo.userSex ? "女" : 1 == t.globalData.netuserInfo.userSex ? "男" : "无", l = n.getFullYear() - a.getFullYear() - (n.getMonth() < a.getMonth() || n.getMonth() == a.getMonth() && n.getDate() < a.getDate() ? 1 : 0), r = t.globalData.netuserInfo.userHeight, s = t.globalData.netuserInfo.userWeight;
            e.setData({
                name: o,
                sex: u,
                age: l,
                height: r,
                weight: s
            });
        } else t.login(function() {
            if (t.globalData.netuserInfo) {
                var a = new Date(t.globalData.netuserInfo.userBirthday.time), n = new Date(), o = t.globalData.netuserInfo.userName;
                t.globalData.netuserInfo.userSex || (t.globalData.netuserInfo.userSex = "");
                var u = 2 == t.globalData.netuserInfo.userSex ? "女" : 1 == t.globalData.netuserInfo.userSex ? "男" : "无", l = n.getFullYear() - a.getFullYear() - (n.getMonth() < a.getMonth() || n.getMonth() == a.getMonth() && n.getDate() < a.getDate() ? 1 : 0), r = t.globalData.netuserInfo.userHeight, s = t.globalData.netuserInfo.userWeight;
                e.setData({
                    name: o,
                    sex: u,
                    age: l,
                    height: r,
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
    connectBlue: function(t) {
        e.default.getBlueState().isConnected ? wx.reLaunch({
            url: "welcome3",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        }) : wx.navigateTo({
            url: "../../bluetooth/sreachbluetooth1"
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