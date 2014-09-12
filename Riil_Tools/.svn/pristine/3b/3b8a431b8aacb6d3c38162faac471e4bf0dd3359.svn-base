package com.riil.base.policy.impl;

import java.io.File;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang.StringUtils;

import com.riil.base.pojo.enums.Enum4Metric.Status4Metric;
import com.riil.base.pojo.enums.EnumRoot.BandwidthType;
import com.riil.base.pojo.enums.EnumRoot.PolicyType;
import com.riil.base.policy.IPolicyService;
import com.riil.base.policy.IResourcePolicyService;
import com.riil.base.policy.IScriptPolicyService;
import com.riil.base.policy.impl.dao.PolicyBaseInfoDAO;
import com.riil.base.policy.impl.dao.PolicyEventDAO;
import com.riil.base.policy.impl.dao.PolicyResRelDAO;
import com.riil.base.resmodel.IDictService;
import com.riil.base.resmodel.IModelService;
import com.riil.base.resmodel.IResTypeService;
import com.riil.base.resmodel.impl.file.BinFileUtils;
import com.riil.base.resmodel.pojo.base.EventBasePojo;
import com.riil.base.resmodel.pojo.base.MetricBasePojo;
import com.riil.base.resmodel.pojo.base.ResTypePojo;
import com.riil.base.resmodel.pojo.mmodel.Model;
import com.riil.base.resmodel.pojo.mmodel.ModelMetricBindingPojo;
import com.riil.base.resmodel.pojo.policy.PolicyActionPojo;
import com.riil.base.resmodel.pojo.policy.PolicyBasePojo;
import com.riil.base.resmodel.pojo.policy.PolicyEventPojo;
import com.riil.base.resmodel.pojo.policy.PolicyEventQueryParam;
import com.riil.base.resmodel.pojo.policy.PolicyEventRulePojo;
import com.riil.base.resmodel.pojo.policy.PolicyMetricPojo;
import com.riil.base.resmodel.pojo.policy.PolicyPojo;
import com.riil.base.resmodel.pojo.policy.PolicyResPojo;
import com.riil.base.resmodel.pojo.policy.PolicyResRelPojo;
import com.riil.base.resmodel.pojo.policy.PolicyScriptPojo;
import com.riil.base.resmodel.pojo.policy.PolicyThresholdPojo;
import com.riil.core.commons.Assert;
import com.riil.core.commons.ServerModule;
import com.riil.core.constant.Constants;
import com.riil.core.dao.DAOException;
import com.riil.core.dao.PageDataPojo;
import com.riil.core.exception.AssertException;
import com.riil.core.logger.SystemLogger;
import com.riil.core.service.ServiceException;
import com.riil.core.utils.bean.SerializeUtil;

/**
 * 策略服务 <br>
 * <p>
 * Create on : 2012-6-17<br>
 * <p>
 * </p>
 * <br>
 * 
 * @author ChenJuntao<br>
 * @version riil.resmodel.impl v1.0
 *          <p>
 *          <br>
 *          <strong>Modify History:</strong><br>
 *          user modify_date modify_content<br>
 *          -------------------------------------------<br>
 *          <br>
 */
public class PolicyService implements IPolicyService {

	/**
	 * <code>S_LOGGER</code> - Logger.
	 */
	protected static final SystemLogger S_LOGGER = SystemLogger.getSystemLogger(PolicyService.class, ServerModule.ResourceModel);

	/**
	 * <code>m_baseInfoDAO</code> - 策略基础信息DAO.
	 */
	protected PolicyBaseInfoDAO m_baseInfoDAO;

	/**
	 * <code>m_eventInfoDAO</code> - 策略事件信息DAO.
	 */
	protected PolicyEventDAO m_eventDAO;

	/**
	 * <code>m_policyResRelDAO</code> - 策略关联资源实例DAO.
	 */
	protected PolicyResRelDAO m_resRelDAO;

	/**
	 * <code>m_resourcePolicyService</code> - 资源策略服务
	 */
	protected IResourcePolicyService m_resourcePolicyService;

	/**
	 * <code>m_scriptPolicyService</code> - 脚本策略服务
	 */
	protected IScriptPolicyService m_scriptPolicyService;

	protected IResTypeService m_resTypeService;

	protected IDictService m_dictService;

	/**
	 * <code>m_modelService</code> - 模型服务
	 */
	protected IModelService m_modelService;

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.riil.base.policy.IPolicyService#init()
	 */
	@Override
	public void init() {
		throw new RuntimeException("No impl, Implemented by any subclass.");
	}

	private List<PolicyPojo> loadAllFile() {
		if (S_LOGGER.isInfoEnabled()) {
			S_LOGGER.info("load all policy file...");
		}
		List<PolicyPojo> t_policys = new ArrayList<PolicyPojo>();
		Collection<File> files = BinFileUtils.getFiles4Policy();
		for (File t_file : files) {
			if (t_file.isFile()) {
				PolicyPojo t_policy = loadFile(t_file);
				if (t_policy == null) {
					continue;
				}

				t_policys.add(t_policy);
			}
		}
		return t_policys;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.riil.base.policy.IPolicyService#getAllFactoryPolicy()
	 */
	@Override
	public List<PolicyPojo> getAllFactoryPolicy() throws ServiceException {
		return loadAllFile();
	}

	@Override
	public Map<String, PolicyPojo> getPolicyMap() {
		throw new RuntimeException("No impl, Implemented by any subclass.");
	}

	@Override
	public void importPolicy(PolicyPojo policy) throws ServiceException {
		throw new RuntimeException("No impl, Implemented by any subclass.");
	}

	@Override
	public void createPolicy4InitData(PolicyPojo policy) throws ServiceException {
		throw new RuntimeException("No impl, Implemented by any subclass.");
	}

	@Override
	public void createOrModify(PolicyPojo policyPojo) throws ServiceException {
		throw new RuntimeException("No impl, Implemented by any subclass.");
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.policy.IPolicyService#createPolicy(com.riil.base.resmodel
	 * .pojo.policy.PolicyPojo)
	 */
	@Override
	public void createPolicy(final PolicyPojo policyPojo) throws ServiceException {
		throw new RuntimeException("No impl, Implemented by any subclass.");
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.policy.IPolicyService#createLogPolicy(com.riil.base.resmodel
	 * .pojo.policy.PolicyPojo)
	 */
	@Override
	public void createLogPolicy(final PolicyPojo policyPojo) throws ServiceException {
		throw new RuntimeException("No impl, Implemented by any subclass.");
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.policy.IPolicyService#createTrapPolicy(com.riil.base.resmodel
	 * .pojo.policy.PolicyPojo)
	 */
	@Override
	public void createTrapPolicy(PolicyPojo policyPojo) throws ServiceException {
		throw new RuntimeException("No impl, Implemented by any subclass.");
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.policy.IPolicyService#createPolicyResRel(java.lang.String,
	 * java.lang.String, java.util.List)
	 */
	@Override
	public void createPolicyResRel(final String policyId, final String userId, final List<PolicyResRelPojo> policyResRelPojos) throws ServiceException {
		throw new RuntimeException("No impl, Implemented by any subclass.");
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.policy.IPolicyService#createPolicyResRel(java.util.List)
	 */
	@Override
	public void createPolicyResRel(final List<PolicyResRelPojo> policyResRelPojos) throws ServiceException {
		throw new RuntimeException("No impl, Implemented by any subclass.");
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.policy.IPolicyService#createPolicyEvent(java.lang.String,
	 * com.riil.base.resmodel.pojo.policy.PolicyEventPojo)
	 */
	@Override
	public String createPolicyEvent(final String userId, final PolicyEventPojo policyEventPojo) throws ServiceException {
		throw new RuntimeException("No impl, Implemented by any subclass.");
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.policy.IPolicyService#createPolicyEvents(java.lang.String,
	 * java.lang.String, java.util.List)
	 */
	@Override
	public String createPolicyEvents(final String policyId, final String userId, final List<PolicyEventPojo> policyEventPojos) throws ServiceException {
		throw new RuntimeException("No impl, Implemented by any subclass.");
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.policy.IPolicyService#removePolicyByPolicyId(java.lang.
	 * String)
	 */
	@Override
	public List<String> removePolicyByPolicyId(final String policyId) throws ServiceException {
		throw new RuntimeException("No impl, Implemented by any subclass.");
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.policy.IPolicyService#removePolicyByPolicyIds(java.util
	 * .List)
	 */
	@Override
	public List<String> removePolicyByPolicyIds(final List<String> policyIds) throws ServiceException {
		throw new RuntimeException("No impl, Implemented by any subclass.");
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.policy.IPolicyService#removePolicyRelResByResIds(java.lang
	 * .String, java.util.List)
	 */
	@Override
	public void removePolicyRelResByResIds(final String policyType, final List<String> resInstanceIds) throws ServiceException {
		throw new RuntimeException("No impl, Implemented by any subclass.");
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.policy.IPolicyService#removePolicyRelResByPolicyIdAndResIds
	 * (java.lang.String, java.util.List)
	 */
	@Override
	public void removePolicyRelResByPolicyIdAndResIds(final String policyId, final boolean policyIsMain, final String policyType,
			final List<String> resInstanceIds) throws ServiceException {
		throw new RuntimeException("No impl, Implemented by any subclass.");
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.policy.IPolicyService#removePolicyEvents(java.lang.String,
	 * java.lang.String)
	 */
	@Override
	public String removePolicyEvents(final String policyId, final String userId) throws ServiceException {
		throw new RuntimeException("No impl, Implemented by any subclass.");
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.policy.IPolicyService#removePolicyEvents(java.lang.String,
	 * java.lang.String, java.util.List)
	 */
	@Override
	public String removePolicyEvents(final String policyId, final String userId, final List<String> eventIds) throws ServiceException {
		throw new RuntimeException("No impl, Implemented by any subclass.");
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.policy.IPolicyService#removePolicyEvent(java.lang.String,
	 * java.lang.String, java.lang.String)
	 */
	@Override
	public String removePolicyEvent(final String policyId, final String userId, final String eventId) throws ServiceException {
		throw new RuntimeException("No impl, Implemented by any subclass.");
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.policy.IPolicyService#modifyPolicyBaseInfo(com.riil.base
	 * .resmodel.pojo.policy.PolicyPojo)
	 */
	@Override
	public String modifyPolicyBaseInfo(final PolicyPojo policyPojo) throws ServiceException {
		throw new RuntimeException("No impl, Implemented by any subclass.");
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.policy.IPolicyService#modifyPolicyResRel(java.lang.String,
	 * java.lang.String, java.util.List)
	 */
	@Override
	public String modifyPolicyResRel(final String policyId, final String userId, final List<PolicyResRelPojo> resRelPojos) throws ServiceException {
		throw new RuntimeException("No impl, Implemented by any subclass.");
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.policy.IPolicyService#modifyPolicyEvents(java.lang.String,
	 * java.lang.String, java.util.List)
	 */
	@Override
	public String modifyPolicyEvents(final String policyId, final String userId, final List<PolicyEventPojo> policyEventPojos) throws ServiceException {
		throw new RuntimeException("No impl, Implemented by any subclass.");
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.policy.IPolicyService#modifyPolicyEvent(java.lang.String,
	 * com.riil.base.resmodel.pojo.policy.PolicyEventPojo)
	 */
	@Override
	public String modifyPolicyEvent(final String userId, final PolicyEventPojo policyEventPojo) throws ServiceException {
		throw new RuntimeException("No impl, Implemented by any subclass.");
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.riil.base.policy.IPolicyService#policyPublish(java.lang.String,
	 * java.util.List)
	 */
	@Override
	public List<String> policyPublish(final String userId, final List<String> policyIds) throws ServiceException {
		throw new RuntimeException("No impl, Implemented by any subclass.");
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.riil.base.policy.IPolicyService#policyStop(java.util.List)
	 */
	@Override
	public List<String> policyStop(final List<String> policyIds) throws ServiceException {
		throw new RuntimeException("No impl, Implemented by any subclass.");
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.policy.IPolicyService#getPolicyBaseInfo(java.lang.String)
	 */
	@Override
	public PolicyPojo getPolicyBaseInfo(final String policyId) throws ServiceException {
		throw new RuntimeException("No impl, Implemented by any subclass.");
	}

	protected PolicyPojo getPolicyBaseInfoFromDB(final String policyId) throws ServiceException {
		Assert.notNull(policyId);
		try {
			return m_baseInfoDAO.doSelectByID(policyId);
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.policy.IPolicyService#getPolicyResRel(java.lang.String)
	 */
	@Override
	public List<PolicyResRelPojo> getPolicyResRel(final String policyId) throws ServiceException {
		throw new RuntimeException("No impl, Implemented by any subclass.");
	}

	protected List<PolicyResRelPojo> getPolicyResRelFromDB(final String policyId) throws ServiceException {
		Assert.notNull(policyId);
		try {
			return m_resRelDAO.doSelectResRelByPolicyId(policyId);
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.riil.base.policy.IPolicyService#
	 * getNewVersinoPolicyBaseInfoByTypeAndResIds(java.util.List,
	 * java.lang.String)
	 */
	@Override
	public List<PolicyPojo> getNewVersinoPolicyBaseInfoByTypeAndResIds(final List<String> resInstanceIds, final String policyType) throws ServiceException {
		throw new RuntimeException("No impl, Implemented by any subclass.");
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.riil.base.policy.IPolicyService#
	 * getNewVersinoPolicyBaseInfoByTypesAndResId(java.util.List,
	 * java.lang.String)
	 */
	@Override
	public List<PolicyPojo> getNewVersinoPolicyBaseInfoByTypesAndResId(List<String> policyTypes, String resId) throws ServiceException {
		throw new RuntimeException("No impl, Implemented by any subclass.");
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.policy.IPolicyService#getPolicyEvents(java.lang.String)
	 */
	@Override
	public List<PolicyEventPojo> getPolicyEvents(final String policyId) throws ServiceException {
		throw new RuntimeException("No impl, Implemented by any subclass.");
	}

	protected List<PolicyEventPojo> getPolicyEventsFromDB(final String policyId) throws ServiceException {
		Assert.notNull(policyId);
		try {
			return m_eventDAO.doSelectEventWithRuleByPolicyId(policyId);
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.policy.IPolicyService#getPolicyEventsByParam(com.riil.base
	 * .resmodel.pojo.policy.PolicyEventQueryParam )
	 */
	public PageDataPojo<PolicyEventPojo> getPolicyEventsByParam(final PolicyEventQueryParam policyEventPojoQueryParam) throws ServiceException {
		throw new RuntimeException("No impl, Implemented by any subclass.");
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.policy.IPolicyService#getPolicyEventByEventId(java.lang
	 * .String, java.lang.String)
	 */
	@Override
	public PolicyEventPojo getPolicyEventByEventId(final String policyId, final String eventId) throws ServiceException {
		throw new RuntimeException("No impl, Implemented by any subclass.");
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.policy.IPolicyService#getPolicyBaseInfoByPolicyType(java
	 * .lang.String, java.util.List)
	 */
	@Override
	public List<PolicyPojo> getPolicyBaseInfoByPolicyType(final String policyType, final List<String> domainIds) throws ServiceException {
		throw new RuntimeException("No impl, Implemented by any subclass.");
	}

	@Override
	public List<PolicyPojo> getPolicyBaseInfoByPolicyTypeAll(String policyType, List<String> domainIds) throws ServiceException {
		throw new RuntimeException("No impl, Implemented by any subclass.");
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.policy.IPolicyService#getPolicyBaseInfoByPolicyType4InUse
	 * (java.lang.String, java.util.List)
	 */
	@Override
	public List<PolicyPojo> getPolicyBaseInfoByPolicyType4InUse(final String policyType, final List<String> domainIds) throws ServiceException {
		throw new RuntimeException("No impl, Implemented by any subclass.");
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.policy.IPolicyService#getPolicyByPolicyId(java.lang.String)
	 */
	@Override
	public PolicyPojo getPolicyByPolicyId(String policyId) throws ServiceException {
		throw new RuntimeException("No impl, Implemented by any subclass.");
	}

	protected PolicyPojo getPolicyByPolicyIdFromDB(String policyId) throws ServiceException {
		Assert.notNull(policyId);
		PolicyPojo t_policyPojo = getPolicyBaseInfoFromDB(policyId);
		if (null == t_policyPojo) {
			S_LOGGER.error("No base policy data in db.[policyId=" + policyId + "]");
			return null;
		}

		return getPolicyByPolicyBaseInfoFromDB(t_policyPojo);
	}

	protected PolicyPojo getPolicyByPolicyBaseInfoFromDB(PolicyPojo policyBaseInfo) throws ServiceException {
		Assert.notNull(policyBaseInfo);
		PolicyPojo t_policyPojo = policyBaseInfo;

		String t_policyType = t_policyPojo.getPolicyType();
		IPolicyService t_service = getPolicyService(t_policyType);
		if (PolicyType.isLogPolicy(t_policyType)
		    || PolicyType.TRAP.getId().equals(t_policyType)
		    || PolicyType.ROOM.getId().equals(t_policyType)) {
			return getPolicyFromDB(t_policyPojo.getId());
		} else {
			return t_service.getPolicyByPolicyId(t_policyPojo.getId());
		}
	}

	protected PolicyPojo getPolicyFromDB(String policyId) throws ServiceException {
		Assert.notNull(policyId);
		PolicyPojo t_policyPojo = getPolicyBaseInfoFromDB(policyId);
		if (null == t_policyPojo) {
			S_LOGGER.error("No policy data in db.[policyId=" + policyId + "]");
			return null;
		}

		List<PolicyResRelPojo> t_resRelPojos = getPolicyResRelFromDB(policyId);
		t_policyPojo.setListPolicyResRelPojo(t_resRelPojos);
		List<PolicyEventPojo> t_eventPojos = getPolicyEventsFromDB(policyId);
		t_policyPojo.setListPolicyEventPojo(t_eventPojos);
		return t_policyPojo;
	}

	/**
	 * 获取原始版本策略ID.
	 * 
	 * @param policyId
	 *            新版本策略ID
	 * @return 原始版本策略ID
	 * @throws ServiceException
	 *             Service层异常
	 */
	public String getOriVersionId(final String policyId) throws ServiceException {
		try {
			return m_baseInfoDAO.doSelectOriPolicyId(policyId);
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}

	/**
	 * 获取原始版本策略ID.
	 * 
	 * @param policyIds
	 *            新版本策略ID
	 * @return 原始版本策略ID
	 * @throws ServiceException
	 *             Service层异常
	 */
	public List<String> getOriVersionIds(final List<String> policyIds) throws ServiceException {
		try {
			return m_baseInfoDAO.doSelectOriPolicyIds(policyIds);
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}

	/**
	 * 如果需要建立了新版本，就产生新版本，否则不产生.
	 * 
	 * @param policyId
	 *            老版本ID
	 * @param userId
	 *            修改人
	 * @return 新版本或老版本ID
	 * @throws ServiceException
	 *             Service层异常
	 */
	protected String productNewVersion(final String policyId, final String userId) throws ServiceException {
		// // 判断是否要新建一条新版本策略
		// try {
		// String t_newPolicyId = null;
		// if (isCreateNewVersion(policyId)) {
		// PolicyPojo t_copyPolicy = newVersionPolicy(policyId, userId);
		// createPolicy(t_copyPolicy);
		// m_baseInfoDAO.doUpdatePolicyVersion(policyId, Constants.FALSE);
		// t_newPolicyId = t_copyPolicy.getId();
		// }
		// return t_newPolicyId != null ? t_newPolicyId : policyId;
		// } catch (DAOException t_e) {
		// throw new ServiceException(t_e);
		// }

		// 移除产生新版本策略这一功能，所有策略修改均不产生新版本
		return policyId;
	}

	/**
	 * 用原始版策略ID替换新版本策略ID.
	 * 
	 * @param newPolicyId
	 *            新版本策略ID
	 * @param oriPolicyId
	 *            原始版本策略ID
	 * @throws ServiceException
	 *             Service层异常
	 */
	protected void modifyPolicyIdByOriPolicyId(final String newPolicyId, final String oriPolicyId) throws ServiceException {
		try {
			m_baseInfoDAO.doUpdatePolicyIdByOriPolicyId(newPolicyId, oriPolicyId);
			m_resRelDAO.doUpdatePolicyIdByOriPolicyId(newPolicyId, oriPolicyId);
			m_eventDAO.doUpdatePolicyIdByOriPolicyId(newPolicyId, oriPolicyId);
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}

	/**
	 * 计算出所有要被删除的策略ID,包括新版本和老版本.
	 * 
	 * @param policyIds
	 *            新版本策略ID列表
	 * @return 要被删除的策略ID,包括新版本和老版本
	 * @throws ServiceException
	 *             Service层异常
	 */
	protected List<String> getRemovePolicyIds(final List<String> policyIds) throws ServiceException {
		List<String> t_policyIdList = new ArrayList<String>();
		t_policyIdList.addAll(policyIds);
		List<String> t_oriPolicyIds = getOriVersionIds(policyIds);
		if (t_oriPolicyIds != null && !t_oriPolicyIds.isEmpty()) {
			for (String t_oriPolicyId : t_oriPolicyIds) {
				if (StringUtils.isNotBlank(t_oriPolicyId)) {
					t_policyIdList.add(t_oriPolicyId);
				}
			}
		}
		return t_policyIdList;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.policy.IPolicyService#checkPublishStatus(java.lang.String)
	 */
	public boolean checkPublishStatus(final String policyId) throws ServiceException {
		try {
			byte t_publishState = m_baseInfoDAO.doSelectPublishState(policyId);
			if (t_publishState == Constants.TRUE) {
				return true;
			}
			return false;
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.riil.base.policy.IPolicyService#checkUseStatus(java.lang.String)
	 */
	public boolean checkUseStatus(final String policyId) throws ServiceException {
		try {
			byte t_useState = m_baseInfoDAO.doSelectUseState(policyId);
			if (t_useState == Constants.TRUE) {
				return true;
			}
			return false;
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}

	/**
	 * <p>
	 * 判断是否创建这个策略的新版本.
	 * </p>
	 * <p>
	 * ispublish = 1, isuse= 1 已发布， 编辑时创建新版本
	 * </p>
	 * <p>
	 * ispublish = -1, isuse = 1 有已发布的原始版本，编辑时不创建新版本，只修改当前版本
	 * </p>
	 * <p>
	 * ispublish = -1, isuse = -1 未发布，编辑时不创建新版本，只修改当前版本
	 * </p>
	 * 
	 * @param policyId
	 *            策略ID
	 * @return true：创建新版本 false：不创建新版本
	 * @throws ServiceException
	 *             Service层异常
	 */
	protected boolean isCreateNewVersion(final String policyId) throws ServiceException {
		try {
			int t_count = m_baseInfoDAO.doSelectPublishCount(policyId);
			return (t_count > 0) ? true : false;
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}

	/**
	 * 生成原有策略的副本，并用已改变的属性值覆盖副本中的值.
	 * 
	 * @param oriPolicyId
	 *            原始策略ID
	 * @param userId
	 *            修改策略的userId
	 * @return 新版本的策略
	 * @throws ServiceException
	 *             Service层异常
	 */
	@Deprecated
	// 修改策略产生新版本策略这一功能已经移除，因此本方法废弃
	protected PolicyPojo newVersionPolicy(final String oriPolicyId, final String userId) throws ServiceException {
		PolicyPojo t_copyPolicy = getPolicyByPolicyIdFromDB(oriPolicyId);
		// 生成新的策略
		t_copyPolicy.setId(null);
		t_copyPolicy.setUpdateUser(userId);
		t_copyPolicy.setUpdateTime(new Date());
		t_copyPolicy.setOriginalPolicyId(oriPolicyId);
		return t_copyPolicy;
	}

	/**
	 * 策略对象组装.
	 * 
	 * @param newPolicyPojo
	 *            新对象
	 * @throws AssertException
	 *             异常
	 */
	protected void assembleNewPolicy(final PolicyPojo newPolicyPojo) throws AssertException {
		Assert.notNull(newPolicyPojo);
		newPolicyPojo.setId(null);
		newPolicyPojo.setCreateTime(new Date());
		newPolicyPojo.setUpdateTime((Date) null);
		newPolicyPojo.setPublishTime((Date) null);
		newPolicyPojo.setInUse(Constants.FALSE);
		newPolicyPojo.setIsDefault(Constants.FALSE);
		newPolicyPojo.setIsFactory(Constants.FALSE);
		newPolicyPojo.setIsMain(Constants.TRUE);
		List<PolicyResRelPojo> t_resRelPojos = newPolicyPojo.getListPolicyResRelPojo();
		if (t_resRelPojos != null && !t_resRelPojos.isEmpty()) {
			for (PolicyResRelPojo t_policyResRelPojo : t_resRelPojos) {
				t_policyResRelPojo.setId(null);
			}
		}
		List<PolicyEventPojo> t_policyEventPojos = newPolicyPojo.getListPolicyEventPojo();
		if (t_policyEventPojos != null && !t_policyEventPojos.isEmpty()) {
			for (PolicyEventPojo t_policyEventPojo : t_policyEventPojos) {
				t_policyEventPojo.setId(null);
				List<PolicyEventRulePojo> t_rulePojos = t_policyEventPojo.getListPolicyEventRulePojo();
				if (t_rulePojos != null && !t_rulePojos.isEmpty()) {
					for (PolicyEventRulePojo policyEventRulePojo : t_rulePojos) {
						policyEventRulePojo.setId(null);
					}
				}
			}
		}
	}

	/**
	 * 取得已经发布，并绑定资源的策略基础信息
	 * 
	 * @param policyType
	 * @param domainIds
	 * @return
	 * @throws ServiceException
	 */
	protected List<PolicyPojo> getPolicyBaseInfoByPolicyType4Publish(final String policyType, final List<String> domainIds) throws ServiceException {
		Assert.notNull(policyType);
		try {
			Map<String, Object> t_param = new HashMap<String, Object>();
			t_param.put("policyType", policyType);
			t_param.put("domainIds", domainIds);
			return m_baseInfoDAO.doSelectPolicyByPolicyType4Publish(t_param);
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.riil.base.policy.IPolicyService#getAllPolicyPojo4Publish()
	 */
	@Override
	public List<PolicyPojo> getAllPolicyPojo4Publish() throws ServiceException {
		throw new RuntimeException("No impl, Implemented by any subclass.");
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.policy.IPolicyService#getAllPolicyPojo4Publish(com.riil
	 * .base.pojo.enums.EnumRoot.ServerType, java.lang.String)
	 */
	@Override
	public List<PolicyPojo> getAllPolicyPojo4Publish(String serverId) throws ServiceException {
		throw new RuntimeException("No impl, Implemented by any subclass.");
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.policy.IPolicyService#getAllPolicyPojo4PublishByPolicyType
	 * (java.lang.String)
	 */
	@Override
	public List<PolicyPojo> getAllPolicyPojo4PublishByPolicyType(String policyType) throws ServiceException {
		throw new RuntimeException("No impl, Implemented by any subclass.");
	}

	/**
	 * 取得策略服务-根据策略类型
	 * 
	 * @param policyType
	 *            策略类型
	 * @return 策略服务
	 */
	protected IPolicyService getPolicyService(String policyType) {
		IPolicyService t_policySrv;
		// switch (PolicyType.parseGeneral(policyType)) {
		switch (PolicyType.parse(policyType)) {
		// case LOG_COMMONLOG:
		case LOG_SYSLOG:
		case LOG_WINDOWS:
		case TRAP:
		case ROOM:
			t_policySrv = this;
			break;
		case BIZ:
		case RES:
		case LINK:
			t_policySrv = m_resourcePolicyService;
			break;
		case SCRIPT_ADV:
		case SCRIPT_SIMPLE:
			t_policySrv = m_scriptPolicyService;
			break;
		default:
			t_policySrv = this;
			break;
		}
		return t_policySrv;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.policy.IPolicyService#isExisEventName(java.lang.String,
	 * java.lang.String, java.lang.String)
	 */
	@Override
	public boolean isExisEventName(String policyId, String eventId, String eventName) throws ServiceException {
		try {
			if (eventName == null || eventName.trim().equals("")) {
			    S_LOGGER.error("isExisEventName input eventName is null");
				return false;
			}
			PolicyEventPojo t_param = new PolicyEventPojo();
			t_param.setName(eventName);
			t_param.setEventId(eventId);
			t_param.setPolicyId(policyId);
			if (this.m_eventDAO.doSelectByName(t_param) > 0) {
				return true;
			} else {
				return false;
			}
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.policy.IPolicyService#isExisPolicyName(java.lang.String,
	 * java.lang.String, java.lang.String, java.lang.String)
	 */
	@Override
	public boolean isExisPolicyName(String domainId, String policyType, String policyId, String policyName) throws ServiceException {
		// 加策略类型判断，一个类型内，不能重复
		try {
			if (policyName == null || policyName.trim().equals("")) {
			    S_LOGGER.error("policyName input eventName is null");
				return false;
			}
			Map<String, String> t_param = new HashMap<String, String>();
			t_param.put("policyName", policyName);
			t_param.put("policyType", policyType);
			t_param.put("policyId", policyId);
			t_param.put("domainId", domainId);
			if (this.m_baseInfoDAO.doSelectByName(t_param) > 0) {
				return true;
			} else {
				return false;
			}
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.policy.IPolicyService#isExisPolicyName4Sub(java.lang.String
	 * , java.lang.String, java.lang.String, java.lang.String)
	 */
	@Override
	public boolean isExisPolicyName4Sub(String subPolicyId, final String subPolicyName, String mainPolicyId, String originalMainPolicyId)
			throws ServiceException {
		try {
			if (StringUtils.isBlank(subPolicyName)) {
			    S_LOGGER.error("isExisPolicyName4Sub input subPolicyName is null");
				return false;
			}
			String t_main = originalMainPolicyId;
			if (StringUtils.isBlank(originalMainPolicyId)) {
				t_main = mainPolicyId;
			}
			Map<String, String> t_param = new HashMap<String, String>();
			t_param.put("policyName", subPolicyName);
			t_param.put("mainPolicyId", t_main);
			t_param.put("policyId", subPolicyId);
			if (this.m_baseInfoDAO.doSelectByName(t_param) > 0) {
				return true;
			} else {
				return false;
			}
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.policy.IPolicyService#getPolicyByPolicyIdAndType(java.lang
	 * .String, java.lang.String)
	 */
	@Override
	public PolicyPojo getPolicyByPolicyIdAndType(String policyId, String policyType) throws ServiceException {
		try {
			// String t_policyType =
			// DataUtils.converPolicyTypeToLevelOne(policyType);
			String t_policyType = policyType;
			IPolicyService t_policySrv;
			switch (PolicyType.parse(t_policyType)) {
			// case LOG_COMMONLOG:
			case LOG_SYSLOG:
			case LOG_WINDOWS:
			case TRAP:
				// 日志和trap策略处理逻辑相同
				t_policySrv = this;
				return this.getPolicyByPolicyIdFromDB(policyId);
			case BIZ:
			case RES:
			case LINK:
				// 业务、资源和链路策略处理逻辑相同
				t_policySrv = m_resourcePolicyService;
				return (PolicyResPojo) t_policySrv.getPolicyByPolicyId(policyId);
			case SCRIPT_ADV:
			case SCRIPT_SIMPLE:
				// 脚本策略处理
				t_policySrv = m_scriptPolicyService;
				return (PolicyScriptPojo) t_policySrv.getPolicyByPolicyId(policyId);
			default:
				t_policySrv = this;
				break;
			}

			return t_policySrv.getPolicyByPolicyId(policyId);
		} catch (Exception e) {
			throw new ServiceException(e);
		}

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.policy.IPolicyService#removePolicyRelResByPolicyId(java
	 * .lang.String)
	 */
	@Override
	public void removePolicyRelResByPolicyId(String policyId) throws ServiceException {
		if (null == policyId) {
		    S_LOGGER.error("removePolicyRelResByPolicyId input policyId is null");
			return;
		}
		try {
			m_resRelDAO.doDeleteResRelByPolicyId(policyId);
		} catch (DAOException e) {
			throw new ServiceException(e);
		}
	}

	/**
	 * 加载策略文件
	 * 
	 * @param t_file
	 * @return
	 */
	public PolicyPojo loadPolicy(String policyId, String policyType, boolean isCache) {
		String path = BinFileUtils.getPath4Policy(policyId, policyType);
		File t_binf = new File(path);
		if (!t_binf.exists()) {
			 S_LOGGER.error(path + " 目录不存在");
			return null;
		}
		return loadFile(t_binf);
	}

	/**
	 * 加载策略文件到内存
	 * 
	 * @param file
	 */
	@Override
	public PolicyPojo loadFile(File file) {
		try {
			if (!BinFileUtils.isNormalFile(file.getPath())) {
				return null;
			}

			String fileName = file.getName();
			PolicyPojo t_policy;
			if (BinFileUtils.isPolicyFile4Res(fileName) || BinFileUtils.isPolicyFile4Link(fileName) || BinFileUtils.isPolicyFile4Biz(fileName)) {
				t_policy = SerializeUtil.convertBinToObject(PolicyResPojo.class, file.getAbsoluteFile());
				if (null != t_policy) {
					PolicyResPojo t_policyRes = (PolicyResPojo) t_policy;

					t_policyRes.updatePolicyId();
					ResTypePojo t_temp = m_resTypeService.getResTypeByID(t_policyRes.getResTypeId());
					Model t_model = m_modelService.getModel(t_policyRes.getModelId());
					if (t_temp == null) {
						S_LOGGER.error("Ignore this policy data file：" + t_policyRes.getId() + "；The tempId:" + t_policyRes.getResTypeId() + "  not found!");
					} else {
						// 更新策略的treeNodeId 和监控模板名称
						updateTreeNodeId(t_policyRes, t_temp);
						// 更新策略指标名称\更新策略指标inUse
						updateMetricName(t_policyRes, t_temp, t_model);
						// 更新策略事件名称
						updateEventName(t_policyRes, t_temp);
						// 检查事件是否存在
						checkEventExisted(t_policyRes, t_temp);
					}
					updateModelName(t_policyRes);
				}
			} else if (BinFileUtils.isPolicyFile4Script(fileName)) {
				t_policy = SerializeUtil.convertBinToObject(PolicyScriptPojo.class, file.getAbsoluteFile());
				if (null != t_policy) {
					((PolicyScriptPojo) t_policy).updatePolicyId();
				}
			} else if (BinFileUtils.isPolicyFile4Others(fileName)) {
				t_policy = SerializeUtil.convertBinToObject(PolicyPojo.class, file.getAbsoluteFile());
				if (null != t_policy) {
					t_policy.updatePolicyId();
				}
			} else {
				return null;
			}

			return t_policy;
		} catch (Exception t_e) {
			S_LOGGER.error("读取并反序列化文件出错,文件名：" + file.getAbsoluteFile() + "\n", t_e);
		}
		return null;
	}

	/**
	 * 更新模板名称和treeNodeId.
	 * 
	 * @param t_policyRes
	 * @param t_temp
	 */
	private void updateTreeNodeId(PolicyResPojo t_policyRes, ResTypePojo t_temp) {

		t_policyRes.setTreeNodeId(t_temp.getTreeNodeId());
		t_policyRes.setResTypeName(t_temp.getName());
	}

	/**
	 * 更新模型名称
	 * 
	 * @param t_policyRes
	 * @throws ServiceException
	 */
	private void updateModelName(PolicyResPojo t_policyRes) throws ServiceException {
		Model t_model = m_modelService.getModel(t_policyRes.getModelId());
		if (t_model == null) {
			S_LOGGER.error("Ignore this policy data file：" + t_policyRes.getId() + "；The modelId:" + t_policyRes.getModelId() + "  not found!");
		} else {
			t_policyRes.setModelName(t_model.getName());
		}
	}

	/**
	 * 更新策略指标名称.
	 * 
	 * @param t_policyRes
	 * @param t_temp
	 */
	private void updateMetricName(PolicyResPojo t_policyRes, ResTypePojo t_temp, Model model) {

		Map<String, PolicyMetricPojo> t_metrics = t_policyRes.getMapPolicyMetricPojo();
		if (null != t_metrics) {
			for (PolicyMetricPojo t_metric : t_metrics.values()) {
				if (t_metric == null) {
				    S_LOGGER.error("PolicyMetricPojo is null  policyId=" + t_policyRes.getId());
					continue;
				}
				if (null == t_metric.getMetricId()) {
				    S_LOGGER.error("t_metric.getMetricId() is null  policyId=" + t_policyRes.getId());
					continue;
				}
				MetricBasePojo t_metricBase = m_dictService.getDictPojo().getMetricBase(t_metric.getMetricId());
				if (null == t_metricBase) {
					S_LOGGER.error("策略中的指标，在模板中没有定义：PolicyId=" + t_policyRes.getId() + "； MetricId=" + t_metric.getMetricId() + "；TempId="
							+ t_policyRes.getResTypeId());
					continue;
				}
				t_metric.setName(t_metricBase.getName());
				if (model == null) {
				    S_LOGGER.error("model is null policyId=" + t_policyRes.getId());
					continue;
				}
				ModelMetricBindingPojo t_metricBind = model.gainModelMetricBindingPojo(t_metric.getMetricId());
				if (null == t_metricBind) {
					S_LOGGER.error("策略中的指标，在模型中没有定义：PolicyId=" + t_policyRes.getId() + "； MetricId=" + t_metric.getMetricId() + "；ModelId="
							+ t_policyRes.getModelId());
					continue;
				}
			}
		}
		else
		{
		    S_LOGGER.error("t_policyRes.getMapPolicyMetricPojo() metric is null  policyId=" + t_policyRes.getId());
		}
	}

	/**
	 * 更新策略指标名称.
	 * 
	 * @param t_policyRes
	 * @param t_temp
	 */
	private void updateEventName(PolicyResPojo t_policyRes, ResTypePojo t_temp) {

		Map<String, PolicyEventPojo> t_events = t_policyRes.getMapPolicyEventPojo();
		if (null != t_events) {
			for (PolicyEventPojo t_event : t_events.values()) {
				if (t_event == null) {
				    S_LOGGER.error("event is null  policyId=" + t_policyRes.getId());
					continue;
				}
				if (null == t_event.getEventId()) {
				    S_LOGGER.error("eventId is null  policyId=" + t_policyRes.getId());
					continue;
				}
				EventBasePojo t_eventBase = m_dictService.getDictPojo().getEventBase(t_event.getEventId());
				if (null == t_eventBase) {
					S_LOGGER.error("策略中的指标，在模板中没有定义：PolicyId=" + t_policyRes.getId() + "； EventId=" + t_event.getEventId() + "；ResTypeId="
							+ t_policyRes.getResTypeId());
					continue;
				}
				t_event.setName(t_eventBase.getName());
				t_event.setDesc(t_eventBase.getDesc());
			}
		}
		else
		{
		    S_LOGGER.error("t_policyRes.getMapPolicyEventPojo() events is null  policyId=" + t_policyRes.getId());
		}
	}

	/**
	 * 检查事件是否存在. <br>
	 * 在外边判断参数是否为空
	 * 
	 * @param t_policyRes
	 * @param t_temp
	 */
	private void checkEventExisted(PolicyResPojo t_policyRes, ResTypePojo t_temp) {
		List<PolicyEventPojo> t_eventList = t_policyRes.getListPolicyEventPojo();
		if (null != t_eventList) {
			for (PolicyEventPojo policyEventPojo : t_eventList) {
				EventBasePojo t_event = m_dictService.getDictPojo().getEventBase(policyEventPojo.getEventId());
				if (null == t_event) {
					S_LOGGER.error("策略中的事件，在模板中没有定义：PolicyId=" + t_policyRes.getId() + "； EventId=" + policyEventPojo.getEventId() + "；TempId="
							+ t_policyRes.getResTypeId());
				}
			}
		}
		else
		{
		    S_LOGGER.error("t_policyRes.getMapPolicyEventPojo() events is null  policyId=" + t_policyRes.getId());
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.policy.IPolicyService#getThresholdByInstMetricId(java.lang
	 * .String, java.lang.String)
	 */
	@Override
	public List<PolicyThresholdPojo> getThresholdByInstMetricId(String policyId, String metricId) throws ServiceException {
		if (null == policyId || null == metricId) {
		    S_LOGGER.error("getThresholdByInstMetricId input policyId is null or  metricId is null");
			return null;
		}
		PolicyResPojo t_policy = (PolicyResPojo) getPolicyByPolicyIdAndType(policyId, PolicyType.RES.getId());

		if (t_policy == null) {
		    S_LOGGER.error("getThresholdByInstMetricId PolicyResPojo is null policyId ==" + policyId);
			return null;
		}
		PolicyMetricPojo t_metric = t_policy.getPolicyMetricPojoByMetricId(metricId);
		if (t_metric == null) {
		    S_LOGGER.error("getThresholdByInstMetricId PolicyMetricPojo is null policyId ==" + policyId);
			return null;
		}
		return t_metric.getListPolicyThresholdPojo();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.riil.base.policy.IPolicyService#isTrigerAction(java.lang.String,
	 * java.lang.String)
	 */
	@Override
	public boolean isTrigerAction(String policyId, String eventId) throws ServiceException {
		if (null == policyId || null == eventId) {
		    S_LOGGER.error("isTrigerAction input policyId is null or  eventId is null");
			return false;
		}
		PolicyResPojo t_policy = (PolicyResPojo) getPolicyByPolicyIdAndType(policyId, PolicyType.RES.getId());
		if (t_policy == null) {
		    S_LOGGER.error("isTrigerAction PolicyResPojo is null  policyId ==" + policyId);
			return false;
		}
		List<PolicyActionPojo> t_action = t_policy.getPolicyActionPojoByEventId(eventId);
		if (t_action != null && !t_action.isEmpty()) {
			return true;
		}
		return false;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.policy.IPolicyService#getThreshold4Default(java.lang.String
	 * , java.lang.String, com.riil.base.pojo.enums.Enum4Metric.Status4Metric)
	 */
	@Override
	public int getThreshold4Default(String policyId, String metricId, Status4Metric status) throws ServiceException {
		List<PolicyThresholdPojo> t_list = getThresholdByInstMetricId(policyId, metricId);
		if (t_list == null) {
			return -1;
		}
		String exp = null;
		for (PolicyThresholdPojo t_threshold : t_list) {
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
				String regex = "\\d+";
				Pattern p = Pattern.compile(regex);
				Matcher m = p.matcher(exp);
				while (m.find()) {
					exp = m.group();
					break;
				}
				return Integer.parseInt(exp);

			}
		}

		return 0;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.policy.IPolicyService#getPolicyByModelId(java.lang.String,
	 * boolean)
	 */
	@Override
	public PolicyPojo getPolicyByModelId(String modelId, boolean isFactory) throws ServiceException {
		try {
			if (null == modelId) {
			    S_LOGGER.error("getPolicyByModelId input modelId is null ");
				return null;
			}
			if (isFactory) {
				String policyId = BinFileUtils.getDefaultPolicyIdByModelId(modelId);

				return loadFactoryPolicy(policyId);
			} else {
				return getPolicyByPolicyIdFromDB(m_baseInfoDAO.doSelectDefaultPolicyIdByModelId(modelId));
			}
		} catch (DAOException e) {
			throw new ServiceException(e);
		}

	}

	@Override
	public PolicyPojo getFactoryLinkPolicyByModelId(String modelId, BandwidthType type) throws ServiceException {
		try {
			if (null == modelId || type == null) {
			    S_LOGGER.error("getFactoryLinkPolicyByModelId input modelId is null or  type is null");
				return null;
			}
			PolicyPojo t_policy = m_baseInfoDAO.doSelectByID(m_baseInfoDAO.doSelectDefaultPolicyIdByModelId(modelId));
			if (t_policy == null) {
			    S_LOGGER.error("getFactoryLinkPolicyByModelId PolicyPojo is null  modelId ==" + modelId);
				return null;
			}
			if (type.getId().equals(t_policy.getBandwidthType())) {
				return loadFactoryPolicy(t_policy.getId());
			} else {
				String policyId = BinFileUtils.getDefaultPolicyIdByModelId(modelId, type.getId());
				return loadFactoryPolicy(policyId);
			}
		} catch (DAOException e) {
			throw new ServiceException(e);
		}
	}

	@Override
	public String modifyLogPolicyResRel(String policyId, String userId, List<PolicyResRelPojo> resRelPojos) throws ServiceException {
		throw new RuntimeException("No impl, Implemented by any subclass.");
	}

	@Override
	public String modifyTrapPolicyResRel(String policyId, String userId, List<PolicyResRelPojo> resRelPojos) throws ServiceException {
		throw new RuntimeException("No impl, Implemented by any subclass.");
	}

    @Override
    public PolicyBasePojo getPolicyBaseByInstId(String instId, String subInstId, PolicyType policyType)
        throws ServiceException {
        throw new RuntimeException("No impl, Implemented by any subclass.");
    }
	/**
	 * 加载出厂策略文件
	 * 
	 * @param t_file
	 * @return
	 */
	private PolicyPojo loadFactoryPolicy(String policyId) {
		String path = BinFileUtils.getPath4PolicyDefualt(policyId);
		File t_binf = new File(path);
		if (!t_binf.exists()) {
			S_LOGGER.error(path + " 目录不存在");
			return null;
		}
		return loadFile(t_binf);
	}

	@Override
	public void destroy() throws ServiceException {

	}

	@Override
	public void start() throws ServiceException {

	}

	/**
	 * 注入策略基础信息DAO.
	 * 
	 * @param baseInfoDAO
	 *            final PolicyBaseInfoDAO
	 */
	public void setBaseInfoDAO(final PolicyBaseInfoDAO baseInfoDAO) {
		m_baseInfoDAO = baseInfoDAO;
	}
	
	public PolicyBaseInfoDAO getBaseInfoDAO() {
		return m_baseInfoDAO;
	}

	/**
	 * 注入策略事件信息DAO.
	 * 
	 * @param eventDAO
	 *            final PolicyEventDAO
	 */
	public void setEventDAO(final PolicyEventDAO eventDAO) {
		m_eventDAO = eventDAO;
	}

	/**
	 * 注入策略关联资源实例DAO.
	 * 
	 * @param resRelDAO
	 *            final PolicyResRelDAO
	 */
	public void setResRelDAO(final PolicyResRelDAO resRelDAO) {
		m_resRelDAO = resRelDAO;
	}

	public void setScriptPolicyService(IScriptPolicyService scriptPolicyService) {
		m_scriptPolicyService = scriptPolicyService;
	}

	public void setResourcePolicyService(IResourcePolicyService resourcePolicyService) {
		m_resourcePolicyService = resourcePolicyService;
	}

	public void setResTypeService(IResTypeService resTypeService) {
		m_resTypeService = resTypeService;
	}
	
	public void setDictService(IDictService dictService) {
		m_dictService = dictService;
	}

	public void setModelService(IModelService modelService) {
		m_modelService = modelService;
	}

    @Override
    public void updateCache(String policyId) throws ServiceException {
        throw new RuntimeException("No impl, Implemented by any subclass.");
    }
}
