package com.riil.base.policy.pojo;

import com.riil.base.resmodel.pojo.policy.PolicyResRelPojo;

public class PolicyResRelExt {

    /**
     * <code>m_id</code> - ID.
     */
    protected String m_id;

    /**
     * <code>m_policyId</code> - 策略ID .
     */
    private String m_policyId;

    /**
     * <code>m_inUse</code> - 是否启用 .
     */
    protected byte m_inUse;

    /**
     * <code>m_isPublish</code> - 是否发布标识 .
     */
    protected byte m_isPublish;

    /**
     * <code>m_instId</code> - 实例ID,实例表的c_id .
     */
    private String m_instId;

    /**
     * <code>m_subInstId</code> - 子实例ID,子实例表的c_id .
     */
    private String m_subInstId;

    /**
     * <code>m_isMain</code> - 主策略还是子策略 .
     */
    private byte m_isMain;

    /**
     * 取得策略ID
     * 
     * @return 策略ID
     */
    public String getPolicyId() {
        return m_policyId;
    }

    /**
     * 设置策略ID
     * 
     * @param policyId 策略ID
     */
    public void setPolicyId(final String policyId) {
        m_policyId = policyId;
    }

    /**
     * 取得是否启用
     * 
     * @return 是否启用
     */
    public byte getInUse() {
        return m_inUse;
    }

    /**
     * 设置是否启用
     * 
     * @param inUse 是否启用
     */
    public void setInUse(final byte inUse) {
        m_inUse = inUse;
    }

    /**
     * 取得是否发布
     * 
     * @return 是否发布
     */
    public byte getIsPublish() {
        return m_isPublish;
    }

    /**
     * 设置是否发布
     * 
     * @param isPublish 是否发布
     */
    public void setIsPublish(final byte isPublish) {
        m_isPublish = isPublish;
    }

    /**
     * 取得主资源ID
     * 
     * @return 主资源ID
     */
    public String getInstId() {
        return m_instId;
    }

    /**
     * 设置主资源ID
     * 
     * @param insId 主资源ID
     */
    public void setInstId(final String instId) {
        m_instId = instId;
    }

    /**
     * 取得子资源ID
     * 
     * @return 子资源ID
     */
    public String getSubInstId() {
        return m_subInstId;
    }

    /**
     * 设置子资源ID
     * 
     * @param subInstId 子资源ID
     */
    public void setSubInstId(final String subInstId) {
        m_subInstId = subInstId;
    }

    /**
     * 取得是否是主资源
     * 
     * @return 是否是主资源
     */
    public byte getIsMain() {
        return m_isMain;
    }

    /**
     * 设置是否是主资源
     * 
     * @param isMain 是否是主资源
     */
    public void setIsMain(final byte isMain) {
        m_isMain = isMain;
    }

    /**
     * 取得策略的关联关系对象
     * 
     * @return 策略关联关系对象
     */
    public PolicyResRelPojo gainPolicyResRelPojo() {
        PolicyResRelPojo t_resRel = new PolicyResRelPojo();
        t_resRel.setId(m_id);
        t_resRel.setPolicyId(m_policyId);
        t_resRel.setInstId(m_instId);
        t_resRel.setSubInstId(m_subInstId);
        t_resRel.setIsMain(m_isMain);

        return t_resRel;
    }

    /**
     * 取得ID
     * 
     * @return ID
     */
    public String getId() {
        return m_id;
    }

    /**
     * 设置ID
     * 
     * @param id ID
     */
    public void setId(final String id) {
        m_id = id;
    }
}
