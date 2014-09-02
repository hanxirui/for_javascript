$(document).ready(function(){
	//获取cmd参数，确定查看角色信息还是添加角色信息
	var editAdd = $("#edit_add").val();
	var roleId='';
	$("a[name='role_name']", parent.document).each(function(){
		if($(this).attr("class")=='txt_on'){
			roleId=$(this).attr("title");
		}
	});
	$("#role_id_hidden").val(roleId);
	//表示添加角色
	if(editAdd=='0'){
		//加载角色信息页面，cmd=0添加角色信息
		$("#role_up").load(ctx+"/roleController/turnAddRolePage?cmd="+editAdd);
	}
	else{
//		$("a[name='role_name']", parent.document).each(function(){
//			if($(this).attr("class")=='txt_on'){
//				roleId=$(this).attr("title");
//				$("#role_up").load(ctx+"/roleController/roleMsg?roleId="+roleId+"&cmd="+editAdd);
//			}
//		});
		//加载角色信息页面，cmd=1查看编辑角色信息
		$("#role_up").load(ctx+"/roleController/roleMsg?roleId="+roleId+"&cmd="+editAdd);
	}
});
//点击角色信息时触发函数
function roleMsg(){
	var roleId=$("#role_id_hidden").val();
	//获取cmd参数
	var editAdd = $("#edit_add").val();
	$("#role_msg").attr("class","");
	$("#role_user_msg").attr("class","");
	$("#role_msg").attr("class","curtab");
	$("#role_user_msg").attr("class","tabs");
	if(editAdd=='0'){
		$("#role_up").load(ctx+"/roleController/turnAddRolePage?cmd="+editAdd);
	}
	else{
		$("#role_up").load(ctx+"/roleController/roleMsg?roleId="+roleId+"&cmd="+editAdd);
	}
	
//	$("a[name='role_name']", parent.document).each(function(){
//		if($(this).attr("class")=='txt_on'){
//			roleId=$(this).attr("title");
//			$("#role_up").load(ctx+"/roleController/roleMsg?roleId="+roleId+"&cmd="+editAdd);
//		}
//	});
}
//点击人员信息时触发该函数
function roleUserMsg(){
	$("#role_msg").attr("class","");
	$("#role_user_msg").attr("class","");
	$("#role_msg").attr("class","tabs");
	$("#role_user_msg").attr("class","curtab");
	var roleId=$("#role_id_hidden").val();
	var editAdd = $("#edit_add").val();
	if (roleId=='') {
		setBMsgContent("prompt_warning", "warning_content", "请先添加角色", "",msgHide, 200, 290, true);
		$("body").append("<div class='bg' style='float:left;background:#000;' id='bgprompt_warning'></div>");
	}
	else{
		$("#role_up").load(ctx+"/roleController/roleUsers?cRole="+roleId);
	}
//	$("a[name='role_name']", parent.document).each(function(){
//		if($(this).attr("class")=='txt_on'){
//			roleId=$(this).attr("title");
//			$("#role_up").load(ctx+"/roleController/roleUsers?cRole="+roleId);
//		}
//	});
}