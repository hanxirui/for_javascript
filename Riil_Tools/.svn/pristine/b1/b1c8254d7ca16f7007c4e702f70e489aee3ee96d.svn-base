'use strict';
/**
 * Created by mufei on 2014/8/28.
 */
var q = require('q');
var SqlCommand = require('../service/class/SQLCommand.js');
var app = require('../app');
var commander = new SqlCommand();

function getResTypeTree() {
    var getQ = q.defer();
    commander.get('t_moni_res_type.select', []).then(function (recordset) {
        var jsonStr = JSON.stringify(recordset);
        var obj = JSON.parse(jsonStr);
        if (obj.isError) {
            getQ.reject(obj);
        } else {
            if (obj.fieldCount > 0) {
                for (var j = 0; j < obj.recourdCount; j++) {
                    for (var i = 0; i < obj.fieldCount; i++) {
                        var field = obj.fields[i];
                        var value = obj.rows[j][field];
                        if ('pId' === field) {
                            obj.rows[j][field] = getPid(value);
                        } else if ( 'icon' === field) {
                            if (value) {
                                obj.rows[j][field] = getIcon(value);
                            }
                        }
                    }
                }
            }
            getQ.resolve(obj);
        }
    }).fail(function (err) {
        getQ.reject(err);
    });
    return getQ.promise;
}

function getPid(id) {
    var subStr = null;
    if (id) {
        var index = id.lastIndexOf('.');
        if (index > 0) {
            subStr = id.substring(0, index);
        }
    }
    return subStr;
}

function getIcon(icon) {
    var server = app.listen(app.get('port'));
    var ip = server.address().address;
    var port = server.address().port;
    return "http://" + ip + ";" + port + "/images/template/" + icon;
}

module.exports = getResTypeTree;

/*
getResTypeTree().then(function (recordset) {
    var jsonStr = JSON.stringify(recordset);
    var obj = JSON.parse(jsonStr);
    console.log(obj.rows);
}).fail(function (recordset) {
});
*/







