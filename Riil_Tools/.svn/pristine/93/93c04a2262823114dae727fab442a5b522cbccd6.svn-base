package com.riil.base.policy;

import java.util.List;
import java.util.Map;

import com.riil.base.pojo.enums.Enum4Metric.Status4Metric;
import com.riil.base.resmodel.pojo.policy.RecommandThresholdPojo;
import com.riil.base.resmodel.pojo.policy.RecommandThresholdQueryParm;
import com.riil.core.service.IService;
import com.riil.core.service.ServiceException;

public interface IRecThresholdService extends IService{
    /**
    * <code>S_SERVICE_ID</code> - Service Bean ID.
    */
   public static final String S_SERVICE_ID = "recThresholdService";
   
   /**
    * 根据策略ID、指标ID、模型ID，查询产生的事件.
    * @param policyId 策略ID
    * @param metricId 指标ID
    * @param modelId 模型ID
    * @return 
    * @throws ServiceException
    */
   List<RecommandThresholdPojo> getRecCommThresholdList(final RecommandThresholdQueryParm recThresholdParm) throws ServiceException;

   /**
    * 获取推荐值，该方法中包括取值算法.
    * @param recThresholdParm 阈值参数
    * @return 
    * @throws ServiceException
    */
   Map<String, Map<Status4Metric, Object>> getRecommandThreshold(final RecommandThresholdQueryParm recThresholdParm)
   throws ServiceException;
   
}
