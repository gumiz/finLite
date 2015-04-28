//var bodyParser = require("body-parser");
var express = require('express');
var app = express();

//app.use(bodyParser.urlencoded({
//  extended: true
//}));
//app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded());

app.set('port', (process.env.PORT || 9000));
app.use(express.static(__dirname + '/dist'));

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

var mongo = require('mongoskin');
//var db = mongo.db("mongodb://localhost:27017/finLiteDb", {native_parser:true});
var db = mongo.db("mongodb://finlite:1@ds055689.mongolab.com:55689/finlite", {native_parser:true});

app.use(function(req,res,next){
  req.db = db;
  next();
});

app.get('/test3', function(req, res) {
	res.send('Test !');
});

app.get('/accounts', function(req, res) {
    var db = req.db;
    db.collection('accounts').find().toArray(function (err, items) {
        res.json(items);
    });
});

app.post('/addAccount', function(req, res) {
  var db = req.db;
  db.collection('accounts').insert(req.body, function(err, result){
    res.send(
      (err === null) ? { msg: '' } : { msg: err }
    );
  });
});

app.post('/deleteAccount', function(req, res) {
  var db = req.db;
  db.collection('accounts').removeById(req.body.id, function(err, result) {
    res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
  });
});
