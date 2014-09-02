/**
 * 添加指标组（确定按钮）
 */
function pop() {
	$.post(ctx + "/paramgroup/gethtml", function(data) {
		myAlert({
			title : '添加指标组信息',
			msg : data,
			type : 'alert',
			width : 600,
			height : 175
		});
	});
}
/**
 * 添加指标组（提交数据按钮）
 */
function submitgroup() {
	if (checkid()) {
		var ajax_url = ctx + "/paramgroup/addGroup"; // 表单目标
		var ajax_type = $("#addgroupform").attr('method'); // 提交方法
		var ajax_data = $("#addgroupform").serialize(); // 表单数据
		$.ajax({
			type : ajax_type, // 设置ajax方法提交数据的形式
			url : ajax_url,
			data : ajax_data, // 输入框writer中的值作为提交的数据
			success : function(msg) { // 提交成功后的回调，msg变量是输出的内容。
				if (msg == "ok") {
					setSMsgContent("操作成功", 70, "45%");
					closeAlert("alert");
					var a = Math.random();
					$("#form_div").load(
							ctx + "/paramgroup/list?page=1" + "&rand=" + a);
				} else {
					setSMsgContent("操作失败", 70, "45%");
					closeAlert("alert");
					$.ajaxSetup({
						cache : false
					});
					$("#form_div").load(ctx + "/paramgroup/list?page=1");
				}
			}
		});
	}
}
var stateCodef;
/**
 * 验证指标组ID，只能输入汉字或字母、数字且长度不能超过20个字符
 */
function checkid() {
	var m_paramGroupId = $("#m_paramGroupId").val();
	var reg1 = /^[A-Z|a-z|\u4e00-\u9fa5]*$||[0-9]/;
	if ($.isNull(m_paramGroupId) || m_paramGroupId == "") {
		falseCss("m_paramGroupId", "指标ID不能为空", true, -20);
		return false;
	} else {
		if (!reg1.test(m_paramGroupId)) {
			falseCss("m_paramGroupId", "只能输入汉字或字母", true, -20);
			return false;
		} else {
			if (nstrlength(m_paramGroupId) > 20) {
				falseCss("m_paramGroupId", "长度不能超过20个字符", true, -20);
				return false;
			} else {
				checkIdValue();
				if (stateCodef) {
					trueCss("m_paramGroupId");
					return true;
				} else {
					return false;
				}
			}
		}
	}
	return true;
}
// 判断指标组ID不能重复
function checkIdValue() {
	var m_paramGroupId = $("#m_paramGroupId").val();
	$.ajax({
		type : 'post',
		async:false,
		url : ctx + "/paramgroup/idIsRepeat",
		data : {
			"m_paramGroupId" : m_paramGroupId,
		},
		success : function(msg) {
			if (msg == "no") {
				// 执行添加
				$.ajaxSetup({
					cache : false,
				});
				stateCodef = true;
			} else {
				// 提示
				falseCss("m_paramGroupId", "指标组ID重复", true, -10);
				return stateCodef = false;
			}
		}
	});
}
function closeAlert(typeName) {
	if (typeName == null || typeName == "") {
		typeName = "alert";
	}
	$("#mainPanel" + typeName).remove();
	$("#bg" + typeName).remove();
}

/**
 * 删除指标组前判断
 */
function predeletegroup() {
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
				"确定删除选中记录吗？该操作不能恢复", deletegroup, msgHide, 200, 400, false);
		$("body")
				.append(
						"<div class='bg' style='float:left;background:#000;' id='bgprompt_warning'></div>");
	}
}
/**
 * 删除指标组（删除按钮）
 */
function deletegroup() {
	var i;
	var idArray = new Array();
	var arr = document.getElementsByName("ck");
	for (i = 0; i < arr.length; i++) {
		if (arr[i].type == "checkbox" && arr[i].checked) {
			idArray.push(arr[i].value);
		}
	}
	var ajax_url = ctx + "/paramgroup/deletegroup?idArray="
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
				$("#form_div").load(ctx + "/paramgroup/list?page=0");
			} else {
				alert("删除失败");
				setSMsgContent("删除失败", 70, "45%");
				$("#form_div").load(ctx + "/paramgroup/list?page=0");
			}
		}
	});
}
// 全选 取消全选
function checkAll() {
	var allCk = document.getElementById("ckall");
	var names = document.getElementsByName("ck");
	var names1 = document.getElementsByName("ck1");
	for(var i = 0;i<names1.length;i++) {
		if (allCk.checked == true) {
			names1[i].checked=false;
		} else {
			names1[i].checked=false;
		}
	}
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
