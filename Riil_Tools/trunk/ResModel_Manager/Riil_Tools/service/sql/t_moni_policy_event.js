module.exports = {
    select: 'SELECT eventBase.c_name         AS eventName' +
            '      ,eventBase.c_name_display AS displayName' +
            '      ,eventBase.c_type         AS eventType' +
            '      ,policyEvent.c_level      AS eventLevel' +
            '      ,policyEvent.c_in_use     AS isInUsed' +
            '      ,policyEvent.c_id' +
            '  FROM t_moni_policy_info       AS collPolicy' +
            '      ,t_moni_policy_event      AS policyEvent' +
            '      ,t_moni_event_base        AS eventBase' +
            ' WHERE collPolicy.c_model_id = ? AND' +
            '       policyEvent.c_policy_id = collPolicy.c_id AND' +
            '       eventBase.c_id = policyEvent.c_event_id',

    update: 'UPDATE t_moni_policy_event SET c_level = :level' +
            '                              ,c_in_use = :inUse' +
            '                         WHERE c_id = :eventId',

    selectByPolicyId: 'SELECT * FROM t_moni_policy_event WHERE c_policy_id = ?',

    insertCopy: 'INSERT INTO t_moni_policy_event SET ?'
};