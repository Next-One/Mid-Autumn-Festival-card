module.exports = {
    getQuery: function (data) {
        let query = "?";
        for (let attr in data) {
            query += attr + "=" + data[attr] + "&";
        }
        let len = query.length - 1;
        return query.substring(0, len);
    },
    showToast: function (title) {
        wx.showToast({
            title: title,
            mask: true,
            duration: 800
        });
    },
    showToastError: function (title) {
        wx.showToast({
            title: title,
            mask: true,
            duration: 1500,
            icon: "none"
        });
    },
    getSysHeight: function (_this) {
        wx.getSystemInfo({
            success: function (res) {
                if (res.windowHeight > 600) {
                    _this.setData({
                        height: true
                    })
                }
            }
        })
    },
    shareCard: function (data) {
        let _this = this,
            path = "/page/theme/theme?themeid=" + data.themeid + "&friendName=" + data.friendName + "&content=" + data.content + "&sendid=" + data.openid;
        return {
            title: '中秋贺卡',
            desc: '我给你发送了贺卡，快来看看！',
            path: path,
            success: function (res) {
                _this.showToast("分享成功");
                wx.request({
                    url: 'http://47.107.89.101/theme/add',
                    data: {
                        openid: data.openid,
                        themeid: data.themeid,
                        friendName: data.friendName,
                        content: data.content
                    },
                    success: function (res) {
                    },
                    fail: function (e) {
                    }
                });
            },
            fail: function (e) {
                _this.showToastError("取消分享")
            }
        }
    }
}