// 规范化Event对象实例
function fixEvent(event){
// 预定义常用的函数
	function returnTrue(){return true;}
	function returnFalse(){return false;}
// 测试是否需要修复
	if(!event||!event.stopPropagation){
		var old = event || window.event;
    //  保存旧对象
		event = {};
		for(var prop in old){
			event[prop] = old[prop];
		}

		if(!event.target){
			event.target = event.srcElement||document;
		}

		event.relatedTarget = event.fromElement === event.target?event.toElement:event.fromElement;

		event.preventDefault = function(){
			event.returnValue = false;
			event.isDefaultPrevented = returnTrue;
		};

		event.isDefaultPrevented = returnFalse;

		event.stopPropagation = function(){
			event.cancelBubble = true;
			event.isPropagationStopped = returnTrue;
		};

		event.isPropagationStopped = returnFalse;

		if(event.clientX != null){
			var doc = document.documentElement, body = document.body;

			event.pageX = event.clientX + (doc && doc.scrollLeft||body && body.scrollLeft||0)-
																		(doc && doc.clientLeft ||body && body.clientLeft||0);

			event.pageY = event.clientY+ (doc && doc.scrollTop||body && body.scrollTop||0)-
 																	 (doc && doc.clientTop ||body && body.clientTop||0);

			event.which = event.charCode || event.keyCode;
		 }
// 鼠标按钮
			if(event.button !=null){
				event.button = (event.button & 1 ? 0: (event.button & 4 ? 1 : (event.button & 2 ? 2 : 0)));
			}
	 }
		return event;
}

// 实现一个中央对象用于保存DOM元素信息;类似java的threadlocal
(function(){
	var cache = {},
			guidCounter = 1,
			expando = "data" + (new Date).getTime();
	this.getData = function (elem){
		var guid = elem[expando];
		if(!guid){
			guid = elem[expando] = guidCounter++;
			cache[guid] = {};
		}
		return cache[guid];
	};

	this.removeData = function(elem){
		var guid = elem[expando];
		if(!guid)return;
		delete cache[guid];
		try{
			delete elem[expando];
		}catch(e){
			if(elem.removeAttribute){
				elem.removeAttribute(expando);
			}
		}
	};
})();

// 测试
// var elems = document.getElementsByTagName('div');
// for (var i = 0; i < elems.length; i++) {
// 	getData(elems[i]).ninja = elems[i].title;
// }
// for (var i = 0; i < elems.length; i++) {
// 	assert(getData(elems[i]).ninja === elems[i].title,"Store data is "+getData(elems[i]).ninja);
// }
// for (var i = 0; i < elems.length; i++) {
// 	removeData(elems[i]);
// 	assert(getData(elems[i]).ninja === undefined,"Store data has been destroyed.");
// }

// 一个绑定事件处理程序并进行跟踪的函数
(function(){
	var nextGuid = 1;
	this.addEvent = function (elem,type,fn) {
		var data = getData(elem);
		if(!data.handlers) data.handlers = {};
		if(!data.handlers[type]) data.handlers[type] = [];
		if(!fn.guid) fn.guid = nextGuid++;

		data.handlers[type].push(fn);

		if(!data.dispatcher){
			data.disabled = false;
			data.dispatcher = function (event){
				if(data.disabled) return;
				event = fixEvent(event);

				var handlers = data.handlers[event.type];
				if(handlers){
					for(var n=0;n<handlers.length;n++){
						handlers[n].call(elem,event);
					}
				}
			};
		}

		if(data.handlers[type].length == 1){
			if(document.addEventListener){
				elem.addEventListener(type,data.dispatcher,false);
			}else if(document.attachEvent){
				elem.attachEvent("on"+type,data.dispatcher);
			}
		}
	};
})();

// 清理处理程序
function tidyUp(elem,type){
	function isEmpty(object){
		for(var prop in object){
			return false;
		}
		return true;
	}
	var data = getData(elem);

	if(data.handlers[type].length===0){
		delete data.handlers[type];
		if(document.removeEventListener){
			elem.removeEventListener(type,data.dispatcher,false);
		}else if(document.detachEvent){
			elem.detachEvent("on"+type,data.dispatcher);
		}
	}
	// 判断是否还有其他事件类型的处理程序
	if(isEmpty(data.handlers)){
		delete data.handlers;
		delete data.dispatcher;
	}
	// 判断是否还需要data（即数据是否为空）
	if(isEmpty(data)){
		removeData(elem);
	}
}

// 事件处理程序的解绑函数
// 声明解绑函数
this.removeEvent = function(elem,type,fn){
	// 获取元素的关联数据
	var data = getData(elem);
	// 如果无事可做则直接返回
	if(!data.handlers) return;
// 创建一个实用函数
	var removeType = function(t){
		data.handlers[t] = [];
		tidyUp(elem,t);
	};
// 删除所有的处理程序
	if(!type){
		for(var t in data.handlers)removeType(e);
		return;
	}
// 查找一个特定type的所有处理程序
	var handlers = data.handlers[type];
	if(!handlers)return;

	if(!fn){
		removeType(type);
		return;
	}
	// 删除一个特定的处理程序
	if(fn.guid){
		for (var i = 0; i < handlers.length; i++) {
			if(handlers[i].guid===fn.guid){
				handlers.splice(i--,1);
			}
		}
	}
	tidyUp(elem,type);
};

// 对事件函数进行冒烟测试
// addEvent(window,"load",function(){
// 	var subjects = document.getElementsByTagName("div");
// 	for (var i = 0; i < subjects.length; i++)(function (elem){
// 		addEvent(elem,"mouseover",function handler(e){
// 			this.style.backgroundColor = 'red';
// 		});
// 		addEvent(elem,"click",function handler(e){
// 			this.style.backgroundColor = "green";
// 			removeEvent(elem,"click",handler);
// 		});
// 		addEvent(elem,"click",function handler(e){
// 			alert('第二个Click操作');
// 			removeEvent(elem,"click",handler);
// 		});
// 	})(subjects[i]);
// });

// 在元素上出发一个冒泡事件
function triggerEvent(elem,event){
	// 获取元素数据以及元素的父元素（用于冒泡）
	var elemData = getData(elem),
	    parent = elem.parentNode || elem.ownerDocument;
// 如果传入的event名称是一个字符串，就为此创建一个event对象
  if(typeof event === "string"){
		event = {type:event,target:elem};
	}
	// 对event属性进行规范化
	event = fixEvent(event);
// 如果传入的元素有事件调度器，就执行该类型的处理程序
	if(elemData.dispatcher){
		elemData.dispatcher.call(elem,event);
	}
	if(parent && !event.isPropagationStopped()){
		triggerEvent(parent,event);
	}else if(!parent && !event.isDefaultPrevented()){//如果DOM到顶了，就触发默认行为（除非禁止了默认行为）
		var targetData = getData(event.target);
		if(event.target[event.type]){//判断模板元素有没有该事件的默认行为
      //在模板元素上临时禁用事件调度器，因为已经支持了处理程序
			targetData.disabled = true;
			// 执行默认行为
			event.target[event.type]();

			targetData.disabled = false;
		}
	}
}