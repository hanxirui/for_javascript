Function.prototype.bind = function(){
	// 这里的arguments是调用bind函数时传入的参数
	var fn = this,args = Array.prototype.slice.call(arguments),
	object = args.shift();

	return function(){
		// 这里的arguments是调用返回方法的时候传入的参数，js的参数太灵活；
		return fn.apply(object,args.concat(Array.prototype.slice.call(arguments)))
	};
};


var myObject = {};
function myFunction(n1,n2,n3,n4){
	console.log(n1);
	console.log(n2);
	console.log(n3);
	console.log(n4);
	return this == myObject;
}

assert(!myFunction,"Context is not set yet");
// 这样我们可以将参数绑定到匿名函数上，通过这种方法在某些分部函数上，可以让我们提前声明一些参数。
var aFunction = myFunction.bind(myObject,1,2);
assert(aFunction(3,4),"Context is set properly");