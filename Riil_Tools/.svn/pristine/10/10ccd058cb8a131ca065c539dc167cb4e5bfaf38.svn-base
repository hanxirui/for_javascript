package com.riil.base.sys;

import java.util.List;

import com.riil.base.pojo.enums.EnumRoot.ServerType;
import com.riil.base.pojo.sys.SysServerPojo;
import com.riil.core.dao.IQueryParam;
import com.riil.core.dao.PageDataPojo;
import com.riil.core.service.IService;
import com.riil.core.service.ServiceException;

/**
 * 
 * riil系统server管理服务 <br>
 * 
 * <p>
 * Create on : 2011-12-12<br>
 * <p>
 * </p>
 * <br>
 * 
 * @author panhongliang@ruijie.com.cn<br>
 * @version riil.resmodel.api v6.0
 *          <p>
 *          <br>
 *          <strong>Modify History:</strong><br>
 *          user modify_date modify_content<br>
 *          -------------------------------------------<br>
 *          <br>
 */
public interface ISysServerService extends IService {

	/**
	 * <code>S_SERVICE_ID</code> - Service Bean ID.
	 */
	public static final String S_SERVICE_ID = "sysServerService";

	/**
	 * create or modify sysServer info.
	 * 
	 * @param sysServer
	 *            - sysServer POJO object.
	 * @throws ServiceException
	 */
	void createOrModifySysServer(final SysServerPojo sysServer) throws ServiceException;

	/**
	 * create sysServer info.
	 * 
	 * @param sysServer
	 *            - sysServer POJO object.
	 * @throws ServiceException
	 */
	void createSysServer(final SysServerPojo sysServer) throws ServiceException;

	/**
	 * get all 采集服务器 sysServer info.
	 * 
	 * @return sysServer POJO object collection.
	 * @throws ServiceException
	 *             业务处理异常
	 */
	List<SysServerPojo> getAllDcs() throws ServiceException;

	/**
	 * get all sysServer info.
	 * 
	 * @return sysServer POJO object collection.
	 * @throws ServiceException
	 */
	List<SysServerPojo> getAllSysServer() throws ServiceException;

	/**
	 * 根据server类型取得server列表
	 */
	List<SysServerPojo> getByType(ServerType serverType) throws ServiceException;

	/**
	 * get sysServer by ID.
	 * 
	 * @param sysServerID
	 *            - sysServer ID.
	 * @return sysServer POJO object or null.
	 * @throws ServiceException
	 */
	SysServerPojo getSysServerByID(final String sysServerID) throws ServiceException;

	/**
	 * get sysServer info by query.
	 * 
	 * @param condition
	 *            - query condition POJO object.
	 * @return sysServer POJO object or null.
	 * @throws ServiceException
	 */
	SysServerPojo getSysServerByQuery(final IQueryParam condition) throws ServiceException;

	/**
	 * get sysServer by query for page.
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
	PageDataPojo<SysServerPojo> getSysServerPageByQuery(final IQueryParam condition) throws ServiceException;

	/**
	 * get sysServer by query.
	 * 
	 * @param condition
	 *            - query condition POJO object.
	 * @return sysServer info POJO object collection or null.
	 * @throws ServiceException.
	 */
	List<SysServerPojo> getSysServersByQuery(final IQueryParam condition) throws ServiceException;

	/**
	 * modify sysServer info.
	 * 
	 * @param sysServer
	 *            - sysServer POJO object.
	 * @throws ServiceException
	 */
	void modifySysServer(final SysServerPojo sysServer) throws ServiceException;

	/**
	 * remove all sysServer info.
	 * 
	 * @throws ServiceException
	 */
	void removeAllSysServer() throws ServiceException;

	/**
	 * remove sysServer info by condition.
	 * 
	 * @param condition
	 *            - remove sysServer condition.
	 * @throws ServiceException
	 */
	void removeSysServer(final IQueryParam condition) throws ServiceException;

	/**
	 * remove sysServer by sysServer ID.
	 * 
	 * @param String
	 *            sysServerID - sysServer ID.
	 * @throws ServiceException
	 */
	void removeSysServer(final String sysServerID) throws ServiceException;
}