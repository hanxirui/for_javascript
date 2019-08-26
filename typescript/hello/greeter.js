var Student = /** @class */ (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + ' ' + middleInitial + ' ' + lastName;
    }
    return Student;
}());
var Cat = /** @class */ (function () {
    function Cat(type, name) {
        this.type = type;
        this.name = name;
    }
    return Cat;
}());
function greeter(person) {
    return 'Hello, ' + person.firstName + ' ' + person.lastName;
}
function show(animal) {
    return 'this is a ' + animal.type + ' ' + animal.name;
}
var user = new Student('Jane', 'M.', 'User');
var cat = new Cat('cat', 'huahua');
show(cat);
// 继承是根据名称匹配的
document.body.innerHTML = greeter(user);
