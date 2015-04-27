var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 9000));
app.use(express.static(__dirname + '/app'));

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/finLiteDb", {native_parser:true});

app.use(function(req,res,next){
  req.db = db;
  next();
});

app.get('/test', function(req, res) {
	res.send('Test !');
});

app.get('/accounts', function(req, res) {
    var db = req.db;
    db.collection('accounts').find().toArray(function (err, items) {
        res.json(items);
    });
});

app.post('/addAccount', function(req, res) {
  debugger;
  var db = req.db;
  db.collection('accounts').insert(req.body, function(err, result){
    res.send(
      (err === null) ? { msg: '' } : { msg: err }
    );
  });
});
