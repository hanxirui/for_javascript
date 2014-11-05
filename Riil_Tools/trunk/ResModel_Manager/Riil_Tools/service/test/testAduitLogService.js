'use strict';
/**
 * Created by R04414 on 2014/9/1.
 */
var aduitLog = require('../AduitLogService');

//metricGroup.getMetricGroupList();
//
//metricGroup.saveMetricGroup({ groupId: "test111",
//    groupName: "testName111",
//    groupDesc: "testDesc111"});

/*
aduitLog.insertLog({userId:'huanfeng',info:'TestLog'}).then(function (rs){
    console.log(rs);
}).fail(function (err) {
    console.error(err);
});
*/

aduitLog.getAduitLogList().then(function (rs){
    console.log(rs);
}).fail(function (err) {
    console.error(err);
});
