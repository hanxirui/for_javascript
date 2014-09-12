package com.riil.base.policy.impl.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.riil.base.resmodel.pojo.policy.ResAvailRuleGroup;
import com.riil.base.utils.IXMLSerializer;
import com.riil.base.utils.XStreamXMLSerializer;
import com.riil.core.dam.exception.DBException;
import com.riil.core.dao.BaseDAO;
import com.riil.core.dao.DAOException;

public class PolicyResAvailRuleGroupDAO extends BaseDAO<ResAvailRuleGroup>{
	
	private final static int S_XML_SIZE = 4000;
	
	@Override
	public ResAvailRuleGroup doInsertPojo(ResAvailRuleGroup availRuleGroup) throws DAOException {
		IXMLSerializer t_parser = new XStreamXMLSerializer();
		String t_xml = t_parser.marshal(availRuleGroup);
		
		splitXML(t_xml, availRuleGroup);
		
		return super.doInsertPojo(availRuleGroup);
	}
	
	public void splitXML(String t_xml, ResAvailRuleGroup availRuleGroup){
		byte[] t_xml1 = new byte[S_XML_SIZE];
		byte[] t_xml2 = new byte[S_XML_SIZE];
		byte[] t_xml3 = new byte[S_XML_SIZE];
		
		if(t_xml.length() > 3 * S_XML_SIZE){
//			t_xml = toZip(t_xml);
		}
		
		byte[] t_bytes = t_xml.getBytes();
		int i = t_bytes.length;
		if(i < S_XML_SIZE){
			System.arraycopy(t_bytes, 0, t_xml1, 0, i);
		}else if(i >= S_XML_SIZE && i < 2 * S_XML_SIZE){
			System.arraycopy(t_bytes, 0, t_xml1, 0, S_XML_SIZE);
			System.arraycopy(t_bytes, S_XML_SIZE, t_xml2, 0, i - S_XML_SIZE);
		}else if(i >= S_XML_SIZE && i < 3 * S_XML_SIZE){
			System.arraycopy(t_bytes, 0, t_xml1, 0, S_XML_SIZE);
			System.arraycopy(t_bytes, S_XML_SIZE, t_xml2, 0, S_XML_SIZE);
			System.arraycopy(t_bytes, 2*S_XML_SIZE, t_xml3, 0, i - 2*S_XML_SIZE);
		}
		
		
		String t_x1 = new String(t_xml1);
		String t_x2 = new String(t_xml2);
		String t_x3 = new String(t_xml3);
		if(!t_x1.equals("")){
			availRuleGroup.setXml(t_x1.trim());
		}
		if(!t_x2.equals("")){
			availRuleGroup.setXml2(t_x2.trim());
		}
		if(!t_x3.equals("")){
			availRuleGroup.setXml3(t_x3.trim());
		}
	}
	
	public String rebuildXML(ResAvailRuleGroup group){
		String t_xml = (group.getXml()==null ? "" : group.getXml()) 
				+ (group.getXml2()==null ? "" : group.getXml2()) 
				+ (group.getXml3()==null ? "" : group.getXml3());
		
		return t_xml;
	}
	
	public ResAvailRuleGroup doSelectByPolicyId(final String policyId) throws DAOException {
		try {
			ResAvailRuleGroup t_group = (ResAvailRuleGroup) getDam().selectOne("select_by_policyId", policyId);
			if(t_group==null) return null;
			
			String t_xml = rebuildXML(t_group);
			
			IXMLSerializer t_parser = new XStreamXMLSerializer();
			ResAvailRuleGroup t_group2 = (ResAvailRuleGroup) t_parser.unmarshal(t_xml);
			if(t_group2==null) return null;
			t_group2.setId(t_group.getId());
			t_group2.setFrequencyId(t_group.getFrequencyId());
			t_group2.setPolicyId(t_group.getPolicyId());
			t_group2.setFlapping(t_group.getFlapping());
			
			return t_group2;
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
		t_param.put("newPolicyId", newPolicyId);
		t_param.put("oriPolicyId", oriPolicyId);
		try {
			getDam().update("update_newPolicyId_by_oriPolicyId", t_param);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}

	public void doDeleteByPolicyIds(final List<String> policyIds) throws DAOException {
		try {
			getDam().delete("batch_delete_by_policy_ids", policyIds);
		} catch (DBException t_e) {
			throw new DAOException(t_e);
		}
	}
}
