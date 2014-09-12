package com.riil.base.resmodel.impl;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.apache.log4j.Level;
import org.apache.log4j.Logger;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import com.riil.base.pojo.enums.Enum4ResType.TreeNodeId;
import com.riil.base.pojo.enums.EnumRoot.PolicyType;
import com.riil.base.pojo.enums.EnumRoot.UserType;
import com.riil.base.resmodel.IResModelSupport;
import com.riil.base.resmodel.param.ResTreeParam;
import com.riil.base.resmodel.pojo.base.ResTypePojo;
import com.riil.base.resmodel.pojo.mmodel.Model;
import com.riil.base.resmodel.pojo.vendor.VendorModelPojo;
import com.riil.base.resource.param.DomainParam;
import com.riil.base.resource.pojo.ResInstancePojo;
import com.riil.core.commons.ServerModule;
import com.riil.core.constant.Constants;
import com.riil.core.container.ContainerException;
import com.riil.core.container.ServiceContainer;
import com.riil.core.dam.tx.TransactionManager;
import com.riil.core.dao.IQueryParam.SORT;
import com.riil.core.logger.SystemLogger;
import com.riil.core.service.ServiceException;
import com.riil.core.test.BaseTest;

public class ResModelSupportTest extends BaseTest{
	private static Logger S_LOGGER = SystemLogger.getSystemLogger(ResModelSupportTest.class,
			ServerModule.ResourceModel);
	
	private IResModelSupport m_srv;
	
	@Before
	public void setUp() throws Exception {
		if(m_srv == null){
			TransactionManager.beginTransaction();
			SystemLogger.changeLogLevel(Level.DEBUG);
			m_srv = ServiceContainer.getInstance().getServiceComponent(IResModelSupport.S_SERVICE_ID);
		}
	}
	
	@After
	public void tearDown() throws ContainerException, Exception{
		TransactionManager.rollbackTransaction();
	}
	
	@Test
	public void getResTypeHasResTest() throws ServiceException{
		List<ResTypePojo> resTypes = m_srv.getResTypeHasRes();
		
		assertTrue(resTypes.size() > 0);
	}
	
	@Test
	public void getResTypeHasResByTreeLevelTest() throws ServiceException{
		int treeLevel = 1;
		List<ResTypePojo> resTypes = m_srv.getResTypeHasRes(treeLevel);
		
		assertTrue(resTypes.size() > 0);
	}
	
	@Test
	public void getResTypeListListByBizId() throws ServiceException{
		String bizId = "15826843-3766-a899-5df2-b2f159ca21c7";
		List<ResTypePojo> resTypes = m_srv.getResTypeListByBizId(bizId);
		
		assertTrue(resTypes.size() > 0);
	}
	
	@Test
	public void getResTypeListByBizIdAndTreeLevel()  throws ServiceException{
		String bizId = "15826843-3766-a899-5df2-b2f159ca21c7";
		int treeLevel = 2;
		
		List<ResTypePojo> resTypes = m_srv.getResTypeListByBizId(bizId,treeLevel);
		assertTrue(resTypes.size() > 0);
	}
	
	@Test
	public void getAllModelHasResByTreeNodeIdTest() throws ServiceException{
		String treeNodeId = "00.01";
		
		List<Model> models = m_srv.getAllModelHasResByTreeNodeId(treeNodeId);
		
		assertTrue(models.size() > 0);
	}
	
	@Test
	public void createResInstancePojoTest() throws ServiceException{
		String modelId = "RIIL_RMM_HOST_WINDOWS_SNMP";
		
		ResInstancePojo resInst = m_srv.createResInstancePojo(modelId);
		
		assertNotNull(resInst);
	}
	
	@Test
	public void getVendorsWithResNumByDomainTest() throws ServiceException{
		List<String> domainIds = new ArrayList<String>();
		domainIds.add("domain-root");
		
		List<VendorModelPojo> vendorModels = m_srv.getVendorsWithResNumByDomain(domainIds);
		assertTrue(vendorModels.size() > 0);
	}
	
	@Test
	public void getAllSubResTypeWithResNumTest() throws ServiceException{
		String mainResId = "010402b3-0def-3fad-ab89-a7e23e23df8c";
		
		List<ResTypePojo> resTypes = m_srv.getAllSubResTypeWithResNum(mainResId);
		assertTrue(resTypes.size() > 0);
	}
	
	@Test
	public void getTempTreeWithResNumTest() throws ServiceException{
		DomainParam domainParam = new DomainParam();
		domainParam.setSortColumn("C_NAME", SORT.ASC);
		domainParam.setPageSize(30);

		ResTreeParam resTreeParam = new ResTreeParam();
		resTreeParam.setIsManaged(Constants.TRUE);
		resTreeParam.setTreeNodeId("00.02");
		resTreeParam.setPolicyTypes(Arrays.asList(new String[] {PolicyType.RES.getId()} ));
//		resTreeParam.setPolicyTypes(Arrays.asList(new String[] {PolicyType.RES.getId(),PolicyType.BIZ.getId()} ));
//		resTreeParam.setResCatalogs(ResCatalog.getResIncludeBaseService(true));
		resTreeParam.setTreeLevel(1);
		
		List<ResTypePojo> t_result;
		List<ResTypePojo> t_expected = new ArrayList<ResTypePojo>();
		
		String ip = "172.16.36.122";
		
		//系统管理员-全部域
		domainParam.setUserType(UserType.SysAdmin);
		domainParam.setUserId("edwin");
		domainParam.getDomainIds().add("domain-root");
		
		t_result = m_srv.getResTypeTreeWithResNum(domainParam, resTreeParam);
		t_expected.clear();
//		t_expected.add(new ResInstBasePojo("res-host-02", ip));
//		assertResInstBase(t_expected, t_result);
		
		//系统管理员-单域
		domainParam.setUserType(UserType.SysAdmin);
		domainParam.setUserId("edwin");
		domainParam.getDomainIds().add("domain_tj");
		domainParam.getDomainIds().add("domain_bj");
		domainParam.setDomainId("domain_bj");
		
		t_result = m_srv.getResTypeTreeWithResNum(domainParam, resTreeParam);
//		t_expected.clear();
//		t_expected.add(new ResInstBasePojo("res-host-02", ip));
//		assertResInstBase(t_expected, t_result);
		
		//用户-全部域
		domainParam.setUserType(UserType.User);
		domainParam.setUserId("edwin");
		domainParam.getDomainIds().add("domain_tj");
		domainParam.getDomainIds().add("domain_bj");
		domainParam.setDomainId(null);
		List<String> groupIds = new ArrayList<String>();
		groupIds.add("group-portal");
		groupIds.add("group-plugin");
		domainParam.getDomainWithGroup().put("domain_tj", groupIds );
		List<String> groupIds2 = new ArrayList<String>();
		groupIds2.add("group-require");
		domainParam.getDomainWithGroup().put("domain_bj", groupIds2 );
		
		t_result = m_srv.getResTypeTreeWithResNum(domainParam, resTreeParam);
	}
	
	@Test
	public void getKpiResTypeTreeWithResNumTest() throws ServiceException{
		DomainParam domainParam = new DomainParam();
		
		domainParam.setUserType(UserType.SysAdmin);
		domainParam.setUserId("user-admin");
		domainParam.setDomainId("domain-root");
		
		
		ResTreeParam resTreeParam = new ResTreeParam();
		resTreeParam.setIsManaged(Constants.TRUE);
		resTreeParam.setTreeNodeId(TreeNodeId.HOST.getId());
		resTreeParam.setPolicyTypes(Arrays.asList(new String[] {PolicyType.RES.getId()} ));
		
		
		m_srv.getKpiResTypeTreeWithResNum(domainParam, resTreeParam);
	}
	
	@Test
	public void getBizSrvResTypeTreeWithResNumTest() throws ServiceException{
		
	}
	
	@Test
	public void getEventCenterResTypeTreeWithResNumTest() throws ServiceException{
		
	}
	
	@Test
	public void getResTypeTreeWithResNumNotInDomainTest() throws ServiceException{
		
		List<ResTypePojo> resTypes = m_srv.getResTypeTreeWithResNumNotInDomain();
		assertTrue(resTypes.size() > 0);
	}
	
	@Test
	public void getResTypeTreeHasResByResGroupIdTest() throws ServiceException{
		String resGroupId = "domain-root";
		String domainId = "domain-root";
		List<ResTypePojo> resTypes = m_srv.getResTypeTreeHasResByResGroupId(resGroupId, domainId);
		assertTrue(resTypes.size() > 0);
		
	}
	
	@Test
	public void getResTypeTreeHasCandidateResByResGroupIdTest() throws ServiceException{
		String resGroupId = "";
		String domainId = "domain-root";
		List<ResTypePojo> resTypes = m_srv.getResTypeTreeHasCandidateResByResGroupId(resGroupId, domainId);
		assertTrue(resTypes.size() > 0);
	}
	
	@Test
	public void getResTypeTreeHasCandidateResWithScriptByResGroupIdTest() throws ServiceException{
		String resGroupId = "";
		String domainId = "domain-root";
		List<ResTypePojo> resTypes = m_srv.getResTypeTreeHasCandidateResWithScriptByResGroupId(resGroupId, domainId);
		assertTrue(resTypes.size() > 0);
	}
	
	
	@Test
	public void getVendorModelByTreeNodeId() throws ServiceException{
		String treeNodeId = "00.01";
		boolean hasRes = true;
		
		List<VendorModelPojo> vendorModels = m_srv.getVendorModelByTreeNodeId(treeNodeId, hasRes);
		
		assertTrue(vendorModels.size() > 0);
	}
}
