module.exports = {
    selectByModelId: 'SELECT allPolicyMetric.*' +
                     '      ,policyThreshold.c_exp1' +
                     '      ,policyThreshold.c_exp2' +
                     '      ,policyThreshold.c_exp3' +
                     ' FROM ( SELECT collPolicy.c_id                  AS policyId' +
                     '              ,metricBase.c_metric_type         AS metricType' +
                     '              ,metricGroupRel.c_metric_group_id AS metricGroupId' +
                     '              ,metricBase.c_name                AS metricName' +
                     '              ,policyMetric.c_flapping          AS metricFlapping' +
                     '              ,policyMetric.c_time_out          AS collectTimeOut' +
                     '              ,policyMetric.c_retry_times       AS collectRetry' +
                     '              ,policyMetric.c_frequency_id      AS collectFrequency' +
                     '              ,policyMetric.c_in_use            AS isInUsed' +
                     '              ,policyMetric.c_gen_event         AS isGenEvent' +
                     '              ,policyMetric.c_metric_id         AS metricId' +
                     '          FROM t_moni_policy_info               AS collPolicy' +
                     '              ,t_moni_metric_base               AS metricBase' +
                     '              ,t_moni_metric_group_rel          AS metricGroupRel' +
                     '              ,t_moni_policy_metric             AS policyMetric' +
                     '         WHERE collPolicy.c_model_id = ? AND' +
                     '               metricGroupRel.c_metric_id = policyMetric.c_metric_id AND' +
                     '               policyMetric.c_policy_id = collPolicy.c_id AND' +
                     '               metricBase.c_id = policyMetric.c_metric_id) allPolicyMetric LEFT JOIN' +
                     '      ( SELECT * FROM t_moni_policy_threshold' +
                     '         WHERE c_policy_id IN ( SELECT c_id FROM t_moni_policy_info WHERE c_model_id = ? )) AS policyThreshold ON' +
                     '               allPolicyMetric.metricId = policyThreshold.c_metric_id' +
                     ' GROUP BY metricId',

    update: 'UPDATE t_moni_policy_metric SET c_flapping = :flapping' +
            '                               ,c_time_out = :timeOut' +
            '                               ,c_retry_times = :retryTimes' +
            '                               ,c_frequency_id = :frequency' +
            '                               ,c_in_use = :inUse' +
            '                               ,c_gen_event = :genEvent' +
            '                          WHERE c_policy_id = :policyId AND' +
            '                                c_metric_id = :metricId',

    selectByPolicyId: 'SELECT * FROM t_moni_policy_metric WHERE c_policy_id = ?',

    insertCopy: 'INSERT INTO t_moni_policy_metric SET ?'
};