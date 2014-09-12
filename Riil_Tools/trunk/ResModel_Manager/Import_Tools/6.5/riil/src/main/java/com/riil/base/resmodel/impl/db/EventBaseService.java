package com.riil.base.resmodel.impl.db;

import java.util.List;

import com.riil.base.resmodel.IEventBaseService;
import com.riil.base.resmodel.impl.db.dao.EventBaseDao;
import com.riil.base.resmodel.pojo.base.EventBasePojo;
import com.riil.core.commons.Assert;
import com.riil.core.dao.DAOException;
import com.riil.core.dao.IQueryParam;
import com.riil.core.dao.PageDataPojo;
import com.riil.core.service.AbsService;
import com.riil.core.service.ServiceException;

/**
 * 
 * 简化模型--事件基础信息数据库访问服务 <br>
 * 模型改造后，作为初始化数据生成，只有6条数据，且不做修改，分别为：<br>
 * <ul>
 * 	<li>AVAILABLE(可用性指标恢复可用)</li>
 *  <li>CONFIG_CHANGE(配置指标变更)</li>
 *  <li>CRITICAL_PERFORMANCE(当前性能指标严重超标)</li>
 *  <li>MINOR_PERFORMANCE(当前性能指标轻微超标)</li>
 *  <li>RECOVER_PERFORMANCE(性能指标恢复)</li>
 *  <li>UNAVAILABLE(可用性指标不可用)</li>
 * </ul>
 * <p>
 * Create on : 2011-12-11<br>
 * <p>
 * </p>
 * <br>
 * 
 * @author panhongliang@ruijie.com.cn<br>
 * @version riil.resmodel.impl v6.0
 *          <p>
 *          <br>
 *          <strong>Modify History:</strong><br>
 *          user modify_date modify_content<br>
 *          -------------------------------------------<br>
 *          <br>
 */
public class EventBaseService extends AbsService implements IEventBaseService {

	/**
	 * <code>m_eventBaseDao</code> - DAO object.
	 */
	private EventBaseDao m_eventBaseDao;

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.riil.base.resmodel.IEventBaseService#createBatch(java.util.List)
	 */
	@Override
	public void createBatch(List<EventBasePojo> list) throws ServiceException {
		if (list == null || list.size() <= 0) {
			return;
		}
		try {
			for(EventBasePojo eventBase : list){
				this.m_eventBaseDao.doInsertPojo(eventBase);
			}
//			this.m_eventBaseDao.doBatchInsertPojo(list);
		} catch (DAOException te) {
			throw new ServiceException(te);
		}
	}

	public void importBatch(List<EventBasePojo> list) throws ServiceException {
		if (list == null || list.size() <= 0) {
			return;
		}
		try {
//			this.m_eventBaseDao.doBatchInsertPojo(list);
			m_eventBaseDao.insert(list);
		} catch (DAOException te) {
			throw new ServiceException(te);
		}
	}
	
	/*
	 * (non-Javadoc)
	 * 
	 * @see com.riil.base.resmodel.impl.db.IEventBaseService#createEventBase
	 * (com.riil.base.resmodel.pojo.base.EventBasePojo)
	 */
	@Override
	public void createEventBase(final EventBasePojo eventBase) throws ServiceException {

		Assert.notNull(eventBase, "Create eventBase is error , because parameter is null.");

		try {

			this.m_eventBaseDao.doInsertPojo(eventBase);

		} catch (DAOException te) {
			throw new ServiceException(te);
		}

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.riil.base.resmodel.impl.db.IEventBaseService#getAllEventBase()
	 */
	@Override
	public List<EventBasePojo> getAllEventBase() throws ServiceException {

		try {
			return this.m_eventBaseDao.doSelectAll();
		} catch (DAOException te) {

			throw new ServiceException(te);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.resmodel.impl.db.IEventBaseService#getEventBaseByID(java
	 * .lang.String)
	 */
	@Override
	public EventBasePojo getEventBaseByID(final String eventBaseID) throws ServiceException {

		Assert.hasLength(eventBaseID, "Get eventBase info is error ,because eventBase id is null.");
		// @SuppressWarnings("unchecked")
		// ICache<String, EventBasePojo> t_cache =
		// CacheManager.getInstance().getCache(EventBasePojo.S_CACHE_KEY);
		// if (t_cache != null) {
		// return t_cache.get(eventBaseID);
		// }
		try {
			return this.m_eventBaseDao.doSelectByID(eventBaseID);
		} catch (DAOException te) {

			throw new ServiceException(te);
		}

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.resmodel.IEventBaseService#getEventBaseByModel(java.lang
	 * .String)
	 */
	@Override
	public List<EventBasePojo> getEventBaseByModel(String modelId) throws ServiceException {
		Assert.hasLength(modelId, "Get eventBase info is error ,because modelId is null.");
//		try {
//			return this.m_eventBaseDao.doSelectListByModelId(modelId);
//		} catch (DAOException te) {
//
//			throw new ServiceException(te);
//		}
		return null; // modelId -> policyId -> policyEventId -> List<EventBasePojo>
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.resmodel.IEventBaseService#getEventBaseByMoniTemp(java.
	 * lang.String)
	 */
	@Override
	public List<EventBasePojo> getEventBaseByMoniTemp(String moniTempId) throws ServiceException {
//		try {
//			EventBasePojo t_event = new EventBasePojo();
//			t_event.setMoniTempId(moniTempId);
//			return this.m_eventBaseDao.doSelectList(t_event);
//		} catch (DAOException te) {
//
//			throw new ServiceException(te);
//		}
		return null; // 从tempId -> policyId -> policyEventId -> List<EventBasePojo>
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.resmodel.impl.db.IEventBaseService#getEventBaseByQuery(
	 * com.riil.core.dao.IQueryParam )
	 */
	@Override
	public EventBasePojo getEventBaseByQuery(final IQueryParam condition) throws ServiceException {

		Assert.notNull(condition, "Get eventBase info is error , beacause query condition is null.");

		try {
			return this.m_eventBaseDao.doSelectOneByQuery(condition);
		} catch (DAOException te) {

			throw new ServiceException(te);
		}
	}

	public EventBaseDao getEventBaseDao() {
		return this.m_eventBaseDao;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.resmodel.impl.db.IEventBaseService#getEventBasePageByQuery
	 * (com.riil.core.dao. IQueryParam, int, int)
	 */
	@Override
	public PageDataPojo<EventBasePojo> getEventBasePageByQuery(final IQueryParam condition) throws ServiceException {

		Assert.notNull(condition, "Get eventBase info page data is error , beacause query condition is null.");

		try {
			return this.m_eventBaseDao.doPageSelect(condition);
		} catch (DAOException te) {

			throw new ServiceException(te);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.resmodel.impl.db.IEventBaseService#getEventBasesByQuery
	 * (com.riil.core.dao.IQueryParam )
	 */
	@Override
	public List<EventBasePojo> getEventBasesByQuery(final IQueryParam condition) throws ServiceException {

		Assert.notNull(condition, "Get eventBase info collection is error , beacause query condition is null.");

		try {
			return this.m_eventBaseDao.doSelectList(condition);
		} catch (DAOException te) {

			throw new ServiceException(te);
		}

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.riil.base.resmodel.impl.db.IEventBaseService#modifyEventBase
	 * (com.riil.base.resmodel.pojo.base.EventBasePojo)
	 */
	@Override
	public void modifyEventBase(final EventBasePojo eventBase) throws ServiceException {

		Assert.notNull(eventBase, "Modify eventBase info is error , because parameter is null.");

		try {

			this.m_eventBaseDao.doUpdatePojo(eventBase);

		} catch (DAOException te) {
			throw new ServiceException(te);
		}

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.riil.base.resmodel.impl.db.IEventBaseService#removeAllEventBase
	 * ()
	 */
	@Override
	public void removeAllEventBase() throws ServiceException {

		try {

			this.m_eventBaseDao.doDeleteAll();

		} catch (DAOException te) {

			throw new ServiceException(te);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.resmodel.impl.db.IEventBaseService#removeEventBase(com.
	 * riil.core.dao.I)
	 */
	@Override
	public void removeEventBase(final IQueryParam condition) throws ServiceException {

		Assert.notNull(condition, "Remove eventBase is error , beacause remove condition is null.");

		try {

			this.m_eventBaseDao.doDeleteByQuery(condition);

		} catch (DAOException te) {

			throw new ServiceException(te);
		}

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.riil.base.resmodel.impl.db.IEventBaseService#removeEventBase(java
	 * .lang.String)
	 */
	@Override
	public void removeEventBase(final String eventBaseID) throws ServiceException {

		Assert.hasLength(eventBaseID, "Remove eventBase info is error , because parameter is null.");

		try {

			this.m_eventBaseDao.doDeleteByID(eventBaseID);

		} catch (DAOException te) {

			throw new ServiceException(te);
		}

	}

	public void setEventBaseDao(final EventBaseDao eventBaseDao) {
		this.m_eventBaseDao = eventBaseDao;
	}

}