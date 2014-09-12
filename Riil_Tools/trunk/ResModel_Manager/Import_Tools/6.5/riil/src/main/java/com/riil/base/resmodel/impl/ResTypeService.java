package com.riil.base.resmodel.impl;

import java.io.File;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import com.riil.base.pojo.dict.DictPojo;
import com.riil.base.pojo.enums.Enum4ResModel.ResIsMain;
import com.riil.base.resmodel.IModelService;
import com.riil.base.resmodel.IResTypeService;
import com.riil.base.resmodel.impl.db.dao.ResTypeDao;
import com.riil.base.resmodel.impl.file.BinFileUtils;
import com.riil.base.resmodel.pojo.base.ResTypeBaseQueryParam;
import com.riil.base.resmodel.pojo.base.ResTypePojo;
import com.riil.base.resmodel.pojo.mmodel.Model;
import com.riil.base.resmodel.pojo.vendor.ModelSysoidPojo;
import com.riil.base.resmodel.tools.ILazyData;
import com.riil.base.resmodel.tools.ResModelDataLoader;
import com.riil.base.utils.ResModelPojoUtils;
import com.riil.core.commons.Assert;
import com.riil.core.commons.ServerModule;
import com.riil.core.constant.Constants;
import com.riil.core.container.ContainerException;
import com.riil.core.container.ServiceContainer;
import com.riil.core.dao.DAOException;
import com.riil.core.dao.IQueryParam;
import com.riil.core.dao.PageDataPojo;
import com.riil.core.logger.SystemLogger;
import com.riil.core.service.AbsService;
import com.riil.core.service.ServiceException;
import com.riil.core.utils.bean.SerializeUtil;

/**
 * 资源类型服务 <br>
 * <p>
 * Create on : 2012-6-3<br>
 * <p>
 * 约束： <br>
 * 1. 资源类型文件与DB中的数据是一致的。 <br>
 * 2. 资源类型文件中包含全部信息（例如资源类型事件的“恢复事件列表”），而DB中则仅包括基本信息。<br>
 * 3. 仅有部分功能需要全部且完整的资源类型数据，而此类功能使用并不频繁（例如：“自动资源发现"）。<br>
 * </p>
 * <p>
 * 实现： <br>
 * 1.
 * 系统发布前，通过com.riil.base.resmodel.tools.ImportFile2Db将资源类型文件导入数据库中（即生成数据初始化脚本）。
 * <br>
 * 2. DB中的资源类型数据在系统运行过程中不会发生变化。（避免破坏与文件的一致性）。 <br>
 * 3. ResTypePojoService初始化时加载全部资源类型文件，保存在Cache中。 <br>
 * 4. 单个资源类型的读取顺序：Cache->DB->File，通过此方式读取的数据会更新到Cache中。<br>
 * 5. 资源类型指标等数据的加载顺序：Cache->File, 通过此方式加载的数据会保存在Cache中。<br>
 * </p>
 * <br>
 * 
 * @author ChenJuntao<br>
 * @version riil.resmodel.api v1.0
 *          <p>
 *          <br>
 *          <strong>Modify History:</strong><br>
 *          user modify_date modify_content<br>
 *          -------------------------------------------<br>
 *          <br>
 */
public class ResTypeService extends AbsService implements IResTypeService,
		ILazyData<ResTypePojo> {

	/**
	 * <code>S_LOGGER</code> - Logger.
	 */
	private static final SystemLogger S_LOGGER = SystemLogger.getSystemLogger(
			ResTypeService.class, ServerModule.ResourceModel);

	/**
	 * <code>S_ALL_ResTypePojo</code> - 资源类型缓存
	 */
	private Map<String, ResTypePojo> S_ALL_RES_TYPE = new ConcurrentHashMap<String, ResTypePojo>();

	/**
	 * <code>m_dataLoader</code> - 数据加载器，使用统一的策略加载数据
	 */
	private ResModelDataLoader<ResTypePojo> m_dataLoader;

	/**
	 * <code>isInit</code> - 是否已经初始化
	 */
	private boolean isInitialized = false;

	/**
	 * <code>m_resTypeDao</code> - DAO object.
	 */
	private ResTypeDao m_resTypeDao;

	/**
	 * <code>t_dictService</code> - {description}.
	 */
	private DictService m_dictService;

	/**
	 * 清除缓存
	 */
	private void clear() {
		if (S_ALL_RES_TYPE != null) {
			S_ALL_RES_TYPE.clear();
		}
	}

	public void reset() {
    	isInitialized = false;
    }
	
	/*
	 * (non-Javadoc)
	 * 
	 * @see com.riil.base.resmodel.IResTypeService#createResType
	 * (com.riil.base.resmodel.pojo.ResTypePojo)
	 */
	@Override
	public void createResType(final ResTypePojo resType)
			throws ServiceException {

		Assert.notNull(resType,
				"Create resType is error , because parameter is null.");

		try {

			this.m_resTypeDao.doInsertPojo(resType);

		} catch (DAOException te) {
			throw new ServiceException(te);
		}

	}
	
	protected void createBatch(List<ResTypePojo> templates) throws ServiceException {
		if (templates == null || templates.isEmpty()) {
			return;
		}
		try {
			int batchResSize = 1000;// 每次入库数
			int resCount = templates.size();// 总资源数
			int loopCount = (int) Math.ceil(resCount * 1d / batchResSize);// 循环次数
			// 导入资源实例
			for (int i = 0; i < loopCount; i++) {
				int from_index = batchResSize * i;
				int to_index = batchResSize * (i + 1);
				if (to_index > resCount) {
					to_index = resCount;
				}
				this.m_resTypeDao.insert(templates.subList(from_index,
						to_index));
			}
			
		} catch (DAOException te) {
			throw new ServiceException(te);
		}

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.riil.base.resmodel.IResTypeService#getAllResType()
	 */
	@Override
	public List<ResTypePojo> getAllResType() throws ServiceException {

		return getAll();
	}

	private List<ResTypePojo> getAll() throws ServiceException {
		List<ResTypePojo> t_list = new ArrayList<ResTypePojo>();
		t_list.addAll(getCache().values());

		Collections.sort(t_list, new ResTypePojoComparator());

		return t_list;
	}

	/**
	 * 根据TreeNodeId和SortId排序
	 */
	static class ResTypePojoComparator implements Comparator<ResTypePojo>,
			Serializable {

		/**
		 * <code>serialVersionUID</code> - {description}.
		 */
		private static final long serialVersionUID = 7941073283896006613L;

		/*
		 * (non-Javadoc)
		 * 
		 * @see java.util.Comparator#compare(java.lang.Object, java.lang.Object)
		 */
		@Override
		public int compare(ResTypePojo o1, ResTypePojo o2) {
			if (o1.getTreeNodeId().compareTo(o2.getTreeNodeId()) > 0) {
				return 1;
			} else if (o1.getTreeNodeId().compareTo(o2.getTreeNodeId()) == 0
					&& o1.getSortId() > o2.getSortId()) {
				return 1;
			} else {
				return -1;
			}
		}

	}

	/**
	 * 取得模板Cache
	 * 
	 * @return 模板Cache
	 */
	private Map<String, ResTypePojo> getCache() {
		if (!isInitialized) {
			init();
		}
		return S_ALL_RES_TYPE;
	}

	@Override
	public List<ResTypePojo> getAllResType(List<String> ids)
			throws ServiceException {
		Assert.notEmpty(ids, "Get All Template is error, because ids is null.");

		List<ResTypePojo> t_result = new ArrayList<ResTypePojo>(ids.size());
		for (String t_tempId : ids) {
			ResTypePojo t_temp = getResTypeByID(t_tempId);
			if (t_temp != null) {
				t_result.add(t_temp);
			}
		}
		return t_result;
	}

	@Override
	public List<ResTypePojo> getAllResType(ResIsMain isMain, String mainId)
			throws ServiceException {
		if (isMain == null) {
			return new ArrayList<ResTypePojo>();
		}
		List<ResTypePojo> t_result = new ArrayList<ResTypePojo>();
		if (isMain.equals(ResIsMain.MainRes)) {
			for (ResTypePojo t_temp : getAllResType()) {
				if (t_temp.getIsMain() == Constants.TRUE) {
					t_result.add(t_temp);
				}
			}
			return t_result;
		}
		if (isMain.equals(ResIsMain.SubRes)
				&& (mainId == null || mainId.isEmpty())) {
			for (ResTypePojo t_temp : getAllResType()) {
				if (t_temp.getIsMain() == Constants.FALSE) {
					t_result.add(t_temp);
				}
			}
			return t_result;
		} else {
			ResTypePojo t_temp = getResTypeByID(mainId);
			if (t_temp == null || !t_temp.isMain()) {
				return new ArrayList<ResTypePojo>();
			}

			List<String> ids = getSubIds(t_temp);
			if (!ids.isEmpty()) {
				for (ResTypePojo t_sub_temp : getAllResType(ids)) {
					t_result.add(t_sub_temp);
				}
			}
			return t_result;
		}
	}

	private List<String> getSubIds(ResTypePojo resTyp) throws ServiceException {
		IModelService t_modelSrv = null;
		try {
			t_modelSrv = ServiceContainer.getInstance().getServiceComponent(
					IModelService.S_SERVICE_ID);
		} catch (ContainerException e) {
			S_LOGGER.error("", e);
		}
		List<Model> t_models = t_modelSrv.getAllModelByResTypeIds(Arrays
				.asList(new String[] {resTyp.getId()}));
		Set<String> t_subIds = new HashSet<String>();
		for (Model model : t_models) {
			List<Model> allModelByResType = t_modelSrv.getAllModelByMainModel(
					ResIsMain.SubRes, model.getId());
			for (Model subModel : allModelByResType) {
				t_subIds.add(subModel.getResTypeId());
			}
		}

		return new ArrayList<String>(t_subIds);
	}

	@Override
	@Deprecated
	// TempBaseQueryParam 应废弃， 如有引用，根据具体需求加新接口
	public List<ResTypePojo> getAllResType(ResTypeBaseQueryParam resTypeBaseQueryParam)
			throws ServiceException {
		try {
			resTypeBaseQueryParam.setNotInIds(null);
			List<ResTypePojo> t_tempBases = this.getResTypeDao().doSelectAll();
			// List<TempBasePojo> t_tempBases =
			// this.getResTypeDao().doSelectTempBaseWithResNum4User(tempBaseQueryParam);

			List<String> t_tempIds = ResModelPojoUtils.getIds(t_tempBases);
			if (t_tempIds == null || t_tempIds.isEmpty()) {
				return new ArrayList<ResTypePojo>();
			} else {
				return getAllResType(t_tempIds);
			}
		} catch (DAOException te) {
			throw new ServiceException(te);
		}
	}

	@Override
	public List<ResTypePojo> getAllResTypeTree(int treeLevel, boolean withSub)
			throws ServiceException {
		try {
			ResTypePojo t_temp = new ResTypePojo();
			if (withSub) {
				t_temp.setTreeLevel(treeLevel);
				t_temp.setIsMain((byte) 0);

				List<ResTypePojo> t_tempBases = this.getResTypeDao()
						.doSelectTempBaseByLevelWithSub(t_temp);

				return getAllResType(ResModelPojoUtils.getIds(t_tempBases));

			} else {
				t_temp.setTreeLevel(treeLevel);
				List<ResTypePojo> t_tempBases = this.getResTypesByQuery(t_temp);

				return getAllResType(ResModelPojoUtils.getIds(t_tempBases));

			}
		} catch (DAOException te) {

			throw new ServiceException(te);
		}
	}

	@Override
	public List<ResTypePojo> getAllResTypeTree(int treeLevel, int depth,
			ResIsMain isMain) throws ServiceException {
		try {
			List<String> t_ids = new ArrayList<String>();
			if (depth == S_TREE_DEPTH_ALL) {
				ResTypePojo t_temp = new ResTypePojo();
				t_temp.setTreeLevel(treeLevel);
				t_temp.setIsMain(isMain.getValue());
				return this.getResTypeDao().doSelectTempBaseByLevelWithSub(
						t_temp);
			} else {
				if (depth > 10)
					depth = 10; // 保护，当前资源模板树最多不超过10级
				for (int i = 0; i < depth; i++) {
					ResTypePojo t_resType = new ResTypePojo();
					t_resType.setTreeLevel(treeLevel + i);
					t_resType.setIsMain(isMain.getValue());
					t_ids.addAll(ResModelPojoUtils.getIds(m_resTypeDao.doSelectList4Res(t_resType)));
				}
			}

			return getAllResType(t_ids);
		} catch (DAOException te) {
			throw new ServiceException(te);
		}
	}

	@Override
	public List<ResTypePojo> getAllResTypeTree(String id, boolean withSub)
			throws ServiceException {
		try {
			if (withSub) {
				return this.getResTypeDao()
						.doSelectTempBaseByTempIdIncludeChild(id);
			} else {
				List<ResTypePojo> t_result = new ArrayList<ResTypePojo>();
				t_result.add(getResTypeByID(id));
				return t_result;
			}
		} catch (DAOException te) {
			throw new ServiceException(te);
		}
	}

	@Override
	public List<String> getFatherTempIdsTreeByTreeNodeId(String treeNodeId,
			boolean withSelf) throws ServiceException {
		if (null == treeNodeId) {
			return null;
		}

		List<String> t_treeNodeIds = new ArrayList<String>();
		String t_temp = treeNodeId;
		while (t_temp.indexOf(".") > 0) {
			t_treeNodeIds.add(t_temp);
			t_temp = treeNodeId.substring(0, t_temp.lastIndexOf("."));
		}
		if (!withSelf) {
			t_treeNodeIds.remove(t_temp);
		}

		List<String> t_result = new ArrayList<String>();
		for (ResTypePojo t_tempPojo : getAll()) {
			if (t_treeNodeIds.contains(t_tempPojo.getTreeNodeId())) {
				t_result.add(t_tempPojo.getId());
			}
		}

		return t_result;
	}

	@Override
	public ResTypePojo getFromCache(String id) {
		return getCache().get(id);
	}

	@Override
	public ResTypePojo getFromDB(String id) throws DAOException {
		return this.getResTypeDao().doSelectByID(id);
	}

	private ResModelDataLoader<ResTypePojo> getDataLoader() {
		if (m_dataLoader == null) {
			m_dataLoader = new ResModelDataLoader<ResTypePojo>(this);
		}

		return m_dataLoader;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.resmodel.IResTypeService#getResTypeByID(java.lang.String)
	 */
	@Override
	public ResTypePojo getResTypeByID(final String resTypeID)
			throws ServiceException {
		Assert.hasLength(resTypeID, "id is null.");

		return getDataLoader().get(resTypeID, true); // 优先从Cache中查找
	}

	public ResTypePojo getResTypeByIDFromDB(final String resTypeID)
			throws ServiceException {

		Assert.hasLength(resTypeID,
				"Get resType info is error ,because resType id is null.");

		try {
			return this.m_resTypeDao.doSelectByID(resTypeID);
		} catch (DAOException te) {

			throw new ServiceException(te);
		}

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.resmodel.IResTypeService#getResTypeByQuery(com.riil.core
	 * .dao.IQueryParam )
	 */
	@Override
	public ResTypePojo getResTypeByQuery(final IQueryParam condition)
			throws ServiceException {

		Assert.notNull(condition,
				"Get resType info is error , beacause query condition is null.");

		try {
			return this.m_resTypeDao.doSelectOneByQuery(condition);
		} catch (DAOException te) {

			throw new ServiceException(te);
		}
	}

	@Override
	public ResTypePojo getResTypeBySysoid(String sysoid)
			throws ServiceException {
		DictPojo dictPojo = m_dictService.getDictPojo();
		ModelSysoidPojo dictSysoidPojoById = dictPojo
				.getDictSysoidPojoById(sysoid);
		if (dictSysoidPojoById == null) {
			return null;
		}
		return getResTypeByID(dictSysoidPojoById.getResTypeId());
	}

	@Override
	public ResTypePojo getResTypeByTreeNodeId(String treeNodeId)
			throws ServiceException {
		Assert.notNull(
				treeNodeId,
				"Get getTempBaseByTreeNodeId is error , beacause query condition treeNodeId is null.");

		for (ResTypePojo t_pojo : getAllResType()) {
			if (t_pojo.getTreeNodeId().equals(treeNodeId)) {
				return t_pojo;
			}
		}

		return null;
	}

	public ResTypeDao getResTypeDao() {
		return this.m_resTypeDao;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.resmodel.IResTypeService#getResTypePageByQuery(com.riil
	 * .core.dao. IQueryParam, int, int)
	 */
	@Override
	public PageDataPojo<ResTypePojo> getResTypePageByQuery(
			final IQueryParam condition) throws ServiceException {

		Assert.notNull(condition,
				"Get resType info page data is error , beacause query condition is null.");

		try {
			return this.m_resTypeDao.doSelectResType(condition);
		} catch (DAOException te) {

			throw new ServiceException(te);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.resmodel.IResTypeService#getResTypesByQuery(com.riil.core
	 * .dao.IQueryParam )
	 */
	@Override
	public List<ResTypePojo> getResTypesByQuery(final IQueryParam condition)
			throws ServiceException {

		Assert.notNull(condition,
				"Get resType info collection is error , beacause query condition is null.");

		try {
			return this.m_resTypeDao.doSelectList(condition);
		} catch (DAOException te) {

			throw new ServiceException(te);
		}

	}

	@Override
	public void importResType(ResTypePojo ResTypePojo)
			throws ServiceException {

	}

	@Override
	public synchronized void init() {
		if (isInitialized)
			return;
		clear();
		loadAllFile();
		S_LOGGER.error("ResTypeService init succ........................");
		isInitialized = true;
	}

	/**
	 * 加载全部资源类型文件到Cache
	 */
	private void loadAllFile() {
		Collection<File> files = BinFileUtils.getFiles4ResType();

		for (File t_file : files) {
			loadFile(t_file, true);
		}
		if (S_LOGGER.isDebugEnabled()) {
			S_LOGGER.debug("\n     Loaded size: " + S_ALL_RES_TYPE.size());
		}
	}

	/**
	 * 加载资源类型文件到Cache
	 * 
	 * @param t_file
	 *            资源类型文件
	 * @param updateCache
	 *            是否更新Cache
	 * @return 资源类型
	 */
	protected synchronized List<ResTypePojo> loadFile(File t_file, boolean updateCache) {
		try {
			if (!BinFileUtils.isNormalFile(t_file.getPath())) {
				return null;
			}
			if (!BinFileUtils.isResTypeFile(t_file.getPath())) {
				if (S_LOGGER.isDebugEnabled()) {
					S_LOGGER.debug("非资源类型文件：" + t_file.getAbsoluteFile() + "\n");
				}
				return null;
			}
			List<ResTypePojo> t_resType = (List<ResTypePojo>)SerializeUtil.convertBinToObject(
					ResTypePojo.class, t_file.getAbsoluteFile());
			if (t_resType == null) {
				return null;
			}
			if (updateCache) {
				for (ResTypePojo t_resTypePojo : t_resType) {
					S_ALL_RES_TYPE.put(t_resTypePojo.getId(), t_resTypePojo);
				}
			}
			return t_resType;
		} catch (Exception t_e) {
			S_LOGGER.error(
					"读取并反序列化文件出错,文件名：" + t_file.getAbsoluteFile() + "\n", t_e);
		}
		return null;
	}

	@Override
	public List<ResTypePojo> loadFiles(String id, boolean updateCache) {
		Collection<File> files = BinFileUtils.getFiles4ResType();
		List<ResTypePojo> t_resTypeRet = null;

		for (File t_file : files) {
			if (t_file.getName().equals(id)) {
				List<ResTypePojo> resType = loadFile(t_file, true);
				if (null != resType) {
					t_resTypeRet = resType;
				}
			}
		}

		return t_resTypeRet;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.riil.base.resmodel.IResTypeService#modifyResType
	 * (com.riil.base.resmodel.pojo.ResTypePojo)
	 */
	@Override
	public void modifyResType(final ResTypePojo resType)
			throws ServiceException {

		Assert.notNull(resType,
				"Modify resType info is error , because parameter is null.");

		try {

			this.m_resTypeDao.doUpdatePojo(resType);

		} catch (DAOException te) {
			throw new ServiceException(te);
		}

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.riil.base.resmodel.IResTypeService#removeAllResType ()
	 */
	@Override
	public void removeAllResType() throws ServiceException {

		try {

			this.m_resTypeDao.doDeleteAll();

		} catch (DAOException te) {

			throw new ServiceException(te);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.resmodel.IResTypeService#removeResType(com.riil.core.dao.I)
	 */
	@Override
	public void removeResType(final IQueryParam condition)
			throws ServiceException {

		Assert.notNull(condition,
				"Remove resType is error , beacause remove condition is null.");

		try {

			this.m_resTypeDao.doDeleteByQuery(condition);

		} catch (DAOException te) {

			throw new ServiceException(te);
		}

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.resmodel.IResTypeService#removeResType(java.lang.String)
	 */
	@Override
	public void removeResType(final String resTypeID) throws ServiceException {

		Assert.hasLength(resTypeID,
				"Remove resType info is error , because parameter is null.");

		try {

			this.m_resTypeDao.doDeleteByID(resTypeID);

		} catch (DAOException te) {

			throw new ServiceException(te);
		}

	}

	public void setResTypeDao(final ResTypeDao resTypeDao) {
		this.m_resTypeDao = resTypeDao;
	}

	@Override
	public void updateCache(ResTypePojo pojo) {

	}

	public DictService getDictService() {
		return m_dictService;
	}

	public void setDictService(DictService dictService) {
		m_dictService = dictService;
	}

	@Override
	public ResTypePojo loadFile(String id, boolean updateCache) {
		// TODO Auto-generated method stub
		return null;
	}
}