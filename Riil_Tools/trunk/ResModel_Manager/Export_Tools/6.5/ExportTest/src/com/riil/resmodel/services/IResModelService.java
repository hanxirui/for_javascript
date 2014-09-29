package com.riil.resmodel.services;

import java.sql.SQLException;
import java.util.List;

import com.riil.base.pojo.dict.DictPojo;
import com.riil.base.resmodel.pojo.base.MetricBasePojo;
import com.riil.base.resmodel.pojo.base.ResTypePojo;
import com.riil.base.resmodel.pojo.mmodel.ModelPojo;
import com.riil.base.resmodel.pojo.policy.PolicyResPojo;

public interface IResModelService {
	/**
	 * <code>S_SERVICE_ID</code> - Service Bean ID.
	 */
	String S_SERVICE_ID = "resModelService";
	
	public List<ModelPojo> getModelList() throws SQLException;
	public List<ResTypePojo> getResTypeList() throws SQLException;
	public List<PolicyResPojo> getPolicyList() throws SQLException;
	public List<MetricBasePojo> getMetricBaseList()throws SQLException;
	public DictPojo getDict()throws SQLException;
}
