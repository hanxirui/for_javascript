module.exports = {
    update: 'UPDATE t_moni_policy_threshold SET c_exp1 = :exp1' +
            '                                  ,c_exp2 = :exp2' +
            '                                  ,c_exp3 = :exp3' +
            '                             WHERE c_policy_id = :policyId AND ' +
            '                                   c_metric_id = :metricId',

    selectByPolicyId: 'SELECT * FROM t_moni_policy_threshold WHERE c_policy_id = ?',

    insertCopy: 'INSERT INTO t_moni_policy_threshold SET ?'
};