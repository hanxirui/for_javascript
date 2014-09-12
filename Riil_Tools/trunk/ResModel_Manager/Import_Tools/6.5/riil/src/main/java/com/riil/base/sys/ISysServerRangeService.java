package com.riil.base.sys;

import java.util.List;

import com.riil.base.pojo.sys.SysServerRangePojo;
import com.riil.core.dao.IQueryParam;
import com.riil.core.dao.PageDataPojo;
import com.riil.core.service.IService;
import com.riil.core.service.ServiceException;

public interface ISysServerRangeService extends IService {

	/**
	 * <code>S_SERVICE_ID</code> - Service Bean ID.
	 */
	public static final String S_SERVICE_ID = "sysServerRangeService";

	/**
	 * create sysServerRange info.
	 * 
	 * @param sysServerRange
	 *            - sysServerRange POJO object.
	 * @throws ServiceException
	 */
	 void createSysServerRange(final SysServerRangePojo sysServerRange) throws ServiceException;

	/**
	 * get all sysServerRange info.
	 * 
	 * @return sysServerRange POJO object collection.
	 * @throws ServiceException
	 */
	List<SysServerRangePojo> getAllSysServerRange() throws ServiceException;

	/**
	 * get sysServerRange by ID.
	 * 
	 * @param sysServerRangeID
	 *            - sysServerRange ID.
	 * @return sysServerRange POJO object or null.
	 * @throws ServiceException
	 */
	SysServerRangePojo getSysServerRangeByID(final String sysServerRangeID) throws ServiceException;

	/**
	 * get sysServerRange info by query.
	 * 
	 * @param condition
	 *            - query condition POJO object.
	 * @return sysServerRange POJO object or null.
	 * @throws ServiceException
	 */
	SysServerRangePojo getSysServerRangeByQuery(final IQueryParam condition) throws ServiceException;

	/**
	 * get sysServerRange by query for page.
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
	PageDataPojo<SysServerRangePojo> getSysServerRangePageByQuery(final IQueryParam condition) throws ServiceException;

	/**
	 * get sysServerRange by query.
	 * 
	 * @param condition
	 *            - query condition POJO object.
	 * @return sysServerRange info POJO object collection or null.
	 * @throws ServiceException.
	 */
	List<SysServerRangePojo> getSysServerRangesByQuery(final IQueryParam condition) throws ServiceException;

	/**
	 * modify sysServerRange info.
	 * 
	 * @param sysServerRange
	 *            - sysServerRange POJO object.
	 * @throws ServiceException
	 */
	 void modifySysServerRange(final SysServerRangePojo sysServerRange) throws ServiceException;

	/**
	 * remove all sysServerRange info.
	 * 
	 * @throws ServiceException
	 */
	void removeAllSysServerRange() throws ServiceException;

	/**
	 * remove sysServerRange info by condition.
	 * 
	 * @param condition
	 *            - remove sysServerRange condition.
	 * @throws ServiceException
	 */
	void removeSysServerRange(final IQueryParam condition) throws ServiceException;

	/**
	 * remove sysServerRange by sysServerRange ID.
	 * 
	 * @param String
	 *            sysServerRangeID - sysServerRange ID.
	 * @throws ServiceException
	 */
	void removeSysServerRange(final String sysServerRangeID) throws ServiceException;

}