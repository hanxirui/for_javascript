module.exports = {
    deleteByModelIdAndMetricId: 'DELETE FROM t_moni_model_metric_rel WHERE c_model_id = ? AND c_metric_id in (?)',

    insert: 'INSERT INTO t_moni_model_metric_rel (c_model_id, c_metric_id, c_res_type_id) ' +
            '                             VALUES (:modelId, :metricId, :resTypeId)',

    insertCopy: 'INSERT INTO t_moni_model_metric_rel SET ?',

    selectByModelId: 'SELECT * FROM t_moni_model_metric_rel WHERE c_model_id = ?'
};