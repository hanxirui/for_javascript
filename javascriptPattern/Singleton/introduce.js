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

