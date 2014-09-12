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
import com.riil.core.utils.bean.SerializeUtil;

/**
 * 生成SnmpTrap策略文件 <br>
 * <p>
 * Create on : 2011-11-3<br>
 * <p>
 * </p>
 * <br>
 * 
 * @author {@link GenSnmpTrapPolicyBinFile}<br>
 * @version riil.base.resmodel.impl v6.0
 *          <p>
 *          <br>
 *          <strong>Modify History:</strong><br>
 *          user modify_date modify_content<br>
 *          -------------------------------------------<br>
 *          <br>
 */
public class GenSnmpTrapPolicyBinFile {
	private String ROOT_PATH;

	public GenSnmpTrapPolicyBinFile(String rootPath) {
		ROOT_PATH = rootPath;
	}

	public GenSnmpTrapPolicyBinFile() {

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
		SerializeUtil.convertObjectToBin(getColdStartTrapPojo("Cold_Start_Trap"), path + "/RIIL_RMP_TRAP_Cold_Start_Trap_Test");
		SerializeUtil.convertObjectToBin(getLinkDownTrapPojo("Link_Down_Trap"), path + "/RIIL_RMP_TRAP_Link_Down_Trap_Test");
	}

	private PolicyPojo getColdStartTrapPojo(String type) {
		PolicyPojo t_policy = new PolicyPojo();
		t_policy.setId(type + "_default");
		t_policy.setName(type + "_default");
		t_policy.setPolicyType(EnumRoot.PolicyType.TRAP.getId());
		t_policy.setInUse(Byte.parseByte("1"));
		PolicyEventPojo t_event = new PolicyEventPojo();
		t_event.setName("SnmpTrap test");
		t_event.setType(EnumRoot.EventType.AVAIL_EVENT.getId());
		t_event.setLevel(EnumRoot.EventLevel.CRITICAL.getId());
		t_event.setDesc("SnmpTrap test");
		PolicyEventRulePojo t_rule = new PolicyEventRulePojo();
		t_rule.setTrapEnterprise("1.3.6.1.6.3.1.1.5.1");
		t_rule.setTrapGeneral("0");
		t_rule.setTrapSpecial("0");
		// t_rule.setTrapType(EnumRoot.TrapType.COMMON.getId());
		t_event.addPolicyEventRulePojo(t_rule);
		List<PolicyEventPojo> e_list = new ArrayList<PolicyEventPojo>();
		e_list.add(t_event);
		t_policy.setListPolicyEventPojo(e_list);
		return t_policy;
	}

	private PolicyPojo getLinkDownTrapPojo(String type) {
		PolicyPojo t_policy = new PolicyPojo();
		t_policy.setId(type + "_default");
		t_policy.setName(type + "_default");
		t_policy.setPolicyType(EnumRoot.PolicyType.TRAP.getId());
		t_policy.setInUse(Byte.parseByte("1"));
		PolicyEventPojo t_event = new PolicyEventPojo();
		t_event.setName(type + " test");
		t_event.setType(EnumRoot.EventType.AVAIL_EVENT.getId());
		t_event.setLevel(EnumRoot.EventLevel.CRITICAL.getId());
		t_event.setDesc(type + " test");
		PolicyEventRulePojo t_rule = new PolicyEventRulePojo();
		t_rule.setTrapEnterprise("1.3.6.1.6.3.1.1.5.3");
		t_rule.setTrapGeneral("2");
		t_rule.setTrapSpecial("0");
		// t_rule.setTrapType(EnumRoot.TrapType.COMMON.getId());
		t_event.addPolicyEventRulePojo(t_rule);
		List<PolicyEventPojo> e_list = new ArrayList<PolicyEventPojo>();
		e_list.add(t_event);
		t_policy.setListPolicyEventPojo(e_list);
		return t_policy;
	}

	public static void main(String[] args) {
		try {
			GenSnmpTrapPolicyBinFile genFile;
			if (args != null && args.length > 0) {
				genFile = new GenSnmpTrapPolicyBinFile(args[0]);
			} else {
				genFile = new GenSnmpTrapPolicyBinFile();
			}

			genFile.genBinFile4PolicyLog();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
