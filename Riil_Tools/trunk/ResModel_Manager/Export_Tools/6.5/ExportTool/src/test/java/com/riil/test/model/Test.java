    package com.riil.test.model;  
    import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.apache.commons.dbcp.BasicDataSource;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.riil.base.pojo.dict.DictPojo;
import com.riil.base.resmodel.pojo.base.MetricBasePojo;
import com.riil.base.resmodel.pojo.base.ResTypePojo;
import com.riil.base.resmodel.pojo.mmodel.CollectCmd;
import com.riil.base.resmodel.pojo.mmodel.CollectCmds;
import com.riil.base.resmodel.pojo.mmodel.Filter;
import com.riil.base.resmodel.pojo.mmodel.ModelMetricBindingPojo;
import com.riil.base.resmodel.pojo.mmodel.ModelPojo;
import com.riil.base.resmodel.pojo.mmodel.Processor;
import com.riil.base.resmodel.pojo.mmodel.Support;
import com.riil.base.resmodel.pojo.policy.PolicyResPojo;
import com.riil.base.utils.GenBinFile;
import com.riil.core.utils.bean.SerializeUtil;
import com.riil.resmodel.Main;
import com.riil.resmodel.services.IResModelService;
import com.riil.resmodel.services.impl.ResModelService;
      
      
    public class Test {  
    	
    	private static String export_model_url;
    	private static String export_policy_url;
    	private static String export_resType_url;
    	private static String export_metricBase_url;
    	private static String export_dict_url;
    	private static ApplicationContext context;
        /** 
         * @param args 
         * @throws SQLException 
         * @throws IOException 
         */  
        public static void main(String[] args) throws SQLException, IOException {
        	init();
        	genModelBin();
        	genPolicyBin();
        	genResTypeBin();
        	genMetricBaseBin();
        	genDictBin();
//        	testModelBin();
        }
        
        
        
        private static void genModelBin() throws SQLException{
        	ResModelService resModelService = (ResModelService) context.getBean(IResModelService.S_SERVICE_ID);
            List<ModelPojo> t_modelBaseList = resModelService.getModelList();
            for (ModelPojo t_modelPojo : t_modelBaseList) {
           	 	GenBinFile genBin = new GenBinFile();
           	 	File t_file = new File (export_model_url + t_modelPojo.getId());
           	 	genBin.genBinFile(t_modelPojo, t_file);	
			}
        }
        
        
        private static void genResTypeBin() throws SQLException{
        	ResModelService resModelService = (ResModelService) context.getBean(IResModelService.S_SERVICE_ID);
        	ArrayList<ResTypePojo> t_resTypeList = (ArrayList<ResTypePojo>) resModelService.getResTypeList();
        	GenBinFile genBin = new GenBinFile();
   	 		File t_file = new File (export_resType_url + "resType");
   	 		genBin.genBinFile(t_resTypeList, t_file);	
        }
        
        private static void genPolicyBin()throws SQLException{
        	ResModelService resModelService = (ResModelService) context.getBean(IResModelService.S_SERVICE_ID);
        	List<PolicyResPojo> t_policyList = resModelService.getPolicyList();
        	for (PolicyResPojo t_policy : t_policyList) {
              	 GenBinFile genBin = new GenBinFile();
      			 File t_file = new File (export_policy_url + t_policy.getId());
      			genBin.genBinFile(t_policy, t_file);	
   			}
        }
        
        private static void genMetricBaseBin()throws SQLException{
        	ResModelService resModelService = (ResModelService) context.getBean(IResModelService.S_SERVICE_ID);
        	ArrayList<MetricBasePojo> t_metricBaseList = (ArrayList<MetricBasePojo>) resModelService.getMetricBaseList();
        	GenBinFile genBin = new GenBinFile();
   	 		File t_file = new File (export_metricBase_url + "metric");
   	 		genBin.genBinFile(t_metricBaseList, t_file);	
        }
        
        private static void genDictBin()throws SQLException{
        	ResModelService resModelService = (ResModelService) context.getBean(IResModelService.S_SERVICE_ID);
        	DictPojo t_dict = resModelService.getDict();
          	GenBinFile genBin = new GenBinFile();
  			File t_file = new File (export_dict_url +"dict");
  			genBin.genBinFile(t_dict, t_file);	
        }
        
		private static void init() {
			context = new ClassPathXmlApplicationContext("applicationcontext.xml");  
			Properties props = new Properties();
        	InputStream t_resourceAsStream = Test.class.getClassLoader().getResourceAsStream("conf.properties");
        	try {
				props.load(t_resourceAsStream);
			} catch (Exception e) {
				e.printStackTrace();
			} 
        	export_model_url = props.getProperty("export_url")+"model/";
        	export_policy_url = props.getProperty("export_url")+"policy/";
        	export_resType_url = props.getProperty("export_url")+"resType/";
        	export_metricBase_url = props.getProperty("export_url")+"metric/"; 
        	export_dict_url = props.getProperty("export_url")+"dict/"; 
             BasicDataSource t_dataSource = (BasicDataSource) context.getBean("dataSource");
             t_dataSource.setUrl(props.getProperty("mysql.database.url"));
             t_dataSource.setUsername(props.getProperty("mysql.database.username"));
             t_dataSource.setPassword(props.getProperty("mysql.database.password"));
             t_dataSource.setDriverClassName(props.getProperty("mysql.database.driver"));
		}  
		
		
		private static void testModelBin() throws IOException{
//        	File t_binFile = new File("/home/alexhu/share/RIIL_RMM_CHILD_HARDWARE_CPU_WINDOWS_AGENT");
        	File t_binFile = new File("/home/alexhu/deve/model/test_model/bin/model/RIIL_RMM_MIDDLEWARE_TLQ");
        	ModelPojo t_modelPojo = SerializeUtil.convertBinToObject(ModelPojo.class, t_binFile);
        	System.out.println(t_modelPojo.getId());
        	System.out.println(t_modelPojo.getResTypeId());
        	System.out.println(t_modelPojo.getName());
        	System.out.println(t_modelPojo.getDesc());
        	System.out.println(t_modelPojo.getIsSnmp());
        	System.out.println(t_modelPojo.getPluginId());
        	System.out.println(t_modelPojo.getMainModelId());
        	System.out.println(t_modelPojo.getIsMain());
        	System.out.println(t_modelPojo.getProcessor());
        	
        	List<ModelMetricBindingPojo> t_list = t_modelPojo.getListModelMetricBindingPojo();
        	System.out.println("---------------------------ModelMetricBindingPojo-------------------------------");
        	for (ModelMetricBindingPojo t_bindingPojo : t_list) {
        		System.out.println("-------------------------------"+t_bindingPojo.getId()+"------------------------------------");
        		System.out.println(t_bindingPojo.getId());
        		System.out.println(t_bindingPojo.getIsInstance());
        		System.out.println(t_bindingPojo.getIsInitValue());
        		System.out.println(t_bindingPojo.getIsDisplayName());
        		List<CollectCmds> t_collectCmdsGroup = t_bindingPojo.getCollectCmdsGroup();
        		for (CollectCmds t_cmds : t_collectCmdsGroup) {
        			System.out.println("cmds id="+t_cmds.getId());
        			System.out.println("cmds IsDefault="+t_cmds.getIsDefault());
        			System.out.println("cmds IsDynamic="+t_cmds.getIsDynamic());
        			List<String> t_connectionProtocols = t_cmds.getConnectionProtocols();
        			for (String t_connectionProtocol : t_connectionProtocols) {
        				System.out.println("cmds ConnectionProtocol="+t_connectionProtocol);
					}
        			Processor t_processor = t_cmds.getProcessor();
        			if(t_processor != null){
        				String t_className = t_processor.getClassName();
        				String t_method = t_processor.getMethod();
        				System.out.println("cmds Processor ClassName="+t_className);
        				System.out.println("cmds Processor Method="+t_method);
        			}
        			List<String> t_parameterList = t_cmds.getParameter();
        			for (String t_parameter : t_parameterList) {
        				System.out.println("cmds Processor Parameter="+t_parameter);
					}
        			List<Support> t_supports = t_cmds.getSupports();
        			for (Support t_support : t_supports) {
        				System.out.println("cmds Supports Id="+t_support.getId());
        				System.out.println("cmds Supports Version="+t_support.getVersion());
        				System.out.println("cmds Supports Rel="+t_support.getRel());
					}
        			
        			List<CollectCmd> t_collectCmds = t_cmds.getCollectCmds();
        			for (CollectCmd t_collectCmd : t_collectCmds) {
        				System.out.println("cmd Id="+t_collectCmd.getId());
        				System.out.println("cmd index="+t_collectCmd.getIndex());
        				System.out.println("cmd Protocol="+t_collectCmd.getProtocol());
        				System.out.println("cmd getCmd="+t_collectCmd.getCmd());
        				List<Filter> t_filters = t_collectCmd.getFilters();
        				if(t_filters!=null){
        					for (Filter t_filter : t_filters) {
        						System.out.println("cmd Filter Id="+t_filter.getId());
        						System.out.println("cmd Filter CmdParameterName="+t_filter.getCmdParameterName());
        						System.out.println("cmd Filter Dependecy="+t_filter.getDependecy());
        						System.out.println("cmd Filter Row="+t_filter.getRow());
        						System.out.println("cmd Filter Column="+t_filter.getColumn());
        					}
        				}
        				Map<String, String> t_properties = t_collectCmd.getProperties();
        				if(t_properties!=null){
        					Iterator<String> t_iterator = t_properties.keySet().iterator();
        					while (t_iterator.hasNext()) {
								String t_key = (String) t_iterator.next();
								String t_value = t_properties.get(t_key);
								System.out.println("cmd Properties key="+t_key+",value="+t_value);
							}
        				}
					}
				}
        		Processor t_processor = t_bindingPojo.getProcessor();
        		System.out.println(t_processor.getClassName());
        		System.out.println(t_processor.getMethod());
        		List<String> t_parameters = t_bindingPojo.getParameter();
        		for (String t_parameter : t_parameters) {
					System.out.println(t_parameter);
				}
			}
        }
    }  