// Revealing Module模式对module模式做了改进，能够这私有范围内简单定义所有对函数和变量，
// 并返回一个匿名对象，它拥有指向私有函数对指针，该函数是他希望展示为公有的方法。
var myRevealingModule = function() {
    var privateVar = "Ben Cherry",
        publicVar = "Hey there!";

    function privateFunction() {
        console.log("Name:" + privateVar);
    }

    function publicSetName(strName) {
        privateName = strName;
    }

    function publicGetName() {
        privateFunction();
    }

    // 将暴露的公有指针指向到私有函数和属性上
    return {
        setName:publicSetName;
        greeting:publicVar;
        getName:publicGetName;

    }
}();

myRevealingModule.setName("Paul Kinlan");
