//添加申请管理（确定按钮）
function pop() {
	$.post(ctx + "/applymanager/gethtml", function(data) {
		myAlert({
			title : '背板制作申请添加',
			msg : data,
			type : 'alert',
			width : 600,
			height : 175
		});
	});
}
// 点击查看项目详细信息
function showdetail(id) {
	$.post(ctx + "/applymanager/getapplydetail?m_id=" + id, function(data) {
		myAlert({
			title : '项目信息查看',
			msg : data,
			type : 'alert',
			width : 600,
			height : 175
		});
	});
}
// 修改申请管理
function applyupdate(m_id) {
	if (checkid()) {
			$("#addapplyform")[0].action = ctx
					+ "/applymanager/updateapply?id=" + m_id;
			setSMsgContent("操作成功", 70, "45%");
			$("#addapplyform")[0].submit();
			$("#form1").load(ctx + "/applymanager/listapply?pageNow=0");
			return true;
	}
}

// 添加前验证（提交数据按钮）
function preSubmitapply() {
	if (checkid()) {
		checkIdValue();
	}
}

//检查附件大小
function fileCheck(fileInput) {
	//var filePath = fileInput.value;
	if (fileInput.files[0].size > 51200000) {
		 document.getElementById('file').value='';
		setSMsgContent("附件不能超过50M", 100, "45%");
	}else{
		document.getElementById('fileText').value = document.getElementById('file').value;
	}
	return false;
}

// 导入模板
function submitapply() {
	if (document.getElementById('file').value == '') {
		setSMsgContent("请选择要上传的附件", 120, "45%");
		return false;
	} else {
		$("#addapplyform")[0].action = ctx + "/resourceModelCotroller/addmodel?random="
				+ random;
		setSMsgContent("操作成功", 70, "45%");
		$("#addapplyform")[0].submit();
		return true;
	}
}

// 验证项目名称，只能输入汉字或字母、数字且长度不能超过20个字符
function checkid() {
	var m_projectname = $("#m_projectname").val();
	var reg1 = /^[A-Z|a-z|\u4e00-\u9fa5]*$||[0-9]/;
	if ($.isNull(m_projectname) || m_projectname == "") {
		falseCss("m_projectname", "名称不能为空", true, -20);
		return false;
	} else {
		if (!reg1.test(m_projectname)) {
			falseCss("m_projectname", "只能输入汉字或字母", true, -20);
			return false;
		} else {
			if (nstrlength(m_projectname) > 20) {
				falseCss("m_projectname", "长度不能超过20个字符", true, -20);
				return false;
			}
		}
	}
	return true;
}
// 判断项目名称不能重复
function checkIdValue() {
	var m_projectname = $("#m_projectname").val();
	$.ajax({
		type : 'post',
		url : ctx + "/applymanager/idIsRepeat",
		data : {
			"m_projectname" : m_projectname,
		},
		success : function(msg) {
			if (msg == "no") {
				submitapply();
			} else {
				// 提示
				falseCss("m_projectname", "项目名称重复", true, -10);
			}
		}
	});
}
// 删除前判断
function predeleteapply() {
	var i;
	var idArray = new Array();
	var arr = document.getElementsByName("ck");
	for (i = 0; i < arr.length; i++) {
		if (arr[i].type == "checkbox" && arr[i].checked) {
			idArray.push(arr[i].value);
		}
	}
	if (idArray.length == 0) {
		setBMsgContent("prompt_warning", "warning_content", "请选择您要删除的记录", "",
				msgHide, 200, 400, true);
		$("body")
				.append(
						"<div class='bg' style='float:left;background:#000;' id='bgprompt_warning'></div>");
	} else {
		setBMsgContent("prompt_warning", "warning_content",
				"确定删除选中记录吗？该操作不能恢复", deleteapply, msgHide, 200, 400, false);
		$("body")
				.append(
						"<div class='bg' style='float:left;background:#000;' id='bgprompt_warning'></div>");
	}
}

// 删除申请管理（点击删除按钮）
function deleteapply() {
	var i;
	var idArray = new Array();
	var arr = document.getElementsByName("ck");
	for (i = 0; i < arr.length; i++) {
		if (arr[i].type == "checkbox" && arr[i].checked) {
			idArray.push(arr[i].value);
		}
	}
	var ajax_url = ctx + "/applymanager/deleteapply?idArray="
			+ idArray.toString(); // 表单目标
	var ajax_type = $("#form1").attr('method'); // 提交方法
	var ajax_data = $("#form1").serialize(); // 表单数据
	$.ajax({
		type : ajax_type,
		url : ajax_url,
		data : ajax_data,
		success : function(msg) {
			if (msg == "true") {
				setSMsgContent("操作成功", 70, "45%");
				msgHide();
				$.ajaxSetup({
					cache : false
				});
				$("#form1").load(ctx + "/applymanager/listapply?page=0");
			} else {
				setSMsgContent("操作失败", 70, "45%");
				$("#form1").load(ctx + "/applymanager/listapply?page=0");
			}
		}
	});
}
// 全选 取消全选
function checkAll() {
	var allCk = document.getElementById("ckall");
	var names = document.getElementsByName("ck");
	for ( var i = 0; i < names.length; i++) {
		if (allCk.checked == true) {
			names[i].checked = true;
		} else {
			names[i].checked = false;
		}
	}
	$("input[name='ck']")
			.click(
					function() {
						$("input[name='ck']:checked").length == $("input[name='ck']").length ? $(
								"#ckall").prop("checked", true)
								: $("#ckall").prop("checked", false);
					});
}
var random = Math.random();
// 文件上传弹出窗
function fileupload() {
	var id = $("#m_id").val();
	if (document.getElementById('file').value == '') {
		setBMsgContent("prompt_warning", "warning_content", "请选择要上传的附件", "",
				msgHide, 200, 400, true);
		return false;
	} else {
		$("#addapplyform")[0].action = ctx + "/applymanager/upload?id=" + id;
		setSMsgContent("操作成功", 70, "45%");
		$("#addapplyform")[0].submit();
		return true;
	}
}
// 检查附件大小
function checkfile(fileInput) {
	document.getElementById('fileText').value = document.getElementById('file').value;
	var filePath = fileInput.value;
	if (fileInput.files[0].size > 10240000) {
		setBMsgContent("prompt_warning", "warning_content", "附件超过10M", "",
				msgHide, 200, 400, true);
	}
	return false;
}
// 弹出上传对话框
function openWin(id) {
	$.post(ctx + "/applymanager/openWin?id=" + id, function(data) {
		myAlert({
			title : '上传附件信息',
			msg : data,
			type : 'alert',
			width : 520,
			height : 110
		});
	});
}
