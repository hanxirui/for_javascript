'use strict';
/**
 * Created by R04419 on 2014/9/11.
 * 资源模型管理 策略事件管理
 */
var mysql = require('mysql');
var sqlConfig = require('../conf/config.json').sql;
var SqlCommand = require('../service/class/SQLCommand.js');
var AduitLogService = require('../service/AduitLogService');

var ModelPolicyEventService = {
    init:function(){},
    /**
     * 获取策略基本信息
     *
     * @method getModelPolicyBaseInfor
     * @param modelId 模型ID
     * @return {Object} 资源模型关系的recordSet对象
     */
    getModelPolicyBaseInfor:function(modelId,$callback){
        SqlCommand.getConnection(function(err, connection) {
            connection.query(sqlConfig.t_moni_policy_info_selectById, [modelId], function(err, rows) {
                if (err) {
                    console.log(err);
                    connection.release();
                    return;
                }
                var r = rows;
                connection.release();
                $callback(r);
            });
        });
    },
    /**
     * 获取阈值列表
     *
     * @method getThresholdList
     * @param modelId 模型ID
     * @return {Object} 资源模型关系的recordSet对象
     */
    getThresholdList:function(modelId,$callback){
        SqlCommand.getConnection(function(err, connection) {
            connection.query(sqlConfig.t_moni_policy_metric_select, [modelId,modelId], function(err, rows) {
                if (err) {
                    console.log(err);
                    connection.release();
                    return;
                }
                var r = rows;
                connection.release();
                $callback(r);
            });
        });
    },

    /**
     * 获取事件列表
     *
     * @method getModelEventList
     * @param modelId 模型ID
     * @return {Object} 资源模型关系的recordSet对象
     */
    getModelEventList:function(modelId,$callback){
        SqlCommand.getConnection(function(err, connection) {
            connection.query(sqlConfig.t_moni_policy_event_selectEventInfor, [modelId], function(err, rows) {
                if (err) {
                    console.log(err);
                    connection.release();
                    return;
                }
                var r = rows;
                connection.release();
                $callback(r);
            });
        });
    },
    updatePolicyMetricThreshold:function(policyMetricThresholdInfo,$callback,aduitJson){
        SqlCommand.getConnection(function(err, connection) {
            connection.beginTransaction(function(err) {
                if (err) {
                    console.log(err);
                    return;
                }
                var param=[];
                param.push(policyMetricThresholdInfo.flapping);
                param.push(policyMetricThresholdInfo.timeOut);
                param.push(policyMetricThresholdInfo.retryTimes);
                param.push(policyMetricThresholdInfo.frequency);
                param.push(policyMetricThresholdInfo.inUse);
                param.push(policyMetricThresholdInfo.genEvent);
                param.push(policyMetricThresholdInfo.policyId);
                param.push(policyMetricThresholdInfo.metricId);
                connection.query(sqlConfig.t_moni_policy_metric_update, param, function (err, rows) {
                    if (err) {
                        connection.rollback(function() {
                            console.log(err);
                            return;
                        });
                    }
                    var thresholdParam=[];
                    thresholdParam.push(policyMetricThresholdInfo.exp1);
                    thresholdParam.push(policyMetricThresholdInfo.exp2);
                    thresholdParam.push(policyMetricThresholdInfo.exp3);
                    thresholdParam.push(policyMetricThresholdInfo.policyId);
                    thresholdParam.push(policyMetricThresholdInfo.metricId);
                    connection.query(sqlConfig.t_moni_policy_threshold_update, thresholdParam, function (err, rows) {
                        if (err) {
                            connection.rollback(function() {
                                console.log(err);
                                return;
                            });
                        }
                        connection.commit(function(err) {
                            if (err) {
                                connection.rollback(function() {
                                    console.log(err);
                                    return;
                                });
                            }
                            if(aduitJson){
                                AduitLogService.insertLog(aduitJson);
                            }
                            connection.release();
                            $callback('success');
                        });
                    });
                });
            });
        });
    },
    updatePolicyEvent:function(policyEventInfo,$callback,aduitJson){
        SqlCommand.getConnection(function(err, connection) {
            var param=[];
            param.push(policyEventInfo.level);
            param.push(policyEventInfo.inUse);
            param.push(policyEventInfo.eventId);
            connection.query(sqlConfig.t_moni_policy_event_update, param, function (err, rows) {
                if (err) {
                    console.log(err);
                    connection.release();
                    return;
                }
                if(aduitJson){
                    AduitLogService.insertLog(aduitJson);
                }
                var r = rows;
                connection.release();
                $callback(r);
            });
        });
    },
    updatePolicyInfo:function(policyInfo,$callback,aduitJson){
        SqlCommand.getConnection(function(err,connection){
            var param=[];
            param.push(policyInfo.id);
            param.push(policyInfo.name);
            param.push(policyInfo.desc);
            param.push(policyInfo.type);
            param.push(policyInfo.modelId);
            connection.query(sqlConfig.t_moni_policy_info_update, param, function (err, rows) {
                if (err) {
                    console.log(err);
                    connection.release();
                    return;
                }
                if(aduitJson){
                    AduitLogService.insertLog(aduitJson);
                }
                var r = rows;
                connection.release();
                $callback(r);
            });
        });
    }
};
module.exports = ModelPolicyEventService;

/*
var policyMetricThresholdInfo={
    flapping:"2",
    timeOut:"30000",
    retryTimes:"2",
    frequency:"perf.30min",
    inUse:"-1",
    genEvent:"-1",
    policyId:"RIIL_RMP_RES_WLAN_ZTE_SNMP_DEFAULT",
    metricId:"WlanStaNum",
    exp1:">10",
    exp2:">5",
    exp3:">=0"
};

var policyEventInfo={
    level:"11",
    inUse:"22",
    eventId:"0007d5ec-ab11-0490-ee1b-cedb1f5450c7"
};

var policyInfo={
    id:"RIIL_RMP_RES_WLAN_ZTE_SNMP_DEFAULT",
    name:"中兴WLAN01",
    desc:"中兴WLAN01",
    type:"RES",
    modelId:"RIIL_RMM_WLAN_ZTE_SNMP"
}

ModelPolicyEventService.init();
ModelPolicyEventService.getThresholdList("RIIL_RMM_DB_DB2",function(r){
    console.log(r);
});

ModelPolicyEventService.updatePolicyMetricThreshold(policyMetricThresholdInfo,function(r){
    console.log(r);
});

ModelPolicyEventService.updatePolicyEvent(policyEventInfo,function(r){
    console.log(r);
});
ModelPolicyEventService.updatePolicyMetricThreshold("RIIL_RMM_WLAN_ZTE_SNMP",function(r){
    console.log(r);
});

ModelPolicyEventService.updatePolicyInfo(policyInfo,function(r){
    console.log(r);
});
*/
