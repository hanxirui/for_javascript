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
	manufHome.initData();
	if(manufHome.currentUser!="admin"){
		$("#tabs3").hide();
		$("#tabs4").hide();
	}
	manufHome.initModelInfoData();
	var manufData = manufHome.manufMsg;
	var modelData = manufHome.manufModelMsg;
	// 厂商Id绑定
	$("#input_manuf_id").autocomplete(manufData, {
		minChars: 1,
		width: 310,
		matchContains: "word",
		autoFill: false,
		formatItem: function(row, i, max) {
			return row.cManufId;
		},
		formatMatch: function(row, i, max) {
			return row.cManufId;
		},
		formatResult: function(row) {
			return row.cManufId;
		}
	}).result(function(event,row,formatted){
		$("#manuf_name_input").val(row.cManufName);
		$("#manuf_operator").val(row.cOperator);
		$("#image_display").attr("src",ctxImages+"/icon_images/"+row.cManufIcon);
		manufData = manufHome.manufMsg;
		
	});
	// 厂商名称绑定
	$("#manuf_name_input").autocomplete(manufData, {
		minChars: 0,
		width: 310,
		matchContains: "word",
		autoFill: false,
		formatItem: function(row, i, max) {
			return row.cManufId;
		},
		formatMatch: function(row, i, max) {
			return row.cManufId;
		},
		formatResult: function(row) {
			return row.cManufId;
		}
	}).result(function(event,row,formatted){
		$("#input_manuf_id").val(row.cManufId);
		$("#manuf_name_input").val(row.cManufName);
		$("#manuf_operator").val(row.cOperator);
		$("#image_display").attr("src",row.cManufIcon);
		manufData = manufHome.manufMsg;
		
		
	});
	// sysoid绑定
	$("#model_sysoid").autocomplete(modelData, {
		minChars: 1,
		width: 310,
		matchContains: "word",
		autoFill: false,
		formatItem: function(row, i, max) {
			return row.cModelSysoid;
		},
		formatMatch: function(row, i, max) {
			return row.cModelSysoid;
		},
		formatResult: function(row) {
			return row.cModelSysoid;
		}
	}).result(function(event,row,formatted){
		$("#model_num").val(row.cModelNumber);
		$("#model_series").val(row.cModelSeries);
		$("#modle_manuf_name").val(row.cModelManufName);
		$("#model_info").val(row.cModelMod);
		$("#model_type").val(row.cModelType);
		$("#modelIdBindSysoid").val(row.cModelMod);
		$("#citySel").val(row.cModelModName);
		$("#model_manage_operate").val(row.cOperator)
		modelData = manufHome.manufModelMsg;
	});
	// 型号绑定
	$("#model_num").autocomplete(modelData, {
		minChars: 1,
		width: 310,
		matchContains: "word",
		autoFill: false,
		formatItem: function(row, i, max) {
			return row.cModelNumber;
		},
		formatMatch: function(row, i, max) {
			return row.cModelNumber;
		},
		formatResult: function(row) {
			return row.cModelNumber;
		}
	}).result(function(event,row,formatted){
		$("#model_sysoid").val(row.cModelSysoid);
		$("#model_series").val(row.cModelSeries);
		$("#modle_manuf_name").val(row.cModelManufName);
		$("#model_info").val(row.cModelMod);
		$("#model_type").val(row.cModelType);
		$("#model_manage_operate").val(row.cOperator)
		modelData = manufHome.manufModelMsg;
	});
	
	$("#modle_manuf_name").autocomplete(manufData, {
		minChars: 0,
		width: 310,
		matchContains: "word",
		autoFill: false,
		formatItem: function(row, i, max) {
			return row.cManufId;
		},
		formatMatch: function(row, i, max) {
			return row.cManufId;
		},
		formatResult: function(row) {
			return row.cManufId;
		}
	}).result(function(event,row,formatted){
		$("#modle_manuf_id").val(row.cManufId);
		$("#modle_manuf_name").val(row.cManufName);
		$("#model_manage_operate").val(row.cOperator)
		manufData = manufHome.manufMsg;
		
		
	});
	
});
var manufHome={
		// 当前登录用户账号信息
		currentUser:'',
		// 厂商信息
		manufMsg:'',
		// 型号信息
		manufModelMsg:'',
		// 刷新型号列表信息
		refreshManufInfo:function(){
			var iframedom = $("#manuf_info")[0];
			iframedom.src = ctx+"/manufController/manufInfo";
		},
		//刷新厂商类表信息
		refreshManufMsg:function(){
			var iframedom = $("#manuf_msg")[0];
			iframedom.src = ctx+"/manufController/manufMsg";
			
		},
		// 初始化厂商信息
		initData:function(){
			$.ajax({
				type:'post',
				url:ctx+"/manufController/getAllManufMsgCurrentUser",
				dataType:'json',
				async:false,// 表示该ajax为同步的方式
				success:function(data){
					manufHome.currentUser=data[0];
					manufHome.manufMsg=data[1];
				}
			});	
		},
		// 初始化型号信息，取得所有的数据
		initModelInfoData:function(){
			$.ajax({
				type:'post',
				url:ctx+"/manufController/getAllModelInfo",
				dataType:'json',
				async:false,// 表示该ajax为同步的方式
				success:function(data){
					manufHome.manufModelMsg=data;
				},
				error:function(){
					manufHome.manufModelMsg='';
				}
			});	
		},
		showTab:function(tabHeadId,tabContentId){
            // tab层
            var tabDiv = document.getElementById("tabDiv");
            // 将tab层中所有的内容层设为不可见
            // 遍历tab层下的所有子节点
            var taContents = tabDiv.childNodes;
            for(i=0; i<taContents.length; i++) {
                // 将所有内容层都设为不可见
                if(taContents[i].id!=null && taContents[i].id != 'tabsHead'){
                    taContents[i].style.display = 'none';
                }
            }
            // 将要显示的层设为可见
            document.getElementById(tabContentId).style.display = 'block';
            // 遍历tab头中所有的超链接
            var tabHeads = document.getElementById('tabsHead').getElementsByTagName('a');
            for(i=0; i<tabHeads.length; i++) { 
                // 将超链接的样式设为未选的tab头样式
                tabHeads[i].className='tabs'; 
            }
            // 将当前超链接的样式设为已选tab头样式
            document.getElementById(tabHeadId).className='curtab';
            document.getElementById(tabHeadId).blur();
		},
		resetMsg:function(){
			$("#manuf_name_input").val("");
			$("#input_manuf_id").val("");
			$("#image_display").attr("src","");
			
		},
		delManufMsg:function(){
			var manufId=$("#input_manuf_id").val();
			if(manufId==null||manufId==''){
				setSMsgContent("无信息,不能删除", 110, "45%");
				return;
				
				
			}
			if(manufHome.currentUser!=$("#manuf_operator").val()){
				setSMsgContent("不能删除该条信息", 110, "45%");
				return;
			}
			
			$.ajax({
				type:'post',
				url:ctx+"/manufController/delManufMsg",
				data:'cManufId='+manufId,
				dataType:'text',
				async:true,// 表示该ajax为同步的方式
				success:function(data){
					if(data='1'){
						setSMsgContent("删除成功", 70, "45%");
						manufHome.resetMsg();
						manufHome.initData();
						manufHome.refreshManufMsg();
						
					}
					else{
						setSMsgContent("删除失败", 70, "45%");
					}
//					$("#manuf_msg_del").hide();
// manufHome.hide("manuf_msg_del");
				}
			});
		},
		// 添加型号信息
		addManufModelInfo:function(){
			var modelSysoid=$("#model_sysoid").val();
			var modelNum=$("#model_num").val();
			var modelSeries=$("#model_series").val();
			var modelManufId=$("#modle_manuf_id").val();
			var modelManufName=$("#modle_manuf_name").val();
			var modelMod=$("#modelIdBindSysoid").val();
			var modelType=$("#model_type").val();
			if(checkSysoid()&&checkModelNum()&&checkModelSeries()&&checkModelManufName()&&checkModelInfo()&&checkModelType()){
				var modelInfo={
						'cModelSysoid':modelSysoid,
						'cModelNumber':modelNum,
						'cModelSeries':modelSeries,
						'cModelManufId':modelManufId,
						'cModelManufName':modelManufName,
						'cModelMod':modelMod,
						'cModelType':modelType
				};
				console.log(modelInfo);
				// 提交信息
				$.ajax({
					type:'post',
					url:ctx+"/manufController/addModelInfo",
					data:modelInfo,
					dataType:'text',
					async:false,// 表示该ajax为同步的方式
					success:function(data){
						if(data=='1'){
							manufHome.resetModelInfo();
//							var iframedom = $('#manuf_info')[0];
//							iframedom.src = ctx+"/manufController/manufInfo?pageNow=1";
							// 刷新数据
							manufHome.initModelInfoData();
							var modelData = manufHome.manufModelMsg;
						// sysoid绑定
							$("#model_sysoid").autocomplete(modelData, {
								minChars: 1,
								width: 310,
								matchContains: "word",
								autoFill: false,
								formatItem: function(row, i, max) {
									return row.cModelSysoid;
								},
								formatMatch: function(row, i, max) {
									return row.cModelSysoid;
								},
								formatResult: function(row) {
									return row.cModelSysoid;
								}
							}).result(function(event,row,formatted){
								$("#model_num").val(row.cModelNumber);
								$("#model_series").val(row.cModelSeries);
								$("#modle_manuf_name").val(row.cModelManufName);
								$("#model_info").val(row.cModelMod);
								$("#model_type").val(row.cModelType);
								$("#modelIdBindSysoid").val(row.cModelMod);
								$("#citySel").val(row.cModelModName);
								$("#model_manage_operate").val(row.cOperator)
								modelData = manufHome.manufModelMsg;
							});
							setSMsgContent("操作成功", 70, "45%");
						}
						else{
							setSMsgContent("操作失败", 70, "45%");
						}
					}
				});
			}
		},
		
		delManufModelInfo:function(){
			var sysoid=$("#model_sysoid").val();
			if(sysoid==null||sysoid==''){
				setSMsgContent("无信息,不能删除", 110, "45%");
				return;
				
				
			}
			if(manufHome.currentUser!=$("#model_manage_operate").val()){
				setSMsgContent("不能删除该条信息", 110, "45%");
				return;
			}
			
			$.ajax({
				type:'post',
				url:ctx+"/manufController/delManufInfo",
				data:'sysoid='+sysoid,
				dataType:'text',
				async:true,// 表示该ajax为同步的方式
				success:function(data){
					if(data='1'){
						setSMsgContent("删除成功", 70, "45%");
						manufHome.resetModelInfo();
						manufHome.resetMsg();
//						manufHome.initData();
//						manufHome.refreshManufInfo();
						// 刷新数据
						manufHome.initModelInfoData();
						var modelData = manufHome.manufModelMsg;
						 $("#model_sysoid").flushCache();  
					// sysoid绑定
						$("#model_sysoid").autocomplete(modelData, {
							minChars: 1,
							width: 310,
							matchContains: "word",
							autoFill: false,
							formatItem: function(row, i, max) {
								return row.cModelSysoid;
							},
							formatMatch: function(row, i, max) {
								return row.cModelSysoid;
							},
							formatResult: function(row) {
								return row.cModelSysoid;
							}
						}).result(function(event,row,formatted){
							$("#model_num").val(row.cModelNumber);
							$("#model_series").val(row.cModelSeries);
							$("#modle_manuf_name").val(row.cModelManufName);
							$("#model_info").val(row.cModelMod);
							$("#model_type").val(row.cModelType);
							$("#modelIdBindSysoid").val(row.cModelMod);
							$("#citySel").val(row.cModelModName);
							$("#model_manage_operate").val(row.cOperator)
							modelData = manufHome.manufModelMsg;
						});
					}
					else{
						setSMsgContent("删除失败", 70, "45%");
					}
//					$("#manuf_msg_del").hide();
// manufHome.hide("manuf_msg_del");
				}
			});
		},
		
		
		
		
		
		
		
		resetModelInfo:function(){
			$("#model_sysoid").val("");
			$("#model_num").val("");
			$("#model_series").val("");
			$("#modle_manuf_name").val("");
			$("#modelIdBindSysoid").val("");
			$("#citySel").val("");
			$("#model_type").val("none");
		}
};
// 厂商信息验证
function checkManufId(){
	var manufId=$("#input_manuf_id").val();
	var reg=/^(?!_)(?!.*?_$)[a-zA-Z0-9_-]{1,20}$/;
	if(!reg.test(manufId)){
		
		falseStyle("input_manuf_id", "厂商ID长度为20", true, -10);
		return false;
	}
	if(!checkManufIdRepeat()){
		falseStyle("input_manuf_id", "厂商ID重复", true, -10);
		return false;
	}
	return true;
}
function checkManufIdRepeat(){
	var manufId=$("#input_manuf_id").val();
	var flag=false;
	$.ajax({
		type:'post',
		url:ctx+"/manufController/manufMsgRepeat",
		data:'cManufId='+manufId,
		dataType:'text',
		async:false,// 表示该ajax为同步的方式
		success:function(data){
			if(data=='1'){
				flag=false;
			}
			else{
				flag=true;
			}
		}
	});
	
	return flag;
}
function checkManufName(){
	var manufName=$("#manuf_name_input").val();
	var reg=/^(\w|[\u4E00-\u9FFF]){1,20}$/;
	if(!reg.test(manufName)){
		falseStyle("manuf_name_input", "厂商名称长度为20", true, -10);
		return false;
	}
	if(!checkManufNameRepeat()){
		falseStyle("manuf_name_input", "厂商名称重复", true, -10);
		return false;
	}
	return true;	
	
}
function checkManufNameRepeat(){
	var manufName=$("#manuf_name_input").val();
	var flag=false;
	$.ajax({
		type:'post',
		url:ctx+"/manufController/manufMsgRepeat",
		data:'cManufName='+manufName,
		dataType:'text',
		async:false,// 表示该ajax为同步的方式
		success:function(data){
			if(data=='1'){
				flag=false;
			}
			else{
				flag=true;
			}
		}
	});
	return flag;
}
/* 型号信息验证 */
function checkSysoid(){
	var modelSysoid=$("#model_sysoid").val();
	var reg=/^(?!_)(?!.*?_$)[a-zA-Z0-9_-]{1,20}$/;
	if(!reg.test(modelSysoid)){
		falseStyle("model_sysoid", "sysoid信息不正确", true, -10);
		return false;
	}
	if(!sysoidRepeat()){
		falseStyle("model_sysoid", "sysoid重复", true, -10);
		return false;
	}
	return true;
}
function sysoidRepeat(){
	var data=manufHome.manufModelMsg;
    var modelSysoid=$("#model_sysoid").val();
    for(var i=0;i<data.length;i++){
    	if(modelSysoid==data[i].cModelSysoid){
    		return false;
    	}
    }
    return true;
}
function checkModelNum(){
	var modelNum=$("#model_num").val();
	var reg=/^(?!_)(?!.*?_$)[a-zA-Z0-9_-]{1,20}$/;
	if(!reg.test(modelNum)){
		falseStyle("model_num", "型号信息不正确", true, -10);
		return false;
	}
	if(!modelNumRepeat()){
		falseStyle("model_num", "型号重复", true, -10);
		return false;
	}
	return true;
}
function modelNumRepeat(){
	var modelNum=$("#model_num").val();
	var data=manufHome.manufModelMsg;
    for(var i=0;i<data.length;i++){
    	if(modelNum==data[i].cModelNumber){
    		return false;
    	}
    }
    return true;
}
function checkModelSeries(){
	var modelSeries=$("#model_series").val();
	if(modelSeries==null || modelSeries==''){
		falseStyle("model_series", "型号系列不可为空", true, -10);
		return false;
	}
	return true;
}
function checkModelManufName(){
	var modelManufName=$("#modle_manuf_name").val();
	var data=manufHome.manufModelMsg;
	if(modelManufName==null || modelManufName==''){
		falseStyle("modle_manuf_name", "厂商名称不可为空", true, -10);
		return false;
	}
    for(var i=0;i<manufHome.manufMsg.length;i++){
    	if(modelManufName==manufHome.manufMsg[i].cManufName){
    		return true;
    	}
    }
    falseStyle("modle_manuf_name", "该厂商名称不存在", true, -10);
	return false;
}
function checkModelInfo(){
	var modelInfo=$("#model_info").val();
	if(modelInfo=='none'){
		falseStyle("model_info", "请选择模型", true, -10);
		return false;
	}
	return true;
}
function checkModelType(){
	var modelType=$("#model_type").val();
	if(modelType=='none'){
		falseStyle("model_type", "请选择设备类型", true, -10);
		return false;
	}
	return true;
}
function falseStyle(checkid, msg, choiceCss, domleft) {
	var msgCss = "";
	if (choiceCss) {
		msgCss = "small_";
	}
	$("#msg_divspan").removeClass();
	$("#msg_divspan").addClass(msgCss + "msg_divspan");
	$("#span_content").removeClass();
	$("#span_content").addClass(msgCss + "span_content");
	setMsgContent("msg_warning", "span_content", msg,
			$("#" + checkid).offset().top - $("#msg_warning").height() + "px",
			$("#" + checkid).offset().left + domleft + "px", true);
	setTimeout(function() {
		msghide("msg_warning");
	}, 3000);
}
 // 添加前验证
function preSubmitManuf() { 
	 if (checkManufId()&&checkManufName()) {
		 	addManuf();
	 }else {
		 setSMsgContent("操作失败", 70, "45%"); 
	} 
 }

// 添加厂商信息
function addManuf() {
	if (document.getElementById('manuf_icon').value == "") {
		setBMsgContent("prompt_warning", "warning_content", "请选择要上传的厂标", "",
				msgHide,270, 400, true);
		return false;
	} else {
		var random = Math.random();
		$("#addmanuf")[0].action = ctx+"/manufController/addManufMsg?random="
				+ random;
		
		$("#addmanuf")[0].submit();
		setSMsgContent("操作成功", 70, "45%");
		return true;
	}
}
// 图片附件的大小判断
function checkfile(fileInput) {
	document.getElementById('fileText').value = document.getElementById('manuf_icon').value;
	var str = document.getElementById('manuf_icon').value;
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
		var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
		nodes = zTree.getSelectedNodes(),
		v = "";
		id = "";
		nodes.sort(function compare(a,b){return a.id-b.id;});
		for (var i=0, l=nodes.length; i<l; i++) {
			id += nodes[i].id + ",";
			v += nodes[i].name + ",";
		}
		if (id.length > 0 ) id = id.substring(0, id.length-1);
		if (v.length > 0 ) v = v.substring(0, v.length-1);
		var cityObj = $("#citySel");
		cityObj.attr("value", v);
		$("#modelIdBindSysoid").val(id);
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
	
	
	
	
