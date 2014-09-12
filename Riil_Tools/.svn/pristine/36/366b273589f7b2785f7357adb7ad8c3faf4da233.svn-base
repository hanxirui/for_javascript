package com.riil.base.resmodel;

import java.util.List;

import com.riil.base.pojo.enums.EnumRoot.MetricType;
import com.riil.base.resmodel.pojo.base.MetricBasePojo;
import com.riil.core.dao.IQueryParam;
import com.riil.core.dao.PageDataPojo;
import com.riil.core.service.IService;
import com.riil.core.service.ServiceException;

/**
 * 指标基础信息服务接口 <br>
 * <p>
 * Create on : 2011-11-10<br>
 * <p>
 * </p>
 * <br>
 * 
 * @author panhongliang@ruijie.com.cn<br>
 * @version riil.base.resmodel.api v6.0
 *          <p>
 *          <br>
 *          <strong>Modify History:</strong><br>
 *          user modify_date modify_content<br>
 *          -------------------------------------------<br>
 *          <br>
 */
public interface IMetricBaseService extends IService {

	/**
	 * <code>S_SERVICE_ID</code> - Service Bean ID.
	 */
	public static final String S_SERVICE_ID = "metricBaseService";

	/**
	 * batch create pojo info.
	 * 
	 * @param eventBase - eventBase POJO object.
	 * @throws ServiceException
	 */
	void createBatch(final List<MetricBasePojo> list) throws ServiceException;

	/**
	 * create metricBase info.
	 * 
	 * @param metricBase - metricBase POJO object.
	 * @throws ServiceException
	 */
	void createMetricBase(final MetricBasePojo metricBase) throws ServiceException;
	
	void createOrModifyMetricGroupIds(String metricId, List<String> metricGroupIds) throws ServiceException;
	
	/**
	 * get all metricBase info.
	 * 
	 * @return metricBase POJO object collection.
	 * @throws ServiceException
	 */
	List<MetricBasePojo> getAllMetricBase() throws ServiceException;

	/**
	 * 资源一览 获取某个监控模型的所有指标
	 * 
	 * @param modelId
	 * @return
	 * @throws ServiceException
	 */
	List<MetricBasePojo> getAllMetricBaseByModelId(final String modelId) throws ServiceException;

	/**
	 * get metricBase by IDs.
	 * 
	 * @param metriIds
	 * @return MetricBasePojo POJO object or null.
	 * @throws ServiceException
	 */
	@Deprecated
	List<MetricBasePojo> getByMetricIds(final List<String> metricIds, final String resTypeId) throws ServiceException;
	
	/**
	 * get metricBase by IDs.
	 * 
	 * @param metriIds
	 * @return MetricBasePojo POJO object or null.
	 * @throws ServiceException
	 */
	List<MetricBasePojo> getByMetricIds(final List<String> metricIds) throws ServiceException;

	/**
	 * 资源一览 获取某个监控模型，重要的指标列表
	 * 
	 * @throws ServiceException
	 */
	@Deprecated
	List<MetricBasePojo> getMetricBase4ImportantByModelId(final String modelId) throws ServiceException;

	/**
	 * get metricBase by ID.
	 * 
	 * @param metricBaseID - metricBase ID.
	 * @return metricBase POJO object or null.
	 * @throws ServiceException
	 */
	MetricBasePojo getMetricBaseByID(final String metricBaseId) throws ServiceException;

	/**
	 * get metric base info by metric group.
	 * 
	 * @param modelID
	 * @param groupID
	 * @return
	 * @throws ServiceException
	 */
	List<MetricBasePojo> getMetricBaseByMetricGroup(String modelId, String groupId) throws ServiceException;

	/**
	 * get metric base info by monitor template.
	 * 
	 * @param resTypeId - monitor template id.
	 * @return MetricBaseinfoPojo collection or null.
	 * @throws ServiceException
	 */
	List<MetricBasePojo> getMetricBaseByResTypeId(String resTypeId) throws ServiceException;

	/**
	 * get metric base info by monitor template and metric id.
	 * 
	 * @param resTypeId - monitor template id.
	 * @return MetricBaseinfoPojo collection or null.
	 * @throws ServiceException
	 */
	List<MetricBasePojo> getAllMetricBaseByResTypeIdAndMetricId(final String resTypeId, final String metricId)
			throws ServiceException;
	
	/**
	 * Get metric base info by modelId and metricId
	 * @param modelId mode Id
	 * @param metricId metric Id
	 * @return metric base info 
	 * @throws ServiceException
	 */
	MetricBasePojo getMetricBaseByModelIdAndMetricId(final String modelId, final String metricId)
			throws ServiceException;
	
	@Deprecated
	List<MetricBasePojo> getMetricBaseByResTypeIdAndMetricIdAndisDisplay(String resTypeId, String metricId, int isDisplay) throws ServiceException;
	
	/**
	 * get metric base info by monitor template and metric type.
	 * 
	 * @param resTypeId - monitor template id.
	 * @return MetricBaseinfoPojo collection or null.
	 * @throws ServiceException
	 */
	List<MetricBasePojo> getMetricBaseByResTypeIdAndMetricType(String resTypeId, final MetricType metricType)
			throws ServiceException;

	/**
	 * get metricBase info by query.
	 * 
	 * @param condition - query condition POJO object.
	 * @return metricBase POJO object or null.
	 * @throws ServiceException
	 */
	MetricBasePojo getMetricBaseByQuery(final IQueryParam condition) throws ServiceException;

	/**
	 * get metricBase by query for page.
	 * 
	 * @param condition - query condition POJO object.
	 * @param pageIndex - page index, first page index is 1.
	 * @param pageSize - page size, default page size is 10.
	 * @return
	 * @throws ServiceException
	 */
	PageDataPojo<MetricBasePojo> getMetricBasePageByQuery(final IQueryParam condition) throws ServiceException;

	/********************************************************/
	/**
	 * 资源一览 获取某个监控模型，特定类型的指标列表，如所有的性能指标
	 * 
	 * @throws ServiceException
	 */
	List<MetricBasePojo> getMetricBasesByModelAndMetricType(final String modelId, final String metricType)
			throws ServiceException;

	/**
	 * 资源一览 获取某个监控模型，特定类型的指标列表，如所有的性能指标
	 * 
	 * @throws ServiceException
	 */
	List<MetricBasePojo> getMetricBasesByModelAndMetricTypes(final String modelId, final List<String> metricTypes)
			throws ServiceException;

	/**
	 * get metricBase by query.
	 * 
	 * @param condition - query condition POJO object.
	 * @return metricBase info POJO object collection or null.
	 * @throws ServiceException.
	 */
	List<MetricBasePojo> getMetricBasesByQuery(final IQueryParam condition) throws ServiceException;

	/**
	 * modify metricBase info.
	 * 
	 * @param metricBase - metricBase POJO object.
	 * @throws ServiceException
	 */
	void modifyMetricBase(final MetricBasePojo metricBase) throws ServiceException;

	/**
	 * remove all metricBase info.
	 * 
	 * @throws ServiceException
	 */
	void removeAllMetricBase() throws ServiceException;

	/**
	 * remove metricBase info by condition.
	 * 
	 * @param condition - remove metricBase condition.
	 * @throws ServiceException
	 */
	void removeMetricBase(final IQueryParam condition) throws ServiceException;

	/**
	 * remove metricBase by metricBase ID.
	 * 
	 * @param String metricBaseID - metricBase ID.
	 * @throws ServiceException
	 */
	void removeMetricBase(final String metricBaseId) throws ServiceException;

	/**
	 * remove by MoniTemp.
	 * 
	 * @param tempId - monitor temp id.
	 * @throws ServiceException
	 */
	void removeByTempId(String tempId) throws ServiceException;
	
}