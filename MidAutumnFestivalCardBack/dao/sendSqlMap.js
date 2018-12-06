module.exports = {
    add: 'insert into send(openid, themeid,friendName,content) values(?, ?, ?, ?)',
    update: 'update send set friendName=?, content=?,modifyTime=CURRENT_TIMESTAMP(),shareCount=shareCount+1 where id=? and openid=?',
    list: 'select id,themeid,friendName,content,createTime, TIMESTAMPDIFF(DAY, DATE_FORMAT(createTime,"%Y%m%d"), current_date()) dateDiff from send where openid=? order by id desc',
    delete: 'delete from send where id=?'
};

