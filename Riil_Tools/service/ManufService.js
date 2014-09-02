var SqlCommand = require('./class/SQLCommand.js');
var Q = require('q');
var commander = new SqlCommand();

var ManufService = {
	/**查询所有厂商信息*/
	queryAllManufInfos: function($callback) {
		var sql = "SELECT c_manuf_id as c_id,c_manuf_id,c_manuf_name,c_photoid,c_manuf_icon,c_operator,'1' AS flag FROM t_ml_manuf  union all "
				+ "SELECT '' as c_id,c_id AS c_manuf_id,c_name AS c_manuf_name,'' AS c_photoid,'' AS c_manuf_icon,'admin' AS c_operator,'-1' AS flag FROM t_moni_vendor";
		commander.getBySql(sql, []).then(function(recordset){
		    $callback(recordset.rows);
		}).fail(function(err){
    		console.log(err.toString());
		});
	},
	/**添加厂商信息*/
	save: function(manufInfo, $callback) {
		var sql = "insert into t_ml_manuf (c_manuf_id, c_manuf_name,c_photoid,c_manuf_icon,c_operator) values(:cManufId, :cManufName, :cManufPhoto, :cManufIcon, :cOperator)";
		commander.saveBySqlInsert(sql, manufInfo).then(function(recordset){
		    $callback(recordset.rows);
		}).fail(function(err){
    		console.log(err.toString());
		});
	},
	/**根据ID删除对应厂商信息*/
	deleteById: function(manuf_ids, $callback) {
		if(manuf_ids.length > 0){
			var delIds = {
				'delIds' : manuf_ids
			};
			var sql = "delete  from t_ml_manuf where c_manuf_id in (:delIds)";
			commander.delBySql(sql, delIds).then(function(recordset){
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
		var sql = "update t_ml_manuf set c_manuf_name=:cManufName,c_photoid=:cManufPhoto,c_manuf_icon=:cManufIcon where c_manuf_id=:cManufId";
		commander.saveBySqlUpdate(sql, manufInfo).then(function(recordset){
		    $callback(recordset.rows);
		}).fail(function(err){
    		console.log(err.toString());
		});
	}
};


module.exports = ManufService;