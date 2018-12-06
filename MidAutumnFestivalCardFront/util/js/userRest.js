const common = require('./common.js');
const url = "http://localhost:8888/user";
module.exports = {
  getReq: function (openid, callBack) {
    wx.request({
      url: url + "/" + openid,
      method: "GET",
      success: function(res) {
        if (res.data){
          callBack(res.data)
        }else{
          common.showToastError("获取用户信息失败");
        }
      },
      fail: function(e) {
        common.showToastError("获取用户信息失败");
      }
    })
  },
  putReq: function(data, callBack) {
    let query = common.getQuery(data);
    wx.request({
      url: url + query,
      method: "PUT",
      success: function (res) {
        if (res.statusCode === 200) {
          callBack(data);
        } else {
          common.showToastError("修改信息失败");
        }
      },
      fail: function (e) {
        common.showToastError("修改信息失败");
      }
    })
  }

}