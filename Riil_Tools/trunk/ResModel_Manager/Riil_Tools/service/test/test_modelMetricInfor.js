/**
 * Created by R04419 on 2014/9/15.
 */

'use strict';

/**
 * Created by R04419 on 2014/8/29.
 */

var modelmetric_infor = require('../ModelMetricInfor.js'),
    comm_func = require('../func/commonfunc.js');
var SqlCommand = require('../class/SQLCommand.js'),
    commander = new SqlCommand();


////获取模型与指标关系列表数据
/*modelmetric_infor.getMetricDetailById('RIIL_RMM_DB_DB2', 'CPURate').then(function (recordSet) {
 console.log(recordSet.rows);
 }).fail(function (err) {
 console.error(err);
 });*/

/*var modelMetric ={
 metricId: 'CPURate1',
 resTypeId: 'RIIL_RMT_DB_DB2',
 isInstance: 1,
 isInitValue: 1,
 isDisplayName: 1,
 modelId: 'RIIL_RMM_DB_DB2',
 metricBindingId: '',

 cmdGroupId: '',
 isDefault: '-1',
 isDynamic: '1',
 cmdId: '',
 cmdIndex: '1',
 cmdProtocol: 'JDBC',
 cmd: 'select PercentProcessorTime, Timestamp_Sys100NS from Win32_PerfRawData_PerfProc_Process',

 propName: 'collectType1',
 propValue:'WALK1'
 };
 modelmetric_infor.addModelMetricAndCollectParam(modelMetric).then(function (rs){
 console.log(rs);
 }).fail(function (err) {
 console.error(err);
 });*/

/*modelmetric_infor.getModelMetricDetailByModelId('RIIL_RMM_DB_DB2').then(function (recordSet) {
 var jsonStr = JSON.stringify(recordSet);
 console.log('根据模型ID 取模型下的详细指标数据   ' + jsonStr);
 console.log(recordSet.rows.length);
 }).fail(function (err) {
 console.error(err);
 });*/

/*var cmdSupport = {
 cmdGroupId: 'e613e932-7e31-4d22-8c8e-70d0d2c6d5d7',
 metricBindingId: '1',
 cmdId: '3dbaaeb4-57ea-48ad-9851-0c5f07d793a7',
 cmdVersion: '2',
 rel: '3'
 };
 modelmetric_infor.saveMetricCmdSupport(cmdSupport).then(function (recordSet) {
 console.log(recordSet);
 }).fail(function (err) {
 console.error(err);
 });*/

var cmdSupport = {
    cmdGroupId: 'e613e932-7e31-4d22-8c8e-70d0d2c6d5d7',
    //cmdGroupId: '1',
    metricBindingId: '1',
    cmdIds: ['3dbaaeb4-57ea-48ad-9851-0c5f07d793a7'],
    //cmdIds: ['1', '2'],
    cmdVersion: '2',
    rel: '3'
};
modelmetric_infor.deleteMetricCmdSupport(cmdSupport).then(function (recordSet) {
    console.log(recordSet);
}).fail(function (err) {
    console.error(err);
});