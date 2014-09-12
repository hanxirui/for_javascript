package com.riil.base.resmodel.impl.db.dao;

import java.util.List;

import com.riil.base.binding.pojo.CmdSupportPojo;
import com.riil.core.dam.exception.DBException;
import com.riil.core.dao.BaseDAO;
import com.riil.core.dao.DAOException;

public class CmdSupportDao extends BaseDAO<CmdSupportPojo> {
	public void insert(List<CmdSupportPojo> pojos)  throws DAOException {
		try {
			getDam().update("batchInsert", pojos);
		} catch (DBException e) {
			throw new DAOException(e);
		}
	}
}
