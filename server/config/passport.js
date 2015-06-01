//var authUser = {
//  id: 1,
//  name: "gumiz",
//  pass: "1"
//};

var LocalStrategy = require('passport-local').Strategy;
var bcrypt   = require('bcrypt-nodejs');

function validatePassword(password, user) {
  return bcrypt.compareSync(password, user.local.password);
}

module.exports = function (passport) {

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function (id, done) {
      done(null, {
        _id: '554bc303995bea9c1a0fff2f',
        local: {
          password: '$2a$08$IetmCT0EYaLWXNauVgI1j.EC1MYyVwSY2hd8jd1RunbCVENDX6EoW',
          email: 'ania',
          id: 1
        },
        __v: 0 });
  });

  passport.use('local-login', new LocalStrategy({
      passReqToCallback: true
    },
    function (req, username, password, done) {
      req.db.collection('users').findOne({ 'local.email' :  username }, function (err, user) {
        // if there are any errors, return the error before anything else
        if (err)
          return done(err);

        // if no user is found, return the message
        if (!user)
          return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

        // if the user is found but the password is wrong
        if (!validatePassword(password, user))
          return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

        // all is well, return successful user
        return done(null, user);
      });
    }
  ));

};
