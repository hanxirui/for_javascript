'use strict';
/**
 * Created by daihongwei on 2014/8/29.
 */
var Q = require('q');
var SqlCommand = require('./class/SQLCommand.js');
var commander = new SqlCommand();

exports.getMetricGroupNameMap = function() {
    var getQ = Q.defer();
    var fieldID = "groupId";
    var fieldName = "groupName";
    commander.get('t_moni_metric_group.select', []).then(function (recordset) {
        var jsonStr = JSON.stringify(recordset);
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