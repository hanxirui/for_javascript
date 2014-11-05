package com.riil.base.resmodel.impl;

import java.util.List;

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
import com.riil.base.binding.pojo.ResTypeExtendPojo;
import com.riil.base.pojo.dict.DictCollFrequencyPojo;
import com.riil.base.resmodel.IDictService;
import com.riil.base.resmodel.IMetricBindingService;
import com.riil.base.resmodel.IModelService;
import com.riil.base.resmodel.IResTypeService;
import com.riil.base.resmodel.pojo.base.ModelBasePojo;
import com.riil.base.resmodel.pojo.base.ResTypePojo;
import com.riil.base.resmodel.pojo.base.VendorPojo;
import com.riil.base.resmodel.pojo.vendor.ModelSysoidPojo;
import com.riil.base.resmodel.pojo.vendor.VendorModelPojo;
import com.riil.core.container.ContainerException;
import com.riil.core.container.ServiceContainer;
import com.riil.core.service.ServiceException;

public class DBServiceProxy {

	public static void createResType(ResTypePojo resType) throws ServiceException, ContainerException {
        getResTypeService().createResType(resType);
    }
	
    public static void createBatchResType(List<ResTypeExtendPojo> resTypes) throws ServiceException, ContainerException {
        getResTypeService().createBatch(resTypes);
    }

    public static void removeResType(String id) throws ServiceException, ContainerException {
        getResTypeService().removeResType(id);
    }
    
    public static void removeAllResType() throws ServiceException, ContainerException {
        getResTypeService().removeAllResType();
    }
	
    public static void createModel(ModelBasePojo model) throws ServiceException, ContainerException {
        getModelService().create(model);

    }

    public static void createBatchModel(List<ModelBasePojo> models) throws ServiceException, ContainerException {
        getModelService().createBatch(models);
    }

    public static void removeModel(String modelId) throws ServiceException, ContainerException {
        getModelService().remove(modelId);

    }

    public static void removeAllModel() throws ServiceException, ContainerException {
        getModelService().removeAll();
    }
    
    public static void removeAllDictCollFrequency() throws ServiceException, ContainerException {
    	getDictService().removeAllDictCollFrequency();
    }
    
    public static void removeAllModelSysoid() throws ServiceException, ContainerException {
    	getDictService().removeAllModelSysoid();
    }
    
    public static void removeAllVendorModel() throws ServiceException, ContainerException {
    	getDictService().removeAllVendorModel();
    }
    
    public static void removeAllVendor() throws ServiceException, ContainerException{
    	getDictService().removeAllVendors();
    }
    
    public static void removeDictCollFrequency(String dictCollFrequencyID) throws ServiceException, ContainerException {
    	getDictService().removeDictCollFrequency(dictCollFrequencyID);
    }
    
    public static void removeModelSysoid(String modelSysoidID) throws ServiceException, ContainerException {
    	getDictService().removeModelSysoid(modelSysoidID);
    }
    
    public static void removeVendorModel(String vendorModelID) throws ServiceException, ContainerException {
    	getDictService().removeVendorModel(vendorModelID);
    }
    
    public static void createBatchModelSysoid(List<ModelSysoidPojo> list) throws ServiceException, ContainerException {
    	getDictService().createBatchModelSysoid(list);
    }
    
    public static void createBatchVendorModel(List<VendorModelPojo> list)  throws ServiceException, ContainerException {
    	getDictService().createBatchVendorModel(list);
    }
    
    public static void createBatchVendor(final List<VendorPojo> list) throws ServiceException, ContainerException{
    	getDictService().createBatchVendor(list);
    }
    
    public static void createDictCollFrequency(final DictCollFrequencyPojo dictCollFrequency) throws ServiceException, ContainerException {
    	getDictService().createDictCollFrequency(dictCollFrequency);
    }
    
    public static void createModelSysoid(final ModelSysoidPojo modelSysoid) throws ServiceException, ContainerException {
    	getDictService().createModelSysoid(modelSysoid);
    }
    
    public static void createVendorModel(final VendorModelPojo vendorModel) throws ServiceException, ContainerException {
    	getDictService().createVendorModel(vendorModel);
    }
    
    public static void createVendor(final VendorPojo pojo)  throws ServiceException, ContainerException{
    	getDictService().createVendor(pojo);
    }
    
    public static void createBatchMetricBinding(final List<MetricBindingPojo> list) throws ServiceException,ContainerException{
    	getMetricBindingService().createBatch(list);
    }
    public static void createBatchMetricProcessPara(final List<MetricProcessPara> list) throws ServiceException,ContainerException{
    	getMetricBindingService().createBatchMetricProcessPara(list);
    }
    public static void createBatchCollectCmds(final List<CollectCmdsPojo> list) throws ServiceException,ContainerException{
    	getMetricBindingService().createBatchCollectCmds(list);
    }
    public static void createBatchCollectCmdsConnProtocol(final List<CollectCmdsConnProtocol> list) throws ServiceException,ContainerException{
    	getMetricBindingService().createBatchCollectCmdsConnProtocol(list);
    }
    public static void createBatchCollectCmdsProcessor(final List<CollectCmdsProcessor> list) throws ServiceException,ContainerException{
    	getMetricBindingService().createBatchCollectCmdsProcessor(list);
    }
    public static void createBatchCollectCmdsProcessPara(final List<CollectCmdsProcessPara> list) throws ServiceException,ContainerException{
    	getMetricBindingService().createBatchCollectCmdsProcessPara(list);
    }
    public static void createBatchCollectCmd(final List<CollectCmdPojo> list) throws ServiceException,ContainerException{
    	getMetricBindingService().createBatchCollectCmd(list);
    }
    public static void createBatchCmdPropertie(final List<CmdPropertie> list) throws ServiceException,ContainerException{
    	getMetricBindingService().createBatchCmdPropertie(list);
    }
    public static void createBatchCmdFilter(final List<CmdFilter> list) throws ServiceException,ContainerException{
    	getMetricBindingService().createBatchCmdFilter(list);
    }
    public static void createBatchCmdSupport(final List<CmdSupportPojo> list) throws ServiceException,ContainerException{
    	getMetricBindingService().createBatchCmdSupport(list);
    }
    private static ResTypeService getResTypeService() throws ContainerException {
        return (ResTypeService) ServiceContainer.getInstance().getServiceComponent(IResTypeService.S_SERVICE_ID);
    }

    private static ModelService getModelService() throws ContainerException {
        return (ModelService) ServiceContainer.getInstance().getServiceComponent(IModelService.S_SERVICE_ID);
    }

    private static DictService getDictService() throws ContainerException {
        return (DictService) ServiceContainer.getInstance().getServiceComponent(IDictService.S_SERVICE_ID);
    }
    
    private static MetricBindingService getMetricBindingService() throws ContainerException{
    	return (MetricBindingService) ServiceContainer.getInstance().getServiceComponent(IMetricBindingService.S_SERVICE_ID);
    }
    
    
}
