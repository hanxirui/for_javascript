package com.riil.base.policy;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.apache.log4j.Level;
import org.apache.log4j.Logger;
import org.junit.Before;
import org.junit.Test;
import org.springframework.test.context.ContextConfiguration;

import com.riil.base.pojo.enums.Enum4Metric.Status4Metric;
import com.riil.base.pojo.enums.EnumRoot.MetricType;
import com.riil.base.pojo.enums.EnumRoot.Operator4Number;
import com.riil.base.pojo.enums.EnumRoot.OperatorRel;
import com.riil.base.pojo.enums.EnumRoot.PolicyType;
import com.riil.base.policy.impl.ResourcePolicyService;
import com.riil.base.policy.impl.dao.PolicyResAvailRuleGroupDAO;
import com.riil.base.resmodel.IResTypeService;
import com.riil.base.resmodel.pojo.base.ResTypePojo;
import com.riil.base.resmodel.pojo.policy.PolicyActionPojo;
import com.riil.base.resmodel.pojo.policy.PolicyMetricPojo;
import com.riil.base.resmodel.pojo.policy.PolicyPojo;
import com.riil.base.resmodel.pojo.policy.PolicyResPojo;
import com.riil.base.resmodel.pojo.policy.PolicyThresholdPojo;
import com.riil.base.resmodel.pojo.policy.ResAvailRule;
import com.riil.base.resmodel.pojo.policy.ResAvailRuleGroup;
import com.riil.base.resource.IResChangeService;
import com.riil.base.resource.IResInstBaseService;
import com.riil.core.commons.ServerModule;
import com.riil.core.constant.Constants;
import com.riil.core.container.ContainerException;
import com.riil.core.container.ServiceContainer;
import com.riil.core.logger.SystemLogger;
import com.riil.core.service.ServiceException;
import com.riil.core.test.BaseTest;

@ContextConfiguration(locations = { "classpath*:META-INF/PortalServer/riil_service*.xml" })
public class ResourcePolicyServiceTest extends BaseTest {
	private static Logger S_LOGGER = SystemLogger.getSystemLogger(ResourcePolicyServiceTest.class,
			ServerModule.ResourceModel);
	IResourcePolicyService m_srv;
	IResTypeService m_resType;

	@Before
	public void setUp() throws Exception {
		m_srv = ServiceContainer.getInstance().getServiceComponent(IResourcePolicyService.S_SERVICE_ID);
		m_resType = ServiceContainer.getInstance().getServiceComponent(IResTypeService.S_SERVICE_ID);
		addListener();
		SystemLogger.changeLogLevel(Level.DEBUG);
	}

	@Test
	public void testCreate() throws ServiceException {
		// String policyId= "RIIL_RMP_RES_HOST_LINUX_SNMP_DEFAULT";
		String policyId = "RIIL_RMP_RES_SWITCH_RUIJIE_SNMP_DEFAULT";

		PolicyResPojo t_policy = (PolicyResPojo) m_srv.getPolicyByPolicyId(policyId);
		t_policy.setResAvailRuleGroup(get());
		m_srv.createMainPolicy(m_srv.getDefaultPolicyByModelId(t_policy.getModelId()), t_policy);
		assertTrue(true);
	}

	@Test
	public void getSubPolicyBaseInfoByPolicyTypeAll() throws Exception{
		String policyType = "RES";
		List<String> domainIds = new ArrayList<String>();
		domainIds.add("1");
		domainIds.add("2");
		m_srv.getSubPolicyBaseInfoByPolicyTypeAll(policyType, domainIds);
	}
	
	@Test
	public void testAvailRuleSaveAndGet() {
		PolicyResAvailRuleGroupDAO dao = ((ResourcePolicyService) m_srv).getPolicyResAvailRuleGroupDAO();

		ResAvailRuleGroup group = get();

		String t_srcXml = getXML();
		System.out.println(t_srcXml.length());
		dao.splitXML(t_srcXml, group);

		assertTrue(group.getXml().length() < 4000);
		assertTrue(group.getXml2().length() < 4000);
		assertTrue(group.getXml3().length() < 4000);

		String t_xml = dao.rebuildXML(group);

		assertEquals(t_srcXml, t_xml);
	}

	private String getXML() {
		return "<G><e>false</e><GS><G><e>false</e><gr>OR</gr><GS/><RS>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R>"
				+ "<R><i>CPURate</i><n>CPU使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R></RS></G>"
				+ "<G><e>false</e><gr>OR</gr><GS/><RS><R><i>NIBRate</i><n>NIB使用率</n><o>EQUAL</o><v>true</v><r>AND</r></R></RS></G></GS><RS/></G>";
	}

	private ResAvailRuleGroup get() {
		ResAvailRuleGroup t_level1 = new ResAvailRuleGroup();
		t_level1.setFrequencyId("FrequencyId");
		List<ResAvailRuleGroup> groups = new ArrayList<ResAvailRuleGroup>();

		ResAvailRuleGroup t_level2_1 = new ResAvailRuleGroup();
		t_level2_1.setOperatorRel(OperatorRel.OR);
		List<ResAvailRule> t_2_1_rules = new ArrayList<ResAvailRule>();
		ResAvailRule t_rule1 = new ResAvailRule();
		t_rule1.setMetricId("CPURate");
		t_rule1.setMetricName("CPU使用率");
		t_rule1.setOperator(Operator4Number.EQUAL);
		t_rule1.setValue(Boolean.TRUE.toString());
		t_rule1.setValueType("Boolean");
		t_rule1.setOperatorRel(OperatorRel.AND);

		ResAvailRule t_rule2 = new ResAvailRule();
		t_rule2.setMetricId("CPURate");
		t_rule2.setMetricName("CPU使用率");
		t_rule2.setOperator(Operator4Number.EQUAL);
		t_rule2.setValue(Boolean.TRUE.toString());
		t_rule1.setValueType("Boolean");
		t_rule2.setOperatorRel(OperatorRel.AND);

		ResAvailRule t_rule3 = new ResAvailRule();
		t_rule3.setMetricId("CPURate");
		t_rule3.setMetricName("CPU使用率");
		t_rule3.setOperator(Operator4Number.EQUAL);
		t_rule3.setValue(Boolean.TRUE.toString());
		t_rule1.setValueType("Boolean");
		t_rule3.setOperatorRel(OperatorRel.AND);

		t_2_1_rules.add(t_rule1);
		t_2_1_rules.add(t_rule2);
		t_2_1_rules.add(t_rule3);
		t_level2_1.setRules(t_2_1_rules);

		ResAvailRuleGroup t_level2_2 = new ResAvailRuleGroup();
		t_level2_2.setOperatorRel(OperatorRel.OR);
		List<ResAvailRule> t_2_2_rules = new ArrayList<ResAvailRule>();

		ResAvailRule t_rule4 = new ResAvailRule();
		t_rule4.setMetricId("NIBRate");
		t_rule4.setMetricName("NIB使用率");
		t_rule4.setOperator(Operator4Number.EQUAL);
		t_rule4.setValue(Boolean.TRUE.toString());
		t_rule1.setValueType("Boolean");
		t_rule4.setOperatorRel(OperatorRel.AND);
		t_2_2_rules.add(t_rule4);
		t_level2_2.setRules(t_2_2_rules);

		groups.add(t_level2_1);
		groups.add(t_level2_2);

		t_level1.setGroups(groups);

		return t_level1;
	}

	@Test
	public void testGetPolicyMetricsWithThresholdByPolicyId() throws ServiceException {
		List<PolicyMetricPojo> t_list = m_srv
				.getPolicyMetricsWithThresholdByPolicyId("RIIL_RMP_Res_Host_Windows_Snmp_Default");
		for (PolicyMetricPojo policyMetricPojo : t_list) {
			if (S_LOGGER.isDebugEnabled()) {
				S_LOGGER.debug(policyMetricPojo);
			}
		}
	}

	@Test
	public void modifyPolicyMetric() throws ServiceException {
		final String policyId = "RIIL_RMP_RES_SWITCH_RUIJIE_SNMP_DEFAULT";
		final String userId = "u1";

		List<PolicyMetricPojo> policyMetricPojos = m_srv.getPolicyMetricsWithOutThresholdByPolicyId(policyId);
		for (PolicyMetricPojo policyMetricPojo : policyMetricPojos) {
			policyMetricPojo.setFrequencyId("5mm");
		}
		// for (int i = 0; i < 1; i++) {
		// PolicyMetricPojo pojo = new PolicyMetricPojo();
		// pojo.setPolicyId(policyId);
		// pojo.setMetricId("NICTotalSendReceivePacketCount");
		// pojo.setInUse((byte) -1);
		// pojo.setCount(10);
		// pojo.setFrequencyId("5m");
		// policyMetricPojos.add(pojo);
		// }
		m_srv.modifyPolicyMetric(policyId, userId, policyMetricPojos);
	}

	@Test
	public void listenerTest() throws ServiceException, ContainerException {
		IResInstBaseService t_service = ServiceContainer.getInstance().getServiceComponent(
				IResInstBaseService.S_SERVICE_ID);
		t_service.remove("0b35b2af-bb1e-5db3-6dce-3e7f868ec933");
	}

	@Test
	public void modifyPolicyThreshold() throws ServiceException {
		final String policyId = "RIIL_RMP_RES_HOST_WINDOWS_WMI_DEFAULT";
		final String metricId = "MemPageOutRate";
		// final String userId = "u1";

		List<PolicyThresholdPojo> policyMetricPojos = m_srv.getPolicyThresholdByPolicyIdMetricId(policyId, metricId);
		if (null == policyMetricPojos) {
			return;
		}
		for (PolicyThresholdPojo policyMetricPojo : policyMetricPojos) {
			policyMetricPojo.setExpDesc1("000test modify  metric");
		}
		// for (int i = 0; i < 1; i++) {
		// PolicyMetricPojo pojo = new PolicyMetricPojo();
		// pojo.setPolicyId(policyId);
		// pojo.setMetricId("NICTotalSendReceivePacketCount");
		// pojo.setInUse((byte) -1);
		// pojo.setCount(10);
		// pojo.setFrequencyId("5m");
		// policyMetricPojos.add(pojo);
		// }
		if (policyMetricPojos != null && policyMetricPojos.size() > 0) {
			m_srv.modifyPolicyThreshold(policyId, "admin", metricId, policyMetricPojos);
		}

	}

	@Test
	public void getRecommendThreshold() throws ServiceException {

		String policyId = "RIIL_RMP_RES_SWITCH_RUIJIE_SNMP_DEFAULT";
		String metricId = "InBroadcastRate";
		// metricId = "MEMRate";
		String modelId = "RIIL_RMM_SWITCH_RUIJIE_SNMP";
		double red = m_srv.getRecommendThreshold(policyId, modelId, metricId, Status4Metric.RED, null, null);

		double yellow = m_srv.getRecommendThreshold(policyId, modelId, metricId, Status4Metric.YELLOW, "01:56:05",
				"23:56:05");
		if (S_LOGGER.isDebugEnabled()) {

			S_LOGGER.debug("推荐阈值YELLOW：" + yellow);

			S_LOGGER.debug("推荐阈值RED：" + red);
		}
	}

	// @Test
	public void removePolicyByPolicyIds() throws ServiceException {
		List<String> policyIds = new ArrayList<String>();
		m_srv.removePolicyByPolicyIds(policyIds);
	}

	@Test
	public void testAction() throws ServiceException {
		for (int i = 1; i <= 10; i++) {
			PolicyActionPojo actionPojo = new PolicyActionPojo();
			actionPojo.setPolicyId("p1");
			actionPojo.setActionName("a" + i);
			m_srv.createAction("u1", actionPojo);
		}
		String userId = "u1";
		String policyId = "p1";
		String inUse = "-1";

		m_srv.getActionByPolicyId(policyId);
		m_srv.getActionByID("1");
		List<String> actionNames = new ArrayList<String>();
		actionNames.add("a1");
		actionNames.add("a2");

		m_srv.setActiondDefineState(userId, policyId, inUse, actionNames);

		m_srv.removeActionds(userId, policyId, actionNames);

	}

	@Test
	public void isExisActionName() throws ServiceException {
		String actionId = "a001";
		String policyId = "RIIL_RMP_RES_SWITCH_RUIJIE_SNMP_DEFAULT";
		String actionName = "action";
		m_srv.isExisActionName(policyId, actionId, actionName);
		actionId = "a001-1";
		policyId = "RIIL_RMP_RES_SWITCH_RUIJIE_SNMP_DEFAULT";
		actionName = "action";
		m_srv.isExisActionName(policyId, actionId, actionName);
	}

	// @Test
	public void getDefaultPolicyByModelId() throws ServiceException {

		String modelId = "RIIL_RMM_HOST_SOLARIS_SSH";
		m_srv.getDefaultPolicyByModelId(modelId);
	}

	// @Test
	public void getAllSubPolicyBaseInfo() throws ServiceException {
		m_srv.getAllSubPolicyBaseInfo("RIIL_RMP_RES_SWITCH_CISCO_SNMP_DEFAULT");
	}

	public void addListener() throws ContainerException {
		IResChangeService t_changeService = ServiceContainer.getInstance().getServiceComponent(
				IResChangeService.S_SERVICE_ID);
		for (int i = 0; i < 10; i++) {
			t_changeService.addListener(new ResChangeListenerDef(i + ""));
		}
	}

	@Test
	public void policyPublish() throws ServiceException, ContainerException {
		addListener();
		List<String> policyIds = new ArrayList<String>();
		policyIds.add("p1");
		policyIds.add("c147a3a5-5ae6-b034-4826-8c3fbd8491d5");
		// policyIds.add("RIIL_RMP_RES_ROUTER_RUIJIE_SNMP_DEFAULT");
		String userId = "admin";
		m_srv.policyPublish(userId, policyIds);
		m_srv.policyStop(policyIds);
	}

	@Test
	public void getPolicyByPolicyId() throws ServiceException {
		// String policyId = "RIIL_RMP_RES_CHILD_NIC_FIREWALL_SINFORS_SNMP_DEFAULT";
		String policyId = "RIIL_RMP_RES_CHILD_NIC_SWITCH_RUIJIE_SNMP_1000M";
		PolicyResPojo t_policy = (PolicyResPojo) m_srv.getPolicyByPolicyId(policyId);
		if (null != t_policy) {
			t_policy.getListPolicyMetricPojo();
		}
		assertNotNull(t_policy);
	}

	@Test
	public void getSubInstInMonitorMetricBySubInstId() throws ServiceException {
		m_srv.getSubInstInMonitorMetricBySubInstId("i");
		m_srv.getSubInstInMonitorMetric("", "");
		m_srv.getMainInstInMonitorMetric("");
		m_srv.getMainInstInMonitorMetric("", MetricType.PERF);
		m_srv.getMainInstInMonitorMetricIds("");

	}

	@Test
	public void getMetricType4Inuse() throws ServiceException {
		String policyId = "RIIL_RMP_RES_CHILD_NIC_FIREWALL_SINFORS_SNMP_DEFAULT";
		m_srv.getMetricType4Inuse(policyId);
	}

	@Test
	public void getPolicyByModelId() throws ServiceException {
		String modelId = "RIIL_RMM_FIREWALL_H3C_SNMP";
		PolicyPojo t_policy = m_srv.getPolicyByModelId(modelId, true);

		assertNotNull(t_policy);
		assertNotNull(((PolicyResPojo) t_policy).getResAvailRuleGroup());
	}
	
	@Test
	public void capyPolicyTest() throws ServiceException{
		String policyId = "26d7f89b-45b5-5fea-3892-679496fc8926";
		
		List<PolicyPojo> t_savePolicys = new ArrayList<PolicyPojo>();
		PolicyPojo t_resPolicy = m_srv.getPolicyByPolicyId(policyId);
        if (t_resPolicy != null) {
            t_resPolicy.setName("");
            t_resPolicy.setDesc("");
            t_resPolicy.setUserDomainId("domain-root");
            t_resPolicy.setId(null);
            t_resPolicy.setIsDefault(Constants.FALSE);
            t_resPolicy.setIsFactory(Constants.FALSE);
            t_resPolicy.setInUse(Constants.FALSE);
            t_resPolicy.setOriginalPolicyId(null);
            t_resPolicy.setMainPolicyId("");
            t_resPolicy.setListPolicyResRelPojo(null);
            t_savePolicys.add(t_resPolicy);
            List<String> t_subPolicyIds = m_srv.getAllNewVersionSubPolicyIds(t_resPolicy.getId());
            if (CollectionUtils.isNotEmpty(t_subPolicyIds)) {
                for (String t_subPolicyId : t_subPolicyIds) {
                    PolicyPojo t_subPolicy = m_srv.getPolicyByPolicyId(t_subPolicyId);
                    t_subPolicy.setUserDomainId(t_resPolicy.getUserDomainId());
                    t_subPolicy.setId(null);
                    t_subPolicy.setIsDefault(Constants.FALSE);
                    t_subPolicy.setIsFactory(Constants.FALSE);
                    t_subPolicy.setInUse(Constants.FALSE);
                    t_subPolicy.setOriginalPolicyId(null);
                    t_subPolicy.setMainPolicyId("");
                    t_subPolicy.setListPolicyResRelPojo(null);
                    t_savePolicys.add(t_subPolicy);
                }
            }
        }
	}
	
	@Test
	public void getPolicyBaseInfoByPolicyTypeTest() throws ServiceException{
		List<String> domainIds = new ArrayList<String>();
		domainIds.add("domain-root");
		
		List<PolicyPojo> policys = m_srv.getPolicyBaseInfoByPolicyType(PolicyType.RES.getId(), domainIds);
		assertTrue(policys.size() > 0);
	}
	
	@Test
	public final void test_getPolicyByModelId() throws ServiceException {
		String modelId = "RIIL_RMM_HOST_LINUX_SNMP";
		PolicyPojo t_policy = m_srv.getPolicyByModelId(modelId, true);
		assertNotNull(t_policy);
		
		t_policy = m_srv.getPolicyByModelId(modelId, false);
		assertNotNull(t_policy);
	}
	
	@Test
	public void tests() throws ServiceException{
		String policyId = "RIIL_RMP_RES_HOST_WINDOWS_SNMP_DEFAULT";
		PolicyPojo policyBaseInfo = m_srv.getPolicyBaseInfo(policyId);
		ResTypePojo resType = m_resType.getResTypeByID(policyBaseInfo.getResTypeId());
		assertNotNull(resType);
	}
}
