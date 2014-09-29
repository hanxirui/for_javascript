
var vendorTable = null;
var login_userName = $(window.parent.document).find('input[id=userId]').val();
$(document).ready(function() {
	if(tab !== ''){
		$("#" + tab).click();
	}else{
		$("#tabs1").click();
	}
	/**init jquery table*/
	var table = $('#manufTable').dataTable({
		"oLanguage": GIRD_I18N,
		"bFilter": false,
		"bLengthChange": false,
		"bAutoWidth": true,
		"bProcessing": true,
		"aLengthMenu": [22],
		"ajax": ctx + "/resmodel/manufController/getAllManufInfos",
		/*"aaData" : JSON.parse(data),*/
		"initComplete": initCheckBox,
		"columns": [
			{
				"aDataSort": false,
				"data": "c_id",
				"render": function(data, type, row) {
					if(row.flag === '1'){
						if(login_userName === 'admin' ){
							return '<input type="checkbox" name="cb" value ="' + data + '" >';
						}else if(row.c_operator !== login_userName){
							return '<input type="checkbox" name="cb" value ="' + data + '" disabled="disabled" >';
						}else{
							return '<input type="checkbox" name="cb" value ="' + data + '" >';
						}
					}else{
						return '<input type="checkbox" name="cb" value ="' + data + '" disabled="disabled" >';
					}
					
				}
			},{
				"data": "c_manuf_name",
				"render": function(data, type, row) {
					if(row.flag === '1'){
						if(login_userName === 'admin' ){
							return '<a val="' + row.c_id + '" title="' + data + '" onclick="manufManager.popManufAlterPage(this)" >' + data + '</a>';
						}else if(row.c_operator !== login_userName){
							return '<span val="' + row.c_id + '" title="' + data + '">' + data + '</span>';
						}else{
							return '<a val="' + row.c_id + '" title="' + data + '" onclick="manufManager.popManufAlterPage(this)" >' + data + '</a>';
						}
					}else{
						return '<span val="' + row.c_id + '" title="' + data + '">' + data + '</span>';
					}
					
				}
			},{
				"data": "c_operator"
			}
		]

	});
	/**为型号设置厂商数据*/
	$.get(ctx + '/resmodel/manufController/getAllManufInfos/', function(manufInfos) {
		$("#select").prepend("<option value=''>请选择</option>");
		for(var i = 0; i < manufInfos.data.length; i++){
			$("#select").append('<option value='+ manufInfos.data[i].c_manuf_id +'>'+ manufInfos.data[i].c_manuf_name +'</option>');
		}
	});
	/**加载型号table*/
	vendorTable = $('#vendorTable').dataTable({
		"oLanguage": GIRD_I18N,
		"bFilter": false,
		"bLengthChange": false,
		"bAutoWidth": true,
		"bProcessing": true,
		"aLengthMenu": [22],
		"ajax": ctx + "/resmodel/vendorController/getAllVendorInfos",
		"initComplete": initCheckBoxVendor,
		"columns": [
			{
				"aDataSort": false,
				"data": "c_id",
				"render": function(data, type, row) {
					if(row.flag === '1'){
						if(login_userName === 'admin' ){
							return '<input type="checkbox" name="cbVendor" value ="' + data + '" >';
						}else if(row.c_operator !== login_userName){
							return '<input type="checkbox" name="cbVendor" value ="' + data + '" disabled="disabled" >';
						}else{
							return '<input type="checkbox" name="cbVendor" value ="' + data + '" >';
						}
					}else{
						return '<input type="checkbox" name="cbVendor" value ="' + data + '" disabled="disabled" >';
					}
				}
			},{
				"data": "c_vendor_oid",
				"render": function(data, type, row) {
					if(row.flag === '1'){
						if(login_userName === 'admin' ){
							return '<a val="' + row.c_vendor_oid + '" title="' + data + '" onclick="vendorManager.popVendorAlterPage(this)" >' + data + '</a>';
						}else if(row.c_operator !== login_userName){
							return '<span val="' + row.c_vendor_oid + '" title="' + data + '" >' + data + '</span>';
						}else{
							return '<a val="' + row.c_vendor_oid + '" title="' + data + '" onclick="vendorManager.popVendorAlterPage(this)" >' + data + '</a>';
						}
					}else{
						return '<span val="' + row.c_vendor_oid + '" title="' + data + '" >' + data + '</span>';
					}
				}
			},{
				"data": "c_model_number",
				"render": function (data, type, row){
					return '<span title="' + data + '">'+ data +'</span>';
				}
			},{
				"data": "c_series",
				"render": function (data, type, row){
					return '<span title="' + data + '">'+ data +'</span>';
				}
			},{
				"data": "c_vendor_name"
			},{
				"data": "c_name"
			},{
				"data": "C_DEV_NAME"
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
				if(names[i].value !== '' && !names[i].disabled){
					names[i].checked = true;
				}
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
function initCheckBoxVendor() {
	$('#allVendor').bind('click', function() {
		var allCk = document.getElementById("allVendor");
		var names = document.getElementsByName("cbVendor");
		for (var i = 0; i < names.length; i++) {
			if (allCk.checked == true) {
				if(names[i].value !== '' && !names[i].disabled){
					names[i].checked = true;
				}
			} else {
				names[i].checked = false;
			}
		}
	});

	$('input:checkbox[id!="allVendor"]').click(function() {
		$("input[name='cbVendor']:checked").length == $("input[name='cbVendor']").length ?
			$("#allVendor").prop("checked", true) : $("#allVendor").prop("checked", false);
	});
};
/**管理 添加、修改、删除*/
var manufManager = {
	popManufAddPage: function() {
		$.get(ctx + "/resmodel/manufController/addManufInfo", function(data) {
			myAlert({
				title: '添加厂商信息',
				msg: data,
				type: 'alert',
				width: 602,
				height: 350
			});
		});
	},
	delManufMsg: function() {
		var delManufInfos = [];
		var oragin_infos = false;
		$("input[name='cb']:checked").each(function(i, e) {
			if($(e).val() === ''){
				oragin_infos = true;
			}
			delManufInfos.push($(e).val());
		});
		if(oragin_infos){
			alert("所选信息中包含系统预置信息不能删除");
		}else{
			if (delManufInfos.length == 0) {
				alert("请选择您要删除的记录");
			} else {
				var r = confirm("确定要删除所选记录吗？");
				if(r == true){
					manufManager.sureDeleteManufMsg();
				}
			}
		}
		
	},
	sureDeleteManufMsg: function() {
		var msg = '';
		var delManufInfos = [];
		$("input[name='cb']:checked").each(function(i, e) {
			delManufInfos.push($(e).val());
		});
		$.ajax({
			type: 'post',
			url: ctx + "/resmodel/manufController/delete",
			data: {
				manuf_ids: delManufInfos
			},
			dataType: 'json',
			success: function(data) {
				if (data.msg == '1') {
					msg = "操作成功";
					var iframedom = $('#model_add', parent.document)[0];
					iframedom.src = ctx + "/resmodel/manufController/getManufManagement";
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
	popManufAlterPage: function(obj) {
		var manufId = $(obj).attr('val');
		$.get(ctx + '/resmodel/manufController/updatePre/' + manufId, function(data) {
			myAlert({
				title: '编辑厂商信息',
				msg: data,
				type: 'alert',
				width: 602,
				height: 350
			});
		});
	},
	onblur: function(){
		var val = $("#textfield").val();
		if(val == ''){
			$("#textfield").val('请输入指标型号进行搜索');
		}
	},
	onfocus: function(){
		var val = $("#textfield").val();
		if(val === '请输入指标型号进行搜索'){
			$("#textfield").val('');
		}
	}
};
/**管理 添加、修改、删除厂商型号信息*/
var vendorManager = {
	popDeviceAddPage: function() {
		$.get(ctx + "/resmodel/vendorController/addVendorInfo", function(data) {
			myAlert({
				title: '添加厂商型号信息',
				msg: data,
				type: 'alert',
				width: 602,
				height: 350
			});
		});
	},
	/**删除操作*/
	delvendorInfos : function(){
		var delVendorInfos = [];
		$("input[name='cbVendor']:checked").each(function(i, e) {
			delVendorInfos.push($(e).val());
		});
		if (delVendorInfos.length == 0) {
			alert("请选择您要删除的记录");
		} else {
			var r = confirm("确定要删除所选记录吗？");
			if(r == true){
				vendorManager.sureDeleteVendorInfos();
			}
		}
	},
	sureDeleteVendorInfos: function() {
		var msg = '';
		var delVendorInfos = [];
		$("input[name='cbVendor']:checked").each(function(i, e) {
			delVendorInfos.push($(e).val());
		});
		$.ajax({
			type: 'post',
			url: ctx + "/resmodel/vendorController/delete",
			data: {
				vendorIds: delVendorInfos
			},
			dataType: 'json',
			success: function(data) {
				if (data.msg == '1') {
					msg = "操作成功";
					/*var iframedom = $('#model_add', parent.document)[0];
					iframedom.src = ctx + "/resmodel/manufController/getManufManagement";*/
					alert(msg);
					$.ajax({
							type : 'get',
							url : ctx+"/resmodel/vendorController/getAllVendorInfos",
							//async:true,//表示该ajax为同步的方式
							success : function(data){
								vendorTable.fnClearTable();
								if(data.data.length > 0){
									vendorTable.fnAddData(data.data);
								}
							},
							error:function(){
								alert("操作失败");
								closeWin();
							}
					});
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
	searchVendorInfos : function(){
		var manufID = $('#select option:selected').val();
		var number = $('#textfield').val();
		if(number =='请输入指标型号进行搜索' || number == ''){
			number = "";
		}
		var vendorInfo = {
			'manufID' : manufID,
			'number' : number
		};
		$.ajax({
				type : 'get',
				url : ctx+"/resmodel/vendorController/queryVendorInfos",
				data : vendorInfo,
				dataType : 'json',
				//async:true,//表示该ajax为同步的方式
				success : function(data){
					vendorTable.fnClearTable();
					if(data.data.length > 0){
						vendorTable.fnAddData(data.data);
					}
				},
				error:function(){
					alert("操作失败");
					closeWin();
				}
		});
	},
	/**修改厂商型号*/
	popVendorAlterPage: function(obj) {
		var vendorId = $(obj).attr('val');
		$.get(ctx + '/resmodel/vendorController/updatePre/' + vendorId, function(data) {
			myAlert({
				title: '编辑厂商型号信息',
				msg: data,
				type: 'alert',
				width: 602,
				height: 350
			});
		});
	}
};

