package com.riil.base.policy.pojo;

import com.riil.base.resmodel.pojo.policy.PolicyPojo;

/**
 * 变动的策略 <br>
 * 策略中包含变动的资源关系（新增或删除的）, 是否发布，是否启用， 策略ID
 * <p>
 * Create on : 2013-1-17<br>
 * <p>
 * </p>
 * <br>
 * 
 * @author ChenJuntao<br>
 * @version riil.resmodel.api v6.2.0
 *          <p>
 *          <br>
 *          <strong>Modify History:</strong><br>
 *          user modify_date modify_content<br>
 *          -------------------------------------------<br>
 *          <br>
 */
public class ChangedPolicy extends PolicyPojo {

    /**
     * <code>serialVersionUID</code> - serialVersionUID.
     */
    private static final long serialVersionUID = 709627273938924308L;

    /**
     * Constructors.
     */
    public ChangedPolicy() {

    }

    /**
     * Constructors.
     * 
     * @param ext 策略关联关系扩展
     */
    public ChangedPolicy(final PolicyResRelExt ext) {
        this.setId(ext.getPolicyId());
        this.m_inUse = ext.m_inUse;
        this.addPolicyResRelPojo(ext.gainPolicyResRelPojo());
    }
}
