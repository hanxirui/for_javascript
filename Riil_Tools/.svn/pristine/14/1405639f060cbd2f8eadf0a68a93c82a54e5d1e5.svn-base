'use strict';
/**
 * Created by huanfeng on 2014/9/4.
 */

var DataSource = require('../service/class/DataSource.js');
var RecordSet = require('../service/class/RecordSet.js');
var commfunc = require('../service/func/commonfunc.js');
var q = require('q');

//指标定义参数定义
var aduitLogParameter = {
    user: "",
    content: ""
};
exports.AduitLogParam = aduitLogParameter;

exports.insertLog = function(paramJson) {
    var recordSet = new RecordSet();
    var getQ = q.defer();
    try {
        return DataSource.getSession().then(function (session) {
            var currentTime = commfunc.getFormatDateTime();
            paramJson.time = currentTime;
            console.log(currentTime);
            var sqlStr = "INSERT INTO t_aduit_log(c_time,c_user,c_info) VALUES(:time,:user,:info)";
            return session.insert(sqlStr, paramJson)
                .fin(function () {
                    DataSource.release(session);
                });
        })
        .then(function (insertId) {
            console.log('insert:', arguments);
            console.log("insert id" + insertId);
            recordSet.isError = false;
            recordSet.errMessage = "AduitLog.insert succeed";
            getQ.resolve(recordSet);
        })
        .fail(function (err) {
            recordSet.isError = true;
            recordSet.errMessage = 'AduitLog.insert error, error message = ' + err.toString();
            getQ.reject(recordSet);
        });
    }catch (er) {
        logger.writeErr('AduitLog.insert error,' + er);
        recordSet.isError = true;
        recordSet.errMessage = errMsg;
        getQ.reject(recordSet);
    }
    return getQ.promise;
};