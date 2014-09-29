package com.riil.resmodel.dao.impl;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.support.SqlSessionDaoSupport;

import com.riil.base.pojo.dict.DictCollFrequencyPojo;
import com.riil.base.resmodel.pojo.base.EventBasePojo;
import com.riil.base.resmodel.pojo.base.MetricGroupPojo;
import com.riil.base.resmodel.pojo.base.VendorPojo;
import com.riil.base.resmodel.pojo.vendor.ModelSysoidPojo;
import com.riil.base.resmodel.pojo.vendor.VendorModelPojo;

public class DictDao extends SqlSessionDaoSupport{
	public List<DictCollFrequencyPojo> getCollFrequencyAll(){
		List<DictCollFrequencyPojo> t_selectList = this.getSqlSession().selectList("com.riil.resmodel.dao.impl.collFrequencyDao.select_all");
		return t_selectList;
	}
	public List<ModelSysoidPojo> getModelSysoidAll(){
		List<ModelSysoidPojo> t_selectList = this.getSqlSession().selectList("com.riil.resmodel.dao.impl.modelSysoidDao.select_all");
		return t_selectList;
	}
	public List<VendorPojo> getVendorAll(){
		List<VendorPojo> t_selectList = this.getSqlSession().selectList("com.riil.resmodel.dao.impl.vendorDao.select_all");
		return t_selectList;
	}
	public List<VendorModelPojo> getVendorModelAll(){
		List<VendorModelPojo> t_selectList = this.getSqlSession().selectList("com.riil.resmodel.dao.impl.vendorModelDao.select_all");
		return t_selectList;
	}
	public List<MetricGroupPojo> getMetricGroupAll(){
		List<MetricGroupPojo> t_selectList = this.getSqlSession().selectList("com.riil.resmodel.dao.impl.metricGroupDao.select_all");
		return t_selectList;
	}
	public List<Map<String,String>> getMetricGroupRelAll(){
		List<Map<String,String>> t_selectList = this.getSqlSession().selectList("com.riil.resmodel.dao.impl.metricGroupDao.select_all_metric_rel");
		return t_selectList;
	}
	public List<EventBasePojo> getEventBaseAll(){
		List<EventBasePojo> t_selectList = this.getSqlSession().selectList("com.riil.resmodel.dao.impl.eventBaseDao.select_all");
		return t_selectList;
	}
}
