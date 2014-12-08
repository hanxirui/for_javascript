/* jshint node:true */
'use strict';
/*global t_moni_res_type_selectAll*/

/*jshint undef:true */

/**
 * Created by mufei on 2014/8/28.
 */
var uuid = require('node-uuid');
var Q = require('q');
var _ = require('underscore');
var rand = require("random-key");
var mysql = require('mysql');

var sqlConfig = require('../conf/config.json').sql;
var SqlCommand = require('../service/class/SQLCommand.js');
var AduitLogService = require('../service/AduitLogService');

var ResTypeTree = {
    getResTypeTree: function (host) {
        return query(sqlConfig.t_moni_res_type_selectAll).then(function (rows) {
            var result = [];
            if (rows && rows.length > 0) {
                // 隐藏机房、脚本、trap、业务应用、业务服务
                var modelIds = ['RIIL_RMT_MOTOROOM', 'RIIL_RMT_SCRIPT', 'RIIL_RMT_SCRIPT_ADV', 'RIIL_RMT_SCRIPT_TIMING', 'RIIL_RMT_SNMPTRAP', 'RIIL_RMT_BUSINESSAPPLICATION', 'RIIL_RMT_BUSINESSSERVICE'];
                rows.forEach(function (row) {
                    if (!_.contains(modelIds, row.modelId)) {
                        formatRow(row, host);
                        result.push(row);
                    }
                });
            }
            return result;
        });
    },
    getResTypeById: function (typeId) {
        return query(sqlConfig.t_moni_res_type_select_by_id, typeId);
    },
    saveResType: function (resType, aduitJson) {
        if (resType) {
            if (resType.c_parent_id) {
                return ResTypeTree.getResTypeById(resType.c_parent_id).then(function (rows) {
                    if (rows && rows.length > 0) {
                        resType.c_tree_level = ++rows[0].c_tree_level;
                        return getTreeNodeId(rows[0].c_id, rows[0].c_tree_node_id);
                    }
                }).then(function (treeNodeId) {
                    if (treeNodeId) {
                        if (aduitJson) {
                            AduitLogService.insertLog(aduitJson);
                        }
                        resType.c_tree_node_id = treeNodeId;
                        resType.c_sort_id = getSortId(resType.c_tree_node_id);
                        resType.c_is_custom = 1;
                        return queryWithTrans(sqlConfig.t_moni_res_type_insert, resType);
                    }
                });
            }
        }
    },
    updataResType: function (resType, oldId, aduitJson) {
        if (resType && oldId) {
            var stm = sqlConfig.t_moni_res_type_update + ' WHERE c_id =' + mysql.escape(oldId);
            if (aduitJson) {
                AduitLogService.insertLog(aduitJson);
            }
            return queryWithTrans(stm, resType);
        }
    },
    deleteResType: function (ids, aduitJson) {
        if (aduitJson) {
            AduitLogService.insertLog(aduitJson);
        }
        return queryWithTrans(sqlConfig.t_moni_res_type_delete, [ids]);
    },
    getAllPlugin: function () {
        return query(sqlConfig.t_moni_model_base_select_plugin);
    },
    getResModelById: function (modelId) {
        return query(sqlConfig.t_moni_model_base_select_by_id, modelId);
    },
    saveResModel: function (resModel, aduitJson) {
        if (aduitJson) {
            AduitLogService.insertLog(aduitJson);
        }
        resModel.c_is_custom = 1;
        return createResModel(sqlConfig.t_moni_model_base_insert, resModel);
    },
    updataResModel: function (resModel, oldId, aduitJson) {
        if (resModel && oldId) {
            if (aduitJson) {
                AduitLogService.insertLog(aduitJson);
            }
            var stm = sqlConfig.t_moni_model_base_update + ' WHERE c_id =' + mysql.escape(oldId);
            return createResModel(stm, resModel);
        }
    },
    deleteResModel: function (ids, aduitJson) {
        if (aduitJson) {
            AduitLogService.insertLog(aduitJson);
        }
        return queryWithTrans(sqlConfig.t_moni_model_base_delete, [ids]);
    },
    getResModelTree: function (host) {
        return Q.spread([
            this.getResTypeTree(host),
            getMainResModel(),
            getResModel('-1')
        ], function (resTypeTree, mainResModel, resModel) {
            Array.prototype.push.apply(resTypeTree, mainResModel);
            Array.prototype.push.apply(resTypeTree, resModel);
            return resTypeTree;
        });
    },
    getMainResModelTree: function (host) {
        return Q.spread([
            this.getResTypeTree(host),
            getResModel('1')
        ], function (resTypeTree, mainResModel) {
            Array.prototype.push.apply(resTypeTree, mainResModel);
            return resTypeTree;
        });
    },
    copyResModels: function (modelIds, aduitJson) {
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
                        connQuery(connection, sqlConfig.t_moni_model_base_select_by_ids, [modelIds]).then(function (rows) {
                            var result = [], mainModels = [], subModels = [], models = [], cloneModels = [];
                            getResModels(rows, mainModels, subModels);
                            var cloneMainModels = JSON.parse(JSON.stringify(mainModels)), cloneSubModels = JSON.parse(JSON.stringify(subModels));
                            getCloneResModels(mainModels, cloneMainModels, cloneSubModels);
                            models = models.concat(mainModels).concat(subModels);
                            cloneModels = cloneModels.concat(cloneMainModels).concat(cloneSubModels);
                            for (var i = 0; i < models.length; i++) {
                                result.push(copyModelMetricRelation(connection, models[i], cloneModels[i]));
                                result.push(copyModelMetricCmd(connection, models[i], cloneModels[i]));
                            }
                            result.push(copyPolicyInfo(connection, models, cloneModels));
                            Q.all(result).then(function () {
                                connection.commit();
                                promise.resolve(true);
                                if (aduitJson) {
                                    AduitLogService.insertLog(aduitJson);
                                }
                            }).fail(function (err) {
                                connection.rollback();
                                promise.resolve(err);
                            }).fin(function () {
                                connection.release();
                            });

                        });
                    }
                });
            }
        });
        return promise.promise;
    },
    isExistResName: function (resId, resName, selfId) {
        if (!!resId && !!resName) {
            var sql = 'SELECT * FROM t_moni_res_type WHERE c_parent_id = ?';
            return query(sql, resId).then(function (rows) {
                var flag = false;
                if (rows && rows.length > 0) {
                    for (var i = 0; i < rows.length; i++) {
                        if (resName === rows[i].c_name) {
                            if (selfId && rows[i].c_id === selfId) {
                                continue;
                            } else {
                                flag = true;
                            }
                            break;
                        }
                    }
                }
                return flag;
            });
        } else {
            return Q.resolve(false);
        }
    },
    isExistModelName: function (mainmodelid, modelName, selfId) {
        if (!!mainmodelid && !!modelName) {
            if (mainmodelid.lastIndexOf('RIIL_RMM', 0) === 0) {
                return query(sqlConfig.t_moni_model_base_select_by_mainmodelid, mainmodelid).then(function (rows) {
                    var flag = false;
                    if (rows && rows.length > 0) {
                        for (var i = 0; i < rows.length; i++) {
                            if (modelName === rows[i].name) {
                                if (selfId && rows[i].modelId === selfId) {
                                    continue;
                                } else {
                                    flag = true;
                                }
                                break;
                            }
                        }
                    }
                    return flag;
                });
            } else if (mainmodelid.lastIndexOf('RIIL_RMT', 0) === 0) {
                var sql = 'SELECT * FROM t_moni_model_base WHERE c_res_type_id = ?';
                return query(sql, mainmodelid).then(function (rows) {
                    var flag = false;
                    if (rows && rows.length > 0) {
                        for (var i = 0; i < rows.length; i++) {
                            if (modelName === rows[i].c_name) {
                                if (selfId && rows[i].c_id === selfId) {
                                    continue;
                                } else {
                                    flag = true;
                                }
                                break;
                            }
                        }
                    }
                    return flag;
                });
            } else {
                return Q.resolve(false);
            }
        } else {
            return Q.resolve(false);
        }
    }
};

function getResModels(resModels, mainModels, subModels) {
    resModels.forEach(function (resModel) {
        if (resModel.c_is_main && resModel.c_is_main === 1) {
            mainModels.push(resModel);
        } else {
            subModels.push(resModel);
        }
    });
}

function getCloneResModels(mainModels, cloneMainModels, cloneSubModels) {
    cloneMainModels.forEach(function (cloneMainModel) {
        cloneMainModel.c_id = cloneMainModel.c_id + "_" + rand.generate(4);
        cloneMainModel.c_name += '_复制';
    });
    cloneSubModels.forEach(function (cloneSubModel) {
        cloneSubModel.c_id = cloneSubModel.c_id + "_" + rand.generate(4);
        for (var i = 0; i < mainModels.length; i++) {
            if (cloneSubModel.c_main_model_id === mainModels[i].c_id) {
                cloneSubModel.c_main_model_id = cloneMainModels[i].c_id;
                break;
            }
        }
    });
}

function copyModelMetricRelation(connection, resModel, clonesResModel) {
    if (resModel) {
        clonesResModel.c_is_custom = 1;
        return connQuery(connection, sqlConfig.t_moni_model_base_insert, clonesResModel).then(function () {
            return connQuery(connection, sqlConfig.t_moni_model_metric_rel_select_by_modelid, resModel.c_id);
        }).then(function (rows) {
            if (rows && rows.length > 0) {
                var results = [];
                rows.forEach(function (row) {
                    row.c_model_id = clonesResModel.c_id;
                    row.c_res_type_id = clonesResModel.c_res_type_id;
                    results.push(connQuery(connection, sqlConfig.t_moni_model_metric_rel_insert, row));
                });
                return Q.all(results);
            }
        });
    }
}

function copySubPolicyInfo(connection, querySql, saveSql, policyInfo, clonePolicyInfo) {
    if (policyInfo) {
        return connQuery(connection, querySql, policyInfo.c_id).then(function (rows) {
            if (rows && rows.length > 0) {
                var results = [];
                rows.forEach(function (row) {
                    row.c_id = uuid.v4();
                    row.c_policy_id = clonePolicyInfo.c_id;
                    results.push(connQuery(connection, saveSql, row));
                });
                return Q.all(results);
            }
        });
    }
}

function copyPolicyInfo(connection, resModels, clonesResModels) {
    var result = [], policyInfos = [], clonePolicyInfos = [];
    for (var i = 0; i < resModels.length; i++) {
        result.push(getPolicyInfo(connection, resModels[i], clonesResModels[i], policyInfos, clonePolicyInfos));
    }
    return Q.all(result).then(function () {
        for (var i = 0; i < policyInfos.length; i++) {
            if (!!policyInfos[i].c_main_policy_id) {
                for (var j = 0; j < policyInfos.length; j++) {
                    if (policyInfos[i].c_main_policy_id === policyInfos[j].c_id) {
                        clonePolicyInfos[i].c_main_policy_id = clonePolicyInfos[j].c_id;
                        break;
                    }
                }
            }
        }
        var rs = [];
        for (i = 0; i < policyInfos.length; i++) {
            rs.push(copySubPolicyInfo(connection, sqlConfig.t_moni_policy_event_select_by_policyid, sqlConfig.t_moni_policy_event_insert, policyInfos[i], clonePolicyInfos[i]));
            rs.push(copySubPolicyInfo(connection, sqlConfig.t_moni_policy_metric_select_by_policyid, sqlConfig.t_moni_policy_metric_insert, policyInfos[i], clonePolicyInfos[i]));
            rs.push(copySubPolicyInfo(connection, sqlConfig.t_moni_policy_threshold_select_by_policyid, sqlConfig.t_moni_policy_threshold_insert, policyInfos[i], clonePolicyInfos[i]));
            rs.push(copySubPolicyInfo(connection, sqlConfig.t_moni_policy_res_avail_rule_select_by_policyid, sqlConfig.t_moni_policy_res_avail_rule_insert, policyInfos[i], clonePolicyInfos[i]));
        }
        return Q.all(rs);
    });
}

function getPolicyInfo(connection, resModel, clonesResModel, policyInfos, clonePolicyInfos) {
    if (resModel) {
        return connQuery(connection, sqlConfig.t_moni_policy_info_select_by_modelid, resModel.c_id).then(function (rows) {
            if (rows && rows.length > 0) {
                var results = [];
                rows.forEach(function (row) {
                    var clonePolicyInfo = JSON.parse(JSON.stringify(row));
                    clonePolicyInfo.c_id = row.c_id + "_" + rand.generate(4);
                    clonePolicyInfo.c_name += '_复制';
                    clonePolicyInfo.c_desc += '_复制';
                    clonePolicyInfo.c_model_id = clonesResModel.c_id;
                    clonePolicyInfo.c_model_name = clonesResModel.c_name;
                    policyInfos.push(row);
                    clonePolicyInfos.push(clonePolicyInfo);
                    results.push(connQuery(connection, sqlConfig.t_moni_policy_info_insert, clonePolicyInfo));
                });
                return Q.all(results);
            }
        });
    }
}

function copyModelMetricCmd(connection, resModel, clonesResModel) {
    var getMetricBinding = 'SELECT * FROM t_moni_metricbinding WHERE c_model_id = ?';
    var saveMetricBinding = 'INSERT INTO t_moni_metricbinding SET ?';
    if (resModel) {
        return connQuery(connection, getMetricBinding, resModel.c_id).then(function (rows) {
            var metricBindingIds = [], cloneMetricBindingIds = [];
            if (rows && rows.length > 0) {
                var results = [];
                rows.forEach(function (row) {
                    metricBindingIds.push(row.c_id);
                    row.c_model_id = clonesResModel.c_id;
                    row.c_id = uuid.v4();
                    cloneMetricBindingIds.push(row.c_id);
                    results.push(connQuery(connection, saveMetricBinding, row));
                });
                for (var i = 0; i < metricBindingIds.length; i++) {
                    results.push(copyCmdGroup(connection, metricBindingIds[i], cloneMetricBindingIds[i]));
                }
                return Q.all(results);
            }
        });
    }
}

function copyCmdGroup(connection, metricBindingId, cloneMetricBindingId) {
    var getCmdGroup = 'SELECT * FROM t_moni_cmds_group WHERE c_metricbinding_id = ?';
    var saveCmdGroup = 'INSERT INTO t_moni_cmds_group SET ?';
    return connQuery(connection, getCmdGroup, metricBindingId).then(function (rows) {
        var results = [];
        if (rows && rows.length > 0) {
            var cmdGroupIds = [], cloneCmdGroupIds = [];
            rows.forEach(function (row) {
                cmdGroupIds.push(row.c_id);
                row.c_id = uuid.v4();
                row.c_metricbinding_id = cloneMetricBindingId;
                cloneCmdGroupIds.push(row.c_id);
                results.push(connQuery(connection, saveCmdGroup, row));
            });
            for (var i = 0; i < cmdGroupIds.length; i++) {
                results.push(copyCmd(connection, cmdGroupIds[i], cloneCmdGroupIds[i]));
                results.push(copyCmdSupport(connection, cmdGroupIds[i], cloneCmdGroupIds[i]));
                results.push(copyCmdConnProtocol(connection, cmdGroupIds[i], cloneCmdGroupIds[i]));
                results.push(copyCmdProcessor(connection, cmdGroupIds[i], cloneCmdGroupIds[i]));
            }
        }
        return Q.all(results);
    });
}

function copyCmd(connection, cmdGroupId, cloneCmdGroupId) {
    var getCmd = 'SELECT * FROM t_moni_cmd WHERE c_cmds_group_id = ?';
    var saveCmd = 'INSERT INTO t_moni_cmd SET ?';
    return connQuery(connection, getCmd, cmdGroupId).then(function (rows) {
        var results = [];
        if (rows && rows.length > 0) {
            var cmdIds = [], cloneCmdIds = [];
            rows.forEach(function (row) {
                cmdIds.push(row.c_id);
                row.c_id = uuid.v4();
                row.c_cmds_group_id = cloneCmdGroupId;
                cloneCmdIds.push(row.c_id);
                results.push(connQuery(connection, saveCmd, row));
            });
            for (var i = 0; i < cmdIds.length; i++) {
                results.push(copyCmdProp(connection, cmdIds[i], cloneCmdIds[i]));
                results.push(copyCmdFilter(connection, cmdIds[i], cloneCmdIds[i]));
            }
        }
        return Q.all(results);
    });
}

function copyCmdProp(connection, cmdId, cloneCmdId) {
    var getCmdProp = 'SELECT * FROM t_moni_cmd_properties WHERE c_cmd_id = ?';
    var saveCmdProp = 'INSERT INTO t_moni_cmd_properties SET ?';
    return connQuery(connection, getCmdProp, cmdId).then(function (rows) {
        var results = [];
        if (rows && rows.length > 0) {
            rows.forEach(function (row) {
                row.c_cmd_id = cloneCmdId;
                results.push(connQuery(connection, saveCmdProp, row));
            });
        }
        return Q.all(results);
    });
}

function copyCmdFilter(connection, cmdId, cloneCmdId) {
    var getCmdFilter = 'SELECT * FROM t_moni_cmd_filters WHERE c_cmd_id = ?';
    var saveCmdFilter = 'INSERT INTO t_moni_cmd_filters SET ?';
    return connQuery(connection, getCmdFilter, cmdId).then(function (rows) {
        var results = [];
        if (rows && rows.length > 0) {
            rows.forEach(function (row) {
                row.c_id = uuid.v4();
                row.c_cmd_id = cloneCmdId;
                results.push(connQuery(connection, saveCmdFilter, row));
            });
        }
        return Q.all(results);
    });
}

function copyCmdSupport(connection, cmdGroupId, cloneCmdGroupId) {
    var getCmdSupport = 'SELECT * FROM t_moni_cmds_support WHERE c_cmds_group_id = ?';
    var saveCmdSupport = 'INSERT INTO t_moni_cmds_support SET ?';
    return connQuery(connection, getCmdSupport, cmdGroupId).then(function (rows) {
        var results = [];
        if (rows && rows.length > 0) {
            rows.forEach(function (row) {
                row.c_id = uuid.v4();
                row.c_cmds_group_id = cloneCmdGroupId;
                results.push(connQuery(connection, saveCmdSupport, row));
            });
        }
        return Q.all(results);
    });
}

function copyCmdConnProtocol(connection, cmdGroupId, cloneCmdGroupId) {
    var getCmdConnProtocol = 'SELECT * FROM t_moni_cmds_conn_protocol WHERE c_cmds_group_id = ?';
    var saveCmdConnProtocol = 'INSERT INTO t_moni_cmds_conn_protocol SET ?';
    return connQuery(connection, getCmdConnProtocol, cmdGroupId).then(function (rows) {
        var results = [];
        if (rows && rows.length > 0) {
            rows.forEach(function (row) {
                row.c_id = uuid.v4();
                row.c_cmds_group_id = cloneCmdGroupId;
                results.push(connQuery(connection, saveCmdConnProtocol, row));
            });
        }
        return Q.all(results);
    });
}

function copyCmdProcessor(connection, cmdGroupId, cloneCmdGroupId) {
    var getCmdProcessor = 'SELECT * FROM t_moni_cmds_processor WHERE c_cmds_group_id = ?';
    var saveCmdProcessor = 'INSERT INTO t_moni_cmds_processor SET ?';
    return connQuery(connection, getCmdProcessor, cmdGroupId).then(function (rows) {
        var results = [];
        if (rows && rows.length > 0) {
            var processorIds = [], cloneProcessorIds = [];
            rows.forEach(function (row) {
                processorIds.push(row.c_id);
                row.c_id = uuid.v4();
                row.c_cmds_group_id = cloneCmdGroupId;
                cloneProcessorIds.push(row.c_id);
                results.push(connQuery(connection, saveCmdProcessor, row));
                for (var i = 0; i < processorIds.length; i++) {
                    results.push(copyProcessPara(connection, processorIds[i], cloneProcessorIds[i]));
                }
            });
        }
        return Q.all(results);
    });
}

function copyProcessPara(connection, processorId, cloneProcessorId) {
    var getProcessPara = 'SELECT * FROM t_moni_cmds_process_para WHERE c_cmds_processor_id = ?';
    var saveProcessPara = 'INSERT INTO t_moni_cmds_process_para SET ?';
    return connQuery(connection, getProcessPara, processorId).then(function (rows) {
        var results = [];
        if (rows && rows.length > 0) {
            rows.forEach(function (row) {
                row.c_id = uuid.v4();
                row.c_cmds_processor_id = cloneProcessorId;
                results.push(connQuery(connection, saveProcessPara, row));
            });
        }
        return Q.all(results);
    });
}

module.exports = ResTypeTree;

function query(sql, args) {
    var promise = Q.defer();
    SqlCommand.getConnection(function (err, connection) {
        if (!!err) {
            promise.reject(err);
        } else {
            connection.query(sql, args, function (err, rows) {
                connection.release();
                if (!!err) {
                    promise.reject(err);
                } else {
                    promise.resolve(rows);
                }
            });
        }
    });
    return promise.promise;
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

function queryWithTrans(sql, args) {
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
                    connection.query(sql, args, function (err, rows) {
                        if (!!err) {
                            connection.rollback(function () {
                                promise.reject(err);
                                connection.release();
                            });
                        } else {
                            connection.commit(function (err) {
                                if (!!err) {
                                    connection.rollback(function () {
                                        promise.reject(err);
                                        connection.release();
                                    });
                                } else {
                                    promise.resolve(true);
                                    connection.release();
                                }
                            });
                        }
                    });
                }
            });
        }
    });
    return promise.promise;
}

function getPid(id) {
    var subStr = null;
    if (id) {
        var index = id.lastIndexOf('.');
        if (index > 0) {
            subStr = id.substring(0, index);
        }
    }
    return subStr;
}

function getIcon(host, icon) {
    if (icon)
        return host + '/images/template/' + icon;
    else
        return host + '/images/template/Other.png';
}

function formatRow(row, host) {
    row.pId = getPid(row.pId);
    row.icon = getIcon(host, row.icon);
}

function createResModel(sqlid, resModel) {
    if (resModel) {
        if (resModel.c_res_type_id) {
            return query(sqlConfig.t_moni_res_type_select_by_id, resModel.c_res_type_id).then(function (rows) {
                if (rows && rows.length === 1) {
                    resModel.c_tree_node_id = rows[0].c_tree_node_id;
                }
                return queryWithTrans(sqlid, resModel);
            });
        } else {
            return queryWithTrans(sqlid, resModel);
        }
    }
}

function getResModel(isMain) {
    return query(sqlConfig.t_moni_model_base_select_by_ismain, [isMain]).then(function (rows) {
        if (rows && rows.length > 0) {
            rows.forEach(function (row) {
                row.id = uuid.v4();
            });
            return rows;
        }
    });
}

function getSubResModel(id, mainmodelid) {
    return query(sqlConfig.t_moni_model_base_select_by_mainmodelid, mainmodelid).then(function (rows) {
        if (rows && rows.length > 0) {
            rows.forEach(function (row) {
                row.id = uuid.v4();
                row.pId = id;
            });
            return rows;
        }
    });
}

function getMainResModel() {
    return getResModel('1').then(function (rows) {
        if (rows && rows.length > 0) {
            var results = [];
            rows.forEach(function (row) {
                results.push(getSubResModel(row.id, row.modelId));
            });
            return Q.all(results).then(function () {
                if (results && results.length > 0) {
                    results.forEach(function (result) {
                        if (result) {
                            result.forEach(function (row) {
                                rows.push(row);
                            });
                        }
                    });
                }
                return rows;
            });
        }
    });
}

function getLastTreeNodeId(id) {
    if (id) {
        var index = id.lastIndexOf('.');
        if (index > 0) {
            id = id.substring(index + 1);
        }
    }
    return id;
}

function countInstances(mainStr, subStr) {
    var count = 0;
    var offset = 0;
    do {
        offset = mainStr.indexOf(subStr, offset);
        if (offset !== -1) {
            count++;
            offset += subStr.length;
        }
    } while (offset !== -1);
    return count;
}

function getSortId(treeNodeId) {
    var sortId = 0;
    if (treeNodeId) {
        sortId = treeNodeId.match(/\d/g).join('');
        switch (countInstances(treeNodeId, '.')) {
            case 0:
                sortId += '00000000';
                break;
            case 1:
                sortId += '000000';
                break;
            case 2:
                sortId += '0000';
                break;
            case 3:
                sortId += '00';
                break;
        }
    }
    return parseInt(sortId);
}

function getTreeNodeId(parentId, parentTreeNodeId) {
    return query(sqlConfig.t_moni_res_type_select_by_parentid, parentId).then(function (rows) {
        if (rows && rows.length > 0) {
            var ids = [];
            rows.forEach(function (row) {
                ids.push(parseInt(getLastTreeNodeId(row.c_tree_node_id)));
            });
            var lastTreeId = String(_.max(ids) + 1);
            if (lastTreeId) {
                if (lastTreeId.length === 1) {
                    lastTreeId = '0' + lastTreeId;
                }
            }
            if (parentTreeNodeId) {
                parentTreeNodeId = parentTreeNodeId + '.' + lastTreeId;
            }
            return parentTreeNodeId;
        }
    });
}