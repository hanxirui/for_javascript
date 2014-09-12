package com.riil.base.resmodel.impl.db.dao;

import java.util.List;

import com.riil.base.resmodel.pojo.base.EventBasePojo;
import com.riil.core.dam.exception.DBException;
import com.riil.core.dao.BaseDAO;
import com.riil.core.dao.DAOException;

public class EventBaseDao extends BaseDAO<EventBasePojo> {

	public void insert(List<EventBasePojo> pojos)  throws DAOException {
		try {
			getDam().update("batchInsert", pojos);
		} catch (DBException e) {
			throw new DAOException(e);
		}
	}
}
