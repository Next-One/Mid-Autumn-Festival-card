var request = require('request');

var fs = require('fs'); // 载入fs模块


module.exports = {
  httpPost: function (url, data) {
    var writeStream = fs.createWriteStream('image.png');
    var readStream = request({
      url: url,
      method: "POST",
      json: true,
      headers: {
        "content-type": "application/json",
      },
      body: data
    });
    readStream.pipe(writeStream);
    readStream.on('end', function () {
      console.log('文件下载成功');
    });
    readStream.on('error', function () {
      console.log("错误信息:" + err)
    })
    writeStream.on("finish", function () {
      console.log("文件写入成功");
      writeStream.end();
    });
  }
}