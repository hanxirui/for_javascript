package com.riil.base.resmodel.impl;

import java.util.List;

import com.riil.base.binding.pojo.CmdFilter;
import com.riil.base.binding.pojo.CmdPropertie;
import com.riil.base.binding.pojo.CmdSupportPojo;
import com.riil.base.binding.pojo.CollectCmdPojo;
import com.riil.base.binding.pojo.CollectCmdsConnProtocol;
import com.riil.base.binding.pojo.CollectCmdsPojo;
import com.riil.base.binding.pojo.CollectCmdsProcessPara;
import com.riil.base.binding.pojo.CollectCmdsProcessor;
import com.riil.base.binding.pojo.MetricBindingPojo;
import com.riil.base.binding.pojo.MetricProcessPara;
import com.riil.base.resmodel.IMetricBindingService;
import com.riil.base.resmodel.impl.db.dao.CmdFilterDao;
import com.riil.base.resmodel.impl.db.dao.CmdPropertieDao;
import com.riil.base.resmodel.impl.db.dao.CmdSupportDao;
import com.riil.base.resmodel.impl.db.dao.CollectCmdDao;
import com.riil.base.resmodel.impl.db.dao.CollectCmdsConnProtocolDao;
import com.riil.base.resmodel.impl.db.dao.CollectCmdsDao;
import com.riil.base.resmodel.impl.db.dao.CollectCmdsProcessParaDao;
import com.riil.base.resmodel.impl.db.dao.CollectCmdsProcessorDao;
import com.riil.base.resmodel.impl.db.dao.MetricBindingDao;
import com.riil.base.resmodel.impl.db.dao.MetricProcessParaDao;
import com.riil.base.resmodel.pojo.mmodel.ModelPojo;
import com.riil.base.resmodel.tools.ILazyData;
import com.riil.core.dao.DAOException;
import com.riil.core.service.ServiceException;

public class MetricBindingService implements IMetricBindingService, ILazyData<ModelPojo>{
	private MetricBindingDao m_metricBindingDao;
	private MetricProcessParaDao m_metricProcessParaDao;
	private CollectCmdsDao m_collectCmdsDao;
	private CollectCmdsConnProtocolDao m_collectCmdsConnProtocolDao;
	private CollectCmdsProcessorDao m_collectCmdsProcessorDao;
	private CollectCmdsProcessParaDao m_collectCmdsProcessParaDao;
	private CollectCmdDao m_collectCmdDao;
	private CmdPropertieDao m_cmdPropertieDao;
	private CmdFilterDao m_cmdFilterDao;
	private CmdSupportDao m_cmdSupportDao;
	

	public CmdSupportDao getCmdSupportDao() {
		return m_cmdSupportDao;
	}

	public void setCmdSupportDao(CmdSupportDao cmdSupportDao) {
		m_cmdSupportDao = cmdSupportDao;
	}

	public CmdFilterDao getCmdFilterDao() {
		return m_cmdFilterDao;
	}

	public void setCmdFilterDao(CmdFilterDao cmdFilterDao) {
		m_cmdFilterDao = cmdFilterDao;
	}

	public CmdPropertieDao getCmdPropertieDao() {
		return m_cmdPropertieDao;
	}

	public void setCmdPropertieDao(CmdPropertieDao cmdPropertieDao) {
		m_cmdPropertieDao = cmdPropertieDao;
	}

	public CollectCmdDao getCollectCmdDao() {
		return m_collectCmdDao;
	}

	public void setCollectCmdDao(CollectCmdDao collectCmdDao) {
		m_collectCmdDao = collectCmdDao;
	}

	public CollectCmdsProcessParaDao getCollectCmdsProcessParaDao() {
		return m_collectCmdsProcessParaDao;
	}

	public void setCollectCmdsProcessParaDao(
			CollectCmdsProcessParaDao collectCmdsProcessParaDao) {
		m_collectCmdsProcessParaDao = collectCmdsProcessParaDao;
	}

	public CollectCmdsProcessorDao getCollectCmdsProcessorDao() {
		return m_collectCmdsProcessorDao;
	}

	public void setCollectCmdsProcessorDao(
			CollectCmdsProcessorDao collectCmdsProcessorDao) {
		m_collectCmdsProcessorDao = collectCmdsProcessorDao;
	}

	public CollectCmdsConnProtocolDao getCollectCmdsConnProtocolDao() {
		return m_collectCmdsConnProtocolDao;
	}

	public void setCollectCmdsConnProtocolDao(
			CollectCmdsConnProtocolDao collectCmdsConnProtocolDao) {
		m_collectCmdsConnProtocolDao = collectCmdsConnProtocolDao;
	}

	public CollectCmdsDao getCollectCmdsDao() {
		return m_collectCmdsDao;
	}

	public void setCollectCmdsDao(CollectCmdsDao collectCmdsDao) {
		m_collectCmdsDao = collectCmdsDao;
	}

	public MetricProcessParaDao getMetricProcessParaDao() {
		return m_metricProcessParaDao;
	}

	public void setMetricProcessParaDao(MetricProcessParaDao metricProcessParaDao) {
		m_metricProcessParaDao = metricProcessParaDao;
	}

	public MetricBindingDao getMetricBindingDao() {
		return m_metricBindingDao;
	}

	public void setMetricBindingDao(MetricBindingDao metricBindingDao) {
		m_metricBindingDao = metricBindingDao;
	}

	public void createBatch(List<MetricBindingPojo> bindings) throws ServiceException {
		if (bindings == null || bindings.isEmpty()) {
			return;
		}
		try {
			int batchResSize = 1000;// 每次入库数
			int resCount = bindings.size();// 总资源数
			int loopCount = (int) Math.ceil(resCount * 1d / batchResSize);// 循环次数
			// 导入资源实例
			for (int i = 0; i < loopCount; i++) {
				int from_index = batchResSize * i;
				int to_index = batchResSize * (i + 1);
				if (to_index > resCount) {
					to_index = resCount;
				}
				m_metricBindingDao.insert(bindings.subList(from_index, to_index));
			}
		} catch (DAOException te) {
			throw new ServiceException(te);
		}
	}
	
	public void createBatchMetricProcessPara(List<MetricProcessPara> bindings) throws ServiceException {
		if (bindings == null || bindings.isEmpty()) {
			return;
		}
		try {
			int batchResSize = 1000;// 每次入库数
			int resCount = bindings.size();// 总资源数
			int loopCount = (int) Math.ceil(resCount * 1d / batchResSize);// 循环次数
			// 导入资源实例
			for (int i = 0; i < loopCount; i++) {
				int from_index = batchResSize * i;
				int to_index = batchResSize * (i + 1);
				if (to_index > resCount) {
					to_index = resCount;
				}
				m_metricProcessParaDao.insert(bindings.subList(from_index, to_index));
			}
		} catch (DAOException te) {
			throw new ServiceException(te);
		}
	}
	public void createBatchCollectCmds(List<CollectCmdsPojo> bindings) throws ServiceException {
		if (bindings == null || bindings.isEmpty()) {
			return;
		}
		try {
			int batchResSize = 1000;// 每次入库数
			int resCount = bindings.size();// 总资源数
			int loopCount = (int) Math.ceil(resCount * 1d / batchResSize);// 循环次数
			// 导入资源实例
			for (int i = 0; i < loopCount; i++) {
				int from_index = batchResSize * i;
				int to_index = batchResSize * (i + 1);
				if (to_index > resCount) {
					to_index = resCount;
				}
				m_collectCmdsDao.insert(bindings.subList(from_index, to_index));
			}
		} catch (DAOException te) {
			throw new ServiceException(te);
		}
	}
	public void createBatchCollectCmdsConnProtocol(List<CollectCmdsConnProtocol> bindings) throws ServiceException {
		if (bindings == null || bindings.isEmpty()) {
			return;
		}
		try {
			int batchResSize = 1000;// 每次入库数
			int resCount = bindings.size();// 总资源数
			int loopCount = (int) Math.ceil(resCount * 1d / batchResSize);// 循环次数
			// 导入资源实例
			for (int i = 0; i < loopCount; i++) {
				int from_index = batchResSize * i;
				int to_index = batchResSize * (i + 1);
				if (to_index > resCount) {
					to_index = resCount;
				}
				m_collectCmdsConnProtocolDao.insert(bindings.subList(from_index, to_index));
			}
		} catch (DAOException te) {
			throw new ServiceException(te);
		}
	}
	public void createBatchCollectCmdsProcessor(List<CollectCmdsProcessor> bindings) throws ServiceException {
		if (bindings == null || bindings.isEmpty()) {
			return;
		}
		try {
			int batchResSize = 1000;// 每次入库数
			int resCount = bindings.size();// 总资源数
			int loopCount = (int) Math.ceil(resCount * 1d / batchResSize);// 循环次数
			// 导入资源实例
			for (int i = 0; i < loopCount; i++) {
				int from_index = batchResSize * i;
				int to_index = batchResSize * (i + 1);
				if (to_index > resCount) {
					to_index = resCount;
				}
				m_collectCmdsProcessorDao.insert(bindings.subList(from_index, to_index));
			}
		} catch (DAOException te) {
			throw new ServiceException(te);
		}
	}
	public void createBatchCollectCmdsProcessPara(List<CollectCmdsProcessPara> bindings) throws ServiceException {
		if (bindings == null || bindings.isEmpty()) {
			return;
		}
		try {
			int batchResSize = 1000;// 每次入库数
			int resCount = bindings.size();// 总资源数
			int loopCount = (int) Math.ceil(resCount * 1d / batchResSize);// 循环次数
			// 导入资源实例
			for (int i = 0; i < loopCount; i++) {
				int from_index = batchResSize * i;
				int to_index = batchResSize * (i + 1);
				if (to_index > resCount) {
					to_index = resCount;
				}
				m_collectCmdsProcessParaDao.insert(bindings.subList(from_index, to_index));
			}
		} catch (DAOException te) {
			throw new ServiceException(te);
		}
	}
	public void createBatchCollectCmd(List<CollectCmdPojo> bindings) throws ServiceException {
		if (bindings == null || bindings.isEmpty()) {
			return;
		}
		try {
			int batchResSize = 1000;// 每次入库数
			int resCount = bindings.size();// 总资源数
			int loopCount = (int) Math.ceil(resCount * 1d / batchResSize);// 循环次数
			// 导入资源实例
			for (int i = 0; i < loopCount; i++) {
				int from_index = batchResSize * i;
				int to_index = batchResSize * (i + 1);
				if (to_index > resCount) {
					to_index = resCount;
				}
				m_collectCmdDao.insert(bindings.subList(from_index, to_index));
			}
		} catch (DAOException te) {
			throw new ServiceException(te);
		}
	}
	public void createBatchCmdPropertie(List<CmdPropertie> bindings) throws ServiceException {
		if (bindings == null || bindings.isEmpty()) {
			return;
		}
		try {
			int batchResSize = 1000;// 每次入库数
			int resCount = bindings.size();// 总资源数
			int loopCount = (int) Math.ceil(resCount * 1d / batchResSize);// 循环次数
			// 导入资源实例
			for (int i = 0; i < loopCount; i++) {
				int from_index = batchResSize * i;
				int to_index = batchResSize * (i + 1);
				if (to_index > resCount) {
					to_index = resCount;
				}
				m_cmdPropertieDao.insert(bindings.subList(from_index, to_index));
			}
		} catch (DAOException te) {
			throw new ServiceException(te);
		}
	}
	public void createBatchCmdFilter(List<CmdFilter> bindings) throws ServiceException {
		if (bindings == null || bindings.isEmpty()) {
			return;
		}
		try {
			int batchResSize = 1000;// 每次入库数
			int resCount = bindings.size();// 总资源数
			int loopCount = (int) Math.ceil(resCount * 1d / batchResSize);// 循环次数
			// 导入资源实例
			for (int i = 0; i < loopCount; i++) {
				int from_index = batchResSize * i;
				int to_index = batchResSize * (i + 1);
				if (to_index > resCount) {
					to_index = resCount;
				}
				m_cmdFilterDao.insert(bindings.subList(from_index, to_index));
			}
		} catch (DAOException te) {
			throw new ServiceException(te);
		}
	}
	public void createBatchCmdSupport(List<CmdSupportPojo> bindings) throws ServiceException {
		if (bindings == null || bindings.isEmpty()) {
			return;
		}
		try {
			int batchResSize = 1000;// 每次入库数
			int resCount = bindings.size();// 总资源数
			int loopCount = (int) Math.ceil(resCount * 1d / batchResSize);// 循环次数
			// 导入资源实例
			for (int i = 0; i < loopCount; i++) {
				int from_index = batchResSize * i;
				int to_index = batchResSize * (i + 1);
				if (to_index > resCount) {
					to_index = resCount;
				}
				m_cmdSupportDao.insert(bindings.subList(from_index, to_index));
			}
		} catch (DAOException te) {
			throw new ServiceException(te);
		}
	}

	@Override
	public void destroy() throws ServiceException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void start() throws ServiceException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public ModelPojo getFromCache(String id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ModelPojo getFromDB(String id) throws DAOException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ModelPojo loadFile(String id, boolean updateCache) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void updateCache(ModelPojo pojos) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<ModelPojo> loadFiles(String id, boolean updateCache) {
		// TODO Auto-generated method stub
		return null;
	}
}
