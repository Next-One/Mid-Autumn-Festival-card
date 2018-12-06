//app.js
const common = require('./util/js/common.js');
App({
    checkOpenid: function () {
        let failTip = "您登录失败，请到设置中重新登录！";
        // 判断用户是否有openid，保证用户登陆
        this.globalData.openid = wx.getStorageSync('openid');
        // 用户不存在openid，说明用户可能是第一次登陆
        let _this = this;
        if (this.globalData.openid) {
            common.showToast("成功 get");
        } else {
            wx.login({
                timeout: 20000,
                success: function (res) {
                    wx.request({
                        url: 'http://localhost:8888/register?code=' + res.code,
                        method: "GET",
                        success: function (response) {
                            let openid = response.data.openid;
                            if (openid) {
                                common.showToast("成功 register");
                                _this.globalData.openid = openid;
                                wx.setStorage({
                                    key: "openid",
                                    data: openid
                                })
                            } else {
                                common.showToastError(response.data.err + "");
                            }
                        },
                        fail: function (e) {
                            common.showToastError(failTip);
                        }
                    })
                },
                fail: function (res) {
                    common.showToastError(failTip);
                }
            })
        }
    },
    onLaunch: function () {
        // 登录并设置openid
        this.checkOpenid();
    },
    globalData: {
        openid: null,
        currentThemeID: 1,
        userInfo: {}
    }
})