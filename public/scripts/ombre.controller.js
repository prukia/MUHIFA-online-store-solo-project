angular.module('muhifaApp').controller('OmbreController', function ($http, $location){
console.log('OmbreController is loaded');
var ctrl= this;


ctrl.getOmbre = function() {
    $http.get('/scarf/Ombre').then(function(response) {
     ctrl.ombre = response.data;
     console.log('This is the ombre data: ',response.data);
   }).catch(function(err) {
     console.log('error getting response from the products :', err);
   });
 }; // end getViscose function
ctrl.getOmbre();

ctrl.postScarves = function (data){
  $http.post('/scarf', data).then(function(response){
    console.log("Successfully posted to cart", response);


  }).catch(function(err){
    console.log('error posting response from the carts', err);
  });

};




});
