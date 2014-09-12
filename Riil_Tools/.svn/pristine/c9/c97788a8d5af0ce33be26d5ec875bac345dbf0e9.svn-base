package com.riil.base.resmodel;

import java.util.Collection;
import java.util.List;

import com.riil.base.pojo.dict.DictPojo;
import com.riil.base.resmodel.pojo.vendor.ModelSysoidPojo;
import com.riil.base.resmodel.pojo.vendor.VendorModelPojo;
import com.riil.base.utils.IDataSync;
import com.riil.core.dao.IQueryParam;
import com.riil.core.service.IService;
import com.riil.core.service.ServiceException;

/**
 * 资源模型字典服务 <br>
 * <p>
 * Create on : 2012-6-9<br>
 * <p>
 * </p>
 * <br>
 * 
 * @author ChenJuntao<br>
 * @version riil.resmodel.api v1.0
 *          <p>
 *          <br>
 *          <strong>Modify History:</strong><br>
 *          user modify_date modify_content<br>
 *          -------------------------------------------<br>
 *          <br>
 */
public interface IDictService extends IService, IDataSync {

	/**
	 * <code>S_SERVICE_ID</code> - Service Bean ID.
	 */
	String S_SERVICE_ID = "dictService";

	/*----未整理------------------------------------------------*/
	/**
	 * 初始化方法.
	 * 
	 * @throws ServiceException
	 */
	void init();

	/**
	 * 取得 DictPojo
	 */
	DictPojo getDictPojo();

	/**
	 * 根据接口类型id，取得接口类型名称
	 * 
	 * @param ifTypeId
	 * @return
	 * @throws ServiceException
	 */
	String getIfTypeName(String ifTypeId) throws ServiceException;

	/**
	 * get modelSysoid by sysoid.
	 * 
	 * @param sysoid
	 * @return modelSysoid POJO object or null.
	 * @throws ServiceException
	 */
	ModelSysoidPojo getModelSysoidBySysoid(final String sysoid) throws ServiceException;

	/**
	 * get modelSysoid by modelId.
	 * @param modelId modelId
	 * @return modelSysoid POJO object or null.
	 * @throws ServiceException ServiceException
	 */
	ModelSysoidPojo getModelSysoidByModelId(final String modelId) throws ServiceException;
	
	/**
	 * get VendorModelPojo by vendorId.
	 * 
	 * @param vendorId
	 * @return modelSysoid POJO object or null.
	 * @throws ServiceException
	 */
	VendorModelPojo getVendorByVendorId(final String vendorId) throws ServiceException;

	/**
	 * 取得HostOsType
	 * @return
	 * @throws ServiceException
	 */
	Collection<String> getHostOsTypeList() throws ServiceException;

	/**
	 * get VendorModelPojo by condition
	 * @param condition
	 * @return
	 * @throws ServiceException
	 */
	List<VendorModelPojo> getVendorModelsByQuery(final IQueryParam condition) throws ServiceException;
	
	/**
	 * 获取全部厂商
	 * @return
	 * @throws ServiceException
	 */
	List<VendorModelPojo> getVendors() throws ServiceException;
	
	/**
	 * 取得有资源的厂商-按资源组ID
	 * 用于资源组管理->查询
	 * @param resGroupId 资源组ID
	 * @param domainId 域ID
	 * @return 厂商列表
	 * @throws ServiceException 服务异常
	 */
	List<VendorModelPojo> getVendorHasResByResGroupId(String resGroupId, String domainId) throws ServiceException;

	/**
	 * 取得备选资源的厂商-按资源组ID
	 * 用于资源组管理->添加
	 * @param resGroupId 资源组ID
	 * @param domainId 域ID
	 * @return 厂商列表
	 * @throws ServiceException 服务异常
	 */
	List<VendorModelPojo> getVendorHasCandidateResByResGroupId(String resGroupId, String domainId)
			throws ServiceException;
	
	/**
	 * 指标解释
	 * {method description}.
	 * @param deviceType 设备类型（路由器时传，没有时传null）
	 * @param mainResTypeId 主资源类型id（模型id）
	 * @param subResTypeId 子资源类型id（模型id） 可以为null（主模型指标）
	 * @param metricId 指标id
	 * @return String 指标解释类型
	 * @throws ServiceException
	 */
	String getMetricExplanation(String deviceType,String mainResTypeId,String subResTypeId,String metricId) throws ServiceException;
	
	void setDictPojo(DictPojo dictPojo);

}