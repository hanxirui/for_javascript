var express = require('express');
var router = express.Router();
var tree = require('../service/ResTypeTree');
var resModelRel = require('../service/ResourceModelRelation');
var modelMetricInfo = require('../service/ModelMetricInfor');
var modelPolicyEvent = require('../service/ModelPolicyEvent');

router.get('/getAllPlugins', function(req, res) {
  tree.getAllPlugin().then(function(r) {
    res.json({
      data: r.rows
    });
  });
});

router.post('/getMainModelTree', function(req, res) {
  var path = req.body.webPath;
  tree.getMainResModelTree(path).then(function(r) {
    res.json({
      data: r.rows
    });
  });
});

router.get('/getResourceModelMain', function(req, res) {
  if (req.query.modelId !== '' && typeof req.query.modelId !== 'undefined') {
    var roleId = req.session.userInfo.role;
    tree.getResModelById(req.query.modelId).then(function(r) {
      res.render('res_model_main', {
        'data': r.rows[0],
        'parentId': '',
        'roleId': roleId
      });
    });
  } else {
    var data = {
      'c_id': '',
      'c_name': '',
      'c_desc': '',
      'c_is_snmp': '',
      'c_plugin_id': '',
      'resTypeName': '',
      'mainResModelName': ''
    };
    res.render('res_model_main', {
      'data': data,
      'parentId': req.query.parentId,
      'roleId': roleId
    });
  }
});

/**tree operate*/
router.post('/getResModelTree', function(req, res) {
  var path = req.body.webPath;
  tree.getResModelTree(path).then(function(recordset) {
    res.json({
      data: recordset.rows
    });
    res.end();
  }).fail(function(recordset) {});

});
/**check repeat*/
router.get('/check', function (req, res) {
  tree.getResModelById(req.query.id).then(function (r) {
    if (r.rows.length > 0) {
      res.json({
        msg: '1'
      });
    } else {
      res.json({
        msg: '0'
      });
    }
  });
});
/**更新*/
router.post('/update', function (req, res) {
  tree.updataResModel(req.body).then(function() {
    res.json({
      msg: '1'
    });
    res.end();
  });
});

router.post('/delete', function (req, res) {
  tree.deleteResModel(req.body.ids).then(function() {
    res.json({
      msg: '1'
    });
  });
});

router.post('/add', function (req, res) {
  tree.saveResModel(req.body).then(function () {
    res.json({
      msg: '1'
    });
    res.end();
  });
});

/**取得该模型下所有指标信息*/
router.get('/getAllMetricInfos', function (req, res) {
  resModelRel.getModelMetricList(req.query.modelId).then(function(r) {
    res.json({
      data: r
    });
    res.end();
  });
});

/**删除模型下指标信息*/
router.post('/delMetricInfos', function (req, res) {
  resModelRel.deleteModelMetricRelation(req.body.modelId, req.body.ids).then(function() {
    res.json({
      msg: '1'
    });
  });
});

router.get('/addMetricInfo', function (req, res) {
  var metricInfo = {
    'metricId' : '',
    'metricName' : '',
    'metricDescr' : '',
    'metricType' : '',
    'metricUnit' : '',
    'metricDataType' : '',
    'metricGroupId' : '',
    'coltProtocol' : '',
    'isInstance' : '',
    'isInitValue' : '',
    'isDisplayName' : '',
    'commandName' : '',
    'commandValue' : '',
    'collCommandId' : '',
    'collCommand' : '',
    'resType' : ''
  };
  res.render('resmodel_metric_add', {
    'data': metricInfo
  });
});

router.get('/addMetricExpand', function (req, res) {
  res.render('resmodel_metric_expand_add');
});

router.post('/getResModelMetricInfo', function (req, res) {
  modelMetricInfo.getModelMetricDetailByModelId(req.body.id).then(function(r) {
    res.json({
      data: r
    });
    res.end();
  }).fail(function(err) {
    console.log(err);
  });
});

router.get('/getResModelExpand', function (req, res) {
  res.render('resmodel_metric_expand');
});

router.post('/addModelMetricInfo', function (req, res) {
  var param = req.body.paramValue;
  var paramName = param.split("=")[0];
  var paramValue = param.split("=")[1];
  modelMetricInfo.addModelMetricAndCollectParam(req.body.modelId, req.body.metricId, req.body.resType, req.body.usedProtocol, req.body.isInstance, req.body.isInitvalue, req.body.isDisplayname, req.body.collectCmds, paramName, paramValue).then(function (uuid) {
    res.json({
      msg: '1',
      uuid:uuid
    });
    res.end();
  });
});

router.get('/updateMetricInfo', function (req, res) {
  modelMetricInfo.getModelMetricCommandDetail(req.query.modelId, req.query.metricId, req.query.coltProtocol, req.query.isInstance, req.query.isInitValue, req.query.isDisplayName).then(function(r) {
    res.render('resmodel_metric_add', {
      'data': r.rows[0]
    });
    res.end();
  }).fail(function(err) {
    console.log(err);
  });
});

router.get('/checkMetricInfoExists', function(req, res){
  modelMetricInfo.getModelMetricCommandDetail(req.query.modelId, req.query.metricId, req.query.coltProtocol, req.query.isInstance, req.query.isInitValue, req.query.isDisplayName).then(function(r) {
    if (r.rows.length > 0) {
      res.json({
        msg: '1'
      });
    } else {
      res.json({
        msg: '0'
      });
    }
    res.end();
  }).fail(function(err) {
    console.log(err);
  });
});

/**更新*/
router.post('/updateMetric', function (req, res) {
  var param = req.body.paramValue;
  var paramName = param.split("=")[0];
  var paramValue = param.split("=")[1];
  modelMetricInfo.modifyModelMetricAndCollectParam(req.body.modelId,req.body.metricId,req.body.collCommandId,req.body.usedProtocol,req.body.isInstance,req.body.isInitvalue,req.body.isDisplayname,req.body.collectCmds,paramName,paramValue).then(function() {
    res.json({
      msg: '1'
    });
  });
});

router.post('/copyResModels', function (req, res){
  tree.copyResModels(req.body.ids).then(function(success) {
    console.log(success);
    if(success){
      res.json({
        msg: '1'
      });
    }else{
      res.json({
        msg: '0'
      });
    }
  });
});

router.get('/getThresholdList', function (req, res){
  modelPolicyEvent.getThresholdList(req.query.modelId, function (r){
    res.json({
      data : r
    });
  });
});

router.get('/getModelEventList', function (req, res){
  modelPolicyEvent.getModelEventList(req.query.modelId, function (r){
    res.json({
      data : r
    });
  });
});

router.get('/getModelPolicyBaseInfor', function (req, res){
  modelPolicyEvent.getModelPolicyBaseInfor(req.query.modelId, function (r){
    res.json({
      data : r
    });
  });
});

router.get('/getSNMPSupportCommandList', function (req, res){
  modelMetricInfo.getSNMPSupportCommandList(req.query.modelId, req.query.metricId).then(function (r){
    res.json({
      data : r.rows
    });
  });
});

router.post('/saveAddSNMPSupportCommand', function (req,res){
  modelMetricInfo.saveAddSNMPSupportCommand(req.body.collectCmdUUID,req.body.sysOID,req.body.sysVersion).then(function (){
    res.json({
      msg: '1'
    });
    res.end();
  })
});

router.post('/delSNMPSupportCommand', function (req, res){
  modelMetricInfo.delSNMPSupportCommand(req.body.ids).then(function (){
    res.json({
      msg : '1'
    });
  });
});

router.post('/updatePolicyMetricThreshold',function (req,res){
  var data = {
    policyId : req.body.policyId,
    metricId : req.body.metricId,
    flapping : req.body.metricFlapping,
    timeOut : req.body.collectTimeOut,
    retryTimes : req.body.collectRetry,
    frequency : req.body.collectFrequency,
    inUse : req.body.isInUsed,
    genEvent : req.body.isGenEvent,
    exp1 : req.body.c_exp1,
    exp2 : req.body.c_exp2,
    exp3 : req.body.c_exp3
  };
  modelPolicyEvent.updatePolicyMetricThreshold(data, function (){
    res.json({
      msg : '1'
    });
  });
});

router.post('/updatePolicyEvent', function (req,res){
  var data = {
    eventId : req.body.c_id,
    inUse : req.body.isInUsed,
    level : req.body.eventLevel
  };
  modelPolicyEvent.updatePolicyEvent(data, function (){
    res.json({
      msg : '1'
    });
  });
});

router.post('/updatePolicyInfo', function (req,res){
  modelPolicyEvent.updatePolicyInfo(req.body, function (){
    res.json({
      msg : '1'
    });
  });
});

module.exports = router;