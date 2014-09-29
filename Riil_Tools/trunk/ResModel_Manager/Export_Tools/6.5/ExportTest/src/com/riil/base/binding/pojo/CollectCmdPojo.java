package com.riil.base.binding.pojo;


public class CollectCmdPojo {
	private String id;
	private String collectCmdsId;
	private String index;
	private String protocol;
	private String cmd;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getCollectCmdsId() {
		return collectCmdsId;
	}
	public void setCollectCmdsId(String collectCmdsId) {
		this.collectCmdsId = collectCmdsId;
	}
	public String getIndex() {
		return index;
	}
	public void setIndex(String index) {
		this.index = index;
	}
	public String getProtocol() {
		return protocol;
	}
	public void setProtocol(String protocol) {
		this.protocol = protocol;
	}
	public String getCmd() {
		return cmd;
	}
	public void setCmd(String cmd) {
		this.cmd = cmd;
	}
}
