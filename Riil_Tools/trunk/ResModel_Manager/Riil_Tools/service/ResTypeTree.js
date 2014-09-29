/* jshint node:true */
'use strict';
/**
 * Created by mufei on 2014/8/28.
 */
var uuid = require('node-uuid');
var Q = require('q');
var _ = require('underscore');
var rand = require("random-key");
var SqlCommand = require('../service/class/SQLCommand.js');
var modelmetric_rel = require('../service/ResourceModelRelation.js');

function getResTypeTree(host) {
    var promise = Q.defer();
    var commander = new SqlCommand();
    commander.get('t_moni_res_type.select').then(function (rs) {
        if (rs && rs.recourdCount > 0) {
            for (var j = 0; j < rs.recourdCount; j++) {
                for (var i = 0; i < rs.fieldCount; i++) {
                    var field = rs.fields[i];
                    var value = rs.rows[j][field];
                    if ('pId' === field) {
                        rs.rows[j][field] = getPid(value);
                    } else if ('icon' === field) {
                        if (value) {
                            rs.rows[j][field] = getIcon(host, value);
                        }
                    }
                }
            }
            promise.resolve(rs);
        }
    });
    return promise.promise;
}

function getResModel(isMain) {
    var promise = Q.defer();
    var commander = new SqlCommand();
    commander.get('t_moni_model_base.select', [isMain]).then(function (rs) {
        if (rs && rs.recourdCount > 0) {
            for (var j = 0; j < rs.recourdCount; j++) {
                for (var i = 0; i < rs.fieldCount; i++) {
                    var field = rs.fields[i];
                    if ('id' === field) {
                        if (!rs.rows[j][field]) {
                            rs.rows[j][field] = uuid.v4();
                        }
                    }
                }
            }
            promise.resolve(rs);
        }
    });
    return promise.promise;
}

function getSubResModel(id, mainmodelid) {
    var promise = Q.defer();
    var commander = new SqlCommand();
    commander.get('t_moni_model_base.select_by_mainmodelid', [mainmodelid]).then(function (rs) {
        if (rs && rs.recourdCount > 0) {
            for (var j = 0; j < rs.recourdCount; j++) {
                for (var i = 0; i < rs.fieldCount; i++) {
                    var field = rs.fields[i];
                    if ('id' === field) {
                        rs.rows[j][field] = uuid.v4();
                    } else if ('pId' === field) {
                        rs.rows[j][field] = id;
                    }
                }
            }
        }
        promise.resolve(rs);
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
    return host + '/images/template/' + icon;
}

function getMainResModel() {
    var promise = Q.defer();
    getResModel('1').then(function (rs) {
        if (rs && rs.recourdCount > 0) {
            return Q.spread(_.map(rs.rows, function (row) {
                return getSubResModel(row.id, row.modelId);
            }), function () {
                Array.prototype.forEach.call(arguments, function (result) {
                    Array.prototype.push.apply(rs.rows, result.rows);
                });
            }).then(function () {
                promise.resolve(rs);
            });
        }
    });
    return promise.promise;
}



function getResModelTree(host) {
    var promise = Q.defer();
    Q.spread([
        getResTypeTree(host),
        getMainResModel(),
        getResModel('-1')
    ], function (resTypeTree, mainResModel, resModel) {
        Array.prototype.push.apply(resTypeTree.rows, mainResModel.rows);
        Array.prototype.push.apply(resTypeTree.rows, resModel.rows);
        promise.resolve(resTypeTree);
    });
    return promise.promise;
}

function getMainResModelTree(host) {
    var promise = Q.defer();
    Q.spread([
        getResTypeTree(host),
        getResModel('1')
    ], function (resTypeTree, mainResModel) {
        Array.prototype.push.apply(resTypeTree.rows, mainResModel.rows);
        promise.resolve(resTypeTree);
    });
    return promise.promise;
}

function getAllPlugin() {
    var commander = new SqlCommand();
    return commander.get('t_moni_model_base.select_plugin', null);
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

function getTreeNodeId(parentId, parentTreeNodeId) {
    var commander = new SqlCommand();
    return commander.get('t_moni_res_type.select_by_parentid', parentId).then(function (rs) {
        if (rs && rs.recourdCount > 0) {
            var ids = [];
            rs.rows.forEach(function (item) {
                ids.push(parseInt(getLastTreeNodeId(item.c_tree_node_id)));
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

function saveResType(resType) {
    if (resType) {
        var commander = new SqlCommand(true);
        return commander.get('t_moni_res_type.select_by_id', resType.c_parent_id)
            .then(function (rs) {
                if (rs && rs.recourdCount > 0) {
                    resType.c_tree_level = ++rs.rows[0].c_tree_level;
                    return getTreeNodeId(rs.rows[0].c_id, rs.rows[0].c_tree_node_id);
                }
            })
            .then(function (treeNodeId) {
                if (treeNodeId) {
                    resType.c_tree_node_id = treeNodeId;
                    resType.c_sort_id = getSortId(resType.c_tree_node_id);
                    return commander.save('t_moni_res_type.insert', resType);
                }
            }).then(function () {
                commander.commit();
            }).fail(function () {
                commander.rollback();
            });
    }
}

function getResTypeById(typeId) {
    var commander = new SqlCommand();
    return commander.get('t_moni_res_type.select_by_id', typeId);
}

function updataResType(resType) {
    var commander = new SqlCommand();
    return commander.save('t_moni_res_type.update', resType);
}

function deleteResType(ids) {
    var commander = new SqlCommand();
    return commander.del('t_moni_res_type.delete', ids);
}

function getResModelById(modelId) {
    var commander = new SqlCommand();
    return commander.get('t_moni_model_base.select_by_id', modelId);
}

function createResModel(sqlid, resModel) {
    if (resModel) {
        var commander = new SqlCommand(true);
        return commander.get('t_moni_res_type.select_by_id', resModel.c_res_type_id).then(function (rs) {
            if (rs && rs.recourdCount > 0) {
                resModel.c_tree_node_id = rs.rows[0].c_tree_node_id;
            }
            return commander.save(sqlid, resModel);
        }).then(function () {
            commander.commit();
        }).fail(function () {
            commander.rollback();
        });
    }
}

function saveResModel(resModel) {
    return createResModel('t_moni_model_base.insert', resModel);
}

function updataResModel(resModel) {
    return createResModel('t_moni_model_base.update', resModel);
}

function deleteResModel(ids) {
    var commander = new SqlCommand();
    return commander.del('t_moni_model_base.delete', ids);
}

function copyModelMetricRelation(commander, resModel, clonesResModel) {
    if (resModel) {
        return modelmetric_rel.getModelMetricRelationData(resModel.c_id).then(function (rs) {
            if (rs && rs.recourdCount > 0) {
                return commander.save('t_moni_model_base.insert', clonesResModel).then(function () {
                    var results = [];
                    rs.rows.forEach(function (modelmetricrel) {
                        modelmetricrel.modelId = clonesResModel.c_id;
                        modelmetricrel.resTypeId = clonesResModel.c_res_type_id;
                        results.push(modelmetric_rel.saveModelMetricRelation(commander, modelmetricrel));
                    });
                    return Q.all(results);
                });
            }
        });
    }
}

function copyResModels(modelIds) {
    var promise = Q.defer();
    if (modelIds && modelIds.length > 0) {
        var commander = new SqlCommand(true);
        var mainModels = [];
        var subModels = [];
        var results = [];
        modelIds.forEach(function (modelId) {
            results.push(commander.get('t_moni_model_base.select_by_id', modelId));
        });
        Q.spread(results, function () {
            Array.prototype.forEach.call(arguments, function (rs) {
                if (rs && rs.recourdCount === 1) {
                    if (rs.rows[0].c_is_main && rs.rows[0].c_is_main === '1') {
                        mainModels.push(rs.rows[0]);
                    } else {
                        subModels.push(rs.rows[0]);
                    }
                }
            });
        }).done(function () {
            var result = [];
            var cloneMainModels = JSON.parse(JSON.stringify(mainModels));
            var cloneSubModels = JSON.parse(JSON.stringify(subModels));
            for (var i = 0; i < cloneMainModels.length; i++) {
                cloneMainModels[i].c_id = cloneMainModels[i].c_id + "_" + rand.generate(4);
                cloneMainModels[i].c_name += '_复制';
            }
            for (var j = 0; j < cloneSubModels.length; j++) {
                cloneSubModels[j].c_id = cloneSubModels[j].c_id + "_" + rand.generate(4);
                for (var k = 0; k < mainModels.length; k++) {
                    if (cloneSubModels[j].c_main_model_id === mainModels[k].c_id) {
                        cloneSubModels[j].c_main_model_id = cloneMainModels[k].c_id;
                        break;
                    }
                }
            }
            mainModels = mainModels.concat(subModels);
            cloneMainModels = cloneMainModels.concat(cloneSubModels);
            for (var l = 0; l < mainModels.length; l++) {
                result.push(copyModelMetricRelation(commander, mainModels[l], cloneMainModels[l]));
            }
            Q.all(result).then(function () {
                commander.commit();
                promise.resolve(true);
            }).fail(function () {
                commander.rollback();
                promise.resolve(false);
            });
        });
    }
    return promise.promise;
}

module.exports.getResTypeTree = getResTypeTree;
module.exports.getResTypeById = getResTypeById;
module.exports.saveResType = saveResType;
module.exports.updataResType = updataResType;
module.exports.deleteResType = deleteResType;

module.exports.getResModelTree = getResModelTree;
module.exports.getMainResModelTree = getMainResModelTree;
module.exports.getResModelById = getResModelById;
module.exports.saveResModel = saveResModel;
module.exports.updataResModel = updataResModel;
module.exports.deleteResModel = deleteResModel;
module.exports.copyResModels = copyResModels;

module.exports.getAllPlugin = getAllPlugin;