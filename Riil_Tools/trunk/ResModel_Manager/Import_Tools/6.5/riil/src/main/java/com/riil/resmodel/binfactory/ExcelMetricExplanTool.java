package com.riil.resmodel.binfactory;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.riil.base.pojo.enums.Enum4ResType.DevType;
import com.riil.base.resmodel.pojo.MetricExplainPojo;
import com.riil.base.resmodel.pojo.MetricExplanationPojo;
import com.riil.core.utils.bean.SerializeUtil;

public class ExcelMetricExplanTool {
    public ExcelMetricExplanTool() {
    }
    
    public static void main(String[] args) throws Exception {
        
        //普通的
        File file = new File("/home/liyimin/work/MetricExplain/metricExplanation.xlsx");

        Map<String,List<MetricExplanationPojo>> metricMap = getData(file);
        
        List<MetricExplanationPojo> metricExplainList = new ArrayList<MetricExplanationPojo>();
        
        String mainResTypeId = null;
        for (List<MetricExplanationPojo> metricList : metricMap.values()) {
            if (metricList.size() > 0)
            {
                mainResTypeId = metricList.get(0).getMainResTypeId();
            }
            for (MetricExplanationPojo metricExplanationPojo : metricList) {
                if (!StringUtils.isNotEmpty(metricExplanationPojo.getMetricExplain()))
                {
                    continue;
                }
                if (mainResTypeId.equals(metricExplanationPojo.getMainResTypeId()))
                {
                    metricExplanationPojo.setSubResTypeId(null);
                }
                else
                {
                    metricExplanationPojo.setMainResTypeId(mainResTypeId);
                }
                metricExplainList.add(metricExplanationPojo);
            } 
        }
        
        MetricExplainPojo t_mep = new MetricExplainPojo();
        t_mep.setMetricExplanationPojo(metricExplainList);
        
        SerializeUtil.convertObjectToBin(t_mep, "/home/liyimin/work/MetricExplain/METRICEXPLAIN");
        
        //路由器
        File router_file = new File("/home/liyimin/work/MetricExplain/metricExplanation_" + DevType.Router.getId() + ".xlsx");
        Map<String,List<MetricExplanationPojo>> router_metricMap = getData(router_file);
        
        List<MetricExplanationPojo> router_metricExplainList = new ArrayList<MetricExplanationPojo>();
        
        String router_mainResTypeId = null;
        for (List<MetricExplanationPojo> metricList : router_metricMap.values()) {
            if (metricList.size() > 0)
            {
                router_mainResTypeId = metricList.get(0).getMainResTypeId();
            }
            for (MetricExplanationPojo metricExplanationPojo : metricList) {
                if (!StringUtils.isNotEmpty(metricExplanationPojo.getMetricExplain()))
                {
                    continue;
                }
                if (router_mainResTypeId.equals(metricExplanationPojo.getMainResTypeId()))
                {
                    metricExplanationPojo.setSubResTypeId(null);
                }
                else
                {
                    metricExplanationPojo.setMainResTypeId(router_mainResTypeId);
                }
                metricExplanationPojo.setDeviceType(DevType.Router.getId());
                router_metricExplainList.add(metricExplanationPojo);
            } 
        }
        
        MetricExplainPojo t_routerMap = new MetricExplainPojo();
        t_routerMap.setMetricExplanationPojo(router_metricExplainList);
        
        SerializeUtil.convertObjectToBin(t_routerMap, "/home/liyimin/work/MetricExplain/METRICEXPLAIN_" + DevType.Router.getId());
        
        //二层交换机
        File switch_file = new File("/home/liyimin/work/MetricExplain/metricExplanation_" + DevType.Switch.getId() + ".xlsx");
        Map<String,List<MetricExplanationPojo>> switch_metricMap = getData(switch_file);
        
        List<MetricExplanationPojo> switch_metricExplainList = new ArrayList<MetricExplanationPojo>();
        
        String switch_mainResTypeId = null;
        for (List<MetricExplanationPojo> metricList : switch_metricMap.values()) {
            if (metricList.size() > 0)
            {
                switch_mainResTypeId = metricList.get(0).getMainResTypeId();
            }
            for (MetricExplanationPojo metricExplanationPojo : metricList) {
                if (!StringUtils.isNotEmpty(metricExplanationPojo.getMetricExplain()))
                {
                    continue;
                }
                if (switch_mainResTypeId.equals(metricExplanationPojo.getMainResTypeId()))
                {
                    metricExplanationPojo.setSubResTypeId(null);
                }
                else
                {
                    metricExplanationPojo.setMainResTypeId(switch_mainResTypeId);
                }
                metricExplanationPojo.setDeviceType(DevType.Switch.getId());
                switch_metricExplainList.add(metricExplanationPojo);
            } 
        }
        
        MetricExplainPojo t_switchMap = new MetricExplainPojo();
        t_switchMap.setMetricExplanationPojo(switch_metricExplainList);
        
        SerializeUtil.convertObjectToBin(t_switchMap, "/home/liyimin/work/MetricExplain/METRICEXPLAIN_" + DevType.Switch.getId());
        
        //三层交换机
        File routerSwitch_file = new File("/home/liyimin/work/MetricExplain/metricExplanation_" + DevType.RouterSwitch.getId() + ".xlsx");
        Map<String,List<MetricExplanationPojo>> routerSwitch_metricMap = getData(routerSwitch_file);
        
        List<MetricExplanationPojo> routerSwitch_metricExplainList = new ArrayList<MetricExplanationPojo>();
        
        String routerSwitch_mainResTypeId = null;
        for (List<MetricExplanationPojo> metricList : routerSwitch_metricMap.values()) {
            if (metricList.size() > 0)
            {
                routerSwitch_mainResTypeId = metricList.get(0).getMainResTypeId();
            }
            for (MetricExplanationPojo metricExplanationPojo : metricList) {
                if (!StringUtils.isNotEmpty(metricExplanationPojo.getMetricExplain()))
                {
                    continue;
                }
                if (routerSwitch_mainResTypeId.equals(metricExplanationPojo.getMainResTypeId()))
                {
                    metricExplanationPojo.setSubResTypeId(null);
                }
                else
                {
                    metricExplanationPojo.setMainResTypeId(routerSwitch_mainResTypeId);
                }
                metricExplanationPojo.setDeviceType(DevType.RouterSwitch.getId());
                routerSwitch_metricExplainList.add(metricExplanationPojo);
            } 
        }
        
        MetricExplainPojo t_routerSwitchMap = new MetricExplainPojo();
        t_routerSwitchMap.setMetricExplanationPojo(routerSwitch_metricExplainList);
        
        SerializeUtil.convertObjectToBin(t_routerSwitchMap, "/home/liyimin/work/MetricExplain/METRICEXPLAIN_" + DevType.RouterSwitch.getId());
        
        
        System.out.println("ok=============================" + metricExplainList.size());
        System.out.println("ok=============================" + router_metricExplainList.size());
        System.out.println("ok=============================" + switch_metricExplainList.size());
        System.out.println("ok=============================" + routerSwitch_metricExplainList.size());
    }
    
    public static Map<String,List<MetricExplanationPojo>> getData(File file) throws Exception 
    {
        Map<String,List<MetricExplanationPojo>> metricMap = new HashMap<String,List<MetricExplanationPojo>>();
        
        int rowSize = 0;
        
        BufferedInputStream in = new BufferedInputStream(new FileInputStream(file));
        XSSFWorkbook wb = new XSSFWorkbook(in);
        XSSFCell cell = null;
        for (int sheetIndex = 0; sheetIndex < wb.getNumberOfSheets(); sheetIndex++) {
            XSSFSheet st = wb.getSheetAt(sheetIndex);
            List<MetricExplanationPojo> metricList = new ArrayList<MetricExplanationPojo>();
            metricMap.put(""+sheetIndex, metricList);
            
         // 第一行为标题，不取
            for (int rowIndex = 1; rowIndex <= st.getLastRowNum(); rowIndex++) {
                XSSFRow row = st.getRow(rowIndex);
                if (row == null) {
                    continue;
                }
                
                int tempRowSize = row.getLastCellNum() + 1;
                if (tempRowSize > rowSize) {
                    rowSize = tempRowSize;
                }
                String[] values = new String[rowSize];
                
                boolean hasValue = false;
                for (int columnIndex = 0; columnIndex <= row.getLastCellNum(); columnIndex++) {
                    String value = "";
                    cell = row.getCell(columnIndex);
                    if (cell != null) {
                        switch (cell.getCellType()) {
                        case HSSFCell.CELL_TYPE_STRING:
                            value = cell.getStringCellValue();
                            break;
                        case HSSFCell.CELL_TYPE_NUMERIC:
                            if (HSSFDateUtil.isCellDateFormatted(cell)) {
                                Date date = cell.getDateCellValue();
                                if (date != null) {
                                    value = new SimpleDateFormat("yyyy-MM-dd")
                                    .format(date);
                                } else {
                                    value = "";
                                }
                            } else {
                                value = new DecimalFormat("0").format(cell.getNumericCellValue());
                            }
                            break;
                        case HSSFCell.CELL_TYPE_FORMULA:
                            // 导入时如果为公式生成的数据则无值
                            if (!cell.getStringCellValue().equals("")) {
                                value = cell.getStringCellValue();
                            } else {
                                value = cell.getNumericCellValue() + "";
                            }
                            break;
                        case HSSFCell.CELL_TYPE_BLANK:
                            break;
                        case HSSFCell.CELL_TYPE_ERROR:
                            value = "";
                            break;
                        case HSSFCell.CELL_TYPE_BOOLEAN:
                            value = (cell.getBooleanCellValue() == true ? "Y" : "N");
                            break;
                        default:
                            value = "";
                        }
                    }
                    if (columnIndex == 0 && value.trim().equals("")) {
                        break;
                    }
                    values[columnIndex] = rightTrim(value);
                    hasValue = true;
                }
                
                if (hasValue) {
                    MetricExplanationPojo metric = new MetricExplanationPojo();
                    metric.setMainResTypeId(values[0]);
                    metric.setSubResTypeId(values[0]);
                    
                    metric.setMetricId(values[2]);
                    metric.setMetricExplain(values[6]);
                    
                    metricList.add(metric);
                }
                
            }
        }
        
        in.close();
        
        return metricMap;
    }

    public static String[][] getData(File file, int ignoreRows) throws FileNotFoundException, IOException {

        List<String[]> result = new ArrayList<String[]>();
        int rowSize = 0;
        BufferedInputStream in = new BufferedInputStream(new FileInputStream(file));
        // 打开HSSFWorkbookmetricList
//      POIFSFileSystem fs = new POIFSFileSystem(in);
        XSSFWorkbook wb = new XSSFWorkbook(in);
//      HSSFWorkbook wb = new HSSFWorkbook(fs);
        XSSFCell cell = null;
        for (int sheetIndex = 0; sheetIndex < wb.getNumberOfSheets(); sheetIndex++) {
            XSSFSheet st = wb.getSheetAt(sheetIndex);
            // 第一行为标题，不取
            for (int rowIndex = ignoreRows; rowIndex <= st.getLastRowNum(); rowIndex++) {
                XSSFRow row = st.getRow(rowIndex);
                if (row == null) {
                    continue;
                }
                int tempRowSize = row.getLastCellNum() + 1;
                if (tempRowSize > rowSize) {
                    rowSize = tempRowSize;
                }
                String[] values = new String[rowSize];
                Arrays.fill(values, "");
                boolean hasValue = false;
                for (int columnIndex = 0; columnIndex <= row.getLastCellNum(); columnIndex++) {
                    String value = "";
                    cell = row.getCell(columnIndex);
                    if (cell != null) {
                        // 注意：一定要设成这个，否则可能会出现乱码
//                      cell.setEncoding(HSSFCell.ENCODING_UTF_16);
                        switch (cell.getCellType()) {
                        case HSSFCell.CELL_TYPE_STRING:
                            value = cell.getStringCellValue();
                            break;
                        case HSSFCell.CELL_TYPE_NUMERIC:
                            if (HSSFDateUtil.isCellDateFormatted(cell)) {
                                Date date = cell.getDateCellValue();
                                if (date != null) {
                                    value = new SimpleDateFormat("yyyy-MM-dd")
                                    .format(date);
                                } else {
                                    value = "";
                                }
                            } else {
                                value = new DecimalFormat("0").format(cell.getNumericCellValue());
                            }
                            break;
                        case HSSFCell.CELL_TYPE_FORMULA:
                            // 导入时如果为公式生成的数据则无值
                            if (!cell.getStringCellValue().equals("")) {
                                value = cell.getStringCellValue();
                            } else {
                                value = cell.getNumericCellValue() + "";
                            }
                            break;
                        case HSSFCell.CELL_TYPE_BLANK:
                            break;
                        case HSSFCell.CELL_TYPE_ERROR:
                            value = "";
                            break;
                        case HSSFCell.CELL_TYPE_BOOLEAN:
                            value = (cell.getBooleanCellValue() == true ? "Y" : "N");
                            break;
                        default:
                            value = "";
                        }
                    }
                    if (columnIndex == 0 && value.trim().equals("")) {
                        break;
                    }
                    values[columnIndex] = rightTrim(value);
                    hasValue = true;
                }
                if (hasValue) {
                    result.add(values);
                }
            }
        }
        in.close();
        String[][] returnArray = new String[result.size()][rowSize];
        for (int i = 0; i < returnArray.length; i++) {
            returnArray[i] = (String[]) result.get(i);
        }
        return returnArray;
    }

    /**
     * 
     * 去掉字符串右边的空格
     * 
     * @param str
     *            要处理的字符串
     * 
     * @return 处理后的字符串
     */

    public static String rightTrim(String str) {
        if (str == null) {
            return "";
        }
        int length = str.length();
        for (int i = length - 1; i >= 0; i--) {
            if (str.charAt(i) != 0x20) {
                break;
            }
            length--;
        }
        return str.substring(0, length);
    }
}
