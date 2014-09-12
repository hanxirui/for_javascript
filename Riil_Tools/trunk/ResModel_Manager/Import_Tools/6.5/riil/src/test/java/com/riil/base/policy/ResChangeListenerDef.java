package com.riil.base.policy;

import java.util.List;

import org.apache.log4j.Logger;

import com.riil.base.resource.IResChangeListener;
import com.riil.base.resource.pojo.ResInstBasePojo;
import com.riil.core.commons.ServerModule;
import com.riil.core.logger.SystemLogger;

public class ResChangeListenerDef implements IResChangeListener {
	private static Logger S_LOGGER = SystemLogger.getSystemLogger(ResourcePolicyServiceTest.class,
			ServerModule.ResourceModel);
	private String m_id;

	public ResChangeListenerDef(String i) {
		this.m_id = i;
	}

	@Override
	public void create(List<ResInstBasePojo> resInstList) {
		if (S_LOGGER.isInfoEnabled()) {
			S_LOGGER.info(m_id + "create " + resInstList.size());
		}
	}

	@Override
	public void update(List<ResInstBasePojo> resInstList) {
		if (S_LOGGER.isInfoEnabled()) {
			S_LOGGER.info(m_id + "update " + resInstList.size());
		}
	}

	@Override
	public void delete(List<ResInstBasePojo> resInstList) {
		if (S_LOGGER.isInfoEnabled()) {
			S_LOGGER.info(m_id + "delete " + resInstList.size());
		}
	}

	@Override
	public void updateIsManaged(List<String> resIds, byte isManaged) {
		if (S_LOGGER.isInfoEnabled()) {
			S_LOGGER.info(m_id + "managedChange " + resIds.size() + "isManaged:" + isManaged);
		}

	}

}
