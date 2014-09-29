var SqlCommand = require('./class/SQLCommand.js');
var Q = require('q');
var commander = new SqlCommand();

var ManufService = {
	/**查询所有厂商信息*/
	queryAllManufInfos: function($callback) {
		var sql = "SELECT c_manuf_id as c_id,c_manuf_id,c_manuf_name,c_photoid,c_manuf_icon,c_operator,'1' AS flag FROM t_ml_manuf  union all "
				+ "SELECT '' as c_id,c_id AS c_manuf_id,c_name AS c_manuf_name,'' AS c_photoid,'' AS c_manuf_icon,'系统预置' AS c_operator,'-1' AS flag FROM t_moni_vendor";
		commander.getBySql(sql, []).then(function(recordset){
		    $callback(recordset.rows);
		}).fail(function(err){
    		console.log(err.toString());
		});
	},
	/**添加厂商信息*/
	save: function(manufInfo, $callback) {
		var logContent = "厂商管理插入数据id:" + manufInfo.cManufId + ",name:" + manufInfo.cManufName + ",icon:" + manufInfo.cManufIcon;
		var sql = "insert into t_ml_manuf (c_manuf_id, c_manuf_name,c_photoid,c_manuf_icon,c_operator) values(:cManufId, :cManufName, :cManufPhoto, :cManufIcon, :cOperator)";
		commander.saveBySqlInsert(sql, manufInfo, {user:manufInfo.cOperator,info:logContent}).then(function(recordset){
		    $callback(recordset.rows);
		}).fail(function(err){
    		console.log(err.toString());
		});
	},
	/**根据ID删除对应厂商信息*/
	deleteById: function(data, $callback) {
		if(data.manuf_ids.length > 0){
			var delIds = {
				'delIds' : data.manuf_ids
			};
			var logContent = "厂商管理删除数据";
			var sql = "delete  from t_ml_manuf where c_manuf_id in (:delIds)";
			commander.delBySql(sql, delIds, {user:data.operator,info:logContent}).then(function(recordset){
			    $callback(recordset.rows);
			}).fail(function(err){
	    		console.log(err.toString());
			});
		}
	},
	/**根据ID查询厂商信息*/
	queryManufInfoById: function(manufId, $callback) {
		var sql = "SELECT c_manuf_id,c_manuf_name,c_photoid,c_manuf_icon,c_operator FROM t_ml_manuf where c_manuf_id = :manufId";
		commander.getBySql(sql, {'manufId' : manufId}).then(function(recordset){
		    $callback(recordset.rows);
		}).fail(function(err){
    		console.log(err.toString());
		});
	},
	/**根据厂商ID更新厂商信息*/
	update: function(manufInfo, $callback) {
		var logContent = "厂商管理修改数据 id:" + manufInfo.cManufId;
		var sql = "update t_ml_manuf set c_manuf_name=:cManufName,c_photoid=:cManufPhoto,c_manuf_icon=:cManufIcon where c_manuf_id=:cManufId";
		commander.saveBySqlUpdate(sql, manufInfo, {user:manufInfo.operator,info:logContent}).then(function(recordset){
		    $callback(recordset.rows);
		}).fail(function(err){
    		console.log(err.toString());
		});
	},
	queryImgName : function(imgName, $callback){
		var sql = "SELECT temp.c_manuf_id FROM (SELECT c_manuf_id,c_manuf_icon FROM t_ml_manuf UNION ALL SELECT c_id AS c_manuf_id,c_vendor_icon AS c_manuf_icon FROM t_moni_vendor) temp WHERE temp.c_manuf_icon = :imgName";
		commander.getBySql(sql, {'imgName' : imgName}).then(function(recordset){
		    $callback(recordset.rows);
		}).fail(function(err){
    		console.log(err.toString());
		});
	},
	queryIconById : function(id, $callback){
		var sql = "SELECT temp.c_manuf_icon FROM (SELECT c_manuf_id,c_manuf_icon FROM t_ml_manuf UNION ALL SELECT c_id AS c_manuf_id,c_vendor_icon AS c_manuf_icon FROM t_moni_vendor) temp WHERE temp.c_manuf_id = :id";
		commander.getBySql(sql, {'id' : id}).then(function(recordset){
		    $callback(recordset.rows);
		}).fail(function(err){
    		console.log(err.toString());
		});
	}
};


module.exports = ManufService;