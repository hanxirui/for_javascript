var express = require('express');
var url = require("url");
var router = express.Router();
/**service*/
var MetricGroupService = require('../service/MetricGroupService');

/*加载指标组管理页面*/
router.get('/getMetricGroupManagement', function(req, res) {
	res.render('metric_group_list');
});
/**查询所有指标信息*/
router.get('/getAllMetricGroupInfos', function(req, res){
	MetricGroupService.getMetricGroupList().then(function(recordset) {
		res.json({
			data: recordset.rows
		});
	});
});
router.get('/addMetricGroupInfo', function(req, res){
	res.render('metric_group_add');
});
//添加指标组信息 save
router.post('/save', function(req, res) {
	var metricGroupInfo = req.body;
	metricGroupInfo.operator = req.session.userInfo.userName;
	MetricGroupService.saveMetricGroup(metricGroupInfo).then(function(recordset) {
		res.json({
			msg: '1'
		});
	});
});
//删除指标组信息 delete
router.post('/delete', function(req, res) {
	var ids = req.body.ids;
	var data = {
		'ids' : ids,
		'operator' : req.session.userInfo.userName
	}
	MetricGroupService.deleteMetricGroupById(data).then(function() {
		res.json({
			msg: '1'
		});
	});
});
//修改指标组 updatePre
router.get('/updatePre', function(req, res) {
	var metricGroupId = req.query.metricGroupId;
	MetricGroupService.getMetricGroupById(metricGroupId).then(function(r) {
		res.render('metric_group_update', {
			data: r.rows[0],
			msg: '1'
		});
	});
});
//修改指标组 update
router.post('/update', function(req, res) {
	var metricGroupInfo = req.body;
	metricGroupInfo.operator = req.session.userInfo.userName;
	MetricGroupService.updataMetricGroup(metricGroupInfo).then(function() {
		res.json({
			msg: '1'
		});
	});
});
//check 指标组ID不能重复
router.get('/check', function(req, res) {
	var metricGroupId = req.query.metricGroupId;
	MetricGroupService.checkMetricGroupId(metricGroupId).then(function(r) {
		if(r.rows.length > 0){
			res.json({
				msg: '1'
			});
		}else{
			res.json({
				msg: '2'
			});
		}
	});
});
module.exports = router;
