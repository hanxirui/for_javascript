module.exports = {
    deleteByGroupId: 'DELETE FROM t_moni_cmds_support WHERE c_cmds_group_id in (?)',

    selectByBindingId: '   SELECT collectCommandGroup.c_id                AS cmdGroupId' +
                       '         ,collectCommandGroup.c_metricbinding_id  AS metricBindingId' +
                       '         ,collectCommandGroup.c_is_default        AS isDefault' +
                       '         ,collectCommandGroup.c_is_dynamic        AS isDynamic' +
                       '         ,t_moni_cmds_support.c_id                AS cmdId' +
                       '         ,t_moni_cmds_support.c_version           AS cmdVersion' +
                       '         ,t_moni_cmds_support.c_rel               AS rel' +
                       '     FROM t_moni_cmds_group                       AS collectCommandGroup' +
                       '         ,t_moni_cmds_support' +
                       '    WHERE collectCommandGroup.c_metricbinding_id = ? AND' +
                       '          collectCommandGroup.c_id = t_moni_cmds_support.c_cmds_group_id' +
                       ' ORDER BY cmdVersion ASC',

    update: 'UPDATE t_moni_cmds_support SET c_version = :cmdVersion' +
            '                              ,c_rel = :rel' +
            '                         WHERE c_id=:cmdId',

    insert: 'INSERT INTO t_moni_cmds_support (c_id, c_cmds_group_id, c_version, c_rel)' +
            '                         VALUES (:cmdId, :cmdGroupId, :cmdVersion, :rel)',

    selectByGroupId: 'SELECT t_moni_cmds_support.c_id AS cmdId' +
                     '  FROM t_moni_cmds_support' +
                     ' WHERE t_moni_cmds_support.c_cmds_group_id = ?',

    delete: 'DELETE FROM t_moni_cmds_support WHERE c_id in (?)',

    selectByGroupIdToCopy: 'SELECT * FROM t_moni_cmds_support WHERE c_cmds_group_id = ?',

    insertCopy: 'INSERT INTO t_moni_cmds_support SET ?'
};