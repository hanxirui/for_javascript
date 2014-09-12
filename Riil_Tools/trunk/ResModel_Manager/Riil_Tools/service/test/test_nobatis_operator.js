/**
 * Created by R04419 on 2014/8/22.
 */

var mybatis = require('./test_nobatis.js');
function tabSetup() {
    console.log('table create ok!');
}
//mybatis.setUp(tabSetup);

function tabdrop() {
    console.log('table drop ok!');
}
//mybatis.tearDown(tabdrop);


var selectResult=[];
//mybatis.testSelect(selectResult);
for (var item in selectResult)
{
    console.log('item:'+item);
}
mybatis.testSelectOne(selectResult);
//
//mybatis.testSelectOne_noResult(selectResult);
//
//mybatis.testSelect_bounds(selectResult);

//mybatis.testInsert(selectResult);

//mybatis.testUpdate(selectResult);

//mybatis.testDestroy(selectResult);

//mybatis.testSelect(selectResult);
