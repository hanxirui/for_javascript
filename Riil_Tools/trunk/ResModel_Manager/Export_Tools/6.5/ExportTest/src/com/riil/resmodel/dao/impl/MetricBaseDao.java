package com.riil.resmodel.dao.impl;

import java.sql.SQLException;
import java.util.List;

import org.mybatis.spring.support.SqlSessionDaoSupport;

import com.riil.base.resmodel.pojo.base.MetricBasePojo;

public class MetricBaseDao extends SqlSessionDaoSupport {
	
	public List<MetricBasePojo> doMetricBaseSelectAll() throws SQLException {
		List<MetricBasePojo> t_selectList = this.getSqlSession().selectList("com.riil.resmodel.dao.impl.metricBaseDao.select_all");
		return t_selectList;
	}
}
