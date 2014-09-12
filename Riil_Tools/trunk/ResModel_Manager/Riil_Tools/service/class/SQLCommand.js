'use strict';
/**
 * Created by daihongwei on 2014/8/25.
 * 数据库操作类，提供 select，insert，updata，selelctAll方法的封装
 */
var _ = require('underscore'),
  q = require('q'),
  nobatis = require('nobatis'),
  util = require('util');
var AduitLogService = require('../AduitLogService');
var DataSource = require('./DataSource.js'),
  RecordSet = require('./RecordSet.js');
var logger = require('../func/logHelper.js').logHelper,
  sqlObj = require('../../conf/config.json').sql;
var errMsg;

module.exports = SqlCommand;
/**
 * SqlCommand
 * SQL 操作类封装
 */
function SqlCommand() {
  /**
   * 数据插入或者更新数据表记录
   * @param sqlKey        config.json 中配置的sql对应的json的key sql语句
   * @param paramJson     插入或者更新对应的参数json串
   * @@param callback     记录集回调结果
   */
  this.save = function(sqlKey, paramJson,aduitJson) {
    var recordSet = new RecordSet();
    var getQ = q.defer();
    logger.writeInfo('SqlCommand.save,sql key=' + sqlKey + 'sql=' + sqlObj[sqlKey] + 'param=' + paramJson);
    try {
      var regExpress = /\s*\.(\w+)/;
      var matchArray = regExpress.exec(sqlKey);
      if (matchArray) {
        var sqlAction = matchArray[1];
        var strInsert = "insert";
        var strUpdate = "update";
        if ((sqlAction.toLowerCase() !== strInsert.toLowerCase()) && (sqlAction.toLowerCase() !== strUpdate.toLowerCase())) {
          errMsg = 'sqlKey =' + sqlKey + ' is not insert or update';
          logger.writeErr('SqlCommand.save,' + errMsg);
          recordSet.isError = true;
          recordSet.errMessage = errMsg;
          getQ.resolve(recordSet);
        } else if (sqlAction.toLowerCase() === strInsert.toLowerCase()) {
          DataSource.getSession().then(function(session) {
            return session.insert(sqlObj[sqlKey], paramJson)
              .fin(function() {
                DataSource.release(session);
              });
          })
            .then(function(insertId) {
              console.log('insert:', arguments);
              console.log("insert id" + insertId);

              recordSet.isError = false;
              recordSet.errMessage = "SqlCommand.save succeed";
              getQ.resolve(recordSet);
              if(aduitJson){
                AduitLogService.insertLog(aduitJson);
              }
            })
            .fail(function(err) {
              recordSet.isError = true;
              recordSet.errMessage = 'SqlCommand.save error, error message = ' + err.toString();
              getQ.reject(recordSet);
            });

        } else if (sqlAction.toLowerCase() === strUpdate.toLocaleLowerCase()) {
          DataSource.getSession().then(function(session) {
            return session.update(sqlObj[sqlKey], paramJson)
              .fin(function() {
                DataSource.release(session);
              });
          })
            .then(function(affectedRows) {
              console.log('update:', arguments);
              if (affectedRows > 0) {
                recordSet.isError = false;
                recordSet.errMessage = "SqlCommand.save succeed";
              } else {
                recordSet.isError = true;
                recordSet.errMessage = "SqlCommand.save failed";
              }
              getQ.resolve(recordSet);
              if(aduitJson){
                  AduitLogService.insertLog(aduitJson);
              }
            })
            .fail(function(err) {
              recordSet.isError = true;
              recordSet.errMessage = 'SqlCommand.save error, error message = ' + err.toString();
              getQ.reject(recordSet);
            });
        }
      } else {
        errMsg = 'sqlKey =' + sqlKey + ' is a invalid sql key';
        logger.writeErr('SqlCommand.save,' + errMsg);
        recordSet.isError = true;
        recordSet.errMessage = errMsg;
        getQ.reject(recordSet);
      }
    } catch (er) {
      logger.writeErr('sqlCommand.save error,' + er);
      recordSet.isError = true;
      recordSet.errMessage = errMsg;
      getQ.reject(recordSet);
    }
    return getQ.promise;
  };

  /**
   * 数据插入数据表记录
   * @param {string} sqlStr        config.json 中配置的sql对应的json的key sql语句
   * @param {json}   paramJson     插入或者更新对应的参数json串
   */
  this.saveBySqlInsert = function(sqlStr, sqlParam,aduitJson) {
    var recordSet = new RecordSet();
    var getQ = q.defer();
    logger.writeInfo('SqlCommand.save,sql=' + sqlStr + 'param=' + sqlParam);
    try {
      DataSource.getSession().then(function(session) {
        return session.insert(sqlStr, sqlParam)
            .fin(function() {
                DataSource.release(session);
            });
      })
        .then(function(insertId) {
          console.log('insert:', arguments);
          recordSet.isError = (insertId > 0) ? false : true;
          recordSet.errMessage = (insertId > 0) ? "SqlCommand.save succeed" : "SqlCommand.save failed";
          getQ.resolve(recordSet);
          if(aduitJson){
              AduitLogService.insertLog(aduitJson);
          }
        })
        .fail(function(err) {
          recordSet.isError = true;
          recordSet.errMessage = 'SqlCommand.save error, error message = ' + err.toString();
          getQ.reject(recordSet);
        });

    } catch (er) {
      logger.writeErr('sqlCommand.save error,' + er);
      recordSet.isError = true;
      recordSet.errMessage = errMsg;
      getQ.reject(recordSet);
    }
    return getQ.promise;
  };

  /**
   * 更新数据表记录
   * @param {string} sqlStr        config.json 中配置的sql对应的json的key sql语句
   * @param {json}   paramJson     插入或者更新对应的参数json串
   */
  this.saveBySqlUpdate = function(sqlStr, sqlParam,aduitJson) {
    var recordSet = new RecordSet();
    var getQ = q.defer();
    logger.writeInfo('SqlCommand.saveBySqlUpdate,sql=' + sqlStr + 'param=' + sqlParam);
    try {
      DataSource.getSession().then(function(session) {
        return session.update(sqlStr, sqlParam)
            .fin(function() {
                DataSource.release(session);
            });
      })
        .then(function(insertId) {
          console.log('insert:', arguments);
          recordSet.isError = (insertId > 0) ? false : true;
          recordSet.errMessage = (insertId > 0) ? "SqlCommand.saveBySqlUpdate succeed" : "SqlCommand.saveBySqlUpdate failed";
          getQ.resolve(recordSet);
          if(aduitJson){
              AduitLogService.insertLog(aduitJson);
          }
        })
        .fail(function(err) {
          recordSet.isError = true;
          recordSet.errMessage = 'SqlCommand.saveBySqlUpdate error, error message = ' + err.toString();
          getQ.reject(recordSet);
        });

    } catch (er) {
      logger.writeErr('sqlCommand.saveBySqlUpdate error,' + er);
      recordSet.isError = true;
      recordSet.errMessage = errMsg;
      getQ.reject(recordSet);
    }
    return getQ.promise;
  };


  /**
   * 数据删除
   * @param {string} sqlKey        config.json 中配置的sql对应的json的key sql语句
   * @param {json}   paramJson     插入或者更新对应的参数json串
   */
  this.del = function(sqlKey, paramJson,aduitJson) {
    var recordSet = new RecordSet();
    var getQ = q.defer();
    logger.writeInfo('SqlCommand.del,sql key=' + sqlKey + 'sql=' + sqlObj[sqlKey] + 'param=' + paramJson);
    //校验配置文件的json参数是否合法.
    var regExpress = /\s*\.(\w+)/;
    var matchArray = regExpress.exec(sqlKey);
    if (matchArray) {
      var sqlAction = matchArray[1];
      var strDelete = "delete";
      if (sqlAction.toLowerCase() !== strDelete.toLowerCase()) {
        errMsg = 'sqlKey =' + sqlKey + ' is not delete sql key';
        logger.writeErr('SqlCommand.del,' + errMsg);
        recordSet.isError = true;
        recordSet.errMessage = errMsg;
        getQ.resolve(recordSet);
      } else {
        DataSource.getSession().then(function(session) {
          return session.destroy(sqlObj[sqlKey], paramJson)
              .fin(function() {
                DataSource.release(session);
              });
        }).then(function(affectedRows) {
          console.log('delete:', arguments);
          if (affectedRows > 0) {
            recordSet.isError = false;
            recordSet.errMessage = "SqlCommand.del succeed";
          } else {
            recordSet.isError = true;
            recordSet.errMessage = "SqlCommand.del failed.";
          }
          getQ.resolve(recordSet);
            if(aduitJson){
                AduitLogService.insertLog(aduitJson);
            }
        }).fail(function(err) {
          recordSet.isError = true;
          recordSet.errMessage = "SqlCommand.del error,error message = " + err.toString();
          logger.writeErr(recordSet.errMessage);
          getQ.reject(recordSet);
        });
      }
    } else {
      errMsg = 'sqlKey =' + sqlKey + ' is invalid sql key';
      logger.writeErr('SqlCommand.del,' + errMsg);
      recordSet.isError = true;
      recordSet.errMessage = errMsg;
      getQ.reject(recordSet);
    }
    return getQ.promise;
  };

  /**
   * 数据删除
   * @param {string} sqlStr    sql语句
   * @param {json}   sqlParam  sql参数
   */
  this.delBySql = function(sqlStr, sqlParam,aduitJson) {
    var recordSet = new RecordSet();
    var getQ = q.defer();
    logger.writeInfo('SqlCommand.del,sql= ' + sqlStr + 'param=' + sqlParam);
    DataSource.getSession().then(function(session) {
      return session.destroy(sqlStr, sqlParam)
        .fin(function() {
          DataSource.release(session);
         });
    }).then(function(affectedRows) {
      console.log('delete:', arguments);
      if (affectedRows > 0) {
        recordSet.isError = false;
        recordSet.errMessage = "SqlCommand.del succeed";
      } else {
        recordSet.isError = true;
        recordSet.errMessage = "SqlCommand.del failed.";
      }
      getQ.resolve(recordSet);
        if(aduitJson){
            AduitLogService.insertLog(aduitJson);
        }
    }).fail(function(err) {
      recordSet.isError = true;
      recordSet.errMessage = "SqlCommand.del error,error message = " + err.toString();
      logger.writeErr(recordSet.errMessage);
      getQ.reject(recordSet);
    });

    return getQ.promise;
  };

  /**
   * 数据库表查询
   * @param {string} sqlKey        config.json 中配置的sql对应的json的key sql语句
   * @param {josn}   paramJson     插入或者更新对应的参数json串
   */
  this.get = function(sqlKey, paramJson) {
    var getQ = q.defer();
    var recordSet = new RecordSet();
    logger.writeInfo('SqlCommand.get,sql key=' + sqlKey + ' sql=' + sqlObj[sqlKey] + ' param=' + paramJson);
    //校验配置文件的json参数是否合法.
    var regExpress = /\s*\.(\w+)/;
    var matchArray = regExpress.exec(sqlKey);
    //sql key结构合法
    if (matchArray) {
      var sqlAction = matchArray[1];
      //sql语句校验
      var regSelectExpress = /^select(\.*)?/;
      var matchSelectArray = regSelectExpress.exec(sqlAction);
      if (!matchSelectArray) {
        errMsg = 'sqlKey =' + sqlKey + ' is not select sql key';
        logger.writeErr('SqlCommand.get,' + errMsg);
        recordSet.isError = true;
        recordSet.errMessage = errMsg;
        getQ.resolve(recordSet);
      } else {
        //执行nobatis 查询
        DataSource.getSession().then(function(session) {
          return session.select(sqlObj[sqlKey], paramJson)
              .fin(function() {
                DataSource.release(session);
              });
        }).then(function(rows) {
          logger.writeDebug('selectResult:' + arguments.toString());
          recordSet.isError = false;
          recordSet.errMessage = "SqlCommand.get succeed";
          var index = 0;
          for (var record in rows[0]) {
            recordSet.fields[index] = record;
            index++;
          }
          recordSet.fieldCount = recordSet.fields.length;
          recordSet.rows = rows;
          recordSet.recourdCount = rows.length;
          getQ.resolve(recordSet);

        })
          .fail(function(err) {
            recordSet.isError = true;
            recordSet.errMessage = "SqlCommand.del error,error message = " + err.toString();
            getQ.reject(recordSet);
          });
      }

    } else {
      errMsg = 'sqlKey =' + sqlKey + ' is invalid sql key';
      logger.writeErr('SqlCommand.get,' + errMsg);
      recordSet.isError = true;
      recordSet.errMessage = errMsg;
      getQ.reject(recordSet);
    }
    return getQ.promise;
  };

  /**
   * 数据库表查询
   * @param {string} sqlQuery      sql语句
   * @param {string} sqlParam      参数数组
   */
  this.getBySql = function(sqlQuery, sqlParam) {
    var getQ = q.defer();
    var recordSet = new RecordSet();
    logger.writeInfo('SqlCommand.get, sql=' + sqlQuery + ' param=' + sqlParam);
    //执行nobatis 查询
    DataSource.getSession().then(function(session) {
      return session.select(sqlQuery, sqlParam)
        .fin(function(){
          DataSource.release(session);
        });
    }).then(function(rows) {
      logger.writeDebug('selectResult:' + arguments.toString());
      recordSet.isError = false;
      recordSet.errMessage = "SqlCommand.get succeed";
      var index = 0;
      for (var record in rows[0]) {
        recordSet.fields[index] = record;
        index++;
      }
      recordSet.fieldCount = recordSet.fields.length;
      recordSet.rows = rows;
      recordSet.recourdCount = rows.length;
      logger.writeDebug('recordSet ' + recordSet);
      getQ.resolve(recordSet);

    }).fail(function(err) {
      getQ.reject(err);
    });
    return getQ.promise;
  };
}