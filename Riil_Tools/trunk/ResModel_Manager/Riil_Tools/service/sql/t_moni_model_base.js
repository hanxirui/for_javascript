module.exports = {
    selectByMain: 'SELECT c_id' +
                  '      ,c_name' +
                  '  FROM t_moni_model_base ' +
                  ' WHERE c_is_main = 1',

    insert: 'INSERT INTO t_moni_model_base SET ?',

    update: 'UPDATE t_moni_model_base SET ?  WHERE c_id =?',

    selectPlugin: "SELECT DISTINCT c_plugin_id FROM t_moni_model_base WHERE c_plugin_id != '' ORDER BY c_plugin_id ASC",

    select: 'SELECT mb.c_id' +
            '      ,mb.c_name' +
            '      ,mb.c_res_type_id' +
            '      ,mb.c_desc' +
            '      ,mb.c_is_snmp' +
            '      ,mb.c_plugin_id' +
            '      ,mb.c_main_model_id' +
            '      ,mb.c_tree_node_id' +
            '      ,mb.c_is_main' +
            '      ,rt.c_name  AS resTypeName' +
            '      ,mb2.c_name AS mainResModelName' +
            '      ,mb.c_is_custom' +
            '  FROM t_moni_model_base mb LEFT JOIN t_moni_model_base mb2 ON mb.c_main_model_id = mb2.c_id LEFT JOIN t_moni_res_type rt ON mb.c_res_type_id = rt.c_id' +
            ' WHERE mb.c_id = ?',

    delete: 'DELETE FROM t_moni_model_base WHERE c_id in (?)',

    selectByIds: 'SELECT * FROM t_moni_model_base WHERE c_id in (?)',

    selectByMainModelId: 'SELECT c_id          AS modelId' +
                         '      ,NULL          AS id' +
                         '      ,NULL          AS pId' +
                         '      ,c_name        AS name' +
                         '      ,NULL          AS icon' +
                         '      ,c_is_main     AS isMain' +
                         '      ,c_res_type_id AS resTypeId' +
                         '      ,c_is_custom   AS isCustom' +
                         '  FROM t_moni_model_base' +
                         ' WHERE c_main_model_id = ?',

    selectByTypeId: 'SELECT * FROM t_moni_model_base WHERE c_res_type_id = ?',

    selectByIsMain: 'SELECT c_id           AS modelId' +
                    '      ,NULL           AS id' +
                    '      ,c_tree_node_id AS pId' +
                    '      ,c_name         AS name' +
                    '      ,NULL           AS icon' +
                    '      ,c_is_main      AS isMain' +
                    '      ,c_res_type_id  AS resTypeId' +
                    '      ,c_is_custom    AS isCustom' +
                    '  FROM t_moni_model_base' +
                    ' WHERE c_is_main = ?'
};