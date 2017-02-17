var paypal = require('paypal-rest-sdk');
var paypalConfig = require('../config/auth');

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
    if (error) {
        throw error;
    } else {
        console.log("Create Payment Response");
        console.log(payment);
    }
});
