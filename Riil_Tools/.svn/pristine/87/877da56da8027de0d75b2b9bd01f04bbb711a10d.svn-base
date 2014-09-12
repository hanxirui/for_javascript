package com.riil.base.resconf.dao;

import java.util.List;

import com.riil.base.resconf.pojo.MoniUserConfigPojo;
import com.riil.core.dam.exception.DBException;
import com.riil.core.dao.BaseDAO;
import com.riil.core.dao.DAOException;
import com.riil.core.dao.IQueryParam;
import com.riil.core.dao.PageDataPojo;

public class MoniUserConfigDao extends BaseDAO<MoniUserConfigPojo> {

	private static final String S_SQL_SEL_BY_PAGE_COUNT = "select_by_condition_count";

	private static final String S_SQL_SEL_BY_PAGE = "select_by_condition";

	private static final String S_BATCH_INSERT = "batch_insert";

	public PageDataPojo<MoniUserConfigPojo> doSelectMoniUserConfig(IQueryParam param) throws DBException, DAOException {

		if (null != param) {

			param.setPageCountSqlId(S_SQL_SEL_BY_PAGE_COUNT);
			param.setPageSqlId(S_SQL_SEL_BY_PAGE);
			return this.doPageSelect(param);
		}

		return null;
	}

	/**
	 * 批量添加信息
	 * 
	 * @param pojos
	 * @throws DAOException
	 */
	public void doBatchInsert(final List<MoniUserConfigPojo> pojos) throws DAOException {
		try {
			getDam().insert(S_BATCH_INSERT, pojos);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}
}
