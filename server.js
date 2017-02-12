var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

//creating cookies and underline session
var session = require('express-session');
var passport = require('passport');

//where route and connection scripts will be added

//where passport auth will be set up

var app = express();

//sessionConfig that happens before passport with me. specifying cookie info

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());

//no auth needed where route folders will go


//following routes require auth



app.get('/*', function(req, res){
  res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

var server = app.listen(3000, function() {
  console.log('Listening on port', server.address().port);
});
