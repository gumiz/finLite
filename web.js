var bodyParser = require("body-parser");
var express = require('express');
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('port', (process.env.PORT || 9000));
app.use(express.static(__dirname + '/dist'));

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

var _ = require('underscore');
require('./server/config/mongoConfig')(app);
require('./server/controllers/serverServices')(app, _);
