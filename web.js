var bodyParser = require("body-parser");
var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var _ = require('underscore');
//var morgan = require('morgan');

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//app.use(morgan('dev')); // log every request to the console
app.set('port', (process.env.PORT || 9000));

app.listen(app.get('port'), function () {
  console.log("Node app is running at localhost:" + app.get('port'));
});

require('./server/config/mongoConfig')(app);

app.set('view engine', 'ejs');

app.use(session({secret: 'asdfasdfasdkajuysduygadhsfkajvuasdfasfasd', saveUninitialized: true, resave: true}));

require('./server/config/passport')(passport); // pass passport for configuration

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./server/controllers/serverServices')(app, passport, _);

app.use(express.static(__dirname + '/app'));
