module.exports = {
    selectAll: '   SELECT metric.c_id                 AS metricId' +
               '         ,metric.c_name               AS metricName' +
               '         ,metric.c_unit               AS metricUnit' +
               '         ,metric.c_data_type          AS dataType' +
               '         ,metric.c_metric_type        AS metricType' +
               '         ,metric.c_desc               AS metricDesc' +
               '         ,metric.c_is_custom          AS isCustom' +
               '         ,metric.c_user_id            AS metricUser' +
               '         ,grouprel.c_metric_group_id  AS groupRelId' +
               '         ,grouprel.c_metric_id        AS metricId' +
               '         ,GROUP_CONCAT(mgroup.c_name) AS groupName' +
               '         ,mgroup.c_id                 AS groupId' +
               '     FROM t_moni_metric_base          AS metric' +
               '         ,t_moni_metric_group_rel     AS grouprel' +
               '         ,t_moni_metric_group         AS mgroup' +
               '    WHERE metric.c_id = grouprel.c_metric_id AND' +
               '          mgroup.c_id = grouprel.c_metric_group_id ' +
               ' GROUP BY metric.c_id',

    insert: 'INSERT INTO t_moni_metric_base (c_id, c_name, c_desc, c_metric_type, c_unit, c_data_type, c_is_custom, c_user_id)' +
            '                        VALUES (:metric_id, :metric_name, :metric_desc, :metric_type, :metric_unit, :metric_datatype, :metric_iscustom, :userid)',

    delete: 'DELETE FROM t_moni_metric_base WHERE c_id in (?)',

    select: 'SELECT metric.c_id                 AS metricId' +
            '      ,metric.c_name               AS metricName' +
            '      ,metric.c_unit               AS metricUnit' +
            '      ,metric.c_data_type          AS dataType' +
            '      ,metric.c_metric_type        AS metricType' +
            '      ,metric.c_desc               AS metricDesc' +
            '      ,metric.c_is_custom          AS isCustom' +
            '      ,metric.c_user_id            AS metricUser' +
            '      ,grouprel.c_metric_group_id  AS groupRelId' +
            '      ,grouprel.c_metric_id        AS metricId' +
            '      ,GROUP_CONCAT(mgroup.c_name) AS groupName' +
            '      ,GROUP_CONCAT(mgroup.c_id)   AS groupId' +
            '  FROM t_moni_metric_base          AS metric' +
            '      ,t_moni_metric_group_rel     AS grouprel' +
            '      ,t_moni_metric_group         AS mgroup' +
            ' WHERE metric.c_id = grouprel.c_metric_id AND' +
            '       mgroup.c_id = grouprel.c_metric_group_id AND' +
            '       metric.c_id = ?',

    selectMetricType: 'SELECT c_metric_type FROM t_moni_metric_base GROUP BY c_metric_type',

    update: 'UPDATE t_moni_metric_base SET c_name = :metric_name' +
            '                             ,c_desc = :metric_desc' +
            '                             ,c_metric_type = :metric_type' +
            '                             ,c_unit = :metric_unit' +
            '                             ,c_data_type = :metric_datatype' +
            '                             ,c_is_custom = :metric_iscustom' +
            '                             ,c_user_id = :userid' +
            '                        WHERE c_id = :metric_id',

    selectByCondition: 'SELECT * FROM ( SELECT metric.c_id                 AS metricId' +
                       '                      ,metric.c_name               AS metricName' +
                       '                      ,metric.c_unit               AS metricUnit' +
                       '                      ,metric.c_data_type          AS dataType' +
                       '                      ,metric.c_metric_type        AS metricType' +
                       '                      ,metric.c_desc               AS metricDesc' +
                       '                      ,metric.c_is_custom          AS isCustom' +
                       '                      ,metric.c_user_id            AS metricUser' +
                       '                      ,grouprel.c_metric_group_id  AS groupRelId' +
                       '                      ,GROUP_CONCAT(mgroup.c_name) AS groupName' +
                       '                      ,GROUP_CONCAT(mgroup.c_id)   AS groupId' +
                       '                  FROM t_moni_metric_base          AS metric' +
                       '                      ,t_moni_metric_group_rel     AS grouprel' +
                       '                      ,t_moni_metric_group         AS mgroup' +
                       '                 WHERE metric.c_id = grouprel.c_metric_id AND' +
                       '                       mgroup.c_id = grouprel.c_metric_group_id' +
                       '              GROUP BY metric.c_id) temp' +
                       ' WHERE 1 = 1',

    selectByModelId: 'SELECT metricBase.c_id                   AS metricId' +
                     '         ,metricBinding.c_id             AS metricBindingId' +
                     '         ,metricBase.c_name              AS metricName' +
                     '         ,metricBase.c_unit              AS metricUnit' +
                     '         ,metricBinding.c_is_initvalue   AS isInitValue' +
                     '         ,metricBinding.c_is_instance    AS isInstance' +
                     '         ,metricBinding.c_is_displayname AS isDisplayName' +
                     '         ,metricBase.c_is_custom         AS isCustom' +
                     '         ,GROUP_CONCAT(DISTINCT t_moni_cmd.c_protocol ORDER BY t_moni_cmd.c_protocol separator ",") AS coltProtocol ' +
                     '     FROM t_moni_model_metric_rel        AS modelMetricRel' +
                     '         ,t_moni_metric_base             AS metricBase' +
                     '         ,t_moni_metricbinding           AS metricBinding' +
                     '         ,t_moni_cmds_group              AS commandGroup' +
                     '         ,t_moni_cmd' +
                     '    WHERE modelMetricRel.c_model_id = ? AND' +
                     '          metricBase.c_id = modelMetricRel.c_metric_id AND' +
                     '          metricBinding.c_metric_id = modelMetricRel.c_metric_id AND' +
                     '          metricBinding.c_model_id = modelMetricRel.c_model_id AND' +
                     '          commandGroup.c_metricbinding_id = metricBinding.c_id AND' +
                     '          t_moni_cmd.c_cmds_group_id = commandGroup.c_id ' +
                     ' GROUP BY metricId ' +
                      'ORDER BY metricId ASC',

    selectNotByModelId:  'SELECT metricBase.c_id          AS metricId' +
                         '      ,metricBase.c_name        AS metricName' +
                         '      ,metricBase.c_desc        AS metricDescr' +
                         '      ,metricBase.c_metric_type AS metricType' +
                         '      ,metricBase.c_unit        AS metricUnit' +
                         '      ,metricBase.c_data_type   AS metricDataType ' +
                         '  FROM t_moni_metric_base       AS metricBase' +
                         ' WHERE metricBase.c_id NOT IN (SELECT c_metric_id FROM t_moni_model_metric_rel WHERE c_model_id = ?)',

    selectById: 'SELECT modelMetricRel.c_metric_id       AS metricId' +
                '      ,modelMetricRel.c_res_type_id     AS resTypeId' +
                '      ,metricBase.c_name                AS metricName' +
                '      ,metricBase.c_desc                AS metricDescr' +
                '      ,metricBase.c_metric_type         AS metricType' +
                '      ,metricBase.c_unit                AS metricUnit' +
                '      ,metricBase.c_data_type           AS metricDataType' +
                '      ,metricBase.c_is_custom           AS isCustom' +
                '      ,metricBindle.c_is_instance       AS isInstance' +
                '      ,metricBindle.c_is_initvalue      AS isInitValue' +
                '      ,metricBindle.c_is_displayname    AS isDisplayName' +
                '      ,modelMetricRel.c_model_id        AS modelId' +
                '      ,metricBindle.c_id 			     AS metricBindingId' +
                '      ,metricBindle.c_className		 AS className' +
                '      ,metricBindle.c_method            AS method' +
                '  FROM t_moni_model_metric_rel          AS modelMetricRel' +
                '      ,t_moni_metric_base               AS metricBase' +
                '      ,t_moni_metricbinding             AS metricBindle' +
                ' WHERE modelMetricRel.c_model_id = ? AND' +
                '       modelMetricRel.c_metric_id = ? AND' +
                '       metricBase.c_id = modelMetricRel.c_metric_id AND' +
                '       metricBindle.c_metric_id = modelMetricRel.c_metric_id AND' +
                '       metricBindle.c_model_id = modelMetricRel.c_model_id'
};