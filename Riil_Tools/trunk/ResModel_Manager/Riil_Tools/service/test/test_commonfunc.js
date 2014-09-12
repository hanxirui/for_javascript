'use strict';
/**
 * Created by R04419 on 2014/8/20.
 * Date: 2014-08-20
 * 此文件提供一些公用函数的测试
 */

var comm_tester = require('../func/commonfunc.js');

////UUID
//console.info('common function test: getUUID() ');
//for (var i=0; i< 10 ;i++)
//{
//    console.info(comm_tester.getUUID());
//}
////日期，时间 字符串
//console.info('common function test: getFormatDate()');
//var strDate = comm_tester.getFormatDate();
//console.log(strDate);
//console.info('common function test: getFormatDateTime()');
//var strDateTime = comm_tester.getFormatDateTime();
//console.log(strDateTime);
//
////文件路径，文件名，扩展名
//console.info('common function test: getFilePathByFullName()');
//var filePath = "D:\\node.js\\resmodel\\sourcecode\\Riil_Tools\\service\\test\\test_commonfunc.js";
//var path = comm_tester.getFilePathByFullName(filePath);
//console.log(path);
//console.info('common function test: getFileNameByFullName()');
//var filePath = "D:\\node.js\\resmodel\\sourcecode\\Riil_Tools\\service\\test\\test_commonfunc.js";
//var filename = comm_tester.getFileNameByFullFileName(filePath);
//console.log(filename);
//console.info('common function test: getFileExtNameByFileName()');
//console.log(comm_tester.getFileExtNameByFileName(filename));
//console.log(comm_tester.getFileExtNameByFileName("a.t.txt"));
//
////root 目录路径
//console.log ('root path'+ comm_tester.ROOT_PATH);
////service 目录路径
//console.log ('service path'+ comm_tester.SVR_PATH);
////log 目录路径
//console.log ('log path'+ comm_tester.LOG_PATH);
//
//var logger = require('../func/logHelper.js').logHelper;
//logger.writeInfo("测试写日志功能");
//logger.writeDebug("测试debug级别输出");
//logger.writeErr("error message");
//
////去除空格
//var str=" 我的测试 ";
//console.log(str);
//console.log(comm_tester.Trim(str));

function invokejava(output) {
   console.log('result: '+output.toString());
}

//node 调用java
//var output = comm_tester.invoke('-version',invokejava);
comm_tester.callbat('EventTmpSqlGenerator.bat',invokejava);


