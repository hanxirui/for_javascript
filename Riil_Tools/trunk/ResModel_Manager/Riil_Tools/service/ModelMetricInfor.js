'use strict';
/**
 * Created by R04419 on 2014/9/11.
 * 资源模型管理 指标维护
 */

var Q = require('q');
var _ = require('underscore');
var uuid = require('node-uuid');
var SqlCommand = require('./class/SQLCommand.js'),
    commander = new SqlCommand(true);
var AduitLogService = require('../service/AduitLogService');

function getMetricGroup(sqlCmd, metricId) {
    var sql = 'select DISTINCT c_metric_group_id from t_moni_metric_group_rel where c_metric_id = ?';
    if (metricId) {
        return sqlCmd.getBySql(sql, [metricId]).then(function (rs){
            if (rs && rs.rows ) {
                var group = [];
                rs.rows.forEach(function (row) {
                    if (row) {
                        group.push(row.c_metric_group_id);
                    }
                });
                if (group.length > 0) {
                    return group.toString();
                } else {
                    return '';
                }
            }
        });
    }
}

function getMetricCmd(sqlCmd, metricBindingId) {
    var sql =
        '   SELECT collectCommandGroup.c_id                AS cmdGroupId' +
        '         ,collectCommandGroup.c_metricbinding_id  AS metricBindingId' +
        '         ,collectCommandGroup.c_is_default        AS isDefault' +
        '         ,collectCommandGroup.c_is_dynamic        AS isDynamic' +
        '         ,collectCommand.c_id                     AS cmdId' +
        '         ,collectCommand.c_index                  AS cmdIndex' +
        '         ,collectCommand.c_protocol               AS cmdProtocol' +
        '         ,collectCommand.c_cmd                    AS cmd' +
        '     FROM t_moni_cmds_group                       AS collectCommandGroup' +
        '         ,t_moni_cmd                              AS collectCommand' +
        '    WHERE collectCommandGroup.c_metricbinding_id = ?' +
        '      AND collectCommandGroup.c_id = collectCommand.c_cmds_group_id' +
        ' ORDER BY isDefault DESC, cmdIndex ASC';
    if (metricBindingId) {
        return sqlCmd.getBySql(sql, [metricBindingId]).then(function (rs){
            if (rs && rs.rows) {
                var rslt = [];
                rs.rows.forEach(function(row) {
                    rslt.push(getMetricCmdProp(sqlCmd, row.cmdId).then(function(result) {
                        row.cmdProps = result.rows;
                    }));
                });
                return Q.all(rslt).spread(function () {
                    return rs.rows;
                });
            }
        });
    }
}

function getMetricCmdProp(sqlCmd, cmdId) {
    var sql =
        'SELECT c_name     AS propName' +
        '      ,c_value    AS propValue' +
        '      ,c_cmd_id   AS cmdId' +
        '  FROM t_moni_cmd_properties' +
        ' WHERE c_cmd_id = ?';
    return sqlCmd.getBySql(sql, cmdId);
}

function getMetricCmdSupport(sqlCmd, metricBindingId) {
    var sql =
        '   SELECT collectCommandGroup.c_id                AS cmdGroupId' +
        '         ,collectCommandGroup.c_metricbinding_id  AS metricBindingId' +
        '         ,collectCommandGroup.c_is_default        AS isDefault' +
        '         ,collectCommandGroup.c_is_dynamic        AS isDynamic' +
        '         ,t_moni_cmds_support.c_id                AS cmdId' +
        '         ,t_moni_cmds_support.c_version           AS cmdVersion' +
        '         ,t_moni_cmds_support.c_rel               AS rel' +
        '     FROM t_moni_cmds_group                       AS collectCommandGroup' +
        '         ,t_moni_cmds_support' +
        '    WHERE collectCommandGroup.c_metricbinding_id = ?' +
        '      AND collectCommandGroup.c_id = t_moni_cmds_support.c_cmds_group_id' +
        ' ORDER BY cmdVersion ASC';
    if (metricBindingId) {
        return sqlCmd.getBySql(sql, [metricBindingId]).then(function (rs) {
            if (rs && rs.rows) {
                return rs.rows;
            }
        });
    }
}

exports.getMetricCmdSupportByBindingId = function(metricBindingId) {
    var sqlCmd = new SqlCommand();
    return getMetricCmdSupport(sqlCmd, metricBindingId);
};

exports.saveMetricCmdSupport = function (cmdSupport, aduitJson) {
    var sqlCmd;
    var updateCmdSupport = 'UPDATE t_moni_cmds_support SET c_version=:cmdVersion,c_rel=:rel WHERE c_id=:cmdId';
    var insertCmdSupport = 'INSERT INTO t_moni_cmds_support(c_id,c_cmds_group_id,c_version,c_rel) VALUES(:cmdId,:cmdGroupId,:cmdVersion,:rel)';
    if (cmdSupport.cmdGroupId) {
        sqlCmd = new SqlCommand();
        if (cmdSupport.cmdId) {
            return sqlCmd.saveBySqlUpdate(updateCmdSupport, {cmdId: cmdSupport.cmdId, cmdVersion: cmdSupport.cmdVersion, rel: cmdSupport.rel}).then(function (result) {
                if (aduitJson) {
                    AduitLogService.insertLog(aduitJson);
                }
                return cmdSupport;
            });
        } else {
            cmdSupport.cmdId = uuid.v4();
            return sqlCmd.saveBySqlInsert(insertCmdSupport, {cmdId: cmdSupport.cmdId, cmdGroupId: cmdSupport.cmdGroupId, cmdVersion: cmdSupport.cmdVersion, rel: cmdSupport.rel}).then(function (result) {
                if (aduitJson) {
                    AduitLogService.insertLog(aduitJson);
                }
                return cmdSupport;
            });
        }
    } else {
        sqlCmd = new SqlCommand(true);
        cmdSupport.cmdGroupId = uuid.v4();
        cmdSupport.cmdId = uuid.v4();
        cmdSupport.isDefault = '-1';
        cmdSupport.isDynamic = '-1';
        return Q.spread([
            //保存命令组
            saveMetricCmdGroup(sqlCmd, cmdSupport),
            // 保存扩展指令
            sqlCmd.saveBySqlInsert(insertCmdSupport, {cmdId: cmdSupport.cmdId, cmdGroupId: cmdSupport.cmdGroupId, cmdVersion: cmdSupport.cmdVersion, rel: cmdSupport.rel})
        ], function () {
            sqlCmd.commit();
            if (aduitJson) {
                AduitLogService.insertLog(aduitJson);
            }
            return cmdSupport;
        }).fail(function (err) {
            sqlCmd.rollback();
        });
    }
};

exports.deleteMetricCmdSupport = function (cmdSupport, aduitJson) {
    if (cmdSupport.cmdGroupId && cmdSupport.cmdIds && cmdSupport.cmdIds.length > 0) {
        var sqlCmd = new SqlCommand(true);
        var getCmdSupport =
            '   SELECT t_moni_cmds_support.c_id AS cmdId' +
            '     FROM t_moni_cmds_support' +
            '    WHERE t_moni_cmds_support.c_cmds_group_id = ?';
        return sqlCmd.getBySql(getCmdSupport, cmdSupport.cmdGroupId).then(function (rs){
            if (rs && rs.rows) {
                var exitCmdIds = [];
                rs.rows.forEach(function (row) {
                    exitCmdIds.push(row.cmdId);
                });
                var deleteCmdSupport = "DELETE FROM t_moni_cmds_support WHERE c_id in (?)";
                if (_.difference(exitCmdIds, cmdSupport.cmdIds).length === 0) {
                    return Q.spread([
                        //删除指令组
                        deleteMetricCmdGroup(sqlCmd, cmdSupport.cmdGroupId),
                        //删除指令
                        sqlCmd.delBySql(deleteCmdSupport, [cmdSupport.cmdIds])
                    ], function () {
                        sqlCmd.commit();
                        if(aduitJson){
                            AduitLogService.insertLog(aduitJson);
                        }
                        return cmdSupport;
                    }).fail(function (err) {
                        sqlCmd.rollback();
                    });
                } else {
                    // 删除指令
                     return sqlCmd.delBySql(deleteCmdSupport, [cmdSupport.cmdIds]).then(function(){
                        sqlCmd.commit();
                        if(aduitJson){
                            AduitLogService.insertLog(aduitJson);
                        }
                        return cmdSupport;
                    });
                }
            }
        });
    }
};

function saveMetricCmdProp(sqlCmd, modelMetric) {
    if (modelMetric.propName && modelMetric.propValue) {
        if (modelMetric.cmdId) {
            var updateCmdGroup = 'UPDATE t_moni_cmd_properties SET c_name=:propName,c_value=:propValue WHERE c_cmd_id=:cmdId';
            var insertCmdGroup = 'INSERT INTO t_moni_cmd_properties(c_cmd_id, c_name, c_value) VALUES(:cmdId,:propName,:propValue)';
            return getMetricCmdProp(sqlCmd, [modelMetric.cmdId]).then(function (rs) {
                if (rs && rs.recourdCount && rs.recourdCount > 0) {
                    return sqlCmd.saveBySqlUpdate(updateCmdGroup, {cmdId: modelMetric.cmdId, propName: modelMetric.propName, propValue: modelMetric.propValue});
                } else {
                    return sqlCmd.saveBySqlInsert(insertCmdGroup, {cmdId: modelMetric.cmdId, propName: modelMetric.propName, propValue: modelMetric.propValue});
                }
            });
        }
    }
}

function saveModelMetricReleasion(sqlCmd, modelMetric) {
    return sqlCmd.save("t_moni_model_metric_rel.insert", {modelId: modelMetric.modelId, metricId: modelMetric.metricId, resTypeId: modelMetric.resTypeId});
}

function saveMetricBinding(sqlCmd, modelMetric) {
    return sqlCmd.save("t_moni_metricbinding.insert", {id: modelMetric.metricBindingId, modelId: modelMetric.modelId, metricId: modelMetric.metricId, isInstance: modelMetric.isInstance, isInitvalue: modelMetric.isInitValue, isDisplayname: modelMetric.isDisplayName});
}

function updateMetricBinding(sqlCmd, modelMetric) {
    return sqlCmd.save("t_moni_metricbinding.update", {modelId: modelMetric.modelId, metricId: modelMetric.metricId, isInstance: modelMetric.isInstance, isInitvalue: modelMetric.isInitValue, isDisplayname: modelMetric.isDisplayName});
}

function saveMetricCmdGroup(sqlCmd, modelMetric) {
    var insertCmdGroup = 'INSERT INTO t_moni_cmds_group(c_id, c_metricbinding_id, c_is_default, c_is_dynamic) VALUES(:cmdGroupId,:metricBindingId,:isDefault,:isDynamic)';
    return sqlCmd.saveBySqlInsert(insertCmdGroup, {cmdGroupId: modelMetric.cmdGroupId, metricBindingId: modelMetric.metricBindingId, isDefault: modelMetric.isDefault, isDynamic: modelMetric.isDynamic});
}

function updateMetricCmdGroup(sqlCmd, modelMetric) {
    var updateCmdGroup = 'UPDATE t_moni_cmds_group SET c_metricbinding_id=:metricBindingId,c_is_default=:isDefault,c_is_dynamic=:isDynamic WHERE c_id=:cmdGroupId';
    return sqlCmd.saveBySqlUpdate(updateCmdGroup, {cmdGroupId: modelMetric.cmdGroupId, metricBindingId: modelMetric.metricBindingId, isDefault: modelMetric.isDefault, isDynamic: modelMetric.isDynamic});
}

function deleteMetricCmdGroup(sqlCmd, cmdGroupId) {
    var deleteCmdGroup = 'DELETE FROM t_moni_cmds_group WHERE c_id = ?';
    return sqlCmd.delBySql(deleteCmdGroup, cmdGroupId);
}

function saveMetricCmd(sqlCmd, modelMetric) {
    var insertCmdGroup = 'INSERT INTO t_moni_cmd(c_id, c_cmds_group_id, c_index, c_protocol, c_cmd) VALUES(:cmdId,:cmdGroupId,:cmdIndex,:cmdProtocol,:cmd)';
    return sqlCmd.saveBySqlInsert(insertCmdGroup, {cmdId: modelMetric.cmdId, cmdGroupId: modelMetric.cmdGroupId, cmdIndex: modelMetric.cmdIndex, cmdProtocol: modelMetric.cmdProtocol, cmd: modelMetric.cmd});
}

function updateMetricCmd(sqlCmd, modelMetric) {
    var updateCmdGroup = 'UPDATE t_moni_cmd SET c_cmds_group_id=:cmdGroupId,c_protocol=:cmdProtocol,c_cmd=:cmd WHERE c_id=:cmdId';
    return sqlCmd.saveBySqlUpdate(updateCmdGroup, {cmdId: modelMetric.cmdId, cmdGroupId: modelMetric.cmdGroupId, cmdProtocol: modelMetric.cmdProtocol, cmd: modelMetric.cmd});
}


/**
 * 根据模型ID获取指标详细信息
 *
 * @method getModelMetricDetailByModelId
 * @param modelId 模型ID
 * @return {Object} 资源模型关系的recordSet对象
 */
exports.getModelMetricDetailByModelId = function  (modelId) {
    var sql =
        'SELECT  metricBase.c_id                AS metricId' +
        '      , metricBase.c_name              AS metricName' +
        '      , metricBase.c_desc              AS metricDescr' +
        '      , metricBase.c_metric_type       AS metricType' +
        '      , metricBase.c_unit              AS metricUnit' +
        '      , metricBase.c_data_type         AS metricDataType ' +
        '   FROM t_moni_metric_base AS metricBase' +
        '  WHERE metricBase.c_id NOT IN (SELECT c_metric_id FROM t_moni_model_metric_rel WHERE c_model_id = ?) ';
    var queryCmd = new SqlCommand();
    return queryCmd.getBySql(sql, [modelId]).then(function (rs){
        if (rs && rs.rows && rs.rows.length > 0) {
            var results = [];
            rs.rows.forEach(function (row) {
                results.push(getMetricGroup(queryCmd, row.metricId).then(function (result){
                    row.metricGroupId = result;
                }) );
            });
            return Q.all(results).spread(function() {
                return rs;
            });
        }
    });
};

/*
 * 添加模型下指标数据和采集指令数据
 * addModelMetricAndCollectParam
 * @param modelMetric  模型指标
 * @param aduitJson 日志
 * @return {Object} 资源模型关系的recordSet对象
 **/
exports.addModelMetricAndCollectParam = function (modelMetric, aduitJson) {
    var sqlCmd = new SqlCommand(true);
    if (modelMetric.metricBindingId) {
        return Q.spread([
            //添加绑定关系数据
            updateMetricBinding(sqlCmd, modelMetric),
            //添加命令组表
            updateMetricCmdGroup(sqlCmd, modelMetric),
            //添加命令表
            updateMetricCmd(sqlCmd, modelMetric),
            //更新或者插入命令参数表
            saveMetricCmdProp(sqlCmd, modelMetric)
        ], function () {
            sqlCmd.commit();
            if(aduitJson){
                AduitLogService.insertLog(aduitJson);
            }
            return modelMetric;
        }).fail(function (err) {
            sqlCmd.rollback();
        });
    } else {
        modelMetric.metricBindingId = uuid.v4();
        modelMetric.cmdGroupId = uuid.v4();
        modelMetric.cmdId = uuid.v4();
        modelMetric.cmdIndex = '0';
        return Q.spread([
            //添加一个指标与与模型的关系
            saveModelMetricReleasion(sqlCmd, modelMetric),
            //添加绑定关系数据
            saveMetricBinding(sqlCmd, modelMetric),
            //添加命令组表
            saveMetricCmdGroup(sqlCmd, modelMetric),
            //添加命令表
            saveMetricCmd(sqlCmd, modelMetric),
            //更新或者插入命令参数表
            saveMetricCmdProp(sqlCmd, modelMetric)
        ], function () {
            sqlCmd.commit();
            if(aduitJson){
                AduitLogService.insertLog(aduitJson);
            }
            return modelMetric;
        }).fail(function (err) {
            sqlCmd.rollback();
        });
    }
};

/**
 * 获取指标详细信息
 *
 * @method getMetricDetailById
 * @param modelId 模型ID
 * @param metricId 指标ID
 * @return {Object} 资源模型关系的recordSet对象
 */
exports.getMetricDetailById = function (modelId, metricId) {
    var sql =
        'SELECT modelMetricRel.c_metric_id       AS metricId' +
        '     , modelMetricRel.c_res_type_id     AS resTypeId' +
        '     , metricBase.c_name                AS metricName' +
        '     , metricBase.c_desc                AS metricDescr' +
        '     , metricBase.c_metric_type         AS metricType' +
        '     , metricBase.c_unit                AS metricUnit' +
        '     , metricBase.c_data_type           AS metricDataType' +
        '     , metricBase.c_is_custom           AS isCustom' +
        '     , metricBindle.c_is_instance       AS isInstance' +
        '     , metricBindle.c_is_initvalue      AS isInitValue' +
        '     , metricBindle.c_is_displayname    AS isDisplayName' +
        '     , modelMetricRel.c_model_id        AS modelId' +
        '     , metricBindle.c_id 				 AS metricBindingId' +
        '     , metricBindle.c_className		 AS className' +
        '     , metricBindle.c_method            AS method' +
        '  FROM t_moni_model_metric_rel          AS modelMetricRel' +
        '     , t_moni_metric_base               AS metricBase' +
        '     , t_moni_metricbinding             AS metricBindle' +
        ' WHERE modelMetricRel.c_model_id = ? ' +
        '   AND modelMetricRel.c_metric_id = ? ' +
        '   AND metricBase.c_id = modelMetricRel.c_metric_id ' +
        '   AND metricBindle.c_metric_id = modelMetricRel.c_metric_id ' +
        '   AND metricBindle.c_model_id = modelMetricRel.c_model_id';
    var sqlCmd = new SqlCommand();
    return sqlCmd.getBySql(sql, [modelId, metricId]).then(function (rs) {
        if (rs && rs.rows && rs.rows.length > 0) {
            var results = [];
            rs.rows.forEach(function (row) {
                results.push(getMetricGroup(sqlCmd, row.metricId).then(function (result) {
                    row.metricGroupId = result;
                }));
                results.push(getMetricCmd(sqlCmd, row.metricBindingId).then(function (result) {
                    row.metricCmds = result;
                }));
                results.push(getMetricCmdSupport(sqlCmd, row.metricBindingId).then(function (result) {
                    row.metricCmdSupports = result;
                }));
            });
            return Q.all(results).spread(function () {
                return rs;
            });
        }
    });
};