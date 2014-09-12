package com.riil.base.resmodel.impl.db.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.riil.base.resmodel.pojo.vendor.VendorModelPojo;
import com.riil.core.dam.IDam;
import com.riil.core.dam.exception.DBException;
import com.riil.core.dao.BaseDAO;
import com.riil.core.dao.DAOException;
import com.riil.core.service.ServiceException;

public class VendorModelDao extends BaseDAO<VendorModelPojo> {

	private static final String S_SELECT_VENDORS = "select_vendors";
	private static final String S_SELECT_VENDOR_BY_VENDOR_ID = "select_vendor_by_vendor_id";
	private static final String S_SELECT_SERIESS = "select_seriess";

	private static final String S_SELECT_VENDORS_WITH_RES_NUM_BY_DOMAIN = "select_vendors_with_res_num_by_domain";
	private static final String S_SELECT_BY_TREE_NODE_ID = "select_by_tree_node_id";

	@SuppressWarnings("unchecked")
	public List<VendorModelPojo> doSelectByMapParam(String selectId, Map<String, Object> param) throws DAOException {
		try {
			IDam t_dam = getDam();
			return t_dam.selectList(selectId, param);

		} catch (DBException e) {
			throw new DAOException(e);
		}
	}
	
	@SuppressWarnings("unchecked")
	public List<VendorModelPojo> doSelectByTreeNodeId(Map<String, Object> param) throws DAOException {
		try {
			IDam t_dam = getDam();
			return t_dam.selectList(S_SELECT_BY_TREE_NODE_ID, param);

		} catch (DBException e) {
			throw new DAOException(e);
		}
	}

	@SuppressWarnings("unchecked")
	public List<VendorModelPojo> getSeries(VendorModelPojo param) throws DAOException {
		try {
			IDam t_dam = getDam();
			return t_dam.selectList(S_SELECT_SERIESS, param);

		} catch (DBException e) {
			throw new DAOException(e);
		}
	}

	/**
	 * 获取所有厂商列表
	 * 
	 * @return 厂商列表
	 * @throws ServiceException
	 */
	public VendorModelPojo getVendorByVendorId(String vendorId) throws DAOException {
		try {
			IDam t_dam = getDam();
			VendorModelPojo condition = new VendorModelPojo();
			condition.setVendorId(vendorId);
			return (VendorModelPojo) t_dam.selectOne(S_SELECT_VENDOR_BY_VENDOR_ID, condition);

		} catch (DBException e) {
			throw new DAOException(e);
		}
	}

	/**
	 * 获取所有厂商列表
	 * 
	 * @return 厂商列表
	 * @throws ServiceException
	 */
	@SuppressWarnings("unchecked")
	public List<VendorModelPojo> getVendors() throws DAOException {
		try {
			IDam t_dam = getDam();
			return t_dam.selectList(S_SELECT_VENDORS, null);

		} catch (DBException e) {
			throw new DAOException(e);
		}
	}

	/**
	 * 获取所有厂商列表，以及每个厂商包括的指定域下的资源数目
	 * 
	 * @param domainId 指定域id
	 * @return 数据字典列表
	 *         <p>
	 *         <code>DictCommonPojo.tag1</code> 保存厂商包括的指定域下的资源数量,如果为null，表示该厂商下没有任何资源
	 *         </p>
	 * @throws ServiceException
	 */
	@SuppressWarnings("unchecked")
	public List<VendorModelPojo> getVendorsWithResNumByDomain(List<String> domainId) throws DAOException {
		try {
			IDam t_dam = getDam();
			Map<String, List<String>> condition = new HashMap<String, List<String>>();
			condition.put("domainIds", domainId);
			return t_dam.selectList(S_SELECT_VENDORS_WITH_RES_NUM_BY_DOMAIN, condition);

		} catch (DBException e) {
			throw new DAOException(e);
		}
	}
//	@SuppressWarnings("unchecked")
//	public List<VendorModelPojo> getVendorsWithResNumByDomain(String domainId) throws DAOException {
//		try {
//			IDam t_dam = getDam();
//			Map<String, String> condition = new HashMap<String, String>();
//			condition.put("domainId", domainId);
//			return t_dam.selectList(S_SELECT_VENDORS_WITH_RES_NUM_BY_DOMAIN, condition);
//
//		} catch (DBException e) {
//			throw new DAOException(e);
//		}
//	}
	
	public void insert(List<VendorModelPojo> pojos)  throws DAOException {
		try {
			getDam().update("batchInsert", pojos);
		} catch (DBException e) {
			throw new DAOException(e);
		}
	}
}
