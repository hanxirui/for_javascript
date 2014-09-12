package com.riil.base.resmodel.param;

import java.util.List;

import com.riil.base.resource.param.ResBaseParam;

public class ResTreeParam extends ResBaseParam{
	
	private List<String> m_resCatalogs;
	
	private List<String> m_policyTypes;
	
	private int m_treeLevel = 0;

	public int getTreeLevel() {
		return m_treeLevel;
	}

	public void setTreeLevel(int treeLevel) {
		m_treeLevel = treeLevel;
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
	
}
