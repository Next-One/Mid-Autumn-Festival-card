var mysql = require('mysql');
var mysqlConf = require('../conf/mysqlConf');
var receiveSqlMap = require('./receiveSqlMap');
var pool = mysql.createPool(mysqlConf.mysql);
var log = require('../debugLog');

module.exports = {
    add: function (user_theme_array,callback) {
        pool.query(receiveSqlMap.add, user_theme_array, function (error, result) {
            if (error) {
                log.w('receiveDAO.js','add: function (user_receive_array,callback)',error.message);
                callback(500);
            }else{
                log.d('receiveDAO.js','add: function (user_receive_array,callback)',result);
                callback(200);
            }
        });
    },
    list: function (openid,callback) {
        pool.query(receiveSqlMap.list,openid, function (error, result) {
            if (error) {
                log.w('receive.js','list: function (openid,callback)',error.message);
            }
            callback(result);
        });
    },
    delete: function (id,callback) {
        pool.query(receiveSqlMap.delete, id, function (error, result) {
            if (error) {
                log.w('receiveDAO.js','delete: function (id,callback)',error.message);
                callback(500);
            }else{
                log.d('receiveDAO.js','delete: function (id,callback)',result);
                callback(200);
            }
        });
    }
};
