package com.riil.base.tools;

import java.io.File;
import java.io.IOException;
import java.net.URL;

import com.riil.base.pojo.enums.EnumRoot;
import com.riil.base.resmodel.pojo.policy.PolicyScriptMetricPojo;
import com.riil.base.resmodel.pojo.policy.PolicyScriptPojo;
import com.riil.base.resmodel.pojo.policy.PolicyScriptResPojo;
import com.riil.core.utils.bean.SerializeUtil;

/**
 * 生成策略文件 <br>
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
public class GenPolicyScriptBinFile {
	private String ROOT_PATH;

	public GenPolicyScriptBinFile(String rootPath) {
		ROOT_PATH = rootPath;
	}

	public GenPolicyScriptBinFile() {

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
		// return
		// this.getClass().getClassLoader().getResource("resmodel").getPath();
		return getPath("resmodel").getAbsolutePath();
	}

	private String getPolicyBinPath() {
		return getBinPath() + "/system/policy";
	}

	private File makeParent(String filePath) {
		File file = new File(filePath);
		if (!file.getParentFile().exists()) {
			boolean normal = file.getParentFile().mkdirs();
			if (!normal) {
				return null;
			}
		}
		return file;
	}

	public void genBinFile4PolicyScript() throws IOException {

		String path;// =
					// FakeData.class.getClassLoader().getResource("bin").getPath();
		path = getPolicyBinPath();
		for (int i = 1; i <= 3; i++) {
			String filePath = path + "/RIIL_RMP_Script_Test" + i;
			SerializeUtil.convertObjectToBin(getPolicyScriptPojo(i), makeParent(filePath));
		}
	}

	public PolicyScriptPojo getPolicyScriptPojo(int type) {
		PolicyScriptPojo t_policy = new PolicyScriptPojo();
		t_policy.setId("script" + type);
		t_policy.setArgs("ruijie_Aix");
		t_policy.setName("policyScript" + type);
		t_policy.setPolicyType(EnumRoot.PolicyScriptType.SIMPLE.getId());
		t_policy.setFileName("filename.sh");
		t_policy.setInUse(Byte.parseByte("1"));
		for (int i = 0; i < 3; i++) {
			PolicyScriptResPojo t_res = new PolicyScriptResPojo();
			t_res.setFilePath("c:/");
			t_res.setId(type + "_" + i + "");
//			t_res.setIp("172.16.13.130");
			t_res.setUserName("root");
			t_res.setPassword("root");
			t_res.setPluginId("TEST");
			t_res.setPort("23");
			t_res.setServerId("DCS1");
			t_policy.addPolicyScriptResPojo(t_res);
		}

		for (int i = 0; i < 3; i++) {
			PolicyScriptMetricPojo t_metric = new PolicyScriptMetricPojo();
			t_metric.setColumnId(1);
			t_metric.setDataType(EnumRoot.DataType.NUMBER.toString());
			t_metric.setMetricId("mid" + i);
			t_metric.setMetricName("metric" + i);
			t_metric.setRowId(1);
			t_policy.addPolicyScriptMetricPojo(t_metric);
		}
		/**
		 * 非固定周期 <br>
		 * 逗号分隔【 1,时间】 或【2,界面空】 或 【3,界面空】 开始日期；结束日期、 开始时间； 结束时间； 每天； 每隔 天，以频率 秒
		 * 执行。 每周 ： 每隔 周，以频率 秒 执行。
		 */

		/**
		 * T=10:50:00&F=O&BD=2011-11-29<br/>
		 * <br/>
		 * 每3天执行一次<br/>
		 * T=10:50:00&F=D&BD=2011-11-29&ED=2012-11-29&E=3<br/>
		 * <br/>
		 * 每3周执行一次，周1,4,5执行<br/>
		 * T=10:50:00&F=W&BD=2011-11-29&ED=2012-11-29&E=3&DOW=1,4,5<br/>
		 * 
		 */
		if (type == 1) {
			t_policy.setFrequency("T=10:50:00&F=O&BD=2011-11-29");
		} else if (type == 2) {

			t_policy.setFrequency("T=15:45:00&F=D&BD=2011-11-29&ED=2012-11-29&E=1");
		} else {
			t_policy.setFrequency("T=10:50:00&F=W&BD=2011-11-29&ED=2012-11-29&E=3&DOW=1,4,5");
		}
		return t_policy;
	}

	public static void main(String[] args) {
		try {
			GenPolicyScriptBinFile genFile;
			if (args != null && args.length > 0) {
				genFile = new GenPolicyScriptBinFile(args[0]);
			} else {
				genFile = new GenPolicyScriptBinFile();
			}
			// FakeData f = new FakeData();

			genFile.genBinFile4PolicyScript();
		} catch (IOException e) {
			e.printStackTrace();
		}
		// putInCache();
	}
}
