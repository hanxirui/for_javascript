/**
 * Created by R04419 on 2014/9/15.
 */

'use strict';

/**
 * Created by R04419 on 2014/8/29.
 */

var modelpolicy_infor = require('../ModelPolicyEvent.js'),
    comm_func = require('../func/commonfunc.js');
var SqlCommand = require('../class/SQLCommand.js'),
    commander = new SqlCommand();



modelpolicy_infor.getModelPolicyBaseInfor('RIIL_RMM_DB_DB2').then(function (recordSet) {
    var jsonStr = JSON.stringify(recordSet);
    console.log('根据模型ID 策略信息 ' + jsonStr);
}).fail(function (err) {
    var jstr = JSON.stringify(err);
    var jobj = JSON.parse(jstr);
    console.error(jobj.errMessage);
});

modelpolicy_infor.getThresholdList('RIIL_RMM_DB_DB2').then(function (recordSet) {
    var jsonStr = JSON.stringify(recordSet);
    console.log('根据模型ID  阈值列表   ' + jsonStr);
}).fail(function (err) {
    var jstr = JSON.stringify(err);
    var jobj = JSON.parse(jstr);
    console.error(jobj.errMessage);
});


modelpolicy_infor.getModelEventList('RIIL_RMM_DB_DB2').then(function (recordSet) {
    var jsonStr = JSON.stringify(recordSet);
    console.log('根据模型ID  事件列表   ' + jsonStr);
}).fail(function (err) {
    var jstr = JSON.stringify(err);
    var jobj = JSON.parse(jstr);
    console.error(jobj.errMessage);
});

