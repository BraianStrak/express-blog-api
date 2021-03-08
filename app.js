var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');
var commentsRouter = require('./routes/comments');

require('./auth/auth');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/post', postsRouter);
app.use('/comment', commentsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

var mongoose = require("mongoose");
var mongoDB = "mongodb+srv://test:test@cluster0.y1wm3.mongodb.net/express-blog-api?retryWrites=true&w=majority"
mongoose.connect(mongoDB,  {useNewUrlParser : true, useUnifiedTopology : true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, "mongoDB connection error: "));

module.exports = app;
