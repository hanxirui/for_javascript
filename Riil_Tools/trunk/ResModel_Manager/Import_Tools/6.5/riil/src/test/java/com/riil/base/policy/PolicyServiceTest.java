package com.riil.base.policy;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.apache.log4j.Level;
import org.apache.log4j.Logger;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.springframework.test.context.ContextConfiguration;

import com.riil.base.pojo.enums.Enum4Metric.Status4Metric;
import com.riil.base.pojo.enums.EnumRoot.BandwidthType;
import com.riil.base.pojo.enums.EnumRoot.EventType;
import com.riil.base.pojo.enums.EnumRoot.PolicyLogType;
import com.riil.base.pojo.enums.EnumRoot.PolicyType;
import com.riil.base.resmodel.pojo.policy.PolicyBasePojo;
import com.riil.base.resmodel.pojo.policy.PolicyEventPojo;
import com.riil.base.resmodel.pojo.policy.PolicyEventQueryParam;
import com.riil.base.resmodel.pojo.policy.PolicyEventRulePojo;
import com.riil.base.resmodel.pojo.policy.PolicyPojo;
import com.riil.base.resmodel.pojo.policy.PolicyResPojo;
import com.riil.base.resmodel.pojo.policy.PolicyResRelPojo;
import com.riil.base.resmodel.pojo.policy.PolicyThresholdPojo;
import com.riil.base.resource.IResInstBaseService;
import com.riil.base.resource.IResInstanceService;
import com.riil.base.resource.IResUniteService;
import com.riil.base.resource.pojo.ResBasePojo;
import com.riil.base.resource.pojo.ResInstBasePojo;
import com.riil.base.resource.pojo.ResInstQueryParam;
import com.riil.base.resource.pojo.ResInstancePojo;
import com.riil.core.commons.ServerModule;
import com.riil.core.constant.Constants;
import com.riil.core.container.ContainerException;
import com.riil.core.container.ServiceContainer;
import com.riil.core.dam.tx.TransactionManager;
import com.riil.core.dao.PageDataPojo;
import com.riil.core.logger.SystemLogger;
import com.riil.core.service.ServiceException;
import com.riil.core.test.BaseTest;

@ContextConfiguration(locations = { "classpath*:META-INF/PortalServer/riil_service*.xml" })
public class PolicyServiceTest extends BaseTest{
	private static Logger S_LOGGER = SystemLogger.getSystemLogger(PolicyServiceTest.class,
			ServerModule.ResourceModel);
	
	private static IPolicyService m_srv;
	private static IResInstanceService m_res;
	private IResInstBaseService m_resBase;
	private IResUniteService m_resUnite;
	
	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
		SystemLogger.changeLogLevel(Level.DEBUG);
	}


	@AfterClass
	public static void tearDownAfterClass() throws Exception {
	}


	@Before
	public void setUp() throws Exception {
		if(m_srv == null){
			m_srv = ServiceContainer.getInstance().getServiceComponent(IPolicyService.S_SERVICE_ID);
			m_res = ServiceContainer.getInstance().getServiceComponent(IResInstanceService.S_SERVICE_ID);
			m_resBase = ServiceContainer.getInstance().getServiceComponent(IResInstBaseService.S_SERVICE_ID);
			m_resUnite = ServiceContainer.getInstance().getServiceComponent(IResUniteService.S_SERVICE_ID);
			
//			runSqlScript(new FileInputStream(new File(PolicyServiceTest.class.getResource("").getPath()
//					+"Create_PolicyServerRel.sql")));
//			runSqlScript(new FileInputStream(new File(PolicyServiceTest.class.getResource("").getPath()
//					+"Create_PolicyServerRel.sql")));
//			BinFileUtils.setLazyLoad(false);
		}
		TransactionManager.beginTransaction();
	}


	@After
	public void tearDown() throws Exception {
		TransactionManager.rollbackTransaction();
//		TransactionManager.commitTransaction();
	}

	@Test
	public void policyPublish_Trap_IntegrationTest() throws Exception {
		//新建Trap策略
		PolicyPojo policyPojo = new PolicyPojo();
		String t_name = "TestTrapPolicy01";
		String domainId = "domain_bj";
		String policyType = PolicyType.TRAP.getId();
		policyPojo.setName(t_name);
		policyPojo.setPolicyType(policyType);
		policyPojo.setUserDomainId(domainId);
				
		m_srv.createTrapPolicy(policyPojo);
		
		//查询Trap策略树
		List<PolicyPojo> t_policys = m_srv.getPolicyBaseInfoByPolicyType(PolicyType.TRAP.getId(), Arrays.asList(domainId)); //模拟方式，与Portal不一致
		assertTrue(t_policys.size() > 0);
		
		String t_old_policyId = null;
		for(PolicyPojo policy : t_policys){
			if(policy.getName().equals(t_name)){
				assertTrue(policy.getInUse() == Constants.FALSE && policy.isDefault()==false);
				t_old_policyId = policy.getId();
				break;
			}
		}
		
		//备选资源查询
		ResInstQueryParam param = new ResInstQueryParam();
		ResInstBasePojo resInstBase = new ResInstBasePojo();
		resInstBase.setPolicyId(t_old_policyId);
		resInstBase.setDomainId(domainId);
		param.setResInstBase(resInstBase );
		PageDataPojo<ResInstBasePojo> t_pageRes = m_resBase.getPageCandidatesByPolicy(param);
		assertTrue(t_pageRes.getPageData().size() > 0);
		
		
		//加入资源
		String userId = "TestUser01";
		List<PolicyResRelPojo> policyResRelPojos = new ArrayList<PolicyResRelPojo>();
		
		PolicyResRelPojo resRel = new PolicyResRelPojo();
		resRel.setPolicyId(t_old_policyId);
		resRel.setInstId(t_pageRes.getPageData().get(0).getId());
		resRel.setIsMain(Constants.TRUE);
		policyResRelPojos.add(resRel );
		
		
		String t_newPolicyId = m_srv.modifyLogPolicyResRel(t_old_policyId, userId, policyResRelPojos);
		assertTrue(t_newPolicyId.equals(t_old_policyId)); //未发布的策略，修改资源不产生新版本策略
		
		PolicyPojo t_db_policyPojo = m_srv.getPolicyByPolicyId(t_newPolicyId);
		assertTrue(t_db_policyPojo.getInUse()==Constants.FALSE);
		assertTrue(t_db_policyPojo.getListPolicyResRelPojo().size()==1);
		assertEquals(t_pageRes.getPageData().get(0).getId(),t_db_policyPojo.getListPolicyResRelPojo().get(0).getInstId());
		
		
		List<ResBasePojo> t_db_trapReses = m_resUnite.getByRelInstId(t_newPolicyId, policyType, Arrays.asList(t_pageRes.getPageData().get(0).getId()));
		assertTrue(t_db_trapReses.size() == 1);
		
		
		//发布
		List<String> t_new_policyIds= m_srv.policyPublish(userId, Arrays.asList(t_newPolicyId));
		assertTrue(t_new_policyIds.get(0).equals(t_newPolicyId));
		PolicyPojo t_base_policy = m_srv.getPolicyBaseInfo(t_newPolicyId);
		assertTrue(t_base_policy.isDefault()==false);
		
		//修改基本信息
		t_db_policyPojo.setDesc("TestDesc");
		t_db_policyPojo.setUpdateUser(userId);
		t_newPolicyId = m_srv.modifyPolicyBaseInfo(t_db_policyPojo);
		assertTrue(t_newPolicyId.equals(t_old_policyId)); //已发布的策略, 修改基础信息不产生新版本策略
		t_base_policy = m_srv.getPolicyBaseInfo(t_newPolicyId);
		assertTrue(t_base_policy.isDefault()==false);
		
		//发布
		t_new_policyIds= m_srv.policyPublish(userId, Arrays.asList(t_newPolicyId));
		assertTrue(t_new_policyIds.get(0).equals(t_old_policyId));
		t_base_policy = m_srv.getPolicyBaseInfo(t_old_policyId);
		assertTrue(t_base_policy.getInUse() == Constants.TRUE); //状态改为已发布
		
		//修改资源
		
		PolicyResRelPojo resRel2 = new PolicyResRelPojo();
		resRel2.setPolicyId(t_old_policyId);
		resRel2.setInstId(t_pageRes.getPageData().get(1).getId());
		resRel2.setIsMain(Constants.TRUE);
		policyResRelPojos.add(resRel2);
		
		
		t_newPolicyId = m_srv.modifyLogPolicyResRel(t_old_policyId, userId, policyResRelPojos);
		assertTrue(t_newPolicyId.equals(t_old_policyId)); //已发布的策略，修改资源也不产生新版本策略，需要Portal调用发布
		
		t_db_policyPojo = m_srv.getPolicyByPolicyId(t_newPolicyId);
		assertTrue(t_db_policyPojo.getInUse() == Constants.TRUE);
		assertTrue(t_db_policyPojo.getListPolicyResRelPojo().size()==2);
		assertEquals(t_pageRes.getPageData().get(0).getId(),t_db_policyPojo.getListPolicyResRelPojo().get(0).getInstId());
		
		t_db_trapReses = m_resUnite.getByRelInstId(t_newPolicyId, policyType, Arrays.asList(t_pageRes.getPageData().get(0).getId(), t_pageRes.getPageData().get(1).getId()));
		assertTrue(t_db_trapReses.size() == 2);
		
		//发布
		t_new_policyIds= m_srv.policyPublish(userId, Arrays.asList(t_newPolicyId));
		assertTrue(t_new_policyIds.get(0).equals(t_old_policyId)); //这里的发布似乎是一个无效的动作
		

	}
	
	@Test
	public void getPolicyBaseInfoByPolicyTypeAll() throws Exception{
		String policyType = "RES";
		List<String> domainIds = new ArrayList<String>();
		domainIds.add("1");
		domainIds.add("2");
		m_srv.getPolicyBaseInfoByPolicyTypeAll(policyType, domainIds);
	}
	
	/**
	 * Test method for {@link com.riil.base.policy.impl.PolicyService#getPolicyByPolicyId(java.lang.String)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void testGetPolicyByPolicyId() throws ServiceException {
		String policyId= "RIIL_RMP_RES_HOST_LINUX_SNMP_DEFAULT";
//		String policyId="RIIL_RMP_RES_CHILD_NIC_SWITCH_RUIJIE_SNMP_1000M";
		PolicyPojo t_policy = m_srv.getPolicyByPolicyId(policyId);
//		PolicyPojo t_policy = m_srv.getPolicyByPolicyIdFromDB(policyId);
		assertNotNull(t_policy);
	}
	
	
	/**
	 * Test method for {@link com.riil.base.policy.impl.PolicyService#createPolicy(com.riil.base.resmodel.pojo.policy.PolicyPojo)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void testCreatePolicy() throws ServiceException {
		PolicyPojo t_policy = new PolicyPojo();
//		t_policy.setPolicyType(PolicyType.LOG.getId());
		t_policy.setPolicyType(PolicyLogType.SYSLOG.getId());
		t_policy.setName("EdwinTest");
		
		m_srv.createPolicy(t_policy);
		
		S_LOGGER.info("Policy id: "+t_policy.getId());
	}

	/**
	 * Test method for {@link com.riil.base.policy.impl.PolicyService#createLogPolicy(com.riil.base.resmodel.pojo.policy.PolicyPojo)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void createLogPolicy() throws ServiceException {
		String t_policyId = "policy1";
		
		
		PolicyPojo t_policy = new PolicyPojo();
		t_policy.setId(t_policyId);
		t_policy.setPolicyType(PolicyLogType.SYSLOG.getId());
		t_policy.setName("EdwinTest");
		
		List<PolicyResRelPojo> listPolicyResRelPojo = new ArrayList<PolicyResRelPojo>();
		
		PolicyResRelPojo t_ResRel = new PolicyResRelPojo();
		t_ResRel.setInstId("A");
		
		listPolicyResRelPojo.add(t_ResRel);
		
		t_policy.setListPolicyResRelPojo(listPolicyResRelPojo );
		
		m_srv.createLogPolicy(t_policy);
		
		List<String> policyIds = new ArrayList<String>();
		
		policyIds.add("b0a7a280-652e-5d6f-047b-ab91057694cf");
		List<String> serverIds = new ArrayList<String>();
		serverIds.add("server1");
		serverIds.add("server2");
//		((PolicyService)m_srv).getLogPolicyService().logPolicyPublish("u1", policyIds, serverIds);
	}

	/**
	 * Test method for {@link com.riil.base.policy.impl.PolicyService#createTrapPolicy(com.riil.base.resmodel.pojo.policy.PolicyPojo)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void testCreateTrapPolicy() throws ServiceException {
		PolicyPojo t_policy = new PolicyPojo();
		t_policy.setPolicyType(PolicyType.TRAP.getId());
		t_policy.setName("EdwinTest");
		
		m_srv.createTrapPolicy(t_policy);
		
	}

	/**
	 * Test method for {@link com.riil.base.policy.impl.PolicyService#createPolicyResRel(java.lang.String, java.lang.String, java.util.List)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void testCreatePolicyResRel_policyId_userId_policyResRel() throws ServiceException {
		String policyId = "RIIL_RMP_RES_CHILD_DATABASE_DB_MYSQL_DEFAULT";
		String userId = "Edwin";
		String instId1 = "5c9eb224-aefd-8f25-7c51-9f418db5bc0b";
		List<PolicyResRelPojo> policyResRelPojos = new ArrayList<PolicyResRelPojo>();
		PolicyResRelPojo t_res1 = new PolicyResRelPojo();
		t_res1.setInstId(instId1);
		t_res1.setIsMain(Constants.FALSE);
		t_res1.setSubInstId("");
		t_res1.setTag1("");
		policyResRelPojos.add(t_res1);
		
		m_srv.createPolicyResRel(policyId, userId, policyResRelPojos);
	}

	/**
	 * Test method for {@link com.riil.base.policy.impl.PolicyService#createPolicyResRel(java.util.List)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void testCreatePolicyResRel_policyResRel() throws ServiceException {
		String policyId = "RIIL_RMP_RES_CHILD_DATABASE_DB_MYSQL_DEFAULT";
		String instId1 = "5c9eb224-aefd-8f25-7c51-9f418db5bc0b";
		List<PolicyResRelPojo> policyResRelPojos = new ArrayList<PolicyResRelPojo>();
		PolicyResRelPojo t_res1 = new PolicyResRelPojo();
		t_res1.setPolicyId(policyId);
		t_res1.setInstId(instId1);
		t_res1.setIsMain(Constants.FALSE);
		t_res1.setSubInstId("");
		t_res1.setTag1("");
		policyResRelPojos.add(t_res1);
		
		m_srv.createPolicyResRel(policyResRelPojos);
	}

	/**
	 * Test method for {@link com.riil.base.policy.impl.PolicyService#createPolicyEvent(java.lang.String, com.riil.base.resmodel.pojo.policy.PolicyEventPojo)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void testCreatePolicyEvent() throws ServiceException {
		String policyId = "prp-3APLMO1JRRDW09C";
		PolicyEventPojo event = new PolicyEventPojo();
		event.setPolicyId(policyId);
		String eventId = "e1";
		event.setEventId(eventId);
		event.setName("name1");
		event.setType(EventType.AVAIL_EVENT.getId());
		m_srv.createPolicyEvent("u1", event);
		event.setName("name1000");
		event.setType(EventType.AVAIL_EVENT.getId());
		PolicyEventRulePojo value = new PolicyEventRulePojo();
		value.setTrapType("v1");
		value.setTrapEnterprise("");
		value.setTrapGroup("trapGroup");
		event.addPolicyEventRulePojo(value);

		m_srv.modifyPolicyEvent("u1", event);

		m_srv.getPolicyEventByEventId(policyId, eventId);
	}

	/**
	 * Test method for {@link com.riil.base.policy.impl.PolicyService#createPolicyEvents(java.lang.String, java.lang.String, java.util.List)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void testCreatePolicyEvents() throws ServiceException {
		String policyId = "prp-3APLMO1JRRDW09C";
		PolicyEventPojo event = new PolicyEventPojo();
		event.setPolicyId(policyId);
		String eventId = "e1";
		event.setEventId(eventId);
		event.setName("name1");
		event.setType(EventType.AVAIL_EVENT.getId());
		
		List<PolicyEventPojo> t_events = new ArrayList<PolicyEventPojo>();
		t_events.add(event);
		
		m_srv.createPolicyEvents(policyId, "u1", t_events);
	}

	/**
	 * Test method for {@link com.riil.base.policy.impl.PolicyService#removePolicyByPolicyId(java.lang.String)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void removePolicyByPolicyId() throws ServiceException {
		String policyId = "prp-3APLMO1JRRDW09C";
		m_srv.removePolicyByPolicyId(policyId);
	}

	/**
	 * Test method for {@link com.riil.base.policy.impl.PolicyService#removePolicyByPolicyIds(java.util.List)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void removePolicyByPolicyIds() throws ServiceException {
		List<String> policyIds = new ArrayList<String>();
		policyIds.add("prp-3APLMO1JRRDW09C");
		m_srv.removePolicyByPolicyIds(policyIds);
	}

	/**
	 * Test method for {@link com.riil.base.policy.impl.PolicyService#removePolicyRelResByResIds(java.lang.String, java.util.List)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void removePolicyRelResByResIds() throws ServiceException {
		String policyType = PolicyType.TRAP.getId();
		List<String> resInstanceIds = new ArrayList<String>();
		resInstanceIds.add("5c9eb224-aefd-8f25-7c51-9f418db5bc0b");
		m_srv.removePolicyRelResByResIds(policyType, resInstanceIds);
	}

	@Test
	public final void removePolicyRelResByPolicyIdAndResIds() throws ServiceException {
//		String policyId="prp-3APLMO1JRRDW09C";
//		List<String> resInstanceIds = new ArrayList<String>();
//		resInstanceIds.add("5c9eb224-aefd-8f25-7c51-9f418db5bc0b");
//		
//		m_srv.removePolicyRelResByPolicyIdAndResIds(policyId, PolicyType.LOG_SYSLOG.getId(), resInstanceIds);
		
		String policyId="RIIL_RMP_RES_SWITCH_RUIJIE_SNMP_DEFAULT";
		List<String> resInstanceIds = new ArrayList<String>();
		resInstanceIds.add("1ae2eb65-1cd1-782b-9057-376befb14483");
		resInstanceIds.add("19edb508-b6d5-fa52-27aa-1103c6ff4ac3");
		resInstanceIds.add("b74a95b8-5b1b-690d-a691-ffc1dc5e8356");
		resInstanceIds.add("f2f88f1d-4728-6de3-58a1-1d0da981aec8");
		resInstanceIds.add("e15254ac-ed2b-fcda-25a0-0bdc77036fbf");
//		
		m_srv.removePolicyRelResByPolicyIdAndResIds(policyId, true, null, resInstanceIds);
	}

	@Test
	public final void removePolicyEvents_policyId_userId() throws ServiceException {
		String policyId = "prp-3APLMO1JRRDW09C";
		String userId = "u1";
		m_srv.removePolicyEvents(policyId, userId);
	}

	/**
	 * Test method for {@link com.riil.base.policy.impl.PolicyService#removePolicyEvents(java.lang.String, java.lang.String, java.util.List)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void testRemovePolicyEventsStringStringListOfString() throws ServiceException {
		String policyId = "prp-3APLMO1JRRDW09C";
		String userId = "u1";
		List<String> eventIds = new ArrayList<String>();
		eventIds.add("event1");
		m_srv.removePolicyEvents(policyId, userId, eventIds);
	}

	/**
	 * Test method for {@link com.riil.base.policy.impl.PolicyService#removePolicyEvent(java.lang.String, java.lang.String, java.lang.String)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void testRemovePolicyEvent() throws ServiceException {
		String policyId = "prp-3APLMO1JRRDW09C";
		String userId = "u1";
		String eventId = "event1";
		m_srv.removePolicyEvent(policyId, userId, eventId);
	}

	/**
	 * Test method for {@link com.riil.base.policy.impl.PolicyService#modifyPolicyBaseInfo(com.riil.base.resmodel.pojo.policy.PolicyPojo)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void testModifyPolicyBaseInfo() throws ServiceException {
		String policyId="prp-3APLMO1JRRDW09C";
		PolicyPojo policyPojo = new PolicyPojo();
		policyPojo.setId(policyId);
		policyPojo.setPolicyType(PolicyLogType.SYSLOG.getId());
		policyPojo.setName("EdwinTest");
		policyPojo.setUpdateUser("u2");
		m_srv.modifyPolicyBaseInfo(policyPojo);
	}
	
	/**
	 * 已发布的SYSLOG策略，修改基本信息
	 * 预期：产生新版本策略以及对应的虚资源
	 */
	@Test
	public final void modifyPolicyBaseInfo_SYSLOG() throws ServiceException {
		String policyId="policy_syslog_001";
		PolicyPojo policyPojo = new PolicyPojo();
		policyPojo.setId(policyId);
		policyPojo.setPolicyType(PolicyLogType.SYSLOG.getId());
		policyPojo.setName("EdwinTest");
		policyPojo.setUpdateUser("u2");
		m_srv.modifyPolicyBaseInfo(policyPojo);
	}

	/**
	 * Test method for {@link com.riil.base.policy.impl.PolicyService#modifyPolicyResRel(java.lang.String, java.lang.String, java.util.List)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void testModifyPolicyResRel() throws ServiceException {
		String policyId="prp-3APLMO1JRRDW09C";
		String userId="u1";
		String instId1 = "5c9eb224-aefd-8f25-7c51-9f418db5bc0b";
		List<PolicyResRelPojo> policyResRelPojos = new ArrayList<PolicyResRelPojo>();
		PolicyResRelPojo t_res1 = new PolicyResRelPojo();
		t_res1.setPolicyId(policyId);
		t_res1.setInstId(instId1);
		t_res1.setIsMain(Constants.FALSE);
		t_res1.setSubInstId("");
		t_res1.setTag1("");
		policyResRelPojos.add(t_res1);
		
		m_srv.modifyPolicyResRel(policyId, userId, policyResRelPojos);
	}

	/**
	 * Test method for {@link com.riil.base.policy.impl.PolicyService#modifyPolicyEvents(java.lang.String, java.lang.String, java.util.List)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void testModifyPolicyEvents() throws ServiceException {
		String policyId= "prp-3APLMO1JRRDW09C";;
		String userId="u1";
		List<PolicyEventPojo> policyEventPojos = new ArrayList<PolicyEventPojo>();
		PolicyEventPojo event = new PolicyEventPojo();
		event.setPolicyId(policyId);
		String eventId = "e1";
		event.setEventId(eventId);
		event.setName("name1");
		event.setType(EventType.AVAIL_EVENT.getId());
		policyEventPojos.add(event);
		
		
		m_srv.modifyPolicyEvents(policyId, userId, policyEventPojos);
	}

	/**
	 * Test method for {@link com.riil.base.policy.impl.PolicyService#modifyPolicyEvent(java.lang.String, com.riil.base.resmodel.pojo.policy.PolicyEventPojo)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void testModifyPolicyEvent() throws ServiceException {
		String policyId = "prp-3APLMO1JRRDW09C";
		PolicyEventPojo event = new PolicyEventPojo();
		event.setPolicyId(policyId);
		String eventId = "e1";
		event.setEventId(eventId);
		event.setName("name1");
		event.setType(EventType.AVAIL_EVENT.getId());
		m_srv.createPolicyEvent("u1", event);
		event.setName("name1000");
		event.setType(EventType.AVAIL_EVENT.getId());
		PolicyEventRulePojo value = new PolicyEventRulePojo();
		value.setTrapType("v1");
		value.setTrapEnterprise("");
		value.setTrapGroup("trapGroup");
		event.addPolicyEventRulePojo(value);

		m_srv.modifyPolicyEvent("u1", event);
	}

	/**
	 * Test method for {@link com.riil.base.policy.impl.PolicyService#policyPublish(java.lang.String, java.util.List)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void policyPublish() throws ServiceException {
		String policyId= "RIIL_RMP_RES_HOST_LINUX_SNMP_DEFAULT";
//		String policyId= "f5538ca1-fff3-b89e-b05e-26c8a3235920";
		String userId="user-admin";
		List<String> policyIds = new ArrayList<String>();
		policyIds.add(policyId);
		List<String> t_publishIds = m_srv.policyPublish(userId, policyIds);
		assertEquals(1,t_publishIds.size());
		PolicyPojo t_policy = m_srv.getPolicyBaseInfo(policyId);
		assertTrue(t_policy.getInUse() == Constants.TRUE);
	}

	/**
	 * Test method for {@link com.riil.base.policy.impl.PolicyService#policyStop(java.util.List)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void testPolicyStop() throws ServiceException {
		String policyId= "RIIL_RMP_RES_HOST_LINUX_SNMP_DEFAULT";
		List<String> policyIds = new ArrayList<String>();
		policyIds.add(policyId);
		List<String> t_publishIds = m_srv.policyStop(policyIds);
		assertEquals(1,t_publishIds.size());
		PolicyPojo t_policy = m_srv.getPolicyBaseInfo(policyId);
		assertTrue(t_policy.getInUse() == Constants.TRUE);
	}

	/**
	 * Test method for {@link com.riil.base.policy.impl.PolicyService#getPolicyBaseInfo(java.lang.String)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void testGetPolicyBaseInfo() throws ServiceException {
		String policyId= "RIIL_RMP_RES_HOST_LINUX_SNMP_DEFAULT";
		PolicyPojo t_policy = m_srv.getPolicyBaseInfo(policyId);
		assertNotNull(t_policy);
	}

	/**
	 * Test method for {@link com.riil.base.policy.impl.PolicyService#getPolicyResRel(java.lang.String)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void testGetPolicyResRel() throws ServiceException {
		String policyId= "RIIL_RMP_RES_HOST_LINUX_SNMP_DEFAULT";
		List<PolicyResRelPojo> policyResRelPojos = m_srv.getPolicyResRel(policyId);
		assertTrue(policyResRelPojos.size() > 0);
	}

	/**
	 * Test method for {@link com.riil.base.policy.impl.PolicyService#getNewVersinoPolicyBaseInfoByTypeAndResIds(java.util.List, java.lang.String)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void testGetNewVersinoPolicyBaseInfo_Type_ResIds() throws ServiceException {
		List<String> resInstanceIds = new ArrayList<String>();
		resInstanceIds.add("586c3f5f-e9a7-3a04-9415-9f01b3b7c88c");
		resInstanceIds.add("5957d94f-47a7-3821-a8c4-34a36e99812c");
		String policyType = PolicyType.RES.getId();
		List<PolicyPojo> t_policys = m_srv.getNewVersinoPolicyBaseInfoByTypeAndResIds(resInstanceIds, policyType);
		for (PolicyPojo policyPojo : t_policys) {
			PolicyPojo t_p = m_srv.getPolicyMap().get(policyPojo.getId());
			PolicyResPojo t_resPolicy = (PolicyResPojo) t_p;
			t_resPolicy.getListPolicyMetricPojo();
		}
		
		assertTrue(t_policys.size() > 0);
	}

	/**
	 * Test method for {@link com.riil.base.policy.impl.PolicyService#getNewVersinoPolicyBaseInfoByTypesAndResId(java.util.List, java.lang.String)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void testGetNewVersinoPolicyBaseInfoByTypesAndResId() throws ServiceException {
		List<String> policyTypes = new ArrayList<String>();
		policyTypes.add(PolicyType.RES.getId());
//		policyTypes.add(PolicyType.LOG.getId());
		policyTypes.add(PolicyType.TRAP.getId());
		String resId = "6d830a77-2549-e00d-530e-2ad199bcab0b";
		List<PolicyPojo> t_policys = m_srv.getNewVersinoPolicyBaseInfoByTypesAndResId(policyTypes, resId );
		assertTrue(t_policys.size() > 0);
	}
	
	/**
	 * Test method for {@link com.riil.base.policy.impl.PolicyService#getPolicyEvents(java.lang.String)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void testGetPolicyEvents() throws ServiceException {
		String policyId= "RIIL_RMP_RES_HOST_LINUX_SNMP_DEFAULT";
		List<PolicyEventPojo> t_events = m_srv.getPolicyEvents(policyId);
		assertTrue(t_events.size() > 0);
	}

	/**
	 * Test method for {@link com.riil.base.policy.impl.PolicyService#getPolicyEventsByParam(com.riil.base.resmodel.pojo.policy.PolicyEventQueryParam)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void testGetPolicyEventsByParam() throws ServiceException {
		String policyId= "RIIL_RMP_RES_HOST_LINUX_SNMP_DEFAULT";
		PolicyEventQueryParam policyEventPojo = new PolicyEventQueryParam();
		policyEventPojo.setPolicyId(policyId);
		PageDataPojo<PolicyEventPojo> t_events = m_srv.getPolicyEventsByParam(policyEventPojo );
		assertTrue(t_events.getRecordCount() > 0);
	}

	/**
	 * Test method for {@link com.riil.base.policy.impl.PolicyService#getPolicyEventByEventId(java.lang.String, java.lang.String)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void testGetPolicyEventByEventId() throws ServiceException {
		String policyId= "RIIL_RMP_RES_HOST_LINUX_SNMP_DEFAULT";
		String eventId = "AVAILABLE";
		PolicyEventPojo t_event = m_srv.getPolicyEventByEventId(policyId, eventId);
		assertNotNull(t_event);
	}

	/**
	 * Test method for {@link com.riil.base.policy.impl.PolicyService#getPolicyBaseInfoByPolicyType(java.lang.String, java.util.List)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void testGetPolicyBaseInfoByPolicyType() throws ServiceException {
		String policyType = PolicyType.RES.getId();
		List<PolicyPojo> t_policys = m_srv.getPolicyBaseInfoByPolicyType(policyType, null);
		assertTrue(t_policys.size() > 0);
	}

	/**
	 * Test method for {@link com.riil.base.policy.impl.PolicyService#getPolicyBaseInfoByPolicyType4InUse(java.lang.String, java.util.List)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void testGetPolicyBaseInfoByPolicyType4InUse() throws ServiceException {
		String policyType = PolicyType.RES.getId();
		List<PolicyPojo> t_policys = m_srv.getPolicyBaseInfoByPolicyType4InUse(policyType, null);
		assertTrue(t_policys.size() > 0);
	}



	/**
	 * Test method for {@link com.riil.base.policy.impl.PolicyService#getOriVersionId(java.lang.String)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void testGetOriVersionId() throws ServiceException {
		String policyId= "RIIL_RMP_RES_HOST_LINUX_SNMP_DEFAULT";
		String t_oriId = m_srv.getOriVersionId(policyId);
		assertNull(t_oriId);
		
		//TODO test "t_oriId is not null"
	}

	/**
	 * Test method for {@link com.riil.base.policy.impl.PolicyService#getOriVersionIds(java.util.List)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void testGetOriVersionIds() throws ServiceException {
		String policyId= "RIIL_RMP_RES_HOST_LINUX_SNMP_DEFAULT";
		List<String> policyIds = new ArrayList<String>();
		policyIds.add(policyId);
		m_srv.getOriVersionIds(policyIds);
	}

	/**
	 * Test method for {@link com.riil.base.policy.impl.PolicyService#checkPublishStatus(java.lang.String)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void testCheckPublishStatus() throws ServiceException {
		String policyId= "RIIL_RMP_RES_HOST_LINUX_SNMP_DEFAULT";
		boolean result = m_srv.checkPublishStatus(policyId);
		assertTrue(result);
	}

	/**
	 * Test method for {@link com.riil.base.policy.impl.PolicyService#checkUseStatus(java.lang.String)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void testCheckUseStatus() throws ServiceException {
		String policyId= "RIIL_RMP_RES_HOST_LINUX_SNMP_DEFAULT";
		boolean result = m_srv.checkUseStatus(policyId);
		assertTrue(result);
	}

	/**
	 * Test method for {@link com.riil.base.policy.impl.PolicyService#getAllPolicyPojo4Publish()}.
	 * @throws ContainerException 
	 * @throws ServiceException 
	 */
	@Test
	public final void testGetAllPolicyPojo4Publish() throws ServiceException {
		List<PolicyPojo> t_policys = m_srv.getAllPolicyPojo4Publish();
		assertTrue(t_policys.size() > 0);
		for(PolicyPojo t_policy : t_policys){
			assertTrue(t_policy.getInUse() == Constants.TRUE);
		}
	}

	/**
	 * Test method for {@link com.riil.base.policy.impl.PolicyService#getAllPolicyPojo4Publish(com.riil.base.pojo.enums.EnumRoot.ServerType, java.lang.String)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void testGetAllPolicyPojo4Publish_ServerId() throws ServiceException {
		String t_serverId = "172.16.36.45:18002";
		List<PolicyPojo> t_policys = m_srv.getAllPolicyPojo4Publish(t_serverId);
		assertTrue(t_policys.size() > 0);
		for(PolicyPojo t_policy : t_policys){
			assertTrue(t_policy.getInUse() == Constants.TRUE);
			if(t_policy.getPolicyType().equals(PolicyType.RES.toString())){
				if(t_policy.getListPolicyResRelPojo().isEmpty()) continue;
				String t_resId = t_policy.getListPolicyResRelPojo().get(0).getInstId();
				ResInstancePojo t_res = m_res.getResInstancePojoByID(t_resId);
				assertEquals(t_serverId, t_res.getServerId());
			}
		}
	}

	/**
	 * Test method for {@link com.riil.base.policy.impl.PolicyService#isExisEventName(java.lang.String, java.lang.String, java.lang.String)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void testIsExisEventName() throws ServiceException {
		String policyId = "RIIL_RMP_RES_HOST_LINUX_SNMP_DEFAULT";
		String eventId = "e1";
		String eventName = "testEvent";
		boolean result = m_srv.isExisEventName(policyId, eventId, eventName );
		assertFalse(result);
	}

	/**
	 * Test method for {@link com.riil.base.policy.impl.PolicyService#isExisPolicyName(java.lang.String, java.lang.String, java.lang.String, java.lang.String)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void testIsExisPolicyName() throws ServiceException {
		String policyId = "RIIL_RMP_RES_HOST_LINUX_SNMP_DEFAULT";
		String domainId = "";
		String policyType = PolicyType.RES.getId();
		String policyName = "testPolicyName";
		boolean result = m_srv.isExisPolicyName(domainId, policyType, policyId, policyName);
		assertFalse(result);
	}

	/**
	 * Test method for {@link com.riil.base.policy.impl.PolicyService#isExisPolicyName4Sub(java.lang.String, java.lang.String, java.lang.String, java.lang.String)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void testIsExisPolicyName4Sub() throws ServiceException {
		String subPolicyId = "RIIL_RMP_RES_CHILD_NIC_HOST_LINUX_SNMP_DEFAULT";
		String subPolicyName = "testSubPolicyName";
		String mainPolicyId = "RIIL_RMP_RES_HOST_LINUX_SNMP_DEFAULT";
		String originalMainPolicyId = null;
		boolean result = m_srv.isExisPolicyName4Sub(subPolicyId, subPolicyName, mainPolicyId, originalMainPolicyId);
		assertFalse(result);
	}

	/**
	 * Test method for {@link com.riil.base.policy.impl.PolicyService#getPolicyByPolicyIdAndType(java.lang.String, java.lang.String)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void testGetPolicyByPolicyIdAndType() throws ServiceException {
		String policyId = "RIIL_RMP_RES_HOST_LINUX_SNMP_DEFAULT";
		String policyType = PolicyType.RES.getId();
		PolicyPojo policy = m_srv.getPolicyByPolicyIdAndType(policyId, policyType);
		assertNotNull(policy);
		assertEquals(policyId, policy.getId());
	}

	

	/**
	 * Test method for {@link com.riil.base.policy.impl.PolicyService#removePolicyRelResByPolicyId(java.lang.String)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void testRemovePolicyRelResByPolicyId() throws ServiceException {
		String policyId = "RIIL_RMP_RES_HOST_LINUX_SNMP_DEFAULT";
		m_srv.removePolicyRelResByPolicyId(policyId);
		assertTrue(true);
	}

	/**
	 * Test method for {@link com.riil.base.policy.impl.PolicyService#getThresholdByInstMetricId(java.lang.String, java.lang.String)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void testGetThresholdByInstMetricId() throws ServiceException {
		String policyId = "RIIL_RMP_RES_HOST_LINUX_SNMP_DEFAULT";
		String metricId = "CPURate";
		List<PolicyThresholdPojo> t_threshold = m_srv.getThresholdByInstMetricId(policyId, metricId);
		assertTrue(t_threshold.size() > 0);
	}

	/**
	 * Test method for {@link com.riil.base.policy.impl.PolicyService#isTrigerAction(java.lang.String, java.lang.String)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void testIsTrigerAction() throws ServiceException {
		String policyId = "RIIL_RMP_RES_HOST_LINUX_SNMP_DEFAULT";
		String eventId = "AVAILABLE";
		boolean result = m_srv.isTrigerAction(policyId, eventId);
		assertFalse(result);
	}

	/**
	 * Test method for {@link com.riil.base.policy.impl.PolicyService#getThreshold4Default(java.lang.String, java.lang.String, com.riil.base.pojo.enums.Enum4Metric.Status4Metric)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void testGetThreshold4Default() throws ServiceException {
		String policyId = "RIIL_RMP_RES_HOST_LINUX_SNMP_DEFAULT";
		String metricId = "CPURate";
		Status4Metric status = Status4Metric.YELLOW;
		int threshold = m_srv.getThreshold4Default(policyId, metricId, status);
		assertTrue(threshold !=0);
	}

	/**
	 * Test method for {@link com.riil.base.policy.impl.PolicyService#init()}.
	 */
	@Test
	public final void testInit() {
		m_srv.init();
		assertTrue(true);
	}

	/**
	 * Test method for {@link com.riil.base.policy.impl.PolicyService#getAllFactoryPolicy()}.
	 * @throws ServiceException 
	 */
	@Test
	public final void testGetAllFactoryPolicy() throws ServiceException {
		List<PolicyPojo> t_policys = m_srv.getAllFactoryPolicy();
		assertTrue(t_policys.size() > 0);
	}

	/**
	 * Test method for {@link com.riil.base.policy.impl.PolicyService#getPolicyByModelId(java.lang.String, boolean)}.
	 * @throws ServiceException 
	 */
	@Test
	public final void test_getPolicyByModelId() throws ServiceException {
		String modelId = "RIIL_RMM_HOST_LINUX_SNMP";
		PolicyPojo t_policy = m_srv.getPolicyByModelId(modelId, true);
		List<PolicyEventPojo> eventPojo = t_policy.getListPolicyEventPojo();
		assertNotNull(t_policy);
		assertNotNull(eventPojo);
		t_policy = m_srv.getPolicyByModelId(modelId, false);
		assertNotNull(t_policy);
	}
	
	@Test
	public final void test_getFactoryLinkPolicyByModelId() throws ServiceException {
//		String modelId = "RIIL_RMM_CHILD_NIC_SWITCH_RUIJIE_SNMP";
		String modelId = "RIIL_RMM_SWITCH_DLINK_SNMP";
		PolicyPojo t_policy = m_srv.getFactoryLinkPolicyByModelId(modelId, BandwidthType.T_100M);
		assertNotNull(t_policy);
		assertTrue( t_policy.getBandwidthType().equals(BandwidthType.T_100M.getId()));
		
		t_policy = m_srv.getFactoryLinkPolicyByModelId(modelId, BandwidthType.T_10M);
		assertNotNull(t_policy);
		assertTrue( t_policy.getBandwidthType().equals(BandwidthType.T_10M.getId()));
		
	}
	
	@Test
	public void getPolicyBaseByInstIdTest() throws ServiceException {
		String instId = "ade9ef43-5426-35d3-bf66-cfd73e7b2634";
		PolicyBasePojo policy = m_srv.getPolicyBaseByInstId(instId, null, PolicyType.RES);
		
		assertNotNull(policy);
	}
}
