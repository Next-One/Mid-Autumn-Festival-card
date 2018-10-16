// page/theme/theme.js
const app = getApp();
const common = require('../../util/js/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentThemeID: 1,
    hidden: true,
    friendHidden: true,
    refresh: '',
    focus: false,
    friendName: '朋友',
    said: '中秋佳节明月圆，良辰美景月饼甜。花好月圆祝福你，中秋节平安快乐！',
    share: false,
    height: false,
    send: 0,
    receive: 0,
    shareImgSrc: "/img/theme/card1.png",
    codeImg: '/img/zqcode.png',
    friendCancel: false,
    avatarUrl: "/img/theme/cardmin5.png",
    nickName: "游客"
  },
  edit: function(e) {
    this.setData({
      hidden: false,
      focus: true
    })
  },
  toIndex: function() {
    wx.switchTab({
      url: '../index/index'
    })
  },
  friendQuan: function(e) {
    common.getCanvas(app.globalData, this);
    this.setData({
      friendHidden: false
    })
  },
  friendCancel: function(e) {
    this.setData({
      friendHidden: true
    })
  },
  onShareAppMessage: function() {
    return common.shareCard({
      themeid: this.data.currentThemeID,
      friendName: this.data.friendName,
      said: this.data.said,
      openid: app.globalData.openid
    });
  },

  submitToView: function(e) {
    this.refreshView(e);
    var value = e.detail.value,
      friendName = value.friendName === "" ? this.data.friendName : value.friendName,
      said = value.said === "" ? this.data.said : value.said;
    this.setData({
      friendName: friendName,
      said: said
    });
    this.refreshView(e);
  },
  refreshView: function(e) {
    this.setData({
      hidden: true,
      refresh: "none",
      focus: false
    });
    this.setData({
      refresh: ""
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    common.wxLogin(app.globalData, this);
    common.getSysHeight(this);
    if (options.themeid) {
      // 通过分享进入的
      var themeid = options.themeid,
        sendid = options.sendid,
        friendName = options.friendName ? options.friendName : this.data.friendName,
        said = options.said ? options.said : this.data.said,
        openid = app.globalData.openid;
      this.setData({
        currentThemeID: themeid,
        said: said,
        friendName: friendName,
        share: true
      });
      if (sendid && sendid != openid) {
        this.addShare(sendid, themeid, friendName, said, openid)
      }
    } else {
      this.setData({
        currentThemeID: options.currentThemeID,
        share: false
      });
    }
  },

  addShare: function(sendid, themeid, friendName, said, openid) {
    wx.request({
      url: 'https://app.h5i.cc/receive/add',
      data: {
        openid: openid,
        themeid: themeid,
        friendName: friendName,
        content: said,
        sendid: sendid
      },
      success: function(res) {},
      fail: function(e) {}
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  savePhoto: function(e) {
    //4. 当用户点击分享到朋友圈时，将图片保存到相册
    var _this = this;
    wx.saveImageToPhotosAlbum({
      filePath: _this.data.shareImgSrc,
      success: function(res) {
        wx.showModal({
          title: '存图成功',
          content: '图片成功保存到相册了，去发圈噻~',
          showCancel: false,
          confirmText: '好哒',
          confirmColor: '#72B9C3',
          success: function(res) {
            _this.setData({
              friendHidden: true
            })
          }
        })
      },
      fail: function(res) {
        common.showToastError("获取权限失败")
        wx.openSetting({
          success(settingdata) {
            if (settingdata.authSetting["scope.writePhotosAlbum"]) {
              common.showToast("获取权限成功，再次点击图片保存到相册")
            } else {
              common.showToastError("获取权限失败")
            }
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // common.initUserInfo(app.globalData, this);
    // common.showToastError("提示：第一次效果不佳,点击编辑再次观看效果")
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

  }

})