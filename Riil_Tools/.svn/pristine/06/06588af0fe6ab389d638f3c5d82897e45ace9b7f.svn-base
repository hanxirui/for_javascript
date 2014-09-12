package com.riil.base.policy;

import static org.junit.Assert.assertTrue;

import java.io.File;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.collections.CollectionUtils;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import com.riil.base.pojo.enums.Enum4Metric.Status4Metric;
import com.riil.base.resmodel.pojo.policy.RecommandThresholdPojo;
import com.riil.base.resmodel.pojo.policy.RecommandThresholdQueryParm;
import com.riil.core.container.ContainerException;
import com.riil.core.service.ServiceException;
import com.riil.core.test.BaseTest;

public class RecThresholdServiceTest extends BaseTest {

    private IRecThresholdService m_srv;

    @Before
    public void beforeTest() throws ContainerException {
        m_srv = serviceContainer.getServiceComponent(IRecThresholdService.S_SERVICE_ID);
    }

    @After
    public void afterTest() {

    }

    /**
     * 阈值推荐值 V0.1
     * 
     * @throws ServiceException
     */
    @Test
    public void getRecCommThresholdListTest() throws ServiceException {

        RecommandThresholdQueryParm parm = new RecommandThresholdQueryParm();

        parm.setPolicyId("RIIL_RMP_RES_HOST_WINDOWS_SNMP_DEFAULT");
        parm.setMetricId("MEMRate");
        parm.setModelId("RIIL_RMM_HOST_WINDOWS_SNMP");
        parm.setYellow("30");
        parm.setRed("90");
        List<RecommandThresholdPojo> recCommThresholdList = m_srv.getRecCommThresholdList(parm);

        double miniValue = Double.parseDouble(recCommThresholdList.get(0).getMetricValue());
        double maxValue =
            Double.parseDouble(recCommThresholdList.get(recCommThresholdList.size() - 1).getMetricValue());

        // 算极差
        double range = 0;
        if (maxValue >= miniValue) {
            range = maxValue - miniValue;
        } else {
            range = miniValue - maxValue;
        }

        // 确定分组数(一般采用10~15组为佳,这里大于10)
        double group = 10.00;
        // 确定组距(组距=极差/组数)
        double classInterval = range / group;
        // Math.floor(range / group);

        // //获取小数位数
        // String dataStr=Double.toString(classInterval);//先转换为字符串在处理
        // int dot=dataStr.indexOf(".");//得到小数点的位置
        // int dotLength = dataStr.substring(dot, (dataStr.length() - 1)).length();

        // BigDecimal setScale = new BigDecimal(Double.toString(classInterval)).setScale(2, BigDecimal.ROUND_HALF_UP);
        //
        // classInterval = setScale.doubleValue();

        // 确定分组
        List<Double> groupNums = new ArrayList<Double>();

        List<RecommandThresholdPojo> recTemp = new ArrayList<RecommandThresholdPojo>();
        recTemp.addAll(recCommThresholdList);

        // 分组其实数
        double startNum = Math.floor(miniValue);
        for (int i = 0; i <= (int) group; i++) {
            groupNums.add(startNum + classInterval);
            startNum = startNum + classInterval;
        }

        Map<String, List<Double>> groupMap = new LinkedHashMap<String, List<Double>>();
        Map<String, Integer> groupMapKeySize = new LinkedHashMap<String, Integer>();

        List<String> keyList = new ArrayList<String>();
        for (int i = 0; i < groupNums.size(); i++) {
            double groupNum = groupNums.get(i);
            List<Double> valueByGroup = new ArrayList<Double>();

            for (RecommandThresholdPojo recPojo : recTemp) {
                double value = Double.parseDouble(recPojo.getMetricValue());
                if ((i + 1) == groupNums.size()) {
                    continue;
                }

                if (value >= groupNum && value <= groupNums.get(i + 1)) {
                    valueByGroup.add(value);
                }
            }
            if ((i + 1) == groupNums.size()) {
                continue;
            }
            groupMap.put(groupNum + "-" + groupNums.get(i + 1), valueByGroup);
            groupMapKeySize.put(groupNum + "-" + groupNums.get(i + 1), valueByGroup.size());
        }
        ArrayList<Entry<String, Integer>> l = new ArrayList<Entry<String, Integer>>(groupMapKeySize.entrySet());
        Collections.sort(l, new Comparator<Map.Entry<String, Integer>>() {
            public int compare(Map.Entry<String, Integer> o1, Map.Entry<String, Integer> o2) {
                return (o2.getValue() - o1.getValue());
            }
        });
        List<String> avgList = new ArrayList<String>();
        int listSizes = 0;
        double sum = 0;
        double avgSize = 0;
        if (CollectionUtils.isNotEmpty(l)) {
            for (Entry<String, Integer> entry : l) {
                if (entry.getValue() >= listSizes) {
                    listSizes = entry.getValue();
                    avgList.add(entry.getKey());
                    System.err.println(entry.getKey());
                    List<Double> list = groupMap.get(entry.getKey());
                    System.err.println(list);
                    for (Double value : list) {
                        sum += value;
                    }
                    avgSize += list.size();
                }
            }
        }

        int totalSize = recCommThresholdList.size();

        double remain = totalSize * 0.2;
        BigDecimal setScale = new BigDecimal(remain).setScale(0, BigDecimal.ROUND_HALF_UP);
        int exact = setScale.intValueExact();
        int d = totalSize - exact;

        List<RecommandThresholdPojo> subLists = recCommThresholdList.subList(d, totalSize);

        for (RecommandThresholdPojo subList : subLists) {
            System.err.println("阈值---" + subList.getMetricValue());
        }

        double avg = sum / avgSize;

        System.err.println(avg);

        int listSize = recCommThresholdList.size();
        assertTrue(recCommThresholdList.size() > 0);
    }

    /**
     * 阈值推荐值 v0.2
     * 
     * @throws ServiceException
     */
    @Test
    public void getRecCommThresholdList() throws ServiceException {
        RecommandThresholdQueryParm parm = new RecommandThresholdQueryParm();

        parm.setPolicyId("RIIL_RMP_RES_HOST_WINDOWS_SNMP_DEFAULT");
        parm.setMetricId("MEMRate");
        parm.setModelId("RIIL_RMM_HOST_WINDOWS_SNMP");
        parm.setYellow("30");
        parm.setRed("90");
        // 取出采集的事件
        List<RecommandThresholdPojo> recCommThresholdList = m_srv.getRecCommThresholdList(parm);
        // 总数量
        int totalSize = recCommThresholdList.size();
        // 调整比例
        double adjust = 0.8;
        // 剩余数量
        double remain = totalSize * adjust;
        // 剩余数量四舍五入
        BigDecimal setScale = new BigDecimal(remain).setScale(0, BigDecimal.ROUND_HALF_UP);
        int exact = setScale.intValueExact();
        // 扣除个数
        int deduct = totalSize - exact;
        // 剩余部分数据
        List<RecommandThresholdPojo> subLists = recCommThresholdList.subList(deduct, totalSize);

        for (RecommandThresholdPojo subList : subLists) {
            System.err.println("阈值---" + subList.getMetricValue());
        }
        RecommandThresholdPojo thresholdPojo = subLists.get(0);
        String metricValue = thresholdPojo.getMetricValue();
        double recThreshold = Math.floor(Double.parseDouble(metricValue));
        System.err.println(recThreshold);

    }

    @Test
    public void getRecommandThresholdTest() throws ServiceException {

        String policyId = "RIIL_RMP_RES_HOST_WINDOWS_SNMP_DEFAULT";
        // String metricId = "MEMRate";
        String metricId = "MEMRate";
        String modelId = "RIIL_RMM_HOST_WINDOWS_SNMP";
        Status4Metric status = Status4Metric.RED;
        String startTime = "";
        String endTime = "";
        RecommandThresholdQueryParm recThresholdParm = new RecommandThresholdQueryParm();
        recThresholdParm.setPolicyId(policyId);
        recThresholdParm.setMetricId(metricId);
        recThresholdParm.setModelId(modelId);
        recThresholdParm.setStatus(status);
        recThresholdParm.setMetricDate("400");
        recThresholdParm.setPercent("0");
        Map<String, Map<Status4Metric, Object>> threshold = m_srv.getRecommandThreshold(recThresholdParm);

        System.err.println(threshold);
    }
    
    @Test
    public void getRecCommThresholdListTests() throws ServiceException{
        String policyId = "RIIL_RMP_RES_HOST_WINDOWS_SNMP_DEFAULT";
        // String metricId = "MEMRate";
        String metricId = "MEMRate";
        String modelId = "RIIL_RMM_HOST_WINDOWS_SNMP";
        Status4Metric status = Status4Metric.RED;
        String startTime = "";
        String endTime = "";
        
        RecommandThresholdQueryParm recThresholdParm = new RecommandThresholdQueryParm();
        
        recThresholdParm.setPolicyId(policyId);
        recThresholdParm.setMetricId(metricId);
        recThresholdParm.setModelId(modelId);
        recThresholdParm.setStatus(status);
        recThresholdParm.setYellow("80");
        recThresholdParm.setRed("90");
        recThresholdParm.setMetricDate("3");
        recThresholdParm.setPercent("0");
        recThresholdParm.setMiniCount("2");
        List<RecommandThresholdPojo> recCommThresholdList = m_srv.getRecCommThresholdList(recThresholdParm);
        System.out.println(recCommThresholdList);
    }
    
    @Test
    public void test() {
        File file =
            new File(
                "D:\\workspace\\work_630\\RIIL_WebFramework\\plugins\\riil-plugins-netdevice-6.3.0-snapshot\\plugin.xml");
        file.exists();
        System.out.println(file);
    }
}
