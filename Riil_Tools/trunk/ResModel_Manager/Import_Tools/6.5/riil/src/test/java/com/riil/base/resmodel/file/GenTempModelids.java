package com.riil.base.resmodel.file;

import java.util.HashMap;
import java.util.Map;

import org.apache.log4j.Logger;

import com.riil.base.resmodel.IModelService;
import com.riil.base.resmodel.IResTypeService;
import com.riil.core.constant.Constants;
import com.riil.core.logger.SystemLogger;

/**
 * 测试联调用的假数据 <br>
 * <p>
 * Create on : 2011-9-21<br>
 * <p>
 * </p>
 * <br>
 * 
 * @author chenjt<br>
 * @version riil_resource_model_impl v1.0
 *          <p>
 *          <br>
 *          <strong>Modify History:</strong><br>
 *          user modify_date modify_content<br>
 *          -------------------------------------------<br>
 *          <br>
 */
public class GenTempModelids {
	private static Logger S_LOGGER = SystemLogger.getSystemLogger(GenTempModelids.class, Constants.LOG_RESOURCE_MODEL);
	public static String S_LINK_PATH = "Z:/RIIL_SVN/RIIL6.0_Monitor_Server/trunk/source/conf";
	private static final Map<String, String> map = new HashMap<String, String>();

	static IResTypeService t_resTypeService = null;
	static IModelService t_modelService = null;
	
	static {
		map.put("RIIL_RMT_Base", "tempRMMBase.bin");
		map.put("RIIL_RMT_Host", "tempRMMHost.bin");
		map.put("RIIL_RMT_Host_Windows", "tempRMMHostWindows.bin");
		map.put("RIIL_RMT_CPU", "tempRMMCPU.bin");
		map.put("RIIL_RMT_CPU_Windows", "tempRMMCPUWindows.bin");
		map.put("RIIL_RMT_FileSystem", "tempRMMFileSystem.bin");
		map.put("RIIL_RMT_FileSystem_Windows", "tempRMMFileSystemWindows.bin");
		map.put("RIIL_RMM_Host_Windows_Snmp", "modelHostWindowsSnmp.bin");
		map.put("RIIL_RMM_CPU_Windows_Snmp", "modelCPUWindowsSnmp.bin");
		map.put("RIIL_RMM_FileSystem_Windows_Snmp", "modelFileSystemWindowsSnmp.bin");
		map.put("RIIL_RMP_Policy_Host_Windows_Snmp_Default", "policyResHostWindowsSnmp.bin");
		map.put("RIIL_RMP_Policy_CPU_Windows_Snmp_Default", "policyResCPUWindowsSnmp.bin");
		map.put("RIIL_RMP_Policy_FileSystem_Windows_Snmp_Default", "policyResFileSystemWindowsSnmp.bin");
	}

	public static void main(String[] args) {
		setlistModelIDSforTemp();
	}

	public static void setlistModelIDSforTemp() {
//		try {
//			
//			List<Model> models = getModelService().getAllModel();
//			for (Model mpojo : models) {
//				String tempid = mpojo.getMoniTempId();
//				Template tpojo = getTemplateService().getTemplate(tempid);
//				if (tpojo == null)
//					continue;
////				tpojo.addModelInfoPojo(mpojo); //todo: check how to use temp's modelIds 
//				try {
//					SerializeUtil.convertObjectToBin(tpojo, S_LINK_PATH + "/bin/" + map.get(tpojo.getId()));
//				} catch (IOException e) {
//					e.printStackTrace();
//				}
//				if (S_LOGGER.isDebugEnabled()) {
//					S_LOGGER.debug(" temp: " + tpojo.getId() + " add a model: " + mpojo.getId());
//				}
//			}
//
//		} catch (ServiceException e) {
//			e.printStackTrace();
//		}
	}
}
