module.exports = function(app) {
  var mongo = require('mongoskin');
  var db = mongo.db("mongodb://finlite:1@ds055689.mongolab.com:55689/finlite", {native_parser:true});
  app.use(function(req,res,next){
    req.db = db;
    next();
  });
};
