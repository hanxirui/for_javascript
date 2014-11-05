'use strict';
var mysql = require('mysql');

var SqlCommand = require('../service/class/SQLCommand.js');

var RoleService = {
	queryById: function(role_id, $callback) {


        SqlCommand.getConnection(function(err, connection) {
			// Use the connection
			var sql = "select a.id,a.c_account,a.c_user_name,a.c_mail_addr,a.c_phone_num,a.c_dept,b.c_role_name,a.c_role "+
					    " from t_ml_user a join t_ml_role b on a.c_role=b.c_role_id"; 
		    var sqlWhere="";
             
             if(role_id !=='all'){
             	sqlWhere=" where b.c_role_id='" + role_id + "'";
             	sql+=sqlWhere;
             }
             //console.log(sql);
			connection.query(sql, function(err, rows) {

				if (err) {
					console.log(err);
					connection.release();
					return;
				}

				var r = rows;

				connection.release();

		   	$callback(r);


			});
		});
	},
	queryAll: function($callback) {


        SqlCommand.getConnection(function(err, connection) {
			// Use the connection
			var sql = "select c_id,c_role_id,c_role_name,c_role_content,c_role_style from t_ml_role ";

			connection.query(sql, function(err, rows) {

				if (err) {
					//console.log(err);
					connection.release();
					return;
				}

				var r = rows;

				connection.release();

				$callback(r);


			});
		});
	},
	queryUsers: function($callback) {


        SqlCommand.getConnection(function(err, connection) {
			// Use the connection
			var sql = "select id,c_account,c_user_name,c_password,c_mail_addr,c_phone_num,c_dept,c_role from t_ml_user where c_role is null";

			connection.query(sql, function(err, rows) {

				if (err) {
					//console.log(err);
					connection.release();
					return;
				}

				var r = rows;

				connection.release();

				$callback(r);


			});
		});
	},
	deleteById: function(acct_id, $callback) {

        SqlCommand.getConnection(function(err, connection) {
			// Use the connection
			if (acct_id.length > 0) {
				var sqlWhere = "";
				for (var i = 0; i < acct_id.length; i++) {
					sqlWhere += ',' + "'" + acct_id[i] + "'";
				}
				var sql = "delete  from t_ml_user where c_account in (" + sqlWhere.substring(1) + ")";
				//console.log(sql);
				connection.query(sql, function(err, rows) {

					if (err) {
						//console.log(err);
						connection.release();
						return;
					} else {
						connection.release();
						$callback();
					}



				});
			}

		});


	},
   updateById: function(role_id, $callback) {

       SqlCommand.getConnection(function(err, connection) {
			// Use the connection
		 
		     	var sqlWhere = "";
				for (var i = 0; i < role_id.length; i++) {
					sqlWhere += ',' + "'" + role_id[i] + "'";
				}
				var sql = "update t_ml_user set c_role=null where c_account in (" + sqlWhere.substring(1) + ")";
			 
			    //console.log(sql);
				connection.query(sql, function(err, rows) {

					if (err) {
						//console.log(err);
						connection.release();
						return;
					} else {
						connection.release();
						$callback();
					}



				});
		 

		});


	},
	 updateRoleById: function(role_id,acct_id, $callback) {

         SqlCommand.getConnection(function(err, connection) {
			// Use the connection
		 
		     	var sqlWhere = "";
				for (var i = 0; i < acct_id.length; i++) {
					sqlWhere += ',' + "'" + acct_id[i] + "'";
				}
				var sql = "update t_ml_user set c_role='"+role_id+"' where c_account in (" + sqlWhere.substring(1) + ")";
			 
			    //console.log(sql);
				connection.query(sql, function(err, rows) {

					if (err) {
						//console.log(err);
						connection.release();
						return;
					} else {
						connection.release();
						$callback();
					}



				});
		 

		});


	},
	save: function(userInfo, $callback) {
		console.log('good');
		var sql = "insert into t_ml_user (c_account, c_user_name, c_password,c_mail_addr,c_phone_num,c_dept) values ";
		var sqlwhere = "";
		sqlwhere = "(" + "'" + userInfo.cAccount + "'" + "," + "'" + userInfo.cUserName + "'" + "," + "'" + userInfo.cPassword + "'";

		if (userInfo.cMailAddr !== '') {
			sqlwhere += "," + "'" + userInfo.cMailAddr + "'";
		} else {
			sqlwhere += ",''";
		}

		if (userInfo.cPhoneNum !== '') {
			sqlwhere += "," + "'" + userInfo.cPhoneNum + "'";
		} else {
			sqlwhere += ",''";
		}

		if (userInfo.cDept !== '') {
			sqlwhere += ",'" + userInfo.cDept + "')";
		} else {
			sqlwhere += ",'')";
		}
		sql += sqlwhere;
		//console.log(sql);


        SqlCommand.getConnection(function(err, connection) {
			// Use the connection

			connection.query(sql, function(err, rows) {

				if (err) {
					//console.log(err);
					connection.release();
					return;
				}

				var r = rows;

				connection.release();

				$callback(r);


			});
		});


	}


};


module.exports = RoleService;