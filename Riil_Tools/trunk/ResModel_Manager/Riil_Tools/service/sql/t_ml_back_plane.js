module.exports = {
    count: 'SELECT COUNT(c_id) AS count' +
           '  FROM t_ml_back_plane' +
           ' WHERE c_project_name = ?',

    insert: 'INSERT INTO t_ml_back_plane (c_backplane_name, c_project_name, c_ventor, c_equipment_type, c_apply_date, c_operator_id, c_desc) ' +
            '                     VALUES (?, ?, ?, ?, ?, ?, ?)',

    select: 'SELECT c_id' +
            '      ,c_backplane_name' +
            '      ,c_project_name' +
            '      ,c_ventor' +
            '      ,c_equipment_type' +
            '      ,DATE_FORMAT(c_apply_date, "%Y-%m-%e") AS c_apply_date' +
            '      ,c_operator_id' +
            '      ,c_desc' +
            '  FROM t_ml_back_plane',

    selectById: 'SELECT c_id' +
                '      ,c_backplane_name' +
                '      ,c_project_name' +
                '      ,c_ventor' +
                '      ,c_equipment_type' +
                '      ,DATE_FORMAT(c_apply_date, "%Y-%m-%e") AS c_apply_date' +
                '      ,c_operator_id' +
                '      ,c_desc' +
                '  FROM t_ml_back_plane' +
                ' WHERE c_id = ?',

    update: 'UPDATE t_ml_back_plane SET c_backplane_name = :bpName' +
            '                          ,c_project_name = :projectName' +
            '                          ,c_ventor = :ventor' +
            '                          ,c_equipment_type = :equipment' +
            '                          ,c_apply_date = :applyDate' +
            '                          ,c_operator_id = :operator' +
            '                          ,c_desc=:desc' +
            '                     WHERE c_id = :bpId',

    delete: 'DELETE FROM t_ml_back_plane WHERE c_id IN (?)'
};