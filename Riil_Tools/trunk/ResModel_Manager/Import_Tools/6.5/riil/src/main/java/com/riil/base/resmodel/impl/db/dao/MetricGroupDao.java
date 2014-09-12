package com.riil.base.resmodel.impl.db.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.riil.base.resmodel.pojo.base.MetricGroupPojo;
import com.riil.core.dam.exception.DBException;
import com.riil.core.dao.BaseDAO;
import com.riil.core.dao.DAOException;
import com.riil.core.dao.IQueryParam;
import com.riil.core.dao.PageDataPojo;

public class MetricGroupDao extends BaseDAO<MetricGroupPojo> {

	private static final String S_SQL_SEL_BY_PAGE_COUNT = "select_by_condition_count";

	private static final String S_SQL_SEL_BY_PAGE = "select_by_condition";
	
	private static final String S_SQL_INSERT_METRIC_REL = "insert_metric_rel";

	public PageDataPojo<MetricGroupPojo> doSelectMetricGroup(IQueryParam param)
			throws DAOException {

		if (null != param) {

			param.setPageCountSqlId(S_SQL_SEL_BY_PAGE_COUNT);
			param.setPageSqlId(S_SQL_SEL_BY_PAGE);
			return this.doPageSelect(param);
		}

		return null;
	}

	public void doInsertMetricIds(Map<String, String> param) throws DAOException {
		
		if (null != param) {
			try {
				this.getDam().insert(S_SQL_INSERT_METRIC_REL, param);
			} catch (DBException e) {
				throw new DAOException(e);
			}
		}
	}

	public List<Map<String, String>> doSelectAllGroupMetricRel() throws DAOException {
		try {
			@SuppressWarnings("unchecked")
			List<HashMap<String,String>> list = this.getDam().selectList("select_all_metric_rel", null);
			List<Map<String, String>> result = new ArrayList<Map<String,String>>();
			if(!list.isEmpty()){
				for(HashMap<String,String> row : list){
					Map<String, String> map = new HashMap<String, String>(); 
					map.put(row.get("C_METRIC_GROUP_ID"), row.get("C_METRIC_ID"));
					result.add(map);
				}
			}
			return result;
		} catch (DBException e) {
			throw new DAOException(e);
		}
	}
	
	public void insert(List<MetricGroupPojo> pojos)  throws DAOException {
		try {
			getDam().update("batchInsert", pojos);
		} catch (DBException e) {
			throw new DAOException(e);
		}
	}
}
