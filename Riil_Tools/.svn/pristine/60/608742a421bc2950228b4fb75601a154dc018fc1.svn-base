$(document).ready(function(){
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
//模型id绑定验证函数
	$("#model_id").bind("blur",checkModelId);
	$("#policy_id").bind("blur",checkPolicyId);
	$("#model_policy_name").bind("blur",checkPolicyName);
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
	if(treeNode.modelType=="temp"){
		setSMsgContent("只能选择模型节点", 110, "45%");
//		alert("只能选择主模型");
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
//模型节点ID验证
function checkModelId() {
	var modelId = $('#model_id').val();
	var reg=/^RIIL_RMM_.*$/;   
	if(!reg.test(modelId)){
		falseCss("model_id","ID必须以RIIL_RMM_开头",true,-10);
		return false;
	}
	else{
		trueCss("model_id");
		return true;
	}
}
function updateModelInfo(){
	
	var ctag=$("#tag").val();
	var modelId = $("#ModelId").val();
	var modelName = $("#ModelName").val();
	var modelNameEn = $("#ModelNameEn").val();
	var modelDesc = $("#ModelDesc").val();
	var modelType = $("#ModelType").val();
	var isSnmpModel = $("input[name='IsSnmpModel']:checked").val();
	var isMainModel = $("input[name='IsMainModel']:checked").val();//$("#IsMainModel").val();
	var mainModel = $("#citySel").val();
	var valuePlugin = $("#ValuePlugin").val();
	var modelVersion = $("#ModelVersion").val();
	var operatorCode = $("#OperatorCode").val();
	var parentTreeId = $("#ParentTreeId").val();
	var level = $("#Level").val();
	console.info(ctag);
if(ctag=="copy"){
	model_id
	var modelId = $("#model_id").val();
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
		var uurl=ctx+"/resourceModelCotroller/addResourceModelInfo"
	}else{
		var modelInfo={
				'id':id,
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
		var uurl=ctx+"/resourceModelCotroller/alterModelInfoMsg"
	}
	if(checkModelId()){
		$.ajax({
			type:'post',
			url:uurl,
			data:modelInfo,
			dataType:'text',
			async:false,//表示该ajax为同步的方式
			success:function(data){
				setSMsgContent("操作成功", 70, "45%");
				
			},
			error:function(){
				
			}
		});
	}
}
function checkPolicyId(){
	var modelId = $('#policy_id').val();
	var reg=/^RIIL_RMP_RES_.*$/;   
	if(!reg.test(modelId)){
		falseCss("policy_id","ID必须以RIIL_RMP_RES_开头",true,-10);
		return false;
	}
	else{
		trueCss("policy_id");
		return true;
	}
	
}
function checkPolicyName(){
	var policyName = $("#model_policy_name").val();
	if(policyName==null||policyName==''){
		falseCss("model_policy_name","模型名称不能为空",true,-10);
		return false;
	}
	else{
		trueCss("model_policy_name");
		return true;
		
	}
}
function submintModelPolicy(){
//	resourceModelId='RIIL_RMM_BUSINESSAPPLICATION';
	var modelPolicyId=$("#model_policy_id").val();
	var id=$("#policy_id").val();
	var resourceModelId=$("#ModelId").val();
	var modelPolicyName= $("#model_policy_name").val();
	var modelPolicyDesc = $("#model_policy_desc").val();
	var modelPolicyType=$("#model_policy_type").val();
	var modelPolicy={
			'modelId':resourceModelId,
			'id':id,
			'modelPolicyName':modelPolicyName,
			'modelPolicyType':modelPolicyType,
			'modelPolicyDesc':modelPolicyDesc
	};

	if(resourceModelId==''){
		setSMsgContent("请先添加模型", 90, "45%");
		return;
	}
	if(modelPolicyId==''){
		$.ajax({
			type:'post',
			url:ctx+"/resourceModelCotroller/addModelPolicy",
			data:modelPolicy,
			dataType:'text',
			async:true,//表示该ajax为同步的方式
			success:function(data){
				if(data=='1'){
					var iframedom = $('#model_metric_management')[0];
					iframedom.src =ctx+"/resourceModelCotroller/modelMetricPage?pageNow=1&pageSize=3&policyId="+id;
					//刷新策略事件
					var iframedomEvent = $('#model_event_management')[0];
					iframedomEvent.src =ctx+"/resourceModelCotroller/modelEventPage?pageNow=1&pageSize=4&policyId="+id;
					$("#model_policy_id").val(id);
					setSMsgContent("操作成功", 70, "45%");
				}
				else{
					setSMsgContent("操作失败", 70, "45%");
				}
			}
		});
	}
	else{
		$.ajax({
			type:'post',
			url:ctx+"/resourceModelCotroller/updateModelPolicy?modelPolicyId="+modelPolicyId,
			data:modelPolicy,
			dataType:'text',
			async:true,//表示该ajax为同步的方式
			success:function(data){
				if(data>0){
					setSMsgContent("操作成功", 70, "45%");
				}
				else{
					setSMsgContent("操作失败", 70, "45%");
				}
			}
		});
		
		
	}
}
