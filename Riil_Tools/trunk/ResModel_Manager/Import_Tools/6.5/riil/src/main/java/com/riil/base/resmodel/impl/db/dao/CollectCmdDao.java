package com.riil.base.resmodel.impl.db.dao;

import java.util.List;

import com.riil.base.binding.pojo.CollectCmdPojo;
import com.riil.core.dam.exception.DBException;
import com.riil.core.dao.BaseDAO;
import com.riil.core.dao.DAOException;

public class CollectCmdDao extends BaseDAO<CollectCmdPojo> {
	public void insert(List<CollectCmdPojo> pojos)  throws DAOException {
		try {
			getDam().update("batchInsert", pojos);
		} catch (DBException e) {
			throw new DAOException(e);
		}
	}
}
