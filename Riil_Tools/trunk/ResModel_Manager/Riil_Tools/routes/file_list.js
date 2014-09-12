var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	/**Get ./upload/ files*/
	var fs = require('fs'),
    util = require('util'),
    path = './public/download';
    fs.readdir(path, function(err, files){
	    //err 为错误 , files 文件名列表包含文件夹与文件
	    if(err){
	        console.log('error:\n' + err);
	        return;
	    }
	    /*var file_lists = [];
	    files.forEach(function(file){
	        fs.stat(path + '/' + file, function(err, stat){
	            if(err){console.log(err); return;}
	            if(stat.isDirectory()){                    
	                // 如果是文件夹遍历
	                explorer(path + '/' + file);
	            }else{
	                // 读出所有的文件
	                console.log('文件名:' + path + '/' + file);
	                file_lists.push(file);
	            }
	        });
	    });*/
		var res_list = [];
	    res_list.push("<!doctype>");
	    res_list.push("<html>");
	    res_list.push("<head>");
	    res_list.push("<meta http-equiv='Content-Type' content='text/html;charset=utf-8'></meta>")
	    res_list.push("<title>Node.js文件服务器</title>");
	    res_list.push("</head>");
	    res_list.push("<body width='100%'>");
	    res_list.push("<ul>")
	    files.forEach(function(val,index){
	        res_list.push("<li><a href='" + "download?fileName=" + val +"'>"+val+"</a></li>");
	    });
	    res_list.push("</ul>");
	    res_list.push("<div style='position:relative;width:98%;bottom:5px;height:25px;background:gray'>");
	    res_list.push("<div style='margin:0 auto;height:100%;line-height:25px;text-align:center'>Powered By Node.js</div>");
	    res_list.push("</div>")
	    res_list.push("</body>");
	    var body=res_list.join("");
        res.writeHead(200,{
            "Content-Type":"text/html;charset=utf-8",
            "Content-Length":Buffer.byteLength(body,'utf8'),
            "Server":"NodeJs("+process.version+")"
        });
        res.write(body,'utf8');
        res.end();
	});
});

module.exports = router;
