module.exports = {
    selectByModelId: 'SELECT collPolicy.c_id AS policyId' +
                     '      ,collPolicy.c_name AS policyName' +
                     '      ,collPolicy.c_desc AS policyDesc' +
                     '      ,c_policy_type AS policyType' +
                     '  FROM t_moni_policy_info AS collPolicy' +
                     ' WHERE c_model_id = ?',

    update: 'UPDATE t_moni_policy_info SET c_id = :id' +
            '                             ,c_name = :name' +
            '                             ,c_desc = :desc' +
            '                             ,c_policy_type = :type' +
            '                        WHERE c_model_id = :modelId',

    selectByModelIdToCopy: 'SELECT * FROM t_moni_policy_info WHERE c_model_id = ?',

    insertCopy: 'INSERT INTO t_moni_policy_info SET ?'
};