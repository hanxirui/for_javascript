package com.riil.base.resmodel;

import org.junit.Before;
import org.junit.Test;
import org.springframework.test.context.ContextConfiguration;

import com.riil.base.pojo.enums.Enum4ResType.DevType;
import com.riil.core.container.ServiceContainer;
import com.riil.core.service.ServiceException;
import com.riil.core.test.BaseTest;

/**
 * {class description}
 * <br>
 *  
 * <p>
 * Create on : 2014年6月19日<br>
 * </p>
 * <br>
 * @author liyimin<br>
 * @version riil-resmodel v6.2.0
 * <br>
 * <strong>Modify History:</strong><br>
 * user     modify_date    modify_content<br>
 * -------------------------------------------<br>
 * <br>
 */
@ContextConfiguration(locations = { "classpath*:META-INF/PortalServer/riil_service*.xml" })
public class metricExplanationTest extends BaseTest {
    
    private IMetricExplanationService meService ;
    
    @Before
    public void setUp() throws Exception {
        if(meService == null){
            meService = (IMetricExplanationService)ServiceContainer.getInstance().getServiceComponent(IMetricExplanationService.S_SERVICE_ID);
        }
    }

    @Test
    public void test() throws ServiceException {
//        String metricExplan = meService.getMetricExplanation(null, "RIIL_RMT_DB_DB2", null, "CPURate");
//        
//        System.out.println(metricExplan);
        
        String routeMetric = meService.getMetricExplanation(DevType.Switch.getId(),"RIIL_RMT_SWITCH_RUIJIE", null, "InICMPPacketRate");
        
        System.out.println(routeMetric);
    }

}
