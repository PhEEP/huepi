require('es6-promise').polyfill();

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var hue = require("node-hue-api"),
    HueApi = hue.HueApi,
    lightState = hue.lightState;

var displayResult = function(result) {
    console.log(JSON.stringify(result, null, 2));
};
//"-FIRMvYaVzFQt6MgrJ1gIKQLanPeCCgur2RBUSg6"
var host = "192.168.0.15",
    username = "KZyAe9QFJ4OOym2VL1hzFKlp3h6jRwr3qbe2LSNS",
    api = new HueApi(host, username);

app.post('/random', function(req, res, err) {
    console.log(req.body);
    var light = req.body.id;
        console.log('random lights going');
        var newHue = Math.floor(Math.random() * 65536);
        // Set light state to 'on' with warm white value of 500 and brightness set to 100%
        var state = lightState.create().on().hue_inc(newHue);

        // --------------------------
        // Using a promise
        api.setLightState(light, state)
            .then(displayResult)
            .done();
});

app.post('/getUserID', function(req, res, err) {
    console.log(req.body);
    var userDescription = "a new user";
    var displayUserResult = function(result) {
        console.log("Created user: " + JSON.stringify(result));
        res.send(result);
    };

    var displayError = function(err) {
        console.log(err);
    };


    // --------------------------
    // Using a promise
    api.registerUser(host, userDescription)
        .then(displayUserResult)
        .fail(displayError)
        .done();
    // console.log(req.body);

});


app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

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


module.exports = app;
