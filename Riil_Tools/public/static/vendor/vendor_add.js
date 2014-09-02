$(document).ready(function() {
	/**为型号设置厂商数据*/
	$.get(ctx + '/resmodel/vendorController/getAllManufInfos/', function(manufInfos) {
		$("#manuf_select").prepend("<option value=''>请选择</option>");
        for(var i = 0; i < manufInfos.data.length; i++){
            $("#manuf_select").append('<option value='+ manufInfos.data[i].c_manuf_id +'>'+ manufInfos.data[i].c_manuf_name +'</option>');
        }
	});
	/**对应模型*/
	$.get(ctx + '/resmodel/vendorController/getAllModelInfos/', function(modelInfos) {
		$("#model_select").prepend("<option value=''>请选择</option>");
		for(var i = 0; i < modelInfos.data.length; i++){
			$("#model_select").append('<option value='+ modelInfos.data[i].c_id +'>'+ modelInfos.data[i].c_name +'</option>');
		}
	});
	/**设备类型*/
	$.get(ctx + '/resmodel/vendorController/getAllDeviceInfos/', function(deviceInfos) {
		$("#device_select").prepend("<option value=''>请选择</option>");
		for(var i = 0; i < deviceInfos.data.dev.length; i++){
			$("#device_select").append('<option value='+ deviceInfos.data.dev[i].id +'>'+ deviceInfos.data.dev[i].name +'</option>');
		}
	});
});
function submitMsg(){
	if(checkIdRepeat() && checkNameRepeat() && checkIdOrNameNotEmpty()){
		var sysoid = $("#sysoid").val();
		var vendorName = $("#vendor_name").val();
		var series = $("#series").val();
		var manufID = $('#manuf_select option:selected').val();
		var manufName = $('#manuf_select option:selected').text();
		var modelID = $("#model_select option:selected").val();
		var deviceId = $("#device_select option:selected").val();
		var deviceName = $("#device_select option:selected").text();
		var vendorInfo = {
			'sysoid' : sysoid,
			'number' : vendorName,
			'series' : series,
			'manufID' : manufID,
			'manufName' : manufName,
			'modelID' : modelID,
			'deviceId' : deviceId,
			'deviceName' : deviceName
		};
		$.ajax({
			type : 'post',
			url : ctx+"/resmodel/vendorController/save",
			data : vendorInfo,
			dataType : 'json',
			//async:true,//表示该ajax为同步的方式
			success : function(data){
				if(data.msg=='1'){
					var iframedom = $('#model_add', parent.document)[0];
					//setSMsgContent("操作成功", 70, "45%");
					alert('操作成功');
					iframedom.src = ctx + "/resmodel/vendorController/getVendorManagement";
					closeWin();
				}else{
					alert("操作失败");
					closeWin();
				}
			},
			error:function(){
				alert("操作失败");
				closeWin();
			}
		});
	}
};