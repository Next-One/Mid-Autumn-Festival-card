var receiveSqlMap = {
    add: 'insert into user_receive(openid, themeid,friendName,content,sendid) values(?, ?, ?, ?,?)',
    list: "SELECT sendid, ur.id, ur.themeid, ur.friendName, ur.content , ur.createTime , TIMESTAMPDIFF(DAY, DATE_FORMAT(ur.createTime, '%Y%m%d'), current_date()) AS dateDiff , ( SELECT u.nickName FROM user u WHERE u.openid = ur.sendid ) AS nickName , ( SELECT u.avatarUrl FROM user u WHERE u.openid = ur.sendid ) AS avatarUrl FROM user_receive ur WHERE openid = ? ORDER BY id DESC",
    delete: 'delete from user_receive where id=? and openid=?',
    receiveCount: 'select count(*) count from user_receive where openid=?'
};

module.exports = receiveSqlMap;