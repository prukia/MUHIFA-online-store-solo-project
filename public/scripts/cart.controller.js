angular.module('muhifaApp').controller('CartController', function ($http, $location){
console.log('CartController is loaded');



var ctrl = this;
ctrl.getCartScarves = function() {
    $http.get('/carts').then(function(response) {

      //function to calculate subtotal and total and pass it to stripe API
     ctrl.cartScarves = response.data;
     ctrl.total = 0 ;
     ctrl.cartScarves.forEach(function (i){
       ctrl.subtotal = Number(i.qty) * Number(i.price);
       console.log(ctrl.subtotal);
       ctrl.total += ctrl.subtotal;

       })
       ctrl.subtotal = ctrl.total;
       //assuming shipping will always be 4.99
       ctrl.total += 4.99;
       ctrl.total = ctrl.total.toFixed(2);
       console.log(ctrl.total);


     console.log('This is the cart data: ',response.data);
   }).catch(function(err) {
     console.log('error getting response from the cart :', err);
   });
 }; // end getCohorts function
ctrl.getCartScarves();


ctrl.deleteProduct = function(id){
  console.log(id);
  $http.delete('/carts/' + id).then(function(response){
console.log('This product is deleted', response);
  }).catch(function(err){
    console.log('error deleting response from the cart', err);
  });
  ctrl.getCartScarves();
};

//update qty function

ctrl.updateProduct = function (object){
  // console.log('this is an object', object);
    console.log('this is an object', object.qty);
  $http.put('/carts/' + object.id, object).then(function(response){
    console.log('The quantity of this product is updated', response);
  }).catch(function(err){
    console.log('error updating response from the cart', err);
  });
  ctrl.getCartScarves();
};




//stripe function for checkout
ctrl.doCheckout = function (token){
  console.log(token);
  $http.post('/charge', {
    //will send token id and amt to stripe API
    data: token.id,
    amount: ctrl.total * 100
  }).then(function (response){
    alert("Thank you for your payment!")
    // alert("Got Stripe token: " + response);
  }).catch(function(err){
    console.log('error posting to stripe', err);
  });
};
});
