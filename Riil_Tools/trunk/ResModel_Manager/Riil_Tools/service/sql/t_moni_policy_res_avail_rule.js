module.exports = {
    selectByPolicyId: 'SELECT * FROM t_moni_policy_res_avail_rule WHERE c_policy_id = ?',

    insertCopy: 'INSERT INTO t_moni_policy_res_avail_rule SET ?'
};