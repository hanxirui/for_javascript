package com.riil.base.resmodel;

import static org.junit.Assert.assertTrue;

import java.util.Arrays;
import java.util.List;

import org.apache.log4j.Level;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.test.context.ContextConfiguration;

import com.riil.base.pojo.enums.EnumRoot.DataType;
import com.riil.base.pojo.enums.EnumRoot.EventType;
import com.riil.base.pojo.enums.EnumRoot.PolicyType;
import com.riil.base.policy.IPolicyService;
import com.riil.base.resmodel.impl.DictService;
import com.riil.base.resmodel.impl.ModelService;
import com.riil.base.resmodel.impl.ResTypeService;
import com.riil.base.resmodel.impl.file.BinFileUtils;
import com.riil.base.resmodel.pojo.base.EventBasePojo;
import com.riil.base.resmodel.pojo.base.MetricBasePojo;
import com.riil.base.resmodel.pojo.base.MetricGroupPojo;
import com.riil.base.resmodel.pojo.base.ResTypePojo;
import com.riil.base.resmodel.pojo.base.VendorPojo;
import com.riil.base.resmodel.pojo.mmodel.ModelMetricBindingPojo;
import com.riil.base.resmodel.pojo.mmodel.ModelPojo;
import com.riil.base.resmodel.pojo.policy.PolicyEventPojo;
import com.riil.base.resmodel.pojo.policy.PolicyMetricPojo;
import com.riil.base.resmodel.pojo.policy.PolicyResPojo;
import com.riil.base.resmodel.tools.ImportOneFile2Db;
import com.riil.base.resmodel.tools.ResModelFileTools;
import com.riil.core.constant.Constants;
import com.riil.core.container.ServiceContainer;
import com.riil.core.logger.SystemLogger;
import com.riil.core.test.BaseTest;

/**
 * 资源模型的集成测试
 * @author ChenJuntao
 *
 */
@ContextConfiguration(locations = { "classpath*:META-INF/PortalServer/riil_service*.xml" })
public class ResModelIntegratedTest extends BaseTest {
	
	IVendorService m_vendorSrv;
	IMetricGroupService m_metricGroupSrv;
	IMetricBaseService m_metricBaseSrv;
	IResTypeService m_resTypeSrv;
	IDictService m_dicSrv;
	IModelService m_modelSrv; 
	IEventBaseService m_eventSrv;
	IPolicyService m_policySrv;
	
	@Before
	public void setUp() throws Exception {
		if(m_vendorSrv == null){
			SystemLogger.changeLogLevel(Level.DEBUG);
			m_vendorSrv = ServiceContainer.getInstance().getServiceComponent(IVendorService.S_SERVICE_ID);
			m_metricBaseSrv = ServiceContainer.getInstance().getServiceComponent(IMetricBaseService.S_SERVICE_ID);
			m_metricGroupSrv = ServiceContainer.getInstance().getServiceComponent(IMetricGroupService.S_SERVICE_ID);
			m_resTypeSrv = ServiceContainer.getInstance().getServiceComponent(IResTypeService.S_SERVICE_ID);
			m_dicSrv = ServiceContainer.getInstance().getServiceComponent(IDictService.S_SERVICE_ID);
			m_modelSrv = ServiceContainer.getInstance().getServiceComponent(IModelService.S_SERVICE_ID);
			m_eventSrv =  ServiceContainer.getInstance().getServiceComponent(IEventBaseService.S_SERVICE_ID);
			m_policySrv = ServiceContainer.getInstance().getServiceComponent(IPolicyService.S_SERVICE_ID);
			//runSqlScript(new FileInputStream(new File("D:/Devoloper_Env/IDE/eclipse/workspace_6.1.2/RIIL_Framework_Refactor_2013_08/source/basemodel/riil-resmodel/src/test/java/sql/mserver_model_table.sql")));
		}
//		TransactionManager.beginTransaction();
	}

	@After
	public void tearDown() throws Exception {
//		TransactionManager.rollbackTransaction();
	}
	
	@Test
	public void testMain() throws Exception {
		// -------------------------------------------------------		
		VendorPojo vendor = new VendorPojo();
		vendor.setId("Microsoft");
		vendor.setName("微软");
		vendor.setVendorIcon("microsoft.png");
		m_vendorSrv.createVendor(vendor);
		
		// -------------------------------------------------------
		// 指标
		MetricBasePojo metricBase = new MetricBasePojo();
		metricBase.setId("PingAvailStatus");
		metricBase.setName("设备可用状态"); //指标的默认名称，仅用于选择指标，其他应使用ModelMetricBinding中名称
		metricBase.setUnit("");
		metricBase.setDataType(DataType.NUMBER.getId());
		metricBase.setSortId(100);
		
		MetricBasePojo metricBase2 = new MetricBasePojo();
		metricBase2.setId("CPURate");
		metricBase2.setName("CPU平均利用率"); 
		metricBase2.setUnit("%");
		metricBase2.setDataType(DataType.NUMBER.getId());
		metricBase2.setSortId(101);
		
		m_metricBaseSrv.createMetricBase(metricBase);
		m_metricBaseSrv.createMetricBase(metricBase2);
		
		// -------------------------------------------------------
		MetricGroupPojo metricGroup = new MetricGroupPojo();
		metricGroup.setId("PERF");
		metricGroup.setName("性能指标组");
		metricGroup.setGroupType("MetricType");
		
		MetricGroupPojo metricGroup2 = new MetricGroupPojo();
		metricGroup2.setId("AVAIL");
		metricGroup2.setName("可用性指标组");
		metricGroup2.setGroupType("MetricType");
		
		MetricGroupPojo metricGroup3 = new MetricGroupPojo();
		metricGroup3.setId("CPU");
		metricGroup3.setName("CPU指标组");
		metricGroup3.setGroupType("Series");
		
		MetricGroupPojo metricGroup4 = new MetricGroupPojo();
		metricGroup4.setId("MEM");
		metricGroup4.setName("内存指标组");
		metricGroup4.setGroupType("Series");
		
		m_metricGroupSrv.createMetricGroup(metricGroup );
		m_metricGroupSrv.createMetricGroup(metricGroup2 );
		m_metricGroupSrv.createMetricGroup(metricGroup3 );
		m_metricGroupSrv.createMetricGroup(metricGroup4 );
		
		// -------------------------------------------------------
		String metricId = "CPURate";
		List<String> metricGroupIds = Arrays.asList(new String[]{"PERF", "CPU"});
		m_metricBaseSrv.createOrModifyMetricGroupIds(metricId, metricGroupIds);
		
		String metricGroupId = "AVAIL";
		List<String> metricIds = Arrays.asList(new String[]{"PingAvailStatus"});
		m_metricGroupSrv.createOrModifyMetricIds(metricGroupId, metricIds);
		
		// -------------------------------------------------------
		// 事件
		EventBasePojo event1 = new EventBasePojo();
		event1.setId("AVAILABLE");
		event1.setType(EventType.AVAIL_EVENT.getId());
		event1.setName("可用性指标恢复可用");
		event1.setNameDisplay("{METRIC_NAME}恢复可用");
		event1.setDesc("当前可用性指标恢复可用");
		event1.setIsRecoveryEvent(Constants.TRUE);
		event1.setExpId((byte)2);
		event1.setRecoveryEventIds("UNAVAILABLE");
		
		EventBasePojo event2 = new EventBasePojo();
		event2.setId("UNAVAILABLE");
		event2.setType(EventType.AVAIL_EVENT.getId());
		event2.setName("可用性状态不可用");
		event2.setNameDisplay("{METRIC_NAME}不可用");
		event2.setDesc("当前可用性状态不可用");
		event2.setIsRecoveryEvent(Constants.FALSE);
		event2.setExpId((byte)1);
		event2.setRecoveryEventIds("");
		
		m_eventSrv.createEventBase(event1);
		m_eventSrv.createEventBase(event2);
		
		// -------------------------------------------------------
		ResTypePojo resType = new ResTypePojo();
		resType.setId("RIIL_RMT_BASE");
		resType.setName("监控模板");
		resType.setTreeNodeId("00");	
		resType.setIsMain(Constants.TRUE);
		resType.setResCatalog("");
		resType.setTreeLevel(0);
		resType.setParentId("");
		resType.setSortId(0);
		resType.setIcon("");
		resType.setVendorId("");
		
		
		ResTypePojo resType1 = new ResTypePojo();
		resType1.setId("RIIL_RMT_HOST");
		resType1.setName("主机");
		resType1.setTreeNodeId("00.01");
		resType1.setIsMain(Constants.TRUE);
		resType1.setResCatalog("");
		resType1.setTreeLevel(1);
		resType1.setParentId("RIIL_RMT_BASE");
		resType1.setSortId(1000000);
		resType1.setIcon("Host.png");
		resType1.setVendorId("");
		
		
		ResTypePojo resType2 = new ResTypePojo();
		resType2.setId("RIIL_RMT_HOST_WINDOWS");
		resType2.setName("Windows");
		resType2.setTreeNodeId("00.01.01");
		resType2.setIsMain(Constants.TRUE);
		resType2.setResCatalog("Host");
		resType2.setTreeLevel(2);
		resType2.setParentId("RIIL_RMT_HOST");
		resType2.setSortId(1);
		resType2.setIcon("microsoft_host.png");
		resType2.setVendorId("Microsoft");
		
		
		ResTypePojo resType2_1 = new ResTypePojo();
		resType2_1.setId("RIIL_RMT_CHILD_CPU");
		resType2_1.setName("CPU");
		resType2_1.setTreeNodeId("01.01");
		resType2_1.setIsMain(Constants.FALSE);
		resType2_1.setResCatalog("");
		resType2_1.setTreeLevel(2);
		resType2_1.setParentId("RIIL_RMT_CHILD_BASE");
		resType2_1.setSortId(1);
		resType2_1.setIcon("");
		resType2_1.setVendorId("");
		
		
		m_resTypeSrv.createResType(resType);
		m_resTypeSrv.createResType(resType1);
		m_resTypeSrv.createResType(resType2);
		m_resTypeSrv.createResType(resType2_1);
		// -------------------------------------------------------
		// 模型
		ModelPojo model = new ModelPojo();
		model.setId("RIIL_RMM_HOST_WINDOWS_SNMP");
		model.setResTypeId("RIIL_RMT_HOST_WINDOWS");
		model.setName("Windows主机(SNMP)");
		model.setDesc("Windows主机(SNMP)");
		model.setTreeNodeId("00.01.01");
		model.setIsMain(Constants.TRUE);
		model.setIsSnmp(Constants.TRUE);
		model.setPluginId("NetDevice");
		model.setMainModelId(null);
		model.setVersion("TBD");
		model.setConnectInfoDesc("TBD");
		model.setPrecondition("TBD");
		
		ModelMetricBindingPojo mmb1 = new ModelMetricBindingPojo();
		mmb1.setModelId("RIIL_RMM_HOST_WINDOWS_SNMP");
		mmb1.setId("PingAvailStatus");
		
		ModelMetricBindingPojo mmb2 = new ModelMetricBindingPojo();
		mmb2.setModelId("RIIL_RMM_HOST_WINDOWS_SNMP");
		mmb2.setId("CPURate");
		
		model.addModelMetricBindingPojo(mmb1);
		model.addModelMetricBindingPojo(mmb2);
		
		
		ModelPojo model_c1 = new ModelPojo();
		model_c1.setId("RIIL_RMM_CHILD_CPU_HOST_WINDOWS_SNMP");
		model_c1.setResTypeId("RIIL_RMT_CHILD_CPU");
		model_c1.setName("CPU");
		model_c1.setDesc("CPU");
		model_c1.setTreeNodeId("01.01");
		model_c1.setIsMain(Constants.FALSE);
		model_c1.setIsSnmp(Constants.TRUE);
		model_c1.setPluginId("NetDevice");
		model_c1.setMainModelId("RIIL_RMM_HOST_WINDOWS_SNMP");
		model_c1.setVersion("TBD");
		model_c1.setConnectInfoDesc("TBD");
		model_c1.setPrecondition("TBD");
		
		ImportOneFile2Db importor = new ImportOneFile2Db();
		importor.importModel(model);
		importor.importModel(model_c1);
		
		// -------------------------------------------------------
		// 策略
		PolicyResPojo policy1 = new PolicyResPojo();
		policy1.setId("RIIL_RMP_RES_HOST_WINDOWS_SNMP_DEFAULT");
		policy1.setPolicyType(PolicyType.RES.getId());
		policy1.setResTypeId("RIIL_RMT_HOST_WINDOWS");
		policy1.setModelId("RIIL_RMM_HOST_WINDOWS_SNMP");
		policy1.setTreeNodeId("00.01.01");
		policy1.setName("Windows主机(SNMP)");
		policy1.setDesc("Windows主机(SNMP)");
		policy1.setIsMain(Constants.TRUE);
		policy1.setInUse(Constants.TRUE);
		policy1.setIsFactory(Constants.TRUE);
		policy1.setMainPolicyId(null);
		
		PolicyMetricPojo policyMetric1_1 = new PolicyMetricPojo();
		policyMetric1_1.setMetricId("PingAvailStatus");
		policyMetric1_1.setPolicyId("RIIL_RMP_RES_HOST_WINDOWS_SNMP_DEFAULT");
		policyMetric1_1.setFrequencyId("avail.1min");
		policyMetric1_1.setInUse(Constants.TRUE);
		policyMetric1_1.setFlapping(3);
		policyMetric1_1.setTimeout(10);
		policyMetric1_1.setRetryTimes(10);
		policyMetric1_1.setDefaultGenEvent(Constants.TRUE);
		
		PolicyMetricPojo policyMetric1_2 = new PolicyMetricPojo();
		policyMetric1_2.setMetricId("CPURate");
		policyMetric1_2.setPolicyId("RIIL_RMP_RES_HOST_WINDOWS_SNMP_DEFAULT");
		policyMetric1_2.setFrequencyId("avail.1min");
		policyMetric1_2.setInUse(Constants.TRUE);
		policyMetric1_2.setFlapping(3);
		policyMetric1_2.setTimeout(10);
		policyMetric1_2.setRetryTimes(10);
		policyMetric1_2.setDefaultGenEvent(Constants.TRUE);
		
		policy1.addPolicyMetricPojo(policyMetric1_1 );
		policy1.addPolicyMetricPojo(policyMetric1_2 );
		
		PolicyEventPojo policyEvent1_1 = new PolicyEventPojo();
		policyEvent1_1.setEventId("AVAILABLE");
		policyEvent1_1.setName("可用性指标恢复可用");
		policyEvent1_1.setPolicyId("RIIL_RMP_RES_HOST_WINDOWS_SNMP_DEFAULT");
		policyEvent1_1.setInUse(Constants.TRUE);
		policyEvent1_1.setLevel("6");
		
		PolicyEventPojo policyEvent1_2 = new PolicyEventPojo();
		policyEvent1_2.setEventId("UNAVAILABLE");
		policyEvent1_2.setName("可用性状态不可用");
		policyEvent1_2.setPolicyId("RIIL_RMP_RES_HOST_WINDOWS_SNMP_DEFAULT");
		policyEvent1_2.setInUse(Constants.TRUE);
		policyEvent1_2.setLevel("6");
		
		policy1.addPolicyEventPojo(policyEvent1_1);
		policy1.addPolicyEventPojo(policyEvent1_2);
		
		

		PolicyResPojo policy2 = new PolicyResPojo();
		policy2.setId("RIIL_RMP_RES_CHILD_CPU_HOST_WINDOWS_SNMP_DEFAULT");
		policy2.setPolicyType(PolicyType.RES.getId());
		policy2.setResTypeId("RIIL_RMT_CHILD_CPU");
		policy2.setModelId("RIIL_RMM_CHILD_CPU_HOST_WINDOWS_SNMP");
		policy2.setTreeNodeId("01.01");
		policy2.setName("CPU");
		policy2.setDesc("CPU");
		policy2.setIsMain(Constants.TRUE);
		policy2.setInUse(Constants.TRUE);
		policy2.setIsFactory(Constants.TRUE);
		policy2.setMainPolicyId("RIIL_RMP_RES_HOST_WINDOWS_SNMP_DEFAULT");
		
		
		m_policySrv.createOrModify(policy1);
		m_policySrv.createOrModify(policy2);
		// -------------------------------------------------------
		// 生成Bin文件
		ResModelFileTools tools = new ResModelFileTools();
		BinFileUtils.init();
		tools.genAllBinFiles();
		// -------------------------------------------------------
		// 测试Bin文件读取
		((DictService)m_dicSrv).reset();
		m_dicSrv.init();
		assertTrue(m_dicSrv.getDictPojo().getAllMetricBases().size() > 0);
		assertTrue(m_dicSrv.getDictPojo().getAllMetricGroup().size() > 0);
		assertTrue(m_dicSrv.getDictPojo().getAllMetricGroupRel().size() > 0);
		
		((ResTypeService)m_resTypeSrv).reset();
		m_resTypeSrv.init();
		assertTrue(m_resTypeSrv.getAllResType().size() > 0);
		((ModelService)m_modelSrv).reset();
		m_modelSrv.init();
		assertTrue(m_modelSrv.getAllModel().size() > 0);
		
		assertTrue(m_policySrv.getAllFactoryPolicy().size() > 0);
	}
	
}
