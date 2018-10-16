var mysql = require('mysql');
var mysqlConf = require('../conf/mysqlConf');
var userSqlMap = require('./userSqlMap');
var pool = mysql.createPool(mysqlConf.mysql);
var log = require('../debugLog');

module.exports = {
    add: function (user) {
        pool.query(userSqlMap.add, [user.openid, user.session_key], function (error, result) {
            if (error) {
                log.w('userDAO.js','add: function (user)',error.message);
            }
            log.d('userDAO.js','add: function (user)',result);
        });
    },
    updateCount: function (openid) {
        pool.query(userSqlMap.updateCount,openid, function (error, result) {
            if (error) {
                log.w('userDAO.js','updateCount: function (openid)',error.message);
            }
            log.d('userDAO.js','updateCount: function (openid)',result);
        });
    },
    selectCount: function (id, callback) {
        pool.query(userSqlMap.selectCount, id, function (error, result) {
            if (error) {
                log.w('userDAO.js','updateCount: function (openid)',error.message);
            }
            log.d('userDAO.js','updateCount: function (openid)',result);
            callback(result[0]);
        });
    },
    updateSend: function (id, callback) {
        pool.query(userSqlMap.updateSend, id, function (error, result) {
            if (error) {
                log.w('userDAO.js','updateSend: function (openid)',error.message);
            }
            log.d('userDAO.js','updateSend: function (openid)',result);
            callback(result);
        });
    },
    updateReceive: function (id, callback) {
        pool.query(userSqlMap.updateReceive, id, function (error, result) {
            if (error) {
                log.w('userDAO.js','updateReceive: function (openid)',error.message);
            }
            log.d('userDAO.js','updateReceive: function (openid)',result);
            callback(result);
        });
    },
    sendReceive: function (id, callback) {
        pool.query(userSqlMap.sendReceive, id, function (error, result) {
            if (error) {
                log.w('userDAO.js','sendReceive: function (openid)',error.message);
            }
            log.d('userDAO.js','sendReceive: function (openid)',result);
            callback(result[0]);
        });
    },
    updateUserInfo: function (id, callback) {
        pool.query(userSqlMap.updateUserInfo, id, function (error, result) {
            if (error) {
                log.w('userDAO.js','updateUserInfo: function (openid)',error.message);
            }
            log.d('userDAO.js','updateUserInfo: function (openid)',result);
            callback(result);
        });
    },
    getUserInfo: function (id, callback) {
        pool.query(userSqlMap.getUserInfo, id, function (error, result) {
            if (error) {
                log.w('userDAO.js','getUserInfo: function (openid)',error.message);
            }
            log.d('userDAO.js','getUserInfo: function (openid)',result);
            callback(result[0]);
        });
    },
    bug: function (id, callback) {
        pool.query(userSqlMap.bug, id, function (error, result) {
            if (error) {
                log.w('userDAO.js','bug: function (openid)',error.message);
            }
            log.d('userDAO.js','bug: function (openid)',result);
            callback(result);
        });
    }
};