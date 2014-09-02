'use strict';
/**
 * Created by huanfeng on 2014/9/1.
 */
var Q = require('q');
var SqlCommand = require('../service/class/SQLCommand.js');
var commander = new SqlCommand();
var sqlObj = require('../conf/config.json').sql;

//指标定义参数定义
var metricGroupParameter = {
    groupId: "",
    groupName: "",
    groupDesc: ""
};

exports.MetricGroupParam = metricGroupParameter;


exports.getMetricGroupList = function() {
    var getQ = Q.defer();
    var fieldID = "groupId";
    var fieldName = "groupName";
    commander.get('t_moni_metric_group.select', []).then(function (recordset) {
        var jsonStr = JSON.stringify(recordset);
        console.info(jsonStr);
        var recordObj = JSON.parse(jsonStr);
        if (recordObj.isError) {
            getQ.reject(recordObj);
        } else {
            getQ.resolve(recordObj);
        }
    }).fail(function (err) {
        getQ.reject(err);
    });
    return getQ.promise;
};

exports.saveMetricGroup = function (sqlparam) {
    var myQ = Q.defer();
    console.log(sqlparam);
        commander.save("t_moni_metric_group.insert", sqlparam).then(function (recordset) {
        myQ.resolve(recordset);
    }).fail(function (err) {
        myQ.reject(err);
    });
    return myQ.promise;
};

exports.updataMetricGroup = function (sqlparam) {
    var myQ = Q.defer();
    commander.save("t_moni_metric_group.update",sqlparam).then(function (recordset) {
        myQ.resolve(recordset);
    }).fail(function (err) {
        myQ.reject(err);
    });
    return myQ.promise;
};



exports.deleteMetricGroupById = function (groupId) {
    var myQ = Q.defer();
    var delJson ={
        groupIds:groupId
    };
    commander.del("t_moni_metric_group.delete", delJson).then(function (recordset) {
        myQ.resolve(recordset);
    }).fail(function (err) {
        myQ.reject(err);
    });
    return myQ.promise;
};

exports.getMetricGroupById = function(groupId){
    var myQ = Q.defer();
    commander.get("t_moni_metric_group.selectById", [groupId]).then(function (recordset) {
        myQ.resolve(recordset);
    }).fail(function (err) {
        myQ.reject(err);
    });
    return myQ.promise;
};

exports.checkMetricGroupId = function(groupId){
    var myQ = Q.defer();
    var sqlKey = "t_moni_metric_group.selectById";

    commander.get("t_moni_metric_group.selectById", [groupId]).then(function (recordset) {
        myQ.resolve(recordset);
    }).fail(function (err) {
        myQ.reject(err);
    });
    return myQ.promise;
};