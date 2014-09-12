package com.riil.base.sys.dao;

import com.riil.base.pojo.sys.SysServerRangePojo;
import com.riil.core.dam.exception.DBException;
import com.riil.core.dao.BaseDAO;
import com.riil.core.dao.DAOException;
import com.riil.core.dao.IQueryParam;
import com.riil.core.dao.PageDataPojo;

public class SysServerRangeDao extends BaseDAO<SysServerRangePojo> {

	private static final String S_SQL_SEL_BY_PAGE_COUNT = "select_by_condition_count";

	private static final String S_SQL_SEL_BY_PAGE = "select_by_condition";

	public PageDataPojo<SysServerRangePojo> doSelectSysServerRange(IQueryParam param) throws DBException, DAOException {

		if (null != param) {

			param.setPageCountSqlId(S_SQL_SEL_BY_PAGE_COUNT);
			param.setPageSqlId(S_SQL_SEL_BY_PAGE);
			return this.doPageSelect(param);
		}

		return null;
	}

}
