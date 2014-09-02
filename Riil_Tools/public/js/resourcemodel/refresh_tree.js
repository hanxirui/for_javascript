var setting = {
	view : {
		showLine : false
	},
	data : {
		simpleData : {
			enable : true
		}
	},
	callback:{
		onClick: zTreeOnClick
	}
};
var tlevel="";
var tid="";

function zTreeOnClick(event, treeId, treeNode) {
	if(treeNode.level==0){
		var iframedom = $('#model_add',parent.document)[0];
		iframedom.src = ctx+"/resourceModelMainTypeCotroller/selectModelMainDetail?id="+treeNode.id;
	}
	if(treeNode.level==1){
		var iframedom = $('#model_add',parent.document)[0];
		iframedom.src = ctx+"/resourceModelMainTypeCotroller/selectModelMainDetail?id="+treeNode.id;
	}
	//二级节点信息，显示
	if(treeNode.level==2){
		var iframedom = $('#model_add',parent.document)[0];
		iframedom.src = ctx+"/resourceModelTypeCotroller/getResourceModelTypeDetail?id="+treeNode.id;
	}
	if(treeNode.level==3){
		var iframedom = $('#model_add',parent.document)[0];
		iframedom.src = ctx+"/resourceModelCotroller/resourceModelDetail?id="+treeNode.id;
	}
	tlevel=treeNode.level;
	tid=treeNode.id;
};
var index={
		addPage:function(tlevel,tid){
			if(tlevel==0){
				var iframedom = $('#model_add',parent.document)[0];
				iframedom.src = ctx+"/resourceModelMainTypeCotroller/getResourceModelMainTypeAdd?pId="+tid;
			}
			if (tlevel==1) {
				var iframedom = $('#model_add',parent.document)[0];
				iframedom.src = ctx+"/resourceModelTypeCotroller/getResourceModelTypeAdd?pId="+tid;
			}
			if(tlevel==2){
				var iframedom = $('#model_add',parent.document)[0];
				iframedom.src = ctx+"/resourceModelCotroller/getResourceModelAdd";
			}
		},
		del:function(){
			$.ajax({
			url :ctx+"/resourceModelTreeController/delTreeNode?tLevel="+tlevel+"&tId="+tid,// ctx+"/resourceModelTreeController/getModelTree",
			type : "post",
			dataType : "text",
			success : function(data) {
				if(data=='1'){
					$("#treeDemo").empty();
					//刷新数据
					$.ajax({
						url : ctx+"/resourceModelTreeController/getModelTree",
						data : "",
						type : "post",
						dataType : "json",
						success : function(data) {
							var zNodes = data.treeJson;
							$.fn.zTree.init($("#treeDemo"), setting, zNodes);
						}
					});
				}
			}
		});
			msgHide();
		},
		delNode:function(){
			var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
			var nodes = treeObj.getSelectedNodes();
			if(nodes.length==0){
				setBMsgContent("prompt_warning", "warning_content", "请选择您要删除的记录", "",msgHide, 200, 290, true);
				$("body").append("<div class='bg' style='float:left;background:#000;' id='bgprompt_warning'></div>");
			}
			else{
				setBMsgContent("prompt_warning", "warning_content","确定删除选中记录吗？该操作不能恢复", index.del, msgHide, 200, 290, false);
				$("body").append("<div class='bg' style='float:left;background:#000;' id='bgprompt_warning'></div>");
			}
		},
		bindExportResource:function(tlevel,tid){
			$("#exportResource",parent.document).bind("click",function(){
				if(tlevel!=2){
					alert("不能导出父节点");
					return;
				}else{
					PageCtrl.winOpen({
						height : 300,
						width : 500,
						url : ctx+"/resourceModelCotroller/exportResorce&id="+tid,
						name : "res_data_export_part"
					});
				}
			});
		}
		
};


