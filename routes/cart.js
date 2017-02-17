var router = require('express').Router();
var pool = require('../db/connection');
var paypal = require('paypal-rest-sdk');
var paypalConfig = require('../config/auth');

router.get("/test", function (req,res){
  var create_payment_json = {
      "intent": "order",
      "payer": {
          "payment_method": "paypal"
      },
      "redirect_urls": {
          "return_url": "http://localhost:3000/cart",
          "cancel_url": "http://localhost:3000/home"
      },
      "transactions": [{
          "item_list": {
              "items": [{
                  "name": "blush pink",
                  "sku": 5.1,
                  "price": "8.00",
                  "currency": "USD",
                  "quantity": 1
              }]
          },
          "amount": {
              "currency": "USD",
              "total": "8.00"
          },
          "description": "This is the payment description."
      }]
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    console.log("hello", payment);
      if (error) {
          throw error;
      } else {
          console.log("Create Payment Response");
          console.log(payment);
      }
  });





});

router.get("/", function(req, res) {

  pool.connect(function(err, client, done) {
    if (err) {
      console.log("Error connecting to DB", err);
      res.sendStatus(500);
      done();
    } else {

      client.query("SELECT * FROM cart;", function(err, result) {
        done();
        if (err) {
          console.log("Error querying DB", err);
          res.sendStatus(500);
        } else {
          // console.log("Got info from DB", result.rows);
          res.send(result.rows);
        }
      });
    }
  });
});
//delete product from cart
router.delete('/:id', function(req, res){
  pool.connect(function(err, client, done){
    if (err) {
      console.log('Error connecting to DB', err);
      res.sendStatus(500);
      done();
    } else {
      client.query('DELETE FROM cart WHERE id = $1',
                   [req.params.id],
                   function(err, result){
                     done();
                     if (err) {
                       console.log('Error deleting product', err);
                       res.sendStatus(500);
                     } else {
                       res.sendStatus(204);
                     }
                   });
    }
  });
});

module.exports = router;
