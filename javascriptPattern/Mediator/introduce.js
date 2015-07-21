// Mediator本质上是Observer模式的共享目标。它假设该系统中对象或模块之间的订阅和发布关系被牺牲掉了，从而维护中心联络点。
// 中介者是一种行为设计模式，它允许我们公开一个统一的接口，系统的不同部分可以通过该接口进行通信。
// Mediator模式促进松散耦合的方式是：确保组件的交互是通过这个中心点来处理的，而不是通过显式地引用彼此。
// 现实的例子是机场控制塔控制飞机的起降。
// DOM事件的冒泡和委托同样也是

// Mediator模式的最大好处是：它能够将系统中对象或组件之间所需的通信渠道从多对多减少到多对一。由于现在的解耦程度较高，
// 添加新发布者和订阅者相对也容易多了。或许使用这种模式最大的缺点是：它会引入单一故障点。将Mediator放置于模块之间可以
// 导致性能下降，因为它们总是间接地进行通信。由于松耦合的性质，很难通过仅关注广播来确定一个系统如何作出反应。

// 基本实现
var mediator = (function (){
	// 存储可被广播或监听的topic
	var topics = {};
	// 订阅一个topic，提供一个回调函数，一旦topic被广播就执行该回调
	var subscribe = function(topic,fn){
		if(!topics[topic]){
			topics[topic] = [];
		}
		topics[topic].push({context:this,callback:fn});

		return this;
	}
});

// 发布/广播事件到程序的剩余部分
var publish = function(topic){
	var args;
	if(!topics[topic]){
		return false;
	}
	// arguments-函数执行环境变量，系统自带
	// 等价于arguments.slice[1]
    args = Array.prototype.slice.call(arguments,1);
    for(var i=0,l=topics[topic].length;i<l;i++){
    	var subscription = topics[topic][i];
    	subscription.callback.apply(subscription.context,args);
    }
    return this;
};

return {
	Publish:publish,
	Subscribe:subscribe,
	installTo:function(obj){
		obj.subscribe = subscribe;
		obj.publish = publish;
	}
}
