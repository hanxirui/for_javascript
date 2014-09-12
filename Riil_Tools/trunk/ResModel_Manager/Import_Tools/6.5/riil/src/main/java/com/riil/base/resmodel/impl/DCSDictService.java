package com.riil.base.resmodel.impl;

import java.util.List;

import com.riil.base.pojo.dict.DictPojo;
import com.riil.base.resmodel.pojo.vendor.ModelSysoidPojo;

/**
 * {class description} <br>
 * <p>
 * Create on : 2014年5月26日<br>
 * </p>
 * <br>
 * 
 * @author liyimin<br>
 * @version riil-resmodel-6.5.0-SNAPSHOT v6.2.0 <br>
 *          <strong>Modify History:</strong><br>
 *          user modify_date modify_content<br>
 *          -------------------------------------------<br>
 * <br>
 */
public class DCSDictService extends DictService {

    @Override
    public void setDictPojo(DictPojo dictPojo) {
        loadAllFrequencys(dictPojo);
        loadAllVendor(dictPojo);
        loadAllVendorModel(dictPojo);
        loadModelSysoid(dictPojo);
        loadAllMetrics(dictPojo);
        loadMetricGroups(dictPojo);
        loadMetricGroupRel(dictPojo);
        loadAllEvents(dictPojo);
    }

    /**
     * 取得 DictPojo
     */
    @Override
    public DictPojo getDictPojo() {
        return getDictCache();
    }

    private DictPojo getDictCache() {
        return DictPojo.getInstance();
    }
    
    protected void loadModelSysoid(DictPojo dictPojo){
        List<ModelSysoidPojo> t_modelSysoidPojos = dictPojo.getListModelSysoidPojo();
        if (t_modelSysoidPojos != null) {
            for (ModelSysoidPojo t_comon : t_modelSysoidPojos) {
                if (t_comon != null)
                    getDictCache().addModelSysoidPojo(t_comon);
            }
            if (S_LOGGER.isDebugEnabled()) {
                S_LOGGER.debug("\n     Loaded " + t_modelSysoidPojos.size() + " pojo in List<DictSysoidPojo> ");
            }
        }
    }

}
