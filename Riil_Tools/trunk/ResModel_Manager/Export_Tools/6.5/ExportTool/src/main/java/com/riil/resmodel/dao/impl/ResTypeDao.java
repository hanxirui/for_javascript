package com.riil.resmodel.dao.impl;

import java.sql.SQLException;
import java.util.List;

import org.mybatis.spring.support.SqlSessionDaoSupport;

import com.riil.base.resmodel.pojo.base.ResTypePojo;

public class ResTypeDao extends SqlSessionDaoSupport {
	
	public List<ResTypePojo> doResTypeSelectAll() throws SQLException {
		List<ResTypePojo> t_selectList = this.getSqlSession().selectList("com.riil.resmodel.dao.impl.ResTypeDao.select_all");
		return t_selectList;
	}
}
