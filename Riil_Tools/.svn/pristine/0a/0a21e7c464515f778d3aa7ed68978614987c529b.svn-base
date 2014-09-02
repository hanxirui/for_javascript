$(document).ready(function(){
//	$( "#tabs" ).tabs();
});

function submitModelMainType(){
	var mainModelTypeId = $("#cMainModelTypeId").val();
	var mainModelTypeName = $("#cMainModelTypeName").val();
	var subTypeCode = $("#cSubTypeCode").val();
	var operatorCode = $("#OperatorCode").val();
	var parentTreeId = $("#ParentTreeId").val();
	var level = $("#Level").val();
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
				$('#model_add').load( ctx+'/resourceModelMainTypeCotroller/getResourceModelTypeAdd');
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