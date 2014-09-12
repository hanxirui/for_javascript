function addPolicyEvent(){
	var policyId=$("#policy_id").val();
	if($("#policy_id").val()==''){
		setSMsgContent("请先填写策略", 90, "45%");
		return;
	}
	$.post(ctx+"/resourceModelCotroller/turnEventPageAdd?pageNow=1&pageSize=20&policyId="+policyId,function(data){
		parent.myAlert( {
			title : '添加事件',
			msg : data,
			type : 'alert',
			width : 1100,
			height : 500
		});
	});
	
}
function operate(id){
	var saveEdit = $("#"+id).text();
	if(saveEdit=='保存'){
		saveMsg(id);
	}
	else{
		editMsg(id);
	}
}
function saveMsg(id){
	var eventLevel=$("#"+id+"_level").val();
	var policyEvent={
			'modelPolicyId':$("#policy_id").val(),
			'id':id,
			'level':eventLevel
	}
	$.ajax({
		type:'post',
		url:ctx+"/resourceModelCotroller/alterPolicyEventMsg",
		data:policyEvent,
		dataType:'text',
		async:true,//表示该ajax为同步的方式
		success:function(data){
			if(data=='1'){
				setSMsgContent("操作成功", 70, "45%");
			}
			else{
				setSMsgContent("操作失败", 70, "45%");
			}
		}
	});
	$("#"+id+"_level").attr("readonly","readonly");
	$("#"+id).text("编辑");
}
function editMsg(id){
	/*$("input[name='"+id+"']").each(function(){
		$(this).removeAttr("readonly");
	});*/
	$("#"+id+"_level").removeAttr("readonly");
	$("#"+id).text("保存");
	
}