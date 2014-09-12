package com.riil.base.policy.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;

import com.riil.base.pojo.enums.Enum4ResType.ResCatalog;
import com.riil.base.pojo.enums.EnumRoot;
import com.riil.base.pojo.enums.EnumRoot.PolicyLogType;
import com.riil.base.pojo.enums.EnumRoot.PolicyScriptType;
import com.riil.base.pojo.enums.EnumRoot.PolicyType;
import com.riil.base.resmodel.pojo.policy.PolicyBasePojo;
import com.riil.base.resmodel.pojo.policy.PolicyEventPojo;
import com.riil.base.resmodel.pojo.policy.PolicyEventQueryParam;
import com.riil.base.resmodel.pojo.policy.PolicyPojo;
import com.riil.base.resmodel.pojo.policy.PolicyResRelPojo;
import com.riil.base.resmodel.tools.ImportOneFile2Db;
import com.riil.base.resource.IResChangeListener;
import com.riil.base.resource.IResInstBaseService;
import com.riil.base.resource.IResUniteService;
import com.riil.base.resource.pojo.ResBasePojo;
import com.riil.base.resource.pojo.ResInstBasePojo;
import com.riil.core.commons.Assert;
import com.riil.core.container.ContainerException;
import com.riil.core.dao.DAOException;
import com.riil.core.dao.PageDataPojo;
import com.riil.core.pojo.AbsPojo;
import com.riil.core.service.ServiceException;
import com.riil.core.utils.CloneUtil;


public class PolicyPortalService extends CachedPolicyService {
	
	protected IResUniteService m_resUniteService;
	protected IResInstBaseService m_resInstBaseService;

	@Override
	public synchronized void init() {
		super.init();
		addResInstBaseLisener();
	}
	
	private void addResInstBaseLisener() {
		try {
			m_resInstBaseService.addListener(new IResChangeListener() {
				@Override
				public void updateIsManaged(List<String> resIds, byte isManaged) throws ServiceException {
				}
				
				@Override
				public void update(List<ResInstBasePojo> resInstList) throws ServiceException {
				}
				
				//删除日志和Trap的虚资源
				@Override
				public void delete(List<ResInstBasePojo> resInstList) throws ServiceException {
						int batchResSize = 500;// 每次操作数
						int resCount = resInstList.size();// 总数
						int loopCount = (int) Math.ceil(resCount * 1d / batchResSize);// 循环次数
						// 导入资源实例
						for (int i = 0; i < loopCount; i++) {
							int from_index = batchResSize * i;
							int to_index = batchResSize * (i + 1);
							if (to_index > resCount) {
								to_index = resCount;
							}
							
							List<String> ids = getIds(resInstList.subList(from_index, to_index));
							m_resUniteService.removeByRelInstId(ids, null);
						}
				}
				
				private List<String> getIds(List<? extends AbsPojo> resInstList) {
					List<String> ids = new ArrayList<String>(resInstList.size());
					for(AbsPojo pojo : resInstList){
						ids.add(pojo.getId());
					}
					return ids;
				}

				@Override
				public void create(List<ResInstBasePojo> resInstList) throws ServiceException {
					// nothing to do
				}
			});
		} catch (ServiceException e) {
			S_LOGGER.error("addResInstBaseLisener error",e);
		}
	}

	@Override
//	@SuppressWarnings("unchecked")
	protected Map<String, PolicyPojo> getMap(){
		return policyMap;
	}
	
	@Override
	public void loadAllData() {
	    try {
            List<PolicyPojo> t_policys = getAllPolicy4PublishFromDB();

            for (PolicyPojo t_policy : t_policys) {
                getMap().put(t_policy.getId(), t_policy);
            }
            
            if (S_LOGGER.isDebugEnabled()) {
                S_LOGGER.debug("\n     Loaded " + getMap().size() );
            }
        } catch (ServiceException e) {
            S_LOGGER.error("PolicyCCSService loadAllData failed! ", e);
        }
	}
	
	private List<PolicyPojo> getAllPolicy4PublishFromDB() throws ServiceException {
        try{
            List<PolicyPojo> t_retList = new ArrayList<PolicyPojo>();
            
            List<PolicyPojo> t_baseList = m_baseInfoDAO.doSelectPolicy4Publish();
            for (PolicyPojo policyPojo : t_baseList) {
                PolicyPojo t_policy = getPolicyByPolicyBaseInfoFromDB(policyPojo);
                t_retList.add(t_policy);
            }
            
            return t_retList;
        }catch(DAOException e){
            throw new ServiceException(e);
        }
        
    }
	
	@Override
	public List<String> policyPublish(final String userId, final List<String> policyIds) throws ServiceException {
		Assert.notNull(policyIds);
		try {
			List<String> t_publishPolicyIds = new ArrayList<String>();
			for (String t_policyId : policyIds) {
				if (!checkPublishStatus(t_policyId)) {// 未发布
					String t_oriPolicyId = getOriVersionId(t_policyId);
					if (StringUtils.isBlank(t_oriPolicyId)) {
						// publish = 1, use = 1, publishTime = now, publilshUser
						// = currentUser
						m_baseInfoDAO.doPublish(userId, t_policyId);
						t_publishPolicyIds.add(t_policyId);
					} else {
						// delete oriPolicy
						removePolicyByPolicyId(t_oriPolicyId);
						// update policyId = oriPolicyId
						modifyPolicyIdByOriPolicyId(t_policyId, t_oriPolicyId);
						// newVersion: publish = 1, use = 1, oriPolicyId = null,
						// publishTime = now, publilshUser =
						// currentUser
						m_baseInfoDAO.doPublish(userId, t_oriPolicyId);
						t_publishPolicyIds.add(t_oriPolicyId);
					}
				} else {// 已发布
					m_baseInfoDAO.doPublish(userId, t_policyId);
					t_publishPolicyIds.add(t_policyId);
				}
			}
			return t_publishPolicyIds;
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}
	
	@Override
	public List<String> policyStop(final List<String> policyIds) throws ServiceException {
		Assert.notNull(policyIds);
		try {
			List<String> t_publishPolicyIds = new ArrayList<String>();
			for (String t_policyId : policyIds) {
				String t_oriPolicyId = getOriVersionId(t_policyId);
				if (StringUtils.isBlank(t_oriPolicyId)) {
					if (checkPublishStatus(t_policyId)) {
						// update oriid = null, publish = -1, use = -1
						m_baseInfoDAO.doStop(t_policyId);
						t_publishPolicyIds.add(t_policyId);
					}
				} else {
					// delete oriPolicy
					removePolicyByPolicyId(t_oriPolicyId);
					// update policyId = oriPolicyId
					modifyPolicyIdByOriPolicyId(t_policyId, t_oriPolicyId);
					// update oriid = null, publish = -1, use = -1
					m_baseInfoDAO.doStop(t_oriPolicyId);
					t_publishPolicyIds.add(t_oriPolicyId);
				}
			}
			return t_publishPolicyIds;
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}
	
	@Override
	public void importPolicy(PolicyPojo policy) throws ServiceException {
		Assert.notNull(policy);
		ImportOneFile2Db t_importer = new ImportOneFile2Db();
		try {
			t_importer.importPolicy(policy);
		} catch (ContainerException e) {
			throw new ServiceException(e);
		}
	}
	
	@Override
	public void createPolicy4InitData(PolicyPojo policy) throws ServiceException {
		try {
			m_baseInfoDAO.doInsertPojo(policy);
		
			m_eventDAO.insert(policy.getId(), policy.getListPolicyEventPojo());
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}

	@Override
	public void createOrModify(PolicyPojo policyPojo) throws ServiceException {
		getPolicyService(policyPojo.getPolicyType()).removePolicyByPolicyId(policyPojo.getId());
		getPolicyService(policyPojo.getPolicyType()).createPolicy(policyPojo);
	}
	
	@Override
	public void createPolicy(final PolicyPojo policyPojo) throws ServiceException {
		Assert.notNull(policyPojo);
		try {
			if (policyPojo.isDefault()) {
				PolicyPojo t_default = getPolicyBaseInfo(policyPojo.getOriginalPolicyId());
				if (t_default != null) {
					m_baseInfoDAO.doUpdatePojo(t_default);
				}
			}
			m_baseInfoDAO.doInsertPojo(policyPojo);
			List<PolicyResRelPojo> listPolicyResRelPojo = policyPojo.getListPolicyResRelPojo();
			if (null != listPolicyResRelPojo && !listPolicyResRelPojo.isEmpty()) {
				for (PolicyResRelPojo policyResRelPojo : listPolicyResRelPojo) {
					policyResRelPojo.setPolicyId(policyPojo.getId());
				}
				m_resRelDAO.doBatchInsertResRel(listPolicyResRelPojo);
			}

			m_eventDAO.doBatchInsertEvent(policyPojo.getId(), policyPojo.getListPolicyEventPojo());
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}
	
	@Override
	public void createLogPolicy(final PolicyPojo policyPojo) throws ServiceException {
		createRes(policyPojo);
		assembleNewPolicy(policyPojo);
		createPolicy(policyPojo);
	}
	
	private void createRes(PolicyPojo policyPojo) throws ServiceException {
		List<PolicyResRelPojo> t_resRels = policyPojo.getListPolicyResRelPojo();
		
		if(t_resRels.isEmpty()) return;
		
		List<ResBasePojo> t_result = new ArrayList<ResBasePojo>(t_resRels.size());
		
		for(PolicyResRelPojo resRel : t_resRels){
			ResBasePojo t_res = new ResBasePojo();
			t_res.setPolicyType(policyPojo.getPolicyType());
			t_res.setName(policyPojo.getPolicyType());
			t_res.setResCatalog(getResCatalog(policyPojo.getPolicyType()).getId());
			t_res.setDomainId(policyPojo.getUserDomainId());
			t_res.setTreeNodeId(policyPojo.getTreeNodeId());
			t_res.setResTypeId(policyPojo.getResTypeId());
			t_res.setRelInstId(resRel.getInstId());
			
			t_result.add(t_res);
			
			PolicyResRelPojo t_rel = new PolicyResRelPojo();
			t_rel.setPolicyId(policyPojo.getId());
			t_rel.setInstId(t_res.getId());
			t_rel.setIsMain((byte)-2); //虚资源
			policyPojo.addPolicyResRelPojo(t_rel);
		}
		
		m_resUniteService.create(t_result);
	}
	
	private ResCatalog getResCatalog(String policyType){
		if(PolicyType.isLogPolicy(policyType)){
			return ResCatalog.LOG;
		}
		
		if(PolicyType.isScriptPolicy(policyType)){
			return ResCatalog.SCRIPT;
		}
		
		switch (PolicyType.parse(policyType)) {
		case TRAP:
			return ResCatalog.TRAP;
		default:
			throw new RuntimeException("policyType : ["+policyType + "]  is not support!");
		}
	}
	
	@Override
	public void createTrapPolicy(final PolicyPojo policyPojo) throws ServiceException {
		createRes(policyPojo);
		assembleNewPolicy(policyPojo);
		createPolicy(policyPojo);
	}

	@Override
	public void createPolicyResRel(final String policyId, final String userId,
			final List<PolicyResRelPojo> policyResRelPojos) throws ServiceException {
		try {
			for (PolicyResRelPojo policyResRelPojo : policyResRelPojos) {
				policyResRelPojo.setPolicyId(policyId);
			}
			m_resRelDAO.doBatchInsertResRel(policyResRelPojos);
			// updateResInstPolicyInfo(policyId);
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}

	@Override
	public void createPolicyResRel(final List<PolicyResRelPojo> policyResRelPojos) throws ServiceException {
		if (null == policyResRelPojos || policyResRelPojos.isEmpty()) {
			return;
		}
		try {
			m_resRelDAO.doBatchInsertResRel(policyResRelPojos);
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}

	@Override
	public String createPolicyEvent(final String userId, final PolicyEventPojo policyEventPojo) throws ServiceException {
		Assert.notNull(policyEventPojo);
		try {
			m_eventDAO.doInsertEvent(policyEventPojo);
			return policyEventPojo.getPolicyId();
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}

	@Override
	public String createPolicyEvents(final String policyId, final String userId,
			final List<PolicyEventPojo> policyEventPojos) throws ServiceException {
		Assert.notNull(policyEventPojos);
		try {
			m_eventDAO.doBatchInsertEvent(policyId, policyEventPojos);
			return policyId;
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}

	@Override
	public List<String> removePolicyByPolicyId(final String policyId) throws ServiceException {
		Assert.notNull(policyId);
		// delete policy for ori and new
		try {
			List<String> t_mainPolicyIds = new ArrayList<String>();
			t_mainPolicyIds.add(policyId);
			List<String> t_policyIds = getRemovePolicyIds(t_mainPolicyIds);
			if (null == t_policyIds || t_policyIds.size() == 0) {
				return t_policyIds;
			}
			m_baseInfoDAO.doBatchDeletePolicyBaseInfo(t_policyIds);

			List<String> t_resIds = m_resRelDAO.doSelectResIdsByPolicyIds(t_policyIds);
			if(t_resIds !=null && t_resIds.size() > 0){
				m_resUniteService.removeByIds(t_resIds, new EnumRoot.IPolicyType[] {
						PolicyLogType.COMMONLOG, PolicyLogType.WINDOWS, PolicyLogType.SYSLOG, 
						PolicyScriptType.SIMPLE, PolicyScriptType.ADV, PolicyType.TRAP });
			}

			m_resRelDAO.doBatchDeleteResRelByPolicyIds(t_policyIds);
			m_eventDAO.doBatchDeleteEventByPolicyIds(t_policyIds);

			return t_policyIds;
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}

	@Override
	public List<String> removePolicyByPolicyIds(final List<String> policyIds) throws ServiceException {
		Assert.notNull(policyIds);
		if (null == policyIds || policyIds.size() == 0) {
			return null;
		}
		// delete policy for ori and new
		try {
			List<String> t_policyIdList = getRemovePolicyIds(policyIds);
			m_baseInfoDAO.doBatchDeletePolicyBaseInfo(t_policyIdList);

			List<String> t_resIds = m_resRelDAO.doSelectResIdsByPolicyIds(t_policyIdList);
			if(t_resIds != null && t_resIds.size() > 0){
				m_resUniteService.removeByIds(t_resIds, new EnumRoot.IPolicyType[] {
						PolicyLogType.COMMONLOG, PolicyLogType.WINDOWS, PolicyLogType.SYSLOG, 
						PolicyScriptType.SIMPLE, PolicyScriptType.ADV, PolicyType.TRAP });
			}
			
			m_resRelDAO.doBatchDeleteResRelByPolicyIds(t_policyIdList);
			m_eventDAO.doBatchDeleteEventByPolicyIds(t_policyIdList);

			return t_policyIdList;
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}

	@Override
	public void removePolicyRelResByResIds(final String policyType, final List<String> resInstanceIds)
			throws ServiceException {
		if (null == resInstanceIds || resInstanceIds.size() == 0) {
			return;
		}
		try {
			m_resRelDAO.doDeleteResRelByResIds(policyType, resInstanceIds);
			
			if(PolicyType.isLogPolicy(policyType) 
					|| PolicyType.TRAP.getId().equals(policyType)){
				m_resUniteService.removeByRelInstId(resInstanceIds, PolicyType.parse(policyType));
			}
			
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}

	@Override
	public void removePolicyRelResByPolicyIdAndResIds(final String policyId, final boolean policyIsMain, final String policyType, final List<String> resInstanceIds)
			throws ServiceException {
		try {
			Assert.notNull(policyType);
			
			if (null == resInstanceIds || resInstanceIds.size() == 0) {
				return;
			}
			String t_policyType = policyType;
			
			m_resRelDAO.doDeleteResRelByPolicyIdAndResIds(policyId, resInstanceIds, policyIsMain);
			
			if(PolicyType.isLogPolicy(policyType)
					|| PolicyType.TRAP.getId().equals(policyType)){
				m_resUniteService.removeByRelInstId(resInstanceIds, PolicyType.parse(t_policyType));
			}

		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}

	@Override
	public String removePolicyEvents(final String policyId, final String userId) throws ServiceException {
		Assert.notNull(policyId);
		try {
			m_eventDAO.doDeleteEventByPolicyId(policyId);
			return policyId;
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}

	@Override
	public String removePolicyEvents(final String policyId, final String userId, final List<String> eventIds)
			throws ServiceException {
		Assert.notNull(policyId);
		Assert.notNull(eventIds);
		if (null == eventIds || eventIds.size() == 0) {
			return policyId;
		}
		try {
			m_eventDAO.doDeleteEventByPolicyIdAndEventIds(policyId, eventIds);
			return policyId;
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}

	@Override
	public String removePolicyEvent(final String policyId, final String userId, final String eventId)
			throws ServiceException {
		Assert.notNull(policyId);
		Assert.notNull(eventId);
		List<String> t_eventIds = new ArrayList<String>();
		t_eventIds.add(eventId);
		try {
			m_eventDAO.doDeleteEventByPolicyIdAndEventIds(policyId, t_eventIds);
			return policyId;
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}

	@Override
	public String modifyPolicyBaseInfo(final PolicyPojo policyPojo) throws ServiceException {
		Assert.notNull(policyPojo);
		Assert.notNull(policyPojo.getId());
		Assert.notNull(policyPojo.getUpdateUser());
		try {
			PolicyPojo t_policy = m_baseInfoDAO.doSelectByID(policyPojo.getId());// 根据新版版本PolicyId，非policyPojo.getId()
			if (t_policy != null) {
				t_policy.setName(policyPojo.getName());
				t_policy.setDesc(policyPojo.getDesc());
				t_policy.setFrequency(policyPojo.getFrequency());
				t_policy.setFileName(policyPojo.getFileName());
				t_policy.setArgs(policyPojo.getArgs());
				t_policy.setUpdateUser(policyPojo.getUpdateUser());
				t_policy.setUpdateTime(policyPojo.getUpdateTime());
				t_policy.setSeparatorCol(policyPojo.getSeparatorCol());
				t_policy.setSeparatorRow(policyPojo.getSeparatorRow());
				m_baseInfoDAO.doUpdatePojo(t_policy);
			}
			return policyPojo.getId();
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}

	@Override
	public String modifyLogPolicyResRel(String policyId, String userId, List<PolicyResRelPojo> resRelPojos)
			throws ServiceException {
		return modifyLogOrTrapPolicyResRel(policyId, userId, resRelPojos);
	}
	
	@Override
	public String modifyTrapPolicyResRel(String policyId, String userId, List<PolicyResRelPojo> resRelPojos)
			throws ServiceException {
		return modifyLogOrTrapPolicyResRel(policyId, userId, resRelPojos);
	}
	
	
	private String modifyLogOrTrapPolicyResRel(final String policyId, final String userId,
			final List<PolicyResRelPojo> resRelPojos) throws ServiceException {
		Assert.notNull(resRelPojos);
		try {
			PolicyPojo t_policyPojo = m_baseInfoDAO.doSelectByID(policyId);
			if(t_policyPojo==null){
				return policyId;
			}
			
			List<String> t_oldResIds = m_resRelDAO.doSelectResIdsByPolicyIds(Arrays.asList(new String[] {policyId}));
			if (t_oldResIds.size() > 0) {
				m_resUniteService.removeByIds(t_oldResIds, new EnumRoot.IPolicyType[] {
						PolicyLogType.COMMONLOG, PolicyLogType.WINDOWS, PolicyLogType.SYSLOG, 
						PolicyScriptType.SIMPLE, PolicyScriptType.ADV, PolicyType.TRAP });
			}
			m_resRelDAO.doDeleteResRelByPolicyId(policyId);
			
			if (resRelPojos.size() > 0) {
				t_policyPojo.setListPolicyResRelPojo(resRelPojos);
				createRes(t_policyPojo);
				m_resRelDAO.doBatchInsertResRel(t_policyPojo.getListPolicyResRelPojo());
			}
			return policyId;
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}

	@Override
	public String modifyPolicyResRel(final String policyId, final String userId,
			final List<PolicyResRelPojo> resRelPojos) throws ServiceException {
		Assert.notNull(resRelPojos);
		try {
			m_resRelDAO.doDeleteResRelByPolicyId(policyId);
			if (resRelPojos.size() > 0) {
				for (PolicyResRelPojo policyResRelPojo : resRelPojos) {
					policyResRelPojo.setPolicyId(policyId);
				}
				m_resRelDAO.doBatchInsertResRel(resRelPojos);
			}
			return policyId;
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}

	@Override
	public String modifyPolicyEvents(final String policyId, final String userId,
			final List<PolicyEventPojo> policyEventPojos) throws ServiceException {
		Assert.notNull(policyId);
		Assert.notNull(policyEventPojos);
		try {
			m_eventDAO.doUpdateEventWithOutRule(policyId, policyEventPojos);
			return policyId;
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}

	@Override
	public String modifyPolicyEvent(final String userId, final PolicyEventPojo policyEventPojo) throws ServiceException {
		Assert.notNull(policyEventPojo);
		try {
			m_eventDAO.doUpdateEvent(policyEventPojo);
			return policyEventPojo.getPolicyId();
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}
	
	@Override
	public PolicyPojo getPolicyBaseInfo(final String policyId) throws ServiceException {
		return getPolicyBaseInfoFromDB(policyId);
	}
	
	@Override
	public List<PolicyResRelPojo> getPolicyResRel(final String policyId) throws ServiceException {
		return getPolicyResRelFromDB(policyId);
	}
	
	@Override
	public List<PolicyPojo> getNewVersinoPolicyBaseInfoByTypeAndResIds(final List<String> resInstanceIds,
			final String policyType) throws ServiceException {
		try {
			return m_baseInfoDAO.doSelectNewVersionPolicyBaseInfo(resInstanceIds, policyType);
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}
	
	@Override
	public List<PolicyPojo> getNewVersinoPolicyBaseInfoByTypesAndResId(List<String> policyTypes, String resId)
			throws ServiceException {
		Assert.notEmpty(policyTypes);
		try {
			return m_baseInfoDAO.doSelectNewVersinoByTypesAndResId(policyTypes, resId);
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}
	
	@Override
	public List<PolicyEventPojo> getPolicyEvents(final String policyId) throws ServiceException {
		return getPolicyEventsFromDB(policyId);
	}
	
	public PageDataPojo<PolicyEventPojo> getPolicyEventsByParam(final PolicyEventQueryParam policyEventPojoQueryParam)
			throws ServiceException {
		Assert.notNull(policyEventPojoQueryParam);
		try {
			return m_eventDAO.doSelectEventWithRuleByPolicyEvent(policyEventPojoQueryParam);
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}
	
	@Override
	public PolicyEventPojo getPolicyEventByEventId(final String policyId, final String eventId) throws ServiceException {
		Assert.notNull(eventId);
		try {
			return m_eventDAO.doSelectEventByPolicyIdAndEventId(policyId, eventId);
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}
	
	@Override
	public List<PolicyPojo> getPolicyBaseInfoByPolicyType(final String policyType, final List<String> domainIds)
			throws ServiceException {
		Assert.notNull(policyType);
		try {
			Map<String, Object> t_param = new HashMap<String, Object>();
			t_param.put("policyType", policyType);
			t_param.put("domainIds", domainIds);
			return m_baseInfoDAO.doSelectNewVersionMainPolicyByPolicyType(t_param);
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}
	
	@Override
	public List<PolicyPojo> getPolicyBaseInfoByPolicyTypeAll(final String policyType, final List<String> domainIds)
			throws ServiceException {
		Assert.notNull(policyType);
		try {
			Map<String, Object> t_param = new HashMap<String, Object>();
			t_param.put("policyType", policyType);
			t_param.put("domainIds", domainIds);
			return m_baseInfoDAO.doSelectNewVersionMainPolicyByPolicyTypeAll(t_param);
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}

	@Override
	public List<PolicyPojo> getPolicyBaseInfoByPolicyType4InUse(final String policyType, final List<String> domainIds)
			throws ServiceException {
		Assert.notNull(policyType);
		try {
			Map<String, Object> t_param = new HashMap<String, Object>();
			t_param.put("policyType", policyType);
			t_param.put("domainIds", domainIds);
			t_param.put("inUse", 1);
			return m_baseInfoDAO.doSelectNewVersionMainPolicyByPolicyType(t_param);
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}

	@Override
	public PolicyPojo getPolicyByPolicyId(String policyId) throws ServiceException {
	    
	    Map<String, PolicyPojo>  t_policyMap = getPolicyCache();
	    
		if (!t_policyMap.containsKey(policyId))
		{
		    PolicyPojo t_policyPojo = getPolicyByPolicyIdFromDB(policyId);
		    
		    if (t_policyPojo == null)
		        return null;
		    t_policyMap.put(policyId,t_policyPojo );
		}

		return CloneUtil.deepCopy(t_policyMap.get(policyId));
	}
	
    @Override
    public PolicyBasePojo getPolicyBaseByInstId(String instId, String subInstId, PolicyType policyType)
        throws ServiceException {
        Assert.notNull(policyType);

        PolicyBasePojo t_policyBase = null;
        try {
            List<PolicyBasePojo> t_basePolicys =
                m_baseInfoDAO.doSelectPolicyBaseByInstId(instId, subInstId, policyType);
            if (t_basePolicys.size() > 0) {
            	for (PolicyBasePojo t_policy : t_basePolicys) {
					if(t_policy.isMain()){
						return t_policy;
					}
				}
            }
            return t_policyBase;
        } catch (DAOException t_e) {
            throw new ServiceException(t_e);
        }
    }
    
    @Override
    public void updateCache(String policyId) throws ServiceException {
        Map<String, PolicyPojo>  t_policyMap = getPolicyCache();
        
        PolicyPojo t_policyPojo = getPolicyByPolicyIdFromDB(policyId);
        if (t_policyPojo == null)
            return;
        t_policyMap.put(policyId,t_policyPojo );
    }

	public void setResUniteService(IResUniteService resUniteService) {
		m_resUniteService = resUniteService;
	}

	public void setResInstBaseService(IResInstBaseService resInstBaseService) {
		m_resInstBaseService = resInstBaseService;
	}
}
