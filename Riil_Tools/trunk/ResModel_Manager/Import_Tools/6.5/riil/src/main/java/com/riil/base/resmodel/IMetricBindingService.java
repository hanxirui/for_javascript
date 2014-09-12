package com.riil.base.resmodel;

import java.util.List;

import com.riil.base.binding.pojo.CmdFilter;
import com.riil.base.binding.pojo.CmdPropertie;
import com.riil.base.binding.pojo.CmdSupportPojo;
import com.riil.base.binding.pojo.CollectCmdsConnProtocol;
import com.riil.base.binding.pojo.CollectCmdsPojo;
import com.riil.base.binding.pojo.CollectCmdsProcessPara;
import com.riil.base.binding.pojo.CollectCmdsProcessor;
import com.riil.base.binding.pojo.MetricBindingPojo;
import com.riil.base.binding.pojo.MetricProcessPara;
import com.riil.core.service.IService;
import com.riil.core.service.ServiceException;

public interface IMetricBindingService extends IService {
	/**
	 * <code>S_SERVICE_ID</code> - Service Bean ID.
	 */
	public static final String S_SERVICE_ID = "metricBindingService";
	
	/**
	 * batch create pojo info.
	 * 
	 * @param eventBase - eventBase POJO object.
	 * @throws ServiceException
	 */
	void createBatch(final List<MetricBindingPojo> list) throws ServiceException;
	void createBatchMetricProcessPara(final List<MetricProcessPara> list) throws ServiceException;
	void createBatchCollectCmds(final List<CollectCmdsPojo> list) throws ServiceException;
	void createBatchCollectCmdsConnProtocol(final List<CollectCmdsConnProtocol> list) throws ServiceException;
	void createBatchCollectCmdsProcessor(final List<CollectCmdsProcessor> list) throws ServiceException;
	void createBatchCollectCmdsProcessPara(final List<CollectCmdsProcessPara> list) throws ServiceException;
	void createBatchCmdPropertie(final List<CmdPropertie> list) throws ServiceException;
	void createBatchCmdFilter(final List<CmdFilter> list) throws ServiceException;
	void createBatchCmdSupport(final List<CmdSupportPojo> list) throws ServiceException;
}
