$(document).ready(function(){
	
	var pageCount = $("#page_count").val();
	if(pageCount==0){
		$("#data_page").addClass("div_hidden");
	}
});
function addRoleToUsers(){
	var roleMsg=$("#role_user").val();
	$.post(ctx+"/roleController/turnAddUserRolePage?cRole="+roleMsg+"&pageSize=7",function(data){
		myAlert({title:'添加角色',msg:data,type:'alert',width:602,height:350});
		
	});
}
function delUserRole(){
	var userAccounts=new Array();
	$("input:checked").each(function(){
		userAccounts.push($(this).val());
	});
	if (userAccounts.length == 0) {

		setBMsgContent("prompt_warning", "warning_content", "请选择您要删除的记录", "",
				msgHide, 200, 290, true);
		$("body")
				.append(
						"<div class='bg' style='float:left;background:#000;' id='bgprompt_warning'></div>");
	} else {
		setBMsgContent("prompt_warning", "warning_content",
				"确定删除选中记录吗？该操作不能恢复", sureDelRoleUsers, msgHide, 200, 290, false);
		$("body")
				.append(
						"<div class='bg' style='float:left;background:#000;' id='bgprompt_warning'></div>");
	}
	
	
}
function sureDelRoleUsers(){
	var roleMsg = $("#role_user").val();
	var userAccounts=new Array();
	$("input:checked").each(function(){
		userAccounts.push($(this).val());
	});
	$.ajax({
		type:'post',
		url:ctx+"/roleController/deleteUsersRole",
		data:'accounts='+userAccounts.toString(),
		dataType:'text',
		async:false,//表示该ajax为同步的方式
		success:function(data){
			if(data=='1'){
				$("#role_up").load(ctx+"/roleController/roleUsers?cRole="+roleMsg);
			}
			else{
				alert("操作失败");
			}
		},
		error:function(){
			alert("操作失败");
		}
	});
	msgHide();
}
function roleUsersRefreshData(obj){
	var role = $("#user_role").val();
	var page = obj["title"];
	var pageNow=parseInt($("#page_now_in_role").val());
	var pageCount=$("#page_count").val();
	var pageUrl=ctx+"/roleController/roleUsersRefreshData?cRole="+role;
	if(page=="role_users_front_page"){
		$("#role_users_page_now").text("第1页");
		$("#page_now_no_role").val("1");
		pageUrl+="&&pageNow=1&&pageSize=10";
	}
	else if(page=="role_users_pre_page"){
		if(pageNow-1<1){
			$("#role_users_page_now").text("第1页");
			$("#page_now_in_role").val("1");
			pageUrl+="&&pageNow=1&&pageSize=10";
		}
		else{
			pageNow-=1;
			$("#role_users_page_now").text("第"+pageNow+"页");
			$("#page_now_in_role").val(pageNow);
			pageUrl+="&&pageNow="+pageNow+"&&pageSize=10";
		}
		
	}
	else if(page=="role_users_next_page"){
		if(pageNow+1>pageCount){
			$("#role_users_page_now").text("第"+pageCount+"页");
			$("#page_now_in_role").val(pageCount);
			pageUrl+="&&pageNow="+pageCount+"&&pageSize=10";
		}
		else{
			
			pageNow+=1;
			$("#role_users_page_now").text("第"+pageNow+"页");
			$("#page_now_in_role").val(pageNow);
			pageUrl+="&&pageNow="+pageNow+"&&pageSize=10";
		}
		
	}
	else if(page=="role_users_last_page"){
		pageUrl+="&&pageNow="+pageCount+"&&pageSize=10";
		$("#role_users_page_now").text("第"+pageCount+"页");
		$("#page_now_in_role").val(pageCount);
		
	}
	$("tr[title='role_users_alert']").each(function(){
		$(this).empty();
	});
	$.ajax({
		type:'post',
		url:pageUrl,
//		data:"pageSize="+7,
		dataType:'json',
		async:true,//表示该ajax为同步的方式
		success:function(data){
			//操作成功，成功读取数据
			if(data[0]=='1'){
				for(var i=0;i<data[1].length;i++){
					$("#role_users_user_data").append("<tr title='role_users_alert'><td><input type='checkbox' value='"+data[1][i].cAccount+"'></td><td>"+data[1][i].cAccount+"</td><td>"+data[1][i].cUserName+"</td><td>"+data[1][i].cDept+"</td><td>"+data[1][i].cMailAddr+"</td><td>"+data[1][i].phoneNum+"</td></tr>");
				}
			}
			else{
				
			}
		},
		error:function(){
			
		}
	});
	
}