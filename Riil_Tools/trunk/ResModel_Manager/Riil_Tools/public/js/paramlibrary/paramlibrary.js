/**
 * 添加指标（确定按钮），弹出弹出框信息
 */
function pop() {
	$.post(ctx + "/paramlibrary/getHtml", function(data) {
		myAlert({
			title : '添加指标信息',
			msg : data,
			type : 'alert',
			width : 601,
			height : 283
		});
	});
}
/**
 * 添加指标（提交数据按钮）
 */
function submitlibrary() {
	if (checkid()) {
		var ajax_url = ctx + "/paramlibrary/addlibrary"; // 表单目标
		var ajax_type = $("#addlibraryform").attr('method'); // 提交方法
		var ajax_data = $("#addlibraryform").serialize(); // 表单数据
		$.ajax({
			type : ajax_type, // 设置ajax方法提交数据的形式
			url : ajax_url,
			data : ajax_data, // 输入框writer中的值作为提交的数据
			success : function(msg) { // 提交成功后的回调，msg变量是输出的内容。
				if (msg == "ok") {
					setSMsgContent("操作成功", 70, "45%");
					closeAlert("alert");
					// 清除JQuery的缓存，使load页面有效
					$.ajaxSetup({
						cache : false
					});
					$("#form1").load(ctx + "/paramlibrary/listparam?page=0");
				} else {
					setSMsgContent("操作失败", 70, "45%");
					closeAlert("alert");
					$.ajaxSetup({
						cache : false
					});
					$("#form1").load(ctx + "/paramlibrary/listparam?page=0");
				}
			}
		});

	}
}
var stateCodef;
/**
 * 验证指标ID，只能输入汉字或字母且长度不能超过10个字符
 */
function checkid() {
	var m_paramid = $("#m_paramid").val();
	var reg1 = /^[A-Z|a-z|\u4e00-\u9fa5]*$||[0-9]/;
	if ($.isNull(m_paramid) || m_paramid == "") {
		falseCss("m_paramid", "指标ID不能为空", true, -20);
		return false;
	} else {
		if (!reg1.test(m_paramid)) {
			falseCss("m_paramid", "只能输入汉字或字母", true, -20);
			return false;
		} else {
			if (nstrlength(m_paramid) > 30) {
				falseCss("m_paramid", "长度不能超过30个字符", true, -20);
				return false;
			} else {
				checkIdValue();
				if (stateCodef) {
					trueCss("m_paramid");
					return true;
				} else {
					return false;
				}
			}
		}
	}
	return true;
}
//判断指标ID不能重复
function checkIdValue() {
	var m_paramid = $("#m_paramid").val();
	$.ajax({
		type : 'post',
		async:false,
		url : ctx + "/paramlibrary/idIsRepeat",
		data : {
			"m_paramid" : m_paramid,
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
				falseCss("m_paramid", "指标ID重复", true, -10);
				return stateCodef = false;
			}
		}
	});
}
/**
 * 关闭弹出框
 * 
 * @param typeName
 */
function closeAlert(typeName) {
	if (typeName == null || typeName == "") {
		typeName = "alert";
	}
	;
	$("#mainPanel" + typeName).remove();
	$("#bg" + typeName).remove();
}
/**
 * 删除指标前判断
 */
function predeletelibrary() {
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
				"确定删除选中记录吗？该操作不能恢复", deletelibrary, msgHide, 200, 400, false);
		$("body")
				.append(
						"<div class='bg' style='float:left;background:#000;' id='bgprompt_warning'></div>");
	}
}
/**
 * 删除指标（删除按钮）
 */
function deletelibrary() {
	var i;
	var idArray = new Array();
	var arr = document.getElementsByName("ck");
	for (i = 0; i < arr.length; i++) {
		if (arr[i].type == "checkbox" && arr[i].checked) {
			idArray.push(arr[i].value);
		}
	}
	var ajax_url = ctx + "/paramlibrary/deleteparam?idArray="
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
				$("#form1").load(ctx + "/paramlibrary/listparam?page=0");
			} else {
				setSMsgContent("操作失败", 70, "45%");
				$.ajaxSetup({
					cache : false
				});
				$("#form1").load(ctx + "/paramlibrary/listparam?page=0");
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
