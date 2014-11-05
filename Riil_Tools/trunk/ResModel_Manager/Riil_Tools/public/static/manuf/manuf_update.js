$(document).ready(function(){
	var imageName = $("#fileText").attr('value');
	if(imageName != ''){
		var path = window.location.href;
		var imagePath = path.substring(0, path.indexOf('/resmodel')) + "/images/template/";
		imagePath += imageName;
		$("#image_display").attr("src", imagePath);
	}
});
function closeWin(){
	closeAlert("alert");
};
function submitMsg(){
	var imgName = $("#fileText").val();
	if(checkIdOrNameNotNull() && imgNotRepeat){
		/**上传图片*/
		$("#submitBtn").click();
		//用户的信息
		var id= $("#cId").attr('value');
		var manuf_name = $("#manuf_name").val();
		var manuf_icon = $("#fileText").val();
		if(manuf_icon != ''){
			manuf_icon = manuf_icon.substring(manuf_icon.lastIndexOf('\\') + 1,manuf_icon.length);
		}
		var manuf={
				'cManufId':id,
				'cManufName':manuf_name,
				'cManufPhoto':manuf_icon,
				'cManufIcon':manuf_icon
		};
		$.ajax({
			type:'post',
			url:ctx+"/resmodel/manufController/update",
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
}