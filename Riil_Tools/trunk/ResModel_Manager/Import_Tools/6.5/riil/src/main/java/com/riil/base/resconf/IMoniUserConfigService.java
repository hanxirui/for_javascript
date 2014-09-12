package com.riil.base.resconf;

import java.util.List;

import com.riil.base.resconf.pojo.MoniUserConfigPojo;
import com.riil.core.dao.IQueryParam;
import com.riil.core.dao.PageDataPojo;
import com.riil.core.service.IService;
import com.riil.core.service.ServiceException;

public interface IMoniUserConfigService extends IService {

	/**
	 * <code>S_SERVICE_ID</code> - Service Bean ID.
	 */
	public static final String S_SERVICE_ID = "moniUserConfigService";

	/**
	 * create moniUserConfig info.
	 * 
	 * @param moniUserConfig
	 *            - moniUserConfig POJO object.
	 * @throws ServiceException
	 */
	public void createMoniUserConfig(final MoniUserConfigPojo moniUserConfig) throws ServiceException;

	public void createBatch(final List<MoniUserConfigPojo> list) throws ServiceException;

	/**
	 * modify moniUserConfig info.
	 * 
	 * @param moniUserConfig
	 *            - moniUserConfig POJO object.
	 * @throws ServiceException
	 */
	public void modifyMoniUserConfig(final MoniUserConfigPojo moniUserConfig) throws ServiceException;

	/**
	 * remove moniUserConfig by moniUserConfig ID.
	 * 
	 * @param String
	 *            moniUserConfigID - moniUserConfig ID.
	 * @throws ServiceException
	 */
	void removeMoniUserConfig(final String moniUserConfigID) throws ServiceException;

	/**
	 * remove all moniUserConfig info.
	 * 
	 * @throws ServiceException
	 */
	void removeAllMoniUserConfig() throws ServiceException;

	/**
	 * remove moniUserConfig info by condition.
	 * 
	 * @param condition
	 *            - remove moniUserConfig condition.
	 * @throws ServiceException
	 */
	void removeMoniUserConfig(final IQueryParam condition) throws ServiceException;

	/**
	 * get moniUserConfig by ID.
	 * 
	 * @param moniUserConfigID
	 *            - moniUserConfig ID.
	 * @return moniUserConfig POJO object or null.
	 * @throws ServiceException
	 */
	MoniUserConfigPojo getMoniUserConfigByID(final String moniUserConfigID) throws ServiceException;

	/**
	 * get moniUserConfig info by query.
	 * 
	 * @param condition
	 *            - query condition POJO object.
	 * @return moniUserConfig POJO object or null.
	 * @throws ServiceException
	 */
	MoniUserConfigPojo getMoniUserConfigByQuery(final IQueryParam condition) throws ServiceException;

	/**
	 * get all moniUserConfig info.
	 * 
	 * @return moniUserConfig POJO object collection.
	 * @throws ServiceException
	 */
	List<MoniUserConfigPojo> getAllMoniUserConfig() throws ServiceException;

	/**
	 * get moniUserConfig by query.
	 * 
	 * @param condition
	 *            - query condition POJO object.
	 * @return moniUserConfig info POJO object collection or null.
	 * @throws ServiceException.
	 */
	List<MoniUserConfigPojo> getMoniUserConfigsByQuery(final IQueryParam condition) throws ServiceException;

	/**
	 * get moniUserConfig by query for page.
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
	PageDataPojo<MoniUserConfigPojo> getMoniUserConfigPageByQuery(final IQueryParam condition) throws ServiceException;

}