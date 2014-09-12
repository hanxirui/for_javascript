package com.riil.base.sys.dao;

import java.util.List;

import com.riil.base.pojo.sys.SysServerPojo;
import com.riil.core.dam.exception.DBException;
import com.riil.core.dao.BaseDAO;
import com.riil.core.dao.DAOException;

public class SysServerDao extends BaseDAO<SysServerPojo> {

	/**
	 * 根据类型查询
	 */
	private static final String S_SELECT_BY_TYPE = "select_by_type";
	private static final String S_UPDATE_BY_SERVER_TYPE_IPADDR = "update_by_server_type_ipaddr";
	private static final String S_UPDATE_BY_SERVER_ID = "update_by_sysserver_id";

	/**
	 * 根据类型查询
	 * 
	 * @param type
	 *            类型，参考ISysServerService常量
	 * @return List<SysServerPojo>
	 * @throws DAOException
	 *             数据操作异常
	 */
	@SuppressWarnings("unchecked")
	public List<SysServerPojo> doSelectByType(final String type) throws DAOException {
		try {
			return getDam().selectList(S_SELECT_BY_TYPE, type);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	public int doUpdateById(SysServerPojo sysServer) throws DAOException {
		try {
			return getDam().update(S_UPDATE_BY_SERVER_ID, sysServer);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	public int doUpdateByTeypIpAddr(SysServerPojo sysServer) throws DAOException {
		try {
			return getDam().update(S_UPDATE_BY_SERVER_TYPE_IPADDR, sysServer);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

}
