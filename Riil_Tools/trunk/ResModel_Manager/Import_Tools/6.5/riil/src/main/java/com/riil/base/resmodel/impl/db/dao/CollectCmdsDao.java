package com.riil.base.resmodel.impl.db.dao;

import java.util.List;

import com.riil.base.binding.pojo.CollectCmdsPojo;
import com.riil.core.dam.exception.DBException;
import com.riil.core.dao.BaseDAO;
import com.riil.core.dao.DAOException;

public class CollectCmdsDao extends BaseDAO<CollectCmdsPojo> {
	public void insert(List<CollectCmdsPojo> pojos)  throws DAOException {
		try {
			getDam().update("batchInsert", pojos);
		} catch (DBException e) {
			throw new DAOException(e);
		}
	}
}
