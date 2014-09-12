'use strict';
/**
 * singleton
 * Author: daihongwei
 * Date: 2014/8/21.
 * js 单例模式
 */

var instance = undefined;
module.exports.getInstance = function () {

    if (instance === undefined) {
        instance = new Singleton();
    }
    return instance;
}

function Singleton() {
    this.createTime = new Date();
}




