/**
 * Created by R04419 on 2014/8/26.
 * SqlCommand 使用方法测试
 */

var SqlCommand = require('../class/SQLCommand.js');
var Q = require('q');
var commander = new SqlCommand();


    function getResult(recordSet) {
        var jsonStr = JSON.stringify(recordSet);
        var obj = JSON.parse(jsonStr);
        console.log('getResult' + jsonStr);
        if (obj.isError) {
            console.log(obj.errMessage);
        } else {
            if (obj.fieldCount > 0) {
                for (var j = 0; j < obj.recourdCount; j++) {
                    for (var i = 0; i < obj.fieldCount; i++) {
                        var field = obj.fields[i];
                        var value = obj.rows[j][field];
                        console.log('field:' + field + ', value:' + value);
                    }
                }
            }
        }
    }

//function myget(callback) {
//    commander.get("t_moni_cmds_process_para.selectAll", [], function(reccordSet) {
//        var jsonStr = JSON.stringify(reccordSet);
//        console.log((jsonStr));
//        callback(jsonStr) ;
//    });
//}
//myget(getResult);

Q.spread([
    commander.get("t_moni_cmds_process_para.select",[5]),
    commander.get("t_moni_cmds_process_para.selectAll",[])
],function(get1,get2) {
   // debugger;
   // console.info('!!!!!!', JSON.stringify(get1, ' ', 2));
    return {
      get1 : get1,
      get2 : get2
    };
}).then(function(obj){
    JSON.stringify(obj, ' ', 2);
    console.log('2222',obj.get1.rows);
}).fail(function(err){
    console.log('reject: '+err);
}).catch(function(err){
    console.log('catch: '+err);
});

//
////查询
//commander.get("t_moni_cmds_process_para.selectAll", []).then(function(recordset){
//    var jsonStr = JSON.stringify(recordset);
//    var obj = JSON.parse(jsonStr);
//    console.log('getResult' + jsonStr);
//}).fail(function(err){
//    console.log(err.toString());
//})



//查询的主键 id=3
//commander.get("t_moni_cmds_process_para.select",[3],getResult);
//插入提交
//commander.save("t_moni_cmds_process_para.insert",{name:"test_save"},getResult);
//修改提交
//commander.save("t_moni_cmds_process_para.update", {id: 3, name: "foo_test"},getResult);
//commander.get("t_moni_cmds_process_para.selectAll",[],getResult);
//删除
//where id=2
//commander.del("t_moni_cmds_process_para.delete",[2],getResult);
//commander.get("t_moni_cmds_process_para.selectAll",[],getResult);








