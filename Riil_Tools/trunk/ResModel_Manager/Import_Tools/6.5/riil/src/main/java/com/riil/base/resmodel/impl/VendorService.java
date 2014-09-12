package com.riil.base.resmodel.impl;

import java.util.List;

import com.riil.base.resmodel.IVendorService;
import com.riil.base.resmodel.impl.db.dao.VendorDao;
import com.riil.base.resmodel.pojo.base.VendorPojo;
import com.riil.core.commons.Assert;
import com.riil.core.dao.DAOException;
import com.riil.core.dao.IQueryParam;
import com.riil.core.dao.PageDataPojo;
import com.riil.core.service.AbsService;
import com.riil.core.service.ServiceException;

public class VendorService extends AbsService implements IVendorService {

	/**
	 * <code>m_vendorDao</code> - DAO object.
	 */
	private VendorDao m_vendorDao;
	
	public void setVendorDao(final VendorDao vendorDao) {
		this.m_vendorDao = vendorDao;
	}

	public VendorDao getVendorDao() {
		return this.m_vendorDao;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.riil.base.resmodel.IVendorService#createVendor
	 * (com.riil.base.resmodel.pojo.VendorPojo)
	 */
	@Override
	public void createVendor(final VendorPojo vendor) throws ServiceException {

		Assert.notNull(vendor,
				"Create vendor is error , because parameter is null.");

		try {

			this.m_vendorDao.doInsertPojo(vendor);

		} catch (DAOException te) {
			throw new ServiceException(te);
		}

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.riil.base.resmodel.IVendorService#modifyVendor
	 * (com.riil.base.resmodel.pojo.VendorPojo)
	 */
	@Override
	public void modifyVendor(final VendorPojo vendor) throws ServiceException {

		Assert.notNull(vendor,
				"Modify vendor info is error , because parameter is null.");

		try {

			this.m_vendorDao.doUpdatePojo(vendor);

		} catch (DAOException te) {
			throw new ServiceException(te);
		}

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.riil.base.resmodel.IVendorService#removeVendor(java.lang.String)
	 */
	@Override
	public void removeVendor(final String vendorID) throws ServiceException {

		Assert.hasLength(vendorID,
				"Remove vendor info is error , because parameter is null.");

		try {

			this.m_vendorDao.doDeleteByID(vendorID);

		} catch (DAOException te) {

			throw new ServiceException(te);
		}

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.riil.base.resmodel.IVendorService#removeAllVendor ()
	 */
	@Override
	public void removeAllVendor() throws ServiceException {

		try {

			this.m_vendorDao.doDeleteAll();

		} catch (DAOException te) {

			throw new ServiceException(te);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.resmodel.IVendorService#removeVendor(com.riil.core.dao.I)
	 */
	@Override
	public void removeVendor(final IQueryParam condition)
			throws ServiceException {

		Assert.notNull(condition,
				"Remove vendor is error , beacause remove condition is null.");

		try {

			this.m_vendorDao.doDeleteByQuery(condition);

		} catch (DAOException te) {

			throw new ServiceException(te);
		}

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.resmodel.IVendorService#getVendorByID(java.lang.String)
	 */
	@Override
	public VendorPojo getVendorByID(final String vendorID)
			throws ServiceException {

		Assert.hasLength(vendorID,
				"Get vendor info is error ,because vendor id is null.");

		try {
			return this.m_vendorDao.doSelectByID(vendorID);
		} catch (DAOException te) {

			throw new ServiceException(te);
		}

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.resmodel.IVendorService#getVendorByQuery(com.riil.core.
	 * dao.IQueryParam )
	 */
	@Override
	public VendorPojo getVendorByQuery(final IQueryParam condition)
			throws ServiceException {

		Assert.notNull(condition,
				"Get vendor info is error , beacause query condition is null.");

		try {
			return this.m_vendorDao.doSelectOneByQuery(condition);
		} catch (DAOException te) {

			throw new ServiceException(te);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.riil.base.resmodel.IVendorService#getAllVendor()
	 */
	@Override
	public List<VendorPojo> getAllVendor() throws ServiceException {

		try {
			return this.m_vendorDao.doSelectAll();
		} catch (DAOException te) {

			throw new ServiceException(te);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.resmodel.IVendorService#getVendorsByQuery(com.riil.core
	 * .dao.IQueryParam )
	 */
	@Override
	public List<VendorPojo> getVendorsByQuery(final IQueryParam condition)
			throws ServiceException {

		Assert.notNull(condition,
				"Get vendor info collection is error , beacause query condition is null.");

		try {
			return this.m_vendorDao.doSelectList(condition);
		} catch (DAOException te) {

			throw new ServiceException(te);
		}

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.resmodel.IVendorService#getVendorPageByQuery(com.riil.core
	 * .dao. IQueryParam, int, int)
	 */
	@Override
	public PageDataPojo<VendorPojo> getVendorPageByQuery(
			final IQueryParam condition) throws ServiceException {

		Assert.notNull(condition,
				"Get vendor info page data is error , beacause query condition is null.");

		try {
			return this.m_vendorDao.doSelectVendor(condition);
		} catch (DAOException te) {

			throw new ServiceException(te);
		}
	}

}