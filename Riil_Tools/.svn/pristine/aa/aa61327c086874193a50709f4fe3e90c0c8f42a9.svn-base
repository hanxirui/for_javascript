package com.riil.base.resmodel;

import java.util.List;

import com.riil.base.resmodel.param.ResTreeParam;
import com.riil.base.resmodel.pojo.base.ResTypePojo;
import com.riil.base.resmodel.pojo.mmodel.Model;
import com.riil.base.resmodel.pojo.vendor.VendorModelPojo;
import com.riil.base.resource.param.DomainParam;
import com.riil.base.resource.pojo.ResInstancePojo;
import com.riil.core.service.IService;
import com.riil.core.service.ServiceException;

/**
 * 资源模型辅助服务接口<br>
 * 提供获取资源模型扩展信息的功能（例如模板相关的资源数量） <br>
 * <p>
 * Create on : 2012-6-7<br>
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
public interface IResModelSupport extends IService {

	/**
	 * <code>S_SERVICE_ID</code> - Service Bean ID.
	 */
	String S_SERVICE_ID = "resModelSupport";

	/**
	 * 只取已经监控的资源模板类型.
	 * 
	 * @param treeLevel
	 * @param withSubLevel
	 * @param isMainRes
	 * @return
	 * @throws ServiceException
	 */
	List<ResTypePojo> getResTypeHasRes() throws ServiceException;

	/**
	 * 只取一个级别的 有资源 的模板列表.
	 * 
	 * @param treeLevel
	 * @return
	 * @throws ServiceException
	 */
	List<ResTypePojo> getResTypeHasRes(int treeLevel) throws ServiceException;

	/**
	 * 根据业务id，取得业务资源树.
	 * 
	 * @param bizId 业务ID
	 * @return
	 * @throws ServiceException
	 */
	List<ResTypePojo> getResTypeListByBizId(String bizId) throws ServiceException;

	/**
	 * 根据业务id，取得业务资源树.
	 * @param bizId 业务ID
	 * @param level 模板Level
	 * @return
	 * @throws ServiceException
	 */
	List<ResTypePojo> getResTypeListByBizId(String bizId, int level) throws ServiceException;
	
	/**
	 * 取得模型（包含已监控资源的模型）-按TreeNodeId
	 * 
	 * @param treeNodeId TreeNodeId
	 * @return 模型
	 * @throws ServiceException 服务异常
	 */
	// portal 2
	List<Model> getAllModelHasResByTreeNodeId(String treeNodeId) throws ServiceException;

	/**
	 * 根据模型创建资源实例大对象 .
	 * 
	 * @param modelId 模型ID
	 * @return 资源实例大对象
	 * @throws ServiceException 服务异常
	 */
	ResInstancePojo createResInstancePojo(final String modelId) throws ServiceException;
	
	/**
	 * 获取所有厂商列表，以及每个厂商包括的指定域下的资源数目
	 * 
	 * @param domainId 指定域id
	 * @return 数据字典列表
	 *         <p>
	 *         <code>DictCommonPojo.tag1</code> 保存厂商包括的指定域下的资源数量,如果为null，表示该厂商下没有任何资源
	 *         </p>
	 * @throws ServiceException
	 */
//	List<VendorModelPojo> getVendorsWithResNumByDomain(final String domainId) throws ServiceException;
	List<VendorModelPojo> getVendorsWithResNumByDomain(List<String> domainIds) throws ServiceException;

	/**
	 * 根据主资源ID，查询子资源模板及子资源数量<br>
	 * 说明：	1.查询全部子资源数量（包括已监控和未监控）<br>
	 * 			2.仅返回模板ID，模板名称和子资源数量
	 * 
	 * @param mainResId 主资源ID
	 * @return 子资源模板及子资源数量
	 * @throws ServiceException 服务异常
	 */
	List<ResTypePojo> getAllSubResTypeWithResNum(String mainResId) throws ServiceException;

	List<ResTypePojo> getResTypeTreeWithResNum(DomainParam domainParam, ResTreeParam resTreeParam) throws ServiceException;

	List<ResTypePojo> getKpiResTypeTreeWithResNum(DomainParam domainParam, ResTreeParam resTreeParam) throws ServiceException;

	List<ResTypePojo> getBizSrvResTypeTreeWithResNum(DomainParam domainParam, ResTreeParam resTreeParam)
			throws ServiceException;

	List<ResTypePojo> getEventCenterResTypeTreeWithResNum(DomainParam domainParam, String treeNodeId, Integer treeLevel)
			throws ServiceException;

	List<ResTypePojo> getResTypeTreeWithResNumNotInDomain() throws ServiceException;

	/**
	 * 取得包含资源的模板树-按资源组ID<br>
	 * 用于资源组管理->查询
	 * @param resGroupId 资源组ID
	 * @param domainId 域ID
	 * @return 模板树
	 * @throws ServiceException 服务异常
	 */
	List<ResTypePojo> getResTypeTreeHasResByResGroupId(String resGroupId, String domainId) throws ServiceException;

	/**
	 * 取得包含备选资源的模板树-按资源组ID<br>
	 * 用于资源组管理->添加
	 * @param resGroupId 资源组ID
	 * @param domainId 域ID
	 * @return 模板树
	 * @throws ServiceException 服务异常
	 */
	List<ResTypePojo> getResTypeTreeHasCandidateResByResGroupId(String resGroupId, String domainId) throws ServiceException;
	
	/**
	 * 取得包含备选资源的模板树-按资源组ID<br>
	 * 用于资源组管理->添加
	 * @param resGroupId 资源组ID
	 * @param domainId 域ID
	 * @return 模板树(包含校本资源)
	 * @throws ServiceException 服务异常
	 */
	List<ResTypePojo> getResTypeTreeHasCandidateResWithScriptByResGroupId(String resGroupId, String domainId) throws ServiceException;
	
	/**
     * 取得厂商-按TreeNodeId
     * @param treeNodeId TreeNodeId
     * @param hasRes 是否有资源 (hasRes = true - 从数据库读取; hasRes = false : 从文件读取)
     * @return 厂商列表
     * @throws ServiceException 服务异常
     */
    List<VendorModelPojo> getVendorModelByTreeNodeId(String treeNodeId, boolean hasRes) throws ServiceException;
	
}
