package com.riil.base.sys;

import org.junit.Before;
import org.junit.Test;

import com.riil.base.pojo.sys.SysServerRangePojo;
import com.riil.core.container.ServiceContainer;
import com.riil.core.service.ServiceException;
import com.riil.core.test.BaseTest;

public class SysServerRangeServiceTest extends BaseTest {

	ISysServerRangeService m_srv;

	@Before
	public void setUp() throws Exception {
		m_srv = ServiceContainer.getInstance().getServiceComponent(ISysServerRangeService.S_SERVICE_ID);

	}

	@Test
	public void create() throws ServiceException {
		SysServerRangePojo sysServer = new SysServerRangePojo();
		sysServer.setName("MDCS");
		sysServer.setServerId("dcs100");
		sysServer.setRangeType("r");
		m_srv.createSysServerRange(sysServer);
		m_srv.removeSysServerRange(sysServer.getId());
	}

}
