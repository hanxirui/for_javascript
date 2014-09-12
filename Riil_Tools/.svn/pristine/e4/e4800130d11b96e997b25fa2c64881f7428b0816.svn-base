package com.riil.base.resmodel;

import com.riil.core.service.IService;
import com.riil.core.service.ServiceException;

/**
 * 指标解释接口
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
public interface IMetricExplanationService extends IService {
    
    /**
     * <code>S_SERVICE_ID</code> - Service Bean ID.
     */
    public static final String S_SERVICE_ID = "metricExplanationService";
    
    /**
     * 初始化方法.
     */

    void init();
    
    /**
     * 指标解释
     * {method description}.
     * @param deviceType 设备类型（路由器时传，没有时传null）
     * @param mainResTypeId 主资源类型id（模型id）
     * @param subResTypeId 子资源类型id（模型id） 可以为null（主模型指标）
     * @param metricId 指标id
     * @return String 指标解释类型
     * @throws ServiceException
     */
    String getMetricExplanation(String deviceType,String mainResTypeId,String subResTypeId,String metricId) throws ServiceException;
}
