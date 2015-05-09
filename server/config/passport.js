var authUser = {
  id: 1,
  name: "gumiz",
  pass: "1"
};

var LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport) {

  passport.use('local-login', new LocalStrategy({
      passReqToCallback: true
    },
    function (req, username, password, done) {
        console.log('passport user check');
        var user = {id: 1, user: username};
        if (username != authUser.name) {
          return done(null, false, req.flash('loginMessage', 'Nie znaleziono użytkownika.'));
        }
        if (password != authUser.pass) {
          return done(null, false, req.flash('loginMessage', 'Ups! Nieprawidłowe hasło.'));
        }
        return done(null, user);
    }
  ));

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    done(null, authUser.name);
  });
};
