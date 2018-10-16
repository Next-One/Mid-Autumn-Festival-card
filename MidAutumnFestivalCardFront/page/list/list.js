// page/list/list.js
const app = getApp();
const common = require('../../util/js/common.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    sendThemes: [],
    receiveThemes: [],
    sendEmpty: true,
    receiveEmpty: true,
    currentTab: 0,
    theme: null,
    id: 0,
    idx: 0,
    send: 0,
    receive: 0,
    openid: "",
    avatarUrl: "/img/theme/cardmin5.png",
    nickName: "游客",
    hidden: true,
    sendEmptyTips: ["(⊙▂⊙) 还没有贺卡. . .",
      "(*>﹏<*) 贺卡分享后才添加记录！",
      "(︶︹︺) 去首页收集贺卡吧！"
    ],
    receiveEmptyTips: ["(⊙▂⊙) 还没有收到贺卡. . .",
      "(*>﹏<*) 这些人怎么都不给我"
    ],
    emptyBgs: ["bg-empty-1", "bg-empty-2"]
  },
  handleTheme: function(e) {
    var share = this.data.currentTab == 0 ? true : false,
      idx = e.target.dataset.idx,
      themes = share ? this.data.sendThemes : this.data.receiveThemes,
      theme = themes[idx],
      url = "../themelist/themelist";
    theme.share = !share;
    this.setData({
      theme: theme
    });
    wx.navigateTo({
      url: url
    })
  },
  setInfo: function(e) {
    wx.navigateTo({
      url: "../set/set?avatarUrl=" + this.data.avatarUrl + "&nickName=" + this.data.nickName
    });
  },
  cancel: function(e) {
    this.setData({
      hidden: true
    })
  },
  confirmDelete: function(e) {
    this.setData({
      hidden: true
    })
    if (this.data.currentTab == 0) {
      this.delSend()
    } else {
      this.delReceive()
    }

  },
  //点击切换
  clickTab: function(e) {
    if (this.data.currentTab != e.target.dataset.current) {
      this.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  initSendList: function() {
    var openid = app.globalData.openid,
      _this = this;
    wx.request({
      url: 'https://app.h5i.cc/theme/list',
      data: {
        openid: openid
      },
      success: function(res) {
        var sendThemes = res.data;
        if (typeof sendThemes != "string") {
          _this.setData({
            sendThemes: sendThemes,
            sendEmpty: false
          });
        } else {
          _this.setData({
            sendEmpty: true
          })
        }
      },
      fail: function(e) {
        _this.setData({
          sendEmpty: true
        })
      }
    })
  },
  initReceiveList: function() {
    var openid = app.globalData.openid,
      _this = this;
    wx.request({
      url: 'https://app.h5i.cc/receive/list',
      // url: 'http://localhost:8888/receive/list',
      data: {
        openid: openid
      },
      success: function(res) {
        var receiveThemes = res.data;
        if (typeof receiveThemes != "string") {
          _this.setData({
            receiveThemes: receiveThemes,
            receiveEmpty: false
          });
        } else {
          _this.setData({
            receiveEmpty: true
          })
        }
      },
      fail: function(e) {
        _this.setData({
          receiveEmpty: true
        })
      }
    })
  },
  toIndex: function() {
    wx.switchTab({
      url: '../index/index'
    })
  },

  //删除事件
  del: function(e) {
    var themes = this.data.currentTab == 0 ? this.data.sendThemes : this.data.receiveThemes,
      idx = e.target.dataset.idx,
      theme = themes[idx]
    this.setData({
      hidden: false,
      id: e.target.dataset.id,
      idx: idx,
      theme: theme
    })
  },
  delSend: function() {
    var _this = this,
      sendThemes = this.data.sendThemes,
      id = this.data.id,
      idx = this.data.idx;
    wx.request({
      url: 'https://app.h5i.cc/theme/delete/',
      method: "GET",
      data: {
        id: id,
        openid: app.globalData.openid
      },
      success: function(res) {
        _this.showToast("删除成功");
        sendThemes.splice(idx, 1);
        _this.setData({
          sendThemes: sendThemes
        })
      },
      fail: function(e) {
        _this.showToastError("删除失败");
      }
    })
  },
  delReceive: function() {
    var _this = this,
      id = this.data.id,
      idx = this.data.idx,
      receiveThemes = this.data.receiveThemes;
    wx.request({
      url: 'https://app.h5i.cc/receive/delete/',
      data: {
        id: id,
        openid: app.globalData.openid
      },
      success: function(res) {
        _this.showToast("删除成功");
        receiveThemes.splice(idx, 1);
        _this.setData({
          receiveThemes: receiveThemes
        })
      },
      fail: function(e) {
        _this.showToastError("删除失败");
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // common.initUserInfo(app.globalData,this)
  },
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.setData({
      openid: app.globalData.openid
    })
  },
  onShareAppMessage: function(obj) {
    return {
      title: '可定制精美贺卡在线生成！',
      path: '/page/list/list'
    }
  },
  showToast: function(title) {
    wx.showToast({
      title: title,
      mask: true,
      duration: 1000
    });
  },
  showToastError: function(title) {
    wx.showToast({
      title: title,
      mask: true,
      duration: 2000,
      icon: "none"
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    common.wxLogin(app.globalData,this);
    this.initSendList();
    this.initReceiveList();
    this.setData({
      send: app.globalData.send,
      receive: app.globalData.receive,
      avatarUrl: app.globalData.avatarUrl,
      nickName: app.globalData.nickName
    })
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