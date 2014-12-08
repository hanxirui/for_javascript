'use strict';
var Q = require('q'),
    SqlCommand = require('../service/class/SQLCommand.js'),
    commander = new SqlCommand();
var AduitLogService = require('../service/AduitLogService');

/**
 * 指标信息页面 指标数据列表
 *
 * @method getMetricBaseList
 * @return {Object} 指标信息recordSet对象
 */
exports.getMetricBaseList = function () {
    return commander.get('t_moni_metric_base.select', []);
};

/**
 * 添加自定义指标
 *
 * @method saveMetricBase
 * @param {jsonObject} 保存数据的json对象
 * @return {Object} 指标信息recordSet对象
 */
exports.saveMetricBase = function (sqlparam) {
    var logInfo = "指标库管理,添加自定义指标" + "metric_id" + sqlparam.metric_id;
    var logContent = {
        userId: sqlparam.userid,
        info: logInfo
    };
    AduitLogService.insertLog(logContent);
    return commander.save("t_moni_metric_base.insert", {metric_id: sqlparam.metric_id, metric_name: sqlparam.metric_name, metric_desc: sqlparam.metric_desc, metric_type: sqlparam.metric_type, metric_unit: sqlparam.metric_unit, metric_datatype: sqlparam.metric_datatype, metric_iscustom: sqlparam.metric_iscustom, userid: sqlparam.userid});
};

/**
 * 添加自定义指标组关系
 *
 * @method saveMetricBase
 * @param {jsonObject} 保存数据的json对象
 * @return {Object} 指标信息recordSet对象
 */
exports.saveMetricGroupRelation = function (sqlparam) {
    var userId="liutong";
    var myQ = Q.defer();
    var groupIdArray = sqlparam.groupid;
    var metricId = sqlparam.metric_id;
    groupIdArray.forEach(function(group_id){
        var logInfo = "指标库管理,添加自定义指标组关系"+"groupid:" +group_id ;
        var logContent = {
            userId: sqlparam.userid,
            info: logInfo
        };
        AduitLogService.insertLog(logContent);
        commander.save("t_moni_metric_group_rel.insert", {groupid:group_id,metricid:metricId}).then(function (recordset) {
            myQ.resolve(recordset);
        }).fail(function (err) {
            myQ.reject(err);
        });
    });

    return myQ.promise;
};

/**
 * 修改指标库指标
 *
 * @method saveMetricBaseModify
 * @param {jsonObject} 保存数据的json对象
 * @return {Object} 指标信息recordSet对象
 */
//"UPDATE t_moni_metric_base SET c_id=:metric_id,c_name=:metric_name,c_desc=:metric_desc,c_metric_type=:metric_type,c_unit=:metric_unit,c_data_type=:metric_datatype,c_is_custom=:metric_iscustom,c_user_id=:metric_userid WHERE id =:metric_id",
/*exports.saveMetricBaseModify = function (sqlparam) {
    var userId="liutong";
    console.log(sqlparam);
    var myQ = Q.defer();
    var logContent="指标库管理,修改指标库指标关系"+"metricid:" + sqlparam.where_id ;
    commander.save("t_moni_metric_group_rel.update", {where_id:sqlparam.where_id,metric_id: sqlparam.metric_id, metric_name: sqlparam.metric_name, metric_desc: sqlparam.metric_desc, metric_type: sqlparam.metric_type, metric_unit: sqlparam.metric_unit, metric_datatype: sqlparam.metric_datatype, metric_iscustom: sqlparam.metric_iscustom, metric_userid: sqlparam.userid},{user:userId,info:logContent}).then(function (recordset) {
        myQ.resolve(recordset);
    }).fail(function (err) {
        myQ.reject(err);
    });
    return myQ.promise;
};*/

/**
 * 删除指标
 *
 * @method deleteMetricBaseById
 * @param {string}  删除的指标ID
 * @param {string}  操作员ID
 * @return {Object} 指标信息recordSet对象
 */
exports.deleteMetricBaseById = function (metricId,userId) {
    /*var userId="liutong";*/
    var myQ = Q.defer();
    var delJson ={
        ids:metricId
    };
    var logInfo="指标库管理,删除自定义指标.";
    var logContent = {
        userId: userId,
        info: logInfo
    };
    AduitLogService.insertLog(logContent);
    commander.del("t_moni_metric_base.delete", delJson).then(function (recordset) {
        myQ.resolve(recordset);
    }).fail(function (err) {
        myQ.reject(err);
    });
    return myQ.promise;
};

/**
 * 指标条件查询
 *
 * @method getMetricBaseByCondition
 * @param {string}  查询的条件 "metric_id,metric_type,metric_name"
 * @return {Object} 指标信息recordSet对象
 * */
//metric.c_name=? and metric.c_metric_type=? and metric.c_id=?
exports.getMetricBaseByCondition = function (condition) {
    var myQ = Q.defer();
    var sql = "SELECT * FROM (SELECT metric.c_id AS metricId,metric.c_name AS metricName,metric.c_unit AS metricUnit,metric.c_data_type AS dataType,metric.c_metric_type AS metricType,metric.c_desc AS metricDesc,metric.c_is_custom AS isCustom,metric.c_user_id AS metricUser,grouprel.c_metric_group_id AS groupRelId,GROUP_CONCAT(mgroup.c_name) AS groupName,GROUP_CONCAT(mgroup.c_id) AS groupId FROM t_moni_metric_base AS metric,t_moni_metric_group_rel AS grouprel,t_moni_metric_group AS mgroup WHERE  metric.c_id = grouprel.c_metric_id AND mgroup.c_id = grouprel.c_metric_group_id  GROUP BY metric.c_id) temp where 1=1";
    if(condition.type !== ''){
        sql += " AND metricType ='" + condition.type + "'";
    }
    if(condition.groupId !== ''){
        sql += " AND FIND_IN_SET('" + condition.groupId + "', temp.groupId)";
    }
    if(condition.metricName !== ''){
        sql += " AND metricName LIKE '%" + condition.metricName + "%'";
    }
    commander.getBySql(sql, []).then(function (recordset) {
        myQ.resolve(recordset);
    }).fail(function (err) {
        myQ.reject(err);
    });
    return myQ.promise;
};


/**
 * 取指标类型列表
 *
 * @method getMetricTypeList
 * @return {Object} 指标信息recordSet对象
 */

exports.getMetricTypeList = function () {
    return commander.get('t_moni_metric_base_metric_type.select', []);
};


/**
 * 取指标分组列表
 *
 * @method getMetricTypeList
 * @return {Object} 指标信息recordSet对象
 */

exports.getMetricGroupList = function () {
    return commander.get('t_moni_metric_group.select', []);
};

/**
 * 修改指标库指标
 *
 * @method saveMetricBaseModify
 * @param {jsonObject} 保存数据的json对象
 * @return {Object} 指标信息recordSet对象
 */
exports.saveMetricBaseModify = function (sqlparam) {
    var userId="liutong";
    var myQ = Q.defer();
    var logInfo="指标库管理,修改指标库指标" + "metricid:" + sqlparam.metric_id ;
    var logContent = {
        userId: sqlparam.userid,
        info: logInfo
    };
    AduitLogService.insertLog(logContent);
    commander.save("t_moni_metric_base.update", {metric_id: sqlparam.metric_id, metric_name: sqlparam.metric_name, metric_desc: sqlparam.metric_desc, metric_type: sqlparam.metric_type, metric_unit: sqlparam.metric_unit, metric_datatype: sqlparam.metric_datatype, metric_iscustom: sqlparam.metric_iscustom, metric_userid: sqlparam.userid}).then(function (recordset) {
        myQ.resolve(recordset);
    }).fail(function (err) {
        myQ.reject(err);
    });
    return myQ.promise;
};

/**
 * 删除指标库关系
 *
 * @method deleteMetricGroupRelByMetricId
 * @param {string}  指标id
 * @param {string}  登录用户ID
 * @return {Object} 指标信息recordSet对象
 */
exports.deleteMetricGroupRelByMetricId = function (metricId, userId) {
    var myQ = Q.defer();
    var delJson ={
        metric_ids:metricId
    };
    var logInfo="指标库管理, 删除指标与指标组的关系" + "metricid:" + metricId[0] ;
    var logContent = {
        userId: userId,
        info: logInfo
    };
    AduitLogService.insertLog(logContent);
    commander.del("t_moni_metric_group_rel.delete", delJson).then(function (recordset) {
        myQ.resolve(recordset);
    }).fail(function (err) {
        myQ.reject(err);
    });
    return myQ.promise;
};


/**
 * 查询指标的详细信息
 *
 * @method getMetricInfoById
 * @param {string}  查询的条件 "metric_id"
 * @return {Object} 指标信息recordSet对象
 * */
//metric.c_name=? and metric.c_metric_type=? and metric.c_id=?
exports.getMetricBaseById = function (id) {
    var myQ = Q.defer();
    commander.get("t_moni_metric_base_by_id.select", [id]).then(function (recordset) {
        myQ.resolve(recordset);
    }).fail(function (err) {
        myQ.reject(err);
    });
    return myQ.promise;
};