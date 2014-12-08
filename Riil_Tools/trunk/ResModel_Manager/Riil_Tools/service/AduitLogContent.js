module.exports = {
    BackboardService_insertBg: '背板信息管理, 插入操作: projectName: {projectName}, c_backplane_name: {bpName}',
    BackboardService_deleteBpData: '背板信息管理, 删除操作.',
    BackboardService_upDataBackPlane: '背板信息管理, 修改操作:{bpId}',

    ManufService_save: '厂商管理, 插入数据id: {cManufId}, name: {cManufName}, icon: {cManufIcon}',
    ManufService_deleteById: '厂商管理, 删除数据.',
    ManufService_update: '厂商管理, 修改数据 id: {cManufId}',

    MetricBaseLib_saveMetricBase: '指标库管理, 添加自定义指标 metric_id: {metric_id}',
    MetricBaseLib_saveMetricGroupRelation: '指标库管理, 添加自定义指标组关系 groupid: {groupid}',
    MetricBaseLib_deleteMetricBaseById: '指标库管理, 删除自定义指标.',
    MetricBaseLib_saveMetricBaseModify: '指标库管理, 修改指标库指标 metric_id: {metric_id}',
    MetricBaseLib_deleteMetricGroupRelByMetricId: '指标库管理, 删除指标与指标组的关系.',

    MetricGroupService_saveMetricGroup: '指标组管理, 插入数据id: {groupId}',
    MetricGroupService_updataMetricGroup: '指标组管理, 修改数据id: {groupId}',
    MetricGroupService_deleteMetricGroupById: '指标组管理, 删除数据.',

    ModelMetricInfor_saveMetricCmdSupport: '资源模型保存扩展指令: sysoid为: {cmdVersion}',
    ModelMetricInfor_deleteMetricCmdSupport: '资源模型删除扩展指令: bindingId为: {metricBindingId}',
    ModelMetricInfor_addModelMetricAndCollectParam: '资源模型修改指标:modelID为: {modelId}',

    ModelPolicyEvent_updatePolicyMetricThreshold: '资源模型阈值修改:旧ID为: {policyId} 新ID为: {policyId}',
    ModelPolicyEvent_updatePolicyEvent: '资源模型事件修改:eventID为: {c_id}',
    ModelPolicyEvent_updatePolicyInfo: '资源模型默认策略修改',

    ResourceModelRelation_deleteModelMetricRelation: '资源模型删除指标信息:modelID为: {modelId}',

    ResTypeTree_saveResType: '资源类型树添加节点: ID为: {c_id}',
    ResTypeTree_updataResType: '资源类型树修改: 旧ID为: {c_oldId} 新ID为: {c_id}',
    ResTypeTree_deleteResType: '资源类型树删除节点',
    ResTypeTree_saveResModel: '资源模型树添加节点:ID为: {c_id}',
    ResTypeTree_updataResModel: '资源模型树修改:旧ID为: {c_oldId} 新ID为: {c_id}',
    ResTypeTree_deleteResModel: '资源模型树删除节点',
    ResTypeTree_copyResModels: '资源模型树复制',

    RoleService_deleteById: '角色管理, 删除角色',
    RoleService_updateById: '角色管理, 更新角色',
    RoleService_updateRoleById: '角色管理, 角色id: {role_id}',

    UserService_deleteById: '用户管理, 删除用户',
    UserService_update: '用户管理, 更新用户登录账号: {cAccount}',
    UserService_save: '用户管理, 保存用户登录帐号: {cAccount}',

    VendorService_save: '厂商型号管理插入数据oid: {sysoid}',
    VendorService_deleteById: '厂商型号管理删除数据',
    VendorService_update: '厂商型号管理修改数据 id: {sysoid}'
};