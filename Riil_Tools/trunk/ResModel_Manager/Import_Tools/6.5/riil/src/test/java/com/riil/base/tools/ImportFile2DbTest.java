package com.riil.base.tools;

import static org.junit.Assert.assertTrue;

import java.io.File;

import org.apache.log4j.Level;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.test.context.ContextConfiguration;

import com.riil.base.resmodel.impl.db.dao.ResTypeDao;
import com.riil.base.resmodel.pojo.mmodel.MetricGroupBasePojo;
import com.riil.base.resmodel.tools.ImportFile2Db;
import com.riil.core.container.ContainerException;
import com.riil.core.container.ServiceContainer;
import com.riil.core.logger.SystemLogger;
import com.riil.core.test.BaseTest;
import com.riil.core.utils.ServerEnvUtil;

/**
 * 文件导入数据库测试类 <br>
 * <br>
 * <p>
 * Create on : 2012-7-7<br>
 * <p>
 * </p>
 * <br>
 * @author ChenJuntao<br>
 * @version riil.resmodel.impl v1.0
 *          <p>
 *          <br>
 *          <strong>Modify History:</strong><br>
 *          user modify_date modify_content<br>
 *          -------------------------------------------<br>
 *          <br>
 */
@ContextConfiguration(locations = { "classpath*:META-INF/PortalServer/riil_service*.xml" })
public class ImportFile2DbTest extends BaseTest {
	@SuppressWarnings("unused")
	private static final String S_INIT_SQL = "ReCreate_ImportAll_Table.sql";
	ResTypeDao resTypeDao;
	@Before
	public void setUp() throws Exception{
		if(resTypeDao == null){
//			SystemLogger.changeLogLevel(Level.DEBUG);
			SystemLogger.changeLogLevel(Level.INFO);
			
			resTypeDao = (ResTypeDao) ((ServiceContainer)ServiceContainer.getInstance()).getApplicationContext().getBean("resTypeDao");
//			TransactionManager.beginTransaction();
//			runSqlScript(new FileInputStream(new File(ImportFile2DbTest.class.getResource("").getPath()+S_INIT_SQL)));
		}
	}
	
	@After
	public void tearDown() throws ContainerException, Exception{
//		TransactionManager.rollbackTransaction();
	}

	@Test
	public void testModelPojo() throws Exception{
		ImportFile2Db t_db = new ImportFile2Db();
		t_db.importAllMetricBinding();
	}
	@Test
	public void importAll() throws Exception  {
		/**
		 * ServerEnvUtil.RIIL_WORK_SPACE_FOLDER 使用的是 src/test/resources/server.xml中的workspace定义 Test默认使用的
		 * RIIL_Common_Doc/resmodel/zh , 即中文的资源模型目录
		 */
		String parentFolder = ".." + File.separator;
		String workspacePath = ServerEnvUtil.RIIL_WORK_SPACE_FOLDER + File.separator;
		String dbScriptPath = workspacePath + parentFolder + parentFolder + "db_script";
		String sqlPath = dbScriptPath + File.separator + "mysql" + File.separator + "riil6.2.0" + File.separator;
		
		//runSqlScript(new FileInputStream(new File(sqlPath + "admin_create_table.sql")));
		//runSqlScript(new FileInputStream(new File(sqlPath + "mserver_base_table.sql")));
		//runSqlScript(new FileInputStream(new File(sqlPath + "mserver_model_table.sql")));
		
		ImportFile2Db t_import = new ImportFile2Db();
		t_import.setBatch(true);
		t_import.importAll();
		assertTrue(resTypeDao.doSelectAll().size()>0);
	}
	
	
	@Test
	public void testMetricGroup(){
		MetricGroupBasePojo gp = new MetricGroupBasePojo();
		
		gp.setMetricGroupId("1");
	}
	
}
