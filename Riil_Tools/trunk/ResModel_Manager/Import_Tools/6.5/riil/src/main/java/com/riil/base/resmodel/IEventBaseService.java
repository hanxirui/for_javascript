package com.riil.base.resmodel;

import java.util.List;

import com.riil.base.resmodel.pojo.base.EventBasePojo;
import com.riil.core.dao.IQueryParam;
import com.riil.core.dao.PageDataPojo;
import com.riil.core.service.IService;
import com.riil.core.service.ServiceException;

/**
 * 事件基础信息服务接口 <br>
 * <p>
 * Create on : 2011-11-10<br>
 * <p>
 * </p>
 * <br>
 * 
 * @author panhongliang@ruijie.com.cn<br>
 * @version riil.base.resmodel.api v6.0
 *          <p>
 *          <br>
 *          <strong>Modify History:</strong><br>
 *          user modify_date modify_content<br>
 *          -------------------------------------------<br>
 *          <br>
 */
public interface IEventBaseService extends IService {

    /**
     * <code>S_SERVICE_ID</code> - Service Bean ID.
     */
    public static final String S_SERVICE_ID = "eventBaseService";

    /**
     * batch create eventBase info.
     * 
     * @param eventBase - eventBase POJO object.
     * @throws ServiceException
     */
    void createBatch(final List<EventBasePojo> list) throws ServiceException;

    /**
     * create eventBase info.
     * 
     * @param eventBase - eventBase POJO object.
     * @throws ServiceException
     */
    void createEventBase(final EventBasePojo eventBase) throws ServiceException;

    /**
     * get all eventBase info.
     * 
     * @return eventBase POJO object collection.
     * @throws ServiceException
     */
    List<EventBasePojo> getAllEventBase() throws ServiceException;

    /**
     * get eventBase by ID.
     * 
     * @param eventBaseID - eventBase ID.
     * @return eventBase POJO object or null.
     * @throws ServiceException
     */
    EventBasePojo getEventBaseByID(final String eventBaseID) throws ServiceException;

    /**
     * get all event base info by monitor model id.
     * 
     * @param modelID - monitor model id.
     * @return eventBaseinfo POJO object collection or null.
     * @throws ServiceException
     */
    List<EventBasePojo> getEventBaseByModel(String modelID) throws ServiceException;

    /**
     * get all event base information by monitor template id.
     * 
     * @param moniTempID - monitor template id.
     * @return eventBaseinfo POJO object collection or null.
     * @throws ServiceException
     */
    List<EventBasePojo> getEventBaseByMoniTemp(String moniTempID) throws ServiceException;

    /**
     * get eventBase info by query.
     * 
     * @param condition - query condition POJO object.
     * @return eventBase POJO object or null.
     * @throws ServiceException
     */
    EventBasePojo getEventBaseByQuery(final IQueryParam condition) throws ServiceException;

    /**
     * get eventBase by query for page.
     * 
     * @param condition - query condition POJO object.
     * @param pageIndex - page index, first page index is 1.
     * @param pageSize - page size, default page size is 10.
     * @return
     * @throws ServiceException
     */
    PageDataPojo<EventBasePojo> getEventBasePageByQuery(final IQueryParam condition) throws ServiceException;

    /**
     * get eventBase by query.
     * 
     * @param condition - query condition POJO object.
     * @return eventBase info POJO object collection or null.
     * @throws ServiceException.
     */
    List<EventBasePojo> getEventBasesByQuery(final IQueryParam condition) throws ServiceException;

    /**
     * modify eventBase info.
     * 
     * @param eventBase - eventBase POJO object.
     * @throws ServiceException
     */
    void modifyEventBase(final EventBasePojo eventBase) throws ServiceException;

    /**
     * remove all eventBase info.
     * 
     * @throws ServiceException
     */
    void removeAllEventBase() throws ServiceException;

    /**
     * remove eventBase info by condition.
     * 
     * @param condition - remove eventBase condition.
     * @throws ServiceException
     */
    void removeEventBase(final IQueryParam condition) throws ServiceException;

    /**
     * remove eventBase by eventBase ID.
     * 
     * @param String eventBaseID - eventBase ID.
     * @throws ServiceException
     */
    void removeEventBase(final String eventBaseID) throws ServiceException;

}