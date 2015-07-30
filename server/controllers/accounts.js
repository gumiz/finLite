module.exports = function (app, passport, _) {

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      req.flash('loginMessage', 'brak uprawnień.');
      res.redirect('/login');
    }
  }

  app.get('/getAccounts', isLoggedIn, function (req, res) {
    var id = req.session.clientIdent;
    var db = req.db;
    db.collection('Accounts').find({"clientId": id}).sort( { name: 1 } ).toArray(function (err, items) {
      res.json(items);
    });
  });

  app.post('/addAccounts', function (req, res) {
    var db = req.db;
    req.body.clientId = req.session.clientIdent;
    req.body.userId = req.session.user.id;
    db.collection('Accounts').insert(req.body, function (err, result) {
      res.send(
        (err === null) ? {msg: ''} : {msg: err}
      );
    });
  });

  app.post('/deleteAccounts', function (req, res) {
    var db = req.db;
    db.collection('Accounts').removeById(req.body.id, function (err, result) {
      res.send((result === 1) ? {msg: ''} : {msg: 'error: ' + err});
    });
  });

};
