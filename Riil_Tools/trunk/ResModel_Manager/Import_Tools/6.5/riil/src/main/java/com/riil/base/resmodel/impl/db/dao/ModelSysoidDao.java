package com.riil.base.resmodel.impl.db.dao;

import java.util.Collection;
import java.util.List;

import com.riil.base.resmodel.pojo.vendor.ModelSysoidPojo;
import com.riil.core.dam.IDam;
import com.riil.core.dam.exception.DBException;
import com.riil.core.dao.BaseDAO;
import com.riil.core.dao.DAOException;
import com.riil.core.dao.PageDataPojo;

public class ModelSysoidDao extends BaseDAO<ModelSysoidPojo> {
	private static final String S_SELECT_OS_LIST = "select_os_list";

	private static final String S_SQL_SEL_BY_PAGE_COUNT = "select_by_condition_count";

	private static final String S_SQL_SEL_BY_PAGE = "select_by_condition";

	/**
	 * 根据模型id列表取得模型基础信息
	 */
	@SuppressWarnings("unchecked")
	public Collection<String> doSelectOsList() throws DAOException {
		try {
			IDam t_dam = getDam();
			return (Collection<String>) t_dam.selectList(S_SELECT_OS_LIST, null);

		} catch (DBException e) {
			throw new DAOException(e);
		}
	}

	public PageDataPojo<ModelSysoidPojo> doSelectByPage(ModelSysoidPojo param) throws DAOException {
		if (null != param) {
			param.setPageCountSqlId(S_SQL_SEL_BY_PAGE_COUNT);
			param.setPageSqlId(S_SQL_SEL_BY_PAGE);
			return this.doPageSelect(param);
		}
		return null;
	}
	
	public void insert(List<ModelSysoidPojo> pojos)  throws DAOException {
		try {
			getDam().update("batchInsert", pojos);
		} catch (DBException e) {
			throw new DAOException(e);
		}
	}
}
