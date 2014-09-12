package com.riil.base.policy.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.riil.base.pojo.enums.EnumRoot.PolicyType;
import com.riil.base.resmodel.pojo.policy.PolicyPojo;
import com.riil.base.resmodel.pojo.policy.PolicyResRelPojo;
import com.riil.base.resource.IResInstanceService;
import com.riil.base.resource.pojo.ResInstancePojo;
import com.riil.core.container.ContainerException;
import com.riil.core.container.ServiceContainer;
import com.riil.core.service.ServiceException;

public class PolicyDCSService extends CachedPolicyService {

	@Override
	protected Map<String, PolicyPojo> getMap() {
		return policyMap;
	}

	@Override
	public void loadAllData() {
//		Map<String, PolicyPojo> map = getMap();
//		if (map == null) {
//			S_LOGGER.error("PolicyDCSService can't get cache from DataClusterClient");
//		} else {
//			policyMap.putAll(map);
//		}
	}

	@Override
	public Map<String, PolicyPojo> getPolicyMap() {

		if (policyMap.isEmpty()) {
			return getPolicyCache();
		} else {
			return policyMap;
		}
	}

	@Override
	protected Map<String, PolicyPojo> getPolicyCache() {

		if (!isInitialized) {
			init();
		}

		return policyMap;
	}

	@Override
	public List<PolicyPojo> getAllPolicyPojo4Publish(String serverId) throws ServiceException {

		IResInstanceService instanceService;
		try {
			instanceService = ServiceContainer.getInstance().getServiceComponent(IResInstanceService.S_SERVICE_ID);

			Map<String, ResInstancePojo> resource = instanceService.getResourceMap();

			List<PolicyPojo> t_retList = new ArrayList<PolicyPojo>();

			Map<String, PolicyPojo> policies = getPolicyMap();

			for (Entry<String, PolicyPojo> entry : policies.entrySet()) {
				PolicyPojo pp = entry.getValue();
				if (pp.getPolicyType().equals(PolicyType.RES.getId())) {
					List<PolicyResRelPojo> rel = pp.getListPolicyResRelPojo();
					if (rel == null) {
						S_LOGGER.error("getListPolicyResRelPojo() return null, policy id: " + pp.getId());
						continue;
					}
					for (PolicyResRelPojo policyRel : rel) {
						String instanceId = policyRel.getInstId();
						ResInstancePojo tmp = resource.get(instanceId);
						if (tmp != null && tmp.getServerId() != null && tmp.getServerId().equals(serverId)) {
							t_retList.add(pp);
							break;
						}
					}
				}
			}

			return t_retList;
		} catch (ContainerException e) {
			throw new ServiceException(e);
		}

	}

}
