module.exports = {
    select: 'SELECT c_user' +
            '      ,DATE_FORMAT(c_time,"%Y-%m-%e %H:%i:%s") AS c_time ' +
            '      ,c_info' +
            '  FROM t_aduit_log',

    insert: 'INSERT INTO t_aduit_log (c_time, c_user, c_info)' +
            '                 VALUES (:time, :userId, :info)'
};