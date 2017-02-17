var router = require('express').Router();
var pool = require('../db/connection');
var paypal = require('paypal-rest-sdk');
var paypalConfig = require('../config/auth');

router.get("/test", function (req,res){

  var card_data = {
    "type": "visa",
    "number": "4417119669820331",
    "expire_month": "11",
    "expire_year": "2018",
    "cvv2": "123",
    "first_name": "Joe",
    "last_name": "Shopper"
  };

  paypal.creditCard.create(card_data, function(error, credit_card){
    if (error) {
      console.log(error);
      throw error;
    } else {
      console.log("Create Credit-Card Response");
      console.log(credit_card);
    }
  });

  //created paypal payment for blush pink and received 'approval_url' from paypal
  //with link to purchase product
  var create_payment_json = {
      "intent": "sale",
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
                  "quantity": 4
              }]
          },
          "amount": {
              "currency": "USD",
              "total": "32.00"
          },
          "description": "This is the payment description."
      }]
  };
  var execute_payment_json = {
    // "payer_id": "Appended to redirect url",
    "transactions": [{
        "amount": {
            "currency": "USD",
            "total": "1.00"
        }
    }]
};

  paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
          throw error;
      } else {
          console.log("Create Payment Response");
          console.log(payment);
          // paypal.payment.execute(payment.id, execute_payment_json, function (error, payment){
          //     if (error) {
          //         console.log(error.response);
          //         throw error;
          //     } else {
          //         console.log("Get Payment Response");
          //         console.log(JSON.stringify(payment));
          //     }
          // });

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
          var paypalCon =  {
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": result.rows[0].name,
                        "sku": result.rows[0].id,
                        "price": result.rows[0].price,
                        "currency": "USD",
                        "quantity": result.rows[0].qty


                    }]

                  },
                    "amount": {
                        "currency": "USD",
                        //need to change price to number or integer
                        "total": (result.rows[0].price * result.rows[0].qty)
                        // (result.rows[0].qty)
                    }



        }]

      }
      console.log('paypal config is ', JSON.stringify(paypalCon));























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
