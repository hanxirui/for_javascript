package com.riil.base.resmodel.impl.file;

import java.io.File;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.commons.io.FileUtils;

import com.riil.base.pojo.enums.Enum4ResType.ResCatalog;
import com.riil.core.commons.ServerModule;
import com.riil.core.logger.SystemLogger;
import com.riil.core.service.ServiceException;
import com.riil.core.utils.ServerEnvUtil;

/**
 * 文件读取相关工具类<br>
 * <p>
 * Create on : 2011-11-13<br>
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
public class BinFileUtils {

	private static final SystemLogger S_LOGGER = SystemLogger.getSystemLogger(BinFileUtils.class,
			ServerModule.ResourceModel);
	/**
	 * BASE目录
	 */
	// public static String S_BIN_FILE_PATH = "";

	private static final String S_FILE_INCLUDE_SVN = ".svn";

	/*** 文件分隔符 **/
	public static final String S_FILE_SEPARATOR = "/";// System.getProperty("file.separator");//
	/** 是否延迟加载模板和模型 true=延迟加载；；；false=加载全部 **/
	@Deprecated
	private static boolean m_lazyLoad = true;// false;
	/**
	 * bin文件目录
	 */
	// public static final String S_BIN_PATH = "bin" + S_FILE_SEPARATOR;

	/** BIN文件后缀 **/
	public static final String S_BIN_FILE_EXT = "";// ".bin";
	public static final String S_PREFIX_METRIC = "RIIL_METRIC_";
	public static final String S_PREFIX_METRIC_GROUP = "RIIL_RMG_";
	public static final String S_PREFIX_GROUP_METRIC_REL = "RIIL_GMR_";
	public static final String S_PREFIX_EVENT = "RIIL_EVENT_";
	
	/** 模板文件名前缀 **/
	public static final String S_PREFIX_RES_TYPE = "RESTYPE";
	/** 模型文件名前缀 **/
	public static final String S_PREFIX_MODEL = "RIIL_RMM";
	/*** 命令后缀，前缀与模型相同 **/
	public static final String S_SUFFIX_MODEL_CMD = "_CMD";
	/** RES策略文件名前缀 **/
	public static final String S_PREFIX_POLICY_RES = "RES";// "RIIL_RMP_R";
	
	/** 指标解释文件名前缀 **/
    public static final String S_PREFIX_METRIC_EXPLAIN = "METRICEXPLAIN";

	/** BIZ策略文件名前缀 **/
	public static final String S_PREFIX_POLICY_BIZ = "BIZ";// "RIIL_RMP_R";
	/** link策略文件名前缀 **/
	public static final String S_PREFIX_POLICY_LINK = "LINK";// "RIIL_RMP_R";
	/** LOG策略文件名前缀 **/
	public static final String S_PREFIX_POLICY_LOG = "LOG";// "RIIL_RMP_L";
	/** trap策略文件名前缀 **/
	public static final String S_PREFIX_POLICY_TRAP = "TRAP";// "RIIL_RMP_T";
	/** SCRIPT策略文件名前缀 **/
	public static final String S_PREFIX_POLICY_SCRIPT = "SCRIPT";// "RIIL_RMP_S";
	/** 告警规则文件名前缀 **/
	public static final String S_PREFIX_ALARM_RULE = "ALARM_RULE";//

	public static final String CUSTOM_FOLDER = "custom";

	public static final String SYSTEM_FOLDER = "system";

	public static final String WORK_SPACE = "resmodel";

	// \workspace\resmodel
	public static String RIIL_MODEL_ROOT_FOLDER = ServerEnvUtil.RIIL_WORK_SPACE_FOLDER;

	// \workspace\resmodel\custom
	public static String RIIL_CUSTOM_FOLDER = RIIL_MODEL_ROOT_FOLDER + File.separator + WORK_SPACE + File.separator
			+ CUSTOM_FOLDER + File.separator;
	// \workspace\resmodel\system
	public static String RIIL_SYSTEM_FOLDER = RIIL_MODEL_ROOT_FOLDER + File.separator + WORK_SPACE + File.separator
			+ SYSTEM_FOLDER + File.separator;
	
	public static String RIIL_SYSTEM_DIC_FOLDER = RIIL_SYSTEM_FOLDER + "dict" + File.separator;
	
	public static String RIIL_CUSTOM_METRIC_FOLDER =  RIIL_CUSTOM_FOLDER + "metric" + File.separator;
	public static String RIIL_SYSTEM_METRIC_FOLDER =  RIIL_SYSTEM_FOLDER + "metric" + File.separator;
	
	public static String RIIL_CUSTOM_EVENT_FOLDER =  RIIL_CUSTOM_FOLDER + "event" + File.separator;
	public static String RIIL_SYSTEM_EVENT_FOLDER =  RIIL_SYSTEM_FOLDER + "event" + File.separator;
	
	public static String RIIL_CUSTOM_RES_TYPE_FOLDER = RIIL_CUSTOM_FOLDER + "restype" + File.separator;
	public static String RIIL_SYSTEM_RES_TYPE_FOLDER = RIIL_SYSTEM_FOLDER + "restype" + File.separator;
	
	public static String RIIL_CUSTOM_METRIC_EXPLANATION_FOLDER = RIIL_CUSTOM_FOLDER + "metricexplain" + File.separator;
	public static String RIIL_SYSTEM_METRIC_EXPLANATION_FOLDER = RIIL_SYSTEM_FOLDER + "metricexplain" + File.separator;
	
	public static String RIIL_POLICY_FOLDER = RIIL_CUSTOM_FOLDER + "policy" + File.separator;
	public static String RIIL_SYSTEM_POLICY_FOLDER = RIIL_SYSTEM_FOLDER + "policy" + File.separator;
	
	
	public static String RIIL_SCRIPT_FOLDER = RIIL_CUSTOM_FOLDER + "script" + File.separator;
	public static String RIIL_SYSTEM_SCRIPT_FOLDER = RIIL_SYSTEM_FOLDER + "script" + File.separator;
	
	@Deprecated
	public static String RIIL_ResTypePojo_FOLDER = RIIL_CUSTOM_FOLDER + "template" + File.separator;
	@Deprecated
	public static String RIIL_SYSTEM_ResTypePojo_FOLDER = RIIL_SYSTEM_FOLDER + "template" + File.separator;
	
	
	public static String RIIL_MODEL_FOLDER = RIIL_CUSTOM_FOLDER + "model" + File.separator;
	public static String RIIL_SYSTEM_MODEL_FOLDER = RIIL_SYSTEM_FOLDER + "model" + File.separator;

	public static boolean isModelFile(String fileName) {
		if (fileName.toUpperCase().indexOf(S_PREFIX_MODEL) >= 0 && !fileName.toUpperCase().endsWith(S_SUFFIX_MODEL_CMD)) {
			return true;
		}
		return false;
	}

	public static boolean isModelCmdFile(String fileName) {
		if (fileName.toUpperCase().indexOf(S_PREFIX_MODEL) >= 0 && fileName.toUpperCase().endsWith(S_SUFFIX_MODEL_CMD)) {
			return true;
		}
		return false;
	}

	public static boolean isResTypeFile(String fileName) {
		if (fileName.toUpperCase().indexOf(S_PREFIX_RES_TYPE) >= 0) {
			return true;
		}
		return false;
	}
	
	public static boolean isMetricExplanationFile(String fileName) {
        if (fileName.toUpperCase().indexOf(S_PREFIX_METRIC_EXPLAIN) >= 0) {
            return true;
        }
        return false;
    }

	public static boolean isPolicyFile4Res(String fileName) {
		if (fileName.toUpperCase().indexOf(S_PREFIX_POLICY_RES) >= 0) {
			return true;
		}
		return false;
	}

	public static boolean isPolicyFile4Biz(String fileName) {
		if (fileName.toUpperCase().indexOf(S_PREFIX_POLICY_BIZ) >= 0
				|| fileName.toUpperCase().indexOf("RIIL_RMP_RES_BUSINESSSERVICE") >= 0) {
			return true;
		}
		return false;
	}
	
	public static boolean isPolicyFile4Script(String fileName) {
		if (fileName.toUpperCase().indexOf(S_PREFIX_POLICY_SCRIPT) >= 0) {
			return true;
		}
		return false;
	}

	public static boolean isPolicyFile4Others(String fileName) {
		if (fileName.toUpperCase().indexOf(S_PREFIX_POLICY_LOG) >= 0) {
			return true;
		}
		if (fileName.toUpperCase().indexOf(S_PREFIX_POLICY_TRAP) >= 0) {
			return true;
		}
		return false;
	}

	public static boolean isAlarmRuleFile(String fileName) {
		if (fileName.toUpperCase().indexOf(S_PREFIX_ALARM_RULE) >= 0) {
			return true;
		}
		return false;
	}

	public static String getPath4Dict() {
		return RIIL_SYSTEM_DIC_FOLDER;
		// return
		// BinFileUtils.class.getClassLoader().getResource("bin").getPath();
		// return BinFileUtils.class.getClassLoader().getResource(S_BIN_PATH +
		// Constants.DICT_FOLDER).getPath();
	}

	public static String getPath4Model() {

		return RIIL_MODEL_FOLDER;
		// return BinFileUtils.class.getClassLoader()
		// .getResource(S_BIN_PATH + Constants.MODEL_FOLDER).getPath();
	}

	/**
	 * 获取模型文件
	 * 
	 * @return
	 */
	public static Collection<File> getFiles4Model() {
		return getFiles(new String[] { RIIL_SYSTEM_MODEL_FOLDER, RIIL_MODEL_FOLDER });
	}

	public static Collection<File> getFiles4Model(String modelId) {

		Collection<File> retFiles = new HashSet<File>();
		File t_file = new File(RIIL_SYSTEM_MODEL_FOLDER + modelId);
		if (t_file.exists()) {
			retFiles.add(t_file);
		}
		t_file = new File(RIIL_MODEL_FOLDER + modelId);
		if (t_file.exists()) {
			retFiles.add(t_file);
		}
		return retFiles;
	}

	/**
	 * 获取模型cmdGroup文件
	 * 
	 * @return
	 */
	public static Collection<File> getFiles4ModelCmdGroup() {
		return getFiles(new String[] { RIIL_SYSTEM_MODEL_FOLDER, RIIL_MODEL_FOLDER });
	}

	public static boolean isNormalFile(String fileName) {
		if (fileName.indexOf(S_FILE_INCLUDE_SVN) > 0) {
			return false;
		}

		return true;
	}

	/**
	 * 获取模板文件
	 * @deprecated -> getFiles4ResType
	 * @return
	 */
	@Deprecated
	public static Collection<File> getFiles4Temp() {
		// return getFiles(new String[] {
		// ServerEnvUtil.RIIL_SYSTEM_FOLDER + "ResTypePojo" + File.separator,
		// ServerEnvUtil.RIIL_ResTypePojo_FOLDER });
		return getFiles(new String[] { RIIL_SYSTEM_ResTypePojo_FOLDER, RIIL_ResTypePojo_FOLDER });
	}

	public static Collection<File> getFiles4ResType() {
		Collection<File> result = new ArrayList<File>();
		Collection<File> files = getFiles(new String[] { RIIL_SYSTEM_RES_TYPE_FOLDER, RIIL_CUSTOM_RES_TYPE_FOLDER });
		for (File t_file : files) {
			if (t_file.isFile() && BinFileUtils.isNormalFile(t_file.getPath()) 
					&& BinFileUtils.isResTypeFile(t_file.getPath())) {
				result.add(t_file);
			}
		}
		return result;
	}
	
	public static Collection<File> getFiles4MetricExplanation() {
        Collection<File> result = new ArrayList<File>();
        Collection<File> files = getFiles(new String[] { RIIL_SYSTEM_METRIC_EXPLANATION_FOLDER, RIIL_CUSTOM_METRIC_EXPLANATION_FOLDER });
        for (File t_file : files) {
            if (t_file.isFile() && BinFileUtils.isNormalFile(t_file.getPath()) && BinFileUtils.isMetricExplanationFile(t_file.getPath())) {
                result.add(t_file);
            }
        }
        return result;
    }
	
	@Deprecated
	public static Collection<File> getFiles4Temp(String tempId) {

		Collection<File> retFiles = new HashSet<File>();
		File t_file = new File(RIIL_SYSTEM_ResTypePojo_FOLDER + tempId);
		if (t_file.exists()) {
			retFiles.add(t_file);
		}
		t_file = new File(RIIL_ResTypePojo_FOLDER + tempId);
		if (t_file.exists()) {
			retFiles.add(t_file);
		}
		return retFiles;
	}

	/**
	 * 获取策略文件
	 * 
	 * @return
	 */
	public static Collection<File> getFiles4PolicySystem() {
		return getFiles(new String[] { RIIL_SYSTEM_POLICY_FOLDER });
	}

	/**
	 * 获取策略文件
	 * 
	 * @return
	 */
	public static Collection<File> getFiles4PolicyCustom() {
		return getFiles(new String[] { RIIL_POLICY_FOLDER });
	}

	/**
	 * 获取字典文件
	 * 
	 * @return
	 */
	public static Collection<File> getFiles4Dict() {
		return getFiles(new String[] { RIIL_SYSTEM_FOLDER, RIIL_CUSTOM_FOLDER });
	}

	/**
	 * 获取策略文件
	 * 
	 * @return
	 */
	public static Collection<File> getFiles4Policy() {
		return getFiles(new String[] { RIIL_SYSTEM_POLICY_FOLDER, RIIL_POLICY_FOLDER });
	}

	/**
	 * system 系统资源模型目录是否存在.
	 * 
	 * @return
	 */
	public static boolean isSystemResmodelExist() {
		File t_file = new File(ServerEnvUtil.RIIL_SYSTEM_FOLDER);
		if (t_file.exists()) {
			return true;
		} else {
			return false;
		}

	}

	public static void init() {
		if (isSystemResmodelExist()) {
			return;
		} else {
			RIIL_MODEL_ROOT_FOLDER = getClassPath4Test();
		}
		File t_file = new File(RIIL_MODEL_ROOT_FOLDER + File.separator + WORK_SPACE);
		if (!t_file.exists()) {
			RIIL_MODEL_ROOT_FOLDER = getClassPath();
		}
		RIIL_CUSTOM_FOLDER = RIIL_MODEL_ROOT_FOLDER + File.separator + WORK_SPACE + File.separator + CUSTOM_FOLDER
				+ File.separator;
		RIIL_SYSTEM_FOLDER = RIIL_MODEL_ROOT_FOLDER + File.separator + WORK_SPACE + File.separator + SYSTEM_FOLDER
				+ File.separator;

		RIIL_POLICY_FOLDER = RIIL_CUSTOM_FOLDER + "policy" + File.separator;

		RIIL_SCRIPT_FOLDER = RIIL_CUSTOM_FOLDER + "script" + File.separator;

		RIIL_ResTypePojo_FOLDER = RIIL_CUSTOM_FOLDER + "ResTypePojo" + File.separator;

		RIIL_MODEL_FOLDER = RIIL_CUSTOM_FOLDER + "model" + File.separator;

		RIIL_SYSTEM_POLICY_FOLDER = RIIL_SYSTEM_FOLDER + "policy" + File.separator;

		RIIL_SYSTEM_SCRIPT_FOLDER = RIIL_SYSTEM_FOLDER + "script" + File.separator;

		RIIL_SYSTEM_ResTypePojo_FOLDER = RIIL_SYSTEM_FOLDER + "ResTypePojo" + File.separator;

		RIIL_SYSTEM_MODEL_FOLDER = RIIL_SYSTEM_FOLDER + "model" + File.separator;

		if (S_LOGGER.isDebugEnabled()) {
			S_LOGGER.debug("ROOT--PATH	" + BinFileUtils.RIIL_MODEL_ROOT_FOLDER);
			S_LOGGER.debug("RIIL_SYSTEM_MODEL_FOLDER	" + BinFileUtils.RIIL_SYSTEM_MODEL_FOLDER);
			S_LOGGER.debug("RIIL_SYSTEM_ResTypePojo_FOLDER	" + BinFileUtils.RIIL_SYSTEM_ResTypePojo_FOLDER);
		}
	}

	/**
	 * @return
	 */
	public static String getClassPath4Test() {
		String classPath = System.getProperty("java.class.path", ".");
		String[] files = classPath.split(";");
		for (String pathName : files) {
			if (pathName.endsWith(".jar")) {
				continue;
			}
			if (pathName.endsWith("test-classes")) {
				return pathName;
			}
		}
		return null;
	}

	/**
	 * 获得资源模型所在的路径.
	 * 
	 * @return
	 */
	public static String getClassPath() {
		String classPath = System.getProperty("java.class.path", ".");
		String[] files = classPath.split(";");
		for (String pathName : files) {
			if (pathName.endsWith(".jar")) {
				continue;
			}
			if (pathName.endsWith("test-classes")) {
				continue;
			}
			File t_file = new File(pathName + File.separator + WORK_SPACE);
			if (t_file.exists()) {
				return pathName;
			}
		}
		return "";
	}

	public static List<String> getClassPathList() {
		String classPath = System.getProperty("java.class.path", ".");
		String[] files = classPath.split(";");
		List<String> fileList = new ArrayList<String>();
		for (String pathName : files) {
			if (pathName.endsWith(".jar")) {
				continue;
			}
			if (pathName.endsWith("test-classes")) {
				fileList = new ArrayList<String>();
				fileList.add(pathName);
				return fileList;
			}
			fileList.add(pathName);
		}
		return fileList;
	}

	public static Collection<File> getFiles(String[] filePath) {

		// S_LOGGER.error("WorkSpace is:" +
		// ServerEnvUtil.RIIL_WORK_SPACE_FOLDER);

		Collection<File> retFiles;

		retFiles = null;
		for (int i = 0; i < filePath.length; i++) {
			File t_binf = new File(filePath[i]);
			if (!t_binf.exists()) {
				S_LOGGER.warn(" resmodel folder " + filePath[i] + " was not found.");
				continue;
			}
			try {
				if (retFiles == null) {
					retFiles = FileUtils.listFiles(t_binf, null, false);
				} else {
					Collection<File> files = FileUtils.listFiles(t_binf, null, true);
					retFiles.addAll(files);
				}
			} catch (Exception e) {
				S_LOGGER.error("",e);

				if (retFiles != null) {
					return retFiles;
				} else {
					return new ArrayList<File>();
				}

			}
		}
		return retFiles;
	}

	/**
	 * {method description}.
	 * 
	 * @param modelId
	 * @return
	 */
	public static String getPath4Model(String modelId) {
		// String path = BinFileUtils.getPath4Model();
		return RIIL_MODEL_FOLDER + S_FILE_SEPARATOR + modelId + S_BIN_FILE_EXT;
	}

	/**
	 * 取得策略文件目录
	 * 
	 * @return
	 */
	public static String getPath4Policy() {
		return RIIL_POLICY_FOLDER;
	}

	/**
	 * 取得策略文件目录
	 * 
	 * @return
	 */
	public static String getPath4PolicyDefault() {
		return RIIL_SYSTEM_POLICY_FOLDER;
	}

	/**
	 * 取得策略文件目录
	 * 
	 * @return
	 */
	public static String getPath4AlarmRule() {
		// if (S_BIN_FILE_PATH != null && S_BIN_FILE_PATH.trim().length() > 0) {
		// return S_BIN_FILE_PATH + Constants.POLICY_FOLDER;
		// }
		// URL resource = BinFileUtils.class.getClassLoader().getResource(
		// S_BIN_PATH + Constants.POLICY_FOLDER);
		// if (resource == null) {
		// return null;
		// }

		return RIIL_POLICY_FOLDER;
	}

	/**
	 * 根据策略id取得策略文件
	 * 
	 * @param policyId
	 * @return
	 */
	public static String getPath4Policy(String policyId, String policyType) {

		String path = BinFileUtils.getPath4Policy();
		return path + /* S_FILE_SEPARATOR + */policyType + policyId + S_BIN_FILE_EXT;
	}

	public static String getPath4PolicyDefualt(String policyId) {

		String path = BinFileUtils.getPath4PolicyDefault();
		return path + /* S_FILE_SEPARATOR + */policyId + S_BIN_FILE_EXT;
	}

	public static String getPath4Temp() {
		return RIIL_ResTypePojo_FOLDER;
		// return BinFileUtils.class.getClassLoader()
		// .getResource(S_BIN_PATH + Constants.ResTypePojo_FOLDER).getPath();
	}

	/**
	 * {method description}.
	 * 
	 * @param tempId
	 * @return
	 */
	public static String getPath4Temp(String tempId) {
		String path = BinFileUtils.getPath4Temp();
		return path + S_FILE_SEPARATOR + tempId + S_BIN_FILE_EXT;
	}

	/***
	 * 取得license授权的resCatalog
	 * 
	 * @return
	 * @throws ServiceException
	 */
	public static Set<String> getResCatalog4License() throws ServiceException {
		Set<String> t_ret = new HashSet<String>();
		ResCatalog[] t_resCatalogList = ResCatalog.values();
		for (ResCatalog resCatalog : t_resCatalogList) {
			t_ret.add(resCatalog.getId());
		}
		// t_ret.remove("Host");
		// t_ret.clear();
		return t_ret;
	}

	public static boolean isLicenseResCatalog(String resCatalog) {
		return true;// LICENSE授权判断
		// try {
		// return getResCatalog4License().contains(resCatalog);
		// } catch (ServiceException e) {
		// S_LOGGER.error(e);
		// }
		// return false;
	}

	public static boolean isPolicyFile4Link(String fileName) {
		if (fileName.indexOf(S_PREFIX_POLICY_LINK) >= 0) {
			return true;
		}
		return false;
	}

	@Deprecated
	public static boolean isLazyLoad() {
		return m_lazyLoad;
	}

	@Deprecated
	public static void setLazyLoad(boolean lazyLoad) {
		m_lazyLoad = lazyLoad;
	}

	public static String getDefaultPolicyIdByModelId(String monitorModelId) {
		return monitorModelId.replaceAll(S_PREFIX_MODEL, "RIIL_RMP_RES") + "_DEFAULT";
	}
	
	public static String getDefaultPolicyIdByModelId(String monitorModelId, String type) {
		return monitorModelId.replaceAll(S_PREFIX_MODEL, "RIIL_RMP_RES") + "_"+type;
	}
	
	public static String getLinkDefaultPolicyId() {
	    return "RIIL_RMP_RES_LINK_DEFAULT";
	}
	
}
