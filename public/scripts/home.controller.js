angular.module('muhifaApp').controller('HomeController', function ($http, $location){
console.log('HomeController is loaded');
this.logout = function() {
   $http.delete('/login').then(function(){
     console.log('Successfully logged out!');
     $location.path('/');
   }).catch(function(err){
     console.log('Error logging out');
   });
 }
});
