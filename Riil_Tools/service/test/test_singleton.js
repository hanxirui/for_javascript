/**
 * Created by R04419 on 2014/8/21.
 * 测试单例对象的使用
 */

var Singleton = require('../class/Singleton.js');
var s1 =  Singleton.getInstance();
console.log(s1.createTime.toString());
var s2 = Singleton.getInstance();
console.log(s2.createTime.toString());
var s3 = Singleton.getInstance();
console.log(s3.createTime.toString());


