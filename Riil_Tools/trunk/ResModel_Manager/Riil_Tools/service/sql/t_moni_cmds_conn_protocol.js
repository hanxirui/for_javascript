module.exports = {
    delete: 'DELETE FROM t_moni_cmds_conn_protocol WHERE c_cmds_group_id in (?)',

    selectByGroupId: 'SELECT * FROM t_moni_cmds_conn_protocol WHERE c_cmds_group_id = ?',

    insertCopy: 'INSERT INTO t_moni_cmds_conn_protocol SET ?'
};