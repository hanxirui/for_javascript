/* jshint node:true */
'use strict';

var express = require('express');
var router = express.Router();
var metric_base = require('../../service/MetricBaseLib');
var metricType = require('../../service/func/Enum4MetricType');
var metricDataType = require('../../service/func/Enum4DataType');
var metricGroup = require('../../service/MetricGroupInfor');
var MetricBaseParam = require('../../service/func/MetricBaseParameter');
var comm_func = require('../../service/func/commonfunc.js');
var Q = require('q');

/* GET users listing. */
router.get('/queryLibraryData', function(req, res) {
  //获取指标库列表数据
  metric_base.getMetricBaseList().then(function(recordSet) {
    res.json({
      data: recordSet.rows
    });
  }).fail(function(err) {
    var jstr = JSON.stringify(err);
    var jobj = JSON.parse(jstr);
    console.error(jobj.errMessage);
  });
});

/* GET users listing. */
router.get('/listparam', function(req, res) {
  res.render('library');
});

//删除指标
router.post('/deleteLibraryData', function(req, res) {
  var metricIds = req.body.id;
  metric_base.deleteMetricBaseById(metricIds).then(function(recordSet) {
    if (!recordSet.isError) {
      res.json({
        msg: 'success'
      });
    }
  }).fail(function(err) {
    var jstr = JSON.stringify(err);
    var jobj = JSON.parse(jstr);
    console.error(jobj.errMessage);
  });
});

//添加指标
router.post('/addLibraryData', function(req, res) {
  metricGroup.getMetricGroupNameMap().then(function(recordSet) {
    var libraryInfo = {
      'metricType': metricType.metric,
      'metricDataType': metricDataType.data,
      'metricGroup': recordSet.rows
    };
    res.render('library_add', libraryInfo);
  }).fail(function(err) {
    console.error(err);
  });
});

//修改指标
router.get('/updateLibraryData', function(req, res) {
  var metricIds = req.query.id;
  Q.spread([
    metricGroup.getMetricGroupNameMap(),
    metric_base.getMetricBaseById(metricIds)
  ], function(get1, get2) {
    return {
      recordSet: get1.rows,
      metricInfo: get2.rows
    };
  }).then(function(obj) {
    var libraryInfo = {
      'metricType': metricType.metric,
      'metricDataType': metricDataType.data,
      'metricGroup': obj.recordSet,
      'metricInFoDataType': obj.metricInfo[0].dataType,
      'metricInFoGroupId': obj.metricInfo[0].groupId,
      'metricInFoDesc': obj.metricInfo[0].metricDesc,
      'metricInfoType': obj.metricInfo[0].metricType,
      'metricInFoUnit': obj.metricInfo[0].metricUnit,
      'metricInFoId': obj.metricInfo[0].metricId,
      'metricInFoName': obj.metricInfo[0].metricName
    };
    res.render('library_update', libraryInfo);
  }).fail(function(err) {
    console.log('reject: ' + err);
  }).catch(function(err) {
    console.log('catch: ' + err);
  });
});



//添加指标
router.post('/addMretric', function(req, res) {
  var metricBaseParam = new MetricBaseParam();
  metricBaseParam.param.metric_id = comm_func.getUUID();
  metricBaseParam.param.metric_name = req.body.metricName;
  metricBaseParam.param.metric_desc = req.body.metricDesc
  metricBaseParam.param.metric_datatype = req.body.metricDataType;
  metricBaseParam.param.metric_type = req.body.metricType;
  metricBaseParam.param.metric_unit = req.body.metricUnit;
  metricBaseParam.param.metric_iscustom = 1;
  metricBaseParam.param.userid = req.session.userInfo.userId;
  metricBaseParam.param.groupid = req.body.metricGroupName;

  Q.spread([
    metric_base.saveMetricBase(metricBaseParam.param),
    metric_base.saveMetricGroupRelation(metricBaseParam.param)
  ], function(get1, get2) {
    // debugger;
    // console.info('!!!!!!', JSON.stringify(get1, ' ', 2));
    return {
      get1: get1,
      get2: get2
    };
  }).then(function(obj) {
    JSON.stringify(obj, ' ', 2);
    res.json({
      msg: '1'
    });
    console.log('2222', obj.get1.rows);
  }).fail(function(err) {
    console.log('reject: ' + err);
  }).catch(function(err) {
    console.log('catch: ' + err);
  });
});

//修改指标
router.post('/updateMretric', function(req, res) {
  var metricBaseParam = new MetricBaseParam();
  metricBaseParam.param.metric_id = req.body.metricId;
  metricBaseParam.param.metric_name = req.body.metricName;
  metricBaseParam.param.metric_desc = req.body.metricDesc
  metricBaseParam.param.metric_datatype = req.body.metricDataType;
  metricBaseParam.param.metric_type = req.body.metricType;
  metricBaseParam.param.metric_unit = req.body.metricUnit;
  metricBaseParam.param.metric_iscustom = 1;
  metricBaseParam.param.userid = req.session.userInfo.userId;
  metricBaseParam.param.groupid = req.body.metricGroupName;

  Q.spread([
    metric_base.saveMetricBaseModify(metricBaseParam.param),
    metric_base.deleteMetricGroupRelByMetricId(metricBaseParam.param.metric_id),
    metric_base.saveMetricGroupRelation(metricBaseParam.param)
  ], function(get1, get2) {
    // debugger;
    // console.info('!!!!!!', JSON.stringify(get1, ' ', 2));
    return {
      get1: get1,
      get2: get2
    };
  }).then(function(obj) {
    JSON.stringify(obj, ' ', 2);
    res.json({
      msg: '1'
    });
    console.log('2222', obj.get1.rows);
  }).fail(function(err) {
    console.log('reject: ' + err);
  }).catch(function(err) {
    console.log('catch: ' + err);
  });
});

router.get('/getMetricTypeList', function(req, res) {
  metric_base.getMetricTypeList().then(function(recordSet) {
    res.json({
      data: recordSet.rows
    });
  }).fail(function(err) {
    var jstr = JSON.stringify(err);
    var jobj = JSON.parse(jstr);
    console.error(jobj.errMessage);
  });
});

router.get('/getMetricGroupList', function(req, res) {
  metric_base.getMetricGroupList().then(function(recordSet) {
    res.json({
      data: recordSet.rows
    });
  }).fail(function(err) {
    var jstr = JSON.stringify(err);
    var jobj = JSON.parse(jstr);
    console.error(jobj.errMessage);
  });
});

router.get('/getMetricBaseByCondition', function(req, res) {
  var condition = {
    type : req.query.type,
    groupId : req.query.groupId,
    metricName : req.query.metricName
  };
  metric_base.getMetricBaseByCondition(condition).then(function(recordSet) {
    res.json({
      data: recordSet.rows
    });
  }).fail(function(err) {
    var jstr = JSON.stringify(err);
    var jobj = JSON.parse(jstr);
    console.error(jobj.errMessage);
  });
});

module.exports = router;