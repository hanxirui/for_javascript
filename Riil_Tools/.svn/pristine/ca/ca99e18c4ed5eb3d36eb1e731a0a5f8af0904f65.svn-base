var express = require('express');
var url = require("url");
var router = express.Router();
/**service*/
var vendorService = require('../service/VendorService');
var manufService = require('../service/ManufService');
var resType = require('../service/func/Enum4ResType');
/**UUID*/
var getUUIDService = require('../service/func/commonfunc.js');
/**查询所有厂商信息*/
router.get('/getAllManufInfos', function(req, res){
	manufService.queryAllManufInfos(function(r) {
		res.json({
			data: r
		});
	});
});
/**添加厂商型号信息*/
router.get('/addVendorInfo', function(req, res) {
	res.render('vendor_add');
});
/**查询对应模型信息*/
router.get('/getAllModelInfos', function(req, res){
	vendorService.queryAllModelInfos(function(r) {
		res.json({
			data: r
		});
	});
});
/**查询对应设备类型*/
router.get('/getAllDeviceInfos', function(req, res){
	res.json({
		data : resType
	});
});
/**查询sysoID是否重复*/
router.get('/check', function(req, res) {
	var sysoid = '';
	if(typeof(req.query.sysoid) != 'undefined' && req.query.sysoid != ''){
		sysoid = req.query.sysoid;
	}
	var vendorName = '';
	if(typeof(req.query.vendorName) != 'undefined' && req.query.vendorName != ''){
		vendorName = req.query.vendorName;
	}
	var id = req.query.id;
	var vendorInfo = {
		'id' : id,
		'sysoid' : sysoid,
		'vendorName': vendorName
	};
	vendorService.checkSysoidOrNameRepeat(vendorInfo, function(rows) {
		if (rows.length > 0) {
			res.json({
				msg: '1'
			});
		} else {
			res.json({
				msg: '2'
			});
		}
	});
});
/**保存厂商型号信息*/
router.post('/save', function(req, res){
	var vendorInfo = req.body;
	vendorInfo.id = getUUIDService.getUUID();
	vendorInfo.operator = req.session.userInfo.userName;
	vendorService.save(vendorInfo, function() {
		res.json({
			msg: '1'
		});
	});
});
/**取得所有厂商型号信息*/
router.get('/getAllVendorInfos', function(req, res){
	vendorService.queryAllVendorInfos(function(r) {
		res.json({
			data: r
		});
	});
});
/*加载厂商型号管理页面*/
router.get('/getVendorManagement', function(req, res) {
	res.render('manuf_list', {'tabContentId' : 'tabs2'});
});
/**查询操作*/
router.get('/queryVendorInfos', function(req, res){
	var manufID = req.query.manufID;
	var number = req.query.number;
	var vendorInfo = {
		'manufID' : manufID,
		'number' : number
	};
	vendorService.queryVendorInfos(vendorInfo, function(r) {
		res.json({
			data: r
		});
	});
});
//删除厂商型号信息 delete
router.post('/delete', function(req, res) {
	var vendorIds = req.body.vendorIds;
	var data = {
		'vendorIds' : vendorIds,
		'operator' : req.session.userInfo.userName
	};
	vendorService.deleteById(data, function() {
		res.json({
			msg: '1'
		});
	});
});
//修改厂商型号 updatePre
router.get('/updatePre/:vendorId', function(req, res) {
	var vendorId = req.params.vendorId;
	vendorService.queryVendorInfoById(vendorId, function(r) {
		res.render('vendor_update', {
			data: r[0],
			msg: '1'
		});
	});
});
//修改厂商型号 update
router.post('/update', function(req, res) {
	var vendorInfo = req.body;
	vendorInfo.operator = req.session.userInfo.userName;
	vendorService.update(vendorInfo, function() {
		res.json({
			msg: '1'
		});
	});
});
module.exports = router;
