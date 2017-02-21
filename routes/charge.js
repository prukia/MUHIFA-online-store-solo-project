var router = require('express').Router();
var pool = require('../db/connection');

var stripe = require("stripe")("sk_test_dOFWIEyJc2fkOc8XzHtKTadE");


router.post('/charge', function(req, res) {
    var stripeToken = req.body.stripeToken;
    var amount = 1000;

    stripe.charges.create({
        card: stripeToken,
        currency: 'usd',
        amount: amount
    },
    function(err, charge) {
        if (err) {
            res.send(500, err);
        } else {
            res.send(204);
        }
    });
});




module.exports = router;
