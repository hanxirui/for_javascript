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
        commander.save("t_moni_model_metric_rel.insert", {modelId:modelId,metricId:metric_id,resTypeId:resTypeId},{user:userId,info:logContent}).then(function (recordset) {
            myQ.resolve(recordset);
        }).fail(function (err) {
            myQ.reject(err);
        });
    });

    return myQ.promise;
};

exports.saveModelMetricRelation = function (transaction, modelmetricrel) {
    return transaction.save("t_moni_model_metric_rel.insert", modelmetricrel);
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
//    var myQ = Q.defer();
//    commander.get('t_moni_model_base.selectById', [modelId]).then(function (recordset) {
//        var jsonStr = JSON.stringify(recordset);
//        console.log(jsonStr);
//        var obj = JSON.parse(jsonStr);
//        if (obj.isError) {
//            myQ.reject(obj);
//        } else {
//            myQ.resolve(obj);
//        }
//    }).fail(function (err) {
//        myQ.reject(err);
//    });
//    return myQ.promise;

    var myQ = Q.defer();
    Q.spread([
        commander.getBySql('SELECT metricBase.c_id AS metricId,'+
        'metricBinding.c_id AS metricBindingId,'+
        'metricBase.c_name AS metricName,'+
        'metricBinding.c_is_instance AS isInstance,'+
        'metricBinding.c_is_initvalue AS isInitValue,'+
        'metricBinding.c_is_displayname AS isDisplayName,'+
        'SUBSTRING(modelMetricRel.c_model_id,1,8) AS modelId,'+
        'metricBase.c_is_custom AS isCustom '+
        ' FROM '+
        't_moni_metric_base AS metricBase,'+
        't_moni_model_metric_rel AS modelMetricRel,'+
        't_moni_cmds_group AS commandGroup,'+
        't_moni_metricbinding AS metricBinding'+
        ' WHERE  metricBase.c_id = modelMetricRel.c_metric_id '+
        ' AND modelMetricRel.c_model_id = ?'+
        ' AND metricBinding.c_model_id = ?'+
        ' AND metricBinding.c_metric_id = modelMetricRel.c_metric_id'+
        ' AND commandGroup.c_metricbinding_id = metricBinding.c_id'+
        ' GROUP BY metricBindingId',[modelId,modelId]),

         commander.getBySql('SELECT t_moni_metricbinding.c_id AS bindingId,t_moni_metricbinding.c_metric_id as metricId,t_moni_cmd.c_protocol As coltProtocol '+
        ' FROM '+
        ' t_moni_metricbinding,t_moni_cmds_group,t_moni_cmd'+
        ' WHERE t_moni_metricbinding.c_model_id = ? '+
        ' AND t_moni_cmds_group.c_metricbinding_id = t_moni_metricbinding.c_id'+
        ' AND t_moni_cmd.c_cmds_group_id = t_moni_cmds_group.c_id'+
        ' AND t_moni_cmd.c_protocol IN ("SNMP","JDBC","WMI")'+
        ' GROUP BY bindingId',[modelId])
    ],function(metricResult,collectCmdResult){
        var  nFind=1;
        for (var i=0; i< metricResult.recourdCount; i++) {
            var metricId = metricResult.rows[i][metricResult.fields[0]];
            var bindingId = metricResult.rows[i][metricResult.fields[1]];

            for (var j=0; j< collectCmdResult.recourdCount;j++) {
                var bindingId2 = collectCmdResult.rows[j][collectCmdResult.fields[0]];
                var metricId2 = collectCmdResult.rows[j][collectCmdResult.fields[1]];

                if (bindingId === bindingId2 && metricId === metricId2) {
                    metricResult.rows[i].coltProtocol = collectCmdResult.rows[j][collectCmdResult.fields[2]];
                }
            }
        }
        var modelMetricArray = [];
        for (var p=0; p< metricResult.recourdCount; p++) {
            if (metricResult.rows[p].coltProtocol !== undefined)
            {
                modelMetricArray.push(metricResult.rows[p]);
            }
        }

        myQ.resolve(modelMetricArray);
    });
    return myQ.promise;

};
