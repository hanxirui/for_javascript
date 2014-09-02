'use strict';

/**
 * Created by R04419 on 2014/8/29.
 */

var metric_base = require('../MetricBaseLib.js'),
    comm_func = require('../func/commonfunc.js');
 var  MetricBaseParam = require('../func/MetricBaseParameter');
 var  MetricGroupRelParam = require('../func/MetricGroupRelParameter');

//获取指标库列表数据
metric_base.getMetricBaseList().then(function (recordSet) {
    var jsonStr = JSON.stringify(recordSet);
    console.log('指标库 列表数据   ' + jsonStr);
}).fail(function (err) {
    var jstr = JSON.stringify(err);
    var jobj = JSON.parse(jstr);
    console.error(jobj.errMessage);
});

//获取指标库 类型 列表数据
metric_base.getMetricTypeList().then(function (recordset) {
    var jsonStr = JSON.stringify(recordset);
    console.log('类型 列表数据  ' + jsonStr);
}).fail(function (err) {
    var jstr = JSON.stringify(err);
    var jobj = JSON.parse(jstr);
    console.error(jobj.errMessage);
});


//获取指标库 分组 列表数据
metric_base.getMetricGroupList().then(function (recordset) {
    var jsonStr = JSON.stringify(recordset);
    console.log('分组 列表数据 ' + jsonStr);
}).fail(function (err) {
    var jstr = JSON.stringify(err);
    var jobj = JSON.parse(jstr);
    console.error(jobj.errMessage);
});


//添加自定义指标
//"INSERT INTO t_moni_metric_base(c_id,c_name,c_desc,c_metric_type,c_unit,c_data_type,c_is_custom,c_user_id)
// VALUES
// (:metric_id,:metric_name,:metric_desc,:metric_type,:metric_unit,:metric_datatype,:metric_iscustom,:userid)

var metricBaseParam = new MetricBaseParam();
metricBaseParam.param.metric_id = comm_func.getUUID();
metricBaseParam.param.metric_name = "my_test";
metricBaseParam.param.metric_desc = "测试";
metricBaseParam.param.metric_datatype = "STRING";
metricBaseParam.param.metric_type = "INFO";
metricBaseParam.param.metric_unit = "GB";
metricBaseParam.param.metric_iscustom = 1;
metricBaseParam.param.userid = "R04419";

metric_base.saveMetricBase(metricBaseParam.param).then(function (recordset) {
    var jsonStr = JSON.stringify(recordset);
    console.log('添加 自动定义指标 ' + jsonStr);
}).fail(function (err) {
    var jstr = JSON.stringify(err);
    var jobj = JSON.parse(jstr);
    console.error(jobj.errMessage);
});

//添加自定义指标组关系
//
var metricGroupRel_Param = new MetricGroupRelParam();
metricGroupRel_Param.param.metricid = "my_metrictest_id4";
metricGroupRel_Param.param.groupid = "AvailabilityGroup";
metric_base.saveMetricGroupRelation(metricGroupRel_Param.param).then(function (recordset) {
    var jsonStr = JSON.stringify(recordset);
    console.log('添加 自动定义指标组关系 ' + jsonStr);
}).fail(function (err) {
    var jstr = JSON.stringify(err);
    var jobj = JSON.parse(jstr);
    console.error(jobj.errMessage);
});


//删除自定义指标
metric_base.deleteMetricBaseById(['323fbcc4-7c32-4948-9223-62ce17324e83','528cbc2c-a76c-4df9-87c4-9d85e43116b8','111']).then(function (recordset) {
    var jsonStr = JSON.stringify(recordset);
    console.log('删除 自动定义指标 ' + jsonStr);
}).fail(function (err) {
    var jstr = JSON.stringify(err);
    var jobj = JSON.parse(jstr);
    console.error(jobj.errMessage);
});


//指标库条件查询
var metricBaseParam2 = new MetricBaseParam();
metricBaseParam2.param.metric_id = "my_metrictest_id4";
metricBaseParam2.param.metric_name = "my_test4";
metricBaseParam2.param.metric_type = "INFO";
metric_base.getMetricBaseByCondition(metricBaseParam2.param).then(function (recordset) {
    var jsonStr = JSON.stringify(recordset);
    console.log('指标列表条件查询 ' + jsonStr);
}).fail(function (err) {
    var jstr = JSON.stringify(err);
    var jobj = JSON.parse(jstr);
    console.error(jobj.errMessage);
});

//修改自定义指标
var metricBaseParam3 = new MetricBaseParam();
metricBaseParam3.param.metric_name = "my_metrictest_id4";
metricBaseParam3.param.metric_desc = "测试_4";
metricBaseParam3.param.metric_datatype = "STRING";
metricBaseParam3.param.metric_type = "INFO";
metricBaseParam3.param.metric_unit = "GB";
metricBaseParam3.param.metric_iscustom = 1;
metricBaseParam3.param.userid = "R04419";

metricBaseParam3.param.metric_id = "1f28e0bd-43c6-4bf5-93f4-5b32512007e9";

metric_base.saveMetricBaseModify(metricBaseParam3.param).then(function (recordset) {
    var jsonStr = JSON.stringify(recordset);
    console.log('修改指标 数据 ' + jsonStr);
}).fail(function (err) {
    var jstr = JSON.stringify(err);
    var jobj = JSON.parse(jstr);
    console.error(jobj.errMessage);
});

//删除指标与指标组关系
metric_base.deleteMetricGroupRelByMetricId(['my_metrictest_id4']).then(function (recordset) {
    var jsonStr = JSON.stringify(recordset);
    console.log('删除指标与指标组关系 ' + jsonStr);
}).fail(function (err) {
    var jstr = JSON.stringify(err);
    var jobj = JSON.parse(jstr);
    console.error(jobj.errMessage);
});

