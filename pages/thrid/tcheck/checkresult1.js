function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../../utils/cache.js")), a = e(require("../../../utils/netutils.js")), o = getApp(), s = require("../../../utils/ports.js"), r = require("../../../utils/util.js");

Page({
    data: {
        stateScore: 10,
        isUpLoadData: !1
    },
    onLoad: function(e) {
        console.log(e), e.isShare && this.setData({
            stateScore: e.stateScore,
            historyId: e.historyId,
            datatime: e.datatime,
            nexttime: e.nexttime,
            userSex: e.userSex,
            userName: e.userName,
            userAge: e.age,
            lightItemsNames: e.lightItemsNames,
            seriousItemsNames: e.seriousItemsNames,
            moderateItemsNames: e.moderateItemsNames,
            isShare: e.isShare
        });
        var a = this;
        o.globalData.goBackToWelcome = "../thrid/tcheck/checkresult1";
        var s = o.read(t.default.check_result);
        if (s) {
            var r = JSON.parse(s);
            a.updateHeader(), a.showInfo(r), a.showResult();
        }
        o.globalData.netuserInfo;
        o.remove(t.default.check_result), this.drawPieChart(167, [ "red", "green", "red", "green", "red", "green", "red", "green", "red", "green", "red" ]);
    },
    updateHeader: function() {
        var e = this;
        if (o.globalData.netuserInfo && o.globalData.netuserInfo instanceof Object) {
            var t = new Date(o.globalData.netuserInfo.userBirthday.time), a = new Date();
            o.globalData.netuserInfo.userName;
            o.globalData.netuserInfo.userSex || (o.globalData.netuserInfo.userSex = 1);
            o.globalData.netuserInfo.userSex, a.getFullYear(), t.getFullYear(), a.getMonth() < t.getMonth() || a.getMonth() == t.getMonth() && (a.getDate(), 
            t.getDate()), o.globalData.netuserInfo.userHeight, o.globalData.netuserInfo.userWeight;
            e.setData({
                userName: "测试账号",
                userSex: "image/boy.png",
                age: 48,
                height: 179,
                weight: 90
            });
        } else o.login(function() {
            if (o.globalData.netuserInfo) {
                var t = new Date(o.globalData.netuserInfo.userBirthday.time), a = new Date(), s = o.globalData.netuserInfo.userName;
                o.globalData.netuserInfo.userSex || (o.globalData.netuserInfo.userSex = "");
                var r = 2 == o.globalData.netuserInfo.userSex ? "女" : 1 == o.globalData.netuserInfo.userSex ? "男" : "无", i = a.getFullYear() - t.getFullYear() - (a.getMonth() < t.getMonth() || a.getMonth() == t.getMonth() && a.getDate() < t.getDate() ? 1 : 0), n = o.globalData.netuserInfo.userHeight, l = o.globalData.netuserInfo.userWeight;
                e.setData({
                    userName: s,
                    userSex: r,
                    age: i,
                    height: n,
                    weight: l
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: "健康情况综合汇总",
            desc: "分享页面的内容",
            path: "pages/thrid/tcheck/checkresult1?historyId=" + this.data.historyId + "&isShare=true&userName=" + this.data.userName + "&lightItemsNames=" + this.data.lightItemsNames + "&seriousItemsNames=" + this.data.seriousItemsNames + "&moderateItemsNames=" + this.data.moderateItemsNames + "&datatime=" + this.data.datatime + "&nexttime=" + this.data.nexttime + "&stateScore=" + this.data.stateScore + "&userSex=" + this.data.userSex + "&age=" + this.data.age
        };
    },
    uploadVal: function(e) {
        var r = o.globalData.netuserInfo;
        if (!r) {
            wx.showToast({
                title: "用户为空"
            });
            var i = [ 1, "用户为空" ];
            return Promise.all(i);
        }
        var n = new Date(r.userBirthday.time).format("yyyy-MM-dd"), l = (o.read(t.default.id_key), 
        o.globalData.OrderId), h = r.id;
        console.log(n, r.userSex);
        var u = r.userName, c = r.userHeight, g = r.userSex, d = r.userWeight;
        return a.default.post(s.checkUser, {
            id: h,
            userOrderId: l,
            userBirthday: n,
            userWeight: d,
            userName: u,
            userHeight: c,
            userSex: g,
            val: e,
            question: getApp().globalData.question
        });
    },
    counter: function(e) {
        var t = this;
        e > 0 ? (e--, setTimeout(function() {
            t.setData({
                stateScore: e
            }), t.counter(e);
        }, 1e3)) : (t.setData({
            counterCountEnd: !0
        }), t.showResult());
    },
    showResult: function() {
        this.data.isUpLoadOk && this.data.counterCountEnd ? this.setData({
            isUpLoadData: !0
        }) : this.setData({
            isUpLoadData: !1
        });
    },
    getDetails: function() {
        console.log(this.data.age), wx.navigateTo({
            url: "../../checkresult/miniDetails?historyId=" + this.data.historyId + "&datatime=" + this.data.datatime + "&nexttime=" + this.data.nexttime + "&score=" + this.data.stateScore + "&name=" + this.data.userName + "&age=" + this.data.userAge + "&userSex=" + this.data.userSex,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    showInfo: function(e) {
        var t = this, a = e.score ? e.score : 0, o = r.timestampToTime(e.testDatetime.time), s = e.fhshmygnScore, i = e.gzdxgnScore, n = e.jzhjkgnScore, l = e.jzhxdxgnScore, h = e.mnxdxgnScore, u = e.nxggxgnScore, c = e.qlxdxgnScore, g = e.rtwlyshlScore, d = e.rtwshshlScore, m = e.xzhdxgnScore, I = e.shhxdgnScore, f = new Date(e.nextdetectiontime.time), S = new Date(f.getTime()).format("yyyy年MM月dd日"), x = e.sex, D = e.id, y = [ {
            title: "脑血管供血功能",
            score: u,
            totalscore: a,
            dateTime: o,
            nextTime: S,
            color: t.getColor(u),
            historyId: D,
            isShow: !0
        }, {
            title: "呼吸功能",
            score: I,
            totalscore: a,
            dateTime: o,
            nextTime: S,
            color: t.getColor(I),
            historyId: D,
            isShow: !0
        }, {
            title: "内分泌功能",
            score: l,
            totalscore: a,
            dateTime: o,
            nextTime: S,
            color: t.getColor(l),
            historyId: D,
            isShow: !0
        }, {
            title: "肝脏代谢功能",
            score: i,
            totalscore: a,
            dateTime: o,
            nextTime: S,
            color: t.getColor(i),
            historyId: D,
            isShow: !0
        }, {
            title: "前列腺功能",
            score: c,
            totalscore: a,
            dateTime: o,
            nextTime: S,
            color: t.getColor(c),
            historyId: D,
            isShow: 1 == x
        }, {
            title: "泌尿系代谢功能",
            score: h,
            totalscore: a,
            dateTime: o,
            nextTime: S,
            color: t.getColor(h),
            historyId: D,
            isShow: !0
        }, {
            title: "脊柱健康功能",
            score: n,
            totalscore: a,
            dateTime: o,
            nextTime: S,
            color: t.getColor(n),
            historyId: D,
            isShow: !0
        }, {
            title: "血脂代谢功能",
            score: m,
            totalscore: a,
            dateTime: o,
            nextTime: S,
            color: t.getColor(m),
            historyId: D,
            isShow: !0
        }, {
            title: "免疫功能",
            score: s,
            totalscore: a,
            dateTime: o,
            nextTime: S,
            color: t.getColor(s),
            historyId: D,
            isShow: !0
        }, {
            title: "维生素含量",
            score: d,
            totalscore: a,
            dateTime: o,
            nextTime: S,
            color: t.getColor(d),
            historyId: D,
            isShow: !0
        }, {
            title: "微量元素含量",
            score: g,
            totalscore: a,
            dateTime: o,
            nextTime: S,
            color: t.getColor(g),
            historyId: D,
            isShow: !0
        } ];
        this.setData({
            checkListData: y
        });
        var w = [], b = [], p = [], T = [], M = [], N = "", v = "";
        y.forEach(function(e, t) {
            e.isShow && (e.score >= 90 ? w.push({
                name: e.title,
                score: e.score
            }) : e.score >= 70 ? (T.push({
                name: e.title,
                score: e.score
            }), N = N.concat(e.title) + ",") : (b.push({
                name: e.title,
                score: e.score
            }), M.push({
                name: e.title,
                score: e.score
            }), v = v.concat(e.title) + ","));
        });
        for (var C = this.getColor(a), P = "", k = 0; k < M.length; k++) P = P + "," + M[k].name;
        this.setData({
            stateColor: C,
            stateScore: a,
            seriousItems: b,
            moderateItems: p,
            lightItems: T,
            moderateseriousItems: M,
            historyId: D,
            datatime: o,
            nexttime: S,
            innertitle: "健康总分",
            moderateItemsNames: "".substring(0, "".length > 0 ? "".length - 1 : 0),
            seriousItemsNames: v.substring(0, v.length > 0 ? v.length - 1 : 0),
            lightItemsNames: N.substring(0, N.length > 0 ? N.length - 1 : 0),
            totalInfo: P.substring(1),
            textMsg: "基于您目前的身体状况，建议您15日后再次检查"
        });
    },
    getColor: function(e) {
        return e >= 90 ? "#0db09b" : e >= 70 ? "#F39800" : "#F93C02";
    },
    goHistory: function() {
        o.globalData.netuserInfo ? wx.reLaunch({
            url: "../../hostory/hostory?type=0",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        }) : wx.showLoading({
            title: "请稍后"
        });
    },
    drawPieChart: function(e, t) {
        for (var a = t.length, o = [], s = 0, r = 0; r < 2 * Math.PI * e; r++) {
            var i = {};
            i.name = "item1", r < 2 * Math.PI * 167 / 8 ? i.color = t[0] : r < 2 * Math.PI * e * 2 / a ? i.color = t[1] : r < 2 * Math.PI * e * 3 / a ? i.color = t[2] : r < 2 * Math.PI * e * 4 / a ? i.color = t[3] : r < 2 * Math.PI * e * 5 / a ? i.color = t[4] : r < 2 * Math.PI * e * 6 / a ? i.color = t[5] : r < 2 * Math.PI * e * 7 / a ? i.color = t[6] : r < 2 * Math.PI * e * 8 / a ? i.color = t[7] : r < 2 * Math.PI * e * 9 / a ? i.color = t[8] : r < 2 * Math.PI * e * 10 / a ? i.color = t[9] : i.color = t[10], 
            i.rotate = s, o.push(i), s += 360 / (2 * Math.PI * e);
        }
        this.setData({
            pieChartData: o
        });
    }
});