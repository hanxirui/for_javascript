// 当类只能有一个实例而且客户可以从一个众所周知的访问点访问他时
// 该唯一的实例应该是通过子类化可扩展的，并且客户应该无需更改代码就能使用一个扩展的实例时。
// 





var mySingleton = (function(){
	// 实例保持了Singleton的一个引用
	var instance;
	function init(){
		// Singleton
		// 私有方法和变量
		function privateMethod(){
			console.log("I am private");
		}
		var privateVariable = "I am also private";
		var privateRandomNumber = Math.random();
		return {
			// 公有方法和变量
			publicMethod:function(){
				console.log("The public can see me!");

			},
			publicProperty:"I am also public",
			getRandomNumber:function(){
				return privateRandomNumber;
			}

		};
	};

	return{
		// 获取Singleton的实例，如果存在就返回，不存在就创建新实例
		getInstance: function(){
			if(!instance){
				instance = init();
			}
			return instance;
		}
	};
})();

var mySin = mySingleton.getInstance();
console.log(mySin.getRandomNumber());

