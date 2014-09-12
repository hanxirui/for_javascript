package com.riil.base.resmodel.impl;

import static com.riil.base.resmodel.tools.ResModelServiceLoader.getDictService;

import java.io.File;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;

import com.riil.base.pojo.enums.Enum4ResModel.ResIsMain;
import com.riil.base.pojo.enums.EnumRoot.MetricType;
import com.riil.base.resmodel.IDictService;
import com.riil.base.resmodel.IModelService;
import com.riil.base.resmodel.IResTypeService;
import com.riil.base.resmodel.impl.db.dao.ModelBaseDao;
import com.riil.base.resmodel.impl.db.dao.ModelMetricRelDao;
import com.riil.base.resmodel.impl.file.BinFileUtils;
import com.riil.base.resmodel.pojo.base.MetricBasePojo;
import com.riil.base.resmodel.pojo.base.ModelBasePojo;
import com.riil.base.resmodel.pojo.base.ModelMetricRelPojo;
import com.riil.base.resmodel.pojo.base.ResTypePojo;
import com.riil.base.resmodel.pojo.mmodel.Model;
import com.riil.base.resmodel.pojo.mmodel.ModelMetricBindingPojo;
import com.riil.base.resmodel.pojo.mmodel.ModelPojo;
import com.riil.base.resmodel.pojo.vendor.ModelSysoidPojo;
import com.riil.base.resmodel.pojo.vendor.VendorModelPojo;
import com.riil.base.resmodel.tools.ILazyData;
import com.riil.base.resmodel.tools.ImportOneFile2Db;
import com.riil.base.resmodel.tools.ResModelDataLoader;
import com.riil.base.utils.ResModelPojoUtils;
import com.riil.core.commons.Assert;
import com.riil.core.commons.ServerModule;
import com.riil.core.container.ContainerException;
import com.riil.core.dao.DAOException;
import com.riil.core.logger.SystemLogger;
import com.riil.core.pojo.AbsPojo;
import com.riil.core.service.ServiceException;
import com.riil.core.utils.bean.SerializeUtil;

/**
 * 监控模型服务 <br>
 * <p>
 * Create on : 2012-6-11<br>
 * <p>
 * </p>
 * <br>
 * 
 * @author ChenJuntao<br>
 * @version riil.resmodel.impl v1.0
 *          <p>
 *          <br>
 *          <strong>Modify History:</strong><br>
 *          user modify_date modify_content<br>
 *          -------------------------------------------<br>
 *          <br>
 */
public class ModelService implements IModelService, ILazyData<ModelPojo> {

	/**
	 * <code>S_LOGGER</code> - Logger
	 */
	private static final SystemLogger S_LOGGER = SystemLogger.getSystemLogger(ModelService.class,
			ServerModule.ResourceModel);
	
	/**
	 * 所有模型
	 */
	private static final Map<String, ModelPojo> S_ALL_MODELPOJO = new ConcurrentHashMap<String, ModelPojo>();
	private static final Map<String, Set<String>> S_ALL_MODELPOJO_BY_TEMPID = new ConcurrentHashMap<String, Set<String>>();
	private static final Map<String, Set<String>> S_ALL_SUB_MODELPOJO_BY_MAIN = new ConcurrentHashMap<String, Set<String>>();
	

	private ResModelDataLoader<ModelPojo> m_dataLoader;

	/**
	 * <code>m_modelBaseDao</code> - DAO object.
	 */
	private ModelBaseDao m_modelBaseDao;

	/**
	 * <code>m_modelMetricRelDao</code> - DAO object.
	 */
	private ModelMetricRelDao m_modelMetricRelDao;

	/**
	 * <code>m_dictService</code> - 字典服务
	 */
	private IDictService m_dictService;
	
	protected IResTypeService m_resTypeService;

	private boolean isInitialized = false;

	@Override
	public void destroy() throws ServiceException {
		clear();
	}

	@Override
	public void start() throws ServiceException {
	}
	
	public void reset() {
    	isInitialized = false;
    }

	@Override
	public void dataChange(String dataId, String dataType, AbsPojo data, DataChangeType dataChangeType) {
		switch (dataChangeType) {
		case delete:
			deleteTempFromCache(dataId);
			break;
		case update:
			deleteTempFromCache(dataId);
			loadModel(dataId, true);
			break;
		default:
			break;
		}
	}

	/**
	 * 删除内存中数据
	 * 
	 * @param 策略id
	 */
	protected void deleteTempFromCache(String modelId) {
		try {
			ModelPojo t_model = getModelCache().remove(modelId);
			if (t_model == null)
				return;
			getResTypeCache().remove(t_model.getResTypeId());
		} catch (Exception t_e) {
			S_LOGGER.error("Delete model error for modelId：" + modelId + "\n", t_e);
		}
	}

	@Override
	public synchronized void init() {
		if(isInitialized) return;
		clear();
		loadAllFile();
		S_LOGGER.error("ModelService init succ........................");
		isInitialized = true;
	}

	private ResModelDataLoader<ModelPojo> getDataLoader() {
		if (m_dataLoader == null) {
			m_dataLoader = new ResModelDataLoader<ModelPojo>(this);
		}

		return m_dataLoader;
	}

	private Map<String, ModelPojo> getModelCache() {
		if (!isInitialized) {
			init();
		}
		return S_ALL_MODELPOJO;
	}

	private Map<String, Set<String>> getResTypeCache() {
		if (!isInitialized) {
			init();
		}
		return S_ALL_MODELPOJO_BY_TEMPID;
	}
	
	private Map<String,Set<String>> getSubModelCache()
	{
	    init();
	    
	    return S_ALL_SUB_MODELPOJO_BY_MAIN;
	}

	/*
	 * (non-Javadoc)
	 * @see com.riil.base.resmodel.tools.ILazyData#getFromCache(java.lang.String)
	 */
	@Override
	public ModelPojo getFromCache(String modelId) {
		return getModelCache().get(modelId);
	}

	@Override
	public ModelPojo getFromDB(String modelId) throws DAOException {
		ModelBasePojo t_tempBase = m_modelBaseDao.doSelectByID(modelId);
		ModelPojo t_tempPojo = ResModelPojoUtils.parse(t_tempBase, ModelPojo.class);
		if (t_tempPojo == null) {
			return null;
		}

		ModelMetricRelPojo t_condition = new ModelMetricRelPojo();
		t_condition.setModelId(modelId);
		List<ModelMetricRelPojo> t_metrics = m_modelMetricRelDao.doSelectList(t_condition);
		for (ModelMetricRelPojo t_metric : t_metrics) {
			ModelMetricBindingPojo t_modelMetric = new ModelMetricBindingPojo();
			t_modelMetric.setId(t_metric.getMetricId());
			t_tempPojo.addModelMetricBindingPojo(t_modelMetric);
		}

		return t_tempPojo;
	}

	@Override
	public void updateCache(ModelPojo model) {
		// 更新Cache
		getModelCache().put(model.getId(), model);

		Set<String> t_modelIds = getResTypeCache().get(model.getResTypeId());
		if (t_modelIds == null) {
			t_modelIds = new HashSet<String>();
		}
		t_modelIds.add(model.getId());
		getResTypeCache().put(model.getResTypeId(), t_modelIds);
	}

	private void loadAllFile() {
		Collection<File> files = BinFileUtils.getFiles4Model();

		for (File t_file : files) {
			if (t_file.isFile()) {
				loadFile(t_file, true);
			}
		}
		if (S_LOGGER.isDebugEnabled()) {
			S_LOGGER.debug("\n     Loaded " + S_ALL_MODELPOJO.size() + " model");
		}
	}

	/**
	 * 加载文件到内存
	 * 
	 * @param t_file
	 */
	@Override
	public ModelPojo loadFile(String modelId, boolean isCache) {
		Collection<File> files = BinFileUtils.getFiles4Model(modelId);
		ModelPojo t_model = null;
		for (File t_file : files) {
			if (t_file.isFile()) {
				ModelPojo t_temp = loadFile(t_file, isCache);
				if (null != t_temp) {
					t_model = t_temp;
				}
			}
		}
		return t_model;
	}

	@Override
	public ModelPojo loadFile(File file){
		return loadFile(file, true);
	}
	
	/**
	 * 加载文件到内存
	 * 
	 * @param t_file
	 */
	protected synchronized ModelPojo loadFile(File t_file, boolean updateCache) {
		try {
			if (!BinFileUtils.isNormalFile(t_file.getPath())) {
				return null;
			}
			if (!BinFileUtils.isModelFile(t_file.getPath())) {
				if (S_LOGGER.isDebugEnabled()) {
					S_LOGGER.debug("非监控模型文件：" + t_file.getAbsoluteFile() + "\n");
				}
				return null;
			}
			ModelPojo t_model = SerializeUtil.convertBinToObject(ModelPojo.class, t_file.getAbsoluteFile());

			if (t_model == null || t_model.getInUse() == -1) {
				return null;
			}
			t_model.updateModelId();
			ResTypePojo t_temp = getResTypeService().getResTypeByID(t_model.getResTypeId());
			if (t_temp == null) {
				S_LOGGER.error("Ignore this model data file：" + t_model.getId() + "；The tempId: "
						+ t_model.getResTypeId() + "  not found!");
				return null;
			}
			checkMetricId(t_model, t_temp);
			t_model.setTreeNodeId(t_temp.getTreeNodeId());
			if (updateCache) {
				S_ALL_MODELPOJO.put(t_model.getId(), t_model);

				Set<String> t_modelIds = S_ALL_MODELPOJO_BY_TEMPID.get(t_model.getResTypeId());
				if (t_modelIds == null) {
					t_modelIds = new HashSet<String>();
				}
				t_modelIds.add(t_model.getId());
				S_ALL_MODELPOJO_BY_TEMPID.put(t_model.getResTypeId(), t_modelIds);
				if(!t_model.isMain() && t_model.getMainModelId()==null){
					System.err.println(t_model.getId());
					S_LOGGER.error(" ModelId=" + t_model.getId());
				}
				
				if(!t_model.isMain()  && t_model.getMainModelId()!=null ){
					Set<String> t_subModelIds = S_ALL_SUB_MODELPOJO_BY_MAIN.get(t_model.getMainModelId());
					if (t_subModelIds == null) {
						t_subModelIds = new HashSet<String>();
					}
					t_subModelIds.add(t_model.getId());
					S_ALL_SUB_MODELPOJO_BY_MAIN.put(t_model.getMainModelId(), t_subModelIds);
				}
			}
			VendorModelPojo t_vendor = getDictService().getVendorByVendorId(t_model.getVendorId());
			if (null != t_vendor) {
				t_model.setVendorName(t_vendor.getVendorName());
			} else if (StringUtils.isNotBlank(t_model.getVendorId())) {
				S_LOGGER.error("模型中的厂商在厂商字典中没有定义：VendorId=" + t_model.getVendorId() + " ModelId=" + t_model.getId());
			}
			return t_model;
		} catch (Exception t_e) {
			S_LOGGER.error("读取并反序列化文件出错,文件名：" + t_file.getAbsoluteFile() + "\n", t_e);
		}
		return null;
	}

	/**
	 * 加载文件
	 * 
	 * @param t_file
	 */
	protected void loadModel(String modelId, boolean isCache) {
		String path = BinFileUtils.getPath4Model(modelId);
		File t_binf = new File(path);
		if (!t_binf.exists()) {
			S_LOGGER.error(path + " 目录不存在");
			return;
		}
		loadFile(t_binf, isCache);
	}

	/**
	 * 检查指标id是否在模板中存在.
	 * 
	 * @param t_model
	 * @param t_temp
	 */
	private void checkMetricId(ModelPojo t_model, ResTypePojo t_temp) {
		List<ModelMetricBindingPojo> t_metricList = t_model.getListModelMetricBindingPojo();
		Set<String> t_tempMetricIds = m_dictService.getDictPojo().getAllMetricBasesMap().keySet();
		for (ModelMetricBindingPojo modelMetricBindingPojo : t_metricList) {
			if (!t_tempMetricIds.contains(modelMetricBindingPojo.getId())) {
				S_LOGGER.error("模型中的指标在模板中没有定义：modelId " + t_model.getId() + " ;metricId "
						+ modelMetricBindingPojo.getId());
			}
		}

	}

	/**
	 * 清除缓存
	 */
	protected void clear() {
		if (S_ALL_MODELPOJO != null) {
			S_ALL_MODELPOJO.clear();
		}
		if (S_ALL_MODELPOJO_BY_TEMPID != null) {
			S_ALL_MODELPOJO_BY_TEMPID.clear();
		}
		isInitialized = false;
	}

	/* (non-Javadoc)
	 * @see com.riil.base.resmodel.IModelService#importModel(java.lang.String)
	 */
	@Override
	public void importModel(ModelPojo model) throws ServiceException{
		ImportOneFile2Db t_importer = new ImportOneFile2Db();
		try {
			t_importer.importModel(model);
		} catch (ContainerException e) {
			throw new ServiceException(e);
		}
		
		isInitialized = false;
	}
	
	protected void create(ModelBasePojo model) throws ServiceException {
		Assert.notNull(model, "Create modelBase is error , because parameter is null.");

		try {
			this.m_modelBaseDao.doInsertPojo(model);
		} catch (DAOException te) {
			throw new ServiceException(te);
		}
	}

	protected void createBatch(List<ModelBasePojo> models) throws ServiceException {
		if (models == null || models.isEmpty()) {
			return;
		}
		try {
			int batchResSize = 1000;// 每次入库数
			int resCount = models.size();// 总资源数
			int loopCount = (int) Math.ceil(resCount * 1d / batchResSize);// 循环次数
			// 导入资源实例
			for (int i = 0; i < loopCount; i++) {
				int from_index = batchResSize * i;
				int to_index = batchResSize * (i + 1);
				if (to_index > resCount) {
					to_index = resCount;
				}
//				this.m_modelBaseDao.doBatchInsertPojo(models.subList(from_index, to_index));
				m_modelBaseDao.insert(models.subList(from_index, to_index));
			}
		} catch (DAOException te) {
			throw new ServiceException(te);
		}
	}

	protected void modify(ModelBasePojo model) throws ServiceException {
		Assert.notNull(model, "Modify modelBase info is error , because parameter is null.");

		try {
			this.m_modelBaseDao.doUpdatePojo(model);
		} catch (DAOException te) {
			throw new ServiceException(te);
		}
	}

	protected void remove(String modelId) throws ServiceException {
		Assert.hasLength(modelId, "Remove modelBase info is error , because parameter is null.");

		try {
			this.m_modelBaseDao.doDeleteByID(modelId);
		} catch (DAOException te) {
			throw new ServiceException(te);
		}
	}

	protected void removeAll() throws ServiceException {
		try {
			this.m_modelBaseDao.doDeleteAll();
		} catch (DAOException te) {
			throw new ServiceException(te);
		}
	}

	@Override
	public Model getModel(String modelId) throws ServiceException {
		Assert.hasLength(modelId, "Get Model is error ,because id is null.");

		ModelPojo t_temp = getDataLoader().get(modelId); // 优先从Cache中查找
		return (t_temp == null) ? null : ResModelPojoUtils.parse(t_temp);
	}

	/*
	 * (non-Javadoc)
	 * @see com.riil.base.resmodel.IModelService#getModelBySysoid(java.lang.String)
	 */
	@Override
	public Model getModelBySysoid(String sysoid) throws ServiceException {
		ModelSysoidPojo t_pojo = m_dictService.getDictPojo().getDictSysoidPojoById(sysoid);
		
		if (t_pojo != null) {
			return getModel(t_pojo.getModelId());
		} else {
			return null;
		}
	}
	
	public List<ModelPojo> getAllModelPojo()throws ServiceException{
		List<ModelPojo> t_list = new ArrayList<ModelPojo>();
		t_list.addAll(getModelCache().values());
		return t_list;
	}

	@Override
	public List<Model> getAllModel() throws ServiceException {
		List<ModelPojo> t_list = new ArrayList<ModelPojo>();
		t_list.addAll(getModelCache().values());
		return ResModelPojoUtils.toModel(t_list);
	}

	@Override
	public List<Model> getAllModel(List<String> modelIds) throws ServiceException {
		List<Model> t_result = new ArrayList<Model>();
		for (String t_modelId : modelIds) {
			t_result.add(getModel(t_modelId));
		}
		return t_result;
	}

	@Override
	public List<Model> getAllModelByResTypeIds(List<String> resTypeIds) throws ServiceException {
		List<ModelPojo> t_list = new ArrayList<ModelPojo>();
		if (resTypeIds != null) {
			for (String t_resTypeId : resTypeIds) {
				if (null == t_resTypeId) {
					continue;
				}
				Set<String> t_modelIds = getResTypeCache().get(t_resTypeId);
				if (null == t_modelIds || t_modelIds.isEmpty()) {
					continue;
				}

				for (String t_modelId : t_modelIds) {
					ModelPojo t_pojo = getModelCache().get(t_modelId);
					if (t_pojo != null)
						t_list.add(t_pojo);
				}
			}
		}
		return ResModelPojoUtils.toModel(t_list);
	}

	@Override
	public List<Model> getAllModelByMainModel(ResIsMain isMain, String mainModeId) throws ServiceException {
		try {
			if (isMain == null) {
				return new ArrayList<Model>();
			}
			if (isMain.equals(ResIsMain.MainRes)) {
				ModelBasePojo t_model = new ModelBasePojo();
				t_model.setIsMain(isMain.getValue());
				return ResModelPojoUtils.toModel2(m_modelBaseDao.doSelectList(t_model));
			}

			if (isMain.equals(ResIsMain.SubRes) && (mainModeId == null || mainModeId.isEmpty())) {
				ModelBasePojo t_model = new ModelBasePojo();
				t_model.setIsMain(isMain.getValue());
				return ResModelPojoUtils.toModel2(m_modelBaseDao.doSelectList(t_model));
			} else {
				Set<String> subModelIds = getSubModelCache().get(mainModeId);
				if(subModelIds == null || subModelIds.isEmpty()){
					return new ArrayList<Model>();
				}else{
					return getAllModel(new ArrayList<String>(subModelIds));
				}
			}
		} catch (DAOException te) {
			throw new ServiceException(te);
		}
	}

	@Override
	public List<Model> getAllModelTreeByTreeNodeId(String treeNodeId) throws ServiceException {
		Assert.notNull(treeNodeId, "Get getTempBaseByTreeNodeId is error , beacause treeNodeId is null.");

		try {
			ModelBasePojo t_model = new ModelBasePojo();
			t_model.setTreeNodeId(treeNodeId);
			return ResModelPojoUtils.toModel2(m_modelBaseDao.doSelectList(t_model));
		} catch (DAOException te) {
			throw new ServiceException(te);
		}
	}

	@Override
	public MetricType getMetricType(String modelId, String metricId) throws ServiceException {
		MetricBasePojo metric = m_dictService.getDictPojo().getMetricBase(metricId);
		MetricType metricType = MetricType.valueOf(metric.getMetricType());
		return metricType;
	}

	@Override
	public ModelMetricBindingPojo getModelMetricBindingPojo(String modelId, String metricId) throws ServiceException {
		ModelPojo t_modelPojo = getDataLoader().get(modelId);
		if (t_modelPojo == null){
			S_LOGGER.error("[getModelMetricBindingPojo] Model is null, model id: "+ modelId);
			return null;
		}

		ModelMetricBindingPojo t_metric = t_modelPojo.getModelMetricBindingPojoByMetricId(metricId);
		// getName() == null -> 从DB中仅加载了ID
		if (t_metric == null || t_metric.getName() == null) {
			t_modelPojo = loadFile(modelId, true);
			if(t_modelPojo == null){
				S_LOGGER.error("[getModelMetricBindingPojo] After load file, Model is null, model id: "+ modelId);
				return null;
			}else{
				return t_modelPojo.getModelMetricBindingPojoByMetricId(metricId);
			}
		} else {
			return t_metric;
		}
	}

	@Override
	public List<String> getSubModelIdsByMainModelId(String mainModelId){
		List<String> subModels = new ArrayList<String>();
		Set<String> t_subModels = getSubModelCache().get(mainModelId);
		if(!CollectionUtils.isEmpty(t_subModels)){
			subModels.addAll(t_subModels);
		}
		//改成不读数据库
//		else{
//			subModels = getSubModelIdsByMainModelIdFromDB(mainModelId);
//		}
		return subModels;
	}
	
	private List<String> getSubModelIdsByMainModelIdFromDB (String mainModelId){
		List<String> subModels = new ArrayList<String>();
		try {
			ModelBasePojo modelBase = new ModelBasePojo();
			modelBase.setMainModelId(mainModelId);
			List<ModelBasePojo> subModel = m_modelBaseDao.doSelectList(modelBase);
			for (ModelBasePojo modelBasePojo : subModel) {
				subModels.add(modelBasePojo.getId());
			}
		} catch (DAOException e) {
			S_LOGGER.error("[getSubModelIdsByMainModelId] error , mainModelId is " + mainModelId);
		}
		return subModels;
	}
	
	public ModelBaseDao getModelBaseDao() {
		return m_modelBaseDao;
	}
	public void setModelBaseDao(ModelBaseDao modelBaseDao) {
		m_modelBaseDao = modelBaseDao;
	}

	public IResTypeService getResTypeService() {
		return m_resTypeService;
	}

	public void setDictService(IDictService dictService) {
		m_dictService = dictService;
	}

	public void setResTypeService(IResTypeService resTypeService) {
		m_resTypeService = resTypeService;
	}
	
	public void setModelMetricRelDao(ModelMetricRelDao modelMetricRelDao) {
		m_modelMetricRelDao = modelMetricRelDao;
	}

	@Override
	public List<ModelPojo> loadFiles(String id, boolean updateCache) {
		return null;
	}
}
