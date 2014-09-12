'use strict';

/**
 * Created by R04419 on 2014/9/10.
 * 资源模型关系关联表
 */

var Q = require('q'),
    SqlCommand = require('../service/class/SQLCommand.js'),
    commander = new SqlCommand();

/**
 * 资源模型关联关系查询,根据c_model_id查询t_moni_model_metric_rel
 *
 * @method getModelMetricRelationData
 * @param modelId 模型ID
 * @return {Object} 资源模型关系的recordSet对象
 */
exports.getModelMetricRelationData = function (modelId) {
    var myQ = Q.defer();
    commander.get('t_moni_model_metric_rel.selectById', [modelId]).then(function (recordset) {
        var jsonStr = JSON.stringify(recordset);
        console.log(jsonStr);
        var obj = JSON.parse(jsonStr);
        if (obj.isError) {
            myQ.reject(obj);
        } else {
            myQ.resolve(obj);
        }
    }).fail(function (err) {
        myQ.reject(err);
    });
    return myQ.promise;
};

/**
 * 添加模型与指标之间的关系
 *
 * @method saveModelMetricRelation
 * @param {jsonObject} 保存数据的json对象
 * @return {Object} 指标信息recordSet对象
 */
exports.saveModelMetricRelation = function (sqlparam) {
    var userId="Admin";
    var myQ = Q.defer();
    var modelId = sqlparam.modelid;
    var metricIdArray = sqlparam.metricid;
    var resTypeId = sqlparam.restypeid;
    var logContent="";
    metricIdArray.forEach(function(metric_id){
        logContent="";
        logContent="资源模型管理,添加模型与指标间的关系"+"metricid:" +metric_id ;
        commander.save("t_moni_model_metric_rel.insert", {modelid:modelId,metricid:metric_id,restypeid:resTypeId},{user:userId,info:logContent}).then(function (recordset) {
            myQ.resolve(recordset);
        }).fail(function (err) {
            myQ.reject(err);
        });
    });

    return myQ.promise;
};


/**
 * 删除模型与指标之间的关系
 *
 * @method deleteModelMetricRelation
 * @param {string} modelId 模型ID
 *  @param {string} metricId 指标ID
 * @return {Object} 指标信息recordSet对象
 */
exports.deleteModelMetricRelation = function(modelId,metricId){
    var userId="Admin";
    var logContent ="";
    var sql ="";
    var data = {};
    var myQ = Q.defer();
    if (metricId ==="") {
        logContent = "资源模型管理,删除模型与指标间的关系:" + "modelId:" + modelId ;
        sql= "DELETE FROM t_moni_model_metric_rel where c_model_id in (:model_ids) ";
        data = {
            model_ids: modelId
        };
    }
    else {
        logContent = "资源模型管理,删除模型与指标间的关系:" + "modelId:" + modelId +",metricId:" + metricId;
        sql= "DELETE FROM t_moni_model_metric_rel where c_model_id in (:model_ids) and c_metric_id in (:metric_ids) ";
        data = {
            model_ids: modelId,
            metric_ids:metricId
        };
    }
    commander.delBySql(sql, data,{user:userId,info:logContent}).then(function(recordset){
        myQ.resolve(recordset);
    }).fail(function(err){
        myQ.reject(err);
    });
    return myQ.promise;
};


/**
 * 根据模型ID获取指标详细信息
 *
 * @method getModelMetricList
 * @param {string} modelId 模型ID
 * @return {Object} 指标信息recordSet对象
 */
exports.getModelMetricList = function (modelId) {
    var myQ = Q.defer();
    commander.get('t_moni_model_base.selectById', [modelId]).then(function (recordset) {
        var jsonStr = JSON.stringify(recordset);
        console.log(jsonStr);
        var obj = JSON.parse(jsonStr);
        if (obj.isError) {
            myQ.reject(obj);
        } else {
            myQ.resolve(obj);
        }
    }).fail(function (err) {
        myQ.reject(err);
    });
    return myQ.promise;
};
