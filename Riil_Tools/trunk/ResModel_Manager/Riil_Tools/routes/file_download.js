var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	/**Get ./upload/ files*/
	var fs = require('fs'),
    util = require('util');
    var fileName = req.query.fileName;
    var filePath = './public/download/';
    var downloadPath = filePath + fileName;
    fs.exists(filePath, function(exists){
    	if( !exists ) {    
        	colsole.log(err);
        } else {
            res.download(downloadPath, fileName);
        }
    });
});


module.exports = router;
