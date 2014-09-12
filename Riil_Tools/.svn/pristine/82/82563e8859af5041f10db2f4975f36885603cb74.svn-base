package com.riil.base.resmodel.tools;

import static com.riil.base.resmodel.tools.ResModelServiceLoader.getDictService;
import static com.riil.base.resmodel.tools.ResModelServiceLoader.getModelService;
import static com.riil.base.resmodel.tools.ResModelServiceLoader.getResTypeService;

import java.util.ArrayList;
import java.util.List;

import com.riil.base.pojo.enums.EnumRoot.PolicyType;
import com.riil.base.policy.IPolicyService;
import com.riil.base.policy.IResourcePolicyService;
import com.riil.base.policy.IScriptPolicyService;
import com.riil.base.resmodel.IEventBaseService;
import com.riil.base.resmodel.IModelMetricRelService;
import com.riil.base.resmodel.impl.DBServiceProxy;
import com.riil.base.resmodel.impl.file.BinFileUtils;
import com.riil.base.resmodel.pojo.base.EventBasePojo;
import com.riil.base.resmodel.pojo.base.ModelBasePojo;
import com.riil.base.resmodel.pojo.base.ModelMetricRelPojo;
import com.riil.base.resmodel.pojo.base.ResTypePojo;
import com.riil.base.resmodel.pojo.mmodel.Model;
import com.riil.base.resmodel.pojo.mmodel.ModelMetricBindingPojo;
import com.riil.base.resmodel.pojo.mmodel.ModelPojo;
import com.riil.base.resmodel.pojo.policy.PolicyPojo;
import com.riil.base.resmodel.pojo.vendor.ModelSysoidPojo;
import com.riil.base.resmodel.pojo.vendor.VendorModelPojo;
import com.riil.core.commons.ServerModule;
import com.riil.core.container.ContainerException;
import com.riil.core.container.IServiceContainer;
import com.riil.core.container.ServiceContainer;
import com.riil.core.logger.SystemLogger;
import com.riil.core.service.ServiceException;

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
public class ImportOneFile2Db {
	private static final SystemLogger S_LOGGER = SystemLogger.getSystemLogger(ImportOneFile2Db.class,
			ServerModule.ResourceModel);
	private boolean isBatch = false;
	public enum FileType {
		Policy, Temp, Model
	}

	public static void main(String[] args) {
		try {
			BinFileUtils.setLazyLoad(false);
			((ServiceContainer)ServiceContainer.getInstance()).initialize();
			if (S_LOGGER.isInfoEnabled()) {
				S_LOGGER.info("serviceContainer initialized");
			}
			ImportOneFile2Db t_import = new ImportOneFile2Db();
			if (null != args && args.length > 0) {
				t_import.setBatch(true);
			}

		} catch (Exception e) {
			S_LOGGER.error("", e);
		}
	}

	protected IServiceContainer serviceContainer = ServiceContainer.getInstance();

	protected void importEventBase(String tempId, List<EventBasePojo> eventList) throws ContainerException, ServiceException{
		IEventBaseService t_service = (IEventBaseService) serviceContainer.getServiceComponent(IEventBaseService.S_SERVICE_ID);
		
		t_service.createBatch(eventList);
	}

	public void importModel(ModelPojo model) throws ServiceException, ContainerException{
		importModelBase(model);
		importModelMetricRel(model);
	}
	
	/**
	 * 导入监控模型.
	 * 
	 * @throws ServiceException
	 * @throws ContainerException
	 */

	public void importModel(String modelId) throws ServiceException, ContainerException {
		importModelBase(modelId);
		importModelMetricRel(modelId);
	}

	/**
	 * 导入监控模型.
	 * 
	 * @throws ServiceException
	 * @throws ContainerException
	 */

	protected void importModelBase(String modelId) throws ServiceException, ContainerException {
		Model modelBase = getModelService().getModel(modelId);
	
		importModelBase(modelBase);
	}
	
	protected void importModelBase(ModelBasePojo modelBase) throws ServiceException, ContainerException {
		DBServiceProxy.removeModel(modelBase.getId());
		
		ModelSysoidPojo modelSysoid = getDictService().getModelSysoidByModelId(modelBase.getId());
		if(modelSysoid != null){
			VendorModelPojo vendor = getDictService().getDictPojo().getVendorById(modelSysoid.getVendorModelId());
			if(vendor != null){
				modelBase.setVendorId(vendor.getVendorId());
				modelBase.setVendorName(vendor.getVendorName());
			}
		}
		
		DBServiceProxy.createModel(modelBase);
	}

	/**
	 * 导入指标信息
	 * 
	 * @throws ServiceException
	 * @throws ContainerException
	 */
	protected void importModelMetricRel(String modelId) throws ServiceException, ContainerException {
		Model t_model = getModelService().getModel(modelId);
		List<ModelMetricBindingPojo> t_list = t_model.gainListModelMetricBindingPojo();
		ModelPojo t_modelPojo = new ModelPojo();
		t_modelPojo.setId(modelId);
		for(ModelMetricBindingPojo t_pojo : t_list){
			t_modelPojo.addModelMetricBindingPojo(t_pojo);
		}

		importModelMetricRel(t_modelPojo);
	}
	
	protected void importModelMetricRel(ModelPojo modelPojo) throws ServiceException, ContainerException {
		IModelMetricRelService t_relService = (IModelMetricRelService) serviceContainer.getServiceComponent(IModelMetricRelService.S_SERVICE_ID);
		List<ModelMetricRelPojo> t_insertList = new ArrayList<ModelMetricRelPojo>();
		for (ModelMetricBindingPojo modelMetricBindingPojo : modelPojo.getListModelMetricBindingPojo()) {
			ModelMetricRelPojo t_rel = new ModelMetricRelPojo();
			t_rel.setMetricId(modelMetricBindingPojo.getId());
			t_rel.setModelId(modelMetricBindingPojo.getModelId());
			t_rel.setResTypeId(modelPojo.getResTypeId());
			t_insertList.add(t_rel);
		}
		t_relService.removeByModelId(modelPojo.getId());
		t_relService.createBatch(t_insertList);
		t_insertList.clear();
	}

	public void importPolicy(PolicyPojo pojo) throws ContainerException, ServiceException{
		IPolicyService t_srv = ServiceContainer.getInstance().getServiceComponent(IPolicyService.S_SERVICE_ID);

		IResourcePolicyService t_resSrvDb = ServiceContainer.getInstance().getServiceComponent(
				IResourcePolicyService.S_SERVICE_ID);
		IScriptPolicyService t_srcitpDb = ServiceContainer.getInstance().getServiceComponent(
				IScriptPolicyService.S_SERVICE_ID);
		
		pojo.setInUse((byte) 1);
		if (pojo.getPolicyType().equals(PolicyType.RES.getId())
				|| pojo.getPolicyType().equals(PolicyType.BIZ.getId())
				|| pojo.getPolicyType().equals(PolicyType.LINK.getId())) {
			t_resSrvDb.removePolicyByPolicyId(pojo.getId());
			t_resSrvDb.createPolicy(pojo);
		} else if (pojo.getPolicyType().equals(PolicyType.SCRIPT_ADV.getId())
				||pojo.getPolicyType().equals(PolicyType.SCRIPT_SIMPLE.getId())) {
			t_srcitpDb.removePolicyByPolicyId(pojo.getId());
			t_srcitpDb.createPolicy(pojo);
		} else {
			t_srv.removePolicyByPolicyId(pojo.getId());
			t_srv.createPolicy(pojo);
		}
	}
	
	public void importPolicy(String policyId) throws ServiceException, ContainerException {
		if (S_LOGGER.isInfoEnabled()) {
			S_LOGGER.info("import policy.....");
		}
		IPolicyService t_srv = ServiceContainer.getInstance().getServiceComponent(IPolicyService.S_SERVICE_ID);
		
		List<PolicyPojo> t_list = t_srv.getAllFactoryPolicy();
		try {
			for (PolicyPojo pojo : t_list) {
				importPolicy(pojo);
			}

		} finally {
		}
	}

	/**
	 * 导入模板.
	 * 
	 * @throws ServiceException
	 * @throws ContainerException
	 */
	public void importTemp(ResTypePojo template) throws ServiceException, ContainerException {
		importTempBase(template);
	}
	
	/**
	 * 导入模板.
	 * 
	 * @throws ServiceException
	 * @throws ContainerException
	 */
	public void importTemp(String tempId) throws ServiceException, ContainerException {
		importTempBase(tempId);
	}

	/**
	 * 导入模板.
	 * 
	 * @throws ServiceException
	 * @throws ContainerException
	 */
	protected void importTempBase(String tempId) throws ServiceException, ContainerException {
		ResTypePojo tempBase = getResTypeService().getResTypeByID(tempId);
		
		importTempBase(tempBase);
	}
	
	protected void importTempBase(ResTypePojo t_temp) throws ServiceException, ContainerException {
		String oneNode = ".00";
		int sortIdLength = 14;
		
		if (t_temp.getSortId() <= 0) {
			String treeNodeId = t_temp.getTreeNodeId();
			StringBuilder t_sortId = new StringBuilder(treeNodeId);
			while (t_sortId.length() < sortIdLength) {
				t_sortId.append(oneNode);
			}
			t_temp.setSortId(Integer.parseInt(t_sortId.toString().replaceAll("\\.", "")));
		}
		
		DBServiceProxy.removeResType(t_temp.getId());
		DBServiceProxy.createResType(t_temp);
	}

	public boolean isBatch() {
		return isBatch;
	}

	public void setBatch(boolean isBatch) {
		this.isBatch = isBatch;
	}
}
