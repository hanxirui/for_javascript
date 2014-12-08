module.exports = {
    selectAll: 'SELECT c_id        AS groupId' +
               '      ,c_name      AS groupName' +
               '      ,c_desc      AS groupDesc' +
               '      ,c_is_custom AS isCustom' +
               '  FROM t_moni_metric_group',

    insert: 'INSERT INTO t_moni_metric_group (c_id, c_name, c_desc)' +
            '                         VALUES (:groupId, :groupName, :groupDesc)',

    update: 'UPDATE t_moni_metric_group SET c_id = :groupId' +
            '                              ,c_name = :groupName' +
            '                              ,c_desc = :groupDesc' +
            '                         WHERE c_id = :groupId',

    delete: 'DELETE FROM t_moni_metric_group WHERE c_id in (?)',

    select: 'SELECT c_id   AS groupId' +
            '      ,c_name AS groupName' +
            '      ,c_desc AS groupDesc' +
            '  FROM t_moni_metric_group' +
            ' WHERE c_id = ?'
};