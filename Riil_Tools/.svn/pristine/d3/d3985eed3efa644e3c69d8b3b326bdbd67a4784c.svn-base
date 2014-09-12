package com.riil.base.policy;

import java.io.File;
import java.util.List;
import java.util.Map;

import com.riil.base.pojo.enums.Enum4Metric.Status4Metric;
import com.riil.base.pojo.enums.EnumRoot.BandwidthType;
import com.riil.base.pojo.enums.EnumRoot.PolicyType;
import com.riil.base.resmodel.pojo.policy.PolicyBasePojo;
import com.riil.base.resmodel.pojo.policy.PolicyEventPojo;
import com.riil.base.resmodel.pojo.policy.PolicyEventQueryParam;
import com.riil.base.resmodel.pojo.policy.PolicyPojo;
import com.riil.base.resmodel.pojo.policy.PolicyResRelPojo;
import com.riil.base.resmodel.pojo.policy.PolicyThresholdPojo;
import com.riil.core.dao.PageDataPojo;
import com.riil.core.service.IService;
import com.riil.core.service.ServiceException;

/**
 * 策略服务接口 <br>
 * <p>
 * Create on : 2012-6-3<br>
 * <p>
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
public interface IPolicyService extends IService {

	/**
	 * <code>S_SERVICE_ID</code> - Service Bean ID.
	 */
	String S_SERVICE_ID = "policyService";

	/**
	 * 判断发布状态，已发布true，未发布false. 发布状态是标识监控端所使用的策略是否与Portal端同步
	 * 
	 * @param policyId
	 *            策略ID
	 * @return true 已发布 false 未发布
	 * @throws ServiceException
	 *             服务异常
	 */
	boolean checkPublishStatus(String policyId) throws ServiceException;

	/**
	 * 判断策略使用状态，已使用true，未使用false. 使用状态是标识监控端是否正在使用此策略，但未必是和Portal端最新版本同步的
	 * 
	 * @param policyId
	 *            策略ID
	 * @return true 已发布 false 未发布
	 * @throws ServiceException
	 *             服务异常
	 */
	boolean checkUseStatus(String policyId) throws ServiceException;

	/**
	 * 新建日志策略.
	 * 
	 * @param policyPojo
	 *            日志策略
	 * @throws ServiceException
	 *             服务异常
	 */
	void createLogPolicy(final PolicyPojo policyPojo) throws ServiceException;

	/**
	 * 创建策略基础信息.
	 * 
	 * @param policyPojo
	 *            策略实体对象
	 * @throws ServiceException
	 *             服务异常
	 */
	void createPolicy(final PolicyPojo policyPojo) throws ServiceException;

	/**
	 * 创建或修改策略.
	 * 
	 * @param policyPojo
	 *            策略实体对象
	 * @throws ServiceException
	 *             服务异常
	 */
	void createOrModify(PolicyPojo policyPojo) throws ServiceException;

	/**
	 * 创建策略-用于生成数据库初始数据.
	 * 
	 * @param policy
	 *            策略实体对象
	 * @throws ServiceException
	 *             服务异常
	 */
	void createPolicy4InitData(PolicyPojo policy) throws ServiceException;

	/**
	 * 导入出厂策略至DB中<br>
	 * 
	 * @param policy
	 *            策略
	 * @throws ServiceException
	 *             服务异常
	 */
	void importPolicy(PolicyPojo policy) throws ServiceException;

	/**
	 * 创建策略事件.
	 * 
	 * @param userId
	 *            修改策略的userId
	 * @param policyEventPojo
	 *            策略事件
	 * @throws ServiceException
	 *             服务异常
	 */
	String createPolicyEvent(String userId, final PolicyEventPojo policyEventPojo) throws ServiceException;

	/**
	 * 批量创建策略事件.
	 * 
	 * @param userId
	 *            修改策略的userId
	 * @param policyEventPojo
	 *            策略事件
	 * @return 新版本策略ID
	 * @throws ServiceException
	 *             服务异常
	 */
	String createPolicyEvents(String policyId, String userId, final List<PolicyEventPojo> policyEventPojo) throws ServiceException;

	public void createPolicyResRel(final List<PolicyResRelPojo> policyResRelPojos) throws ServiceException;

	/**
	 * 添加关联资源.
	 * 
	 * @param policyId
	 *            策略ID
	 * @param userId
	 *            修改人
	 * @param policyResRelPojos
	 *            关联资源
	 * @throws ServiceException
	 *             服务异常
	 */

	void createPolicyResRel(String policyId, String userId, final List<PolicyResRelPojo> policyResRelPojos) throws ServiceException;

	/**
	 * 创建Trap策略.
	 * 
	 * @param policyPojo
	 *            Trap策略
	 * @throws ServiceException
	 *             服务异常
	 */
	void createTrapPolicy(final PolicyPojo policyPojo) throws ServiceException;

	/**
	 * 取得所有出厂策略（即默认文件策略，用于ImportDB）
	 * 
	 * @return 所有出厂策略
	 * @throws ServiceException
	 *             服务异常
	 */
	List<PolicyPojo> getAllFactoryPolicy() throws ServiceException;

	/**
	 * 获取已经发布并绑定资源的策略信息
	 * 
	 * @return 策略大对象集合，用来展示策略树
	 * @throws ServiceException
	 *             服务异常
	 */
	List<PolicyPojo> getAllPolicyPojo4Publish() throws ServiceException;

	/**
	 * 获取已经发布并绑定资源的策略信息
	 * 
	 * @param serverId
	 * @return
	 * @throws ServiceException
	 *             服务异常
	 */
	List<PolicyPojo> getAllPolicyPojo4Publish(String serverId) throws ServiceException;

	/**
	 * 按策略类型获取获取所有已发布的策略大对象.
	 * 
	 * @param policyType
	 *            策略类型（资源分类）
	 * @return 策略大对象集合，用来展示策略树
	 * @throws ServiceException
	 *             服务异常
	 */
	List<PolicyPojo> getAllPolicyPojo4PublishByPolicyType(String policyType) throws ServiceException;

	/**
	 * 根据策略类型和资源ID list获取策略基础信息.
	 * 
	 * @param resInstanceIds
	 *            资源实例IDs
	 * @param policyType
	 *            策略类型
	 * @return 策略基础信息
	 * @throws ServiceException
	 *             服务异常
	 */
	List<PolicyPojo> getNewVersinoPolicyBaseInfoByTypeAndResIds(final List<String> resInstanceIds, String policyType) throws ServiceException;

	/**
	 * 根据策略类型list和资源ID获取策略基础信息.
	 * 
	 * @param policyTypes
	 *            策略类型List
	 * @param resId
	 *            资源实例ID
	 * @return 策略基础信息
	 * @throws ServiceException
	 *             服务异常
	 */
	List<PolicyPojo> getNewVersinoPolicyBaseInfoByTypesAndResId(final List<String> policyTypes, String resId) throws ServiceException;

	/**
	 * 获取原始版本策略ID.
	 * 
	 * @param policyId
	 *            新版本策略ID
	 * @return 原始版本策略ID
	 * @throws ServiceException
	 *             服务异常
	 */
	public String getOriVersionId(String policyId) throws ServiceException;

	/**
	 * 获取原始版本策略ID.
	 * 
	 * @param policyIds
	 *            新版本策略ID
	 * @return 原始版本策略ID
	 * @throws ServiceException
	 *             服务异常
	 */
	public List<String> getOriVersionIds(final List<String> policyIds) throws ServiceException;

	/**
	 * 根据策略ID获取策略基础信息.
	 * 
	 * @param policyId
	 *            策略ID
	 * @return 策略实体
	 * @throws ServiceException
	 *             服务异常
	 */
	PolicyPojo getPolicyBaseInfo(String policyId) throws ServiceException;

	/**
	 * 按策略类型获取最新版本的策略基础信息.
	 * 
	 * @param policyType
	 *            策略类型（资源分类）
	 * @param domainIds
	 *            域ID列表,为空，取所有
	 * @return 策略基础信息集合，用来展示策略树
	 * @throws ServiceException
	 *             服务异常
	 */
	List<PolicyPojo> getPolicyBaseInfoByPolicyType(String policyType, final List<String> domainIds) throws ServiceException;

	/**
	 * 按策略类型获取最新版本的策略基础信息-已使用的.
	 * 
	 * @param policyType
	 *            策略类型（资源分类）
	 * @param domainIds
	 *            域ID列表,为空，取所有
	 * @return 策略基础信息集合，用来展示策略树
	 * @throws ServiceException
	 *             服务异常
	 */
	List<PolicyPojo> getPolicyBaseInfoByPolicyType4InUse(String policyType, final List<String> domainIds) throws ServiceException;

	/**
	 * 根据策略ID获取整个策略对象.
	 * 
	 * @param policyId
	 *            策略ID
	 * @return 策略实体对象
	 * @throws ServiceException
	 *             服务异常
	 */
	PolicyPojo getPolicyByPolicyId(String policyId) throws ServiceException;

	/**
	 * 根据策略ID和类型获取整个策略对象.
	 * 
	 * @param policyId
	 *            策略ID
	 * @return 策略实体对象
	 * @throws ServiceException
	 *             服务异常
	 */
	PolicyPojo getPolicyByPolicyIdAndType(String policyId, String policyType) throws ServiceException;

	/**
	 * 根据事件ID获取一条事件.
	 * 
	 * @param policyId
	 *            策略ID
	 * @param eventId
	 *            事件ID
	 * @return 策略事件
	 * @throws ServiceException
	 *             服务异常
	 */
	PolicyEventPojo getPolicyEventByEventId(String policyId, String eventId) throws ServiceException;

	/**
	 * 根据策略ID获取策略事件.
	 * 
	 * @param policyId
	 *            策略ID
	 * @return 策略事件列表
	 * @throws ServiceException
	 *             服务异常
	 */
	List<PolicyEventPojo> getPolicyEvents(String policyId) throws ServiceException;

	/**
	 * 根据策略事件条件获取策略事件列表.
	 * 
	 * @param policyEventPojo
	 *            策略事件对象PolicyEventPojo
	 * @return 策略事件列表
	 * @throws ServiceException
	 *             服务异常
	 */
	PageDataPojo<PolicyEventPojo> getPolicyEventsByParam(final PolicyEventQueryParam policyEventPojo) throws ServiceException;

	/**
	 * 根据策略ID获取策略关联资源.
	 * 
	 * @param policyId
	 *            策略ID
	 * @return 策略资源关联
	 * @throws ServiceException
	 *             服务异常
	 */
	List<PolicyResRelPojo> getPolicyResRel(String policyId) throws ServiceException;

	/**
	 * 日志事件、脚本事件、trap事件加判断是否重名
	 * 
	 * @param policyId
	 * @param Id
	 * @param Name
	 * @return
	 * @throws ServiceException
	 *             服务异常
	 */
	boolean isExisEventName(String policyId, String eventId, String eventName) throws ServiceException;

	/**
	 * 在同一域下、同一策略类型下判读策略名称是否重复
	 * 
	 * @param domainId
	 * @param policyId
	 * @param policyName
	 * @return
	 * @throws ServiceException
	 *             服务异常
	 */
	boolean isExisPolicyName(String domainId, String policyType, String policyId, String policyName) throws ServiceException;

	/**
	 * 同一个主策略下，子策略名称不相同
	 * 
	 * @param subPolicyId
	 * @param subPolicyName
	 * @param mainPolicyId
	 * @param originalMainPolicyId
	 *            优先取原始id
	 * @return
	 * @throws ServiceException
	 *             服务异常
	 */
	boolean isExisPolicyName4Sub(String subPolicyId, String subPolicyName, String mainPolicyId, String originalMainPolicyId) throws ServiceException;

	/**
	 * 修改策略基础信息.
	 * 
	 * @param policyPojo
	 *            策略对象
	 * @throws ServiceException
	 *             服务异常
	 */
	String modifyPolicyBaseInfo(final PolicyPojo policyPojo) throws ServiceException;

	/**
	 * 单独修改一条事件.
	 * 
	 * @param userId
	 *            修改策略的userId
	 * @param policyEventPojo
	 *            策略事件
	 * @throws ServiceException
	 *             服务异常
	 */
	String modifyPolicyEvent(String userId, final PolicyEventPojo policyEventPojo) throws ServiceException;

	/**
	 * 修改策略事件，包括事件触发规则.
	 * 
	 * @param policyId
	 *            策略ID
	 * @param userId
	 *            修改策略的userId
	 * @param policyEventPojos
	 *            策略事件列表
	 * @return 策略ID 如果产生了新版本的策略就返回新版的ID
	 * @throws ServiceException
	 *             服务异常
	 */
	String modifyPolicyEvents(String policyId, String userId, final List<PolicyEventPojo> policyEventPojos) throws ServiceException;

	/**
	 * 更新策略关联的资源实例.
	 * 
	 * @param policyId
	 *            策略ID
	 * @param userId
	 *            修改人
	 * @param resRelPojos
	 *            关联资源
	 * @return 新版本策略ID
	 * @throws ServiceException
	 *             服务异常
	 */
	String modifyPolicyResRel(String policyId, String userId, final List<PolicyResRelPojo> resRelPojos) throws ServiceException;

	/**
	 * 策略发布
	 * 
	 * @param userId
	 *            发布人
	 * @param policyIds
	 *            策略ID列表
	 * @return 要下发的策略ID
	 * @throws ServiceException
	 *             服务异常
	 */
	List<String> policyPublish(String userId, final List<String> policyIds) throws ServiceException;

	/**
	 * 策略禁用.
	 * 
	 * @param policyIds
	 *            策略ID列表
	 * @return 要下发的策略ID
	 * @throws ServiceException
	 *             服务异常
	 */
	List<String> policyStop(final List<String> policyIds) throws ServiceException;

	/**
	 * 根据策略ID删除策略，这里只是删除了各类型策略共有表的信息（包括：基础信息，事件基础信息，关联资源），
	 * 如果需要同时做其他操作，请在每个子service中覆写此方法
	 * 
	 * @param policyId
	 *            策略ID
	 * @return 删除的策略Id
	 * @throws ServiceException
	 *             服务异常
	 */
	List<String> removePolicyByPolicyId(String policyId) throws ServiceException;

	/**
	 * 根据策略ID批量删除策略，这里只是删除了各类型策略共有表的信息（包括：基础信息，事件基础信息，关联资源），如果需要同时做其他操作，
	 * 请在每个子service中覆写此方法
	 * 
	 * @param policyIds
	 *            策略ID
	 * @return 删除的策略Id
	 * @throws ServiceException
	 *             服务异常
	 */
	List<String> removePolicyByPolicyIds(final List<String> policyIds) throws ServiceException;

	/**
	 * 根据事件ID删除事件.
	 * 
	 * @param policyId
	 *            策略ID
	 * @param userId
	 *            修改策略的userId
	 * @param eventId
	 *            事件ID
	 * @throws ServiceException
	 *             服务异常
	 */
	String removePolicyEvent(String policyId, String userId, String eventId) throws ServiceException;

	/**
	 * 根据策略ID删除关联事件.
	 * 
	 * @param policyId
	 *            策略ID
	 * @param userId
	 *            修改人ID
	 * @return 新版本策略ID
	 * @throws ServiceException
	 *             服务异常
	 */
	String removePolicyEvents(String policyId, String userId) throws ServiceException;

	/**
	 * 根据事件ID批量删除事件.
	 * 
	 * @param policyId
	 *            策略ID
	 * @param userId
	 *            修改策略的userId
	 * @param eventIds
	 *            事件ID列表
	 * @throws ServiceException
	 *             服务异常
	 */
	String removePolicyEvents(String policyId, String userId, final List<String> eventIds) throws ServiceException;

	/**
	 * 根据策略ID删除其所关联的资源.
	 * 
	 * @param policyId
	 *            策略ID
	 * @throws ServiceException
	 *             服务异常
	 */
	void removePolicyRelResByPolicyId(String policyId) throws ServiceException;

	/**
	 * 根据策略ID和关联的资源实例ID删除其所关联的资源.
	 * 
	 * @param policyId
	 *            策略ID
	 * @param resInstanceIds
	 *            实例ID
	 * @throws ServiceException
	 *             服务异常
	 */
	void removePolicyRelResByPolicyIdAndResIds(final String policyId, final boolean policyIsMain, final String policyType, final List<String> resInstanceIds)
			throws ServiceException;

	/**
	 * 根据策略类型和资源实例ID删除策略关联的资源，如果删除的是主资源还要删除子策略下的相应的子资源.
	 * 
	 * @param policyType
	 *            策略类型
	 * @param resInstanceIds
	 *            资源实例ID
	 * @throws ServiceException
	 *             服务异常
	 */
	void removePolicyRelResByResIds(String policyType, final List<String> resInstanceIds) throws ServiceException;

	/**
	 * 根据监控模型ID取得策略, 用于加载出厂策略
	 * 
	 * @param modelId
	 *            模型ID
	 * @param isFactory
	 *            是否出厂策略
	 * @return 策略
	 * @throws ServiceException
	 *             服务异常
	 */
	PolicyPojo getPolicyByModelId(String modelId, boolean isFactory) throws ServiceException;

	/**
	 * 根据监控模型ID取得出厂Link策略, 用于加载出厂策略
	 * 
	 * @param modelId
	 *            模型ID
	 * @param bandwidthType
	 *            带宽类型
	 * @return 策略
	 * @throws ServiceException
	 *             服务异常
	 */
	PolicyPojo getFactoryLinkPolicyByModelId(String modelId, BandwidthType bandwidthType) throws ServiceException;

	/**
	 * 根据策略ID和指标ID取得阈值.
	 * 
	 * @param policyId
	 *            策略id
	 * @param metricId
	 *            指标id
	 * @return
	 * @throws ServiceException
	 *             服务异常
	 */
	List<PolicyThresholdPojo> getThresholdByInstMetricId(String policyId, String metricId) throws ServiceException;

	/**
	 * 根据实例和指标id取得缺省阈值.
	 * 
	 * @param policyId
	 *            策略id
	 * @param metricId
	 *            指标id
	 * @param status
	 *            指标状态
	 * @return
	 * @throws ServiceException
	 *             服务异常
	 */
	int getThreshold4Default(String policyId, String metricId, Status4Metric status) throws ServiceException;

	/**
	 * 是否需要触发action
	 * 
	 * @param policyId
	 *            策略id
	 * @param eventId
	 *            事件id
	 * @return
	 * @throws ServiceException
	 *             服务异常
	 */
	boolean isTrigerAction(String policyId, String eventId) throws ServiceException;

	/**
	 * 初始化方法.
	 */
	void init();

	/**
	 * 取得内存策略Map（已发布策略）
	 * 
	 * @return 策略Map
	 */
	Map<String, PolicyPojo> getPolicyMap();

	/**
	 * 取得默认策略-从策略文件中
	 * 
	 * @param policyFile
	 *            策略文件
	 * @return 默认策略
	 */
	PolicyPojo loadFile(File policyFile);

	/**
	 * 取得策略列表-按策略类型-域ID列表
	 * 
	 * @param policyType
	 *            策略类型
	 * @param domainIds
	 *            域ID列表
	 * @return 策略列表
	 * @throws ServiceException
	 *             服务异常
	 */
	List<PolicyPojo> getPolicyBaseInfoByPolicyTypeAll(String policyType, List<String> domainIds) throws ServiceException;

	/**
	 * 修改Log的资源关联关系
	 * 
	 * @param policyId
	 *            策略ID
	 * @param userId
	 *            用户ID
	 * @param resRelPojos
	 *            资源关联关系
	 * @return 策略ID
	 * @throws ServiceException
	 *             服务异常
	 */
	String modifyLogPolicyResRel(String policyId, String userId, List<PolicyResRelPojo> resRelPojos) throws ServiceException;

	/**
	 * 修改Trap的资源关联关系
	 * 
	 * @param policyId
	 *            策略ID
	 * @param userId
	 *            用户ID
	 * @param resRelPojos
	 *            资源关联关系
	 * @return 策略ID
	 * @throws ServiceException
	 *             服务异常
	 */
	String modifyTrapPolicyResRel(String policyId, String userId, List<PolicyResRelPojo> resRelPojos) throws ServiceException;
    /**
     * 根据主资源ID 查询策略基本对象集合.
     * 
     * @param instId 主资源ID
     * @param subInstId 子资源ID
     * @param policyType 策略类型
     * @return 策略基本对象集合
     * @throws ServiceException 服务异常
     */
    PolicyBasePojo getPolicyBaseByInstId(String instId, String subInstId, PolicyType policyType)
        throws ServiceException;
    
    /**
     * 更新策略缓存
     * {method description}.
     * @param policyId
     * @throws ServiceException
     */
    void updateCache(String policyId)  throws ServiceException;
}
