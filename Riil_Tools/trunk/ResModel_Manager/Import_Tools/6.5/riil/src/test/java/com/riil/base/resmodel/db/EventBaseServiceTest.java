package com.riil.base.resmodel.db;

import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Level;
import org.apache.log4j.Logger;
import org.junit.After;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import com.riil.base.resmodel.IEventBaseService;
import com.riil.base.resmodel.pojo.base.EventBasePojo;
import com.riil.core.commons.ServerModule;
import com.riil.core.constant.Constants;
import com.riil.core.container.ContainerException;
import com.riil.core.container.ServiceContainer;
import com.riil.core.dam.tx.TransactionManager;
import com.riil.core.logger.SystemLogger;
import com.riil.core.service.ServiceException;
import com.riil.core.test.BaseTest;

/**
 * {class description} <br>
 * <p>
 * Create on : 2011-11-3<br>
 * <p>
 * </p>
 * <br>
 * 
 * @author panhongliang@ruijie.com.cn<br>
 * @version riil.base.resmodel.impl v6.0
 *          <p>
 *          <br>
 *          <strong>Modify History:</strong><br>
 *          user modify_date modify_content<br>
 *          -------------------------------------------<br>
 *          <br>
 */
public class EventBaseServiceTest extends BaseTest {
	private static Logger S_LOGGER = SystemLogger.getSystemLogger(EventBaseServiceTest.class,
			ServerModule.ResourceModel);
	IEventBaseService m_srv;
	
	@BeforeClass
	public static void setUpBeforeClass(){
		SystemLogger.changeLogLevel(Level.INFO);
	}
	
	@Before
	public void setUp() throws Exception{
		if(m_srv == null){
			SystemLogger.changeLogLevel(Level.DEBUG);
			m_srv = (IEventBaseService)ServiceContainer.getInstance().getServiceComponent(IEventBaseService.S_SERVICE_ID);
			TransactionManager.beginTransaction(TEST_DS);
		}
	}
	
	@After
	public void tearDown() throws Exception{
		TransactionManager.rollbackTransaction();
	}
	
	@Test
	public void createBatchTest() throws ServiceException{
		List<EventBasePojo> eventBasePojos = new ArrayList<EventBasePojo>();
		
		for (int i = 0; i < 6; i++) {
			EventBasePojo eventBase = new EventBasePojo();
			eventBase.setExpId(Constants.TRUE);
			eventBase.setName(String.valueOf(i));
			eventBase.setNameDisplay(String.valueOf("eventBase_" + i));
			eventBasePojos.add(eventBase);
		}
		m_srv.createBatch(eventBasePojos);
		
		getAllEventBaseTest();
	}
	
	@Test
	public void getAllEventBaseTest() throws ServiceException{
		List<EventBasePojo> allEventBase = m_srv.getAllEventBase();
		assertTrue(allEventBase.size() > 0);
	}
	
	/**
	 * Test method for {@link com.riil.base.resmodel.impl.db.EventBaseService#getEventBaseByModel(java.lang.String)} .
	 * 
	 * @throws ContainerException
	 * @throws ServiceException
	 */
	@Test
	public void testGetEventBaseByModel() throws ContainerException, ServiceException {
		IEventBaseService t_service = ServiceContainer.getInstance()
				.getServiceComponent(IEventBaseService.S_SERVICE_ID);
		List<EventBasePojo> t_list = t_service.getEventBaseByModel("RIIL_RMM_Host_Windows_Snmp");
		for (EventBasePojo pojo : t_list) {
			if (S_LOGGER.isDebugEnabled()) {
				S_LOGGER.debug(pojo);
			}
		}
	}

	/**
	 * Test method for {@link com.riil.base.resmodel.impl.db.EventBaseService#getEventBaseByMoniTemp(java.lang.String)}
	 * .
	 */
	@Test
	public void testGetEventBaseByMoniTemp() throws ContainerException, ServiceException {
		IEventBaseService t_service = ServiceContainer.getInstance()
				.getServiceComponent(IEventBaseService.S_SERVICE_ID);
		List<EventBasePojo> t_list = t_service.getEventBaseByMoniTemp("RIIL_RMT_Host_Windows");
		for (EventBasePojo pojo : t_list) {
			if (S_LOGGER.isDebugEnabled()) {
				S_LOGGER.debug(pojo);
			}
		}
	}

	/**
	 * Test method for {@link com.riil.base.resmodel.impl.db.EventBaseService#removeEventBaseByModel(java.lang.String)}
	 * .
	 */
	@Test
	public void testRemoveEventBaseByModelId() throws ContainerException, ServiceException {
		IEventBaseService t_service = ServiceContainer.getInstance()
				.getServiceComponent(IEventBaseService.S_SERVICE_ID);
		List<EventBasePojo> t_list = t_service.getEventBaseByModel("RIIL_RMM_Switch_Ruijie_Snmp");
		for (EventBasePojo pojo : t_list) {
			if (S_LOGGER.isDebugEnabled()) {
				S_LOGGER.debug(pojo);
			}
		}
	}

}
