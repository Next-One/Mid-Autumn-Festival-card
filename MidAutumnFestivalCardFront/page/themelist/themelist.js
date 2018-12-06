// page/theme/theme.js
const app = getApp();
const common = require('../../util/js/common.js');
const sendRest = require('../../util/js/sendRest.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentThemeID: 1,
    friendName: '朋友',
    content: '中秋佳节明月圆，良辰美景月饼甜。花好月圆祝福你，中秋节平安快乐！',
    hidden: true,
    refresh: '',
    focus: false,
    id: 0,
    send: 0,
    receive: 0,
    theme: null,
    first: true,
    share: false,
    friendHidden: true,
    shareImgSrc: "/img/theme/card1.png",
    friendCancel: false
  },
  edit: function(e) {
    this.setData({
      hidden: false,
      focus:true
    })
  },
  onShareAppMessage: function(obj) {
      let data = {
          themeid: this.data.currentThemeID,
          friendName: this.data.friendName,
          content: this.data.content,
          openid: app.globalData.openid
      };
      let query = common.getQuery(data);
      let path = "/page/theme/theme" + query;
      return {
          title: '中秋贺卡',
          desc: '我给你发送了贺卡，快来看看！',
          path: path,
          success: function (res) {
              common.showToast("分享成功");
              sendRest.postReq(data, () => {
              });
          },
          fail: function (e) {
              common.showToastError("取消分享")
          }
      }
  },
  friendCancel: function (e) {
    this.setData({
      friendHidden: true
    })
  },
  submitToView: function(e) {
    this.refreshView(e);
    let value = e.detail.value,
      friendName = value.friendName === "" ? this.data.friendName : value.friendName,
      content = value.content === "" ? this.data.content : value.content;

    this.setData({
      friendName: friendName,
      content: content,
      focus:false
    });
    this.refreshView(e)
  },
  refreshView: function(e) {
    this.setData({
      hidden: true,
      refresh: 'none'
    });
    this.setData({
      refresh: ''
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    common.getSysHeight(this);
    this.initData()
  },
  toIndex: function() {
    wx.switchTab({
      url: '../index/index'
    })
  },
  initData: function() {
    let pages = getCurrentPages(),
      len = pages.length - 2,
      prev = pages[len],
      theme = prev.data.theme;
    this.setData({
      currentThemeID: theme.themeid,
      friendName: theme.friendName,
      content: theme.content,
      id: theme.id,
      theme: theme,
      share: theme.share
    });
  },

 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (this.data.first) {
      common.showToastError("提示：第一次效果不佳,点击编辑再次观看效果");
      this.setData({
        first: false
      })
    }
  }


})