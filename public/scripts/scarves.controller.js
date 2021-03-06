angular.module('muhifaApp').controller('ScarvesController', function ($http,AuthService, CartService){
console.log('ScarvesController is loaded');
var ctrl= this;


ctrl.getScarves = function() {
    $http.get('/scarf').then(function(response) {
     ctrl.scarves = response.data;
     console.log('This is the product data: ',response.data);
   }).catch(function(err) {
     console.log('error getting response from the products :', err);
   });
 }; // end getScarves function
ctrl.getScarves();


ctrl.postScarves = function (data){
var loggedinStatus = null;
  // data.user_id = AuthService.uniqueId();
  // console.log('this is the users id shopping', data.user_id);

  $http.get('/loginStatus').then(function(response){
    loggedinStatus = response.data;
    console.log('this is the status', response);
  });
if ( loggedinStatus === true ){
  $http.post('/scarf', data).then(function(response){
    console.log("Successfully posted to cart", response);
      // data.user_id = AuthService.uniqueId();

  }).catch(function(err){
    console.log('error posting response from the carts', err);

  });

}else{
  CartService.addToCartTracker(data);
  // console.log('is this working', CartService.addToCartTracker(data));
};


};


});
