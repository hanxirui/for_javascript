'use strict';
/**
 * Created by daihongwei on 2014/8/25.
 * 数据库操作结果集
 */
module.exports = RecordSet;
function RecordSet() {
    //记录集对象
    this.rows = {};
    //记录条数
    this.recourdCount = 0;
    //字段数组
    this.fields = [];
    //字段数量
    this.fieldCount = 0;
    //是否有错误
    this.isError = false;
    //错误描述信息
    this.errMessage ="";
}



