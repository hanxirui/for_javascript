module.exports = {
    delete: 'DELETE FROM t_moni_cmds_process_para WHERE c_cmds_processor_id in (?)',

    selectByProcessorId: 'SELECT * FROM t_moni_cmds_process_para WHERE c_cmds_processor_id = ?',

    insertCopy: 'INSERT INTO t_moni_cmds_process_para SET ?'
};