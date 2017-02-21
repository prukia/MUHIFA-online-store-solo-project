var router = require('express').Router();
var pool = require('../db/connection');

var stripe = require("stripe")("sk_test_dOFWIEyJc2fkOc8XzHtKTadE");

router.get("/", function(req, res) {

  pool.connect(function(err, client, done) {
    if (err) {
      console.log("Error connecting to DB", err);
      res.sendStatus(500);
      done();
    } else {

      client.query("SELECT price FROM cart;", function(err, result) {
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


router.post('/', function(req, res) {
    var stripeToken = req.body.data;
    console.log(req.body);
    // var amount = 600
    var amount=req.body.amount;

    stripe.charges.create({
        card: stripeToken,
        currency: 'usd',
        amount: amount
    },
    function(err, charge) {
      console.log(charge);
        if (err) {
            res.send(500, err);
        } else {
            res.send(204);
        }
    });
});




module.exports = router;
