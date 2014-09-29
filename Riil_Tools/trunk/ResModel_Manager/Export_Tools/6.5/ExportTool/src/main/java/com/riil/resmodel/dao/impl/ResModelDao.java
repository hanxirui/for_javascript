package com.riil.resmodel.dao.impl;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.support.SqlSessionDaoSupport;

import com.riil.base.binding.pojo.CmdFilter;
import com.riil.base.binding.pojo.CmdPropertie;
import com.riil.base.binding.pojo.CmdSupportPojo;
import com.riil.base.binding.pojo.CollectCmdPojo;
import com.riil.base.binding.pojo.CollectCmdsConnProtocol;
import com.riil.base.binding.pojo.CollectCmdsPojo;
import com.riil.base.binding.pojo.CollectCmdsProcessPara;
import com.riil.base.binding.pojo.CollectCmdsProcessor;
import com.riil.base.binding.pojo.MetricBindingPojo;
import com.riil.base.binding.pojo.MetricProcessPara;
import com.riil.base.resmodel.pojo.base.ModelBasePojo;
import com.riil.base.resmodel.pojo.base.ModelMetricRelPojo;

public class ResModelDao extends SqlSessionDaoSupport {
	
	public List<ModelBasePojo> doModelBaseSelectAll() throws SQLException {
		List<ModelBasePojo> t_selectList = this.getSqlSession().selectList("com.riil.resmodel.dao.impl.ResModelDao.select_all");
		return t_selectList;
	}
	public Map<String,List<ModelMetricRelPojo>> doSelectMetricRelAll() throws SQLException {
		Map<String,List<ModelMetricRelPojo>> t_result = new HashMap<String, List<ModelMetricRelPojo>>();
		List<ModelMetricRelPojo> t_selectList = this.getSqlSession().selectList("com.riil.resmodel.dao.impl.MetridRelDao.select_by_all");
		for (ModelMetricRelPojo t : t_selectList) {
			String t_modelId = t.getModelId();
			if(t_result.containsKey(t_modelId)){
				t_result.get(t_modelId).add(t);
			}else{
				List<ModelMetricRelPojo> t_pojo = new ArrayList<ModelMetricRelPojo>();
				t_pojo.add(t);
				t_result.put(t_modelId, t_pojo);
			}
		}
		return t_result;
	}
	public Map<String,List<MetricBindingPojo>> doSelectMetricBindingAll() throws SQLException {
		Map<String,List<MetricBindingPojo>> t_result = new HashMap<String, List<MetricBindingPojo>>();
		List<MetricBindingPojo> t_selectList = this.getSqlSession().selectList("com.riil.resmodel.dao.impl.MetridBindingDao.select_by_all");
		for (MetricBindingPojo t : t_selectList) {
			String t_id = t.getModelId()+"_"+t.getMetricId();
			if(t_result.containsKey(t_id)){
				t_result.get(t_id).add(t);
			}else{
				List<MetricBindingPojo> t_pojo = new ArrayList<MetricBindingPojo>();
				t_pojo.add(t);
				t_result.put(t_id, t_pojo);
			}
		}
		return t_result;
	}
	public Map<String,List<MetricProcessPara>> doSelectMetricProcessParaAll() throws SQLException {
		Map<String,List<MetricProcessPara>> t_result = new HashMap<String, List<MetricProcessPara>>();
		List<MetricProcessPara> t_selectList = this.getSqlSession().selectList("com.riil.resmodel.dao.impl.MetricProcessParaDao.select_by_all");
		for (MetricProcessPara t : t_selectList) {
			String t_id=t.getMetricBindingId();
			if(t_result.containsKey(t_id)){
				t_result.get(t_id).add(t);
			}else{
				List<MetricProcessPara> t_pojo = new ArrayList<MetricProcessPara>();
				t_pojo.add(t);
				t_result.put(t_id, t_pojo);
			}
		}
		return t_result;
	}
	public Map<String,List<CollectCmdsPojo>> doSelectCollectCmdsAll() throws SQLException {
		Map<String,List<CollectCmdsPojo>> t_result = new HashMap<String, List<CollectCmdsPojo>>();
		List<CollectCmdsPojo> t_selectList = this.getSqlSession().selectList("com.riil.resmodel.dao.impl.CollectCmdsDao.select_by_all");
		for (CollectCmdsPojo t : t_selectList) {
			String t_id=t.getMetricBindingId();
			if(t_result.containsKey(t_id)){
				t_result.get(t_id).add(t);
			}else{
				List<CollectCmdsPojo> t_pojo = new ArrayList<CollectCmdsPojo>();
				t_pojo.add(t);
				t_result.put(t_id, t_pojo);
			}
		}
		return t_result;
	}
	public Map<String,List<CollectCmdPojo>> doSelectCollectCmdAll() throws SQLException {
		Map<String,List<CollectCmdPojo>> t_result = new HashMap<String, List<CollectCmdPojo>>();
		List<CollectCmdPojo> t_selectList = this.getSqlSession().selectList("com.riil.resmodel.dao.impl.CollectCmdDao.select_by_all");
		for (CollectCmdPojo t : t_selectList) {
			String t_id = t.getCollectCmdsId();
			if(t_result.containsKey(t_id)){
				t_result.get(t_id).add(t);
			}else{
				List<CollectCmdPojo> t_pojo = new ArrayList<CollectCmdPojo>();
				t_pojo.add(t);
				t_result.put(t_id, t_pojo);
			}
		}
		return t_result;
	}
	
	public Map<String,List<CmdFilter>> doSelectCmdFilterAll() throws SQLException {
		Map<String,List<CmdFilter>> t_result = new HashMap<String, List<CmdFilter>>();
		List<CmdFilter> t_selectList = this.getSqlSession().selectList("com.riil.resmodel.dao.impl.CmdFilterDao.select_by_all");
		for (CmdFilter t : t_selectList) {
			String t_id = t.getCmdId();
			if(t_result.containsKey(t_id)){
				t_result.get(t_id).add(t);
			}else{
				List<CmdFilter> t_pojo = new ArrayList<CmdFilter>();
				t_pojo.add(t);
				t_result.put(t_id, t_pojo);
			}
		}
		return t_result;
	}
	
	
	public Map<String,List<CmdPropertie>> doSelectCmdPropertieAll() throws SQLException{
		Map<String,List<CmdPropertie>> t_result = new HashMap<String, List<CmdPropertie>>();
		List<CmdPropertie> t_selectList = this.getSqlSession().selectList("com.riil.resmodel.dao.impl.CmdPropertieDao.select_by_all");
		for (CmdPropertie t : t_selectList) {
			String t_id = t.getCmdId();
			if(t_result.containsKey(t_id)){
				t_result.get(t_id).add(t);
			}else{
				List<CmdPropertie> t_pojo = new ArrayList<CmdPropertie>();
				t_pojo.add(t);
				t_result.put(t_id, t_pojo);
			}
		}
		return t_result;
	}
	
	public Map<String,List<CollectCmdsConnProtocol>> doSelectConnProtocolAll() throws SQLException{
		Map<String,List<CollectCmdsConnProtocol>> t_result = new HashMap<String, List<CollectCmdsConnProtocol>>();
		List<CollectCmdsConnProtocol> t_selectList = this.getSqlSession().selectList("com.riil.resmodel.dao.impl.ConnProtocolDao.select_by_all");
		for (CollectCmdsConnProtocol t : t_selectList) {
			String t_id = t.getCmdsGroupId();
			if(t_result.containsKey(t_id)){
				t_result.get(t_id).add(t);
			}else{
				List<CollectCmdsConnProtocol> t_pojo = new ArrayList<CollectCmdsConnProtocol>();
				t_pojo.add(t);
				t_result.put(t_id, t_pojo);
			}
		}
		return t_result;
	}
	
	public Map<String,CollectCmdsProcessor> doSelectCmdsProcessorAll() throws SQLException{
		Map<String,CollectCmdsProcessor> t_result = new HashMap<String, CollectCmdsProcessor>();
		List<CollectCmdsProcessor> t_selectList = this.getSqlSession().selectList("com.riil.resmodel.dao.impl.CmdsProcessorDao.select_by_all");
		for (CollectCmdsProcessor t : t_selectList) {
			String t_id = t.getCmdsGroupId();
			t_result.put(t_id, t);
		}
		return t_result;
	}
	
	public Map<String,List<CollectCmdsProcessPara>> doSelectProcessorParaAll() throws SQLException{
		Map<String,List<CollectCmdsProcessPara>> t_result = new HashMap<String, List<CollectCmdsProcessPara>>();
		List<CollectCmdsProcessPara> t_selectList = this.getSqlSession().selectList("com.riil.resmodel.dao.impl.ProcessorParaDao.select_by_all");
		for (CollectCmdsProcessPara t : t_selectList) {
			String t_id = t.getProcessorId();
			if(t_result.containsKey(t_id)){
				t_result.get(t_id).add(t);
			}else{
				List<CollectCmdsProcessPara> t_pojo = new ArrayList<CollectCmdsProcessPara>();
				t_pojo.add(t);
				t_result.put(t_id, t_pojo);
			}
		}
		 return t_result;
	}
	
	public Map<String,List<CmdSupportPojo>>  doSelectSupportAll() throws SQLException{
		Map<String,List<CmdSupportPojo>> t_result = new HashMap<String, List<CmdSupportPojo>>();
		List<CmdSupportPojo> t_selectList = this.getSqlSession().selectList("com.riil.resmodel.dao.impl.supportDao.select_by_all");
		for (CmdSupportPojo t : t_selectList) {
			String t_id = t.getCmdsGroupId();
			if(t_result.containsKey(t_id)){
				t_result.get(t_id).add(t);
			}else{
				List<CmdSupportPojo> t_pojo = new ArrayList<CmdSupportPojo>();
				t_pojo.add(t);
				t_result.put(t_id, t_pojo);
			}
		}
		return t_result;
	}
	
	public List<ModelMetricRelPojo> doSelectMetricRelByID(String modelId) throws SQLException {
		List<ModelMetricRelPojo> t_selectList = this.getSqlSession().selectList("com.riil.resmodel.dao.impl.MetridRelDao.select_by_modelId",modelId);
		return t_selectList;
	}
	
	public List<MetricBindingPojo> doSelectMetricBindingByID(String modelId,String metricId) throws SQLException {
		Map<String,String> t_params = new HashMap<String,String>();
		t_params.put("modelId", modelId);
		t_params.put("metricId", metricId);
		List<MetricBindingPojo> t_selectList = this.getSqlSession().selectList("com.riil.resmodel.dao.impl.MetridBindingDao.select_by_modelId_metricId",t_params);
		return t_selectList;
	}
	public List<String> doSelectMetricProcessParaByBingId(String bingId) throws SQLException {
		List<String> t_result = new ArrayList<String>();
		List<MetricProcessPara> t_selectList = this.getSqlSession().selectList("com.riil.resmodel.dao.impl.MetricProcessParaDao.select_by_bingId",bingId);
		if(null != t_selectList){
			for (MetricProcessPara t_para : t_selectList) {
				t_result.add(t_para.getParameter());
			}
		}
		return t_result;
	}
	
	public List<CollectCmdsPojo> doSelectCollectCmdsByBingId(String bingId) throws SQLException {
		List<CollectCmdsPojo> t_selectList = this.getSqlSession().selectList("com.riil.resmodel.dao.impl.CollectCmdsDao.select_by_bingId",bingId);
		return t_selectList;
	}
	
	public List<CollectCmdPojo> doSelectCollectCmdBycmdsId(String cmdsId) throws SQLException {
		List<CollectCmdPojo> t_selectList = this.getSqlSession().selectList("com.riil.resmodel.dao.impl.CollectCmdDao.select_by_collectCmdsId",cmdsId);
		return t_selectList;
	}
	
	public List<CmdFilter> doSelectCmdFilterBycmdId(String cmdId) throws SQLException {
		List<CmdFilter> t_selectList = this.getSqlSession().selectList("com.riil.resmodel.dao.impl.CmdFilterDao.select_by_collectCmdId",cmdId);
		return t_selectList;
	}
	
	
	public List<CmdPropertie> doSelectCmdPropertieBycmdId(String cmdId) throws SQLException{
		List<CmdPropertie> t_selectList = this.getSqlSession().selectList("com.riil.resmodel.dao.impl.CmdPropertieDao.select_by_collectCmdId",cmdId);
		return t_selectList;
	}
	
	public List<String> doSelectConnProtocol(String cmdsId) throws SQLException{
		List<String> t_result = new ArrayList<String>();
		List<CollectCmdsConnProtocol> t_selectList = this.getSqlSession().selectList("com.riil.resmodel.dao.impl.ConnProtocolDao.select_by_collectCmdsId",cmdsId);
		for (CollectCmdsConnProtocol t_connProtocol : t_selectList) {
			String t_protocol = t_connProtocol.getProtocol();
			t_result.add(t_protocol);
		}
		return t_result;
	}
	
	public CollectCmdsProcessor doSelectCmdsProcessorBycmdsId(String cmdsId) throws SQLException{
		CollectCmdsProcessor t_result = this.getSqlSession().selectOne("com.riil.resmodel.dao.impl.CmdsProcessorDao.select_by_cmdsId",cmdsId);
		return t_result;
	}
	
	public List<String> doSelectProcessorParaByProcessorId(String processorId) throws SQLException{
		List<String> t_result = new ArrayList<String>(); 
		List<CollectCmdsProcessPara> t_selectList = this.getSqlSession().selectList("com.riil.resmodel.dao.impl.ProcessorParaDao.select_by_processorId",processorId);
		 for (CollectCmdsProcessPara t_processPara : t_selectList) {
			 t_result.add(t_processPara.getParameter());
		}
		 return t_result;
	}
	
	public List<CmdSupportPojo> doSelectSupportByCmdsId(String cmdsId) throws SQLException{
		List<CmdSupportPojo> t_selectList = this.getSqlSession().selectList("com.riil.resmodel.dao.impl.supportDao.select_by_cmdsId",cmdsId);
		return t_selectList;
	}
}
