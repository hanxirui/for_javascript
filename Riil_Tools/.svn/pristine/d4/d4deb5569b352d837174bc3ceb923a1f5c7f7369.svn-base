var express = require('express');
var router = express.Router();



router.get('/*', function(req, res,next) {
	//拦截器判断session
	if(req.session.userInfo){
		next();
	}else{
		res.render('login');
	}
});


module.exports = router;
