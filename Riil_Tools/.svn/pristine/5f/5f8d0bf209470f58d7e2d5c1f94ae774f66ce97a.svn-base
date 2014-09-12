package com.riil.base.resmodel.impl.db;

import java.util.List;

import com.riil.base.resmodel.IModelMetricRelService;
import com.riil.base.resmodel.impl.db.dao.ModelMetricRelDao;
import com.riil.base.resmodel.pojo.base.ModelMetricRelPojo;
import com.riil.core.commons.Assert;
import com.riil.core.dao.DAOException;
import com.riil.core.dao.IQueryParam;
import com.riil.core.dao.PageDataPojo;
import com.riil.core.service.AbsService;
import com.riil.core.service.ServiceException;

/**
 * 简化模型--模型指标关联关系--数据库访问服务 <br>
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
public class ModelMetricRelService extends AbsService implements IModelMetricRelService {

	/**
	 * <code>m_modelMetricRelDao</code> - DAO object.
	 */
	private ModelMetricRelDao m_modelMetricRelDao;

	/*
	 * (non-Javadoc)
	 * @see com.riil.base.resmodel.IModelMetricRelService#createBatch(java.util.List)
	 */
	@Override
	public void createBatch(List<ModelMetricRelPojo> list) throws ServiceException {
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
				for(ModelMetricRelPojo modelMetricRel : list.subList(from_index, to_index)){
					this.m_modelMetricRelDao.doInsertPojo(modelMetricRel);
				}
//				this.m_modelMetricRelDao.doBatchInsertPojo(list.subList(from_index, to_index));
			}
		} catch (DAOException te) {
			throw new ServiceException(te);
		}
	}
	
	public void importBatch(List<ModelMetricRelPojo> list) throws ServiceException {
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
//				this.m_modelMetricRelDao.doBatchInsertPojo(list.subList(from_index, to_index));
				m_modelMetricRelDao.insert(list.subList(from_index, to_index));
			}
		} catch (DAOException te) {
			throw new ServiceException(te);
		}
	}

	/*
	 * (non-Javadoc)
	 * @see com.riil.base.resmodel.IModelMetricRelService#createModelMetricRel
	 * (com.riil.base.resmodel.pojo.ModelMetricRelPojo)
	 */
	@Override
	public void createModelMetricRel(final ModelMetricRelPojo modelMetricRel) throws ServiceException {

		Assert.notNull(modelMetricRel, "Create modelMetricRel is error , because parameter is null.");

		try {

			this.m_modelMetricRelDao.doInsertPojo(modelMetricRel);

		} catch (DAOException te) {
			throw new ServiceException(te);
		}

	}

	/*
	 * (non-Javadoc)
	 * @see com.riil.base.resmodel.IModelMetricRelService#getAllModelMetricRel()
	 */
	@Override
	public List<ModelMetricRelPojo> getAllModelMetricRel() throws ServiceException {

		try {
			return this.m_modelMetricRelDao.doSelectAll();
		} catch (DAOException te) {

			throw new ServiceException(te);
		}
	}

	/*
	 * (non-Javadoc)
	 * @see com.riil.base.resmodel.IModelMetricRelService#getModelMetricRelByID(java .lang.String)
	 */
	@Override
	public ModelMetricRelPojo getModelMetricRelByID(final String modelMetricRelID) throws ServiceException {

		Assert.hasLength(modelMetricRelID, "Get modelMetricRel info is error ,because modelMetricRel id is null.");

		try {
			return this.m_modelMetricRelDao.doSelectByID(modelMetricRelID);
		} catch (DAOException te) {

			throw new ServiceException(te);
		}

	}

	/*
	 * (non-Javadoc)
	 * @see com.riil.base.resmodel.IModelMetricRelService#getModelMetricRelByQuery (com.riil.core.dao.IQueryParam )
	 */
	@Override
	public ModelMetricRelPojo getModelMetricRelByQuery(final IQueryParam condition) throws ServiceException {

		Assert.notNull(condition, "Get modelMetricRel info is error , beacause query condition is null.");

		try {
			return this.m_modelMetricRelDao.doSelectOneByQuery(condition);
		} catch (DAOException te) {

			throw new ServiceException(te);
		}
	}

	public ModelMetricRelDao getModelMetricRelDao() {
		return this.m_modelMetricRelDao;
	}

	/*
	 * (non-Javadoc)
	 * @see com.riil.base.resmodel.IModelMetricRelService#getModelMetricRelPageByQuery (com.riil.core.dao. IQueryParam,
	 * int, int)
	 */
	@Override
	public PageDataPojo<ModelMetricRelPojo> getModelMetricRelPageByQuery(final IQueryParam condition)
			throws ServiceException {

		Assert.notNull(condition, "Get modelMetricRel info page data is error , beacause query condition is null.");

		try {
			return this.m_modelMetricRelDao.doPageSelect(condition);
		} catch (DAOException te) {

			throw new ServiceException(te);
		}
	}

	/*
	 * (non-Javadoc)
	 * @see com.riil.base.resmodel.IModelMetricRelService#getModelMetricRelsByQuery (com.riil.core.dao.IQueryParam )
	 */
	@Override
	public List<ModelMetricRelPojo> getModelMetricRelsByQuery(final IQueryParam condition) throws ServiceException {

		Assert.notNull(condition, "Get modelMetricRel info collection is error , beacause query condition is null.");

		try {
			return this.m_modelMetricRelDao.doSelectList(condition);
		} catch (DAOException te) {

			throw new ServiceException(te);
		}

	}

	/*
	 * (non-Javadoc)
	 * @see com.riil.base.resmodel.IModelMetricRelService#modifyModelMetricRel
	 * (com.riil.base.resmodel.pojo.ModelMetricRelPojo)
	 */
	@Override
	public void modifyModelMetricRel(final ModelMetricRelPojo modelMetricRel) throws ServiceException {

		Assert.notNull(modelMetricRel, "Modify modelMetricRel info is error , because parameter is null.");

		try {

			this.m_modelMetricRelDao.doUpdatePojo(modelMetricRel);

		} catch (DAOException te) {
			throw new ServiceException(te);
		}

	}

	/*
	 * (non-Javadoc)
	 * @see com.riil.base.resmodel.IModelMetricRelService#removeAllModelMetricRel ()
	 */
	@Override
	public void removeAllModelMetricRel() throws ServiceException {

		try {

			this.m_modelMetricRelDao.doDeleteAll();

		} catch (DAOException te) {

			throw new ServiceException(te);
		}
	}

	/*
	 * (non-Javadoc)
	 * @see com.riil.base.resmodel.IModelMetricRelService#removeModelMetricRel(java .lang.String)
	 */
	@Override
	public void removeModelMetricRel(final String modelMetricRelID) throws ServiceException {

		Assert.hasLength(modelMetricRelID, "Remove modelMetricRel info is error , because parameter is null.");

		try {

			this.m_modelMetricRelDao.doDeleteByID(modelMetricRelID);

		} catch (DAOException te) {

			throw new ServiceException(te);
		}

	}

	public void setModelMetricRelDao(final ModelMetricRelDao modelMetricRelDao) {
		this.m_modelMetricRelDao = modelMetricRelDao;
	}

	@Override
	public void removeByModelId(String modelId) throws ServiceException {
		Assert.hasLength(modelId, "Remove modelMetricRel info is error , because parameter is null.");

		try {

			this.m_modelMetricRelDao.doDeleteByModelId(modelId);

		} catch (DAOException te) {

			throw new ServiceException(te);
		}

	}

}