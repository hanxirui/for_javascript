package com.riil.base.resconf;

import java.util.List;

import com.riil.base.resconf.dao.MoniUserConfigDao;
import com.riil.base.resconf.pojo.MoniUserConfigPojo;
import com.riil.core.commons.Assert;
import com.riil.core.dao.DAOException;
import com.riil.core.dao.IQueryParam;
import com.riil.core.dao.PageDataPojo;
import com.riil.core.service.AbsService;
import com.riil.core.service.ServiceException;

public class MoniUserConfigService extends AbsService implements IMoniUserConfigService {

	/**
	 * <code>m_moniUserConfigDao</code> - DAO object.
	 */
	private MoniUserConfigDao m_moniUserConfigDao;

	public void setMoniUserConfigDao(final MoniUserConfigDao moniUserConfigDao) {
		this.m_moniUserConfigDao = moniUserConfigDao;
	}

	public MoniUserConfigDao getMoniUserConfigDao() {
		return this.m_moniUserConfigDao;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.riil.base.resconf.IMoniUserConfigService#createMoniUserConfig
	 * (com.riil.base.resconf.pojo.MoniUserConfigPojo)
	 */
	@Override
	public void createMoniUserConfig(final MoniUserConfigPojo moniUserConfig) throws ServiceException {

		Assert.notNull(moniUserConfig, "Create moniUserConfig is error , because parameter is null.");

		try {

			this.m_moniUserConfigDao.doInsertPojo(moniUserConfig);

		} catch (DAOException te) {
			throw new ServiceException(te);
		}

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.riil.base.resconf.IMoniUserConfigService#modifyMoniUserConfig
	 * (com.riil.base.resconf.pojo.MoniUserConfigPojo)
	 */
	@Override
	public void modifyMoniUserConfig(final MoniUserConfigPojo moniUserConfig) throws ServiceException {

		Assert.notNull(moniUserConfig, "Modify moniUserConfig info is error , because parameter is null.");

		try {

			this.m_moniUserConfigDao.doUpdatePojo(moniUserConfig);

		} catch (DAOException te) {
			throw new ServiceException(te);
		}

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.resconf.IMoniUserConfigService#removeMoniUserConfig(java
	 * .lang.String)
	 */
	@Override
	public void removeMoniUserConfig(final String moniUserConfigID) throws ServiceException {

		Assert.hasLength(moniUserConfigID, "Remove moniUserConfig info is error , because parameter is null.");

		try {

			this.m_moniUserConfigDao.doDeleteByID(moniUserConfigID);

		} catch (DAOException te) {

			throw new ServiceException(te);
		}

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.riil.base.resconf.IMoniUserConfigService#removeAllMoniUserConfig
	 * ()
	 */
	@Override
	public void removeAllMoniUserConfig() throws ServiceException {

		try {

			this.m_moniUserConfigDao.doDeleteAll();

		} catch (DAOException te) {

			throw new ServiceException(te);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.resconf.IMoniUserConfigService#removeMoniUserConfig(com
	 * .riil.core.dao.I)
	 */
	@Override
	public void removeMoniUserConfig(final IQueryParam condition) throws ServiceException {

		Assert.notNull(condition, "Remove moniUserConfig is error , beacause remove condition is null.");

		try {

			this.m_moniUserConfigDao.doDeleteByQuery(condition);

		} catch (DAOException te) {

			throw new ServiceException(te);
		}

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.resconf.IMoniUserConfigService#getMoniUserConfigByID(java
	 * .lang.String)
	 */
	@Override
	public MoniUserConfigPojo getMoniUserConfigByID(final String moniUserConfigID) throws ServiceException {

		Assert.hasLength(moniUserConfigID, "Get moniUserConfig info is error ,because moniUserConfig id is null.");

		try {
			return this.m_moniUserConfigDao.doSelectByID(moniUserConfigID);
		} catch (DAOException te) {

			throw new ServiceException(te);
		}

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.resconf.IMoniUserConfigService#getMoniUserConfigByQuery
	 * (com.riil.core.dao.IQueryParam )
	 */
	@Override
	public MoniUserConfigPojo getMoniUserConfigByQuery(final IQueryParam condition) throws ServiceException {

		Assert.notNull(condition, "Get moniUserConfig info is error , beacause query condition is null.");

		try {
			return this.m_moniUserConfigDao.doSelectOneByQuery(condition);
		} catch (DAOException te) {

			throw new ServiceException(te);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.riil.base.resconf.IMoniUserConfigService#getAllMoniUserConfig()
	 */
	@Override
	public List<MoniUserConfigPojo> getAllMoniUserConfig() throws ServiceException {

		try {
			return this.m_moniUserConfigDao.doSelectAll();
		} catch (DAOException te) {

			throw new ServiceException(te);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.resconf.IMoniUserConfigService#getMoniUserConfigsByQuery
	 * (com.riil.core.dao.IQueryParam )
	 */
	@Override
	public List<MoniUserConfigPojo> getMoniUserConfigsByQuery(final IQueryParam condition) throws ServiceException {

		Assert.notNull(condition, "Get moniUserConfig info collection is error , beacause query condition is null.");

		try {
			return this.m_moniUserConfigDao.doSelectList(condition);
		} catch (DAOException te) {

			throw new ServiceException(te);
		}

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.resconf.IMoniUserConfigService#getMoniUserConfigPageByQuery
	 * (com.riil.core.dao. IQueryParam, int, int)
	 */
	@Override
	public PageDataPojo<MoniUserConfigPojo> getMoniUserConfigPageByQuery(final IQueryParam condition) throws ServiceException {

		Assert.notNull(condition, "Get moniUserConfig info page data is error , beacause query condition is null.");

		try {
			return this.m_moniUserConfigDao.doPageSelect(condition);
		} catch (DAOException te) {

			throw new ServiceException(te);
		}
	}

	@Override
	public void createBatch(List<MoniUserConfigPojo> list) throws ServiceException {
		Assert.notEmpty(list);
		try {

			this.m_moniUserConfigDao.doBatchInsert(list);

		} catch (DAOException te) {
			throw new ServiceException(te);
		}
	}

}