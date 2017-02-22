angular.module('muhifaApp').controller('ViscoseController', function ($http, $location){
console.log('ViscoseController is loaded');
var ctrl= this;


ctrl.getViscose = function() {
    $http.get('/scarf/viscose').then(function(response) {
     ctrl.viscose = response.data;
     console.log('This is the viscose data: ',response.data);
   }).catch(function(err) {
     console.log('error getting response from the products :', err);
   });
 }; // end getViscose function
ctrl.getViscose();

ctrl.postScarves = function (data){
  $http.post('/scarf', data).then(function(response){
    console.log("Successfully posted to cart", response);


  }).catch(function(err){
    console.log('error posting response from the carts', err);
  });

};




});
