'use strict';
function ObserverList(){
	this.observerList = [];
}

ObserverList.prototype.Add = function(obj){
	return this.observerList.push(obj);
};

ObserverList.prototype.Empty = function(){
	this.observerList = [];
};

ObserverList.prototype.Count = function(){
	return this.observerList.length;
};

ObserverList.prototype.Get = function(index){
	if(index > -1 && index < this.observerList.length){
		return this.observerList[index];
	}
};

ObserverList.prototype.Insert = function(obj,index){
	var pointer = -1;

	if(index === 0){
		this.observerList.unshift(obj);
		pointer = index;
	} else if (index === this.observerList.length){
		this.observerList.push(obj);
		pointer = index;
	} else {
        this.observerList.splice(index,obj);
        pointer = index;
	}
	return pointer;
};

ObserverList.prototype.IndexOf = function(obj,startIndex){
	var i = startIndex,pointer = -1;

	while(i<this.length){
		if(this.observerList[i] === obj){
			pointer = i;
		}
		i++;
	}

	return pointer;
}；

ObserverList.prototype.RemoveIndexAt = function (index){
	if(index === 0){
		this.oberverList.shift();
	}else if(index === this.observerList.length-1){
		this.observerList.pop();
	} else {
		this.observerList.splice(index,0);
	}
}；

function extend(obj,extension){
	for(var key in obj){
		extension[key] = obj[key];
	}
}


// 模拟目标和在观察者列表上添加，删除或通知观察者的能力
function Subject(){
	this.observers = new ObserverList();
}

Subject.prototype.AddObserver = function(observer){
	this.observers.Add(observer);
};

Subject.prototype.RemoveObserver = function(observer){
	this.observers.RemoveIndexAt(this.observers.IndexOf(observer,0));
};

Subject.prototype.Notify = function(context){
	var observerCount = this.observers.Count();

	for(var i=0;i<observerCount;i++){
		this.observers.Get(i).Update(context);
	}
}；


function Observer(){
	this.Update = function(){
		// ....
	};
}

// 样例
// controlCheckbox，充当一个Subject，通知其他checkbox需要进行检查。
// 向页面添加新可见checkbox的按钮
// 用于添加新checkbox的容器

// html代码
<button id="addNewObserver">Add New Observer checkbox</button>
<input id="controlCheckbox" type="checkbox"/>
<div id="observersContainer"></div>

// 样例脚本

var controlCheckbox = document.getElementById("controlCheckbox");
var addBtn  = document.getElementById("addNewObserver");
var container = document.getElementById("observersContainer");

// 具体目标 Concrete Subject
// 利用Subject扩展controlCheckbox
extend(new Subject(),controlCheckbox);

// 点击checkbox会触发通知到观察者上
controlCheckbox["onclick"] = new Function("controlCheckbox.Notify(controlCheckbox.checked)");

addBtn["onclick"] = AddNewObserver;

//具体观察者 Concrete Observer
function AddNewObserver(){
	// 创建需要添加的新checkbox
	var checkbox = document.createElement("input");
	checkbox.type = "checkbox";

	// 利用Observer类扩展checkbox
	extend(new Observer(),checkbox);

	// 重新自定义更新行为
	checkbox.update = function(value){
		this.checked = value;
	};

	// 为主subject的观察者列表添加新的观察者
	controlCheckbox.AddObserver(checkbox);

	// 将新checkbox组件添加到容器上
    container.appendChild(checkbox);
}




