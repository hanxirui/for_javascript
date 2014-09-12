package com.riil.base.policy.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.riil.base.pojo.enums.EnumRoot.PolicyType;
import com.riil.base.resmodel.pojo.policy.PolicyPojo;
import com.riil.core.service.ServiceException;

public class PolicyLogServerService extends CachedPolicyService {
	
	@Override
	protected Map<String, PolicyPojo> getMap(){
		return policyMap;
	}
	
	@Override
	public void loadAllData() {
		//nothing to do
	}
	
	@Override
	public List<PolicyPojo> getAllPolicyPojo4Publish(String serverId) throws ServiceException {

		Map<String, PolicyPojo> policies = getPolicyMap();

		List<PolicyPojo> t_retList = new ArrayList<PolicyPojo>();

		for (Entry<String, PolicyPojo> entry : policies.entrySet()) {
			PolicyPojo pp = entry.getValue();
			if (! pp.getPolicyType().equals(PolicyType.RES.getId())) {
				t_retList.add(pp);
			}
		}

		return t_retList;
	}
}
