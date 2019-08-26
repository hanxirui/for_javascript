var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var src = path.join(__dirname, '../src');
var bower_components = path.join(__dirname, '../bower_components');
// var routes = require('./routes/index');
// var users = require('./routes/users');
var html2pdf = require('./routes/html2pdf');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');
// 默认模板引擎
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 默认路由
// app.use('/', routes);
// app.use('/users', users);
app.use('/html2pdf', html2pdf);

//缓存秒数,1天
var cacheCtrl = {
  maxAge: 60 * 60 * 24 * 1
};
app.use('/bower_components', express.static(bower_components, cacheCtrl));
app.use(express.static(src, cacheCtrl));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;