'use strict';
/**
 * Created by daihongwei on 2014/8/25.
 * 数据库操作类，提供 select，insert，updata，selelctAll方法的封装
 */

var Q = require('q'),
    mysql = require('mysql'),
    _ = require('underscore');

var RecordSet = require('./RecordSet'),
    config = require('../../conf/config.json'),
    db = config.db,
    sqlObj = config.sql;

var _pool;

_pool = mysql.createPool({
    host: db.db_host,
    user: db.db_user,
    password: db.db_pass,
    database: db.db_name,
    connectionLimit: db.db_limit,
    queryFormat: queryFormat
});

module.exports = SqlCommand;
/**
 * SqlCommand
 * SQL 操作类封装
 */
function SqlCommand(isMannualCommit) {
    this._autoCommit = !isMannualCommit;
}

function queryFormat(query, values) {
    /*jshint validthis:true*/
    if (!values) {
        return query;
    }
    var sql = query.replace(/\:(\w+)/g, function (txt, key) {
        if (values.hasOwnProperty(key)) {
            return this.escape(values[key]);
        } else {
            return this.escape(null);
        }
        return txt;
    }.bind(this));
    this.config.queryFormat = null;
    sql = this.format(sql, values);
    this.config.queryFormat = queryFormat;
    return sql;
}

SqlCommand.getConnection = function (cb) {
    _pool.getConnection(cb);
};

SqlCommand.prototype._getConnection = function () {
    var that = this;
    if (that._getConnectionQ) {
        return that._getConnectionQ;
    }
    that._getConnectionQ = Q.ninvoke(_pool, 'getConnection').then(function (conn) {
        that._conn = conn;
        that._query = Q.nbind(conn.query, conn);

        if (!that._autoCommit) {
            return Q.ninvoke(conn, 'beginTransaction').thenResolve(conn);
        }
    });
    return that._getConnectionQ;
};

SqlCommand.prototype.commit = function () {
    var that = this;
    return Q.invoke(this._conn, 'commit')
        .fail(function (err) {
            return that._rollback(err);
        })
        .fin(function () {
            if (that._conn) {
                that._conn.release();
                that._conn = null;
            }
        });
};

SqlCommand.prototype.rollback = function (err) {
    var that = this;
    if (!this._conn) {
        if (err) {
            return Q.reject(err);
        }
        else {
            return Q.call(null);
        }
    }
    return Q.invoke(this._conn, 'rollback')
        .then(function () {
            if (err) {
                throw new Error(err);
            }
        }, function (err1) {
            throw new Error(err1, err);
        })
        .fin(function () {
            if (that._conn) {
                that._conn.release();
                that._conn = null;
            }
        });
};

function isOfAction(actionList, sql) {
    var m = /\s*\.(\w+)/.exec(sql);
    if (!m) {
        return false;
    }
    var action = m[1];
    return _.contains(actionList, action.toLowerCase());
}

function error(msg) {
    var recordSet = new RecordSet();
    recordSet.isError = true;
    recordSet.errMessage = msg;
    return Q.reject(recordSet);
}

function success(msg, result) {
    var recordSet = new RecordSet();
    recordSet.isError = false;
    recordSet.errMessage = msg;
    if (result && result instanceof Array) {
        recordSet.rows = result[0];
        recordSet.recourdCount = result[0].length;
        if (result.length > 1) {
            recordSet.fields = result[1];
            recordSet.fieldCount = result[1].length;
        }
    }
    return recordSet;
}

function warning(msg, result) {
    var recordSet = new RecordSet();
    recordSet.isError = false;
    recordSet.errMessage = msg;
    if (result && result instanceof Array) {
        recordSet.rows = result[0];
        recordSet.recourdCount = result[0].length;
        if (result.length > 1) {
            recordSet.fields = result[1];
            recordSet.fieldCount = result[1].length;
        }
    }
    return recordSet;
}

function affect(sqlKey, paramJson, aduitJson, msgPrefix, bySql) {
    /*jshint validthis:true*/
    var that = this;
    var prefix = msgPrefix || 'affect';
    var sql = bySql ? sqlKey : sqlObj[sqlKey];
    if (!bySql && !isOfAction(['insert', 'update', 'delete'], sqlKey)) {
        return error('sqlKey =' + sqlKey + ' is not insert, update or delete');
    }
    return that._getConnection().then(function () {
        return that._query(sql, paramJson)
            .then(function (result) {
                var isSuccess;
                if (result instanceof Array) {
                    isSuccess = result[0].affectedRows;
                }
                else {
                    isSuccess = result.affectedRows;
                }
                if (isSuccess > 0) {
                    return success('SqlCommand.' + prefix + ' succeed');
                } else {
                    return warning('SqlCommand.' + prefix + ' succeed with no affect');
                }
            }, function (err) {
                return error('SqlCommand.' + prefix + ' failed with error message, ' + err);
            });
    });
}

function bindAffect(actionList, methodName, bySql) {
    var msg = '';
    if (typeof actionList === 'string') {
        msg = actionList;
        actionList = [actionList];
    } else {
        msg = actionList.slice(0, actionList.length - 1).join(', ');
        msg += ' or ' + actionList[actionList.length - 1];
    }
    return function (sqlKey, paramJson, aduitJson) {
        if (!bySql && !isOfAction(actionList, sqlKey)) {
            return error('sqlKey =' + sqlKey + ' is not ' + msg);
        }
        return affect.call(this, sqlKey, paramJson, aduitJson, methodName, bySql);
    };
}

function fetch(sqlKey, paramJson, msgPrefix, bySql) {
    /*jshint validthis:true*/
    var that = this;
    var prefix = msgPrefix || 'fetch';
    var sql = bySql ? sqlKey : sqlObj[sqlKey];
    if (!bySql && !isOfAction(['select'], sqlKey)) {
        return error('sqlKey =' + sqlKey + ' is not select');
    }
    return that._getConnection().then(function () {
        return that._query(sql, paramJson)
            .then(function (result) {
                return success('SqlCommand.' + prefix + ' succeed', result);
            }, function (err) {
                return Q.reject(error('SqlCommand.' + prefix + ' error, error message = ' + err));
            });
    });
}

function bindFetch(methodName, bySql) {
    return function (sqlKey, paramJson) {
        return fetch.call(this, sqlKey, paramJson, methodName, bySql);
    };
}

/*
 * @param sqlKey        config.json 中配置的sql对应的json的key sql语句
 * @param paramJson     插入或者更新对应的参数json串
 * @@param callback     记录集回调结果
 */
SqlCommand.prototype.save = bindAffect(['insert', 'update'], 'save');

/**
 * 数据插入数据表记录
 * @param {string} sqlStr        config.json 中配置的sql对应的json的key sql语句
 * @param {json}   paramJson     插入或者更新对应的参数json串
 */
SqlCommand.prototype.saveBySqlInsert = bindAffect('insert', 'saveBySqlInsert', true);

/**
 * 更新数据表记录
 * @param {string} sqlStr        config.json 中配置的sql对应的json的key sql语句
 * @param {json}   paramJson     插入或者更新对应的参数json串
 */
SqlCommand.prototype.saveBySqlUpdate = bindAffect('update', 'saveBySqlUpdate', true);


/**
 * 数据删除
 * @param {string} sqlKey        config.json 中配置的sql对应的json的key sql语句
 * @param {json}   paramJson     插入或者更新对应的参数json串
 */
SqlCommand.prototype.del = bindAffect('delete', 'del');

/**
 * 数据删除
 * @param {string} sqlStr    sql语句
 * @param {json}   sqlParam  sql参数
 */
SqlCommand.prototype.delBySql = bindAffect('delete', 'delBySql', true);

/**
 * 数据库表查询
 * @param {string} sqlKey        config.json 中配置的sql对应的json的key sql语句
 * @param {josn}   paramJson     插入或者更新对应的参数json串
 */
SqlCommand.prototype.get = bindFetch('get');

/**
 * 数据库表查询
 * @param {string} sqlQuery      sql语句
 * @param {string} sqlParam      参数数组
 */
SqlCommand.prototype.getBySql = bindFetch('getBySql', true);