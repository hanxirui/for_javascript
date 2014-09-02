$(document).ready(function(){
//	var $firstObj = $("a[name='role_name']").first();
//	alert($firstObj.attr("title"));
	$("a[name='role_name']").first().addClass("txt_on");
//	var roleId = $firstObj.attr("title");
});
function roleIdOnclick(obj){
	$("a[name='role_name']").each(function(){
		if($(this).attr("class")!=undefined){
			$(this).removeClass("txt_on");
		}
	});
	$("a[name='role_name']").each(function(){
		if(obj["title"]==$(this).attr("title")){
			$(this).addClass("txt_on");
		}
	});
	var iframedom = $('#user_message')[0];
	iframedom.src = ctx+"/roleController/roleDataDetail?cmd=1";
}
