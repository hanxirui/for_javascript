package com.riil.base.policy.impl.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;

import com.riil.base.resmodel.pojo.policy.PolicyEventPojo;
import com.riil.base.resmodel.pojo.policy.PolicyEventQueryParam;
import com.riil.base.resmodel.pojo.policy.PolicyEventRulePojo;
import com.riil.core.dam.IDam;
import com.riil.core.dam.exception.DBException;
import com.riil.core.dao.BaseDAO;
import com.riil.core.dao.DAOException;
import com.riil.core.dao.PageDataPojo;

/**
 * 策略事件DAO <br>
 * <p>
 * Create on : 2011-9-7<br>
 * <p>
 * </p>
 * <br>
 * 
 * @author liqiang@ruijie.com.cn<br>
 * @version riil_admin_impl v1.0
 *          <p>
 *          <br>
 *          <strong>Modify History:</strong><br>
 *          user modify_date modify_content<br>
 *          -------------------------------------------<br>
 *          <br>
 */
public class PolicyEventDAO extends BaseDAO<PolicyEventPojo> {

	/**
	 * <code>S_POLICYID</code> - 参数名称——策略ID.
	 */
	private static final String S_POLICYID = "policyId";

	/**
	 * <code>S_EVENTID</code> - 参数名称——事件ID.
	 */
	private static final String S_EVENTID = "eventId";

	/**
	 * <code>S_EVENTID</code> - 参数名称——事件ID.
	 */
	private static final String S_EVENTIDS = "eventIds";

	/**
	 * <code>S_EVENTID</code> - 参数名称——事件规则.
	 */
//	private static final String S_EVENTRULES = "eventrules";

	/**
	 * <code>S_ORIPOLICYID</code> - 参数名称——原始策略ID.
	 */
	private static final String S_ORIPOLICYID = "oriPolicyId";

	/**
	 * <code>S_NEWPOLICYID</code> - 参数名称——新策略ID.
	 */
	private static final String S_NEWPOLICYID = "newPolicyId";

	/**
	 * 单独插入一条事件.
	 * 
	 * @param policyEventPojo
	 *            策略事件
	 * @throws DAOException
	 *             DAO层异常
	 */
	public void doInsertEvent(final PolicyEventPojo policyEventPojo) throws DAOException {
		if (StringUtils.isBlank(policyEventPojo.getEventId())) {
			policyEventPojo.setEventId(policyEventPojo.getId());
		}
		doInsertPojo(policyEventPojo);
		try {
			if (policyEventPojo.getListPolicyEventRulePojo() != null && !policyEventPojo.getListPolicyEventRulePojo().isEmpty()) {
//				Map<String, Object> t_param = new HashMap<String, Object>();
//				t_param.put(S_POLICYID, policyEventPojo.getPolicyId());
//				t_param.put(S_EVENTRULES, policyEventPojo.getListPolicyEventRulePojo());
//				t_param.put(S_EVENTID, policyEventPojo.getEventId());
//				getDam().insert("batchInsertEventRule", t_param);
				for(PolicyEventRulePojo t_rule : policyEventPojo.getListPolicyEventRulePojo()){
					t_rule.setPolicyId(policyEventPojo.getPolicyId());
					t_rule.setEventId(policyEventPojo.getEventId());
					getDam().insert("insertEventRule", t_rule);
				}
			}
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 批量添加事件.
	 * 
	 * @param policyId
	 *            策略ID
	 * @param policyEventPojos
	 *            策略事件
	 * @throws DAOException
	 *             DAO层异常
	 */
	public void doBatchInsertEvent(final String policyId, final List<PolicyEventPojo> policyEventPojos) throws DAOException {
		if (policyEventPojos == null || policyEventPojos.isEmpty()) {
			return;
		}
		List<PolicyEventRulePojo> t_rules = new ArrayList<PolicyEventRulePojo>();

		for (PolicyEventPojo t_event : policyEventPojos) {
			t_event.setPolicyId(policyId);
			List<PolicyEventRulePojo> t_tempList = t_event.getListPolicyEventRulePojo();
			if (null == t_tempList || t_tempList.isEmpty()) {
				continue;
			}
			for (PolicyEventRulePojo t_ru : t_tempList) {
				t_ru.setPolicyId(policyId);
				t_ru.setEventId(t_event.getEventId());
			}
			t_rules.addAll(t_tempList);
		}

		try {
//			getDam().insert("batchInsertEvents", policyEventPojos);
			for(PolicyEventPojo t_event : policyEventPojos){
				getDam().insert("insert", t_event);
			}
			if (null != t_rules && !t_rules.isEmpty()) {
//				getDam().insert("batchInsertEventRules", t_rules);
				for(PolicyEventRulePojo t_rule : t_rules){
					getDam().insert("insertEventRule", t_rule);
				}
			}
		} catch (DBException e) {
			throw new DAOException(e);
		}
	}
	
	public void insert(final String policyId, final List<PolicyEventPojo> policyEventPojos)  throws DAOException {
		if (policyEventPojos == null || policyEventPojos.isEmpty()) {
			return;
		}
		List<PolicyEventRulePojo> t_rules = new ArrayList<PolicyEventRulePojo>();

		for (PolicyEventPojo t_event : policyEventPojos) {
			t_event.setPolicyId(policyId);
			List<PolicyEventRulePojo> t_tempList = t_event.getListPolicyEventRulePojo();
			if (null == t_tempList || t_tempList.isEmpty()) {
				continue;
			}
			for (PolicyEventRulePojo t_ru : t_tempList) {
				t_ru.setPolicyId(policyId);
				t_ru.setEventId(t_event.getEventId());
			}
			t_rules.addAll(t_tempList);
		}

		try {
			getDam().insert("batchInsertEvents", policyEventPojos);
			if (null != t_rules && !t_rules.isEmpty()) {
				getDam().insert("batchInsertEventRules", t_rules);
			}
		} catch (DBException e) {
			throw new DAOException(e);
		}
	}

	public void doBatchInsertEvent_del(final String policyId, final List<PolicyEventPojo> policyEventPojos) throws DAOException {
		if (policyEventPojos == null || policyEventPojos.isEmpty()) {
			return;
		}

		for (PolicyEventPojo t_policyEventPojo : policyEventPojos) {
			t_policyEventPojo.setPolicyId(policyId);
			doInsertEvent(t_policyEventPojo);
		}
	}

	/**
	 * 根据策略ID和事件ID列表批量删除事件.
	 * 
	 * @param policyId
	 *            策略ID
	 * @param eventIds
	 *            事件ID列表
	 * @throws DAOException
	 *             DAO层异常
	 */
	public void doDeleteEventByPolicyIdAndEventIds(final String policyId, final List<String> eventIds) throws DAOException {
		Map<String, Object> t_param = new HashMap<String, Object>();
		t_param.put(S_POLICYID, policyId);
		t_param.put(S_EVENTIDS, eventIds);
		try {
			getDam().delete("delete_by_policyIdAndEventId_batch", t_param);
			getDam().delete("deleteEventRule_by_policyIdAndEventId_batch", t_param);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 根据策略ID批量删除事件.
	 * 
	 * @param policyId
	 *            策略ID
	 * @throws DAOException
	 *             DAO层异常
	 */
	public void doDeleteEventByPolicyId(final String policyId) throws DAOException {
		try {
			getDam().delete("delete_by_policyId", policyId);
			getDam().delete("deleteEventRule_by_policyId", policyId);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 根据策略ID批量删除事件.
	 * 
	 * @param policyIds
	 *            策略ID
	 * @throws DAOException
	 *             DAO层异常
	 */
	public void doBatchDeleteEventByPolicyIds(final List<String> policyIds) throws DAOException {
		try {
			getDam().delete("delete_by_policyIds_batch", policyIds);
			getDam().delete("deleteEventRule_by_policyId_batch", policyIds);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 单独更新一条事件.
	 * 
	 * @param policyEventPojo
	 *            事件对象
	 * @throws DAOException
	 *             DAO层异常
	 */
	public void doUpdateEvent(final PolicyEventPojo policyEventPojo) throws DAOException {
		try {
			IDam t_dam = getDam();
			t_dam.update("update_by_eventIdAndpolicyId", policyEventPojo);

			Map<String, Object> t_param = new HashMap<String, Object>();
			t_param.put(S_POLICYID, policyEventPojo.getPolicyId());
			t_param.put(S_EVENTID, policyEventPojo.getEventId());
			t_dam.delete("deleteEventRule_by_policyIdAndEventId", t_param);
			if (policyEventPojo.getListPolicyEventRulePojo() != null && !policyEventPojo.getListPolicyEventRulePojo().isEmpty()) {
//				t_param.put("eventrules", policyEventPojo.getListPolicyEventRulePojo());
//				t_dam.insert("batchInsertEventRule", t_param);
				for(PolicyEventRulePojo t_rule : policyEventPojo.getListPolicyEventRulePojo()){
					t_rule.setPolicyId(policyEventPojo.getPolicyId());
					t_rule.setEventId(policyEventPojo.getEventId());
					getDam().insert("insertEventRule", t_rule);
				}
			}
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 批量更新事件，但不更新事件规则.
	 * 
	 * @param policyId
	 *            策略ID
	 * @param policyEventPojos
	 *            事件列表
	 * @throws DAOException
	 *             DAO层异常
	 */
	public void doUpdateEventWithOutRule(final String policyId, final List<PolicyEventPojo> policyEventPojos) throws DAOException {
		try {
			if (policyEventPojos != null && !policyEventPojos.isEmpty()) {
				for (PolicyEventPojo t_policyEventPojo : policyEventPojos) {
					t_policyEventPojo.setPolicyId(policyId);
					getDam().update("update_by_eventIdAndpolicyId", t_policyEventPojo);
				}
			}
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 批量更新事件，并且更新事件规则.
	 * 
	 * @param policyId
	 *            策略ID
	 * @param policyEventPojos
	 *            事件列表
	 * @throws DAOException
	 *             DAO层异常
	 */
	public void doUpdateEventWithRule(final String policyId, final List<PolicyEventPojo> policyEventPojos) throws DAOException {
		if (policyEventPojos != null && !policyEventPojos.isEmpty()) {
			for (PolicyEventPojo t_policyEventPojo : policyEventPojos) {
				t_policyEventPojo.setPolicyId(policyId);
				doUpdateEvent(t_policyEventPojo);
			}
		}
	}

	/**
	 * 根据策略ID获取事件，包括事件规则.
	 * 
	 * @param policyId
	 *            策略ID
	 * @return 事件列表
	 * @throws DAOException
	 *             DAO层异常
	 */
	@SuppressWarnings("unchecked")
	public List<PolicyEventPojo> doSelectEventWithRuleByPolicyId(final String policyId) throws DAOException {
		try {
			List<PolicyEventPojo> t_policyEventPojos = getDam().selectList("select_by_policyId", policyId);
			if (null == t_policyEventPojos || t_policyEventPojos.isEmpty()) {
				return t_policyEventPojos;
			}

			List<PolicyEventRulePojo> t_list = getDam().selectList("selectEventRule_by_policyId", policyId);
			if (null == t_list || t_list.isEmpty()) {
				return t_policyEventPojos;
			}
			Map<String, PolicyEventPojo> t_ruleMap = new HashMap<String, PolicyEventPojo>();
			for (PolicyEventPojo t_event : t_policyEventPojos) {
				t_ruleMap.put(t_event.getEventId(), t_event);
			}
			for (PolicyEventRulePojo t_rule : t_list) {
				PolicyEventPojo t_event = t_ruleMap.get(t_rule.getEventId());
				if (null != t_event) {
					t_event.addPolicyEventRulePojo(t_rule);
				}
			}
			return t_policyEventPojos;
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	@SuppressWarnings("unchecked")
	public List<PolicyEventPojo> doSelectEventWithRuleByPolicyId_del(final String policyId) throws DAOException {
		try {
			List<PolicyEventPojo> t_policyEventPojos = getDam().selectList("select_by_policyId", policyId);
			Map<String, String> t_param = null;
			for (PolicyEventPojo t_policyEventPojo : t_policyEventPojos) {
				if (t_param == null) {
					t_param = new HashMap<String, String>();
					t_param.put(S_POLICYID, t_policyEventPojo.getPolicyId());
				}
				t_param.put(S_EVENTID, t_policyEventPojo.getEventId());
				t_policyEventPojo.setListPolicyEventRulePojo(getDam().selectList("selectEventRule_by_policyIdAndEventId", t_param));
			}
			return t_policyEventPojos;
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 根据查询参数获得事件，包括事件规则.
	 * 
	 * @param PolicyEventPojo
	 *            策略事件
	 * @return 事件列表
	 * @throws DAOException
	 *             DAO层异常
	 */
	@SuppressWarnings("unchecked")
	public PageDataPojo<PolicyEventPojo> doSelectEventWithRuleByPolicyEvent(final PolicyEventQueryParam policyEventPojo)
			throws DAOException {
		try {
			policyEventPojo.setPageSqlId("select_by_policyEvent");
			policyEventPojo.setPageCountSqlId("select_by_policyEvent_count");
			PageDataPojo<PolicyEventPojo> pageDataPojo = this.doPageSelect(policyEventPojo);
			Map<String, String> t_param = null;
			if (pageDataPojo.getPageData() != null && !pageDataPojo.getPageData().isEmpty()) {
				for (PolicyEventPojo t_policyEventPojo : pageDataPojo.getPageData()) {
					if (t_param == null) {
						t_param = new HashMap<String, String>();
						t_param.put("policyId", t_policyEventPojo.getPolicyId());
					}
					t_param.put("eventId", t_policyEventPojo.getEventId());
					t_policyEventPojo.setListPolicyEventRulePojo(getDam().selectList("selectEventRule_by_policyIdAndEventId", t_param));
				}
			}
			return pageDataPojo;
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 根据策略ID获取事件，不包括事件规则.
	 * 
	 * @param policyId
	 *            策略ID
	 * @return 事件列表
	 * @throws DAOException
	 *             DAO层异常
	 */
	@SuppressWarnings("unchecked")
	public List<PolicyEventPojo> doSelectEventWithOutRuleByPolicyId(final String policyId) throws DAOException {
		try {
			return getDam().selectList("select_by_policyId", policyId);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 根据策略ID和事件ID获取一条事件.
	 * 
	 * @param policyId
	 *            策略ID
	 * @param eventId
	 *            事件列表
	 * @return 事件列表
	 * @throws DAOException
	 *             DAO层异常
	 */
	@SuppressWarnings("unchecked")
	public PolicyEventPojo doSelectEventByPolicyIdAndEventId(final String policyId, final String eventId) throws DAOException {
		Map<String, String> t_param = new HashMap<String, String>();
		t_param.put(S_POLICYID, policyId);
		t_param.put(S_EVENTID, eventId);
		try {
			PolicyEventPojo t_policyEventPojo = (PolicyEventPojo) getDam().selectOne("select_by_policyIdAndEventId", t_param);
			t_policyEventPojo.setListPolicyEventRulePojo(getDam().selectList("selectEventRule_by_policyIdAndEventId", t_param));
			return t_policyEventPojo;
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 用原始版策略ID替换新版本策略ID.
	 * 
	 * @param newPolicyId
	 *            新版本策略ID
	 * @param oriPolicyId
	 *            原始版本策略ID
	 * @throws DAOException
	 *             DAO层异常
	 */
	public void doUpdatePolicyIdByOriPolicyId(final String newPolicyId, final String oriPolicyId) throws DAOException {
		Map<String, String> t_param = new HashMap<String, String>();
		t_param.put(S_NEWPOLICYID, newPolicyId);
		t_param.put(S_ORIPOLICYID, oriPolicyId);
		try {
			getDam().update("updateEvent_newPolicyId_by_oriPolicyId", t_param);
			getDam().update("updateEventRule_newPolicyId_by_oriPolicyId", t_param);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	/**
	 * 根据名称查询，是否存在重名
	 */
	private static final String S_SELECT_BY_NAME = "select_by_name";

	public int doSelectByName(PolicyEventPojo param) throws DAOException {
		try {
			return (Integer) getDam().selectOne(S_SELECT_BY_NAME, param);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

}
