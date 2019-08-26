import { sayHello } from './greet';
import { a, c } from './o';

function showHello(divName: string, name: string) {
	const elt = document.getElementById(divName);
	elt.innerText = sayHello(name);
}
showHello('greeting', 'TypeScript');
// ==========================================================================
class BeeKeeper {
	hasMask: boolean;
}

class ZooKeeper {
	nametag: string;
}

class Animal {
	numLegs: number;
}

class Bee extends Animal {
	keeper: BeeKeeper;
}

class Lion extends Animal {
	keeper: ZooKeeper;
}

function createInstance<A extends Animal>(c: new () => A): A {
	return new c();
}

console.log(createInstance(Lion)); // typechecks!
console.log(createInstance(Bee)); // typechecks!
