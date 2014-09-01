// javascript中，有几种用于实现模式的方法，包括：
// 1.对象字面量表示法
// 2.Module模式
// 3.AMD模式
// 4.CommonJS模块
// 5.ECMAScript Harmony模块
// 1.对象字面量表示法
// 在对象字面量表示法中，一个对象被描述为一组包含在大括号（{}）中、以括号分隔的name/value对。
// 对象内的名称可以是字符串或标识符，后面跟着冒号。对象中最后一个name/value对的后面不用添加逗号。
// 样例：
var myModule = {
   myProperty:"someValue",

   myConfig:{
      useCaching:true,
      language:"en"
   },
   // 根据当前配置输出信息
   myMethod:function(){
   	 console.log("Caching is:"+this.myConfig.useCaching);
   },
   // 重写当前的配置
   myMethod2:function(newConfig){
      if(typeof newConfig === "object"){
      	this.myConfig = newConfig;
      }
   }

};

// 2.Module(模块)模式
// Module模式最初被定义为一种在传统软件工程中为类提供私有和公有封装的方法。
// 在Javascript中，Module模式用于进一步模拟类的概念，通过这种方式，能够使一个单独的对象拥有公有/私有方法和变量，
// 从而屏蔽来自全局作用域的特殊部分。产生的结果是：函数名与在页面上其他脚本定义的函数冲突的可能性降低。
// 样例：
var myNamespace = (function(){
	var counter =0;
	return{
		incrementCounter: function(){
			return ++counter;
		},
		resetCounter:function(){
			counter=0;
		}
	};
})();

// 用法
// 增加计数器
testModule.incrementCounter();
// 重置计数器
testModule.resetCounter();

// 