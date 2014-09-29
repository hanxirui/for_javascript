'use strict';
/**
 * Created by R04419 on 2014/9/10.
 * 资源模型导出调用器
 */
var export_conf = require('../conf/config.json').export;
var db_conf = require('../conf/config.json').db;
var helper = require('./func/commonfunc.js');
var Q = require('q');

/**
*调用bat脚本执行模型文件导出
*
* @method ExecResourceModel
* @param session {Promise} nobatis数据库session
*/
exports.ExecResourceModelExport = function() {
    var myQ = Q.defer();
    //数据库连接信息
    var db_host = db_conf.db_host,
        db_password = db_conf.db_pass,
        db_user = db_conf.db_user,
        db_name = db_conf.db_name;
    //到处路劲信息
    var export_path = export_conf.modelPath,
        invoker_path = export_conf.batPath,
        bat_name = export_conf.batFileName;
       var dbURL="jdbc:mysql://";
           dbURL+=db_host+':3306';
           dbURL+="/"+db_name;
console.log(dbURL);
           //"172.17.160.191:3306/riil_test"
   //调用bat脚本执行导出
   var paramArray = new Array(export_path,db_user,db_password,dbURL);
       helper.callbat(bat_name,invoker_path,paramArray,function (dataresult){
       var jsonStr = JSON.stringify(dataresult);
       var obj = JSON.parse(jsonStr);
       if (obj.isError) {
           console.log(obj.errMessage);
           myQ.reject(obj);
       }
       else
       {
           console.log(obj.output);
           myQ.resolve(obj);
       }
   });
    return myQ.promise;
};

