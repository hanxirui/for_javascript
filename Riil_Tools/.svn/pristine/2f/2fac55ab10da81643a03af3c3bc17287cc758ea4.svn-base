'use strict';
/**
 * DataSource.js
 * Author: daihongwei
 * Date: 2014/8/22.
 * nobatis 数据源单例对象
 */
var pool = require('generic-pool').Pool;
var nobatis = require('nobatis');
var db = require('../../conf/config.json').db;
var logger = require('../func/logHelper.js').logHelper;
var instance = null;
var sessionPool = null;
var Q = require('q');

//实现数据源单例对象getInstance方法
var getInstance = exports.getInstance = function() {
  if (!instance) {
    instance = new DataSource();
  }
  return instance;
};

sessionPool = makePool();

/**
 * 获取nobatis数据库session，举例：
 * 
 *     require('./class/DataSource').getSession().then(function(session){
 *       session.select...
 *       ...
 *     }, function(err) {
 *       console.log(err);
 *     });
 * 
 * @method getSession
 * @return {Promise} nobatis数据库session
 */
exports.getSession = function() {
  var promise = Q.defer();
 // console.log('acquire',
      sessionPool.acquire(function(err, session) {
    if (err) promise.reject(err);
    else promise.resolve(session);
  });
  //);
  return promise.promise;
};

/**
 * 释放nobatis数据库session，举例：
 * 
 *     require('./class/DataSource').release(session);
 * 
 * @method release
 * @param session {Promise} nobatis数据库session
 */
exports.release = function (session) {
  sessionPool.release(session);
};

/**
 * 添加数据库连接池
 * 描述:session.conn.once 确保连接，关闭，异常只被执行一次;
 * 每个事件onConnected,onError,onClose 事件中触发一次事件监听的删除，确保池只创建或者关闭一次session对象
 * session对象会根据配置的空闲超时时间，来决定关闭.
 * */
function makePool() {
  return pool({
    name: 'nobatis',
    create: function(callback) {
        //logger.writeDebug('================ create session ================');
      var session = getInstance().ds.openSession();
      session.conn
        .once('connect', onConnected)
        .once('error', onError)
        .once('close', onClose);
        function onConnected() {
          removeListener();
         // logger.writeDebug('================ connected ================');
          callback(null, session);
        }
        function onError(err) {
          removeListener();
         // logger.writeDebug('================ connection error ================', err);
          callback(err, null);
        }
        function onClose(hadError) {
          removeListener();
         // logger.writeDebug('================ connection close ================', hadError);
          callback(hadError, null);
        }
        function removeListener() {
          session.conn.removeListener('connect', onConnected);
          session.conn.removeListener('error', onError);
          session.conn.removeListener('close', onClose);
        }
    },
    destroy: function(session) {
       // logger.writeDebug('================ connection closed ================');
      session.close();
    },
    max: 20,
    // optional. if you set this, make sure to drain() (see step 3)
    min: 1,
    // specifies how long a resource can stay idle in pool before being removed
    idleTimeoutMillis: 30000,
    // if true, logs via console.log - can also be a function
    log: false
  });
}

//创建数据源对象
function DataSource() {
  var config;
  config = {
    'dataSource': {}
  };
  config.dataSource = db;
  //根据配置文件json对象，配置数据源对象
  this.ds = nobatis.createDataSource(config);
  var driver = 'mariasql';
  this.ds.config.host = db.db_host;
  this.ds.config.password = db.db_pass;
  this.ds.config.user = db.db_user;
  this.ds.config.db = db.db_name;
  this.ds.config.driver = driver;
}