package com.riil.base.policy.impl.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;

import com.riil.base.pojo.enums.Enum4Metric.Status4Metric;
import com.riil.base.pojo.enums.EnumRoot.MetricType;
import com.riil.base.resmodel.pojo.base.MetricBasePojo;
import com.riil.base.resmodel.pojo.policy.PolicyMetricPojo;
import com.riil.base.resmodel.pojo.policy.PolicyThresholdPojo;
import com.riil.core.constant.Constants;
import com.riil.core.dam.exception.DBException;
import com.riil.core.dao.BaseDAO;
import com.riil.core.dao.DAOException;

/**
 * 资源策略指标DAO <br>
 * Create on : 2011-10-17<br>
 * <p>
 * </p>
 * <br>
 * 
 * @author liqiang@ruijie.com.cn<br>
 * @version riil.admin.impl v1.0
 *          <p>
 *          <br>
 *          <strong>Modify History:</strong><br>
 *          user modify_date modify_content<br>
 *          -------------------------------------------<br>
 *          <br>
 */
public class PolicyMetricDAO extends BaseDAO<PolicyMetricPojo> {

	private static final String S_SELECT_SUB_METRIC_INMONITOR = "select_sub_metric_inmonitor";

	private static final String S_SELECT_MAIN_METRIC_INMONITOR = "select_main_metric_inmonitor";

	private static final String S_SELECT_MAIN_METRIC_INMONITOR_METRICTYPE = "select_main_metric_inmonitor_metrictype";

	private static final String S_SELECT_SUB_METRIC_BY_METRICTYPE = "select_sub_metric_by_metrictype";

	private static final String S_SELECT_RECOMMEND_THRESHOLD = "select_recommend_threshold";

	private static final String S_SELECT_SUB_METRIC_INMONITOR_BY_SUB_INST_ID = "select_sub_metric_inmonitor_by_sub_inst_id";

	private static final String S_SELECT_METRIC_TYPE_4IN_USE = "select_metric_type_4in_use";

	/**
	 * 批量插入指标.
	 * 
	 * @param policyId 策略ID
	 * @param metricPojos 指标
	 * @throws DAOException DAO层异常
	 */
	public void doBatchInsertMetric(final String policyId, final List<PolicyMetricPojo> metricPojos)
			throws DAOException {
		if (metricPojos == null || metricPojos.isEmpty()) {
			return;
		}
		List<PolicyThresholdPojo> t_rules = new ArrayList<PolicyThresholdPojo>();

		for (PolicyMetricPojo t_metric : metricPojos) {
			t_metric.setPolicyId(policyId);
			List<PolicyThresholdPojo> t_tempList = t_metric.getListPolicyThresholdPojo();
			if (null == t_tempList || t_tempList.isEmpty()) {
				continue;
			}
			for (PolicyThresholdPojo t_thresh : t_tempList) {
				t_thresh.setPolicyId(policyId);
				t_thresh.setMetricId(t_thresh.getMetricId());
			}
			t_rules.addAll(t_tempList);
		}

		try {
//			getDam().insert("batchInsertMetrics", metricPojos);
			for(PolicyMetricPojo metric : metricPojos){
				getDam().insert("insert", metric);
			}
			if (null != t_rules && !t_rules.isEmpty()) {
//				getDam().insert("batchInsertThresholds", t_rules);
				for(PolicyThresholdPojo threshold : t_rules){
					getDam().insert("insertThresholds", threshold);
				}
			}
		} catch (DBException e) {
			throw new DAOException(e);
		}
	}
	
	public void insert(final String policyId, final List<PolicyMetricPojo> metricPojos)
			throws DAOException {
		if (metricPojos == null || metricPojos.isEmpty()) {
			return;
		}
		List<PolicyThresholdPojo> t_rules = new ArrayList<PolicyThresholdPojo>();

		for (PolicyMetricPojo t_metric : metricPojos) {
			t_metric.setPolicyId(policyId);
			List<PolicyThresholdPojo> t_tempList = t_metric.getListPolicyThresholdPojo();
			if (null == t_tempList || t_tempList.isEmpty()) {
				continue;
			}
			for (PolicyThresholdPojo t_thresh : t_tempList) {
				t_thresh.setPolicyId(policyId);
				t_thresh.setMetricId(t_thresh.getMetricId());
			}
			t_rules.addAll(t_tempList);
		}

		try {
			getDam().insert("batchInsertMetrics", metricPojos);
			if (null != t_rules && !t_rules.isEmpty()) {
				 getDam().insert("batchInsertThresholds", t_rules);
			}
		} catch (DBException e) {
			throw new DAOException(e);
		}
	}

	public void doBatchInsertMetric_del(final String policyId, final List<PolicyMetricPojo> metricPojos)
			throws DAOException {
		if (metricPojos != null && !metricPojos.isEmpty()) {
			for (PolicyMetricPojo t_metricPojo : metricPojos) {
				t_metricPojo.setPolicyId(policyId);
				doInsertMetric(t_metricPojo);
			}
		}
	}

	/**
	 * 根据策略ID删除指标.
	 * 
	 * @param policyId 策略ID
	 * @throws DAOException DAO层异常
	 */
	public void doDeleteMetricByPolicyId(final String policyId) throws DAOException {
		try {
			getDam().delete("delete_by_policyId", policyId);
			getDam().delete("deleteThreshold_by_policyId", policyId);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 根据策略ID批量删除指标.
	 * 
	 * @param policyIds 策略ID
	 * @throws DAOException DAO层异常
	 */
	public void doDeleteMetricByPolicyIds(final List<String> policyIds) throws DAOException {
		try {
			getDam().delete("delete_by_policyId_batch", policyIds);
			getDam().delete("deleteThreshold_by_policyId_batch", policyIds);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 单独插入一条指标.
	 * 
	 * @param policyMetricPojo 策略指标
	 * @throws DAOException DAO层异常
	 */
	public void doInsertMetric(final PolicyMetricPojo policyMetricPojo) throws DAOException {
		if (StringUtils.isBlank(policyMetricPojo.getMetricId())) {
			policyMetricPojo.setMetricId(policyMetricPojo.getId());
		}
		doInsertPojo(policyMetricPojo);
		try {
			if (policyMetricPojo.getListPolicyThresholdPojo() != null
					&& !policyMetricPojo.getListPolicyThresholdPojo().isEmpty()) {
//				Map<String, Object> t_param = new HashMap<String, Object>();
//				t_param.put("policyId", policyMetricPojo.getPolicyId());
//				t_param.put("thresholds", policyMetricPojo.getListPolicyThresholdPojo());
//				t_param.put("metricId", policyMetricPojo.getMetricId());
//				getDam().insert("batchInsertThreshold", t_param);
				for(PolicyThresholdPojo threshold : policyMetricPojo.getListPolicyThresholdPojo()){
					threshold.setPolicyId(policyMetricPojo.getPolicyId());
					threshold.setMetricId(policyMetricPojo.getMetricId());
					getDam().insert("insertThresholds", threshold);
				}
			}
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 根据策略ID获取指标，不包含阈值.
	 * 
	 * @param policyId 策略ID
	 * @return 指标
	 * @throws DAOException DAO层异常
	 */
	@SuppressWarnings("unchecked")
	public List<PolicyMetricPojo> doSelectMetricWithOutThresholdByPolicyId(final String policyId) throws DAOException {
		try {
			return getDam().selectList("select_by_policyId", policyId);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 根据策略ID获取指标，包含阈值.
	 * 
	 * @param policyId 策略ID
	 * @return 指标
	 * @throws DAOException DAO层异常
	 */
	@SuppressWarnings("unchecked")
	public List<PolicyMetricPojo> doSelectMetricWithThresholdByPolicyId(final String policyId) throws DAOException {
		try {
			List<PolicyMetricPojo> t_policyMetricPojos = getDam().selectList("select_by_policyId", policyId);
			if (null == t_policyMetricPojos || t_policyMetricPojos.isEmpty()) {
				return t_policyMetricPojos;
			}
			List<PolicyThresholdPojo> t_thresList = getDam().selectList("selectThreshold_by_policyId", policyId);
			if (null == t_thresList || t_thresList.isEmpty()) {
				return t_policyMetricPojos;
			}
			Map<String, PolicyMetricPojo> t_metricMap = new HashMap<String, PolicyMetricPojo>();
			for (PolicyMetricPojo t_metric : t_policyMetricPojos) {
				t_metricMap.put(t_metric.getMetricId(), t_metric);
			}

			for (PolicyThresholdPojo t_threshold : t_thresList) {
				PolicyMetricPojo t_metric = t_metricMap.get(t_threshold.getMetricId());
				if (null != t_metric) {
					t_metric.addPolicyThresholdPojo(t_threshold);
				}
			}

			return t_policyMetricPojos;
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	@SuppressWarnings("unchecked")
	public List<PolicyMetricPojo> doSelectMetricWithThresholdByPolicyId_DEL(final String policyId) throws DAOException {
		try {
			List<PolicyMetricPojo> t_policyMetricPojos = getDam().selectList("select_by_policyId", policyId);
			Map<String, String> t_param = null;

			for (PolicyMetricPojo t_policyMetricPojo : t_policyMetricPojos) {
				if (t_param == null) {
					t_param = new HashMap<String, String>();
					t_param.put("policyId", t_policyMetricPojo.getPolicyId());
				}
				t_param.put("metricId", t_policyMetricPojo.getMetricId());
				t_policyMetricPojo.setListPolicyThresholdPojo(getDam().selectList(
						"selectThreshold_by_policyId_metricId", t_param));
			}
			return t_policyMetricPojos;
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 获取子资源指标.
	 * 
	 * @param mainInstId 主资源实例ID
	 * @param subModelId 子模型ID
	 * @param metricTypes 指标类型
	 * @return 指标
	 * @throws DAOException DAO异常
	 * @throws DBException DB异常
	 */
	@SuppressWarnings("unchecked")
	public List<MetricBasePojo> doSelectSubInstMetric(final String mainInstId, final String subModelId,
			final List<String> metricTypes) throws DAOException {
		try {
			Map<String, Object> t_param = new HashMap<String, Object>();
			t_param.put("mainInstId", mainInstId);
			t_param.put("subModelId", subModelId);
			t_param.put("metricTypes", metricTypes);
			return getDam().selectList(S_SELECT_SUB_METRIC_BY_METRICTYPE, t_param);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 单独更新一条指标.
	 * 
	 * @param policyMetricPojo 指标对象
	 * @throws DAOException DAO层异常
	 */
	public void doUpdateMetric(final PolicyMetricPojo policyMetricPojo) throws DAOException {
		try {
			getDam().update("update_by_policyIdAndMetricId", policyMetricPojo);
			// Map<String, Object> t_param = new HashMap<String, Object>();
			// t_param.put("policyId", policyMetricPojo.getPolicyId());
			// t_param.put("metricId", policyMetricPojo.getMetricId());
			// getDam().delete("deleteThreshold_by_policyId_metricId", t_param);
			// if (policyMetricPojo.getListPolicyThresholdPojo() != null
			// && !policyMetricPojo.getListPolicyThresholdPojo().isEmpty()) {
			// t_param.put("thresholds",
			// policyMetricPojo.getListPolicyThresholdPojo());
			// getDam().insert("batchInsertThreshold", t_param);
			// }
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 批量更新更新某策略下的指标，并且更新阈值.
	 * 
	 * @param policyId 策略ID
	 * @param policyMetricPojos 指标列表
	 * @throws DAOException DAO层异常
	 */
	public void doUpdateMetric(final String policyId, final List<PolicyMetricPojo> policyMetricPojos)
			throws DAOException {
		if (policyMetricPojos != null && !policyMetricPojos.isEmpty()) {
			for (PolicyMetricPojo t_policyMetricPojo : policyMetricPojos) {
				t_policyMetricPojo.setPolicyId(policyId);
				doUpdateMetric(t_policyMetricPojo);
			}
		}
	}

	/**
	 * 用原始版策略ID替换新版本策略ID.
	 * 
	 * @param newPolicyId 新版本策略ID
	 * @param oriPolicyId 原始版本策略ID
	 * @throws DAOException DAO层异常
	 */
	public void doUpdatePolicyIdByOriPolicyId(final String newPolicyId, final String oriPolicyId) throws DAOException {
		Map<String, String> t_param = new HashMap<String, String>();
		t_param.put("newPolicyId", newPolicyId);
		t_param.put("oriPolicyId", oriPolicyId);
		try {
			getDam().update("update_newPolicyId_by_oriPolicyId", t_param);
			getDam().update("updateThreshold_newPolicyId_by_oriPolicyId", t_param);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 根据资源实例ID获取所有以监控的指标.
	 * 
	 * @param resInstanceId 资源实例ID
	 * @return 已监控指标
	 * @throws DAOException DAO层异常
	 */
	@SuppressWarnings("unchecked")
	public List<MetricBasePojo> getInMonitorMetric(final String resInstanceId) throws DAOException {
		try {
			Map<String, Object> t_param = new HashMap<String, Object>();
			t_param.put("resInstanceId", resInstanceId);
			t_param.put("monitorState", Constants.TRUE);
			return getDam().selectList("", t_param);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 根据资源实例ID和指标类型获取已监控的指标.
	 * 
	 * @param resInstanceId 资源实例ID
	 * @param metricTypeId 指标类型
	 * @return 已监控的指标
	 * @throws DAOException DAO层异常
	 */
	@SuppressWarnings("unchecked")
	public List<MetricBasePojo> getInMonitorMetric(final String resInstanceId, final String metricTypeId)
			throws DAOException {
		try {
			Map<String, Object> t_param = new HashMap<String, Object>();
			t_param.put("resInstanceId", resInstanceId);
			t_param.put("metricTypeId", metricTypeId);
			t_param.put("monitorState", Constants.TRUE);
			return getDam().selectList("", t_param);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 根据主资源实例ID获取所有加入监控的指标.
	 * 
	 * @param mainInstId 主资源实例ID
	 * @return 所有加入监控的指标
	 * @throws DAOException DAO层异常
	 */
	@SuppressWarnings("unchecked")
	public List<MetricBasePojo> getMainInstInMonitorMetric(final String mainInstId) throws DAOException {
		try {
			Map<String, Object> t_param = new HashMap<String, Object>();
			t_param.put("mainInstId", mainInstId);
			t_param.put("monitorState", Constants.TRUE);
			return getDam().selectList(S_SELECT_MAIN_METRIC_INMONITOR, t_param);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 根据主根据资源实例ID和指标类型获取所有加入监控的指标.资源实例ID和指标类型获取所有加入监控的指标.
	 * 
	 * @param mainInstId 主资源实例ID
	 * @param metricType 指标类型
	 * @return 所有加入监控的指标
	 * @throws DAOException DAO层异常
	 */
	@SuppressWarnings("unchecked")
	public List<MetricBasePojo> getMainInstInMonitorMetric(final String mainInstId, final String metricTypeId)
			throws DAOException {
		try {
			Map<String, Object> t_param = new HashMap<String, Object>();
			t_param.put("mainInstId", mainInstId);
			t_param.put("metricTypeId", metricTypeId);
			t_param.put("monitorState", Constants.TRUE);
			return getDam().selectList(S_SELECT_MAIN_METRIC_INMONITOR_METRICTYPE, t_param);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	public Double getRecommendThreshold(String policyId, String metricId, Status4Metric status, String startTime,
			String endTime) throws DAOException {
		Map<String, Object> t_param = new HashMap<String, Object>();
		t_param.put("policyId", policyId);
		t_param.put("metricId", metricId);
		t_param.put("metricStatus", status.getId());
		if (startTime != null) {
			t_param.put("startTime", startTime);
		}
		if (endTime != null) {
			t_param.put("endTime", endTime);
		}
		return getRecommendThreshold(t_param);
	}

	public Double getRecommendThreshold(String policyId, String metricId, Status4Metric status, String startTime,
			String endTime, String thresholdExp) throws DAOException {
		Map<String, Object> t_param = new HashMap<String, Object>();
		t_param.put("policyId", policyId);
		t_param.put("metricId", metricId);
		t_param.put("metricStatus", status.getId());
		if (startTime != null) {
			t_param.put("startTime", startTime);
		}
		if (endTime != null) {
			t_param.put("endTime", endTime);
		}
		t_param.put("threshold", thresholdExp);
		return getRecommendThreshold(t_param);
	}

	public Double getRecommendThreshold(Map<String, Object> param) throws DAOException {
		try {
			return (Double) getDam().selectOne(S_SELECT_RECOMMEND_THRESHOLD, param);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 根据主资源实例ID和子资源类型ID获取已监控的指标.
	 * 
	 * @param mainInstId 主资源实例ID
	 * @param subTempId 子资源类型ID
	 * @return 已监控的指标
	 * @throws DAOException DAO层异常
	 */
	@SuppressWarnings("unchecked")
	public List<MetricBasePojo> getSubInstInMonitorMetric(final String mainInstId, final String subTempId)
			throws DAOException {
		try {
			Map<String, Object> t_param = new HashMap<String, Object>();
			t_param.put("mainInstId", mainInstId);
			t_param.put("subTempId", subTempId);
			t_param.put("monitorState", Constants.TRUE);
			return getDam().selectList(S_SELECT_SUB_METRIC_INMONITOR, t_param);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	@SuppressWarnings("unchecked")
	public List<MetricBasePojo> getSubInstInMonitorMetricBySubInstId(final String subInstId) throws DAOException {
		try {
			Map<String, Object> t_param = new HashMap<String, Object>();
			t_param.put("subInstId", subInstId);
			t_param.put("monitorState", Constants.TRUE);
			return getDam().selectList(S_SELECT_SUB_METRIC_INMONITOR_BY_SUB_INST_ID, t_param);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	@SuppressWarnings("unchecked")
	public Map<String, Boolean> getMetricType4Inuse(final String policyId) throws DAOException {
		try {
			Map<String, Object> t_param = new HashMap<String, Object>();
			t_param.put("policyId", policyId);
			Map<String, Boolean> t_retMap = new HashMap<String, Boolean>();
			for (MetricType metricType : MetricType.values()) {
				t_retMap.put(metricType.getId(), Boolean.FALSE);
			}
			List<MetricBasePojo> t_metricList = getDam().selectList(S_SELECT_METRIC_TYPE_4IN_USE, t_param);
			for (MetricBasePojo metric : t_metricList) {
				//t_retMap.put(metric.getMetricType(), metric.isDisplay());
				t_retMap.put(metric.getMetricType(), true);
			}
			return t_retMap;
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

}
