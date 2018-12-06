const common = require('./common.js');
const url = "http://localhost:8888/send";
module.exports = {
  getReq: function(openid, callBack) {
    wx.request({
      url: url + "/" +openid,
      method: "GET",
      success: function(res) {
        callBack(res.data);
      },
      fail: function(e) {
        common.showToastError("获取送出贺卡列表失败");
      }
    })
  },
  postReq: function (data, callBack) {
    let query = common.getQuery(data);
    wx.request({
      url: url+query,
      method: "POST",
      success: function (res) {
        if (res.statusCode === 200) {
          callBack();
        } else {
          common.showToastError("发送贺卡失败");
        }
      },
      fail: function (e) {
        common.showToastError("发送贺卡失败");
      }
    })
  },
  putReq: function (data, callBack) {
    let query = common.getQuery(data);
    wx.request({
      url: url + query,
      method: "PUT",
      success: function(res) {
        if (res.statusCode === 200) {
          callBack();
        } else {
          common.showToastError("修改贺卡失败");
        }
      },
      fail: function(e) {
        common.showToastError("修改贺卡失败");
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