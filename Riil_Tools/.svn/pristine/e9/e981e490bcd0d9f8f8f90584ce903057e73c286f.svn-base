package com.riil.base.policy.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.util.Assert;

import com.riil.base.pojo.enums.Enum4Metric.Status4Avail;
import com.riil.base.pojo.enums.Enum4Metric.Status4Metric;
import com.riil.base.pojo.enums.Enum4ResType.TreeNodeId;
import com.riil.base.pojo.enums.EnumRoot.DataType;
import com.riil.base.pojo.enums.EnumRoot.MetricType;
import com.riil.base.pojo.enums.EnumRoot.Operator4Number;
import com.riil.base.pojo.enums.EnumRoot.OperatorRel;
import com.riil.base.pojo.enums.EnumRoot.PolicyType;
import com.riil.base.policy.IResourcePolicyService;
import com.riil.base.policy.impl.dao.PolicyActionDAO;
import com.riil.base.policy.impl.dao.PolicyMetricDAO;
import com.riil.base.policy.impl.dao.PolicyResAvailRuleGroupDAO;
import com.riil.base.policy.impl.dao.PolicyThresholdDAO;
import com.riil.base.policy.pojo.ChangedPolicy;
import com.riil.base.policy.pojo.PolicyResRelExt;
import com.riil.base.resmodel.IResTypeService;
import com.riil.base.resmodel.impl.db.dao.MetricBaseDao;
import com.riil.base.resmodel.pojo.base.MetricBasePojo;
import com.riil.base.resmodel.pojo.base.ResTypePojo;
import com.riil.base.resmodel.pojo.policy.PolicyActionPojo;
import com.riil.base.resmodel.pojo.policy.PolicyMetricPojo;
import com.riil.base.resmodel.pojo.policy.PolicyPojo;
import com.riil.base.resmodel.pojo.policy.PolicyResPojo;
import com.riil.base.resmodel.pojo.policy.PolicyResRelPojo;
import com.riil.base.resmodel.pojo.policy.PolicyThresholdPojo;
import com.riil.base.resmodel.pojo.policy.PolicyThresholdPojo.DayOrWeek;
import com.riil.base.resmodel.pojo.policy.ResAvailRule;
import com.riil.base.resmodel.pojo.policy.ResAvailRuleGroup;
import com.riil.base.resource.IResInstBaseService;
import com.riil.base.resource.IResInstanceSubService;
import com.riil.base.resource.pojo.ResInstancePojo;
import com.riil.base.resource.pojo.ResInstanceSubPojo;
import com.riil.core.constant.Constants;
import com.riil.core.container.ContainerException;
import com.riil.core.container.ServiceContainer;
import com.riil.core.dao.DAOException;
import com.riil.core.exception.AssertException;
import com.riil.core.service.ServiceException;

/**
 * 资源监控策略Service实现 <br>
 * Create on : 2011-9-5<br>
 * <p>
 * </p>
 * <br>
 * 
 * @author liqiang@ruijie.com.cn<br>
 * @version riil_admin_impl v1.0
 *          <p>
 *          <br>
 *          <strong>Modify History:</strong><br>
 *          user modify_date modify_content<br>
 *          -------------------------------------------<br>
 *          <br>
 */
public class ResourcePolicyService extends PolicyPortalService implements IResourcePolicyService {

    /**
     * <code>m_thresholdDAO</code> - 策略指标阈值频度DAO.
     */
    private PolicyMetricDAO m_metricDAO;
    private MetricBaseDao metricBaseDao;
    private PolicyThresholdDAO m_thresholdDAO;
    private PolicyActionDAO m_policyActionDAO;
    private PolicyResAvailRuleGroupDAO m_policyResAvailRuleGroupDAO;

    private IResTypeService m_resTypeSrv;
    private IResInstBaseService m_resInstBaseService;

    /**
     * 注入策略指标阈值频度DAO.
     * 
     * @param metricDAO final PolicyMetricDAO
     */
    public void setMetricDAO(final PolicyMetricDAO metricDAO) {
        m_metricDAO = metricDAO;
    }

    @Override
    public Map<String, ChangedPolicy> getChangedPolicys(final List<String> instIds, final List<String> subInstIds,
        final byte isMain) throws ServiceException {
        return getChangedPolicys(instIds, subInstIds, isMain, PolicyType.RES.getId());
    }

    @Override
    public Map<String, ChangedPolicy> getChangedPolicys(final List<String> instIds, final List<String> subInstIds,
        final byte isMain, final String policyType) throws ServiceException {

        Map<String, ChangedPolicy> t_result = new HashMap<String, ChangedPolicy>();

        Map<String, Object> queryMap = new HashMap<String, Object>();
        queryMap.put("instIds", instIds);
        queryMap.put("subInstIds", subInstIds);
        queryMap.put("isMain", isMain);
        queryMap.put("policyType", policyType);

        try {
            List<PolicyResRelExt> t_exts =
                m_baseInfoDAO.doSelectPolicyResRelExt(queryMap, "select_policyResRelExt_by_instId");
            if (t_exts.isEmpty()) {
                return t_result;
            }

            for (PolicyResRelExt t_ext : t_exts) {
                String t_key = t_ext.getPolicyId();
                ChangedPolicy t_policy = t_result.get(t_key);
                if (t_policy == null) {
                    t_policy = new ChangedPolicy(t_ext);
                    t_result.put(t_key, t_policy);
                } else {
                    t_policy.addPolicyResRelPojo(t_ext.gainPolicyResRelPojo());
                }
            }

        } catch (DAOException e) {
            throw new ServiceException(e);
        }

        return t_result;
    }

    @Override
    public synchronized List<String> addMonitor(final List<ResInstancePojo> resInstancePojos, final boolean reloadSubRes)
        throws ServiceException {
        Assert.notNull(resInstancePojos);

        if (resInstancePojos == null || resInstancePojos.isEmpty()) {
            S_LOGGER.error("addMonitor input resInstancePojos is null");
            return null;
        }
        List<PolicyResRelPojo> t_resRelPojos = new ArrayList<PolicyResRelPojo>();
        List<String> t_resIds = new ArrayList<String>();
        // 模型和默认策略关联关系
        Map<String, String> t_modelRelPolicy = new HashMap<String, String>();
        Map<String, String> t_modelRelPolicyName = new HashMap<String, String>();
        List<String> t_subPolicyIds = new LinkedList<String>();
        StringBuilder t_errMsg = new StringBuilder();
        int i = 0;
        int resSize = resInstancePojos.size();
        for (ResInstancePojo t_resInstancePojo : resInstancePojos) {
            i++;
            if (S_LOGGER.isInfoEnabled()) {
                S_LOGGER.info("addMonitor：" + t_resInstancePojo);
            }
            t_resIds.add(t_resInstancePojo.getId());
            String t_policyId = null;
            String t_policyName = null;
            if (t_modelRelPolicy.containsKey(t_resInstancePojo.getModelId())) {
                t_policyId = t_modelRelPolicy.get(t_resInstancePojo.getModelId());
                t_policyName = t_modelRelPolicyName.get(t_resInstancePojo.getModelId());
                if (null == t_policyName) {
                    PolicyPojo t_defaultPolicy = getDefaultPolicyByModelId(t_resInstancePojo.getModelId());
                    if (t_defaultPolicy != null) {
                        t_policyName = t_defaultPolicy.getName();
                        t_modelRelPolicyName.put(t_policyId, t_policyName);
                    }
                }

            } else {
                PolicyPojo t_defaultPolicy = getDefaultPolicyByModelId(t_resInstancePojo.getModelId());
                if (t_defaultPolicy != null) {
                    t_modelRelPolicy.put(t_resInstancePojo.getModelId(), t_defaultPolicy.getId());
                    t_policyId = t_defaultPolicy.getId();
                    t_policyName = t_defaultPolicy.getName();
                    t_modelRelPolicyName.put(t_policyId, t_policyName);
                }
            }

            t_resInstancePojo.setPolicyId(t_policyId);
            t_resInstancePojo.setPolicyName(t_policyName);

            if (t_policyId != null) {
                PolicyResRelPojo t_resRelPojo = new PolicyResRelPojo();
                t_resRelPojo.setPolicyId(t_policyId);
                t_resRelPojo.setInstId(t_resInstancePojo.getId());
                t_resRelPojo.setIsMain(Constants.TRUE);
                // t_resRelPojo.setTag1(new Date().toString());
                t_resRelPojo.setTag2(t_policyName);// 传递策略名称
                t_resRelPojos.add(t_resRelPojo);
                t_subPolicyIds.addAll(addMonitor4SubRes(t_policyId, t_resInstancePojo, t_resRelPojos, t_modelRelPolicy,
                    t_resIds, reloadSubRes));
            }
            if (t_resIds.size() < 5000 && i < resSize) {
                continue;
            }
            if (t_resRelPojos != null && !t_resRelPojos.isEmpty()) {
                try {
                    m_resRelDAO.doDeleteResRelByResIds(PolicyType.RES.getId(), t_resIds);
                    createPolicyResRel(t_resRelPojos);
                } catch (Exception e) {
                    t_errMsg.append(e.getMessage());
                }
                t_resRelPojos.clear();
                t_resIds.clear();
            }
        }
        if (t_resRelPojos != null && !t_resRelPojos.isEmpty()) {
            try {
                m_resRelDAO.doDeleteResRelByResIds(PolicyType.RES.getId(), t_resIds);
                createPolicyResRel(t_resRelPojos);
            } catch (Exception e) {
                t_errMsg.append(e.getMessage());
            }
            t_resRelPojos.clear();
            t_resIds.clear();
        }
        if (t_errMsg.length() > 0) {
            S_LOGGER.error("addMonitor error: " + t_errMsg.toString());
        }
        // ccsNotify(t_modelRelPolicy.values(), DataChangeType.update);
        // return t_modelRelPolicy == null ? null : new ArrayList<String>(t_modelRelPolicy.values());

        Set<String> t_result = new HashSet<String>(t_subPolicyIds);
        if (t_modelRelPolicy != null) {
            t_result.addAll(t_modelRelPolicy.values());
        }

        return new ArrayList<String>(t_result);
    }

    @Override
    public synchronized List<String> addMonitor(final List<ResInstancePojo> resInstancePojos) throws ServiceException {
        return addMonitor(resInstancePojos, true);
    }

    private String getPolicyIdBySubModel(final String subModelid, final String bandwidthType,
        final List<PolicyPojo> subPolicys) {
        for (PolicyPojo policyPojo : subPolicys) {
            if (bandwidthType == null) {
                if (policyPojo.getModelId().equalsIgnoreCase(subModelid)) {
                    return policyPojo.getId();
                }
            } else {
                if (policyPojo.getModelId().equalsIgnoreCase(subModelid)
                    && bandwidthType.equalsIgnoreCase(policyPojo.getBandwidthType())) {
                    return policyPojo.getId();
                }
            }
        }
        return "";
    }

    private List<String> addMonitor4SubRes(final String mainPolicyId, final ResInstancePojo mainRes,
        final List<PolicyResRelPojo> resRelPojos, final Map<String, String> t_modelRelPolicy,
        final List<String> resIds, final boolean reloadSubRes) throws ServiceException {
        List<String> t_subPolicyIds = new ArrayList<String>();
        if (reloadSubRes) {// 重新加载子资源
            addMonitor4SubRes(mainPolicyId, mainRes, resRelPojos, t_modelRelPolicy, resIds);
            return new ArrayList<String>();
        }
        // 用资源对象上的子资源
        List<PolicyPojo> t_subPolicys = getAllSubPolicyBaseInfo(mainPolicyId);
        if (t_subPolicys == null || t_subPolicys.isEmpty()) {
            return new ArrayList<String>();
        }

        List<ResInstanceSubPojo> t_subInsts = mainRes.getListResInstanceSubPojo();
        for (ResInstanceSubPojo t_resInstSub : t_subInsts) {
            if (!t_resInstSub.isAddMonitor()) {
                continue;
            }
            String policyId =
                getPolicyIdBySubModel(t_resInstSub.getModelId(), t_resInstSub.getBandwidthType(), t_subPolicys);
            if (StringUtils.isBlank(policyId)) {
                continue;
            }
            t_modelRelPolicy.put(t_resInstSub.getModelId(), policyId);
            t_subPolicyIds.add(policyId);
            PolicyResRelPojo t_resRel = new PolicyResRelPojo();
            t_resRel.setInstId(t_resInstSub.getInstId());
            t_resRel.setSubInstId(t_resInstSub.getId());
            t_resRel.setPolicyId(policyId);
            t_resRel.setIsMain(Constants.FALSE);
            resRelPojos.add(t_resRel);
            resIds.add(t_resInstSub.getId());
        }

        return t_subPolicyIds;
    }

    public void addMonitor4SubRes(final String mainPolicyId, final ResInstancePojo mainRes,
        final List<PolicyResRelPojo> resRelPojos, final Map<String, String> t_modelRelPolicy, final List<String> resIds)
        throws ServiceException {
        List<PolicyPojo> t_subPolicys = getAllSubPolicyBaseInfo(mainPolicyId);
        if (t_subPolicys == null || t_subPolicys.isEmpty()) {
            return;
        }

        IResInstanceSubService t_subSrv;
        try {
            t_subSrv = ServiceContainer.getInstance().getServiceComponent(IResInstanceSubService.S_SERVICE_ID);
        } catch (ContainerException e) {
            throw new ServiceException(e);
        }
        ResInstanceSubPojo t_query = new ResInstanceSubPojo();
        for (PolicyPojo t_subPolicy : t_subPolicys) {
            t_query.setInstId(mainRes.getId());
            t_query.setModelId(t_subPolicy.getModelId());
            List<ResInstanceSubPojo> t_subInsts = t_subSrv.getListByQuery(t_query);
            if (t_subInsts == null || t_subInsts.isEmpty()) {
                S_LOGGER.error("没有子资源，主实例=" + mainRes.getId() + "模型id=" + t_subPolicy.getModelId());
                continue;
            }
            if (S_LOGGER.isInfoEnabled()) {
                S_LOGGER.info("子资源加入监控：" + t_subInsts);
            }
            t_modelRelPolicy.put(t_subPolicy.getModelId(), t_subPolicy.getId());
            for (ResInstanceSubPojo t_resInstSub : t_subInsts) {
                // TODO 判断是否需要加入监控：接口，只有有链路的才加入监控
                PolicyResRelPojo t_resRel = new PolicyResRelPojo();
                t_resRel.setInstId(t_resInstSub.getInstId());
                t_resRel.setSubInstId(t_resInstSub.getId());
                t_resRel.setPolicyId(t_subPolicy.getId());
                t_resRel.setIsMain(Constants.FALSE);
                resRelPojos.add(t_resRel);
                resIds.add(t_resInstSub.getId());
            }
        }
    }

    // private String getPolicyIdByModelId(List<PolicyPojo> t_subPolicys, String
    // modelId) {
    // if (null != mainRes.getListResInstanceSubPojo()) {//大对象不用查询子对象
    // for (ResInstanceSubPojo t_subRes :
    // mainRes.getListResInstanceSubPojo()) {
    // PolicyResRelPojo t_resRel = new PolicyResRelPojo();
    // t_resRel.setInstId(t_subRes.getInstId());
    // t_resRel.setSubInstId(t_subRes.getId());
    //
    // String t_subPolicyId = getPolicyIdByModelId(t_subPolicys,
    // t_subRes.getModelId());
    // if (null == t_subPolicyId) {
    // continue;
    // }
    // t_resRel.setPolicyId(t_subPolicyId);
    // t_resRel.setIsMain(Constants.FALSE);
    // resRelPojos.add(t_resRel);
    // }
    // return;
    // }
    // for (PolicyPojo policyPojo : t_subPolicys) {
    // if (policyPojo.getModelId().equalsIgnoreCase(modelId)) {
    // return policyPojo.getId();
    // }
    // }
    // return null;
    // }

    /*
     * (non-Javadoc)
     * @see com.riil.admin.policy.service.IResourcePolicyService#cancelMonitor(java .util.List)
     */
    @Override
    public List<String> cancelMonitor(final String userId, final List<ResInstancePojo> resInstancePojos)
        throws ServiceException {
        Assert.notNull(resInstancePojos);
        try {
            List<String> resInstanceIds = new ArrayList<String>();
            for (ResInstancePojo t_resInstancePojo : resInstancePojos) {
                resInstanceIds.add(t_resInstancePojo.getId());
            }
            if (null == resInstanceIds || resInstanceIds.size() == 0) {
                return null;
            }

            List<String> t_policyIds =
                m_baseInfoDAO.doSelectNewVersionPolicyIdsByResInstanceIds(resInstanceIds, PolicyType.RES.name());
            removePolicyRelResByResIds(PolicyType.RES.name(), resInstanceIds);

            return policyPublish(userId, t_policyIds);
        } catch (DAOException t_e) {
            throw new ServiceException(t_e);
        }
    }

    /*
     * (non-Javadoc)
     * @see com.riil.admin.policy.service.IResourcePolicyService# getDefaultPolicyInfoByModelId(java.lang.String)
     */
    @Override
    public PolicyPojo getDefaultPolicyByModelId(final String modelId) throws ServiceException {
        try {
            String t_defaultId = m_baseInfoDAO.doSelectDefaultPolicyIdByModelId(modelId);
            PolicyPojo t_defaultPolicy = null;
            if (StringUtils.isNotBlank(t_defaultId)) {
                t_defaultPolicy = getPolicyByPolicyId(t_defaultId);
            }
            return t_defaultPolicy;
        } catch (DAOException t_e) {
            throw new ServiceException(t_e);
        }
    }

    /*
     * (non-Javadoc)
     * @see com.riil.admin.monitor.service.IResourcePolicyService#createMainPolicy
     * (com.riil.mserver.resmodel.pojo.PolicyPojo, java.util.List)
     */
    @Override
    public void createMainPolicy(final PolicyPojo defaultMainPolicy, final PolicyPojo mainPolicyPojo)
        throws ServiceException {
        Assert.notNull(defaultMainPolicy);
        Assert.notNull(mainPolicyPojo);
        assembleNewPolicy(defaultMainPolicy, mainPolicyPojo, Constants.TRUE);
        createPolicy(defaultMainPolicy);
    }

    /*
     * (non-Javadoc)
     * @see com.riil.admin.monitor.service.IResourcePolicyService#createSubPolicy
     * (com.riil.mserver.resmodel.pojo.PolicyPojo)
     */
    @Override
    public String createSubPolicy(final PolicyPojo defaultSubPolicy, final PolicyPojo subPolicyPojo)
        throws ServiceException {
        Assert.notNull(defaultSubPolicy);
        Assert.notNull(subPolicyPojo);
        assembleNewPolicy(defaultSubPolicy, subPolicyPojo, Constants.FALSE);
        createPolicy(defaultSubPolicy);
        return defaultSubPolicy.getId();
    }

    /*
     * (non-Javadoc)
     * @see com.riil.admin.monitor.service.PolicyBaseService#createPolicy(com.riil .mserver.resmodel.pojo.PolicyPojo)
     */
    @Override
    public void createPolicy(final PolicyPojo policyNormalPojo) throws ServiceException {
        try {
            if (!(policyNormalPojo instanceof PolicyResPojo)) {
                return;
            }
            PolicyResPojo policyPojo = (PolicyResPojo) policyNormalPojo;
            m_baseInfoDAO.doInsertPojo(policyPojo);
            List<PolicyResRelPojo> listPolicyResRelPojo = policyPojo.getListPolicyResRelPojo();
            if (null != listPolicyResRelPojo && !listPolicyResRelPojo.isEmpty()) {
                for (PolicyResRelPojo policyResRelPojo : listPolicyResRelPojo) {
                    policyResRelPojo.setPolicyId(policyPojo.getId());
                }
                m_resRelDAO.doBatchInsertResRel(listPolicyResRelPojo);
            }

            createResAvailRuleGroup(policyPojo);

            // m_resRelDAO.doBatchInsertResRel(policyPojo.getId(),
            // policyPojo.getListPolicyResRelPojo());
            m_eventDAO.doBatchInsertEvent(policyPojo.getId(), policyPojo.getListPolicyEventPojo());
            m_metricDAO.doBatchInsertMetric(policyPojo.getId(), policyPojo.getListPolicyMetricPojo());
            // List<PolicyThresholdPojo> t_thresholds = new
            // ArrayList<PolicyThresholdPojo>();
            // for (PolicyMetricPojo t_metric :
            // policyPojo.getListPolicyMetricPojo()) {
            // if (null != t_metric.getListPolicyThresholdPojo() &&
            // !t_metric.getListPolicyThresholdPojo().isEmpty()) {
            // for (PolicyThresholdPojo policyThresholdPojo :
            // t_metric.getListPolicyThresholdPojo()) {
            // policyThresholdPojo.setPolicyId(policyPojo.getId());
            // policyThresholdPojo.setMetricId(t_metric.getMetricId());
            // }
            // t_thresholds.addAll(t_metric.getListPolicyThresholdPojo());
            // }
            // }
            // if (null != t_thresholds && t_thresholds.size() > 0) {
            //
            // m_thresholdDAO.doBatchInsertPojo(t_thresholds);
            // }
            m_policyActionDAO.doBatchInsertAction(policyPojo.getId(), policyPojo.getListPolicyActionPojo());
        } catch (DAOException t_e) {
            throw new ServiceException(t_e);
        }
    }

    @Override
    public void createPolicy4InitData(final PolicyPojo policy) throws ServiceException {
        Assert.isInstanceOf(PolicyResPojo.class, policy, "The policy isn't a instance of PolicyResPojo.");
        try {
            super.createPolicy4InitData(policy);
            PolicyResPojo policyPojo = (PolicyResPojo) policy;
            createResAvailRuleGroup(policyPojo);
            m_metricDAO.insert(policyPojo.getId(), policyPojo.getListPolicyMetricPojo());
            m_policyActionDAO.doBatchInsertAction(policyPojo.getId(), policyPojo.getListPolicyActionPojo());
        } catch (DAOException t_e) {
            throw new ServiceException(t_e);
        }
    }

    private void createResAvailRuleGroup(final PolicyResPojo policyPojo) throws DAOException, ServiceException {
        ResAvailRuleGroup t_ruleGroup = policyPojo.getResAvailRuleGroup();
        if (t_ruleGroup != null) {
            ResAvailRuleGroup t_group4db = m_policyResAvailRuleGroupDAO.doSelectByPolicyId(policyPojo.getId());
            if (t_group4db != null) {
                m_policyResAvailRuleGroupDAO.doDeleteByID(t_group4db.getId());
            }
            t_ruleGroup.setId(null);
            t_ruleGroup.setPolicyId(policyPojo.getId());
            m_policyResAvailRuleGroupDAO.doInsertPojo(t_ruleGroup);
        } else if (notIsWLAN(policyPojo)) {
            // 创建默认规则组-（仅主资源创建默认规则组）
            ResAvailRuleGroup t_defaultGroup = getDefaultResAvailRuleGroup(policyPojo);
            if (t_defaultGroup != null) {
                m_policyResAvailRuleGroupDAO.doInsertPojo(t_defaultGroup);
                // 默认策略没有规则组则创建
                if (policyPojo.isDefault() && policyPojo.getOriginalPolicyId() != null) {
                    PolicyResPojo originalPolicy =
                        (PolicyResPojo) getPolicyByPolicyId(policyPojo.getOriginalPolicyId());
                    createResAvailRuleGroup(originalPolicy);
                }
            }
        }
    }

    private boolean notIsWLAN(PolicyResPojo policyPojo) throws ServiceException {
        String t_treeNodeId = "";
        String t_resTypeId = policyPojo.getResTypeId();
        ResTypePojo t_resType = m_resTypeSrv.getResTypeByID(t_resTypeId);
        if (t_resType != null) {
            t_treeNodeId = t_resType.getTreeNodeId();
        }
        if (t_treeNodeId.startsWith(TreeNodeId.WLAN.getId())) {
            return false; // 是WLAN
        } else {
            return true; // 不是WLAN
        }
    }

    private String parseFreqPerf2Avail(String perfFreq) {
        if (StringUtils.isNotBlank(perfFreq) && StringUtils.containsIgnoreCase(perfFreq, "perf")) {
            return perfFreq.replaceAll("perf", "avail");
        }
        return perfFreq;
    }

    private ResAvailRuleGroup getDefaultResAvailRuleGroup(final PolicyResPojo policyPojo) throws DAOException,
        ServiceException {
        ResAvailRuleGroup t_defaultGroup = new ResAvailRuleGroup();
        ResAvailRuleGroup t_defaultSubGroup = new ResAvailRuleGroup();
        List<PolicyMetricPojo> t_metrics = policyPojo.getListPolicyMetricPojo();
        String t_frequencyId = null;
        Boolean hasAvailSubPolicy = hasAvailPolicy(policyPojo);
        if (null == hasAvailSubPolicy) {
            S_LOGGER.error("getDefaultResAvailRuleGroup hasAvailSubPolicy is null policyId ==" + policyPojo.getId());
            return null;
        }
        for (PolicyMetricPojo t_policyMetric : t_metrics) {
            MetricBasePojo param = new MetricBasePojo();
            param.setId(t_policyMetric.getMetricId());
            MetricBasePojo t_metricBase = metricBaseDao.doSelectOneByQuery(param);
            if (t_metricBase != null && t_policyMetric.inUsed()) {
                if (hasAvailSubPolicy && MetricType.AVAIL.getId().equals(t_metricBase.getMetricType())) {
                    ResAvailRule t_defaultRule = new ResAvailRule();
                    t_defaultRule.setMetricId(t_metricBase.getId());
                    t_defaultRule.setMetricName(t_metricBase.getName());
                    t_defaultRule.setOperator(Operator4Number.EQUAL);
                    t_defaultRule.setValue(String.valueOf(Constants.TRUE));
                    t_defaultRule.setValueType(DataType.NUMBER.getId());
                    t_defaultRule.setOperatorRel(OperatorRel.AND);
                    t_defaultSubGroup.addRule(t_defaultRule);
                    if (t_frequencyId == null) {
                        t_frequencyId = t_policyMetric.getFrequencyId();
                    }
                }
                // if(!hasAvailSubPolicy && MetricType.PERF.getId().equals(t_metricBase.getMetricType())){
                // ResAvailRule t_defaultRule = new ResAvailRule();
                // t_defaultRule.setMetricId(t_metricBase.getId());
                // t_defaultRule.setMetricName(t_metricBase.getName());
                // List<PolicyThresholdPojo> t_thresholds = t_policyMetric.getListPolicyThresholdPojo();
                // Map<Operator4Number, String> threshold4DefaultMap =
                // getThreshold4DefaultMap(t_thresholds,t_metricBase.getId(),Status4Metric.RED);
                // t_defaultRule.setOperator(parseAvailOperator(threshold4DefaultMap.keySet().iterator().next()));
                // t_defaultRule.setValue(threshold4DefaultMap.values().iterator().next());
                // t_defaultRule.setValueType(DataType.NUMBER.getId());
                // t_defaultRule.setOperatorRel(OperatorRel.OR);
                // t_defaultSubGroup.addRule(t_defaultRule);
                // if (t_frequencyId == null) {
                // t_frequencyId = parseFreqPerf2Avail(t_policyMetric.getFrequencyId());
                // }
                // }
            }
        }
        if (t_frequencyId != null) {
            t_defaultSubGroup.setOperatorRel(OperatorRel.AND);
            t_defaultSubGroup.setEnable(true);
            t_defaultGroup.addGroup(t_defaultSubGroup);
            t_defaultGroup.setPolicyId(policyPojo.getId());
            t_defaultGroup.setFrequencyId(t_frequencyId);
            return t_defaultGroup;
        } else {
            S_LOGGER.error("getDefaultResAvailRuleGroup t_frequencyId is null policyId ==" + policyPojo.getId());
            return null;
        }
    }

    /**
     * 判断该子策略指标中是否包含可用性组、性能组
     * 
     * @param PolicyResPojo resPolicy
     * @return 0 不拼接可用性规则组 -- 既不包含可用性组，也不包含性能组;1 拼接可用性规则组 -- 包含可用性组; 2 拼接可用性规则组 -- 包含性能组
     * @throws DAOException
     */
    private Boolean hasAvailPolicy(final PolicyResPojo resPolicy) throws DAOException {
        List<PolicyMetricPojo> policyMetrics = resPolicy.getListPolicyMetricPojo();
        Map<String, String> metricMap = new HashMap<String, String>();
        if (resPolicy.isMain()) {
            return Boolean.TRUE;
        }
        for (PolicyMetricPojo policyMetric : policyMetrics) {
            String metricId = policyMetric.getMetricId();
            MetricBasePojo metricBase = metricBaseDao.doSelectByID(metricId);
            metricMap.put(metricBase.getMetricType(), metricBase.getMetricType());
        }
        if (metricMap.containsKey(MetricType.AVAIL.getId())) {
            return Boolean.TRUE;
        }
        // else if(metricMap.containsKey(MetricType.PERF.getId())){
        // return Boolean.FALSE;
        // }
        else {
            return null;
        }
    }

    /*
     * (non-Javadoc)
     * @see com.riil.base.policy.IResourcePolicyService#getAllSubPolicyBaseInfo(java .lang.String)
     */
    @Override
    public List<PolicyPojo> getAllSubPolicyBaseInfo(final String mainPolicyId) throws ServiceException {
        Assert.notNull(mainPolicyId);
        String originalId = mainPolicyId;
        PolicyPojo t_policyPojo = getPolicyBaseInfo(mainPolicyId);
        if (t_policyPojo != null)// add by maochuyang at 2011.11.12
        {
            if (StringUtils.isNotBlank(t_policyPojo.getOriginalPolicyId())) {
                originalId = t_policyPojo.getOriginalPolicyId();
            }
            try {
                return m_baseInfoDAO.doSelectNewVersionSubPolicyBaseInfo(originalId);
            } catch (DAOException t_e) {
                throw new ServiceException(t_e);
            }
        } else {
            S_LOGGER.error("main policy not found, mainPolicyId=" + mainPolicyId);
            return new ArrayList<PolicyPojo>();
        }
    }

    @Override
    public List<PolicyPojo> getSubPolicyBaseInfoByPolicyTypeAll(final String policyType, final List<String> domainIds)
        throws ServiceException {
        Assert.notNull(policyType);
        try {
            Map<String, Object> t_param = new HashMap<String, Object>();
            t_param.put("policyType", policyType);
            t_param.put("domainIds", domainIds);
            return m_baseInfoDAO.doSelectNewVersionSubPolicyByPolicyTypeAll(t_param);
        } catch (DAOException t_e) {
            throw new ServiceException(t_e);
        }
    }

    /*
     * (non-Javadoc)
     * @see com.riil.base.policy.IResourcePolicyService#getAllNewVersionSubPolicyIds (java.lang.String)
     */
    @Override
    public List<String> getAllNewVersionSubPolicyIds(final String mainPolicyId) throws ServiceException {
        Assert.notNull(mainPolicyId);
        List<String> t_policyIds = null;
        List<PolicyPojo> t_subPolicyPojos = getAllSubPolicyBaseInfo(mainPolicyId);
        if (t_subPolicyPojos != null && !t_subPolicyPojos.isEmpty()) {
            t_policyIds = new ArrayList<String>();
            for (PolicyPojo t_subPolicyPojo : t_subPolicyPojos) {
                t_policyIds.add(t_subPolicyPojo.getId());
            }
        }
        return t_policyIds;
    }

    /*
     * (non-Javadoc)
     * @see com.riil.admin.policy.service.IResourcePolicyService#
     * getPolicyMetricsWithThresholdByPolicyId(java.lang.String)
     */
    @Override
    public List<PolicyMetricPojo> getPolicyMetricsWithThresholdByPolicyId(final String policyId)
        throws ServiceException {
        try {
            return m_metricDAO.doSelectMetricWithThresholdByPolicyId(policyId);
        } catch (DAOException t_e) {
            throw new ServiceException(t_e);
        }
    }

    /*
     * (non-Javadoc)
     * @see com.riil.admin.policy.service.IResourcePolicyService#
     * getPolicyMetricsWithOutThresholdByPolicyId(java.lang.String)
     */
    @Override
    public List<PolicyMetricPojo> getPolicyMetricsWithOutThresholdByPolicyId(final String policyId)
        throws ServiceException {
        try {
            return m_metricDAO.doSelectMetricWithOutThresholdByPolicyId(policyId);
        } catch (DAOException t_e) {
            throw new ServiceException(t_e);
        }
    }

    @Override
    public String modifyPolicyMetric(final String policyId, final String userId,
        final List<PolicyMetricPojo> policyMetricPojos) throws ServiceException {
        Assert.notNull(policyId);
        Assert.notNull(policyMetricPojos);
        try {
            m_metricDAO.doUpdateMetric(policyId, policyMetricPojos);// 改为单独更新阈值
            return policyId;
        } catch (DAOException t_e) {
            throw new ServiceException(t_e);
        }
    }

    @Override
    public String modifyPolicyThreshold(final String policyId, final String userId, final String metricId,
        final List<PolicyThresholdPojo> policyThresholdPojos) throws ServiceException {
        Assert.notNull(policyId);
        Assert.notNull(policyThresholdPojos);
        if (policyThresholdPojos.size() == 0) {
            return policyId;
        }
        try {
            m_thresholdDAO.doDeleteThresholdByPolicyIdMetricId(policyId, metricId);
            m_thresholdDAO.doBatchInsertThreshold(policyId, metricId, policyThresholdPojos);
            return policyId;
        } catch (DAOException t_e) {
            throw new ServiceException(t_e);
        }
    }

    @Override
    public String modifyPolicyThreshold(final String policyId, final String userId,
        final Map<String, List<PolicyThresholdPojo>> policyThresholdMap) throws ServiceException {
        Assert.notNull(policyId);
        Assert.notNull(policyThresholdMap);
        if (policyThresholdMap.size() == 0) {
            return policyId;
        }
        try {
            for (Entry<String, List<PolicyThresholdPojo>> entry : policyThresholdMap.entrySet()) {
                String metricId = entry.getKey();
                List<PolicyThresholdPojo> policyThresholdPojos = entry.getValue();
                m_thresholdDAO.doDeleteThresholdByPolicyIdMetricId(policyId, metricId);
                m_thresholdDAO.doBatchInsertThreshold(policyId, metricId, policyThresholdPojos);
            }
            return policyId;
        } catch (DAOException t_e) {
            throw new ServiceException(t_e);
        }
    }

    /*
     * (non-Javadoc)
     * @see com.riil.admin.policy.service.PolicyBaseService#getPolicyByPolicyId(java .lang.String)
     */
    @Override
    public PolicyPojo getPolicyByPolicyId(final String policyId) throws ServiceException {
        PolicyPojo t_policyPojo = super.getPolicyFromDB(policyId);
        if (null == t_policyPojo) {
            return t_policyPojo;
        }
        PolicyResPojo t_policyResPojo = new PolicyResPojo();
        BeanUtils.copyProperties(t_policyPojo, t_policyResPojo);
        t_policyResPojo.setListPolicyMetricPojo(getPolicyMetricsWithThresholdByPolicyId(policyId));
        try {
            t_policyResPojo.setListPolicyActionPojo(m_policyActionDAO.doSelectByPolicyId(policyId));
            t_policyResPojo.setResAvailRuleGroup(m_policyResAvailRuleGroupDAO.doSelectByPolicyId(policyId));
        } catch (DAOException e) {
            throw new ServiceException(e);
        }

        return t_policyResPojo;
    }

    /*
     * (non-Javadoc)
     * @see com.riil.admin.policy.service.PolicyBaseService#modifyPolicyIdByOriPolicyId (java.lang.String,
     * java.lang.String)
     */
    @Override
    protected void modifyPolicyIdByOriPolicyId(final String newPolicyId, final String oriPolicyId)
        throws ServiceException {
        super.modifyPolicyIdByOriPolicyId(newPolicyId, oriPolicyId);
        try {
            m_metricDAO.doUpdatePolicyIdByOriPolicyId(newPolicyId, oriPolicyId);
            m_policyActionDAO.doUpdatePolicyIdByOriPolicyId(newPolicyId, oriPolicyId);
            m_policyResAvailRuleGroupDAO.doUpdatePolicyIdByOriPolicyId(newPolicyId, oriPolicyId);
        } catch (DAOException t_e) {
            throw new ServiceException(t_e);
        }
    }

    /*
     * (non-Javadoc)
     * @see com.riil.admin.policy.service.PolicyBaseService#removePolicyByPolicyId (java.lang.String)
     */
    @Override
    public List<String> removePolicyByPolicyId(final String policyId) throws ServiceException {
        List<String> t_policyIds = super.removePolicyByPolicyId(policyId);
        try {
            m_metricDAO.doDeleteMetricByPolicyIds(t_policyIds);
            m_policyActionDAO.doDeleteByPolicyIds(t_policyIds);
            m_policyResAvailRuleGroupDAO.doDeleteByPolicyIds(t_policyIds);
            return t_policyIds;
        } catch (DAOException t_e) {
            throw new ServiceException(t_e);
        }
    }

    /*
     * (non-Javadoc)
     * @see com.riil.admin.policy.service.PolicyBaseService#removePolicyByPolicyIds (java.util.List)
     */
    @Override
    public List<String> removePolicyByPolicyIds(final List<String> policyIds) throws ServiceException {
        List<String> t_policyIdList = super.removePolicyByPolicyIds(policyIds);
        try {
            m_metricDAO.doDeleteMetricByPolicyIds(t_policyIdList);
            m_policyActionDAO.doDeleteByPolicyIds(t_policyIdList);
            m_policyResAvailRuleGroupDAO.doDeleteByPolicyIds(t_policyIdList);
            return t_policyIdList;
        } catch (DAOException t_e) {
            throw new ServiceException(t_e);
        }
    }

    /**
     * 策略对象组装.
     * 
     * @param oriPolicyPojo 默认策略独享
     * @param newPolicyPojo 新对象
     * @param isMain 是否主策略
     * @throws AssertException 异常
     */
    protected void assembleNewPolicy(final PolicyPojo oriPolicyPojo, final PolicyPojo newPolicyPojo, final byte isMain)
        throws AssertException {
        assembleNewPolicy(oriPolicyPojo);
        oriPolicyPojo.setIsMain(isMain);
        oriPolicyPojo.setName(newPolicyPojo.getName());
        oriPolicyPojo.setDesc(newPolicyPojo.getDesc());
        oriPolicyPojo.setCreateUser(newPolicyPojo.getCreateUser());
        oriPolicyPojo.setPolicyType(newPolicyPojo.getPolicyType());
        oriPolicyPojo.setUserDomainId(newPolicyPojo.getUserDomainId());
        oriPolicyPojo.setMainPolicyId(newPolicyPojo.getMainPolicyId());
        if (newPolicyPojo instanceof PolicyResPojo && oriPolicyPojo instanceof PolicyResPojo) {
            ((PolicyResPojo) oriPolicyPojo)
                .setResAvailRuleGroup(((PolicyResPojo) newPolicyPojo).getResAvailRuleGroup());
        }
        List<PolicyMetricPojo> t_metricPojos = ((PolicyResPojo) oriPolicyPojo).getListPolicyMetricPojo();
        for (PolicyMetricPojo t_policyMetricPojo : t_metricPojos) {
            t_policyMetricPojo.setId(null);
            List<PolicyThresholdPojo> t_thresholdPojos = t_policyMetricPojo.getListPolicyThresholdPojo();
            if (t_thresholdPojos != null) {
                for (PolicyThresholdPojo t_policyThresholdPojo : t_thresholdPojos) {
                    t_policyThresholdPojo.setId(null);
                }
            }
        }
    }

    /*
     * (non-Javadoc)
     * @see com.riil.admin.policy.service.IResourcePolicyService# getSubInstInMonitorMetric(java.lang.String,
     * java.lang.String)
     */
    @Override
    public List<MetricBasePojo> getSubInstInMonitorMetric(final String mainInstId, final String subTempId)
        throws ServiceException {
        Assert.notNull(mainInstId);
        Assert.notNull(subTempId);
        try {
            return m_metricDAO.getSubInstInMonitorMetric(mainInstId, subTempId);
        } catch (DAOException t_e) {
            throw new ServiceException(t_e);
        }
    }

    @Override
    public List<MetricBasePojo> getSubInstInMonitorMetricBySubInstId(final String subInstId) throws ServiceException {
        Assert.notNull(subInstId);
        try {
            return m_metricDAO.getSubInstInMonitorMetricBySubInstId(subInstId);
        } catch (DAOException t_e) {
            throw new ServiceException(t_e);
        }
    }

    /*
     * (non-Javadoc)
     * @see com.riil.admin.policy.service.IResourcePolicyService# getMainInstInMonitorMetric(java.lang.String)
     */
    @Override
    public List<MetricBasePojo> getMainInstInMonitorMetric(final String mainInstId) throws ServiceException {
        Assert.notNull(mainInstId);
        try {
            return m_metricDAO.getMainInstInMonitorMetric(mainInstId);
        } catch (DAOException t_e) {
            throw new ServiceException(t_e);
        }
    }

    /*
     * (non-Javadoc)
     * @see com.riil.admin.policy.service.IResourcePolicyService# getMainInstInMonitorMetric(java.lang.String,
     * com.riil.base.pojo.enums.EnumRoot.MetricType)
     */
    @Override
    public List<MetricBasePojo> getMainInstInMonitorMetric(final String mainInstId, final MetricType metricType)
        throws ServiceException {
        Assert.notNull(mainInstId);
        Assert.notNull(metricType);
        try {
            return m_metricDAO.getMainInstInMonitorMetric(mainInstId, metricType.getId());
        } catch (DAOException t_e) {
            throw new ServiceException(t_e);
        }
    }

    /*
     * (non-Javadoc)
     * @see com.riil.admin.policy.service.IResourcePolicyService# getMainInstInMonitorMetricIds(java.lang.String)
     */
    @Override
    public List<String> getMainInstInMonitorMetricIds(final String mainInstId) throws ServiceException {
        List<MetricBasePojo> t_metricBasePojos = getMainInstInMonitorMetric(mainInstId);
        List<String> t_metricId = null;
        if (t_metricBasePojos != null && !t_metricBasePojos.isEmpty()) {
            t_metricId = new ArrayList<String>();
            for (MetricBasePojo metricBasePojo : t_metricBasePojos) {
                t_metricId.add(metricBasePojo.getId());
            }
        }
        return t_metricId;
    }

    /*
     * (non-Javadoc)
     * @see com.riil.admin.policy.service.IResourcePolicyService#getSubInstMetric (java.lang.String, java.lang.String,
     * java.util.List)
     */
    @Override
    public List<MetricBasePojo> getSubInstMetric(final String mainInstId, final String modelId,
        final List<String> metricTypeIds) throws ServiceException {
        Assert.notNull(mainInstId);
        Assert.notNull(modelId);
        try {
            return m_metricDAO.doSelectSubInstMetric(mainInstId, modelId, metricTypeIds);
        } catch (DAOException t_e) {
            throw new ServiceException(t_e);
        }
    }

    /**
     * 获取推荐阈值，参照一周内的数据统计阈值<br>
     * 参数： 策略id、模型id、指标id 、metric_status = RED OR YELLOW、 时间段
     * 
     * @param policyId 策略id
     * @param modelid 模型id
     * @param metricId 指标id
     * @param status 指标状态
     * @param startTime 【可空】开始时间 HH:mi:ss
     * @param endTime 【可空】 结束时间 HH:mi:ss
     * @return
     * @throws ServiceException
     */
    @Override
    public double getRecommendThreshold(final String policyId, final String modelId, final String metricId,
        final Status4Metric status, final String startTime, final String endTime) throws ServiceException {
        Assert.notNull(policyId);
        Assert.notNull(metricId);
        Assert.notNull(status);
        try {
            // 从当前策略获取阈值
            List<PolicyThresholdPojo> thresholdList =
                m_thresholdDAO.doSelectThresholdByPolicyIdMetricId(policyId, metricId);
            Double thresholdOriginal = getThreshold4Default(thresholdList, metricId, status);
            String thresholdExp = getThresholdExpDefault(thresholdList, metricId, status);
            Double thresholdRet = null;
            Double thresholdDefault = null;
            // 根据模型id取出厂默认策略,再取阈值
            PolicyPojo t_policy = getPolicyByModelId(modelId, true);
            if (t_policy != null) {
                PolicyResPojo t_resPolicy = (PolicyResPojo) t_policy;
                List<PolicyMetricPojo> t_metricList = t_resPolicy.getListPolicyMetricPojo();
                for (PolicyMetricPojo t_policyMetricPojo : t_metricList) {
                    if (metricId.equalsIgnoreCase(t_policyMetricPojo.getMetricId())) {
                        thresholdList = t_policyMetricPojo.getListPolicyThresholdPojo();
                        break;
                    }
                }
                thresholdDefault = getThreshold4Default(thresholdList, metricId, status);
            }

            if (StringUtils.isBlank(thresholdExp)) {// 当前策略阈值为空，取default
                thresholdExp = getThresholdExpDefault(thresholdList, metricId, status);
            }
            if (StringUtils.isNotBlank(thresholdExp)) {
                thresholdRet =
                    m_metricDAO.getRecommendThreshold(policyId, metricId, status, startTime, endTime, thresholdExp);
            } else {
                // 从历史数据 计算 推荐阈值
                thresholdRet = m_metricDAO.getRecommendThreshold(policyId, metricId, status, startTime, endTime);
            }
            if (thresholdRet != null && thresholdRet >= 0) {
                return thresholdRet;
            }
            if (thresholdDefault != null && thresholdDefault >= 0) {
                return thresholdDefault;
            }
            if (thresholdOriginal != null && thresholdOriginal >= 0) {
                return thresholdOriginal;
            }

            return thresholdRet;

        } catch (DAOException t_e) {
            throw new ServiceException(t_e);
        }
    }

    public double getRecommendThresholdBak(final String policyId, final String modelId, final String metricId,
        final Status4Metric status, final String startTime, final String endTime) throws ServiceException {
        Assert.notNull(policyId);
        Assert.notNull(metricId);
        Assert.notNull(status);
        try {
            // 从历史数据 计算 推荐阈值
            Double threshold = m_metricDAO.getRecommendThreshold(policyId, metricId, status, startTime, endTime);
            if (threshold != null && threshold > 0) {
                return threshold;
            }
            // 从缺省策略获取阈值
            // TODO 根据策略id取默认策略,再取阈值
            PolicyResPojo policy = (PolicyResPojo) getDefaultPolicyByModelId(modelId);
            List<PolicyThresholdPojo> thresholdList =
                policy.getPolicyMetricPojoByMetricId(metricId).getListPolicyThresholdPojo();
            threshold = getThreshold4Default(thresholdList, metricId, status);
            if (threshold != null && threshold > 0) {
                return threshold;
            }
            thresholdList = m_thresholdDAO.doSelectThresholdByPolicyIdMetricId(policyId, metricId);
            threshold = getThreshold4Default(thresholdList, metricId, status);
            return threshold;
        } catch (DAOException t_e) {
            throw new ServiceException(t_e);
        }
    }

    public Map<Operator4Number, String> getThreshold4DefaultMap(final List<PolicyThresholdPojo> thresholdList,
        final String metricId, final Status4Metric status) throws ServiceException {
        Map<Operator4Number, String> defaultThresholdMap = new HashMap<Operator4Number, String>();
        if (thresholdList == null) {
            defaultThresholdMap.put(Operator4Number.EQUAL, String.valueOf((Status4Avail.UNKNOWN.getId4Int())));
            return defaultThresholdMap;
        }
        String exp = null;
        for (PolicyThresholdPojo t_threshold : thresholdList) {
            switch (status) {
                case RED:
                    exp = t_threshold.getExp1();
                    break;
                case YELLOW:
                    exp = t_threshold.getExp2();
                    break;
                case GREEN:
                    exp = t_threshold.getExp3();
                    break;
                default:
                    break;
            }
            if (exp != null) {
                String num = "";
                String sign = "";
                String regexNum = "[\\d.]+";// "\\d+";
                Pattern pNum = Pattern.compile(regexNum);
                Matcher mNum = pNum.matcher(exp);
                while (mNum.find()) {
                    num = mNum.group();
                    break;
                }

                String regexSign = "[^\\d.]+";// "\\d+";
                Pattern pSign = Pattern.compile(regexSign);
                Matcher mSign = pSign.matcher(exp);
                while (mSign.find()) {
                    sign = mSign.group();
                    break;
                }
                defaultThresholdMap.put(getOperator(sign), num);
                return defaultThresholdMap;
            }
        }
        defaultThresholdMap.put(Operator4Number.EQUAL, String.valueOf((Status4Avail.UNKNOWN.getId4Int())));
        return defaultThresholdMap;
    }

    private Operator4Number parseAvailOperator(Operator4Number operator) {
        switch (operator) {
            case GREATE_THAN:
                return Operator4Number.LESS_THAN;
            case GREAT_EQUAL:
                return Operator4Number.LESS_THAN;
            case LESS_EQUAL:
                return Operator4Number.GREATE_THAN;
            case LESS_THAN:
                return Operator4Number.GREATE_THAN;
            default:
                return Operator4Number.EQUAL;
        }
    }

    private Operator4Number getOperator(final String operator) {
        Operator4Number t_operator4Number = null;
        if (">".equals(operator)) {
            t_operator4Number = Operator4Number.GREATE_THAN;
        } else if ("=".equals(operator)) {
            t_operator4Number = Operator4Number.EQUAL;
        } else if ("<".equals(operator)) {
            t_operator4Number = Operator4Number.LESS_THAN;
        } else if ("".equals(operator)) {
            t_operator4Number = Operator4Number.EQUAL;
        }
        return t_operator4Number;
    }

    public double getThreshold4Default(final List<PolicyThresholdPojo> thresholdList, final String metricId,
        final Status4Metric status) throws ServiceException {
        if (thresholdList == null) {
            return Status4Avail.UNKNOWN.getId4Int();
        }
        String exp = null;
        for (PolicyThresholdPojo t_threshold : thresholdList) {
            switch (status) {
                case RED:
                    exp = t_threshold.getExp1();
                    break;
                case YELLOW:
                    exp = t_threshold.getExp2();
                    break;
                case GREEN:
                    exp = t_threshold.getExp3();
                    break;
                default:
                    break;
            }
            if (exp != null) {
                String regex = "[\\d.]+";// "\\d+";
                Pattern p = Pattern.compile(regex);
                Matcher m = p.matcher(exp);
                while (m.find()) {
                    exp = m.group();
                    break;
                }
                return Double.parseDouble(exp);
            }
        }

        return Status4Avail.UNKNOWN.getId4Int();
    }

    public String getThresholdExpDefault(final List<PolicyThresholdPojo> thresholdList, final String metricId,
        final Status4Metric status) throws ServiceException {
        if (thresholdList == null) {
            return "";
        }
        String exp = null;
        for (PolicyThresholdPojo t_threshold : thresholdList) {
            switch (status) {
                case RED:
                    exp = t_threshold.getExp1();
                    break;
                case YELLOW:
                    exp = t_threshold.getExp2();
                    break;
                case GREEN:
                    exp = t_threshold.getExp3();
                    break;
                default:
                    break;
            }
            if (exp != null) {
                return exp;
            }
        }
        return "";
    }

    public void setThresholdDAO(final PolicyThresholdDAO thresholdDAO) {
        m_thresholdDAO = thresholdDAO;
    }

    @Override
    public List<PolicyThresholdPojo> getPolicyThresholdByPolicyId(final String policyId) throws ServiceException {
        Assert.notNull(policyId);
        try {
            return m_thresholdDAO.doSelectThresholdByPolicyId(policyId);
        } catch (DAOException t_e) {
            throw new ServiceException(t_e);
        }
    }

    @Override
    public List<PolicyThresholdPojo> getPolicyThresholdByPolicyIdMetricId(final String policyId, final String metricId)
        throws ServiceException {
        Assert.notNull(policyId);
        Assert.notNull(metricId);
        try {
            return m_thresholdDAO.doSelectThresholdByPolicyIdMetricId(policyId, metricId);
        } catch (DAOException t_e) {
            throw new ServiceException(t_e);
        }
    }

    @Override
    public PolicyThresholdPojo getPolicyThresholdByPolicyIdMetricId4CurrentTime(final String policyId,
        final String metricId) throws ServiceException {
        List<PolicyThresholdPojo> t_thresholdList = getPolicyThresholdByPolicyIdMetricId(policyId, metricId);
        Date t_date = new Date();
        boolean flag = false;
        PolicyThresholdPojo t_threasholdPojo = new PolicyThresholdPojo();
        PolicyThresholdPojo t_defaultThreashold = null;
        if (t_thresholdList.size() == 1) {
            t_threasholdPojo = t_thresholdList.get(0);
        } else {
            for (PolicyThresholdPojo t_threshold : t_thresholdList) {
                if (DayOrWeek.COMMON.getId().equals(t_threshold.getDayOrWeek())) {
                    t_defaultThreashold = new PolicyThresholdPojo();
                    t_defaultThreashold = t_threshold;
                } else if (t_threshold.isMatchDateTime(t_date)) {
                    flag = true;
                    t_threasholdPojo = t_threshold;
                    break;
                }
            }
        }

        if (!flag && t_defaultThreashold != null) {
            t_threasholdPojo = t_defaultThreashold;
        }

        return t_threasholdPojo;
    }

    public void setPolicyActionDAO(final PolicyActionDAO policyActionDAO) {
        m_policyActionDAO = policyActionDAO;
    }

    public PolicyActionDAO getPolicyActionDAO() {
        return m_policyActionDAO;
    }

    /*
     * (non-Javadoc)
     * @see com.riil.admin.policy.IMoniPolicyActionService#createMoniPolicyAction
     * (com.riil.admin.policy.pojo.MoniPolicyActionPojo)
     */
    @Override
    public String createAction(final String userId, final PolicyActionPojo actionPojo) throws ServiceException {
        Assert.notNull(actionPojo);
        Assert.notNull(actionPojo.getPolicyId());
        try {
            this.m_policyActionDAO.doInsertPojo(actionPojo);
            return actionPojo.getPolicyId();
        } catch (DAOException te) {
            throw new ServiceException(te);
        }

    }

    /*
     * (non-Javadoc)
     * @see com.riil.admin.policy.IMoniPolicyActionService#modifyMoniPolicyAction
     * (com.riil.admin.policy.pojo.MoniPolicyActionPojo)
     */
    @Override
    public String modifyAction(final String userId, final PolicyActionPojo actionPojo) throws ServiceException {
        Assert.notNull(actionPojo);
        Assert.notNull(actionPojo.getPolicyId());
        try {
            this.m_policyActionDAO.doUpdatePojo(actionPojo);
            return actionPojo.getPolicyId();
        } catch (DAOException te) {
            throw new ServiceException(te);
        }

    }

    /*
     * (non-Javadoc)
     * @see com.riil.admin.policy.IMoniPolicyActionService#removeMoniPolicyAction (java.lang.String)
     */
    @Override
    public String removeAction(final String policyId, final String userId, final String actionName)
        throws ServiceException {
        Assert.notNull(userId);
        Assert.notNull(policyId);
        Assert.notNull(actionName);
        try {
            this.m_policyActionDAO.doDeleteByName(policyId, actionName);
            return policyId;
        } catch (DAOException te) {
            throw new ServiceException(te);
        }

    }

    /*
     * (non-Javadoc)
     * @see com.riil.admin.policy.IMoniPolicyActionService#getMoniPolicyActionByID (java.lang.String)
     */
    @Override
    public PolicyActionPojo getActionByID(final String actionID) throws ServiceException {
        try {
            return this.m_policyActionDAO.doSelectByID(actionID);
        } catch (DAOException te) {
            throw new ServiceException(te);
        }

    }

    @Override
    public List<PolicyActionPojo> getActionByPolicyId(final String policyId) throws ServiceException {
        try {
            return this.m_policyActionDAO.doSelectByPolicyId(policyId);
        } catch (DAOException te) {
            throw new ServiceException(te);
        }
    }

    /*
     * (non-Javadoc)
     * @see com.riil.admin.policy.service.IPolicyActionService#setActiondDefineState (java.lang.String, java.util.List)
     */
    @Override
    public String setActiondDefineState(final String policyId, final String userId, final String inUse,
        final List<String> actionNames) throws ServiceException {

        Assert.notNull(userId);
        Assert.notNull(policyId);
        Assert.notNull(actionNames);
        try {
            this.m_policyActionDAO.setActiondDefineState(policyId, actionNames, inUse);
            return policyId;
        } catch (DAOException te) {
            throw new ServiceException(te);
        }

    }

    @Override
    public String removeActionds(final String policyId, final String userId, final List<String> actionNames)
        throws ServiceException {

        Assert.notNull(userId);
        Assert.notNull(policyId);
        Assert.notNull(actionNames);
        try {
            this.m_policyActionDAO.doBatchDelete(policyId, actionNames);
            return policyId;
        } catch (DAOException te) {
            throw new ServiceException(te);
        }
    }

    @Override
    public boolean isExisActionName(final String policyId, final String actionId, final String actionName)
        throws ServiceException {
        try {
            if (actionName == null || actionName.trim().equals("")) {
                return false;
            }
            PolicyActionPojo t_param = new PolicyActionPojo();
            t_param.setActionName(actionName);
            t_param.setId(actionId);
            t_param.setPolicyId(policyId);
            if (this.m_policyActionDAO.doSelectByName(t_param) > 0) {
                return true;
            } else {
                return false;
            }
        } catch (DAOException t_e) {
            throw new ServiceException(t_e);
        }
    }

    // public void updateIsManaged(final List<String> resIds, final byte
    // isManaged) throws ServiceException {
    // if (null == resIds || resIds.size() == 0) {
    // return;
    // }
    // IResChangeService t_changeService;
    // try {
    // t_changeService =
    // ServiceContainer.getInstance().getServiceComponent(IResChangeService.S_SERVICE_ID);
    // } catch (ContainerException e) {
    // throw new ServiceException(e);
    // }
    // t_changeService.notifyListeners4IsManagedChange(resIds, isManaged);
    // }

    @Override
    public List<String> policyPublish(final String userId, final List<String> policyIds) throws ServiceException {
        List<String> t_publishPolicyIds = super.policyPublish(userId, policyIds);
        if (null == t_publishPolicyIds || t_publishPolicyIds.size() == 0) {
            return null;
        }

        // List<String> resIds = getResIdsByPolicyIds(t_publishPolicyIds);
        // updateIsManaged(resIds, (byte) 1);
        return t_publishPolicyIds;
    }

    @Override
    public List<String> policyStop(final List<String> policyIds) throws ServiceException {
        List<String> t_publishPolicyIds = super.policyStop(policyIds);
        if (null == t_publishPolicyIds || t_publishPolicyIds.size() == 0) {
            return null;
        }

        // List<String> resIds = getResIdsByPolicyIds(t_publishPolicyIds);
        // updateIsManaged(resIds, (byte) -1);
        return t_publishPolicyIds;
    }

    public List<String> getResIdsByPolicyIds(final List<String> policyIds) throws ServiceException {
        try {
            return m_resRelDAO.doSelectResIdsByPolicyIds(policyIds);
        } catch (DAOException t_e) {
            throw new ServiceException(t_e);
        }
    }

    /*
     * (non-Javadoc)
     * @see com.riil.base.policy.impl.PolicyService#getPolicyByModelId(java.lang.String, boolean)
     */
    @Override
    public PolicyPojo getPolicyByModelId(final String modelId, final boolean isFactory) throws ServiceException {
        try {
            PolicyPojo t_policy = super.getPolicyByModelId(modelId, isFactory);
            if (isFactory && t_policy != null) {
                if (t_policy instanceof PolicyResPojo && t_policy.isMain()) {
                    PolicyResPojo t_resPolicy = (PolicyResPojo) t_policy;
                    ResAvailRuleGroup t_group = getDefaultResAvailRuleGroup(t_resPolicy);
                    t_resPolicy.setResAvailRuleGroup(t_group);
                }
            }
            return t_policy;
        } catch (DAOException t_e) {
            throw new ServiceException(t_e);
        }
    }

    public IResInstBaseService getResInstBaseService() {
        return m_resInstBaseService;
    }

    @Override
    public void setResInstBaseService(final IResInstBaseService resInstBaseService) {
        m_resInstBaseService = resInstBaseService;
    }

    @Override
    public Map<String, Boolean> getMetricType4Inuse(final String policyId) throws ServiceException {
        try {
            return m_metricDAO.getMetricType4Inuse(policyId);
        } catch (DAOException t_e) {
            throw new ServiceException(t_e);
        }
    }

    @Override
    public int createCustomMetric(final List<MetricBasePojo> metricBasePojos) throws ServiceException {
        try {
            return metricBaseDao.doInsertPojo(metricBasePojos);
        } catch (DAOException t_e) {
            throw new ServiceException(t_e);
        }
    }

    @Override
    public int deleteCustomMetric(final List<String> metricBaseIds) throws ServiceException {
        try {
            return metricBaseDao.doDeleteByIDs(metricBaseIds);
        } catch (DAOException t_e) {
            throw new ServiceException(t_e);
        }
    }
    
    @Override
    public void modifyCustomMetric(final List<MetricBasePojo> metricBasePojos) throws ServiceException
    {
        try {
            metricBaseDao.doUpdatePojo(metricBasePojos);
        } catch (DAOException t_e) {
            throw new ServiceException(t_e);
        }
    }
    
    @Override
    public void createPolicyMetric(final String policyId,
        final List<PolicyMetricPojo> policyMetricPojos) throws ServiceException {
        Assert.notNull(policyId);
        Assert.notNull(policyMetricPojos);
        try {
            m_metricDAO.doBatchInsertMetric(policyId, policyMetricPojos);
        } catch (DAOException t_e) {
            throw new ServiceException(t_e);
        }
    }
    
    @Override
    public void deletePolicyMetric(final List<PolicyMetricPojo> policyMetricPojos)  throws ServiceException
    {
        try {
            
            for (PolicyMetricPojo t_policyMetric : policyMetricPojos) {
                m_thresholdDAO.doDeleteThresholdByPolicyIdMetricId(t_policyMetric.getPolicyId(), t_policyMetric.getId());
                m_metricDAO.doDeleteByID(t_policyMetric.getId());
            }
        } catch (DAOException t_e) {
            throw new ServiceException(t_e);
        }
    }

    public void setResTypeSrv(IResTypeService resTypeSrv) {
        m_resTypeSrv = resTypeSrv;
    }

    /**
     * @return policyResAvailRuleGroupDAO - {return content description}
     */
    public PolicyResAvailRuleGroupDAO getPolicyResAvailRuleGroupDAO() {
        return m_policyResAvailRuleGroupDAO;
    }

    /**
     * @param policyResAvailRuleGroupDAO - {parameter description}.
     */
    public void setPolicyResAvailRuleGroupDAO(final PolicyResAvailRuleGroupDAO policyResAvailRuleGroupDAO) {
        m_policyResAvailRuleGroupDAO = policyResAvailRuleGroupDAO;
    }

    /**
     * @param metricBaseDao - {parameter description}.
     */
    public void setMetricBaseDao(final MetricBaseDao metricBaseDao) {
        this.metricBaseDao = metricBaseDao;
    }

    public MetricBaseDao getMetricBaseDao() {
        return metricBaseDao;
    }
}
