package com.riil.base.resmodel.impl;

import static com.riil.base.resmodel.tools.ResModelServiceLoader.getModelService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.riil.base.pojo.dict.DictPojo;
import com.riil.base.pojo.enums.Enum4Metric;
import com.riil.base.pojo.enums.Enum4ResType.ResCatalog;
import com.riil.base.pojo.enums.Enum4ResType.TreeNodeId;
import com.riil.base.pojo.enums.EnumRoot.PolicyType;
import com.riil.base.resmodel.IResModelSupport;
import com.riil.base.resmodel.impl.db.dao.ModelBaseDao;
import com.riil.base.resmodel.impl.db.dao.ResTypeDao;
import com.riil.base.resmodel.impl.db.dao.VendorModelDao;
import com.riil.base.resmodel.impl.param.DomainResTreeParam;
import com.riil.base.resmodel.param.ResTreeParam;
import com.riil.base.resmodel.pojo.base.ModelBasePojo;
import com.riil.base.resmodel.pojo.base.ResTypeBaseQueryParam;
import com.riil.base.resmodel.pojo.base.ResTypePojo;
import com.riil.base.resmodel.pojo.mmodel.Model;
import com.riil.base.resmodel.pojo.vendor.ModelSysoidPojo;
import com.riil.base.resmodel.pojo.vendor.VendorModelPojo;
import com.riil.base.resource.param.DomainParam;
import com.riil.base.resource.pojo.ResInstancePojo;
import com.riil.base.utils.ResModelPojoUtils;
import com.riil.core.commons.Assert;
import com.riil.core.dao.DAOException;
import com.riil.core.service.ServiceException;

/**
 * 模板辅助服务<br>
 * 提供获取模板扩展信息的功能（例如模板相关的资源数量） <br>
 * <p>
 * Create on : 2012-6-7<br>
 * <p>
 * </p>
 * <br>
 * 
 * @author ChenJuntao<br>
 * @version riil.resmodel.impl v1.0
 *          <p>
 *          <br>
 *          <strong>Modify History:</strong><br>
 *          user modify_date modify_content<br>
 *          -------------------------------------------<br>
 *          <br>
 */
public class ResModelSupport implements IResModelSupport {

    private static final int S_TREE_LEVEL_ALL = 0;

    /**
     * <code>m_tempBaseDao</code> - 模板DAO
     */
    private ResTypeDao m_resTypeDao;

    /**
     * <code>m_modelBaseDao</code> - 模型DAO
     */
    private ModelBaseDao m_modelBaseDao;

    /**
     * <code>m_vendorModelDao</code> - DAO object.
     */
    private VendorModelDao m_vendorModelDao;
    
    /**
     * <code>m_dictService</code> - 字典Service.
     */
    private DictService m_dictService;
    
    /**
     * <code>m_templateService</code> - 模板Service.
     */
    private ResTypeService m_resTypeService;

    @Override
    public List<ResTypePojo> getResTypeTreeWithResNum(DomainParam domainParam, ResTreeParam resTreeParam)
        throws ServiceException {
        try {
            if (!domainParam.isVaildParam()) {
                return new ArrayList<ResTypePojo>();
            }

            String selectId = null;
            if (domainParam.getDomainWithGroup().isEmpty()) {
                // Admin Query
                selectId = "select_ResTree-ResNum_" + domainParam.getUserType();
            } else {
                // Portal Query
                selectId = "select_ResTree-ResNum_" + domainParam.getPortalQueryUserType();
            }

            DomainResTreeParam param = new DomainResTreeParam(domainParam, resTreeParam);

            return m_resTypeDao.doSelectByDomainParam(selectId, param);
        } catch (DAOException te) {
            throw new ServiceException(te);
        }
    }

    @Override
    public List<ResTypePojo> getBizSrvResTypeTreeWithResNum(DomainParam domainParam, ResTreeParam resTreeParam)
            throws ServiceException {
            List<ResTypePojo> t_resTempTree = getResTypeTreeWithResNum(domainParam, resTreeParam);
            List<ResTypePojo> t_result = new ArrayList<ResTypePojo>();
            for (ResTypePojo template : t_resTempTree) {
                String t_treeNodeId = template.getTreeNodeId();
                if (t_treeNodeId.equals(TreeNodeId.BaseService.getId()) || t_treeNodeId.equals(TreeNodeId.Ping.getId())
                    || t_treeNodeId.equals(TreeNodeId.URL.getId()) || t_treeNodeId.equals(TreeNodeId.Port.getId())) {
                    continue;
                } else {
                    t_result.add(template);
                }
            }

            return t_result;
        }

    @Override
    public List<ResTypePojo> getKpiResTypeTreeWithResNum(DomainParam domainParam, ResTreeParam resTreeParam)
            throws ServiceException {
            List<String> policyTypes = new ArrayList<String>();
            policyTypes.add(PolicyType.RES.getId());
            policyTypes.add(PolicyType.BIZ.getId());
            resTreeParam.setPolicyTypes(policyTypes);

            List<ResTypePojo> t_resTempTree = getResTypeTreeWithResNum(domainParam, resTreeParam);

            return t_resTempTree;
        }

    @Override
    public List<ResTypePojo> getEventCenterResTypeTreeWithResNum(DomainParam domainParam, String treeNodeId, Integer treeLevel)
            throws ServiceException {
            ResTreeParam resTreeParam = new ResTreeParam();
            resTreeParam.setTreeNodeId(treeNodeId);
            if (treeLevel != null) {
                resTreeParam.setTreeLevel(treeLevel);
            }

            List<ResTypePojo> t_resTempTree = getResTypeTreeWithResNum(domainParam, resTreeParam);

            return t_resTempTree;
        }

    @Override
    public List<ResTypePojo> getAllSubResTypeWithResNum(String mainResId) throws ServiceException {
        try {
            return m_resTypeDao.getAllSubResTypeWithResNum(mainResId);
        } catch (DAOException te) {
            throw new ServiceException(te);
        }
    }

    @Override
    public List<ResTypePojo> getResTypeTreeWithResNumNotInDomain() throws ServiceException {
        try {

            String selectId = "select_ResTree-ResNum-NotInDomain";
            DomainResTreeParam param = new DomainResTreeParam();

            return m_resTypeDao.doSelectByDomainParam(selectId, param);
        } catch (DAOException te) {
            throw new ServiceException(te);
        }
    }

    /*
     * (non-Javadoc)
     * @see com.riil.base.resmodel.IResModelSupport#getTempTreeHasResByResGroupId(java.lang.String, java.lang.String)
     */
    @Override
    public List<ResTypePojo> getResTypeTreeHasResByResGroupId(String resGroupId, String domainId) throws ServiceException {
        Assert.notNull(resGroupId);
        try {
            String selectId = "select_ResTree_ByResGroupId";
            DomainResTreeParam param = new DomainResTreeParam();
            param.setResGroupId(resGroupId);
            param.setDomainId(domainId);

            return m_resTypeDao.doSelectByDomainParam(selectId, param);
        } catch (DAOException te) {
            throw new ServiceException(te);
        }
    }

    @Override
    public List<ResTypePojo> getResTypeTreeHasCandidateResByResGroupId(String resGroupId, String domainId)
            throws ServiceException {
           return getResTypeTreeHasCandidataResOrScriptByResGroupId(resGroupId, domainId, false);
    }
    
    private List<ResTypePojo> getResTypeTreeHasCandidataResOrScriptByResGroupId(String resGroupId, String domainId,
    		boolean withScript) throws ServiceException{
    	 Assert.notNull(resGroupId);
         try {
             String selectId = "select_CandidateResTree_ByResGroupId";
             DomainResTreeParam param = new DomainResTreeParam();
             param.setResGroupId(resGroupId);
             param.setDomainId(domainId);
             
             List<String> policyTypes = new ArrayList<String>(); 
             
             if(withScript){
            	 policyTypes.add(PolicyType.SCRIPT_SIMPLE.getId());
            	 policyTypes.add(PolicyType.SCRIPT_ADV.getId());
            	 policyTypes.add(PolicyType.ROOM.getId());
             }
             policyTypes.add(PolicyType.RES.getId());
             param.setPolicyTypes(policyTypes);
             return m_resTypeDao.doSelectByDomainParam(selectId, param);
         } catch (DAOException te) {
             throw new ServiceException(te);
         }
    }
    @Override
    public List<ResTypePojo> getResTypeTreeHasCandidateResWithScriptByResGroupId(String resGroupId, String domainId)
    	throws ServiceException{
    	return getResTypeTreeHasCandidataResOrScriptByResGroupId(resGroupId, domainId, true);
    }
    /**
     * 只取已经监控的资源模板类型.
     * 
     * @param treeLevel
     * @param withSubLevel
     * @param isMainRes
     * @return
     * @throws ServiceException
     */
    public List<ResTypePojo> getResTypeHasRes() throws ServiceException {
        return getResTypeHasRes(S_TREE_LEVEL_ALL);
    }

    /**
     * 只取一个级别的 有资源 的模板列表.
     * 
     * @param treeLevel
     * @return
     * @throws ServiceException
     */
    public List<ResTypePojo> getResTypeHasRes(int treeLevel) throws ServiceException {
        try {
            return m_resTypeDao.doSelectTempTreeHasMainResByTreeLevel(treeLevel);

        } catch (Exception te) {
            throw new ServiceException(te);
        }
    }

    /**
     * 根据业务id，取得业务资源树.
     * 
     * @param bizId
     * @return
     * @throws ServiceException
     */
    public List<ResTypePojo> getResTypeListByBizId(String bizId) throws ServiceException {

        ResTypeBaseQueryParam t_param = new ResTypeBaseQueryParam();
        t_param.setBizId(bizId);
        t_param.setNotInIds(getNotInResCatalogIds());
        try {
            return m_resTypeDao.doSelectResTypeListByBizId(t_param);
        } catch (DAOException t_e) {
            throw new ServiceException(t_e);
        }
    }


    public List<ResTypePojo> getResTypeListByBizId(String bizId, int level) throws ServiceException {

        ResTypeBaseQueryParam t_param = new ResTypeBaseQueryParam();
        t_param.setBizId(bizId);
        t_param.setTreeLevel(level);
        t_param.setNotInIds(getNotInResCatalogIds());
        try {
            return m_resTypeDao.doSelectResTypeListByBizId(t_param);
        } catch (DAOException t_e) {
            throw new ServiceException(t_e);
        }
    }

    private List<String> getNotInResCatalogIds() {
        List<String> t_list = new ArrayList<String>();
        t_list.add(ResCatalog.BIZAPP.getId());
        t_list.add(ResCatalog.SCRIPT.getId());
        return t_list;
    }

    @Override
    public List<Model> getAllModelHasResByTreeNodeId(String treeNodeId) throws ServiceException {
        try {
            ModelBasePojo t_model = new ModelBasePojo();
            t_model.setTreeNodeId(treeNodeId);
            t_model.setTag4("hasRes");
            return ResModelPojoUtils.toModel2(m_modelBaseDao.doSelectList(t_model));
        } catch (DAOException te) {
            throw new ServiceException(te);
        }
    }

    @Override
    public ResInstancePojo createResInstancePojo(String modelId) throws ServiceException {

        if (modelId == null) {
            return null;
        }

        Model t_model = getModelService().getModel(modelId);
        if (t_model == null) {
            return null;
        }
        ResTypePojo t_resType = getResTypeService().getResTypeByID(t_model.getResTypeId());

        ResInstancePojo t_ret = new ResInstancePojo();
        t_ret.setResTypeId(t_resType.getId());
        t_ret.setResTypeName(t_resType.getName());
        t_ret.setModelId(t_model.getId());
        t_ret.setResCatalog(t_resType.getResCatalog());
        t_ret.setTreeNodeId(t_resType.getTreeNodeId());
        t_ret.setVendorId(t_model.getVendorId());
        t_ret.setVendorName(t_model.getVendorName());
        t_ret.setAvailStatus(Enum4Metric.Status4Avail.Avail.getId());

        return t_ret;
    }

    @Override
    public List<VendorModelPojo> getVendorsWithResNumByDomain(List<String> domainIds) throws ServiceException {
        try {
            return m_vendorModelDao.getVendorsWithResNumByDomain(domainIds);
        } catch (DAOException te) {

            throw new ServiceException(te);
        }
    }

    @Override
    public List<VendorModelPojo> getVendorModelByTreeNodeId(String treeNodeId, boolean hasRes) throws ServiceException {
        Assert.notNull(treeNodeId);
        try {
            Map<String, Object> t_param = new HashMap<String, Object>();
            t_param.put("treeNodeId", treeNodeId);
            t_param.put("hasRes", hasRes);
            if(hasRes){
                return this.m_vendorModelDao.doSelectByTreeNodeId(t_param);
            }else{
                return getVendorModelByTreeNodeIdFromCache(treeNodeId);
            }

        } catch (DAOException te) {

            throw new ServiceException(te);
        }
    }
    

    /**
     * 根据TreeNodeId 从字典表缓存中取得厂商(没有资源)
     * @param treeNodeId 树节点ID
     * @return 厂商集合
     */
    private List<VendorModelPojo> getVendorModelByTreeNodeIdFromCache(String treeNodeId) throws ServiceException {
        DictPojo dictPojo = m_dictService.getDictPojo();
        List<ModelSysoidPojo> t_modelSysoids = dictPojo.getListDictSysoidPojo();
        List<VendorModelPojo> t_venderModelList = dictPojo.getListVendorModelPojo();
        List<ResTypePojo> template = m_resTypeService.getAllResType();

        List<VendorModelPojo> t_vendor = new ArrayList<VendorModelPojo>();
        Map<String, String> t_tempMap = new HashMap<String, String>();
        Map<String, String> t_SysoidMap = new HashMap<String, String>();

        for (ResTypePojo t_template : template) {
            String t_treeNodeId = t_template.getTreeNodeId();
            if (t_treeNodeId.startsWith(treeNodeId)) {
                String t_tempId = t_template.getId();
                t_tempMap.put(t_treeNodeId, t_tempId);
            }
        }
        for (ModelSysoidPojo t_modelSysoid : t_modelSysoids) {
            if (t_tempMap.containsValue(t_modelSysoid.getResTypeId())) {
                t_SysoidMap.put(t_modelSysoid.getVendorModelId(), t_modelSysoid.getVendorId());
            }
        }

        for (VendorModelPojo t_venderModel : t_venderModelList) {
            if (t_SysoidMap.containsKey(t_venderModel.getId())) {
                t_vendor.add(t_venderModel);
            }
        }
        return t_vendor;
    }

    public void setModelBaseDao(ModelBaseDao modelBaseDao) {
        m_modelBaseDao = modelBaseDao;
    }

    public void setVendorModelDao(final VendorModelDao vendorModelDao) {
        this.m_vendorModelDao = vendorModelDao;
    }

    public void setDictService(DictService dictService) {
        m_dictService = dictService;
    }

    @Override
    public void destroy() throws ServiceException {
    }

    @Override
    public void start() throws ServiceException {
    }

	public ResTypeDao getResTypeDao() {
		return m_resTypeDao;
	}

	public void setResTypeDao(ResTypeDao resTypeDao) {
		m_resTypeDao = resTypeDao;
	}

	public ResTypeService getResTypeService() {
		return m_resTypeService;
	}

	public void setResTypeService(ResTypeService resTypeService) {
		m_resTypeService = resTypeService;
	}

}
