module.exports = function (app, passport, _) {

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      req.flash('loginMessage', 'brak uprawnień.');
      res.redirect('/login');
    }
  }

  function findOpening(openings, name, propertyName) {
    if (!openings)return 0;
    var opening =  _.find(openings.openings, function (op) {
      return op.name == name;
    });
    if (opening)
      return opening[propertyName];
    return 0;
  }

  function insertBO(accName, acc, openings) {
    var ct = findOpening(openings, accName, "ct");
    var dt = findOpening(openings, accName, "dt");
    var newItemCt = {id: 0, number: "BO", price: ct};
    var newItemDt = {id: 0, number: "BO", price: dt};
    acc.ct.push(newItemCt);
    acc.dt.push(newItemDt);
  }

  function getReports(req, res, openings) {
    var db = req.db;
    var id = req.session.clientIdent;
    console.log('getReports: '+id);
    db.collection('Documents').find({"clientId": id}).toArray(function (err, items) {
      var acc = {};
      _.each(items, function (item) {
        if (acc[item.accountCt] == undefined) {
          acc[item.accountCt] = {dt: [], ct: []}
        }
        if (acc[item.accountDt] == undefined) {
          acc[item.accountDt] = {dt: [], ct: []}
        }
        var newItem = {id: item.autoNumber, number: item.number, price: item.price};
        acc[item.accountCt].ct.push(newItem);
        acc[item.accountDt].dt.push(newItem);
      });
      var accountNames = _.keys(acc);
      var result = [];

      _.each(accountNames, function (name) {
        insertBO(name, acc[name], openings);
        result.push({accountName: name, items: acc[name]});
      });

      res.json(result);
    });
  }

  app.get('/getReports', isLoggedIn, function (req, res) {
    var id = req.session.clientIdent;
    var year = req.session.year;
    var db = req.db;
    db.collection('OpeningBalance').findOne({"clientId": id, "year": year}, function (err, openings) {
      getReports(req, res, openings)
    });
  });

};
