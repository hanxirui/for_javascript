package com.riil.base.resmodel.impl.db;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.riil.base.pojo.enums.EnumRoot.MetricType;
import com.riil.base.resmodel.IMetricBaseService;
import com.riil.base.resmodel.impl.db.dao.MetricBaseDao;
import com.riil.base.resmodel.impl.db.dao.MetricGroupDao;
import com.riil.base.resmodel.pojo.ModelQueryParam;
import com.riil.base.resmodel.pojo.base.MetricBasePojo;
import com.riil.base.resmodel.pojo.base.ModelMetricViewPojo;
import com.riil.core.commons.Assert;
import com.riil.core.constant.Constants;
import com.riil.core.dao.DAOException;
import com.riil.core.dao.IQueryParam;
import com.riil.core.dao.PageDataPojo;
import com.riil.core.service.AbsService;
import com.riil.core.service.ServiceException;

/**
 * 简化模型--指标基础信息数据库访问服务<br>
 * <p>
 * Create on : 2011-12-11<br>
 * <p>
 * </p>
 * <br>
 * 
 * @author panhongliang@ruijie.com.cn<br>
 * @version riil.resmodel.impl v6.0
 *          <p>
 *          <br>
 *          <strong>Modify History:</strong><br>
 *          user modify_date modify_content<br>
 *          -------------------------------------------<br>
 *          <br>
 */
public class MetricBaseService extends AbsService implements IMetricBaseService {

	/**
	 * <code>m_metricBaseDao</code> - DAO object.
	 */
	private MetricBaseDao m_metricBaseDao;
	
	private MetricGroupDao m_metricGroupDao;

	/*
	 * (non-Javadoc)
	 * @see com.riil.base.resmodel.IMetricBaseService#createBatch(java.util.List)
	 */
	@Override
	public void createBatch(List<MetricBasePojo> list) throws ServiceException {
		if (list == null || list.isEmpty()) {
			return;
		}
		try {
			int batchResSize = 1000;// 每次入库数
			int resCount = list.size();// 总资源数
			int loopCount = (int) Math.ceil(resCount * 1d / batchResSize);// 循环次数
			// 导入资源实例
			for (int i = 0; i < loopCount; i++) {
				int from_index = batchResSize * i;
				int to_index = batchResSize * (i + 1);
				if (to_index > resCount) {
					to_index = resCount;
				}
				
				for(MetricBasePojo metricBase : list.subList(from_index, to_index)){
					this.m_metricBaseDao.doInsertPojo(metricBase);
				}
//				this.m_metricBaseDao.doBatchInsertPojo(list.subList(from_index, to_index));
			}
		} catch (DAOException te) {
			throw new ServiceException(te);
		}
	}
	
	public void importBatch(List<MetricBasePojo> list) throws ServiceException {
		if (list == null || list.isEmpty()) {
			return;
		}
		try {
			int batchResSize = 1000;// 每次入库数
			int resCount = list.size();// 总资源数
			int loopCount = (int) Math.ceil(resCount * 1d / batchResSize);// 循环次数
			// 导入资源实例
			for (int i = 0; i < loopCount; i++) {
				int from_index = batchResSize * i;
				int to_index = batchResSize * (i + 1);
				if (to_index > resCount) {
					to_index = resCount;
				}
				
//				this.m_metricBaseDao.doBatchInsertPojo(list.subList(from_index, to_index));
				m_metricBaseDao.insert(list.subList(from_index, to_index));
			}
		} catch (DAOException te) {
			throw new ServiceException(te);
		}
	}

	/*
	 * (non-Javadoc)
	 * @see com.riil.base.resmodel.impl.db.IMetricBaseService#createMetricBase
	 * (com.riil.base.resmodel.pojo.base.MetricBasePojo)
	 */
	@Override
	public void createMetricBase(final MetricBasePojo metricBase) throws ServiceException {

		Assert.notNull(metricBase, "Create metricBase is error , because parameter is null.");

		try {

			this.m_metricBaseDao.doInsertPojo(metricBase);

		} catch (DAOException te) {
			throw new ServiceException(te);
		}

	}

	/*
	 * (non-Javadoc)
	 * @see com.riil.base.resmodel.impl.db.IMetricBaseService#getAllMetricBase()
	 */
	@Override
	public List<MetricBasePojo> getAllMetricBase() throws ServiceException {

		try {
			return this.m_metricBaseDao.doSelectAll();
		} catch (DAOException te) {

			throw new ServiceException(te);
		}
	}

	/*
	 * (non-Javadoc)
	 * @see com.riil.base.resmodel.IMetricBaseService#getAllMetricBaseByModelId(java .lang.String)
	 */
	@Override
	public List<MetricBasePojo> getAllMetricBaseByModelId(String modelId) throws ServiceException {

		try {
			return this.m_metricBaseDao.doSelectListByModelId(modelId);
		} catch (DAOException te) {
			throw new ServiceException(te);
		}
	}

	@Override
	public List<MetricBasePojo> getByMetricIds(List<String> ids, String resTypeId) throws ServiceException {
		try {
			ModelQueryParam param = new ModelQueryParam();
			param.setIds(ids);
			param.setResTypeId(resTypeId);

			// param.setSortColumn("metric.C_METRIC_TYPE", SORT.ASC);
			return m_metricBaseDao.doSelectByIdsAndResTypeId(param);
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}
	
	public List<MetricBasePojo> getByMetricIds(List<String> ids) throws ServiceException {
		try {
			ModelQueryParam param = new ModelQueryParam();
			param.setIds(ids);
			return m_metricBaseDao.doSelectByIds(param);
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}
	
	/*
	 * (non-Javadoc)
	 * @see com.riil.base.resmodel.IMetricBaseService#getMetricBase4Important(java .lang.String)
	 */
	@Override
	public List<MetricBasePojo> getMetricBase4ImportantByModelId(String modelId) throws ServiceException {
		try {
			ModelMetricViewPojo param = new ModelMetricViewPojo();
			//param.setIsImportant((byte) 1);
			param.setModelId(modelId);
			//param.setIsDisplay(Constants.TRUE);
			return this.m_metricBaseDao.doSelectList(param);
		} catch (DAOException te) {
			throw new ServiceException(te);
		}
	}

	/*
	 * (non-Javadoc)
	 * @see com.riil.base.resmodel.impl.db.IMetricBaseService#getMetricBaseByID(java .lang.String)
	 */
	@Override
	public MetricBasePojo getMetricBaseByID(final String metricBaseID) throws ServiceException {

		// Assert.hasLength(metricBaseID,
		// "Get metricBase info is error ,because metricBase id is null.");
		// @SuppressWarnings("unchecked")
		// ICache<String, MetricBasePojo> t_cache =
		// CacheManager.getInstance().getCache(MetricBasePojo.S_CACHE_KEY);
		// if (t_cache != null) {
		// return t_cache.get(metricBaseID);
		// }
		try {
			return this.m_metricBaseDao.doSelectByID(metricBaseID);
		} catch (DAOException te) {

			throw new ServiceException(te);
		}

	}

	/*
	 * (non-Javadoc)
	 * @see com.riil.base.resmodel.IMetricBaseService#getMetricBaseByMetricGroup( java.lang.String, java.lang.String)
	 */
	@Override
	public List<MetricBasePojo> getMetricBaseByMetricGroup(String modelId, String metricGroupId)
			throws ServiceException {
		try {
			ModelMetricViewPojo param = new ModelMetricViewPojo();
			param.setModelId(modelId);
			param.setMetricGroupId(metricGroupId);
			//param.setMetricGroupId(metricGroupId);
			//param.setIsDisplay(Constants.TRUE);
			return this.m_metricBaseDao.doSelectList(param);
		} catch (DAOException te) {
			throw new ServiceException(te);
		}
	}

	/*
	 * (non-Javadoc)
	 * @see com.riil.base.resmodel.IMetricBaseService#getMetricBaseByMoniTemp(java .lang.String)
	 */
	@Override
	public List<MetricBasePojo> getMetricBaseByResTypeId(String resTypeID) throws ServiceException {
		try {
			return this.m_metricBaseDao.doSelectByResTypeIdAndMetricType(resTypeID, null);
		} catch (DAOException te) {

			throw new ServiceException(te);
		}
	}

	@Override
	public List<MetricBasePojo> getAllMetricBaseByResTypeIdAndMetricId(String resTypeId, String metricId)
			throws ServiceException {
		return getMetricBaseByResTypeIdAndMetricIdAndisDisplay(resTypeId, metricId, Constants.TRUE);
	}
	
	@Override
	public MetricBasePojo getMetricBaseByModelIdAndMetricId(String modelId, String metricId)
			throws ServiceException {
			Assert.notNull(modelId);
			Assert.notNull(metricId);
			try {
				return this.m_metricBaseDao.doSelectByModelIdAndMetricId(modelId, metricId);
			} catch (DAOException te) {
				throw new ServiceException(te);
			}
			
	}
	
	@Override
	public List<MetricBasePojo> getMetricBaseByResTypeIdAndMetricIdAndisDisplay(String resTypeId, String metricId, int isDisplay) throws ServiceException{
		Assert.notNull(resTypeId);
		Assert.notNull(metricId);

		try {
			ModelMetricViewPojo param = new ModelMetricViewPojo();
			param.setMetricId(metricId);
			param.setResTypeId(resTypeId);
//			param.setMoniTempId(moniTempId);
//			param.setMetricId(metricId);
			return this.m_metricBaseDao.doSelectList(param);
		} catch (DAOException te) {

			throw new ServiceException(te);
		}
	}

	@Override
	public List<MetricBasePojo> getMetricBaseByResTypeIdAndMetricType(String resTypeId, MetricType metricType)
			throws ServiceException {
		Assert.notNull(resTypeId);
		Assert.notNull(metricType);

		try {
			return this.m_metricBaseDao.doSelectByResTypeIdAndMetricType(resTypeId, metricType.getId());
		} catch (DAOException te) {

			throw new ServiceException(te);
		}
	}

	/*
	 * (non-Javadoc)
	 * @see com.riil.base.resmodel.impl.db.IMetricBaseService#getMetricBaseByQuery (com.riil.core.dao.IQueryParam )
	 */
	@Override
	public MetricBasePojo getMetricBaseByQuery(final IQueryParam condition) throws ServiceException {

		Assert.notNull(condition, "Get metricBase info is error , beacause query condition is null.");

		try {
			return this.m_metricBaseDao.doSelectOneByQuery(condition);
		} catch (DAOException te) {

			throw new ServiceException(te);
		}
	}

	public MetricBaseDao getMetricBaseDao() {
		return this.m_metricBaseDao;
	}

	/*
	 * (non-Javadoc)
	 * @see com.riil.base.resmodel.impl.db.IMetricBaseService#getMetricBasePageByQuery (com.riil.core.dao. IQueryParam,
	 * int, int)
	 */
	@Override
	public PageDataPojo<MetricBasePojo> getMetricBasePageByQuery(final IQueryParam condition) throws ServiceException {

		Assert.notNull(condition, "Get metricBase info page data is error , beacause query condition is null.");

		try {
			return this.m_metricBaseDao.doPageSelect(condition);
		} catch (DAOException te) {

			throw new ServiceException(te);
		}
	}

	/*
	 * (non-Javadoc)
	 * @see com.riil.base.resmodel.IMetricBaseService#getMetricBasesByModelAndMetricType (java.lang.String,
	 * java.lang.String)
	 */
	@Override
	public List<MetricBasePojo> getMetricBasesByModelAndMetricType(String modelId, String metricType)
			throws ServiceException {
		try {
			
			ModelMetricViewPojo param = new ModelMetricViewPojo();
			param.setModelId(modelId);
			param.setMetricType(metricType);
			return this.m_metricBaseDao.doSelectList(param);
			// MetricBasePojo t_metric = new MetricBasePojo();
			// t_metric.setMetricType(metricType);
			// t_metric.setModelId(modelId);
			// return this.m_metricBaseDao.doSelectList(t_metric);
		} catch (DAOException te) {

			throw new ServiceException(te);
		}
	}

	@Override
	public List<MetricBasePojo> getMetricBasesByModelAndMetricTypes(String modelId, List<String> metricTypes)
			throws ServiceException {
		try {
			ModelMetricViewPojo param = new ModelMetricViewPojo();
			param.setModelId(modelId);
			param.setMetricTypes(metricTypes);
			
			return this.m_metricBaseDao.doSelectList(param);
		} catch (DAOException te) {

			throw new ServiceException(te);
		}
	}

	/*
	 * (non-Javadoc)
	 * @see com.riil.base.resmodel.impl.db.IMetricBaseService#getMetricBasesByQuery (com.riil.core.dao.IQueryParam )
	 */
	@Override
	public List<MetricBasePojo> getMetricBasesByQuery(final IQueryParam condition) throws ServiceException {

		Assert.notNull(condition, "Get metricBase info collection is error , beacause query condition is null.");

		try {
			return this.m_metricBaseDao.doSelectList(condition);
		} catch (DAOException te) {

			throw new ServiceException(te);
		}

	}

	/*
	 * (non-Javadoc)
	 * @see com.riil.base.resmodel.impl.db.IMetricBaseService#modifyMetricBase
	 * (com.riil.base.resmodel.pojo.base.MetricBasePojo)
	 */
	@Override
	public void modifyMetricBase(final MetricBasePojo metricBase) throws ServiceException {

		Assert.notNull(metricBase, "Modify metricBase info is error , because parameter is null.");

		try {

			this.m_metricBaseDao.doUpdatePojo(metricBase);

		} catch (DAOException te) {
			throw new ServiceException(te);
		}

	}

	/*
	 * (non-Javadoc)
	 * @see com.riil.base.resmodel.impl.db.IMetricBaseService#removeAllMetricBase ()
	 */
	@Override
	public void removeAllMetricBase() throws ServiceException {

		try {

			this.m_metricBaseDao.doDeleteAll();

		} catch (DAOException te) {

			throw new ServiceException(te);
		}
	}

	/*
	 * (non-Javadoc)
	 * @see com.riil.base.resmodel.impl.db.IMetricBaseService#removeMetricBase(com .riil.core.dao.I)
	 */
	@Override
	public void removeMetricBase(final IQueryParam condition) throws ServiceException {

		Assert.notNull(condition, "Remove metricBase is error , beacause remove condition is null.");

		try {

			this.m_metricBaseDao.doDeleteByQuery(condition);

		} catch (DAOException te) {

			throw new ServiceException(te);
		}

	}

	/*
	 * (non-Javadoc)
	 * @see com.riil.base.resmodel.impl.db.IMetricBaseService#removeMetricBase(java .lang.String)
	 */
	@Override
	public void removeMetricBase(final String metricBaseID) throws ServiceException {

		Assert.hasLength(metricBaseID, "Remove metricBase info is error , because parameter is null.");

		try {

			this.m_metricBaseDao.doDeleteByID(metricBaseID);

		} catch (DAOException te) {

			throw new ServiceException(te);
		}

	}

	public void setMetricBaseDao(final MetricBaseDao metricBaseDao) {
		this.m_metricBaseDao = metricBaseDao;
	}

	@Override
	public void removeByTempId(String tempId) throws ServiceException {
		Assert.hasLength(tempId, "Remove metricBase info is error , because parameter is null.");

		try {

			this.m_metricBaseDao.doDeleteByTempId(tempId);

		} catch (DAOException te) {

			throw new ServiceException(te);
		}

	}
	
	@Override
	public void createOrModifyMetricGroupIds(String metricId,
			List<String> metricGroupIds) throws ServiceException {
		Assert.hasLength(metricId,"createOrModifyMetricGroupIds is error , because metricId is null.");
		Assert.notNull(metricGroupIds,"createOrModifyMetricGroupIds is error , because metricGroupIds is null.");
		try {
			this.m_metricGroupDao.doDeleteByID(metricId,"delete_group_metric_rel_by_metric");
			for (String metricGroupId : metricGroupIds) {
				Map<String, String> param = new HashMap<String, String>();
				param.put("metricGroupId", metricGroupId);
				param.put("metricId", metricId);
				this.m_metricGroupDao.doInsertMetricIds(param);
			}
		} catch (DAOException e) {
			throw new ServiceException(e);
		}
	}
	
	public void setMetricGroupDao(MetricGroupDao metricGroupDao) {
		m_metricGroupDao = metricGroupDao;
	}

}