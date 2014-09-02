function submitMsg(){
	//厂商信息
	if(checkIdOrNameNotNull() && checkMetricGroupIdRepeat()){
		var metricGroupId = $("#metricGroupId").val();
		var metricGroupName = $("#metricGroupName").val();
		var metricGroupDetail = $("#metricGroupDetail").val();
		var metricGroupInfo={
			'groupId':metricGroupId,
			'groupName':metricGroupName,
			'groupDesc':metricGroupDetail
		};
		$.ajax({
			type:'post',
			url:ctx+"/resmodel/metricGroupController/save",
			data:metricGroupInfo,
			dataType:'json',
			//async:true,//表示该ajax为同步的方式
			success:function(data){
				if(data.msg=='1'){
					var iframedom = $('#model_add', parent.document)[0];
					//setSMsgContent("操作成功", 70, "45%");
					alert('操作成功');
					iframedom.src = ctx + "/resmodel/metricGroupController/getMetricGroupManagement";
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