package com.riil.base.resmodel.impl.param;

import java.util.List;

import com.riil.base.resmodel.param.ResTreeParam;
import com.riil.base.resource.param.DomainParam;
import com.riil.base.resource.param.DomainResParam;

public class DomainResTreeParam extends DomainResParam{

	private List<String> m_resCatalogs;
	
	private List<String> m_policyTypes;
	
	private int m_treeLevel = 0;
	
	public DomainResTreeParam(){
		
	}
	
	public DomainResTreeParam(DomainParam domainParam, ResTreeParam resTreeParam){
		super(domainParam, resTreeParam);
		
		m_resCatalogs = resTreeParam.getResCatalogs();
		m_policyTypes = resTreeParam.getPolicyTypes();
		
		m_treeLevel = resTreeParam.getTreeLevel();
	}

	public List<String> getResCatalogs() {
		return m_resCatalogs;
	}

	public void setResCatalogs(List<String> resCatalogs) {
		m_resCatalogs = resCatalogs;
	}

	public List<String> getPolicyTypes() {
		return m_policyTypes;
	}

	public void setPolicyTypes(List<String> policyTypes) {
		m_policyTypes = policyTypes;
	}

	public int getTreeLevel() {
		return m_treeLevel;
	}

	public void setTreeLevel(int treeLevel) {
		m_treeLevel = treeLevel;
	}
}
