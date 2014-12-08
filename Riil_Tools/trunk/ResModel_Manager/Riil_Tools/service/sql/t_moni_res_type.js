module.exports = {
    updateIcon: 'UPDATE t_moni_res_type SET c_icon = :cManufIcon WHERE c_vendor_id = :cManufId',

    selectAll: 'SELECT c_id           AS modelId' +
               '      ,c_tree_node_id AS id' +
               '      ,c_tree_node_id AS pId' +
               '      ,c_name         AS name' +
               '      ,c_icon         AS icon' +
               '      ,NULL           AS isMain' +
               '      ,NULL           AS resTypeId' +
               '      ,c_is_custom    AS isCustom' +
               '  FROM t_moni_res_type',

    select: 'SELECT * FROM t_moni_res_type WHERE c_id = ?',

    insert: 'INSERT INTO t_moni_res_type SET ?',

    update: 'UPDATE t_moni_res_type SET ?  WHERE c_id = ?',

    delete: 'DELETE FROM t_moni_res_type WHERE c_id in (?)',

    selectByParentId: 'SELECT * FROM t_moni_res_type WHERE c_parent_id = ?'
};