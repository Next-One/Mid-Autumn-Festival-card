module.exports= {
    add: 'insert into user set openid=?,session_key=? on duplicate key update session_key=?',
    update:'update user set nickName=?,avatarUrl=? where openid=?',
    updateSend: 'update user set send=send+1 where openid=?',
    updateReceive: 'update user set receive=receive+1 where openid=?',
    get: 'select * from user where openid=?'
};
