package com.riil.resmodel.services.impl;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;

import com.riil.base.binding.pojo.CmdFilter;
import com.riil.base.binding.pojo.CmdPropertie;
import com.riil.base.binding.pojo.CmdSupportPojo;
import com.riil.base.binding.pojo.CollectCmdPojo;
import com.riil.base.binding.pojo.CollectCmdsConnProtocol;
import com.riil.base.binding.pojo.CollectCmdsPojo;
import com.riil.base.binding.pojo.CollectCmdsProcessPara;
import com.riil.base.binding.pojo.CollectCmdsProcessor;
import com.riil.base.binding.pojo.MetricBindingPojo;
import com.riil.base.binding.pojo.MetricProcessPara;
import com.riil.base.pojo.dict.DictCollFrequencyPojo;
import com.riil.base.pojo.dict.DictPojo;
import com.riil.base.resmodel.pojo.base.MetricBasePojo;
import com.riil.base.resmodel.pojo.base.MetricGroupPojo;
import com.riil.base.resmodel.pojo.base.ModelBasePojo;
import com.riil.base.resmodel.pojo.base.ModelMetricRelPojo;
import com.riil.base.resmodel.pojo.base.ResTypePojo;
import com.riil.base.resmodel.pojo.base.VendorPojo;
import com.riil.base.resmodel.pojo.mmodel.CollectCmd;
import com.riil.base.resmodel.pojo.mmodel.CollectCmds;
import com.riil.base.resmodel.pojo.mmodel.Filter;
import com.riil.base.resmodel.pojo.mmodel.ModelMetricBindingPojo;
import com.riil.base.resmodel.pojo.mmodel.ModelPojo;
import com.riil.base.resmodel.pojo.mmodel.Processor;
import com.riil.base.resmodel.pojo.mmodel.Support;
import com.riil.base.resmodel.pojo.policy.PolicyActionPojo;
import com.riil.base.resmodel.pojo.policy.PolicyEventPojo;
import com.riil.base.resmodel.pojo.policy.PolicyMetricPojo;
import com.riil.base.resmodel.pojo.policy.PolicyResPojo;
import com.riil.base.resmodel.pojo.policy.PolicyResRelPojo;
import com.riil.base.resmodel.pojo.policy.PolicyThresholdPojo;
import com.riil.base.resmodel.pojo.policy.ResAvailRuleGroup;
import com.riil.base.resmodel.pojo.vendor.ModelSysoidPojo;
import com.riil.base.resmodel.pojo.vendor.VendorModelPojo;
import com.riil.base.utils.ResModelPojoUtils;
import com.riil.resmodel.dao.impl.DictDao;
import com.riil.resmodel.dao.impl.MetricBaseDao;
import com.riil.resmodel.dao.impl.PolicyDao;
import com.riil.resmodel.dao.impl.ResModelDao;
import com.riil.resmodel.dao.impl.ResTypeDao;
import com.riil.resmodel.services.IResModelService;

public class ResModelService implements IResModelService{
	
	private ResModelDao resModelDao;
	private ResTypeDao resTypeDao;
	private PolicyDao policyResDao;
	private MetricBaseDao metricBaseDao;
	private DictDao dictDao;
	

	public DictDao getDictDao() {
		return dictDao;
	}

	public void setDictDao(DictDao dictDao) {
		this.dictDao = dictDao;
	}

	public MetricBaseDao getMetricBaseDao() {
		return metricBaseDao;
	}

	public void setMetricBaseDao(MetricBaseDao metricBaseDao) {
		this.metricBaseDao = metricBaseDao;
	}

	public PolicyDao getPolicyResDao() {
		return policyResDao;
	}

	public void setPolicyResDao(PolicyDao policyResDao) {
		this.policyResDao = policyResDao;
	}

	public ResTypeDao getResTypeDao() {
		return resTypeDao;
	}

	public void setResTypeDao(ResTypeDao resTypeDao) {
		this.resTypeDao = resTypeDao;
	}

	public ResModelDao getResModelDao() {
		return resModelDao;
	}

	public void setResModelDao(ResModelDao resModelDao) {
		this.resModelDao = resModelDao;
	}

	
	public List<ModelPojo> getModelList() throws SQLException {
		Map<String, List<ModelMetricRelPojo>> t_doSelectMetricRelAll = resModelDao.doSelectMetricRelAll();
		Map<String, List<MetricBindingPojo>> t_doSelectMetricBindingAll = resModelDao.doSelectMetricBindingAll();
		Map<String, List<MetricProcessPara>> t_doSelectMetricProcessParaAll = resModelDao.doSelectMetricProcessParaAll();
		Map<String, List<CollectCmdsPojo>> t_doSelectCollectCmdsAll = resModelDao.doSelectCollectCmdsAll();
		Map<String, List<CollectCmdsConnProtocol>> t_doSelectConnProtocolAll = resModelDao.doSelectConnProtocolAll();
		Map<String, CollectCmdsProcessor> t_doSelectCmdsProcessorAll = resModelDao.doSelectCmdsProcessorAll();
		Map<String, List<CollectCmdsProcessPara>> t_doSelectProcessorParaAll = resModelDao.doSelectProcessorParaAll();
		Map<String, List<CmdSupportPojo>> t_doSelectSupportAll = resModelDao.doSelectSupportAll();
		Map<String, List<CollectCmdPojo>> t_doSelectCollectCmdAll = resModelDao.doSelectCollectCmdAll();
		Map<String, List<CmdFilter>> t_doSelectCmdFilterAll = resModelDao.doSelectCmdFilterAll();
		Map<String, List<CmdPropertie>> t_doSelectCmdPropertieAll = resModelDao.doSelectCmdPropertieAll();
		List<ModelBasePojo> t_modelBaseAll = resModelDao.doModelBaseSelectAll();
		List<ModelPojo> t_modelAll = new ArrayList<ModelPojo>();
		for (ModelBasePojo t_modelBase : t_modelBaseAll) {
			ModelPojo t_modelPojo = ResModelPojoUtils.parse(t_modelBase, ModelPojo.class);
			//ModelBasePojo 中的TAG4存成了模型Processor字段
			t_modelPojo.setProcessor(t_modelBase.getTag4());
			String t_modelId = t_modelPojo.getId();
			List<ModelMetricBindingPojo> t_modelMetricBindingList = new ArrayList<ModelMetricBindingPojo>();
			List<ModelMetricRelPojo> t_metricRelList = t_doSelectMetricRelAll.get(t_modelId);
			if(t_metricRelList!=null)
			for (ModelMetricRelPojo t_metricRel : t_metricRelList) {
				//set collectCmdsGroup
				List<MetricBindingPojo> t_metricBindings = t_doSelectMetricBindingAll.get(t_modelId+"_"+t_metricRel.getMetricId());
				for (MetricBindingPojo t_metricBinding : t_metricBindings) {
					ModelMetricBindingPojo t_modelMetricBinding = covertModelMetricBindingPojo(t_metricBinding,t_modelId);
					String t_bindId = t_metricBinding.getId();
					//set processParam
					List<String> t_params = new ArrayList<String>();
					List<MetricProcessPara> t_list = t_doSelectMetricProcessParaAll.get(t_bindId);
					if(null != t_list){
						for (MetricProcessPara t_processPara : t_list) {
							t_params.add(t_processPara.getParameter());
						}
					}
					t_modelMetricBinding.setParameter(t_params);
//					t_modelMetricBindingList.add(t_modelMetricBinding);
					//set collectcmds
 					List<CollectCmdsPojo> t_collectCmdsPojoList = t_doSelectCollectCmdsAll.get(t_bindId);
					List<CollectCmds> t_collectCmdsList = new ArrayList<CollectCmds>();
					if(t_collectCmdsPojoList!=null)
					for (CollectCmdsPojo t_collectCmdsPojo : t_collectCmdsPojoList) {
						String t_cmdsId = t_collectCmdsPojo.getId();
						CollectCmds t_collectCmds = new CollectCmds();
						t_collectCmds.setId(t_collectCmdsPojo.getId());
						t_collectCmds.setIsDefault(t_collectCmdsPojo.getIsDefault());
						t_collectCmds.setIsDynamic(t_collectCmdsPojo.getIsDynamic());
						//set connectionProtocols
						List<String> t_protocol = new ArrayList<String>();
						List<CollectCmdsConnProtocol> t_protocolList = t_doSelectConnProtocolAll.get(t_cmdsId);
						if(t_protocolList!=null)
						for (CollectCmdsConnProtocol t_protocolPojo : t_protocolList) {
							t_protocol.add(t_protocolPojo.getProtocol());
						}
						t_collectCmds.setConnectionProtocols(t_protocol);
						//set collectCmds processor
						Processor t_cmdsProcessor = new Processor();
						CollectCmdsProcessor t_collectCmdsProcessor = t_doSelectCmdsProcessorAll.get(t_cmdsId);
						if(t_collectCmdsProcessor!=null && StringUtils.isNotEmpty(t_collectCmdsProcessor.getId())){
							t_cmdsProcessor.setClassName(t_collectCmdsProcessor.getClassName());
							t_cmdsProcessor.setMethod(t_collectCmdsProcessor.getMethod());
							t_cmdsProcessor.setId(t_collectCmdsProcessor.getId());
							t_collectCmds.setProcessor(t_cmdsProcessor);
							//set collectCmds processorParam
							List<String> t_processParam = new ArrayList<String>();
							List<CollectCmdsProcessPara> t_cmdsProcessParaList = t_doSelectProcessorParaAll.get(t_collectCmdsProcessor.getId());
							if(t_cmdsProcessParaList!=null)
							for (CollectCmdsProcessPara t_cmdsProcessPara : t_cmdsProcessParaList) {
								t_processParam.add(t_cmdsProcessPara.getParameter());
							}
							t_collectCmds.setParameter(t_processParam);
						}
						//set collectCmds support
						List<CmdSupportPojo> t_cmdsSupportList = t_doSelectSupportAll.get(t_cmdsId);
						List<Support> t_supportList = new ArrayList<Support>();
						if(t_cmdsSupportList!=null)
						for (CmdSupportPojo t_cmdsSupport : t_cmdsSupportList) {
							Support t_support = new Support();
							t_support.setId(t_cmdsSupport.getId());
							t_support.setVersion(t_cmdsSupport.getVersion());
							t_support.setRel(t_cmdsSupport.getRel());
							t_supportList.add(t_support);
						}
						t_collectCmds.setSupports(t_supportList);
						 
						//set collectcmd
						List<CollectCmdPojo> t_collectCmdPojoList = t_doSelectCollectCmdAll.get(t_cmdsId);
						List<CollectCmd> t_collectCmdList = new ArrayList<CollectCmd>();
						if(t_collectCmdPojoList!=null)
						for (CollectCmdPojo t_collectCmdPojo : t_collectCmdPojoList) {
							CollectCmd t_collectCmd = new CollectCmd();
							t_collectCmd.setCmd(t_collectCmdPojo.getCmd());
							t_collectCmd.setIndex(t_collectCmdPojo.getIndex());
							t_collectCmd.setProtocol(t_collectCmdPojo.getProtocol());
							t_collectCmd.setId(t_collectCmdPojo.getId());
							//set filter
							List<CmdFilter> t_cmdFilterList = t_doSelectCmdFilterAll.get(t_collectCmdPojo.getId());
							List<Filter> t_filterList = new ArrayList<Filter>();
							if(t_cmdFilterList!=null)
							for (CmdFilter t_cmdFilter : t_cmdFilterList) {
								Filter t_filter = new Filter();
								t_filter.setCmdParameterName(t_cmdFilter.getCmdParameterName());
								t_filter.setColumn(t_cmdFilter.getColumn());
								t_filter.setDependecy(t_cmdFilter.getDependecy());
								t_filter.setRow(t_cmdFilter.getRow());
								t_filter.setId(t_cmdFilter.getId());
								t_filterList.add(t_filter);
							}
							t_collectCmd.setFilters(t_filterList);
							//set properties
							List<CmdPropertie> t_cmdPropertieList = t_doSelectCmdPropertieAll.get(t_collectCmdPojo.getId());
							LinkedHashMap<String,String> t_map = new LinkedHashMap<String,String>();
							if(t_cmdPropertieList!=null)
							for (CmdPropertie t_cmdPropertie : t_cmdPropertieList) {
								t_map.put(t_cmdPropertie.getName(), t_cmdPropertie.getValue());
							}
							t_collectCmd.setProperties(t_map);
							t_collectCmdList.add(t_collectCmd);
						}
						t_collectCmds.setCollectCmds(t_collectCmdList);
						t_collectCmdsList.add(t_collectCmds);
					}
					t_modelMetricBinding.setCollectCmdsGroup(t_collectCmdsList);
					t_modelMetricBindingList.add(t_modelMetricBinding);
				}
			}
			t_modelPojo.setListModelMetricBindingPojo(t_modelMetricBindingList);
			t_modelAll.add(t_modelPojo);
		}
		return t_modelAll;
	}
	
	private ModelMetricBindingPojo covertModelMetricBindingPojo(MetricBindingPojo metricBinding,String modelId){
		ModelMetricBindingPojo t_modelMetricBinding = new ModelMetricBindingPojo();
		t_modelMetricBinding.setId(metricBinding.getMetricId());
		t_modelMetricBinding.setModelId(modelId);
		t_modelMetricBinding.setIsDisplayName(metricBinding.getIsDisplayName());
		t_modelMetricBinding.setIsInitValue(metricBinding.getIsInitValue());
		t_modelMetricBinding.setIsInstance(metricBinding.getIsInstance());
		Processor t_processor = new Processor();
		t_processor.setClassName(metricBinding.getClassName());
		t_processor.setMethod(metricBinding.getMethod());
		t_modelMetricBinding.setProcessor(t_processor);
		return t_modelMetricBinding;
	}
	
	@Override
	public List<PolicyResPojo> getPolicyList() throws SQLException {
		Map<String, List<PolicyActionPojo>> t_doSelectActionAll = policyResDao.doSelectActionAll();
		Map<String, ResAvailRuleGroup> t_doSelectAvailRuleGroupAll = policyResDao.doSelectAvailRuleGroupAll();
		Map<String, List<PolicyEventPojo>> t_doSelectEventAll = policyResDao.doSelectEventAll();
		Map<String, List<PolicyMetricPojo>> t_doSelectMetricAll = policyResDao.doSelectMetricAll();
		Map<String, List<PolicyResRelPojo>> t_doSelectResRelAll = policyResDao.doSelectResRelAll();
		Map<String, List<PolicyThresholdPojo>> t_doSelectThresholdAll = policyResDao.doSelectThresholdAll();
		List<PolicyResPojo> t_doSelectAll = policyResDao.doSelectAll();
		for (PolicyResPojo t_policyRes : t_doSelectAll) {
			String t_policyId = t_policyRes.getId();
			//set event
			List<PolicyEventPojo> t_policyEventPojos = t_doSelectEventAll.get(t_policyId);
			if(t_policyEventPojos!=null)
			t_policyRes.setListPolicyEventPojo(t_policyEventPojos);
			//set metric
			List<PolicyMetricPojo> t_policyMetricPojos = t_doSelectMetricAll.get(t_policyId);
			if(t_policyMetricPojos!=null){
				for (PolicyMetricPojo t_policyMetricPojo : t_policyMetricPojos) {
					String t_metricId = t_policyMetricPojo.getMetricId();
					List<PolicyThresholdPojo> t_policyThresholdPojos = t_doSelectThresholdAll.get(t_policyId+"_"+t_metricId);
					if(t_policyThresholdPojos!=null)
					t_policyMetricPojo.setListPolicyThresholdPojo(t_policyThresholdPojos);
				}
				t_policyRes.setListPolicyMetricPojo(t_policyMetricPojos);
			}
			//set resRel
			List<PolicyResRelPojo> t_policyResRelPojos = t_doSelectResRelAll.get(t_policyId);
			if(t_policyResRelPojos!=null)
			t_policyRes.setListPolicyResRelPojo(t_policyResRelPojos);
			//set action
			List<PolicyActionPojo> t_policyActionPojos = t_doSelectActionAll.get(t_policyId);
			if(t_policyActionPojos!=null)
			t_policyRes.setListPolicyActionPojo(t_policyActionPojos);
			//set availRuleGroup
			ResAvailRuleGroup t_availRuleGroup = t_doSelectAvailRuleGroupAll.get(t_policyId);
			if(t_availRuleGroup!=null)
			t_policyRes.setResAvailRuleGroup(t_availRuleGroup);
		}
		return t_doSelectAll;
	}
	
	public List<ResTypePojo> getResTypeList() throws SQLException {
		List<ResTypePojo> t_doResTypeSelectAll = resTypeDao.doResTypeSelectAll();
		return t_doResTypeSelectAll;
	}
	
	@Override
	public List<MetricBasePojo> getMetricBaseList() throws SQLException {
		List<MetricBasePojo> t_metricBaseAll = metricBaseDao.doMetricBaseSelectAll();
		return t_metricBaseAll;
	}

	@Override
	public DictPojo getDict() throws SQLException {
		DictPojo t_dict = new DictPojo();
		List<DictCollFrequencyPojo> t_collFrequencyAll = dictDao.getCollFrequencyAll();
		t_dict.setListDictCollFrequencyPojo(t_collFrequencyAll);
		/*List<ModelSysoidPojo> t_modelSysoidAll = dictDao.getModelSysoidAll();
		t_dict.setListModelSysoidPojo(t_modelSysoidAll);*/
		List<VendorPojo> t_vendorAll = dictDao.getVendorAll();
		t_dict.setListVendor(t_vendorAll);
		List<VendorModelPojo> t_vendorModelAll = dictDao.getVendorModelAll();
		t_dict.setListVendorModelPojo(t_vendorModelAll);
		List<MetricGroupPojo> t_metricGroupAll = dictDao.getMetricGroupAll();
		t_dict.setListMetricGroup(t_metricGroupAll);
		List<Map<String, String>> t_metricGroupRelAll = dictDao.getMetricGroupRelAll();
		t_dict.setListGroupMetricRel(t_metricGroupRelAll);
		List<MetricBasePojo> t_doMetricBaseSelectAll = metricBaseDao.doMetricBaseSelectAll();
		t_dict.setListMetricBase(t_doMetricBaseSelectAll);
		return t_dict;
	}
}
