$(document).ready(function(){
//	$( "#tabs" ).tabs();
});

function submitModelMainType(){
	var isParent=false;
	var mainModelTypeId = $("#cMainModelTypeId").val();
	var mainModelTypeName = $("#cMainModelTypeName").val();
	var subTypeCode = $("#cSubTypeCode").val();
	var operatorCode = $("#current_user").val();
	var parentTreeId = $("#ParentTreeId").val();
	var level = $("#Level").val();
	var parentNode = $("#parentNode").val();
	
	if(parentNode=='none'){
		level=0;
		isParent=true;
	}
	else{
		level=1;
		parentTreeId=parentNode;
		isParent=false;
	}
	var modelMainType={
			'cMainModelTypeId':mainModelTypeId,
			'cMainModelTypeName':mainModelTypeName,
			'cSubTypeCode':subTypeCode,
			'cOperatorCode':operatorCode,
			'cParentTreeId':parentTreeId,
			'cLevel':level
	};
		$.ajax({
			type:'post',
			url:ctx+"/resourceModelMainTypeCotroller/addResourceModelMainType",
			data:modelMainType,
			dataType:'text',
			async:true,//表示该ajax为同步的方式
			success:function(data){
				if(data=='1'){
					$("#cMainModelTypeId").val("");
					$("#cMainModelTypeName").val("");
					$("#parentNode").val("none");
					
				}
				else{
					alert("操作失败");
				}
			},
			error:function(){
				alert("ajax操作失败");
			}
		});
}
function closeWin(){
	closeAlert("alert");
}