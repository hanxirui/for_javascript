package com.riil.base.resmodel.impl;

import static com.riil.base.resmodel.tools.ResModelServiceLoader.getModelService;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Level;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import com.riil.base.pojo.enums.EnumRoot.MetricType;
import com.riil.base.resmodel.IModelService;
import com.riil.base.resmodel.pojo.mmodel.CollectCmd;
import com.riil.base.resmodel.pojo.mmodel.CollectCmds;
import com.riil.base.resmodel.pojo.mmodel.Model;
import com.riil.base.resmodel.pojo.mmodel.ModelMetricBindingPojo;
import com.riil.base.resmodel.pojo.mmodel.ModelPojo;
import com.riil.base.resmodel.tools.ILazyData;
import com.riil.base.resmodel.tools.ResModelDataLoader;
import com.riil.base.utils.IDataSync;
import com.riil.core.container.ServiceContainer;
import com.riil.core.dam.tx.TransactionManager;
import com.riil.core.logger.SystemLogger;
import com.riil.core.service.ServiceException;
import com.riil.core.test.BaseTest;

//@ContextConfiguration(locations={"classpath*:META-INF/riil_service*.xml", "classpath*:riil_service*.xml", "classpath*:META-INF/datasource_config_test.xml"})
public class ModelServiceTest extends BaseTest{
	private IModelService m_srv;
	
	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
		SystemLogger.changeLogLevel(Level.INFO);
	}

	@AfterClass
	public static void tearDownAfterClass() throws Exception {
	}


	@Before
	public void setUp() throws Exception {
//		changeContext(ServerType.StandardServer.getId());
		if(m_srv == null){
			m_srv = ServiceContainer.getInstance().getServiceComponent(IModelService.S_SERVICE_ID);
//			BinFileUtils.setLazyLoad(false);
//			runSqlScript(new FileInputStream(new File(TemplateServiceTest.class.getResource("").getPath()+S_INIT_SQL)));
			
		}
		TransactionManager.beginTransaction();
	}


	@After
	public void tearDown() throws Exception {
		TransactionManager.rollbackTransaction();
	}

	/**
	 * Test method for {@link com.riil.base.resmodel.impl.ModelService#dataChange(java.lang.String, java.lang.String, com.riil.base.utils.IDataSync.DataChangeType)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void testDataChange() throws ServiceException {
		String t_modelId = "RIIL_RMM_HOST_WINDOWS_SNMP";
		
		@SuppressWarnings("unchecked")
		ResModelDataLoader<ModelPojo> temp = new ResModelDataLoader<ModelPojo>((ILazyData<ModelPojo>)m_srv);
		
		Model t_model = m_srv.getModel(t_modelId);
		
		m_srv.dataChange(t_modelId, "", t_model, IDataSync.DataChangeType.update);
		//因为DataChange方法仅从Custom目录下加载文件，不会加载System目录下的文件
		assertNull(temp.get(t_modelId, true, false, false)); 
	}

	/**
	 * Test method for {@link com.riil.base.resmodel.impl.ModelService#init()}.
	 */
	@Test
	public final void testInit() {
		m_srv.init();
		assertTrue(true);
	}

	/**
	 * Test method for {@link com.riil.base.resmodel.impl.ModelService#getModel(java.lang.String)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void testGetModel() throws ServiceException {
//		Model t_pojo = m_srv.getModel("RIIL_RMM_HOST_WINDOWS_SNMP");
//		assertNotNull(t_pojo);
		Model t_pojo = m_srv.getModel("RIIL_RMM_SWITCH_RUIJIE_SNMP");
		assertNotNull(t_pojo);
//		ModelMetricBindingPojo t_metric = t_pojo.gainModelMetricBindingPojo("AvgLoad15m");
		List<ModelMetricBindingPojo> t_metric = t_pojo.gainListModelMetricBindingPojo();
		assertNotNull(t_metric);
		
	}

	@Test
	public final void testGetModel_MultiThread() throws Exception {
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
						Model t_pojo = m_srv.getModel("RIIL_RMM_SWITCH_RUIJIE_SNMP");
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
	
	/**
	 * Test method for {@link com.riil.base.resmodel.impl.ModelService#getModelBySysoid(java.lang.String)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void testGetModelBySysoid() throws ServiceException {
		String sysoid = "1.3.6.1.4.1.171.10.37";
		Model t_model = m_srv.getModelBySysoid(sysoid);
		assertNotNull(t_model);
	}

	/**
	 * Test method for {@link com.riil.base.resmodel.impl.ModelService#getAllModel()}.
	 * @throws ServiceException 
	 */
	@Test
	public final void testGetAllModel() throws ServiceException {
		List<Model> t_models = m_srv.getAllModel();
		
		assertTrue(t_models.size() > 5);
	}

	/**
	 * Test method for {@link com.riil.base.resmodel.impl.ModelService#getAllModel(java.util.List)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void testGetAllModel_by_modelIds() throws ServiceException {
		List<String> t_modelIds = new ArrayList<String>();
		t_modelIds.add("RIIL_RMM_HOST_WINDOWS_SNMP");
		t_modelIds.add("RIIL_RMM_CHILD_DATABASE_DB_DB2");
		t_modelIds.add("RIIL_RMM_CHILD_JDBCPOOL_J2EE_WAS");
		t_modelIds.add("RIIL_RMM_SWITCH_RUIJIE_SNMP");
		
		List<Model> t_pojos = m_srv.getAllModel(t_modelIds);
		assertTrue(t_pojos.size() == 4);
		for(Model t_model : t_pojos){
			assertTrue(t_modelIds.contains(t_model.getId()));
		}
	}

	/**
	 * Test method for {@link com.riil.base.resmodel.impl.ModelService#getAllModelByTempIds(java.util.List)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void testGetAllModelByTempIds() throws ServiceException {
		List<String> t_tempIds = new ArrayList<String>();
//		t_tempIds.add("RIIL_RMT_HOST_HPUX");
//		t_tempIds.add("RIIL_RMT_DB_INFORMIX");
//		t_tempIds.add("RIIL_RMT_STORAGE_HP");
//		t_tempIds.add("RIIL_RMT_HOST_WINDOWS");
//		t_tempIds.add("RIIL_RMT_ROUTER_RUIJIE");
		t_tempIds.add("RIIL_RMT_HOST_WINDOWS");
		
		List<Model> t_pojos = m_srv.getAllModelByResTypeIds(t_tempIds);
		assertTrue(t_pojos.size() > 4);
		for(Model t_model : t_pojos){
			assertTrue(t_tempIds.contains(t_model.getResTypeId()));
		}
	}

	/**
	 * Test method for {@link com.riil.base.resmodel.impl.ModelService#getAllModelByResType(com.riil.base.pojo.enums.Enum4ResModel.ResIsMain, java.lang.String)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void testGetAllModelByResType() throws ServiceException {
		String t_modelId = "RIIL_RMM_HOST_WINDOWS_SNMP";
		List<String> modelIds = new ArrayList<String>();
		modelIds.add(t_modelId);
		List<Model> t_models = getModelService().getAllModel(modelIds);
		assertTrue(t_models.size() > 0);
		Model t_main = m_srv.getModel(t_modelId);
		for(Model t_model : t_models){
			//assertTrue(t_main.getSubModels().contains(t_model.getId()));	
		}
	}

	/**
	 * Test method for {@link com.riil.base.resmodel.impl.ModelService#getAllModelTreeByTreeNodeId(java.lang.String)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void testGetAllModelTreeByTreeNodeId() throws ServiceException {
		String t_treeNodeId = "00.01";
		List<Model> t_models = getModelService().getAllModelTreeByTreeNodeId(t_treeNodeId );
		assertTrue(t_models.size() > 0);
		assertTrue(t_models.get(1).getTreeNodeId().contains(t_treeNodeId));
	}

	/**
	 * Test method for {@link com.riil.base.resmodel.impl.ModelService#getMetricType(java.lang.String, java.lang.String)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void testGetMetricType() throws ServiceException {
		String t_modelId = "RIIL_RMM_SWITCH_MAXNET_SNMP";
		String t_metricId = "PingAvailStatus";
		
		MetricType t_type = m_srv.getMetricType(t_modelId, t_metricId);	
		assertTrue(t_type.equals(MetricType.AVAIL));
	}

	/**
	 * Test method for {@link com.riil.base.resmodel.impl.ModelService#getModelMetricBindingPojo(java.lang.String, java.lang.String)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void testGetModelMetricBindingPojo() throws ServiceException {
		String t_modelId = "RIIL_RMM_SWITCH_MAXNET_SNMP";
		String t_metricId = "PingAvailStatus";
		
		
		ModelMetricBindingPojo t_tempMetric = m_srv.getModelMetricBindingPojo(t_modelId, t_metricId);
		assertNotNull(t_tempMetric);
		assertEquals(t_metricId,t_tempMetric.getId());
		assertNotNull(t_tempMetric.getName());
	}
	
	@Test
	public final void getModelCmdTest() throws ServiceException{
        String t_modelId = "RIIL_RMM_ROUTER_H3C_SNMP";
		String t_metricId = "CPURate";
		ModelMetricBindingPojo t_tempMetric = m_srv.getModelMetricBindingPojo(t_modelId, t_metricId);
		//String t_sysoid = "<ModelCmd Sysoid=\"1.3.6.1.4.1.25506.1.76\" Rel=\"Release 18\" Cmd=\"1.3.6.1.4.1.25506.2.6.1.1.1.1.8\"/>";
        String t_sysoid = "1.3.6.1.4.1.25506.1.71";
        String t_sysDesc = "Release 1205p02";
        CollectCmds t_cmds = t_tempMetric.getMetricCmd(t_sysoid, t_sysDesc, "");
        List<CollectCmd> t_totalCmds = t_cmds.getCollectCmds();
        CollectCmd t_cmd = t_totalCmds.get(0);
		String modelCmd = t_cmd.getCmd();
		String collectType = t_cmd.getProperties().get("collectType");
		System.err.println(modelCmd);
		System.err.println(collectType);
		
	}

}
