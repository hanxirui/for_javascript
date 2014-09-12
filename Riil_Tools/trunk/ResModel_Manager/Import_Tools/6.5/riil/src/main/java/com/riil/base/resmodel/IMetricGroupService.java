package com.riil.base.resmodel;

import java.util.List;
import java.util.Map;

import com.riil.base.resmodel.pojo.base.MetricGroupPojo;
import com.riil.core.dao.PageDataPojo;
import com.riil.core.dao.IQueryParam;
import com.riil.core.service.IService;
import com.riil.core.service.ServiceException;

public interface IMetricGroupService extends IService {

	/**
	 * <code>S_SERVICE_ID</code> - Service Bean ID.
	 */
	public static final String S_SERVICE_ID = "metricGroupService";

	/**
	 * create metricGroup info.
	 * 
	 * @param metricGroup
	 *            - metricGroup POJO object.
	 * @throws ServiceException
	 */
	abstract public void createMetricGroup(final MetricGroupPojo metricGroup)
			throws ServiceException;

	/**
	 * modify metricGroup info.
	 * 
	 * @param metricGroup
	 *            - metricGroup POJO object.
	 * @throws ServiceException
	 */
	abstract public void modifyMetricGroup(final MetricGroupPojo metricGroup)
			throws ServiceException;

	/**
	 * remove metricGroup by metricGroup ID.
	 * 
	 * @param String
	 *            metricGroupID - metricGroup ID.
	 * @throws ServiceException
	 */
	void removeMetricGroup(final String metricGroupID) throws ServiceException;

	/**
	 * remove all metricGroup info.
	 * 
	 * @throws ServiceException
	 */
	void removeAllMetricGroup() throws ServiceException;

	/**
	 * remove metricGroup info by condition.
	 * 
	 * @param condition
	 *            - remove metricGroup condition.
	 * @throws ServiceException
	 */
	void removeMetricGroup(final IQueryParam condition) throws ServiceException;

	/**
	 * get metricGroup by ID.
	 * 
	 * @param metricGroupID
	 *            - metricGroup ID.
	 * @return metricGroup POJO object or null.
	 * @throws ServiceException
	 */
	MetricGroupPojo getMetricGroupByID(final String metricGroupID)
			throws ServiceException;

	/**
	 * get metricGroup info by query.
	 * 
	 * @param condition
	 *            - query condition POJO object.
	 * @return metricGroup POJO object or null.
	 * @throws ServiceException
	 */
	MetricGroupPojo getMetricGroupByQuery(final IQueryParam condition)
			throws ServiceException;

	/**
	 * get all metricGroup info.
	 * 
	 * @return metricGroup POJO object collection.
	 * @throws ServiceException
	 */
	List<MetricGroupPojo> getAllMetricGroup() throws ServiceException;

	/**
	 * get metricGroup by query.
	 * 
	 * @param condition
	 *            - query condition POJO object.
	 * @return metricGroup info POJO object collection or null.
	 * @throws ServiceException.
	 */
	List<MetricGroupPojo> getMetricGroupsByQuery(final IQueryParam condition)
			throws ServiceException;

	/**
	 * get metricGroup by query for page.
	 * 
	 * @param condition
	 *            - query condition POJO object.
	 * @param pageIndex
	 *            - page index, first page index is 1.
	 * @param pageSize
	 *            - page size, default page size is 10.
	 * @return
	 * @throws ServiceException
	 */
	PageDataPojo<MetricGroupPojo> getMetricGroupPageByQuery(
			final IQueryParam condition) throws ServiceException;

	/**
	 * @param metricGroupId
	 * @param metricIds
	 * @throws ServiceException
	 */
	void createOrModifyMetricIds(String metricGroupId, List<String> metricIds)
			throws ServiceException;

	List<Map<String, String>> getAllGroupMetricRel() throws ServiceException;

}