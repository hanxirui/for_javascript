/* jshint node:true */
'use strict';
var express = require('express');
var router = express.Router();
var tree = require('../service/ResTypeTree');
/**service*/
var manufService = require('../service/ManufService');

/**查询所有厂商信息*/
router.get('/getAllManufInfos', function(req, res) {
  manufService.queryAllManufInfos(function(r) {
    res.json({
      data: r
    });
  });
});

/* 资源类型首页. */
router.get('/getResourceTypeAdd', function(req, res) {
  if (req.query.modelId !== '' && typeof req.query.modelId !== 'undefined') {
    tree.getResTypeById(req.query.modelId).then(function(r) {
      res.render('resource_type_info', {
        'data': r[0],
        'parentId': ''
      });
    });
  } else {
    var data = {
      'c_id': 'RIIL_RMT_',
      'c_name': '',
      'c_is_main': '',
      'c_vendor_id': '',
      'c_icon': ''
    };
    res.render('resource_type_info', {
      'data': data,
      'parentId': req.query.parentId
    });
  }

});
/**check repeat*/
router.get('/check', function(req, res) {
  tree.getResTypeById(req.query.id).then(function(r) {
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
/**check resName repeat*/
router.get('/checkResName', function(req, res) {
  if (req.query.isUpdate) {
    tree.isExistResName(req.query.resId, req.query.resName, req.query.id).then(function(r) {
      res.json({
        data: r
      });
    });
  } else {
    tree.isExistResName(req.query.resId, req.query.resName).then(function(r) {
      res.json({
        data: r
      });
    });
  }

});
/**更新*/
router.post('/update', function(req, res) {
  var logInfo = "资源类型树修改:旧ID为:" + req.body.c_oldId + "新ID为:" + req.body.c_id;
  var logContent = {
    userId: req.session.userInfo.userId,
    info: logInfo
  };
  var oldId = req.body.c_oldId;
  delete req.body.c_oldId;
  tree.updataResType(req.body, oldId, logContent).then(function() {
    res.json({
      msg: '1'
    });
  });
});

/**添加*/
router.post('/add', function(req, res) {
  var logInfo = "资源类型树添加节点:ID为:" + req.body.c_id;
  var logContent = {
    userId: req.session.userInfo.userId,
    info: logInfo
  };
  tree.saveResType(req.body, logContent).then(function() {
    res.json({
      msg: '1'
    });
    res.end();
  }, function(err) {
    console.error(JSON.stringify(err));
    res.end(JSON.stringify(err));
  });
});

router.post('/delete', function(req, res) {
  var logInfo = "资源类型树删除节点";
  var logContent = {
    userId: req.session.userInfo.userId,
    info: logInfo
  };
  tree.deleteResType(req.body.ids, logContent).then(function(result) {
    console.log(result);
    res.json({
      msg: '1'
    });
  }).fail(function(err) {
    console.log(err);
    res.json({
      msg: '0'
    });
  });
});

/* 资源类型树 */
router.post('/getResTypeTree', function(req, res) {
  var path = req.body.webPath;
  tree.getResTypeTree(path).then(function(recordset) {
    res.json({
      data: recordset
    });
  }).fail(function(err) {
    console.erroe(JSON.stringify(err));
  });
});

router.get('/getManufImg', function(req, res) {
  manufService.queryIconById(req.query.id, function(r) {
    res.json({
      data: r[0]
    });
  });
});



module.exports = router;