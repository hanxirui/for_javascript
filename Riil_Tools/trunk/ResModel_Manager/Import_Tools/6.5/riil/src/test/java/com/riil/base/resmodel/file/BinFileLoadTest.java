package com.riil.base.resmodel.file;

import static com.riil.base.resmodel.tools.ResModelServiceLoader.getModelService;
import static com.riil.base.resmodel.tools.ResModelServiceLoader.getResTypeService;

import java.util.List;

import org.apache.log4j.Level;
import org.apache.log4j.Logger;
import org.junit.Test;
import org.springframework.test.context.ContextConfiguration;

import com.riil.base.policy.IPolicyService;
import com.riil.base.policy.impl.PolicyService;
import com.riil.base.resmodel.IDictService;
import com.riil.base.resmodel.IModelService;
import com.riil.base.resmodel.IResTypeService;
import com.riil.base.resmodel.impl.file.BinFileUtils;
import com.riil.base.resmodel.pojo.base.ResTypePojo;
import com.riil.base.resmodel.pojo.mmodel.Model;
import com.riil.base.resmodel.pojo.mmodel.ModelMetricBindingPojo;
import com.riil.base.resmodel.pojo.policy.PolicyPojo;
import com.riil.core.commons.ServerModule;
import com.riil.core.container.ContainerException;
import com.riil.core.container.ServiceContainer;
import com.riil.core.logger.SystemLogger;
import com.riil.core.service.ServiceException;
import com.riil.core.test.BaseTest;
import com.riil.core.utils.ServerEnvUtil;

@ContextConfiguration(locations = { "classpath*:META-INF/PortalServer/riil_service*.xml" })
public class BinFileLoadTest extends BaseTest {

	private static Logger S_LOGGER = SystemLogger.getSystemLogger(BinFileLoadTest.class, ServerModule.ResourceModel);

	IResTypeService t_resTypeService = null;
	IModelService t_modelService = null;
	IDictService t_dictSrv = null;
	

	@Test
	public void testLoad() throws ServiceException, ContainerException {
		//
		if (S_LOGGER.isDebugEnabled()) {
			S_LOGGER.debug(System.getProperty("user.dir"));

			S_LOGGER.debug("ServerEnvUtil.RIIL_SYSTEM_FOLDER\n" + ServerEnvUtil.RIIL_SYSTEM_FOLDER);

			S_LOGGER.debug("ServerEnvUtil.RIIL_CUSTOM_FOLDER\n" + ServerEnvUtil.RIIL_CUSTOM_FOLDER);

			S_LOGGER.debug("ROOT--PATH	" + BinFileUtils.RIIL_MODEL_ROOT_FOLDER);

			S_LOGGER.debug("RIIL_SYSTEM_MODEL_FOLDER	" + BinFileUtils.RIIL_SYSTEM_MODEL_FOLDER);
		}
		SystemLogger.changeLogLevel(Level.INFO);

		PolicyService t_policySrv = ServiceContainer.getInstance().getServiceComponent(IPolicyService.S_SERVICE_ID);
		t_policySrv.init();
		/*
		 * if (ServerType.PortalServer.getId().equalsIgnoreCase(s_server_type))
		 * { t_policySrv.init(); }
		 */
		List<PolicyPojo> allPolicyPojo = t_policySrv.getAllFactoryPolicy();
		List<PolicyPojo> winlogs=null; // = t_policySrv.getAllPolicyPojo4PublishByPolicyType(PolicyLogType.WINDOWS.getId());
		List<PolicyPojo> ress=null; // = t_policySrv.getAllPolicyPojo4PublishByPolicyType("RES");

		int policysize = -1;
		int policyScriptSize = -1;
		int policyLogSize = -1;
		int policyResSize = -1;

		if (allPolicyPojo != null) {
			policysize = allPolicyPojo.size();
		}
		if (winlogs != null) {
			policyLogSize = winlogs.size();
		}
		if (ress != null) {
			policyResSize = ress.size();
		}
		List<PolicyPojo> allPolicyScriptPojo=null;// = t_policySrv.getAllPolicyPojo4PublishByPolicyType("SCRIPT");
		if (allPolicyScriptPojo != null) {
			policyScriptSize = allPolicyScriptPojo.size();
		}
		int tempsize = getResTypeService().getAllResType().size();
		int modelsize = getModelService().getAllModel().size();

		getModelService().getModel("RIIL_RMM_Host_Windows_Snmp");
		getModelService().getModel("RIIL_RMM_SWITCH_ALCATEL_SNMP");

		S_LOGGER.error("test load " + modelsize + " model");
		S_LOGGER.error("test load " + tempsize + " temp");
		S_LOGGER.error("test load " + policysize + " policy");
		S_LOGGER.error("test load " + policyLogSize + " policyLogWin");
		S_LOGGER.error("test load " + policyResSize + " policyRes");
		S_LOGGER.error("test load " + policyScriptSize + " policyScript");

		String modelId = "RIIL_RMM_Host_Windows_Snmp";
		String metricId = "SystemOID";
		Model modelPojoByID = getModelService().getModel(modelId);
		if (modelPojoByID == null) {
			return;
		}
		t_policySrv.getPolicyByModelId("RIIL_RMM_BUSINESSSERVICE", true);
		ModelMetricBindingPojo t_metricBinding = modelPojoByID.gainModelMetricBindingPojo(metricId);
		if (null == t_metricBinding) {
			if (S_LOGGER.isDebugEnabled()) {
				S_LOGGER.debug("模板" + modelId + "中，没有指标" + metricId);
			}
		}

		ResTypePojo pojo = getResTypeService().getResTypeByID("RIIL_RMT_Host_Windows");
		// pojo= TempService.getInstance().getTempPojoByID("RIIL_RMT_CPU");

		if (pojo == null)
			return;
//		pojo.get
//		List<TempMetricPojo> t_mlist = pojo.gainListTempMetricPojo();
//		if (t_mlist == null)
//			return;
//		for (TempMetricPojo mp : t_mlist) {
//			String id = mp.getId();
//			id = mp.getMetricId();
//			TempMetricPojo p = pojo.gainTempMetricPojo(id);
//			p.getDesc();
//		}

	}
}
