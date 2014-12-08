module.exports = {
    select: 'SELECT v.c_id' +
            '      ,v.c_vendor_id' +
            '      ,v.c_vendor_name' +
            '      ,c_vendor_oid' +
            '      ,c_dev_type' +
            '      ,c_dev_name' +
            '      ,c_model_type' +
            '      ,c_series' +
            '      ,c_model_number' +
            '      ,b.c_name' +
            '  FROM t_resmodel_vendor v LEFT JOIN t_moni_model_base b ON v.c_model_type = b.c_id' +
            ' WHERE v.c_vendor_oid = ?',

    update: 'UPDATE t_resmodel_vendor SET c_vendor_id = :manufID' +
            '                            ,c_vendor_name = :manufName' +
            '                            ,c_vendor_oid = :sysoid' +
            '                            ,c_dev_type = :deviceId' +
            '                            ,c_model_type = :modelID' +
            '                            ,c_series = :series' +
            '                            ,c_model_number = :number' +
            '                            ,c_dev_name = :deviceName' +
            '                       WHERE c_id = :cid',
    selectAll: 'SELECT v.c_id' +
               '      ,v.c_vendor_id' +
               '      ,v.c_vendor_name' +
               '      ,c_vendor_oid' +
               '      ,c_dev_type' +
               '      ,c_dev_name' +
               '      ,c_model_type' +
               '      ,c_series' +
               '      ,c_model_number' +
               '      ,b.c_name' +
               '      ,flag' +
               '      ,c_operator' +
               ' FROM ( SELECT c_id' +
               '              ,c_vendor_id' +
               '              ,c_vendor_name' +
               '              ,c_vendor_oid' +
               '              ,c_dev_type' +
               '              ,c_dev_name' +
               '              ,c_model_type' +
               '              ,c_series' +
               '              ,c_model_number' +
               '              ,"1"            AS flag' +
               '              ,c_operator ' +
               '          FROM t_resmodel_vendor' +
               '        UNION ALL' +
               '        SELECT c_id' +
               '              ,c_vendor_id' +
               '              ,c_vendor_name' +
               '              ,""             AS c_vendor_oid' +
               '              ,""             AS c_dev_type' +
               '              ,""             AS c_dev_name' +
               '              ,""             AS c_model_type' +
               '              ,c_series' +
               '              ,c_model_number' +
               '              ,"-1"           AS flag' +
               '              ,""             AS c_operator' +
               '          FROM t_vendor_model) v' +
               ' LEFT JOIN t_moni_model_base b ON v.c_model_type = b.c_id',

    insert: 'INSERT INTO t_resmodel_vendor (c_id, c_vendor_id, c_vendor_name, c_vendor_oid, c_dev_type, c_model_type, c_series, c_model_number, c_dev_name, c_operator)' +
            '                       VALUES (:id, :manufID, :manufName, :sysoid, :deviceId, :modelID, :series, :number, :deviceName, :operator)',

    delete: 'DELETE FROM t_resmodel_vendor WHERE c_id in (?)',

    selectByCondition: 'SELECT c_id' +
                         '      ,c_vendor_oid' +
                         '      ,c_model_number' +
                         ' FROM ( SELECT c_id' +
                         '              ,c_vendor_oid' +
                         '              ,c_model_number' +
                         '          FROM t_resmodel_vendor' +
                         '     UNION ALL' +
                         '        SELECT c_id' +
                         '              ,"" AS c_vendor_oid' +
                         '              ,c_model_number' +
                         '          FROM t_vendor_model ) temp ' +
                         'WHERE 1 = 1 '
};