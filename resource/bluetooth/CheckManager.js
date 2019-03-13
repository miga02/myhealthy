
function e(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}

function t(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var n = function () {
  function e(e, t) {
    for (var n = 0; n < t.length; n++) {
      var i = t[n];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0),
        Object.defineProperty(e, i.key, i);
    }
  }
  return function (t, n, i) {
    return n && e(t.prototype, n), i && e(t, i), t;
  };
}(), i = e(require("BluetoothService.js")), o = e(require("../../utils/cache.js")), a = e(require("../../utils/netutils.js")), r = require("../../utils/ports.js"), s = function () {
  function e() {
    t(this, e), this.bluetooth || (this.bluetooth = new i.default()), this.devices = [],
      this.maxLength = 50, this.resultDatas = [], this.isFrist = !0, this.readCount = 50,
      this.readIndex = 0, this.readYouData = new Array(this.readCount), this.preCount = 3,
      this.timeout = 18e4, this.isBeginTime = !1, this.confirmationCount = 0, console.log("创建了多少次" + ++e.sss);
  }
  return n(e, [{
    key: "getBlueState",
    value: function () {
      return {
        isDiscovering: this.bluetooth.discovering,
        isAvailable: this.bluetooth.available,
        isCanUsed: this.bluetooth.isCanUsed,
        isFonding: this.bluetooth.isFonding,
        isConnected: this.bluetooth.isConnected,
        isReadable: this.bluetooth.isReadable,
        isWirteable: this.bluetooth.isWirteable,
        isReading: this.bluetooth.isWirteable,
        isConnecting: this.bluetooth.isConnecting
      };
    }
  }, {
    key: "connect",
    value: function (e) {
      var t = this;
      t.deviceId = e, console.log("连接设备：" + t.deviceId), t.bluetooth.repaitCount = 3,
        t.bluetooth.addOnConnectStateListener(function (e) {
          e ? t.bluetooth.repaitCount : (t.timeOut && t.bluetooth.conn && t.bluetooth.conn.deviceId && t.bluetooth.repaitCount > 0 && (t.bluetooth.print("倒数第" + t.bluetooth.repaitCount + "次重试"),
            t.bluetooth.repaitCount--), "function" == typeof t.OnReceivedDataStateListener && t.OnReceivedDataStateListener("noconnect"));
        }), t.bluetooth.reConnectBlue(t.deviceId);
    }
  }, {
    key: "init",
    value: function () {
      this.getBlueState().isAvailable || this.bluetooth.init();
    }
  }, {
    key: "discoveryDevices",
    value: function () {
      this.bluetooth.discovering && this.bluetooth.stopSearchBlue(), this.bluetooth.searchBlue();
    }
  }, {
    key: "startCounter",
    value: function (e) {
      function t() {
        return e.apply(this, arguments);
      }
      return t.toString = function () {
        return e.toString();
      }, t;
    }(function () {
      var e = this;
      e.startCheck && (10 == e.rightCheckCount ? (e.leftCheckCount++ , 12 == e.leftCheckCount || 11 == e.leftCheckCount && e.checkAage < 12 ? (e.startCheck = !1,
        e.checkFinish = !0, clearInterval(startCounter)) : e.rightCheckCount = 1) : e.rightCheckCount++);
    })
  }, {
    key: "start1",
    value: function () {
      var e = this;
      getApp().globalData.isCheckInsue && getApp().read(o.default.confirmation_success_key) ? e.getBlueState().isConnected ? (this.readIndex = 0,
        e.startCheckTime = new Date().getTime(), e.receiveTime = new Date().getTime(), e.isBeginTime || e.writeCmd_AA()) : wx.showToast({
          title: "您没有连接"
        }) : console.log("设备没有激活");
    }
  }, {
    key: "start",
    value: function () {
      var e = this;
      if (this.rightCount = 0, this.leftCount = 0, !e.getBlueState().isConnected) return wx.showToast({
        title: "您没有连接"
      }), void ("function" == typeof e.OnReceivedDataStateListener && e.OnReceivedDataStateListener("noconnect"));
      this.isReceiveDt = !1, e.isEnd = !1, this.isBeginTime = !1, this.readCount = 50,
        this.readIndex = 0, this.readYouData = new Array(this.readCount), this.preCount = 3,
        this.startCheckTime = new Date().getTime(), this.receiveTime = new Date().getTime(),
        e.checkStart || (e.bluetooth.writeBlue("aa"), this.isReceiveData = !1, e.checkStart = !0,
          e.interVal = setInterval(this.doWhile2.bind(this), 100), "function" == typeof e.OnCheckDataProgressListener && e.OnCheckDataProgressListener(0));
    }
  }, {
    key: "getConnectedDevice",
    value: function () {
      this.bluetooth.getConnectedDevices().then(function (e) {
        console.log("输出：" + JSON.stringify(e));
      }).catch(function (e) {
        console.log("输出：" + JSON.stringify(e));
      });
    }
  }, {
    key: "doWhile2",
    value: function () {
      var e = this;
      if (e.isReceiveData) {
        e.isReceiveData = !1;
        var t = e.bluetooth.cacheData;
        if (t.indexOf("0x2a") >= 0 && t.lastIndexOf("0x0a") > 0) {
          if (e.preCount > 0) e.preCount--; else {
            var n = t.substring(t.indexOf("0x2a"), t.lastIndexOf("0x0a")), i = e.hex2Float(n);
            if (2.1 - i[0] >= .2 || 2.1 - i[1] >= .2 || 2.1 - i[2] >= .2 || 2.1 - i[3] >= .2 || 2.1 - i[4] >= .2) {
              if (e.isBeginTime || (e.isBeginTime = !0, "function" == typeof e.OnReceivedDataStateListener && e.OnReceivedDataStateListener("start")),
                !(e.readCount > 0)) return e.isEnd = !0, e.checkStart = !1, clearInterval(e.interVal),
                  "function" == typeof e.OnCheckDataFinishListener && e.OnCheckDataFinishListener(e.jisuan(e.readYouData)),
                  void ("function" == typeof e.OnReceivedDataStateListener && e.OnReceivedDataStateListener("end"));
              e.readCount-- , e.readYouData[e.readIndex++] = i, e.isPause && ("function" == typeof e.OnReceivedDataStateListener && e.OnReceivedDataStateListener("continue"),
                e.isPause = !1);
              var o = i[5] / 5 + Math.random();
              o > 2 && (o -= 1), e.readCount % 2 == 0 ? "function" == typeof e.OnCheckDataProgressListener && e.OnCheckDataProgressListener(-o) : "function" == typeof e.OnCheckDataProgressListener && e.OnCheckDataProgressListener(o + .5);
            } else {
              if (!(e.readCount > 0)) return;
              e.isPause = !0, "function" == typeof e.OnReceivedDataStateListener && e.OnReceivedDataStateListener("pause");
            }
          }
          e.bluetooth.writeBlue("aa");
        }
      } else {
        var a = new Date().getTime();
        e.isEnd || (a - e.receiveTime) % 3 * 1e3 != 0 || (new Date().getTime() - e.startCheckTime < 18e4 && !e.isEnd ? (clearInterval(e.interVal),
          e.isReceiveData || (e.interVal = setInterval(e.doWhile2.bind(e), 1e3), e.bluetooth.writeBlue("aa"),
            e.isEnd = !1)) : (e.isEnd = !0, e.checkStart = !1, clearInterval(e.interVal), "function" == typeof e.OnReceivedDataStateListener && e.OnReceivedDataStateListener("timeout")));
      }
    }
  }, {
    key: "getDevices",
    value: function () {
      var e = this;
      return e.bluetooth.getDevices().then(function (t) {
        for (var n = [], i = 0; i < t.length; i++) n.push({
          id: i,
          deviceName: t[i].name,
          deviceId: t[i].deviceId,
          isConnect: ""
        });
        return new Promise(function (t, i) {
          var o = e.removeRepait(n);
          e.devices = o, t(o);
        });
      }).catch(function (e) {
        console.log("输出：" + JSON.stringify(e));
      });
    }
  }, {
    key: "getServices",
    value: function () {
      var e = this;
      return e.bluetooth.getDeviceServices().then(function (t) {
        return new Promise(function (n, i) {
          t.forEach(function (t, n) {
            console.log("服务：uuid=" + t.uuid + ",isPrimary=" + t.isPrimary);
            var i = t.uuid.slice(4, 8);
            "FEE0" != i && "fee0" != i || (e.serviceId = t.uuid);
          }), n(e.serviceId);
        });
      }).catch(function (e) {
        console.log("输出：" + JSON.stringify(e));
      });
    }
  }, {
    key: "conncetBlue",
    value: function (e) {
      var t = this;
      t.bluetooth.disconnectBlue(t.deviceId).then(function () {
        t.bluetooth.addOnFindServiceListener(function () {
          t.getServices().then(function (n) {
            return console.log("打开的接口", n), t.bluetooth.getDeviceCharacteristic(e, n);
          }).then(function (n) {
            console.log("特征值提取--\x3e", n), n.forEach(function (n, i) {
              var o = n.uuid, a = o.slice(4, 8);
              "FEE1" != a && "fee1" != a || (t.characteristicId = o, t.notycharacteristicsId = o,
                t.bluetooth.notifyCharacteristicChange(e, t.serviceId, o)), "FEE2" != a && "fee2" != a || (t.characteristicId = o,
                  t.bluetooth.notifyCharacteristicChange(e, t.serviceId, o));
            });
          });
        }), t.addOnConnectStateListener(), t.bluetooth.connectBlue(e).then(function (e) {
          console.log("连接蓝牙：" + e), t.confirmationCount = 3, t.addOnReceivedDataListener();
        });
      }), t.deviceId = e;
    }
  }, {
    key: "startWorkInfo",
    value: function () { }
  }, {
    key: "stopSearch",
    value: function () {
      this.bluetooth.stopSearchBlue();
    }
  }, {
    key: "disconnect",
    value: function () {
      var e = this;
      e.deviceId && e.bluetooth.disconnectBlue(e.deviceId);
    }
  }, {
    key: "addOnAdapterStateListener",
    value: function (e) {
      this.bluetooth.addOnAdapterStateListener(e);
    }
  }, {
    key: "addOnProgressListener",
    value: function (e) {
      this.bluetooth.addOnProgressListener(e);
    }
  }, {
    key: "addOnFindDeviceListener",
    value: function (e) {
      this.bluetooth.addOnFindDeviceListener(e);
    }
  }, {
    key: "addOnFindedDevicesListener",
    value: function () {
      this.bluetooth.addOnFindedDevicesListener(callback);
    }
  }, {
    key: "addOnStartUsedListener",
    value: function (e) {
      this.bluetooth.addOnStartUsedListener(e);
    }
  }, {
    key: "addOnConnectStateListener",
    value: function () {
      this.bluetooth.addOnConnectStateListener(function (e) { });
    }
  }, {
    key: "addOnConnectedListener",
    value: function () {
      var e = this;
      e.bluetooth.addOnConnectedListener(function () {
        e.confirmation();
      });
    }
  }, {
    key: "addOnFindServiceListener",
    value: function () { }
  }, {
    key: "addOnCheckDataFinishListener",
    value: function (e) {
      this.OnCheckDataFinishListener = e;
    }
  }, {
    key: "addCheckDataProgressListener",
    value: function (e) {
      this.OnCheckDataProgressListener = e;
    }
  }, {
    key: "addOnDeviceCharacteristicListener",
    value: function (e) {
      this.bluetooth.addOnDeviceCharacteristicListener(e);
    }
  }, {
    key: "addOnReceivedDataStateListener",
    value: function (e) {
      this.OnReceivedDataStateListener = e;
    }
  }, {
    key: "addOnReceivedDataListener",
    value: function () {
      var e = this;
      e.bluetooth.addOnReceivedDataListener(function (t) {
        e.isReceiveData = !0, e.receiveTime = new Date().getTime();
      });
    }
  }, {
    key: "doData",
    value: function (e) { }
  }, {
    key: "toReceiveShow",
    value: function (e) {
      return this.readCount < this.maxLength ? this.resultDatas[this.readCount++] = e[5] : this.stop(),
        console.log("cout =" + this.readCount), e[5] / 5;
    }
  }, {
    key: "stop",
    value: function () {
      this.checkStart = !1, this.end();
    }
  }, {
    key: "removeRepait",
    value: function (e) {
      var t = [];
      return (e = e.sort()).forEach(function (e, n) {
        for (var i = !1, o = 0; o < t.length; o++) if (t[o].deviceId === e.deviceId) {
          i = !0;
          break;
        }
        i || t.push(e);
      }), t;
    }
  }, {
    key: "jisuan",
    value: function (e) {
      for (var t = this, n = 0, i = 0; i < e.length; i++) n += parseFloat(e[i][5]);
      return console.log("读取长度：" + t.readIndex), n / (5 * e.length);
    }
  }, {
    key: "hex2Float",
    value: function (e) {
      var t = [0, 0, 0, 0, 0, 0], n = e.split(" ");
      if (6 == n.length) {
        var i = new Array();
        i[0] = n[0];
        for (var o = 0; o < 5; o++) i[3 * o + 1] = n[1], i[3 * o + 2] = n[2], i[3 * o + 3] = n[3];
        i[i.length] = n[4], i[i.length] = n[5], n = i;
      }
      for (var a = 0; a < t.length - 1; a++) {
        var r = parseFloat(String.fromCharCode(n[1 + 3 * a]) + "." + String.fromCharCode(n[2 + 3 * a]) + String.fromCharCode(n[3 + 3 * a]));
        t[a] = r, t[5] += r;
      }
      return t;
    }
  }, {
    key: "writeCmd_AA",
    value: function () {
      var e = this, t = new Date().getTime();
      return e.getBlueState().isWirteable && e.getBlueState().isConnected ? getApp().globalData.isCheckInsue && getApp().read(o.default.confirmation_success_key) ? (e.timeOut && clearTimeout(e.timeOut),
        e.timeOut = setTimeout(function () {
          var t = new Date().getTime() - e.receiveTime;
          console.log("超时时间：" + t), t >= 0 && (console.log("超时aa"), e.writeCmd_AA());
        }, 3e3), void ((t - e.startCheckTime) / 1e3 < 120 ? e.getBlueState().isConnected && !e.confirmationing && e.bluetooth.writeData("aa", function (t) {
          if (e.timeOut && clearTimeout(e.timeOut), e.receiveTime = new Date().getTime(),
            t.indexOf("0x2a") >= 0 && t.lastIndexOf("0x0a") > 0 && t.lastIndexOf("0x0a") > t.indexOf("0x2a")) {
            var n = t.substring(t.indexOf("0x2a"), t.lastIndexOf("0x0a")), i = e.hex2Float(n), o = void 0, a = void 0, r = getApp().globalData.nowBindInfo;
            if ("08" == r.producerName && ("4b" == r.versionNo || "58" == r.versionNo ? (o = 2.3,
              a = .12) : "1a" == r.versionNo && (o = 2.2, a = .1)), getApp().globalData.emptyVoltage = o,
              o - i[0] >= a || o - i[1] >= a || o - i[2] >= a || o - i[3] >= a || o - i[4] >= a) {
              if (console.log("index:" + e.readIndex),e.isBeginTime || (e.isBeginTime = !0, "function" == typeof e.OnReceivedDataStateListener && e.OnReceivedDataStateListener("start")),
                 e.isPause && ("function" == typeof e.OnReceivedDataStateListener && e.OnReceivedDataStateListener("continue"),
                 e.isPause = !1), e.readIndex < e.readCount) {
                 e.readYouData[e.readIndex++] = i;
                var s = i[5] / 5 + Math.random();
                s > 2 && (s -= 1), console.log("readYouData:" + e.readYouData+"s"+-s), e.readIndex % 2 == 0 ? "function" == typeof e.OnCheckDataProgressListener && e.OnCheckDataProgressListener(-s) : "function" == typeof e.OnCheckDataProgressListener && e.OnCheckDataProgressListener(s);
              }
            } else e.readIndex < e.readCount && (e.isPause = !0, "function" == typeof e.OnReceivedDataStateListener && e.OnReceivedDataStateListener("pause"));
          }
          e.readIndex < e.readCount ? e.timeOut = setTimeout(function () {
            e.getBlueState().isConnected && (console.log("循环aa"), e.writeCmd_AA());
          }, 600) : (e.end(), "function" == typeof e.OnCheckDataFinishListener && e.OnCheckDataFinishListener(e.jisuan(e.readYouData)),
            "function" == typeof e.OnReceivedDataStateListener && e.OnReceivedDataStateListener("end"));
        }) : (e.end(), "function" == typeof e.OnReceivedDataStateListener && e.OnReceivedDataStateListener("timeout")))) : (console.log("设备没有激活"),
          void wx.showModal({
            title: "设备",
            content: "设备没有激活，请联系管理"
          })) : (e.end(), void ("function" == typeof e.OnReceivedDataStateListener && e.OnReceivedDataStateListener("noconnect")));
    }
  }, {
    key: "end",
    value: function () {
      var e = this;
      this.isBeginTime = !1, this.readIndex = 0, e.timeOut && clearTimeout(e.timeOut),
        e.timeOut = !1, console.log("结束" + JSON.stringify(this));
    }
  }, {
    key: "writeCmd_aa",
    value: function (e) {
      var t = this;
      return new Promise(function (n, i) {
        t.bluetooth.writeData("aa", function (t) {
          0 == t.indexOf("0x2a") && t.lastIndexOf("0x0d 0x0a") > 0 ? (e.type = t.length > 10 ? 5 : 1,
            n(e)) : i(received);
        });
      });
    }
  }, {
    key: "writeCmd_bb",
    value: function (e) {
      var t = this;
      return new Promise(function (n, i) {
        t.bluetooth.writeData("bb", function (t) {
          0 == t.indexOf("0x2a") && t.lastIndexOf("0x0d 0x0a") > 0 ? (e.versioninfo = t, n(e)) : i(t);
        });
      });
    }
  }, {
    key: "writeCmd_cc",
    value: function (e, t) {
      var n = this;
      return new Promise(function (i, o) {
        t && t.indexOf("cc") >= 0 ? (n.bluetooth.writeData(t, function () {
        }), setTimeout(function () {
          i(e, t);
        }, 3e3)) : o(t);
      }).then(function (t) {
        return e.ccCmd = t, n.writeCmd_dd(e);
      }, function (e) {
        console.log("写入cc出错:" + e);
      }).then( n.confirmResult.bind(this), function (e) {
        console.log(e);
        }).catch(function (e) {
        console.log("错误：" + JSON.stringify(e));
      });
    }
  }, {
    key: "writeCmd_dd",
    value: function (e) {
      var t = this;
      return new Promise(function (n, i) {
        t.bluetooth.writeData("dd", function (t) {
          if (t.indexOf("0xcc") >= 0 && t.lastIndexOf("0x0a") > 0) {
            var o = t.split(" "), a = e.versioninfo.split(" "), r = 0;
            "0xff" == o[1] || "0xff" == o[2] ? r = 0 : a[1] == o[1] && "0xff" != o[1] || versioninfo[2] == o[2] && "0xff" != o[2] ? e.ccCmd ? (r = 1,
              e.ccCmd = !1) : r = 2 : r = 1, e.eprominfo = t, e.status = r, n(e);
          } else i(3);
        });
      });
    }
  }, {
    key: "getLocation",
    value: function (e) {
      return new Promise(function (t, n) {
        wx.getLocation({
          success: function (n) {
            console.log(">>>>>" + JSON.stringify(n)), e.latitude = n.latitude, e.longitude = n.longitude,
              t(e);
          },
          fail: function (e) {
            n(e), wx.showModal({
              title: "",
              content: "获取位置信息失败"
            });
          }
        });
      });
    }
  }, {
    key: "doConfirm",
    value: function (e, t) {
      return new Promise(function (n, i) {
        200 == e.statusCode ? n({
          data: e.data.codeValue,
          info: t
        }) : i("网络错误");
      });
    }
  }, {
    key: "confirmResult",
    value: function (e) {
      var t = this, n = e.data, i = e.info;
      if (0 == n.indexOf("cc") && n.indexOf("0d0a") > 0) {
        
        var a = n;
        a = a.trim(), t.writeCmd_cc(i, a);
       
      } else "验证成功" == n ? (console.log("验证成功"), t.confirmationing = !1, wx.setStorageSync(o.default.confirmation_success_key, t.bluetooth.conn.deviceId),
        "tcheck/check" != getApp().globalData.goBackToWelcome && "../thrid/welcome/welcome2" != getApp().globalData.goBackToWelcome && (getApp().globalData.staffCode != getApp().globalData.bluetoothName && "1a" == getApp().globalData.nowBindInfo.versionInfo && this.modifyName(),
          getApp().globalData.modifyName ? wx.navigateTo({
            url: "/pages/hostory/modifyName"
          }) : wx.redirectTo({
            url: "../../pages/thrid/welcome/welcome3"
          }))) : "激活成功" == n ? (console.log("激活成功"), t.confirmationCount > 0 && t.confirmation()) : t.confirmationCount > 0 ? (t.confirmationCount-- ,
            t.confirmation()) : (t.confirmationing = !1, wx.removeStorageSync(o.default.confirmation_success_key),
              wx.showModal({
                title: "验证",
                content: n,
                showCancel: !1
              }));
    }
  }, {
    key: "confirmation",
    value: function () {
      var e = this, t = {};
      e.confirmationing = !0, e.getLocation(t).then(function (t) {
        return e.writeCmd_bb(t);
      }, function (e) {
        console.log("获取位置信息失败：" + e);
      }).then(function (t) {
        return e.writeCmd_aa(t);
      }, function (e) {
        console.log("写入aa指令失败：" + e);
      }).then(function (t) {
        return e.writeCmd_dd(t);
      }, function (e) {
        console.log("写入bb指令失败：" + e);
      }).then(function (t) {
        return e.confirmationServer(t);
      }, function (e) {
        console.log("写入dd指令失败：" + e);
      }).then(function (n) {
        return console.log("log" + JSON.stringify(n)), getApp().globalData.netuserInfo.id = n.data.user.id,
          e.doConfirm(n, t);
      }, function (e) {
        console.log("网络错误：" + JSON.stringify(e));
        }).then(
        e.confirmResult.bind(this), function (e) {  
      }).catch(function (e) {
        console.log("错误：" + JSON.stringify(e));
      });
    }
  }, {
    key: "confirmationServer",
    value: function (e) {
      var t = e.versioninfo.replace(/0x/g, "").split(" "), n = t[1], i = t[2], s = e.longitude, c = e.latitude, u = e.eprominfo.replace(/0x/g, "").replace(/ /g, ""), l = getApp().read(o.default.id_key), d = e.status, h = {
        producerName: n,
        versionNo: i,
        codeValue: u,
        jingdu: s,
        weidu: c,
        Openid: l,
        type: e.type,
        zhuangTai: d,
        action: "getmemberinfo",
        ordersn: getApp().globalData.OrderId
      }, f = Object.assign(h, getApp().globalData.addUserParameter);
      console.log("vi=" + JSON.stringify(f)), getApp().globalData.nowBindInfo = h, "1a" != i && getApp().globalData.modifyName && getApp().globalData.nowModelShow && (getApp().globalData.nowModelShow = !1,
        wx.showModal({
          title: "提示",
          content: "您的设备不支持更名",
          success: function (e) {
            e.cancel || wx.navigateBack({
              delta: 1
            });
          },
          showCancel: !1
        }));
      return a.default.post(r.confirmationCodes, f);
    }
  }, {
    key: "modifyName",
    value: function () {
      var e = /[A-Za-z0-9\- ]+$/, t = getApp().globalData.staffCode;
      if (e.test(t) && t.length <= 16) {
        getApp().globalData.nowBTInfo;
        var n = t.length.toString(16);
        parseInt(n, 16) < 16 && (n = "0" + n);
        var i = this.toAscii(t);
        console.log(i);
        var o = "fa01" + n + i + "aa";
        console.log(o), this.send_string = !0, this.SendTap(o);
      } else wx.showModal({
        title: "提示",
        content: "只能输入数字、字母、-和空格，最多输入16字节"
      });
    }
  }, {
    key: "strToHexCharCode",
    value: function (e) {
      if ("" === e) return "";
      var t = [];
      t.push("0x");
      for (var n = 0; n < e.length; n++) t.push(e.charCodeAt(n).toString(16));
      return t.join("");
    }
  }, {
    key: "hexCharCodeToStr",
    value: function (e) {
      var t = e.trim(), n = "0x" === t.substr(0, 2).toLowerCase() ? t.substr(2) : t, i = n.length;
      if (i % 2 != 0) return alert("Illegal Format ASCII Code!"), "";
      for (var o, a = [], r = 0; r < i; r += 2) o = parseInt(n.substr(r, 2), 16), a.push(String.fromCharCode(o));
      return a.join("");
    }
  }, {
    key: "toAscii",
    value: function (e) {
      for (var t = "", n = 0; n < e.length; n++) t += e.charCodeAt(n).toString(16);
      return t;
    }
  }, {
    key: "SendTap",
    value: function (e) {
      var t = this, n = [], i = "", o = e;
      if (console.log("输入框中的值", o), o.length > 42) if (1 == t.send_string) {
        var a = o, r = Math.ceil(a.length / 20);
        console.log("需要循环的次数", r);
        for (f = 0; f < r; f++) if (a.length > 20) {
          var s = a.slice(0, 20);
          console.log("截取到的值", s), a = a.substring(20), n.push(s);
        } else n.push(a);
        console.log("write_array数组", n), n.map(function (e, n) {
          setTimeout(function () {
            var n = e;
            console.log("value_set", n);
            t.write(n);
          }, 100 * n);
        });
        var c = t.data.send_number + o.length / 2, u = Math.floor(c);
        t.setData({
          send_number: u
        });
      } else {
        h = o.split("");
        console.log("value_split", h);
        for (f = 0; f < h.length; f++) i += h[f].charCodeAt().toString(16);
        var l = i;
        console.log("转为Ascii码值", l), console.log("Ascii_value的长度", l.length);
        var d = Math.ceil(l.length / 20);
        console.log("Ascii发送的次数", d);
        for (f = 0; f < d; f++) if (l.length > 20) {
          v = l.slice(0, 20);
          console.log("截取到的值", v), l = l.substring(20), console.log("此时剩下的Ascii_value", l),
            n.push(v);
        } else {
          v = l;
          n.push(l);
        }
        console.log("数组write_array", n), n.map(function (e, n) {
          setTimeout(function () {
            var n = e;
            console.log("value_set", n);
            t.write(n);
          }, 100 * n);
        });
        var c = t.data.send_number + o.length, u = Math.round(c);
        t.setData({
          send_number: u
        });
      } else {
        if (1 == t.send_string) v = o; else {
          var h = o.split("");
          console.log("value_split", h);
          for (var f = 0; f < h.length; f++) i += h[f].charCodeAt().toString(16);
          var v = i;
          console.log("转为Ascii码值", v);
        }
        t.write(v);
        if (1 == t.send_string) {
          var c = t.data.send_number + o.length / 2, u = Math.floor(c);
          t.setData({
            send_number: u
          });
        } else {
          var c = t.data.send_number + o.length, u = Math.round(c);
          t.setData({
            send_number: u
          });
        }
      }
    }
  }, {
    key: "write",
    value: function (e) {
      var t = getApp().globalData.nowBTInfo;
      console.log(t);
      var n = e;
      console.log("value", n);
      var i = new Uint8Array(n.match(/[\da-f]{2}/gi).map(function (e) {
        return parseInt(e, 16);
      })).buffer;
      wx.writeBLECharacteristicValue({
        deviceId: t.deviceId,
        serviceId: t.serviceId,
        characteristicId: t.characteristicId,
        value: i,
        success: function (e) {
          console.log("数据发送成功", e), wx.reLaunch({
            url: "../../pages/thrid/welcome/welcome2"
          });
        },
        fail: function (e) {
          console.log("调用失败", e), wx.writeBLECharacteristicValue({
            deviceId: t.deviceId,
            serviceId: t.serviceId,
            characteristicId: t.characteristicId,
            value: i,
            success: function (e) {
              console.log("第2次数据发送成功", e);
            },
            fail: function (e) {
              console.log("第2次调用失败", e), wx.writeBLECharacteristicValue({
                deviceId: t.deviceId,
                serviceId: t.serviceId,
                characteristicId: t.characteristicId,
                value: i,
                success: function (e) {
                  console.log("第3次数据发送成功", e);
                },
                fail: function (e) {
                  console.log("第3次调用失败", e);
                }
              });
            }
          });
        }
      });
    }
  }]), e;
}();

s.sss = 0, exports.default = new s();