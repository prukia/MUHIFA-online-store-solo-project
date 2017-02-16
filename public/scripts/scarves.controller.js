angular.module('muhifaApp').controller('ScarvesController', function ($http, $location){
console.log('ScarvesController is loaded');
var ctrl= this;


ctrl.getScarves = function() {
    $http.get('/scarf').then(function(response) {
     ctrl.scarves = response.data;
     console.log('This is the product data: ',response.data);
   }).catch(function(err) {
     console.log('error getting response from the products :', err);
   });
 }; // end getCohorts function
ctrl.getScarves();

ctrl.postScarves = function (data){
  $http.post('/scarf', data).then(function(response){
    console.log("Successfully posted to cart", response);


  }).catch(function(err){
    console.log('error posting response from the carts', err);
  });
  
};

});
