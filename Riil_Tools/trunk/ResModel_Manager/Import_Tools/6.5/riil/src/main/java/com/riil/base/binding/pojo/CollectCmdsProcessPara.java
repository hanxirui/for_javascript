package com.riil.base.binding.pojo;

import com.riil.core.pojo.AbsPojo;

public class CollectCmdsProcessPara extends AbsPojo{
	/**
	 * <code>serialVersionUID</code> - {description}.
	 */
	private static final long serialVersionUID = -8996111416301214118L;
	private String id;
	private String processorId;
	private String parameter;
	private String sortId;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getProcessorId() {
		return processorId;
	}
	public void setProcessorId(String processorId) {
		this.processorId = processorId;
	}
	public String getParameter() {
		return parameter;
	}
	public void setParameter(String parameter) {
		this.parameter = parameter;
	}
	public String getSortId() {
		return sortId;
	}
	public void setSortId(String sortId) {
		this.sortId = sortId;
	}
	@Override
	public String getUUIDKeyName() {
		// TODO Auto-generated method stub
		return null;
	}
	
}
