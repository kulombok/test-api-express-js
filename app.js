var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

// REGISTER ROUTES
var indexRouter = require('./routes/index');
var apiRouter = require('./app/routers.js')(app, express);

// Basic configuration
var app = express();

// connect to database mongodb
mongoose.connect('mongodb://localhost:27017/familydb', { useNewUrlParser: true });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/api/v1', apiRouter);

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
