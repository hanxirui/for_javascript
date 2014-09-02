'use strict';
/**
 * DataSource.js
 * Author: daihongwei
 * Date: 2014/8/22.
 * nobatis 数据源单例对象
 */

var nobatis = require('nobatis');
var db = require('../../conf/config.json').db;
var instance = undefined;
//实现数据源单例对象getInstance方法
module.exports.getInstance = function( ) {
     if (instance === undefined)
     {
         instance = new DataSource();
     }
    return instance;
};

//创建数据源对象
function DataSource() {
   var config;
    config = {
        "dataSource": {}
    };
    config.dataSource = db;
    //根据配置文件json对象，配置数据源对象
    this.ds = nobatis.createDataSource(config);
    var driver = "mariasql";
    this.ds.config.host =db.db_host;
    this.ds.config.password =db.db_pass;
    this.ds.config.user =db.db_user ;
    this.ds.config.db = db.db_name;
    this.ds.config.driver = driver;
}
