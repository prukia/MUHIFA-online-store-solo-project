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
          console.log("Got all scarf products from DB", result.rows);
          res.send(result.rows);
        }
      });
    }
  });
});

//to get viscose scarves
router.get("/viscose", function(req, res) {

  pool.connect(function(err, client, done) {
    if (err) {
      console.log("Error connecting to DB", err);
      res.sendStatus(500);
      done();
    } else {

      client.query("SELECT * FROM products WHERE material='viscose';", function(err, result) {
        done();
        if (err) {
          console.log("Error querying DB", err);
          res.sendStatus(500);
        } else {
          console.log("Got info from viscose scarves from DB", result.rows);
          res.send(result.rows);
        }
      });
    }
  });
});

//search button by name, color, and style

router.get('/search', function (req, res, next) {

  pool.connect(function (err, client, done) {
    if (err) {
      console.log('Error connecting to the DB', err);
      res.sendStatus(500);
      done();
      return;
    }

    client.query('SELECT * FROM products ' +
    'WHERE name ILIKE $1 OR color ILIKE $1 OR material ILIKE $1 OR type ILIKE $1;', [req.query.q], function (err, result) {
      done();
      if (err) {
        console.log('Error querying the DB', err);
        res.sendStatus(500);
        return;
      }

      console.log('Got rows from the DB:', result.rows);
      res.send(result.rows);
    });

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

      client.query('INSERT INTO cart (name, color, description, type, material, image_url, price, qty, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7,$8 , $9) RETURNING *;',
      //has to be the same as object names inside of gif-service
      [req.body.name, req.body.color, req.body.description, req.body.type, req.body.material, req.body.image_url, req.body.price, 1, req.body.user_id],
      function(err, result){
        //waiting for database to get information back
        done();
        if(err) {
          console.log('Error querying DB', err);
          res.sendStatus(500);
        }else{
          console.log('Posted products to DB', result.rows);
          res.send(result.rows);
        }

      })

    }
  });
});







module.exports = router;
