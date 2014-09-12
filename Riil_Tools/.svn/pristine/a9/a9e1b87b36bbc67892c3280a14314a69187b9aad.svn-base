package com.riil.base.resmodel.impl;

import java.io.File;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.apache.commons.lang.StringUtils;

import com.riil.base.resmodel.IMetricExplanationService;
import com.riil.base.resmodel.impl.file.BinFileUtils;
import com.riil.base.resmodel.pojo.MetricExplainPojo;
import com.riil.base.resmodel.pojo.MetricExplanationPojo;
import com.riil.core.commons.ServerModule;
import com.riil.core.logger.SystemLogger;
import com.riil.core.service.AbsService;
import com.riil.core.service.ServiceException;
import com.riil.core.utils.bean.SerializeUtil;

/**
 * 指标解释
 * <br>
 *  
 * <p>
 * Create on : 2014年6月19日<br>
 * </p>
 * <br>
 * @author liyimin<br>
 * @version riil-resmodel v6.2.0
 * <br>
 * <strong>Modify History:</strong><br>
 * user     modify_date    modify_content<br>
 * -------------------------------------------<br>
 * <br>
 */
public class PortalMetricExplanationService extends AbsService implements IMetricExplanationService {
    
    /**
     * <code>S_LOGGER</code> - Logger.
     */
    private static final SystemLogger S_LOGGER = SystemLogger.getSystemLogger(
            ResTypeService.class, ServerModule.ResourceModel);
    
    /**<bean id="dictService" class="com.riil.base.resmodel.impl.DictService">
     * <code>S_ALL_METRIC_EXPLANATION</code> - 指标解释
     */
    private Map<String, String> S_ALL_METRIC_EXPLANATION = new ConcurrentHashMap<String, String>();

    /**
     * <code>isInit</code> - 是否已经初始化
     */
    private boolean isInitialized = false;
    
    /**
     * 清除缓存
     */
    private void clear() {
        if (S_ALL_METRIC_EXPLANATION != null) {
            S_ALL_METRIC_EXPLANATION.clear();
        }
    }

    public void reset() {
        isInitialized = false;
    }
    
    /**
     * 取得模板Cache
     * 
     * @return 模板Cache
     */
    private Map<String, String> getCache() {
        if (!isInitialized) {
            init();
        }
        return S_ALL_METRIC_EXPLANATION;
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
     * 加载全部指标解释文件到Cache
     */
    private void loadAllFile() {
        Collection<File> files = BinFileUtils.getFiles4MetricExplanation();

        for (File t_file : files) {
            loadFile(t_file, true);
        }
        if (S_LOGGER.isDebugEnabled()) {
            S_LOGGER.debug("\n     Loaded size: " + S_ALL_METRIC_EXPLANATION.size());
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
    protected synchronized List<MetricExplanationPojo> loadFile(File t_file, boolean updateCache) {
        try {
            if (!BinFileUtils.isNormalFile(t_file.getPath())) {
                return null;
            }
            
            MetricExplainPojo t_metricExplanations = (MetricExplainPojo)SerializeUtil.convertBinToObject(
                MetricExplainPojo.class, t_file.getAbsoluteFile());
            
            if (t_metricExplanations == null) {
                return null;
            }
            
            if (updateCache) {
                for (MetricExplanationPojo t_metricExplanation : t_metricExplanations.getMetricExplanationPojo()) {
                    S_ALL_METRIC_EXPLANATION.put(t_metricExplanation.getKey(), t_metricExplanation.getMetricExplain());
                }
            }
            return t_metricExplanations.getMetricExplanationPojo();
        } catch (Exception t_e) {
            S_LOGGER.error(
                    "读取并反序列化文件出错,文件名：" + t_file.getAbsoluteFile() + "\n", t_e);
        }
        return null;
    }
    
    /* (non-Javadoc)
     * @see com.riil.base.resmodel.IMetricExplanationService#getMetricExplanation(java.lang.String, java.lang.String, java.lang.String, java.lang.String)
     */
    @Override
    public String getMetricExplanation(String deviceType, String mainResTypeId, String subResTypeId, String metricId)
        throws ServiceException {
        
        String t_key = getKey(deviceType,mainResTypeId,subResTypeId, metricId);
        
        if (t_key.isEmpty())
            return null;
                
        return getCache().get(t_key);
    }
    
    private String getKey(String deviceType, String mainResTypeId, String subResTypeId, String metricId)
    {
        StringBuffer t_key = new StringBuffer();
        if (StringUtils.isNotEmpty(deviceType))
        {
            t_key.append(deviceType);
        }
        if (StringUtils.isNotEmpty(mainResTypeId))
        {
            t_key.append(mainResTypeId);
        }
        if (StringUtils.isNotEmpty(subResTypeId))
        {
            t_key.append(subResTypeId);
        }
        if (StringUtils.isNotEmpty(metricId))
        {
            t_key.append(metricId);
        }
        
        return t_key.toString();
    }

}
