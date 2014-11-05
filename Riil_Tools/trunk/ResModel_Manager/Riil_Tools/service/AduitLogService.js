'use strict';
/**
 * Created by huanfeng on 2014/9/4.
 */
var Q = require('q');
var dateFormat = require('dateformat');

var commfunc = require('../service/func/commonfunc.js');
var SqlCommand = require('./class/SQLCommand.js');

exports.insertLog = function (paramJson) {
    if (paramJson) {
        var sqlCmd = new SqlCommand();
        var sqlStr = "INSERT INTO t_aduit_log(c_time,c_user,c_info) VALUES(:time,:userId,:info)";
        var currentTime = commfunc.getFormatDateTime();
        return sqlCmd.saveBySqlInsert(sqlStr, {time: currentTime, userId: paramJson.userId, info: paramJson.info});
    }
};

exports.getAduitLogList = function () {
    var sqlStr = "SELECT c_user,c_time,c_info FROM t_aduit_log";
    var sqlCmd = new SqlCommand();
    return sqlCmd.getBySql(sqlStr).then(function (rs) {
        rs.rows.forEach(function (row) {
            row.c_time = dateFormat(row.c_time, "yyyy-mm-dd HH:MM:ss");
        });
        return rs;
    });
};