package com.riil.base.resmodel.file;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.apache.commons.digester.Digester;
import org.apache.log4j.Level;
import org.apache.log4j.Logger;
import org.junit.Test;

import com.riil.base.pojo.dict.DictCollFrequencyPojo;
import com.riil.base.pojo.dict.DictCommonPojo;
import com.riil.base.pojo.dict.DictPluginPojo;
import com.riil.base.pojo.dict.DictResConnPropPojo;
import com.riil.base.resmodel.pojo.base.ResTypePojo;
import com.riil.base.resmodel.pojo.mmodel.ModelMetricBindingPojo;
import com.riil.base.resmodel.pojo.mmodel.ModelPojo;
import com.riil.base.resmodel.pojo.policy.PolicyActionPojo;
import com.riil.base.resmodel.pojo.policy.PolicyEventPojo;
import com.riil.base.resmodel.pojo.policy.PolicyEventRulePojo;
import com.riil.base.resmodel.pojo.policy.PolicyMetricPojo;
import com.riil.base.resmodel.pojo.policy.PolicyPojo;
import com.riil.base.resmodel.pojo.policy.PolicyResPojo;
import com.riil.base.resmodel.pojo.policy.PolicyResRelPojo;
import com.riil.base.resmodel.pojo.policy.PolicyThresholdPojo;
import com.riil.base.resmodel.pojo.vendor.ModelSysoidPojo;
import com.riil.base.resmodel.pojo.vendor.VendorModelPojo;
import com.riil.base.tools.GenPolicyLogBinFile;
import com.riil.base.tools.GenPolicyScriptBinFile;
import com.riil.base.tools.GenSnmpTrapPolicyBinFile;
import com.riil.core.commons.ServerModule;
import com.riil.core.logger.SystemLogger;
import com.riil.core.test.BaseTest;
import com.riil.core.utils.bean.SerializeUtil;
import com.riil.core.utils.xml.AbstractTemplateParser;
import com.riil.core.utils.xml.TemplateUtil;

public class GenBinFile extends BaseTest {
	private static Logger S_LOGGER = SystemLogger.getSystemLogger(GenBinFile.class, ServerModule.ResourceModel);
	private static ConcurrentHashMap<String, ModelPojo> S_ALL_MODELPOJO = new ConcurrentHashMap<String, ModelPojo>();
	private static ConcurrentHashMap<String, ResTypePojo> S_ALL_TEMPPOJO = new ConcurrentHashMap<String, ResTypePojo>();
	private static ConcurrentHashMap<String, PolicyPojo> S_ALL_POLICYPOJO = new ConcurrentHashMap<String, PolicyPojo>();
	private static String ROOT_PATH;
	private String t_rootNode = "RIILTemplates/Template";
	private String t_metricGroupNode = t_rootNode + "/MetricGroupDef/MetricGroup";
	private String t_metricNode = t_rootNode + "/MetricDef/Metric";
	private String t_eventNode = t_rootNode + "/EventDef/Event";
	private String m_rootNode = "RIILModels/Model";
	private String m_metricBindingNode = m_rootNode + "/MetricBindingDef/MetricBinding";
	private String p_rootNode = "RIILPolicys/Policy";
	private String p_resRelNode = p_rootNode + "/PolicyResRelDef/PolicyResRel";
	private String p_metricNode = p_rootNode + "/PolicyMetricDef/PolicyMetric";
	private String p_thresholdNode = p_metricNode + "/PolicyThreshold";
	private String p_actionNode = p_rootNode + "/PolicyAction";
	private String p_eventNode = p_rootNode + "/PolicyEventDef/PolicyEvent";
	private String p_eventRuleNode = p_eventNode + "/PolicyEventRule";
	private String dc_rootNode = "CommonDicts";
	private String dc_childNode = dc_rootNode + "/CommonDict";
	private String dcp_rootNode = "DictConnProps";
	private String dcp_childNode = dcp_rootNode + "/DictConnProp";
	private String f_rootNode = "Frequencies";
	private String f_childNode = f_rootNode + "/Frequency";
	private String plugin_rootNode = "Plugins";
	private String plugin_childNode = plugin_rootNode + "/Plugin";
	private String vm_rootNode = "VendorModels";
	private String vm_childNode = vm_rootNode + "/VendorModel";
	private String mv_rootNode = "ModelVendors";
	private String mv_childNode = mv_rootNode + "/ModelVendor";
	private String ms_rootNode = "ModelSysOIDs";
	private String ms_childNode = ms_rootNode + "/ModelSysOID";

	String path = "";

	public GenBinFile() {
	}

	private String getXmlPath() {
		// return
		// this.getClass().getClassLoader().getResource("newxml").getPath();
		return getPath("newxml").getAbsolutePath();
	}

	private String getBinPath() {
		// return
		// this.getClass().getClassLoader().getResource("resmodel").getPath();
		return getPath("resmodel").getAbsolutePath();
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

	private String getTempBinPath() {
		return getBinPath() + "/system/template";
	}

	private String getModelBinPath() {
		return getBinPath() + "/system/model";
	}

	private String getPolicyBinPath() {
		return getBinPath() + "/system/policy";
	}

	private boolean isExists(String path) {
		File xml = new File(path);
		if (xml.exists()) {
			return true;
		} else {
			return false;
		}
	}

	private Map<String, String> getTempMap() {
		Map<String, String> typeMap = new HashMap<String, String>();
		typeMap.put("IsRequire", Byte.class.getName());
		typeMap.put("InUse", Byte.class.getName());
		typeMap.put("RetryTimes", Byte.class.getName());
		typeMap.put("File", Byte.class.getName());
		typeMap.put("IsMain", Byte.class.getName());
		typeMap.put("IsDisplay", Byte.class.getName());
		typeMap.put("IsImportant", Byte.class.getName());
		typeMap.put("IsPersonal", Byte.class.getName());
		typeMap.put("IsDiscovery", Byte.class.getName());
		typeMap.put("MustMonitor", Byte.class.getName());
		typeMap.put("IsMainEventCal", Byte.class.getName());
		typeMap.put("DefaultGenEvent", Byte.class.getName());
		typeMap.put("IsRecoveryEvent", Byte.class.getName());
		typeMap.put("ExpId", Byte.class.getName());
		typeMap.put("Timeout", Integer.class.getName());
		typeMap.put("TreeLevel", Integer.class.getName());
		typeMap.put("SortId", Integer.class.getName());
		typeMap.put("IsCustom", Byte.class.getName());
		return typeMap;
	}

	private Map<String, String> getModelMap() {
		Map<String, String> typeMap = new HashMap<String, String>();
		typeMap.put("IsRequire", Byte.class.getName());
		typeMap.put("InUse", Byte.class.getName());
		typeMap.put("RetryTimes", Byte.class.getName());
		typeMap.put("File", Byte.class.getName());
		typeMap.put("IsSnmp", Byte.class.getName());
		typeMap.put("IsMain", Byte.class.getName());
		typeMap.put("Timeout", Integer.class.getName());
		typeMap.put("IsCustom", Byte.class.getName());
		typeMap.put("IsInstance", Byte.class.getName());
		typeMap.put("IsInitValue", Byte.class.getName());
		typeMap.put("IsDisplayName", Byte.class.getName());
		return typeMap;
	}

	private Map<String, String> getPolicyMap() {
		Map<String, String> typeMap = new HashMap<String, String>();
		typeMap.put("IsMain", Byte.class.getName());
		typeMap.put("InUse", Byte.class.getName());
		typeMap.put("IsDefault", Byte.class.getName());
		typeMap.put("IsFactory", Byte.class.getName());
		typeMap.put("IsPublish", Byte.class.getName());
		typeMap.put("IsNewVersion", Byte.class.getName());
		typeMap.put("Time", Integer.class.getName());
		typeMap.put("Counts", Integer.class.getName());
		typeMap.put("Count", Integer.class.getName());
		typeMap.put("IsCustom", Byte.class.getName());
		return typeMap;
	}

	@SuppressWarnings("unused")
	private Map<String, String> getResTypeMap() {
		Map<String, String> typeMap = new HashMap<String, String>();
		typeMap.put("TreeLevel", Byte.class.getName());
		typeMap.put("IsMain", Byte.class.getName());
		typeMap.put("IsDisplay", Byte.class.getName());
		typeMap.put("SortId", Integer.class.getName());
		typeMap.put("IsCustom", Byte.class.getName());
		typeMap.put("IsDiscovery", Byte.class.getName());
		return typeMap;
	}

	private Map<String, String> getCommonMap() {
		Map<String, String> typeMap = new HashMap<String, String>();
		typeMap.put("SortId", Integer.class.getName());
		return typeMap;
	}

	private Map<String, String> getConnPropMap() {
		Map<String, String> typeMap = new HashMap<String, String>();
		typeMap.put("SortId", Integer.class.getName());
		typeMap.put("IsRequire", Byte.class.getName());
		typeMap.put("IsCommon", Byte.class.getName());
		return typeMap;
	}

	private Map<String, String> getFrequencyMap() {
		Map<String, String> typeMap = new HashMap<String, String>();
		typeMap.put("SortId", Integer.class.getName());
		typeMap.put("Frequency", Integer.class.getName());
		typeMap.put("Type", Byte.class.getName());
		return typeMap;
	}

	private Map<String, String> getVendorModelMap() {
		Map<String, String> typeMap = new HashMap<String, String>();
		typeMap.put("ResNumMonitor", Integer.class.getName());
		typeMap.put("ResNumUnMonitor", Integer.class.getName());
		typeMap.put("SortId", Integer.class.getName());
		return typeMap;
	}

	private void genTempBin() {

//		path = getXmlPath();
//		if (!isExists(path)) {
//			if (S_LOGGER.isDebugEnabled()) {
//				S_LOGGER.debug((path + " 目录不存在"));
//			}
//			return;
//		}
//
//		File t_xml = new File(path);
//
//		TemplateUtil<TempPojo> util = new TemplateUtil<TempPojo>();
//
//		AbstractTemplateParser parser = new AbstractTemplateParser() {
//			@Override
//			public void initParser(Digester digester) {
//				digester.addObjectCreate(t_rootNode, TempPojo.class);
//				this.createCallMethod(t_rootNode, digester);
//				digester.addObjectCreate(t_metricGroupNode, TempMetricGroupPojo.class);
//				this.createCallMethod(t_metricGroupNode, digester);
//				digester.addObjectCreate(t_metricNode, TempMetricPojo.class);
//				this.createCallMethod(t_metricNode, digester);
//				digester.addObjectCreate(t_eventNode, TempEventPojo.class);
//				this.createCallMethod(t_eventNode, digester);
//				digester.addSetNext(t_metricGroupNode, "addTempMetricGroupPojo");
//				digester.addSetNext(t_metricNode, "addTempMetricPojo");
//				digester.addSetNext(t_eventNode, "addTempEventPojo");
//			}
//		};
//		parser.setNodeType(getTempMap());
//		java.lang.String t_as[] = t_xml.list();
//		for (int i = 0; i < t_as.length; i++) {
//			java.io.File t_file = new File(t_xml, t_as[i]);
//			if (t_file.isFile()) {
//				String t_name = t_file.getName();
//				if (t_name.startsWith("RIIL_RMT")) {
//					try {
//						InputStream in = new FileInputStream(t_file);
//						TempPojo t_temp = util.loadObjectsFromTemplate(in, parser);
//						SerializeUtil.convertObjectToBin(t_temp, makeParent(getTempBinPath() + "/" + t_temp.getId()));
//						S_ALL_TEMPPOJO.put(t_temp.getId(), t_temp);
//						if (S_LOGGER.isDebugEnabled()) {
//							S_LOGGER.debug(t_temp.getId() + " 生成成功 ");
//						}
//						TempPojo tp = SerializeUtil.convertBinToObject(TempPojo.class,
//								getTempBinPath() + "/" + t_temp.getId());
//						if (S_LOGGER.isDebugEnabled()) {
//							S_LOGGER.debug(tp);
//						}
//					} catch (Exception t_e) {
//						S_LOGGER.error(("读取并序列化文件出错,文件名：" + t_file.getAbsoluteFile()), t_e);
//					}
//				}
//			}
//		}
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

	@Test
	private void genModelBin() {

		path = getXmlPath();
		if (!isExists(path)) {
			if (S_LOGGER.isDebugEnabled()) {
				S_LOGGER.debug((path + " 目录不存在"));
			}
			return;
		}

		File t_xml = new File(path);

		TemplateUtil<ModelPojo> util = new TemplateUtil<ModelPojo>();

		AbstractTemplateParser parser = new AbstractTemplateParser() {
			@Override
			public void initParser(Digester digester) {
				digester.addObjectCreate(m_rootNode, ModelPojo.class);
				this.createCallMethod(m_rootNode, digester);
				digester.addObjectCreate(m_metricBindingNode, ModelMetricBindingPojo.class);
				this.createCallMethod(m_metricBindingNode, digester);
				digester.addSetNext(m_metricBindingNode, "addModelMetricBindingPojo");
			}
		};
		parser.setNodeType(getModelMap());
		java.lang.String t_as[] = t_xml.list();
		for (int i = 0; i < t_as.length; i++) {
			java.io.File t_file = new File(t_xml, t_as[i]);
			if (t_file.isFile()) {
				String t_name = t_file.getName();
				if (t_name.startsWith("RIIL_RMM")) {
					try {
						InputStream in = new FileInputStream(t_file);
						ModelPojo t_model = util.loadObjectsFromTemplate(in, parser);

						SerializeUtil
								.convertObjectToBin(t_model, makeParent(getModelBinPath() + "/" + t_model.getId()));
						S_ALL_MODELPOJO.put(t_model.getId(), t_model);
						if (S_LOGGER.isDebugEnabled()) {
							S_LOGGER.debug(t_model.getId() + " 生成成功 ");
						}

						ModelPojo mp;
						mp = SerializeUtil.convertBinToObject(ModelPojo.class, makeParent(getModelBinPath() + "/"
								+ t_model.getId()));
						if (S_LOGGER.isDebugEnabled()) {
							S_LOGGER.debug(mp);
						}
					} catch (Exception t_e) {
						S_LOGGER.error(("读取并序列化文件出错,文件名：" + t_file.getAbsoluteFile()), t_e);
					}
				}
			}
		}
	}

	private void genPolicyBin() {

		path = getXmlPath();
		if (!isExists(path)) {
			if (S_LOGGER.isDebugEnabled()) {
				S_LOGGER.debug((path + " 目录不存在"));
			}
			return;
		}

		File t_xml = new File(path);

		TemplateUtil<PolicyResPojo> util = new TemplateUtil<PolicyResPojo>();

		AbstractTemplateParser parser = new AbstractTemplateParser() {
			@Override
			public void initParser(Digester digester) {
				digester.addObjectCreate(p_rootNode, PolicyResPojo.class);
				this.createCallMethod(p_rootNode, digester);
				digester.addObjectCreate(p_resRelNode, PolicyResRelPojo.class);
				this.createCallMethod(p_resRelNode, digester);
				digester.addObjectCreate(p_metricNode, PolicyMetricPojo.class);
				this.createCallMethod(p_metricNode, digester);
				digester.addObjectCreate(p_thresholdNode, PolicyThresholdPojo.class);
				this.createCallMethod(p_thresholdNode, digester);
				digester.addObjectCreate(p_actionNode, PolicyActionPojo.class);
				this.createCallMethod(p_actionNode, digester);
				digester.addObjectCreate(p_eventNode, PolicyEventPojo.class);
				this.createCallMethod(p_eventNode, digester);
				digester.addObjectCreate(p_eventRuleNode, PolicyEventRulePojo.class);
				this.createCallMethod(p_eventRuleNode, digester);
				digester.addSetNext(p_resRelNode, "addPolicyResRelPojo");
				digester.addSetNext(p_metricNode, "addPolicyMetricPojo");
				digester.addSetNext(p_thresholdNode, "addPolicyThresholdPojo");
				digester.addSetNext(p_eventNode, "addPolicyEventPojo");
				digester.addSetNext(p_eventRuleNode, "addPolicyEventRulePojo");
				digester.addSetNext(p_actionNode, "addPolicyActionPojo");
			}
		};
		parser.setNodeType(getPolicyMap());
		java.lang.String t_as[] = t_xml.list();
		for (int i = 0; i < t_as.length; i++) {
			java.io.File t_file = new File(t_xml, t_as[i]);
			if (t_file.isFile()) {
				String t_name = t_file.getName();
				if (t_name.startsWith("RIIL_RMP")) {
					try {
						InputStream in = new FileInputStream(t_file);
						PolicyResPojo t_policy = util.loadObjectsFromTemplate(in, parser);

						SerializeUtil.convertObjectToBin(t_policy,
								makeParent(getPolicyBinPath() + "/" + t_policy.getId()));
						S_ALL_POLICYPOJO.put(t_policy.getId(), t_policy);
						if (S_LOGGER.isDebugEnabled()) {
							S_LOGGER.debug(t_policy.getId() + " 生成成功 ");
						}

						PolicyResPojo prp;
						prp = SerializeUtil.convertBinToObject(PolicyResPojo.class,
								getPolicyBinPath() + "/" + t_policy.getId());
						if (S_LOGGER.isDebugEnabled()) {
							S_LOGGER.debug(prp);
						}
					} catch (Exception t_e) {
						S_LOGGER.error(("读取并序列化文件出错,文件名：" + t_file.getAbsoluteFile()), t_e);
					}
				}
			}
		}
	}

	@SuppressWarnings("rawtypes")
	private void genCommonBin() {

		path = getXmlPath();
		if (!isExists(path)) {
			if (S_LOGGER.isDebugEnabled()) {
				S_LOGGER.debug((path + " 目录不存在"));
			}
			return;
		}

		File t_xml = new File(path);

		TemplateUtil<ArrayList> util = new TemplateUtil<ArrayList>();
		AbstractTemplateParser parser = new AbstractTemplateParser() {
			@Override
			public void initParser(Digester digester) {
				digester.addObjectCreate(dc_rootNode, ArrayList.class);
				this.createCallMethod(dc_rootNode, digester);
				digester.addObjectCreate(dc_childNode, DictCommonPojo.class);
				this.createCallMethod(dc_childNode, digester);
				digester.addSetNext(dc_childNode, "add");
			}
		};
		parser.setNodeType(getCommonMap());
		java.lang.String t_as[] = t_xml.list();
		for (int i = 0; i < t_as.length; i++) {
			java.io.File t_file = new File(t_xml, t_as[i]);
			if (t_file.isFile()) {
				String t_name = t_file.getName();
				if (t_name.equals("RIIL_Dict_Common.xml")) {
					try {
						InputStream in = new FileInputStream(t_file);
						ArrayList list = util.loadObjectsFromTemplate(in, parser);
						SerializeUtil.convertObjectToBin(list, getBinPath() + "/system/DictCommonPojo");
						if (S_LOGGER.isDebugEnabled()) {
							S_LOGGER.debug("DictCommonPojo 生成成功 ");
						}
						break;
					} catch (Exception t_e) {
						S_LOGGER.error(("读取并序列化文件出错,文件名：" + t_file.getAbsoluteFile()), t_e);
					}
				}
			}
		}
		readCommonBin();
	}

	@SuppressWarnings("rawtypes")
	private void readCommonBin() {
		ArrayList list = new ArrayList<DictCommonPojo>();
		try {
			list = SerializeUtil.convertBinToObject(ArrayList.class, getBinPath() + "/system/DictCommonPojo");
		} catch (IOException e) {
			e.printStackTrace();
		}
		if (S_LOGGER.isDebugEnabled()) {
			S_LOGGER.debug(" result : " + list.size());
		}
		for (int i = 0; i < list.size(); i++) {
			DictCommonPojo dcp = (DictCommonPojo) list.get(i);
			if (S_LOGGER.isDebugEnabled()) {
				S_LOGGER.debug("DictCommonPojo [" + i + "] : " + dcp);
			}
		}
	}

	@SuppressWarnings("rawtypes")
	private void genFrequencyBin() {

		path = getXmlPath();
		if (!isExists(path)) {
			if (S_LOGGER.isDebugEnabled()) {
				S_LOGGER.debug((path + " 目录不存在"));
			}
			return;
		}

		File t_xml = new File(path);

		TemplateUtil<ArrayList> util = new TemplateUtil<ArrayList>();
		AbstractTemplateParser parser = new AbstractTemplateParser() {
			@Override
			public void initParser(Digester digester) {
				digester.addObjectCreate(f_rootNode, ArrayList.class);
				this.createCallMethod(f_rootNode, digester);
				digester.addObjectCreate(f_childNode, DictCollFrequencyPojo.class);
				this.createCallMethod(f_childNode, digester);
				digester.addSetNext(f_childNode, "add");
			}
		};
		parser.setNodeType(getFrequencyMap());
		java.lang.String t_as[] = t_xml.list();
		for (int i = 0; i < t_as.length; i++) {
			java.io.File t_file = new File(t_xml, t_as[i]);
			if (t_file.isFile()) {
				String t_name = t_file.getName();
				if (t_name.equals("RIIL_Dict_Coll_Frequency.xml")) {
					try {
						InputStream in = new FileInputStream(t_file);
						ArrayList list;
						list = util.loadObjectsFromTemplate(in, parser);
						SerializeUtil.convertObjectToBin(list, getBinPath() + "/system/DictCollFrequencyPojo");
						if (S_LOGGER.isDebugEnabled()) {
							S_LOGGER.debug("DictCollFrequencyPojo 生成成功 ");
						}
						break;
					} catch (Exception t_e) {
						S_LOGGER.error(("读取并序列化文件出错,文件名：" + t_file.getAbsoluteFile()), t_e);
					}
				}
			}
		}
		readFrequencyBin();
	}

	@SuppressWarnings("rawtypes")
	private void readFrequencyBin() {
		ArrayList list = new ArrayList<DictCollFrequencyPojo>();
		try {
			list = SerializeUtil.convertBinToObject(ArrayList.class, getBinPath() + "/system/DictCollFrequencyPojo");
		} catch (IOException e) {
			e.printStackTrace();
		}
		if (S_LOGGER.isDebugEnabled()) {
			S_LOGGER.debug(" result : " + list.size());
		}
		for (int i = 0; i < list.size(); i++) {
			DictCollFrequencyPojo dcfpo = (DictCollFrequencyPojo) list.get(i);
			if (S_LOGGER.isDebugEnabled()) {
				S_LOGGER.debug("DictCollFrequencyPojo [" + i + "] : " + dcfpo);
			}
		}
	}

	@SuppressWarnings("rawtypes")
	private void genConnPropBin() {

		path = getXmlPath();
		if (!isExists(path)) {
			if (S_LOGGER.isDebugEnabled()) {
				S_LOGGER.debug((path + " 目录不存在"));
			}
			return;
		}

		File t_xml = new File(path);

		TemplateUtil<ArrayList> util = new TemplateUtil<ArrayList>();
		AbstractTemplateParser parser = new AbstractTemplateParser() {
			@Override
			public void initParser(Digester digester) {
				digester.addObjectCreate(dcp_rootNode, ArrayList.class);
				this.createCallMethod(dcp_rootNode, digester);
				digester.addObjectCreate(dcp_childNode, DictResConnPropPojo.class);
				this.createCallMethod(dcp_childNode, digester);
				digester.addSetNext(dcp_childNode, "add");
			}
		};
		parser.setNodeType(getConnPropMap());
		java.lang.String t_as[] = t_xml.list();
		for (int i = 0; i < t_as.length; i++) {
			java.io.File t_file = new File(t_xml, t_as[i]);
			if (t_file.isFile()) {
				String t_name = t_file.getName();
				if (t_name.equals("RIIL_Dict_Conn_Prop.xml")) {
					try {
						InputStream in = new FileInputStream(t_file);
						ArrayList list;
						list = util.loadObjectsFromTemplate(in, parser);
						SerializeUtil.convertObjectToBin(list, getBinPath() + "/system/DictResConnPropPojo");
						if (S_LOGGER.isDebugEnabled()) {
							S_LOGGER.debug("DictResConnPropPojo 生成成功 ");
						}
						break;
					} catch (Exception t_e) {
						S_LOGGER.error(("读取并序列化文件出错,文件名：" + t_file.getAbsoluteFile()), t_e);
					}
				}
			}
		}
		readConnPropBin();
	}

	@SuppressWarnings("rawtypes")
	private void readConnPropBin() {
		ArrayList list = new ArrayList<DictResConnPropPojo>();
		try {
			list = SerializeUtil.convertBinToObject(ArrayList.class, getBinPath() + "/system/DictResConnPropPojo");
		} catch (IOException e) {
			e.printStackTrace();
		}
		if (S_LOGGER.isDebugEnabled()) {
			S_LOGGER.debug(" result : " + list.size());
		}
		for (int i = 0; i < list.size(); i++) {
			DictResConnPropPojo drcppo = (DictResConnPropPojo) list.get(i);
			if (S_LOGGER.isDebugEnabled()) {
				S_LOGGER.debug("DictResConnPropPojo [" + i + "] : " + drcppo);
			}
		}
	}

	@SuppressWarnings("rawtypes")
	private void genPluginBin() {

		path = getXmlPath();
		if (!isExists(path)) {
			if (S_LOGGER.isDebugEnabled()) {
				S_LOGGER.debug((path + " 目录不存在"));
			}
			return;
		}

		File t_xml = new File(path);

		TemplateUtil<ArrayList> util = new TemplateUtil<ArrayList>();
		AbstractTemplateParser parser = new AbstractTemplateParser() {
			@Override
			public void initParser(Digester digester) {
				digester.addObjectCreate(plugin_rootNode, ArrayList.class);
				this.createCallMethod(plugin_rootNode, digester);
				digester.addObjectCreate(plugin_childNode, DictPluginPojo.class);
				this.createCallMethod(plugin_childNode, digester);
				digester.addSetNext(plugin_childNode, "add");
			}
		};
		java.lang.String t_as[] = t_xml.list();
		for (int i = 0; i < t_as.length; i++) {
			java.io.File t_file = new File(t_xml, t_as[i]);
			if (t_file.isFile()) {
				String t_name = t_file.getName();
				if (t_name.equals("RIIL_Dict_Plugin.xml")) {
					try {
						InputStream in = new FileInputStream(t_file);
						ArrayList list = util.loadObjectsFromTemplate(in, parser);
						SerializeUtil.convertObjectToBin(list, getBinPath() + "/system/DictPluginPojo");
						if (S_LOGGER.isDebugEnabled()) {
							S_LOGGER.debug("DictPluginPojo 生成成功 ");
						}
						break;
					} catch (Exception t_e) {
						S_LOGGER.error(("读取并序列化文件出错,文件名：" + t_file.getAbsoluteFile()), t_e);
					}
				}
			}
		}
		readPluginBin();
	}

	@SuppressWarnings("rawtypes")
	private void readPluginBin() {
		ArrayList list = new ArrayList<DictPluginPojo>();
		try {
			list = SerializeUtil.convertBinToObject(ArrayList.class, getBinPath() + "/system/DictPluginPojo");
		} catch (IOException e) {
			e.printStackTrace();
		}
		if (S_LOGGER.isDebugEnabled()) {
			S_LOGGER.debug(" result : " + list.size());
		}
		for (int i = 0; i < list.size(); i++) {
			DictPluginPojo dppo = (DictPluginPojo) list.get(i);
			if (S_LOGGER.isDebugEnabled()) {
				S_LOGGER.debug("DictPluginPojo [" + i + "] : " + dppo);
			}
		}
	}

	@SuppressWarnings("rawtypes")
	private void genVendorModelBin() {

		path = getXmlPath();
		if (!isExists(path)) {
			if (S_LOGGER.isDebugEnabled()) {
				S_LOGGER.debug((path + " 目录不存在"));
			}
			return;
		}

		File t_xml = new File(path);

		TemplateUtil<ArrayList> util = new TemplateUtil<ArrayList>();
		AbstractTemplateParser parser = new AbstractTemplateParser() {
			@Override
			public void initParser(Digester digester) {
				digester.addObjectCreate(vm_rootNode, ArrayList.class);
				this.createCallMethod(vm_rootNode, digester);
				digester.addObjectCreate(vm_childNode, VendorModelPojo.class);
				this.createCallMethod(vm_childNode, digester);
				digester.addSetNext(vm_childNode, "add");
			}
		};
		parser.setNodeType(getVendorModelMap());
		java.lang.String t_as[] = t_xml.list();
		for (int i = 0; i < t_as.length; i++) {
			java.io.File t_file = new File(t_xml, t_as[i]);
			if (t_file.isFile()) {
				String t_name = t_file.getName();
				if (t_name.equals("RIIL_Dict_Vendor_Model.xml")) {
					try {
						InputStream in = new FileInputStream(t_file);
						ArrayList list;
						list = util.loadObjectsFromTemplate(in, parser);
						SerializeUtil.convertObjectToBin(list, getBinPath() + "/system/VendorModelPojo");
						if (S_LOGGER.isDebugEnabled()) {
							S_LOGGER.debug("VendorModelPojo 生成成功 ");
						}
						break;
					} catch (Exception t_e) {
						S_LOGGER.error(("读取并序列化文件出错,文件名：" + t_file.getAbsoluteFile()), t_e);
					}
				}
			}
		}
		readVendorModelBin();
	}

	@SuppressWarnings("rawtypes")
	private void readVendorModelBin() {
		ArrayList list = new ArrayList<VendorModelPojo>();
		try {
			list = SerializeUtil.convertBinToObject(ArrayList.class, getBinPath() + "/system/VendorModelPojo");
		} catch (IOException e) {
			e.printStackTrace();
		}
		if (S_LOGGER.isDebugEnabled()) {
			S_LOGGER.debug(" result : " + list.size());
		}
		for (int i = 0; i < list.size(); i++) {
			VendorModelPojo dvpo = (VendorModelPojo) list.get(i);
			if (S_LOGGER.isDebugEnabled()) {
				S_LOGGER.debug("VendorModelPojo [" + i + "] : " + dvpo);
			}
		}
	}

	@SuppressWarnings("rawtypes")
	private void genModelVendorBin() {
//
//		path = getXmlPath();
//		if (!isExists(path)) {
//			if (S_LOGGER.isDebugEnabled()) {
//				S_LOGGER.debug((path + " 目录不存在"));
//			}
//			return;
//		}
//
//		File t_xml = new File(path);
//
//		TemplateUtil<ArrayList> util = new TemplateUtil<ArrayList>();
//		AbstractTemplateParser parser = new AbstractTemplateParser() {
//			@Override
//			public void initParser(Digester digester) {
//				digester.addObjectCreate(mv_rootNode, ArrayList.class);
//				this.createCallMethod(mv_rootNode, digester);
//				digester.addObjectCreate(mv_childNode, ModelVendorPojo.class);
//				this.createCallMethod(mv_childNode, digester);
//				digester.addSetNext(mv_childNode, "add");
//			}
//		};
//		java.lang.String t_as[] = t_xml.list();
//		for (int i = 0; i < t_as.length; i++) {
//			java.io.File t_file = new File(t_xml, t_as[i]);
//			if (t_file.isFile()) {
//				String t_name = t_file.getName();
//				if (t_name.equals("RIIL_Dict_Model_Vendor.xml")) {
//					try {
//						InputStream in = new FileInputStream(t_file);
//						ArrayList list;
//						list = util.loadObjectsFromTemplate(in, parser);
//						SerializeUtil.convertObjectToBin(list, getBinPath() + "/system/ModelVendorPojo");
//						if (S_LOGGER.isDebugEnabled()) {
//							S_LOGGER.debug("ModelVendorPojo 生成成功 ");
//						}
//						break;
//					} catch (Exception t_e) {
//						S_LOGGER.error(("读取并序列化文件出错,文件名：" + t_file.getAbsoluteFile()), t_e);
//					}
//				}
//			}
//		}
//		readModelVendorBin();
	}

	@SuppressWarnings("rawtypes")
	private void readModelVendorBin() {
//		ArrayList list = new ArrayList<ModelVendorPojo>();
//		try {
//			list = SerializeUtil.convertBinToObject(ArrayList.class, getBinPath() + "/system/ModelVendorPojo");
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//		if (S_LOGGER.isDebugEnabled()) {
//			S_LOGGER.debug(" result : " + list.size());
//		}
//		for (int i = 0; i < list.size(); i++) {
//			ModelVendorPojo dvpo = (ModelVendorPojo) list.get(i);
//			if (S_LOGGER.isDebugEnabled()) {
//				S_LOGGER.debug("ModelVendorPojo [" + i + "] : " + dvpo);
//			}
//		}
	}

	@SuppressWarnings("rawtypes")
	private void genModelSysoidBin() {

		path = getXmlPath();
		if (!isExists(path)) {
			if (S_LOGGER.isDebugEnabled()) {
				S_LOGGER.debug((path + " 目录不存在"));
			}
			return;
		}

		File t_xml = new File(path);

		TemplateUtil<ArrayList> util = new TemplateUtil<ArrayList>();
		AbstractTemplateParser parser = new AbstractTemplateParser() {
			@Override
			public void initParser(Digester digester) {
				digester.addObjectCreate(ms_rootNode, ArrayList.class);
				this.createCallMethod(ms_rootNode, digester);
				digester.addObjectCreate(ms_childNode, ModelSysoidPojo.class);
				this.createCallMethod(ms_childNode, digester);
				digester.addSetNext(ms_childNode, "add");
			}
		};
		java.lang.String t_as[] = t_xml.list();
		for (int i = 0; i < t_as.length; i++) {
			java.io.File t_file = new File(t_xml, t_as[i]);
			if (t_file.isFile()) {
				String t_name = t_file.getName();
				if (t_name.equals("RIIL_Dict_Model_Sysoid.xml")) {
					try {
						InputStream in = new FileInputStream(t_file);
						ArrayList list;
						list = util.loadObjectsFromTemplate(in, parser);
						SerializeUtil.convertObjectToBin(list, getBinPath() + "/system/ModelSysoidPojo");
						if (S_LOGGER.isDebugEnabled()) {
							S_LOGGER.debug("ModelSysoidPojo 生成成功 ");
						}
						break;
					} catch (Exception t_e) {
						S_LOGGER.error(("读取并序列化文件出错,文件名：" + t_file.getAbsoluteFile()), t_e);
					}
				}
			}
		}
		readModelSysoidBin();
	}

	@SuppressWarnings("rawtypes")
	private void readModelSysoidBin() {
		ArrayList list = new ArrayList<ModelSysoidPojo>();
		try {
			list = SerializeUtil.convertBinToObject(ArrayList.class, getBinPath() + "/system/ModelSysoidPojo");
		} catch (IOException e) {
			e.printStackTrace();
		}
		for (int i = 0; i < list.size(); i++) {
			ModelSysoidPojo dvpo = (ModelSysoidPojo) list.get(i);
			if (S_LOGGER.isDebugEnabled()) {
				S_LOGGER.debug("ModelSysoidPojo [" + i + "] : " + dvpo);
			}
		}
	}

	public static void main(String[] args) throws IOException {
		if (args != null && args.length > 0) {
			ROOT_PATH = args[0];
		}
		SystemLogger.changeLogLevel(Level.ERROR);
		GenBinFile gen = new GenBinFile();
		gen.genTempBin();
		gen.genModelBin();
		gen.genPolicyBin();

		gen.genVendorModelBin();
		gen.genModelSysoidBin();
		gen.genModelVendorBin();
		gen.genCommonBin();
		gen.genFrequencyBin();
		gen.genConnPropBin();
		gen.genPluginBin();

		GenPolicyScriptBinFile genFile = new GenPolicyScriptBinFile(ROOT_PATH);
		genFile.genBinFile4PolicyScript();
		GenPolicyLogBinFile genLogFile = new GenPolicyLogBinFile(ROOT_PATH);
		genLogFile.genBinFile4PolicyLog();
		GenSnmpTrapPolicyBinFile genTrapFile = new GenSnmpTrapPolicyBinFile(ROOT_PATH);
		genTrapFile.genBinFile4PolicyLog();
	}

	public static void main1(String[] args) {
		GenBinFile gen = new GenBinFile();
		gen.readCommonBin();
	}

}
