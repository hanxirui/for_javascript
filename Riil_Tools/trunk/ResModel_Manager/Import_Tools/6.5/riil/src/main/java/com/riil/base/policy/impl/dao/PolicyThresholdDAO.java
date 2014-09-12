package com.riil.base.policy.impl.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.riil.base.resmodel.pojo.policy.PolicyThresholdPojo;
import com.riil.core.dam.exception.DBException;
import com.riil.core.dao.BaseDAO;
import com.riil.core.dao.DAOException;

/**
 * 监控策略指标阈值和频度DAO <br>
 * <p>
 * Create on : 2011-9-8<br>
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
public class PolicyThresholdDAO extends BaseDAO<PolicyThresholdPojo> {

	/**
	 * 批量插入指标阈值.
	 * 
	 * @param policyId
	 *            策略ID
	 * @param thresholdPojos
	 *            阈值
	 * @throws DAOException
	 *             DAO层异常
	 */

	public void doBatchInsertThreshold(final String policyId, final String metricId, final List<PolicyThresholdPojo> thresholdPojos)
			throws DAOException {
		Map<String, Object> t_param = new HashMap<String, Object>();
		t_param.put("policyId", policyId);
		t_param.put("metricId", metricId);
		t_param.put("thresholds", thresholdPojos);
		try {
//			getDam().insert("batchInsertThreshold", t_param);
			for(PolicyThresholdPojo pojo : thresholdPojos){
				pojo.setPolicyId(policyId);
				pojo.setMetricId(metricId);
				getDam().insert("insert", pojo);
			}
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 批量插入指标阈值.
	 * 
	 * @param policyId
	 *            策略ID
	 * @param thresholdPojos
	 *            阈值
	 * @throws DAOException
	 *             DAO层异常
	 */
	// public void doBatchInsertThreshold(
	// final List<PolicyThresholdPojo> thresholdPojos) throws DAOException {
	// Map<String, Object> t_param = new HashMap<String, Object>();
	// t_param.put("thresholds", thresholdPojos);
	// try {
	// getDam().insert("batchInsert", t_param);
	// } catch (DBException t_e) {
	// throw new DAOException(t_e);
	// }
	// }
	/**
	 * 根据策略ID删除指标阈值和频度.
	 * 
	 * @param policyId
	 *            策略ID
	 * @throws DAOException
	 *             DAO层异常
	 */
	public void doDeleteThresholdByPolicyId(final String policyId) throws DAOException {
		try {
			getDam().delete("delete_by_policy_id", policyId);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 根据策略ID删除指标阈值和频度.
	 * 
	 * @param policyId
	 *            策略ID
	 * @throws DAOException
	 *             DAO层异常
	 */
	public void doDeleteThresholdByPolicyIdMetricId(final String policyId, final String metricId) throws DAOException {
		try {
			Map<String, String> map = new HashMap<String, String>();
			map.put("policyId", policyId);
			map.put("metricId", metricId);
			getDam().delete("delete_by_policy_id_metric_id", map);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 根据策略ID删除指标阈值和频度.
	 * 
	 * @param policyIds
	 *            策略ID
	 * @throws DAOException
	 *             DAO层异常
	 */
	// public void doDeleteThresholdByPolicyIds(final List<String> policyIds)
	// throws DAOException {
	// try {
	// getDam().delete("delete_by_policyId_batch", policyIds);
	// } catch (DBException t_e) {
	// throw new DAOException(t_e);
	// }
	// }

	/**
	 * 根据策略ID获取指标阈值.
	 * 
	 * @param policyId
	 *            策略ID
	 * @return 指标阈值和频度
	 * @throws DAOException
	 *             DAO层异常
	 */
	@SuppressWarnings("unchecked")
	public List<PolicyThresholdPojo> doSelectThresholdByPolicyId(final String policyId) throws DAOException {
		try {
			Map<String, String> map = new HashMap<String, String>();
			map.put("policyId", policyId);
			return getDam().selectList("select_by_policyId", map);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 根据策略ID获取指标阈值.
	 * 
	 * @param policyId
	 *            策略ID
	 * @return 指标阈值和频度
	 * @throws DAOException
	 *             DAO层异常
	 */
	@SuppressWarnings("unchecked")
	public List<PolicyThresholdPojo> doSelectThresholdByPolicyIdMetricId(final String policyId, final String metricId) throws DAOException {
		try {
			Map<String, String> map = new HashMap<String, String>();
			map.put("policyId", policyId);
			map.put("metricId", metricId);
			return getDam().selectList("select_by_policyId_metricId", map);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 用原始版策略ID替换新版本策略ID.
	 * 
	 * @param newPolicyId
	 *            新版本策略ID
	 * @param oriPolicyId
	 *            原始版本策略ID
	 * @throws DAOException
	 *             DAO层异常
	 */
	public void doUpdatePolicyIdByOriPolicyId(final String newPolicyId, final String oriPolicyId) throws DAOException {
		Map<String, String> t_param = new HashMap<String, String>();
		t_param.put("newPolicyId", newPolicyId);
		t_param.put("oriPolicyId", oriPolicyId);
		try {
			getDam().update("update_newPolicyId_by_oriPolicyId", t_param);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 更新某策略下的指标阈值和频度.
	 * 
	 * @param policyId
	 *            策略ID
	 * @param policyThresholdPojos
	 *            指标阈值和频度
	 * @throws DAOException
	 *             DAO层异常
	 */
	public void doUpdateThreshold(final String policyId, final List<PolicyThresholdPojo> policyThresholdPojos) throws DAOException {
		try {
			if (policyThresholdPojos != null && !policyThresholdPojos.isEmpty()) {
				for (PolicyThresholdPojo t_policyThresholdPojo : policyThresholdPojos) {
					t_policyThresholdPojo.setPolicyId(policyId);
					getDam().update("update_by_policyIdAndMetricId", t_policyThresholdPojo);
				}
			}
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

}
