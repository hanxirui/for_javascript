package com.riil.base.resmodel.impl.db.dao;

import java.util.List;

import com.riil.base.resmodel.pojo.base.ModelMetricRelPojo;
import com.riil.core.dam.IDam;
import com.riil.core.dam.exception.DBException;
import com.riil.core.dao.BaseDAO;
import com.riil.core.dao.DAOException;
import com.riil.core.dao.IQueryParam;
import com.riil.core.dao.PageDataPojo;

public class ModelMetricRelDao extends BaseDAO<ModelMetricRelPojo> {

	private static final String S_SQL_SEL_BY_PAGE_COUNT = "select_by_condition_count";

	private static final String S_SQL_SEL_BY_PAGE = "select_by_condition";

	private static final String S_DELETE_BY_MODEL_ID = "delete_by_model_id";

	public PageDataPojo<ModelMetricRelPojo> doSelectModelMetricRel(IQueryParam param) throws DBException, DAOException {

		if (null != param) {

			param.setPageCountSqlId(S_SQL_SEL_BY_PAGE_COUNT);
			param.setPageSqlId(S_SQL_SEL_BY_PAGE);
			return this.doPageSelect(param);
		}

		return null;
	}

	public void doDeleteByModelId(String modelId) throws DAOException {
		try {
			IDam t_dam = getDam();
			t_dam.delete(S_DELETE_BY_MODEL_ID, modelId);
		} catch (Exception te) {
			throw new DAOException(te);
		}

	}
	
	public void insert(List<ModelMetricRelPojo> pojos)  throws DAOException {
		try {
			getDam().update("batchInsert", pojos);
		} catch (DBException e) {
			throw new DAOException(e);
		}
	}
}
