var e = function (e) {
  return e && e.__esModule ? e : {
    default: e
  };
}(require("../../resource/bluetooth/CheckManager.js")), t = getApp();

Page({
  data: {
    cunrentSelcted: !0,
    currentId: 0,
    winWidth: t.globalData.winWidth,
    winHeight: t.globalData.winHeight,
    devices: [],
    lastTime: 0,
    adpaterNotInit: !0,
    staffCode: "HOLDHEALTH"
  },
  onLoad: function (a) {
    getApp().globalData.bluetoothName && getApp().globalData.bluetoothName == t.globalData.staffCode && this.setData({
      staffCode: t.globalData.staffCode
    });
    var o = this;
    t.globalData.goBackToWelcome = "../bluetooth/sreachbluetooth1", a.tab && o.setData({
      tab: a.tab
    }),
      e.default.init(),
      e.default.addOnConnectedListener(),
      console.log("是是是" + JSON.stringify(this)),
      e.default.addOnAdapterStateListener(function (e) {
        console.log("蓝牙状态 :" + e), o.setData({
          adpaterNotInit: e
        }), e || wx.stopPullDownRefresh();
      }), e.default.addOnFindDeviceListener(function () {    //獲取藍牙列表
        e.default.getDevices().then(function (e) {
          for (var t = !1, a = o.data.devices, n = 0; n < e.length; n++) {
            for (var i = !1, d = e[n], l = 0; l < a.length; l++) if (d.deviceId === a[l].deviceId) {
              i = !0;
              break;
            }
            i || (t = !0, a.push(d));
          }
          t && o.setData({
            devices: a
          });
        });
      });
  },
  onReady: function () { },
  onShow: function () {
    this.updateHeader();
    this.setData({
      isOrderId: t.globalData.OrderId
    });
  },
  updateHeader: function () {
    var e = this;
    if (t.globalData.netuserInfo && t.globalData.netuserInfo instanceof Object) {
      var a = new Date(t.globalData.netuserInfo.userBirthday.time), n = new Date(), o = t.globalData.netuserInfo.userName;
      t.globalData.netuserInfo.userSex || (t.globalData.netuserInfo.userSex = "");
      var l = 2 == t.globalData.netuserInfo.userSex ? "女" : 1 == t.globalData.netuserInfo.userSex ? "男" : "无", u = n.getFullYear() - a.getFullYear() - (n.getMonth() < a.getMonth() || n.getMonth() == a.getMonth() && n.getDate() < a.getDate() ? 1 : 0), r = t.globalData.netuserInfo.userHeight, s = t.globalData.netuserInfo.userWeight;
      e.setData({
        name: o,
        sex: l,
        age: u,
        height: r,
        weight: s
      });
    } else t.login(function () {
      if (t.globalData.netuserInfo) {
        var a = new Date(t.globalData.netuserInfo.userBirthday.time), n = new Date(), o = t.globalData.netuserInfo.userName;
        t.globalData.netuserInfo.userSex || (t.globalData.netuserInfo.userSex = "");
        var l = 2 == t.globalData.netuserInfo.userSex ? "女" : 1 == t.globalData.netuserInfo.userSex ? "男" : "无", u = n.getFullYear() - a.getFullYear() - (n.getMonth() < a.getMonth() || n.getMonth() == a.getMonth() && n.getDate() < a.getDate() ? 1 : 0), r = t.globalData.netuserInfo.userHeight, s = t.globalData.netuserInfo.userWeight;
        e.setData({
          name: o,
          sex: l,
          age: u,
          height: r,
          weight: s
        });
      }
    });
  },

  onHide: function () { },
  onUnload: function () {
    e.default.stopSearch();
  },
  onPullDownRefresh: function () {
    e.default.getBlueState().isAvailable ? e.default.getBlueState().isDiscovering || (e.default.discoveryDevices(),
      setTimeout(function () {
        e.default.stopSearch(), wx.stopPullDownRefresh(), console.log("停止");
      }, 3e4)) : (e.default.init(), wx.stopPullDownRefresh());
  },
  onReachBottom: function () { },
  connectTo: function (t) {
    var a = t.currentTarget.dataset.deviceid;
    var b = getApp().globalData.bluetoothName;
    getApp().globalData.bluetoothName = t.currentTarget.dataset.devicename, e.default.getBlueState().isConnecting || (this.setData({
      cunrentSelcted: !0,
      currentId: a
    }), this.modifyConnect(a, "正在连接"), e.default.getBlueState().isDiscovering && e.default.stopSearch(),
      e.default.addOnDeviceCharacteristicListener(function (e) {
        wx.hideLoading(), console.log("xxxx" + e), wx.navigateBack({
          delta: 1
        });
      }), e.default.connect(a));
  },
  modifyConnect: function (e, t) {
    var a = this;
    if (a.data.devices && a.data.devices.length > 0) for (var o = 0; o < a.data.devices.length; o++) e == a.data.devices[o].id && (a.data.devices[o].isConnect = t);
    a.setData({
      devices: a.data.devices
    });
  },
  launchAppError: function (e) {
    console.log("错误" + e.detail.errMsg);
  }
});