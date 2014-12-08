// 订阅者和观察者模式的区别就是订阅者模式使用了一个主题/事件通道，这个通道介于希望接收到通知的对象
// 和激活事件的对象之间。该事件系统允许代码定义应用程序的特定事件，这些事件可以传递自定义参数，自定义
// 参数包含订阅者所需的值。其目的是避免订阅者和发布者之间产生依赖关系。

/*!
* Pub/Sub implementation
* http://addyosmani.com/
* Licensed under the GPL
* http://jsfiddle.net/LxPrq/
*/


;(function ( window, doc, undef ) {

    var topics = {},
        subUid = -1,
        pubsubz ={};
// 发布或广播事件，包含特定的topic名称和参数（比如传递的数据）
    pubsubz.publish = function ( topic, args ) {

        if (!topics[topic]) {
            return false;
        }

        setTimeout(function () {
            var subscribers = topics[topic],
                len = subscribers ? subscribers.length : 0;

            while (len--) {
                subscribers[len].func(topic, args);
            }
        }, 0);

        return true;

    };
// 通过特定的名称和回调函数订阅事件，topic/event触发时执行事件
    pubsubz.subscribe = function ( topic, func ) {

        if (!topics[topic]) {
            topics[topic] = [];
        }

        var token = (++subUid).toString();
        topics[topic].push({
            token: token,
            func: func
        });
        return token;
    };
// 基于订阅上的标记引用，通过特定topic取消订阅
    pubsubz.unsubscribe = function ( token ) {
        for (var m in topics) {
            if (topics[m]) {
                for (var i = 0, j = topics[m].length; i < j; i++) {
                    if (topics[m][i].token === token) {
                        topics[m].splice(i, 1);
                        return token;
                    }
                }
            }
        }
        return false;
    };

    getPubSubz = function(){
        return pubsubz;
    };

    window.pubsubz = getPubSubz();

}( this, this.document ));