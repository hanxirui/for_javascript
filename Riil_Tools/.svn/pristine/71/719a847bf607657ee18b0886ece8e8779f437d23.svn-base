var setting = {
	check : {
		enable: true,
		chkStyle: "checkbox",
		chkboxType: { "Y": "", "N": "" }
	},
	view : {
		showLine : false
	},
	data : {
		simpleData : {
			enable : true
		}
	},
	callback : {
		onClick : zTreeOnClick,
		onCheck: zTreeOnCheck
	}
};
//类型树对象
var zTreeObj = "";
var tlevel = "";
var tid = "";
var ttype="";
var operatorId="";
var userId=$("#userId").val();
//每次点击的树节点
var treeNodeClick='';
function zTreeOnCheck(event, treeId, treeNode) {
	tlevel = treeNode.level;
	tid = treeNode.id;
	var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
	var nodes = treeObj.getCheckedNodes(true);
};
//点击树节点时出发的函数
function zTreeOnClick(event, treeId, treeNode) {
	// 二级节点信息，显示
//	console.info("modelType="+treeNode.modelType);
//	console.info(treeNode);
	operatorId =treeNode.operatorId;
	if (treeNode.modelType!="model") {
		var iframedom = $('#model_add')[0];
		iframedom.src = ctx+ "/resourceModelTypeCotroller/getResourceModelTypeDetail?id="+ treeNode.id+"&operatorId="+operatorId+"&level="+treeNode.level;
	}
	if (treeNode.modelType=="model") {
		var iframedom = $('#model_add')[0];
		iframedom.src = ctx + "/resourceModelCotroller/resourceModelDetail?id="+ treeNode.id+"&operatorId="+operatorId;
	}
	tlevel = treeNode.level;
	tid = treeNode.id;
	treeNodeClick=treeNode;
	ttype=treeNode.modelType;
};
//初始化树对象
$(document).ready(function() {
	$.ajax({
		url : ctx + "/resourceModelTreeController/getModelTree",
		data : "",
		type : "post",
		dataType : "json",
		success : function(data) {
			var zNodes = data.treeJson;
			zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
		}
	});
});
var index={
	manufClick : function(obj) {
		$("a[name='maunf_management']").each(function() {
			$(this).removeClass("txt_on");
		});
		$("a[name='maunf_management']").each(function() {
			if (obj["title"] == $(this).attr("title")) {
				$(this).addClass("txt_on");
			}
		});
		var iframedom = $('#model_add')[0];
		if (obj["title"] == "manuf_manage") {
			iframedom.src = ctx + "/manufController/turnManufPage";

		}
	},
	copyPage:function(ttype,tid){
		//alert(ttype)
		var tag="copy";
		if (ttype!="model") {
			var iframedom = $('#model_add')[0];
			iframedom.src = ctx
					+ "/resourceModelTypeCotroller/copyResourceModelTypeDetail?id="
					+ tid+"&operatorId="+operatorId+"&tag="+tag+"&level="+tlevel;
		}
		if (ttype=="model") {
			var iframedom = $('#model_add')[0];
			iframedom.src = ctx + "/resourceModelCotroller/copyResourceModelDetail?id="
					+ tid+"&operatorId="+operatorId+"&tag="+tag;
		}
	},
	addPage : function(tlevel, tid) {
		//点击的节点是模型节点
		if(treeNodeClick.modelType=="model"){
			var iframedom = $('#model_add')[0];
			iframedom.src = ctx + "/resourceModelCotroller/getResourceModelAdd?pId=" + tid;
		}
		//点击的节点是模板节点
		if(treeNodeClick.modelType==undefined||treeNodeClick.modelType=="temp"){
			$.post(ctx + "/resourceModelCotroller/addTempModel?pId=" + tid, function(data) {
				myAlert({
					title : '添加模型模板',
					msg : data,
					type : 'alert',
					width : 500,
					height : 75
				});
			});
			
		}
	},
	addModel:function(){
		var iframedom = $('#model_add')[0];
		iframedom.src = ctx + "/resourceModelCotroller/getResourceModelAdd?pId=" + tid;
		
	},
	addTemp:function(){
		var iframedom = $('#model_add')[0];
		iframedom.src = ctx + "/resourceModelTypeCotroller/getResourceModelTypeAdd?pId="+ tid;
	},
	del : function() {
		var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
		//勾选的节点
		var nodes = treeObj.getCheckedNodes(true);
		var nodeData = new Array();
		var data="[{\"id\":\""+nodes[0].id+"\",\"modelType\":\""+nodes[0].modelType+"\"}";
		for(var i=1;i<nodes.length;i++){
			data+=",{\"id\":\""+nodes[i].id+"\",\"modelType\":\""+nodes[i].modelType+"\"}"
			/*var data = {
					'id':nodes[i].id,
					'modelType':nodes[i].modelType
			}
			nodeData.push(data);*/
		}
		data+="]";
//		console.log(data);
//		var nodes = treeObj.getSelectedNodes();
//		var delNode=nodes[0];
//		tlevel=delNode.modelType=='model'?3:0;
		
		$.ajax({
					url : ctx+ "/resourceModelTreeController/delTreeNode?tId=" + data,
					type : "post",
					dataType : "text",
					success : function(data) {
						if (data == '1') {
							$("#treeDemo").empty();
							// 刷新数据
							$.ajax({
										url : ctx+ "/resourceModelTreeController/getModelTree",
										data : "",
										type : "post",
										dataType : "json",
										success : function(data) {
											var zNodes = data.treeJson;
											zTreeObj = $.fn.zTree.init($("#treeDemo"), setting,zNodes);
										}
									});
							setSMsgContent("操作成功", 110, "45%");
						}
					}
				});
		msgHide();
	},
	delNode : function() {
		var treeObjDel = $.fn.zTree.getZTreeObj("treeDemo");
//		var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
//		var nodes = treeObjDel.getSelectedNodes();
		var nodes = treeObjDel.getCheckedNodes(true);
		if (nodes.length == 0) {
			setBMsgContent("prompt_warning", "warning_content", "请选择您要删除的记录",
					"", msgHide, 220, 615, true);
			$("body")
					.append(
							"<div class='bg' style='float:left;background:#000;' id='bgprompt_warning'></div>");
		} else {
			setBMsgContent("prompt_warning", "warning_content",
					"确定删除选中记录吗？该操作不能恢复", index.del, msgHide, 220, 615, false);
			$("body")
					.append(
							"<div class='bg' style='float:left;background:#000;' id='bgprompt_warning'></div>");
		}
	},
	exportModelFile : function(){
		var s = "";
		var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
		var nodes = treeObj.getCheckedNodes(true);
		if(nodes==undefined || nodes.length==0){
			setSMsgContent("请选择您要导出的记录!", 135, "45%");
			return;
		}
	    for(var i=0;i<nodes.length;i++){
	        s+=nodes[i].modelId+"###";
	    }
		var form=$("<form>");//定义一个form表单
		form.attr("style","display:none");
		form.attr("target","");
		form.attr("method","post");
		form.attr("action",ctx + "/resourceModelCotroller/getdownload");
		var input1=$("<input>");
		input1.attr("type","hidden");
		input1.attr("name","exportModelFile");
		input1.attr("value",s);
		$("body").append(form);//将表单放置在web中
		form.append(input1);
		form.submit();//表单提交 	
	},
	bindExportResource : function(tlevel, tid) {
		$("#exportResource").bind(
				"click",
				function() {
					 var modelId="";
					 	var s=[]
						var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
						var nodes = treeObj.getCheckedNodes(true);
					    for(var i=0;i<nodes.length;i++){
					        s[s.length]=nodes[i].modelId;
					    }
						var frame = document.createElement("iframe");
						frame.src = ctx+ "/resourceModelCotroller/exportFile?a="+s;
						frame.style.display = "none";
						document.body.appendChild(frame);
				});
	},
	downLoad : function(tlevel, tid) {
		$.post(ctx + "/resourceModelCotroller/getModelZip", function(data) {
			myAlert({
				title : '导入 只支持单个二进制文件或zip包导入.',
				msg : data,
				type : 'alert',
				width : 600,
				height : 75
			});
		});
	}
};

function addTempModel(pId) {
	var tempModel = $("input[name='temp_model']:checked").val();
	if(tempModel=='temp'||tempModel==undefined){
		var iframedom = $('#model_add')[0];
		iframedom.src = ctx + "/resourceModelTypeCotroller/getResourceModelTypeAdd?pId="+ pId;
	}
	else{
		var iframedom = $('#model_add')[0];
		iframedom.src = ctx + "/resourceModelCotroller/getResourceModelAdd?pId=" + pId;
	}
	closeAlert("alert");
}