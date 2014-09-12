/**
 * Created by mufei on 2014/9/3.
 */
'use strict';

var tree = require('../ResTypeTree.js');

/*tree.getResTypeTree().then(function (recordset) {
 var jsonStr = JSON.stringify(recordset);
 var obj = JSON.parse(jsonStr);
 console.log(obj.rows);
 }).fail(function (recordset) {
 });*/

/*tree.getResTypeById('RIIL_RMT_DB_DB2').then(function (recordset) {
 var jsonStr = JSON.stringify(recordset);
 var obj = JSON.parse(jsonStr);
 console.log(jsonStr);
 console.log(obj.rows.length);
 }).fail(function (recordset) {
 });*/


/*var resModel = {
    c_id: "RIIL_RMM_TEST",
    c_res_type_id: "1",
    c_name: "2",
    c_desc: "2",
    c_is_snmp: "-1",
    c_plugin_id: "4",
    c_main_model_id: '5',
    c_is_main: "1",
    c_tree_node_id: '00.131',
    c_vendor_id: '6',
    c_vendor_name: '7',
    c_precondition: '8',
    c_connect_info_desc: '9',
    c_tag1: '10',
    c_tag2: '11',
    c_tag3: '12',
    c_tag4: '13'
};
tree.saveResModel(resModel).then(function (recordset) {
    var jsonStr = JSON.stringify(recordset);
    console.log('添加 自动定义指标 ' + jsonStr);
}).fail(function (err) {
    var jstr = JSON.stringify(err);
    var jobj = JSON.parse(jstr);
    console.error(jobj.errMessage);
});*/

/*tree.updataResModel(resModel).then(function (recordset) {
    var jsonStr = JSON.stringify(recordset);
    console.log('添加 自动定义指标 ' + jsonStr);
}).fail(function (err) {
    var jstr = JSON.stringify(err);
    var jobj = JSON.parse(jstr);
    console.error(jobj.errMessage);
});*/


/*var ids = ["RIIL_RMM_TEST"];
tree.deleteResModel(ids).then(function (recordset) {
    var jsonStr = JSON.stringify(recordset);
    console.log(jsonStr);
}).fail(function (err) {
    var jstr = JSON.stringify(err);
    var jobj = JSON.parse(jstr);
    console.error(jobj.errMessage);
});*/

/*var resType = {
    c_id: "RIIL_RMT_TEST",
    c_parent_id: "RIIL_RMT_BASE1",
    c_name: "Test1",
    c_is_main: "11",
    c_tree_level: "11",
    c_tree_node_id: '00.1311',
    c_res_catalog: "91",
    c_icon: "Application.png1",
    c_vendor_id: '61',
    c_sort_id: 40000001,
    c_tag1: '101',
    c_tag2: '111',
    c_tag3: '121',
    c_tag4: '131'
};*/

/*tree.saveResType(resType).then(function (recordset) {
    var jsonStr = JSON.stringify(recordset);
    console.log(jsonStr);
}).fail(function (err) {
    var jstr = JSON.stringify(err);
    var jobj = JSON.parse(jstr);
    console.error(jobj.errMessage);
});*/

/*tree.updataResType(resType).then(function (recordset) {
    var jsonStr = JSON.stringify(recordset);
    console.log(jsonStr);
}).fail(function (err) {
    var jstr = JSON.stringify(err);
    var jobj = JSON.parse(jstr);
    console.error(jobj.errMessage);
});*/

var ids = ["RIIL_RMT_TEST"];
 tree.deleteResType(ids).then(function (recordset) {
 var jsonStr = JSON.stringify(recordset);
 console.log(jsonStr);
 }).fail(function (err) {
 var jstr = JSON.stringify(err);
 var jobj = JSON.parse(jstr);
 console.error(jobj.errMessage);
 });






