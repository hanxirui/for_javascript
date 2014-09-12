package com.riil.base.resmodel;

import java.io.File;
import java.util.List;

import com.riil.base.pojo.enums.Enum4ResModel.ResIsMain;
import com.riil.base.pojo.enums.EnumRoot.MetricType;
import com.riil.base.resmodel.pojo.mmodel.Model;
import com.riil.base.resmodel.pojo.mmodel.ModelMetricBindingPojo;
import com.riil.base.resmodel.pojo.mmodel.ModelPojo;
import com.riil.base.utils.IDataSync;
import com.riil.core.service.IService;
import com.riil.core.service.ServiceException;

/**
 * 监控模型服务接口 <br>
 * <p>
 * Create on : 2012-6-1<br>
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
public interface IModelService extends IService, IDataSync {

	/**
	 * <code>S_SERVICE_ID</code> - Service Bean ID.
	 */
	String S_SERVICE_ID = "modelService";

	/**
	 * 初始化方法.
	 */
	void init();

	/*--Get Model-----------------------------------------------------------------*/

	/**
	 * 取得模型-按模型ID
	 * 
	 * @param modelId 模型ID
	 * @return 模型
	 * @throws ServiceException 服务异常
	 */
	// portal 3
	Model getModel(String modelId) throws ServiceException;

	/**
	 * 取得模型-按sysoid
	 * 
	 * @param sysoid
	 * @return 模型
	 * @throws ServiceException 服务异常
	 */
	Model getModelBySysoid(String sysoid) throws ServiceException;

	/**
	 * 取得全部模型
	 * 
	 * @return 模型
	 * @throws ServiceException 服务异常
	 */
	List<Model> getAllModel() throws ServiceException;
	
	/**
	 * 取得全部模型
	 * 
	 * @return 模型
	 * @throws ServiceException 服务异常
	 */
	List<ModelPojo> getAllModelPojo() throws ServiceException;

	/**
	 * 取得模型-按模型ID列表
	 * 
	 * @param modelIds 模型ID列表
	 * @return 模型
	 * @throws ServiceException 服务异常
	 */
	List<Model> getAllModel(List<String> modelIds) throws ServiceException;

	/**
	 * 取得模型-按模板ID列表
	 * 
	 * @param resTypeIds 模板ID列表
	 * @return 模型
	 * @throws ServiceException 服务异常
	 */
	List<Model> getAllModelByResTypeIds(List<String> resTypeIds) throws ServiceException;

	/**
	 * 根据资源类型取得主资源模型，或子资源模型<br>
	 * 资源类型为主资源，返回全部主资源模型<br>
	 * 资源类型为子资源，主资源模型ID为null或空串，则返回全部子资源模型<br>
	 * 资源类型为子资源，主资源模型ID不为null或空串，则返回主资源模型ID对应的全部子资源模型<br>
	 * 
	 * @param isMain 资源类型(主资源或子资源)
	 * @param mainModeId 主资源模型ID
	 * @return 缓存的主资源模型或子资源模型
	 * @throws ServiceException 服务异常
	 */
	// portal 1
	List<Model> getAllModelByMainModel(ResIsMain isMain, String mainModeId) throws ServiceException;


	/**
	 * 取得模型树-按TreeNodeId
	 * 
	 * @param treeNodeId 模型TreeNodeId
	 * @return 模型树（包含下级模型）
	 * @throws ServiceException 服务异常
	 */
	// portal 3
	List<Model> getAllModelTreeByTreeNodeId(final String treeNodeId) throws ServiceException;

	/*--Other-----------------------------------------------------------------*/

	/**
	 * 取得模型指标类型
	 * 
	 * @param modelId 模型ID
	 * @param metricId 模型指标ID
	 * @return 模型指标类型
	 * @throws ServiceException 服务异常
	 */
	MetricType getMetricType(String modelId, String metricId) throws ServiceException;

	/**
	 * 取得模型指标
	 * 
	 * @param modelId 模型ID
	 * @param metricId 模型指标ID
	 * @return 模型指标
	 * @throws ServiceException 服务异常
	 */
	ModelMetricBindingPojo getModelMetricBindingPojo(String modelId, String metricId) throws ServiceException;

	/**
	 * 导入模型至DB中<br>
	 * 
	 * @param model 模型
	 * @throws ServiceException 服务异常
	 */
	void importModel(ModelPojo model) throws ServiceException;

	ModelPojo loadFile(File file);

	List<String> getSubModelIdsByMainModelId(String mainModelId);

}