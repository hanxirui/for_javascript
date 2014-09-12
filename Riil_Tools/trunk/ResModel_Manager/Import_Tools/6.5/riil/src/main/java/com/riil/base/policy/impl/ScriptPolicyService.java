package com.riil.base.policy.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.BeanUtils;

import com.riil.base.pojo.enums.Enum4ResType.ResCatalog;
import com.riil.base.policy.IScriptPolicyService;
import com.riil.base.policy.impl.dao.PolicyScriptMetricDAO;
import com.riil.base.resmodel.pojo.policy.PolicyActionPojo;
import com.riil.base.resmodel.pojo.policy.PolicyEventPojo;
import com.riil.base.resmodel.pojo.policy.PolicyPojo;
import com.riil.base.resmodel.pojo.policy.PolicyResRelPojo;
import com.riil.base.resmodel.pojo.policy.PolicyScriptMetricPojo;
import com.riil.base.resmodel.pojo.policy.PolicyScriptPojo;
import com.riil.base.resmodel.pojo.policy.PolicyScriptResPojo;
import com.riil.base.resource.ScriptResInstBaseService;
import com.riil.base.resource.pojo.ResInstBasePojo;
import com.riil.base.resource.pojo.ResInstQueryParam;
import com.riil.base.utils.ResModelPojoUtils;
import com.riil.core.commons.Assert;
import com.riil.core.constant.Constants;
import com.riil.core.dao.DAOException;
import com.riil.core.dao.IQueryParam.SORT;
import com.riil.core.dao.PageDataPojo;
import com.riil.core.service.ServiceException;

/**
 * 脚本策略Service <br>
 * Create on : 2011-10-8<br>
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
public class ScriptPolicyService extends PolicyPortalService implements IScriptPolicyService {
	
	private ScriptResInstBaseService m_scriptResService;

	/**
	 * <code>m_scriptMetricDAO</code> - 脚本策略关联指标DAO.
	 */
	private PolicyScriptMetricDAO m_scriptMetricDAO;

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.admin.monitor.service.PolicyBaseService#createPolicy(com.riil
	 * .mserver.resmodel.pojo.PolicyPojo)
	 */
	@Override
	public void createPolicy(final PolicyPojo policyNormalPojo) throws ServiceException {
		try {
			if (null == policyNormalPojo || !(policyNormalPojo instanceof PolicyScriptPojo)) {
				return;
			}
			PolicyScriptPojo policyPojo = (PolicyScriptPojo) policyNormalPojo;
			m_baseInfoDAO.doInsertPojo(policyPojo);
			m_eventDAO.doBatchInsertEvent(policyPojo.getId(), policyPojo.getListPolicyEventPojo());
			if (null != policyPojo.getListPolicyScriptMetricPojo() && policyPojo.getListPolicyScriptMetricPojo().size() > 0) {
				m_scriptMetricDAO.doBatchInsertScriptMetric(policyPojo.getId(), policyPojo.getListPolicyScriptMetricPojo());
			}
			if (policyPojo.getListPolicyScriptResPojo() != null && policyPojo.getListPolicyScriptResPojo().size() > 0) {
				createRes(policyPojo);
				List<PolicyResRelPojo> listPolicyResRelPojo = genResRel(policyPojo.getId(), policyPojo.getListPolicyScriptResPojo());
				
				m_resRelDAO.doBatchInsertResRel(listPolicyResRelPojo);
			}
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}

	@Override
	public void createPolicy4InitData(PolicyPojo policy) throws ServiceException {
		Assert.isInstanceOf(PolicyScriptPojo.class, policy, "The policy isn't a instance of PolicyScriptPojo.");
		try {
			super.createPolicy4InitData(policy);
			PolicyScriptPojo policyPojo = (PolicyScriptPojo) policy;
			if (null != policyPojo.getListPolicyScriptMetricPojo() && policyPojo.getListPolicyScriptMetricPojo().size() > 0) {
				m_scriptMetricDAO.insert(policyPojo.getId(), policyPojo.getListPolicyScriptMetricPojo());
			}
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}
	
	private List<ResInstBasePojo> genRes(PolicyPojo policyPojo, List<PolicyScriptResPojo> scriptReses) {
		List<ResInstBasePojo> t_result = new ArrayList<ResInstBasePojo>(scriptReses.size());
		
		for(PolicyScriptResPojo scriptRes : scriptReses){
			scriptRes.setPolicyType(policyPojo.getPolicyType());
			scriptRes.setName(policyPojo.getPolicyType());
			scriptRes.setResCatalog(ResCatalog.SCRIPT.getId());
			scriptRes.setDomainId(policyPojo.getUserDomainId());
			scriptRes.setTreeNodeId(policyPojo.getTreeNodeId());
			scriptRes.setResTypeId(policyPojo.getResTypeId());
			scriptRes.setModelId(policyPojo.getModelId());
			t_result.add(scriptRes);
		}
		
		return t_result;
	}

	private List<PolicyResRelPojo> genResRel(String policyId, List<PolicyScriptResPojo> resList){
		List<PolicyResRelPojo> t_result = new ArrayList<PolicyResRelPojo>(resList.size());
		
		for(ResInstBasePojo t_res: resList){
			PolicyResRelPojo t_resRel = new PolicyResRelPojo();
			t_resRel.setPolicyId(policyId);
			t_resRel.setInstId(t_res.getId());
			t_resRel.setIsMain(Constants.TRUE);
			
			t_result.add(t_resRel);
		}
		
		return t_result;
	}
	
	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.admin.policy.service.IScriptPolicyService#createScriptPolicy
	 * (com.riil.mserver.resmodel.pojo.policy. PolicyPojo)
	 */
	@Override
	public void createScriptPolicy(final PolicyPojo policyPojo) throws ServiceException {
		assembleNewPolicy(policyPojo);
		createPolicy(policyPojo);

	}
	
	private void createRes(PolicyScriptPojo policyPojo) throws ServiceException {
		if (policyPojo.getListPolicyScriptResPojo() != null && policyPojo.getListPolicyScriptResPojo().size() > 0) {
			List<ResInstBasePojo> resList = genRes(policyPojo, policyPojo.getListPolicyScriptResPojo());
			
			m_scriptResService.create(resList);
		}
	}

	@Override
	@Deprecated //修改策略产生新版本策略这一功能已经移除，因此本方法废弃
	protected PolicyPojo newVersionPolicy(final String oriPolicyId, final String userId) throws ServiceException {
		PolicyPojo policyNormalPojo = super.newVersionPolicy(oriPolicyId, userId);
		if (null == policyNormalPojo || !(policyNormalPojo instanceof PolicyScriptPojo)) {
			return policyNormalPojo;
		}
		PolicyScriptPojo policyPojo = (PolicyScriptPojo) policyNormalPojo;
		if (policyPojo.getListPolicyScriptResPojo() != null && policyPojo.getListPolicyScriptResPojo().size() > 0) {
			for(PolicyScriptResPojo t_scriptRes : policyPojo.getListPolicyScriptResPojo() ){
				t_scriptRes.setId(null);
			}
		}
		
		return policyNormalPojo;
	}
	
	@Override
	public PolicyScriptResPojo getPojoByPrimaryKey(String id) throws ServiceException {		
		return toScriptRes(m_scriptResService.getById(id));
	}
	
	private List<PolicyScriptResPojo> toScriptRes(List<ResInstBasePojo> reses){
		if(reses==null || reses.isEmpty()){
			return new ArrayList<PolicyScriptResPojo>();
		}
		List<PolicyScriptResPojo> t_result = new ArrayList<PolicyScriptResPojo>(reses.size());
		
		for(ResInstBasePojo res : reses){
			t_result.add(toScriptRes(res));
		}
		
		return t_result;
	}
	
	private PolicyScriptResPojo toScriptRes(ResInstBasePojo res){
		if(res == null){
			return null;
		}else{
			return ResModelPojoUtils.parse(res, PolicyScriptResPojo.class);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.admin.policy.service.PolicyBaseService#getPolicyByPolicyId(java
	 * .lang.String)
	 */
	@Override
	public PolicyPojo getPolicyByPolicyId(String policyId) throws ServiceException {
		Assert.notNull(policyId);
		PolicyPojo t_policyPojo = super.getPolicyFromDB(policyId);
		if (null == t_policyPojo) {
			return t_policyPojo;
		}
		// 脚本策略对象
		PolicyScriptPojo t_scriptPolicyPojo = new PolicyScriptPojo();

		List<PolicyScriptResPojo> t_scriptResPojos = getScriptResByPolicyId(policyId);
		List<PolicyScriptMetricPojo> t_scriptMetricPojos = getScriptMetricByPolicyId(policyId);

		BeanUtils.copyProperties(t_policyPojo, t_scriptPolicyPojo);
		t_scriptPolicyPojo.setListPolicyScriptResPojo(t_scriptResPojos);
		t_scriptPolicyPojo.setListPolicyScriptMetricPojo(t_scriptMetricPojos);

		return t_scriptPolicyPojo;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.admin.policy.service.IScriptPolicyService#getScriptMetricByPolicyId
	 * (java.lang.String)
	 */
	@Override
	public List<PolicyScriptMetricPojo> getScriptMetricByPolicyId(String policyId) throws ServiceException {
		Assert.notNull(policyId);
		try {
			return m_scriptMetricDAO.doSelectScriptMetricByPolicyId(policyId);
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}

	@Override
	public Map<String, PolicyScriptMetricPojo> getScriptMetricMapByResId(String resId) throws ServiceException {
		Map<String, PolicyScriptMetricPojo> t_map = new HashMap<String, PolicyScriptMetricPojo>();
		List<PolicyScriptMetricPojo> t_list;

		try {
			t_list = m_scriptMetricDAO.getScriptMetricByResId(resId);
			if (t_list != null && !t_list.isEmpty()) {
				for (PolicyScriptMetricPojo t_pojo : t_list) {
					t_map.put(t_pojo.getMetricId(), t_pojo);
				}
			}
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
		return t_map;
	}

	/*
	 * liugang 2011/11/13 add (non-Javadoc)
	 * 
	 * @see
	 * com.riil.admin.policy.service.IScriptPolicyService#getScriptResByPojo
	 * (com.riil.base.resmodel.pojo.policy.PolicyScriptResPojo)
	 */
	@Override
	public PageDataPojo<PolicyScriptResPojo> getScriptResByPojo(final PolicyScriptResPojo policyScriptResPojo) throws ServiceException {
		ResInstQueryParam t_param = new ResInstQueryParam();
		handlePolicyType(policyScriptResPojo);
		t_param.setResInstBase(policyScriptResPojo);
		
		t_param.setPageIndex(policyScriptResPojo.getPageIndex());
		t_param.setPageSize(policyScriptResPojo.getPageSize());
		String t_orderBy = policyScriptResPojo.getOrderBy(); 
		if(t_orderBy !=null ){
			String t_sortColumn = null;
			int t_end = 0;
			if(t_orderBy.trim().endsWith(SORT.ASC.toString())){
				t_end = t_orderBy.indexOf(SORT.ASC.toString());
				t_sortColumn = t_orderBy.substring(0, t_end);
			}else if(t_orderBy.trim().endsWith(SORT.DESC.toString())){
				t_end = t_orderBy.indexOf(SORT.DESC.toString());
				t_sortColumn = t_orderBy.substring(0, t_end);
			}
			
			t_param.setSortColumn(t_sortColumn, policyScriptResPojo.getSortType());
		}
		PageDataPojo<ResInstBasePojo> t_res = m_scriptResService.getPageByQuery(t_param);
		
		PageDataPojo<PolicyScriptResPojo> t_result = new PageDataPojo<PolicyScriptResPojo>();
		t_result.setPageData(toScriptRes(t_res.getPageData()));
		t_result.setPageIndex(t_res.getPageIndex());
		t_result.setPageSize(t_res.getPageSize());
		t_result.setRecordCount(t_res.getRecordCount());
		
		return t_result;
	}

	private void handlePolicyType(final PolicyScriptResPojo policyScriptResPojo) {
		if(policyScriptResPojo.getPolicyType()==null){
			policyScriptResPojo.setPolicyType("");  //policyType=“” 资源查询中将不添加policyType='RES'条件
		}
	}
	
	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.admin.policy.service.IScriptPolicyService#getScriptResByPolicyId
	 * (java.lang.String)
	 */
	@Override
	public List<PolicyScriptResPojo> getScriptResByPolicyId(final String scriptPolicyId) throws ServiceException {
		List<PolicyScriptResPojo> psrp = m_scriptResService.getAllScriptResByPolicyId(scriptPolicyId, ResCatalog.SCRIPT);
		return psrp;
	}

	@Override
	public List<PolicyScriptResPojo> getScriptResListByPojo(final PolicyScriptResPojo policyScriptResPojo) throws ServiceException {
		ResInstQueryParam t_param = new ResInstQueryParam();
		handlePolicyType(policyScriptResPojo);
		t_param.setResInstBase(policyScriptResPojo);
		List<ResInstBasePojo> t_res = m_scriptResService.getListByQuery(t_param);
		return toScriptRes(t_res);
	}

	@Override
	public List<PolicyScriptResPojo> getScriptResListByResIds(List<String> resIds) throws ServiceException {
		return toScriptRes(m_scriptResService.getListByIds(resIds));
	}

	@Override
	public List<PolicyScriptResPojo> getScriptResPojoByIp(String ip) throws ServiceException {
		PolicyScriptResPojo param = new PolicyScriptResPojo();
		param.setPrimaryIp(ip);
		return getScriptResListByPojo(param);
	}
	
	@Override
	public List<PolicyPojo> getScriptPolicyBaseInfoByDomain(List<String> domainIds) throws ServiceException{
		try {
			Map<String, Object> t_param = new HashMap<String, Object>();
			t_param.put("inUse", Constants.TRUE);
			t_param.put("policyType", "SCRIPT");
			t_param.put("domainIds", (domainIds==null || domainIds.isEmpty())? null : domainIds);
			return m_baseInfoDAO.doSelectPolicyByPolicyType(t_param);
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}

	@Override
	public boolean isExisMetricName(String policyId, String metricId, String metricName) throws ServiceException {

		try {
			if (metricName == null || metricName.trim().equals("")) {
				return false;
			}
			PolicyActionPojo t_param = new PolicyActionPojo();
			t_param.setName(metricName);
			t_param.setId(metricId);
			t_param.setPolicyId(policyId);
			if (this.m_scriptMetricDAO.doSelectByName(t_param) > 0) {
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
	 * com.riil.admin.monitor.service.IPolicyBaseService#modifyPolicyEvents(
	 * java.util.List)
	 */
	@Override
	public String modifyPolicyEvents(final String policyId, final String userId, final List<PolicyEventPojo> policyEventPojos)
			throws ServiceException {
		Assert.notNull(policyId);
		Assert.notNull(policyEventPojos);
		try {
			m_eventDAO.doUpdateEventWithRule(policyId, policyEventPojos);
			return policyId;
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}

	@Override
	protected void modifyPolicyIdByOriPolicyId(final String newPolicyId, final String oriPolicyId) throws ServiceException {
		super.modifyPolicyIdByOriPolicyId(newPolicyId, oriPolicyId);
		try {
			m_scriptMetricDAO.doUpdatePolicyIdByOriPolicyId(newPolicyId, oriPolicyId);
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.admin.policy.service.IScriptPolicyService#modifyScriptMetric
	 * (java.lang.String, java.lang.String, java.util.List)
	 */
	@Override
	public String modifyScriptMetric(String policyId, String userId, List<PolicyScriptMetricPojo> scriptMetricPojos)
			throws ServiceException {

		// Assert.notNull(scriptMetricPojos);
		if (null == scriptMetricPojos) {
			return policyId;
		}
		for (PolicyScriptMetricPojo policyScriptMetricPojo : scriptMetricPojos) {
			if (null == policyScriptMetricPojo) {
				continue;
			}
			if (StringUtils.isBlank(policyScriptMetricPojo.getMetricId())) {
				policyScriptMetricPojo.setMetricId(policyScriptMetricPojo.getId());
			}
		}
		try {
			m_scriptMetricDAO.doDeleteScriptMetricByPolicyId(policyId);
			if (scriptMetricPojos != null && scriptMetricPojos.size() > 0) {
				m_scriptMetricDAO.doBatchInsertScriptMetric(policyId, scriptMetricPojos);
			}

			return policyId;
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.admin.policy.service.IScriptPolicyService#updateScriptRes(java
	 * .lang.String, java.lang.String, java.util.List)
	 */
	@Override
	public String modifyScriptRes(final String policyId, final String userId, final List<PolicyScriptResPojo> policyScriptResPojos)
			throws ServiceException {
		try {
			PolicyPojo t_policyPojo = m_baseInfoDAO.doSelectByID(policyId);
			if(t_policyPojo==null){
				return policyId;
			}
			
			removeResInstBase(policyId);
			m_resRelDAO.doDeleteResRelByPolicyId(policyId);
			
			if (policyScriptResPojos != null && !policyScriptResPojos.isEmpty()) {
				List<ResInstBasePojo> resList = genRes(t_policyPojo, policyScriptResPojos);
				List<PolicyResRelPojo> listPolicyResRelPojo = genResRel(policyId, policyScriptResPojos);
				
				m_scriptResService.create(resList);
				m_resRelDAO.doBatchInsertResRel(listPolicyResRelPojo);
			}
			return policyId;
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}

	private void removeResInstBase(String policyId) throws ServiceException, DAOException{
		List<String> t_policyIds = new ArrayList<String>();
		t_policyIds.add(policyId);
		List<String> t_resIds = m_resRelDAO.doSelectResIdsByPolicyIds(t_policyIds);
		if(t_resIds!=null && !t_resIds.isEmpty()){
			m_scriptResService.remove(t_resIds);
		}
	}
	
	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.admin.policy.service.PolicyBaseService#removePolicyByPolicyId
	 * (java.lang.String)
	 */
	@Override
	public List<String> removePolicyByPolicyId(final String policyId) throws ServiceException {
		try {
			removeResInstBase(policyId);
			
			List<String> t_policyIds = super.removePolicyByPolicyId(policyId);
			if (null == t_policyIds || t_policyIds.size() == 0) {
				return null;
			}
			
			m_scriptMetricDAO.doDeleteScriptMetricByPolicyIds(t_policyIds);
			return t_policyIds;
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.admin.policy.service.PolicyBaseService#removePolicyByPolicyIds
	 * (java.util.List)
	 */
	@Override
	public List<String> removePolicyByPolicyIds(final List<String> policyIds) throws ServiceException {
		try {
			for(String policyId : policyIds){
				removeResInstBase(policyId);
			}
			
			List<String> t_policyIdList = super.removePolicyByPolicyIds(policyIds);
			
			m_scriptMetricDAO.doDeleteScriptMetricByPolicyIds(t_policyIdList);
			return t_policyIdList;
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}

	@Override
	public void removePolicyRelResByPolicyId(String policyId) throws ServiceException {
		if (null == policyId) {
			return;
		}
		try {
			removeResInstBase(policyId);
			m_resRelDAO.doDeleteResRelByPolicyId(policyId);
		} catch (DAOException e) {
			throw new ServiceException(e);
		}
	}

	/**
	 * 注入脚本策略关联指标DAO.
	 * 
	 * @param scriptMetricDAO
	 *            脚本策略关联指标DAO
	 */
	public void setScriptMetricDAO(PolicyScriptMetricDAO scriptMetricDAO) {
		m_scriptMetricDAO = scriptMetricDAO;
	}

	public void setScriptResService(ScriptResInstBaseService scriptResService) {
		m_scriptResService = scriptResService;
	}
}
