var express = require('express');
var commonfunc = require('../service/func/commonfunc.js');
var router = express.Router();
var backboardService = require('../service/BackboardService');
router.get('/', function(req, res) {
  res.render('file_upload');
});

router.post('/manufImages', function(req, res){
	if (req.url == '/manufImages' && req.method.toLowerCase() == 'post') {
	    var formidable = require('formidable');
	    var fs = require('fs');
	    var form = new formidable.IncomingForm();
	    var baseUploadPath = './public/images/template/';
	    form.parse(req,function(error,fields,files){
	        if(!error){
	            var desUploadName = baseUploadPath + files.manuf_icon.name;
	            fs.exists(desUploadName, function(exists){
			    	if( !exists ) {
			    		var is = fs.createReadStream(files.manuf_icon.path);
						var os = fs.createWriteStream(desUploadName);
						is.pipe(os);
						is.on('end',function() {
						    fs.unlinkSync(files.manuf_icon.path);
						});
						/**跨盘操作时报错*/
			        	/*fs.renameSync(files.manuf_icon.path, desUploadName);*/
			        }
			    });
	        }else{
	         	console.log(error);
	        }
	    });
	    res.end();
    }  
});

router.post('/backboard', function(req, res){
	if (req.url == '/backboard' && req.method.toLowerCase() == 'post') {
	    var formidable = require('formidable');
	    var fs = require('fs');
	    var form = new formidable.IncomingForm();
	    var baseUploadPath = './public/backboard/';
	    form.parse(req,function(error,fields,files){
	        if(!error){
	            var desUploadName = baseUploadPath + files.m_applyfileupload.name;
	            fs.exists(desUploadName, function(exists){
			    	if( !exists ) {  
			    		var is = fs.createReadStream(files.m_applyfileupload.path);
						var os = fs.createWriteStream(desUploadName);
						is.pipe(os);
						is.on('end',function() {
						    fs.unlinkSync(files.m_applyfileupload.path);
						});  
			        	/*fs.renameSync(files.m_applyfileupload.path, desUploadName);*/
			        	var date = commonfunc.getFormatDate();
			        	var bgInfo = {
			        		bpName : files.m_applyfileupload.name,
					    	projectName : fields.m_projectname,
					    	ventor : fields.m_ventor,
					    	equipment : fields.m_equipmenttype,
					    	applyDate : date,
					    	operator : req.session.userInfo.userId,
					    	desc : fields.desc
	    				};
	    				backboardService.insertBg(bgInfo,function(flag){
	    					console.log(flag);
	    				});
	    				res.end('true');
			        }
			    });
	        }else{
	         	console.log(error);
	         	res.end('false');
	        }
	    });
    }  
});

router.post('/updataBackboard', function(req, res){
    var formidable = require('formidable');
    var fs = require('fs');
    var form = new formidable.IncomingForm();
    var baseUploadPath = './public/backboard/';
    form.parse(req,function(error,fields,files){
        if(!error){
            var desUploadName = baseUploadPath + files.m_applyfileupload.name;
            fs.exists(desUploadName, function(exists){
		    	if( !exists ) {  
		    		var is = fs.createReadStream(files.m_applyfileupload.path);
					var os = fs.createWriteStream(desUploadName);
					is.pipe(os);
					is.on('end',function() {
					    fs.unlinkSync(files.m_applyfileupload.path);
					});  
				}
		        	/*fs.renameSync(files.m_applyfileupload.path, desUploadName);*/
		        	var date = commonfunc.getFormatDate();
		        	var bgInfo = {
		        		bpId : fields.backPlaneId,
		        		bpName : files.m_applyfileupload.name,
				    	projectName : fields.m_projectname,
				    	ventor : fields.m_ventor,
				    	equipment : fields.m_equipmenttype,
				    	applyDate : date,
				    	operator : req.session.userInfo.userId,
				    	desc : fields.desc
    				};
    				backboardService.upDataBackPlane(bgInfo,function(flag){
    					if(!flag){
    						res.end('true');
    					}else{
    						res.end('false');
    					}
    				});
    				
		    });
        }else{
         	console.log(error);
         	res.end('false');
        }
    });
});

module.exports = router;
