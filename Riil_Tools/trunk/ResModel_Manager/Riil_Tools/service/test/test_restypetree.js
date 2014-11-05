/**
 * Created by mufei on 2014/9/3.
 */
'use strict';

var tree = require('../ResTypeTree.js');

/*tree.getResTypeTree('http://127.0.0.1').then(function (rs) {
 console.log(rs);
 });*/

/*tree.getResTypeById('RIIL_RMT_APPLICATION').then(function (rs) {
 console.log(rs);
 }).fail(function (err) {
/* console.error(err);
 });*/

/* var resType = {
 c_id: "RIIL_RMT_TEST",
 c_parent_id: "RIIL_RMT_BASE",
 c_name: "Test1",
 c_is_main: "11",
 c_tree_level: "11",
 c_tree_node_id: '00.1311',
 c_res_catalog: "91",
 c_icon: "Application.png1",
 c_vendor_id: '61',
 c_sort_id: 40000001,
 c_tag1: null,
 c_tag2: null,
 c_tag3: null,
 c_tag4: null
 };
 tree.saveResType(resType).then(function (rs) {
 console.log(rs);
 }).fail(function (err) {
 console.error(err);
 });*/

/*var resType = {
 c_id: "RIIL_RMT_TEST2",
 c_parent_id: "RIIL_RMT_BASE2",
 c_name: "Test2",
 c_is_main: "22",
 c_tree_level: "22",
 c_tree_node_id: '22.1311',
 c_res_catalog: "22",
 c_icon: "2Application.png1",
 c_vendor_id: '22',
 c_sort_id: 20000001,
 c_tag1: '201',
 c_tag2: '211',
 c_tag3: '221',
 c_tag4: '231'
 };
 var oldId = 'RIIL_RMT_TEST';
 tree.updataResType(resType, oldId).then(function (rs) {
 console.log(rs);
 }).fail(function (err) {
 console.error(err);
 });*/

/*var ids = ['RIIL_RMT_TEST','RIIL_RMT_TEST1'];
 tree.deleteResType(ids).then(function (rs) {
 console.log(rs);
 }).fail(function (err) {
 console.error(err);
 });*/

/*tree.getAllPlugin().then(function (rs) {
    console.log(rs);
}).fail(function (err) {
    console.error(err);
});*/

/*var modelId = 'RIIL_RMM_DB_DB2';
tree.getResModelById(modelId).then(function (rs) {
    console.log(rs);
}).fail(function (err) {
    console.error(err);
});*/

/*var resModel = {
    c_id: "RIIL_RMM_TEST",
    c_res_type_id: "RIIL_RMT_APPLICATION",
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
tree.saveResModel(resModel).then(function (rs) {
    console.log(rs);
}).fail(function (err) {
    console.error(err);
});*/

/*var resModel = {
    c_id: "RIIL_RMM_TEST1",
    c_res_type_id: "RIIL_RMT_APPLICATION1",
    c_name: "21",
    c_desc: "21",
    c_is_snmp: "1",
    c_plugin_id: "1",
    c_main_model_id: '1',
    c_is_main: "1",
    c_tree_node_id: '1',
    c_vendor_id: '1',
    c_vendor_name: '1',
    c_precondition: '1',
    c_connect_info_desc: '1',
    c_tag1: '1',
    c_tag2: '1',
    c_tag3: '1',
    c_tag4: '1'
};
tree.updataResModel(resModel, 'RIIL_RMM_TEST').then(function (rs) {
    console.log(rs);
}).fail(function (err) {
    console.error(err);
});*/

/*var ids = ['RIIL_RMM_TEST', 'RIIL_RMM_TEST1'];
tree.deleteResModel(ids).then(function (rs) {
    console.log(rs);
}).fail(function (err) {
    console.error(err);
});*/

tree.getResModelTree('http://127.0.0.1').then(function (rs) {
    //console.log(rs.length);
}).fail(function (err) {
    console.error(err);
});

/*tree.getMainResModelTree('http://127.0.0.1').then(function (rs) {
    console.log(rs.length);
}).fail(function (err) {
    console.error(err);
});*/

/*var modelIds = ['RIIL_RMM_DB_DB2','RIIL_RMM_CHILD_DATABASE_DB_DB2'];
//var modelIds = ['RIIL_RMM_DB_DB2'];
tree.copyResModels(modelIds).then(function (rs) {
    console.log(rs);
}).fail(function (err) {
    console.error(err);
});*/

/*
tree.test().then(function (rs) {
    console.log(rs);
}).fail(function (err) {
    console.error(err);
});
*/
//tree.test();