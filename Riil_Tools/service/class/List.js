/**
 * List
 * Author: daihongwei
 * Date: 2014/8/21.
 * js List 实现
 */

module.exports = List;
function List() {
    this.value = [];
    /**
     * 添加
     */
    this.add = function(obj)
    {
        return this.value.push(obj);
    }

    /**
     * 大小
     */
    this. size = function()
    {
        return this.value.length;
    }

    /*
    *返回指定索引的值
    */
    this.get = function(index)
    {
        return this.value[index];
    }

    /**
     * 删除指定索引的值
     */
    this.remove = function(index)
    {
        this.value1 = [index];
        this.value[index]='';
        for (var i=0; i<this.size(); i++)
        {
            if (this.value[i] != '')
            {
                this.value1.push(this.value[i]);
            }
        }
        this.value = this.value1;
        delete this.value1;
        return this.value;
    }

    /**
     * 删除全部值
     */
    this.removeAll = function()
    {
        return this.value=[];
    }

    /**
     * 是否包含某个对象
     */
    this.constains = function(obj)
    {
        for (var i in this.value)
        {
            if (obj == this.value[i]) {
                return true;
            } else {
                continue;
            }
        }
        return false;
    }
}
