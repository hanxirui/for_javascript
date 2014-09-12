'use strict';

/**
 * Created by daihongwei on 2014/8/21.
 */
var List = require('../class/List');

var jsList = new List();

//List Add

for (var i = 0 ;i < 500; i++) {
    jsList.add(i);
}

console.log(jsList.size().toString());

//List Get
console.log(jsList.get(100).toString());

//List Remove index 2
jsList.remove(2);
console.info('list index 2 =' +jsList.get(2).toString());

//List constains
if (jsList.constains(300)) {
    console.log('jsList contains index 300' + jsList.get(300));
}

//List removeAll
console.log(jsList.size().toString());
jsList.removeAll();
console.log(jsList.size().toString());