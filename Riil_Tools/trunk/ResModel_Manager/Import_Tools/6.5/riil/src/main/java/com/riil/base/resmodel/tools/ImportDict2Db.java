package com.riil.base.resmodel.tools;

import java.util.List;

import com.riil.base.pojo.dict.DictCollFrequencyPojo;
import com.riil.base.resmodel.IDictService;
import com.riil.base.resmodel.impl.DBServiceProxy;
import com.riil.core.commons.ServerModule;
import com.riil.core.container.ContainerException;
import com.riil.core.container.IServiceContainer;
import com.riil.core.container.ServiceContainer;
import com.riil.core.logger.SystemLogger;
import com.riil.core.service.ServiceException;
 
public class ImportDict2Db {
	private static final SystemLogger S_LOGGER = SystemLogger.getSystemLogger(ImportDict2Db.class,
			ServerModule.ResourceModel);

	protected IServiceContainer serviceContainer = ServiceContainer.getInstance();

	/**
	 * 导入ALL 字典数据
	 * 
	 * @throws ServiceException
	 * @throws ContainerException
	 * @throws NoSuchFieldException
	 * @throws SecurityException
	 */
	public void importAllDict() throws Exception {
		if (S_LOGGER.isInfoEnabled()) {
			S_LOGGER.info("import DictCollFrequency.....");
		}
		importDictCollFrequency();

	}

	/**
	 * 导入字典信息--采集频度信息
	 * 
	 * @throws ServiceException
	 * @throws ContainerException
	 */
	// @Test
	public void importDictCollFrequency() throws ServiceException, ContainerException {
		IDictService t_dictSrv = ServiceContainer.getInstance().getServiceComponent(IDictService.S_SERVICE_ID);
		List<DictCollFrequencyPojo> t_list = t_dictSrv.getDictPojo().getListDictCollFrequencyPojo();
		
		DBServiceProxy.removeAllDictCollFrequency();
		for (DictCollFrequencyPojo pojo : t_list) {
			DBServiceProxy.createDictCollFrequency(pojo);
		}
	}

	// public static void copyToDictCommon(Catalog catalog, Object[] enumObj,
	// List<DictCommonPojo> results) throws ServiceException {
	//
	// try {
	// for (int i = 0; i < enumObj.length; i++) {
	// DictCommonPojo dest = new DictCommonPojo();
	// org.apache.commons.beanutils.BeanUtils.copyProperties(dest, enumObj[i]);
	// Field field =
	// enumObj[i].getClass().getDeclaredField(enumObj[i].toString());//
	// enumObj.name()//TODO
	// boolean hasAnnotation = field.isAnnotationPresent(EnumAnnotation.class);
	// if (hasAnnotation) {
	// EnumAnnotation annotation = field.getAnnotation(EnumAnnotation.class);
	// dest.setName(annotation.name());
	// dest.setNameEn(annotation.nameEn());
	// }
	// if (null == dest.getNameEn()) {
	// dest.setNameEn((String) dest.getId());
	// }
	// dest.setCatalog(catalog.getKey());
	// dest.setSortId(i);
	// results.add(dest);
	// }
	// } catch (Exception e) {
	// throw new ServiceException(e);
	// }
	//
	// }
	/**
	 * 导入字典信息--插件信息
	 * 
	 * @throws ServiceException
	 * @throws ContainerException
	 */
	// @Test
	// public void importDictPlugin() throws ServiceException,
	// ContainerException {
	// IDictFileService t_dictSrv =
	// ServiceContainer.getInstance().getServiceComponent(IDictFileService.S_SERVICE_ID);
	// List<DictPluginPojo> t_list =
	// t_dictSrv.getDictPojo().getListDictPluginPojo();
	// IDictPluginService t_service =
	// serviceContainer.getServiceComponent(IDictPluginService.S_SERVICE_ID);
	// t_service.removeAllDictPlugin();
	// for (DictPluginPojo pojo : t_list) {
	// t_service.createDictPlugin(pojo);
	// }
	// }

	/**
	 * 导入字典信息--资源连接属性
	 * 
	 * @throws ServiceException
	 * @throws ContainerException
	 */
	// @Test
	// public void importDictResConnProp() throws ServiceException,
	// ContainerException {
	// IDictFileService t_dictSrv =
	// ServiceContainer.getInstance().getServiceComponent(IDictFileService.S_SERVICE_ID);
	// List<DictResConnPropPojo> t_list =
	// t_dictSrv.getDictPojo().getListDictResConnPropPojo();
	// IDictResConnPropService t_service =
	// serviceContainer.getServiceComponent(IDictResConnPropService.S_SERVICE_ID);
	// t_service.removeAllDictResConnProp();
	// for (DictResConnPropPojo pojo : t_list) {
	// t_service.createDictResConnProp(pojo);
	// }
	// }
}
