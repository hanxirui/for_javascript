package com.riil.base.resconf;

import java.util.ArrayList;
import java.util.List;

import org.springframework.util.CollectionUtils;

import com.riil.base.resconf.pojo.MoniUserConfigPojo;
import com.riil.base.resmodel.IModelService;
import com.riil.base.resmodel.impl.file.BinFileUtils;
import com.riil.base.resmodel.pojo.mmodel.Model;
import com.riil.core.container.ContainerException;
import com.riil.core.container.ServiceContainer;
import com.riil.core.service.ServiceException;

public class ImportResUserConf {
	public void importAll() throws ServiceException, ContainerException {
		testCreateUserConf();
	}

	public void testCreateUserConf() throws ContainerException, ServiceException {
		BinFileUtils.setLazyLoad(false);
		IMoniUserConfigService t_confSrv = ServiceContainer.getInstance().getServiceComponent(
				IMoniUserConfigService.S_SERVICE_ID);
		IModelService t_modelService = ServiceContainer.getInstance().getServiceComponent(IModelService.S_SERVICE_ID);
		List<Model> modelList = t_modelService.getAllModel();
		List<MoniUserConfigPojo> t_confList = new ArrayList<MoniUserConfigPojo>();
		for (Model modelPojo : modelList) {
			MoniUserConfigPojo t_pojo = toMoniUserConfigPojo(modelPojo);
			if (null != t_pojo) {
				t_confList.add(t_pojo);
			}
			// t_confSrv.createMoniUserConfig(t_pojo);
		}
		t_confSrv.removeAllMoniUserConfig();
		if (!CollectionUtils.isEmpty(t_confList)) {
			t_confSrv.createBatch(t_confList);
		}
	}
	@Deprecated
	public MoniUserConfigPojo toMoniUserConfigPojo(Model modelPojo) throws ContainerException, ServiceException {
//		ITemplateService t_tempSrv = ServiceContainer.getInstance().getServiceComponent(ITemplateService.S_SERVICE_ID);
//
//		List<ModelMetricBindingPojo> listMetricBind = modelPojo.gainListModelMetricBindingPojo();
//		String t_tempId = modelPojo.getMoniTempId();
//		Template tempPojo = t_tempSrv.getTemplate(t_tempId);
//		if (tempPojo.isMain()) {
//			return null;
//		}
//		StringBuilder sbTemp = new StringBuilder();
//		for (ModelMetricBindingPojo metricBind : listMetricBind) {
//			String metricId = metricBind.getMetricId();
//			if (StringUtils.isBlank(metricId)) {
//				continue;
//			}
//			if (metricId.equals(MetricId4Common.AvailStatus.getId())) {
//				continue;
//			}
//
//			TempMetricPojo metric = tempPojo.gainTempMetricPojo(metricId);
//			if (metric.getIsDisplay() != Constants.TRUE) {
//				continue;
//			}
//			if (metric.getIsImportant() == Constants.TRUE) {
//				if (sbTemp.length() > 0) {
//					sbTemp.append(",");
//				}
//				sbTemp.append(metricId);
//			}
//		}
//		if (sbTemp.length() > 0) {
//			MoniUserConfigPojo t_ret = new MoniUserConfigPojo();
//			t_ret.setUserId("default");
//			t_ret.setResId("default");
//			t_ret.setModelId(modelPojo.getId());
//			t_ret.setType("metricIds");
//			t_ret.setConfig(sbTemp.toString());
//			return t_ret;
//		}
		return null;

	}

	public static void main(String[] args) throws ServiceException, ContainerException {
		((ServiceContainer) ServiceContainer.getInstance()).initialize();
		ImportResUserConf tools = new ImportResUserConf();
		tools.importAll();
	}
}
