/* jshint node:true */
'use strict';
var express = require('express');
var router = express.Router();
var tree = require('../service/ResTypeTree');
/**service*/
var manufService = require('../service/ManufService');

/**查询所有厂商信息*/
router.get('/getAllManufInfos', function (req, res) {
  manufService.queryAllManufInfos(function (r) {
    res.json({
      data: r
    });
  });
});

/* 资源类型首页. */
router.get('/getResourceTypeAdd', function (req, res) {
  if (req.query.modelId !== '' && typeof req.query.modelId !== 'undefined') {
    tree.getResTypeById(req.query.modelId).then(function (r) {
      res.render('resource_type_info', {
        'data': r.rows[0],
        'parentId': ''
      });
    });
  } else {
    var data = {
      'c_id': '',
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
router.get('/check', function (req, res) {
  tree.getResTypeById(req.query.id).then(function (r) {
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
  tree.updataResType(req.body).then(function () {
    res.json({
      msg: '1'
    });
  });
});

/**添加*/
router.post('/add', function (req, res) {
  tree.saveResType(req.body).then(function () {
    res.json({
      msg: '1'
    });
    res.end();
  }, function (err) {
    console.error(JSON.stringify(err));
    res.end(JSON.stringify(err));
  });
});

router.post('/delete', function (req, res) {
  tree.deleteResType(req.body.ids).then(function () {
    res.json({
      msg: '1'
    });
  });
});

/* 资源类型树 */
router.post('/getResTypeTree', function (req, res) {
  var path = req.body.webPath;
  tree.getResTypeTree(path).then(function (recordset) {
    res.json({
      data: recordset.rows
    });
  }).fail(function (err) {
    console.erroe(JSON.stringify(err));
  });
});



module.exports = router;