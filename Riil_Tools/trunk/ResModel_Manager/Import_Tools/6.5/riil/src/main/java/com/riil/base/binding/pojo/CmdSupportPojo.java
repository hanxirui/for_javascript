package com.riil.base.binding.pojo;

import com.riil.core.pojo.AbsPojo;

public class CmdSupportPojo extends AbsPojo{
	/**
	 * <code>serialVersionUID</code> - {description}.
	 */
	private static final long serialVersionUID = -4791499844914533472L;
	private String id;
	private String cmdsGroupId;
	private String version;
	private String rel;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getCmdsGroupId() {
		return cmdsGroupId;
	}
	public void setCmdsGroupId(String cmdsGroupId) {
		this.cmdsGroupId = cmdsGroupId;
	}
	public String getVersion() {
		return version;
	}
	public void setVersion(String version) {
		this.version = version;
	}
	public String getRel() {
		return rel;
	}
	public void setRel(String rel) {
		this.rel = rel;
	}
	@Override
	public String getUUIDKeyName() {
		// TODO Auto-generated method stub
		return null;
	}
	
}
