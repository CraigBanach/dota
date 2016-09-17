/**
 * Basic example demonstrating passport-steam usage within Express framework
 * This example uses Express's router to separate the steam authentication routes
 */
var express = require('express')
  , router = express.Router()
  , passport = require('passport')
  , session = require('express-session')
  , SteamStrategy = require('passport-steam').Strategy
  , path = require('path');

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Steam profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Use the SteamStrategy within Passport.
//   Strategies in passport require a `validate` function, which accept
//   credentials (in this case, an OpenID identifier and profile), and invoke a
//   callback with a user object.
passport.use(new SteamStrategy({
    returnURL: 'https://dota-cragsify.c9users.io/auth/steam/return',
    realm: 'https://dota-cragsify.c9users.io',
    apiKey: 'B2BBCB98E315818231496766548AD250'
  },
  function(identifier, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {

      // To keep the example simple, the user's Steam profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Steam account with a user record in your database,
      // and return that user instead.
      profile.identifier = identifier;
      return done(null, profile);
    });
  }
));

router.use(session({
    secret: 'your secret',
    name: 'name of session id',
    resave: true,
    saveUninitialized: true}));

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
router.use(passport.initialize());
router.use(passport.session());

router.get('/', function(req, res){
  res.sendFile(path.join(__dirname , "../views/index.html"));
  console.log(req);
});

router.get('/account', ensureAuthenticated, function(req, res){
  res.render('account');
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get('/auth/steam',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });
  
router.get('/auth/steam/return',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function(req, res) {
    console.log(req.user._json.steamid);
    res.redirect('/');
  });

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}

module.exports = router;