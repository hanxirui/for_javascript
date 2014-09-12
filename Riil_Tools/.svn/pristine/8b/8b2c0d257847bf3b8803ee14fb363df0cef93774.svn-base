package com.riil.base.sys;

import java.util.List;

import com.riil.base.pojo.enums.EnumRoot.ServerType;
import com.riil.base.pojo.sys.SysServerPojo;
import com.riil.base.sys.dao.SysServerDao;
import com.riil.core.commons.Assert;
import com.riil.core.dao.DAOException;
import com.riil.core.dao.IQueryParam;
import com.riil.core.dao.PageDataPojo;
import com.riil.core.service.AbsService;
import com.riil.core.service.ServiceException;

public class SysServerService extends AbsService implements ISysServerService {

	/**
	 * <code>m_sysServerDao</code> - DAO object.
	 */
	private SysServerDao m_sysServerDao;

	@Override
	public void createOrModifySysServer(SysServerPojo sysServer) throws ServiceException {
		Assert.notNull(sysServer, "Create sysServer is error , because parameter is null.");

		try {
			if (this.m_sysServerDao.doUpdateById(sysServer) > 0) {
				return;
			}
			if (this.m_sysServerDao.doUpdateByTeypIpAddr(sysServer) <= 0) {
				this.m_sysServerDao.doInsertPojo(sysServer);
			}

		} catch (DAOException te) {
			throw new ServiceException(te);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.riil.base.sys.ISysServerService#createSysServer
	 * (com.riil.base.sys.pojo.SysServerPojo)
	 */
	@Override
	public void createSysServer(final SysServerPojo sysServer) throws ServiceException {

		Assert.notNull(sysServer, "Create sysServer is error , because parameter is null.");

		try {

			this.m_sysServerDao.doInsertPojo(sysServer);

		} catch (DAOException te) {
			throw new ServiceException(te);
		}

	}

	@Override
	public List<SysServerPojo> getAllDcs() throws ServiceException {
		try {
			List<SysServerPojo> t_list = this.m_sysServerDao.doSelectByType(ServerType.StandardServer.getId());
			if (t_list != null && t_list.size() > 0) {
				return t_list;
			}
			return this.m_sysServerDao.doSelectByType(ServerType.DCSServer.getId());
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.riil.base.sys.ISysServerService#getAllSysServer()
	 */
	@Override
	public List<SysServerPojo> getAllSysServer() throws ServiceException {

		try {
			return this.m_sysServerDao.doSelectAll();
		} catch (DAOException te) {

			throw new ServiceException(te);
		}
	}

	@Override
	public List<SysServerPojo> getByType(ServerType serverType) throws ServiceException {
		try {
			return this.m_sysServerDao.doSelectByType(serverType.getId());
		} catch (DAOException t_e) {
			throw new ServiceException(t_e);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.sys.ISysServerService#getSysServerByID(java.lang.String)
	 */
	@Override
	public SysServerPojo getSysServerByID(final String sysServerID) throws ServiceException {

		Assert.hasLength(sysServerID, "Get sysServer info is error ,because sysServer id is null.");

		try {
			return this.m_sysServerDao.doSelectByID(sysServerID);
		} catch (DAOException te) {

			throw new ServiceException(te);
		}

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.sys.ISysServerService#getSysServerByQuery(com.riil.core
	 * .dao.IQueryParam )
	 */
	@Override
	public SysServerPojo getSysServerByQuery(final IQueryParam condition) throws ServiceException {

		Assert.notNull(condition, "Get sysServer info is error , beacause query condition is null.");

		try {
			return this.m_sysServerDao.doSelectOneByQuery(condition);
		} catch (DAOException te) {

			throw new ServiceException(te);
		}
	}

	public SysServerDao getSysServerDao() {
		return this.m_sysServerDao;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.sys.ISysServerService#getSysServerPageByQuery(com.riil.
	 * core.dao. IQueryParam, int, int)
	 */
	@Override
	public PageDataPojo<SysServerPojo> getSysServerPageByQuery(final IQueryParam condition) throws ServiceException {

		Assert.notNull(condition, "Get sysServer info page data is error , beacause query condition is null.");

		try {
			return this.m_sysServerDao.doPageSelect(condition);
		} catch (DAOException te) {

			throw new ServiceException(te);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.sys.ISysServerService#getSysServersByQuery(com.riil.core
	 * .dao.IQueryParam )
	 */
	@Override
	public List<SysServerPojo> getSysServersByQuery(final IQueryParam condition) throws ServiceException {

		Assert.notNull(condition, "Get sysServer info collection is error , beacause query condition is null.");

		try {
			return this.m_sysServerDao.doSelectList(condition);
		} catch (DAOException te) {

			throw new ServiceException(te);
		}

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.riil.base.sys.ISysServerService#modifySysServer
	 * (com.riil.base.sys.pojo.SysServerPojo)
	 */
	@Override
	public void modifySysServer(final SysServerPojo sysServer) throws ServiceException {

		Assert.notNull(sysServer, "Modify sysServer info is error , because parameter is null.");

		try {
			this.m_sysServerDao.doUpdateByTeypIpAddr(sysServer);

		} catch (DAOException te) {
			throw new ServiceException(te);
		}

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.riil.base.sys.ISysServerService#removeAllSysServer ()
	 */
	@Override
	public void removeAllSysServer() throws ServiceException {

		try {

			this.m_sysServerDao.doDeleteAll();

		} catch (DAOException te) {

			throw new ServiceException(te);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.sys.ISysServerService#removeSysServer(com.riil.core.dao.I)
	 */
	@Override
	public void removeSysServer(final IQueryParam condition) throws ServiceException {

		Assert.notNull(condition, "Remove sysServer is error , beacause remove condition is null.");

		try {

			this.m_sysServerDao.doDeleteByQuery(condition);

		} catch (DAOException te) {

			throw new ServiceException(te);
		}

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.sys.ISysServerService#removeSysServer(java.lang.String)
	 */
	@Override
	public void removeSysServer(final String sysServerID) throws ServiceException {

		Assert.hasLength(sysServerID, "Remove sysServer info is error , because parameter is null.");

		try {

			this.m_sysServerDao.doDeleteByID(sysServerID);

		} catch (DAOException te) {

			throw new ServiceException(te);
		}

	}

	public void setSysServerDao(final SysServerDao sysServerDao) {
		this.m_sysServerDao = sysServerDao;
	}
}