const createError = require('http-errors');
const express = require('express');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');


const constants = require('./config/constant.json');
const BASE_URL = constants.BASE_URL;
const v1Routes = require('./app/v1Router');

// LOAD ENV FILE START ==================================================
// global.absolutePath = __dirname;
// if (!process.env.NODE_ENV) require('dotenv').config({
//   path: absolutePath + '/.env'
// });
// LOAD ENV FILE END ====================================================')

const app = express();
app.use(express.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);


// ============ VERSION WISE ROUTE CONTROL START ============
app.use(v1Routes);
// ============ VERSION WISE ROUTE CONTROL END ============

app.get(BASE_URL + '/ping', function (req, res) {
  res.status(200).send('pong');
});

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

let port = process.env.PORT || 8000;
console.log(`Server is running on port ${port}`);
app.listen(port)

module.exports = app;
