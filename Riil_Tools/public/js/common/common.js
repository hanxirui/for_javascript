
var type;
var mLeft;
var mTop;
var Bwidth = document.documentElement.clientWidth;
var Bheight = document.documentElement.clientHeight;
var mainWidth;
var mainHeight;
function myAlert(parameter){
	var outAlert=null;
	outAlert=parseInt(parameter.outAlert);
	var mainWidth =  parameter.width;
	var mainHeight =  parameter.height;
	type = parameter.type;
	if(!mainHeight){
		mainHeight = 283;
	}
	if(!mainWidth){
		mainWidth = 602;
	}
	var content = parameter.msg;
	$("body").append("<div class='bg' style='float:left;background:#000;' id='bg"+type+"'></div>");
	var showPanel = "<div class='mainPanel' id='mainPanel"+type+"'></div>";
	var Bwidth = document.documentElement.clientWidth;
	var Bheight = document.documentElement.clientHeight;
	$("body").append(showPanel);			
	$("#mainPanel"+type).css({"height":mainHeight+"px","width":mainWidth+"px"});
	var mLeft =  Math.max(document.body.clientWidth,document.documentElement.clientWidth)/2 - document.getElementById("mainPanel"+type).offsetWidth/2;
	var mTop =  Math.max(document.documentElement.clientHeight,document.body.clientHeight)/2 - document.getElementById("mainPanel"+type).offsetHeight/2-100;
	$("#mainPanel"+type).css({"left":mLeft,"top":mTop});
	var title=parameter.title;
	var titlePanel="<div id='MyHeader' class='logo' onmousedown='move(event,\""+type+"\");'><div id='myTitle' style='padding-top:2px;color:#fff;'>"+title+"</div></div>"
	$("#mainPanel"+type).append(titlePanel);
	$("#mainPanel"+type).append("<div id='MyContent' class='MyContent'>"+content+"</div>");
	$("#MyContent"+type).css({"height":(mainHeight-60)+"px"});
	var mainPanelAlert=$(".mainPanel").size();
	if(outAlert!=""||outAlert!=null) {
		var bgsizecss=parseInt($("#mainPanelalert").css("z-index"))+1;
		$("#"+bgstylenow).css("z-index",bgsizecss);//设置当前ID的图层显示
		$("#mainPanelalertadd").css("z-index",outAlert);
	}else{
		if(mainPanelAlert>1){
			var one=mainPanelAlert-1;
			var two=mainPanelAlert-2;
			var stylenow=$(".mainPanel:eq("+one+")").attr("id");//当前的ID
			var sizebef=$(".mainPanel:eq("+two+")").attr("id");//前一个的ID
			var sizecss=parseInt($("#"+sizebef).css("z-index"))+1;
			$("#"+stylenow).css("z-index",sizecss)//设置当前ID的图层显示
			var bgstylenow=$(".bg:eq("+one+")").attr("id");//当前的ID
			var bgsizebef=$(".bg:eq("+two+")").attr("id");//前一个的ID
			var bgsizecss=parseInt($("#"+bgsizebef).css("z-index"))+1;
			$("#"+bgstylenow).css("z-index",bgsizecss);//设置当前ID的图层显示
			$("#mainPanelalertadd").css("z-index",outAlert);
		}else{
			$("#bgalert").css("z-index","100");
			$("#mainPanelalert").css("z-index","101");	
			$("#mainPanelalertadd").css("z-index",outAlert);
		}
	}
}
var a;
var b=0;
var c=0;
document.onmouseup=function(){
if(!a)return;
document.all?a.releaseCapture():window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
	a="";
};
document.onmousemove = function(d) {
	if (!a)
		return;
	if (!d)
		d = event;
	if((d.clientX - b)<0){
		a.style.left = 0+ "px";
	}else if((d.clientX - b)>(Bwidth-mainWidth)){
		a.style.left = (Bwidth-mainWidth)+ "px";
		
	}else{
		a.style.left = (d.clientX - b) + "px";
	}
	if((d.clientY - c)<0){
		a.style.top = mTop+ "px";
	}else if((d.clientY - c)>(Bheight-mainHeight)){
		a.style.top = (Bheight-mainHeight)+ "px";
		
	}else{
		a.style.top = (d.clientY - c) + "px";
	}
};
function move(e,idName){
a=document.getElementById("mainPanel"+idName);
document.all?a.setCapture():window.captureEvents(Event.MOUSEMOVE);
b=e.clientX-parseInt(a.style.left);
c=e.clientY-parseInt(a.style.top);
}
function closeAlert(typeName){
	if (typeName==null || typeName=="")  {
		typeName="alert";
	};
	$("#mainPanel"+typeName).remove();
	$("#bg"+typeName).remove();
}


//web_ui中的
(function($){
				$.extend({
					/**
					 * 扩展JQuery判断是否是字符串
					 * @borrows $
					 * */
					isString:function(val){
						return Object.prototype.toString.call(val) === "[object String]";
					},
					isNull : function(val){
					    return val === null || val === undefined;
					},
					/**
					 * 扩展JQuery判断是否是数字
					 * */					
					isNumber:function(val){
						return Object.prototype.toString.call(val) === "[object Number]";
					},
					/**
					 * 扩展JQuery 字符串转成json对象
					 * */					
					StringtoJson:function(str){
						return new Function('return '+str+';')();

					},
					/**
					 * 扩展JQuery判断是否是函数
					 * */
					isFunction:function(val){
						return Object.prototype.toString.call(val) === "[object Function]";
					},
					isIE8:function(version){
						if(navigator.appName == "Microsoft Internet Explorer") 
					    { 
					        if(navigator.appVersion.match(/8./i)== '8.'){ 
					        	return true;
					        }else{return false;} 
					    }else{
					    	return false;
					    }
					},
					/**
  					 * 判断是否是IE
  					 * @param version IE版本，如果不指定则判断是否是IE
					 */
					isIE:function(version){
						var browser = navigator.appName;
						if($.isNull(version)){
							if(browser == "Microsoft Internet Explorer"){
								return true;
							}else{
								return false;
							}
						}else{
							if(browser == "Microsoft Internet Explorer"){
								var b_version=navigator.appVersion;
								var version = b_version.split(";");
								var trim_Version = version[1].replace(/[ ]/g,"");
								if(trim_Version == "MSIE7.0"){
									return version == 7;
								}
								if(trim_Version == "MSIE8.0"){
									return version == 8;
								}
								if(trim_Version == "MSIE9.0"){
									return version == 9;
								}
								return true;
						    }else{
						    	return false;
						    }
						}
					},
					/**
					 * 扩展JQuery判断是否是对象
					 * */
					isObject:function(val){
						return Object.prototype.toString.call(val) === "[object Object]";
					},
					/**
					 * 扩展JQuery 获得函数名
					 * */
					getFnName:function(fn){
						return fn.toString().match( new RegExp( "^function\\s+([^\\s\\(]+)", "i" ) )[ 1 ];
					},
					/**
					 * 扩展JQuery 转换为Jquery函数
					 * */
					getJQueryDom:function(element){
						if($.isString(element)){
							element = $("#"+element);
						}else{
							element = $(element);
						}
						return element;
					},
					/**
					 * 扩展JQuery 原型继承
					 * */
					apply:function(orial,target){
						for(var t in target){
							if(!orial.prototype[t]){
								orial.prototype[t]=target[t];
							}
						}
					},
					copyObject:function(orial,target){
						for(var t in orial){
							if(orial[t]){
								target[t] = orial[t];
							}
						}
						return target;						
					},
					/**
					 * 推数据调用
					 * @param cometdURL String 推数据URL
					 * @param receiveFunction  Function 接收数据后的回调函数，参数msg：接收的文本
					 * @param msgType String 需要接受的消息类型
					 * @param clientId String 页面请求客户端ID,确保唯一
					 * 
					 * disconnect();关闭
					 * */
					push:function(cometdURL,receiveFunction,msgType,clientId){
						var $cometd = window.pushCometdObj[cometdURL];
						var _metaUnsuccessfulFunction = function(cometdURL,receiveFunction,msgType,clientId){
							return function(msg){
								if(msg){
									var $cometd = window.pushCometdObj[cometdURL];
									if(msg.channel=="/meta/connect"){
										if(msg.error && "402::Unknown client" == msg.error){
											$cometd.handshake();
											$cometd.publish("/regist", { 
												msgType: msgType ,
												clientId: clientId
											});
										}
									}
								}
							};
						}
						var new$cometd = function (){
							$$cometd = new $.Cometd();
							window.pushCometdObj[cometdURL] = $$cometd;
							
							$$cometd.websocketEnabled = true;
							$$cometd.configure({
									url : cometdURL+"/serverpush",
									logLevel : 'info'
								});
							$$cometd.clearListeners();
							//$$cometd.addListener('/meta/handshake', _metaHandshake);
							$$cometd.addListener('/meta/unsuccessful',_metaUnsuccessfulFunction(cometdURL,receiveFunction,msgType,clientId));
//							$$cometd.addListener('/meta/connect', _metaConnect);
							$$cometd.addListener('/push', receiveFunction);
							$$cometd.handshake();
							
							
							
							
							return $$cometd;
						}
						if(!$cometd){
							$cometd = new$cometd();
						}else {
							if($cometd.isDisconnected()){
								$cometd = new$cometd();
							}
						}
						$cometd.publish("/regist", { 
							msgType: msgType ,
							clientId: clientId
						});
						return $cometd;
					},

					/**
					 * 格式化日期
					 * @time {int}毫秒数
					 * @format 格式 
					 * @example
					 * 	$.formatData(1455211411,"{year}-{date}-{month}");
					 * */
					formatDate:function(time,format){
						format = format ? format: window.defaultLocale == "en_US" ? "{month}/{date}/{year} {hours}:{minutes}:{seconds}":"{year}-{month}-{date} {hours}:{minutes}:{seconds}";
						var tempdate = new Date(time);
						var year = /\{year\}/gim;
						var date = /\{date\}/gim;
						var month = /\{month\}/gim;
						
						var hours = /\{hours\}/gim;
						var minutes = /\{minutes\}/gim;
						var seconds = /\{seconds\}/gim;
						
						
						
						var hour = tempdate.getHours();
						hour = hour < 10 ? "0"+hour : hour;	
						
						var minute = tempdate.getMinutes();
						minute = minute < 10 ?"0"+minute : minute;	
						
						var second = tempdate.getSeconds();
						second = second < 10 ?"0"+second:second;
						
						var monthD = tempdate.getMonth()+1;
						monthD  = monthD < 10 ? "0"+monthD : monthD;
						
						var dateD = tempdate.getDate();
						dateD = dateD < 10 ? "0"+dateD : dateD;
						
						
						return format.replace(year,tempdate.getFullYear()).replace(month,monthD).replace(date,dateD).replace(hours,hour).replace(minutes,minute).replace(seconds,second);
						
					},
					/**
					 * 获得指定区间类型
					 * @param regionType 区间类型 f:30等等f分钟，h小时，d天，m月，y年
					 * @param format 获得时间文本格式，非必填，有默认值{year}-{month}-{date} {hours}:{minutes}
					 * */
					getRegionTime:function(regionType,format){
						format = format || "{year}-{month}-{date} {hours}:{minutes}";
						var nowDate = new Date().getTime();
						var types = regionType.split(":");
						var dateTypes = [{type:"f",time:60},{type:"h",time:60},{type:"d",time:24},{type:"m",time:30},{type:"y",time:12}];
						
						var regiontime = 1000;
						
						for(var i=0,len = dateTypes.length;i<len;i++){
							regiontime = regiontime*dateTypes[i].time;
							if(dateTypes[i].type == types[0]){
								break;
							}
						}
						
						if(!window.ServerTime || !window.ClientTime){
							return null;
						}
						
						nowDate = ServerTime + (nowDate - ClientTime);
						regiontime = regiontime*parseInt(types[1]);
						var beforeTime = nowDate-regiontime;
						return {
							start:{
								time:beforeTime,
								timeStr:$.formatDate(beforeTime,format)
							},
							end:{
								time:nowDate,
								timeStr:$.formatDate(nowDate,format)
							}
						}
					},
					
					/**
					 * 将日期格式字符串转换为毫秒数
					 * @param timeStr 以‘-’分割的日期
					 * */
					parseDate:function(timeStr){
						var array = timeStr.split(" ");
						
						var timeArray = array[0].split("-");
						var date = new Date();
												
						date.setFullYear(parseInt(timeArray[0]));
						date.setMonth(parseInt(timeArray[1],10)-1);
						date.setDate(parseInt(timeArray[2],10));
						
						if(array.length > 1){
							timeArray = array[1].split(":");
							date.setHours(parseInt(timeArray[0],10)-1);
							date.setMinutes(parseInt(timeArray[1],10)-1);
						}
						
						return date.getTime();

					},
					/**验证开始时间和结束时间大小*/
					checkDate:function(startDate,endDate){
						var start = $.parseDate(startDate);
						var end = $.parseDate(endDate);
						return start<end;
					},
					get_previousSibling : function(n){  
					    var x = n.previousSibling;  
					    if(!x) return null;  
					    while (x && x.nodeType != 1){  
					        x = x.previousSibling;  
					    }  
					    return x;  
					},  
					dimensions:function() {
							var winWidth = 0,winHeight = 0;
							// 获取窗口宽度
							if (window.innerWidth) {
								winWidth = window.innerWidth;
							} else if ((document.body) && (document.body.clientWidth)) {
								winWidth = document.body.clientWidth;
							}
							// 获取窗口高度
							if (window.innerHeight) {
								winHeight = window.innerHeight;
							} else if ((document.body) && (document.body.clientHeight)) {
								winHeight = document.body.clientHeight;
							}
							// 通过深入Document内部对body进行检测，获取窗口大小
							if (document.documentElement && document.documentElement.clientHeight
									&& document.documentElement.clientWidth) {
								winHeight = document.documentElement.clientHeight;
								winWidth = document.documentElement.clientWidth;
							}

							return {
								height : winHeight,
								width : winWidth
							};

						},					
							
					/**
					 * 获得元素全尺寸包括内外边距
					 * @param dom元素
					 * @return json{width:,height}					 
					*/
					getAllSize:function(dom){
						var $dom = $.getJQueryDom(dom);
						var borderSize = $.getBorderWidth(dom);				
						return {
							height : $.getVertical($dom, "margin") + $.getVertical($dom, "padding") + $dom.height() + borderSize.vertical,
							width : $.getLandscape($dom, "margin") + $.getLandscape($dom, "padding") + $dom.width() + borderSize.landscape
						}
					},
					/**
					 * 获得字符串长度，汉字占用2个字符，字母占用1个字符
					 * */
					strLen:function(s) {
						var l = 0;
						var a = s.split("");
						for (var i=0;i<a.length;i++) {
						 if (a[i].charCodeAt(0)<299) {
						  l++;
						 } else {
						  l+=2;
						 }
						}
						return l;
					},
					/**判断点击是否在目标体之外
					 * @param position 点击时的坐标
					 * @param targetDom 点击目标dom元素，可以使id,或dom节点 
					 * @return boolean false表示点击在目标体外，true表示之内
					 * */
					checkClickPointerIsOuter:function(position,targetDom){
						var layout = $.getElementAbsolutePosition(targetDom);
						var brPosition = $.getBottomRight(targetDom);
						if(position.x < layout.x || position.x > brPosition.right || position.y < layout.y || position.y > brPosition.bottom){
							return true;
						}else{
							return false;
						}
						
					},
					
					/**获得元素右下角坐标*/
					getBottomRight:function(dom){
						var layout = $.getElementAbsolutePosition(dom);
						var borderWidth = $.getBorderWidth(dom);
						var $dom = $(dom);
						return {
							right:layout.x + $dom.width() + $.getLandscape(dom,"padding")+ borderWidth.landscape,
							bottom:layout.y + $dom.height() + $.getVertical(dom,"padding") + borderWidth.vertical
							
						}
					},
					/**获得元素边框宽度
					 * @return {landspace:左右边框宽度,vertical:上下边框宽度}
					 * */
					getBorderWidth:function(dom){
						var $dom = $.getJQueryDom(dom);
						var left = parseInt($dom.css("borderLeftWidth"));
						left = isNaN(left) ? 0 : left;
						var right = parseInt($dom.css("borderRightWidth"));
						right = isNaN(right) ? 0 : right;
						var top = parseInt($dom.css("borderTopWidth"));
						top = isNaN(top) ? 0 : top;
						var bottom = parseInt($dom.css("borderBottomWidth"));
						bottom = isNaN(bottom) ? 0 : bottom;

						return {
							landscape:left + right,
							vertical:top + bottom
						}
					},					
					/**
					 * 获得元素距离网页左上角（绝对坐标）
					 * @param element 元素（如果为字符串，则为元素id,否则是dom对象）
					 * @returns {json} {x:,y}				 
					 */
					getElementAbsolutePosition:function(elem){
						if($.isString(elem)){
							elem = document.getElementById(elem);
						}
						
					    if ( !elem ) return {x:0, y:0};
					    var top = 0, left = 0;
					    if ( "getBoundingClientRect" in document.documentElement ){
					        var box = elem.getBoundingClientRect(), 
					        doc = elem.ownerDocument, 
					        body = doc.body, 
					        docElem = doc.documentElement,
					        clientTop = docElem.clientTop || body.clientTop || 0, 
					        clientLeft = docElem.clientLeft || body.clientLeft || 0,
					        top  = box.top  + (self.pageYOffset || docElem && docElem.scrollTop  || body.scrollTop ) - clientTop,
					        left = box.left + (self.pageXOffset || docElem && docElem.scrollLeft || body.scrollLeft) - clientLeft;
					    }else{
					        do{
					            top += elem.offsetTop || 0;
					            left += elem.offsetLeft || 0;
					            elem = elem.offsetParent;
					        } while (elem);
					  }
						return {x:left,y:top};
					},
					/**
					 * 判断当前鼠标事件坐标是否在制定元素上
					 * return {boolean} 
					 * */
					mouseEventBodyRange:function($dom,x,y){
				        var offset = $dom.offset();
				        if (x > offset.left && x < offset.left + $dom.width() && y > offset.top && y < offset.top + $dom.height()) {
				            return true;
				        }else{
				        	return false;
				        }
						
					},
					/**
					 * 计算Dom显示坐标，判断是否超出页面范围，自动调整
					 * @param {Jquery}需要显示的$dom 
					 * @returns {x:y}
					 * */
					checkDomPosition:function($dom,x,y,width,height){
				        height = height ? height : $dom.height();
				        width = width ? width : $dom.width();
				        var scrollWidth = document.body.scrollWidth;
				        var scrollHeight = document.body.scrollHeight;
				        var clientWidth = document.body.clientWidth;
				        var clientHeight = document.body.clientHeight;
				        var scrollTop = document.body.scrollTop;
				        var scrollLeft = document.body.scrollLeft;

				        var windowInnerY = clientHeight - (y - scrollTop);
				        var checkY = windowInnerY - height;
				        y = checkY < 0 ? y + checkY - 2 : y;
				        var windowInnerX = clientWidth - (x - scrollLeft);
				        var checkX = windowInnerX - width;
				        x = checkX < 0 ? x + checkX - 2 : x;	
				        return {x:x,y:y,checkY:checkY,checkX:checkX};
					},
					/**
					 * 获得元素垂直方向Margin/Padding值
					 * @param dom {id/dom}元素
					 * @param styleName 样式名称{string} margin/padding
					 * @returns {int}
					 * */
					getVertical:function(dom,style){
						var $dom = null;
						if($.isString(dom)){
							$dom = $("#"+dom);
						}else{
							$dom = $(dom);
						}
						return parseInt($dom.css(style+"Top"))+parseInt($dom.css(style+"Bottom"));
					},
					/**
					 * 计算居中，垂直和水平
					 * */
					calculateCenter:function(apply,dom){
						dom = $(dom);
						if(apply == document.body){
							var scrollWidth = document.body.scrollWidth;
							var scrollHeight = document.body.scrollHeight;
							
							var clientWidth = document.body.clientWidth;
							var clientHeight = document.body.clientHeight;
							
							var scrollTop = document.body.scrollTop;
							var scrollLeft = document.body.scrollLeft;	
							
							dom.css({top:scrollTop + clientHeight/2 - dom.height()/2,left:scrollLeft + clientWidth/2 - $dom.width()/2});
						}else{
							apply = $(apply);
							dom.css({top:apply.height()/2-dom.height()/2,left:apply.width()/2 - dom.width()/2})
						}
					},
					/**
					 * 获得元素横向Margin/Padding值
					 * @param dom {id/dom}元素
					 * @param styleName 样式名称{string} margin/padding
					 * @returns {int}
					 * */
					getLandscape:function(dom,style){
						var $dom = null;
						if($.isString(dom)){
							$dom = $("#"+dom);
						}else{
							$dom = $(dom);
						}
						return parseInt($dom.css(style+"Left"))+parseInt($dom.css(style+"Right"));
					},
					/**
					 * 上传
					 * @param uploadUrl:上传URL
					 * @param post_params:post提交附带参数
					 * @param limit 上传文件大小限制
					 * @param type 上传文件类型 默认全部 ,例如.gif .jpg
					 * @param btnId 上传按钮ID即页面dom元素ID,组件会将该DOM渲染为按钮
					 * @param progressId 组件Id
					 * 
					 * 开始上传startUpload()
					 * 结构
					 * 	&lt;form id="form1" action="index.php" method="post" enctype="multipart/form-data">
					 *		&lt;div class="fieldset flash" id="fsUploadProgress">
					 *		&lt;span class="legend">Upload Queue&lt;/span>
					 *		&lt;/div>
					 *		&lt;div id="divStatus">0 Files Uploaded&lt;/div>
					 *		&lt;div>
					 *			<span id="spanButtonPlaceHolder">&lt;/span>
					 *			<input id="btnCancel" type="button" value="Cancel All Uploads" onclick="swfu.cancelQueue();" disabled="disabled" style="margin-left: 2px; font-size: 8pt; height: 29px;" />
					 *		&lt;/div>
					 *	&lt;/form>
					 * */
					upload:function(conf){
						var post_params = conf.post_params ? conf.post_params :{};
						var limit = conf.limit ? conf.limit : "10240";
						var type = conf.type ? conf.type :".";
						var btnId = conf.btnId ? conf.btnId : "spanButtonPlaceHolder";
						var progressId = conf.progressId ? conf.progressId : "fsUploadProgress";
							var settings = {
								flash_url : ctx+"/static/3rd/swfupload/js/swfupload.swf",
								upload_url: conf.uploadUrl,
								post_params: post_params,
								file_size_limit : limit,
								file_types : "*.*",
								file_types_description : "All Files",
								file_upload_limit : 500,
								file_queue_limit : 0,
								custom_settings : {
									progressTarget : progressId
								},
								debug: false,
								button_image_url: ctx+"/static/3rd/swfupload/images/upload.png",
								button_width: "69",
								button_height: "24",
								button_placeholder_id: btnId,
								button_text: '<span class="theFont">'+window.S_BTNUPLOAD+'</span>',
								button_text_style: ".theFont { font-size: 12; color:#FFFFFF}",
								button_text_left_padding: 24,
								button_text_top_padding: 3,
								button_window_mode:"transparent",
								button_cursor:-2,
								// The event handler functions are defined in handlers.js

								file_queued_handler : fileQueued,
								file_queue_error_handler : fileQueueError,
								file_dialog_complete_handler : fileDialogComplete,
								upload_start_handler : uploadStart,
								upload_progress_handler : uploadProgress,
								upload_error_handler : uploadError,
								upload_success_handler : uploadSuccess,
								upload_complete_handler : uploadComplete,
								queue_complete_handler : queueComplete	// Queue plugin event

							};
							var swfu  = new SWFUpload(settings);
							return swfu;
					},
					/**获取cookie值
					 * @param name 
					 * */
					getCookie:function(name){
						var arg = name + "=";
				        var alen = arg.length;
				        var clen = document.cookie.length;
				        var i = 0;
				        while (i < clen) {
				            var j = i + alen;
				            //alert(j);
				            if (document.cookie.substring(i, j) == arg) return $.getCookieVal(j);
				            i = document.cookie.indexOf(" ", i) + 1;
				            if (i == 0) break;
				        }
				        return null;
					},
					getCookieVal:function(offset){
						var endstr = document.cookie.indexOf(";", offset);
				        if (endstr == -1) endstr = document.cookie.length;
				        return unescape(document.cookie.substring(offset, endstr));
					},
					/**判断指定的元素在数组中是否存在*/
					isExistArray:function(item,array){
						var isExist = false;
						for(var i=0,len = array.length;i<len;i++){
							if(array[i] == item){
								return true;
							}
						}
						return false;
					},
					/**两数组比较是否相同*/
					compareArray:function(array1,array2){
						var result = array1 == array2;
						if(result) return result;
						if(array1 == null || array2 == null || array1.length != array2.length){
							return false;
						}
						for(var i=0,iLen = array1.length;i<iLen;i++){
							for(var j=0,jLen = array2.length;j<jLen;j++){
								if(array1[i] != array2[j]){
									return false;
								}
							}
						}
						return true;
					},
					/**比较两个对象中的属性是否相同*/
					comparePrototype:function(obj1,obj2){
						if(obj1 == null || obj2 == null){
							return false;
						}
						for(var key in obj1){
							if( obj1[key] != obj2[key]){
								return false;
							} 
						}
						
						for(var key in obj2){
							if( obj1[key] != obj2[key]){
								return false;
							} 
						}
						
						return true;
					},
					/*
					 * 返回将属性列表中dom对象属性值
					 */
					getDomAttrToJSON : function(dom, attrList){
						var $dom = $.getJQueryDom(dom);
						var attrJSON = {};
						for(var i=0, len = attrList.length; i < len; i++){
							attrJSON[attrList[i]] = $dom.attr(attrList[i]);
						}
						return attrJSON;
					},
					/**创建DOM字符串
					 * @param conf.tagName {String}标签名称
					 * @param conf.style {json} style样式
					 * @param conf.attr {json} 标签属性值
					 * @param conf.attrStr {String} 属性字符串形式a="1" b="2" 
					 * @param conf.content {String} 标签内部内容
					 * 
					 * */
					createDomStr:function(conf){
						var tagName = conf.tagName.toLowerCase(),style = conf.style, attr = conf.attr, content = conf.content;
						var dom = [];
						dom.push('<');
						dom.push(tagName);
						if(style){
							dom.push(' style="')
							for(var key in style){
								if(style[key]){
									dom.push(key + ":" + style[key] + ";");	
								}
							}
							dom.push('" ');
						}
						if(attr){
							for(var key in attr){
								if(attr[key]){
									dom.push(' '+ key + '="' + attr[key] + '" ');
								}
								
							}
						}
						
						if(conf.attrStr){
							dom.push(conf.attrStr);
						}
						
					    if(tagName === 'input' || tagName === 'img'){
					    	dom.push("/>");
					    	return dom.join("");
					    }
						
						dom.push('>');
						dom.push(content);
						dom.push('</' + tagName + '>');
						
						return dom.join("");
					},
					/**
					 * 设置文本框只能输入数字
					 * @param conf.input {String/dom} 待绑定文本框
					 * @param conf.decimal {Boolean} 是否允许输入小数  默认不允许false
					 * @param conf.faileCallBack {Function} 自定义不允许输入情况
					 * */
					onlyNumber:function(conf){
						var $input = $.getJQueryDom(conf.input);
						$input.bind("keydown",{conf:conf},_onlyNumber);
					}
				});
				/*文本框只能输入数字具体执行函数*/
				function _onlyNumber(event){
					var conf = event.data.conf;
					var keyCode = event.keyCode;
					var decimal = conf.decimal;//允许输入小数点
					var originalEvent = event.originalEvent;
					//如果输入的键值为数字，（大48-57小96-105）退格(8)，删除按钮（大(105)小(110)键盘），home end上下左右（35-39）,numLock(144)，Tab(9) 小数点(190)
					if(keyCode >= 48 && keyCode <=57 ||
							keyCode >=96 && keyCode <=105 || 
							keyCode >=36 && keyCode <= 39 ||
							decimal === true && keyCode == 190 ||
							keyCode == 8  || keyCode == 110 || keyCode == 46 || keyCode == 9 || keyCode == 144){
							if(!decimal && keyCode == 110){
								event.preventDefault();					   						     								
							}
						return;
					}else{
						if(conf.faileCallBack){
							conf.faileCallBack(this,event);
						}
						event.preventDefault();			
						
					    return false;		
					}
				}
})(jQuery);

;/**
 * @class
 * 表单验证组件
 * */
var FormValidate = function(){
	//内部保存每个表单字段验证处理函数
	//属性：customValidate为用户自定义验证函数
	//属性：remoteUrl:远程验证的url,可能是静态url字符串,或者函数，动态生成url
	//属性：validating:标识正在验证中
	var formResult = {};
	var timeout = {};
	return {
			/**
			 *  初始化表单项
			 *  @param element ｛dom/id｝ 需要在验证的表单域
			 * */
			initDefault:function(element){
				var $element = $.getJQueryDom(element);
				var $targets = $element.find('[validate][isValidate!="false"]');
				if(!formResult[$element.attr("id")]){
					formResult[$element.attr("id")] = {};
				}
				var target = null;
				for(var i=0,len = $targets.length;i<len;i++){
					target = $targets[i];
					this.bindValidate(target,null,$element.attr("id"));
				}
			},
			/**
			 * 添加自定义验证
			 * @param formId {String} 表单ID
			 * @param targetDom {String} 验证的字段对象或id
			 * @param eventName {String} 出发验证事件名
			 * @param validateHandler {function}验证函数
			 * @param errorMsg {String} 错误信息
			 * */
			addCustomValidate:function(formId,targetDom,eventName,validateHandler,errorMsg){
				var $targetDom = $.getJQueryDom(targetDom);
				FormValidate.bindValidate($targetDom,eventName,formId,validateHandler,"custome");
				var targetName = $targetDom.attr("name");
				if(!formResult[formId]["customValidate"]){
					formResult[formId]["customValidate"] = {};
				}
				if(!formResult[formId]["customValidate"][targetName]){
					formResult[formId]["customValidate"][targetName] = []; 
				}
				$targetDom.attr("ErrorMsg",errorMsg);
				formResult[formId]["customValidate"][targetName].push(validateHandler);
			},
			/**
			 * 停止某个字段验证
			 * @param formId 表单外层ID，如果不是字符串则表示为dom对象
			 * @param filedName 字段Name属性值,如果不是字符串则表示为dom对象
			 * */
			stopValidate:function(formId,fieldName){
				var $form = $.isString(formId) ? $("#"+formId) : $(formId);
				var $field = $.isString(fieldName) ? $form.find(" [name='"+fieldName+"']") : $(fieldName);
				$field.attr("isValidate","false").removeClass("border-red").removeAttr("nowError");
			},
			/**
			 * 开始某个字段验证
			 * @param formId 表单外层ID
			 * @param filedName 字段Name属性值
			 * */			
			startValidate:function(formId,fieldName){
				var $form = $.isString(formId) ? $("#"+formId) : $(formId);
				var $field = $.isString(fieldName) ? $form.find(" [name='"+fieldName+"']") : $(fieldName);				
				$field.removeAttr("isValidate");
			},					
			/**
			 * 远程验证添加验证url
			 * formId： {String} formId
			 * fieldName: {String} 字段Name
			 * url:远程验证地址，{function} 用于动态生成url,该函数参数为需要验证的值。
			 * */
			addRemoteUrl:function(formId,fieldName,url){
				if(!formResult[formId]["remoteUrl"]){
					formResult[formId]["remoteUrl"] = {}
				}
					formResult[formId]["remoteUrl"][fieldName] = []
				formResult[formId]["remoteUrl"][fieldName].push({"fieldName":fieldName,"url": url});
				FormValidate.bindValidate($("#"+formId+' [name="'+fieldName+'"]'),null,formId);
			},
			
			/**
			 * 提示表单域有错误，但是不显示错误信息，帮定当鼠标悬浮的触发显示错误信息事件
			 * @param targetDom {dom/id} 需要显示信息的表单域
			 * @param info {String} 信息
			 * */
			showErrorMessage:function(targetDom,info){
				
				FormValidate.setError(targetDom,info);
				FormValidate.bindValidate(targetDom);
			},
			/*
			 * @inner
			 * 设置当前验证错误信息，将其变为红色边框
			 * @param  {jquery} $target 需要显示错误信息的表单域对象
			 * @param  {String} errormessage 错误信息
			 * */
			setError:function($target,errormessage){
				$target.attr("nowError",errormessage);
				$target.addClass("border-red");
			},
			/**
			 *
			 * */
			showError:function(event){
				event.stopPropagation();
				event.preventDefault();
				if(!FormValidate.isErrorField(this)){return;}
				var $targetDom = $(this);
				if($.isIE(7) || document.documentMode == 7){					
					clearTimeout(timeout[$targetDom.attr("unique")]);
					delete timeout[$targetDom.attr("unique")];					
				}

				$targetDom.attr("hasHideError","true");
				var nowError = $targetDom.attr("nowError");
				FormValidate.showErrorMsg(this,nowError);				
			},
			/**
			 * 指定字段是否有错误
			 * @param 字段对象，可以是元素ID或dom
			 * @return true有错误，false正确
			 * */
			isErrorField:function($target){
                var $target = $.getJQueryDom($target);
				return $target.hasClass("border-red");
			},
			/**
			 * 对外提供显示错误信息方法
			 * @param target 验证字段
			 * @param nowError 错误信息
			 * */
			showErrorMsg:function(target,nowError){
				var $targetDom = $.getJQueryDom(target);
				var layout = $.getElementAbsolutePosition($targetDom[0]);
				if(document.documentElement && document.documentElement.scrollTop){
					layout.y = layout.y+document.documentElement.scrollTop;
				}
				var $arrows = $('<div class="point-bottom-arrow"></div>');
				var name = $targetDom.attr("name");
				if(name){
					name = name.replace("\.","_");
				}
				var $FormValidateDiv = $("div.point-window");
				if($FormValidateDiv[0]){
					if($FormValidateDiv.attr("id").indexOf(name) != -1){
						return;
					}else{
						$FormValidateDiv.remove();
					}
				}				

				$FormValidateDiv =  $('<div id="' + name +'FormValidateDiv" class="point-window"><div class="point"><p class="point-info">'+nowError+'</p></div></div>');
				if(nowError){
					$(document.body).append($FormValidateDiv);
				}
				var newLayout = $.checkDomPosition($FormValidateDiv,layout.x,layout.y-$FormValidateDiv.height());
				var x = newLayout.x;
				var y = newLayout.y;
				if(newLayout.y<0){
					y = y + $targetDom.height()+$FormValidateDiv.height()+5;
					$arrows.addClass("point-top-arrow");
					$FormValidateDiv.prepend($arrows);
					if(layout.x != x){
						$arrows.addClass("point-top-right-arrow");
						x= layout.x - 200 + $targetDom.width();
					}
				}else{
					$arrows.addClass("point-bottom-arrow");
					$FormValidateDiv.append($arrows);
					y = y - 5;
					if(layout.x != newLayout.x){
						$arrows.addClass("point-bottom-right-arrow");
						x= layout.x - 200 + $targetDom.width();
					}
				}
				$FormValidateDiv.css({left:x,top:y,"z-index":ZIndexMgr.get()});
			},
			/**
			 * 隐藏错误信息
			 * */
			hideErrorMessage:function(targetDom){
				var $targetDom = $.getJQueryDom(targetDom);	
				$targetDom.removeAttr("nowError");
				$targetDom.removeClass("border-red");
				FormValidate._hideErrorDiv($targetDom);
			},
			/**隐藏错误信息层*/
			_hideErrorDiv:function($targetDom){
				var name = $targetDom.attr("name");
				if(name){
					name = name.replace("\.","_");
				}
				var $errorDiv = $("#" + name + "FormValidateDiv");
				if(window.ZIndexMgr){
					ZIndexMgr.free($errorDiv);
				}
				$errorDiv.remove();	

				if($.isIE(7) || document.documentMode == 7){
					delete timeout[$targetDom.attr("unique")];	
				}	
			},
			blurHideErrorMessage:function(event){
				event.stopPropagation();
				event.preventDefault();
				var $targetDom = $.getJQueryDom(this);
				if(!FormValidate.isErrorField($targetDom)){return;}
				$targetDom.removeAttr("hasHideError");
				if($.isIE(7)  || document.documentMode == 7){
					var unique = new Date().getTime()+" "+Math.floor(Math.random()*100);
					$targetDom.attr("unique",unique);
					timeout[unique] = setTimeout(function(){
						FormValidate._hideErrorDiv($targetDom);
					},800);
				}else{
					FormValidate._hideErrorDiv($targetDom);
				}
			},
			/*
			 * @inner
			 * 绑定验证事件
			 * @param targetDom 绑定验证的表单域对象
			 * @param eventName 验证触发事件  如果为null，默认为blur
			 * @param formId 所属表单
			 * */
			bindValidate:function(targetDom,eventName,formId,validateHandler,bindType){
				var $targetDom = $.getJQueryDom(targetDom);//.css("overflow","hidden");
				var flag = true;
				if($targetDom.attr("isBind")=="true"){
					flag = false;
				}
				
				if(bindType && $targetDom.attr("isBindCustome") =="true"){
					flag = false;
				}else if(bindType && $targetDom.attr("isBindCustome") !="true"){
					flag = true;
				}
				if(!flag){
					return;
				}
				eventName = eventName ? eventName :"blur";

				$targetDom.bind("mousemove",{},FormValidate.showError);
				$targetDom.bind("mouseout",{targetDom:$targetDom},FormValidate.blurHideErrorMessage);
				
				$targetDom.bind(eventName,{formId:formId,validateHandler:validateHandler},FormValidate.validateHandler).attr("isBind","true");
				if(bindType){
					$targetDom.attr("isBindCustome","true");
				}
			},
			/*
			 * @inner
			 * 验证事件处理函数,单独提出来，目的是不会在每次绑定事件的时候，都生成一个函数，处于性能考虑
			 * */
			validateHandler:function(event){
				var formValidate = FormValidate;
				var $target = $(this);
				if($target.attr("isValidate")){
					return;
				}
				var formId = event.data.formId;
				var validateHandler = event.data.validateHandler;
				var result = false;
				var validateModules = $target.attr("validate").split(",");
				for(var i=0,len = validateModules.length-1 ;i<len;i++){
					result = FormValidate.validateType[validateModules[i]]($target);
					if(result ==  false){
						formValidate.setError($target,$target.attr(validateModules[i]+"ErrorMsg"));
						return;
					}else{
						formValidate.hideErrorMessage($target);
					}					
				}
				
				if(validateHandler){
					result = validateHandler($target);
					if(result ==  false){
						formValidate.setError($target,$target.attr(validateModules[i]+"ErrorMsg"));
						return;
					}else{
						formValidate.hideErrorMessage($target);
					}						
				}
				//搜索该字段是否有ajax验证
				var remoteUrls = formResult[formId] && formResult[formId]["remoteUrl"] ? formResult[formId]["remoteUrl"][$target.attr("name")] : null;
				if(remoteUrls){
					var remoteField = null;
					for(var i=0 , len = remoteUrls.length;i<len;i++){
						remoteField =remoteUrls[i]; 
							
							var  url = remoteField.url;
							if(!$.isString(url)){
								url = url($target.val());
							}
							var urls = url.split("?");
							
							var paramsArray = urls[1].split("&");
							var data = {};
							for(var i=0;i<paramsArray.length;i++){
								var params = paramsArray[i].split("=");
								data[params[0]] =params[1];
							}
							
							PageCtrl.ajax({
								url:urls[0],
								cache: false,
								type:"post",
								data:data,
								dataType:"text",
								success:function(text){
									if(text !== "true"){
										if(text !== "false"){//如果返回不是false，那么表示返回的是错误信息
											$target.attr("ajaxErrorMsg",text);
										}
										formValidate.setError($target,$target.attr("ajaxErrorMsg"));
										return;
									}else{
										formValidate.hideErrorMessage($target);
									}
								}
							});							
					}
				}
			},
			/**
			 * 手动全部验证
			 * @param formId 表单外层ID
			 * @param callback 验证通过callback
			 * @param errorback 验证失败errorback
			 * */
			validate:function(formId,callback,errrorback){
				var formValidate = FormValidate;
				var $Form = $.getJQueryDom(formId);
				var $targets = $Form.find('[validate][isValidate!="false"]');
				var $target = null;
				var validateModules  = null;
				var result = true;
				var validResult=true;
				//先验证默认
				for(var i=0,len = $targets.length;i<len;i++){
					$target = $($targets[i]);
					var validateModules = $target.attr("validate").split(",");
					for(var j=0,jlen = validateModules.length-1 ;j<jlen;j++){
						var defaultResult = FormValidate.validateType[validateModules[j]]($target);
						if(defaultResult ==  false){
							result = defaultResult;							
							formValidate.setError($target,$target.attr(validateModules[j]+"ErrorMsg"));
							validResult=false;
							break;
						}else{
							formValidate.hideErrorMessage($target);
						}
					}
				}
				
				if(result===false){
					if(errrorback){
						errrorback();
					}
					return;
				}
				
				//如果默认验证通过并且有自定义的验证
				var customValidate = formResult[formId] ? formResult[formId]["customValidate"] : null;
				if(customValidate){
					var customValidateFns = null;
					for(var targetName in customValidate){
						customValidateFns = customValidate[targetName];
						for(var i=0,len = customValidateFns.length;i<len;i++){
							$target = $Form.find('input[name="'+targetName+'"]');
							var defaultResult = customValidateFns[i]($target);
							if(defaultResult!==true){
								var ErrorMsg = $target.attr("ErrorMsg");
								if($target.attr("type")=="hidden"){
									$target = $target.parent();
								}
								
								formValidate.setError($target,ErrorMsg);
								validResult=false;
								result = false;
							}else{
								formValidate.hideErrorMessage($target);
							}
						}
					}
				}

				if(result===false){
					if(errrorback){
						errrorback();
					}
					return;
				}
				
				var remoteUrlFns = formResult[formId] ? formResult[formId]["remoteUrl"] : null;
				
				var targetNames = [];
				for(var key in remoteUrlFns){
					targetNames.push(key);
				}
				var remoteUrlFnsPoint = 0;
				var fieldRemote = null;
				
				function validateRound(){
					fieldRemote = remoteUrlFns[targetNames[remoteUrlFnsPoint]];
					if(fieldRemote && fieldRemote[0]){
						var $target = $Form.find('[name="'+fieldRemote[0].fieldName+'"]');
						var  url = fieldRemote[0].url;
						if(!$.isString(url)){
							url = url($target.val());
						}
						var urls = url.split("?");
						
						var paramsArray = urls[1].split("&");
						var data = {};
						for(var i=0;i<paramsArray.length;i++){
							var params = paramsArray[i].split("=");
							data[params[0]] =params[1];
						}
						
						PageCtrl.ajax({
							url:urls[0],
							cache: false,
							type:"post",
							dataType:"text",
							data:data,
							success:function(text){
								var $target = $Form.find('[name="'+fieldRemote[0].fieldName+'"]');
								if(text !== "true"){//异步返回true表示验证通过，反之不通过
									if(text !== "false"){//如果返回不是false，那么表示返回的是错误信息
										$target.attr("ajaxErrorMsg",text);
									}
									formValidate.setError($target, $target.attr("ajaxErrorMsg"));
									validResult = false;
									return;
								}else{
									formValidate.hideErrorMessage($target);
								}
								remoteUrlFnsPoint++;
								validateRound();
							}
						});
					}else{
						if(callback){
							callback();
						}
					}
				}
				
				if(remoteUrlFns!=null){
					validateRound();
				}else if(validResult){
					if(callback){
						callback();
					}					
				}else{
					if(errrorback){
						errrorback();
					}
				}
				
				return result;
			},
			/**
			 * 实际验证表单域
			 * */
			validateType:{
				/**
				 * ajax验证默认占位
				 * */
				ajax:function($target){
					return true;
				},
				/**不能为空,如果和默认值相同的值，也判定是为空*/
				reqiured:function($target){
					var val = $target.val();
					return  !Validate.isEmpty(val) && val != $target.attr("emptyValue");
				},
				required:function($target){
					var val = $target.val();
					return  !Validate.isEmpty(val) && val != $target.attr("emptyValue");
				},				
				/**是否是字符串*/
				isString:function($target){
					return true;
				},
				/**是否是数字*/
				isNumber:function($target){
					return Validate.isNumber($target.val());
				},
				/**是否是整型*/
				isInt:function($target){
					var val = $target.val();
					if(val=="") return true;
					if(val == $target.attr(InputEmpty.EmptyVal)) return true;
					return Validate.isInt($target.val());
				},
				/*
				 *正整数
				 * */
				isPlusInt:function($target){
					var val = $target.val();
					if(val=="") return true;
					return Validate.isPlusInt($target.val());
				 },				
				 /*
				  *负整数
				  * */
				 isMinusInt:function($target){
						var val = $target.val();
						if(val=="") return true;
					 return Validate.isMinusInt($target.val());
				 },
				 /**自然数*/
				 isNaturalNum:function($target){
					 var val = $target.val();
					 if(val=="") return true;
					 if(val == $target.attr(InputEmpty.EmptyVal)) return true;
					 return Validate.isNaturalNum($target.val());
				 },
				 /**大于等于0，且可以为小数点一位*/
				 isGTEqualZeroFloatOne:function($target){
					 var val = $target.val();
					 if(val=="") return true;
					 return Validate.isGTEqualZeroFloatOne($target.val());					 
				 },
				 /**大于等于0，且可以为小数点二位*/
				 isGTEqualZeroFloatTwo:function($target){
					 var val = $target.val();
					 if(val=="") return true;
					 return Validate.isGTEqualZeroFloatTwo($target.val());					 
				 },
				 /**大于等于0，且可以为小数点三位*/
				 isGTEqualZeroFloatThree:function($target){
					 var val = $target.val();
					 if(val=="") return true;
					 return Validate.isGTEqualZeroFloatThree($target.val());					 
				 },
				 /**大于等于0，且可以为小数点四位*/
				 isGTEqualZeroFloatFour:function($target){
					 var val = $target.val();
					 if(val=="") return true;
					 return Validate.isGTEqualZeroFloatFour($target.val());					 
				 },
				 /**验证小数位*/
				 isDecimalsNum:function($target){
					var isDecimalsNum = parseInt($target.attr("isDecimalsNum"));					
					if(isDecimalsNum==1){
						return this.isGTEqualZeroFloatOne($target);
					}else if(isDecimalsNum==2){
						return this.isGTEqualZeroFloatTwo($target);
					}else if(isDecimalsNum==3){
						return this.isGTEqualZeroFloatThree($target);
					}else if(isDecimalsNum==4){
						return this.isGTEqualZeroFloatFour($target);
					}
				 },
				 /**是否是域名*/	
				 isDomain:function($target){
					 var val = $target.val();
					 if(val=="") return true;		
					 return Validate.isDomain($target.val());
				 },
				 /**是否是ip或域名*/
				 isIpOrDomain:function($target){
					var val = $target.val();
					if(val=="") return true;		
					return Validate.isIpOrDomain($target.val());					 
				 },
				/**是否是IP*/
				isIp:function($target){
					var val = $target.val();
					 if(val=="" || val == $target.attr(InputEmpty.EmptyVal)) return true;	
					return Validate.isIp(val);
				},
				/**是否是IP,允许最后一位输入0255*/
				isIp0255:function($target){
					var val = $target.val();
					 if(val=="" || val == $target.attr(InputEmpty.EmptyVal)) return true;	
					return Validate.isIp0255(val);
				},
				isIpRange:function($target){
					var val = $target.val();
					if(val=="" || val == $target.attr(InputEmpty.EmptyVal)) return true;
					var ips = val.split("~");
					if(ips.length!=2 || ips[0]>ips[1]){
						return false;
					}
					for(var i=0,len=ips.length;i<len;i++){
						if(!Validate.isIp(ips[i]))
							return false;
					}
					return true;
				},
				/**验证多个IP,用逗号分割,*/
				isIps:function($target){
					var val = $target.val();
					if(val=="" || val == $target.attr(InputEmpty.EmptyVal)) return true;
					var ips = val.split(",");
					for(var i=0,len=ips.length;i<len;i++){
						if(!Validate.isIp(ips[i]))
							return false;
					}
					return true;
				},
				/**
				 * 是否是IPV6
				 * */
				isIpV6:function($target){
					var val = $target.val();
					 if(val=="") return true;		
					return Validate.isIpV6(val);
				},
				/**最大值*/
				max:function($target){
					var val = $target.val();
					if(Validate.isNumber(val)){
						return !(parseFloat(val)> parseFloat($target.attr("max")));
					}else{
						return false;
					}
				},
				/**最小值*/
				min:function($target){
					var val = $target.val();
					if(Validate.isNumber(val)){
						return !(parseFloat(val) < parseFloat($target.attr("min")));
					}else{
						return false;
					}					
				},
				/**
				 * 数值范围
				 * */
				range:function($target){
					var val = $target.val();
					if(val == ""){
						return true;
					}
					if(Validate.isNumber(val)){
						var range = $target.attr("range").split("-");
						
						var start  = range[0]; 
						if(start.indexOf("*")==0){
							start = "-"+start.substring(1);
						}
						var end = range[1];
						if(end.indexOf("*")==0){
							end = "-"+end.substring(1);
						}						
						return (parseFloat(val) > parseFloat(start) &&parseFloat(val) < parseFloat(end));
					}else{
						return false;
					}					
				},
				rangeEquals:function($target){
					var val = $target.val();
					if(val == ""){
						return true;
					}
					if(Validate.isNumber(val)){
						var range = $target.attr("rangeEquals").split("-");
						
						var start  = range[0]; 
						if(start.indexOf("*")==0){
							start = "-"+start.substring(1);
						}
						var end = range[1];
						if(end.indexOf("*")==0){
							end = "-"+end.substring(1);
						}						
						return (parseFloat(val) >= parseFloat(start) &&parseFloat(val)<= parseFloat(end));
					}else{
						return false;
					}					
				},
				/**端口号1-65535*/
				port:function($target){
					var val = $target.val();
					if(val == ""){
						return true;
					}
					if(Validate.isInt(val)){
						var val = parseInt(val);
						return val>=1 && val <=65535;
					}else{
						return false;
					}					
				},
				/**字符串最大长度汉字2个字符，字母1个字符*/
				maxLen:function($target){
					var val = $target.val();
					if(val == ""){
						return true;
					}					
					var len = $.strLen(val);
					return !(len > parseInt($target.attr("maxLen")));
				},
				/**字符串最小长度*/
				minLength:function($target){
					var val = $target.val();
					if(val == ""){
						return true;
					}else{
						return !(val.length < parseInt($target.attr("minLength")));
					}
				},
				/*TODO*/
				password:function($target){
					return true;
				},
				 /**是否Email*/
				 isEmail:function($target){
					 var val = $target.val();
					 if(val=="") return true;					 
					 return Validate.isEmail(val);
				 },
				 /**是否手机*/
				 isMobile:function($target){
					 var val = $target.val();
					 if(val=="") return true;
					 return Validate.isMobile(val);
				 },
				 /**是否固定电话*/
				 isTel:function($target){
					 var val = $target.val();
					 if(val=="") return true;					 
					 return Validate.isTel(val);
				 },
				 /**是否固定电话或手机*/
				 isTelOrMobile:function($target){
					 var val = $target.val();
					 if(val=="") return true;					 
					 return Validate.isTelOrMobile(val);					 
				 },
				 /**是否邮编*/
				 isZipCode:function($target){
					 var val = $target.val();
					 if(val=="") return true;					 
					 return Validate.isZipCode(val);
				 },
				 /**是否身份证*/
				 isCard:function($target){
					 var val = $target.val();
					 if(val=="") return true;					 
					 return Validate.isCard(val);
				 },
				 /**
				  * 验证特殊字符，如果有返回false,否则true
				  * */
				 isIllegality:function($target){
					 var val = $target.val();
					 if(val=="") return true;				
					 if(val == $target.attr(InputEmpty.EmptyVal)) return true;
					 
					 return Validate.isIllegality(val);					 
				 },
				 /**
				  * 全部非法字符'"%()/\\:?<>;|&@*#
				  * */
				 isIllegalityAll:function($target){
					 var val = $target.val();
					 if(val=="") return true;				
					 if(val == $target.attr(InputEmpty.EmptyVal)) return true;
					 
					 return Validate.isIllegalityAll(val);	
				 },
				 /**
				  * 脚本路径特殊字符'"%\\:?<>|;&@*#"
				  * */
				 isScriptPathIllegality:function($target){
					 var val = $target.val();
					 if(val=="") return true;				
					 if(val == $target.attr(InputEmpty.EmptyVal)) return true;
					 
					 return Validate.isScriptPathIllegality(val);	
				 },
				 /**
				  * 手机，电话，传真特殊字符'"%/:?<>|;&@*#
				  * */
				 isTelIllegality:function($target){
					 var val = $target.val();
					 if(val=="") return true;				
					 if(val == $target.attr(InputEmpty.EmptyVal)) return true;
					 
					 return Validate.isTelIllegality(val);	
				 },
				 /**
				  * 搜索特殊字符'"%()?<>|#*
				  */
				 isSearchIllegality:function($target){
					 var val = $target.val();
					 if(val=="") return true;				
					 if(val == $target.attr(InputEmpty.EmptyVal)) return true;
					 
					 return Validate.isSearchIllegality(val);	
				 },
				 /**
				  * 资源显示名称特殊字符'"%()\\:?<>|;&@#*
				  * */
				 isResourceNameIllegality:function($target){
					 var val = $target.val();
					 if(val=="") return true;				
					 if(val == $target.attr(InputEmpty.EmptyVal)) return true;
					 
					 return Validate.isResourceNameIllegality(val);	
				 },
				 /**
				  * 资源组名称特殊字符'"%/\\:?<>;|&@#*
				  * */
				 isResourceGroupNameIllegality:function($target){
					 var val = $target.val();
					 if(val=="") return true;				
					 if(val == $target.attr(InputEmpty.EmptyVal)) return true;
					 
					 return Validate.isResourceGroupNameIllegality(val);	
				 },
				 /**
				  * URL特殊字符'"%\\<>;|@#*
				  */
				 isURLIllegality:function($target){
					 var val = $target.val();
					 if(val=="") return true;				
					 if(val == $target.attr(InputEmpty.EmptyVal)) return true;
					 
					 return Validate.isURLIllegality(val);
				 },
				 /**
				  * EMail特殊字符'"%/\\:?<>;|&#*
				  */
				 isEmailIllegality:function($target){
					 var val = $target.val();
					 if(val=="") return true;				
					 if(val == $target.attr(InputEmpty.EmptyVal)) return true;
					 
					 return Validate.isEmailIllegality(val);
				 },
				 /**
				  * 用户名特殊字符'"%/:?<>;|&@#*
				  */
				 isUserNameIllegality:function($target){
					 var val = $target.val();
					 if(val=="") return true;				
					 if(val == $target.attr(InputEmpty.EmptyVal)) return true;
					 
					 return Validate.isUserNameIllegality(val);					 
				 },
				 /**
				  * 验证特殊字符不包括冒号，如果有返回false,否则true
				  * */				 
				 isIllegalityExcludeColon:function($target){
					 var val = $target.val();
					 if(val=="") return true;			
					 if(val == $target.attr(InputEmpty.EmptyVal)) return true;
					 return Validate.isIllegalityExcludeColon(val);						 
				 },	
				 /**验证非法字符包括斜杠*/
				 isIllegalityIncludeSlash:function($target){
					 var val = $target.val();
					 if(val=="") return true;			
					 if(val == $target.attr(InputEmpty.EmptyVal)) return true;
					 return Validate.isIllegalityIncludeSlash(val);						 
				 },
				 /**
				  * 是否符合mac格式，返回true符合反之.
				  * */
				 isMac:function($target){
					 var val = $target.val();
					 if(val=="") return true;					 
					 return Validate.isMac(val);		
				 },
				 /**子网掩码*/
				 isMask:function($target){
					 var val = $target.val();
					 if(val=="") return true;					 
					 return Validate.isMask(val);
					 
				 },
				 /**验证子网和掩码输入  ip/1-32*/
				isIpAndMas:function($target){
					var val = $target.val();
					if(val=="" || val == $target.attr(InputEmpty.EmptyVal)) return true;
					var ips = val.split("/");
					if(ips.length!=2){
						return false;
					}
					if(!Validate.isIp0255(ips[0])) return false;
					
					if(!Validate.isInt(ips[1])){
						return false;
					}

					var mask = +ips[1];
					if(mask < 1 || mask>32){
						return false;
					}



					return true;
				},
				 /**是否为四位PIN码数,即四位数字*/
				 isSIMPinNumber:function($target){
					 var val = $target.val();
					 if(val=="") return true;			
					 if(val == $target.attr(InputEmpty.EmptyVal)) return true;
					 return Validate.isSIMPinNumber(val);
				 },
				/**
				 * 是否子网IP地址
				 */
				 isSubIp:function($target){
					 var val = $target.val();
					 if(val=="") return true;			
					 if(val == $target.attr(InputEmpty.EmptyVal)) return true;
					 return Validate.isSubIp(val);					 
				 },
				 /**
				  * 验证vlanID
				  */
				 isValidateVlanID:function($target){
					 var val = $target.val();
					 if(val=="") return true;			
					 if(val == $target.attr(InputEmpty.EmptyVal)) return true;
					 return Validate.isValidateVlanID(val);					 
				 }
			}
				
		}
}();




