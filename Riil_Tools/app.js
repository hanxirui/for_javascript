var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');  
var path = require('path');

//指定html引擎
var ejs = require('ejs');

//自定义过滤器 ，判断是否为空
ejs.filters.isNull = function(obj) {
    if(obj==undefined)return "";
    if(obj=='')return "";
    return obj;
  
};


var session = require('express-session');
 

var app = express();


app.use(session({
    secret: 'keyboard cat',
    cookie: {
        maxAge: 60 * 60000
    }
}));



app.engine('.html', ejs.__express);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('views', path.join(__dirname, 'views/admin'));

app.set('view engine', 'html');
//app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.responseTime());

// init router
require('./routes/router')(app);

app.get('/', function(req, res) {
    res.render('login');
});
app.post('/', function(req, res) {
    res.render('login');
});




/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
 
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


// app.param('user', function(req, res, next, id) {
//     // User.find(id, function(err, user){
//     //   if (err) {
//     //     next(err);
//     //   } else if (user) {
//     //     req.user = user;
//     //     next();
//     //   } else {
//     //     next(new Error('failed to load user'));
//     //   }
//     // });

//     console.log('user check');
// });






module.exports = app;