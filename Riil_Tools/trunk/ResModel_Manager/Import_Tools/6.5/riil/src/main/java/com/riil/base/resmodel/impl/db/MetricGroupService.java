package com.riil.base.resmodel.impl.db;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.riil.base.resmodel.IMetricGroupService;
import com.riil.base.resmodel.impl.db.dao.MetricGroupDao;
import com.riil.base.resmodel.pojo.base.MetricGroupPojo;
import com.riil.core.commons.Assert;
import com.riil.core.dao.DAOException;
import com.riil.core.dao.IQueryParam;
import com.riil.core.dao.PageDataPojo;
import com.riil.core.service.AbsService;
import com.riil.core.service.ServiceException;

public class MetricGroupService extends AbsService implements
		IMetricGroupService {

	/**
	 * <code>m_metricGroupDao</code> - DAO object.
	 */
	private MetricGroupDao m_metricGroupDao;

	public void setMetricGroupDao(final MetricGroupDao metricGroupDao) {
		this.m_metricGroupDao = metricGroupDao;
	}

	public MetricGroupDao getMetricGroupDao() {
		return this.m_metricGroupDao;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.riil.base.resmodel.IMetricGroupService#createMetricGroup
	 * (com.riil.base.resmodel.pojo.MetricGroupPojo)
	 */
	@Override
	public void createMetricGroup(final MetricGroupPojo metricGroup)
			throws ServiceException {

		Assert.notNull(metricGroup,
				"Create metricGroup is error , because parameter is null.");

		try {

			this.m_metricGroupDao.doInsertPojo(metricGroup);

		} catch (DAOException te) {
			throw new ServiceException(te);
		}

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.riil.base.resmodel.IMetricGroupService#modifyMetricGroup
	 * (com.riil.base.resmodel.pojo.MetricGroupPojo)
	 */
	@Override
	public void modifyMetricGroup(final MetricGroupPojo metricGroup)
			throws ServiceException {

		Assert.notNull(metricGroup,
				"Modify metricGroup info is error , because parameter is null.");

		try {

			this.m_metricGroupDao.doUpdatePojo(metricGroup);

		} catch (DAOException te) {
			throw new ServiceException(te);
		}

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.resmodel.IMetricGroupService#removeMetricGroup(java.lang
	 * .String)
	 */
	@Override
	public void removeMetricGroup(final String metricGroupID)
			throws ServiceException {

		Assert.hasLength(metricGroupID,
				"Remove metricGroup info is error , because parameter is null.");

		try {

			this.m_metricGroupDao.doDeleteByID(metricGroupID);

		} catch (DAOException te) {

			throw new ServiceException(te);
		}

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.riil.base.resmodel.IMetricGroupService#removeAllMetricGroup ()
	 */
	@Override
	public void removeAllMetricGroup() throws ServiceException {

		try {

			this.m_metricGroupDao.doDeleteAll();

		} catch (DAOException te) {

			throw new ServiceException(te);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.resmodel.IMetricGroupService#removeMetricGroup(com.riil
	 * .core.dao.I)
	 */
	@Override
	public void removeMetricGroup(final IQueryParam condition)
			throws ServiceException {

		Assert.notNull(condition,
				"Remove metricGroup is error , beacause remove condition is null.");

		try {

			this.m_metricGroupDao.doDeleteByQuery(condition);

		} catch (DAOException te) {

			throw new ServiceException(te);
		}

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.resmodel.IMetricGroupService#getMetricGroupByID(java.lang
	 * .String)
	 */
	@Override
	public MetricGroupPojo getMetricGroupByID(final String metricGroupID)
			throws ServiceException {

		Assert.hasLength(metricGroupID,
				"Get metricGroup info is error ,because metricGroup id is null.");

		try {
			return this.m_metricGroupDao.doSelectByID(metricGroupID);
		} catch (DAOException te) {

			throw new ServiceException(te);
		}

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.resmodel.IMetricGroupService#getMetricGroupByQuery(com.
	 * riil.core.dao.IQueryParam )
	 */
	@Override
	public MetricGroupPojo getMetricGroupByQuery(final IQueryParam condition)
			throws ServiceException {

		Assert.notNull(condition,
				"Get metricGroup info is error , beacause query condition is null.");

		try {
			return this.m_metricGroupDao.doSelectOneByQuery(condition);
		} catch (DAOException te) {

			throw new ServiceException(te);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.riil.base.resmodel.IMetricGroupService#getAllMetricGroup()
	 */
	@Override
	public List<MetricGroupPojo> getAllMetricGroup() throws ServiceException {

		try {
			return this.m_metricGroupDao.doSelectAll();
		} catch (DAOException te) {

			throw new ServiceException(te);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.resmodel.IMetricGroupService#getMetricGroupsByQuery(com
	 * .riil.core.dao.IQueryParam )
	 */
	@Override
	public List<MetricGroupPojo> getMetricGroupsByQuery(
			final IQueryParam condition) throws ServiceException {

		Assert.notNull(condition,
				"Get metricGroup info collection is error , beacause query condition is null.");

		try {
			return this.m_metricGroupDao.doSelectList(condition);
		} catch (DAOException te) {

			throw new ServiceException(te);
		}

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.resmodel.IMetricGroupService#getMetricGroupPageByQuery(
	 * com.riil.core.dao. IQueryParam, int, int)
	 */
	@Override
	public PageDataPojo<MetricGroupPojo> getMetricGroupPageByQuery(
			final IQueryParam condition) throws ServiceException {

		Assert.notNull(condition,
				"Get metricGroup info page data is error , beacause query condition is null.");

		try {
			return this.m_metricGroupDao.doSelectMetricGroup(condition);
		} catch (DAOException te) {

			throw new ServiceException(te);
		}
	}
	
	@Override
	public void createOrModifyMetricIds(String metricGroupId, List<String> metricIds) throws ServiceException {
		Assert.hasLength(metricGroupId,
		"createOrModifyMetricIds is error , because metricGroupId is null.");
		Assert.notNull(metricIds, "createOrModifyMetricIds is error , because metricIds is null.");
		
		try {
			this.m_metricGroupDao.doDeleteByID(metricGroupId, "delete_group_metric_rel_by_group");
			
			for(String metricId : metricIds) {
				Map<String, String> param = new HashMap<String, String>();
				param.put("metricGroupId", metricGroupId);
				param.put("metricId", metricId);
				this.m_metricGroupDao.doInsertMetricIds(param);
			}
		} catch (DAOException e) {
			throw new ServiceException(e);
		}
	}
	
	@Override
	public List<Map<String, String>> getAllGroupMetricRel() throws ServiceException {
		try {
			return this.m_metricGroupDao.doSelectAllGroupMetricRel();
		} catch (DAOException e) {
			throw new ServiceException(e);
		}
	}
	
	
	public void importBatch(List<MetricGroupPojo> list) throws ServiceException {
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
				m_metricGroupDao.insert(list.subList(from_index, to_index));
			}
		} catch (DAOException te) {
			throw new ServiceException(te);
		}
	}
	
}