var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/turnLeftMenuPage', function(req, res) {
    res.render('left_menu',{roleId : req.session.userInfo.role});
});

module.exports = router;
