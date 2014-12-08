module.exports = {
    selectIdByGroupId: 'SELECT c_id FROM t_moni_cmd WHERE c_cmds_group_id in (?)',

    delete: 'DELETE FROM t_moni_cmd WHERE c_id in (?)',

    selectByBindingId: '   SELECT collectCommandGroup.c_id               AS cmdGroupId' +
                       '         ,collectCommandGroup.c_metricbinding_id AS metricBindingId' +
                       '         ,collectCommandGroup.c_is_default       AS isDefault' +
                       '         ,collectCommandGroup.c_is_dynamic       AS isDynamic' +
                       '         ,collectCommand.c_id                    AS cmdId' +
                       '         ,collectCommand.c_index                 AS cmdIndex' +
                       '         ,collectCommand.c_protocol              AS cmdProtocol' +
                       '         ,collectCommand.c_cmd                   AS cmd' +
                       '     FROM t_moni_cmds_group                      AS collectCommandGroup' +
                       '         ,t_moni_cmd                             AS collectCommand' +
                       '    WHERE collectCommandGroup.c_metricbinding_id = ? AND' +
                       '          collectCommandGroup.c_id = collectCommand.c_cmds_group_id' +
                       ' ORDER BY isDefault DESC, cmdIndex ASC',

    insert: 'INSERT INTO t_moni_cmd (c_id, c_cmds_group_id, c_index, c_protocol, c_cmd)' +
            '                VALUES (:cmdId, :cmdGroupId, :cmdIndex, :cmdProtocol, :cmd)',

    update: 'UPDATE t_moni_cmd SET c_cmds_group_id = :cmdGroupId' +
            '                     ,c_protocol = :cmdProtocol' +
            '                     ,c_cmd = :cmd' +
            '                WHERE c_id = :cmdId',
    selectByGroupId: 'SELECT * FROM t_moni_cmd WHERE c_cmds_group_id = ?',

    insertCopy: 'INSERT INTO t_moni_cmd SET ?'
};