package com.riil.base.resmodel.impl;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.util.List;

import org.apache.log4j.Level;
import org.junit.After;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.springframework.test.context.ContextConfiguration;

import com.riil.base.pojo.dict.DictCollFrequencyPojo;
import com.riil.base.pojo.dict.DictPojo;
import com.riil.base.resmodel.IDictService;
import com.riil.base.resmodel.pojo.vendor.ModelSysoidPojo;
import com.riil.base.resmodel.pojo.vendor.VendorModelPojo;
import com.riil.core.container.ServiceContainer;
import com.riil.core.dam.tx.TransactionManager;
import com.riil.core.logger.SystemLogger;
import com.riil.core.service.ServiceException;
import com.riil.core.test.BaseTest;

@ContextConfiguration(locations = { "classpath*:META-INF/StandardServer/riil_service*.xml" })
public class DictServiceTest extends BaseTest {
	IDictService m_srv;

	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
		SystemLogger.changeLogLevel(Level.INFO);
	}

	@Before
	public void setUp() throws Exception {
		if (m_srv == null) {
			SystemLogger.changeLogLevel(Level.DEBUG);
			m_srv = ServiceContainer.getInstance().getServiceComponent(IDictService.S_SERVICE_ID);
			// BinFileUtils.setLazyLoad(false);
			// runSqlScript(new FileInputStream(new
			// File(TemplateServiceTest.class.getResource("").getPath()+S_INIT_SQL)));

		}
		TransactionManager.beginTransaction(TEST_DS);
	}

	@After
	public void tearDown() throws Exception {
		TransactionManager.rollbackTransaction();
	}

	@Test
	public void testGetDictPojo() {
		DictPojo t_dict = m_srv.getDictPojo();
		List<DictCollFrequencyPojo> t_collFren = t_dict.getListDictCollFrequencyPojo();
		assertFalse(t_collFren.isEmpty());
	}

	@Test
	public void testGetIfTypeName() {
		fail("Not yet implemented");
	}

	@Test
	public void testInit() {
		fail("Not yet implemented");
	}

	@Test
	public void getVendorHasResByResGroupId() throws Exception{
		String resGroupId = "res-group-01";
		String domainId = "domain_tj";
		List<VendorModelPojo> t_result = m_srv.getVendorHasResByResGroupId(resGroupId, domainId);
		assertNotNull(t_result);
		assertTrue(t_result.size() > 0);
		
		resGroupId = "res-group-01";
		domainId = null;
		t_result = m_srv.getVendorHasResByResGroupId(resGroupId, domainId);
		assertNotNull(t_result);
		assertTrue(t_result.size() > 0);
	}
	
	@Test
	public void getVendorHasCandidateResByResGroupId() throws Exception{
		String resGroupId = "res-group-01";
		String domainId = "domain_tj";
		List<VendorModelPojo> t_result = m_srv.getVendorHasCandidateResByResGroupId(resGroupId, domainId);
		assertNotNull(t_result);
		assertTrue(t_result.size() > 0);
		
		resGroupId = "res-group-01";
		domainId = null;
		t_result = m_srv.getVendorHasCandidateResByResGroupId(resGroupId, domainId);
		assertNotNull(t_result);
		assertTrue(t_result.size() > 0);
	}
	
	@Test
	public void testGetModelSysoidBySysoid() throws Exception{
		ModelSysoidPojo t_pojo = m_srv.getModelSysoidBySysoid("1.3.6.1.4.1.4881.1.1.10.1.75");
		assertNotNull(t_pojo);
	}
	
	@Test
	public void testGetModelSysoidBySysoid_MultiThread() throws Exception{
		final Object lock = new Object();
		Runnable[] t_workers = new Runnable[10];
		for(int i=0; i< t_workers.length ; i++){
			final int id = i;
			t_workers[i] = new Runnable() {
				
				@Override
				public void run() {					
					try {
						System.out.println(id+" -- in!");
						synchronized (lock) {
							lock.wait();
						}
						System.out.println(id+" -- start!");
						ModelSysoidPojo t_pojo = m_srv.getModelSysoidBySysoid("1.3.6.1.4.1.4881.1.1.10.1.75");
						assertNotNull(t_pojo);
						System.out.println(id+" -- over!");
						
					} catch (Exception e) {
						throw new RuntimeException(e);
					}
				}
			};
			
			new Thread(t_workers[i], String.valueOf(id)).start();
		}
		Thread.sleep(1 * 1000);
		synchronized (lock) {
			lock.notifyAll();
		}
		System.out.println("-- All start");
		Thread.sleep(10 * 1000);
		System.out.println("-- All over");
	}

	@Test
	public void testGetVendorByVendorId() {
		fail("Not yet implemented");
	}

	@Test
	public void testGetVendorMdoel() {
		fail("Not yet implemented");
	}

	@Test
	public void testGetModleVendorByModelId() {
		fail("Not yet implemented");
	}

	@Test
	public void testDataChange() {
		fail("Not yet implemented");
	}

	@Test
	public void testGetVendorModelsByQuery() {
		fail("Not yet implemented");
	}

	@Test
	public void testGetVendors() {
		fail("Not yet implemented");
	}
//
//	@Test
//	public void testGetVendorModelByTreeNodeId() throws ServiceException {
//	    String t_treeNodeId = TreeNodeId.HOST.getId();
//	    boolean t_hasRes = false;
//	    List<VendorModelPojo> t_vendor = m_srv.getVendorModelByTreeNodeId(t_treeNodeId, t_hasRes);
//	    assertTrue(t_vendor.size() > 0);
//	}

	@Test
	public void testGetHostOsTypeList() {
		fail("Not yet implemented");
	}
	
	@Test
	public void getModelSysoidByModelIdTest() throws ServiceException{
		String modelId = "RIIL_RMM_VIRTUAL_VMWARE_VM";
		ModelSysoidPojo modelSysoid = m_srv.getModelSysoidByModelId(modelId);
		m_srv.getVendorByVendorId(modelSysoid.getVendorId());
		assertNotNull(modelSysoid);
	}
}
