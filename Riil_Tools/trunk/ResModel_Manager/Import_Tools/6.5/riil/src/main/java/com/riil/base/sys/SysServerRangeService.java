package com.riil.base.sys;

import java.util.List;

import com.riil.base.pojo.sys.SysServerRangePojo;
import com.riil.base.sys.dao.SysServerRangeDao;
import com.riil.core.commons.Assert;
import com.riil.core.dao.DAOException;
import com.riil.core.dao.IQueryParam;
import com.riil.core.dao.PageDataPojo;
import com.riil.core.service.AbsService;
import com.riil.core.service.ServiceException;

public class SysServerRangeService extends AbsService implements ISysServerRangeService {

	/**
	 * <code>m_sysServerRangeDao</code> - DAO object.
	 */
	private SysServerRangeDao m_sysServerRangeDao;

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.riil.base.sys.ISysServerRangeService#createSysServerRange
	 * (com.riil.base.sys.pojo.SysServerRangePojo)
	 */
	@Override
	public void createSysServerRange(final SysServerRangePojo sysServerRange) throws ServiceException {

		Assert.notNull(sysServerRange, "Create sysServerRange is error , because parameter is null.");

		try {

			this.m_sysServerRangeDao.doInsertPojo(sysServerRange);

		} catch (DAOException te) {
			throw new ServiceException(te);
		}

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.riil.base.sys.ISysServerRangeService#getAllSysServerRange()
	 */
	@Override
	public List<SysServerRangePojo> getAllSysServerRange() throws ServiceException {

		try {
			return this.m_sysServerRangeDao.doSelectAll();
		} catch (DAOException te) {

			throw new ServiceException(te);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.sys.ISysServerRangeService#getSysServerRangeByID(java.lang
	 * .String)
	 */
	@Override
	public SysServerRangePojo getSysServerRangeByID(final String sysServerRangeID) throws ServiceException {

		Assert.hasLength(sysServerRangeID, "Get sysServerRange info is error ,because sysServerRange id is null.");

		try {
			return this.m_sysServerRangeDao.doSelectByID(sysServerRangeID);
		} catch (DAOException te) {

			throw new ServiceException(te);
		}

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.sys.ISysServerRangeService#getSysServerRangeByQuery(com
	 * .riil.core.dao.IQueryParam )
	 */
	@Override
	public SysServerRangePojo getSysServerRangeByQuery(final IQueryParam condition) throws ServiceException {

		Assert.notNull(condition, "Get sysServerRange info is error , beacause query condition is null.");

		try {
			return this.m_sysServerRangeDao.doSelectOneByQuery(condition);
		} catch (DAOException te) {

			throw new ServiceException(te);
		}
	}

	public SysServerRangeDao getSysServerRangeDao() {
		return this.m_sysServerRangeDao;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.sys.ISysServerRangeService#getSysServerRangePageByQuery
	 * (com.riil.core.dao. IQueryParam, int, int)
	 */
	@Override
	public PageDataPojo<SysServerRangePojo> getSysServerRangePageByQuery(final IQueryParam condition) throws ServiceException {

		Assert.notNull(condition, "Get sysServerRange info page data is error , beacause query condition is null.");

		try {
			return this.m_sysServerRangeDao.doPageSelect(condition);
		} catch (DAOException te) {

			throw new ServiceException(te);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.sys.ISysServerRangeService#getSysServerRangesByQuery(com
	 * .riil.core.dao.IQueryParam )
	 */
	@Override
	public List<SysServerRangePojo> getSysServerRangesByQuery(final IQueryParam condition) throws ServiceException {

		Assert.notNull(condition, "Get sysServerRange info collection is error , beacause query condition is null.");

		try {
			return this.m_sysServerRangeDao.doSelectList(condition);
		} catch (DAOException te) {

			throw new ServiceException(te);
		}

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.riil.base.sys.ISysServerRangeService#modifySysServerRange
	 * (com.riil.base.sys.pojo.SysServerRangePojo)
	 */
	@Override
	public void modifySysServerRange(final SysServerRangePojo sysServerRange) throws ServiceException {

		Assert.notNull(sysServerRange, "Modify sysServerRange info is error , because parameter is null.");

		try {

			this.m_sysServerRangeDao.doUpdatePojo(sysServerRange);

		} catch (DAOException te) {
			throw new ServiceException(te);
		}

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.riil.base.sys.ISysServerRangeService#removeAllSysServerRange ()
	 */
	@Override
	public void removeAllSysServerRange() throws ServiceException {

		try {

			this.m_sysServerRangeDao.doDeleteAll();

		} catch (DAOException te) {

			throw new ServiceException(te);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.sys.ISysServerRangeService#removeSysServerRange(com.riil
	 * .core.dao.I)
	 */
	@Override
	public void removeSysServerRange(final IQueryParam condition) throws ServiceException {

		Assert.notNull(condition, "Remove sysServerRange is error , beacause remove condition is null.");

		try {

			this.m_sysServerRangeDao.doDeleteByQuery(condition);

		} catch (DAOException te) {

			throw new ServiceException(te);
		}

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.sys.ISysServerRangeService#removeSysServerRange(java.lang
	 * .String)
	 */
	@Override
	public void removeSysServerRange(final String sysServerRangeID) throws ServiceException {

		Assert.hasLength(sysServerRangeID, "Remove sysServerRange info is error , because parameter is null.");

		try {

			this.m_sysServerRangeDao.doDeleteByID(sysServerRangeID);

		} catch (DAOException te) {

			throw new ServiceException(te);
		}

	}

	public void setSysServerRangeDao(final SysServerRangeDao sysServerRangeDao) {
		this.m_sysServerRangeDao = sysServerRangeDao;
	}

}