$(document).ready(function() {
	var pageCount = $("#page_count_no_role").val();
	if (pageCount == '0') {
		$("#data_page_no_role").addClass("div_hidden");
	}
});
function add() {
	var roleMsg = $("#role_msg_hidden").val();
	var userAccounts = new Array();
	$("input:checked").each(function() {
		userAccounts.push($(this).val());
	});
	if (userAccounts.length > 0) {
		$
				.ajax( {
					type : 'post',
					url : ctx + "/roleController/addRoleToUsers",
					data : 'accounts=' + userAccounts.toString() + "&roleMsg="
							+ roleMsg,
					dataType : 'text',
					async : true,// 表示该ajax为同步的方式
					success : function(data) {
						if (data == '1') {
							$("#role_up").load(
									ctx + "/roleController/roleUsers?cRole="
											+ roleMsg);
							setSMsgContent("操作成功", 70, "45%");
							alertClose();

						} else {
							setSMsgContent("操作失败", 70, "45%");
							alertClose();
						}
					},
					error : function() {
						setSMsgContent("操作失败", 70, "45%");
						alertClose();
					}
				});

	} else {
		setBMsgContent("prompt_warning", "warning_content", "请选择您要删除的记录", "",
				msgHide, 200, 290, true);
		$("body")
				.append(
						"<div class='bg' style='float:left;background:#000;' id='bgprompt_warning'></div>");
	}

}
function alertClose() {
	closeAlert("alert");
}
function refreshData(obj) {
	var page = obj["title"];
	var pageNow = parseInt($("#page_now_no_role").val());
	var pageCount = $("#page_count_no_role").val();
	var pageUrl = ctx + "/roleController/refreshData";
	if (page == "front_page") {
		$("#page_now").text("第1页");
		$("#page_now_no_role").val("1");
		pageUrl += "?pageNow=1&&pageSize=7";
	} else if (page == "pre_page") {
		if (pageNow - 1 < 1) {
			$("#page_now").text("第1页");
			$("#page_now_no_role").val("1");
			pageUrl += "?pageNow=1&&pageSize=7";
		} else {
			pageNow -= 1;
			$("#page_now").text("第" + pageNow + "页");
			$("#page_now_no_role").val(pageNow);
			pageUrl += "?pageNow=" + pageNow + "&&pageSize=7";
		}

	} else if (page == "next_page") {
		if (pageNow + 1 > pageCount) {
			$("#page_now").text("第" + pageCount + "页");
			$("#page_now_no_role").val(pageCount);
			pageUrl += "?pageNow=" + pageCount + "&&pageSize=7";
		} else {

			pageNow += 1;
			$("#page_now").text("第" + pageNow + "页");
			$("#page_now_no_role").val(pageNow);
			pageUrl += "?pageNow=" + pageNow + "&&pageSize=7";
		}

	} else if (page == "last_page") {
		pageUrl += "?pageNow=" + pageCount + "&&pageSize=7";
		$("#page_now").text("第" + pageCount + "页");
		$("#page_now_no_role").val(pageCount);

	}
	$("tr[title='alert']").each(function() {
		$(this).empty();
	});
	$.ajax( {
		type : 'post',
		url : pageUrl,
		// data:"pageSize="+7,
		dataType : 'json',
		async : true,// 表示该ajax为同步的方式
		success : function(data) {
			// 操作成功，成功读取数据
			if (data[0] == '1') {
				for ( var i = 0; i < data[1].length; i++) {
					$("#user_data").append(
							"<tr title='alert'><td><input type='checkbox' value='"
									+ data[1][i].cAccount + "'></td><td>"
									+ data[1][i].cAccount + "</td><td>"
									+ data[1][i].cUserName + "</td><td>"
									+ data[1][i].cDept + "</td></tr>");
				}
			} else {

			}
		},
		error : function() {

		}
	});

}
function titleCheckBox() {
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
								: $("#title_checkbox").prop("checked", false);
					});
}