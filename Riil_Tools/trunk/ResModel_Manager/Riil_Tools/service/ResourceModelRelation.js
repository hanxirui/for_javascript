'use strict';

/**
 * Created by R04419 on 2014/9/10.
 * 资源模型关系关联表
 */

var Q = require('q'),
    SqlCommand = require('../service/class/SQLCommand.js'),
    commander = new SqlCommand();
var AduitLogService = require('../service/AduitLogService');

/**
 * 删除模型与指标之间的关系
 *
 * @method deleteModelMetricRelation
 * @param {string} modelId 模型ID
 * @param {string} metricId 指标ID
 * @param {string} userId 登录用户ID
 * @return {Object} 指标信息recordSet对象
 */
exports.deleteModelMetricRelation = function(modelId, metricIds, aduitJson) {
    if (modelId && metricIds && metricIds.length > 0) {
        var promise = Q.defer();
        SqlCommand.getConnection(function (err, connection) {
            if (!!err) {
                promise.reject(err);
            } else {
                connection.beginTransaction(function (err) {
                    if (!!err) {
                        promise.reject(err);
                        connection.release();
                    } else {
                        return Q.spread([
                            // 删除模型和指标关联
                            deleteModelMetricReleasion(connection, modelId, metricIds),
                            // 删除指令绑定、指令以及扩展指令
                            deleteMetricCmd(connection, modelId, metricIds)
                        ], function () {
                            connection.commit();
                            if (aduitJson) {
                                AduitLogService.insertLog(aduitJson);
                            }
                            connection.release();
                            promise.resolve(true);
                        }).fail(function (err) {
                            promise.reject(err);
                            connection.rollback();
                            connection.release();
                        });
                    }
                });
            }
        });
        return promise.promise;
    }
};

function deleteModelMetricReleasion(connection, modelId, metricIds) {
    var sql = 'DELETE FROM t_moni_model_metric_rel WHERE c_model_id = ? AND c_metric_id in (?)';
    return connQuery(connection, sql, [modelId, metricIds]);
}

function deleteMetricCmd(connection, modelId, metricIds) {
    var getMetricBindingId = 'SELECT c_id FROM t_moni_metricbinding WHERE c_model_id = ? AND c_metric_id in (?)';
    var getCmdGroupId = 'SELECT c_id FROM t_moni_cmds_group WHERE c_metricbinding_id in (?)';
    var getCmdId = 'SELECT c_id FROM t_moni_cmd WHERE c_cmds_group_id in (?)';
    var getCmdProcessor = 'SELECT c_id FROM t_moni_cmds_processor where c_cmds_group_id in (?)';
    var delMetricBinding = 'DELETE FROM t_moni_metricbinding WHERE c_id in (?)';
    var delCmdGroup = 'DELETE FROM t_moni_cmds_group WHERE c_id in (?)';
    var delCmd = 'DELETE FROM t_moni_cmd WHERE c_id in (?)';
    var delCmdProp = 'DELETE FROM t_moni_cmd_properties WHERE c_cmd_id in (?)';
    var delSupport = 'DELETE FROM t_moni_cmds_support WHERE c_cmds_group_id in (?)';
    var delConnProtocol = 'DELETE FROM t_moni_cmds_conn_protocol WHERE c_cmds_group_id in (?)';
    var delCmdFilter = 'DELETE FROM t_moni_cmd_filters WHERE c_cmd_id in (?)';
    var delCmdProcessorPara = 'DELETE FROM t_moni_cmds_process_para WHERE c_cmds_processor_id in (?)';
    return connQuery(connection, getMetricBindingId, [modelId, metricIds]).then(function(result) {
        var metricBindingIds = [];
        if (result && result.length > 0) {
            result.forEach(function(row) {
                metricBindingIds.push(row.c_id);
            });
            //console.log('绑定ID = ' + metricBindingIds);
            return Q.all([
                // 删除指令绑定
                connQuery(connection, delMetricBinding, [metricBindingIds]),
                // 按照绑定ID查找指令组
                connQuery(connection, getCmdGroupId, [metricBindingIds]).then(function(rslt) {
                    if (rslt && rslt.length > 0) {
                        var cmdGroupIds = [];
                        rslt.forEach(function(row) {
                            cmdGroupIds.push(row.c_id);
                        });
                        //console.log('指令组ID = ' + cmdGroupIds);
                        return Q.all([
                            // 删除指令组
                            connQuery(connection, delCmdGroup, [cmdGroupIds]),
                            // 删除采集指令组连接协议
                            connQuery(connection, delConnProtocol, [cmdGroupIds]),
                            // 按照指令组ID查找采集指令组处理器表
                            connQuery(connection, getCmdProcessor, [cmdGroupIds]).then(function(rs) {
                                if (rs && rs.length > 0) {
                                    var processorIds = [];
                                    rs.forEach(function(row) {
                                        processorIds.push(row.c_id);
                                    });
                                    return connQuery(connection, delCmdProcessorPara, [processorIds]);
                                }
                            }),
                            // 按照指令组ID查找指令
                            connQuery(connection, getCmdId, [cmdGroupIds]).then(function(rs) {
                                if (rs && rs.length > 0) {
                                    var cmdIds = [];
                                    rs.forEach(function(row) {
                                        cmdIds.push(row.c_id);
                                    });
                                    return Q.all([
                                        // 删除指令
                                        connQuery(connection, delCmd, [cmdIds]),
                                        // 删除指令参数
                                        connQuery(connection, delCmdProp, [cmdIds]),
                                        // 删除采集指令过滤器
                                        connQuery(connection, delCmdFilter, [cmdIds])
                                    ]);
                                }
                            }),
                            // 按照指令组ID删除扩展指令
                            connQuery(connection, delSupport, [cmdGroupIds])
                        ]);
                    }
                })
            ]);
        }
    });
}

function connQuery(connection, sql, args) {
    var promise = Q.defer();
    connection.query(sql, args, function (err, rows) {
        if (!!err) {
            promise.reject(err);
        } else {
            promise.resolve(rows);
        }
    });
    return promise.promise;
}

/**
 * 根据模型ID获取指标详细信息
 *
 * @method getModelMetricList
 * @param {string} modelId 模型ID
 * @return {Object} 指标信息recordSet对象
 */
exports.getModelMetricList = function (modelId) {
    var sql = 'SELECT ' +
        'metricBase.c_id                AS metricId,' +
        'metricBinding.c_id             AS metricBindingId,' +
        'metricBase.c_name              AS metricName,' +
        'metricBase.c_unit              AS metricUnit,' +
        'metricBinding.c_is_initvalue   AS isInitValue,' +
        'metricBinding.c_is_instance    AS isInstance,' +
        'metricBinding.c_is_displayname AS isDisplayName,' +
        'metricBase.c_is_custom         AS isCustom,' +
        'group_concat(DISTINCT t_moni_cmd.c_protocol order by t_moni_cmd.c_protocol separator ", ") as coltProtocol ' +
        'FROM t_moni_model_metric_rel AS modelMetricRel,' +
        't_moni_metric_base AS metricBase,' +
        't_moni_metricbinding AS metricBinding,' +
        't_moni_cmds_group AS commandGroup,' +
        't_moni_cmd ' +
        'WHERE modelMetricRel.c_model_id = ? ' +
        'AND metricBase.c_id = modelMetricRel.c_metric_id ' +
        'AND metricBinding.c_metric_id = modelMetricRel.c_metric_id ' +
        'AND metricBinding.c_model_id = modelMetricRel.c_model_id ' +
        'AND commandGroup.c_metricbinding_id = metricBinding.c_id ' +
        'AND t_moni_cmd.c_cmds_group_id = commandGroup.c_id ' +
        'GROUP BY metricId ' +
        'ORDER BY metricId ASC';
    var cmd = new SqlCommand();
    return cmd.getBySql(sql, [modelId]);
};
