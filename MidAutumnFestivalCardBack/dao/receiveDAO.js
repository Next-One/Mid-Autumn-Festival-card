var mysql = require('mysql');
var mysqlConf = require('../conf/mysqlConf');
var receiveSqlMap = require('./receiveSqlMap');
var pool = mysql.createPool(mysqlConf.mysql);
var log = require('../debugLog');

module.exports = {
    add: function (user_theme_array,callback) {
        pool.query(receiveSqlMap.add, user_theme_array, function (error, result) {
            if (error) {
                log.w('receive.js','add: function (user_theme_array,callback)',error.message);
            }
            log.d('receive.js','add: function (user_theme_array,callback)',result);
            callback(result.insertId);
        });
    },
    list: function (openid,callback) {
        pool.query(receiveSqlMap.list,openid, function (error, result) {
            if (error) {
                log.w('receive.js','list: function (openid,callback)',error.message);
            }
            log.d('receive.js','list: function (openid,callback)',result);
            callback(result);
        });
    },
    delete: function (id,callback) {
        pool.query(receiveSqlMap.delete, id, function (error, result) {
            if (error) {
                log.w('receive.js','delete: function (id,callback)',error.message);
            }
            log.d('receive.js','delete: function (id,callback)',result);
            callback(result);
        });
    },
    receiveCount: function (id,callback) {
        pool.query(receiveSqlMap.receiveCount, id, function (error, result) {
            if (error) {
                log.w('receive.js','receiveCount: function (id,callback)',error.message);
            }
            log.d('receive.js','receiveCount: function (id,callback)',result);
            callback(result);
        });
    }
};
