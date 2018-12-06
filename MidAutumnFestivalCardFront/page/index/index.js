//index.js
//获取应用实例
const app = getApp();
const userRest = require('../../util/js/userRest.js');

Page({
  data: {
    indicatorDots: false,
    vertical: true,
    autoplay: true,
    circular: true,
    interval: 2000,
    duration: 1000,
    previousMargin: 0,
    nextMargin: 0,
    tips: ['抽贺卡，送祝福',
      '贺卡分享后才会属于你',
      '点一下泡泡，有惊喜'
    ],
    currentThemeId: 1,
    len: 6,
    hidden: true,
    nocancel: false,
    modalTitle: '恭喜您获得一张贺卡',
    cancelText: '再看看',
    confirmText: '去编辑',
    showTheme: "",
    bgArr: [1, 2, 3],
    emptyBgs: ["bg-empty-1", "bg-empty-2"],
    bubbleNums: 12,
    userInfo: {
      send: 0,
      receive: 0
    }
  },
  onShareAppMessage: function(obj) {
    return {
      title: '中秋贺卡',
      desc: "可定制精美贺卡在线生成！",
      path: '/page/index/index'
    }
  },
  toTheme: function() {
    this.setData({
      hidden: true
    });
    wx.navigateTo({
      url: "../theme/theme?currentThemeID=" + this.data.currentThemeID
    })
  },

  cancel: function() {
    this.setData({
      hidden: true
    });
  },
  onLoad: function() {

  },
  onReady: function(e) {},

  randomBgId: function(e) {
    if (Math.random() > 0.25) {
      let randomBgID = Math.ceil(Math.random() * this.data.len);
      this.setData({
        currentThemeID: randomBgID,
        card: true,
        hidden: false
      })
    } else {
      this.setData({
        card: false,
        hidden: false
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    userRest.getReq(app.globalData.openid, (userInfo) => {
      this.setData({
        userInfo: userInfo
      });
      app.globalData.userInfo = userInfo;
    });
  }
});