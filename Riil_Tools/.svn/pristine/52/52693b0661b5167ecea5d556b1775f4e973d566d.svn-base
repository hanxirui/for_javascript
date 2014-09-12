package com.riil.base.policy.impl.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.riil.base.resmodel.pojo.policy.PolicyActionPojo;
import com.riil.base.resmodel.pojo.policy.PolicyScriptMetricPojo;
import com.riil.core.dam.exception.DBException;
import com.riil.core.dao.BaseDAO;
import com.riil.core.dao.DAOException;

/**
 * 脚本指标DAO <br>
 * Create on : 2011-10-12<br>
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
public class PolicyScriptMetricDAO extends BaseDAO<PolicyScriptMetricPojo> {

	/**
	 * 根据名称查询，是否存在重名
	 */
	private static final String S_SELECT_BY_NAME = "select_by_name";

	/**
	 * 批量添加脚本指标.
	 * 
	 * @param policyId
	 *            策略ID
	 * @param scriptMetricPojos
	 *            脚本指标
	 * @throws DAOException
	 *             DAO异常
	 */
	public void doBatchInsertScriptMetric(final String policyId, final List<PolicyScriptMetricPojo> scriptMetricPojos) throws DAOException {
		try {
			Map<String, Object> t_map = new HashMap<String, Object>();
			t_map.put("policyId", policyId);
			t_map.put("scriptMetrics", scriptMetricPojos);
//			getDam().insert("batchInsert", t_map);
			for(PolicyScriptMetricPojo pojo : scriptMetricPojos){
				pojo.setPolicyId(policyId);
				getDam().insert("insert", pojo);
			}
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}
	
	public void insert(final String policyId, final List<PolicyScriptMetricPojo> scriptMetricPojos) throws DAOException {
		try {
			Map<String, Object> t_map = new HashMap<String, Object>();
			t_map.put("policyId", policyId);
			t_map.put("scriptMetrics", scriptMetricPojos);
			getDam().insert("batchInsert", t_map);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 根据策略ID删除关联指标.
	 * 
	 * @param policyId
	 *            策略ID
	 * @throws DAOException
	 *             DAO层异常
	 */
	public void doDeleteScriptMetricByPolicyId(final String policyId) throws DAOException {
		try {
			getDam().delete("delete_by_policyId", policyId);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 根据策略ID删除关联指标.
	 * 
	 * @param policyId
	 *            策略ID
	 * @throws DAOException
	 *             DAO层异常
	 */
	public void doDeleteScriptMetricByPolicyIds(final List<String> policyIds) throws DAOException {
		try {
			getDam().delete("delete_by_policyIds", policyIds);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	public int doSelectByName(PolicyActionPojo param) throws DAOException {
		try {
			return (Integer) getDam().selectOne(S_SELECT_BY_NAME, param);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 根据策略ID查询关联指标.
	 * 
	 * @param policyId
	 *            策略ID
	 * @return 关联指标
	 * @throws DAOException
	 *             DAO层异常
	 */
	@SuppressWarnings("unchecked")
	public List<PolicyScriptMetricPojo> doSelectScriptMetricByPolicyId(final String policyId) throws DAOException {
		try {
			return getDam().selectList("select_script_metric_by_policyId", policyId);
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

	@SuppressWarnings("unchecked")
	public List<PolicyScriptMetricPojo> getScriptMetricByResId(String resId) throws DAOException {
		try {
			return (List<PolicyScriptMetricPojo>) getDam().selectList("select_script_metric_by_resId", resId);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

}
