const common = require('./common.js');
const url = "http://localhost:8888/receive";
module.exports = {
    getReq: function(openid, callBack) {
        wx.request({
            url: url + "/" +openid,
            method: "GET",
            success: function(res) {
                callBack(res.data);
            },
            fail: function(e) {
                common.showToastError("获取接收贺卡列表失败");
            }
        })
    },
    postReq: function (data, callBack) {
        wx.request({
            url: url,
            method: "POST",
            data:data,
            success: function (res) {
                if (res.statusCode === 200) {
                    callBack();
                } else {
                    common.showToastError("接收贺卡失败");
                }
            },
            fail: function (e) {
                common.showToastError("接收贺卡失败");
            }
        })
    },
    deleteReq: function(id, callBack) {
        wx.request({
            url: url + "/" + id,
            method: "DELETE",
            success: function(res) {
                if (res.statusCode === 200) {
                    callBack();
                } else {
                    common.showToastError("删除贺卡失败");
                }
            },
            fail: function(e) {
                common.showToastError("删除贺卡失败");
            }
        })
    }
}