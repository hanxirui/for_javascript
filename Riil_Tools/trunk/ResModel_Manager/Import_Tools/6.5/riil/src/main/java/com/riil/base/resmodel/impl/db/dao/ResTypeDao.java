package com.riil.base.resmodel.impl.db.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.riil.base.binding.pojo.ResTypeExtendPojo;
import com.riil.base.resmodel.pojo.base.ResTypePojo;
import com.riil.base.resmodel.pojo.base.ResTypeBaseQueryParam;
import com.riil.base.resource.param.DomainParam;
import com.riil.core.dam.IDam;
import com.riil.core.dam.exception.DBException;
import com.riil.core.dao.BaseDAO;
import com.riil.core.dao.DAOException;
import com.riil.core.dao.IQueryParam;
import com.riil.core.dao.PageDataPojo;

public class ResTypeDao extends BaseDAO<ResTypePojo> {

	private static final String S_SQL_SEL_BY_PAGE_COUNT = "select_by_condition_count";

	private static final String S_SQL_SEL_BY_PAGE = "select_by_condition";
	
	private static final String S_SELECT_LIST_4RES = "select_list_4res";

	public PageDataPojo<ResTypePojo> doSelectResType(IQueryParam param)
			throws DAOException {

		if (null != param) {

			param.setPageCountSqlId(S_SQL_SEL_BY_PAGE_COUNT);
			param.setPageSqlId(S_SQL_SEL_BY_PAGE);
			return this.doPageSelect(param);
		}

		return null;
	}

	/**
	 * 根据模型id列表取得模型基础信息
	 */
	@SuppressWarnings("unchecked")
	public List<ResTypePojo> doSelectTempBaseByTempIdIncludeChild(String tempId)
			throws DAOException {
		try {
			IDam t_dam = getDam();

			return t_dam.selectList("select_by_temp_id_include_child", tempId);
		} catch (DBException e) {
			throw new DAOException(e);
		}
		/**
		 * SELECT t.c_desc, t.c_desc_en, t.c_icon, t.c_id, t.c_is_discovery,
		 * t.c_is_display, t.c_is_important, t.c_is_main, t.c_main_temp_id,
		 * t.c_name, t.c_name_en, t.c_parent_id, t.c_id, t.c_sort_id,
		 * t.c_sub_ress, t.c_tree_level, t.c_tree_node_id, t.c_version,
		 * t.c_res_catalog, t.c_tag1, t.c_tag2, t.c_tag3, t.c_tag4 FROM
		 * t_moni_temp_base AS t WHERE t.c_id in ( CONCAT('''', (select REPLACE
		 * (c_sub_ress,',',''',''') FROM t_moni_temp_base WHERE
		 * c_id='RIIL_RMT_Host_Windows'),'''') )
		 */
	}
	
	/**
	 * 根据treeLevel取得模型基础信息
	 */
	@SuppressWarnings("unchecked")
	public List<ResTypePojo> doSelectTempBaseByLevelWithSub(ResTypePojo t_temp) throws DAOException {
		try {
			IDam t_dam = getDam();
			return t_dam.selectList("select_by_level_with_sub_level", t_temp);

		} catch (DBException e) {
			throw new DAOException(e);
		}
	}
	
	public void insert(List<ResTypeExtendPojo> pojos)  throws DAOException {
		try {
			getDam().update("batchInsert", pojos);
		} catch (DBException e) {
			throw new DAOException(e);
		}
	}
	
	@SuppressWarnings("unchecked")
	public List<ResTypePojo> doSelectByDomainParam(String selectId, DomainParam param) throws DAOException {
		try {
			return getDam().selectList(selectId, param);
		} catch (DBException e) {
			throw new DAOException(e);
		}
	}
	
	@SuppressWarnings("unchecked")
	public List<ResTypePojo> getAllSubResTypeWithResNum(String mainResId) throws DAOException {
		try {
			IDam t_dam = getDam();
			return t_dam.selectList("select_sub_temp_with_res_num", mainResId);

		} catch (DBException e) {
			throw new DAOException(e);
		}
	}
	
	@SuppressWarnings("unchecked")
	public List<ResTypePojo> doSelectTempTreeHasMainResByTreeLevel(int treeLevel) throws DAOException {
		try {
			Map<String, Object> param = new HashMap<String, Object>();
			param.put("treeLevel", treeLevel);
			return getDam().selectList("select_hasMainRes_by_treeLevel", param);

		} catch (DBException e) {
			throw new DAOException(e);
		}
	}
	
	@SuppressWarnings("unchecked")
	public List<ResTypePojo> doSelectResTypeListByBizId(ResTypeBaseQueryParam param) throws DAOException {
		try {
			IDam t_dam = getDam();
			return t_dam.selectList("select_res_type_list_by_biz_id", param);

		} catch (DBException e) {
			throw new DAOException(e);
		}
	}
	
	/**
	 * 根据treeLevel取得模型基础信息
	 */
	@SuppressWarnings("unchecked")
	public List<ResTypePojo> doSelectList4Res(ResTypePojo t_resType) throws DAOException {
		try {
			IDam t_dam = getDam();
			return t_dam.selectList(S_SELECT_LIST_4RES, t_resType);

		} catch (DBException e) {
			throw new DAOException(e);
		}
	}
}
