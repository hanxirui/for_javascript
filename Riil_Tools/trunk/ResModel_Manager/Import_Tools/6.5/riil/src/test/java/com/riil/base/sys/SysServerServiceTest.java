package com.riil.base.sys;

import org.junit.Before;
import org.junit.Test;

import com.riil.base.pojo.enums.EnumRoot.ServerType;
import com.riil.base.pojo.sys.SysServerPojo;
import com.riil.core.container.ServiceContainer;
import com.riil.core.service.ServiceException;
import com.riil.core.test.BaseTest;

public class SysServerServiceTest extends BaseTest {
	ISysServerService m_srv;

	@Before
	public void setUp() throws Exception {
		m_srv = ServiceContainer.getInstance().getServiceComponent(ISysServerService.S_SERVICE_ID);

	}

	// @Test
	public void create() throws ServiceException {
		SysServerPojo sysServer = new SysServerPojo();
		String ipAddr = "172.16.13.100";
		sysServer.setServerType(ServerType.DCSServer.getId());
		sysServer.setId(ipAddr);
		sysServer.setIpAddr(ipAddr);
		sysServer.setManagerId("dps1");
		m_srv.createSysServer(sysServer);
		modify();
		m_srv.removeSysServer(sysServer.getId());
	}

	// @Test
	public void modify() throws ServiceException {
		SysServerPojo sysServer = new SysServerPojo();
		sysServer.setServerType("MDCS");
		sysServer.setId("dcs100");
		sysServer.setIpAddr("172.16.13.100");
		sysServer.setManagerId("dps1");
		m_srv.modifySysServer(sysServer);
	}

	@Test
	public void createOrModifySysServer() throws ServiceException {
		SysServerPojo sysServer = new SysServerPojo();
		String ipAddr = "172.16.13.100";
		sysServer.setServerType(ServerType.DCSServer.getId());
		sysServer.setId(ipAddr);
		sysServer.setIpAddr(ipAddr);
		sysServer.setManagerId("dps1");
		// sysServer.setInUse((byte) 1);
		m_srv.createOrModifySysServer(sysServer);
	}

	@Test
	public void getAllDcs() throws ServiceException {
		// List<SysServerPojo> list = m_srv.getAllDcs();
	}
}
