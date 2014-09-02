$(document).ready(function() {

	initGrid();
	initAddEvent();

});
 

function initGrid() {
 


	var table = $('#dataGrid').dataTable({
		"oLanguage": GIRD_I18N,
		"bFilter": true,
		"bLengthChange": false,
		"ajax": ctx + "/resmodel/admin/role/load/users",
		"initComplete": initCheckBox,
		"columns": [{
			"aDataSort": false,
			"data": "c_account",
			"render": function(data, type, row) {
				return '<input type="checkbox" name="scb" value ="' + data + '" >';

			}
		}, {
			"data": "c_account"
		}, {
			"data": "c_user_name"

		}, {
			"data": "c_dept"
		}],
		"lengthMenu": [5]
	});

 

};

function initCheckBox() {
	 
	$('#sall').bind('click', function() {
		var allCk = document.getElementById("sall");
		var names = document.getElementsByName("scb");
		for (var i = 0; i < names.length; i++) {
			if (allCk.checked == true) {
				names[i].checked = true;
			} else {
				names[i].checked = false;
			}
		}
	});

	$('input:checkbox[id!="sall"]').click(function() {
		$("input[name='scb']:checked").length == $("input[name='scb']").length ?
			$("#sall").prop("checked", true) : $("#sall").prop("checked", false);
	});
};


function initAddEvent() {
	$('#addUserBtn').bind('click', function(e) {

		var userAccounts = [];
		$("input[name='scb']:checked").each(function(i, e) {
			userAccounts.push($(e).val());
		});

		if (userAccounts.length == 0) {
			alert('请选择您要添加的记录');
		} else {

			$.ajax({
				type: 'POST',
				url: ctx + "/resmodel/admin/role/add/users",
				data: {
					acct_id: userAccounts,
					role_id: role_id
				},
				dataType: 'json',
				success: function(data) {
					if (data.msg == '1') {
						// $("#role_up").load(ctx + "/roleController/roleUsers?cRole=" + roleMsg);
						// alert("操作成功");


						var iframedom = $('#user_message', parent.document)[0];
						//setSMsgContent("操作成功", 70, "45%");
						alert('操作成功');
						iframedom.src = ctx + "/resmodel/admin/role/page/" + role_id;
						alertClose();

					} else {
						alert("操作成功");
						alertClose();
					}
				},
				error: function() {

					alert("操作失败");
					alertClose();
				}
			});


		}

	});
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
	$.ajax({
		type: 'post',
		url: pageUrl,
		// data:"pageSize="+7,
		dataType: 'json',
		async: true, // 表示该ajax为同步的方式
		success: function(data) {
			// 操作成功，成功读取数据
			if (data[0] == '1') {
				for (var i = 0; i < data[1].length; i++) {
					$("#user_data").append(
						"<tr title='alert'><td><input type='checkbox' value='" + data[1][i].cAccount + "'></td><td>" + data[1][i].cAccount + "</td><td>" + data[1][i].cUserName + "</td><td>" + data[1][i].cDept + "</td></tr>");
				}
			} else {

			}
		},
		error: function() {

		}
	});

}

function titleCheckBox() {
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
}