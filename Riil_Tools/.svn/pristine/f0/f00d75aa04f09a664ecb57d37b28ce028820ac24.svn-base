/*$(document).ready(function(){
	
	var pageSize = $("#manuf_info_page_count").val();
	if(pageSize=="0"){
		$("#manuf_info_data_page").hide();
	}
	
});*/


var manufInfo={
		addManufMsg:function(){
			/*var iframedom = $('#model_add',parent.parent.document)[0];
			iframedom.src = ctx+"/manufController/turnManufPage";*/
			parent.manufHome.showTab('tabs2','tabContent2');
		},
		alterMdoelMsg:function(sysoid){
			$.post(ctx+"/manufController/alterModelManageMsgPage?cModelSysoid="+sysoid, function(data) {
				myAlert({
					title : '修改型号信息',
					msg : data,
					type : 'alert',
					width : 626,
					height : 299
				});
			});
		},
		submitMsg:function(){
			var modelSysoid=$("#model_sysoid_detail").val();
			var modelNum=$("#model_num_detail").val();
			var modelSeries=$("#model_series_detail").val();
			var modelManufName=$("#modle_manuf_name_detail").val();
			var modelMod=$("#modelIdBindSysoid").val();
			var modelModName=$("#citySel_detail").val();
			var modelType=$("#model_type_detail").val();
			var modelInfo={
					'cModelSysoid':modelSysoid,
					'cModelNumber':modelNum,
					'cModelSeries':modelSeries,
					'cModelManufName':modelManufName,
					'cModelMod':modelMod,
					'cModelModName':modelModName,
					'cModelType':modelType
			};
			$.ajax({
				type:'post',
				url:ctx+"/manufController/alterModelManageMsg",
				data:modelInfo,
				dataType:'text',
				async:false,//表示该ajax为同步的方式
				success:function(data){
					if(data>0){
						closeAlert("alert");
						parent.setSMsgContent("操作成功", 70, "45%");
						var iframedom = $("#manuf_info",parent.document)[0];
						iframedom.src = ctx+"/manufController/manufInfo";
					}
					else{
						parent.setSMsgContent("操作失败", 70, "45%");
						var iframedom = $("#manuf_info",parent.document)[0];
						iframedom.src = ctx+"/manufController/manufInfo";
					}
					manufInfo.resetMsg();
					
				}
			});
			
		},
		resetMsg:function(){
			closeAlert("alert");
		}
};

	var setting = {
		view: {
			dblClickExpand: false
		},
		data: {
			simpleData: {
				enable: true
			}
		},
		callback: {
			beforeClick: beforeClick,
			onClick: onClick
		}
	};


	function beforeClick(treeId, treeNode) {
//		var check = (treeNode && !treeNode.isParent);
		var flag=true;
		//alert(treeNode.modelType);
		if (treeNode.modelType=="temp"){
			setSMsgContent("只能选择模型节点", 110, "45%"); 
			flag=false;
		}
		return flag;
	}
	
	function onClick(e, treeId, treeNode) {
		alert(1);
		var zTree = $.fn.zTree.getZTreeObj("treeDemo");
		nodes = zTree.getSelectedNodes();
		alert(2);
		alert(nodes);
		v = "";
		id = "";
		nodes.sort(function compare(a,b){return a.id-b.id;});
		for (var i=0, l=nodes.length; i<l; i++) {
			id += nodes[i].id + ",";
			v += nodes[i].name + ",";
		}
		if (id.length > 0 ) id = id.substring(0, id.length-1);
		if (v.length > 0 ) v = v.substring(0, v.length-1);
		var cityObj = $("#citySel_detail");
		cityObj.attr("value", v);
		$("#modelIdBindSysoid").val(id);
	}

	function showMenu() {
		var cityObj = $("#citySel_detail");
		var cityOffset = $("#citySel_detail").offset();
		$("#menuContent").css({left:cityOffset.left + "px", top:cityOffset.top + cityObj.outerHeight() + "px"}).slideDown("fast");

		$("body").bind("mousedown", onBodyDown);
	}
	function hideMenu() {
		$("#menuContent").fadeOut("fast");
		$("body").unbind("mousedown", onBodyDown);
	}
	function onBodyDown(event) {
		if (!(event.target.id == "menuBtn" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length>0)) {
			hideMenu();
		}
	}
	
	

