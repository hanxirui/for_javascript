'use strict';
var mysql = require('mysql');

var SqlCommand = require('../service/class/SQLCommand.js');

var UserService = {
	checkUser: function(user_name, password, $callback) {


        SqlCommand.getConnection(function(err, connection) {
			// Use the connection
			var sql = "select a.id,a.c_account,a.c_user_name,a.c_mail_addr,a.c_phone_num,a.c_dept,b.c_role_name,a.c_role " +
				" from t_ml_user a join t_ml_role b on a.c_role=b.c_role_id where a.c_account=? and a.c_password=?";
			var param = [user_name, password];
             
			connection.query(sql, param, function(err, rows) {

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

	checkUserName: function(user_name, ori_user_name, $callback) {


        SqlCommand.getConnection(function(err, connection) {
			// Use the connection
			var sql = "select id from t_ml_user where c_user_name!=? and c_user_name=?";
			var param = [ori_user_name, user_name];
			//console.log(param);
			connection.query(sql, param, function(err, rows) {

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
	queryById: function(acct_id, $callback) {


        SqlCommand.getConnection(function(err, connection) {
			// Use the connection
			var sql = "select id,c_account,c_user_name,c_password,c_mail_addr,c_phone_num,c_dept,c_role from t_ml_user where c_account='" + acct_id + "'";

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
	queryAll: function(pageInfo, $callback) {

		//console.log(pageInfo);
        SqlCommand.getConnection(function(err, connection) {
			// Use the connection
			var sql = "select id,c_account,c_user_name,c_password,c_mail_addr,c_phone_num,c_dept,c_role from t_ml_user ";
			var limitSQL = " limit " + pageInfo.index + ", " + pageInfo.PageLast;
			sql += limitSQL;
			//console.log(sql);
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
	update: function(userInfo, $callback) {

		var sql = "update t_ml_user set c_user_name=?,c_mail_addr=?,c_phone_num=?,c_dept=? where c_account=?";
		var param = [];


		param.push(userInfo.cUserName);
		param.push(userInfo.cMailAddr);
		param.push(userInfo.cPhoneNum);
		param.push(userInfo.cDept);
		param.push(userInfo.cAccount);


        SqlCommand.getConnection(function(err, connection) {
			// Use the connection

			connection.query(sql, param, function(err, rows) {

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
	save: function(userInfo, $callback) {

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


module.exports = UserService;