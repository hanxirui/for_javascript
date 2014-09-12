function closeWin(){
	closeAlert('alert');
}
function insertEvent(){
	var policyId=$("#model_event_management").contents().find("#policy_id").val();
	var idArray = new Array();
	var eventIdStr="";
	$("input[name='envent_id']:checked").each(function(){
		
		idArray.push($(this).val());
	});
	if(idArray.length==0){
		setSMsgContent("请选择要添加的事件", 110, "45%");
		return;
	}
	console.log(idArray);
	for(var i=0;i<idArray.length;i++){
		eventIdStr+=idArray[i];
		eventIdStr+=",";
	}
	console.log("pOlicyId"+policyId);
	console.log(eventIdStr);
	
	$.ajax({
		type:'post',
		url:ctx+"/resourceModelCotroller/addTempEvent?policyId="+policyId+"&eventIds="+eventIdStr,
		dataType:'text',
		async:false,//表示该ajax为同步的方式
		success:function(data){
			console.log(data>0);
			if(data>0){
				var iframedom = $('#model_event_management')[0];
				iframedom.src = ctx+ "/resourceModelCotroller/modelEventPage?pageNow=1&pageSize=4&policyId="+policyId;
				setSMsgContent("操作成功", 70, "45%");
				closeWin();
			}
			else{
				setSMsgContent("操作失败", 70, "45%");
				
			}
		}
	});
}