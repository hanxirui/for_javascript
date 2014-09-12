package com.riil.base.binding.pojo;

import com.riil.core.pojo.AbsPojo;

public class CmdFilter extends AbsPojo{
	/**
	 * <code>serialVersionUID</code> - {description}.
	 */
	private static final long serialVersionUID = -351333640797825306L;
	private String id;
	private String cmdId;
	private String dependecy;
	private String row;
	private String column;
	private String cmdParameterName;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getCmdId() {
		return cmdId;
	}
	public void setCmdId(String cmdId) {
		this.cmdId = cmdId;
	}
	public String getDependecy() {
		return dependecy;
	}
	public void setDependecy(String dependecy) {
		this.dependecy = dependecy;
	}
	public String getRow() {
		return row;
	}
	public void setRow(String row) {
		this.row = row;
	}
	public String getColumn() {
		return column;
	}
	public void setColumn(String column) {
		this.column = column;
	}
	public String getCmdParameterName() {
		return cmdParameterName;
	}
	public void setCmdParameterName(String cmdParameterName) {
		this.cmdParameterName = cmdParameterName;
	}
	@Override
	public String getUUIDKeyName() {
		// TODO Auto-generated method stub
		return null;
	}
}
