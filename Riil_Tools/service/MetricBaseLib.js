'use strict';
var Q = require('q'),
    SqlCommand = require('../service/class/SQLCommand.js'),
    commander = new SqlCommand();

/**
 * 指标信息页面 指标数据列表
 *
 * @method getMetricBaseList
 * @return {Object} 指标信息recordSet对象
 */
exports.getMetricBaseList = function () {
    var myQ = Q.defer();
    commander.get('t_moni_metric_base.select', []).then(function (recordset) {
        var jsonStr = JSON.stringify(recordset);
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
 * 添加自定义指标
 *
 * @method saveMetricBase
 * @param {jsonObject} 保存数据的json对象
 * @return {Object} 指标信息recordSet对象
 */
exports.saveMetricBase = function (sqlparam) {
    var myQ = Q.defer();
    console.log(sqlparam);
    commander.save("t_moni_metric_base.insert", {metric_id: sqlparam.metric_id, metric_name: sqlparam.metric_name, metric_desc: sqlparam.metric_desc, metric_type: sqlparam.metric_type, metric_unit: sqlparam.metric_unit, metric_datatype: sqlparam.metric_datatype, metric_iscustom: sqlparam.metric_iscustom, userid: sqlparam.userid}).then(function (recordset) {
        myQ.resolve(recordset);
    }).fail(function (err) {
        myQ.reject(err);
    });
    return myQ.promise;
};

/**
 * 添加自定义指标组关系
 *
 * @method saveMetricBase
 * @param {jsonObject} 保存数据的json对象
 * @return {Object} 指标信息recordSet对象
 */
exports.saveMetricGroupRelation = function (sqlparam) {
    var myQ = Q.defer();
    commander.save("t_moni_metric_group_rel.insert", {groupid:sqlparam.groupid,metricid:sqlparam.metricid}).then(function (recordset) {
        myQ.resolve(recordset);
    }).fail(function (err) {
        myQ.reject(err);
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
exports.saveMetricBaseModify = function (sqlparam) {
    console.log(sqlparam);
    var myQ = Q.defer();
    commander.save("t_moni_metric_group_rel.update", {where_id:sqlparam.where_id,metric_id: sqlparam.metric_id, metric_name: sqlparam.metric_name, metric_desc: sqlparam.metric_desc, metric_type: sqlparam.metric_type, metric_unit: sqlparam.metric_unit, metric_datatype: sqlparam.metric_datatype, metric_iscustom: sqlparam.metric_iscustom, metric_userid: sqlparam.userid}).then(function (recordset) {
        myQ.resolve(recordset);
    }).fail(function (err) {
        myQ.reject(err);
    });
    return myQ.promise;
};

/**
 * 删除指标
 *
 * @method deleteMetricBaseById
 * @param {string}  删除的指标ID
 * @return {Object} 指标信息recordSet对象
 */
exports.deleteMetricBaseById = function (metricId) {
    var myQ = Q.defer();
    var delJson ={
        ids:metricId
    };
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
    commander.get("t_moni_metric_base.select_by_condation", [condition.metric_name, condition.metric_type, condition.metric_id]).then(function (recordset) {
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
    var myQ = Q.defer();
    commander.get('t_moni_metric_base.selectMetricName', []).then(function (recordset) {
        var jsonStr = JSON.stringify(recordset);
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
 * 取指标分组列表
 *
 * @method getMetricTypeList
 * @return {Object} 指标信息recordSet对象
 */

exports.getMetricGroupList = function () {
    var myQ = Q.defer();
    commander.get('t_moni_metric_base.selectMetricType', []).then(function (recordset) {
        var jsonStr = JSON.stringify(recordset);
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
 * 修改指标库指标
 *
 * @method saveMetricBaseModify
 * @param {jsonObject} 保存数据的json对象
 * @return {Object} 指标信息recordSet对象
 */
exports.saveMetricBaseModify = function (sqlparam) {
    var myQ = Q.defer();
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
 * @return {Object} 指标信息recordSet对象
 */
exports.deleteMetricGroupRelByMetricId = function (metricId) {
    var myQ = Q.defer();
    var delJson ={
        metric_ids:metricId
    };
    commander.del("t_moni_metric_group_rel.delete", delJson).then(function (recordset) {
        myQ.resolve(recordset);
    }).fail(function (err) {
        myQ.reject(err);
    });
    return myQ.promise;
};

