var userSqlMap = {
    add: 'insert into user(openid, session_key) values(?, ?)',
    // update: 'update user set session_key=? where openid=?',
    updateCount: 'update user set login_count=login_count+1,last_time=CURRENT_TIMESTAMP() where openid=?',
    selectCount: 'select count(*) count from user where openid=?',
    sendReceive: 'select send,receive from user where openid=?',
    updateSend: 'update user set send=send+1 where openid=?',
    updateReceive: 'update user set receive=receive+1 where openid=?',
    getUserInfo: 'select avatarUrl,nickName,send,receive from user where openid=?',
    bug: 'insert into bug(info, openid) values(?, ?)',
    updateUserInfo: 'update user set avatarUrl=?,nickName=?,province=?,gender=?,city=? where openid=?'
    
};

module.exports = userSqlMap;