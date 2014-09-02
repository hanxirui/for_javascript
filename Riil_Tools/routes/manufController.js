var express = require('express');
var url = require("url");
var router = express.Router();
/**service*/
var manufService = require('../service/ManufService');
/**UUID*/
var getUUIDService = require('../service/func/commonfunc.js');
/*加载厂商管理页面*/
router.get('/getManufManagement', function(req, res) {
	res.render('manuf_list', {'tabContentId' : 'tabs1'});
});
/**查询所有厂商信息*/
router.get('/getAllManufInfos', function(req, res){
	manufService.queryAllManufInfos(function(r) {
		res.json({
			data: r
		});
	});
});
//添加厂商信息
router.get('/addManufInfo', function(req, res) {
	res.render('manuf_add');
});
//添加厂商信息 save
router.post('/save', function(req, res) {
	var manufInfo = req.body;
	manufInfo.cManufId = getUUIDService.getUUID();
	manufInfo.cOperator = req.session.userInfo.userName;
	manufService.save(manufInfo, function() {
		res.json({
			msg: '1'
		});
	});
});
//删除厂商信息 delete
router.post('/delete', function(req, res) {
	var manuf_ids = req.body.manuf_ids;
	manufService.deleteById(manuf_ids, function() {
		res.json({
			msg: '1'
		});
	});
});
//修改厂商 updatePre
router.get('/updatePre/:manufId', function(req, res) {
	// 获取请求路径
    var pathname = url.parse(req.url).pathname;
	var manufId = req.params.manufId;
	manufService.queryManufInfoById(manufId, function(r) {
		res.render('manuf_update', {
			data: r[0],
			msg: '1'
		});
	});
});
//修改厂商 update
router.post('/update', function(req, res) {
	var manufInfo = req.body;
	manufService.update(manufInfo, function() {
		res.json({
			msg: '1'
		});
	});
});
module.exports = router;