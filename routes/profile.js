var router = require('express').Router();
var pool = require('../db/connection');

router.get("/", function(req, res) {
console.log(req.user.id);
  pool.connect(function(err, client, done) {
    if (err) {
      console.log("Error connecting to DB", err);
      res.sendStatus(500);
      done();
    } else {

      client.query("SELECT username, first_name, last_name, street, city, state, zip FROM users WHERE id=$1;",
      [req.user.id],
      function(err, result) {
        done();
        if (err) {
          console.log("Error querying DB", err);
          res.sendStatus(500);
        } else {
          console.log("Got info from DB", result.rows);
          res.send(result.rows);
        }
      });
    }
  });
});








module.exports = router;
