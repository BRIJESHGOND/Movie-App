const createError = require('http-errors');
const express = require('express');

global.absolutePath = __dirname;


if (!process.env.NODE_ENV) require('dotenv').config({
  path: absolutePath + '/.env'
});

const constants = require('./config/constant.json');
const BASE_URL = constants.BASE_URL;
const v1Routes = require('./app/v1Router');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json({
  limit: '1mb'
}));

app.use(express.json());
// <><><><><><><> ROUTE CONTROL BASED ON VERSION <><><><><><><>
app.use(v1Routes);
// <><><><><><><> ROUTE CONTROL END <><><><><><><>

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
app.listen(port);

module.exports = app;
