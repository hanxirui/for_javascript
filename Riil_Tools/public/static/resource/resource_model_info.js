var resourceModelId='';
$(document).ready(function(){
	//初始化模型id
	resourceModelId=$("#ModelId").val();
	/*var iframedom = $('#model_param')[0];
	iframedom.src = ctx+"/resourceModelCotroller/modelParam?pageNow=1&modelId="+modelId;*/
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
	
});
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

var pNodeId;
function beforeClick(treeId, treeNode) {
//	var check = (treeNode && !treeNode.isParent);
	var check = true;
//	if(treeNode.level==0||treeNode.level==1||treeNode.level==4){
//		alert("模型只能新建在三级模版或者主模型下");
//		return false;
//	}
	if(treeNode.modelType=="temp"){
		setSMsgContent("只能选择模型节点", 110, "45%");
		return false;
	}
	return check;
}
function onClick(e, treeId, treeNode) {
	var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
	nodes = zTree.getSelectedNodes(),
	v = "";
	nodes.sort(function compare(a,b){return a.id-b.id;});
	for (var i=0, l=nodes.length; i<l; i++) {
		v += nodes[i].name + ",";
	}
	if (v.length > 0 ) v = v.substring(0, v.length-1);
	var cityObj = $("#citySel");
	cityObj.attr("value", v);
	pNodeId=treeNode.id;
}

function showMenu() {
	var cityObj = $("#citySel");
	var cityOffset = $("#citySel").offset();
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
function checkModelId() {
	var modelId = $('#ModelId').val();
	var reg=/^RIIL_RMM_.*$/;   
	if(!reg.test(modelId)){
		falseCss("ModelId","ID必须以RIIL_RMM_开头",true,-10);
		return false;
	}
	else{
		trueCss("ModelId");
		return true;
	}
}
function submitModelInfo(){
	
	var modelId = $("#ModelId").val();
	var modelName = $("#ModelName").val();
	var modelNameEn = $("#ModelNameEn").val();
	var modelDesc = $("#ModelDesc").val();
	var modelType = $("#ModelType").val();
	var isSnmpModel = $("input[name='IsSnmpModel']:checked").val();
	var isMainModel = $("input[name='IsMainModel']:checked").val();//$("#IsMainModel").val();
	var mainModel = $("#citySel").val();
	if( $("#citySel").val()==null||$("#citySel").val()==""){
		var parentTreeId = $("#ParentTreeId").val();
	}else{
		var parentTreeId = pNodeId;
	}
	var valuePlugin = $("#ValuePlugin").val();
	var modelVersion = $("#ModelVersion").val();
	var operatorCode = $("#OperatorCode").val();
	var level = $("#Level").val();
	var operatorCode =  $("#userId").val();
	//树节点信息
	var newTreeNode={
			'name':modelName,
			'id':modelId,
			'modelType':'model',
			'isParent':false
	}
	var nodes = parent.zTreeObj.getSelectedNodes();
	var modelInfo={
			'cModelId':modelId,
			'cModelName':modelName,
			'cModelNameEn':modelNameEn,
			'cModelDesc':modelDesc,
			'cResourceType':modelType,
			'cIsSnmpModel':isSnmpModel,
			'cIsMainModel':isMainModel,
			'cMainModel':mainModel,
			'cValuePlugin':valuePlugin,
			'cModelVersion':modelVersion,
			'cOperatorCode':operatorCode,
			'cParentTreeId':parentTreeId,
			'cLevel':3
	};
	if(checkModelId()){
		$.ajax({
			type:'post',
			url:ctx+"/resourceModelCotroller/addResourceModelInfo",
			data:modelInfo,
			dataType:'text',
			async:false,//表示该ajax为同步的方式
			success:function(data){
				if(data!='0'){
					$("#ModelId").val("");
					$("#ModelName").val("");
					$("#ModelNameEn").val("");
					$("#ModelDesc").val("");
					$("#ModelType").val("");
					$("input[name='IsSnmpModel']").each(function(){
						$(this).attr("checked","");
					});
					$("input[name='IsMainModel']").each(function(){
						$(this).attr("checked","");
					});
					$("#MainModel").val("");
					$("#ValuePlugin").val("");
					$("#ModelVersion").val("");
					newTreeNode.id=data;
					parent.zTreeObj.addNodes(nodes[0],newTreeNode,true);
					//更新模型id
					resourceModelId=modelId;
					/*var iframedom = $('#model_param')[0];
					iframedom.src = ctx+"/paramlibrary/listparam?pageNow=1&modelId="+modelId;*/
					var iframedom = $('#model_add',parent.document)[0];
					iframedom.src = ctx + "/resourceModelCotroller/resourceModelDetail?id="
							+ data;
					
				}
				else{
					alert("操作失败");
				}
			},
			error:function(){
				alert("ajax操作失败");
			}
		});
	}
		
}
function closeWin(){
//	$("input[name='IsSnmpModel']").each(function(){
//		console.log($(this).attr("checked")+"  "+$(this).attr("value"));
//		
//	});
//	console.log();
//	closeAlert("alert");
}
/**
 * 添加指标信息
 */
function getIndAdd() {
	$.post(ctx + "/resourceModelCotroller/getModelIndicatorAdd", function(data) {
		myAlert({
			title : '添加指标信息',
			msg : data,
			type : 'alert',
			width : 602,
			height : 175
		});
	});
}



