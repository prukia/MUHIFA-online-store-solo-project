angular.module('muhifaApp').controller('CartController', function ($http, $location){
console.log('CartController is loaded');


var ctrl = this;
ctrl.getCartScarves = function() {
    $http.get('/carts').then(function(response) {
     ctrl.cartScarves = response.data;
     console.log('This is the cart data: ',response.data);
   }).catch(function(err) {
     console.log('error getting response from the cart :', err);
   });
 }; // end getCohorts function
ctrl.getCartScarves();


});
