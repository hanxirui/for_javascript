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
						iframedom.src = ctx+"/resmodel/resourceModelCotroller/getResourceModelAdd";
				  }
				  if(ui.newPanel[0].id === "indicatorsOfLibrary"){
					  var iframedom = $('#model_add')[0];
						iframedom.src = ctx+"/resmodel/paramlibrary/listparam";
				  }
				  if(ui.newPanel[0].id === "indicatorsOfGroup"){
					  var iframedom = $('#model_add')[0];
					  iframedom.src = ctx+"/resmodel/metricGroupController/getMetricGroupManagement";
				  }
				  if(ui.newPanel[0].id === "appManagement"){
					  var iframedom = $('#model_add')[0];
					  iframedom.src = ctx+"/resmodel/applymanager/listapply";
				  }
				  if(ui.newPanel[0].id === "manuf_management"){
					  var iframedom = $('#model_add')[0];
					  iframedom.src = ctx+"/resmodel/manufController/getManufManagement";
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
