package com.riil.base.resmodel.impl;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Level;
import org.apache.log4j.Logger;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import com.riil.base.pojo.enums.Enum4ResModel.ResIsMain;
import com.riil.base.pojo.enums.Enum4ResType.ResCatalog;
import com.riil.base.resmodel.IResTypeService;
import com.riil.base.resmodel.pojo.base.ResTypePojo;
import com.riil.core.commons.ServerModule;
import com.riil.core.container.ContainerException;
import com.riil.core.container.ServiceContainer;
import com.riil.core.dam.tx.TransactionManager;
import com.riil.core.logger.SystemLogger;
import com.riil.core.service.ServiceException;
import com.riil.core.test.BaseTest;

/**
 * ResTypeService单元测试 <br>
 * 
 * <p>
 * Create on : 2012-6-6<br>
 * <p>
 * </p>
 * <br>
 * 
 * @author HuangYinglu<br>
 * @version riil.resmodel.impl v1.0
 *          <p>
 *          <br>
 *          <strong>Modify History:</strong><br>
 *          user modify_date modify_content<br>
 *          -------------------------------------------<br>
 *          <br>
 */
public class ResTypeServiceTest extends BaseTest{
	private static Logger S_LOGGER = SystemLogger.getSystemLogger(ResTypeServiceTest.class,
			ServerModule.ResourceModel);
	
	IResTypeService m_srv;
	
	@Before
	public void setUp() throws ContainerException, Exception {
		TransactionManager.beginTransaction();
		SystemLogger.changeLogLevel(Level.DEBUG);
		m_srv = (IResTypeService)ServiceContainer.getInstance().getServiceComponent(IResTypeService.S_SERVICE_ID);
	}
	
	@After
	public void tearDown() throws ContainerException, Exception{
		TransactionManager.rollbackTransaction();
	}
	
	@Test
	public void createResTypeTest() throws ServiceException{
		ResTypePojo resType = new ResTypePojo();
		resType.setId("RIIL_RMT_RESTYPE_TEST");
		resType.setName("测试");
		resType.setIcon("resType.png");
		resType.setResCatalog(ResCatalog.Host.getId());
		m_srv.createResType(resType);
	}
	
	@Test
	public void getAllResTypeTest() throws ServiceException{
		List<ResTypePojo> resTypes = m_srv.getAllResType();
		
		assertTrue(resTypes.size() > 0);
	}
	
	@Test
	public void getAllResTypeByIdsTest() throws ServiceException{
		List<String> ids = new ArrayList<String>();
		ids.add("RIIL_RMT_BASE");
		ids.add("RIIL_RMT_HOST");
		List<ResTypePojo> resTypes = m_srv.getAllResType(ids);
		
		assertTrue(resTypes.size() <= 2);
	}
	
	@Test
	public void getAllResTypeByIdAndIsMainTest() throws ServiceException{
		String resTypeId = "RIIL_RMT_SWITCH_RUIJIE";
		ResIsMain isMain = ResIsMain.SubRes;
//		ResIsMain isMain = ResIsMain.SubRes;
		List<ResTypePojo> resTypes = m_srv.getAllResType(isMain, resTypeId);
		assertTrue(resTypes.size() > 0);
	}
	
	@Test
	public void getAllResTypeTreeByResTypeIdTest() throws ServiceException{
		String resTypeId = "RIIL_RMT_HOST";
		boolean withSub = true;
		List<ResTypePojo> resTypeTree = m_srv.getAllResTypeTree(resTypeId, withSub);
		
		assertTrue(resTypeTree.size() > 0);
	}
	
	@Test
	public void getAllResTypeTreeByTreeLevelTest() throws ServiceException{
		int treeLevel = 1 ;
		boolean withSub = true;
		List<ResTypePojo> resTypeTree = m_srv.getAllResTypeTree(treeLevel, withSub);
		
		assertTrue(resTypeTree.size() > 0);
	}
	
	@Test
	public void getAllResTypeTreeByLevelAndDepin() throws ServiceException{
		int treeLevel = 1 ;
		int depth = 2;
		ResIsMain isMain = ResIsMain.MainRes;
		List<ResTypePojo> resTypeTree = m_srv.getAllResTypeTree(treeLevel, depth, isMain);
		assertTrue(resTypeTree.size() > 0);
	}
	
	@Test
	public void getResTypeByIDTest() throws ServiceException{
		String resTypeId = "RIIL_RMM_HOST_LINUX_AGENT";
		ResTypePojo resType = m_srv.getResTypeByID(resTypeId);
		assertNotNull(resType);
	}
	
	@Test
	public void getResTypeBySysoidTest() throws ServiceException{
		String sysoid = "1.3.6.1.4.1.9.1.986";
		ResTypePojo resType = m_srv.getResTypeBySysoid(sysoid);
		assertNotNull(resType);
	}
	
	@Test
	public void getResTypeByTreeNodeIdTest() throws ServiceException{
		String treeNodeId = "00.05";
		ResTypePojo resType = m_srv.getResTypeByTreeNodeId(treeNodeId);
		assertNotNull(resType);
	}
	
	
	@Test
	public void tes() throws ServiceException{
		List<ResTypePojo> allResTypeTree = m_srv.getAllResTypeTree("RIIL_RMT_HOST_WINDOWS", true);
		
		assertNotNull(allResTypeTree);
	}
}
