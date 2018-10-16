// page/set/set.js
const app = getApp();
const common = require('../../util/js/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: "游客",
    avatarUrl: "/img/theme/cardmin5.png",
    active: [0, 0, 0, 0, 0],
    hidden: true,
    focus: false
  },
  submitToView: function(e) {
    this.refreshView();
    var desc = e.detail.value.desc;
    if (desc === "") {
      return;
    }
    var openid = app.globalData.openid;
    wx.request({
      url: 'https://app.h5i.cc/bug/add',
      data: {
        desc: desc,
        openid: openid
      },
      success: function(response) {
        common.showToast("提交成功");
      },
      fail: function(e) {
        common.showToastError("提交失败");
      }
    })
  },
  refreshView: function() {
    this.setData({
      hidden: true,
      focus: false
    });
  },
  open: function(e) {
    var active = this.data.active;
    for (var i = 0; i < active.length; i++) {
      if (i == e.target.dataset.idx && active[i] != 1) {
        active[i] = 1;
      } else {
        active[i] = 0;
      }
    }
    this.setData({
      active: active
    })
  },
  reLogin: function(e) {
    common.wxLogin(app.globalData,this);
    common.showToast("登录成功");
  },
  showBug: function(e) {
    this.setData({
      hidden: false,
      focus: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    common.wxLogin(app.globalData,this);
    this.setData({
      avatarUrl: options.avatarUrl,
      nickName: options.nickName
    })
  },
  goBack: function(e) {
    wx.navigateBack({
      delta: 1
    })
  },
  getUserInfo: function(e) {
    var _this = this,
      userInfo = e.detail.userInfo,
      openid = app.globalData.openid;
    var data = {
      province: userInfo.province,
      city: userInfo.city,
      openid: app.globalData.openid,
      avatarUrl: userInfo.avatarUrl,
      gender: userInfo.gender,
      nickName: userInfo.nickName
    }
    wx.request({
      url: 'https://app.h5i.cc/user/updateInfo',
      data: data,
      success: function(res) {
        if (res.data == "0") {
          common.showToast("保存信息成功");
          _this.setData({
            avatarUrl: userInfo.avatarUrl,
            nickName: userInfo.nickName
          });
          app.globalData.avatarUrl = userInfo.avatarUrl;
          app.globalData.nickName = userInfo.nickName;
        } else {
          common.showToast("保存信息失败");
        }
      },
      fail: function(e) {
        common.showToastError("保存信息失败");
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})