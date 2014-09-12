package com.riil.base.policy.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;

import com.riil.base.resmodel.pojo.policy.PolicyPojo;
import com.riil.core.commons.Assert;
import com.riil.core.service.ServiceException;

public abstract class CachedPolicyService extends PolicyService {

	/**
	 * 所有已发布的策略, key为策略id
	 */
	protected static final String S_ALL_POLICY = "S_ALL_POLICY";

	public static final Map<String, PolicyPojo> policyMap = new ConcurrentHashMap<String, PolicyPojo>();

	/**
	 * <code>isInit</code> - 是否已经初始化
	 */
	protected boolean isInitialized = false;

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.riil.base.policy.IPolicyService#init()
	 */
	@Override
	public synchronized void init() {
		if (isInitialized)
			return;
		loadAllData();
		S_LOGGER.error("PolicyService init succ........................");
		isInitialized = true;
	}

	public abstract void loadAllData();

	protected abstract Map<String, PolicyPojo> getMap();

	protected Map<String, PolicyPojo> getPolicyCache() {

		if (!isInitialized) {
			init();
		}

		return getMap();
	}

	@Override
	public Map<String, PolicyPojo> getPolicyMap() {
		return getPolicyCache();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.policy.IPolicyService#getPolicyByPolicyId(java.lang.String)
	 */
	@Override
	public PolicyPojo getPolicyByPolicyId(String policyId) throws ServiceException {
		Assert.notNull(policyId);

		Map<String, PolicyPojo> cache = null;

		if (policyMap.isEmpty()) {
			cache = getPolicyCache();
		} else {
			cache = policyMap;
		}

		// IMap<String, PolicyPojo> cache = getPolicyCache();

		PolicyPojo t_policyPojo = null;

		if (cache != null) {
			t_policyPojo = getPolicyCache().get(policyId);
		}

		return t_policyPojo;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.riil.base.policy.IPolicyService#getAllPolicyPojo4Publish()
	 */
	@Override
	public List<PolicyPojo> getAllPolicyPojo4Publish() throws ServiceException {
		if (policyMap.isEmpty()) {
			return new ArrayList<PolicyPojo>(getPolicyCache().values());
		} else {
			return new ArrayList<PolicyPojo>(policyMap.values());
		}
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
		List<PolicyPojo> t_retList = new ArrayList<PolicyPojo>();

		Map<String, PolicyPojo> policies = getPolicyMap();

		for (Entry<String, PolicyPojo> entry : policies.entrySet()) {
			PolicyPojo t_policy = entry.getValue();
			if (policyType.equals(t_policy.getPolicyType())) {
				t_retList.add(t_policy);
			}
		}

		return t_retList;
	}
}
