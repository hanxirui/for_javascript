'use strict';
/**
 * common function js
 * Author: daihongwei
 * Date: 2014/8/20.
 * 此文件提供一些公用函数
 */

//全局引用模块
var fs = require('fs');
var uuid = require('node-uuid');

/**
 * getUUID
 * 获取当前的UUID
 * @returns {string}
 **/
exports.getUUID = function () {
    var strUUID = uuid.v4();
    return strUUID;
};

/**
 * getFormatDate
 * 获取当前日期的日期格式字符串 YYYY-MM-dd
 * @return {string} 日期格式字符串
 * */
exports.getFormatDate = function () {
    var date = new Date(),
    seperator = "-";
    //获取当前日期
    var strDate = date.getDate(),
    month = date.getMonth() + 1;
    //格式化日期字符 两位月和两位日
    var dateArray = new Array(month, strDate);
    for (var item in dateArray) {
        if (dateArray[item] >= 1 && dateArray[item] <= 9) {
            dateArray[item] = '0' + dateArray[item];
        }
    }
    //拼接日期格式字符串
    var strDateTime = date.getFullYear() + seperator + dateArray[0] + seperator + dateArray[1];
    return strDateTime;
};

/**
 * getFormatDateTime
 * 获取当期日期的日期时间格式字符串 YYYY-MM-dd HH:mm:ss
 * @return {string} 日期时间字符串
 * */
exports.getFormatDateTime = function () {
    var date = new Date(),
    seperator_day = "-",
    seperator_time = ":";
    var strDate = date.getDate(),
    month = date.getMonth() + 1,
    hour = date.getHours(),
    minute = date.getMinutes(),
    second = date.getSeconds();
    //格式化日期时间字符串，将单月加‘0’,单天加'0',时分秒单数的加'0'
    var dateArray = new Array(month, strDate, hour, minute, second);
    for (var item in dateArray) {
        if (item >= 2) {
            //格式化 时、分、秒、数据
            if (dateArray[item] >= 0 && dateArray[item] <= 9) {
                dateArray[item] = '0' + dateArray[item];
            }
        } else {
            //格式化 月、日数据
            if (dateArray[item] >= 1 && dateArray[item] <= 9) {
                dateArray[item] = '0' + dateArray[item];
            }
        }
    }

    var strDateTime = date.getFullYear() + seperator_day + dateArray[0] + seperator_day + dateArray[1] + " " + dateArray[2] + seperator_time + dateArray[3] + seperator_time + dateArray[4];
    return strDateTime;
};

/**
 * getFilePathByFullName
 * 获取文件全路径的路径
 * @return {string} 文件路径
 * */
exports.getFilePathByFullName = function (fileFullName) {
    //判断文件是否存在
    var strFilePath = "";
    var  isExists = fs.existsSync(fileFullName) ;
        if (!isExists) {
            return strFilePath;
        } else {
            //启用正则表达式解析文件路径
            var regExpress = /(^\w:\\.+\\)([^\t\n\r?*/\\]+(\.[^\t\n\r?*/\\]+)?$)/;
            var matchArray = regExpress.exec(fileFullName);
            if (matchArray) {
                strFilePath = matchArray[1];
                return (strFilePath);
            }
        }
};

/**
 * getFileNameByFullFileName
 * 获取文件全路径的文件名
 * @return {string} 文件名
 * */
exports.getFileNameByFullFileName = function (fileFullName) {
    //判断文件是否存在
       var strFileName = "";
       var isExists  = fs.existsSync(fileFullName);
        if (!isExists) {
            return strFileName;
        } else {
            //启用正则表达式解析文件路径
            var regExpress = /(^\w:\\.+\\)([^\t\n\r?*/\\]+(\.[^\t\n\r?*/\\]+)?$)/;
            var matchArray = regExpress.exec(fileFullName);
            if (matchArray) {
                 strFileName = matchArray[2];
                return strFileName;
            }
        }
};

/**
 * getFileExtNameByFileName
 * 获取文件的扩展文件名
 * @return {string}扩展文件名
 * */
exports.getFileExtNameByFileName = function (fileName)
{
    var regExpress = /(.*)\.(.+)/;
    var matchArray = regExpress.exec(fileName);
    if (matchArray) {
         return matchArray[2];
    }
};

/**
 * getWebRootPath
 * 获取网站的service根目录
 * @return {string} 网站service根目录
 * */

var currentDir = __dirname.replace(/\\/g, '/');
var lastIndex = currentDir.lastIndexOf('/');
/**
 * 网站service目录
 * @type {string}
 */
exports.SVR_PATH = currentDir.slice(0, lastIndex);

/**
 * 网站根目录
 * @type {string}
 */
var rootLastIndex = this.SVR_PATH.lastIndexOf('/');
exports.ROOT_PATH = this.SVR_PATH.slice(0,rootLastIndex);

/**
 * 网站log目录
 * @type {string}
 */
exports.LOG_PATH = this.ROOT_PATH  + '/log/';

/**
 * Trim()
 * 去除字符的首位空格
 * @return {string}
 * */
exports.Trim = function (strContents) {
   return strContents.replace(/(^\s*)|(\s*$)/g, '').replace(/\s+/g,' ');
};

/**
 * invoke()
 * node 调用java 命令并获取返回值
 * */
exports.invoke = function(param,callback) {

    var output = "";
    var spawn = require('child_process').spawn,
        child = spawn('java', [param]);

    // 捕获标准输出并将其打印到控制台
    child.stdout.on('data', function (data) {
      //console.log('标准输出：\n' + data);
        return callback(data);
    });

    // 捕获标准错误输出并将其打印到控制台
    child.stderr.on('data', function (data) {
       // console.log('标准错误输出：\n' + data);
        return callback(data);
    });

    // 注册子进程关闭事件
    child.on('exit', function (code, signal) {
        console.log('子进程已退出，代码：' + code);
    });
};

