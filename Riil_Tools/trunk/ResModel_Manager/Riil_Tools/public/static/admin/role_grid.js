$(document).ready(function() {

	debugger;
	var table = $('#dataTable').dataTable({
		"oLanguage": GIRD_I18N,
		"bFilter": false,
		"bLengthChange": false,
		"bAutoWidth": true,
		"bProcessing": true,
		"aLengthMenu": [22],
		"ajax": ctx + "/resmodel/admin/role/" + role_id,
		"initComplete": initCheckBox,
		"columns": [{
			"aDataSort": false,
			"data": "c_account",
			"render": function(data, type, row) {
				return '<input type="checkbox" name="cb" value ="' + data + '" >';

			}
		}, {
			"data": "c_role_name"
		}, {
			"data": "c_account"
		}, {
			"data": "c_user_name",
			"render": function(data, type, row) {
				return "<a title=" + data + " val=" + row.c_account + " onclick='userRight.popUserAlterPage(this)'>" + data + "<a/>";

			}
		}, {
			"data": "c_mail_addr"
		}, {
			"data": "c_phone_num",
		}, {
			"data": "c_dept"
		}]
	});

 
	initDel();


});
 

function initCheckBox() {
	$('#all').bind('click', function() {
		var allCk = document.getElementById("all");
		var names = document.getElementsByName("cb");
		for (var i = 0; i < names.length; i++) {
			if (allCk.checked == true) {
				names[i].checked = true;
			} else {
				names[i].checked = false;
			}
		}
	});

	$('input:checkbox[id!="all"]').click(function() {
		$("input[name='cb']:checked").length == $("input[name='cb']").length ?
			$("#all").prop("checked", true) : $("#all").prop("checked", false);
	});
};

function initDel() {
	$('#delBtn').bind('click', function(e) {

		var userAccounts = [];
		$("input[name='cb']:checked").each(function(i, e) {
			userAccounts.push($(e).val());
		});
		if (userAccounts.length == 0) {
			alert('请选择您要删除的记录');
		} else {
			userRight.sureDeleteUserMsg();
		}

	});

	$('#addBtn').bind('click', function(e) {

		$.get(ctx + "/resmodel/admin/role/add/" + role_id, function(data) {
			myAlert({
				title: '添加角色',
				msg: data,
				type: 'alert',
				width: 590,
				height: 350
			});
		});
	});

};
/*var ctx = window.location.origin;*/
var userRight = {
	titleCheckBox: function() {
		var allCk = document.getElementById("title_checkbox");
		var names = document.getElementsByName("data_checkbox");
		for (var i = 0; i < names.length; i++) {
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
						"#title_checkbox").prop("checked", true) : $("#title_checkbox").prop("checked", false);
				});
	},
	popUserAddPage: function() {
		$.get(ctx + "/resmodel/admin/user/new", function(data) {
			myAlert({
				title: '添加用户',
				msg: data,
				type: 'alert',
				width: 602,
				height: 350
			});
		});
	},
	popUserAlterPage: function(obj) {
		var cAccount = $(obj).attr('val');
		$.get(ctx + '/resmodel/admin/user/update/' + cAccount, function(data) {
			myAlert({
				title: '编辑用户',
				msg: data,
				type: 'alert',
				width: 602,
				height: 350
			});
		});


	},
	delUserMsg: function() {
		var userAccounts = [];
		$('#dataTable .selected').each(function(i, e) {
			userAccounts.push($($(e).find('td')[0]).text());
		});
		if (userAccounts.length == 0) {

			setBMsgContent("prompt_warning", "warning_content", "请选择您要删除的记录",
				"", msgHide, 200, 290, true);
			$("body")
				.append(
					"<div class='bg' style='float:left;background:#000;' id='bgprompt_warning'></div>");
		} else {
			userRight.sureDeleteUserMsg();
			// setBMsgContent("prompt_warning", "warning_content",
			// 	"确定删除选中记录吗？该操作不能恢复", userRight.sureDeleteUserMsg, msgHide, 200, 290,
			// 	false);
			$("body").append("<div class='bg' style='float:left;background:#000;' id='bgprompt_warning'></div>");
		}
	},
	sureDeleteUserMsg: function() {
		var msg = '';
		var userAccounts = [];
		$("input[name='cb']:checked").each(function(i, e) {
			userAccounts.push($(e).val());
		});
		$.ajax({
			type: 'POST',
			url: ctx + "/resmodel/admin/role/reset",
			data: {
				role_id: userAccounts
			},
			dataType: 'json',
			success: function(data) {
				if (data.msg == '1') {
					msg = "操作成功";
					var iframedom = $('#user_message', parent.document)[0];
					iframedom.src = (ctx + "/resmodel/admin/role/page/" + role_id);
					alert(msg);
				} else {
					msg = "操作失败";
					alert(msg);
				}
			},
			error: function() {
				msg = "操作失败";
				alert(msg);
			}
		});
		setSMsgContent(msg, 70, "45%");
	}
}