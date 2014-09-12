package com.riil.base.policy.impl.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.riil.base.resmodel.pojo.policy.PolicyActionPojo;
import com.riil.core.dam.exception.DBException;
import com.riil.core.dao.BaseDAO;
import com.riil.core.dao.DAOException;

/**
 * {class description} <br>
 * 
 * <p>
 * Create on : 2011-11-9<br>
 * <p>
 * </p>
 * <br>
 * 
 * @author zhangp<br>
 * @version riil.admin.impl v1.0
 *          <p>
 *          <br>
 *          <strong>Modify History:</strong><br>
 *          user modify_date modify_content<br>
 *          -------------------------------------------<br>
 *          <br>
 */
public class PolicyActionDAO extends BaseDAO<PolicyActionPojo> {
	/**
	 * 根据策略id删除action
	 */
	private static final String S_DELETE_BY_POLICY_ID = "delete_by_policy_id";
	/**
	 * 根据策略id列表删除action
	 */
	private static final String S_BATCH_DELETE_BY_POLICY_IDS = "batch_delete_by_policy_ids";

	/**
	 * 根据名称查询，是否存在重名
	 */
	private static final String S_SELECT_BY_NAME = "select_by_name";

	public void doBatchDelete(String policyId, List<String> actionNames) throws DAOException {
		Map<String, Object> t_map = new HashMap<String, Object>();
		t_map.put("policyId", policyId);
		t_map.put("actionNames", actionNames);
		try {
			getDam().delete("delete_by_action_names", t_map);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 批量插入.
	 * 
	 * @param policyId
	 *            策略ID
	 * @param actionPojos
	 * 
	 * @throws DAOException
	 *             DAO层异常
	 */
	public void doBatchInsertAction(final String policyId, final List<PolicyActionPojo> actionPojos) throws DAOException {
		if (actionPojos != null && !actionPojos.isEmpty()) {
			for (PolicyActionPojo t_action : actionPojos) {
				t_action.setPolicyId(policyId);
				doInsertPojo(t_action);
			}
		}
	}

	public void doDeleteByName(String policyId, String actionName) throws DAOException {
		Map<String, Object> t_map = new HashMap<String, Object>();
		t_map.put("policyId", policyId);
		t_map.put("actionName", actionName);
		try {
			getDam().delete("delete_by_action_name", t_map);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	public void doDeleteByPolicyId(final String policyId) throws DAOException {
		try {
			getDam().selectList(S_DELETE_BY_POLICY_ID, policyId);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	public void doDeleteByPolicyIds(final List<String> policyIds) throws DAOException {
		try {
			getDam().selectList(S_BATCH_DELETE_BY_POLICY_IDS, policyIds);
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
	 * {method description}.
	 * 
	 * @param policyId
	 * @return
	 * @throws DAOException
	 */
	@SuppressWarnings("unchecked")
	public List<PolicyActionPojo> doSelectByPolicyId(final String policyId) throws DAOException {
		try {
			return getDam().selectList("select_by_policyId", policyId);
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
	 * {method description}.
	 * 
	 * @param inUser
	 * @param actionDefineIds
	 * @throws DAOException
	 */
	public void setActiondDefineState(final String inUse, final List<String> actionDefineIds) throws DAOException {
		Map<String, Object> t_map = new HashMap<String, Object>();
		t_map.put("inUse", inUse);
		t_map.put("ids", actionDefineIds);
		try {
			getDam().update("update_state_by_ids", t_map);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	public void setActiondDefineState(String policyId, final List<String> actionNames, final String inUser) throws DAOException {
		Map<String, Object> t_map = new HashMap<String, Object>();
		t_map.put("policyId", policyId);
		t_map.put("inUse", inUser);
		t_map.put("actionNames", actionNames);
		try {
			getDam().update("update_state_by_names", t_map);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

}
