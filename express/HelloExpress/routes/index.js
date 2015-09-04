var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

app.get('*', function(req, res){
    res.sendFile(req.path, {root: __dirname+'/', dotfiles: 'deny'});
});


module.exports = router;
