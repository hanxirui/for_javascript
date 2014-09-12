$(document).ready(function(){
//	$( "#tabs" ).tabs();
});
function checkTypeName(id) {
	var subModelId = $('#'+id).val();
	var reg=/^RIIL_RMT_.*$/;   
	if(!reg.test(subModelId)){
		falseCss(id,"类型树节点ID必须以RIIL_RMT_开头",true,-10);
		return false;
	}
	else{
		trueCss(id);
		return true;
	}
}
function submitModelType(){
	var fileName=$("#cIcon").val();
	if(fileName==undefined||fileName==null||fileName==''){
		$("#resource_model_submit")[0].action = ctx+"/resourceModelTypeCotroller/addResourceModelType";
	}
	else{
		$("#resource_model_submit")[0].action = ctx+"/resourceModelTypeCotroller/addResourceModelType?fileName="+ fileName;
	}
	if(checkTypeName('cSubModelTypeId')&&checkTreeNode()){
		var random = Math.random();
		$("#resource_model_submit")[0].submit();
		
		var icon = $("#cIcon").val();
		var typeTreeLev = $("#cTypeTreeLev").val();
		var url=ctxImages+"/template/"+icon;
		var subModelTypeName = $("#cSubModelTypeName").val();
		var subModelTypeId = $("#cSubModelTypeId").val();
		var treeNodeId = $("#cTypeTreeCode").val();
		//树节点信息
		var newTreeNode={
				'name':subModelTypeName,
				'id':treeNodeId,
				//是否有自定义图表，如果没有,则没有icon属性
				'icon':icon==''?icon:url,
				'isParent':true
		}
		setTimeout(function(){},2000);
		var nodes = parent.zTreeObj.getSelectedNodes();
		if(typeTreeLev!='1'){
//			newTreeNode.id=nodes[0].id+"."+treeNodeId;
//			newTreeNode.id=treeNodeId;
			parent.zTreeObj.addNodes(nodes[0],newTreeNode,true);
		}
		else{
			parent.zTreeObj.addNodes(null,newTreeNode,true);
		}
		setSMsgContent("操作成功", 70, "45%");
		
	}
	
}
function closeWin(){
	closeAlert("alert");
	
}
function checkfile(fileInput) {
	document.getElementById('cIcon').value = document.getElementById('resource_model_icon').value;
	var str = document.getElementById('resource_model_icon').value;
	if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(str)) {
		setBMsgContent("prompt_warning", "warning_content", "图片类型必须是.gif,jpeg,jpg,png中的一种", "",
				msgHide,270, 400, true);
		return false;
	}else if (fileInput.files[0].size > 10240) {
		setBMsgContent("prompt_warning", "warning_content", "图片附件超过10k", "",
				msgHide, 200, 400, true);
		return false;
	}
	return true;
}
function checkTreeNode(){
	var treeNodeId = $("#cTypeTreeCode").val();
//	console.log(treeNodeId);
	//可能会用到
	var reg=/^\d{1,4}(\.\d{1,4})*$/;
	if(!reg.test(treeNodeId)){
		falseCss("cTypeTreeCode","类型树节点格式不正确",true,-10);
		return false;
	}
	else if(treeNodeId.length>40){
		falseCss("cTypeTreeCode","类型树节点长度不正确",true,-10);
		return false;
		
	}
	else if(checkTreeNodeRepeat()){
//		var a=checkMaxTreeId();
//		console.info(checkMaxTreeId());
//		alert(a);
//		falseCss("cTypeTreeCode","类型树节点重复",true,-10);
		return false;
		
	}
	else if(checkPlevel()){
		return false;
	}
	
	else{
		trueCss("cTypeTreeCode");
		return true;
	}
	
}
function checkPlevel(){
	var plevel =$("#ParentTreeId").val();
	var level=$("#cLevel").val();
	var tag=$("#tag").val();
	if(typeof(plevel) == "undefined"){
		plevel=-1;
	}
	//alert(plevel);
	//alert(level);
	if(tag=="copy"){
		if(plevel==level){
			return false;
		}else {
			
			setSMsgContent("该树节点与被复制节点不同级", 200, "45%");
			return true;
		}

	}else {
		
		if(plevel==level-1){
			return false;
		}else {
			
			setSMsgContent("新增模版节点应为所选结点下一级", 200, "45%");
			return true;
		}
	}
}
function checkTreeLev(){
	var level = 0;
	var typeTreeCode = $("#cTypeTreeCode").val();
//	console.log(typeTreeCode.split(".").length);
	$("#cLevel").val(typeTreeCode.split(".").length-1);
	
}

function checkTreeNodeRepeat(){
	var treeNodeId = $("#cTypeTreeCode").val();
	var level=$("#cLevel").val();
	var repeat = false;
	$.ajax({
		type:'post',
		url:ctx+"/resourceModelTypeCotroller/checkTreeNode?treeNodeId="+treeNodeId+"&level="+level,
		dataType:'text',
		async:false,//表示该ajax为同步的方式
		success:function(data){
			var bb=data.split(",")[0];
			var cc=data.split(",")[1];
//			console.info(bb);
//			console.info(cc);
			if(bb=="true"){
				repeat=true;
//				alert(repeat);
				falseCss("cTypeTreeCode","类型树节点重复,"+cc,true,-10);
			}else{
				repeat=false;
//				alert(repeat);
			}
		}
	});
	return repeat;
}


function checkMaxTreeId(){
	var treeNodeId = $("#cTypeTreeCode").val();
	var level=$("#cLevel").val();
	$.ajax({
		type:'post',
		url:ctx+"/resourceModelTypeCotroller/checkMaxTreeId?treeNodeId="+treeNodeId+"&level="+level,
		dataType:'text',
		async:false,//表示该ajax为同步的方式
		success:function(data){
			console.info(data);
//			falseCss("cTypeTreeCode","该级类型树节点最大值为"+data,true,-10);
			return data;
		}
	});
}
function submitAlterMsg(){
	var id=$("#id").val();
	var modelTypeId=$("#cSubModelTypeId_detail").val();
	var modelTypeName=$("#cSubModelTypeName_detail").val();
	var modelTypeNameEn = $("#cSubModelTypeNameEn_detail").val();
	var modelParentType = $("#cParentType_detail").val();
	var modelIsMainType = $("input[name='cIsMainType']:checked").val();
	var modelTypeTreeLev = $("#cLevel").val();
	var modelTypeTreeCode = $("#cTypeTreeCode").val();
	var tag=$("#tag").val();
	var icon = $("#cIcon").val();
	var vendor = $("#cVendor_detail").val();
	if(tag=="copy"){
		var uurl=ctx+"/resourceModelTypeCotroller/addResourceModelType";
	}
	else{
		var uurl=ctx+"/resourceModelTypeCotroller/updateResourceModelTypeMsg";
	}
	var modelType={
			'id':id,
			'cSubModelTypeId':modelTypeId,
			'cSubModelTypeName':modelTypeName,
			'cSubModelTypeNameEn':modelTypeNameEn,
			'cParentType':modelParentType,
			'cIsMainType':modelIsMainType,
			'cLevel':modelTypeTreeLev,
			'cTypeTreeCode':modelTypeTreeCode
	};
	if(checkTypeName('cSubModelTypeId_detail')&&checkTreeNodeAlter()){
		$.ajax({
			type:'post',
			data:modelType,
			url:uurl ,
			dataType:'text',
			async:false,//表示该ajax为同步的方式
			success:function(data){
				var nodes = parent.zTreeObj.getSelectedNodes();
				nodes[0].name = modelTypeName;
				parent.zTreeObj.updateNode(nodes[0]);
				setSMsgContent("操作成功", 70, "45%");
			}
		});
		
	}
	
	
}
function checkBoxChenge(){
//	var value = $("#"+id+"_inuse").val();
//	value=="1"?$("#"+id+"_inuse").val("-1"):$("#"+id+"_inuse").val("1")
}