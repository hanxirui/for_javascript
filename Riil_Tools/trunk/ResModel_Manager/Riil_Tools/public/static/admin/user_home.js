$(document).ready(function(){
    var $url = ctx + "/resmodel/admin/leftpage";
	$("#home_left").load( $url,function(data){
		var iframedom = $('#user_message')[0];
		iframedom.src = ctx + "/resmodel/admin/userdata/1";
	});
 
    
});
 
var userHome={
		//点击用户管理，需要显示用户信息
		userManage:function (){
			$("#display_data").empty();
			var iframedom = $('#user_message')[0];
			iframedom.src = ctx+"/resmodel/admin/userdata/1";
		},
		//点击角色管理时，触发函数cmd=1表示添加用户信息
		roleManage:function (){
			$("#display_data").load(ctx+"/resmodel/admin/role/roleListMenu",function(){
				var iframedom = $('#user_message')[0];
				iframedom.src = "/resmodel/admin/role/page/DEV_ENGINEER";
			});
		},
		//点击添加角色按钮时触发该函数，cmd=0表示添加角色
		addRole:function (){
			$("#display_data").load(ctx+"/roleController/showRoleData",function(){
				var iframedom = $('#user_message')[0];
				iframedom.src = ctx+"/roleController/roleDataDetail?cmd=0";
			});
		},
		delRole:function (){
			var roleId = '';
			$("a[name='role_name']",parent.document).each(function(){
				if($(this).attr("class")=="txt_on"){
					roleId=$(this).attr("title");
				}
			});
			if(roleId !=''){
				$.post(ctx+"/roleController/delRole?roleId="+roleId,function(){
						$("#display_data").load(ctx+"/roleController/showRoleData",function(){
							var iframedom = $('#user_message')[0];
							iframedom.src = ctx+"/roleController/roleDataDetail?cmd=1";
						});
						msgHide();
				});
			}
		},
		del:function() {
			var roleId = '';
			$("a[name='role_name']",parent.document).each(function(){
				if($(this).attr("class")=="txt_on"){
					roleId=$(this).attr("title");
				}
			});
			if (roleId=='') {
				setBMsgContent("prompt_warning", "warning_content", "请选择您要删除的记录", "",msgHide, 200, 290, true);
				$("body").append("<div class='bg' style='float:left;background:#000;' id='bgprompt_warning'></div>");
			} else {
				setBMsgContent("prompt_warning", "warning_content","确定删除选中记录吗？该操作不能恢复", userHome.delRole, msgHide, 200, 290, false);
				$("body").append("<div class='bg' style='float:left;background:#000;' id='bgprompt_warning'></div>");
			}
		}
};






