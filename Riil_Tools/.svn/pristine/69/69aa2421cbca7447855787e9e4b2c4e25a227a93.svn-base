var express = require('express');
var router = express.Router();
var tree = require('../service/ResTypeTree');

router.get('/getAllPlugins', function(req, res){
	tree.getAllPlugin().then(function(r) {
		res.json({
			data: r.rows
		});
	});
});

router.post('/getMainModelTree', function(req, res){
	var path = req.body.webPath;
	tree.getMainResModelTree(path).then(function (r){
		res.json({
			data : r.rows
		});
	});
});

router.get('/getResourceModelMain', function(req, res) {
	if(req.query.modelId !== '' && typeof(req.query.modelId) !== 'undefined'){
		tree.getResModelById(req.query.modelId).then(function(r){
			res.render('res_model_main', {'data' : r.rows[0]});
		});
	}else{
		var data = {
			'c_id' : '',
			'c_name' : '',
			'c_desc' : '',
			'c_is_snmp' : '',
			'c_plugin_id' : ''
		};
		res.render('res_model_main', {'data' : data});
	}
});

/**tree operate*/
router.post('/getResModelTree', function(req, res) {
	var path = req.body.webPath;
	tree.getResModelTree(path).then(function (recordset) {
	 	res.json({
	    	data:recordset.rows
	    });
	    res.end();
	}).fail(function (recordset) {
	});

});
/**check repeat*/
router.get('/check', function (req, res) {
  tree.getResModelById(req.query.id).then(function (r) {
    if (r.rows.length > 0) {
      res.json({
        msg: '1'
      });
    } else {
      res.json({
        msg: '0'
      });
    }
  });
});
/**更新*/
router.post('/update', function (req, res) {
  tree.updataResModel(req.body).then(function () {
    res.json({
      msg: '1'
    });
    res.end();
  });
});
module.exports = router;
