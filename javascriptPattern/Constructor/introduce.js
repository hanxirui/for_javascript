// 在javaScript中，创建新对象常用的两种方法是：
var newObject = {};

var newObject = new newObject();

// 有四种方法可以将键值赋值给一个对象：
// 1. “点”语法
//设置属性
newObject.someKey = "Hello World";
//获取属性
var key = newObject.someKey;

//2.中括号语法
// 设置属性
newObject["someKey"] = "Hello World";
// 获取属性
var key = newObject["someKey"];

// 3. Object.defineProperty
// 设置属性
Object.defineProperty(newObject,"someKey",{value:"for more control of the property's behavior",
                                           writable:true,
                                           enumerable:true,
                                           configurable:true});
// 如果上面的看着麻烦，可以使用下面的简便方法
var defineProp = function (obj,key,value){
    config.value = value;
    Object.defineProperty(obj,key,config);
}

// 使用上述方式，先创建一个空的person对象
var person = Object.create(null);

// 然后设置各个属性
defineProp(person,"Car","Delorean");
defineProp(person,"dateOfBirth","1981");
defineProp(person,"hasBeard",false);

// 4.Object.defineProperties
Object.defineProperties(newObject,{
	"someKey":{
       value:"Hello World",
       writable:true
	},
	"anotherKey":{
		value:"Foo bar",
		writable:false
	}
});

// 这些方法甚至可以用来继承。
// 用法
// 创建赛车司机driver对象，继承person对象
var driver = Object.create(person);

// 为driver设置一些属性
defineProp(driver,"topSpeed","100mph");

// 获取继承的属性
console.log(driver.dateOfBirth);

// 获取我们设置的100mph的属性
console.log(driver.topSpeed);

