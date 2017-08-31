require('dotenv').config();
const express = require('express')
const passport = require('passport')
const Strategy = require('passport-google-oauth20')
const request = require('request')
const config = require('./config')
const path = require('path')

const callbackUrl = (process.env.URL || 'http://localhost') + ':' + process.env.PORT + '/login/return';

passport.use(new Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: callbackUrl,
  },
  function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile._json.domain);
  }));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

let app = express();

app.use(require('express-session')({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

function findPath(userDomain) {
  for(const path of config.paths)
    if((path.domain instanceof RegExp && path.domain.test(userDomain))
      || path.domain === userDomain)
      return path;
}

app.get('/login', passport.authenticate('google', {prompt: 'select_account', scope: ['email']}));
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

app.get('/login/return',
  passport.authenticate('google', { prompt: 'select_account', failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('*', function(req, res) {
  const redirPath = findPath(req.user || '');

  if(redirPath.url) req.pipe(request(redirPath.url + req.url)).pipe(res);
  else {
    const root = path.resolve(__dirname, redirPath.path);
    res.sendFile(req.url, { root }, function(err) {
        if(err) {
          res.sendFile('index.html', { root });
        }
      });
  }
});

app.listen(process.env.PORT, function() {
  console.log(
    'Learning microsite backend listening on port ' + process.env.PORT
  );
});
