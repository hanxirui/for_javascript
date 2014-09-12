var messageShow = {
	init : function() {
		var mes = $("#message").html();
		var user=document.getElementById("userid");
		var password=document.getElementById("password");
		if(mes!=""){
			$("#showMessage").css({
	             "position":"absolute",
	             "margin":"-60px 130px"
	        });
			$("#showMessage").show();
			if(mes=="密码错误!"){
				password.value="";
				password.focus();
			}else{
				user.value="";
				password.value="";
				user.focus();
			}
		}
	}	
};
messageShow.init();