package com.riil.base.tools;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import com.riil.base.pojo.enums.EnumRoot;
import com.riil.base.resmodel.pojo.policy.PolicyEventPojo;
import com.riil.base.resmodel.pojo.policy.PolicyEventRulePojo;
import com.riil.base.resmodel.pojo.policy.PolicyPojo;
import com.riil.base.resource.pojo.ResConnectInfoPojo;
import com.riil.core.utils.bean.SerializeUtil;

/**
 * 生成日志策略文件 <br>
 * <p>
 * Create on : 2011-11-3<br>
 * <p>
 * </p>
 * <br>
 * 
 * @author panhongliang@ruijie.com.cn<br>
 * @version riil.base.resmodel.impl v6.0
 *          <p>
 *          <br>
 *          <strong>Modify History:</strong><br>
 *          user modify_date modify_content<br>
 *          -------------------------------------------<br>
 *          <br>
 */
public class GenPolicyLogBinFile {
	private String ROOT_PATH;

	public GenPolicyLogBinFile(String rootPath) {
		ROOT_PATH = rootPath;
	}

	public GenPolicyLogBinFile() {

	}

	private File getPath(String path) {
		File _path = null;
		URL _url = this.getClass().getClassLoader().getResource(path);
		if (_url != null) {
			_path = new File(_url.getPath());
		} else if (ROOT_PATH != null) {
			_path = new File(ROOT_PATH, path);
		} else {
			throw new RuntimeException("Not found path : " + path);
		}
		return _path;
	}

	private String getBinPath() {
		return getPath("resmodel").getAbsolutePath();
	}

	private String getPolicyBinPath() {
		return getBinPath() + "/system/policy";
	}

	public void genBinFile4PolicyLog() throws IOException {

		String path;
		path = getPolicyBinPath();
		SerializeUtil.convertObjectToBin(getWindowsLogPojo("WindowsLog"), path + "/RIIL_RMP_LOG_WindowsLog_Test");
		SerializeUtil.convertObjectToBin(getSysLogPojo("SysLog"), path + "/RIIL_RMP_LOG_SysLog_Test");
		SerializeUtil.convertObjectToBin(getCommonLogPojo("CommonLog"), path + "/RIIL_RMP_LOG_CommonLog_Test");
	}

	public PolicyPojo getWindowsLogPojo(String type) {
		PolicyPojo t_policy = new PolicyPojo();
		t_policy.setId(type + "_default");
		t_policy.setName(type + "_default");
		t_policy.setPolicyType(EnumRoot.PolicyLogType.WINDOWS.getId());
		t_policy.setInUse(Byte.parseByte("1"));
		PolicyEventPojo t_event = new PolicyEventPojo();
		t_event.setName("windows-log test");
		t_event.setType(EnumRoot.EventType.AVAIL_EVENT.getId());
		t_event.setLevel(EnumRoot.EventLevel.CRITICAL.getId());
		t_event.setDesc("windows-log test");
		PolicyEventRulePojo t_rule = new PolicyEventRulePojo();
		t_rule.setLogLevel(EnumRoot.LogLevelWMI.Error.getValue() + "," + EnumRoot.LogLevelWMI.Security_Audit_Failure.getValue());
		t_rule.setSource("WMI");
		t_rule.setKeyExp("error");
		t_event.addPolicyEventRulePojo(t_rule);
		List<PolicyEventPojo> e_list = new ArrayList<PolicyEventPojo>();
		e_list.add(t_event);
		t_policy.setListPolicyEventPojo(e_list);
		return t_policy;
	}

	public PolicyPojo getSysLogPojo(String type) {
		PolicyPojo t_policy = new PolicyPojo();
		t_policy.setId(type + "_default");
		t_policy.setName(type + "_default");
		t_policy.setPolicyType(EnumRoot.PolicyLogType.SYSLOG.getId());
		t_policy.setInUse(Byte.parseByte("1"));
		PolicyEventPojo t_event = new PolicyEventPojo();
		t_event.setName("syslog test");
		t_event.setType(EnumRoot.EventType.AVAIL_EVENT.getId());
		t_event.setLevel(EnumRoot.EventLevel.CRITICAL.getId());
		t_event.setDesc("syslog test");
		PolicyEventRulePojo t_rule = new PolicyEventRulePojo();
		t_rule.setLogLevel(EnumRoot.LogLevelSysLog.Alert.getValue() + "," + EnumRoot.LogLevelSysLog.Emergency.getValue() + ","
				+ EnumRoot.LogLevelSysLog.Critical.getValue());
		t_rule.setKeyExp("error");
		t_event.addPolicyEventRulePojo(t_rule);
		List<PolicyEventPojo> e_list = new ArrayList<PolicyEventPojo>();
		e_list.add(t_event);
		t_policy.setListPolicyEventPojo(e_list);
		return t_policy;
	}

	public PolicyPojo getCommonLogPojo(String type) {
		PolicyPojo t_policy = new PolicyPojo();
		t_policy.setId(type + "_default");
		t_policy.setName(type + "_default");
		t_policy.setPolicyType(EnumRoot.PolicyLogType.COMMONLOG.getId());
		t_policy.setInUse(Byte.parseByte("1"));
		PolicyEventPojo t_event = new PolicyEventPojo();
		t_event.setName("syslog test");
		t_event.setType(EnumRoot.EventType.AVAIL_EVENT.getId());
		t_event.setLevel(EnumRoot.EventLevel.CRITICAL.getId());
		t_event.setDesc("syslog test");
		PolicyEventRulePojo t_rule = new PolicyEventRulePojo();
		t_rule.setKeyExp("error");
		t_event.addPolicyEventRulePojo(t_rule);
		List<PolicyEventPojo> e_list = new ArrayList<PolicyEventPojo>();
		e_list.add(t_event);
		t_policy.setListPolicyEventPojo(e_list);
		return t_policy;
	}

	public static List<ResConnectInfoPojo> getResInstanceConnInfo(String ip, String user, String pwd, String type, int port) {
		List<ResConnectInfoPojo> list = new ArrayList<ResConnectInfoPojo>();
		ResConnectInfoPojo typeConnInfo = new ResConnectInfoPojo();
		typeConnInfo.setPropId("CAGENT.protocol");
		typeConnInfo.setPropValue(type);
		ResConnectInfoPojo ipConnInfo = new ResConnectInfoPojo();
		ipConnInfo.setPropId("CAGENT.ipAddressOfTarget");
		ipConnInfo.setPropValue(ip);
		ResConnectInfoPojo userConnInfo = new ResConnectInfoPojo();
		userConnInfo.setPropId("CAGENT.user");
		userConnInfo.setPropValue(user);
		ResConnectInfoPojo pwdConnInfo = new ResConnectInfoPojo();
		pwdConnInfo.setPropId("CAGENT.password");
		pwdConnInfo.setPropValue(pwd);
		ResConnectInfoPojo portConnInfo = new ResConnectInfoPojo();
		portConnInfo.setPropId("CAGENT.portOfTarget");
		portConnInfo.setPropValue(port + "");
		return list;
	}

	public static void main(String[] args) {
		try {
			GenPolicyLogBinFile genFile;
			if (args != null && args.length > 0) {
				genFile = new GenPolicyLogBinFile(args[0]);
			} else {
				genFile = new GenPolicyLogBinFile();
			}

			// FakeData f = new FakeData();

			genFile.genBinFile4PolicyLog();
		} catch (IOException e) {
			e.printStackTrace();
		}
		// putInCache();
	}
}
