function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../../resource/progressbar/progressbar.js")), a = e(require("../../../resource/bluetooth/CheckManager.js")), r = e(require("../../../utils/cache.js")), n = e(require("../../../utils/netutils.js")), s = require("../../../resource/table/wxcharts.js"), i = require("../../../utils/ports.js"), o = getApp(), l = new Array(25), c = [ "脑血管供血功能", "上呼吸道功能", "甲状腺代谢功能", "肝脏代谢功能", "前列腺功能", "泌尿系代谢功能", "脊柱健康功能", "血脂代谢功能", "风湿免疫功能", "人体维生素含量", "人体微量元素含量" ], d = [ "脑血管供血功能", "上呼吸道功能", "甲状腺代谢功能", "肝脏代谢功能", "泌尿系代谢功能", "脊柱健康功能", "血脂代谢功能", "风湿免疫功能", "人体维生素含量", "人体微量元素含量" ], u = [ "a", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ], h = [ "a", 1, 2, 3, 5, 6, 7, 8, 9, 10 ];

Page({
    data: {
        winWidth: o.globalData.winWidth,
        winHeight: o.globalData.winHeight,
        state: "开 始 检 测",
        watchCase: o.globalData.watchCase,
        currentIndex: 0,
        checkinfo: "即将检测",
        imageUrl: "0a",
        hidden: "hidden",
        animationData: "",
        isOrderId: o.globalData.OrderId,
        OrderId: o.globalData.OrderId,
        avplayer: "https://hyexplore.chobmi.cn/test/bluebody-scan.mp4"
    },
    onLoad: function(e) {
        var n = this;
        wx.setKeepScreenOn({
            keepScreenOn: !0
        });
        var s = new t.default("progressCanvas");
        this.bar = s, s.addOnListener(function() {
            s.stop(), n.setData({
                state: "开 始 检 测",
                watchCase: !0
            });
        }), s.start(), s.show(), a.default.addCheckDataProgressListener(function(e) {
            console.log("三生三世1" + e), e && n.update(e);
        }), a.default.addOnCheckDataFinishListener(function(e) {
            console.log("上传值" + e), n.reset();
            var t = o.globalData.netuserInfo, a = parseFloat(e).toFixed(5);
            t ? n.uploadVal(a).then(function(e) {
                console.log(JSON.stringify(e)), e.data ? (wx.showToast({
                    title: "查询成功"
                }), o.save(r.default.result_key, JSON.stringify(e)), wx.navigateTo({
                    url: "../checkresult/checkresult"
                })) : (wx.navigateTo({
                    url: "../checkresult/checkerror"
                }), wx.showToast({
                    title: "查询失败"
                })), wx.hideLoading();
            }, function(e) {
                console.log("网络连接失败"), wx.showToast({
                    title: "网络连接失败"
                }), wx.hideLoading();
            }).catch(function() {
                console.log("用户信息为空"), wx.hideLoading(), wx.showToast({
                    title: "用户信息为空"
                });
            }) : (n.showM("上传信息填写", "选择当前用户", function() {
                wx.navigateTo({
                    url: "../user/useradd"
                });
            }), o.save(r.default.usercheckValue, a));
        }), a.default.addOnReceivedDataStateListener(function(e) {
            switch (e) {
              case "start":
                n.setData({
                    state: "正 在 检 测",
                    currentIndex: 0,
                    imageUrl: u[0],
                    checkinfo: c[0],
                    watchCase: !0,
                    checkStart: !!a.default.isBeginTime && a.default.isBeginTime
                });
                break;

              case "end":
                n.reset(), n.setData({
                    state: "重 新 检 测",
                    currentIndex: 0,
                    watchCase: !0,
                    imageUrl: "0a",
                    checkStart: !!a.default.isBeginTime && a.default.isBeginTime
                });
                break;

              case "pause":
                o.globalData.OrderId && n.videoContext.pause(), n.setData({
                    state: "暂 停 检 测",
                    watchCase: !0,
                    checkStart: !1
                });
                break;

              case "continue":
                o.globalData.OrderId && n.videoContext.play(), n.setData({
                    state: "继 续 检 测",
                    watchCase: !0,
                    checkStart: !0
                });
                break;

              case "error":
                n.reset(), n.setData({
                    state: "检 测 失 败",
                    watchCase: !0,
                    clickTrue: !1,
                    checkStart: !!a.default.isBeginTime && a.default.isBeginTime
                });
                break;

              case "timeout":
                n.reset(), n.setData({
                    state: "检测超时重新检测",
                    watchCase: !0,
                    clickTrue: !1,
                    checkStart: !!a.default.isBeginTime && a.default.isBeginTime
                });
                break;

              case "noconnect":
                n.reset(), n.setData({
                    state: "蓝灯亮后开始测试",
                    watchCase: !0,
                    clickTrue: !1,
                    checkStart: !!a.default.isBeginTime && a.default.isBeginTime
                });
            }
        });
    },
    onReady: function() {
        var e = this.data.winWidth, t = this.createSimulationData();
        this.lineChart = new s({
            canvasId: "lineCanvas",
            type: "line",
            categories: t.categories,
            animation: !1,
            background: "#f5f5f5",
            series: [ {
                name: "成交量1",
                data: t.data,
                format: function(e, t) {
                    return e.toFixed(2) + "万";
                }
            } ],
            xAxis: {
                disableGrid: !0,
                disabled: !0,
                gridColor: "rgba(0,0,0,0)",
                fontColor: "rgba(0,0,0,0)"
            },
            yAxis: {
                min: -20,
                max: 20,
                disabled: !0,
                gridColor: "rgba(0,0,0,0)",
                fontColor: "rgba(0,0,0,0)"
            },
            width: e - 1,
            height: 130,
            dataLabel: !1,
            legend: !1,
            dataPointShape: !1,
            extra: {
                lineStyle: "curve"
            }
        });
    },
    onShow: function() {
        var e = this;
        o.globalData.seleteTab = 1, "function" == typeof o.globalData.notifyStateChange && o.globalData.notifyStateChange();
        var t = wx.getStorageSync("bluebody-scan-mp4");
        wx.getFileInfo({
            filePath: t,
            success: function(a) {
                console.log("文件存在吗？" + JSON.stringify(a)), e.setData({
                    avplayer: t
                });
            }
        }), o.globalData.netuserInfo && e.setData({
            hidden: "",
            OrderId: o.globalData.OrderId,
            imageUrl: "0a"
        });
    },
    onHide: function() {
        o.globalData.notifyStateChange = null;
    },
    onUnload: function() {
        wx.setKeepScreenOn({
            keepScreenOn: !1
        });
        for (var e = void 0; e = n.default.tasks.pop(); ) console.log("取消请求" + n.default.tasks.length), 
        e.abort();
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    callMyComp: function() {
        wx.makePhoneCall({
            phoneNumber: "01058075001"
        });
    },
    checkAndStop: function() {
        a.default.checkStart ? wx.showToast({
            title: "检测中请稍后"
        }) : (this.data.clickTrue = !0, a.default.getBlueState().isConnected ? (o.globalData.netuserInfo && 1 == o.globalData.netuserInfo.userSex ? (this.data.currentIndex = 0, 
        this.setData({
            imageUrl: u[this.data.currentIndex],
            checkinfo: c[this.data.currentIndex]
        })) : (this.data.currentIndex = 0, this.setData({
            imageUrl: h[this.data.currentIndex],
            checkinfo: d[this.data.currentIndex]
        })), this.setData({
            checkStart: a.default.isBeginTime
        })) : this.showM("检测", "请连接蓝牙", function() {
            wx.navigateTo({
                url: "../bluetooth/sreachbluetooth?type=ture"
            });
        }));
    },
    showM: function(e, t, a) {
        wx.showModal({
            title: e,
            content: t,
            showCancel: !1,
            success: a
        });
    },
    showMyData: function() {
        var e = o.globalData.netuserInfo, t = this;
        if (o.globalData.netuserInfo) {
            var a = new Date(), n = new Date(a.getFullYear(), a.getMonth(), 1).format("yyyy-MM-dd"), s = new Date(a.getTime() + 864e5).format("yyyy-MM-dd"), i = o.read(r.default.usercheckValue);
            i ? (o.remove(r.default.usercheckValue), t.uploadVal(i).then(function(a) {
                console.log(JSON.stringify(a)), a.data ? (wx.showToast({
                    title: "查询成功"
                }), o.save(r.default.result_key, JSON.stringify(a)), wx.navigateTo({
                    url: "../checkresult/checkresult?type=1"
                }), t.getCurrentRecord(e.id, n, s)) : (wx.navigateTo({
                    url: "../checkresult/checkerror"
                }), wx.showToast({
                    title: "查询失败"
                })), wx.hideLoading();
            }, function(e) {
                wx.showToast({
                    title: "网络连接失败"
                }), wx.hideLoading();
            })) : t.data.lastRecord || t.getCurrentRecord(e.id, n, s);
        }
    },
    uploadVal: function(e) {
        var t = o.globalData.netuserInfo;
        {
            if (t) {
                var a = new Date(t.userBirthday.time).format("yyyy-MM-dd"), s = (o.read(r.default.id_key), 
                o.globalData.OrderId), l = t.id;
                console.log(a, t.userSex);
                var c = t.userName, d = t.userHeight, u = t.userSex, h = t.userWeight;
                return wx.showLoading({
                    title: "数据正在上传..."
                }), console.log("上传信息：" + JSON.stringify(this.data)), n.default.post(i.checkUser, {
                    id: l,
                    userOrderId: s,
                    userBirthday: a,
                    userWeight: h,
                    userName: c,
                    userHeight: d,
                    userSex: u,
                    val: e,
                    question: getApp().globalData.question
                });
            }
            wx.showToast({
                title: "用户为空"
            });
        }
    },
    getCurrentRecord: function(e, t, a) {
        var r = this;
        n.default.post(i.getHistory, {
            userid: e,
            userOrderId: o.globalData.OrderId,
            start: t,
            end: a
        }).then(function(e) {
            var t = e.data;
            if (t && t instanceof Object) {
                var a = t[0];
                if (a) {
                    var n = a.score ? a.score : 0, s = a.testDatetime.replace("T", " ").substring(0, a.testDatetime.lastIndexOf(":")).replace(/-/g, "/"), i = "#F93C02";
                    n > 70 ? i = "#0db09b" : n > 40 && (i = "#F39800"), r.setData({
                        lastRecord: {
                            title: "综合评分",
                            score: n,
                            dateTime: s,
                            color: i
                        }
                    });
                } else r.setData({
                    lastRecord: null
                });
            }
        }, function(e) {
            console.log("222:" + JSON.stringify(e));
        });
    },
    createSimulationData: function() {
        for (var e = [], t = 0; t < 25; t++) e.push("第" + (t + 1) + "次");
        return {
            categories: e,
            data: l
        };
    },
    reset: function() {
        this.bar.start(), this.bar.show();
        o.globalData.netuserInfo && o.globalData.netuserInfo.userSex, this.setData({
            currentIndex: 0,
            imageUrl: "0a",
            clickTrue: !1,
            checkinfo: "即将检测"
        }), l.fill(0);
        var e = [ {
            name: "测试数据",
            data: l,
            format: function(e, t) {
                return e.toFixed(2) + "万";
            }
        } ], t = this.createSimulationData();
        this.lineChart.updateData({
            categories: t.categories,
            series: e
        });
    },
    update: function(e) {
        this.bar.draw(360 * a.default.readIndex / a.default.readYouData.length), o.globalData.netuserInfo && 2 == o.globalData.netuserInfo.userSex ? 0 == a.default.readIndex % Math.floor(a.default.readCount / u.length) && ++this.data.currentIndex < h.length && this.setData({
            imageUrl: h[this.data.currentIndex % h.length],
            checkinfo: d[this.data.currentIndex % d.length]
        }) : 0 == a.default.readIndex % Math.floor(a.default.readCount / u.length) && ++this.data.currentIndex < u.length && this.setData({
            imageUrl: u[this.data.currentIndex % u.length],
            checkinfo: c[this.data.currentIndex % c.length]
        });
        var t = 10 * e, r = l.shift();
        l.push(t), console.log("sssss:" + this.data.currentIndex + "|in" + t + "；out" + r);
        var n = this.createSimulationData(), s = [ {
            name: "测试数据",
            data: l,
            format: function(e, t) {
                return e.toFixed(2) + "万";
            }
        } ];
        this.lineChart.updateData({
            categories: n.categories,
            series: s
        });
    }
});