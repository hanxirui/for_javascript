package com.riil.base.policy;

import java.util.List;
import java.util.Map;

import com.riil.base.pojo.enums.Enum4Metric.Status4Metric;
import com.riil.base.pojo.enums.EnumRoot.MetricType;
import com.riil.base.policy.pojo.ChangedPolicy;
import com.riil.base.resmodel.pojo.base.MetricBasePojo;
import com.riil.base.resmodel.pojo.policy.PolicyActionPojo;
import com.riil.base.resmodel.pojo.policy.PolicyMetricPojo;
import com.riil.base.resmodel.pojo.policy.PolicyPojo;
import com.riil.base.resmodel.pojo.policy.PolicyThresholdPojo;
import com.riil.base.resource.pojo.ResInstancePojo;
import com.riil.core.service.ServiceException;

/**
 * 【DB】资源监控策略Service <br>
 * <p>
 * Create on : 2011-9-5<br>
 * <p>
 * </p>
 * <br>
 * 
 * @author liqiang@ruijie.com.cn<br>
 * @version riil_admin_api v1.0
 *          <p>
 *          <br>
 *          <strong>Modify History:</strong><br>
 *          user modify_date modify_content<br>
 *          -------------------------------------------<br>
 *          <br>
 */
public interface IResourcePolicyService extends IPolicyService {

    /**
     * <code>S_SERVICE_ID</code> - Service Bean ID.
     */
    String S_SERVICE_ID = "resourcePolicyService";

    /**
     * 资源实例加入监控.
     * 
     * @param resInstancePojos 资源实例
     * @param policyPojos 模型中配置的全部默认策略
     * @return 需要下发的策略ID集合
     * @throws ServiceException Service层异常
     */
    List<String> addMonitor(final List<ResInstancePojo> resInstancePojos) throws ServiceException;

    /**
     * 资源实例加入监控.
     * 
     * @param resInstancePojos 资源实例
     * @param policyPojos 模型中配置的全部默认策略
     * @param reloadSubRes 是否加载子资源
     * @return 需要下发的策略ID集合
     * @throws ServiceException Service层异常
     */
    List<String> addMonitor(final List<ResInstancePojo> resInstancePojos, boolean reloadSubRes)
        throws ServiceException;

    /**
     * 资源实例取消监控.
     * 
     * @param resInstancePojos 资源实例 * @return 已监控资源实例所在策略的新版本ID
     * @throws ServiceException Service层异常
     */
    List<String> cancelMonitor(final String userId, final List<ResInstancePojo> resInstancePojos)
        throws ServiceException;

    /**
     * create MoniPolicyAction info.
     * 
     * @param MoniPolicyAction - MoniPolicyAction POJO object.
     * @throws ServiceException
     */
    String createAction(String userId, PolicyActionPojo actionPojo) throws ServiceException;

    /**
     * 新建主策略.
     * 
     * @param policyPojo 策略实体对象
     * @param subModelIds 子监控模型ID
     * @throws ServiceException Service层异常
     */
    void createMainPolicy(final PolicyPojo defaultMainPolicy, final PolicyPojo mainPolicyPojo) throws ServiceException;

    /**
     * 新建子策略.
     * 
     * @param policyPojo 子策略
     * @return policyId 新建的策略ID
     * @throws ServiceException Service层异常
     */
    String createSubPolicy(final PolicyPojo defaultSubPolicy, final PolicyPojo subPolicyPojo) throws ServiceException;

    /**
     * get MoniPolicyAction by ID.
     * 
     * @param MoniPolicyActionID - MoniPolicyAction ID.
     * @return MoniPolicyAction POJO object or null.
     * @throws ServiceException
     */
    PolicyActionPojo getActionByID(String actionId) throws ServiceException;

    /**
     * 根据策略Id获取Action定义
     * 
     * @param policyId 策略Id
     * @return
     * @throws ServiceException
     */
    List<PolicyActionPojo> getActionByPolicyId(String policyId) throws ServiceException;

    /**
     * 查询主策略下所有最新版本的子策略的ID.
     * 
     * @param mainPolicyId 主策略ID
     * @return 主策略下所有最新版本的子策略的ID列表
     * @throws ServiceException Service层异常
     */
    List<String> getAllNewVersionSubPolicyIds(final String mainPolicyId) throws ServiceException;

    /**
     * 根据主策略ID获取其所有子策略基础信息.
     * 
     * @param mainPolicyId 主策略ID
     * @return 主策略下的所有子策略的基础信息列表
     * @throws ServiceException Service层异常
     */
    List<PolicyPojo> getAllSubPolicyBaseInfo(final String mainPolicyId) throws ServiceException;

    /**
     * 根据监控模型ID获取默认策略.
     * 
     * @param modelId 监控模型ID
     * @return 默认策略
     * @throws ServiceException Service层异常
     */
    public PolicyPojo getDefaultPolicyByModelId(final String modelId) throws ServiceException;

    /**
     * 根据主资源实例ID获取所有加入监控的指标.
     * 
     * @param mainInstId 主资源实例ID
     * @return 所有加入监控的指标
     * @throws ServiceException Service层异常
     */
    List<MetricBasePojo> getMainInstInMonitorMetric(final String mainInstId) throws ServiceException;

    /**
     * 根据主根据资源实例ID和指标类型获取所有加入监控的指标.资源实例ID和指标类型获取所有加入监控的指标.
     * 
     * @param mainInstId 主资源实例ID
     * @param metricType 指标类型
     * @return 所有加入监控的指标
     * @throws ServiceException Service层异常
     */
    List<MetricBasePojo> getMainInstInMonitorMetric(final String mainInstId, final MetricType metricType)
        throws ServiceException;

    /**
     * 根据主资源实例ID获取所有加入监控的指标.
     * 
     * @param mainInstId 主资源实例ID
     * @return 所有加入监控的指标ID
     * @throws ServiceException Service层异常
     */
    List<String> getMainInstInMonitorMetricIds(final String mainInstId) throws ServiceException;

    /**
     * 根据策略ID获取策略关联的指标，不包含阈值.
     * 
     * @param policyId 策略ID
     * @return 策略指标
     * @throws ServiceException Service层异常
     */
    List<PolicyMetricPojo> getPolicyMetricsWithOutThresholdByPolicyId(final String policyId) throws ServiceException;

    /**
     * 根据策略ID获取策略关联的指标，包含阈值.
     * 
     * @param policyId 策略ID
     * @return 策略指标
     * @throws ServiceException Service层异常
     */
    List<PolicyMetricPojo> getPolicyMetricsWithThresholdByPolicyId(final String policyId) throws ServiceException;

    /**
     * 根据策略ID获取策略 阈值.
     * 
     * @param policyId 策略ID
     * @return 策略阈值
     * @throws ServiceException Service层异常
     */
    List<PolicyThresholdPojo> getPolicyThresholdByPolicyId(final String policyId) throws ServiceException;

    /**
     * 根据策略ID和指标id 获取策略 阈值.
     * 
     * @param policyId 策略ID
     * @return 策略阈值
     * @throws ServiceException Service层异常
     */
    List<PolicyThresholdPojo> getPolicyThresholdByPolicyIdMetricId(final String policyId, final String metricId)
        throws ServiceException;

    /**
     * 根据策略ID和指标id 获取当前时间的策略 阈值.
     * 
     * @param policyId 策略ID
     * @return 策略阈值
     * @throws ServiceException Service层异常
     */
    PolicyThresholdPojo getPolicyThresholdByPolicyIdMetricId4CurrentTime(final String policyId, final String metricId)
        throws ServiceException;

    /**
     * 获取推荐阈值，参照一周内的数据统计阈值<br>
     * 参数： 策略id、指标id 、metric_status = RED OR YELLOW、 时间段
     * 
     * @param policyId 策略id
     * @param metricId 指标id
     * @param status 指标状态
     * @param startTime 【可空】开始时间 HH:mi:ss
     * @param endTime 【可空】 结束时间 HH:mi:ss
     * @return
     * @throws ServiceException
     */
    double getRecommendThreshold(final String policyId, final String monitorModelId, final String metricId,
        final Status4Metric status, final String startTime, final String endTime) throws ServiceException;

    /**
     * 根据主资源实例ID和子资源类型ID获取已监控的指标.
     * 
     * @param mainInstId 主资源实例ID
     * @param subTempId 子资源类型ID
     * @return 已监控的指标
     * @throws ServiceException Service层异常
     */
    List<MetricBasePojo> getSubInstInMonitorMetric(final String mainInstId, final String subTempId)
        throws ServiceException;

    /**
     * 根据子资源实例ID获取已监控的指标.
     * 
     * @param subInstId 子资源实例ID
     * @return 已监控的指标
     * @throws ServiceException Service层异常
     */
    List<MetricBasePojo> getSubInstInMonitorMetricBySubInstId(final String subInstId) throws ServiceException;

    /**
     * 查询子资源指标.
     * 
     * @param mainInstId 主资源实例ID
     * @param modelId 子模型ID
     * @param metricTypeIds 指标类型ID，如果为空则查全部类型
     * @return 指标对象集合
     * @throws ServiceException Service层异常
     */
    List<MetricBasePojo> getSubInstMetric(final String mainInstId, final String modelId,
        final List<String> metricTypeIds) throws ServiceException;

    /**
     * action name是否存在.
     * 
     * @param policyId
     * @param actionId
     * @param actionName
     * @return
     * @throws ServiceException
     */
    boolean isExisActionName(String policyId, final String actionId, final String actionName) throws ServiceException;

    /**
     * modify MoniPolicyAction info.
     * 
     * @param MoniPolicyAction - MoniPolicyAction POJO object.
     * @throws ServiceException
     */
    String modifyAction(String userId, PolicyActionPojo policyAction) throws ServiceException;

    /**
     * 编辑策略关联指标.
     * 
     * @param policyId 策略ID
     * @param userId 修改者
     * @param policyThresholdPojos 策略关联指标列表
     * @return 策略ID 如果产生了新版本的策略就返回新版的ID
     * @throws ServiceException Service层异常
     */
    String modifyPolicyMetric(final String policyId, final String userId,
        final List<PolicyMetricPojo> policyMetricPojos) throws ServiceException;

    /**
     * 修改阈值信息<br>
     * . 调用delete 再insert
     * 
     * @param policyId
     * @param userId
     * @param metricId
     * @param policyThresholdPojos
     * @return
     * @throws ServiceException
     */
    String modifyPolicyThreshold(String policyId, String userId, String metricId,
        List<PolicyThresholdPojo> policyThresholdPojos) throws ServiceException;

    String modifyPolicyThreshold(String policyId, String userId,
        Map<String, List<PolicyThresholdPojo>> policyThresholdMap) throws ServiceException;

    /**
     * remove MoniPolicyAction by MoniPolicyAction ID.
     * 
     * @param String MoniPolicyActionID - MoniPolicyAction ID.
     * @throws ServiceException
     */
    String removeAction(String policyId, String userId, String actionName) throws ServiceException;

    /**
     * {method description}.
     * 
     * @param actionDefineIds
     * @throws ServiceException
     */
    String removeActionds(String policyId, String userId, List<String> actionNames) throws ServiceException;

    /**
     * 设置action对象是否启用（0表示禁用，1表示启用）.
     * 
     * @param actionDefineIds
     * @throws ServiceException
     */
    String setActiondDefineState(String policyId, String userId, String inUse, List<String> actionNames)
        throws ServiceException;

    /**
     * 判断策略id，是有有相应类型的指标，没有为false
     * 
     * @param policyId
     * @return
     * @throws ServiceException
     */
    Map<String, Boolean> getMetricType4Inuse(String policyId) throws ServiceException;

    /**
     * 查询全部子策略（包含无资源的策略）
     * 
     * @param policyType
     * @param domainIds
     * @return
     * @throws ServiceException
     */
    List<PolicyPojo> getSubPolicyBaseInfoByPolicyTypeAll(String policyType, List<String> domainIds)
        throws ServiceException;

    /**
     * 查询变动的策略-仅包含查询的资源关联关系<br>
     * 对于主资源，如果isMain=0，查询主资源关联的主资源策略和子资源策略<br>
     * 对于主资源，如果isMain=1, 仅查询主资源关联的主资源策略<br>
     * 对于主资源，如果isMain=-1, 仅查询主资源关联的子资源策略<br>
     * 对于子资源，仅查询子资源关联的子资源策略<br>
     * 
     * @param instIds 主资源列表，可以为null
     * @param subInstIds 子资源列表， 可以为null
     * @param isMain 是否是主资源，0（主资源和子资源），1（主资源），-1（子资源）
     * @return Key为策略ID，Value为变动的策略（仅包含查询的资源关联关系，策略是否启用，策略是否发布）
     * @throws ServiceException 服务异常
     */
    Map<String, ChangedPolicy> getChangedPolicys(List<String> instIds, List<String> subInstIds, byte isMain)
        throws ServiceException;

    /**
     * 查询变动的策略-仅包含查询的资源关联关系<br>
     * 对于主资源，如果isMain=0，查询主资源关联的主资源策略和子资源策略<br>
     * 对于主资源，如果isMain=1, 仅查询主资源关联的主资源策略<br>
     * 对于主资源，如果isMain=-1, 仅查询主资源关联的子资源策略<br>
     * 对于子资源，仅查询子资源关联的子资源策略<br>
     * 
     * @param instIds 主资源列表，可以为null
     * @param subInstIds 子资源列表， 可以为null
     * @param isMain 是否是主资源，0（主资源和子资源），1（主资源），-1（子资源）
     * @param policyType 策略类型，使用枚举PolicyType（例如：PolicyType.RES.getId()）
     * @return Key为策略ID，Value为变动的策略（仅包含查询的资源关联关系，策略是否启用，策略是否发布）， 可以为null
     * @throws ServiceException 服务异常
     */
    Map<String, ChangedPolicy> getChangedPolicys(List<String> instIds, List<String> subInstIds, byte isMain,
        String policyType) throws ServiceException;
    
    /**
     * 写入自定义指标
     * {method description}.
     * @param metricBasePojos  metricBasePojo列表
     * @throws ServiceException
     */
    int createCustomMetric(final List<MetricBasePojo> metricBasePojos) throws ServiceException;
    
    /**
     * 删除自定义指标
     * {method description}.
     * @param metricBaseIds
     * @return
     * @throws ServiceException
     */
    int deleteCustomMetric(final List<String> metricBaseIds) throws ServiceException;
    
    /**
     * 修改自定义指标对象
     * {method description}.
     * @param metricBasePojos
     * @throws ServiceException
     */
    void modifyCustomMetric(final List<MetricBasePojo> metricBasePojos) throws ServiceException;
    
    /**
     * 创建资源策略对象（包含阈值信息）
     * {method description}.
     * @param policyId
     * @param policyMetricPojos
     * @throws ServiceException
     */
    void createPolicyMetric(final String policyId,
        final List<PolicyMetricPojo> policyMetricPojos) throws ServiceException;
    
    /**
     * 删除资源策略对象（包含阈值信息）
     * {method description}.
     * @param policyMetricPojos
     * @throws ServiceException
     */
    void deletePolicyMetric(final List<PolicyMetricPojo> policyMetricPojos)  throws ServiceException;
}