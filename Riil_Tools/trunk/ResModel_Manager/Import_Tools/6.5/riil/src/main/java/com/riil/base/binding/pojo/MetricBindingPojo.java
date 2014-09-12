package com.riil.base.binding.pojo;

public class MetricBindingPojo extends com.riil.core.pojo.AbsPojo{
	/**
	 * <code>serialVersionUID</code> - {description}.
	 */
	private static final long serialVersionUID = -2584603093660090514L;
	
	private String id;
	private String metricId;
	private String modelId;
	private byte isDisplayName;
	private byte isInitValue;
	private byte isInstance;
	private String method;
	private String className;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getModelId() {
		return modelId;
	}
	public void setModelId(String modelId) {
		this.modelId = modelId;
	}
	public String getMetricId() {
		return metricId;
	}
	public void setMetricId(String metricId) {
		this.metricId = metricId;
	}
	public byte getIsDisplayName() {
		return isDisplayName;
	}
	public void setIsDisplayName(byte isDisplayName) {
		this.isDisplayName = isDisplayName;
	}
	public byte getIsInitValue() {
		return isInitValue;
	}
	public void setIsInitValue(byte isInitValue) {
		this.isInitValue = isInitValue;
	}
	public byte getIsInstance() {
		return isInstance;
	}
	public void setIsInstance(byte isInstance) {
		this.isInstance = isInstance;
	}
	public String getMethod() {
		return method;
	}
	public void setMethod(String method) {
		this.method = method;
	}
	public String getClassName() {
		return className;
	}
	public void setClassName(String className) {
		this.className = className;
	}
	@Override
	public String getUUIDKeyName() {
		return "MetricBindingPojo";
	}
	
	
}
