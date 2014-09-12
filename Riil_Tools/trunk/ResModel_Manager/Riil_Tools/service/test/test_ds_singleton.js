/**
 * Created by R04419 on 2014/8/25.
 * 测试nobatis数据源单例对象调用
 */


var DataSource = require('../class/DataSource.js');
var ds = DataSource.getInstance().ds;
