function closeWin(){
	closeAlert("alert");
};
function submitMsg(){
	var imgName = $("#fileText").val();
	//厂商信息
	if(checkIdOrNameNotNull() && imgNotRepeat){
		/**上传图片*/
		$("#submitBtn").click();
		var manuf_name = $("#manuf_name").val();
		var manuf_icon = $("#fileText").val();
		if(manuf_icon !== ''){
			manuf_icon = manuf_icon.substring(manuf_icon.lastIndexOf('\\') + 1,manuf_icon.length);
		}
		var manuf={
			'cManufName':manuf_name,
			'cManufPhoto':manuf_icon,
			'cManufIcon':manuf_icon
		};
		$.ajax({
			type:'post',
			url:ctx+"/resmodel/manufController/save",
			data:manuf,
			dataType:'json',
			//async:true,//表示该ajax为同步的方式
			success:function(data){
				if(data.msg=='1'){
					table.fnClearTable();
		            $.ajax({
		              type: 'get',
		              url: ctx + "/resmodel/manufController/getAllManufInfos",
		              success: function(data) {
		                table.fnAddData(data.data);
		              },
		              error: function() {
		                alert("操作失败");
		              }
		            });
		            alert('操作成功');
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