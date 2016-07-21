function Promise(fn) {
    var state = 'pending',
        value = null,
        deferreds = [];

    this.then = function(onFulfilled, onRejected) {
        return new Promise(function(resolve, reject) {
            handle({
                onFulfilled: onFulfilled || null,
                onRejected: onRejected || null,
                resolve: resolve,
                reject: reject
            });
        });

    };

    function handle(deferred) {
        if (state === 'pending') {
            deferreds.push(deferred);
            return;
        }
        var cb = state === 'fulfilled' ? deferred.onFulfilled : deferred.onRejected,
            ret;
        if (cb === null) {
            cb = state === 'fulfilled' ? deferred.resolve : deferred.reject;
            cb(value);
            return;
        }
        try {
            ret = cb(value);
            deferred.resolve(ret);
        } catch (e) {
            deferred.reject(e);
        }
    }

    function resolve(newValue) {
        if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
            var then = newValue.then;
            if (typeof then === 'function') {
                then.call(newValue, resolve, reject);
                return;
            }
        }

        state = 'fulfilled';
        value = newValue;
        finale();
    }

    function reject(reason) {
        state = 'rejected';
        value = reason;
        finale();
    }

    function finale() {
        setTimeout(function() {
            deferreds.forEach(function(deferred) {
                handle(deferred);
            });
        }, 0);
    }



    fn(resolve, reject);
}


// 例

getUserId()
    .then(getUserMobileById)
    .then(function (mobile) {
        console.log('do sth with mobile:', mobile);
    }, function (error) {
        // getUserId 或者 getUerMobileById 时出现的错误
        console.error('error msg:' + error);
    });

function getUserId() {
    return new Promise(function (resolve, reject) {
        window.setTimeout(function () {
            if (Math.random() >= 0.5) {
                resolve(9876);
            } else {
                reject('not login user');
            }
        });
    });
}

function getUserMobileById(id) {
    return new Promise(function (resolve, reject) {
        console.log('start to get user mobile by id:', id);
        window.setTimeout(function () {
            if (Math.random() >= 0.5) {
                resolve(13810001000);
            } else {
                reject('no mobile related to this user');
            }
        });
    });
}