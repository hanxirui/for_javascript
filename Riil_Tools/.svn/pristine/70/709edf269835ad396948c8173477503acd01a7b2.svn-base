package com.riil.base.policy;

import java.util.List;
import java.util.Map;

import com.riil.base.resmodel.pojo.policy.PolicyPojo;
import com.riil.base.resmodel.pojo.policy.PolicyScriptMetricPojo;
import com.riil.base.resmodel.pojo.policy.PolicyScriptResPojo;
import com.riil.core.dao.PageDataPojo;
import com.riil.core.service.ServiceException;

/**
 * 【DB】脚本策略Service <br>
 * <p>
 * Create on : 2011-9-9<br>
 * <p>
 * </p>
 * <br>
 * 
 * @author liqiang<br>
 * @version riil_admin_api v1.0
 *          <p>
 *          <br>
 *          <strong>Modify History:</strong><br>
 *          user modify_date modify_content<br>
 *          -------------------------------------------<br>
 *          <br>
 */
public interface IScriptPolicyService extends IPolicyService {

	/**
	 * <code>S_SERVICE_ID</code> - Service Bean ID.
	 */
	String S_SERVICE_ID = "scriptPolicyService";

	/**
	 * 新建脚本策略.
	 * 
	 * @param policyPojo
	 *            脚本策略
	 * @throws ServiceException
	 *             Service层异常
	 */
	void createScriptPolicy(final PolicyPojo policyPojo) throws ServiceException;

	/**
	 * 根本脚本策略ID获取脚本策略POJO
	 */
	public PolicyScriptResPojo getPojoByPrimaryKey(final String id) throws ServiceException;

	/**
	 * 根据策略ID获取关联指标.
	 * 
	 * @param policyId
	 *            策略ID
	 * @return 策略关联指标集合
	 * @throws ServiceException
	 *             Service层异常
	 */
	List<PolicyScriptMetricPojo> getScriptMetricByPolicyId(final String policyId) throws ServiceException;

	/**
	 * 根据策略ID获取关联指标.
	 * 
	 * @param resId
	 *            String
	 * @return Map<String, PolicyScriptMetricPojo>
	 * @throws ServiceException
	 */
	Map<String, PolicyScriptMetricPojo> getScriptMetricMapByResId(final String resId) throws ServiceException;

	/**
	 * 根据PolicyScriptResPojo查询脚本策略资源列表(分页) 2011/11/13 liugang添加
	 * 
	 * @param policyScriptResPojo
	 *            PolicyScriptResPojo 脚本资源策略POJO
	 * @return PageDataPojo<PolicyScriptResPojo> 脚本策略资源
	 * @throws ServiceException
	 */
	public PageDataPojo<PolicyScriptResPojo> getScriptResByPojo(final PolicyScriptResPojo policyScriptResPojo)
			throws ServiceException;

	/**
	 * 根据脚本策略Id取得所有脚本资源. *
	 * <p>
	 * 执行流程：1、删除策略关联资源。 2、插入策略关联资源
	 * </p>
	 * 
	 * @param policyId
	 *            策略ID
	 * @return 策略关联资源
	 * @throws ServiceException
	 *             Service层异常
	 */
	List<PolicyScriptResPojo> getScriptResByPolicyId(final String policyId) throws ServiceException;

	/**
	 * 根据PolicyScriptResPojo查询脚本策略资源列表(不分页)
	 * 
	 * @param policyScriptResPojo
	 *            PolicyScriptResPojo
	 * @return List<PolicyScriptResPojo>
	 * @throws ServiceException
	 */
	public List<PolicyScriptResPojo> getScriptResListByPojo(final PolicyScriptResPojo policyScriptResPojo)
			throws ServiceException;

	/**
	 * 根据脚本资源id列表查询脚本资源
	 * 
	 * @param ip
	 *            String
	 * @return List<PolicyScriptResPojo>
	 * @throws ServiceException
	 */
	public List<PolicyScriptResPojo> getScriptResListByResIds(List<String> resIds) throws ServiceException;

	/**
	 * 根据IP查询脚本资源
	 * 
	 * @param ip
	 *            String
	 * @return List<PolicyScriptResPojo>
	 * @throws ServiceException
	 */
	public List<PolicyScriptResPojo> getScriptResPojoByIp(String ip) throws ServiceException;

	/**
	 * 
	 * 脚本指标判断是否重名
	 * 
	 * @param policyId
	 * @param Id
	 * @param Name
	 * @return
	 * @throws ServiceException
	 */
	boolean isExisMetricName(String policyId, final String metricId, final String metricName) throws ServiceException;

	/**
	 * 批量修改脚本策略关联指标.
	 * <p>
	 * 执行流程：1、删除策略关联指标。 2、插入策略关联指标
	 * </p>
	 * 
	 * @param policyId
	 *            策略ID
	 * @param userId
	 *            操作人
	 * @param scriptMetricPojos
	 *            关联指标集合
	 * @return 新版本策略ID
	 * @throws ServiceException
	 *             Service层异常
	 */
	String modifyScriptMetric(final String policyId, final String userId, final List<PolicyScriptMetricPojo> scriptMetricPojos)
			throws ServiceException;

	/**
	 * 更新某脚本策略下的脚本资源.
	 * 
	 * @param policyPojo
	 *            脚本策略对象
	 * @throws ServiceException
	 *             Service层异常
	 */
	String modifyScriptRes(final String policyId, final String userId, final List<PolicyScriptResPojo> policyScriptResPojos)
			throws ServiceException;

	List<PolicyPojo> getScriptPolicyBaseInfoByDomain(List<String> domainIds) throws ServiceException;

}
