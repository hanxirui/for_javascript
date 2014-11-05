var express = require('express');
var crypto = require("crypto");
var router = express.Router();

var userService = require('../service/UserService');

// userService.init();

/* GET users listing. */
router.post('/', function(req, res) {


    var userName = req.body.userid;
    var pwd = req.body.password;

    var hmac, result;
    hmac = crypto.createHmac("sha1", "i'm a secret!");
    hmac.update(pwd);
    result = hmac.digest("hex");

    userService.checkUser(userName, result, function(rows) {
        if (rows.length > 0) {
            req.session.userInfo = {
                userId: rows[0].c_account,
                userName: userName,
                webpath: req.host,
                role: rows[0].c_role
            };

            req.session.user = rows[0];

            res.render('index', {
                userName: rows[0].c_user_name,
                userId: rows[0].c_account,
                roleId: req.session.userInfo.role
            });
        } else {
            res.redirect('/');
        }

    });



});


router.get('/', function(req, res) {
    // if(!req.session.userInfo){
    // 	res.render('index',{userName:req.session.userInfo.userName});
    // }else{
    // 	res.redirect('/');
    // }
    res.render('index', {
        userName: req.session.userInfo.userName,
        userId: req.session.userInfo.userId,
        roleId: req.session.userInfo.role
    });

});



router.get('/logout/:userId', function(req, res) {
    delete req.session.userInfo;
    delete req.session.user;
    req.session = null;

    res.redirect('/');
});



module.exports = router;