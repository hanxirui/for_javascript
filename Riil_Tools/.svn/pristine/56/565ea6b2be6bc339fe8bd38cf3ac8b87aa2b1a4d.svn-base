package com.riil.base.resmodel.impl;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.util.List;

import org.apache.log4j.Level;
import org.apache.log4j.Logger;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import com.riil.base.resmodel.IVendorService;
import com.riil.base.resmodel.pojo.base.VendorPojo;
import com.riil.core.commons.ServerModule;
import com.riil.core.container.ContainerException;
import com.riil.core.container.ServiceContainer;
import com.riil.core.dam.tx.TransactionManager;
import com.riil.core.logger.SystemLogger;
import com.riil.core.service.ServiceException;
import com.riil.core.test.BaseTest;

public class VendorServiceTest extends BaseTest{
	private static Logger S_LOGGER = SystemLogger.getSystemLogger(VendorServiceTest.class,
			ServerModule.ResourceModel);
	
	private IVendorService m_srv;
	
	@Before
	public void setUp() throws Exception {
		if(m_srv == null){
			TransactionManager.beginTransaction();
			SystemLogger.changeLogLevel(Level.DEBUG);
			m_srv = ServiceContainer.getInstance().getServiceComponent(IVendorService.S_SERVICE_ID);
		}
	}
	
	@After
	public void tearDown() throws ContainerException, Exception{
		TransactionManager.rollbackTransaction();
	}
	
	@Test
	public void createVendorTest() throws ServiceException{
		VendorPojo vendor = new VendorPojo();
		vendor.setId("TEST");
		vendor.setName("测试厂商");
		vendor.setVendorIcon("vendor.png");
		vendor.setSortId(10000);
		
		m_srv.createVendor(vendor);
	}
	
	@Test
	public void modifyVendorTest() throws ServiceException{
		VendorPojo vendor = new VendorPojo();
		vendor.setId("3Com");
		vendor.setName("测试厂商");
		vendor.setVendorIcon("vendor.png");
		vendor.setSortId(10000);
		
		m_srv.modifyVendor(vendor);
	}
	
	@Test
	public void removeVendorTest() throws ServiceException{
		String vendorID = "3Com";
		
		m_srv.removeVendor(vendorID);
	}
	
	@Test
	public void removeAllVendorTest() throws ServiceException{
		m_srv.removeAllVendor();
	}
	
	@Test
	public void removeVendorByQuery() throws ServiceException{

	}
	
	@Test
	public void getVendorByIDTest() throws ServiceException{
		String vendorID = "3Com";
		VendorPojo vendor = m_srv.getVendorByID(vendorID);
		assertNotNull(vendor);
	}
	
	@Test
	public void getVendorByQuery() throws ServiceException{
		
	}
	
	@Test
	public void getAllVendor() throws ServiceException{
		
		List<VendorPojo> vendors = m_srv.getAllVendor();
		
		assertTrue(vendors.size() > 0);
	}
	
	
}
