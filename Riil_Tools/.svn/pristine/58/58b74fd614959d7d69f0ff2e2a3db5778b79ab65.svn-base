package com.riil.base.resmodel.impl.db.dao;

import java.util.List;

import com.riil.base.binding.pojo.CollectCmdsConnProtocol;
import com.riil.core.dam.exception.DBException;
import com.riil.core.dao.BaseDAO;
import com.riil.core.dao.DAOException;

public class CollectCmdsConnProtocolDao extends BaseDAO<CollectCmdsConnProtocol> {
	public void insert(List<CollectCmdsConnProtocol> pojos)  throws DAOException {
		try {
			getDam().update("batchInsert", pojos);
		} catch (DBException e) {
			throw new DAOException(e);
		}
	}
}
