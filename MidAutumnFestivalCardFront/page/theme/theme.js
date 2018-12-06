// page/theme/theme.js
const app = getApp();
const common = require('../../util/js/common.js');
const sendRest = require('../../util/js/sendRest.js');
const receiveRest = require('../../util/js/receiveRest.js');
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
        content: '中秋佳节明月圆，良辰美景月饼甜。花好月圆祝福你，中秋节平安快乐！',
        share: false,
        height: false,
        send: 0,
        receive: 0,
        friendCancel: false
    },
    edit: function (e) {
        this.setData({
            hidden: false,
            focus: true
        })
    },
    toIndex: function () {
        wx.switchTab({
            url: '../index/index'
        })
    },
    friendCancel: function (e) {
        this.setData({
            friendHidden: true
        })
    },
    onShareAppMessage: function () {
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

    submitToView: function (e) {
        this.refreshView(e);
        let value = e.detail.value,
            friendName = value.friendName === "" ? this.data.friendName : value.friendName,
            content = value.content === "" ? this.data.content : value.content;
        this.setData({
            friendName: friendName,
            content: content
        });
        this.refreshView(e);
    },
    refreshView: function (e) {
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
    onLoad: function (options) {
        common.getSysHeight(this);
        if (options.themeid) {
            // 通过分享进入的
            let themeid = parseInt(options.themeid),
                sendid = options.openid,
                friendName = options.friendName ? options.friendName : this.data.friendName,
                content = options.content ? options.content : this.data.content,
                openid = app.globalData.openid;
            this.setData({
                currentThemeID: themeid,
                content: content,
                friendName: friendName,
                share: true
            });
            if (sendid && sendid !== openid) {
                receiveRest.postReq({
                    openid: openid,
                    themeid: themeid,
                    friendName: friendName,
                    content: content,
                    sendid: sendid
                },()=>{})
            }
        } else {
            this.setData({
                currentThemeID: parseInt(options.currentThemeID),
                share: false
            });
        }
    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        common.showToastError("提示：第一次效果不佳,点击编辑再次观看效果")
    }

})