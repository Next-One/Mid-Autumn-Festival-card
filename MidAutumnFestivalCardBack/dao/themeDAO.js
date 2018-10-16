var mysql = require('mysql');
var mysqlConf = require('../conf/mysqlConf');
var themeSqlMap = require('./themeSqlMap');
var pool = mysql.createPool(mysqlConf.mysql);
var log = require('../debugLog');

module.exports = {
    add: function (user_theme_array,callback) {
        pool.query(themeSqlMap.add, user_theme_array, function (error, result) {
            if (error) {
                log.w('themeDAO.js','add: function (user_theme_array,callback)',error.message);
            }
            log.d('themeDAO.js','add: function (user_theme_array,callback)',result);
            callback(result.insertId);
        });
    },
    updateContent: function (contentArray,callback) {
        pool.query(themeSqlMap.updateContent,contentArray, function (error, result) {
            if (error) {
                log.w('themeDAO.js','updateContent: function (contentArray,callback)',error.message);
            }
            log.d('themeDAO.js','updateContent: function (contentArray,callback)',result);
            callback(result);
        });
    },
    list: function (openid,callback) {
        pool.query(themeSqlMap.list,openid, function (error, result) {
            if (error) {
                log.w('themeDAO.js','list: function (openid,callback)',error.message);
            }
            log.d('themeDAO.js','list: function (openid,callback)',result);
            callback(result);
        });
    },
    selectOne: function (id, callback) {
        pool.query(themeSqlMap.selectOne, id, function (error, result) {
            if (error) {
                log.w('themeDAO.js','selectOne: function (id, callback)',error.message);
            }
            log.d('themeDAO.js','selectOne: function (id, callback)',result);
            callback(result[0]);
        });
    },
    updateShare: function (id,callback) {
        pool.query(themeSqlMap.updateShare, id, function (error, result) {
            if (error) {
                log.w('themeDAO.js','updateShare: function (id,callback)',error.message);
            }
            log.d('themeDAO.js','updateShare: function (id,callback)',result);
            callback(result);
        });
    },
    delete: function (id,callback) {
        pool.query(themeSqlMap.delete, id, function (error, result) {
            if (error) {
                log.w('themeDAO.js','delete: function (id,callback)',error.message);
            }
            log.d('themeDAO.js','delete: function (id,callback)',result);
            callback(result);
        });
    },
    shareCountAll: function (openid,callback) {
        pool.query(themeSqlMap.shareCountAll, openid, function (error, result) {
            if (error) {
                log.w('themeDAO.js','shareCountAll: function (id,callback)',error.message);
            }
            log.d('themeDAO.js','shareCountAll: function (id,callback)',result);
            callback(result);
        });
    }
};
