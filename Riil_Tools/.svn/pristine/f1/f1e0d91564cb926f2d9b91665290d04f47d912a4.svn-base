/* jshint node:true */
'use strict';

var express = require('express');
var router = express.Router();
var metric_base = require('../../service/MetricBaseLib');
 
/* GET users listing. */
router.get('/queryLibraryData', function(req, res) {
	//获取指标库列表数据
	metric_base.getMetricBaseList().then(function (recordSet) {
	   res.json({
	   	data:recordSet.rows
	   });
	}).fail(function (err) {
	    var jstr = JSON.stringify(err);
	    var jobj = JSON.parse(jstr);
	    console.error(jobj.errMessage);
	});
});

/* GET users listing. */
router.get('/listparam', function(req, res) {
    res.render('library');
});


module.exports = router;
