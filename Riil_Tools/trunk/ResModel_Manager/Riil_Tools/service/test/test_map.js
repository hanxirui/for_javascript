'use strict';

/**
 * Created by daihongwei on 2014/8/21.
 */

var Map = require('../class/Map');
var jsMap = new Map();
//Map 插入
for (var i = 0; i< 100; i++) {
    jsMap.put(i.toString(),i);
}

//Map 获取Value
for (var i =0; i< 100; i++) {
    console.info(jsMap.get(i.toString()));
}

//Map 是否包含
if(jsMap.contain("99")) {
    console.info("map contain key 99");
    console.log("key :99,value:"+jsMap.get("99"));
}

//Map 删除key
jsMap.remove("50");
console.info("map remove key 50");
console.info("key 50, value "+jsMap.get("50"));

// 遍历Map,执行处理函数
function iterator_map(key,value,index){
    if (index === 49) {
        console.log(key + '=' + value);
    }
}
jsMap.each(iterator_map);

//获取键值数组(类似Java的entrySet())
console.log(jsMap.entrys());

//判断是否为空
if (jsMap.isEmpty()) {
    console.log('map is empty');
}
else
{
    var map_count = jsMap.size();
    console.log(map_count.toString());
    console.log (jsMap.toString());
    jsMap.clear();
    console.log (jsMap.toString());

}

