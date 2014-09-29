var express = require('express');
var url = require("url");
var router = express.Router();
/**service*/
var aduitLogService = require('../service/AduitLogService')
  /*加载审计日志页面*/
router.get('/getLogPage', function (req, res) {
  res.render('aduit_log');
});
/**查询所有厂商信息*/
router.get('/getLogInfos', function (req, res) {
  aduitLogService.getAduitLogList().then(function (r) {
    res.json({
      data: r.rows
    });
  });
});
module.exports = router;