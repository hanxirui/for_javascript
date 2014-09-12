package com.riil.base.policy.impl;

import java.util.ArrayList;
import java.util.List;

import com.riil.base.pojo.enums.EnumRoot.PolicyType;
import com.riil.base.policy.IPolicyService;
import com.riil.base.resource.IResChangeListener;
import com.riil.base.resource.IResChangeService;
import com.riil.base.resource.pojo.ResInstBasePojo;
import com.riil.core.container.ContainerException;
import com.riil.core.container.ServiceContainer;
import com.riil.core.service.ServiceException;

public class ResChangeListener implements IResChangeListener {

	@Override
	public void create(List<ResInstBasePojo> resInstList) {
	}

	@Override
	public void update(List<ResInstBasePojo> resInstList) {
	}

	@Override
	public void delete(List<ResInstBasePojo> resInstList) throws ServiceException {
		// System.err.println("ResChange4policyRel" + resInstList);
		if (null == resInstList || resInstList.size() == 0) {
			return;
		}
		List<String> resIds = new ArrayList<String>();

		for (ResInstBasePojo resInstBasePojo : resInstList) {
			if (null == resInstBasePojo) {
				continue;
			}
			resIds.add(resInstBasePojo.getId());
		}
		if (resIds.isEmpty()) {
			return;
		}
		try {
			IPolicyService t_srv = ServiceContainer.getInstance().getServiceComponent(IPolicyService.S_SERVICE_ID);
			t_srv.removePolicyRelResByResIds(PolicyType.RES.getId(), resIds);

		} catch (ContainerException e) {
			throw new ServiceException(e);
		}
	}

	@Override
	public void updateIsManaged(List<String> resIds, byte isManaged) {
	}

	public static void addListener() throws ServiceException {
		try {
			IResChangeService t_changeService = ServiceContainer.getInstance().getServiceComponent(IResChangeService.S_SERVICE_ID);
			t_changeService.addListener(new ResChangeListener());
		} catch (ContainerException e) {
			throw new ServiceException(e);
		}

	}
}
