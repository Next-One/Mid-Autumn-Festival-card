var mysql = require('mysql');
var mysqlConf = require('../conf/mysqlConf');
var sendSqlMap = require('./sendSqlMap');
var pool = mysql.createPool(mysqlConf.mysql);
var log = require('../debugLog');

module.exports = {
    add: function (contentArray,callback) {
        pool.query(sendSqlMap.add, contentArray, function (error, result) {
            if (error) {
                log.w('sendDAO.js','add: function (contentArray,callback)',error.message);
                callback(500);
            }else{
                log.d('sendDAO.js','add: function (contentArray,callback)',result);
                callback(200);
            }
        });
    },
    update: function (contentArray,callback) {
        pool.query(sendSqlMap.update,contentArray, function (error, result) {
            if (error) {
                log.w('sendDAO.js','add: function (contentArray,callback)',error.message);
                callback(500);
            }else{
                log.d('sendDAO.js','add: function (contentArray,callback)',result);
                callback(200);
            }
        });
    },
    list: function (openid,callback) {
        pool.query(sendSqlMap.list,openid, function (error, result) {
            if (error) {
                log.w('sendDAO.js','list: function (openid,callback)',error.message);
            }
            log.d('sendDAO.js','list: function (openid,callback)',result);
            callback(result);
        });
    },
    delete: function (id,callback) {
        pool.query(sendSqlMap.delete, id, function (error, result) {
            if (error) {
                log.w('sendDAO.js','delete: function (id,callback)',error.message);
                callback(500);
            }else{
                log.d('sendDAO.js','delete: function (id,callback)',result);
                callback(200);
            }
        });
    }
};
