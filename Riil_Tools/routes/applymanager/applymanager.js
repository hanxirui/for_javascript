/* jshint node:true */
'use strict';

var express = require('express');
var router = express.Router();
var backboardService = require('../../service/BackboardService');
 
/* GET users listing. */
router.get('/listapply', function(req, res) {
	res.render('apply');
});

router.post('/addapply', function(req, res) {
	res.render('apply_add');
});


//查询项目名称是否重复
router.post('/checkIDRepeat', function(req, res) {
	var projectName = req.body.projectname;
	backboardService.queryByPN(projectName,function(count){
		res.json({
			'count':count
		});
	});
	// res.render('apply_add');
});

//查询背板数据
router.get('/queryData', function(req, res) {
	backboardService.queryBpData(function(r){
		res.json({
			data:r
		});
	});
});

//下载文件
router.get('/downLoadFile', function(req, res) {
	var path = './public/backboard/'+req.query.fileName;
	res.download(path,req.query.fileName);

});

//删除背板
router.post('/deleteData', function(req, res) {
	var backGroudId = req.body.id;
	backboardService.deleteBpData(backGroudId,function(r){
		if(!r){
			res.json({
				msg:'success'
			});			
		}

	});
});

//修改背板
router.get('/updataBackGroud', function(req, res) {
	var backGroudId = req.query.id;
	backboardService.queryById(backGroudId,function(r){
		if(r.length>0){
			res.render('apply_updata',r[0]);		
		}
	});
	
});

module.exports = router;
