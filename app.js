var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//import flash
const flash = require("connect-flash");
//import session
const session = require("express-session");
// mengimport mongoose
const mongoose = require("mongoose");
//import method override
const methodOverride = require("method-override");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//Menagmbil fungsi route karyawan
const stokRouter = require("./routes/stok");
//

mongoose.connect("mongodb://localhost:27017/db_stokbarang", 
  err => {
    if(err) throw err;
    console.log('connected to MongoDB')
});
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//menggunakan method ovveride
app.use(methodOverride("_method"));
//menggunakan session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxage: 60000} 
  })
);
//menggunakan flash
app.use(flash());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//Menggunakan routes karyawan
app.use("/stok", stokRouter);

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
  res.render('error');
});

module.exports = app;
