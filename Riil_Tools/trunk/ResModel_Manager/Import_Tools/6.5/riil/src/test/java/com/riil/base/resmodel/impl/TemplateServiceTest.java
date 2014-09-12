package com.riil.base.resmodel.impl;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import org.apache.log4j.Level;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.springframework.beans.BeanUtils;
import org.springframework.test.context.ContextConfiguration;

import com.riil.base.resmodel.IResTypeService;
import com.riil.base.resmodel.impl.file.BinFileUtils;
import com.riil.base.resmodel.pojo.base.ResTypePojo;
import com.riil.core.container.ServiceContainer;
import com.riil.core.dam.tx.TransactionManager;
import com.riil.core.logger.SystemLogger;
import com.riil.core.service.ServiceException;
import com.riil.core.test.BaseTest;
import com.riil.core.utils.bean.SerializeUtil;

/**
 * TemplateService单元测试 <br>
 * 
 * <p>
 * Create on : 2012-6-6<br>
 * <p>
 * </p>
 * <br>
 * 
 * @author ChenJuntao<br>
 * @version riil.resmodel.impl v1.0
 *          <p>
 *          <br>
 *          <strong>Modify History:</strong><br>
 *          user modify_date modify_content<br>
 *          -------------------------------------------<br>
 *          <br>
 */
@ContextConfiguration(locations = { "classpath*:META-INF/StandardServer/riil_service*.xml" })
public class TemplateServiceTest extends BaseTest {

	private static final String S_INIT_SQL = "TemplateServiceTest.sql";
	// private static final String S_DEFAULT_TEST_DATASOURCE =
	// "ibatis-config.xml";
	private IResTypeService m_srv;

	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
		SystemLogger.changeLogLevel(Level.INFO);

	}

	@AfterClass
	public static void tearDownAfterClass() throws Exception {
	}

	@Before
	public void setUp() throws Exception {

		if (m_srv == null) {
			m_srv = ServiceContainer.getInstance().getServiceComponent(IResTypeService.S_SERVICE_ID);
			BinFileUtils.setLazyLoad(false);
			// runSqlScript(new FileInputStream(new
			// File(TemplateServiceTest.class.getResource("").getPath()+S_INIT_SQL)));

		}
		TransactionManager.beginTransaction(TEST_DS);
	}

	@After
	public void tearDown() throws Exception {
		TransactionManager.rollbackTransaction();
		// TransactionManager.endTransaction();
	}

	/**
	 * Test method for
	 * {@link com.riil.base.resmodel.impl.TemplateService#dataChange(java.lang.String, String, com.riil.base.resmodel.IDataSync.DataChangeType)}
	 * .
	 * 
	 * @throws ServiceException
	 */
	@Test
	public final void testDataChange() throws ServiceException {
//		String t_tempId = "RIIL_RMT_HOST";
//
//		@SuppressWarnings("unchecked")
//		ResModelDataLoader<TempPojo> temp = new ResModelDataLoader<TempPojo>((ILazyData<TempPojo>) m_srv);
//
//		Template t_template = m_srv.getTemplate(t_tempId);
//
//		m_srv.dataChange(t_tempId, "", t_template, IDataSync.DataChangeType.update);
//		// 因为DataChange方法仅从Custom目录下加载文件，不会加载System目录下的文件
//		assertNull(temp.get(t_tempId, true, false, false));
	}

	/**
	 * Test method for
	 * {@link com.riil.base.resmodel.impl.TemplateService#init()}.
	 */
	@Test
	public final void testInit() {
		m_srv.init();
		assertTrue(true);
	}

	/**
	 * Test method for
	 * {@link com.riil.base.resmodel.impl.TemplateService#loadTemp(java.lang.String)}
	 * .
	 */
	@Test
	public final void testLoadTemp() {
		ConcurrentMap<String, String> S_ALL_MODELPOJO_BY_TEMPID = new ConcurrentHashMap<String, String>();
		S_ALL_MODELPOJO_BY_TEMPID.put("key1", "value");
		String t_value = S_ALL_MODELPOJO_BY_TEMPID.remove("key1");
		assertEquals("value", t_value);
		assertEquals(null, S_ALL_MODELPOJO_BY_TEMPID.remove("key1"));
	}

	/**
	 * Test method for
	 * {@link com.riil.base.resmodel.impl.TemplateService#getTemplate(java.lang.String)}
	 * .
	 * 
	 * @throws ServiceException
	 */
	@Test
	public final void testGetTemplateString() throws ServiceException {
//		String t_tempId = "RIIL_RMT_HOST";
//		// String t_tempId = "RIIL_RMT_Host";
//		String t_metricId = "Name";
//		String t_eventId = "CRITICAL_PERFORMANCE";
//		String t_groupId = "SystemInfoGroup";
//
//		Template t_temp = m_srv.getTemplate(t_tempId);
//		assertNotNull(t_temp);
//		assertEquals(t_tempId, t_temp.getId());
//		// String t_json_string = toJson(t_temp);
//		// assertNotNull(t_json_string);
//
//		TempMetricPojo t_tempMetric = t_temp.gainTempMetricPojo(t_metricId);
//		assertNotNull(t_tempMetric);
//		assertEquals(t_metricId, t_tempMetric.getMetricId());
//		assertNotNull(t_tempMetric.getName());
//
//		TempEventPojo t_tempEvent = t_temp.gainTempEventPojo(t_eventId);
//		assertNotNull(t_tempEvent);
//		assertEquals(t_eventId, t_tempEvent.getEventId());
//		assertNotNull(t_tempEvent.getName());
//
//		TempMetricGroupPojo t_tempGroup = t_temp.gainTempMetricGroupPojo(t_groupId);
//		assertNotNull(t_tempGroup);
//		assertEquals(t_groupId, t_tempGroup.getMetricGroupId());
//		assertNotNull(t_tempGroup.getName());
//
//		((TemplateService) m_srv).deleteTempFromCache(t_tempId);

	}

	// private String toJson(Object obj){
	// return net.sf.json.JSONArray.fromObject(obj).toString();
	// }

	/**
	 * Test method for
	 * {@link com.riil.base.resmodel.impl.TemplateService#getAllTemplate(java.util.List)}
	 * .
	 * 
	 * @throws ServiceException
	 */
	@Test
	public final void testGetAllTemplateListOfString() throws ServiceException {
//		List<String> tempIds = new ArrayList<String>();
//		String t_tempId1 = "RIIL_RMT_HOST";
//		String t_tempId2 = "RIIL_RMT_HOST_WINDOWS";
//		String t_tempId3 = "RIIL_RMT_HOST_SOLARIS";
//		String t_tempId4 = "RIIL_RMT_ROUTER";
//
//		tempIds.add(t_tempId1);
//		tempIds.add(t_tempId2);
//		tempIds.add(t_tempId3);
//		tempIds.add(t_tempId4);
//		List<Template> t_templates = m_srv.getAllTemplate(tempIds);
//		assertNotNull(t_templates);
//		assertTrue(t_templates.size() == 4);
//
//		List<String> tempIds2 = null;
//		try {
//			m_srv.getAllTemplate(tempIds2);
//		} catch (AssertException e) {
//			assertTrue(true);
//		}
//		try {
//			m_srv.getAllTemplate(new ArrayList<String>());
//		} catch (AssertException e) {
//			assertTrue(true);
//		}

	}

	/**
	 * Test method for
	 * {@link com.riil.base.resmodel.impl.TemplateService#getTemplateByTreeNodeId(java.lang.String)}
	 * .
	 * 
	 * @throws ServiceException
	 */
	@Test
	public final void testGetTemplateByTreeNodeId() throws ServiceException {
//		String treeNodeId = "00.20";
//		Template t_template = m_srv.getTemplateByTreeNodeId(treeNodeId);
////		Template t_template = m_srv.getTemplateByTreeNodeId(TreeNodeId.IPMAC.getId());
//
//		assertNotNull(t_template);
//		assertTrue(t_template.getTreeNodeId().equals(treeNodeId));
	}

	/**
	 * Test method for
	 * {@link com.riil.base.resmodel.impl.TemplateService#getTemplateBySysoid(java.lang.String)}
	 * .
	 * 
	 * @throws ServiceException
	 */
	@Test
	public final void testGetTemplateBySysoid() throws ServiceException {
//		String sysoid = "1.3.6.1.4.1.171.10.37";
//		Template t_template = m_srv.getTemplateBySysoid(sysoid);
//
//		assertNotNull(t_template);
	}

	/**
	 * Test method for
	 * {@link com.riil.base.resmodel.impl.TemplateService#getAllTemplate()}.
	 * 
	 * @throws ServiceException
	 */
	@Test
	public final void testGetAllTemplate() throws ServiceException {
//		List<Template> t_templates = m_srv.getAllTemplate();
//
//		assertTrue(t_templates.size() > 5);
	}

	/**
	 * Test method for
	 * {@link com.riil.base.resmodel.impl.TemplateService#getAllTemplate(com.riil.base.pojo.enums.Enum4ResModel.ResIsMain, java.lang.String)}
	 * .
	 * 
	 * @throws ServiceException
	 */
	@Test
	public final void testGetAllTemplate_by_isMain_mainTempId() throws ServiceException {
//		List<Template> t_templates = m_srv.getAllTemplate(ResIsMain.MainRes, null);
//
//		assertNotNull(t_templates);
//		assertTrue(t_templates.size() > 0);
//		String t_old_treeNodeId = "0";
//		String t_old_id = "";
//		for (Template t_template : t_templates) {
//			assertEquals(ResIsMain.MainRes.getValue(), t_template.getIsMain());
//			assertTrue(t_template.getTreeNodeId().compareTo(t_old_treeNodeId) >= 0);
//			if (t_template.getTreeNodeId().compareTo(t_old_treeNodeId) == 0) {
//				String a1 = t_template.getTreeNodeId();
//				assertEquals(a1, t_old_treeNodeId);
//				assertTrue(!t_old_id.equals(t_template.getId()));
//			}
//			t_old_treeNodeId = t_template.getTreeNodeId();
//			t_old_id = t_template.getId();
//		}
//
//		t_templates = m_srv.getAllTemplate(ResIsMain.SubRes, "RIIL_RMT_HOST_WINDOWS");
//		Template t_main_template = m_srv.getTemplate("RIIL_RMT_HOST_WINDOWS");
//		assertNotNull(t_templates);
//		assertTrue(t_templates.size() > 0);
//		for (Template t_template : t_templates) {
//			assertEquals(ResIsMain.SubRes.getValue(), t_template.getIsMain());
//			assertTrue(t_main_template.getSubRess().contains(t_template.getId()));
//		}
	}

	/**
	 * Test method for
	 * {@link com.riil.base.resmodel.impl.TemplateService#getAllTemplate(com.riil.base.resmodel.pojo.base.TempBaseQueryParam)}
	 * .
	 * 
	 * @throws ServiceException
	 */
	@Test
	public final void testGetAllTemplateTempBaseQueryParam() throws ServiceException {
//		List<Template> t_list = null;
//		String domainId = "";// "domain-root";
//		TempBaseQueryParam param = new TempBaseQueryParam();
//		param.setUserId("u1");
//		param.setDomainId(domainId);
//		param.setSysAdmin(true);
//		param.setIsManaged(1);
//		param.setDomainNotNull(-1);
//		param.setNotIncludeResNumEqualZero(1);// 普通资源，如：主机、网络设备等资源，必须有监控资源
//		param.setNotIncludeIpMac(false);// 事件有ipmac和链路；告警需要去掉此行
//		param.setNotIncludeLink(false);// 事件有ipmac和链路；告警需要去掉此行
//
//		param.setNotIncludeBiz(false);
//
//		t_list = m_srv.getAllTemplate(param);
//
//		assertTrue(t_list.size() > 0);
//		assertNotNull(t_list.get(0).getResNumMonitor() > 0);
	}

	/**
	 * Test method for
	 * {@link com.riil.base.resmodel.impl.TemplateService#getAllTemplateTree(java.lang.String, boolean)}
	 * .
	 * 
	 * @throws ServiceException
	 */
	@Test
	public final void testGetAllTemplateTree_by_tempId_withSub() throws ServiceException {
//		String t_tempId = "RIIL_RMT_HOST";
//		List<Template> t_templates = m_srv.getAllTemplateTree(t_tempId, true);
//		assertTrue(t_templates.size() > 0);
//
//		t_templates = m_srv.getAllTemplateTree(t_tempId, false);
//		assertTrue(t_templates.size() == 1);
	}

	/**
	 * Test method for
	 * {@link com.riil.base.resmodel.impl.TemplateService#getAllTemplateTree(byte, boolean)}
	 * .
	 * 
	 * @throws ServiceException
	 */
	@Test
	public final void testGetAllTemplateTree_by_level_withsub() throws ServiceException {
//		List<Template> t_templates = m_srv.getAllTemplateTree(1, true);
//		assert (t_templates.size() > 0);
	}

	/**
	 * Test method for
	 * {@link com.riil.base.resmodel.impl.TemplateService#getAllTemplateTree(byte, byte, com.riil.base.pojo.enums.Enum4ResModel.ResIsMain)}
	 * .
	 * 
	 * @throws ServiceException
	 */
	@Test
	public final void testGetAllTemplateTree_by_Level_Deep_IsMain() throws ServiceException {
//		int t_level = 1;
//		int t_depth = 1;
//
//		List<Template> t_templates = m_srv.getAllTemplateTree(t_level, t_depth, ResIsMain.MainRes);
//
//		assertNotNull(t_templates);
//		assertEquals(t_level, t_templates.get(0).getTreeLevel());
//		for (Template t_template : t_templates) {
//			assertTrue(t_template.getTreeLevel() < 3);
//		}
//
//		t_depth = 100;
//		List<Template> t_templates100 = m_srv.getAllTemplateTree(t_level, t_depth, ResIsMain.MainRes);
//
//		assertNotNull(t_templates100);
//		assertEquals(t_level, t_templates100.get(0).getTreeLevel());
//
//		t_depth = ITemplateService.S_TREE_DEPTH_ALL;
//		List<Template> t_templatesAll = m_srv.getAllTemplateTree(t_level, t_depth, ResIsMain.MainRes);
//		assertNotNull(t_templatesAll);
//		assertEquals(t_level, t_templatesAll.get(0).getTreeLevel());
//		assertEquals(t_templates100.size(), t_templatesAll.size());

	}

	/**
	 * Test method for
	 * {@link com.riil.base.resmodel.impl.TemplateService#getFatherTempIdsTreeByTreeNodeId(java.lang.String, boolean)}
	 * .
	 * 
	 * @throws ServiceException
	 */
	@Test
	public final void testGetFatherTempIdsTreeByTreeNodeId() throws ServiceException {
		String treeNodeId = "00.02.01.02";
		List<String> t_templates = m_srv.getFatherTempIdsTreeByTreeNodeId(treeNodeId, true);
		assertTrue(t_templates.size() > 1);
	}

	/**
	 * Test method for
	 * {@link com.riil.base.resmodel.impl.TemplateService#getDevTypeByTreeNodeId(java.lang.String)}
	 * .
	 * 
	 * @throws ServiceException
	 */
	@Test
	public final void testGetDevTypeByTreeNodeId() throws ServiceException {
//		String treeNodeId = "00.02.01.02";
//		DevType t_devType = m_srv.getDevTypeByTreeNodeId(treeNodeId);
//
//		assertNotNull(t_devType);
//		assertTrue(t_devType.equals(DevType.Router));
	}

	/**
	 * Test method for
	 * {@link com.riil.base.resmodel.impl.TemplateService#getTempMetricPojo(java.lang.String, java.lang.String)}
	 * .
	 * 
	 * @throws ServiceException
	 */
	@Test
	public final void testGetTempMetricPojo() throws ServiceException {
//		String t_tempId = "RIIL_RMT_HOST";
//		String t_metricId = "Name";
//
//		TempMetricPojo t_tempMetric = m_srv.getTempMetricPojo(t_tempId, t_metricId);
//		assertNotNull(t_tempMetric);
//		assertEquals(t_metricId, t_tempMetric.getMetricId());
//		assertNotNull(t_tempMetric.getName());

	}

	/**
	 * Test method for
	 * {@link com.riil.base.resmodel.impl.TemplateService#getTempEventPojo(java.lang.String, java.lang.String)}
	 * .
	 * 
	 * @throws ServiceException
	 */
	@Test
	public final void testGetTempEventPojo() throws ServiceException {
//		String t_tempId = "RIIL_RMT_HOST";
//		String t_eventId = "CRITICAL_PERFORMANCE";
//
//		TempEventPojo t_tempEvent = m_srv.getTempEventPojo(t_tempId, t_eventId);
//		assertNotNull(t_tempEvent);
//		assertEquals(t_eventId, t_tempEvent.getEventId());
//		assertNotNull(t_tempEvent.getName());

	}

	/**
	 * Test method for
	 * {@link com.riil.base.resmodel.impl.TemplateService#getTempMetricGroupPojo(java.lang.String, java.lang.String)}
	 * .
	 * 
	 * @throws ServiceException
	 */
	@Test
	public final void testGetTempMetricGroupPojo() throws ServiceException {
//		String t_tempId = "RIIL_RMT_HOST";
//		String t_groupId = "SystemInfoGroup";
//
//		TempMetricGroupPojo t_tempGroup = m_srv.getTempMetricGroupPojo(t_tempId, t_groupId);
//		assertNotNull(t_tempGroup);
//		assertEquals(t_groupId, t_tempGroup.getMetricGroupId());
//		assertNotNull(t_tempGroup.getName());
	}
	
	@Test
	public void tempUtilsTest() throws IOException{
		ResTypePojo obj = new ResTypePojo();
		obj.setName("junitTest");
		SerializeUtil.convertObjectToBin(obj, "/home/huangyinglu/workSpace/resmodel/ceshi");
		System.out.println(obj.getName());
		//TempPojo t_temp = SerializeUtil.convertBinToObject(TempPojo.class, t_file.getAbsoluteFile());
	}

}
