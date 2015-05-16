module.exports = function (app, passport, _) {

  prepareGenericRoutes('Accounts');
  prepareGenericRoutes('Documents');

  function getAccounts(req, res, success) {
    var db = req.db;
    db.collection('getAccounts').find().toArray(function (err, items) {
      success(db, res, items);
    });
  }

  function getReports(db, res) {
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

  app.get('/getClients', function (req, res) {
    var db = req.db;
    db.collection('Clients').find().toArray(function (err, items) {
      res.json(items);
    });
  });

  app.get('/getClient', isLoggedIn, function (req, res) {
    var db = req.db;
    var id = parseInt(req.query.id);
    db.collection('Clients').findOne({"id": id},function (err, items) {
      res.json(items);
    });
  });

  function prepareGenericRoutes(target) {
    app.get('/get' + target, isLoggedIn, function (req, res) {
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

  app.get('/getReports', isLoggedIn, function (req, res) {
    getAccounts(req, res, getReports);
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      req.flash('loginMessage', 'brak uprawnień.')
      res.redirect('/login');
    }
  }

  app.get('/', function (req, res) {
    res.render('index.ejs');
  });

  app.get('/login', function(req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  app.get('/logout', isLoggedIn, function(req, res) {
    req.logout();
    res.render('index.ejs');
  });

  app.get('/:clientId', isLoggedIn, function (req, res) {
    res.render('finlite.ejs', {
      user : req.user
    });
  });

  app.post('/login', passport.authenticate('local-login', {
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }),
    function(req, res) {
     res.redirect('/' + req.body.clientId);
    });

};
