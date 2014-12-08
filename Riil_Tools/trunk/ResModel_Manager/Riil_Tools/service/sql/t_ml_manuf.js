module.exports = {
    select: 'SELECT c_manuf_id   AS c_id' +
            '      ,c_manuf_id' +
            '      ,c_manuf_name' +
            '      ,c_photoid' +
            '      ,c_manuf_icon' +
            '      ,c_operator' +
            '      ,"1"          AS flag' +
            '  FROM t_ml_manuf' +
            ' UNION ALL ' +
            'SELECT ""           AS c_id' +
            '      ,c_id         AS c_manuf_id' +
            '      ,c_name       AS c_manuf_name' +
            '      ,""           AS c_photoid' +
            '      ,""           AS c_manuf_icon' +
            '      ,"系统预置"   AS c_operator' +
            '      ,"-1"         AS flag' +
            '  FROM t_moni_vendor',

    insert: 'INSERT INTO t_ml_manuf (c_manuf_id, c_manuf_name, c_photoid, c_manuf_icon, c_operator) ' +
            '                VALUES (:cManufId, :cManufName, :cManufPhoto, :cManufIcon, :cOperator)',

    selectByManufId: 'SELECT c_manuf_id' +
                     '      ,c_manuf_name' +
                     '      ,c_photoid' +
                     '      ,c_manuf_icon' +
                     '      ,c_operator' +
                     '  FROM t_ml_manuf' +
                     ' WHERE c_manuf_id = ?',

    selectIdByManufIcon: 'SELECT temp.c_manuf_id ' +
                         '  FROM (' +
                         'SELECT c_manuf_id' +
                         '      ,c_manuf_icon' +
                         '  FROM t_ml_manuf' +
                         ' UNION ALL ' +
                         'SELECT c_id          AS c_manuf_id' +
                         '      ,c_vendor_icon AS c_manuf_icon' +
                         '  FROM t_moni_vendor) temp ' +
                         ' WHERE temp.c_manuf_icon = ?',

    selectIconByManufId: 'SELECT temp.c_manuf_icon ' +
                         '  FROM (' +
                         'SELECT c_manuf_id' +
                         '      ,c_manuf_icon ' +
                         '  FROM t_ml_manuf' +
                         ' UNION ALL ' +
                         'SELECT c_id          AS c_manuf_id' +
                         '      ,c_vendor_icon AS c_manuf_icon' +
                         '  FROM t_moni_vendor) temp' +
                         ' WHERE temp.c_manuf_id = ?',

    update: 'UPDATE1 t_ml_manuf SET c_manuf_name = :cManufName' +
            '                     ,c_photoid = :cManufPhoto' +
            '                     ,c_manuf_icon = :cManufIcon' +
            '                WHERE c_manuf_id = :cManufId',

    delete: 'DELETE FROM t_ml_manuf WHERE c_manuf_id IN (?)'
};