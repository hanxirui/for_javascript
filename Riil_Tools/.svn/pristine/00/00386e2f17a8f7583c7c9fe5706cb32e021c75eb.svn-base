package com.riil.base.resmodel.impl.db.dao;

import java.util.List;

import com.riil.base.binding.pojo.MetricBindingPojo;
import com.riil.core.dam.exception.DBException;
import com.riil.core.dao.BaseDAO;
import com.riil.core.dao.DAOException;

public class MetricBindingDao extends BaseDAO<MetricBindingPojo> {
	public void insert(List<MetricBindingPojo> pojos)  throws DAOException {
		try {
			getDam().update("batchInsert", pojos);
		} catch (DBException e) {
			throw new DAOException(e);
		}
	}
}
