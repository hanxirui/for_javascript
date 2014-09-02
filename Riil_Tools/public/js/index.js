$(document).ready(function(){
	$("#resource_model_left").load(ctx+"/menuController/turnLeftMenuPage",function(){
		var iframedom = $('#model_add')[0];
		iframedom.src = ctx+"/resourceModelCotroller/getResourceModelAdd";
	});
});
