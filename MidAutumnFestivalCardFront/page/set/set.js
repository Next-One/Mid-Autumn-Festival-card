// page/set/set.js
const app = getApp();
const common = require('../../util/js/common.js');
const userRest = require('../../util/js/userRest.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: [0, 0, 0, 0, 0]
    },

    open: function (e) {
        let active = this.data.active;
        let idx = parseInt(e.currentTarget.dataset.idx);
        for (let i = 0; i < active.length; i++) {
            if (i === idx && active[i] !== 1) {
                active[i] = 1;
            } else {
                active[i] = 0;
            }
        }
        this.setData({
            active: active
        })
    },
    reLogin: function (e) {
        common.showToast("登录成功");
    },
    goBack: function (e) {
        wx.navigateBack({
            delta: 1
        })
    },
    getUserInfo: function (e) {
        let userInfo = e.detail.userInfo;
        let data = {
            openid: app.globalData.openid,
            avatarUrl: userInfo.avatarUrl,
            nickName: userInfo.nickName
        };
        userRest.putReq(data, () => {
            common.showToast("导入信息超过！")
        });
    }
})