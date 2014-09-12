package com.riil.base.resmodel.cacheloader;

import static com.riil.base.resmodel.tools.ResModelServiceLoader.getModelService;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.beanutils.BeanUtils;

import com.riil.base.resmodel.IModelService;
import com.riil.base.resmodel.pojo.mmodel.CachedPojoUtils;
import com.riil.base.resmodel.pojo.mmodel.ModelMetricBindingPojo;
import com.riil.core.cache.ICacheObjectLoader;
import com.riil.core.commons.ServerModule;
import com.riil.core.dao.DAOException;
import com.riil.core.logger.SystemLogger;
import com.riil.core.pojo.AbsPojo;

/**
 * ModelMetric对象的CacheLoder<br>
 * 用于加载数据到Cache <br>
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
public class ModelMetricCacheLoader implements ICacheObjectLoader<AbsPojo> {
	private static final SystemLogger S_LOGGER = SystemLogger.getSystemLogger(ModelMetricCacheLoader.class,
			ServerModule.ResourceModel);

	IModelService m_modelService;

	@Override
	public List<AbsPojo> loadAllCacheObject() throws DAOException {
		// 未避免加载过量，暂不支持加载全部
		return new ArrayList<AbsPojo>();
	}

	@Override
	public AbsPojo loadCacheObject(String cacheKey) throws DAOException {
		try {
			String t_modelId = CachedPojoUtils.getPrefix(cacheKey);
			String t_metricId = CachedPojoUtils.getSimpleId(t_modelId, cacheKey);
			ModelMetricBindingPojo t_metric = getModelService().getModelMetricBindingPojo(t_modelId,
					t_metricId);
			if(t_metric == null) return null;
			ModelMetricBindingPojo t_result = new ModelMetricBindingPojo();

			BeanUtils.copyProperties(t_result, t_metric);

			return t_result;
		} catch (Exception e) {
			S_LOGGER.error("loadCacheObject failed!", e);
		}

		return null;
	}

}