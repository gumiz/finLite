module.exports = function(app, _) {

  prepareGenericRoutes('Accounts');
  prepareGenericRoutes('Documents');

  function getAccounts(items) {
    var accountsAll = [];
    _.each(items, function (item) {
      accountsAll.push(item.accountDt);
      accountsAll.push(item.accountCt);
    });
    return _.uniq(accountsAll);
  }

  app.get('/getReports', function (req, res) {
    var db = req.db;
    db.collection('Documents').find().toArray(function (err, items) {
      var acc = {};
      //var acc = getAccounts(items);
      _.each(items, function(item) {
          var newItem = {id: item.autoNumber, number: item.number, price: item.price};
          if (acc[item.accountCt] == undefined) { acc[item.accountCt] = {dt: [], ct: []} }
          if (acc[item.accountDt] == undefined) { acc[item.accountDt] = {dt: [], ct: []} }
          acc[item.accountCt].ct.push(newItem);
          acc[item.accountDt].dt.push(newItem);
      });
      var accountNames = _.keys(acc);
      var result = [];
      _.each(accountNames, function(name) {
        result.push({accountName: name, items: acc[name]});
      });
      res.json(result);
    });
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
