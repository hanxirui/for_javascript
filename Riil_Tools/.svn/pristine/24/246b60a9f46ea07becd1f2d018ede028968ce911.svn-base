package com.riil.base.resmodel;

import java.util.List;

import com.riil.base.resmodel.pojo.base.VendorPojo;
import com.riil.core.dao.PageDataPojo;
import com.riil.core.dao.IQueryParam;
import com.riil.core.service.IService;
import com.riil.core.service.ServiceException;

public interface IVendorService extends IService {

	/**
	 * <code>S_SERVICE_ID</code> - Service Bean ID.
	 */
	public static final String S_SERVICE_ID = "vendorService";

	/**
	 * create vendor info.
	 * 
	 * @param vendor
	 *            - vendor POJO object.
	 * @throws ServiceException
	 */
	abstract public void createVendor(final VendorPojo vendor)
			throws ServiceException;

	/**
	 * modify vendor info.
	 * 
	 * @param vendor
	 *            - vendor POJO object.
	 * @throws ServiceException
	 */
	abstract public void modifyVendor(final VendorPojo vendor)
			throws ServiceException;

	/**
	 * remove vendor by vendor ID.
	 * 
	 * @param String
	 *            vendorID - vendor ID.
	 * @throws ServiceException
	 */
	void removeVendor(final String vendorID) throws ServiceException;

	/**
	 * remove all vendor info.
	 * 
	 * @throws ServiceException
	 */
	void removeAllVendor() throws ServiceException;

	/**
	 * remove vendor info by condition.
	 * 
	 * @param condition
	 *            - remove vendor condition.
	 * @throws ServiceException
	 */
	void removeVendor(final IQueryParam condition) throws ServiceException;

	/**
	 * get vendor by ID.
	 * 
	 * @param vendorID
	 *            - vendor ID.
	 * @return vendor POJO object or null.
	 * @throws ServiceException
	 */
	VendorPojo getVendorByID(final String vendorID) throws ServiceException;

	/**
	 * get vendor info by query.
	 * 
	 * @param condition
	 *            - query condition POJO object.
	 * @return vendor POJO object or null.
	 * @throws ServiceException
	 */
	VendorPojo getVendorByQuery(final IQueryParam condition)
			throws ServiceException;

	/**
	 * get all vendor info.
	 * 
	 * @return vendor POJO object collection.
	 * @throws ServiceException
	 */
	List<VendorPojo> getAllVendor() throws ServiceException;

	/**
	 * get vendor by query.
	 * 
	 * @param condition
	 *            - query condition POJO object.
	 * @return vendor info POJO object collection or null.
	 * @throws ServiceException.
	 */
	List<VendorPojo> getVendorsByQuery(final IQueryParam condition)
			throws ServiceException;

	/**
	 * get vendor by query for page.
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
	PageDataPojo<VendorPojo> getVendorPageByQuery(final IQueryParam condition)
			throws ServiceException;

}