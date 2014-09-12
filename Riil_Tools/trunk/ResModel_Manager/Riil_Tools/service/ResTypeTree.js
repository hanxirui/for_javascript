/* jshint node:true */
'use strict';
/**
 * Created by mufei on 2014/8/28.
 */
var uuid = require('node-uuid');
var q = require('q');
var _ = require('underscore');
var SqlCommand = require('../service/class/SQLCommand.js');
var commander = new SqlCommand();

function getResTypeTree(host) {
  var getQ = q.defer();
  commander.get('t_moni_res_type.select', []).then(function(recordset) {
    var jsonStr = JSON.stringify(recordset);
    var obj = JSON.parse(jsonStr);
    if (obj.isError) {
      getQ.reject(obj);
    } else {
      if (obj.fieldCount > 0) {
        for (var j = 0; j < obj.recourdCount; j++) {
          for (var i = 0; i < obj.fieldCount; i++) {
            var field = obj.fields[i];
            var value = obj.rows[j][field];
            if ('pId' === field) {
              obj.rows[j][field] = getPid(value);
            } else if ('icon' === field) {
              if (value) {
                obj.rows[j][field] = getIcon(host, value);
              }
            }
          }
        }
      }
      getQ.resolve(obj);
    }
  }).fail(function(err) {
    getQ.reject(err);
  });
  return getQ.promise;
}

function getResModel(isMain) {
  var getQ = q.defer();
  commander.get('t_moni_model_base.select', [isMain]).then(function(recordset) {
    var jsonStr = JSON.stringify(recordset);
    var obj = JSON.parse(jsonStr);
    if (obj.isError) {
      getQ.reject(obj);
    } else {
      if (obj.fieldCount > 0) {
        for (var j = 0; j < obj.recourdCount; j++) {
          for (var i = 0; i < obj.fieldCount; i++) {
            var field = obj.fields[i];
            if ('id' === field) {
              if (!obj.rows[j][field]) {
                obj.rows[j][field] = uuid.v4();
              }
            }
          }
        }
      }
      getQ.resolve(obj);
    }
  }).fail(function(err) {
    getQ.reject(err);
  });
  return getQ.promise;
}

function getSubResModel(id, mainmodelid) {
  var getQ = q.defer();
  commander.get('t_moni_model_base.select_by_mainmodelid', [mainmodelid]).then(function(recordset) {
    var jsonStr = JSON.stringify(recordset);
    var obj = JSON.parse(jsonStr);
    if (obj.isError) {
      getQ.reject(obj);
    } else {
      if (obj.fieldCount > 0) {
        for (var j = 0; j < obj.recourdCount; j++) {
          for (var i = 0; i < obj.fieldCount; i++) {
            var field = obj.fields[i];
            if ('id' === field) {
              obj.rows[j][field] = uuid.v4();
            } else if ('pId' === field) {
              obj.rows[j][field] = id;
            }
          }
        }
      }
      getQ.resolve(obj);
    }
  }).fail(function(err) {
    getQ.reject(err);
  });
  return getQ.promise;
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
  var getQ = q.defer();
  getResModel('1').then(function(recordset) {
    var jsonStr = JSON.stringify(recordset);
    var obj = JSON.parse(jsonStr);
    if (obj.isError) {
      getQ.reject(obj);
    } else {
      if (obj.fieldCount > 0) {
        q.spread(_.map(obj.rows, function(row) {
          return getSubResModel(row.id, row.modelId);
        }), function() {
          Array.prototype.forEach.call(arguments, function(result) {
            Array.prototype.push.apply(obj.rows, result.rows);
          });
        }, function(err) {
          getQ.reject(err);
        }).then(function() {
          getQ.resolve(obj);
        });
      }
    }
  });
  return getQ.promise;
}

function getResModelTree(host) {
  var getQ = q.defer();
  q.spread([
    getResTypeTree(host),
    getMainResModel(),
    getResModel('-1')
  ], function(resTypeTree, mainResModel, resModel) {
    Array.prototype.push.apply(resTypeTree.rows, mainResModel.rows);
    Array.prototype.push.apply(resTypeTree.rows, resModel.rows);
    getQ.resolve(resTypeTree);
  });
  return getQ.promise;
}

function getMainResModelTree(host) {
  var getQ = q.defer();
  q.spread([
    getResTypeTree(host),
    getMainResModel()
  ], function(resTypeTree, mainResModel) {
    Array.prototype.push.apply(resTypeTree.rows, mainResModel.rows);
    getQ.resolve(mainResModel);
  });
  return getQ.promise;
}

function getAllPlugin() {
  return get('t_moni_model_base.select_plugin');
}

function get(sqlid, id) {
  var getQ = q.defer();
  commander.get(sqlid, [id]).then(function(recordset) {
    var jsonStr = JSON.stringify(recordset);
    var obj = JSON.parse(jsonStr);
    if (obj.isError) {
      getQ.reject(obj);
    } else {
      getQ.resolve(obj);
    }
  }).fail(function(err) {
    getQ.reject(err);
  });
  return getQ.promise;
}

function save(sqlid, vo) {
  return commander.save(sqlid, vo);
}

function remove(sqlid, ids) {
  var getQ = q.defer();
  var delJson = {
    ids: ids
  };
  commander.del(sqlid, delJson).then(function(recordset) {
    getQ.resolve(recordset);
  }).fail(function(err) {
    getQ.reject(err);
  });
  return getQ.promise;
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
  return get('t_moni_res_type.select_by_parentid', parentId).then(function(recordset) {
    var jsonStr = JSON.stringify(recordset);
    var obj = JSON.parse(jsonStr);
    var ids = [];
    obj.rows.forEach(function(item) {
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
  if (!resType) {
    return;
  }
  return get('t_moni_res_type.select_by_id', resType.c_parent_id)
    .then(function(recordset) {
      var jsonStr = JSON.stringify(recordset);
      var obj = JSON.parse(jsonStr);
      if (obj.rows.length > 0) {
        resType.c_tree_level = ++obj.rows[0].c_tree_level;
        return getTreeNodeId(obj.rows[0].c_id, obj.rows[0].c_tree_node_id);
      }
    })
    .then(function(treeNodeId) {
      if (!treeNodeId) {
        return;
      }
      resType.c_tree_node_id = treeNodeId;
      resType.c_sort_id = getSortId(resType.c_tree_node_id);
      return save('t_moni_res_type.insert', resType);
    });
}

function getResTypeById(typeId) {
  return get('t_moni_res_type.select_by_id', typeId);
}

function updataResType(resType) {
  return save('t_moni_res_type.update', resType);
}

function deleteResType(ids) {
  return remove('t_moni_res_type.delete', ids);
}

function getResModelById(modelId) {
  return get('t_moni_model_base.select_by_id', modelId);
}

function createResModel(sqlid, resModel) {
  if (!resModel) {
    return;
  }
  return get('t_moni_res_type.select_by_id', resModel.c_res_type_id).then(function(recordset) {
    var jsonStr = JSON.stringify(recordset);
    var obj = JSON.parse(jsonStr);
    if (obj.rows.length > 0) {
      resModel.c_tree_node_id = obj.rows[0].c_tree_node_id;
    }
    return save(sqlid, resModel);
  });
}

function saveResModel(resModel) {
  return createResModel('t_moni_model_base.insert', resModel);
}

function updataResModel(resModel) {
  return createResModel('t_moni_model_base.update', resModel);
}

function deleteResModel(ids) {
  return remove('t_moni_model_base.delete', ids);
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

module.exports.getAllPlugin = getAllPlugin;