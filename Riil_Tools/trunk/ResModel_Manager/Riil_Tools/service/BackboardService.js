'use strict';
var SqlCommand = require('./class/SQLCommand.js');
var Q = require('q');
var commander = new SqlCommand();

var BackboardService = {
	
	//查询项目名称是否重复
	queryByPN: function(project_name, $callback) {

		var sql = "select count(c_id) as count from t_ml_back_plane where c_project_name = ?";
		commander.getBySql(sql, [project_name]).then(function(recordset){
		var count = recordset.rows[0].count;
	    $callback(count);
		}).fail(function(err){
    	console.log(err.toString());
		});
	},

	//上传背板
	insertBg: function(bgInfo, $callback) {
        var userId="liutong";
        var logContent = "背板信息管理,插入操作:" + "projectName:" + bgInfo.projectName + ",c_backplane_name:"+bgInfo.bpName ;
		var sql = "insert t_ml_back_plane (c_backplane_name,c_project_name,c_ventor,c_equipment_type,c_apply_date,c_operator_id,c_desc) values"+
		"(?,?,?,?,?,?,?)";
		var param = [bgInfo.bpName,bgInfo.projectName,bgInfo.ventor,bgInfo.equipment,bgInfo.applyDate,bgInfo.operator];
		if(bgInfo.desc===''){
			param.push('-');
		}else{
			param.push(bgInfo.desc);
		}
		commander.saveBySqlInsert(sql, param,{user:userId,info:logContent}).then(function(recordset){
		var flag = recordset.isError;
	    $callback(flag);
		}).fail(function(err){
    	console.log(err.toString());
		});
	},

	queryBpData : function($callback){
		var sql = "select c_id,c_backplane_name,c_project_name,c_ventor,c_equipment_type,c_apply_date,c_operator_id,c_desc from t_ml_back_plane";
		commander.getBySql(sql, []).then(function(recordset){
	    $callback(recordset.rows);
		}).fail(function(err){
    	console.log(err.toString());
		});
	},
	deleteBpData : function(backGroudId,$callback){
        var userId="liutong";
        var logContent = "背板信息管理,删除操作:" + "backGroudId:" + backGroudId[0] ;
		var sql = "delete from t_ml_back_plane where c_id in(:id)";
		var data ={
			id:backGroudId
		};
		commander.delBySql(sql, data,{user:userId,info:logContent}).then(function(recordset){
	    $callback(recordset.isError);
		}).fail(function(err){
    	console.log(err.toString());
		});
	},
	queryById : function(backGroudId,$callback){
		var sql = "select c_id,c_backplane_name,c_project_name,c_ventor,c_equipment_type,c_apply_date,c_operator_id,c_desc from t_ml_back_plane where c_id=?";
		commander.getBySql(sql, [backGroudId]).then(function(recordset){
	    $callback(recordset.rows);
		}).fail(function(err){
    	console.log(err.toString());
		});
	},
	upDataBackPlane : function(bgInfo,$callback){
        var userId="liutong";
        var logContent = "背板信息管理,修改操作:" + "c_id:" + bpId ;
		var sql = "update t_ml_back_plane set c_backplane_name=:bpName,c_project_name=:projectName,c_ventor=:ventor,c_equipment_type=:equipment,c_apply_date=:applyDate,c_operator_id=:operator,c_desc=:desc where c_id=:bpId";
		commander.getBySql(sql, bgInfo,{user:userId,info:logContent}).then(function(recordset){
	    $callback(recordset.isError);
		}).fail(function(err){
    	console.log(err.toString());
		});
	}
};


module.exports = BackboardService;