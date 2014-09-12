package com.riil.base.policy;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.apache.log4j.Level;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.test.context.ContextConfiguration;

import com.riil.base.pojo.enums.Enum4ResType.ResCatalog;
import com.riil.base.pojo.enums.EnumRoot.PolicyType;
import com.riil.base.resmodel.pojo.policy.PolicyPojo;
import com.riil.base.resmodel.pojo.policy.PolicyScriptPojo;
import com.riil.base.resmodel.pojo.policy.PolicyScriptResPojo;
import com.riil.core.commons.ServerModule;
import com.riil.core.constant.Constants;
import com.riil.core.dam.tx.TransactionManager;
import com.riil.core.dao.IQueryParam.SORT;
import com.riil.core.logger.SystemLogger;
import com.riil.core.service.ServiceException;
import com.riil.core.test.BaseTest;

@ContextConfiguration(locations = { "classpath*:META-INF/PortalServer/riil_service*.xml" })
public class ScriptPolicyServiceTest extends BaseTest {
	private static SystemLogger S_LOGGER = SystemLogger.getSystemLogger(ScriptPolicyServiceTest.class,
			ServerModule.ResourceModel);
	private static final String S_TEST_ADMIN = "test-admin";
	IScriptPolicyService m_srv;
		
	@Before
	public void setUp() throws Exception {
		if(m_srv == null){
			SystemLogger.changeLogLevel(Level.DEBUG);
			m_srv = serviceContainer.getServiceComponent(IScriptPolicyService.S_SERVICE_ID);

			String t_sqlPath = this.getClass().getResource("").getPath();
			System.out.println(t_sqlPath);
			// runSqlScript(new FileInputStream(new File(t_sqlPath
			// + S_SCRIPT_POLICY_SQL)));
		}
		
		
		TransactionManager.beginTransaction();
	}

	@After
	public void tearDown() throws Exception{
		TransactionManager.rollbackTransaction();
//		TransactionManager.commitTransaction();
	}
	
	@Test
	public void policyPublish_IntegrationTest() throws Exception {
		
		//新建脚本策略
		PolicyPojo policyPojo = new PolicyScriptPojo();
		String t_name = "TestScriptPolicy01";
		String domainId = "TestDomain01";
		String policyType = PolicyType.SCRIPT_SIMPLE.getId();
		policyPojo.setName(t_name);
		policyPojo.setPolicyType(policyType);
		policyPojo.setUserDomainId(domainId);
				
		m_srv.createScriptPolicy(policyPojo);
		
		//查询脚本策略树
		List<PolicyPojo> t_policys = m_srv.getPolicyBaseInfoByPolicyType(PolicyType.SCRIPT_SIMPLE.getId(), Arrays.asList(domainId)); //模拟方式，与Portal不一致
		assertTrue(t_policys.size() > 0);
		
		String t_old_policyId = null;
		for(PolicyPojo policy : t_policys){
			if(policy.getName().equals(t_name)){
				assertTrue(policy.getInUse()==Constants.FALSE && policy.isDefault()==false);
				t_old_policyId = policy.getId();
				break;
			}
		}
		//加入资源
		String userId = "TestUser01";
		List<PolicyScriptResPojo> policyScriptResPojos = new ArrayList<PolicyScriptResPojo>();
		PolicyScriptResPojo scriptRes = new PolicyScriptResPojo();
		String t_userName = "riil";
		String t_filePath = "c:\\aa.bat";
		scriptRes.setUserName(t_userName);
		scriptRes.setFilePath(t_filePath);
		policyScriptResPojos.add(scriptRes );
		
		
		String t_newPolicyId = m_srv.modifyScriptRes(t_old_policyId, userId , policyScriptResPojos );
		assertTrue(t_newPolicyId.equals(t_old_policyId)); //未发布的策略，修改资源不产生新版本策略
		
		PolicyScriptPojo t_db_policyPojo = (PolicyScriptPojo) m_srv.getPolicyByPolicyId(t_newPolicyId);
		assertTrue(t_db_policyPojo.getInUse()==Constants.FALSE);
		
		List<PolicyScriptResPojo> t_db_scriptReses = m_srv.getScriptResByPolicyId(t_newPolicyId);
		assertTrue(t_db_scriptReses.size() == 1);
		assertEquals(ResCatalog.SCRIPT.getId(), t_db_scriptReses.get(0).getResCatalog());
		assertEquals(domainId, t_db_scriptReses.get(0).getDomainId());
		assertEquals(policyType, t_db_scriptReses.get(0).getPolicyType());
		
		//发布
		List<String> t_new_policyIds= m_srv.policyPublish(userId, Arrays.asList(t_newPolicyId));
		assertTrue(t_new_policyIds.get(0).equals(t_newPolicyId));
		PolicyPojo t_base_policy = m_srv.getPolicyBaseInfo(t_newPolicyId);
		assertTrue(t_base_policy.getInUse()==Constants.TRUE && t_base_policy.isDefault()==false);
		
		//修改基本信息
		t_db_policyPojo.setDesc("TestDesc");
		t_db_policyPojo.setUpdateUser(userId);
		t_newPolicyId = m_srv.modifyPolicyBaseInfo(t_db_policyPojo);
		
		/* 该处理已经废弃
		assertTrue(!t_newPolicyId.equals(t_old_policyId)); //已发布的策略，修改基础信息产生新版本策略
		t_base_policy = m_srv.getPolicyBaseInfo(t_old_policyId);
		assertTrue(t_base_policy.isPublish()==true && t_base_policy.isNewVersion()==false && t_base_policy.isDefault()==false);
		t_base_policy = m_srv.getPolicyBaseInfo(t_newPolicyId);
		assertTrue(t_base_policy.isPublish()==false && t_base_policy.isNewVersion()==true && t_base_policy.isDefault()==false);
		 */
				
		assertTrue(t_newPolicyId.equals(t_old_policyId)); //已发布的策略, 修改基础信息不产生新版本策略
		t_base_policy = m_srv.getPolicyBaseInfo(t_newPolicyId);
		assertTrue(t_base_policy.getInUse() == Constants.FALSE && t_base_policy.isDefault()==false);
		
		//发布
		t_new_policyIds= m_srv.policyPublish(userId, Arrays.asList(t_newPolicyId));
//		assertTrue(t_new_policyIds.get(0).equals(t_old_policyId)); //发布后，新版本策略与旧版本策略会合并
//		t_base_policy = m_srv.getPolicyBaseInfo(t_newPolicyId);
//		assertNull(t_base_policy); //发布后，新版本策略与旧版本策略会合并
		
		assertTrue(t_new_policyIds.get(0).equals(t_old_policyId));
		t_base_policy = m_srv.getPolicyBaseInfo(t_old_policyId);
		assertTrue(t_base_policy.getInUse() == Constants.TRUE); //状态改为已发布
		
		//修改资源
		t_db_scriptReses = m_srv.getScriptResByPolicyId(t_old_policyId);
		
		PolicyScriptResPojo scriptRes2 = new PolicyScriptResPojo();
		scriptRes2.setUserName(t_userName+"-2");
		scriptRes2.setFilePath(t_filePath);
		t_db_scriptReses.add(scriptRes2);
		
		t_newPolicyId = m_srv.modifyScriptRes(t_old_policyId, userId , t_db_scriptReses );
		assertTrue(t_newPolicyId.equals(t_old_policyId)); //已发布的策略，修改资源也不产生新版本策略，需要Portal调用发布
		
		t_db_scriptReses = m_srv.getScriptResByPolicyId(t_newPolicyId);
		assertTrue(t_db_scriptReses.size() == 2);
		
		//发布
		t_new_policyIds= m_srv.policyPublish(userId, Arrays.asList(t_newPolicyId));
		assertTrue(t_new_policyIds.get(0).equals(t_old_policyId)); //这里的发布似乎是一个无效的动作
	}
	
	@Test
	public void getScriptPolicyBaseInfoByDomain() throws ServiceException{
		List<String> domainIds = new ArrayList<String>();
		domainIds.add("1");
		domainIds.add("2");
		List<PolicyPojo> policys= m_srv.getScriptPolicyBaseInfoByDomain(domainIds );
		
		assertTrue(policys.size() > 0);
	}

	// @Test
	// @TxAnnotation(defaultRollBack = true)
	// public void testRemoveScriptRes() throws ServiceException{
	// try {
	// m_scriptPolicyService.removeScriptRes("policyScript-00001");
	// List<PolicyScriptResPojo> result =
	// queryScriptResByPolicyId("policyScript-00001");
	// Assert.assertTrue(result.size() == 0);
	// } catch (ServiceException e) {
	// e.printStackTrace();
	// throw new ServiceException(e);
	// }
	// }

	 
	// @TxAnnotation(defaultRollBack = true)
	@Test
	public void modifyScriptRes() throws Exception {
		PolicyScriptPojo policyPojo = genPolicyScriptPojo();
		List<PolicyScriptResPojo> listPolicyScriptRes = new ArrayList<PolicyScriptResPojo>();
		for (int i = 1; i <= 5; i++) {
			PolicyScriptResPojo e1 = new PolicyScriptResPojo();
			e1.setId("script-" + i);
//			e1.setIp("172.16.36." + i);
			e1.setFilePath("c:\\test\\filePath");
			e1.setUserName(S_TEST_ADMIN);
			listPolicyScriptRes.add(e1);
		}

		policyPojo.setListPolicyScriptResPojo(listPolicyScriptRes);

		m_srv.modifyScriptRes(policyPojo.getId(), "user", policyPojo.getListPolicyScriptResPojo());
		List<PolicyScriptResPojo> t_result = m_srv.getScriptResByPolicyId(policyPojo.getId());
		if (t_result != null) {
			if (S_LOGGER.isDebugEnabled()) {
				S_LOGGER.debug(t_result.size());
			}
			assertEquals(listPolicyScriptRes.size(), t_result.size());
		}
	}

	private PolicyScriptPojo genPolicyScriptPojo() throws Exception{
		PolicyScriptPojo policyPojo = new PolicyScriptPojo();
		policyPojo.setName("test0012");
		policyPojo.setPolicyType(PolicyType.SCRIPT_SIMPLE.getId());
		List<PolicyScriptResPojo> listPolicyScriptRes = new ArrayList<PolicyScriptResPojo>();
		for (int i = 1; i <= 5; i++) {
			PolicyScriptResPojo e1 = new PolicyScriptResPojo();
			e1.setPrimaryIp("172.16.36." + i);
			e1.setFilePath("c:\test\filePath");
			e1.setUserName(S_TEST_ADMIN);
			listPolicyScriptRes.add(e1);
		}

		policyPojo.setListPolicyScriptResPojo(listPolicyScriptRes);
		m_srv.createScriptPolicy(policyPojo);
		
		return policyPojo;
	}
	
	@Test
	public void createScriptPolicy() throws ServiceException {
		PolicyScriptPojo policyPojo = new PolicyScriptPojo();
		policyPojo.setName("test0012");
		policyPojo.setPolicyType(PolicyType.SCRIPT_SIMPLE.getId());
		List<PolicyScriptResPojo> listPolicyScriptRes = new ArrayList<PolicyScriptResPojo>();
		for (int i = 1; i <= 5; i++) {
			PolicyScriptResPojo e1 = new PolicyScriptResPojo();
			e1.setPrimaryIp("172.16.36." + i);
			e1.setFilePath("c:\test\filePath");
			e1.setUserName(S_TEST_ADMIN);
			listPolicyScriptRes.add(e1);
		}

		policyPojo.setListPolicyScriptResPojo(listPolicyScriptRes);
		m_srv.createScriptPolicy(policyPojo);
		
		List<PolicyScriptResPojo> t_result = m_srv.getScriptResByPolicyId(policyPojo.getId());
		assertEquals(listPolicyScriptRes.size(), t_result.size());
	}
	
	@Test
	public void modifyPolicyBaseInfo() throws Exception {
		PolicyScriptPojo policyPojo = new PolicyScriptPojo();
		policyPojo.setName("test0012");
		policyPojo.setPolicyType(PolicyType.SCRIPT_SIMPLE.getId());
		List<PolicyScriptResPojo> listPolicyScriptRes = new ArrayList<PolicyScriptResPojo>();
		for (int i = 1; i <= 5; i++) {
			PolicyScriptResPojo e1 = new PolicyScriptResPojo();
			e1.setPrimaryIp("172.16.36." + i);
			e1.setFilePath("c:\test\filePath");
			e1.setUserName(S_TEST_ADMIN);
			listPolicyScriptRes.add(e1);
		}

		policyPojo.setListPolicyScriptResPojo(listPolicyScriptRes);
		m_srv.createScriptPolicy(policyPojo);
		
		List<PolicyScriptResPojo> t_result = m_srv.getScriptResByPolicyId(policyPojo.getId());
		assertEquals(listPolicyScriptRes.size(), t_result.size());
		
		String t_oldId = policyPojo.getId();
		m_srv.policyPublish("tester", Arrays.asList(new String[] {t_oldId}));
		
		policyPojo.setDesc("modify desc");
		policyPojo.setUpdateUser("tester");
		String t_policyId = m_srv.modifyPolicyBaseInfo(policyPojo);
		assertTrue(!t_oldId.equals(t_policyId));
		
		m_srv.policyPublish("tester", Arrays.asList(new String[] {t_policyId}));
	}
	
	@Test
	public void getScriptResByPolicyId() throws ServiceException {
		String policyId = "policy_script_001";
		List<PolicyScriptResPojo> t_result = m_srv.getScriptResByPolicyId(policyId);
		
		assertNotNull(t_result);
		assertEquals(2, t_result.size());
	}

	@Test
	public void getScriptResListByResIds() throws ServiceException {
		List<String> resIds = new ArrayList<String>();
		resIds.add("1");
		resIds.add("2");
		m_srv.getScriptResListByResIds(resIds);
	}

	@Test
	public void getScriptResByPojo() throws ServiceException {
		PolicyScriptResPojo policyScriptResPojo = new PolicyScriptResPojo();
//		List<String> pluginIds = new ArrayList<String>();
//		pluginIds.add("plug1");
//		pluginIds.add("plug2");
//		policyScriptResPojo.setPluginIds(pluginIds);
//		policyScriptResPojo.setPolicyType("");
		policyScriptResPojo.setPolicyId("b6b160c2-9fec-68d2-1524-1baf5f9cda34");
		policyScriptResPojo.setSortColumn("aaa", SORT.DESC);
		policyScriptResPojo.setPluginId("plugin");
		policyScriptResPojo.setFilePath("filePath");
		policyScriptResPojo.setPort("port");
//		policyScriptResPojo.setResCatalog(ResCatalog.SCRIPT.getId());
		
		m_srv.getScriptResByPojo(policyScriptResPojo);
	}
	
	@Test
	public void getScriptResListByPojo() throws Exception {
		PolicyScriptResPojo policyScriptResPojo = new PolicyScriptResPojo();
		policyScriptResPojo.setResCatalog(ResCatalog.SCRIPT.getId());
		
		m_srv.getScriptResListByPojo(policyScriptResPojo);
	}
	
	@Test
	public void getPolicyByPolicyIdTest() throws ServiceException{
		String policyId = "fd2f4576-0932-5c25-2ac6-7c8c43e1f3e7";
		List<PolicyScriptResPojo> scriptRes = m_srv.getScriptResByPolicyId(policyId);
		
		assertTrue(scriptRes.size() > 0);
	}
	
}
