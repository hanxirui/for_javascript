$(document).ready(function(){
	var cmd=$("#operate_cmd").val();
	var roleName=$("#role_name_hidden").val();
	var roleStyle=$("#role_type_hidden").val();
	var roleContent=$("#role_content_hidden").val();
	$("#role_name").val(roleName);
	$("#role_type option").each(function(){
        if(roleStyle==$(this).val()){
            $(this).attr("selected", true);
        }
    });
	$("#role_content").text(roleContent);
	
});
//提交信息
function submitMsg(){
	var cmd=$("#operate_cmd").val();
	var roleId = $("#role_id_hidden").val();
	var roleName=$("#role_name").val();
	var roleStyle=$("#role_type").val();
	var roleContent=$("#role_content").val();
	if(checkRoleName()&&checkRoleType()){
		var role={
				'cRoleId':roleId,
				'cRoleName':roleName,
				'cRoleStyle':roleStyle,
				'cRoleContent':roleContent
		};
		//添加角色信息
		if(cmd=='0'){
			$.ajax({
				type:'post',
				url:ctx+"/roleController/roleAdd",
				data:role,
				dataType:'text',
				async:true,//表示该ajax为同步的方式
				success:function(data){
					if(data=='1'){
						$("#role_name").val("");
						$("#role_content").val("");
						$("#role_type option").each(function(){
					        if('unoption'==$(this).val()){
					            $(this).attr("selected", true);
					        }
					    });
						$('#display_data', parent.document).load(ctx+"/roleController/showRoleData",function(){
							$("a[name='role_name']",parent.document).last().addClass("txt_on");
							var roleIdNew='';
							roleIdNew=$("a[name='role_name']",parent.document).last().attr("title");
							$("#role_id_hidden").val(roleIdNew);
							
						});
						setSMsgContent("操作成功", 70, "45%");
					}
					else{
						setSMsgContent("操作失败", 70, "45%");
					}
				},
				error:function(){
					setSMsgContent("操作失败", 70, "45%");
				}
			});
		}
		//编辑角色信息
		else{
			$.ajax({
				type:'post',
				url:ctx+"/roleController/alterRoleMsg",
				data:role,
				dataType:'text',
				async:true,//表示该ajax为同步的方式
				success:function(data){
					if(data=='1'){
						$('#display_data', parent.document).load(ctx+"/roleController/showRoleData",function(){
							$("a[name='role_name']",parent.document).each(function(){
								if($(this).attr("title")==roleId){
									$(this).addClass("txt_on");
									
								}
							});
						});
						setSMsgContent("操作成功", 70, "45%");
					}
					else{
						setSMsgContent("操作失败", 70, "45%");
					}
				},
				error:function(){
					setSMsgContent("操作失败", 70, "45%");
				}
			});
		}
		
	}
	
}
function resetMsg(){
	$("#role_name").val("");
	$("#role_content").val("");
	$("#role_type option").each(function(){
        if('unoption'==$(this).val()){
            $(this).attr("selected", true);
        }
    });
}
function checkRoleName(){
	var cmd=$("#operate_cmd").val();
	if(!formchecklist.checktest("role_name",2,45,"角色名称",-100)){
		return false;
	}
	if(!roleNameIsRepeat()&&cmd=='0'){
		falseCss("role_name", "角色名称重复", true, -100);
		return false;
	}
	return true;
	
}
function roleNameIsRepeat(){
	var noRepeat=false;
	var roleName = $("#role_name").val();
	$.ajax({
		type:'post',
		url:ctx+"/roleController/roleNameIsRepeat",
		data:'cRoleName='+roleName,
		dataType:'text',
		async:false,//表示该ajax为同步的方式
		success:function(data){
			if(data=='1'){
				noRepeat=false;
			}
			else{
				noRepeat=true;
				
			}
		},
		error:function(){
			noRepeat=undefined;
		}
	});	
	return noRepeat;
}
function checkRoleType(){
	var roleType=$("#role_type").val();
	if(roleType=='unoption'){
		falseCss("role_type", "请选择角色类型", true, -100);
		return false;
	}
	trueCss("role_type");
	return true;
	
	
}