module.exports = {
    selectIdByGroupId: 'SELECT c_id FROM t_moni_cmds_processor where c_cmds_group_id in (?)',

    selectByGroupId: 'SELECT * FROM t_moni_cmds_processor WHERE c_cmds_group_id = ?',

    insertCopy: 'INSERT INTO t_moni_cmds_processor SET ?'
};