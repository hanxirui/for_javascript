package com.riil.base.resmodel;

import java.util.List;

import com.riil.base.resmodel.pojo.base.ModelMetricRelPojo;
import com.riil.core.dao.IQueryParam;
import com.riil.core.dao.PageDataPojo;
import com.riil.core.service.IService;
import com.riil.core.service.ServiceException;

public interface IModelMetricRelService extends IService {

	/**
	 * <code>S_SERVICE_ID</code> - Service Bean ID.
	 */
	public static final String S_SERVICE_ID = "modelMetricRelService";

	/**
	 * {method description}.
	 * 
	 * @param t_insertList
	 * @throws ServiceException
	 */
	void createBatch(List<ModelMetricRelPojo> t_insertList) throws ServiceException;

	/**
	 * create modelMetricRel info.
	 * 
	 * @param modelMetricRel - modelMetricRel POJO object.
	 * @throws ServiceException
	 */
	void createModelMetricRel(final ModelMetricRelPojo modelMetricRel) throws ServiceException;

	/**
	 * get all modelMetricRel info.
	 * 
	 * @return modelMetricRel POJO object collection.
	 * @throws ServiceException
	 */
	List<ModelMetricRelPojo> getAllModelMetricRel() throws ServiceException;

	/**
	 * get modelMetricRel by ID.
	 * 
	 * @param modelMetricRelID - modelMetricRel ID.
	 * @return modelMetricRel POJO object or null.
	 * @throws ServiceException
	 */
	ModelMetricRelPojo getModelMetricRelByID(final String modelMetricRelID) throws ServiceException;

	/**
	 * get modelMetricRel info by query.
	 * 
	 * @param condition - query condition POJO object.
	 * @return modelMetricRel POJO object or null.
	 * @throws ServiceException
	 */
	ModelMetricRelPojo getModelMetricRelByQuery(final IQueryParam condition) throws ServiceException;

	/**
	 * get modelMetricRel by query for page.
	 * 
	 * @param condition - query condition POJO object.
	 * @param pageIndex - page index, first page index is 1.
	 * @param pageSize - page size, default page size is 10.
	 * @return
	 * @throws ServiceException
	 */
	PageDataPojo<ModelMetricRelPojo> getModelMetricRelPageByQuery(final IQueryParam condition) throws ServiceException;

	/**
	 * get modelMetricRel by query.
	 * 
	 * @param condition - query condition POJO object.
	 * @return modelMetricRel info POJO object collection or null.
	 * @throws ServiceException.
	 */
	List<ModelMetricRelPojo> getModelMetricRelsByQuery(final IQueryParam condition) throws ServiceException;

	/**
	 * modify modelMetricRel info.
	 * 
	 * @param modelMetricRel - modelMetricRel POJO object.
	 * @throws ServiceException
	 */
	void modifyModelMetricRel(final ModelMetricRelPojo modelMetricRel) throws ServiceException;

	/**
	 * remove all modelMetricRel info.
	 * 
	 * @throws ServiceException
	 */
	void removeAllModelMetricRel() throws ServiceException;

	/**
	 * remove modelMetricRel by modelMetricRel ID.
	 * 
	 * @param String modelMetricRelID - modelMetricRel ID.
	 * @throws ServiceException
	 */
	void removeByModelId(final String modelId) throws ServiceException;

	/**
	 * remove modelMetricRel by modelMetricRel ID.
	 * 
	 * @param String modelMetricRelID - modelMetricRel ID.
	 * @throws ServiceException
	 */
	void removeModelMetricRel(final String modelMetricRelID) throws ServiceException;

}