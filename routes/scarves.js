var router = require('express').Router();
var pool = require('../db/connection');

router.get("/", function(req, res) {

  pool.connect(function(err, client, done) {
    if (err) {
      console.log("Error connecting to DB", err);
      res.sendStatus(500);
      done();
    } else {

      client.query("SELECT * FROM products;", function(err, result) {
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
router.post('/', function(req, res){
  pool.connect(function(err, client, done){
    console.log(req.body);
    if (err){
      console.log('Error connecting to DB', err);
      res.sendStatus(500);
      done();
    } else {

      client.query('INSERT INTO cart (name, color, description, type, material, image_url, price, qty) VALUES ($1, $2, $3, $4, $5, $6, $7,$8) RETURNING *;',
      //has to be the same as object names inside of gif-service
      [req.body.name, req.body.color, req.body.description, req.body.type, req.body.material, req.body.image_url, req.body.price, req.body.qty],
      function(err, result){
        //waiting for database to get information back
        done();
        if(err) {
          console.log('Error querying DB', err);
          res.sendStatus(500);
        }else{
          console.log('Got info from DB POST', result.rows);
          res.send(result.rows);
        }

      })

    }
  });
});







module.exports = router;
