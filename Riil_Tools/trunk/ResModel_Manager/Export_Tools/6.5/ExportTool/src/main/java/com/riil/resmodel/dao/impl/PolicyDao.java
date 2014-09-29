package com.riil.resmodel.dao.impl;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.support.SqlSessionDaoSupport;

import com.riil.base.resmodel.pojo.policy.PolicyActionPojo;
import com.riil.base.resmodel.pojo.policy.PolicyEventPojo;
import com.riil.base.resmodel.pojo.policy.PolicyMetricPojo;
import com.riil.base.resmodel.pojo.policy.PolicyResPojo;
import com.riil.base.resmodel.pojo.policy.PolicyResRelPojo;
import com.riil.base.resmodel.pojo.policy.PolicyThresholdPojo;
import com.riil.base.resmodel.pojo.policy.ResAvailRuleGroup;

public class PolicyDao extends SqlSessionDaoSupport {
	
	public List<PolicyResPojo> doSelectAll() throws SQLException {
		List<PolicyResPojo> t_selectList = this.getSqlSession().selectList("com.riil.resmodel.dao.impl.PolicyDao.select_all");
		return t_selectList;
	}
	
	public Map<String,List<PolicyEventPojo>> doSelectEventAll() throws SQLException {
		Map<String,List<PolicyEventPojo>> t_result = new HashMap<String, List<PolicyEventPojo>>();
		List<PolicyEventPojo> t_list = this.getSqlSession().selectList("com.riil.resmodel.dao.impl.PolicyEventDao.select_by_all");
		for (PolicyEventPojo t_eventPojo : t_list) {
			String t_policyId = t_eventPojo.getPolicyId();
			if(t_result.containsKey(t_policyId)){
				t_result.get(t_policyId).add(t_eventPojo);
			}else{
				List<PolicyEventPojo> t_pojoList = new ArrayList<PolicyEventPojo>();
				t_pojoList.add(t_eventPojo);
				t_result.put(t_policyId, t_pojoList);
			}
		}
		return t_result;
	}
	
	
	public Map<String,List<PolicyMetricPojo>> doSelectMetricAll() throws SQLException {
		Map<String,List<PolicyMetricPojo>> t_result = new HashMap<String, List<PolicyMetricPojo>>();
		List<PolicyMetricPojo> t_list = this.getSqlSession().selectList("com.riil.resmodel.dao.impl.PolicyMetricDao.select_by_all");
		for (PolicyMetricPojo t_pojo : t_list) {
			String t_policyId = t_pojo.getPolicyId();
			if(t_result.containsKey(t_policyId)){
				t_result.get(t_policyId).add(t_pojo);
			}else{
				List<PolicyMetricPojo> t_pojoList = new ArrayList<PolicyMetricPojo>();
				t_pojoList.add(t_pojo);
				t_result.put(t_policyId, t_pojoList);
			}
		}
		return t_result;
	}
	
	public Map<String,List<PolicyThresholdPojo>> doSelectThresholdAll() throws SQLException {
		Map<String,List<PolicyThresholdPojo>> t_result = new HashMap<String, List<PolicyThresholdPojo>>();
		List<PolicyThresholdPojo> t_list = this.getSqlSession().selectList("com.riil.resmodel.dao.impl.PolicyThresholdDao.select_by_all");
		for (PolicyThresholdPojo t_pojo : t_list) {
			String t_id = t_pojo.getPolicyId()+"_"+t_pojo.getMetricId();
			if(t_result.containsKey(t_id)){
				t_result.get(t_id).add(t_pojo);
			}else{
				List<PolicyThresholdPojo> t_pojoList = new ArrayList<PolicyThresholdPojo>();
				t_pojoList.add(t_pojo);
				t_result.put(t_id, t_pojoList);
			}
		}
		return t_result;
	}
	
	public Map<String,ResAvailRuleGroup> doSelectAvailRuleGroupAll() throws SQLException {
		Map<String,ResAvailRuleGroup> t_result = new HashMap<String, ResAvailRuleGroup>();
		List<ResAvailRuleGroup> t_selectList = this.getSqlSession().selectList("com.riil.resmodel.dao.impl.AvailRuleGroupDao.select_by_all");
		for (ResAvailRuleGroup t_ruleGroup : t_selectList) {
			t_result.put(t_ruleGroup.getPolicyId(), t_ruleGroup);
		}
		return t_result;
	}
	
	public Map<String,List<PolicyResRelPojo>> doSelectResRelAll()throws SQLException {
		 Map<String,List<PolicyResRelPojo>> t_result = new HashMap<String, List<PolicyResRelPojo>>();
		 List<PolicyResRelPojo> t_list = this.getSqlSession().selectList("com.riil.resmodel.dao.impl.PolicyResRelDao.select_by_all");
		 for (PolicyResRelPojo t_pojo : t_list) {
				String t_id = t_pojo.getPolicyId();
				if(t_result.containsKey(t_id)){
					t_result.get(t_id).add(t_pojo);
				}else{
					List<PolicyResRelPojo> t_pojoList = new ArrayList<PolicyResRelPojo>();
					t_pojoList.add(t_pojo);
					t_result.put(t_id, t_pojoList);
				}
			}
		 return t_result;
	}
	public Map<String,List<PolicyActionPojo>> doSelectActionAll()throws SQLException {
		Map<String,List<PolicyActionPojo>> t_result = new HashMap<String, List<PolicyActionPojo>>();
		List<PolicyActionPojo> t_list = this.getSqlSession().selectList("com.riil.resmodel.dao.impl.PolicyActionDao.select_by_all");
		for (PolicyActionPojo t_pojo : t_list) {
			String t_id = t_pojo.getPolicyId();
			if(t_result.containsKey(t_id)){
				t_result.get(t_id).add(t_pojo);
			}else{
				List<PolicyActionPojo> t_pojoList = new ArrayList<PolicyActionPojo>();
				t_pojoList.add(t_pojo);
				t_result.put(t_id, t_pojoList);
			}
		}
		 return t_result;
	}
	
	public List<PolicyEventPojo> doSelectEventByID(String policyId) throws SQLException {
		List<PolicyEventPojo> t_result = this.getSqlSession().selectList("com.riil.resmodel.dao.impl.PolicyEventDao.select_by_policyId",policyId);
		return t_result;
	}
	
	
	public List<PolicyMetricPojo> doSelectMetricByID(String policyId) throws SQLException {
		List<PolicyMetricPojo> t_result = this.getSqlSession().selectList("com.riil.resmodel.dao.impl.PolicyMetricDao.select_by_policyId",policyId);
		return t_result;
	}
	
	public List<PolicyThresholdPojo> doSelectThresholdByID(String policyId,String metricId) throws SQLException {
		Map<String,String> t_params = new HashMap<String,String>();
		t_params.put("policyId", policyId);
		t_params.put("metricId", metricId);
		List<PolicyThresholdPojo> t_result = this.getSqlSession().selectList("com.riil.resmodel.dao.impl.PolicyThresholdDao.select_by_policyId_metricId",t_params);
		return t_result;
	}
	
	public ResAvailRuleGroup doSelectAvailRuleGroupByID(String policyId) throws SQLException {
		ResAvailRuleGroup t_result = this.getSqlSession().selectOne("com.riil.resmodel.dao.impl.AvailRuleGroupDao.select_by_policyId",policyId);
		return t_result;
	}
	
	public List<PolicyResRelPojo> doSelectResRelByID(String policyId)throws SQLException {
		 List<PolicyResRelPojo> t_result = this.getSqlSession().selectList("com.riil.resmodel.dao.impl.PolicyResRelDao.select_by_policyId",policyId);
		 return t_result;
	}
	public List<PolicyActionPojo> doSelectActionByID(String policyId)throws SQLException {
		List<PolicyActionPojo> t_result = this.getSqlSession().selectList("com.riil.resmodel.dao.impl.PolicyActionDao.select_by_policyId",policyId);
		 return t_result;
	}
	
}
