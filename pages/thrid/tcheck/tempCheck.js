var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../resource/bluetooth/CheckManager.js")), t = getApp();

require("../../../utils/ports.js");

Page({
    data: {
        winWidth: t.globalData.winWidth,
        winHeight: t.globalData.winHeight,
        question: [],
        questionMan: [ {
            questionType: "Nxggxgn",
            content: "头晕、头痛、昏沉",
            checked: !1
        }, {
            questionType: "Nxggxgn",
            content: "失眠多梦、注意力不集中",
            checked: !1
        }, {
            questionType: "Shhxdgn",
            content: "嗓子发痒、疼痛、有痰、咳嗽",
            checked: !1
        }, {
            questionType: "Shhxdgn",
            content: "呼吸短促且胸闷",
            checked: !1
        }, {
            questionType: "Jzhxdxgn",
            content: "用餐时间之外常感饥饿",
            checked: !1
        }, {
            questionType: "Jzhxdxgn",
            content: "饥饿/疲劳时出现心跳忽然加快",
            checked: !1
        }, {
            questionType: "Gzdxgn",
            content: "大便不规律",
            checked: !1
        }, {
            questionType: "Gzdxgn",
            content: "早起时感到嘴里发苦",
            checked: !1
        }, {
            questionType: "Qlxdxgn",
            content: "小便不顺畅/感觉解不净",
            checked: !1
        }, {
            questionType: "Qlxdxgn",
            content: "小便时感到下腹/下体疼痛",
            checked: !1
        }, {
            questionType: "Mnxdxgn",
            content: "憋不住尿或两次小便间隔过短",
            checked: !1
        }, {
            questionType: "Mnxdxgn",
            content: "下体常感疼痛",
            checked: !1
        }, {
            questionType: "Jzhjkgn",
            content: "耳鸣、颈肩部酸痛",
            checked: !1
        }, {
            questionType: "Jzhjkgn",
            content: "腰酸、背痛",
            checked: !1
        }, {
            questionType: "Xzhdxgn",
            content: "白天感到困乏",
            checked: !1
        }, {
            questionType: "Xzhdxgn",
            content: "睡醒后不解乏或提不起精神",
            checked: !1
        }, {
            questionType: "Fhshmygn",
            content: "没感冒也会感到关节疼痛",
            checked: !1
        }, {
            questionType: "Fhshmygn",
            content: "久座站起时感到脚跟疼痛",
            checked: !1
        } ],
        questionWoman: [ {
            questionType: "Nxggxgn",
            content: "头晕、头痛、昏沉",
            checked: !1
        }, {
            questionType: "Nxggxgn",
            content: "失眠多梦、注意力不集中",
            checked: !1
        }, {
            questionType: "Shhxdgn",
            content: "嗓子发痒、疼痛、有痰、咳嗽",
            checked: !1
        }, {
            questionType: "Shhxdgn",
            content: "呼吸短促且胸闷",
            checked: !1
        }, {
            questionType: "Jzhxdxgn",
            content: "用餐时间之外常感饥饿",
            checked: !1
        }, {
            questionType: "Jzhxdxgn",
            content: "饥饿/疲劳时出现心跳忽然加快",
            checked: !1
        }, {
            questionType: "Gzdxgn",
            content: "大便不规律",
            checked: !1
        }, {
            questionType: "Gzdxgn",
            content: "早起时感到嘴里发苦",
            checked: !1
        }, {
            questionType: "Mnxdxgn",
            content: "憋不住尿或两次小便间隔过短",
            checked: !1
        }, {
            questionType: "Mnxdxgn",
            content: "下体常感疼痛",
            checked: !1
        }, {
            questionType: "Jzhjkgn",
            content: "耳鸣、颈肩部酸痛",
            checked: !1
        }, {
            questionType: "Jzhjkgn",
            content: "腰酸、背痛",
            checked: !1
        }, {
            questionType: "Xzhdxgn",
            content: "白天感到困乏",
            checked: !1
        }, {
            questionType: "Xzhdxgn",
            content: "睡醒后不解乏或提不起精神",
            checked: !1
        }, {
            questionType: "Fhshmygn",
            content: "没感冒也会感到关节疼痛",
            checked: !1
        }, {
            questionType: "Fhshmygn",
            content: "久座站起时感到脚跟疼痛",
            checked: !1
        } ],
        maskLayerShow: !0
    },
    onLoad: function(e) {
      console.log("tempChecktempChecktempCheck")
      console.log(e)
        t.globalData.goBackToWelcome = "../thrid/tcheck/tempCheck", e.uploadData && this.setData({
            uploadData: e.uploadData,
            question: 1 == t.globalData.netuserInfo.userSex ? this.data.questionMan : this.data.questionWoman
        });
    },
    onReady: function() {},
    onShow: function() {
        this.updateHeader();
    },
    updateHeader: function() {
        var e = this;
        if (t.globalData.netuserInfo && t.globalData.netuserInfo instanceof Object) {
            var n = new Date(t.globalData.netuserInfo.userBirthday.time), o = new Date(), c = t.globalData.netuserInfo.userName;
            t.globalData.netuserInfo.userSex || (t.globalData.netuserInfo.userSex = "");
            var a = 2 == t.globalData.netuserInfo.userSex ? "女" : 1 == t.globalData.netuserInfo.userSex ? "男" : "无", s = o.getFullYear() - n.getFullYear() - (o.getMonth() < n.getMonth() || o.getMonth() == n.getMonth() && o.getDate() < n.getDate() ? 1 : 0), u = t.globalData.netuserInfo.userHeight, i = t.globalData.netuserInfo.userWeight;
            e.setData({
                name: c,
                sex: a,
                age: s,
                height: u,
                weight: i
            });
        }
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    uploadData: function(e) {
      console.log("疑似上传数据")
      console.log(this.data.uploadData)
        wx.reLaunch({
            url: "updatecheck?uploadData=" + this.data.uploadData,
            success: function(e) {
              console.log("数据上传成功")
              console.log(e)
            },
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    resetTest: function(t) {
        e.default.getBlueState().isConnected ? wx.reLaunch({
            url: "check",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        }) : wx.reLaunch({
            url: "../welcome/welcome2",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
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
    },
    questionCheck: function(e) {
        console.log(e.currentTarget.dataset.index);
        var t = e.currentTarget.dataset.index, n = this.data.question;
        n[t].checked = !this.data.question[t].checked, this.setData({
            question: n
        }), console.log(this.data.question);
    },
    submit: function() {
        var e = this;
        this.setData({
            maskLayerShow: !1
        });
        var t = 0;
        this.data.question.forEach(function(e, n, o) {
            e.checked && (t += 1);
        }, this), wx.showModal({
            title: "结果",
            content: "您选择了" + t + "道题",
            showCancel: !1,
            success: function(t) {
                t.cancel || (getApp().globalData.question = JSON.stringify(e.data.question));
            }
        });
    }
});