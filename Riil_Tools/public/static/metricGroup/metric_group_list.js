var login_userName = $(window.parent.document).find('input[id=userId]').val();
$(document).ready(function() {
	/**init jquery table*/
	var table = $('#metricGroupTable').dataTable({
		"oLanguage": GIRD_I18N,
		"bFilter": false,
		"bLengthChange": false,
		"aLengthMenu": [13],
		"bAutoWidth": true,
		"ajax": ctx + "/resmodel/metricGroupController/getAllMetricGroupInfos",
		/*"aaData" : JSON.parse(data),*/
		"initComplete": initCheckBox,
		"columns": [
			{
				"aDataSort": false,
				"data": "groupId",
				"render": function(data, type, row) {
					return '<input type="checkbox" name="cb" value ="' + data + '" >';
				}
			},{
				"data": "groupId"
			},{
				"data": "groupName",
				"render": function(data, type, row) {
					return '<a val="' + row.groupId + '" title="' + data + '" onclick="metricGroupManager.popMetricGroupAlterPage(this)" >' + data + '</a>';
				}
			},{
				"data": "groupDesc"
			}
		]

	});
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
/**管理 添加、修改、删除*/
var metricGroupManager = {
	popMetricAddPage: function() {
		$.get(ctx + "/resmodel/metricGroupController/addMetricGroupInfo", function(data) {
			myAlert({
				title: '添加指标组信息',
				msg: data,
				type: 'alert',
				width: 602,
				height: 350
			});
		});
	},
	delMetricGroupMsg: function() {
		var delMetricGroupInfos = [];
		var oragin_infos = false;
		$("input[name='cb']:checked").each(function(i, e) {
			if($(e).val() === ''){
				oragin_infos = true;
			}
			delMetricGroupInfos.push($(e).val());
		});
		if(oragin_infos){
			alert("所选信息中包含系统预置信息不能删除");
		}else{
			if (delMetricGroupInfos.length == 0) {
				alert("请选择您要删除的记录");
			} else {
				var r = confirm("确定要删除所选记录吗？");
				if(r == true){
					metricGroupManager.sureDeleteMetricGroupMsg();
				}
			}
		}
		
	},
	sureDeleteMetricGroupMsg: function() {
		var msg = '';
		var delMetricGroupInfos = [];
		$("input[name='cb']:checked").each(function(i, e) {
			delMetricGroupInfos.push($(e).val());
		});
		$.ajax({
			type: 'post',
			url: ctx + "/resmodel/metricGroupController/delete",
			data: {
				ids: delMetricGroupInfos
			},
			dataType: 'json',
			success: function(data) {
				if (data.msg == '1') {
					msg = "操作成功";
					var iframedom = $('#model_add', parent.document)[0];
					iframedom.src = ctx + "/resmodel/metricGroupController/getMetricGroupManagement";
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
	},
	/**修改厂商*/
	popMetricGroupAlterPage: function(obj) {
		var metricGroupId = $(obj).attr('val');
		$.get(ctx + '/resmodel/metricGroupController/updatePre/' + metricGroupId, function(data) {
			myAlert({
				title: '编辑指标组信息',
				msg: data,
				type: 'alert',
				width: 602,
				height: 350
			});
		});
	}
};