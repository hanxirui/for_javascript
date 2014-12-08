module.exports = {
    delete: 'DELETE FROM t_moni_cmd_filters WHERE c_cmd_id in (?)',

    selectByCmdId: 'SELECT * FROM t_moni_cmd_filters WHERE c_cmd_id = ?',

    insertCopy: 'INSERT INTO t_moni_cmd_filters SET ?'
};