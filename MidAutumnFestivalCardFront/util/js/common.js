module.exports = {

  showToast: function(title) {
    wx.showToast({
      title: title,
      mask: true,
      duration: 800
    });
  },
  showToastError: function(title) {
    wx.showToast({
      title: title,
      mask: true,
      duration: 1500,
      icon: "none"
    });
  },
  getSysHeight: function(_this) {

    wx.getSystemInfo({
      success: function(res) {
        if (res.windowHeight > 600) {
          _this.setData({
            height: true
          })
        }
      }
    })
  },
  getUserInfo: function(response, appData, curThis) {
    // this.showToast("登录成功");
    var openid = response.data.openid,
      avatarUrl = response.data.avatarUrl,
      nickName = response.data.nickName,
      receive = response.data.receive,
      send = response.data.send;
    appData.openid = openid;
    appData.nickName = nickName;
    appData.send = send;
    appData.receive = receive;
    if (curThis) {
      curThis.setData({
        avatarUrl: avatarUrl,
        nickName: nickName,
        receive: receive,
        send: send
      });
    }
    if (avatarUrl == "/img/theme/cardmin5.png") {
      wx.setStorageSync("avatarLocal", avatarUrl);
    } else {
      wx.getImageInfo({
        src: avatarUrl, //请求的网络图片路径
        success: function(res) {
          appData.avatarUrl = res.path;
          wx.setStorageSync("avatarLocal", res.path);
        }
      })
    }
  },
  wxLogin: function(appData, curThis) {
    var _this = this;
    if (appData.openid) {
      if (appData.nickName === "游客") {
        wx.request({
          url: 'https://app.h5i.cc/user/getInfo',
          data: {
            openid: appData.openid
          },
          success: function(response) {
            _this.getUserInfo(response, appData, curThis)
          },
          fail: function(e) {}
        })
      }
    } else {
      wx.login({
        timeout: 20000,
        success: function(res) {
          wx.request({
            url: 'https://app.h5i.cc/login',
            data: {
              code: res.code
            },
            success: function(response) {
              _this.getUserInfo(response, appData, curThis);
              wx.setStorageSync('openid', response.data.openid);
            },
            fail: function(e) {}
          })
        },
        fail: function(res) {
          // _this.showToastError(failTip);
        }
      })
    }
  },
  shareCard: function(data) {
    var _this = this,
      path = "/page/theme/theme?themeid=" + data.themeid + "&friendName=" + data.friendName + "&said=" + data.said + "&sendid=" + data.openid;
    return {
      title: '中秋贺卡',
      desc: '我给你发送了贺卡，快来看看！',
      path: path,
      success: function(res) {
        _this.showToast("分享成功");
        wx.request({
          url: 'https://app.h5i.cc/theme/add',
          data: {
            openid: data.openid,
            themeid: data.themeid,
            friendName: data.friendName,
            content: data.said
          },
          success: function(res) {},
          fail: function(e) {}
        });
      },
      fail: function(e) {
        _this.showToastError("取消分享")
      }
    }
  },
  drawDashLine: function([x1, y1], [x2, y2], ctx, step = 5) {
    const x = x2 - x1,
      y = y2 - y1,
      count = Math.floor(Math.sqrt(x * x + y * y) / step),
      xv = x / count,
      yv = y / count;
    ctx.beginPath();
    for (let i = 0; i < count; i++) {
      if (i % 2 === 0) {
        ctx.moveTo(x1, y1);
      } else {
        ctx.lineTo(x1, y1);
      }
      x1 += xv;
      y1 += yv;
    }
    ctx.lineTo(x2, y2);
  },
  drawDashRect: function(left, top, width, height, ctx, step = 5) {
    this.drawDashLine([left, top], [left + width, top], ctx, step);
    ctx.stroke();
    this.drawDashLine([left + width, top], [left + width, top + height], ctx, step);
    ctx.stroke();
    this.drawDashLine([left + width, top + height], [left, top + height], ctx, step);
    ctx.stroke();
    this.drawDashLine([left, top + height], [left, top], ctx, step);
    ctx.stroke();
  },
  getCanvas: function(data, curThis) {
    //2. canvas绘制文字和图片
    var ctx = wx.createCanvasContext('myCanvas'),
      width = 720,
      height = 930,
      pdl = 10,
      pdr = width - pdl,
      codeImg = curThis.data.codeImg,
      avatarUrl = wx.getStorageSync("avatarLocal"),
      nickName = data.nickName,
      content = curThis.data.said,
      _this = this,
      widthFix = 510,
      themeID = parseInt(curThis.data.currentThemeID),
      themeImg = '/img/theme/card' + themeID + '.png';
    ctx.setFillStyle('#ffffff');
    if(avatarUrl.substring(0,4) == "http"){
      wx.getImageInfo({
        src: avatarUrl, //请求的网络图片路径
        success: function (res) {
          avatarUrl = res.path;
          data.avatarUrl = avatarUrl;
          wx.setStorageSync("avatarLocal", avatarUrl);
        }
      })
    }

    ctx.fillRect(0, 0, width, height);

    switch (themeID) {
      case 1:
        ctx.drawImage(themeImg, pdl, pdl, 312, 234, pdl, pdl, pdr, widthFix);
        break;
      case 2:
        ctx.drawImage(themeImg, 14, 74, 312, 234, pdl, pdl, pdr, widthFix);
        break;
      case 3:
        ctx.drawImage(themeImg, 8, 220, 300, 234, 5, 5, pdr, widthFix);
        break;
      case 4:
        ctx.drawImage(themeImg, 6, 30, 300, 234, 5, 5, pdr, widthFix);
        break;
      case 5:
        ctx.drawImage(themeImg, 0, 30, 300, 234, 5, 5, pdr, widthFix);
        break;
      case 6:
        ctx.drawImage(themeImg, 20, 0, 312, 234, 5, 5, pdr, widthFix);
        break;
      default:
        ctx.drawImage(themeImg, pdl, pdl, 312, 234, pdl, pdl, pdr, widthFix);
    }

    ctx.drawImage(codeImg, 480 - pdl, 690 - pdl, 240, 240);

    ctx.drawImage(avatarUrl, pdl, 550, 108, 108);
    ctx.setStrokeStyle("rgba(255,0,0,0.8)")
    this.drawDashRect(1, 1, width - 2, height - 2, ctx);

    ctx.setFontSize(32)
    ctx.setFillStyle('#6F6F6F')
    ctx.fillText(nickName, 170, 610)

    ctx.setFontSize(36)
    ctx.setFillStyle('#333333')
    if (content.substring(0, 4) == "中秋佳节") {
      content = "祝大家中秋节快乐!"
    }
    if (content.length > 30) {
      content = content.substring(0, 27) + "...";
    }
    for (var i = 0, idx = 0; i < content.length; i += 10, idx++) {
      ctx.fillText(content.substring(i, (idx + 1) * 10), pdl, 720 + idx * 50)
    }
    ctx.setFontSize(28)
    ctx.setFillStyle('#999999')
    ctx.fillText('长按扫码查看详情', pdl, 900)
    ctx.draw();

    function saveImg() {
      // 3. canvas画布转成图片
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: 720,
        height: 930,
        destWidth: 720,
        destHeight: 930,
        canvasId: 'myCanvas',
        success: function(res) {
          curThis.setData({
            shareImgSrc: res.tempFilePath
          })
        },
        fail: function(res) {
          _this.showToastError("生成图片失败！")
        }
      })
    }
    setTimeout(saveImg, 200)
  }



}