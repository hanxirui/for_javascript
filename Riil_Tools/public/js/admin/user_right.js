$(document).ready(function() {

	var pageCount = $("#page_count").val();
	if (pageCount == 0) {
		$("#data_page").addClass("div_hidden");
	}
});
var userRight = {
	titleCheckBox : function() {
		var allCk = document.getElementById("title_checkbox");
		var names = document.getElementsByName("data_checkbox");
		for ( var i = 0; i < names.length; i++) {
			if (allCk.checked == true) {
				names[i].checked = true;
			} else {
				names[i].checked = false;
			}
		}
		$("input[name='data_checkbox']")
				.click(
						function() {
							$("input[name='data_checkbox']:checked").length == $("input[name='data_checkbox']").length ? $(
									"#title_checkbox").prop("checked", true)
									: $("#title_checkbox").prop("checked",false);
						});
	},
	popUserAddPage : function() {
		$.post(ctx + "/userController/turnUserAddPage", function(data) {
			myAlert( {
				title : '添加用户',
				msg : data,
				type : 'alert',
				width : 602,
				height : 350
			});
		});
	},
	popUserAlterPage : function(clickObj) {
		var cAccount = clickObj["title"];
		$.post(ctx + '/userController/turnUserAlterPage?cAccount=' + cAccount,
				function(data) {
					myAlert( {
						title : '编辑用户',
						msg : data,
						type : 'alert',
						width : 602,
						height : 350
					});
				});
	},
	delUserMsg : function() {
		var userAccounts = new Array();
		$("input:checked").each(function() {
			userAccounts.push($(this).val());
		});
		if (userAccounts.length == 0) {

			setBMsgContent("prompt_warning", "warning_content", "请选择您要删除的记录",
					"", msgHide, 200, 290, true);
			$("body")
					.append(
							"<div class='bg' style='float:left;background:#000;' id='bgprompt_warning'></div>");
		} else {
			setBMsgContent("prompt_warning", "warning_content",
					"确定删除选中记录吗？该操作不能恢复", sureDeleteUserMsg, msgHide, 200, 290,
					false);
			$("body")
					.append(
							"<div class='bg' style='float:left;background:#000;' id='bgprompt_warning'></div>");
		}
	},
	sureDeleteUserMsg : function() {
		var msg = '';
		var userAccounts = new Array();
		$("input:checked").each(function() {
			userAccounts.push($(this).val());
		});
		$
				.ajax( {
					type : 'post',
					url : ctx + "/userController/deleteUserMsg",
					data : 'accounts=' + userAccounts.toString(),
					dataType : 'text',
					async : false,// 表示该ajax为同步的方式
					success : function(data) {
						if (data == '1') {
							msg = "操作成功";
							var iframedom = $('#user_message', parent.document)[0];
							iframedom.src = (ctx + '/userController/ShowUserData?pageNow=' + 1);
						} else {
							msg = "操作失败";
						}
					},
					error : function() {
						msg = "操作失败";
					}
				});
		setSMsgContent(msg, 70, "45%");
	}
}
