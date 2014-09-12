package com.riil.base.policy.impl.dao;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.riil.base.pojo.enums.EnumRoot.PolicyType;
import com.riil.base.policy.pojo.PolicyResRelExt;
import com.riil.base.resmodel.pojo.policy.PolicyBasePojo;
import com.riil.base.resmodel.pojo.policy.PolicyPojo;
import com.riil.core.constant.Constants;
import com.riil.core.dam.IDam;
import com.riil.core.dam.exception.DBException;
import com.riil.core.dao.BaseDAO;
import com.riil.core.dao.DAOException;

/**
 * 策略基础信息DAO <br>
 * Create on : 2011-9-15<br>
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
public class PolicyBaseInfoDAO extends BaseDAO<PolicyPojo> {

	/**
	 * 根据名称查询，是否存在重名
	 */
	private static final String S_SELECT_BY_NAME = "select_by_name";

	private static final String S_SELECT_BY_MODEL_POLICY_DOMAIN = "select_by_model_policy_domain";

    private static final String S_SELECT_POLICYBASE_BY_INST_ID = "select_policybase_by_inst_id";

	

	/**
	 * 批量删除策略基础信息.
	 * 
	 * @param policyIds
	 *            策略ID列表
	 * @throws DAOException
	 *             DAO层异常
	 */
	public void doBatchDeletePolicyBaseInfo(final List<String> policyIds) throws DAOException {
		try {
			getDam().delete("batchDeleteByIds", policyIds);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * <p>
	 * 策略发布.
	 * </p>
	 * <p>
	 * isPublish = 1, inUse = 1, oriPolicyId = null
	 * </p>
	 * 
	 * @param userId
	 *            发布者
	 * @param policyId
	 *            发布策略
	 * @throws DAOException
	 *             DAO层异常
	 */
	public void doPublish(final String userId, final String policyId) throws DAOException {
		Map<String, Object> t_param = new HashMap<String, Object>();
		t_param.put("inUse", (byte) 1);
		t_param.put("policyId", policyId);
		t_param.put("publishTime", new Date());
		t_param.put("publishUser", userId);
		t_param.put("originalPolicyId", null);
		try {
			getDam().update("policyPublish", t_param);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	public int doSelectByModelPolicy(Map<String, String> param) throws DAOException {
		try {
			return (Integer) getDam().selectOne(S_SELECT_BY_MODEL_POLICY_DOMAIN, param);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	public int doSelectByName(Map<String, String> param) throws DAOException {
		try {
			return (Integer) getDam().selectOne(S_SELECT_BY_NAME, param);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 根据监控模型ID获取默认策略ID.
	 * 
	 * @param modelId
	 *            监控模型ID
	 * @return 默认策略ID
	 * @throws DAOException
	 *             DAO层异常
	 */
	public String doSelectDefaultPolicyIdByModelId(final String modelId) throws DAOException {
		try {
			return (String) getDam().selectOne("select_default_policyId_by_modelId", modelId);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 根据资源实例ID和策略类型查询最新版本的策略基础信息.
	 * 
	 * @param resInstanceIds
	 *            资源实例IDs
	 * @param policyType
	 *            策略类型
	 * @return 策略基础信息
	 * @throws DAOException
	 *             DAO异常
	 */
	@SuppressWarnings("unchecked")
	public List<PolicyPojo> doSelectNewVersinoByTypesAndResId(final List<String> policyTypes, final String resId) throws DAOException {
		Map<String, Object> t_params = new HashMap<String, Object>();
		t_params.put("resId", resId);
		t_params.put("policyTypes", policyTypes);
		try {
			return getDam().selectList("select_newVersion_Policys_by_types_and_resid", t_params);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 根据策略类型获取所有最新版本主策略基础信息.
	 * 
	 * @param policyType
	 *            策略类型
	 * @return 新版本策略基础信息
	 * @throws DAOException
	 *             DAO层异常
	 */
	@SuppressWarnings("unchecked")
	public List<PolicyPojo> doSelectNewVersionMainPolicyByPolicyType(Map<String, Object> param) throws DAOException {
		try {

			return getDam().selectList("select_newVersion_mainPolicyBaseInfo_by_policyTypeAndDomain", param);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}
	
	@SuppressWarnings("unchecked")
	public List<PolicyPojo> doSelectNewVersionMainPolicyByPolicyTypeAll(Map<String, Object> param) throws DAOException {
		try {

			return getDam().selectList("select_newVersion_mainPolicyBaseInfo_by_policyTypeAndDomain_All", param);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}
	
	@SuppressWarnings("unchecked")
	public List<PolicyPojo> doSelectNewVersionSubPolicyByPolicyTypeAll(Map<String, Object> param) throws DAOException {
		try {

			return getDam().selectList("select_newVersion_subPolicyBaseInfo_by_policyTypeAndDomain_All", param);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}
	
	@SuppressWarnings("unchecked")
	public List<PolicyPojo> doSelectPolicyByPolicyType(Map<String, Object> param) throws DAOException {
		try {

			return getDam().selectList("select_policyBaseInfo_by_policyType_Domain_isPublish", param);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 根据策略类型获取所有最新版本主策略基础信息.
	 * 
	 * @param policyType
	 *            策略类型
	 * @return 新版本策略基础信息
	 * @throws DAOException
	 *             DAO层异常
	 */
	@SuppressWarnings("unchecked")
	public List<PolicyPojo> doSelectPolicyByPolicyType4Publish(Map<String, Object> param) throws DAOException {
		try {
			return getDam().selectList("select_by_policy_type_4publish", param);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}
	
	@SuppressWarnings("unchecked")
	public List<PolicyPojo> doSelectPolicy4Publish() throws DAOException {
		try {
			return getDam().selectList("select_4publish", null);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 根据资源实例ID和策略类型查询最新版本的策略基础信息.
	 * 
	 * @param resInstanceIds
	 *            资源实例IDs
	 * @param policyType
	 *            策略类型
	 * @return 策略基础信息
	 * @throws DAOException
	 *             DAO异常
	 */
	@SuppressWarnings("unchecked")
	public List<PolicyPojo> doSelectNewVersionPolicyBaseInfo(final List<String> resInstanceIds, final String policyType)
			throws DAOException {
		Map<String, Object> t_params = new HashMap<String, Object>();
		t_params.put("reslist", resInstanceIds);
		t_params.put("policyType", policyType);
		try {
			return getDam().selectList("select_newVersion_Policys_by_instanceIds", t_params);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 查询资源实例所在的策略.
	 * 
	 * @param resInstanceIds
	 *            资源实例ID列表
	 * @return 策略ID列表
	 * @throws DAOException
	 *             DAO层异常
	 */
	@SuppressWarnings("unchecked")
	public List<String> doSelectNewVersionPolicyIdsByResInstanceIds(final List<String> resInstanceIds, final String policyType)
			throws DAOException {
		Map<String, Object> t_params = new HashMap<String, Object>();
		t_params.put("reslist", resInstanceIds);
		t_params.put("policyType", policyType);
		try {
			return getDam().selectList("select_newVersion_PolicyIds_by_instanceIds", t_params);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 根据主策略ID获取其所有子策略最新版本的基础信息列表.
	 * 
	 * @param mainPolicyId
	 *            主策略ID
	 * @return 子策略最新版本的基础信息列表
	 * @throws DAOException
	 *             DAO层异常
	 */
	@SuppressWarnings("unchecked")
	public List<PolicyPojo> doSelectNewVersionSubPolicyBaseInfo(final String mainPolicyId) throws DAOException {
		try {
			return getDam().selectList("select_newVersion_subPolicyBaseInfo_by_mainPolicyId", mainPolicyId);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 查询当前策略的原始版本ID.
	 * 
	 * @param newPolicyId
	 *            当前策略ID
	 * @return 原始版本策略ID
	 * @throws DAOException
	 *             DAO层异常
	 */
	public String doSelectOriPolicyId(final String newPolicyId) throws DAOException {
		try {
			return (String) getDam().selectOne("selectOriPolicyId_by_id", newPolicyId);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 查询当前策略的原始版本ID.
	 * 
	 * @param newPolicyIds
	 *            当前策略ID
	 * @return 原始版本策略ID
	 * @throws DAOException
	 *             DAO层异常
	 */
	@SuppressWarnings("unchecked")
	public List<String> doSelectOriPolicyIds(final List<String> newPolicyIds) throws DAOException {
		try {
			return getDam().selectList("selectOriPolicyId_by_id_batch", newPolicyIds);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 查询已发布策略个数.
	 * 
	 * @param policyId
	 *            策略ID
	 * @return 已发布个数
	 * @throws DAOException
	 *             DAO层异常
	 */
	public int doSelectPublishCount(final String policyId) throws DAOException {
		try {
			return (Integer) getDam().selectOne("selectPublishCount_by_id", policyId);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 查询发布状态.
	 * 
	 * @param policyId
	 *            策略ID
	 * @return 发布状态
	 * @throws DAOException
	 *             DAO层异常
	 */
	public byte doSelectPublishState(final String policyId) throws DAOException {
		try {
			Object t_state = getDam().selectOne("selectPublishState_by_id", policyId);
			if (t_state == null) {
				return Constants.FALSE;
			}
			return (Byte) t_state;
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		} catch (Throwable t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 根据主策略ID获取拥有新版本的子策略ID集合.
	 * 
	 * @param mainPolicyId
	 *            主策略ID
	 * @return 拥有新版本的子策略ID集合
	 * @throws DAOException
	 *             DAO层异常
	 */
	@SuppressWarnings("unchecked")
	public List<String> doSelectSubNewVersionIds(final String mainPolicyId) throws DAOException {
		try {
			return getDam().selectList("select_subOriPolicyId_by_mainPolicyId", mainPolicyId);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 根据主策略ID获取其所有子策略的基础信息列表.
	 * 
	 * @param mainPolicyId
	 *            主策略ID
	 * @return 子策略的基础信息列表
	 * @throws DAOException
	 *             DAO层异常
	 */
	@SuppressWarnings("unchecked")
	public List<PolicyPojo> doSelectSubPolicyBaseInfo(final String mainPolicyId) throws DAOException {
		try {
			return getDam().selectList("select_subPolicyBaseInfo_by_mainPolicyId", mainPolicyId);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 根据主策略ID列表查询所有子策略ID..
	 * 
	 * @param mainPolicyIds
	 *            主策略ID
	 * @return 子策略ID
	 * @throws DAOException
	 *             DAO层异常
	 */
	@SuppressWarnings("unchecked")
	public List<String> doSelectSubPolicyIdsByMainPolicyIds(final List<String> mainPolicyIds) throws DAOException {
		try {
			return getDam().selectList("selectSubPolicyIds_by_mainPolicyIds", mainPolicyIds);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 查询策略使用状态.
	 * 
	 * @param policyId
	 *            策略ID
	 * @return 使用状态
	 * @throws DAOException
	 *             DAO层异常
	 */
	public byte doSelectUseState(final String policyId) throws DAOException {
		try {
			return (Byte) getDam().selectOne("selectUseState_by_id", policyId);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		} catch (Throwable t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * <p>
	 * 策略停用.
	 * </p>
	 * <p>
	 * isPublish = -1, inUse = -1, oriPolicyId = null
	 * </p>
	 * 
	 * @param policyId
	 *            策略ID
	 * @throws DAOException
	 *             DAO层异常
	 */
	public void doStop(final String policyId) throws DAOException {
		Map<String, Object> t_param = new HashMap<String, Object>();
		t_param.put("inUse", (byte) -1);
		t_param.put("policyId", policyId);
		t_param.put("originalPolicyId", null);
		try {
			getDam().update("policyStop", t_param);
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
	public List<String> doSelectResRelIdsByServerId(String serverId, String policyId) throws DAOException{
		Map<String, Object> t_param = new HashMap<String, Object>();
		t_param.put("serverId", serverId);
		t_param.put("policyId", policyId);
		
		try {
			return getDam().selectList("select_resRelIds_by_serverId", t_param);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
		
	}
	
	@SuppressWarnings("unchecked")
	public List<String> doSelectScriptResIdsByServerId(String serverId, String policyId) throws DAOException{
		Map<String, Object> t_param = new HashMap<String, Object>();
		t_param.put("serverId", serverId);
		t_param.put("policyId", policyId);
		
		try {
			return getDam().selectList("select_scriptResIds_by_serverId", t_param);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
		
	}

    @SuppressWarnings("unchecked")
    public List<PolicyResRelExt> doSelectPolicyResRelExt(Map<String, Object> queryMap, String sqlKey) throws DAOException {
        try {
            IDam t_dam = getDam();
            return (List<PolicyResRelExt>) t_dam.selectList(sqlKey, queryMap);
        } catch (DBException te) {
            throw new DAOException(te);
        }
    }

    @SuppressWarnings("unchecked")
    public List<PolicyBasePojo> doSelectPolicyBaseByInstId(String instId, String subInstId, PolicyType policyType)
        throws DAOException {
        Map<String, String> t_param = new HashMap<String, String>();
        t_param.put("instId", instId);
        t_param.put("subInstId", subInstId);
        t_param.put("policyType", policyType.getId());
        try {
            return (List<PolicyBasePojo>) getDam().selectList(S_SELECT_POLICYBASE_BY_INST_ID, t_param);
        } catch (DBException t_e) {
            throw new DAOException(t_e);
        }
        
    }
}
