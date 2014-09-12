package com.riil.base.policy.impl.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.riil.base.resmodel.pojo.policy.RecommandThresholdPojo;
import com.riil.base.resmodel.pojo.policy.RecommandThresholdQueryParm;
import com.riil.core.dam.exception.DBException;
import com.riil.core.dao.BaseDAO;
import com.riil.core.dao.DAOException;

public class RecThresholdDao extends BaseDAO<RecommandThresholdPojo>{
	
	private static final String SELECT_DATA_BY_METRIC_ID_POLICY_ID_MODEL_ID = "select_data_by_metric_id_policy_id_model_id";
	
	@SuppressWarnings("unchecked")
	public List<RecommandThresholdPojo> getRecThresholdByCondition(final RecommandThresholdQueryParm recThresholdParm) throws DAOException{
		
		try {
			Map<String, Object> t_param = new HashMap<String, Object>();
            t_param.put("policyId", recThresholdParm.getPolicyId());
            t_param.put("metricId", recThresholdParm.getMetricId());
            t_param.put("modelId", recThresholdParm.getModelId());
            t_param.put("startTime", recThresholdParm.getStartTime());
            t_param.put("endTime", recThresholdParm.getEndTime());
            t_param.put("yellow", recThresholdParm.getYellow()==null? recThresholdParm.getYellow() : Double.parseDouble(recThresholdParm.getYellow()));
            t_param.put("metricDate", recThresholdParm.getMetricDate());
            t_param.put("red", recThresholdParm.getRed() == null? recThresholdParm.getRed() : Double.parseDouble(recThresholdParm.getRed()));
			return getDam().selectList(SELECT_DATA_BY_METRIC_ID_POLICY_ID_MODEL_ID, t_param);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}
	
}
