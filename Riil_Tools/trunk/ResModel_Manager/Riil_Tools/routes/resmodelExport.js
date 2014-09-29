'use strict';
/**
 * Created by R04419 on 2014/9/10.
 */
var express = require('express');
var router = express.Router();
var dataExport = require('../service/ModelDataExport');

router.post('/export', function(req, res) {
  dataExport.ExecResourceModelExport().then(function(result) {
    res.json({
      msg : '1'
    });
  }).fail(function(err) {
    res.json({
      msg : '-1'
    });
  });
});

module.exports = router;
