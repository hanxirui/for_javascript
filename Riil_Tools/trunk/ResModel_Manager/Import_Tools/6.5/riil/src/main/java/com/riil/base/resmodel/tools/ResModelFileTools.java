package com.riil.base.resmodel.tools;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.riil.base.policy.IPolicyService;
import com.riil.base.policy.impl.PolicyService;
import com.riil.base.resmodel.IEventBaseService;
import com.riil.base.resmodel.IMetricBaseService;
import com.riil.base.resmodel.IMetricGroupService;
import com.riil.base.resmodel.IModelService;
import com.riil.base.resmodel.IResTypeService;
import com.riil.base.resmodel.impl.ModelService;
import com.riil.base.resmodel.impl.ResTypeService;
import com.riil.base.resmodel.impl.db.EventBaseService;
import com.riil.base.resmodel.impl.db.MetricBaseService;
import com.riil.base.resmodel.impl.db.MetricGroupService;
import com.riil.base.resmodel.impl.file.BinFileUtils;
import com.riil.base.resmodel.pojo.base.EventBasePojo;
import com.riil.base.resmodel.pojo.base.MetricBasePojo;
import com.riil.base.resmodel.pojo.base.MetricGroupPojo;
import com.riil.base.resmodel.pojo.base.ModelBasePojo;
import com.riil.base.resmodel.pojo.base.ResTypePojo;
import com.riil.base.resmodel.pojo.policy.PolicyPojo;
import com.riil.base.utils.GenBinFile;
import com.riil.core.container.ServiceContainer;

public class ResModelFileTools {
	
	GenBinFile genBin = new GenBinFile();
	
	public static void main(String[] args) {
		ResModelFileTools tools = new ResModelFileTools();
		BinFileUtils.init();
		tools.genAllBinFiles();
	}
	
	/**
	 * 生成全部Bin文件
	 */
	public void genAllBinFiles() {
		try {
			MetricBaseService metricSrv = (MetricBaseService)ServiceContainer.getInstance().getServiceComponent(IMetricBaseService.S_SERVICE_ID);
			ArrayList<MetricBasePojo> allMetricBase = new ArrayList<MetricBasePojo>(metricSrv.getMetricBaseDao().doSelectAll());
			genBin.genBinFile(allMetricBase, new File (BinFileUtils.RIIL_SYSTEM_METRIC_FOLDER + File.separator + BinFileUtils.S_PREFIX_METRIC+"01"));
			
			MetricGroupService metricGroupSrv = (MetricGroupService)ServiceContainer.getInstance().getServiceComponent(IMetricGroupService.S_SERVICE_ID);
			ArrayList<MetricGroupPojo> allMetricGroup = new ArrayList<MetricGroupPojo>(metricGroupSrv.getMetricGroupDao().doSelectAll());
			ArrayList<Map<String, String>> allGroupMetricRel = new ArrayList<Map<String, String>>(metricGroupSrv.getMetricGroupDao().doSelectAllGroupMetricRel());
			genBin.genBinFile(allMetricGroup, new File(BinFileUtils.RIIL_SYSTEM_METRIC_FOLDER + File.separator + BinFileUtils.S_PREFIX_METRIC_GROUP+"01"));
			genBin.genBinFile(allGroupMetricRel, new File(BinFileUtils.RIIL_SYSTEM_METRIC_FOLDER + File.separator + BinFileUtils.S_PREFIX_GROUP_METRIC_REL+"01"));
			
			EventBaseService eventSrv = (EventBaseService)ServiceContainer.getInstance().getServiceComponent(IEventBaseService.S_SERVICE_ID);
			ArrayList<EventBasePojo> allEvent = new ArrayList<EventBasePojo>(eventSrv.getEventBaseDao().doSelectAll());
			genBin.genBinFile(allEvent, new File (BinFileUtils.RIIL_SYSTEM_EVENT_FOLDER + File.separator + BinFileUtils.S_PREFIX_EVENT+"01"));
			
			ResTypeService resTypeSrv = (ResTypeService) ServiceContainer.getInstance().getServiceComponent(IResTypeService.S_SERVICE_ID);
			ArrayList<ResTypePojo> allResType = new ArrayList<ResTypePojo>(resTypeSrv.getResTypeDao().doSelectAll());
			for(ResTypePojo pojo : allResType) {
				genBin.genBinFile(pojo, new File (BinFileUtils.RIIL_SYSTEM_RES_TYPE_FOLDER + File.separator + pojo.getId()));
			}
			
			ModelService modelSrv = (ModelService) ServiceContainer.getInstance().getServiceComponent(IModelService.S_SERVICE_ID);
			List<ModelBasePojo> modelIdAll = modelSrv.getModelBaseDao().doSelectAll();
			for(ModelBasePojo modelBase : modelIdAll) {
				genBin.genBinFile(modelSrv.getFromDB(modelBase.getId()), new File (BinFileUtils.RIIL_SYSTEM_MODEL_FOLDER + File.separator + modelBase.getId()));
			}
			
			PolicyService policySrv = (PolicyService) ServiceContainer.getInstance().getServiceComponent(IPolicyService.S_SERVICE_ID);
			List<PolicyPojo> policyIdAll = policySrv.getBaseInfoDAO().doSelectAll();
			for(PolicyPojo policy : policyIdAll) {
				genBin.genBinFile(policySrv.getPolicyByPolicyId(policy.getId()), new File (BinFileUtils.RIIL_SYSTEM_POLICY_FOLDER + File.separator + policy.getId()));
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
}
