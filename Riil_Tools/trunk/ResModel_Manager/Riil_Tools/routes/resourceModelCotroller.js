var express = require('express');
var router = express.Router();
var tree = require('../service/ResTypeTree');
var resModelRel = require('../service/ResourceModelRelation');
var modelMetricInfo = require('../service/ModelMetricInfor');
var modelPolicyEvent = require('../service/ModelPolicyEvent');

router.get('/getAllPlugins', function(req, res) {
  tree.getAllPlugin().then(function(r) {
    res.json({
      data: r
    });
  });
});

router.post('/getMainModelTree', function(req, res) {
  var path = req.body.webPath;
  tree.getMainResModelTree(path).then(function(r) {
    res.json({
      data: r
    });
  });
});

router.get('/getResourceModelMain', function(req, res) {
  if (req.query.modelId !== '' && typeof req.query.modelId !== 'undefined') {
    var roleId = req.session.userInfo.role;
    tree.getResModelById(req.query.modelId).then(function(r) {
      res.render('res_model_main', {
        'data': r[0],
        'parentId': '',
        'roleId': roleId
      });
    });
  } else {
    var data = {
      'c_id': 'RIIL_RMM_',
      'c_name': '',
      'c_desc': '',
      'c_is_snmp': '',
      'c_plugin_id': '',
      'resTypeName': '',
      'mainResModelName': '',
      'policyId': '',
      'c_main_model_id': ''
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
      data: recordset
    });
    res.end();
  }).fail(function(err) {
    console.log(err);
  });

});
/**check repeat*/
router.get('/check', function(req, res) {
  tree.getResModelById(req.query.id).then(function(r) {
    if (r.length > 0) {
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
/**check modelName repeat*/
router.get('/checkModelName', function(req, res) {
  if (req.query.isUpdate === 'true') {
    tree.isExistModelName(req.query.mainmodelid, req.query.modelName, req.query.id).then(function(r) {
      res.json({
        data: r
      });
    });
  } else {
    tree.isExistModelName(req.query.mainmodelid, req.query.modelName).then(function(r) {
      res.json({
        data: r
      });
    });
  }

});
/**更新*/
router.post('/update', function(req, res) {
  var logInfo = "资源模型树修改:旧ID为:" + req.body.c_oldId + "新ID为:" + req.body.c_id;
  var logContent = {
    userId: req.session.userInfo.userId,
    info: logInfo
  };
  var oldId = req.body.c_oldId;
  delete req.body.c_oldId;
  tree.updataResModel(req.body, oldId, logContent).then(function() {
    res.json({
      msg: '1'
    });
    res.end();
  }).fail(function(err) {
    console.log(err);
  });
});

router.post('/delete', function(req, res) {
  var logInfo = "资源模型树删除节点";
  var logContent = {
    userId: req.session.userInfo.userId,
    info: logInfo
  };
  tree.deleteResModel(req.body.ids, logContent).then(function() {
    res.json({
      msg: '1'
    });
  });
});

router.post('/add', function(req, res) {
  var logInfo = "资源模型树添加节点:ID为:" + req.body.c_id;
  var logContent = {
    userId: req.session.userInfo.userId,
    info: logInfo
  };
  tree.saveResModel(req.body, logContent).then(function() {
    res.json({
      msg: '1'
    });
    res.end();
  });
});

/**取得该模型下所有指标信息*/
router.get('/getAllMetricInfos', function(req, res) {
  resModelRel.getModelMetricList(req.query.modelId).then(function(r) {
    res.json({
      data: r.rows
    });
    res.end();
  });
});

/**删除模型下指标信息*/
router.post('/delMetricInfos', function(req, res) {
  var logInfo = "资源模型删除指标信息:modelID为:" + req.body.modelId;
  var logContent = {
    userId: req.session.userInfo.userId,
    info: logInfo
  };
  resModelRel.deleteModelMetricRelation(req.body.modelId, req.body.ids, logContent).then(function() {
    res.json({
      msg: '1'
    });
    res.end();
  });
});

router.get('/addMetricInfo', function(req, res) {
  var metricInfo = {
    'metricId': '',
    'metricName': '',
    'metricDescr': '',
    'metricType': '',
    'metricUnit': '',
    'metricDataType': '',
    'metricGroupId': '',
    'coltProtocol': '',
    'isInstance': '',
    'isInitValue': '',
    'isDisplayName': '',
    'updateCmds': '',
    'updateCmdsProps': '',
    'collCommandId': '',
    'collCommand': '',
    'resTypeId': '',
    'isCustom': '1',
    'metricBindingId': '',
    'metricCmds': [{
      'defaultProtocol': ''
    }],
    'metricCmdSupports': []
  };
  res.render('resmodel_metric_add', {
    'data': metricInfo
  });
});

router.get('/addMetricExpand', function(req, res) {
  res.render('resmodel_metric_expand_add');
});
/**google suggest*/
router.post('/getResModelMetricInfo', function(req, res) {
  modelMetricInfo.getModelMetricDetailByModelId(req.body.id).then(function(r) {
    res.json({
      data: r.rows
    });
    res.end();
  }).fail(function(err) {
    console.log(err);
  });
});

router.get('/getResModelExpand', function(req, res) {
  res.render('resmodel_metric_expand');
});

router.post('/addModelMetricInfo', function(req, res) {
  var logInfo = "资源模型添加指标:modelID为:" + req.body.modelId + ";metricId为:" + req.body.metricId;
  var logContent = {
    userId: req.session.userInfo.userId,
    info: logInfo
  };
  modelMetricInfo.addModelMetricAndCollectParam(req.body, logContent).then(function(uuid) {
    res.json({
      msg: '1',
      uuid: uuid
    });
    res.end();
  });
});

router.get('/updateMetricInfo', function(req, res) {
  modelMetricInfo.getMetricDetailById(req.query.modelId, req.query.metricId).then(function(r) {
    var metricInfos = r.rows[0];
    var cmdProps = '';
    metricInfos.defaultProtocol = '';
    metricInfos.updateCmds = '';
    metricInfos.updateCmdsProps = '';
    if (metricInfos.isCustom === 0) {
      for (var i = 0; i < metricInfos.metricCmds.length; i++) {
        cmdProps = '';
        metricInfos.defaultProtocol = metricInfos.metricCmds[0].cmdProtocol;
        for (var j = 0; j < metricInfos.metricCmds[i].cmdProps.length; j++) {
          cmdProps += metricInfos.metricCmds[i].cmdProps[j].propName + "=" + metricInfos.metricCmds[i].cmdProps[j].propValue + ";";
        }
        metricInfos.metricCmds[i].cmdPropsShow = cmdProps;
      }
    } else {
      metricInfos.defaultProtocol = metricInfos.metricCmds[0].cmdProtocol;
      metricInfos.updateCmds = metricInfos.metricCmds[0].cmd;
      if (metricInfos.metricCmds[0].cmdProps.length > 0) {
        metricInfos.updateCmdsProps = metricInfos.metricCmds[0].cmdProps[0].propName + "=" + metricInfos.metricCmds[0].cmdProps[0].propValue + ";";
      }
    }

    res.render('resmodel_metric_add', {
      'data': metricInfos
    });
    res.end();
  }).fail(function(err) {
    console.log(err);
  });
});

router.get('/checkMetricInfoExists', function(req, res) {
  modelMetricInfo.getMetricDetailById(req.query.modelId, req.query.metricId).then(function(r) {
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
router.post('/updateMetric', function(req, res) {
  var logInfo = "资源模型修改指标:modelID为:" + req.body.modelId;
  var logContent = {
    userId: req.session.userInfo.userId,
    info: logInfo
  };
  modelMetricInfo.addModelMetricAndCollectParam(req.body, logContent).then(function() {
    res.json({
      msg: '1'
    });
  });
});

router.post('/copyResModels', function(req, res) {
  var logInfo = "资源模型树复制";
  var logContent = {
    userId: req.session.userInfo.userId,
    info: logInfo
  };
  tree.copyResModels(req.body.ids, logContent).then(function(success) {
    console.log(success);
    if (success) {
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

router.get('/getThresholdList', function(req, res) {
  modelPolicyEvent.getThresholdList(req.query.modelId, function(r) {
    res.json({
      data: r
    });
  });
});

router.get('/getModelEventList', function(req, res) {
  modelPolicyEvent.getModelEventList(req.query.modelId, function(r) {
    res.json({
      data: r
    });
  });
});

router.get('/getModelPolicyBaseInfor', function(req, res) {
  modelPolicyEvent.getModelPolicyBaseInfor(req.query.modelId, function(r) {
    res.json({
      data: r
    });
  });
});

router.get('/getSNMPSupportCommandList', function(req, res) {
  modelMetricInfo.getMetricCmdSupportByBindingId(req.query.metricBindingId).then(function(r) {
    res.json({
      data: r
    });
  });
});

router.post('/saveAddSNMPSupportCommand', function(req, res) {
  var logInfo = "资源模型保存扩展指令:sysoid为:" + req.body.cmdVersion;
  var logContent = {
    userId: req.session.userInfo.userId,
    info: logInfo
  };
  modelMetricInfo.saveMetricCmdSupport(req.body, logContent).then(function() {
    res.json({
      msg: '1'
    });
    res.end();
  })
});

router.post('/delSNMPSupportCommand', function(req, res) {
  var logInfo = "资源模型删除扩展指令:bindingId为:" + req.body.metricBindingId;
  var logContent = {
    userId: req.session.userInfo.userId,
    info: logInfo
  };
  modelMetricInfo.deleteMetricCmdSupport(req.body, logContent).then(function() {
    res.json({
      msg: '1'
    });
  });
});

router.post('/updatePolicyMetricThreshold', function(req, res) {
  var data = {
    policyId: req.body.policyId,
    metricId: req.body.metricId,
    flapping: req.body.metricFlapping,
    timeOut: req.body.collectTimeOut,
    retryTimes: req.body.collectRetry,
    frequency: req.body.collectFrequency,
    inUse: req.body.isInUsed,
    genEvent: req.body.isGenEvent,
    exp1: req.body.c_exp1,
    exp2: req.body.c_exp2,
    exp3: req.body.c_exp3
  };
  var logInfo = "资源模型阈值修改:旧ID为:" + req.body.policyId + "新ID为:" + req.body.policyId;
  var logContent = {
    userId: req.session.userInfo.userId,
    info: logInfo
  };
  modelPolicyEvent.updatePolicyMetricThreshold(data, function() {
    res.json({
      msg: '1'
    });
  }, logContent);
});

router.post('/updatePolicyEvent', function(req, res) {
  var data = {
    eventId: req.body.c_id,
    inUse: req.body.isInUsed,
    level: req.body.eventLevel
  };
  var logInfo = "资源模型事件修改:eventID为:" + req.body.c_id;
  var logContent = {
    userId: req.session.userInfo.userId,
    info: logInfo
  };
  modelPolicyEvent.updatePolicyEvent(data, function() {
    res.json({
      msg: '1'
    });
  }, logContent);
});

router.post('/updatePolicyInfo', function(req, res) {
  var logInfo = "资源模型默认策略修改";
  var logContent = {
    userId: req.session.userInfo.userId,
    info: logInfo
  };
  modelPolicyEvent.updatePolicyInfo(req.body, function() {
    res.json({
      msg: '1'
    });
  }, logContent);
});

module.exports = router;