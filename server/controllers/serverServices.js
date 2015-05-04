module.exports = function(app, _) {

  prepareGenericRoutes('Accounts');
  prepareGenericRoutes('Documents');

  function getAccounts(db, req, res, success) {
    var db = req.db;
    db.collection('getAccounts').find().toArray(function (err, items) {
      success(db, res, items);
    });
  }

    function getReports(db, res, accounts) {
      db.collection('Documents').find().toArray(function (err, items) {
        var acc = {};
        _.each(items, function (item) {
          var newItem = {id: item.autoNumber, number: item.number, price: item.price};
          if (acc[item.accountCt] == undefined) {
            acc[item.accountCt] = {dt: [], ct: []}
          }
          if (acc[item.accountDt] == undefined) {
            acc[item.accountDt] = {dt: [], ct: []}
          }
          acc[item.accountCt].ct.push(newItem);
          acc[item.accountDt].dt.push(newItem);
        });
        var accountNames = _.keys(acc);
        var result = [];
        _.each(accountNames, function (name) {
          result.push({accountName: name, items: acc[name]});
        });
        res.json(result);
      });
    }

  app.get('/getReports', function (req, res) {
    var db = req.db;
    getAccounts(db, req, res, getReports);
  });


  function prepareGenericRoutes(target) {
    app.get('/get' + target, function (req, res) {
      var db = req.db;
      db.collection(target).find().toArray(function (err, items) {
        res.json(items);
      });
    });

    app.post('/add' + target, function (req, res) {
      var db = req.db;
      db.collection(target).insert(req.body, function (err, result) {
        res.send(
          (err === null) ? {msg: ''} : {msg: err}
        );
      });
    });

    app.post('/delete' + target, function (req, res) {
      var db = req.db;
      db.collection(target).removeById(req.body.id, function (err, result) {
        res.send((result === 1) ? {msg: ''} : {msg: 'error: ' + err});
      });
    });
  }
};
