function login() {
	var user = document.getElementById("userid");
	if (user.value == "" || user.value == "请输入账号") {
		$("#messageShow").text("账号不能为空！");
		$("#showMessage").css({
			"position" : "absolute",
			"margin" : "-60px 130px",
		});
		user.focus();
	} else if (!check("userid", 1, 45, "账号", "messageShow")) {
		user.focus();
	} else {
		document.loginForm.action = ctx + "/main";
		document.loginForm.submit();
	}
}

var messageShow = {
	init : function() {
		$("#showPwd").focus(function() {
			var text_value = $(this).val();
			if (text_value == this.defaultValue) {
				$("#showPwd").hide();
				$("#password").show().focus();
			}
		});
		$("#password").blur(function() {
			var text_value = $(this).val();
			if (text_value == "") {
				$("#showPwd").show();
				$("#password").hide();
			}
		});

		var userhide = document.getElementById("userhide").value;
		if (userhide != '') {
			document.getElementById("userid").value = userhide;
		} else {
			var user = document.getElementById("userid");
			if (user.value == "请输入账号") {
				user.focus();
			}
		}

		$("input").keydown(function(event) {
			if (event.keyCode == 13) {
				login();
			}
		});
		
		var mes = $("#message").val();
		$("#showMessage").css({
			"position" : "absolute",
			"margin" : "-60px 130px"
		});
		$("#showMessage").show();
		$("#messageShow").text(mes);
		if (mes.length > 1) {
			var password = document.getElementById("password");
			if (mes == "密码错误!") {
				password.value = "";
				$("#showPwd").focus();
			} else {
				user.value = "";
				password.value = "";
				user.focus();
			}
		}
	}
};
messageShow.init();

function check(checkid, regchoice, size, msg, showid) {
	var testtext = $("#" + checkid).val();
	var reg1 = /^(?!_)(?!.*?_$)[a-zA-Z0-9_]+$/;
	var reg2 = /^(?!_)(?!.*?_$)[\(\)a-zA-Z0-9_\u4E00-\u9FFF]+$/;
	var reg = "";
	var flag = true;
	if (regchoice == 1) {
		reg = reg1;
	} else if (regchoice == 2) {
		reg = reg2;
	}
	/**
	 * 判断非空
	 */
	if ($.isNull(testtext) || testtext == "") {
		$("#" + showid).text("账号不能为空！");
		flag = false;
	} else {
		$("#" + checkid).css("1px #B8B8B8 solid");
		/**
		 * 判断非法字符
		 */
		if (reg.test(testtext)) {
			flag = true;
		} else {
			$("#showMessage").css({
				"position" : "absolute",
				"margin" : "-60px 0px",
			});
			if (reg == reg2) {
				$("#" + showid).text(msg + "包括汉字、数字、字母、下划线，不能以下划线开头结尾");
			} else {
				$("#" + showid).text(msg + "括数字、字母、下划线，不能以下划线开头或结尾");
			}
			flag = false;
		}
	}
	return flag;
}

/**
 * 计算字符长度（中文为一个字符）
 * 
 * @param s
 *            字符串
 * @returns {Number}字符串长度
 */
function nstrlength(s) {
	var l = 0;
	var a = s.split("");
	for ( var i = 0; i < a.length; i++) {
		if (a[i].charCodeAt(0) < 299) {
			l++;
		} else {
			l += 1;
		}
	}
	return l;
}