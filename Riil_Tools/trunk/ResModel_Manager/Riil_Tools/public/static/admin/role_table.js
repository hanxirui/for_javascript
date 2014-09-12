$(document).ready(function(){
  $("a[name='role_name']").first().addClass("txt_on");
 });
 
function roleIdOnclick(obj){
	var role_id=$(obj).attr('val');
	 
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
	iframedom.src ="/resmodel/admin/role/page/"+role_id;
};
