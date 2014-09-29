'use strict';
/**
 * Created by R04419 on 2014/9/11.
 * 资源模型管理 指标维护
 */

var Q = require('q');
var SqlCommand = require('./class/SQLCommand.js'),
    commander = new SqlCommand(true),
    commander_query_metric = new SqlCommand(),
    commander_query_binding = new SqlCommand(),
    commander_query_command = new SqlCommand();
var func_helper = require('./func/commonfunc.js');

/**
 * 获取指标ID列表
 *
 * @method getMetricIDList
 * @param modelId 模型ID
 * @return {Object} 资源模型关系的recordSet对象
 */
exports.getMetricIDList = function () {
    var myQ = Q.defer();
    commander.getBySql('SELECT c_id FROM t_moni_metric_base ', []).then(function (recordset) {
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
 * 获取指标详细信息
 *
 * @method getMetricDetailById
 * @param modelId 模型ID
 * @param metricId 指标ID
 * @return {Object} 资源模型关系的recordSet对象
 */
exports.getMetricDetailById = function  (modelId,metricId) {
    var myQ = Q.defer();
    Q.spread([
        commander.get('t_moni_model_base.selectMetricInfo',[modelId,metricId]),
        commander.get( 't_moni_model_base.selectCommandProperties',[modelId,metricId]),
        commander.get('t_moni_model_base.selectSupportProperties',[modelId,metricId])
    ],function(metricResult,collectCmdResult,collectSupportResult){
        Array.prototype.push.apply(metricResult.rows, collectCmdResult.rows);
        Array.prototype.push.apply(metricResult.rows, collectSupportResult.rows);
        myQ.resolve(metricResult);
    });
    return myQ.promise;
};

/**
 * 获取模型下的详细信息
 * @method getModelMetricCommandDetail
 * @param modelId 模型ID
 * @param metricId 指标ID
 * @param collectProtocol 采集协议
 * @param isInstance 是否实例化 (-1 / 1)
 * @param isInitvalue 是否初始化 (-1 / 1)
 * @param isDisplayname 是否显示名称 (-1 / 1)
 */
exports.getModelMetricCommandDetail = function(modelId,metricId,collectProtocol,isInstance,isInitvalue,isDisplayname) {
    //return commander.get('t_moni_model_metric.selectDetail',[modelId,metricId,isInstance,isInitvalue,isDisplayname,collectProtocol]);
    var myQ = Q.defer();
    Q.spread([
        commander.getBySql('SELECT DISTINCT (modelMetricRel.c_metric_id) AS metricId,' +
            'metricBase.c_name AS metricName' +
            ',metricBase.c_desc AS metricDescr,' +
            'metricBase.c_metric_type AS metricType,' +
            'metricBase.c_unit AS metricUnit,' +
            'metricBase.c_data_type AS metricDataType,' +
            'metricBindle.c_is_instance AS isInstance,' +
            'metricBindle.c_is_initvalue AS isInitValue,' +
            'metricBindle.c_is_displayname AS isDisplayName,' +
            'modelMetricRel.c_model_id AS modelId,' +
            'SUBSTRING(modelMetricRel.c_model_id, 1, 8) AS modelPrefix,' +
            'metricGroup.c_id AS  metricGroupId,'+
            'modelMetricRel.c_res_type_id AS resType ' +
            'FROM ' +
            't_moni_metric_group AS metricGroup,'+
            't_moni_model_metric_rel AS modelMetricRel,' +
            't_moni_metric_base AS metricBase,' +
            't_moni_metricbinding AS metricBindle ' +
            'WHERE ' +
             'modelMetricRel.c_model_id = ?' +
            'AND modelMetricRel.c_metric_id = ? ' +
            'AND metricBindle.c_is_instance = ? ' +
            'AND metricBindle.c_is_initvalue = ? ' +
            'AND metricBindle.c_is_displayname = ? ' +
            'AND metricBase.c_id = modelMetricRel.c_metric_id ' +
            'AND metricBindle.c_metric_id = modelMetricRel.c_metric_id ' +
            'AND metricBindle.c_model_id = modelMetricRel.c_model_id ',
            [modelId,metricId,isInstance,isInitvalue,isDisplayname]),

        commander.getBySql('SELECT metricBindle.c_metric_id AS metricId,' +
            'collCommand.c_id AS collCommandId,' +
            'collCommand.c_protocol AS coltProtocol,' +
            'collCommand.c_cmd AS collCommand,' +
            'collCommandGroup.c_id AS collCommandGroupId ' +
            'FROM ' +
             't_moni_cmd AS collCommand,' +
            't_moni_cmds_group AS collCommandGroup,' +
            't_moni_metricbinding AS metricBindle' +
            ' WHERE ' +
            'collCommand.c_cmds_group_id = collCommandGroup.c_id ' +
            'AND collCommandGroup.c_metricbinding_id = metricBindle.c_id ' +
            'AND metricBindle.c_is_instance =?' +
            'AND metricBindle.c_is_initvalue =? ' +
            'AND metricBindle.c_is_displayname = ? ' +
            'AND metricBindle.c_metric_id = ?' +
            'AND metricBindle.c_model_id = ? ' +
            'AND collCommand.c_protocol = ?',
            [isInstance,isInitvalue,isDisplayname,metricId,modelId,collectProtocol]),

        commander.getBySql('SELECT metricBindle.c_metric_id AS metricId,' +
            'cmdProperties.c_name AS propertyName,' +
            'cmdProperties.c_value AS propertyValue' +
            ' FROM t_moni_cmd_properties AS cmdProperties,' +
            't_moni_cmd AS collCommand,' +
            't_moni_cmds_group AS collCommandGroup,' +
            't_moni_metricbinding AS metricBindle ' +
            'WHERE cmdProperties.c_cmd_id = collCommand.c_id ' +
            'AND metricBindle.c_is_instance =? ' +
            'AND metricBindle.c_is_initvalue =? ' +
            'AND metricBindle.c_is_displayname =? ' +
            'AND metricBindle.c_metric_id =? ' +
            'AND metricBindle.c_model_id = ? ' +
            'AND collCommand.c_cmds_group_id = collCommandGroup.c_id ' +
            'AND collCommandGroup.c_metricbinding_id = metricBindle.c_id ' +
            'AND collCommand.c_protocol = ?',
            [isInstance,isInitvalue,isDisplayname,metricId,modelId,collectProtocol])
    ],function(metricResult,collectCmdResult,collectPropertyResult){
        var  nFind=1;
        for (var i=0; i< metricResult.recourdCount; i++) {
            var metricId = metricResult.rows[i][metricResult.fields[0]];
            for (var j=0; j< collectCmdResult.recourdCount;j++) {
                var cmdMetricId = collectCmdResult.rows[j][collectCmdResult.fields[0]];
                if (metricId === cmdMetricId) {
                    metricResult.rows[i].collCommandId = collectCmdResult.rows[j][collectCmdResult.fields[1]];
                    metricResult.rows[i].coltProtocol = collectCmdResult.rows[j][collectCmdResult.fields[2]];
                    metricResult.rows[i].collCommand = collectCmdResult.rows[j][collectCmdResult.fields[3]];
                    metricResult.rows[i].collCommandGroupId = collectCmdResult.rows[j][collectCmdResult.fields[4]];
                }  else {
                    nFind++;
                    if (nFind === collectCmdResult.recourdCount ) {
                        nFind = 1;
                        metricResult.rows[i].collCommandId = "";
                        metricResult.rows[i].coltProtocol = "";
                        metricResult.rows[i].collCommand = "";
                        metricResult.rows[i].collCommandGroupId = "";

                    }
                }
            }
            if (collectCmdResult.recourdCount === 0) {
                metricResult.rows[i].collCommandId = "";
                metricResult.rows[i].coltProtocol = "";
                metricResult.rows[i].collCommand = "";
                metricResult.rows[i].collCommandGroupId = "";
            }
        }
        var cmdFindIndex = 1;
        for ( var m=0; m< metricResult.recourdCount; m++) {
            var  metricIdValue2 = metricResult.rows[m][metricResult.fields[0]];
            for (var n = 0; n <  collectPropertyResult.recourdCount;n ++) {
                var propertyMetricIdValue = collectPropertyResult.rows[n][collectPropertyResult.fields[0]];
                if (metricIdValue2 === propertyMetricIdValue) {
                    metricResult.rows[m].commandName= collectPropertyResult.rows[n][collectPropertyResult.fields[1]];
                    metricResult.rows[m].commandValue = collectPropertyResult.rows[n][collectPropertyResult.fields[2]];
                }  else {
                    cmdFindIndex++;
                    if (cmdFindIndex ===   collectCmdResult.recourdCount) {
                        cmdFindIndex = 1;
                        metricResult.rows[m].commandName= "";
                        metricResult.rows[m].commandValue ="";
                    }
                }
            }

            if ( collectPropertyResult.recourdCount === 0) {
                metricResult.rows[m].commandName= "";
                metricResult.rows[m].commandValue ="";
            }
        }

        myQ.resolve(metricResult);
    });
    return myQ.promise;

};

/**
 * 根据模型ID获取指标详细信息
 *
 * @method getModelMetricDetailData
 * @param modelId 模型ID
 * @return {Object} 资源模型关系的recordSet对象
 */
exports.getModelMetricDetailData = function(modelId) {
    return  commander.get('t_moni_model_metric.select',[modelId,modelId,modelId]);
};

/**
 * 根据模型ID获取指标详细信息
 *
 * @method getModelMetricDetailByModelId
 * @param modelId 模型ID
 * @return {Object} 资源模型关系的recordSet对象
 */
exports.getModelMetricDetailByModelId = function  (modelId) {
    var myQ = Q.defer();
    Q.spread([
        commander_query_metric.get('t_moni_metric_base.selectByModelId',[modelId]),
        commander_query_binding.get('t_moni_metric_binding.selectByModelId',[modelId]),
        commander_query_command.get('t_moni_cmd.selectByModelId',[modelId])
    ],function(metricResult,bindingResult,collectCmdResult){
   var  nFind=1;
   for (var i=0; i< metricResult.recourdCount; i++) {
            var metricValue = metricResult.rows[i][metricResult.fields[0]];

            for (var j=0; j< bindingResult.recourdCount;j++) {
                 var bindingValue = bindingResult.rows[j][bindingResult.fields[0]];

                 if (metricValue === bindingValue) {
                     metricResult.rows[i].isInitValue = bindingResult.rows[j][bindingResult.fields[1]];
                     metricResult.rows[i].isInstance = bindingResult.rows[j][bindingResult.fields[2]];
                     metricResult.rows[i].isDisplayName = bindingResult.rows[j][bindingResult.fields[3]];
                 }  else {
                     nFind++;
                     if (nFind === bindingResult.recourdCount ) {
                         nFind = 1;
                         metricResult.rows[i].isInitValue = "";
                         metricResult.rows[i].isInstance = "";
                         metricResult.rows[i].isDisplayName = "";

                     }
                 }

            }
        }

        var cmdFindIndex = 1;
        for ( var m=0; m< metricResult.recourdCount; m++) {
           var  metricValue2 = metricResult.rows[m][metricResult.fields[0]];
            for (var n = 0; n <  collectCmdResult.recourdCount;n ++) {
                var commandValue = collectCmdResult.rows[n][collectCmdResult.fields[0]];
                if (metricValue2 === commandValue) {

                    metricResult.rows[m].collProtocol= collectCmdResult.rows[n][collectCmdResult.fields[1]];
                    metricResult.rows[m].modelPrefix = collectCmdResult.rows[n][collectCmdResult.fields[2]];
                    metricResult.rows[m].collCommand = collectCmdResult.rows[n][collectCmdResult.fields[3]];
                    metricResult.rows[m].commandName = collectCmdResult.rows[n][collectCmdResult.fields[4]];
                    metricResult.rows[m].commandValue = collectCmdResult.rows[n][collectCmdResult.fields[5]];
                }  else {
                    cmdFindIndex++;
                    if (cmdFindIndex ===   collectCmdResult.recourdCount) {
                        cmdFindIndex = 1;
                        metricResult.rows[m].collProtocol = "";
                        metricResult.rows[m].modelPrefix = "";
                        metricResult.rows[m].collCommand = "";
                        metricResult.rows[m].commandName = "";
                        metricResult.rows[m].commandValue = "";
                    }
                }
            }
        }
        myQ.resolve(metricResult.rows);
    });
    return myQ.promise;
};

/**
 * 根据模型ID,指标ID获取指令组ID
 */
function getCommandGroupId(modelId,metricId) {
  return  commander.get('t_moni_cmd_group.selectById',[modelId,metricId]);
}

/*
* 修改指标的绑定数据
*  @method saveMetricBindingModify
*  @param modelId 模型ID
*  @param metricId 指标ID
*  @param isInstance 是否实例化指标 1 是  -1 否
*  @param isInitvalue 是否初始化指标 1 是  -1 否
*  @param isDisplayname 是否默认显示指标 1 是  -1 否
*  @return {Object} 资源模型关系的recordSet对象
*/
function saveMetricBindingModify(modelId,metricId,isInstance,isInitvalue,isDisplayname) {
    var userId="admin";
    var myQ = Q.defer();
    var logContent="资源模型管理,修改指标绑定数据:" + "metricid:" + metricId + "modelid:"+modelId ;
    commander.save("t_moni_metricbinding.update", {modelId: modelId, metricId: metricId, isInstance: isInstance, isInitvalue: isInitvalue, isDisplayname: isDisplayname},{user:userId,info:logContent}).then(function (recordset) {
        myQ.resolve(recordset);
    }).fail(function (err) {
        myQ.reject(err);
    });
    return myQ.promise;
}

/*
* 修改采集指令采集协议类型
* updateMetricBindingModify
* @param modelId 模型ID
* @param metricId 指标ID
* @param protocolName 协议名称
* @return {Object} 资源模型关系的recordSet对象
**/
 exports.updateMetricBindingModify = function (modelId,metricId,protocolName) {
    var userId="admin";
    var myQ = Q.defer();
    var logContent="资源模型管理,修改指标绑定数据:" + "metricid:" + metricId + "modelid:"+modelId ;
    //根据模型id，指标id取指令组id
    commander.get('t_moni_cmd_group.selectById',[modelId,metricId]).then(function (recordset){
        var jsonStr = JSON.stringify(recordset);
        var jsonObj = JSON.parse(jsonStr);
        var field = jsonObj.fields[0];
        var groupId = jsonObj.rows[0][field];
        //修改采集协议
        commander.save("t_moni_cmd_protocol.update", {cmdsGroupId: groupId,collectProtocol:protocolName},{user:userId,info:logContent}).then(function (recordset) {
            myQ.resolve(recordset);
        }).fail(function (err) {
            myQ.reject(err);
        });
    }).fail(function(err){
        myQ.reject(err);
    });
    return myQ.promise;
}

/*
 * 保存采集指令数据
 * saveCollectCommands
 * @param modelId 模型ID
 * @param metricId 指标ID
 * @param cmdUUID 采集指令UUID
 * @param collProtocol 采集协议
 * @param collCommand  采集命令
 * @return {Object} 资源模型关系的recordSet对象
 **/
function saveCollectCommands(modelId,metricId,cmdUUID,collProtocol,collCommand) {
    var userId="admin";
    var myQ = Q.defer();
    var logContent="资源模型管理,插入采集协议和采集指令数据:" + "metricid:" + metricId + "modelid:"+modelId ;
    //根据模型id，指标id取指令组id
    commander.get('t_moni_cmd_group.selectById',[modelId,metricId]).then(function (recordset){
        var jsonStr = JSON.stringify(recordset);
        var jsonObj = JSON.parse(jsonStr);
        var field = jsonObj.fields[0];
        var groupId = jsonObj.rows[0][field];
        //插入采集数据
        commander.save("t_moni_cmd.insert", {cmd_id: cmdUUID,cmds_groupid:groupId,default_index:0,colt_protocol:collProtocol,colt_cmd:collCommand},{user:userId,info:logContent}).then(function (recordset) {
            myQ.resolve(recordset);
        }).fail(function (err) {
            myQ.reject(err);
        });
    }).fail(function(err){
        myQ.reject(err);
    });
    return myQ.promise;
}

/*
 * 保存扩展采集指令数据
 * saveCollectSupportCommands
 * @param modelId 模型ID
 * @param metricId 指标ID
 * @param cmdUUID 采集指令UUID
 * @param collProtocol 采集协议
 * @param collCommand  采集命令
 * @return {Object} 资源模型关系的recordSet对象
 **/
exports.saveCollectSupportCommands = function (modelId,metricId,cmdUUID,oidVersion,oidRelease) {
    var userId="admin";
    var myQ = Q.defer();
    var logContent="资源模型管理,插入采集指令属性数据:" + "metricid:" + metricId + "modelid:"+modelId ;
    //根据模型id，指标id取指令组id
    commander.get('t_moni_cmd_group.selectById',[modelId,metricId]).then(function (recordset){
        var jsonStr = JSON.stringify(recordset);
        var jsonObj = JSON.parse(jsonStr);
        var field = jsonObj.fields[0];
        var groupId = jsonObj.rows[0][field];
        //插入采集数据
        commander.save("t_moni_cmds_support.insert", {cmd_id: cmdUUID,cmds_groupid:groupId,oid_version:oidVersion,oid_rel:oidRelease},{user:userId,info:logContent}).then(function (recordset) {
            myQ.resolve(recordset);
        }).fail(function (err) {
            myQ.reject(err);
        });
    }).fail(function(err){
        myQ.reject(err);
    });
    return myQ.promise;
};


function updateCollectCommandProtocolAndCommand(commandGUID,commandProtocol,commandCmd) {
    var myQ = Q.defer();
    var userId = "admin";
    var logContent="资源模型管理,修改采集指令属性数据:" + "GUID:" + commandGUID + "protocol:"+commandProtocol+"command:"+ commandCmd;
    commander.save("t_moni_cmd.update", {cmdId: commandGUID,collectProtocol:commandProtocol,collectCmd:commandCmd},{user:userId,info:logContent}).then(function (recordset) {
        myQ.resolve(recordset);
    }).fail(function (err) {
        myQ.reject(err);
    });
}

/*
 * 保存采集指令属性数据
 * saveCollectCommandsProperties
 * @param modelId 模型ID
 * @param metricId 指标ID
 * @param cmdUUID 采集指令UUID
 * @param collProtocol 采集协议
 * @param collCommand  采集命令
 * @return {Object} 资源模型关系的recordSet对象
 **/
function saveCollectCommandsProperties (collCommandId,propertyName,propertyValue) {
    var userId="admin";
    var myQ = Q.defer();
    var logContent="资源模型管理,修改指标绑定数据:" + "collCommandId:" + collCommandId + "name:"+propertyName + "value:" + propertyValue ;
    commander.save("t_moni_cmd_properties.insert", {cmd_id:collCommandId,pro_name:propertyName,pro_value:propertyValue},{user:userId,info:logContent}).then(function (recordset) {
        myQ.resolve(recordset);
    }).fail(function (err) {
        myQ.reject(err);
    });
    return myQ.promise;
}


function updateCollectCommandsProperties(CommandGUID,propertyName,propertyValue) {
    var userId="admin";
    var myQ = Q.defer();
    var logContent="资源模型管理,修改指标绑定数据:" + "CommandGUID:" + CommandGUID + "name:"+propertyName + "value:" + propertyValue ;
    commander.save("t_moni_cmd_properties.update", {colCmdId:CommandGUID,collectName:propertyName,collectValue:propertyValue},{user:userId,info:logContent}).then(function (recordset) {
        myQ.resolve(recordset);
    }).fail(function (err) {
        myQ.reject(err);
    });
    return myQ.promise;
}

//保存模型与指标之间的关系
function saveModelMetricReleasion(modelId,metric_id,resTypeId) {
    var myQ = Q.defer();
    var userId="Admin";
    var logContent = "资源模型管理,添加模型与指标间的关系"+"metricid:" +metric_id ;
    commander.save("t_moni_model_metric_rel.insert", {modelid: modelId, metricid: metric_id, restypeid: resTypeId}, {user: userId, info: logContent}).then(function (recordset) {
        myQ.resolve(recordset);
    }).fail(function (err) {
        myQ.reject(err);
    });
    return myQ.promise;
}


/*
 * 添加模型下指标数据和采集指令数据
 * addModelMetricAndCollectParam
 * @param modelId  模型ID
 * @param metricId 指标ID
 * @param resType  资源类型
 * @param usedProtocol   采集协议
 * @param isInstance     是否实例化
 * @param isInitvalue    是否初始化
 * @param isDisplayname  是否显示
 * @param collectCmd     采集指令
 * @param paramName      参数名称
 * @param paramValue     参数值
 * @return {Object} 资源模型关系的recordSet对象
 **/
exports.addModelMetricAndCollectParam = function (modelId,metricId,resType,usedProtocol,isInstance,isInitvalue,isDisplayname,collectCmd,paramName,paramValue) {

   var cmdUUID =  func_helper.getUUID();

     if (paramName !=="" && paramValue!=="" ) {
        return Q.spread([
            //添加一个指标与与模型的关系
            //saveModelMetricReleasion(modelId,metricId,resType),
            //修改绑定关系数据

            saveMetricBindingModify(modelId, metricId, isInstance, isInitvalue, isDisplayname),
            //添加采集指令
            saveCollectCommands(modelId, metricId, cmdUUID, usedProtocol, collectCmd),
            //添加采集参数
            saveCollectCommandsProperties(cmdUUID, paramName, paramValue)
        ], function (metricBinding, collectCommand, collectCommandProperties) {
            commander.commit();
            return cmdUUID;//collectCommandProperties;
        }).fail(function (err) {
            commander.rollback();
        });
    }
    else {
        return Q.spread([
            saveMetricBindingModify(modelId, metricId, isInstance, isInitvalue, isDisplayname),
            //添加采集指令
            saveCollectCommands(modelId, metricId, cmdUUID, usedProtocol, collectCmd)
        ], function ( metricBinding, collectCommand) {
            commander.commit();
            return cmdUUID;//collectCommand;
        }).fail(function (err) {
            commander.rollback();
        });
    }
};


/*
 * 修改模型下指标数据和采集指令数据
 * modifyModelMetricAndCollectParam
 * @param modelId  模型ID
 * @param metricId 指标ID
 * @param collectCommandId 指令UUID
 * @param usedProtocol   采集协议
 * @param isInstance     是否实例化
 * @param isInitvalue    是否初始化
 * @param isDisplayname  是否显示
 * @param collectCmd     采集指令
 * @param paramName      参数名称
 * @param paramValue     参数值
 * @return {Object} 资源模型关系的recordSet对象
 **/
exports.modifyModelMetricAndCollectParam = function (modelId,metricId,collectCommandUUId,usedProtocol,isInstance,isInitvalue,isDisplayname,collectCmd,paramName,paramValue) {

    if (paramName!=="" && paramValue!=="") {
        return Q.spread([
            //修改绑定关系数据
            saveMetricBindingModify(modelId, metricId, isInstance, isInitvalue, isDisplayname),
            //修改采集指令
            updateCollectCommandProtocolAndCommand(collectCommandUUId, usedProtocol, collectCmd),
            //修改采集参数
            updateCollectCommandsProperties(collectCommandUUId, paramName, paramValue)
        ], function (metricBindingResult, collectCommandResult, collectCommandPropertiesResult) {
            commander.commit();
            return collectCommandPropertiesResult;
        }).fail(function (err) {
            commander.rollback();
        });
    }
    else
    {
        return Q.spread([
            //修改绑定关系数据
            saveMetricBindingModify(modelId, metricId, isInstance, isInitvalue, isDisplayname),
            //修改采集指令
            updateCollectCommandProtocolAndCommand(collectCommandUUId, usedProtocol, collectCmd)

        ], function (metricBindingResult, collectCommandResult) {
            commander.commit();
            return collectCommandResult;
        }).fail(function (err) {
            commander.rollback();
        });
    }
};


/**
 * 获取扩展指令列表
 * getSNMPSupportCommandList
 * @param modelId  模型ID
 * @param metricId 指标ID
 * @return {Object} 资源模型关系的recordSet对象
 **/
exports.getSNMPSupportCommandList = function(modelId,metricId) {
 return commander.get('t_moni_cmds_support.selectByModelId',[modelId,metricId]);
};


/**
 *保存扩展指令
 * saveAddSNMPSupportCommand
 * @param collectCmdUUID  采集指令对应的UUID
 * @param sysOID  systemOID
 * @param sysVersion systemVersion
 * @return {Object} 资源模型关系的recordSet对象
 **/
exports.saveAddSNMPSupportCommand = function(collectCmdUUID,sysOID,sysVersion) {
    var userId="admin";
    var myQ = Q.defer();
    var logContent="资源模型管理,添加扩展指令数据:" + "CommandGUID:" + collectCmdUUID + "sysoid:"+sysOID + "sysversion:" + sysVersion ;
    //根据模型id，指标id取指令组id
    commander.get('t_moni_cmd.selectGroupId',[collectCmdUUID]).then(function (recordset){
        var jsonStr = JSON.stringify(recordset);
        var jsonObj = JSON.parse(jsonStr);
        var field = jsonObj.fields[0];
        var cmdsGroupId = jsonObj.rows[0][field];
        var supportUUID = func_helper.getUUID();
        //插入采集数据
        commander.save('t_moni_cmds_support.insert', {cmd_id:supportUUID,cmds_groupid:cmdsGroupId,oid_version:sysOID,oid_rel:sysVersion},{user:userId,info:logContent}).then(function (recordset) {
            myQ.resolve(recordset);
        }).fail(function (err) {
            myQ.reject(err);
        });
    }).fail(function(err){
        myQ.reject(err);
    });
    return myQ.promise;
};


/**
 *保存修改扩展指令
 * modifySNMPSupportCommand
 * @param collectCmdUUID  采集指令对应的UUID
 * @param sysOID  systemOID
 * @param sysVersion systemVersion
 * @return {Object} 资源模型关系的recordSet对象
 **/

exports.modifySNMPSupportCommand=function(cmdsGroupID) {

    var myQ = Q.defer();
    var userId = "admin";
    var logContent="资源模型管理,修改采集指令属性数据:" + "GUID:" + commandGUID + "protocol:"+commandProtocol+"command:"+ commandCmd;
    commander.save("t_moni_cmds_support.update", {cmdId: commandGUID,collectProtocol:commandProtocol,collectCmd:commandCmd},{user:userId,info:logContent}).then(function (recordset) {
        myQ.resolve(recordset);
    }).fail(function (err) {
        myQ.reject(err);
    });
};



/**
 *删除扩展指令
 * delSNMPSupportCommand
 * @param cmdsGroupId  指令组id数组
 * @return {Object} 资源模型关系的recordSet对象
 **/
exports.delSNMPSupportCommand = function (cmdsGroupId) {
    var userId="admin";
    var myQ = Q.defer();
    var delJson ={
        ids:cmdsGroupId
    };
    var logContent="指标库管理,删除扩展指令.";
    commander.del("t_moni_cmds_support.delete", delJson,{user:userId,info:logContent}).then(function (recordset) {
        myQ.resolve(recordset);
    }).fail(function (err) {
        myQ.reject(err);
    });
    return myQ.promise;
};