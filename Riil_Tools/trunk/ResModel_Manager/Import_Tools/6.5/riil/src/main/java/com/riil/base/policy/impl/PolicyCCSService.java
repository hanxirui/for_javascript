package com.riil.base.policy.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.riil.base.pojo.enums.EnumRoot.PolicyType;
import com.riil.base.resmodel.pojo.policy.PolicyPojo;
import com.riil.core.dao.DAOException;
import com.riil.core.service.ServiceException;

public class PolicyCCSService extends CachedPolicyService {
	
	@Override
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
	
	protected List<PolicyPojo> getAllPolicy4PublishFromDB() throws ServiceException {
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
	public List<PolicyPojo> getAllPolicyPojo4Publish(String serverId) throws ServiceException {

		Map<String, PolicyPojo> policies = getPolicyMap();

		List<PolicyPojo> t_retList = new ArrayList<PolicyPojo>();

		for (Entry<String, PolicyPojo> entry : policies.entrySet()) {
			PolicyPojo pp = entry.getValue();
			if (!pp.getPolicyType().equals(PolicyType.RES.getId())) {
				t_retList.add(pp);
			}
		}

		return t_retList;
	}
}
