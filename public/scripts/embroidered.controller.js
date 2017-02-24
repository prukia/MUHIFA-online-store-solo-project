angular.module('muhifaApp').controller('EmbroideredController', function ($http, $location){
console.log('EmbroideredController is loaded');
var ctrl= this;


ctrl.getEmbroidered = function() {
    $http.get('/scarf/embroidered').then(function(response) {
     ctrl.embroidered = response.data;
     console.log('This is the embroidered data: ',response.data);
   }).catch(function(err) {
     console.log('error getting response from the products :', err);
   });
 }; // end getViscose function
ctrl.getEmbroidered();

ctrl.postScarves = function (data){
  $http.post('/scarf', data).then(function(response){
    console.log("Successfully posted to cart", response);


  }).catch(function(err){
    console.log('error posting response from the carts', err);
  });

};




});
