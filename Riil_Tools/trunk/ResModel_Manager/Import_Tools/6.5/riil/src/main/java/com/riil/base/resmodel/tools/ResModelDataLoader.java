package com.riil.base.resmodel.tools;

import com.riil.core.commons.ServerModule;
import com.riil.core.dao.DAOException;
import com.riil.core.logger.SystemLogger;
import com.riil.core.pojo.AbsPojo;
import com.riil.core.service.ServiceException;

/**
 * 公用资源模型数据加载器<br>
 * 提供加载策略的统一控制，默认加载顺序：Cache->DB->File<br>
 * <p>
 * Create on : 2012-6-9<br>
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
public class ResModelDataLoader<E> {

	/**
	 * <code>S_LOGGER</code> - Logger.
	 */
	private static final SystemLogger S_LOGGER = SystemLogger.getSystemLogger(ResModelDataLoader.class,
			ServerModule.ResourceModel);
	
	private ILazyData<E> m_lazyDataLoader;

	public ResModelDataLoader(ILazyData<E> lazyDataLoader) {
		this.m_lazyDataLoader = lazyDataLoader;
	}
	
	/**
	 * 取得资源模型数据-按ID
	 * 
	 * @param Id ID
	 * @return 资源模型数据
	 * @throws ServiceException 服务异常
	 */
	public E get(String id) throws ServiceException {
		return get(id, true); // 优先从Cache中查找
	}

	/**
	 * 取得资源模型数据-按ID
	 * 
	 * @param tempId ID
	 * @param fromCache 优先从Cache中查找
	 * @return 资源模型数据
	 * @throws ServiceException 服务异常
	 */
	public E get(String id, boolean fromCache) throws ServiceException {
		return get(id, fromCache, true, true);
	}

	/**
	 * 取得资源模型数据-按ID
	 * 
	 * @param tempId ID
	 * @param fromCache 优先从Cache中查找
	 * @param fromDB 优先从DB中查找
	 * @return 资源模型数据
	 * @throws ServiceException 服务异常
	 */
	// 加载顺序：Cache->DB->File
	public E get(String id, boolean fromCache, boolean fromDB, boolean fromFile) throws ServiceException {
		try {
			if (null == id) {
				return null;
			}
			E t_pojo = null;

			// Cache中查找
			if (fromCache) {
				t_pojo = m_lazyDataLoader.getFromCache(id);
				if (t_pojo != null) {
					return t_pojo;
				}

			}

			// DB中查找
			fromDB = false;  //暂时屏蔽从数据库读取的功能
			if (fromDB) {
				t_pojo = m_lazyDataLoader.getFromDB(id);
				if (t_pojo != null) {
					if(S_LOGGER.isInfoEnabled()){
						S_LOGGER.info("data [expected id: "+id+", actual id: "+((AbsPojo)t_pojo).getId()+"] in db!");
					}
					if(!id.equals(((AbsPojo)t_pojo).getId())){
						S_LOGGER.error("data [expected id: "+id+", actual id: "+((AbsPojo)t_pojo).getId()+"] is not equal!");
					}
					m_lazyDataLoader.updateCache(t_pojo);
					return m_lazyDataLoader.getFromCache(id);
				}
			}

			// 从File中查找
			if(fromFile){
				t_pojo = m_lazyDataLoader.loadFile(id, true); // true 更新Cache
				return t_pojo;
			}
			
			return t_pojo;
		} catch (DAOException e) {
			throw new ServiceException("get Data from db is fail!", e);
		}
	}
}
