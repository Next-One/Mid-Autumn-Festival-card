const express = require('express'),
  path = require('path'),
  jade = require('jade'),
  controller = require('./routes/controller'),
  app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', jade)
app.use('/', controller);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
module.exports = app;