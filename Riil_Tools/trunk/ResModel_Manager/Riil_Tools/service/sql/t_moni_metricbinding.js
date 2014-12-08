module.exports = {
    selectIdByModelIdAndMetricId: 'SELECT c_id FROM t_moni_metricbinding WHERE c_model_id = ? AND c_metric_id in (?)',

    delete: 'DELETE FROM t_moni_metricbinding WHERE c_id in (?)',

    insert: 'INSERT INTO t_moni_metricbinding (c_id, c_model_id, c_metric_id, c_is_instance, c_is_initvalue, c_is_displayname)' +
            '                          VALUES (:id, :modelId, :metricId, :isInstance, :isInitvalue, :isDisplayname)',

    update: 'UPDATE t_moni_metricbinding SET c_is_instance = :isInstance' +
            '                               ,c_is_initvalue = :isInitvalue' +
            '                               ,c_is_displayname = :isDisplayname' +
            '                          WHERE c_model_id = :modelId AND' +
            '                                c_metric_id = :metricId',

    selectByModelId: 'SELECT * FROM t_moni_metricbinding WHERE c_model_id = ?',

    insertCopy: 'INSERT INTO t_moni_metricbinding SET ?'
};