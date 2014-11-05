'use strict';
/**
 * Created by huanfeng on 2014/9/1.
 */
var Q = require('q');
var SqlCommand = require('../service/class/SQLCommand.js');
var commander = new SqlCommand();
var sqlObj = require('../conf/config.json').sql;
var AduitLogService = require('../service/AduitLogService');

//指标定义参数定义
var metricGroupParameter = {
    groupId: "",
    groupName: "",
    groupDesc: ""
};

exports.MetricGroupParam = metricGroupParameter;


exports.getMetricGroupList = function() {
    return commander.get('t_moni_metric_group.select', []);
};

exports.saveMetricGroup = function (sqlparam,aduitJson) {
    var myQ = Q.defer();
    var logContent = "指标组管理插入数据id:" + sqlparam.groupId;
    commander.save("t_moni_metric_group.insert", sqlparam, {userId:sqlparam.operator,info:logContent}).then(function (recordset) {
        if(aduitJson){
            AduitLogService.insertLog(aduitJson);
        }
        myQ.resolve(recordset);
    }).fail(function (err) {
        myQ.reject(err);
    });
    return myQ.promise;
};

exports.updataMetricGroup = function (sqlparam,aduitJson) {
    var myQ = Q.defer();
    var logContent = "指标组管理修改数据id:" + sqlparam.groupId;
    commander.save("t_moni_metric_group.update",sqlparam, {userId:sqlparam.operator,info:logContent}).then(function (recordset) {
        if(aduitJson){
            AduitLogService.insertLog(aduitJson);
        }
        myQ.resolve(recordset);
    }).fail(function (err) {
        myQ.reject(err);
    });
    return myQ.promise;
};



exports.deleteMetricGroupById = function (data,aduitJson) {
    var myQ = Q.defer();
    var delJson ={
        groupIds:data.ids
    };
    var logContent = "指标组管理删除数据";
    commander.del("t_moni_metric_group.delete", delJson, {userId:data.operator,info:logContent}).then(function (recordset) {
        if(aduitJson){
            AduitLogService.insertLog(aduitJson);
        }
        myQ.resolve(recordset);
    }).fail(function (err) {
        myQ.reject(err);
    });
    return myQ.promise;
};

exports.getMetricGroupById = function(groupId){
    var myQ = Q.defer();
    commander.get("t_moni_metric_group_by_id.select", [groupId]).then(function (recordset) {
        myQ.resolve(recordset);
    }).fail(function (err) {
        myQ.reject(err);
    });
    return myQ.promise;
};

exports.checkMetricGroupId = function(groupId){
    var myQ = Q.defer();
    commander.get("t_moni_metric_group_by_id.select", [groupId]).then(function (recordset) {
        myQ.resolve(recordset);
    }).fail(function (err) {
        myQ.reject(err);
    });
    return myQ.promise;
};