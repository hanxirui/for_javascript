module.exports = {
    selectIdByBindingId: 'SELECT c_id FROM t_moni_cmds_group WHERE c_metricbinding_id in (?)',

    delete: 'DELETE FROM t_moni_cmds_group WHERE c_id in (?)',

    insert: 'INSERT INTO t_moni_cmds_group (c_id, c_metricbinding_id, c_is_default, c_is_dynamic)' +
            '                       VALUES (:cmdGroupId, :metricBindingId, :isDefault, :isDynamic)',

    update: 'UPDATE t_moni_cmds_group SET c_metricbinding_id = :metricBindingId' +
            '                            ,c_is_default = :isDefault' +
            '                            ,c_is_dynamic = :isDynamic' +
            '                       WHERE c_id = :cmdGroupId',

    selectByBindingId: 'SELECT * FROM t_moni_cmds_group WHERE c_metricbinding_id = ?',

    insertCopy: 'INSERT INTO t_moni_cmds_group SET ?'

};