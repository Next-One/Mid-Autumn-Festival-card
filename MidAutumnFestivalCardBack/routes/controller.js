const express = require('express'),
    router = express.Router(),
    userDAO = require('../dao/userDAO'),
    sendDAO = require('../dao/sendDAO'),
    receiveDAO = require('../dao/receiveDAO'),
    request = require('request'),
    log = require('../debugLog');

const wxURL = 'https://api.weixin.qq.com/sns/jscode2session',
    appID = '?appid=wx973a72e46badd707',
    SECRET = '&secret=3b7732dc13a609ff18e3e429eccd7036',
    jscode = '&js_code=',
    auth = '&grant_type=authorization_code';

/* user 注册 生成openid 返回给客户端 */
router.get('/register', function (req, res) {
    var code = req.query.code;
    var url = wxURL + appID + SECRET + jscode + code + auth;
    log.d('controller', '/register', 'url=' + url);
    request(url, function (error, response, query) {
        if (!error && response.statusCode == 200) {
            console.log(response);
            console.log(query);
            var json = JSON.parse(query);
            var openid = json.openid;
            userDAO.add([openid, json.session_key, json.session_key], function (result) {
                if (result === 200) {
                    res.send({
                        openid: openid
                    });
                } else {
                    res.send({
                        err: result
                    });
                }
            });
        } else {
            log.w('controller', '/register', 'resultMap=' + resultMap);
        }
    })
});

// user表 RESTful CURD操作
router.get('/user/:openid', function (req, res) {
    var openid = req.params.openid;
    log.i('contoller.js', '/user/:openid', 'openid=' + openid);
    userDAO.get(openid, function (result) {
        res.json(result);
    });
});


router.put('/user', function (req, res) {
    var openid = req.query.openid;
    var nickName = req.query.nickName;
    var avatarUrl = req.query.avatarUrl;
    userDAO.update([nickName,avatarUrl,openid], function (result) {
        res.sendStatus(result);
    });
});

// send 表的REST

/* send post */
router.post('/send', function (req, res) {
    var send = [
        req.query.openid,
        req.query.themeid,
        req.query.friendName,
        req.query.content
    ];
    log.d('contoller.js', '/send/post', 'send=' + send);
    sendDAO.add(send, function (result) {
        res.sendStatus(result);
    });
});

/* send update */
router.put('/send', function (req, res) {
    var update = [
        req.query.friendName,
        req.query.content,
        req.query.openid,
        req.query.id
    ];
    log.d('contoller.js', '/send/update', 'updateContent=' + update);
    sendDAO.update(update, function (result) {
        res.sendStatus(result);
    });
    userDAO.updateSend(req.query.openid, function (res) {});
});

/* sendList */
router.get('/send/:openid', function (req, res) {
    var openid = req.params.openid;
    log.d('contoller.js', '/send/get', 'openid=' + openid);
    sendDAO.list(openid, function (sendList) {
        res.send(sendList);
    });
});


/* delete */
router.delete('/send/:id', function (req, res) {
    var id = req.params.id;
    log.d('controller', '/send/delete', id);
    sendDAO.delete(id, function (result) {
        res.sendStatus(result);
    });
});


// receive REST CURD操作

/* receive delete */
router.delete('/receive/:id', function (req, res) {
    var id = req.params.id;
    log.d('contoller.js', '/receive/delete', 'id=' + id);
    receiveDAO.delete(id, function (result) {
        res.sendStatus(result);
    });
});

/* receive add */
router.post('/receive', function (req, res) {
    var receiveAdd = [
        req.query.openid,
        req.query.themeid,
        req.query.friendName,
        req.query.content,
        req.query.sendid
    ];
    log.d('contoller.js', '/receive/add', 'receiveAdd=' + receiveAdd);
    receiveDAO.add(receiveAdd, function (result) {
        res.sendStatus(result);
    });
    userDAO.updateReceive(req.query.openid, function (res) {});
});



/* receiveList */
router.get('/receive/:openid', function (req, res) {
    var openid = req.params.openid;
    log.d('contoller.js', '/receive/list', 'openid=' + openid);
    receiveDAO.list(openid, function (result) {
        res.send(result)
    });
});

module.exports = router;