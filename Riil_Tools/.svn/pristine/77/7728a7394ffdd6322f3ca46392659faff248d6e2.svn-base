package com.riil.base.resmodel.db;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Level;
import org.apache.log4j.Logger;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import com.riil.base.pojo.enums.EnumRoot.MetricType;
import com.riil.base.resmodel.IMetricBaseService;
import com.riil.base.resmodel.IMetricGroupService;
import com.riil.base.resmodel.IResTypeService;
import com.riil.base.resmodel.pojo.base.MetricBasePojo;
import com.riil.base.resmodel.pojo.base.ResTypePojo;
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
public class MetricBaseServiceTest extends BaseTest {
	private static Logger S_LOGGER = SystemLogger.getSystemLogger(MetricBaseServiceTest.class,
			ServerModule.ResourceModel);
	IMetricBaseService m_srv;
	IMetricGroupService m_srvgroup;
	IResTypeService m_resType;
	@Before
	public void setUp() throws ContainerException, Exception {
		TransactionManager.beginTransaction();
		SystemLogger.changeLogLevel(Level.DEBUG);
		m_srv = ServiceContainer.getInstance().getServiceComponent(IMetricBaseService.S_SERVICE_ID);
		m_srvgroup = ServiceContainer.getInstance().getServiceComponent(IMetricGroupService.S_SERVICE_ID);
		m_resType = ServiceContainer.getInstance().getServiceComponent(IResTypeService.S_SERVICE_ID);
	}
	
	@After
	public void tearDown() throws ContainerException, Exception{
		TransactionManager.rollbackTransaction();
	}
	
	@Test
	public void createMetricBaseTest() throws ServiceException{
		MetricBasePojo t_metric = new MetricBasePojo();
		t_metric.setName("指标 - metric 测试");
		t_metric.setUnit("%");
		t_metric.setMetricType(MetricType.PERF.getId());
		
		m_srv.createMetricBase(t_metric);
	}
	
	@Test
	public void createBatchTest () throws ServiceException{
		int times = 10;
		List<MetricBasePojo> t_metrics = new ArrayList<MetricBasePojo>();
		for (int i = 0; i < times; i++) {
			MetricBasePojo t_metric = new MetricBasePojo();
			t_metric.setName("指标 - metric" + i);
			t_metric.setUnit("%");
			t_metric.setMetricType(MetricType.PERF.getId());
			t_metrics.add(t_metric);
		}
		m_srv.createBatch(t_metrics);
	}
	
	@Test
	public void createOrModifyMetricGroupIds() throws ServiceException{
		String t_metricId = "CPURate";
		List<String> t_metricGroupIds = new ArrayList<String>();
		t_metricGroupIds.add("CPUGroup");
		t_metricGroupIds.add("PerfGroup");
		m_srv.createOrModifyMetricGroupIds(t_metricId, t_metricGroupIds);
	}
	
	@Test
	public void getAllMetricBaseTest() throws ServiceException{
		List<MetricBasePojo> t_metricBases = m_srv.getAllMetricBase();
		assertTrue(t_metricBases.size() > 0);
	}

	@Test
	public void getAllMetricBaseByModelIdTest () throws ServiceException{
		String t_modelId = "RIIL_RMM_HOST_WINDOWS_WMI";
		List<MetricBasePojo> t_models = m_srv.getAllMetricBaseByModelId(t_modelId);
		assertTrue(t_models.size() > 0);
	}
	
	@SuppressWarnings("deprecation")
	@Test
	public void getByMetricIdsTest() throws ServiceException{
		
		List<String> metricIds = new ArrayList<String>();
		metricIds.add("CPURate");
		metricIds.add("CPUAverage");
		
		List<MetricBasePojo> metricBases = m_srv.getByMetricIds(metricIds);
		
		assertTrue(metricBases.size()  == 2);
		
	}
	
	@Test
	public void getByMetricIdsAndResTypeIdTest() throws ServiceException{
		List<String> metricIds = new ArrayList<String>();
		metricIds.add("CPURate");
		metricIds.add("CPUAverage");
		String t_resTypeId = "RIIL_RMT_HOST_WINDOWS";
		List<MetricBasePojo> metrics = m_srv.getByMetricIds(metricIds, t_resTypeId);
		
		assertTrue(metrics.size() > 0);
	}
	
	@Test
	public void getMetricBase4ImportantByModelIdTest() throws ServiceException{
		String modelId = "RIIL_RMM_CHILD_CPU_HOST_WINDOWS_SNMP";
		List<MetricBasePojo> models = m_srv.getMetricBase4ImportantByModelId(modelId);
		assertTrue(models.size() > 0);
	}
	
	@Test
	public void getMetricBaseByIDTest() throws ServiceException{
		String metricId = "CPURate";
		MetricBasePojo metricBase = m_srv.getMetricBaseByID(metricId);
		assertNotNull(metricBase);
	}
	
	@Test
	public void getMetricBaseByMetricGroupTest() throws ServiceException{
		String modelId = "RIIL_RMM_CHILD_CPU_HOST_WINDOWS_SNMP";
		String groupId = "InfoGroup";
		
		List<MetricBasePojo> metricBase = m_srv.getMetricBaseByMetricGroup(modelId, groupId);
		assertTrue(metricBase.size() > 0);
	}
	
	@Test
	public void getMetricBaseByResTypeIdTest() throws ServiceException{
		String resTypeId = "RIIL_RMT_HOST_WINDOWS";
		List<MetricBasePojo> metricBases = m_srv.getMetricBaseByResTypeId(resTypeId);
		assertTrue(metricBases.size() > 0);
	}
	
//	@Test
//	public void getMetricBaseByResTypeIdAndMetricIdTest() throws ServiceException{
//		String resTypeId = "RIIL_RMT_CHILD_CPU";
//		String metricId = "CPURate";
//		List<MetricBasePojo> metricBase = m_srv.getMetricBaseByResTypeIdAndMetricId(resTypeId, metricId);
//		assertTrue(metricBase.size() > 0);
//	}
//	
//	@Test
//	public void getMetricBaseByResTypeIdAndMetricIdTest() throws ServiceException{
//		String resTypeId = "RIIL_RMT_CHILD_CPU";
//		String metricId = "CPURate";
//		ModelMetricViewPojo parm = new ModelMetricViewPojo();
//		parm.setMetricGroupId("");
//		
//		MetricBasePojo metricBase = m_srv.getMetricBasesByQuery(parm);
//		assertTrue(metricBase.size() > 0);
//	}
	
	@Test
	public void getMetricBaseByModelIdAndMetricIdTest() throws ServiceException{
		String metricId = "CPURate";
		String modelId = "RIIL_RMM_CHILD_CPU_HOST_WINDOWS_SNMP";
		
		MetricBasePojo metricBase = m_srv.getMetricBaseByModelIdAndMetricId(modelId, metricId);
		assertNotNull(metricBase);
	}
	
	@Test
	public void getMetricBaseByResTypeIdAndMetricIdAndisDisplayTest() throws ServiceException{
		String resTypeId = "RIIL_RMT_CHILD_CPU";
		String metricId = "CPURate";
		List<MetricBasePojo> metricBase = m_srv.getMetricBaseByResTypeIdAndMetricIdAndisDisplay(resTypeId, metricId,Constants.TRUE);
		assertTrue(metricBase.size() > 0);
	}
	
	@Test
	public void getMetricBaseByResTypeIdAndMetricTypeTest() throws ServiceException{
		String resTypeId = "RIIL_RMT_CHILD_CPU";
		MetricType metricType = MetricType.PERF;
		List<MetricBasePojo> metricBase = m_srv.getMetricBaseByResTypeIdAndMetricType(resTypeId, metricType);
		assertTrue(metricBase.size() > 0);
	}
	
	@Test
	public void getMetricBasesByModelAndMetricTypeTest() throws ServiceException{
		String modelId = "RIIL_RMM_CHILD_CPU_HOST_WINDOWS_SNMP";
		String metricType = MetricType.PERF.getId();
		List<MetricBasePojo> metricBase = m_srv.getMetricBasesByModelAndMetricType(modelId, metricType);
		assertTrue(metricBase.size() > 0);
	}
	
	@Test
	public void getMetricBasesByModelAndMetricTypesTest() throws ServiceException{
		String modelId = "RIIL_RMM_CHILD_CPU_HOST_WINDOWS_SNMP";
		List<String> metricTypes = new ArrayList<String>();
		metricTypes.add(MetricType.PERF.getId());
		metricTypes.add(MetricType.INFO.getId());
		
		List<MetricBasePojo> metricBase = m_srv.getMetricBasesByModelAndMetricTypes(modelId, metricTypes);
		assertTrue(metricBase.size() > 0);
	}
	
	@Test
	public void getAllMetricBaseByResTypeIdAndMetricIdTest() throws ServiceException{
		String t_resTypeId = "RIIL_RMT_HOST_WINDOWS";
		String t_metricId = "CPURate";
		List<MetricBasePojo> metricBases = m_srv.getAllMetricBaseByResTypeIdAndMetricId(t_resTypeId, t_metricId);
		
		assertTrue(metricBases.size() > 0);
	}
	
	//TODO
	@Test
	public void getMetricBasesByQueryTest() throws ServiceException{
		
	}
	
	@Test
	public void modifyMetricBaseTest() throws ServiceException{
		MetricBasePojo t_metric = new MetricBasePojo();
		t_metric.setName("指标 - metric 测试");
		t_metric.setUnit("%");
		t_metric.setMetricType(MetricType.PERF.getId());
		m_srv.modifyMetricBase(t_metric);
	}
	
	@Test
	public void removeAllMetricBaseTest() throws ServiceException{
		List<MetricBasePojo> t_metricBases = m_srv.getAllMetricBase();
		assertTrue(t_metricBases.size() > 0);
		m_srv.removeAllMetricBase();
		List<MetricBasePojo> t_metricList = m_srv.getAllMetricBase();
		assertTrue(t_metricList.size() == 0);
	}
	
	//TODO
	@Test
	public void removeMetricBaseByQueryTest() throws ServiceException{
		
	}
	
	@Test
	public void removeMetricBaseById() throws ServiceException{
		
		String t_metricId = "CPURate";
		m_srv.removeMetricBase(t_metricId);
	}
	
	@Test
	public void getMetricByResTree() throws ServiceException{
		String resTypeId = "RIIL_RMT_HOST";
		MetricType metricType = MetricType.PERF;
		ResTypePojo resType = m_resType.getResTypeByID(resTypeId);
		List<MetricBasePojo> metrics = new ArrayList<MetricBasePojo>();
		if("RIIL_RMT_BASE".equals(resType.getParentId())){
			List<ResTypePojo> resTypes = m_resType.getAllResTypeTree(resTypeId, true);
			Map<String, String> metricTemp = new HashMap<String, String>();
			for (ResTypePojo resTypePojo : resTypes) {
				List<MetricBasePojo> metric = m_srv.getMetricBaseByResTypeIdAndMetricType(resTypePojo.getId(), metricType);
				if(metric.size() == 0) continue;
				for (MetricBasePojo metricBasePojo : metric) {
					if(metricTemp.containsKey(metricBasePojo.getId())){
						continue;
					}
					metricTemp.put(metricBasePojo.getId(), String.valueOf(Constants.TRUE));
					metrics.add(metricBasePojo);
				}
			}
			metrics.retainAll(metrics);
		}else{
			List<MetricBasePojo> metric = m_srv.getMetricBaseByResTypeIdAndMetricType(resTypeId, metricType);
			metrics.addAll(metric);
		}
		assertTrue(metrics.size() > 0);
	}
}