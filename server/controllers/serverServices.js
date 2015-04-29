module.exports = function(app) {
  //app.get('/accounts', function (req, res) {
  //  var db = req.db;
  //  db.collection('accounts').find().toArray(function (err, items) {
  //    res.json(items);
  //  });
  //});
  //
  //app.post('/addAccount', function (req, res) {
  //  var db = req.db;
  //  db.collection('accounts').insert(req.body, function (err, result) {
  //    res.send(
  //      (err === null) ? {msg: ''} : {msg: err}
  //    );
  //  });
  //});
  //
  //app.post('/deleteAccount', function (req, res) {
  //  var db = req.db;
  //  db.collection('accounts').removeById(req.body.id, function (err, result) {
  //    res.send((result === 1) ? {msg: ''} : {msg: 'error: ' + err});
  //  });
  //});

  prepareGenericRoutes('Accounts');
  prepareGenericRoutes('Documents');

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
