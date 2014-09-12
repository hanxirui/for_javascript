$(document).ready(function() {
	var userAccount = $("#user_account_hidden").val();
	//	$("#user_dept option").each(function(){
	//        if(userDeptHidden==$(this).val()){
	//            $(this).attr("selected", true);
	//        }
	//});
	//如果是修改用户信息则隐藏密码字段,账号为只读
	// if(userAccount!=''){

	// 	$("#li_pass").css("display","none");
	// 	$("#li_rePass").css("display","none");
	// 	$("#user_account").attr("readonly",true);
	// }
});
 

function submitMsg() {
	//隐藏域，用于判定添加用户还是查看编辑用户信息
	 
	//用户的信息
	var userAccount = $("#user_account").val();
	var userPassword = $("#user_password").val();
	var userRePassword = $("#user_rePassword").val();
	var userName = $("#user_name").val();
	var userDept = $("#user_dept").val();
	var userPhone = $("#user_phone").val();
	var userMail = $("#user_mail").val();
	if (checkUserAccountrepeate()) {
		var user = {
			'cAccount': userAccount,
			'cPassword': userPassword,
			'cUserName': userName,
			'cMailAddr': userMail,
			'cPhoneNum': userPhone,
			'cDept': userDept
		};
		//userAccountHidden为空表示添加用户信息,否则表示查看或修改用户信息

		$.ajax({
			type: 'post',
			url: ctx + "/resmodel/admin/user/update",
			data: user,
			dataType: 'json',
			//async:true,//表示该ajax为同步的方式
			success: function(data) {
				//alert(data.msg);
				if (data.msg == '1') {
					var iframedom = $('#user_message', parent.document)[0];
					//setSMsgContent("操作成功", 70, "45%");
					alert('操作成功');
					iframedom.src = ctx + "/resmodel/admin/userdata/1";

					closeWin();
				} else {
					setSMsgContent("操作失败", 70, "45%");
					closeWin();
				}
			},
			error: function() {
				setSMsgContent("操作失败", 70, "45%");
				closeWin();
			}
		});



	}

}

function closeWin() {
	closeAlert("alert");
}

function checkUserAccount() {
	var flag = false;
	if (!formchecklist.checktest("user_account", 1, 45, "账号", -100)) {
		return false;
	} else if (!checkUserAccountrepeate()) {
		falseCss("user_account", "账号重复", true, -100);
		return false;
	} else {
		return true;
	}
}

function checkUserAccountrepeate() {
	var ori_user_name = $("#ori_user_name").val();
	var noRepeat = true;
	var user_name = $("#user_name").val();
	//if(userAccountHidden==''){
	$.ajax({
		type: 'get',
		url: ctx + "/resmodel/admin/user/" + user_name + "/" + ori_user_name,
		dataType: 'json',
		async:false,//表示该ajax为同步的方式
		success: function(data) {
			if (data.msg == "1") {
				//false表示账号重复
				alert('用户名重复');
				noRepeat = false;
			} else {
				noRepeat = true;
			}
		},
		error: function() {
			alert("操作失败");
		}
	});
	//}
	return noRepeat;
}

function checkPassword() {
	var userAccountHidden = $("#user_account_hidden").val();
	if (!formchecklist.checktest("user_password", 1, 45, "密码", -100) && userAccountHidden == '') {
		return false;
	}
	return true;
}

function checkRePassword() {
	var userAccountHidden = $("#user_account_hidden").val();
	var pass = $("#user_password").val();
	var rePass = $("#user_rePassword").val();
	if (userAccountHidden == '') {
		if (!formchecklist.checktest("user_rePassword", 1, 45, "重复密码", -100)) {
			return false;
		}
		if (pass != rePass) {
			falseCss("user_rePassword", "密码与重复密码不一致", true, -100);
			return false;
		}

	}

	return true;
}

function checkUserName() {
	if (!formchecklist.checktest("user_name", 2, 45, "姓名", -100)) {
		return false;
	}
	return true;
}

function checkPhone() {
	var phone = $("#user_phone").val();
	if (phone == '') {
		trueCss("user_phone");
		return true;
	} else {
		if (!formchecklist.checkphone("user_phone", "电话", -100)) {
			return false;
		}
		return true;
	}
}

function checkMail() {
	var mail = $("#user_mail").val();
	if (mail == '') {
		trueCss("user_mail");
		return true;
	} else {
		if (!formchecklist.checkemail("user_mail", "邮箱", 50, -100)) {
			return false;
		}
		return true;
	}
}