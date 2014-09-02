/*!
 * jQuery JavaScript Library v1.9.0

 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2012 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-1-14
 */
/**
 * 提示框淡入淡出显示方法
 */
function msgshow() {
	$("#prompt_msg").hide();
	$("#prompt_msg").fadeIn(1000);
	setTimeout(function() {
		$("#prompt_msg").fadeOut(1000);
	}, 2000);
}
/**
 * 提示框样式内容修改(大框),并显示
 * 
 * @param msgid
 *            提示框id
 * @param msgConid
 *            提示框主体内容显示id
 * @param msgCon
 *            提示框主体内容
 * @param msgbtn
 *            按钮内容（默认按钮显示一个）
 * @param flag
 *            采用按钮样式
 */
function setBMsgContent(msgid, msgConid, msgCon, clickscript, clickscriptno,
		top, left, flag) {
	$("#" + msgConid).html(msgCon);// 提示框主体内容
	if (flag) {
		$("#no", "#prompt_warning").html("确定");
		$("#no", "#prompt_warning").unbind("click");
		// $("#no","#prompt_warning").attr("onclick",clickscriptno);
		$("#no", "#prompt_warning").bind("click", clickscriptno);
		$("#yes", "#prompt_warning").hide();// 调整按钮设定
	} else {
		$("#no", "#prompt_warning").html("取消");
		$("#no", "#prompt_warning").bind("click", clickscriptno);
		// $("#no","#prompt_warning").attr("onclick",clickscriptno);
		$("#yes", "#" + msgid).html("确定");
		document.getElementById("no").setAttribute("onclick",
				"javascript:" + clickscriptno);
		$("#yes", "#prompt_warning").unbind("click");
		// 替换方法
		// alert(typeof clickscript);
		// $("#yes").bind("onclick",function(e){clickscript(e.target);});
		$("#yes", "#prompt_warning").one("click", clickscript);
		
		// $("#yes","#prompt_warning").attr("onclick",clickscript);
		// document.getElementById("yes").setAttribute("onclick","javascript:"+clickscript);
		$("#no", "#prompt_warning").show();
		$("#yes", "#prompt_warning").show();
		// alert($("#yes","#prompt_warning").attr("onclick"));
		
	}
	$("#" + msgid).css({
		left : left + "px",
		top : top + "px"
	});
	$("#" + msgid + "").show();// 显示窗体
}
function setMsgContent(msgid, msgConid, msgCon, msg_top, msg_left, flag) {
	if (flag) {
		$("#" + msgid).hide();
		$("#" + msgConid).html(msgCon);
		$("#" + msgid).css({
			top : msg_top,
			left : msg_left
		});
		$("#" + msgid).show();
	} else {
		$("#" + msgid).hide();
	}
	 setTimeout(function(){
		 $("#"+msgid).hide();
	 },2000);
}
/**
 * 提示框样式内容修改(小框),并显示
 * 
 * @param msgCon
 */
function setSMsgContent(msgCon, width, left) {
	$("#msg_content").html(msgCon);
	$("div[class='prompt_tip2']", "#prompt_msg").width(width);
	$("#prompt_msg").css("left", left);
	msgshow();
}

// 死的取消方法
function msgHide() {
	$("#yes", "#prompt_warning").unbind("click");
	$("#prompt_warning").hide();
	$("#bgprompt_warning").remove();
}

// 活的取消方法
function msghide(msgid) {
	$("#" + msgid).hide();
	$("#bgprompt_warning").remove();
	// $("#prompt_warning").hide();
}

var formchecklist = {
	/**
	 * 判空验证
	 */
	checkNull : function(checkid, regchoice, size, msg, domleft) {
		var testtext = $("#" + checkid).val();
		if ($.isNull(testtext) || testtext == "") {
			falseCss(checkid, msg + "不能为空", true, domleft);
			flag = false;
		} else if (nstrlength(testtext) > size) {
			falseCss(checkid, msg + "不能超过" + size + "个字符", true, domleft);
			flag = false;
		} else {
			trueCss(checkid);
			flag = true;
		}

		return flag;
	},
	/**
	 * 编号和名称验证
	 * 
	 * @param checkid
	 *            文本框Id （字符串类型）
	 * @param regchoice
	 *            正则表达式选择 1：编号验证 ; 2： 名称验证 （数字类型）
	 * @param size
	 *            字符长度 （数字类型）
	 * @param msg
	 *            部分验证信息（字符串类型）
	 * @return true or false
	 */
	checktest : function(checkid, regchoice, size, msg, domleft) {
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
			falseCss(checkid, msg + "不能为空", true, domleft);
			flag = false;
		} else {
			$("#" + checkid).css("1px #B8B8B8 solid");
			/**
			 * 判断非法字符
			 */
			if (reg.test(testtext)) {
				trueCss(checkid);
				flag = true;
				/**
				 * 判断长度
				 */
				if (nstrlength(testtext) > size) {
					falseCss(checkid, msg + "不能超过" + size + "个字符", true,
							domleft);
					flag = false;
				} else {
					trueCss(checkid);
					flag = true;
				}
			} else {
				if (reg == reg2) {
					falseCss(checkid, msg + "包括汉字、数字、字母、下划线，不能以下划线开头结尾", false,
							domleft);
				} else {
					falseCss(checkid, msg + "包括数字、字母、下划线，不能以下划线开头或结尾", false,
							domleft);
				}
				flag = false;
			}
		}
		return flag;
	},
	/**
	 * 编号和名称验证允许为空
	 * 
	 * @param checkid
	 *            文本框Id （字符串类型）
	 * @param regchoice
	 *            正则表达式选择 1：编号验证 ; 2： 名称验证 （数字类型）
	 * @param size
	 *            字符长度 （数字类型）
	 * @param msg
	 *            部分验证信息（字符串类型）
	 * @return true or false
	 */
	checktestlong : function(checkid, regchoice, size, msg, domleft) {
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
		$("#" + checkid).css("1px #B8B8B8 solid");
		/**
		 * 判断非法字符
		 */
		if (reg.test(testtext)) {
			trueCss(checkid);
			flag = true;
			/**
			 * 判断长度
			 */
			if (nstrlength(testtext) > size) {
				falseCss(checkid, msg + "不能超过" + size + "个字符", true, domleft);
				flag = false;
			} else {
				trueCss(checkid);
				flag = true;
			}
//		} else {
//			if (reg == reg2) {
//				falseCss(checkid, msg + "包括汉字、数字、字母、下划线，不能以下划线开头结尾", false,
//						domleft);
//			} else {
//				falseCss(checkid, msg + "包括数字、字母、下划线，不能以下划线开头或结尾", false,
//						domleft);
//			}
//			flag = false;
		}

		return flag;
	},
	/**
	 * 邮箱验证
	 * 
	 * @param checkid
	 *            文本框Id （字符串类型）
	 */
	checkemail : function(checkid,msg,size,domleft) {
		var flag = true;
		// var reg =/^(w [- .]\w )*@\w ([-.]\w )*\.\w ([-.]\w )*$$/;
		var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		/**
		 * 非空验证
		 */
		if (FormValidate.validateType.reqiured($("#" + checkid))) {
			/**
			 * 邮箱格式验证
			 */
			// if(FormValidate.validateType.isEmail($("#"+checkid))){
			// trueCss(checkid);
			// flag = true;
			// }else{
			// falseCss(checkid,"邮箱格式不正确",true,domleft);
			// flag = false;
			// }
			if (reg.test($("#" + checkid).val())) {
				
				if (nstrlength($("#"+checkid).val()) > size) {
					falseCss(checkid, msg + "不能超过" + size + "个字符", true,
							domleft);
					flag = false;
				} else {
					trueCss(checkid);
					flag = true;
				}
				
				
				
				/*123
				 
				 if(nstrlength($("#"+checkid).val()) > size){
				 falseCss(checkid, msg + "不能超过" + size + "个字符", true,
					domleft);
			         flag = false;
				 
				  }else{
				  trueCss(checkid);
				flag = true;
				  
				  }
				 * 
				 * */
				
				
			} else {
				falseCss(checkid, "邮箱格式不正确", true, domleft);
				flag = false;
			}
		} else {
			falseCss(checkid, "邮箱不能为空", true, domleft);
			flag = false;
		}
		return flag;
	},
	/**
	 * 电话验证
	 */
	checkphone : function(checkid, msg, domleft) {
		var reg = /^(^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$)|(^((\(\d{3}\))|(\d{3}\-))?(1[358]\d{9})$)$/;
		var flag = true;
		/**
		 * 非空验证
		 */
		if (FormValidate.validateType.reqiured($("#" + checkid))) {
			// /**
			// * 电话格式验证
			// */
			// if(FormValidate.validateType.isTelOrMobile($("#"+checkid))){
			// trueCss(checkid);
			// flag = true;
			// }else{
			// falseCss(checkid,msg+"必须为固定电话号码或手机号码格式",false,domleft);
			// flag = false;
			// }
			if (reg.test($("#" + checkid).val())) {
				trueCss(checkid);
				flag = true;
			} else {
				falseCss(checkid, "请输入正确的电话格式！", true, domleft);
				flag = false;
			}
		} else {
			falseCss(checkid, msg + "不能为空", true, domleft);
			flag = false;
		}
		// alert(flag);
		return flag;
	},
	/**
	 * 邮编验证
	 */
	checkZipCode : function(checkid, msg, domleft) {
		var flag = true;
		var reg = /^[1-9][0-9]{5}$/;
		if (FormValidate.validateType.reqiured($("#" + checkid))) {
			if (reg.test($("#" + checkid).val())) {
				trueCss(checkid);
				flag = true;
			} else {
				falseCss(checkid, "长度只能为6位,首位不能为0", true, domleft);
				flag = false;
			}
		} else {
			falseCss(checkid, msg + "不能为空", true, domleft);
			flag = false;
		}
		return flag;
	},
	/**
	 * 数字大于等于0带两位小数点验证
	 */
	checkCash : function(checkid, msg, domleft) {
		var flag = true;
		/**
		 * 非空验证
		 */
		if (FormValidate.validateType.reqiured($("#" + checkid))) {
			if (FormValidate.validateType
					.isGTEqualZeroFloatTwo($("#" + checkid))) {
				trueCss(checkid);
				flag = true;
			} else {
				falseCss(checkid, msg + "必须为数字且大于等于0,可带小数点后两位", false, domleft);
				flag = false;
			}
		} else {
			falseCss(checkid, msg + "不能为空", true, domleft);
			flag = false;
		}
		return flag;
	},
	/**
	 * 数字大于等于0带两位小数点验证
	 */
	checkZeroToOne : function(checkid, msg, domleft) {
		var flag = true;
		/**
		 * 非空验证
		 */
		if (FormValidate.validateType.reqiured($("#" + checkid))) {
			if (FormValidate.validateType
					.isGTEqualZeroFloatTwo($("#" + checkid))) {
				var val = $("#" + checkid).val();
				if (val > 1) {
					falseCss(checkid, msg + "必须为数字且大于等于0小于1,可带小数点后两位", false,
							domleft);
					flag = false;
				} else {
					trueCss(checkid);
					flag = true;
				}
			} else {
				falseCss(checkid, msg + "必须大于等于0,可带小数点后两位", false, domleft);
				flag = false;
			}
		} else {
			falseCss(checkid, msg + "不能为空", true, domleft);
			flag = false;
		}
		return flag;
	},
	/**
	 * 数字验证
	 */
	checkNumber : function(checkid, msg, domleft) {
		var flag = true;
		if (FormValidate.validateType.reqiured($("#" + checkid))) {
			if (FormValidate.validateType.isNumber($("#" + checkid))) {
				trueCss(checkid);
				flag = true;
			} else {
				falseCss(checkid, msg + "必须为数字", true, domleft);
				flag = false;
			}
		} else {
			falseCss(checkid, msg + "不能为空", true, domleft);
			flag = false;
		}
		return flag;
	},
	/**
	 * 端口号验证
	 */
	checkPort : function(checkid, domleft) {
		var flag = true;
		if (FormValidate.validateType.reqiured($("#" + checkid))) {
			if (FormValidate.validateType.port($("#" + checkid))) {
				trueCss(checkid);
				flag = true;
			} else {
				falseCss(checkid, "端口号必须为1-65535", true, domleft);
				flag = false;
			}
		} else {
			falseCss(checkid, "端口号不能为空", true, domleft);
			flag = false;
		}
		return flag;
	},
	/**
	 * PIN码验证
	 */
	checkPIN : function(checkid, domleft) {
		var flag = true;
		if (FormValidate.validateType.reqiured($("#" + checkid))) {
			if (FormValidate.validateType.isSIMPinNumber($("#" + checkid))) {
				trueCss(checkid);
				flag = true;
			} else {
				falseCss(checkid, "PIN码必须为四位数字", true, domleft);
				flag = false;
			}
		} else {
			falseCss(checkid, "PIN码不能为空", true, domleft);
			flag = false;
		}
		return flag;
	},
	/**
	 * 日期验证
	 */
	checkdate : function(checkid, domleft) {
		var reg = /^(\d{1,4})[\/|\-](0?[1-9]|10|11|12)[\/|\-]([1-2]?[0-9]|0[1-9]|30|31)$/;
		var flag = true;
		if (FormValidate.validateType.reqiured($("#" + checkid))) {
			if (reg.test($("#" + checkid).val())) {
				trueCss(checkid);
				flag = true;
			} else {
				falseCss(checkid, "日期格式不正确", true, domleft);
				flag = false;
			}
		} else {
			falseCss(checkid, "日期不能为空", true, domleft);
			flag = false;
		}
		return flag;
	},
	checktextArea : function(checkid, msg, size, domleft) {
		var flag = true;
		if (FormValidate.validateType.reqiured($("#" + checkid))) {
			if (nstrlength($("#" + checkid).val()) > size) {
				falseCss(checkid, msg + "字数不能超过" + size + "个字符", true, domleft);
				flag = false;
			} else {
				trueCss(checkid);
				flag = true;
			}
		} else {
			falseCss(checkid, msg + "不能为空", true, domleft);
			flag = false;
		}
		return flag;
	},
	checklength : function(checkid,msg,size,domleft){
		/**
		 * 判断长度
		 */
		if (nstrlength($("#"+checkid).val()) > size) {
			falseCss(checkid, msg + "不能超过" + size + "个字符", true,
					domleft);
			flag = false;
		} else {
			trueCss(checkid);
			flag = true;
		}
		return flag;
	}

}
/**
 * 验证正确样式
 * 
 * @param checkid
 *            验证元素的Id
 */
function trueCss(checkid) {
	$("#" + checkid).css("border", "1px #B8B8B8 solid", false);
	setMsgContent("msg_warning", "span_content", "",
			$("#" + checkid).offset().top - $("#msg_warning").height() + "px",
			$("#" + checkid).offset().left - 6 + "px", false);
}
/**
 * 验证错误样式
 * 
 * @param checkid
 *            验证元素的Id
 */
function falseCss(checkid, msg, choiceCss, domleft) {
	var msgCss = "";
	if (choiceCss) {
		msgCss = "small_";
	}
	$("#msg_divspan").removeClass();
	$("#msg_divspan").addClass(msgCss + "msg_divspan");
	$("#span_content").removeClass();
	$("#span_content").addClass(msgCss + "span_content");
	$("#" + checkid).css("border", "1px red solid");
	setMsgContent("msg_warning", "span_content", msg,
			$("#" + checkid).offset().top - $("#msg_warning").height() + "px",
			$("#" + checkid).offset().left + domleft + "px", true);
	setTimeout(function() {
		msghide("msg_warning");
	}, 3000);
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

/**
 * 开始日期与结束日期验证
 * 
 * @param s_checkid
 *            开始日期
 * @param e_checkid
 *            结束日期
 * @param msg
 *            提示信息
 * @param domleft
 *            消息框位置
 * @returns true | false
 */
function checkStartToEndDate(s_checkid, e_checkid, domleft) {
	var flag = true;
	var s_start = $("#" + s_checkid).val();
	var s_end = $("#" + e_checkid).val();
	var start = s_start.split("-");
	var end = s_end.split("-");
	var startdate = new Date(start[0], start[1], start[2]);
	var enddate = new Date(end[0], end[1], end[2]);
	if (startdate > enddate) {
		setSMsgContent("开始日期大于结束日期！", 150, "35%");
		flag = false;
	}
	return flag;
}
/**
 * 空数据时隐藏全选按钮
 * @param data 表格数据
 * @param id 表格Id
 */
function nodataHideCheck(data,id){
	if(data.pageDataPojo.pageData!=undefined && data.pageDataPojo.pageData!=null && data.pageDataPojo.pageData.length>0){
		if($("th[headRender='checkbox']","#"+id).html()==""){
			$("th[headRender='checkbox']","#"+id).html("<input type='checkbox'>");
		}
	}else{
		$("th[headRender='checkbox']","#"+id).html("");
	}
}

