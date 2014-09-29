package com.riil.base.resmodel.tools;

import static com.riil.base.resmodel.tools.ResModelServiceLoader.getDictService;
import static com.riil.base.resmodel.tools.ResModelServiceLoader.getModelService;
import static com.riil.base.resmodel.tools.ResModelServiceLoader.getResTypeService;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.BeanUtils;

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
import com.riil.base.pojo.enums.EnumRoot.PolicyType;
import com.riil.base.policy.IPolicyService;
import com.riil.base.policy.IResourcePolicyService;
import com.riil.base.policy.IScriptPolicyService;
import com.riil.base.resmodel.IDictService;
import com.riil.base.resmodel.IEventBaseService;
import com.riil.base.resmodel.IMetricBaseService;
import com.riil.base.resmodel.IMetricGroupService;
import com.riil.base.resmodel.IModelMetricRelService;
import com.riil.base.resmodel.IModelService;
import com.riil.base.resmodel.IResTypeService;
import com.riil.base.resmodel.impl.DBServiceProxy;
import com.riil.base.resmodel.impl.db.EventBaseService;
import com.riil.base.resmodel.impl.db.MetricBaseService;
import com.riil.base.resmodel.impl.db.MetricGroupService;
import com.riil.base.resmodel.impl.db.ModelMetricRelService;
import com.riil.base.resmodel.impl.file.BinFileUtils;
import com.riil.base.resmodel.pojo.base.EventBasePojo;
import com.riil.base.resmodel.pojo.base.MetricBasePojo;
import com.riil.base.resmodel.pojo.base.MetricGroupPojo;
import com.riil.base.resmodel.pojo.base.ModelBasePojo;
import com.riil.base.resmodel.pojo.base.ModelMetricRelPojo;
import com.riil.base.resmodel.pojo.base.ResTypePojo;
import com.riil.base.resmodel.pojo.base.VendorPojo;
import com.riil.base.resmodel.pojo.mmodel.CollectCmd;
import com.riil.base.resmodel.pojo.mmodel.CollectCmds;
import com.riil.base.resmodel.pojo.mmodel.Filter;
import com.riil.base.resmodel.pojo.mmodel.Model;
import com.riil.base.resmodel.pojo.mmodel.ModelMetricBindingPojo;
import com.riil.base.resmodel.pojo.mmodel.ModelPojo;
import com.riil.base.resmodel.pojo.mmodel.Processor;
import com.riil.base.resmodel.pojo.mmodel.Support;
import com.riil.base.resmodel.pojo.policy.PolicyPojo;
import com.riil.base.resmodel.pojo.policy.PolicyResPojo;
import com.riil.base.resmodel.pojo.vendor.ModelSysoidPojo;
import com.riil.base.resmodel.pojo.vendor.VendorModelPojo;
import com.riil.core.commons.ServerModule;
import com.riil.core.container.ContainerException;
import com.riil.core.container.IServiceContainer;
import com.riil.core.container.ServiceContainer;
import com.riil.core.dam.exception.DBException;
import com.riil.core.dam.tx.TransactionManager;
import com.riil.core.logger.SystemLogger;
import com.riil.core.service.ServiceException;
import com.riil.core.utils.bean.SerializeUtil;

/**
 * 导入数据到简化模型 从资源模型的bin文件导入到简化模型数据库 <br>
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
public class ImportFile2Db {
	private static final SystemLogger S_LOGGER = SystemLogger.getSystemLogger(ImportFile2Db.class,
			ServerModule.ResourceModel);
	private boolean isBatch = false;

	IResTypeService t_resTypeService = null;
	IModelService t_modelService = null;
	IDictService t_dictSrv = null;
	
	public static void main(String[] args) {
		try {
			BinFileUtils.setLazyLoad(false);
			((ServiceContainer)ServiceContainer.getInstance()).initialize();
			if (S_LOGGER.isInfoEnabled()) {
				S_LOGGER.info("serviceContainer initialized");
			}
			ImportFile2Db t_import = new ImportFile2Db();
			if (null != args && args.length > 0) {
				t_import.setBatch(true);
			}
			t_import.importAll();

		} catch (Exception e) {
			e.printStackTrace();
			S_LOGGER.error("", e);
		}
	}

	protected IServiceContainer serviceContainer = ServiceContainer.getInstance();

	public void importAll() throws Exception {
		if (S_LOGGER.isInfoEnabled()) {
			S_LOGGER.info("import ResUserConf.....");
		}
		new ImportDict2Db().importAllDict();
		importAllModel();
		importPolicy();
		if (S_LOGGER.isInfoEnabled()) {
			S_LOGGER.info("import all over!");
		}
	}

	/**
	 * 导入ALL资源模型
	 * 
	 * @throws ServiceException
	 * @throws ContainerException
	 */
	public void importAllModel() throws ServiceException, ContainerException {
		if (S_LOGGER.isInfoEnabled()) {
			S_LOGGER.info("import temp.....");
		}
		importResType();
		if (S_LOGGER.isInfoEnabled()) {
			S_LOGGER.info("import model.....");
		}
		importModel();

		if (S_LOGGER.isInfoEnabled()) {
			S_LOGGER.info("import metric.....");
		}
		importMetricBase();
		
		if (S_LOGGER.isInfoEnabled()) {
			S_LOGGER.info("import eventBase.....");
		}
		importEvnetBase();

		if(S_LOGGER.isDebugEnabled()){
			S_LOGGER.info("import vendor.....");
		}
		importVendor();
		
		if (S_LOGGER.isInfoEnabled()) {
			S_LOGGER.info("import vendorModel.....");
		}
		importVendorModel();
		
		//importModelSysoid();
		
		if (S_LOGGER.isInfoEnabled()) {
			S_LOGGER.info("import modelMetricRel.....");
		}
		importModelMetricRel();
		
		if (S_LOGGER.isInfoEnabled()) {
			S_LOGGER.info("import metricGroup.....");
		}
		importMetricGroup();
		
		if (S_LOGGER.isInfoEnabled()) {
			S_LOGGER.info("import metricGroupRsl.....");
		}
		importMetricGroupRel();
		if (S_LOGGER.isInfoEnabled()) {
			S_LOGGER.info("import modelSysOid.....");
		}
		importModelSysoid();
	}
	
	public void importMetricGroupRel() throws ServiceException, ContainerException{
		IMetricGroupService t_service = (IMetricGroupService)serviceContainer.getServiceComponent(IMetricGroupService.S_SERVICE_ID);
		Map<String, Set<String>> t_metricGroupRelMap = getDictService().getDictPojo().getAllMetricGroupRel();
		Set<String> t_metricGroupIds = t_metricGroupRelMap.keySet();
		
		for (String t_metricGroupId : t_metricGroupIds) {
			Set<String> t_metricIds = t_metricGroupRelMap.get(t_metricGroupId);
			List<String> t_metrics = new ArrayList<String>();
			t_metrics.addAll(t_metricIds);
			t_service.createOrModifyMetricIds(t_metricGroupId, t_metrics);
		}
	}
	

	/**
	 * 导入指标组初始化信息
	 * @throws ServiceException
	 * @throws ContainerException
	 */
	public void importMetricGroup() throws ServiceException, ContainerException{
		IMetricGroupService t_service = (IMetricGroupService)serviceContainer.getServiceComponent(IMetricGroupService.S_SERVICE_ID);
		t_service.removeAllMetricGroup();
		
		List<MetricGroupPojo> t_metricGroupList = getDictService().getDictPojo().getAllMetricGroup();
		
		((MetricGroupService)t_service).importBatch(t_metricGroupList);
		
		
	}
	

	/**
	 * 导入事件基础信息.
	 * 
	 * @throws ServiceException
	 * @throws ContainerException
	 */
	// @Test
	public void importEvnetBase() throws ServiceException, ContainerException {
		IEventBaseService t_service = (IEventBaseService) serviceContainer
				.getServiceComponent(IEventBaseService.S_SERVICE_ID);
		t_service.removeAllEventBase();

		List<EventBasePojo> t_eventList = getDictService().getDictPojo().getAllEventBases();

		((EventBaseService)t_service).importBatch(t_eventList);
	}

	/**
	 * 导入指标信息
	 * 
	 * @throws ServiceException
	 * @throws ContainerException
	 */
	// @Test
	public void importMetricBase() throws ServiceException, ContainerException {
		IMetricBaseService t_service = (IMetricBaseService) serviceContainer
				.getServiceComponent(IMetricBaseService.S_SERVICE_ID);
		t_service.removeAllMetricBase();
		List<MetricBasePojo> t_tempMetric = getDictService().getDictPojo().getAllMetricBases();
		((MetricBaseService)t_service).importBatch(t_tempMetric);
	}


	/**
	 * 导入监控模型.
	 * 
	 * @throws ServiceException
	 * @throws ContainerException
	 */
	public void importModel() throws ServiceException, ContainerException {
		List<Model> t_list = getModelService().getAllModel();
		DBServiceProxy.removeAllModel();
		List<ModelBasePojo> t_insertList = new ArrayList<ModelBasePojo>();
		for (Model pojo : t_list) {
			pojo.setTag4(pojo.getProcessor());
			t_insertList.add(pojo);
		}
		DBServiceProxy.createBatchModel(t_insertList);
	}

	/**
	 * 导入指标信息
	 * 
	 * @throws ServiceException
	 * @throws ContainerException
	 */
	// @Test
	public void importModelMetricRel() throws ServiceException, ContainerException {
		IModelMetricRelService t_relService = (IModelMetricRelService) serviceContainer
				.getServiceComponent(IModelMetricRelService.S_SERVICE_ID);

		List<Model> t_listModel = getModelService().getAllModel();
		t_relService.removeAllModelMetricRel();
		List<ModelMetricRelPojo> t_insertList;
		for (Model t_Model : t_listModel) {
			t_insertList = new ArrayList<ModelMetricRelPojo>();
			List<ModelMetricBindingPojo> t_list = t_Model.gainListModelMetricBindingPojo();
			for (ModelMetricBindingPojo modelMetricBindingPojo : t_list) {
				ModelMetricRelPojo t_rel = new ModelMetricRelPojo();
				t_rel.setMetricId(modelMetricBindingPojo.getId());
				t_rel.setModelId(modelMetricBindingPojo.getModelId());
				t_rel.setResTypeId(t_Model.getResTypeId());
				t_insertList.add(t_rel);
			}
			((ModelMetricRelService)t_relService).importBatch(t_insertList);
			t_insertList.clear();
		}

		//
		// List<Template> t_list = getTemplateService(t_tempService).getAllTemplate();
		// IMetricBaseService t_service = (IMetricBaseService) serviceContainer
		// .getServiceComponent(IMetricBaseService.S_SERVICE_ID);
		//
		// List<MetricBasePojo> t_insertList ;
		// t_service.removeAllMetricBase();
		// for (Template pojo : t_list) {
		// Template t_Template = getTemplateService(t_tempService).getTemplateByID(pojo.getId());
		// List<TempMetricPojo> t_tempMetric =
		// t_Template.getListTempMetricPojo();;
		// t_insertList = new ArrayList<MetricBasePojo>();
		// for (TempMetricPojo t_metric : t_tempMetric) {
		// MetricBasePojo t_metricBase= new MetricBasePojo();
		// BeanUtils.copyProperties(t_metric, t_metricBase);
		// TempMetricGroupPojo metricGroup =
		// t_Template.getTempMetricGroupPojoByMetricGroupId(
		// t_metric.getMetricGroupId());
		// if(metricGroup==null){
		// logger.error("模板中没有指标组定义"+t_metric.getMetricGroupId());
		// continue;
		// }
		// t_metricBase.setMetricGroupName(metricGroup.getName());
		// t_insertList.add(t_metric);
		// }
		// t_service.createBatch(t_insertList);
		// t_insertList.clear();
		// }

	}

	/**
	 * 导入模型sysoid关系.
	 * 
	 * @throws ServiceException
	 * @throws ContainerException
	 */
	public void importModelSysoid() throws ServiceException, ContainerException {
		List<ModelSysoidPojo> t_list = getDictService().getDictPojo().getListDictSysoidPojo();
		DBServiceProxy.removeAllModelSysoid();
		DBServiceProxy.createBatchModelSysoid(t_list);
	}

	public void importPolicy() throws ServiceException, ContainerException {
		if (S_LOGGER.isInfoEnabled()) {
			S_LOGGER.info("import policy.....");
		}
		IPolicyService t_srv = ServiceContainer.getInstance().getServiceComponent(IPolicyService.S_SERVICE_ID);

		IResourcePolicyService t_resSrvDb = ServiceContainer.getInstance().getServiceComponent(
				IResourcePolicyService.S_SERVICE_ID);
		IScriptPolicyService t_srcitpDb = ServiceContainer.getInstance().getServiceComponent(
				IScriptPolicyService.S_SERVICE_ID);

		List<PolicyPojo> t_list = t_srv.getAllFactoryPolicy();
		if(S_LOGGER.isInfoEnabled()){
			S_LOGGER.info("load policy over!");
		}
		for (PolicyPojo pojo : t_list) {
			pojo.setInUse((byte) 1);
			if (pojo.getPolicyType().equals(PolicyType.RES.getId())
					|| pojo.getPolicyType().equals(PolicyType.BIZ.getId())
					|| pojo.getPolicyType().equals(PolicyType.LINK.getId())) {
				t_resSrvDb.removePolicyByPolicyId(pojo.getId());
				
				//RIIL_RMP_RES_VIRTUAL_HYPERV_VSWITCH_DEFAULT
//				RIIL_RMP_RES_VIRTUAL_VMWARE_VSWITCH_DEFAULT
//				RIIL_RMP_RES_VIRTUAL_XENSERVER_VSWITCH_DEFAULT
				
				if ("RIIL_RMP_RES_VIRTUAL_HYPERV_VSWITCH_DEFAULT".equals(pojo.getId()) 
				    || "RIIL_RMP_RES_VIRTUAL_VMWARE_VSWITCH_DEFAULT".equals(pojo.getId())
				    || "RIIL_RMP_RES_VIRTUAL_XENSERVER_VSWITCH_DEFAULT".equals(pojo.getId())
				    || "RIIL_RMP_RES_VIRTUAL_HYPERV_VMMANAGER_DEFAULT".equals(pojo.getId()))
				{
				    ((PolicyResPojo)pojo).setResAvailRuleGroup(null);
				}
				
				t_resSrvDb.createPolicy4InitData(pojo);
			} else if (pojo.getPolicyType().equals(PolicyType.SCRIPT_ADV.getId())
					||pojo.getPolicyType().equals(PolicyType.SCRIPT_SIMPLE.getId())) {
				t_srcitpDb.removePolicyByPolicyId(pojo.getId());
				t_srcitpDb.createPolicy4InitData(pojo);
			} else {
				t_srv.removePolicyByPolicyId(pojo.getId());
				t_srv.createPolicy4InitData(pojo);
			}
		}
	}

	/**
	 * 导入模板.
	 * 
	 * @throws ServiceException
	 * @throws ContainerException
	 */
	// @Test
	public void importResType() throws ServiceException, ContainerException {
		List<ResTypePojo> t_list = getResTypeService().getAllResType();
		String oneNode = ".00";
		DBServiceProxy.removeAllResType();
		int sortIdLength = 14;
		List<ResTypePojo> t_insertList = new ArrayList<ResTypePojo>();
		for (ResTypePojo pojo : t_list) {
			ResTypePojo t_resType = new ResTypePojo();
			BeanUtils.copyProperties(pojo, t_resType);
			if (t_resType.getSortId() <= 0) {
				String treeNodeId = t_resType.getTreeNodeId();
				StringBuilder t_sortId = new StringBuilder(treeNodeId);
				while (t_sortId.length() < sortIdLength) {
					t_sortId.append(oneNode);
				}
				t_resType.setSortId(Integer.parseInt(t_sortId.toString().replaceAll("\\.", "")));
			}
			t_insertList.add(t_resType);

		}
		DBServiceProxy.createBatchResType(t_insertList);
	}

	/**
	 * 导入厂商及型号信息
	 * 
	 * @throws ServiceException
	 * @throws ContainerException
	 */
	// @Test
	public void importVendorModel() throws ServiceException, ContainerException {
		List<VendorModelPojo> t_list = getDictService().getDictPojo().getListVendorModelPojo();
		if (null == t_list || t_list.isEmpty()) {
			return;
		}

		DBServiceProxy.removeAllVendorModel();
		if (isBatch) {
			DBServiceProxy.createBatchVendorModel(t_list);
			return;
		}
		// 单个入库，排错
		StringBuilder t_errMsg = new StringBuilder();
		for (VendorModelPojo pojo : t_list) {
			try {
				DBServiceProxy.createVendorModel(pojo);
			} catch (Exception e) {
				t_errMsg.append(e.getMessage());
				continue;
			}
		}
		if (t_errMsg.length() > 0) {
			throw new ServiceException(t_errMsg.toString());
		}
	}

	public void importVendor() throws ServiceException, ContainerException{
		List<VendorPojo> t_vendors = getDictService().getDictPojo().getAllVendors();
		
		if(null == t_vendors || t_vendors.isEmpty()){
			return;
		}
		
		DBServiceProxy.removeAllVendor();
		if(isBatch){
			DBServiceProxy.createBatchVendor(t_vendors);
			return;
		}
		
		// 单个入库，排错
		StringBuilder t_errMsg = new StringBuilder();
		for (VendorPojo pojo : t_vendors) {
			try {
				DBServiceProxy.createVendor(pojo);
			} catch (Exception e) {
				t_errMsg.append(e.getMessage());
			}
		}
		if (t_errMsg.length() > 0) {
			throw new ServiceException(t_errMsg.toString());
		}
		
	}
	public void importAllMetricBinding()throws ServiceException, ContainerException, IOException{
		List<ModelPojo> t_allModelPojo = getModelService().getAllModelPojo();
		//t_moni_metricbinding
		List<MetricBindingPojo> t_bindingList = new ArrayList<MetricBindingPojo>();
		//t_moni_metric_process_para
		List<MetricProcessPara> t_processParaList = new ArrayList<MetricProcessPara>();
		//t_moni_cmds_group
		List<CollectCmdsPojo> t_collectCmdsList = new ArrayList<CollectCmdsPojo>();
		//t_moni_cmds_conn_protocol
		List<CollectCmdsConnProtocol> t_collectCmdsConnProtocalList = new ArrayList<CollectCmdsConnProtocol>();
		//t_moni_cmds_processor
		List<CollectCmdsProcessor> t_collectCmdsProcessorList = new ArrayList<CollectCmdsProcessor>();
		//t_moni_cmds_process_para
		List<CollectCmdsProcessPara> t_collectCmdsProcessParaList = new ArrayList<CollectCmdsProcessPara>();
		//t_moni_cmd
		List<CollectCmdPojo> t_collectCmdList = new ArrayList<CollectCmdPojo>();
		//t_moni_cmd_properties
		List<CmdPropertie> t_cmdPropertieList = new ArrayList<CmdPropertie>();
		//t_moni_cmd_filters
		List<CmdFilter> t_cmdFilterList = new ArrayList<CmdFilter>();
		//t_moni_cmds_support
		List<CmdSupportPojo> t_cmdSupportList = new ArrayList<CmdSupportPojo>();
		for (ModelPojo t_model : t_allModelPojo) {
			String t_modelId = t_model.getId();
			System.out.println("getModel modelId="+t_modelId+"...");
			List<ModelMetricBindingPojo> t_listModelMetricBindingPojo = t_model.getListModelMetricBindingPojo();
			for (ModelMetricBindingPojo t_binding : t_listModelMetricBindingPojo) {
				String t_id = t_binding.getId();
				String t_uuid = UUID.nameUUIDFromBytes((t_modelId+t_id).getBytes()).toString();
				List<CollectCmds> t_collectCmdsGroup = t_binding.getCollectCmdsGroup();
				for (CollectCmds t_collectCmds : t_collectCmdsGroup) {
					String t_orderBy = t_collectCmds.getOrderBy();
					byte t_isDynamic = t_collectCmds.getIsDynamic();
					byte t_isDefault = t_collectCmds.getIsDefault();
					String t_collectCmdsId = t_collectCmds.getId();
					CollectCmdsPojo t_cmdsPojo = new CollectCmdsPojo();
					t_cmdsPojo.setId(t_collectCmdsId);
					t_cmdsPojo.setMetricBindingId(t_uuid);
					t_cmdsPojo.setIsDefault(t_isDefault);
					t_cmdsPojo.setIsDynamic(t_isDynamic);
					t_cmdsPojo.setSortId(t_orderBy);
					t_collectCmdsList.add(t_cmdsPojo);
					
					List<Support> t_supports = t_collectCmds.getSupports();
					for (Support t_suport : t_supports) {
						String t_suportId = t_suport.getId();
						String t_version = t_suport.getVersion();
						String t_rel = t_suport.getRel();
						CmdSupportPojo t_supportPojo = new CmdSupportPojo();
						t_supportPojo.setId(t_suportId);
						t_supportPojo.setCmdsGroupId(t_collectCmdsId);
						t_supportPojo.setVersion(t_version);
						t_supportPojo.setRel(t_rel);
						t_cmdSupportList.add(t_supportPojo);
					}
					
					List<String> t_connectionProtocols = t_collectCmds.getConnectionProtocols();
					for (String t_connectionProtocol : t_connectionProtocols) {
						CollectCmdsConnProtocol t_connProtocol = new CollectCmdsConnProtocol();
						String t_connProtocalUuid = UUID.randomUUID().toString();
						t_connProtocol.setId(t_connProtocalUuid);
						t_connProtocol.setCmdsGroupId(t_collectCmdsId);
						t_connProtocol.setProtocol(t_connectionProtocol);
						t_collectCmdsConnProtocalList.add(t_connProtocol);
					}
					
					Processor t_processor = t_collectCmds.getProcessor();
					if(null != t_processor){
						CollectCmdsProcessor t_collectCmdsProcessor = new CollectCmdsProcessor();
						String t_collectCmdsProcessorId = t_processor.getId();
						String t_method = t_processor.getMethod();
						String t_className = t_processor.getClassName();
						t_collectCmdsProcessor.setId(t_collectCmdsProcessorId);
						t_collectCmdsProcessor.setCmdsGroupId(t_collectCmdsId);
						t_collectCmdsProcessor.setClassName(t_className);
						t_collectCmdsProcessor.setMethod(t_method);
						t_collectCmdsProcessorList.add(t_collectCmdsProcessor);
						
						List<String> t_parameters = t_collectCmds.getParameter();
						int sortId = 0;
						for (String t_parameter : t_parameters) {
							CollectCmdsProcessPara t_collectCmdsProcessPara = new CollectCmdsProcessPara();
							String t_connProtocalUuid = UUID.randomUUID().toString();
							t_collectCmdsProcessPara.setId(t_connProtocalUuid);
							t_collectCmdsProcessPara.setParameter(t_parameter);
							t_collectCmdsProcessPara.setProcessorId(t_collectCmdsProcessorId);
							//TODO 取不到sort
							t_collectCmdsProcessPara.setSortId(String.valueOf(sortId));
							sortId++;
							t_collectCmdsProcessParaList.add(t_collectCmdsProcessPara);
						}
					}
					
					
					List<CollectCmd> t_cmdList = t_collectCmds.getCollectCmds();
					for (CollectCmd t_collectCmd : t_cmdList) {
						String t_collectCmdId = t_collectCmd.getId();
						String t_protocol = t_collectCmd.getProtocol();
						String t_cmd = t_collectCmd.getCmd();
						String t_index = t_collectCmd.getIndex();
						CollectCmdPojo t_collectCmdPojo = new CollectCmdPojo();
						t_collectCmdPojo.setId(t_collectCmdId);
						t_collectCmdPojo.setCollectCmdsId(t_collectCmdsId);
						t_collectCmdPojo.setCmd(t_cmd);
						t_collectCmdPojo.setIndex(t_index);
						t_collectCmdPojo.setProtocol(t_protocol);
						t_collectCmdList.add(t_collectCmdPojo);
						
						List<Filter> t_filters = t_collectCmd.getFilters();
						for (Filter t_filter : t_filters) {
							String t_cmdFilterId = t_filter.getId();
							String t_dependecy = t_filter.getDependecy();
							String t_row = t_filter.getRow();
							String t_column = t_filter.getColumn();
							String t_cmdParameterName = t_filter.getCmdParameterName();
							CmdFilter t_cmdFilter = new CmdFilter();
							t_cmdFilter.setId(t_cmdFilterId);
							t_cmdFilter.setCmdId(t_collectCmdId);
							t_cmdFilter.setDependecy(t_dependecy);
							t_cmdFilter.setRow(t_row);
							t_cmdFilter.setColumn(t_column);
							t_cmdFilter.setCmdParameterName(t_cmdParameterName);
							t_cmdFilterList.add(t_cmdFilter);
						}
						
						Map<String, String> t_properties = t_collectCmd.getProperties();
						Iterator<String> t_iterator = t_properties.keySet().iterator();
						while (t_iterator.hasNext()) {
							String t_propertieName = (String) t_iterator.next();
							String t_propertieValue = t_properties.get(t_propertieName);
							CmdPropertie t_cmdPropertie = new CmdPropertie();
							t_cmdPropertie.setCmdId(t_collectCmdId);
							t_cmdPropertie.setName(t_propertieName);
							t_cmdPropertie.setValue(t_propertieValue);
							t_cmdPropertieList.add(t_cmdPropertie);
						}
					}
				}
				byte t_isDisplayName = t_binding.getIsDisplayName();
				byte t_isInitValue = t_binding.getIsInitValue();
				byte t_isInstance = t_binding.getIsInstance();
				String t_method = null;
				String t_className = null;
				if(null != t_binding.getProcessor()){
					t_method = t_binding.getProcessor().getMethod();
					t_className = t_binding.getProcessor().getClassName();
				}
				MetricBindingPojo t_pojo = new MetricBindingPojo();
				t_pojo.setId(t_uuid);
				t_pojo.setModelId(t_modelId);
				t_pojo.setMetricId(t_id);
				t_pojo.setIsDisplayName(t_isDisplayName);
				t_pojo.setIsInitValue(t_isInitValue);
				t_pojo.setIsInstance(t_isInstance);
				t_pojo.setMethod(t_method);
				t_pojo.setClassName(t_className);
				t_bindingList.add(t_pojo);
				
				List<String> t_metricProcessorParas = t_binding.getParameter();
				int sortId = 0;
				for (String t_metricProcessorPara : t_metricProcessorParas) {
					MetricProcessPara t_metricProcessPara = new MetricProcessPara();
					String t_metricProcessParaUuid = UUID.randomUUID().toString();
					t_metricProcessPara.setId(t_metricProcessParaUuid);
					t_metricProcessPara.setMetricBindingId(t_uuid);
					t_metricProcessPara.setParameter(t_metricProcessorPara);
					//TODO 取不到sort
					t_metricProcessPara.setSortId(String.valueOf(sortId));
					sortId++;
					t_processParaList.add(t_metricProcessPara);
				}
			}
		}
		try {
			TransactionManager.beginTransaction();
			System.out.println("createBatchMetricBinding...");
			DBServiceProxy.createBatchMetricBinding(t_bindingList);
			System.out.println("createBatchMetricProcessPara...");
			DBServiceProxy.createBatchMetricProcessPara(t_processParaList);
			System.out.println("createBatchCollectCmds...");
			DBServiceProxy.createBatchCollectCmds(t_collectCmdsList);
			System.out.println("createBatchCollectCmdsConnProtocol...");
			DBServiceProxy.createBatchCollectCmdsConnProtocol(t_collectCmdsConnProtocalList);
			System.out.println("createBatchCollectCmdsProcessor...");
			DBServiceProxy.createBatchCollectCmdsProcessor(t_collectCmdsProcessorList);
			System.out.println("createBatchCollectCmdsProcessPara...");
			DBServiceProxy.createBatchCollectCmdsProcessPara(t_collectCmdsProcessParaList);
			System.out.println("createBatchCollectCmd...");
			DBServiceProxy.createBatchCollectCmd(t_collectCmdList);
			System.out.println("createBatchCmdPropertie...");
			DBServiceProxy.createBatchCmdPropertie(t_cmdPropertieList);
			System.out.println("createBatchCmdFilter...");
			DBServiceProxy.createBatchCmdFilter(t_cmdFilterList);
			System.out.println("createBatchCmdSupport...");
			DBServiceProxy.createBatchCmdSupport(t_cmdSupportList);
			
			TransactionManager.commitTransaction();
		} catch (Exception e) {
			try {
				TransactionManager.rollbackTransaction();
			} catch (DBException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
		}
	}
	
	public boolean isBatch() {
		return isBatch;
	}

	public void setBatch(boolean isBatch) {
		this.isBatch = isBatch;
	}
}
