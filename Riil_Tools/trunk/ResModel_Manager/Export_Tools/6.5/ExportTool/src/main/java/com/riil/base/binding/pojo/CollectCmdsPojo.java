package com.riil.base.binding.pojo;


public class CollectCmdsPojo {
	private String id;
	private String metricBindingId;
	private byte isDefault;
	private byte isDynamic;
	private String sortId;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getMetricBindingId() {
		return metricBindingId;
	}
	public void setMetricBindingId(String metricBindingId) {
		this.metricBindingId = metricBindingId;
	}
	public byte getIsDefault() {
		return isDefault;
	}
	public void setIsDefault(byte isDefault) {
		this.isDefault = isDefault;
	}
	public byte getIsDynamic() {
		return isDynamic;
	}
	public void setIsDynamic(byte isDynamic) {
		this.isDynamic = isDynamic;
	}
	public String getSortId() {
		return sortId;
	}
	public void setSortId(String sortId) {
		this.sortId = sortId;
	}
}
