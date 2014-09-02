var accordion = {
	 init : function(){
		accordion.accordionInit();
		accordion.collapse();
	 },
	 collapse : function(){
		 $( "#accordion" ).accordion({
			  activate: function( event, ui ) {
				  if(ui.newPanel[0].id==="resourcemodel"){
					  var iframedom = $('#model_add')[0];
						iframedom.src = ctx+"/resourceModelCotroller/getResourceModelAdd";
				  }
				  if(ui.newPanel[0].id === "indicatorsOfLibrary"){
					  var iframedom = $('#model_add')[0];
						iframedom.src = ctx+"/paramlibrary/listparam?pageNow=1";
				  }
				  if(ui.newPanel[0].id === "indicatorsOfGroup"){
					  var iframedom = $('#model_add')[0];
					  iframedom.src = ctx+"/paramgroup/list?pageNow=1";
				  }
				  if(ui.newPanel[0].id === "appManagement"){
					  var iframedom = $('#model_add')[0];
					  iframedom.src = ctx+"/applymanager/listapply?pageNow=1";
				  }
				  if(ui.newPanel[0].id === "manuf_management"){
					  var iframedom = $('#model_add')[0];
					  iframedom.src = ctx+"/manufController/turnManufPage";
				  }
			  }
			});
	 },
	 accordionInit : function(){
		 $("#accordion").accordion();
	 }
}	
$(document).ready(function(){
	accordion.init();
});
