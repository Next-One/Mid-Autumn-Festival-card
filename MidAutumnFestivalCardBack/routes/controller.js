const express = require('express'),
    router = express.Router(),
    userDAO = require('../dao/userDAO'),
    themeDAO = require('../dao/themeDAO'),
    receiveDAO = require('../dao/receiveDAO'),
    common = require('../util/common'),
    request = require('request'),
    log = require('../debugLog');

const wxURL = 'https://api.weixin.qq.com/sns/jscode2session',
    appID = '?appid=wx973a72e46badd707',
    SECRET = '&secret=735ba1b5c50cea3338ecdcbfe04ebf05',
    jscode = '&js_code=',
    auth = '&grant_type=authorization_code',
    client = '&grant_type=client_credential',
    // https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token=
    wxcode = 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=',
    access_url = 'https://api.weixin.qq.com/cgi-bin/token';


/* user login */
router.get('/code', function (req, res) {

    const url = access_url + appID + SECRET + client;
    log.i('contoller.js', '/code', 'access_url=' + url);
    try {
        request(url, function (error, response, body) {
            log.d('contoller.js', '/code', 'body=' + body);
            if (!error && response.statusCode == 200) {
                var json = JSON.parse(body),
                    codeUrl = wxcode + json.access_token;
                log.i('contoller.js', '/codeUrl', 'url=' + codeUrl);
                common.httpPost(codeUrl, {
                    page: 'page/index/index',
                    scene: 1
                });
            }
        });
        request.post(url)
    } catch (error) {
        log.w('contoller.js', '/login', 'access to ||' + url + '||failed and error=' + error);
    }
});

/* user login */
router.get('/login', function (req, res) {

    var param = req.query || req.params,
        code = param.code,
        url = wxURL + appID + SECRET + jscode + code + auth;
    log.i('contoller.js', '/login', 'url=' + url);
    try {
        request(url, function (error, response, body) {
            log.d('contoller.js', '/login', 'body=' + body);
            if (!error && response.statusCode == 200) {
                var json = JSON.parse(body),
                    openid = json.openid;
                if (openid) {
                    userDAO.selectCount(openid, function (resultMap) {
                        log.d('contoller.js', 'selectCount(openid, function (resultMap)', 'resultMap=' + resultMap);
                        if (!resultMap || resultMap.count > 0) {
                            userDAO.getUserInfo(openid, function (result) {
                                res.json({
                                    openid: openid,
                                    avatarUrl: result.avatarUrl,
                                    nickName: result.nickName,
                                    send:result.send,
                                    receive:result.receive
                                });
                            });
                            // userDAO.updateCount(openid);
                        } else {
                            res.send({
                                openid: openid,
                                avatarUrl: "/img/theme/cardmin5.png",
                                nickName: "游客",
                                send:0,
                                receive:0
                            });
                            userDAO.add(json);
                        }
                    });

                } else {
                    res.json(json);
                }
            }
        })
    } catch (error) {
        log.w('contoller.js', '/login', 'access to ||' + url + '||failed and error=' + error);
    }
});



/* sendReceive */
router.get('/user/sendReceive', function (req, res) {
    var openid = req.query.openid;
    log.i('contoller.js', '/user/sendReceive', 'openid=' + openid);
    userDAO.sendReceive(openid, function (result) {
        res.json(result);
    });
});


/*update user_info */
router.get('/user/updateInfo', function (req, res) {
    var user_info = [
        req.query.avatarUrl,
        req.query.nickName,
        req.query.province,
        req.query.gender,
        req.query.city,
        req.query.openid
    ];
    log.i('contoller.js', '/user/info', 'user_info=' + user_info);
    userDAO.updateUserInfo(user_info, function (result) {
        res.json("0");
    });
});

/* get user_info */
router.get('/user/getInfo', function (req, res) {
    var openid = req.query.openid;
    log.i('contoller.js', '/user/getinfo', 'openid=' + openid);
    userDAO.getUserInfo(openid, function (result) {
        result.openid = openid;
        res.json(result);
    });
});


/* theme add */
router.get('/theme/add', function (req, res) {
    var user_theme = [
        req.query.openid,
        req.query.themeid,
        req.query.friendName,
        req.query.content
    ];
    log.i('contoller.js', '/theme/add', 'user_theme=' + user_theme);
    themeDAO.add(user_theme, function (insertId) {
        res.json({
            id: insertId
        });
    });
    userDAO.updateSend(req.query.openid, function (res) {});
});

/* theme updateContent */
router.get('/theme/updateContent', function (req, res) {
    var update = [
        req.query.friendName,
        req.query.content,
        req.query.openid,
        req.query.id
    ];
    log.i('contoller.js', '/theme/updateContent', 'updateContent=' + update);
    themeDAO.updateContent(update, function (updateTheme) {
        res.json("0");
    });
    userDAO.updateSend(req.query.openid, function (res) {});
});

/* themeList */
router.get('/theme/list', function (req, res) {
    var openid = req.query.openid;
    log.i('contoller.js', '/theme/list', 'openid=' + openid);
    themeDAO.list(openid, function (themeList) {
        if (!themeList || themeList.length == 0) {
            res.json('0');
        } else {
            res.json(themeList);
        }
    });
});


/* delete */
router.get('/theme/delete', function (req, res) {
    var param = req.query || req.params,
        id = param.id,
        openid = param.openid;
    log.d('contoller.js', '/theme/delete', 'id=' + id + ';openid=' + openid);
    themeDAO.delete([id, openid], function (result) {
        res.json('0');
    });
});



/* shareCountAll */
router.get('/theme/count', function (req, res) {
    var param = req.query || req.params,
        openid = param.openid;
    log.d('contoller.js', '/theme/shareCountAll', 'openid=' + openid);
    themeDAO.shareCountAll(openid, function (result) {
        log.d('contoller.js', '/theme/shareCountAll', 'result=' + result);
        var count = 0,
            i;
        for (i = 0; i < result.length; i++) {
            count += result[i].shareCount;
        }
        res.json({
            count: count
        });
    });
});


/* receive delete */
router.get('/receive/delete', function (req, res) {
    var param = req.query || req.params,
        id = param.id,
        openid = param.openid;
    log.d('contoller.js', '/receive/delete', 'id=' + id + ';openid=' + openid);
    receiveDAO.delete([id, openid], function (result) {
        res.json('0');
    });
});

/* receive add */
router.get('/receive/add', function (req, res) {
    var receiveAdd = [
        req.query.openid,
        req.query.themeid,
        req.query.friendName,
        req.query.content,
        req.query.sendid
    ];
    log.i('contoller.js', '/receive/add', 'receiveAdd=' + receiveAdd);
    receiveDAO.add(receiveAdd, function (insertId) {
        res.json({
            id: insertId
        });
    });
    userDAO.updateReceive(req.query.openid, function (res) {});
});



/* receiveList */
router.get('/receive/list', function (req, res) {
    var openid = req.query.openid;
    log.i('contoller.js', '/receive/list', 'openid=' + openid);
    receiveDAO.list(openid, function (receiveList) {
        if (!receiveList || receiveList.length == 0) {
            res.json('0');
        } else {
            res.json(receiveList);
        }
    });
});


/* receive count */
router.get('/receive/count', function (req, res) {
    var openid = req.query.openid;
    receiveDAO.receiveCount(openid, function (count) {
        log.d('contoller.js', '/receive/count', 'count=' + count);
        res.json(count[0])
    });
});


/* /bug/add */
router.get('/bug/add', function (req, res) {
    var desc = [req.query.desc, req.query.openid];
    userDAO.bug(desc, function (count) {
        res.json('0')
    });
});


module.exports = router;