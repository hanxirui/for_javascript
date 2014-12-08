var SqlCommand = require('./class/SQLCommand.js');
var Q = require('q');
var commander = new SqlCommand();
var AduitLogService = require('../service/AduitLogService');

var VendorService = {
	/**查询所有主模型信息*/
	queryAllModelInfos: function() {
		var myQ = Q.defer();
		var sql = "SELECT c_id,c_name FROM t_moni_model_base WHERE c_is_main = 1";
		commander.getBySql(sql, []).then(function(recordset){
		    myQ.resolve(recordset.rows);
		}).fail(function(err){
    		myQ.reject(err);
		});
		return myQ.promise;
	},
	/**check sysoid or name是否重复*/
	checkSysoidOrNameRepeat: function(vendorInfo) {
		var myQ = Q.defer();
		var sql = "SELECT c_id, c_vendor_oid,c_model_number FROM ( SELECT c_id,c_vendor_oid,c_model_number FROM t_resmodel_vendor UNION ALL SELECT c_id,'' AS c_vendor_oid,c_model_number FROM t_vendor_model ) temp where 1=1 ";
		if(vendorInfo.sysoid !== ''){
			sql += " AND c_vendor_oid = :sysoid";
		}
		if(vendorInfo.vendorName !== ''){
			sql += " AND C_MODEL_NUMBER = :vendorName";
		}
		if(vendorInfo.id !== ''){
			sql += " AND c_id != :id";
		}
		commander.getBySql(sql, vendorInfo).then(function(recordset){
		    myQ.resolve(recordset.rows);
		}).fail(function(err){
    		myQ.reject(err);
		});
		return myQ.promise;
	},
	/**添加厂商型号信息*/
	save: function(vendorInfo, aduitJson) {
		var myQ = Q.defer();
		var sql = "insert into t_resmodel_vendor (C_ID, C_VENDOR_ID,C_VENDOR_NAME,C_VENDOR_OID,C_DEV_TYPE,C_MODEL_TYPE,C_SERIES,C_MODEL_NUMBER,C_DEV_NAME,C_OPERATOR) values "
				+ "(:id, :manufID, :manufName, :sysoid, :deviceId, :modelID, :series, :number, :deviceName, :operator)";
		commander.saveBySqlInsert(sql, vendorInfo).then(function(recordset){
			if (aduitJson) {
				AduitLogService.insertLog(aduitJson);
			}
		    myQ.resolve(recordset.rows);
		}).fail(function(err){
    		myQ.reject(err);
		});
		return myQ.promise;
	},
	/**查询所有厂商型号信息*/
	queryAllVendorInfos: function() {
		var myQ = Q.defer();
		var sql = "SELECT v.c_id,v.c_vendor_id,v.c_vendor_name,c_vendor_oid,c_dev_type,C_DEV_NAME,c_model_type,c_series,c_model_number,b.c_name,flag,c_operator "
				+ " FROM ("
				+ " SELECT c_id,c_vendor_id,c_vendor_name,c_vendor_oid,c_dev_type,C_DEV_NAME,c_model_type,c_series,c_model_number,'1' AS flag,c_operator FROM t_resmodel_vendor "
				+ " UNION ALL "
				+ " SELECT c_id,c_vendor_id,c_vendor_name,'' AS c_vendor_oid,'' AS c_dev_type,'' AS c_dev_name,'' AS c_model_type,c_series,c_model_number,'-1' AS flag,'' AS c_operator FROM t_vendor_model "
				+ " ) v LEFT JOIN t_moni_model_base b ON v.C_MODEL_TYPE = b.c_id ";
		commander.getBySql(sql, []).then(function(recordset){
		    myQ.resolve(recordset.rows);
		}).fail(function(err){
    		myQ.reject(err);
		});
		return myQ.promise;
	},
	/**查询操作*/
	queryVendorInfos : function(vendorInfo){
		var myQ = Q.defer();
		var sql = "SELECT v.c_id,v.c_vendor_id,v.c_vendor_name,c_vendor_oid,c_dev_type,C_DEV_NAME,c_model_type,c_series,c_model_number,b.c_name,flag,c_operator "
				+ " FROM ("
				+ " SELECT c_id,c_vendor_id,c_vendor_name,c_vendor_oid,c_dev_type,C_DEV_NAME,c_model_type,c_series,c_model_number,'1' AS flag,c_operator FROM t_resmodel_vendor "
				+ " UNION ALL "
				+ " SELECT c_id,c_vendor_id,c_vendor_name,'' AS c_vendor_oid,'' AS c_dev_type,'' AS c_dev_name,'' AS c_model_type,c_series,c_model_number,'-1' AS flag,'' AS c_operator FROM t_vendor_model "
				+ " ) v LEFT JOIN t_moni_model_base b ON v.C_MODEL_TYPE = b.c_id where 1=1 ";
		if(vendorInfo.manufID !== ''){
			sql += " AND v.C_VENDOR_ID = :manufID";
		}
		if(vendorInfo.number !== ''){
			sql += " AND C_MODEL_NUMBER LIKE '%" + vendorInfo.number + "%'";
		}
		commander.getBySql(sql, vendorInfo).then(function(recordset){
		    myQ.resolve(recordset.rows);
		}).fail(function(err){
    		myQ.reject(err);
		});
		return myQ.promise;
	},
	/**根据ID删除对应厂商型号信息*/
	deleteById: function(data, aduitJson) {
		if(data.vendorIds.length > 0){
			var delIds = {
				'delIds' : data.vendorIds
			};
			var myQ = Q.defer();
			var sql = "delete  from t_resmodel_vendor where c_id in (:delIds)";
			commander.delBySql(sql, delIds).then(function(recordset){
				if (aduitJson) {
					AduitLogService.insertLog(aduitJson);
				}
			    myQ.resolve(recordset.rows);
			}).fail(function(err){
	    		myQ.reject(err);
			});
			return myQ.promise;
		}
	},
	/**根据ID查询厂商型号信息*/
	queryVendorInfoById: function(vendorId) {
		var myQ = Q.defer();
		var sql = "SELECT v.c_id,v.c_vendor_id,v.c_vendor_name,c_vendor_oid,c_dev_type,C_DEV_NAME,c_model_type,c_series,c_model_number,b.c_name FROM t_resmodel_vendor v LEFT JOIN t_moni_model_base b ON v.C_MODEL_TYPE = b.c_id  where v.c_vendor_oid = :vendorId ";
		commander.getBySql(sql, {'vendorId' : vendorId}).then(function(recordset){
		    myQ.resolve(recordset.rows);
		}).fail(function(err){
    		myQ.reject(err);
		});
		return myQ.promise;
	},
	/**根据ID更新厂商型号信息*/
	update: function(vendorInfo, aduitJson) {
		var myQ = Q.defer();
		var sql = "update t_resmodel_vendor set C_VENDOR_ID=:manufID,C_VENDOR_NAME=:manufName,C_VENDOR_OID=:sysoid,C_DEV_TYPE=:deviceId,C_MODEL_TYPE=:modelID,C_SERIES=:series,C_MODEL_NUMBER=:number,C_DEV_NAME=:deviceName where c_id=:cid";
		commander.saveBySqlUpdate(sql, vendorInfo).then(function(recordset){
			if (aduitJson) {
				AduitLogService.insertLog(aduitJson);
			}
		    myQ.resolve(recordset.rows);
		}).fail(function(err){
    		myQ.reject(err);
		});
		return myQ.promise;
	}
};


module.exports = VendorService;