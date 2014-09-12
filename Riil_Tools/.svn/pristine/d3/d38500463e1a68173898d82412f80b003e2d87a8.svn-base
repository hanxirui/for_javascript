package com.riil.base.resmodel.impl;

import java.io.File;
import java.text.Collator;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang.StringUtils;

import com.riil.base.dict.dao.DictCollFrequencyDao;
import com.riil.base.pojo.dict.DictCollFrequencyPojo;
import com.riil.base.pojo.dict.DictPojo;
import com.riil.base.pojo.enums.IfType;
import com.riil.base.resmodel.IDictService;
import com.riil.base.resmodel.IMetricBaseService;
import com.riil.base.resmodel.IMetricGroupService;
import com.riil.base.resmodel.impl.db.dao.ModelSysoidDao;
import com.riil.base.resmodel.impl.db.dao.VendorDao;
import com.riil.base.resmodel.impl.db.dao.VendorModelDao;
import com.riil.base.resmodel.impl.file.BinFileUtils;
import com.riil.base.resmodel.pojo.base.EventBasePojo;
import com.riil.base.resmodel.pojo.base.MetricBasePojo;
import com.riil.base.resmodel.pojo.base.MetricGroupPojo;
import com.riil.base.resmodel.pojo.base.VendorPojo;
import com.riil.base.resmodel.pojo.vendor.ModelSysoidPojo;
import com.riil.base.resmodel.pojo.vendor.VendorModelPojo;
import com.riil.base.utils.GenBinFile;
import com.riil.core.commons.Assert;
import com.riil.core.commons.ServerModule;
import com.riil.core.dao.DAOException;
import com.riil.core.dao.IQueryParam;
import com.riil.core.logger.SystemLogger;
import com.riil.core.pojo.AbsPojo;
import com.riil.core.service.ServiceException;
import com.riil.core.utils.bean.SerializeUtil;

/**
 * 字典服务 <br>
 * <p>
 * Create on : 2012-6-13<br>
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
public class DictService implements IDictService {

    /**
     * <code>S_MODEL_SYSOID_POJO_BIN</code> - 模型和sysoid关系
     */
    private static final String S_MODEL_SYSOID_POJO_BIN = "Dict1";
    /**
     * <code>S_VENDOR_MODEL_POJO_BIN</code> - 厂家型号文件
     */
    private static final String S_VENDOR_MODEL_POJO_BIN = "Dict3";
    /**
     * <code>S_DICT_COLL_FREQUENCY_POJO_BIN</code> -采集频率字典文件.
     */
    private static final String S_DICT_COLL_FREQUENCY_POJO_BIN = "Dict4";
    
    /**
     * <code>S_DICT_COLL_FREQUENCY_POJO_BIN</code> -采集频率字典文件.
     */
    private static final String S_DICT_POJO_BIN = "dict";

    protected static final SystemLogger S_LOGGER = SystemLogger.getSystemLogger(DictService.class,
    		ServerModule.ResourceModel);

    /**
     * <code>m_modelSysoidDao</code> - DAO object.
     */
    private ModelSysoidDao m_modelSysoidDao;

    /**
     * <code>m_vendorModelDao</code> - DAO object.
     */
    private VendorModelDao m_vendorModelDao;
    
    private VendorDao m_vendorDao;

    /**
     * <code>m_dictCollFrequencyDao</code> - DAO object.
     */
    private DictCollFrequencyDao m_dictCollFrequencyDao;
    
    private GenBinFile m_genBin = new GenBinFile();
    
    private IMetricBaseService m_metricBaseService ;
    private IMetricGroupService   m_metricGroupService;
    
    /**
     * <code>isInit</code> - 是否已经初始化
     */
    private boolean isInitialized = false;

    public DictService() {

    }

    @Override
    public void destroy() throws ServiceException {

    }
    
    public void reset() {
    	isInitialized = false;
    }

    /**
     * 取得 DictPojo
     */
    @Override
    public DictPojo getDictPojo() {
        if (!isInitialized) {
            init();
        }
        return getDictCache();
    }

    private DictPojo getDictCache() {
        return DictPojo.getInstance();
    }
    
    @Override
    public void setDictPojo(DictPojo dictPojo)
    {
        this.getDictPojo();
    }

    /*
     * (non-Javadoc)
     * @see com.riil.base.resmodel.file.IDictService#getIfTypeName(java.lang.String)
     */
    @Override
    public String getIfTypeName(String ifTypeId) throws ServiceException {
        IfType ifType = IfType.parse(ifTypeId);
        if (null == ifType) {
            return "";
        }
        return ifType.getName();
    }

    public synchronized void init() {
    	if(isInitialized) return;
        BinFileUtils.init();
        clear();
        loadAllFile();
//        loadDB();
        S_LOGGER.error("DictService init succ........................");
        isInitialized = true;
    }

    @SuppressWarnings("unchecked")
    private void loadAllFile() {
        String path = BinFileUtils.getPath4Dict();

        File t_binf = new File(path);
        if (!t_binf.exists()) {
            S_LOGGER.error(path + " 目录不存在");
            return;
        }

        java.io.File t_file = new File(t_binf, S_DICT_POJO_BIN);
        
        DictPojo t_dictPojo = loadDictPojo(t_file);
        
        if(t_dictPojo!=null){
        	loadAllFrequencys(t_dictPojo);
        	loadAllVendor(t_dictPojo);
        	loadAllVendorModel(t_dictPojo);
        	loadModelSysoid(t_dictPojo);
        	loadAllMetrics(t_dictPojo);
        	loadMetricGroups(t_dictPojo);
        	loadMetricGroupRel(t_dictPojo);
            loadAllEvents(t_dictPojo);
        }
        
    }
    
    private void loadDB()
    {
        loadAllMetricsDB();
        loadMetricGroupsDB();
    }
    
    private DictPojo loadDictPojo(File file){
    	DictPojo t_dictPojo = null;
    	try {
			if(file.exists() && file.isFile()){
				t_dictPojo = SerializeUtil.convertBinToObject(DictPojo.class,
			            file.getAbsoluteFile());
			}
		} catch (Exception t_e) {
			 S_LOGGER.error("读取并反序列化文件出错,文件名：" + file.getAbsoluteFile() + "\n" + t_e);
		}
    	return t_dictPojo;
    }
    
    protected void loadModelSysoid(DictPojo dictPojo){
    	List<ModelSysoidPojo> t_modelSysoidPojos = dictPojo.getListDictSysoidPojo();
		if (t_modelSysoidPojos != null) {
			for (ModelSysoidPojo t_comon : t_modelSysoidPojos) {
				if (t_comon != null)
					getDictCache().addModelSysoidPojo(t_comon);
			}
			if (S_LOGGER.isDebugEnabled()) {
				S_LOGGER.debug("\n     Loaded " + t_modelSysoidPojos.size() + " pojo in List<DictSysoidPojo> ");
			}
		}
    }
    
    protected void loadAllVendorModel(DictPojo dictPojo){
    	List<VendorModelPojo> t_venderModelPojos = dictPojo.getListVendorModelPojo();
		if (t_venderModelPojos != null) {
			for (VendorModelPojo t_comon : t_venderModelPojos) {
				if (t_comon != null)
					getDictCache().addVendorModelPojo(t_comon);
			}
			if (S_LOGGER.isDebugEnabled()) {
				S_LOGGER.debug("\n     Loaded " + t_venderModelPojos.size() + " pojo in List<DictSysoidPojo> ");
			}
		}
    }
    
    protected void loadAllVendor(DictPojo dictPojo){
    	List<VendorPojo> t_vendors = dictPojo.getAllVendors();
    	if(t_vendors !=null){
    		getDictCache().setListVendor(t_vendors);
    	}
    	if (S_LOGGER.isDebugEnabled()) {
			S_LOGGER.debug("\n     Loaded " + t_vendors.size() + " pojo in List<DictSysoidPojo> ");
		}
    }
    
    protected void loadAllFrequencys(DictPojo dictPojo){
    	List<DictCollFrequencyPojo> t_freqPojos = dictPojo.getListDictCollFrequencyPojo();
		if (t_freqPojos != null) {
			getDictCache().setListDictCollFrequencyPojo(t_freqPojos);
			if (S_LOGGER.isDebugEnabled()) {
				S_LOGGER.debug("\n     Loaded " + t_freqPojos.size() + " pojo in List<DictCollFrequencyPojo> ");
			}
		}
    }
    
    protected void loadAllMetrics(DictPojo dictPojo){
    	List<MetricBasePojo> t_metricBases = dictPojo.getAllMetricBases();
    	for (MetricBasePojo metricBasePojo : t_metricBases) {
    		getDictCache().addMetricBase(metricBasePojo);
		}
    }
    
    private void loadAllMetricsDB()
    {
        try {
            List<MetricBasePojo> t_metricBases = m_metricBaseService.getAllMetricBase();
            getDictCache().setListMetricBase(t_metricBases);
        } catch (ServiceException e) {
            S_LOGGER.error("load Metrics from db error.......", e);
        }
    }
    
    protected void loadMetricGroupRel(DictPojo dictPojo){
    	Map<String, Set<String>> metricGroupRels = dictPojo.getAllMetricGroupRel();
    	Set<String> t_metricIds = metricGroupRels.keySet();
    	for (String metricId : t_metricIds) {
    		Set<String> metricGroups = metricGroupRels.get(metricId);
    		getDictCache().addMetricGroupRel(metricId, metricGroups);
		}
    }
    
    private void loadMetricGroupsDB()
    {
        List<MetricGroupPojo> t_metricGroup;
        try {
            t_metricGroup = m_metricGroupService.getAllMetricGroup();
            getDictCache().setListMetricGroup(t_metricGroup);
        } catch (ServiceException e) {
            S_LOGGER.error("load MetricsGroups from db error.......", e);
        }
        
    }
    
    protected void loadMetricGroups(DictPojo dictPojo){
    	List<MetricGroupPojo> t_metricGroup = dictPojo.getAllMetricGroup();
		getDictCache().setListMetricGroup(t_metricGroup);
		if (S_LOGGER.isDebugEnabled()) {
			S_LOGGER.debug("\n     Loaded " + t_metricGroup.size() + " pojo in List<DictCollFrequencyPojo> ");
		}
    }
    
    protected void loadAllEvents(DictPojo dictPojo){
    	List<EventBasePojo> t_eventBases = dictPojo.getAllEventBases();
    	for (EventBasePojo t_eventBase : t_eventBases) {
    		getDictCache().addEventBase(t_eventBase);
		}
    }

	abstract class Invoker<T> {

		abstract void add(T t);

	}

    @Override
    public void start() throws ServiceException {

    }

    public void clear() {
        if (getDictCache() != null) {
            getDictCache().clear();
        }
    }

    @Override
    public ModelSysoidPojo getModelSysoidBySysoid(String sysoid) throws ServiceException {
        if (getDictPojo() == null || StringUtils.isBlank(sysoid)) {
            return null;
        }
        return getDictPojo().getModelSysoidBySysoid(sysoid);
    }
    
    @Override
    public ModelSysoidPojo getModelSysoidByModelId(String modelId) throws ServiceException {
        if (getDictPojo() == null || StringUtils.isBlank(modelId)) {
            return null;
        }
        for(ModelSysoidPojo t_modelSysoid : getDictPojo().getListModelSysoidPojo()){
            if(modelId.equalsIgnoreCase(t_modelSysoid.getModelId())){
                return t_modelSysoid;
            }
        }
        
        return null;
    }

    @Override
    public VendorModelPojo getVendorByVendorId(String vendorId) throws ServiceException {
        if (getDictPojo() == null || StringUtils.isBlank(vendorId)) {
            return null;
        }
        return getDictPojo().getVendorByVendorId(vendorId);
    }

    private VendorModelPojo getVendorMdoel(String vendorId, String series, String modelNumber) throws ServiceException {
        if (getDictCache() == null || StringUtils.isBlank(vendorId) || StringUtils.isBlank(series)
                || StringUtils.isBlank(modelNumber)) {
            return null;
        }
        return getDictCache().getVendorModel(vendorId, series, modelNumber);
    }

    @Override
    public void dataChange(String dataId, String dataType, AbsPojo data, DataChangeType dataChangeType) {
        clear();
        init();
    }

    @Override
    public List<VendorModelPojo> getVendorModelsByQuery(final IQueryParam condition) throws ServiceException {
        Assert.notNull(condition, "Get vendorModel info collection is error , beacause query condition is null.");

        try {
            return this.m_vendorModelDao.doSelectList(condition);
        } catch (DAOException te) {
            throw new ServiceException(te);
        }
    }

    @Override
    public List<VendorModelPojo> getVendors() throws ServiceException {
        try {
        	List<VendorModelPojo> t_vendors = this.m_vendorModelDao.getVendors();
        	
        	Collections.sort(t_vendors, new Comparator<VendorModelPojo>() {

				@Override
				public int compare(VendorModelPojo o1, VendorModelPojo o2) {
					Collator comparator = Collator.getInstance(Locale.CHINA);
					
					return comparator.compare(o1.getVendorName(), o2.getVendorName());
				}
			});
        	
            return t_vendors;
        } catch (DAOException te) {

            throw new ServiceException(te);
        }
    }
    
    @Override
    public List<VendorModelPojo> getVendorHasResByResGroupId(String resGroupId, String domainId) throws ServiceException{
    	Assert.notNull(resGroupId);
    	try {
    		String selectId = "select_hasResVendor_ByResGroupId";
            Map<String, Object> t_param = new HashMap<String, Object>();
            t_param.put("resGroupId", resGroupId);
            t_param.put("domainId", domainId);
            return m_vendorModelDao.doSelectByMapParam(selectId, t_param);
        } catch (DAOException te) {
            throw new ServiceException(te);
        }
    }
    
    @Override
    public List<VendorModelPojo> getVendorHasCandidateResByResGroupId(String resGroupId, String domainId) throws ServiceException{
    	Assert.notNull(resGroupId);
    	try {
    		String selectId = "select_hasCandidateResVendor_ByResGroupId";
            Map<String, Object> t_param = new HashMap<String, Object>();
            t_param.put("resGroupId", resGroupId);
            t_param.put("domainId", domainId);
            return m_vendorModelDao.doSelectByMapParam(selectId, t_param);
        } catch (DAOException te) {
            throw new ServiceException(te);
        }
    }

    @Override
    public Collection<String> getHostOsTypeList() throws ServiceException {
        Set<String> t_osType = new HashSet<String>();
        for (ModelSysoidPojo t_pojo : getDictCache().getListDictSysoidPojo()) {
            if (null != t_pojo.getOsType())
                t_osType.add(t_pojo.getOsType());
        }
        return t_osType;
    }

    protected void createBatchModelSysoid(List<ModelSysoidPojo> list) throws ServiceException {
        if (list == null || list.isEmpty()) {
            return;
        }
        try {
            int batchResSize = 1000;// 每次入库数
            int resCount = list.size();// 总资源数
            int loopCount = (int) Math.ceil(resCount * 1d / batchResSize);// 循环次数
            // 导入资源实例
            for (int i = 0; i < loopCount; i++) {
                int from_index = batchResSize * i;
                int to_index = batchResSize * (i + 1);
                if (to_index > resCount) {
                    to_index = resCount;
                }
                m_modelSysoidDao.insert(list.subList(from_index, to_index));
            }
        } catch (DAOException te) {
            throw new ServiceException(te);
        }
    }
    
    protected void createBatchVendor(List<VendorPojo> list) throws ServiceException{
    	if(list == null || list.isEmpty()){
    		return;
    	}
    	try {
    		int batchResSize = 1000; // 每次入库数
        	int resCount = list.size(); //总资源数
        	int loopCount = (int) Math.ceil(resCount * 1d / batchResSize);// 循环次数
        	 // 导入资源实例
        	 for (int i = 0; i < loopCount; i++) {
                 int from_index = batchResSize * i;
                 int to_index = batchResSize * (i + 1);
                 if (to_index > resCount) {
                     to_index = resCount;
                 }
                 m_vendorDao.insert(list.subList(from_index, to_index));
             }
		} catch (DAOException te) {
			throw new ServiceException(te);
		}
    	
    }

    protected void createModelSysoid(final ModelSysoidPojo modelSysoid) throws ServiceException {

        Assert.notNull(modelSysoid, "Create modelSysoid is error , because parameter is null.");

        try {
            this.m_modelSysoidDao.doInsertPojo(modelSysoid);
        } catch (DAOException te) {
            throw new ServiceException(te);
        }

    }

    protected void removeModelSysoid(final String modelSysoidID) throws ServiceException {

        Assert.hasLength(modelSysoidID, "Remove modelSysoid info is error , because parameter is null.");

        try {

            this.m_modelSysoidDao.doDeleteByID(modelSysoidID);

        } catch (DAOException te) {

            throw new ServiceException(te);
        }

    }

    protected void removeAllModelSysoid() throws ServiceException {

        try {

            this.m_modelSysoidDao.doDeleteAll();

        } catch (DAOException te) {

            throw new ServiceException(te);
        }
    }

    protected void createBatchVendorModel(List<VendorModelPojo> list) throws ServiceException {
        if (list == null || list.isEmpty()) {
            return;
        }
        try {
            int batchResSize = 1000;// 每次入库数
            int resCount = list.size();// 总资源数
            int loopCount = (int) Math.ceil(resCount * 1d / batchResSize);// 循环次数
            // 导入资源实例
            for (int i = 0; i < loopCount; i++) {
                int from_index = batchResSize * i;
                int to_index = batchResSize * (i + 1);
                if (to_index > resCount) {
                    to_index = resCount;
                }
                m_vendorModelDao.insert(list.subList(from_index, to_index));
            }
        } catch (DAOException te) {
            throw new ServiceException(te);
        }
    }

    protected void createVendorModel(final VendorModelPojo vendorModel) throws ServiceException {

        Assert.notNull(vendorModel, "Create vendorModel is error , because parameter is null.");

        try {

            this.m_vendorModelDao.doInsertPojo(vendorModel);

        } catch (DAOException te) {
            throw new ServiceException(te);
        }

    }
    
    protected void createVendor(final VendorPojo vendor) throws ServiceException{
    	Assert.notNull(vendor,"Create vendor is error , beacause parameter is null.");
    	try {
			this.m_vendorDao.doInsertPojo(vendor);
		} catch (DAOException te) {
			throw new ServiceException(te);
		}
    }

    protected void removeAllVendorModel() throws ServiceException {

        try {

            this.m_vendorModelDao.doDeleteAll();

        } catch (DAOException te) {

            throw new ServiceException(te);
        }
    }
    
    protected void removeAllVendors() throws ServiceException{
    	try {
			this.m_vendorDao.doDeleteAll();
			
		} catch (DAOException te) {
			
			throw new ServiceException(te);
		}
    }
    
    protected void removeVendorModel(final String vendorModelID) throws ServiceException {

        Assert.hasLength(vendorModelID, "Remove vendorModel info is error , because parameter is null.");

        try {

            this.m_vendorModelDao.doDeleteByID(vendorModelID);

        } catch (DAOException te) {

            throw new ServiceException(te);
        }

    }

    protected void createDictCollFrequency(final DictCollFrequencyPojo dictCollFrequency) throws ServiceException {

        Assert.notNull(dictCollFrequency, "Create dictCollFrequency is error , because parameter is null.");

        try {

            m_dictCollFrequencyDao.doInsertPojo(dictCollFrequency);

        } catch (DAOException te) {
            throw new ServiceException(te);
        }

    }

    protected void removeAllDictCollFrequency() throws ServiceException {

        try {

            this.m_dictCollFrequencyDao.doDeleteAll();

        } catch (DAOException te) {

            throw new ServiceException(te);
        }
    }

    protected void removeDictCollFrequency(final String dictCollFrequencyID) throws ServiceException {

        Assert.hasLength(dictCollFrequencyID, "Remove dictCollFrequency info is error , because parameter is null.");

        try {

            this.m_dictCollFrequencyDao.doDeleteByID(dictCollFrequencyID);

        } catch (DAOException te) {

            throw new ServiceException(te);
        }

    }

    public void setModelSysoidDao(final ModelSysoidDao modelSysoidDao) {
        this.m_modelSysoidDao = modelSysoidDao;
    }

    public void setVendorModelDao(final VendorModelDao vendorModelDao) {
        this.m_vendorModelDao = vendorModelDao;
    }
    
    public void setVendorDao(final VendorDao vendorDao){
    	this.m_vendorDao = vendorDao;
    }
    
    public void setDictCollFrequencyDao(final DictCollFrequencyDao dictCollFrequencyDao) {
        this.m_dictCollFrequencyDao = dictCollFrequencyDao;
    }

    public IMetricBaseService getMetricBaseService() {
        return m_metricBaseService;
    }

    public void setMetricBaseService(IMetricBaseService metricBaseService) {
        m_metricBaseService = metricBaseService;
    }

    public IMetricGroupService getMetricGroupService() {
        return m_metricGroupService;
    }

    public void setMetricGroupService(IMetricGroupService metricGroupService) {
        m_metricGroupService = metricGroupService;
    }

    @Override
    public String getMetricExplanation(String deviceType, String mainResTypeId,String subResTypeId, String metricId) throws ServiceException {
        // TODO Auto-generated method stub
        return "功能建设中......";
    }
}
