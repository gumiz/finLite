module.exports = function (app, passport, _) {

  prepareGenericRoutes('Documents');

  app.get('/getClients', function (req, res) {
    var db = req.db;
    db.collection('Clients').find().toArray(function (err, items) {
      res.json(items);
    });
  });

  app.get('/getClient', isLoggedIn, function (req, res) {
    var db = req.db;
    var id = req.session.clientIdent;
    db.collection('Clients').findOne({"id": id},function (err, items) {
      res.json(items);
    });
  });

  app.post('/saveOpenings', function (req, res) {
    var db = req.db;
    _.each(req.body, function(item){
      item.dt = isNaN(item.dt) ? 0 : parseFloat(item.dt);
      item.ct = isNaN(item.ct) ? 0 : parseFloat(item.ct);
    });
    var openings = {
      _id: "BO"+req.session.year+req.session.clientIdent,
      year: req.session.year,
      clientId: req.session.clientIdent,
      userId: req.session.user.id,
      openings: req.body
    };
    db.collection('OpeningBalance').save(openings, function (err, result) {
      res.send(
        (err === null) ? {msg: ''} : {msg: err}
      );
    });
  });

  function findOpening(openings, name, propertyName) {
    if (!openings)return 0;
    var opening =  _.find(openings.openings, function (op) {
      return op.name == name;
    });
    if (opening)
      return opening[propertyName];
    return 0;
  }

  app.get('/getOpenings', isLoggedIn, function (req, res) {
    var id = req.session.clientIdent;
    var year = req.session.year;
    var db = req.db;
    db.collection('OpeningBalance').findOne({"clientId": id, "year": year}, function (err, openings) {
      db.collection('Accounts').find({"clientId": id}).sort( { name: 1 } ).toArray(function (err, accounts) {
        _.each(accounts, function(acc){
          acc.ct = findOpening(openings, acc.name, "ct");
          acc.dt = findOpening(openings, acc.name, "dt");
        });
        res.json(accounts);
      });
    });
  });

  function prepareGenericRoutes(target) {
    app.get('/get' + target, isLoggedIn, function (req, res) {
      var id = req.session.clientIdent;
      var db = req.db;
      db.collection(target).find({"clientId": id}).toArray(function (err, items) {
        res.json(items);
      });
    });

    app.post('/add' + target, function (req, res) {
      var db = req.db;
      req.body.clientId = req.session.clientIdent;
      req.body.userId = req.session.user.id;
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

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      req.flash('loginMessage', 'brak uprawnień.');
      res.redirect('/login');
    }
  }

  app.get('/login', function(req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  app.get('/logout', isLoggedIn, function(req, res) {
    console.log('logout');
    req.logout();
    req.session.clientIdent = {};
    req.user = {};
    res.render('index.ejs');
  });

  app.get('/', isLoggedIn, function (req, res) {
    res.render('finlite.ejs', {
      user : req.user
    });
  });

  app.get('/', function (req, res) {
    res.render('index.ejs');
  });

  app.post('/login', passport.authenticate('local-login', {
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }),
    function(req, res) {
      console.log('login userId: ' + req.user.local.id);
      req.session.year = 2015;
      req.session.user = {
        id: parseInt(req.user.local.id),
        userName: req.user.local.username
      };
      req.session.clientIdent = parseInt(req.body.clientId);
      res.redirect('/');
    });

};
