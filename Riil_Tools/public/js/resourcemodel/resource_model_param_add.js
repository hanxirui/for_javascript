//切换添加指标时标签页
function showtab(tabHeadId, tabContentId) {
	var cId = $("#metricId").val();
	if (cId == "") {
		if (tabHeadId == "showtabsabc") {
			parent.setBMsgContent("prompt_warning", "warning_content", "请先保存指标信息，在添加扩展指标信息", "",
					parent.msgHide, 298, 671, true);
			return;
		}
	}
	var iframedom = $('#extcmd')[0];
	iframedom.src = ctx+ "/resourceModelCotroller/getExtCmd?pageNow=1&pageSize=4&modelMetricId="
		+ cId;
	// $src="${ctx}/resourceModelCotroller/getExtCmd?pageNow=1&pageSize=4&metricId=${id}">
	// tab层
	var tabDiv = document.getElementById("showtabDivAdd");
	// 将tab层中所有的内容层设为不可见
	// 遍历tab层下的所有子节点
	var taContents = tabDiv.childNodes;
	for (i = 0; i < taContents.length; i++) {
		// 将所有内容层都设为不可见
		if (taContents[i].id != null && taContents[i].id != 'tabsHead1') {
			taContents[i].style.display = 'none';
		}
	}
	// 将要显示的层设为可见
	document.getElementById(tabContentId).style.display = 'block';
	// 遍历tab头中所有的超链接
	var tabHeads = document.getElementById('tabsHead1')
			.getElementsByTagName('a');
	for (i = 0; i < tabHeads.length; i++) {
		// 将超链接的样式设为未选的tab头样式
		tabHeads[i].className = 'tabs1';
	}
	// 将当前超链接的样式设为已选tab头样式
	document.getElementById(tabHeadId).className = 'curtab1';
	document.getElementById(tabHeadId).blur();
}

//弹出指标添加页面
function pop() {
	var ModelId=$("#ModelId",parent.document).val().replace(/(\s*$)/g,""); 
	$.post(ctx + "/resourceModelCotroller/getmodelparamhtml?modelId="+ModelId, function(data) {
		parent.myAlert( {
			title : '添加指标信息',
			msg : data,
			type : 'alert',
//			type:'alertshow',
			width : 700,
			height : 500
			
		});
	});
}

//添加指标前判断，指标Id是否为空，指标Id是否重复
function checkmetricId() {
	var m_paramid = $("#m_paramid").val();
	if (m_paramid == null || m_paramid == "") {
		falseCss("m_paramid", "指标ID不能为空", true, -10);
		return false;
	}
	trueCss("m_paramid");
	return true;
}
//添加模型指标前判断，此指标是否在指标库中，若不包含在内则不能添加
function isInParamLibrably() {
	var bSelfFlag = false;
	var m_paramid=$("#m_paramid").val();
	$.ajax({
		type : 'post',
		async:false,
		url : ctx + "/resourceModelCotroller/isInParamLibrably",
		data : {
			"m_paramid" : m_paramid,
		},
		success : function(msg) {
			if (msg == "yes") {
				bSelfFlag = true;
			} else {
				falseCss("m_paramid", "此ID指标库中没有记录", true, -10);
				bSelfFlag = false;
			}
		}
	});
	return bSelfFlag;
}

// 添加指标操作
function submitaddparam() {
	var metricVal = $("#metricId").val();
	if(metricVal!=''){
			updatemodelmetric(metricVal);
	}else{
		//取得模型策略值，添加模型指标的同时也要添加策略指标
		var policyId = $("#model_policy_id").val();
		var ModelId = $("#ModelId").val().replace(/(\s*$)/g, "");
		var ajax_type = $("#addmodelparam").attr('method'); // 提交方法
		var ajax_data = $("#addmodelparam").serialize(); // 表单数据
		var ajax_url = ctx + "/resourceModelCotroller/addModelMetric?metircModelId="
				+ ModelId+"&policyId="+policyId;// 表单目标
		if (checkmetricId()&&isInParamLibrably()) {
			$.ajax( {
						type : ajax_type, // 设置ajax方法提交数据的形式
						url : ajax_url,// ajax_data,
						data : ajax_data,// 输入框writer中的值作为提交的数据
						async : false,
						success : function(msg) { // 提交成功后的回调，msg变量是输出的内容。
						if (msg != "error") {
						 $("#metricId").val(msg);
						 setSMsgContent("操作成功", 70, "45%");
						 $.ajaxSetup( {
								cache : false
							});
						 var iframedom = $('#modelmetric')[0];
						 iframedom.src = ctx+"/resourceModelCotroller/getModelMetric?pageNow=1&modelId="+ModelId;
						 //刷新策略指标页面
						 var iframedom = $('#model_metric_management')[0];
							iframedom.src =ctx+"/resourceModelCotroller/modelMetricPage?pageNow=1&pageSize=3&policyId="+policyId;
					} else {
						setSMsgContent("操作失败", 70, "45%");
						// closeAlert("alert");
						$.ajaxSetup( {
							cache : false
						});
						var iframedom = $('#modelmetric', parent.document)[0];
						iframedom.src = ctx
								+ "/resourceModelCotroller/getModelMetric?pageNow=1&modelId="
								+ ModelId;
					}
						 var iframedom = $('#model_event_management')[0];
							iframedom.src =ctx+"/resourceModelCotroller/modelEventPage?pageNow=1&pageSize=4&policyId="+policyId;
				}
					});
		}
	}
}
//修改指标信息
function updatemodelmetric(id) {
	var modelmetricId=$("#m_paramid").val();
	var ModelId=$("#modelId").val(); 
	var cId = $("#metricId").val();
	var ajax_type = $("#addmodelparam").attr('method');
	var ajax_url=ctx + "/resourceModelCotroller/updateModelMetric?c_id="+id+"&modelMetricId="+modelmetricId;
	var ajax_data = $("#addmodelparam").serialize();
	if (checkmetricId()&&isInParamLibrably()) {
	$.ajax( {
			type : ajax_type,
			url : ajax_url,
			data : ajax_data,
			success : function(msg) {
			if (msg == "ok") {
				setSMsgContent("操作成功", 70, "45%");
				closeAlert('alertshow');
				 var iframedom = $('#modelmetric')[0];
				 iframedom.src = ctx+"/resourceModelCotroller/getModelMetric?pageNow=1&modelId="+ModelId;
			} else {
				setSMsgContent("操作失败", 70, "45%");
				 var iframedom = $('#modelmetric')[0];
				 iframedom.src = ctx+"/resourceModelCotroller/getModelMetric?pageNow=1&modelId="+ModelId;
			}
		}
	});	
}
	
}

//指标列表全选取消
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
// 删除指标前判断
function predeleteModelMetric() {
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
				"确定删除选中记录吗？该操作不能恢复", deleteModelMetric, msgHide, 200, 400, false);
		$("body")
				.append(
						"<div class='bg' style='float:left;background:#000;' id='bgprompt_warning'></div>");
	}
}
// 删除指标（点击删除按钮）
function deleteModelMetric() {
	var i;
	var idArray = new Array();
	var arr = document.getElementsByName("ck");
	for (i = 0; i < arr.length; i++) {
		if (arr[i].type == "checkbox" && arr[i].checked) {
			idArray.push(arr[i].value);
		}
	}
	var modelMetricIdArray = new Array();
	$("input[name='ck']:checked").each(function(){
		modelMetricIdArray.push($(this).attr("title"));
	});
	//取得模型策略值，删除模型指标的同时也要添加策略指标
	var policyId = $("#model_policy_id",parent.document).val();
	var ModelId=$("#ModelId",parent.document).val().replace(/(\s*$)/g,""); 
	var ajax_url = ctx + "/resourceModelCotroller/deleteModelMetric?modelId="+ModelId+"&idArray="
			+ idArray.toString()+"&policyId="+policyId+"&modelMetricIdArray="+modelMetricIdArray.toString();
	var ajax_type = $("#form1").attr('method');
	var ajax_data = $("#form1").serialize();
	$.ajax( {
		type : ajax_type,
		url : ajax_url,
		data : ajax_data,
		async:false,
		success : function(msg) {
			
			//刷新策略指标界面
			var iframedomPolicy = $('#model_metric_management',parent.document)[0];
			iframedomPolicy.src =ctx+"/resourceModelCotroller/modelMetricPage?pageNow=1&pageSize=3&policyId="+policyId;
			
			if (msg == "true") {
				msgHide();
				parent.setSMsgContent("操作成功", 70, "45%");
				var iframedom = $('#modelmetric',parent.document)[0];
				iframedom.src = ctx+ "/resourceModelCotroller/getModelMetric?pageNow=1&modelId="
						+ ModelId;
				
			} else {
				parent.setSMsgContent("操作失败", 70, "45%");
				var iframedom =$('#modelmetric',parent.document)[0];
				iframedom.src = ctx
						+ "/resourceModelCotroller/getModelMetric?pageNow=1&modelId="
						+ ModelId;
			}
			var iframedom = $('#model_event_management',parent.document)[0];
			iframedom.src =ctx+"/resourceModelCotroller/modelEventPage?pageNow=1&pageSize=4&policyId="+policyId;
			 
		}
	});
}
// 切换编辑指标时页签
function showTab1(tabHeadId, tabContentId) {
	var cId = $("#c_Id").val();
	var iframedom = $('#extcmd')[0];
	iframedom.src = ctx+ "/resourceModelCotroller/getExtCmd?pageNow=1&pageSize=4&modelMetricId="+cId;
	// tab层
	var tabDiv = document.getElementById("tabDivAdd");
	// 将tab层中所有的内容层设为不可见
	// 遍历tab层下的所有子节点
	var taContents = tabDiv.childNodes;
	for (i = 0; i < taContents.length; i++)
	{
		// 将所有内容层都设为不可见
		if (taContents[i].id != null && taContents[i].id != 'tabsHeada')
		{
			taContents[i].style.display = 'none';
		}
	}
	// 将要显示的层设为可见
	document.getElementById(tabContentId).style.display = 'block';
	// 遍历tab头中所有的超链接
	var tabHeads = document.getElementById('tabsHeada')
			.getElementsByTagName('a');
	for (i = 0; i < tabHeads.length; i++)
	{
		// 将超链接的样式设为未选的tab头样式
		tabHeads[i].className = 'tabsa';
	}
	// 将当前超链接的样式设为已选tab头样式
	document.getElementById(tabHeadId).className = 'curtaba';
	document.getElementById(tabHeadId).blur();
}
// 点击下拉列表切换页面
function changeHanlder() {
	var s1 = $("#pluginProtocol").val();
}

////弹出扩展指标修改页面
//function showExtCmdDetail(id) {
////	alert(id);
//	var plugin = $("#pluginProtocol",parent.document).val();
//	$.post(ctx + "/resourceModelCotroller/getExtCmdDetail?c_id=" + id+"&pluginselect="+plugin, function(data) {
//		parent.myAlert({
//			title : '编辑',
//			msg : data,
//			type : 'alertshowextcmd',
//			width : 554,
//			height : 230,
//			outAlert:109
//		});
//	});
//}
////修改后保存扩展指标
//function saveExtCmd() {
//	var cId = $("#c_Id").val();
//	if(typeof(cId)=="undefined") {
//		cId = $("#metricId").val();
//	}
//	var c_id=$("#id").val();
//	alert(c_id);
////	var modelmetricId = $("#m_paramid").val().replace(/(\s*$)/g, "");
//	var extSysoid = $("#extSysoid").val();
//	var extRel = $("#extRel").val();
//	var extCmd = $("#extCmd").val();
//	var extCollectType = $("#extCollectType").val();
//	if (checkSysoid()) {
//		var ExtCmdInfo = {
////			'modelmetricId' : modelmetricId,
//			'extSysoid' : extSysoid,
//			'extRel' : extRel,
//			'extCmd' : extCmd,
//			'extCollectType' : extCollectType
//		};
//		// 提交信息
//		$.ajax( {
//			type : 'post',
//			url : ctx + "/resourceModelCotroller/updateExtCmd?metricId="+ cId+"&id="+c_id,
//			data : ExtCmdInfo,
//			dataType : 'text',
//			async : false,// 表示该ajax为同步的方式
//			success : function(data) {
//				if (data == '1') {
//					setSMsgContent("操作成功", 70, "45%");
//					var iframedom = $('#extcmd')[0];
//					iframedom.src = ctx+ "/resourceModelCotroller/getExtCmd?pageNow=1&pageSize=4&modelMetricId="+cId;
//				} else {
//					setSMsgContent("操作失败", 70, "45%");
//				}
//			}
//		});
//	}
//}
// 弹出扩展指令添加页面
function getaddModelMetricExtCmd() {
	var plugin = $("#pluginProtocol",parent.document).val();
	if(plugin=="WMI&&Telnet/SSH"){
		plugin="WMI";
	}
	var cId = $("#c_Id",parent.document).val();
	if(typeof(cId)=="undefined") {
		cId = $("#metricId",parent.document).val();
	}
	if(cId==""||cId==null) {
		parent.setBMsgContent("prompt_warning", "warning_content", "请先保存指标信息，在添加扩展指标信息", "",
				parent.msgHide, 200, 400, true);
	}else {
		$.post(ctx + "/resourceModelCotroller/getaddModelMetricExtCmd?pluginProtocol="+plugin, function(
				data) {
				parent.myAlert( {
				title : '添加扩展指标信息',
				msg : data,
				type : 'alertadd',
				width : 554,
				height : 230,
				outAlert:109
			});
		});
	}
}
//判断Sysoid不能为空
function checkSysoid() {
	var extSysoid = $("#extSysoid").val();
	if (extSysoid == null || extSysoid=="") {
		falseCss("extSysoid", "sysoid不能为空", true, -10);
		return false;
	} 
	trueCss("extSysoid");
	return true;
}
// 添加扩展指标操作
function addExtCmd(){
	var cId = $("#c_Id").val();
	if(typeof(cId)=="undefined") {
		cId = $("#metricId").val();
	}
	var ajax_url = ctx + "/resourceModelCotroller/addExtCmd?modelmetricId="+ cId;
	var ajax_type = $("#modelmetricextcmd").attr('method');
	var ajax_data = $("#modelmetricextcmd").serialize();
	var plugin = $("#pluginProtocol").val();
	if(plugin=="WMI&&Telnet/SSH"){
		plugin="WMI";
	}
	if(plugin=="WMI"||(plugin=="JDBC")){
		// 提交信息
		$.ajax( {
			type : ajax_type, // 设置ajax方法提交数据的形式
			url : ajax_url,// ajax_data,
			data : ajax_data,// 输入框writer中的值作为提交的数据
			async : false,// 表示该ajax为同步的方式
			success : function(msg) {
				if (msg == "ok") {
					setSMsgContent("操作成功", 70, "45%");
					closeAlert("alertadd");
					var iframedom = $('#extcmd')[0];
					iframedom.src = ctx+ "/resourceModelCotroller/getExtCmd?pageNow=1&pageSize=4&modelMetricId="+cId;
				} else {
					setSMsgContent("操作失败", 70, "45%");
					var iframedom = $('#extcmd')[0];
					iframedom.src = ctx+ "/resourceModelCotroller/getExtCmd?pageNow=1&pageSize=4&modelMetricId="+cId;
				}
			}
		});
	}else{
		if (checkSysoid()) {
			// 提交信息
			$.ajax( {
				type : ajax_type, // 设置ajax方法提交数据的形式
				url : ajax_url,// ajax_data,
				data : ajax_data,// 输入框writer中的值作为提交的数据
				async : false,// 表示该ajax为同步的方式
				success : function(msg) {
					if (msg == "ok") {
						setSMsgContent("操作成功", 70, "45%");
						closeAlert("alertadd");
						var iframedom = $('#extcmd')[0];
						iframedom.src = ctx+ "/resourceModelCotroller/getExtCmd?pageNow=1&pageSize=4&modelMetricId="+cId;
					} else {
						setSMsgContent("操作失败", 70, "45%");
						var iframedom = $('#extcmd')[0];
						iframedom.src = ctx+ "/resourceModelCotroller/getExtCmd?pageNow=1&pageSize=4&modelMetricId="+cId;
					}
				}
			});
		}
	}
	
}

//扩展指标全选取消
function checkAllExtCmd() {
	var allCk = document.getElementById("ckall1");
	var names = document.getElementsByName("ck1");
	for ( var i = 0; i < names.length; i++) {
		if (allCk.checked == true) {
			names[i].checked = true;
		} else {
			names[i].checked = false;
		}
	}
	$("input[name='ck1']")
			.click(
					function() {
						$("input[name='ck1']:checked").length == $("input[name='ck1']").length ? $(
								"#ckall1").prop("checked", true)
								: $("#ckall1").prop("checked", false);
					});
}

//删除扩展指标前判断
function predeleteExtCmd() {
	var i;
	var idArray = new Array();
	var arr = document.getElementsByName("ck1");
	for (i = 0; i < arr.length; i++) {
		if (arr[i].type == "checkbox" && arr[i].checked) {
			idArray.push(arr[i].value);
		}
	}
	if (idArray.length == 0) {
		parent.setBMsgContent("prompt_warning", "warning_content", "请选择您要删除的记录", "",
				parent.msgHide, 200, 400, true);
		$("form_div")
				.append(
						"<div class='bg' style='float:left;background:#000;' id='bgprompt_warning'></div>");
	} else {
		parent.setBMsgContent("prompt_warning", "warning_content",
				"确定删除选中记录吗？该操作不能恢复", deleteExtCmd, parent.msgHide, 200, 400, false);
		$("form_div")
				.append(
						"<div class='bg' style='float:left;background:#000;' id='bgprompt_warning'></div>");
	}
}
// 删除扩展指标管理（点击删除按钮）
function deleteExtCmd() {
	var i;
	var idArray = new Array();
	var arr = document.getElementsByName("ck1");
	for (i = 0; i < arr.length; i++) {
		if (arr[i].type == "checkbox" && arr[i].checked) {
			idArray.push(arr[i].value);
		}
	}
	var cId = $("#c_Id",parent.document).val();
	if(typeof(cId)=="undefined") {
		cId = $("#metricId",parent.document).val();
	}
	var ajax_url = ctx + "/resourceModelCotroller/deleteExtCmd?idArray="
			+ idArray.toString();
	var ajax_type = $("#form1").attr('method');
	var ajax_data = $("#form1").serialize();
	$.ajax( {
				type : ajax_type,
				url : ajax_url,
				data : ajax_data,
				async : false,// 表示该ajax为同步的方式
				success : function(msg) {
					if (msg == "ok") {
						parent.setSMsgContent("操作成功", 70, "45%");
						parent.msgHide();
						var iframedom = $('#extcmd',parent.document)[0];
						iframedom.src = ctx+ "/resourceModelCotroller/getExtCmd?pageNow=1&pageSize=4&modelMetricId="+cId;
					} else {
						parent.setSMsgContent("操作失败", 70, "45%");
						var iframedom = $('#extcmd')[0];
						iframedom.src = ctx+ "/resourceModelCotroller/getExtCmd?pageNow=1&pageSize=4&modelMetricId="+cId;
					}
				}
			});
}


//弹出指标修改页面
function showdetail(id) {
//	$("#cId").val(id);
	$.post(ctx + "/resourceModelCotroller/getModelMetricDetail?c_id=" + id, function(data) {
		myAlert({
			title : '编辑',
			msg : data,
			type : 'alertshow',
			width : 700,
			height : 500
		});
	});
}
//修改指标信息
function updatemodelparam(id) {
	var ModelId=$("#ModelId",parent.document).val().replace(/(\s*$)/g,""); 
	var ajax_url = ctx + "/resourceModelCotroller/updateModelMetric?c_id="+id;
	var ajax_type = $("#addmetric").attr('method');
	var ajax_data = $("#addmetric").serialize();
	$.ajax( {
			type : ajax_type,
			url : ajax_url,
			data : ajax_data,
			success : function(msg) {
			if (msg == "ok") {
				parent.setSMsgContent("操作成功", 70, "45%");
				closeAlert('alertshow');
				var iframedom = $('#modelmetric',parent.document)[0];
				iframedom.src = ctx
						+ "/resourceModelCotroller/getModelMetric?pageNow=1&modelId="
						+ ModelId;
			} else {
				parent.setSMsgContent("操作失败", 70, "45%");
				var iframedom = $('#modelmetric',parent.document)[0];
				iframedom.src = ctx + "/resourceModelCotroller/getModelMetric?pageNow=1&modelId="+ModelId;
			}
		}
	});
}