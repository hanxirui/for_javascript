function turnAlterPage(id){
	$.post(ctx+"/manufController/turnManufAlterPage?id="+id,function(data){
		myAlert({
			title : '修改厂商信息',
			msg : data,
			type : 'alert',
			width : 626,
			height : 299
		});
	});
	
}
function update(){
	var newFileName = $("#manuf_icon").val();
	$("#update_manuf_msg")[0].action = ctx+"/manufController/updateManufMsg?newFileName="+newFileName;
    $("#update_manuf_msg")[0].submit();
    parent.setSMsgContent("操作成功", 70, "45%");
    
    
//    alert(parent.manufData.length);
    /*var manufIdOld=$("#manuf_id_old").val();
    var manufIconOld = $("#cManufIcon").val();
    var manufId=$("#input_manuf_id_alter").val();
    var manufName=$("#manuf_name_input_alter").val();
    var manufIcon=$("#manuf_icon").val();
    for(var i=0;i<parent.manufData.length;i++){
    	console.log(parent.manufData[i].cManufIcon);
    	if(parent.manufData[i].cManufId==manufIdOld){
    		parent.manufData[i].cManufId=manufId;
    		parent.manufData[i].cManufName=manufName;
    		parent.manufData[i].cManufIcon=manufIcon==''?manufIconOld:manufIcon
    	}
    	
    }*/
//    var iframedom = $("#manuf_msg",parent.document)[0];
//	iframedom.src = ctx+"/manufController/manufMsg";
//	parent.setSMsgContent("操作成功", 70, "45%");
//	parent.manufHome.initData();
//	parent.manufData = parent.manufHome.manufMsg;
	/*var id=$("#c_id").val();
	var manufName=$("#manuf_name_input").val();
	var manufId=$("#input_manuf_id").val();
	var manuf={
			'cId':id,
			'cManufName':manufName,
			'cManufId':manufId
	}
	$.ajax({
		type:'post',
		url:ctx+"/manufController/updateManufMsg",
		data:manuf,
		dataType:'text',
		async:false,//表示该ajax为同步的方式
		success:function(data){
			if(data>0){
				parent.setSMsgContent("操作成功", 70, "45%");
				closeAlert("alert");
				var iframedom = $("#manuf_msg",parent.document)[0];
				iframedom.src = ctx+"/manufController/manufMsg";
			}
			else{
				parent.setSMsgContent("操作失败", 70, "45%");
				closeAlert("alert");
				var iframedom = $("#manuf_msg",parent.document)[0];
				iframedom.src = ctx+"/manufController/manufMsg";
			}
		}
	});*/
	
}
//图片附件的大小判断
function checkfile(fileInput) {
	document.getElementById('fileText').value = document.getElementById('manuf_icon').value;
	var str = document.getElementById('manuf_icon').value;
	if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(str)) {
		setBMsgContent("prompt_warning", "warning_content", "图片类型必须是.gif,jpeg,jpg,png中的一种", "",
				msgHide,270, 400, true);
		return false;
	}else if (fileInput.files[0].size > 10240) {
		setBMsgContent("prompt_warning", "warning_content", "图片附件超过10k", "",
				msgHide, 200, 400, true);
		return false;
	}
	return true;
}