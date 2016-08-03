'use strict';

var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var winston = require('winston');

var blog = require('./middlewares/blog');
var routes = require('./routes');

var app = express();

app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');
routes.set(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, '..', 'static')));
app.use(express.static(path.resolve(__dirname, '..', 'assets')));

// logging to file
winston.add(winston.transports.File, {filename: 'digibird.log'});

// scheduled tasks
setInterval(function() {
    blog.getPosts();
    // 1 hour delay
}, 3600000);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler, will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        winston.log(err);
        res.status(err.status || 500);
        res.render('error', {
            message: err.message
        });
    });
}

// production error handler, no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message
    });
});


app.listen(3000, function() {
    winston.log('info', 'Started server on 3000.');
});
