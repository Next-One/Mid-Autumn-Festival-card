// page/list/list.js
const app = getApp();
const common = require('../../util/js/common.js');
const sendRest = require('../../util/js/sendRest.js');
const receiveRest = require('../../util/js/receiveRest.js');
Page({
    /**
     * 页面的初始数据
     */
    data: {
        sendThemes: [],
        receiveThemes: [],
        currentTab: 0,
        theme: null,
        id: 0,
        idx: 0,
        userInfo: null,
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
    handleTheme: function (e) {
        let idx = parseInt(e.currentTarget.dataset.idx),
            themes = !this.data.currentTab ? this.data.sendThemes : this.data.receiveThemes,
            theme = themes[idx];
        theme.share = !!this.data.currentTab;
        this.setData({
            theme: theme
        });
        wx.navigateTo({
            url: "../themelist/themelist"
        })
    },
    setInfo: function (e) {
        wx.navigateTo({
            url: "../set/set"
        });
    },
    cancel: function (e) {
        this.setData({
            hidden: true
        })
    },
    confirmDelete: function (e) {
        this.setData({
            hidden: true
        });
        if (this.data.currentTab === 0) {
            this.delSend()
        } else {
            this.delReceive()
        }
    },
    switchTab(e) {
        if (e.currentTarget.dataset.tab) {
            this.setData({
                currentTab: parseInt(e.currentTarget.dataset.tab)
            });
        } else {
            this.setData({
                currentTab: e.detail.current
            });
        }
    },
    toIndex: function () {
        wx.switchTab({
            url: '../index/index'
        })
    },
    //删除事件
    del: function (e) {
        let themes = this.data.currentTab === 0 ? this.data.sendThemes : this.data.receiveThemes,
            idx = e.currentTarget.dataset.idx,
            theme = themes[idx];
        this.setData({
            hidden: false,
            id: e.currentTarget.dataset.id,
            idx: idx,
            theme: theme
        })
    },
    delSend: function () {
        const sendThemes = this.data.sendThemes;
        sendRest.deleteReq(this.data.id, () => {
            common.showToast("删除成功");
            sendThemes.splice(this.data.idx, 1);
            this.setData({
                sendThemes: sendThemes
            })
        });
    },
    delReceive: function () {
        const receiveThemes = this.data.receiveThemes;
        receiveRest.deleteReq(this.data.id, () => {
            common.showToast("删除成功");
            receiveThemes.splice(this.data.idx, 1);
            this.setData({
                receiveThemes: receiveThemes
            })
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            userInfo: app.globalData.userInfo
        })
    },

    onShareAppMessage: function (obj) {
        return {
            title: '可定制精美贺卡在线生成！',
            path: '/page/list/list'
        }
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        const openid = app.globalData.openid;
        sendRest.getReq(openid, (send) => {
            this.setData({
                sendThemes: send
            })
        });
        receiveRest.getReq(openid, (send) => {
            this.setData({
                receiveThemes: send
            })
        })
    }


})