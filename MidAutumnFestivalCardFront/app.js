//app.js
const common = require('./util/js/common.js');
App({
  checkOpenid: function() {
    var failTip = "您登录失败，请到设置中重新登录！";
    try {
      // 判断用户是否有openid，保证用户登陆
      this.globalData.openid = wx.getStorageSync('openid');
      if (this.globalData.openid) {
        common.showToast("登录成功");
      } else {
        // 用户不存在openid，说明用户可能是第一次登陆
        common.wxLogin(this.globalData)
      }
    } catch (e) {
      common.showToastError(failTip);
    }
  },
  onLaunch: function() {
    // 登录并设置openid
    this.checkOpenid();
  },
  globalData: {
    openid: null,
    currentThemeID: 1,
    send: 0,
    receive: 0,
    avatarUrl: "/img/theme/cardmin5.png",
    nickName: "游客"
  }
})