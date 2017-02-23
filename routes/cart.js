var router = require('express').Router();
var pool = require('../db/connection');




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
          console.log("Got products from cart's DB", result.rows);
          res.send(result.rows)

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

//Updating qty amount in cart
router.put('/:id', function (req,res){
    console.log('this is the qty', req.body);
  pool.connect(function (err, client, done){
    if(err){
      console.log('Error connecting to DB', err);
      res.sendStatus(500);
      done();
    }else{
      client.query('UPDATE cart SET qty=$2 WHERE id = $1 RETURNING *',
      [req.params.id,req.body.qty],
      function(err, result){
        done();
        if(err){
          console.log('Error updating qty in cart', err);
          res.sendStatus(500);
        }else{
          res.send(result.rows);
        }
      });

    }
  });

})

module.exports = router;
