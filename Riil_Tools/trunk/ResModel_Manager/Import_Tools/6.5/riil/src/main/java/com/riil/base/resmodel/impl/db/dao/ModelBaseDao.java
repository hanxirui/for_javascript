package com.riil.base.resmodel.impl.db.dao;

import java.util.List;

import com.riil.base.resmodel.pojo.base.ModelBasePojo;
import com.riil.core.dam.IDam;
import com.riil.core.dam.exception.DBException;
import com.riil.core.dao.BaseDAO;
import com.riil.core.dao.DAOException;
import com.riil.core.dao.IQueryParam;

public class ModelBaseDao extends BaseDAO<ModelBasePojo> {
	private static final String S_SELECT_LIST_BY_MODELS = "select_list_by_models";

	/**
	 * 根据模型id列表取得模型基础信息
	 */
	@SuppressWarnings("unchecked")
	public List<ModelBasePojo> doSelectListByModelIds(IQueryParam queryPojo) throws DAOException {
		try {
			IDam t_dam = getDam();
			return (List<ModelBasePojo>) t_dam.selectList(S_SELECT_LIST_BY_MODELS, queryPojo);

		} catch (DBException e) {
			throw new DAOException(e);
		}
	}

	public void insert(List<ModelBasePojo> pojos)  throws DAOException {
		try {
			getDam().update("batchInsert", pojos);
		} catch (DBException e) {
			throw new DAOException(e);
		}
	}
}
