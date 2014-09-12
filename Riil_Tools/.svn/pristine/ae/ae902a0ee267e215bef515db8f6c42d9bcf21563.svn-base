package com.riil.base.policy.impl;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;

import com.riil.base.pojo.enums.Enum4Metric;
import com.riil.base.pojo.enums.Enum4Metric.MetricId4Common;
import com.riil.base.pojo.enums.Enum4Metric.Status4Avail;
import com.riil.base.pojo.enums.Enum4Metric.Status4Metric;
import com.riil.base.policy.IRecThresholdService;
import com.riil.base.policy.IResourcePolicyService;
import com.riil.base.policy.impl.dao.PolicyThresholdDAO;
import com.riil.base.policy.impl.dao.RecThresholdDao;
import com.riil.base.resmodel.pojo.policy.PolicyThresholdPojo;
import com.riil.base.resmodel.pojo.policy.RecommandThresholdPojo;
import com.riil.base.resmodel.pojo.policy.RecommandThresholdQueryParm;
import com.riil.core.commons.Assert;
import com.riil.core.container.ServiceContainer;
import com.riil.core.dao.DAOException;
import com.riil.core.service.AbsService;
import com.riil.core.service.ServiceException;



public class RecThresholdService extends AbsService implements IRecThresholdService{
    
    private RecThresholdDao m_recThresholdDao;

    private PolicyThresholdDAO m_thresholdDAO;

    private IResourcePolicyService m_resourcePolicyService;
    
    public RecThresholdDao getRecThresholdDao() {
        return m_recThresholdDao;
    }
    public void setRecThresholdDao(RecThresholdDao recThresholdDao) {
        m_recThresholdDao = recThresholdDao;
    }

    
    public IResourcePolicyService getResourcePolicyService() {
        return m_resourcePolicyService;
    }
    public void setResourcePolicyService(
            IResourcePolicyService resourcePolicyService) {
        m_resourcePolicyService = resourcePolicyService;
    }
    
    public PolicyThresholdDAO getThresholdDAO() {
        return m_thresholdDAO;
    }

    public void setThresholdDAO(PolicyThresholdDAO thresholdDAO) {
        m_thresholdDAO = thresholdDAO;
    }

    @Override
    public List<RecommandThresholdPojo> getRecCommThresholdList(
        final RecommandThresholdQueryParm recThresholdParm) throws ServiceException {
        try {
            return m_recThresholdDao.getRecThresholdByCondition(recThresholdParm);
        } catch (DAOException t_e) {
            throw new ServiceException(t_e);
        }
    }

    @Override
    public Map<String, Map<Status4Metric, Object>> getRecommandThreshold(
        final RecommandThresholdQueryParm recThresholdParm)
        throws ServiceException {
        String t_policyId = recThresholdParm.getPolicyId();
        String t_metricId = recThresholdParm.getMetricId();
        Status4Metric t_status = recThresholdParm.getStatus();

        Assert.notNull(t_policyId);
        Assert.notNull(t_metricId);
        Assert.notNull(t_status);
        Map<String, Map<Status4Metric, Object>> t_metricThreshold = new HashMap<String, Map<Status4Metric, Object>>();
        Map<Status4Metric, Object> t_recThreshold = new HashMap<Enum4Metric.Status4Metric, Object>();
        try {
            List<PolicyThresholdPojo> thresholdList =
                m_thresholdDAO.doSelectThresholdByPolicyIdMetricId(t_policyId, t_metricId);
            Double t_redThresholdValue = getThreshold4Default(thresholdList, t_metricId, Status4Metric.RED);
            Double t_yelllowThresholdValue = getThreshold4Default(thresholdList, t_metricId, Status4Metric.YELLOW);
            RecommandThresholdQueryParm t_recThresholdParm = new RecommandThresholdQueryParm();
            t_recThresholdParm.setPolicyId(recThresholdParm.getPolicyId());
            t_recThresholdParm.setMetricId(recThresholdParm.getMetricId());
            t_recThresholdParm.setModelId(recThresholdParm.getModelId());
            t_recThresholdParm.setStartTime(recThresholdParm.getStartTime());
            t_recThresholdParm.setEndTime(recThresholdParm.getEndTime());
            t_recThresholdParm.setRed(String.valueOf(t_redThresholdValue));
            t_recThresholdParm.setPercent(recThresholdParm.getPercent());
            t_recThresholdParm.setMetricDate(recThresholdParm.getMetricDate());
            t_recThresholdParm.setMiniCount(recThresholdParm.getMiniCount());

            // 红色阈值计算
            List<RecommandThresholdPojo> t_redRecCommThresholdList = getRecCommThresholdList(t_recThresholdParm);

            double t_redRecValue = t_redThresholdValue;
            if (CollectionUtils.isNotEmpty(t_redRecCommThresholdList)) {
                if(MetricId4Common.Health.getId().equals(recThresholdParm.getMetricId())){
                    t_redRecValue = calculateRecThreshold4Health(t_redRecCommThresholdList, t_recThresholdParm.getPercent());
                }else {
                    t_redRecValue = calculateRecThreshold(t_redRecCommThresholdList, t_recThresholdParm.getPercent());
                }
            }

            // 黄色阈值计算
            t_recThresholdParm.setYellow(String.valueOf(t_yelllowThresholdValue));
            List<RecommandThresholdPojo> t_yellowRecCommThresholdList = getRecCommThresholdList(t_recThresholdParm);
            double t_yellowRecValue = t_yelllowThresholdValue;
            if (CollectionUtils.isNotEmpty(t_yellowRecCommThresholdList)) {
                if(MetricId4Common.Health.getId().equals(recThresholdParm.getMetricId())){
                    t_yellowRecValue = calculateRecThreshold4Health(t_yellowRecCommThresholdList, t_recThresholdParm.getPercent());
                }else {
                    t_yellowRecValue = calculateRecThreshold(t_yellowRecCommThresholdList, t_recThresholdParm.getPercent());
                }
            }
           

            String errorCode = "";

            if (t_redRecCommThresholdList.size() == 0) {
                errorCode = "ERR_THRESHOLD_NO_7_DAY";
            }
            if (t_redRecValue == t_redThresholdValue && StringUtils.isBlank(errorCode)) {
                errorCode = "ERR_THRESHOLD_SAME_VALUE";
            }
            if(t_redRecCommThresholdList.size() < Integer.parseInt(recThresholdParm.getMiniCount())){
                errorCode = "ERR_THRESHOLD_NO_7_DAY";
            }
            if (t_yellowRecCommThresholdList.size() == 0) {
                errorCode = "ERR_THRESHOLD_NO_7_DAY";
            }
            if (t_yellowRecValue == t_yelllowThresholdValue && StringUtils.isBlank(errorCode)) {
                errorCode = "ERR_THRESHOLD_SAME_VALUE";
            }
            if(t_yellowRecCommThresholdList.size() < Integer.parseInt(recThresholdParm.getMiniCount())){
                errorCode = "ERR_THRESHOLD_NO_7_DAY";
            }
            
            if(StringUtils.isNotBlank(errorCode)){
                t_redRecValue = t_redThresholdValue;
                t_yellowRecValue = t_yelllowThresholdValue;
            }
            
            t_recThreshold.put(Status4Metric.RED, t_redRecValue);
            t_recThreshold.put(Status4Metric.YELLOW, t_yellowRecValue);
            t_recThreshold.put(Status4Metric.UNKNOWN, ServiceContainer.getInstance().getErrorText(errorCode));
        } catch (DAOException t_e) {
            throw new ServiceException(t_e);
        }
        t_metricThreshold.put(t_metricId, t_recThreshold);
        return t_metricThreshold;
    }

    /**
     * {method description}.
     */
    private double calculateRecThreshold(final List<RecommandThresholdPojo> recCommThresholdList, final String percent) {
        // 总数量
        int totalSize = recCommThresholdList.size();
        // 调整比例
        double adjust = 1;

        if (StringUtils.isNotBlank(percent)) {
            adjust = Double.parseDouble(percent);
        }
        // 剩余数量
        double remain = totalSize * adjust;
        // 剩余数量四舍五入
        BigDecimal setScale = new BigDecimal(remain).setScale(0, BigDecimal.ROUND_HALF_UP);
        int exact = setScale.intValueExact();
        // 扣除个数
        int deduct = totalSize - exact;
        double t_recThreshold = 0.0;
        if (deduct == recCommThresholdList.size()) {
            t_recThreshold = Double.parseDouble(recCommThresholdList.get(deduct - 1).getMetricValue());
        } else {
            // 剩余部分数据
            List<RecommandThresholdPojo> subLists = recCommThresholdList.subList(deduct, totalSize);
            RecommandThresholdPojo thresholdPojo = subLists.get(0);
            String metricValue = thresholdPojo.getMetricValue();
            t_recThreshold = Math.ceil(Double.parseDouble(metricValue));
        }
        return t_recThreshold;
    }

    /**
     * {method description}.
     * 
     * @param thresholdList
     * @param metricId
     * @param status
     * @return
     * @throws ServiceException
     */
    private double getThreshold4Default(final List<PolicyThresholdPojo> thresholdList, final String metricId,
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
    
    /**
     * {method description}.
     */
    private double calculateRecThreshold4Health(final List<RecommandThresholdPojo> recCommThresholdList, final String percent) {
        // 总数量
        int totalSize = recCommThresholdList.size();
        // 调整比例
        double adjust = 1;

        if (StringUtils.isNotBlank(percent)) {
            adjust = Double.parseDouble(percent);
        }
        // 剩余数量
        double remain = totalSize * adjust;
        // 剩余数量四舍五入
        BigDecimal setScale = new BigDecimal(remain).setScale(0, BigDecimal.ROUND_HALF_UP);
        int exact = setScale.intValueExact();
        // 扣除个数
        int deduct = totalSize - exact;
        double t_recThreshold = 0.0;
        if (deduct == recCommThresholdList.size()) {
            t_recThreshold = Double.parseDouble(recCommThresholdList.get(deduct - 1).getMetricValue());
        } else {
            // 剩余部分数据
            List<RecommandThresholdPojo> subLists = recCommThresholdList.subList(deduct, totalSize);
            RecommandThresholdPojo thresholdPojo = subLists.get(0);
            String metricValue = thresholdPojo.getMetricValue();
            t_recThreshold = Math.ceil(Double.parseDouble(metricValue));
        }
        return t_recThreshold;
    }
}
