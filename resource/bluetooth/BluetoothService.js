function e(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = function() {
    function e(e, n) {
        for (var i = 0; i < n.length; i++) {
            var t = n[i];
            t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), 
            Object.defineProperty(e, t.key, t);
        }
    }
    return function(n, i, t) {
        return i && e(n.prototype, i), t && e(n, t), n;
    };
}(), i = function() {
    function i() {
        e(this, i), 
        this.isCanUsed = !1,
        this.isFonding = !1,
        this.findDevice = null,
        this.findedDevices = [], 
        this.discovering = !1, 
        this.available = !1, 
        this.MaxSearchTime = 1e4, 
        this.services = [], 
        this.isConnected = !1, 
        this.deviceServices = [], 
        this.characteristics = [], 
        this.isReadable = !1, 
        this.isWirteable = !1, 
        this.cacheData = [], 
        this.isReading = !0, 
        this.isConnecting = !1, 
        this.repaitCount = 3;
    }
    return n(i, [ {
        key: "write",
        value: function(e) {
            var n = this;
            if (e && n.conn.deviceId && n.conn.serviceId && n.conn.characteristicId) {
                var i = e, t = new Uint8Array(i.match(/[\da-f]{2}/gi).map(function(e) {
                    return parseInt(e, 16);
                })).buffer;
                wx.writeBLECharacteristicValue({
                    deviceId: n.conn.deviceId,
                    serviceId: n.conn.serviceId,
                    characteristicId: n.conn.characteristicId,
                    value: t,
                    success: function(e) {
                        n.print("数据发送成功", e);
                    },
                    fail: function(e) {
                        n.print("数据发送失败", e), n.isWirteable = !1;
                    }
                });
            } else n.isWirteable = !1, n.print("写入数据失败", e);
        }
    }, {
        key: "read",
        value: function(e) {
            this.readBlue(this.buf2hex(e));
        }
    }, {
        key: "notifyCharacteristicChange",
        value: function(e, n, i) {
            var t = this;
            this.deviceId = e, this.serviceId = n, this.characteristicsId = i, t.isConnected ? (t.isReadable = !0, 
            t.isWirteable = !0, wx.notifyBLECharacteristicValueChange({
                deviceId: e,
                serviceId: n,
                characteristicId: i,
                state: !0,
                success: function(e) {
                    "function" == typeof t.OnStartUsedListener && t.OnStartUsedListener(e.errCode), 
                    console.log("notifyBLECharacteristicValueChange改变：" + JSON.stringify(e));
                }
            }), wx.onBLECharacteristicValueChange(function(e) {
                t.print("获取值成功：", e);
                var n = e.value;
                t.read(n);
            })) : (t.isReadable = !1, t.isWirteable = !1);
        }
    }, {
        key: "getReceiveData",
        value: function() {
            return new Promise(function(e, n) {
                e(that.cacheData);
            });
        }
    }, {
        key: "getDeviceCharacteristic",
        value: function(e, n) {
            var i = this;
            return new Promise(function(t, c) {
                i.isConnected && wx.getBLEDeviceCharacteristics({
                    deviceId: e,
                    serviceId: n,
                    success: function(e) {
                        i.print("特征值提取", e), i.characteristics = e.characteristics, "function" == typeof i.OnDeviceCharacteristicListener && i.OnDeviceCharacteristicListener(i.characteristics), 
                        t(i.characteristics);
                    },
                    fail: function(e) {
                        i.print("特征值提取 err", e);
                    }
                });
            });
        }
    }, {
        key: "getCharacteristic",
        value: function(e, n) {
            var i = this;
            return new Promise(function(t, c) {
                i.print("serviceid=" + e + ",deviceId=" + n), wx.getBLEDeviceCharacteristics({
                    deviceId: n,
                    serviceId: e,
                    success: function(c) {
                        i.print("特征值提取", c);
                        var r = c.characteristics, s = "", a = "";
                        i.isReadable = !0, i.isWirteable = !0, r.forEach(function(e, n) {
                            var i = e.uuid, t = i.slice(4, 8);
                            "FEE1" != t && "fee1" != t || (s = i, a = i), "FEE2" != t && "fee2" != t || (s = i);
                        }), t({
                            serviceId: e,
                            deviceId: n,
                            characteristicId: s,
                            notycharacteristicsId: a
                        });
                    },
                    fail: function(e) {
                        c(!1);
                    }
                });
            });
        }
    }, {
        key: "reConnectBlue",
        value: function(e) {
            var n = this;
            wx.showLoading({
                title: "连接中..."
            }), n.disconnectBlue().then(function() {
                return n.connectBlue1(e);
            }, function(e) {
                return n.print("断开拦截失败", e), wx.hideLoading(), !1;
            }).then(function(e) {
                return n.print("状态：", e), wx.hideLoading(), "function" == typeof n.OnFindServiceListener && n.OnFindServiceListener(state), 
                n.getServiceId(e);
            }, function() {
                wx.hideLoading();
            }).then(function(i) {
                return !!i && n.getCharacteristic(i, e);
            }, function() {
                wx.hideLoading();
            }).then(function(e) {
                return !!e && n.notifyChange(e);
            }, function(e) {
                n.print(e), wx.hideLoading();
            }).then(function(e) {
                e ? (n.isReadable = !0, n.isWirteable = !0, "function" == typeof n.OnConnectedListener && n.OnConnectedListener()) : n.print("状态改变：" + e);
            }, function(e) {
                n.print(e);
            }).catch(function(e) {
                n.print("出错", e), wx.hideLoading();
            });
        }
    }, {
        key: "notifyChange",
        value: function(e) {
            var n = this;
            return this.conn = e, n.print("改变连接：", e), new Promise(function(i, t) {
                wx.notifyBLECharacteristicValueChange({
                    deviceId: e.deviceId,
                    serviceId: e.serviceId,
                    characteristicId: e.characteristicId,
                    state: !0,
                    success: function(t) {
                        wx.onBLECharacteristicValueChange(function(i) {
                            var t = n.buf2hex(i.value);
                            n.print("读取值成功", t), "function" == typeof n.OnReadedListener && n.OnReadedListener(t, e);
                        }), i(!0);
                    },
                    fail: function() {
                        t("notifyChange error");
                    }
                });
            });
        }
    }, {
        key: "disconnectBlue",
        value: function() {
            var e = this;
            return new Promise(function(n, i) {
                if (e.conn) {
                    var t = e.conn.deviceId;
                    wx.closeBLEConnection({
                        deviceId: t,
                        complete: function(i) {
                            e.print("断开蓝牙链接：", i), n();
                        }
                    });
                } else n("deviceid为空");
            });
        }
    }, {
        key: "connectBlue",
        value: function(e) {
            var n = this;
            return n.isConnecting = !0, new Promise(function(i, t) {
                n.isCanUsed ? ("function" == typeof n.OnProgressListener && n.OnProgressListener(!0), 
                wx.onBLEConnectionStateChange(function(e) {
                    n.isConnected = e.connected, "function" == typeof n.OnConnectStateListener && n.OnConnectStateListener(n.isConnected);
                }), wx.createBLEConnection({
                    deviceId: e,
                    success: function(e) {
                        i(!0);
                    },
                    fail: function(e) {
                        t(!0);
                    },
                    complete: function() {
                        n.isConnecting = !1, "function" == typeof n.OnProgressListener && n.OnProgressListener(!1);
                    }
                })) : (t(!0), n.isConnecting = !1);
            }).then(function(i) {
                return n.isConnecting = !1, new Promise(function(i, t) {
                    wx.getBLEDeviceServices({
                        deviceId: e,
                        success: function(e) {
                            n.print("所有的service", e), n.services = e.services, "function" == typeof n.OnFindServiceListener && n.OnFindServiceListener(), 
                            i(!0);
                        },
                        fail: function(e) {
                            n.print("所有的service err", e), i(!0);
                        }
                    });
                });
            }, function(i) {
                wx.hideLoading(), n.isConnecting = !1, wx.showModal({
                    title: "链接蓝牙",
                    content: "链接失败是否重连:" + e,
                    success: function(i) {
                        i.confirm && n.connectBlue(e);
                    }
                }), n.print("createBLEConnection err", i);
            });
        }
    }, {
        key: "connectBlue1",
        value: function(e) {
            var n = this;
            return n.isConnecting = !0, new Promise(function(i, t) {
                n.isCanUsed ? (wx.onBLEConnectionStateChange(function(e) {
                    n.isConnected = e.connected, n.print("蓝牙状态", e), "function" == typeof n.OnConnectStateListener && n.OnConnectStateListener(n.isConnected);
                }), wx.createBLEConnection({
                    deviceId: e,
                    success: function(c) {
                        n.print("连接成功：", c), wx.getBLEDeviceServices({
                            deviceId: e,
                            success: function(e) {
                                n.print("所有的service", e), i(e.services);
                            },
                            fail: function(e) {
                                n.print("所有的service err", e), t(!0);
                            },
                            complete: function() {
                                n.isConnecting = !1;
                            }
                        });
                    },
                    fail: function(e) {
                        n.isConnecting = !1, t(!0);
                    }
                })) : (t(!0), n.isConnecting = !1);
            });
        }
    }, {
        key: "getConnectedDevices",
        value: function() {
            var e = this;
            return new Promise(function(n, i) {
                wx.getConnectedBluetoothDevices({
                    success: function(i) {
                        n(i), e.print("已经连接的设备", i);
                    },
                    fail: function(i) {
                        n(i), e.print("已经连接的设备 error", i);
                    }
                });
            }).then(function(e) {
                return new Promise(function(n, i) {
                    e.devices ? n(e.devices) : i(e);
                });
            });
        }
    }, {
        key: "researchBlue",
        value: function() {
            var e = this;
            e.isCanUsed && e.stopSearchBlue(e.searchBlue()), e.disconnectBlue(deviceid).then(function() {
                return searchBlue();
            });
        }
    }, {
        key: "searchBlue",
        value: function() {
            var e = this;
            e.isCanUsed && wx.startBluetoothDevicesDiscovery({
                services: [ "FEE0", "FEE1", "fee0", "fee1" ],
                allowDuplicatesKey: !0,
                interval: 1e3,
                complete: function(n) {
                    e.print("开始扫描....", n);
                }
            });
        }
    }, {
        key: "stopSearchBlue",
        value: function(e) {
            var n = this;
            return new Promise(function(e, i) {
                n.isCanUsed && (n.isFonding = !1, wx.stopBluetoothDevicesDiscovery({
                    complete: function(i) {
                        "function" == typeof n.OnProgressListener && n.OnProgressListener(!1), e();
                    }
                }));
            });
        }
    }, {
        key: "getDeviceServices",
        value: function() {
            var e = this;
            return new Promise(function(n) {
                n(e.services);
            });
        }
    }, {
        key: "getDevices",
        value: function() {
            var e = this;
            return new Promise(function(n) {
                n(e.findedDevices);
            });
        }
    }, {
        key: "getServiceId",
        value: function(e) {
            var n = void 0;
            return e.forEach(function(e, i) {
                console.log("服务uuid=" + e.uuid + ",isPrimary=" + e.isPrimary);
                var t = e.uuid.slice(4, 8);
                "FEE0" != t && "fee0" != t || (n = e.uuid);
            }), n;
        }
    }, {
        key: "init",
        value: function() {
            var e = this;
            return new Promise(function(e, n) {
                wx.openBluetoothAdapter({
                    success: function(n) {
                        console.log("初始化成功"), e(!0);
                    },
                    fail: function(n) {
                        console.log("初始化失败"), e(!1);
                    }
                });
            }).then(function(n) {
              console.log("获取蓝牙状态")
                n ? (wx.onBluetoothAdapterStateChange(function(n) {
                    console.log("蓝牙状态改变:",    ), 
                    e.isCanUsed = n.available, 
                    e.available = n.available, 
                    e.discovering = n.discovering, 
                    "function" == typeof e.OnAdapterStateListener && e.OnAdapterStateListener(e.isCanUsed);
                }), wx.onBluetoothDeviceFound(function(n) { 
                    e.print("已发现设备：", n), 
                    e.isFonding = !0, 
                    wx.getBluetoothDevices({
                        success: function(n) {
                          console.log("获取在蓝牙模块生效期间所有已发现的蓝牙设备。包括已经和本机处于连接状态的设备。")
                          console.log(n)
                            e.findDevice = n.devices, e.pushToArray(), 
                            "function" == typeof e.OnFindDeviceListener && e.OnFindDeviceListener();
                        }
                    });
                }), wx.getBluetoothAdapterState({
                    success: function(n) {
                      console.log("获取在蓝牙适配状态")
                      console.log(n)
                        e.isCanUsed = !0, "function" == typeof e.OnAdapterStateListener && e.OnAdapterStateListener(e.isCanUsed);
                    },
                    fail: function(n) {
                        e.isCanUsed = !1, "function" == typeof e.OnAdapterStateListener && e.OnAdapterStateListener(e.isCanUsed);
                    },
                    complete: function(n) {
                        e.print("蓝牙状态", n), e.available = n.available;
                    }
                })) : (e.isCanUsed = !1, e.print("初始化", n), "function" == typeof e.OnAdapterStateListener &&                     e.OnAdapterStateListener(e.isCanUsed));
            });
        }
    }, {
        key: "addOnAdapterStateListener",
        value: function(e) {
            this.OnAdapterStateListener = e;
        }
    }, {
        key: "addOnProgressListener",
        value: function(e) {
            this.OnProgressListener = e;
        }
    }, {
        key: "addOnFindDeviceListener",
        value: function(e) {
            this.OnFindDeviceListener = e;
        }
    }, {
        key: "addOnFindedDevicesListener",
        value: function(e) {
            this.OnFindedDevicesListener = e;
        }
    }, {
        key: "addOnConnectStateListener",
        value: function(e) {
            this.OnConnectStateListener = e;
        }
    }, {
        key: "addOnFindServiceListener",
        value: function(e) {
            this.OnFindServiceListener = e;
        }
    }, {
        key: "addOnDeviceCharacteristicListener",
        value: function(e) {
            this.OnDeviceCharacteristicListener = e;
        }
    }, {
        key: "addOnReceivedDataListener",
        value: function(e) {
            this.OnReceivedDataListener = e;
        }
    }, {
        key: "addOnStartUsedListener",
        value: function(e) {
            this.OnStartUsedListener = e;
        }
    }, {
        key: "writeBlue",
        value: function(e) {
            var n = this;
            if (n.print("写入>>>>", e), e.length > 20) {
                var i = [];
                n.print("长度大于20", e.length);
                var t = e, c = Math.ceil(t.length / 20);
                n.print("需要循环的次数", c);
                for (var r = 0; r < c; r++) if (t.length > 20) {
                    var s = t.slice(0, 20);
                    t = t.substring(20), i.push(s);
                } else i.push(t);
                i.map(function(e, i) {
                    var t = e;
                    n.print("发送：第" + i + "次", e), n.write(t);
                });
            } else n.write(e);
        }
    }, {
        key: "writeData",
        value: function(e, n) {
            this.OnReadedListener = n, this.writeBlue(e);
        }
    }, {
        key: "addOnConnectedListener",
        value: function(e) {
            this.OnConnectedListener = e;
        }
    }, {
        key: "readBlue",
        value: function(e) {
            this.print("读取<<<<", e), this.cacheData = "", this.cacheData = e, "function" == typeof this.OnReceivedDataListener && this.OnReceivedDataListener(e);
        }
    }, {
        key: "print",
        value: function(e, n) {
            console.log(e, JSON.stringify(n)), "改变连接：" == e && (console.log(n), getApp().globalData.nowBTInfo = n);
        }
    }, {
        key: "ab2hex",
        value: function(e) {
            return Array.prototype.map.call(new Uint8Array(e), function(e) {
                return ("00" + e.toString(16)).slice(-2);
            }).join(" ");
        }
    }, {
        key: "buf2hex",
        value: function(e) {
            return Array.prototype.map.call(new Uint8Array(e), function(e) {
                return "0x" + ("00" + e.toString(16)).slice(-2);
            }).join(" ");
        }
    }, {
        key: "pushToArray",
        value: function() {
            var e = this, n = e.findDevice;
            n && n.forEach(function(n, i) {
                e.findedDevices.push(n);
            });
        }
    } ]), i;
}();

exports.default = i;