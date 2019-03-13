//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

  },

  onLoad: function () {

  },
  next: function () {
    wx.reLaunch({
      url: "/pages/bluetooth/sreachbluetooth1"
    });
  },
})