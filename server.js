var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

//creating cookies and underline session
var session = require('express-session');
var passport = require('passport');

//where route and connection scripts will be added
var connection = require('./db/connection');
var login = require('./routes/login');
// var register = require('./routes/register');

//where passport auth will be set up
require('./auth/setup');


connection.connect();

var app = express();

//sessionConfig that happens before passport will be. specifying cookie info

var sessionConfig = {
  //not shared with people. searches for it in the environment
  secret: process.env.SECRET || 'super secrect key goes here',
  key: 'user',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 50 * 1000, //30 mins. Cookie should only last 30min
    secure: false
  }
}

app.use(session(sessionConfig));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());

//no auth needed where route folders will go
app.use('/login', login);
// app.use('/register', register);

app.get('/loginStatus', function (req,res){
  res.send(req.isAuthenticated());
})

//following routes require auth
app.use('/private', ensureAuthenticated);

app.get('/private/secretInfo', function(req, res){
  console.log('Sending secret info');
  res.send('This is very secret');
});
function ensureAuthenticated(req, res, next){
  console.log('Ensuring the user is authenticated');
  if(req.isAuthenticated()){
    next();
  } else {
    res.sendStatus(401);
  }
}



app.get('/*', function(req, res){
  res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

var server = app.listen(3000, function() {
  console.log('Listening on port', server.address().port);
});
