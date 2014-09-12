package com.riil.base.binding.pojo;

import com.riil.core.pojo.AbsPojo;

public class CmdPropertie extends AbsPojo{
	/**
	 * <code>serialVersionUID</code> - {description}.
	 */
	private static final long serialVersionUID = -443053817662279279L;
	private String cmdId;
	private String name;
	private String value;
	public String getCmdId() {
		return cmdId;
	}
	public void setCmdId(String cmdId) {
		this.cmdId = cmdId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	@Override
	public String getUUIDKeyName() {
		// TODO Auto-generated method stub
		return null;
	}
	
}
