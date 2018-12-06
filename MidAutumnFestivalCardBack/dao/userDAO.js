var mysql = require('mysql');
var mysqlConf = require('../conf/mysqlConf');
var userSqlMap = require('./userSqlMap');
var pool = mysql.createPool(mysqlConf.mysql);
var log = require('../debugLog');

module.exports = {
    add: function (user, callback) {
        pool.query(userSqlMap.add, user, function (error, result) {
            if (error) {
                log.w('userDAO.js', 'add: function (user)', error.message);
                callback(error.message);
            } else {
                callback(200);
            }
        });
    },
    get: function (openid, callback) {
        pool.query(userSqlMap.get, openid, function (error, result) {
            if (error) {
                log.w('userDAO.js', 'get: function (openid)', error.message);
                callback({
                    error: 500,
                    msg: error.message
                });
            } else {
                log.d('userDAO.js', 'get: function (openid)', result);
                callback(result[0]);
            }
        });
    },
    update: function (userinfo, callback) {
        pool.query(userSqlMap.update, userinfo, function (error, result) {
            if (error) {
                log.w('userDAO.js', 'userinfo: function (userinfo)', error.message);
                callback(500);
            } else {
                log.d('userDAO.js', 'userinfo: function (userinfo)', result);
                callback(200);
            }

        });
    },
    updateSend: function (openid, callback) {
        pool.query(userSqlMap.updateSend, openid, function (error, result) {
            if (error) {
                log.w('userDAO.js', 'openid: function (openid)', error.message);
                callback(500);
            } else {
                log.d('userDAO.js', 'openid: function (openid)', result);
                callback(200);
            }

        });
    },
    updateReceive: function (openid, callback) {
        pool.query(userSqlMap.updateReceive, openid, function (error, result) {
            if (error) {
                log.w('userDAO.js', 'updateReceive: function (openid)', error.message);
                callback(500);
            } else {
                log.d('userDAO.js', 'updateReceive: function (openid)', result);
                callback(200);
            }
        });
    }
};