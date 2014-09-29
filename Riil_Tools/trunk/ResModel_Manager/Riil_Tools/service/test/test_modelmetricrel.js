'use strict';

/**
 * Created by R04419 on 2014/8/29.
 */

var modelmetric_rel = require('../ResourceModelRelation.js'),
    comm_func = require('../func/commonfunc.js');
 var  ModelMetricRelParam = require('../func/ModelMetricRelParameter');
var SqlCommand = require('../class/SQLCommand.js'),
    commander = new SqlCommand();


//获取模型与指标关系列表数据
modelmetric_rel.getModelMetricRelationData('RIIL_RMM_DB_DM').then(function (recordSet) {
    var jsonStr = JSON.stringify(recordSet);
    console.log('模型与指标关系  列表数据   ' + jsonStr);
}).fail(function (err) {
    var jstr = JSON.stringify(err);
    var jobj = JSON.parse(jstr);
    console.error(jobj.errMessage);
});

//获取模型的详细指标列表数据
modelmetric_rel.getModelMetricList('RIIL_RMM_DB_DB2').then(function (recordSet) {
    var jsonStr = JSON.stringify(recordSet);
    console.log('模型id 对应的指标 列表数据   ' + jsonStr);
}).fail(function (err) {
    var jstr = JSON.stringify(err);
    var jobj = JSON.parse(jstr);
    console.error(jobj.errMessage);
});


//添加模型与 指标关系
//
//var modelMetricRelParam = new ModelMetricRelParam();
//modelMetricRelParam.param.modelid = "RIIL_RMM_BUSINESSAPPLICATION";
//modelMetricRelParam.param.metricid = ["AppAvail","AppResponseTime","Busy","DownNumber","DownTime","Health","OnlineUserCount","Usability"];
//modelMetricRelParam.param.restypeid="RIIL_RMT_BUSINESSAPPLICATION";
//modelmetric_rel.saveModelMetricRelation(modelMetricRelParam.param).then(function (recordset) {
//    commander.session.commit();
//    var jsonStr = JSON.stringify(recordset);
//    console.log('添加 模型与指标关系 ' + jsonStr);
//}).fail(function (err) {
//    commander.session.rollback();
//    var jstr = JSON.stringify(err);
//    var jobj = JSON.parse(jstr);
//    console.error(jobj.errMessage);
//});


////删除自定义指标
//modelmetric_rel.deleteModelMetricRelation('RIIL_RMM_BUSINESSAPPLICATION_test','').then(function (recordset) {
//    var jsonStr = JSON.stringify(recordset);
//    console.log('删除 模型与指标关系 ' + jsonStr);
//}).fail(function (err) {
//    var jstr = JSON.stringify(err);
//    var jobj = JSON.parse(jstr);
//    console.error(jobj.errMessage);
//});



