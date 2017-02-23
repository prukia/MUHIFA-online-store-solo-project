angular.module('muhifaApp').service('CartService', function ($http, $location){

console.log('CartService is loaded');

var ctrl = this;


this.getCartCount = function (){
  return $http.get('/carts').then(function(response) {

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
   //need to return response so ctrl has access to it
   return response.data;
 }).catch(function(err) {
   console.log('error getting response from the cart :', err);
 });

};






});
