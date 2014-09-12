package com.riil.base.resmodel.impl.db.dao;

import java.util.List;

import com.riil.base.resmodel.pojo.base.VendorPojo;
import com.riil.core.dam.exception.DBException;
import com.riil.core.dao.BaseDAO;
import com.riil.core.dao.DAOException;
import com.riil.core.dao.IQueryParam;
import com.riil.core.dao.PageDataPojo;

public class VendorDao extends BaseDAO<VendorPojo> {

	private static final String S_SQL_SEL_BY_PAGE_COUNT = "select_pagelist_by_query_count";

	private static final String S_SQL_SEL_BY_PAGE = "select_pagelist_by_query";

	public PageDataPojo<VendorPojo> doSelectVendor(IQueryParam param)
			throws DAOException {

		if (null != param) {

			param.setPageCountSqlId(S_SQL_SEL_BY_PAGE_COUNT);
			param.setPageSqlId(S_SQL_SEL_BY_PAGE);
			return this.doPageSelect(param);
		}

		return null;
	}

	public void insert(List<VendorPojo> pojos)  throws DAOException {
		try {
			getDam().update("batchInsert", pojos);
		} catch (DBException e) {
			throw new DAOException(e);
		}
	}
}
