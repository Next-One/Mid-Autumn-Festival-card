module.exports = {
    add: 'insert into receive(openid, themeid,friendName,content,sendid) values(?, ?, ?, ?,?)',
    list: "SELECT sendid, ur.id, ur.themeid, ur.friendName, ur.content , ur.createTime , TIMESTAMPDIFF(DAY, DATE_FORMAT(ur.createTime, '%Y%m%d'), current_date()) AS dateDiff , ( SELECT u.nickName FROM user u WHERE u.openid = ur.sendid ) AS nickName , ( SELECT u.avatarUrl FROM user u WHERE u.openid = ur.sendid ) AS avatarUrl FROM receive ur WHERE openid = ? ORDER BY id DESC",
    delete: 'delete from receive where id=?'
};