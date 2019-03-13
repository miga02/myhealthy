function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../../resource/progressbar/progressbar.js")), a = e(require("../../../resource/bluetooth/CheckManager.js")), n = (e(require("../../../utils/cache.js")), 
e(require("../../../utils/netutils.js"))), s = require("../../../utils/ports.js"), i = getApp(), c = [ "脑血管供血功能", "呼吸功能", "内分泌功能", "肝脏代谢功能", "前列腺功能", "泌尿系代谢功能", "脊柱健康功能", "血脂代谢功能", "免疫功能", "维生素含量", "微量元素含量" ], r = [ "脑血管供血功能", "呼吸功能", "内分泌功能", "肝脏代谢功能", "泌尿系代谢功能", "脊柱健康功能", "血脂代谢功能", "免疫功能", "维生素含量", "微量元素含量" ], o = [ "a", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ], l = [ "a", 1, 2, 3, 5, 6, 7, 8, 9, 10 ];

Page({
    data: {
        winWidth: i.globalData.winWidth,
        winHeight: i.globalData.winHeight,
        state: "检 测 中",
        watchCase: i.globalData.watchCase,
        currentIndex: 0,
        checkinfo: c[0],
        imageUrl: "0a",
        ishideCheck: i.globalData.OrderCheckStatus,
        hidden: "hidden",
        animationData: ""
    },
    onLoad: function(e) {
        var a = this;
        i.globalData.goBackToWelcome = "tcheck/check";
        var n = wx.getStorageSync("bluebody-scan-mp4");
        if (a.setData({
            playerurl: n || "https://hyexplore.chobmi.cn/test/4b90fb704df0eb6bb398e418c32c5683.mp4"
        }), a.init(), this.check(), i.globalData.netuserInfo) {
            var s = i.globalData.netuserInfo.userName;
            wx.setNavigationBarTitle({
                title: s + "的健康分析"
            });
        }
        this.bar = new t.default("progressCanvas"), this.bar.addOnListener(function() {
            a.bar.stop(), a.setData({
                state: "检 测 中",
                watchCase: !0
            });
        });
    },
    onReady: function() {
        this.data.winWidth;
    },
    onShow: function() {
        this.bar.start(), this.bar.show(), this.checkAndStop(), this.show = !0;
    },
    onHide: function() {
        this.show = !1, a.default.end();
    },
    onUnload: function() {
        wx.setKeepScreenOn({
            keepScreenOn: !1
        }), a.default.addOnReceivedDataStateListener(null), a.default.addOnCheckDataFinishListener(null), 
        a.default.addCheckDataProgressListener(null);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    bindtimeupdate: function(e) {},
    lllll: function(e) {
        console.log("sssss");
    },
    check: function() {
        var e = this;
        a.default.getBlueState().isConnected ? (a.default.addCheckDataProgressListener(function(t) {
            console.log("三生三世1" + t), t && e.update(t);
        }), a.default.addOnCheckDataFinishListener(function(t) {
          console.log("t:"+t)
          console.log("getApp().globalData.emptyVoltage:" + getApp().globalData.emptyVoltage)
            var a = 2.1 * parseFloat(t).toFixed(5) / getApp().globalData.emptyVoltage;
          console.log(a)
            e.setData({
                uploadData: a
            }), e.finishCheck(!1);
        }), a.default.addOnReceivedDataStateListener(function(t) {
            switch (console.log("状态：" + t), t) {
              case "start":
                e.setData({
                    state: "检 测 中",
                    currentIndex: 1,
                    imageUrl: o[1],
                    checkinfo: c[1],
                    watchCase: !0,
                    checkStart: !!a.default.isBeginTime && a.default.isBeginTime
                });
                break;

              case "end":
                e.reset(), e.setData({
                    state: "重 新 检 测",
                    currentIndex: 0,
                    watchCase: !0,
                    imageUrl: "0a",
                    checkStart: !!a.default.isBeginTime && a.default.isBeginTime
                });
                break;

              case "pause":
                e.setData({
                    state: "检 测 暂 停",
                    watchCase: !0,
                    checkStart: !1
                });
                break;

              case "continue":
                e.setData({
                    state: "继 续 检 测",
                    watchCase: !0,
                    checkStart: !0
                });
                break;

              case "error":
                e.reset(), e.setData({
                    state: "检 测 失 败",
                    watchCase: !0,
                    clickTrue: !1,
                    checkStart: !!a.default.isBeginTime && a.default.isBeginTime
                }), e.isExit || (wx.redirectTo({
                    url: "../welcome/welcome2",
                    success: function(e) {},
                    fail: function(e) {},
                    complete: function(e) {}
                }), e.isExit = !0);
                break;

              case "timeout":
                e.setData({
                    state: "检测超时重新检测",
                    watchCase: !0,
                    clickTrue: !1,
                    checkStart: !!a.default.isBeginTime && a.default.isBeginTime
                }), e.isExit || (wx.redirectTo({
                    url: "../welcome/welcome2",
                    success: function(e) {},
                    fail: function(e) {},
                    complete: function(e) {}
                }), e.isExit = !0);
                break;

              case "noconnect":
                e.reset(), e.setData({
                    state: "蓝灯亮后自动重连",
                    watchCase: !0,
                    clickTrue: !1,
                    checkStart: !1
                }), e.isExit || (wx.redirectTo({
                    url: "../welcome/welcome2",
                    success: function(e) {},
                    fail: function(e) {},
                    complete: function(e) {}
                }), e.isExit = !0);
            }
        })) : wx.reLaunch({
            url: "../welcome/welcome2",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    init: function() {},
    showM: function(e, t, a) {
        wx.showModal({
            title: e,
            content: t,
            showCancel: !1,
            success: a
        });
    },
    finishCheck: function(e) {
        var t = this;
        e && !t.isEnd ? t.isEndFirst || (t.isEndFirst = !0, wx.reLaunch({
            url: "../welcome/welcome2",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        })) : t.isEndFirst || (t.isEndFirst = !0, wx.reLaunch({
            url: "tempCheck?uploadData=" + t.data.uploadData
        }));
    },
    getCurrentRecord: function(e, t, a) {
        var c = this;
        n.default.post(s.getHistory, {
            userid: e,
            userOrderId: i.globalData.OrderId,
            start: t,
            end: a
        }).then(function(e) {
            var t = e.data;
            if (t && t instanceof Object) {
                var a = t[0];
                if (a) {
                    var n = a.score ? a.score : 0, s = a.testDatetime.replace("T", " ").substring(0, a.testDatetime.lastIndexOf(":")).replace(/-/g, "/"), i = "#F93C02";
                    n > 70 ? i = "#0db09b" : n > 40 && (i = "#F39800"), c.setData({
                        lastRecord: {
                            title: "综合评分",
                            score: n,
                            dateTime: s,
                            color: i
                        }
                    });
                } else c.setData({
                    lastRecord: null
                });
            }
        }, function(e) {
            console.log("222:" + JSON.stringify(e));
        });
    },
    checkAndStop: function() {
        a.default.checkStart || (a.default.getBlueState().isConnected ? (a.default.start1(), 
        i.globalData.netuserInfo && 2 == i.globalData.netuserInfo.userSex ? (this.data.currentIndex = 0, 
        this.setData({
            imageUrl: l[this.data.currentIndex % l.length],
            checkinfo: r[this.data.currentIndex % r.length]
        })) : (this.data.currentIndex = 0, this.setData({
            imageUrl: o[this.data.currentIndex % o.length],
            checkinfo: c[this.data.currentIndex % c.length]
        })), console.log(this.data.currentIndex), this.setData({
            checkStart: a.default.isBeginTime
        })) : this.isExit ? console.log("exit:" + this.isExit) : (wx.redirectTo({
            url: "../welcome/welcome2",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        }), this.isExit = !0));
    },
    reset: function() {
        this.bar.start(), this.bar.show();
        i.globalData.netuserInfo && i.globalData.netuserInfo.userSex, this.setData({
            currentIndex: 0,
            imageUrl: "0a",
            clickTrue: !1,
            checkinfo: "即将检测"
        });
    },
    update: function(e) {
        this.bar.draw(360 * a.default.readIndex / a.default.readYouData.length), i.globalData.netuserInfo && 2 == i.globalData.netuserInfo.userSex ? 0 == a.default.readIndex % Math.floor(a.default.readCount / l.length) && ++this.data.currentIndex < l.length && this.setData({
            imageUrl: l[this.data.currentIndex % l.length],
            checkinfo: r[this.data.currentIndex % r.length]
        }) : 0 == a.default.readIndex % Math.floor(a.default.readCount / o.length) && ++this.data.currentIndex < o.length && this.setData({
            imageUrl: o[this.data.currentIndex % o.length],
            checkinfo: c[this.data.currentIndex % c.length]
        }), console.log("sssss:" + this.data.currentIndex + "read:index=" + a.default.readIndex, "mo" + this.data.currentIndex % o.length + "sss" + o.length);
    }
});