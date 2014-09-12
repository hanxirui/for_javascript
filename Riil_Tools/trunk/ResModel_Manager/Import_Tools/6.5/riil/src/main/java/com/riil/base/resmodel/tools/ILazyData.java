package com.riil.base.resmodel.tools;

import java.util.List;

import com.riil.core.dao.DAOException;

public interface ILazyData<E> {

	/**
	 * 从Cache中加载数据
	 * @param id 数据ID（例如模板ID，模型ID等）
	 * @return 数据（模板，模型等）
	 */
	E getFromCache(String id);

	/**
	 * 从DB中加载数据
	 * @param id 数据ID（例如模板ID，模型ID等）
	 * @return 数据（模板，模型等）
	 * @throws DAOException DAO异常
	 */
	E getFromDB(String id) throws DAOException;
	
	/**
	 * 从文件中加载数据
	 * @param id 数据ID（例如模板ID，模型ID等）
	 * @param updateCache 是否更新Cache
	 * @return 数据（模板，模型等）
	 */
	E loadFile(String id, boolean updateCache);

	/**
	 * 更新Cache
	 * @param pojo 数据（模板，模型等）
	 */
	void updateCache(E pojos);
	
	/**
	 * 从文件中加载数据
	 * @param id 数据ID（例如模板ID，模型ID等）
	 * @param updateCache 是否更新Cache
	 * @return 数据（模板，模型等）
	 */
	List<E> loadFiles(String id, boolean updateCache);
}
