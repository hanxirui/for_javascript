class Student {
	fullName: string;
	constructor(public firstName: string, public middleInitial: string, public lastName: string) {
		this.fullName = firstName + ' ' + middleInitial + ' ' + lastName;
	}
}

interface Person {
	firstName: string;
	lastName: string;
}

interface Animal {
	type: String;
	name: String;
}
class Cat {
	constructor(public type: String, public name) {}
}
function greeter(person: Person) {
	return 'Hello, ' + person.firstName + ' ' + person.lastName;
}

function show(animal: Animal) {
	return 'this is a ' + animal.type + ' ' + animal.name;
}

let user = new Student('Jane', 'M.', 'User');
let cat = new Cat('cat', 'huahua');
show(cat);
// 继承是根据名称匹配的
document.body.innerHTML = greeter(user);
