package com.riil.base.policy.impl.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.riil.base.resmodel.pojo.policy.PolicyResRelPojo;
import com.riil.core.dam.exception.DBException;
import com.riil.core.dao.BaseDAO;
import com.riil.core.dao.DAOException;

/**
 * 策略关联资源DAO <br>
 * <p>
 * Create on : 2011-9-6<br>
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
public class PolicyResRelDAO extends BaseDAO<PolicyResRelPojo> {
	private static final String S_SELECT_BY_UNIQUE_INDEX = "select_by_unique_index";
	private static final String S_UPDATE_BY_UNIQUE_INDEX = "update_by_unique_index";
	private static final String S_DELETE_BY_UNIQUE_INDEX = "delete_by_unique_index";

	/**
	 * 根据策略ID批量删除其所关联的所有资源.
	 * 
	 * @param policyIds
	 *            策略ID集合
	 * @throws DAOException
	 *             DAO层异常
	 */
	public void doBatchDeleteResRelByPolicyIds(final List<String> policyIds) throws DAOException {
		try {
			getDam().delete("batchDeleteByIds", policyIds);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	public void doBatchInsertResRel(final List<PolicyResRelPojo> policyResRelPojos) throws DAOException {

		try {
//			getDam().insert("batchInsert", policyResRelPojos);
			for(PolicyResRelPojo pojo : policyResRelPojos){
				getDam().insert("insert", pojo);
			}
			
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 批量添加资源关联.
	 * 
	 * @param policyResRelPojos
	 * @throws DAOException
	 */
	@Deprecated
	public void doCreateOrModify(final List<PolicyResRelPojo> policyResRelPojos) throws DAOException {
		try {
			List<PolicyResRelPojo> t_insertList = new ArrayList<PolicyResRelPojo>();
			for (PolicyResRelPojo policyResRelPojo : policyResRelPojos) {
				if (doSelectByUniqueIndex(policyResRelPojo) != null) {
					doUpdateByUniqueIndex(policyResRelPojo);
				} else {
					t_insertList.add(policyResRelPojo);
				}
			}
			if (t_insertList != null && t_insertList.size() > 0) {
				getDam().insert("batchInsert_list", t_insertList);
			}

		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	public void doDeleteByUniqueIndex(PolicyResRelPojo param) throws DAOException {
		try {
			getDam().delete(S_DELETE_BY_UNIQUE_INDEX, param);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 根据策略ID删除其所关联的所有资源.
	 * 
	 * @param policyId
	 *            策略ID
	 * @throws DAOException
	 *             DAO层异常
	 */
	public void doDeleteResRelByPolicyId(final String policyId) throws DAOException {
		try {
			getDam().delete("delete_by_policyId", policyId);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	// /**
	// * 批量插入策略所关联的资源.
	// *
	// * @param policyId
	// * 策略ID
	// * @param policyResRelPojos
	// * 关联资源
	// * @throws DAOException
	// * DAO层异常
	// */
	// @Deprecated
	// public void doBatchInsertResRel(final String policyId, final
	// List<PolicyResRelPojo> policyResRelPojos) throws DAOException {
	// if (policyResRelPojos == null || policyResRelPojos.isEmpty()) {
	// return;
	// }
	// Map<String, Object> t_map = new HashMap<String, Object>();
	// t_map.put("policyId", policyId);
	// t_map.put("resRels", policyResRelPojos);
	// try {
	// getDam().insert("batchInsert", t_map);
	// } catch (DBException t_e) {
	// throw new DAOException(t_e);
	// }
	// }

	/**
	 * 根据策略ID和关联的资源实例ID删除其所关联的资源.
	 * 
	 * @param policyId
	 *            策略ID
	 * @param resInstanceIds
	 *            关联资源实例ID
	 * @throws DAOException
	 *             DAO层异常
	 */
	public void doDeleteResRelByPolicyIdAndResIds(final String policyId, final List<String> resInstanceIds, boolean policyIsMain) throws DAOException {
		try {
			int batchResSize = 1000;// 每次操作数
			int resCount = resInstanceIds.size();// 总数
			int loopCount = (int) Math.ceil(resCount * 1d / batchResSize);// 循环次数
			// 导入资源实例
			for (int i = 0; i < loopCount; i++) {
				int from_index = batchResSize * i;
				int to_index = batchResSize * (i + 1);
				if (to_index > resCount) {
					to_index = resCount;
				}
				
				Map<String, Object> t_params = new HashMap<String, Object>();
				t_params.put("policyId", policyId);
				t_params.put("resList", resInstanceIds.subList(from_index, to_index));
				if(policyIsMain){
					getDam().delete("delete_by_policyId_resInstanceIds", t_params);
					getDam().delete("delete_by_policyId_resInstanceIds_relSub", t_params);
				}else{
					getDam().delete("delete_by_policyId_resInstanceIds_4Sub", t_params);
				}
				
			}
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 根据策略类型和资源实例ID删除资源关联.
	 * 
	 * @param policyType
	 *            策略类型
	 * @param resInstanceIds
	 *            资源实例ID
	 * @throws DAOException
	 *             DAO层异常
	 */
	public void doDeleteResRelByResIds(final String policyType, final List<String> resInstanceIds) throws DAOException {
		try {
			int batchResSize = 1000;// 每次操作数
			int resCount = resInstanceIds.size();// 总数
			int loopCount = (int) Math.ceil(resCount * 1d / batchResSize);// 循环次数
			// 导入资源实例
			for (int i = 0; i < loopCount; i++) {
				int from_index = batchResSize * i;
				int to_index = batchResSize * (i + 1);
				if (to_index > resCount) {
					to_index = resCount;
				}
				
				Map<String, Object> t_params = new HashMap<String, Object>();
				t_params.put("policyType", policyType);
				t_params.put("resList", resInstanceIds.subList(from_index, to_index));
				getDam().delete("batchDeleteByResIds", t_params);
			}
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 批量添加资源关联.
	 * 
	 * @param policyResRelPojos
	 * @throws DAOException
	 */
	// public void doBatchInsertResRel(final List<PolicyResRelPojo>
	// policyResRelPojos) throws DAOException {
	// try {
	// getDam().insert("batchInsert_list", policyResRelPojos);
	// } catch (DBException t_e) {
	// throw new DAOException(t_e);
	// }
	// }

	public PolicyResRelPojo doSelectByUniqueIndex(PolicyResRelPojo param) throws DAOException {
		try {
			return (PolicyResRelPojo) getDam().selectOne(S_SELECT_BY_UNIQUE_INDEX, param);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	@SuppressWarnings("unchecked")
	public List<String> doSelectResIdsByPolicyIds(final List<String> policyId) throws DAOException {
		try {
			return getDam().selectList("select_res_ids_by_policy_ids", policyId);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 根据策略ID获取策略关联资源.
	 * 
	 * @param policyId
	 *            策略ID
	 * @return 策略所关联的资源
	 * @throws DAOException
	 *             DAO层异常
	 */
	@SuppressWarnings("unchecked")
	public List<PolicyResRelPojo> doSelectResRelByPolicyId(final String policyId) throws DAOException {
		try {
			return getDam().selectList("select_by_policyId", policyId);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	public void doUpdateByUniqueIndex(PolicyResRelPojo param) throws DAOException {
		try {
			getDam().update(S_UPDATE_BY_UNIQUE_INDEX, param);
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

}
