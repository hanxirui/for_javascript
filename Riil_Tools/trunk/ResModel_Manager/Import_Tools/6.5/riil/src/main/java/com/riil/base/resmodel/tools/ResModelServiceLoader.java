package com.riil.base.resmodel.tools;

import com.riil.base.resmodel.IDictService;
import com.riil.base.resmodel.IModelService;
import com.riil.base.resmodel.IResTypeService;
import com.riil.core.commons.ServerModule;
import com.riil.core.container.ContainerException;
import com.riil.core.container.ServiceContainer;
import com.riil.core.logger.SystemLogger;

/**
 * 资源模型服务加载器<code>-Resource Model Service Loader</code><br>
 * 用于加载资源模型相关服务 <br>
 * <p>
 * Create on : 2012-6-9<br>
 * <p>
 * </p>
 * <br>
 * 
 * @author ChenJuntao<br>
 * @version riil.resmodel.impl v1.0
 *          <p>
 *          <br>
 *          <strong>Modify History:</strong><br>
 *          user modify_date modify_content<br>
 *          -------------------------------------------<br>
 *          <br>
 */
public class ResModelServiceLoader {
	private static final SystemLogger S_LOGGER = SystemLogger.getSystemLogger(ResModelServiceLoader.class,
			ServerModule.ResourceModel);

	public static IResTypeService getResTypeService() {
		try {
			return ServiceContainer.getInstance().getServiceComponent(IResTypeService.S_SERVICE_ID);
		} catch (ContainerException e) {
			S_LOGGER.error(e);
			return null;
		}
	}

	public static IModelService getModelService() {
		try {
			return ServiceContainer.getInstance().getServiceComponent(IModelService.S_SERVICE_ID);
		} catch (ContainerException e) {
			S_LOGGER.error(e);
			return null;
		}
	}
	
	public static IDictService getDictService() {
		try {
			return ServiceContainer.getInstance().getServiceComponent(IDictService.S_SERVICE_ID);
		} catch (ContainerException e) {
			S_LOGGER.error(e);
			return null;
		}
	}
}
