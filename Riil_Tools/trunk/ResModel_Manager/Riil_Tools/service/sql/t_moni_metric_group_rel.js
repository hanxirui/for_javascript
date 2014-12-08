module.exports = {
    insert: 'INSERT INTO t_moni_metric_group_rel (c_metric_group_id, c_metric_id)' +
            '                             VALUES (:groupid, :metricid)',

    delete: 'DELETE FROM t_moni_metric_group_rel WHERE c_metric_id in (?)',
    
    selectGroupIdByMetricId: 'SELECT DISTINCT c_metric_group_id FROM t_moni_metric_group_rel WHERE c_metric_id = ?'
};