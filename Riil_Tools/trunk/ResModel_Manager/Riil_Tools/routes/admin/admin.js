var express = require('express');
var crypto = require("crypto");

var router = express.Router();

var userService = require('../../service/UserService');
var roleService = require('../../service/RoleService');


var config = require('../../conf/config.json').role;


// turn user page
// 校验当前用户的权限
router.get('/', function(req, res) {
	res.render('user_home');
});



// 左边菜单加载
router.get('/leftpage', function(req, res) {

	var $u = req.session.userInfo;

	var info = {
		user: $u.userName,
		userId: $u.userId,
		ctx: '',
		webpath: req.host

	};
	res.render('user_left', info);
});

//用户数据查询加载
router.get('/userdata/:pageNow', function(req, res) {


	var $u = req.session.userInfo;
	var pageNow = req.params.pageNow;

	pageInfo = {
		index: req.params.pageNow * 1 - 1,
		PageSize: 10,
		PageLast: 10 + req.params.pageNow * 1

	};

	userService.init();
	userService.queryAll(pageInfo, function(r) {
		var info = {
			user: $u.userName,
			userId: $u.userId,
			ctx: '',
			webpath: req.host,
			data: r,
			totalPageCount: r.length,
			pageNow: pageNow

		};


		res.render('user_right', info);

	});

});

//用户数据查询加载
router.get('/userdata/query/:pageNow', function(req, res) {


	var $u = req.session.userInfo;
	var pageNow = req.params.pageNow;

	pageInfo = {
		index: req.params.pageNow * 1 - 1,
		PageSize: 10,
		PageLast: 10 + req.params.pageNow * 1

	};

	userService.init();
	userService.queryAll(pageInfo, function(r) {

		res.json({
			data: r
		});

	});

});

// 用户新增 导向

router.get('/user/new', function(req, res) {
	res.render('user_add');
});


// 用户修改 导向

router.get('/user/update/:acct_id', function(req, res) {
	var acct_id = req.params.acct_id;
	console.log(acct_id);
	userService.init();
	userService.queryById(acct_id, function(r) {
		res.render('user_update', {
			data: r[0],
			msg: '1'
		});
	});

});


// 用户新增 动作
router.post('/user', function(req, res) {

	var userInfo = req.body;
	var hmac, result;
    hmac = crypto.createHmac("sha1", "i'm a secret!");
    hmac.update(userInfo.cPassword);
    result = hmac.digest("hex");
	userInfo.cPassword=result;
	userService.init();
	userService.save(userInfo, function() {
		res.json({
			msg: '1'
		});
	});


});


// 用户修改 动作
router.post('/user/update', function(req, res) {

	var userInfo = req.body;
	userService.init();
	userService.update(userInfo, function() {
		res.json({
			msg: '1'
		});
	});


});



router.get('/user/check/:acct_id', function(req, res) {
	var acct_id = req.params.acct_id;
	 console.log(acct_id);
	userService.queryById(acct_id, function(rows) {
         console.log(rows.length);
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

// 查询用户
router.get('/user/:user_name/:ori_user_name', function(req, res) {
	var user_name = req.params.user_name;
	var ori_user_name= req.params.ori_user_name;
	console.log('check'+ori_user_name);
	userService.checkUserName(user_name,ori_user_name, function(rows) {
        console.log(rows);
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


//角色数据查询加载
router.delete('/user', function(req, res) {

	var acct_ids = req.body.acct_ids;

	userService.init();
	userService.deleteById(acct_ids, function() {

		res.json({
			msg: '1'
		});
	});



});


////////////////////////////////////////////////////////////////
// 角色 导向
router.get('/role/roleListMenu', function(req, res) {
	roleService.init();
	roleService.queryAll(function(rows) {
		var d = [];
		for (var i = 0; i < rows.length; i++) {
			d.push({
				roleId: rows[i].c_role_id,
				roleName: rows[i].c_role_name,
				roleStyle: rows[i].c_role_style
			});
		};
		res.render('role_table', {
			data: d
		});
	});

});


//角色数据查询加载
router.get('/role/page/:role_id', function(req, res) {

	var $role_id = req.params.role_id;
	res.render('role_grid', {
		role_id: $role_id
	});


});


//角色数据查询加载
router.get('/role/:role_id', function(req, res) {


	var role_id = req.params.role_id;

	roleService.init();
	roleService.queryById(role_id, function(rows) {

		res.json({
			data: rows
		});
	});


});



// 新增角色
router.get('/role/add/:role_id', function(req, res) {
	var role_id = req.params.role_id;
	res.render('add_user_role', {
		'role_id': role_id
	});



});

//加载没有分配角色的用户数据
router.get('/role/load/users', function(req, res) {
	//console.log(123123);
	roleService.init();
	roleService.queryUsers(function(rows) {

		res.json({
			data: rows
		});
	});



});

router.post('/role/reset', function(req, res) {
	var role_id = req.body.role_id;
	roleService.init();
	roleService.updateById(role_id, function() {

		res.json({
			msg: '1'
		});
	});



});

router.post('/role/add/users', function(req, res) {
	var role_id = req.body.role_id;
	var acct_id = req.body.acct_id;
	roleService.init();
	console.log(req.body);
	roleService.updateRoleById(role_id, acct_id, function() {

		res.json({
			msg: '1'
		});
	});



});
////////////////////////////////////////////////////////////
module.exports = router;