package com.riil.base.resmodel;

import java.util.List;

import com.riil.base.pojo.enums.Enum4ResModel.ResIsMain;
import com.riil.base.resmodel.pojo.base.ResTypePojo;
import com.riil.base.resmodel.pojo.base.ResTypeBaseQueryParam;
import com.riil.core.dao.PageDataPojo;
import com.riil.core.dao.IQueryParam;
import com.riil.core.service.IService;
import com.riil.core.service.ServiceException;

public interface IResTypeService extends IService {

	/**
	 * <code>S_SERVICE_ID</code> - Service Bean ID.
	 */
	public static final String S_SERVICE_ID = "resTypeService";

	int S_TREE_DEPTH_ALL = -1;

	/**
	 * create resType info.
	 * 
	 * @param resType
	 *            - resType POJO object.
	 * @throws ServiceException
	 */
	abstract public void createResType(final ResTypePojo resType)
			throws ServiceException;

	/**
	 * 取得全部资源类型-从Cache，用于初始化
	 * 
	 * @return resType POJO object collection.
	 * @throws ServiceException
	 */
	List<ResTypePojo> getAllResType() throws ServiceException;

	/**
	 * 取得-按IDs
	 * 
	 * @param tempIds 类型ID的List
	 * @return 类型
	 * @throws ServiceException 服务异常
	 */
	List<ResTypePojo> getAllResType(List<String> ids) throws ServiceException;
	
	/**
	 * 根据资源类型取得主资源类型，或子资源类型<br>
	 * 资源类型为主资源，返回全部主资源类型<br>
	 * 资源类型为子资源，主资源类型ID为null或空串，则返回全部子资源类型<br>
	 * 资源类型为子资源，主资源类型ID不为null或空串，则返回主资源类型ID对应的全部子资源类型<br>
	 * 
	 * @param isMain 资源类型(主资源或子资源)
	 * @param mainTempId 主资源类型ID
	 * @return 缓存的主资源类型或子资源类型
	 * @throws ServiceException 服务异常
	 */
	List<ResTypePojo> getAllResType(ResIsMain isMain, String mainId) throws ServiceException;
	
	/**
	 * 取得类型-按查询条件<br>
	 * 
	 * @param tempBaseQueryParam 查询条件
	 * @return 类型
	 * @throws ServiceException 服务异常
	 */
	@Deprecated
	List<ResTypePojo> getAllResType(final ResTypeBaseQueryParam tempBaseQueryParam) throws ServiceException;
	
	/**
	 * 取得类型树by level【可以包括子级别】<br>
	 * 
	 * @param treeLevel 类型树级别，<code>treeLevel=1</code>取全部1级类型，依此类推
	 * @param withSub 是否包含下级类型
	 * @return 类型（及其下级类型）
	 * @throws ServiceException 服务异常
	 */
	List<ResTypePojo> getAllResTypeTree(int treeLevel, boolean withSub) throws ServiceException;
	
	/**
	 * 取得类型树by level【可以包括子级别】
	 * 
	 * @param treeLevel 类型树级别， <code>treeLevel=1</code>取全部1级类型，依此类推
	 * @param depth 子级别深度， <code>treeLevel=1, depth=2</code>取全部1,2级类型，依此类推<br>
	 * 							<code>depth=IResTypeService.S_TREE_DEPTH_ALL</code>包含全部下级类型
	 * @param isMain 资源类型(主资源或子资源)
	 * @return 类型（及其下级类型）
	 * @throws ServiceException
	 */
	List<ResTypePojo> getAllResTypeTree(int treeLevel, int depth, ResIsMain isMain) throws ServiceException;

	/**
	 * 根据类型ID取得类型及其所有下级类型（注：不是子资源类型，而是下级类型）
	 * 
	 * @param tempId 类型ID
	 * @param withSub 是否包含下级类型
	 * @return 类型（及其下级类型）
	 * @throws ServiceException 服务异常
	 */
	//TODO 与 getAllResType(ResIsMain isMain, String mainId) 容易混淆，应修改 
	List<ResTypePojo> getAllResTypeTree(String tempId, boolean withSub) throws ServiceException;
	
	/**
	 * 取得根据treeNodeId 获得所有上级 类型【包括自身】
	 * 
	 * @param treeNodeId 类型TreeNodeId
	 * @param withSelf 是否包括自身
	 * @return 类型ID的List
	 * @throws ServiceException
	 */
	List<String> getFatherTempIdsTreeByTreeNodeId(String treeNodeId, boolean withSelf) throws ServiceException;

	/**
	 * get resType by ID.
	 * 
	 * @param resTypeID
	 *            - resType ID.
	 * @return resType POJO object or null.
	 * @throws ServiceException
	 */
	ResTypePojo getResTypeByID(final String resTypeID) throws ServiceException;
	
	/**
	 * get resType info by query.
	 * 
	 * @param condition
	 *            - query condition POJO object.
	 * @return resType POJO object or null.
	 * @throws ServiceException
	 */
	ResTypePojo getResTypeByQuery(final IQueryParam condition)
			throws ServiceException;

	/**
	 * 取得类型-按SysOID<br>
	 * 根据ModelSysoid中的映射关系，通过SysOID->Model->ResType的方式查询
	 * 
	 * @param sysoid ModelSysoid中的SysOID
	 * @return 类型
	 * @throws ServiceException 服务异常
	 */
	ResTypePojo getResTypeBySysoid(String sysoid) throws ServiceException;
	
	/**
	 * 取得类型-按TreeNodeId
	 * 
	 * @param treeNodeId 类型TreeNodeId
	 * @return 类型
	 * @throws ServiceException 服务异常
	 */
	ResTypePojo getResTypeByTreeNodeId(String treeNodeId) throws ServiceException;

	/**
	 * get resType by query for page.
	 * 
	 * @param condition
	 *            - query condition POJO object.
	 * @param pageIndex
	 *            - page index, first page index is 1.
	 * @param pageSize
	 *            - page size, default page size is 10.
	 * @return
	 * @throws ServiceException
	 */
	PageDataPojo<ResTypePojo> getResTypePageByQuery(final IQueryParam condition)
			throws ServiceException;

	/**
	 * get resType by query.
	 * 
	 * @param condition
	 *            - query condition POJO object.
	 * @return resType info POJO object collection or null.
	 * @throws ServiceException.
	 */
	List<ResTypePojo> getResTypesByQuery(final IQueryParam condition)
			throws ServiceException;

	/**
	 * 导入类型至DB中<br>
	 * 根据需求：仅更新类型<br>
	 * 
	 * @param ResTypePojo 类型
	 * @throws ServiceException 服务异常
	 */
	void importResType(ResTypePojo ResTypePojo) throws ServiceException;

	/**
	 * 初始化方法.
	 */

	void init();

	/**
	 * modify resType info.
	 * 
	 * @param resType
	 *            - resType POJO object.
	 * @throws ServiceException
	 */
	abstract public void modifyResType(final ResTypePojo resType)
			throws ServiceException;

	/**
	 * remove all resType info.
	 * 
	 * @throws ServiceException
	 */
	void removeAllResType() throws ServiceException;

	/**
	 * remove resType info by condition.
	 * 
	 * @param condition
	 *            - remove resType condition.
	 * @throws ServiceException
	 */
	void removeResType(final IQueryParam condition) throws ServiceException;

	/**
	 * remove resType by resType ID.
	 * 
	 * @param String
	 *            resTypeID - resType ID.
	 * @throws ServiceException
	 */
	void removeResType(final String resTypeID) throws ServiceException;

}