const router = require('express').Router();
var passport = require ('passport');

router.post('/', passport.authenticate('local'), function(req, res){
  // this is where we need to check the password

  res.sendStatus(200);
});

//router for delete where logout will be

router.delete('/', function(req, res){
  req.logout();
  res.sendStatus(204);
});

module.exports = router;
