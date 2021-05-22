var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


const constants = require('./config/constant.json');
const BASE_URL = constants.BASE_URL;
const v1Routes = require('./app/v1Router');

console.log('BASE_URL', BASE_URL)



// let consts = require('./config/consts');

/*
var redis = require('redis');
let redisPort = process.env.PORT || 9000
var client = redis.createClient();

const redis_post = (req, res, next) => {
  client.get('postData', (error, redisData) => {
    if (error) {
      throw error
    } else if (redisData) {
      console.log('inner', redisData);
      res.send(redisData);
    } else {
      next();
    }
  })
}
*/
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


// ============ VERSION WISE ROUTE CONTROL START ============
app.use(v1Routes);
// ============ VERSION WISE ROUTE CONTROL END ============

app.get(BASE_URL + '/ping', function (req, res) {
  res.status(200).send('pong');
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

let port = process.env.PORT || 2000
console.log(`Server is running on port ${port}`)
app.listen(port)

module.exports = app;
