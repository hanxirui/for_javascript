/**
 * Created by R04419 on 2014/9/15.
 */

'use strict';

/**
 * Created by R04419 on 2014/8/29.
 */

var modelmetric_infor = require('../ModelMetricInfor.js'),
    comm_func = require('../func/commonfunc.js');
var  ModelMetricRelParam = require('../func/ModelMetricRelParameter');
var SqlCommand = require('../class/SQLCommand.js'),
    commander = new SqlCommand();


////获取模型与指标关系列表数据
//modelmetric_infor.getMetricDetailById('RIIL_RMM_CHILD_NIC_NETWORK_DLINK_OTHER_SNMP','IfOutBroadPkts').then(function (recordSet) {
//    var jsonStr = JSON.stringify(recordSet);
//    console.log('模型与指标关系  列表数据   ' + jsonStr);
//}).fail(function (err) {
//    var jstr = JSON.stringify(err);
//    var jobj = JSON.parse(jstr);
//    console.error(jobj.errMessage);
//});
//
//根据模型ID获取指标详细数据
//modelmetric_infor.getModelMetricDetailData('RIIL_RMM_DB_INFORMIX').then(function (recordSet) {
//    var jsonStr = JSON.stringify(recordSet);
//    console.log('根据模型ID 取模型下的详细指标数据   ' + jsonStr);
//}).fail(function (err) {
//    var jstr = JSON.stringify(err);
//    var jobj = JSON.parse(jstr);
//    console.error(jobj.errMessage);
//});


modelmetric_infor.getModelMetricDetailByModelId('RIIL_RMM_DB_DB2').then(function (recordSet) {
    var jsonStr = JSON.stringify(recordSet);
    console.log('根据模型ID 取模型下的详细指标数据   ' + jsonStr);
}).fail(function (err) {
    var jstr = JSON.stringify(err);
    var jobj = JSON.parse(jstr);
    console.error(jobj.errMessage);
});

modelmetric_infor.getModelMetricCommandDetail('RIIL_RMM_DB_DM','TotalMemGB','SNMP','1','-1','-1').then(function (recordSet) {
    var jsonStr = JSON.stringify(recordSet);
    console.log('根据模型ID 取模型下的详细指令数据   ' + jsonStr);
}).fail(function (err) {
    var jstr = JSON.stringify(err);
    var jobj = JSON.parse(jstr);
    console.error(jobj.errMessage);
});


modelmetric_infor.modifyModelMetricAndCollectParam('RIIL_RMM_DB_DB2','TotalMemGB','64871c3e-b2eb-76b2-7dc9-45527c022cfc','WMI','1','1','1','test11111','namespace','root\\cimv2').then(function (recordSet) {
    var jsonStr = JSON.stringify(recordSet);
    console.log('编辑模型下的指标数据   ' + jsonStr);
}).fail(function (err) {
    var jstr = JSON.stringify(err);
    var jobj = JSON.parse(jstr);
    console.error(jobj.errMessage);
});


modelmetric_infor.getSNMPSupportCommandList('RIIL_RMM_ROUTER_H3C_SNMP','CPURate').then(function (recordSet) {
    var jsonStr = JSON.stringify(recordSet);
    console.log('根据模型ID 取模型下的扩展指令数据   ' + jsonStr);
}).fail(function (err) {
    var jstr = JSON.stringify(err);
    var jobj = JSON.parse(jstr);
    console.error(jobj.errMessage);
});