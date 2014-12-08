module.exports = {
    delete: 'DELETE FROM t_moni_cmd_properties WHERE c_cmd_id in (?)',

    selectByCmdId: 'SELECT c_name   AS propName' +
                   '      ,c_value  AS propValue' +
                   '      ,c_cmd_id AS cmdId' +
                   '  FROM t_moni_cmd_properties' +
                   ' WHERE c_cmd_id = ?',

    update: 'UPDATE t_moni_cmd_properties SET c_name = :propName' +
            '                                ,c_value = :propValue' +
            '                           WHERE c_cmd_id = :cmdId',

    insert: 'INSERT INTO t_moni_cmd_properties(c_cmd_id, c_name, c_value) VALUES(:cmdId,:propName,:propValue)',

    selectByCmdIdToCopy: 'SELECT * FROM t_moni_cmd_properties WHERE c_cmd_id = ?',

    insertCopy: 'INSERT INTO t_moni_cmd_properties SET ?'
};