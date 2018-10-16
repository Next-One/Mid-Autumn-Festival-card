var themeSqlMap = {
    add: 'insert into user_theme(openid, themeid,friendName,content) values(?, ?, ?, ?)',
    updateContent: 'update user_theme set friendName=?, content=?,modifyTime=CURRENT_TIMESTAMP(),shareCount=shareCount+1 where id=? and openid=?',
    list: 'select id,themeid,friendName,content,createTime, TIMESTAMPDIFF(DAY, DATE_FORMAT(createTime,"%Y%m%d"), current_date()) dateDiff from user_theme where openid=? order by id desc',
    delete: 'delete from user_theme where id=? and openid=?',
    shareCountAll: 'select shareCount,TIMESTAMPDIFF(DAY, DATE_FORMAT(modifyTime,"%Y%m%d"), current_date()) dateDiff from user_theme where openid=?'

    // selectOne:'select themeid,friendName,content,createTime from user_theme where id=?'
};

module.exports = themeSqlMap;