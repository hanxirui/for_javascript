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
	var cout= $("#"+id+"_cout").val();
	var timeout= $("#"+id+"_timeout").val();
	var retryTimes= $("#"+id+"_retry").val();
	var frequencyId= $("#"+id+"_frequency").val();
	var inUse= $("#"+id+"_inuse").val();
	var defaultGenEvent= $("#"+id+"_defaultGenEvent").val();
	var exp1= $("#"+id+"_exp1").val();
	var exp2= $("#"+id+"_exp2").val();
	var exp3= $("#"+id+"_exp3").val();
	var policyMetric={
			'modelPolicyId':$("#policy_id").val(),
			'metricId':id,
			'cout':cout,
			'timeout':timeout,
			'retryTimes':retryTimes,
			'frequencyId':frequencyId,
			'inUse':inUse,
			'defaultGenEvent':defaultGenEvent,
			'exp1':exp1,
			'exp2':exp2,
			'exp3':exp3
	};
	console.log(policyMetric);
	$.ajax({
		type:'post',
		url:ctx+"/resourceModelCotroller/alterMsg",
		data:policyMetric,
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
	$("input[name='"+id+"']").each(function(){
		$(this).attr("readonly","readonly");
	});
	$("#"+id).text("编辑");
}
function editMsg(id){
	$("input[name='"+id+"']").each(function(){
		$(this).removeAttr("readonly");
	});
	$("#"+id).text("保存");
	
}
function inUseClick(id){
	var value = $("#"+id+"_inuse").val();
	value=="1"?$("#"+id+"_inuse").val("-1"):$("#"+id+"_inuse").val("1")
}
function defaultGenEventClick(id){
	var value = $("#"+id+"_defaultGenEvent").val();
	value=="1"?$("#"+id+"_defaultGenEvent").val("-1"):$("#"+id+"_defaultGenEvent").val("1")
	
}