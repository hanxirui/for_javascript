'use strict';
/**
 * Created by R04419 on 2014/9/10.
 */

var dataExport = require('../ModelDataExport.js');

dataExport.ExecResourceModelExport().then(function (result) {
    var jsonStr = JSON.stringify(result);
    console.log(jsonStr);
    var obj = JSON.parse(jsonStr);
    console.log(obj.output);

}).fail(function (err) {
    var jsonStr = JSON.stringify(err);
    console.log(jsonStr);
    var obj = JSON.parse(jsonStr);
    console.log(obj.errMessage);
});