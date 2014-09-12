package com.riil.base.resmodel.impl.db.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.riil.base.resmodel.pojo.ModelQueryParam;
import com.riil.base.resmodel.pojo.base.MetricBasePojo;
import com.riil.base.resmodel.pojo.base.ModelMetricViewPojo;
import com.riil.core.dam.IDam;
import com.riil.core.dam.exception.DBException;
import com.riil.core.dao.BaseDAO;
import com.riil.core.dao.DAOException;

public class MetricBaseDao extends BaseDAO<MetricBasePojo> {
	private static final String S_SELECT_LIST_BY_RES_TYPE_ID = "select_list_by_res_type_id";
	private static final String S_SELECT_LIST_BY_MODEL_ID = "select_list_by_model_id";
	private static final String S_SELECT_LIST_BY_MODEL_METRIC = "select_list_by_model_metric";
	/**
	 * 通过ids批量查询语句
	 */
	private static final String S_SELECT_BY_IDS = "select_by_ids";
	private static final String S_SELECT_BY_IDS_AND_RES_TYPE_ID = "s_select_by_ids_and_res_type_id";
	private static final String S_SELECT_LIST_BY_MODEL_ID_AND_METRIC_TYPES = "select_list_by_model_id_and_metric_types";
	private static final String S_DELETE_BY_TEMP_ID = "delete_by_temp_id";
	private static final String S_SELECT_LIST_BY_RES_TYPE_ID_AND_METRIC_TYPE = "select_list_by_res_type_id_and_metric_type";

	@SuppressWarnings("unchecked")
	public List<MetricBasePojo> doSelectByIds(ModelQueryParam param) throws DAOException {
		try {
			return getDam().selectList(S_SELECT_BY_IDS, param);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}
	
	@SuppressWarnings("unchecked")
	public List<MetricBasePojo> doSelectByIdsAndResTypeId (ModelQueryParam param) throws DAOException {
		try {
			return getDam().selectList(S_SELECT_BY_IDS_AND_RES_TYPE_ID, param);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}
	
	/**
	 * 根据模型id列表取得模型基础信息
	 */
	@SuppressWarnings("unchecked")
	@Deprecated
	public List<MetricBasePojo> doSelectListByModelAndMetricType(String modelId, String metricType) throws DAOException {
		try {
			Map<String, Object> t_params = new HashMap<String, Object>();
			t_params.put("modelId", modelId);
			t_params.put("metricType", metricType);
			IDam t_dam = getDam();
			return (List<MetricBasePojo>) t_dam.selectList(S_SELECT_LIST_BY_MODEL_ID_AND_METRIC_TYPES, t_params);

		} catch (DBException e) {
			throw new DAOException(e);
		}
	}

	/**
	 * 根据模型id列表取得模型基础信息
	 */
	@Deprecated
	@SuppressWarnings("unchecked")
	public List<MetricBasePojo> doSelectListByModelAndMetricTypes(String modelId, List<String> metricTypes)
			throws DAOException {
		try {
			Map<String, Object> t_params = new HashMap<String, Object>();
			t_params.put("modelId", modelId);
			t_params.put("metricTypes", metricTypes);
			t_params.put("isDisplay", 1);
			IDam t_dam = getDam();
			return (List<MetricBasePojo>) t_dam.selectList(S_SELECT_LIST_BY_MODEL_ID_AND_METRIC_TYPES, t_params);

		} catch (DBException e) {
			throw new DAOException(e);
		}
	}

	/**
	 * 根据模型id列表取得模型基础信息
	 */
	@SuppressWarnings("unchecked")
	public List<MetricBasePojo> doSelectListByModelId(String modelId) throws DAOException {
		try {
			IDam t_dam = getDam();
			return (List<MetricBasePojo>) t_dam.selectList(S_SELECT_LIST_BY_MODEL_ID, modelId);

		} catch (DBException e) {
			throw new DAOException(e);
		}
	}

	/**
	 * 根据模板id列表取得模型基础信息
	 */
	@SuppressWarnings("unchecked")
	public List<MetricBasePojo> doSelectListByResTypeId(String moniTempId) throws DAOException {
		try {
			IDam t_dam = getDam();
			return (List<MetricBasePojo>) t_dam.selectList(S_SELECT_LIST_BY_RES_TYPE_ID, moniTempId);

		} catch (DBException e) {
			throw new DAOException(e);
		}
	}
	
	@SuppressWarnings("unchecked")
	public MetricBasePojo doSelectByModelIdAndMetricId(String modelId,String metricId) throws DAOException {
		try {
			IDam t_dam = getDam();
			ModelMetricViewPojo param = new ModelMetricViewPojo();
			param.setModelId(modelId);
			param.setMetricId(metricId);
			return (MetricBasePojo)t_dam.selectOne(S_SELECT_LIST_BY_MODEL_METRIC, param);

		} catch (DBException e) {
			throw new DAOException(e);
		}
	}

	public void doDeleteByTempId(String tempId) throws DAOException {
		try {
			IDam t_dam = getDam();
			t_dam.delete(S_DELETE_BY_TEMP_ID, tempId);
		} catch (Exception te) {
			throw new DAOException(te);
		}

	}

	public void insert(List<MetricBasePojo> pojos)  throws DAOException {
		try {
			getDam().update("batchInsert", pojos);
		} catch (DBException e) {
			throw new DAOException(e);
		}
	}
	
	@SuppressWarnings("unchecked")
	public List<MetricBasePojo> doSelectByResTypeIdAndMetricType(String resTypeId,String metricTypeId) throws DAOException{
		ModelMetricViewPojo param = new ModelMetricViewPojo();
		param.setResTypeId(resTypeId);
		param.setMetricType(metricTypeId);
		
		try {
			return (List<MetricBasePojo>)getDam().selectList(S_SELECT_LIST_BY_RES_TYPE_ID_AND_METRIC_TYPE, param);
		} catch (DBException e) {
			throw new DAOException(e);
		}
	}
}