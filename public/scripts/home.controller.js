angular.module('muhifaApp').controller('HomeController', function ($http, $location){
console.log('HomeController is loaded');

var ctrl= this;
ctrl.input = "";

this.logout = function() {
  console.log('is this working');
   $http.delete('/login').then(function(){
     console.log('Successfully logged out!');
     $location.path('/');
   }).catch(function(err){
     console.log('Error logging out');
   });
 };


 ctrl.search = function (key){
   console.log('this is the', key);
   //search query call
   $http.get('scarf/search/?q=' + key).then(function (response){
     ctrl.getResults = response.data;
     console.log('This is the search data: ',response.data);
   }).catch(function(err){
     console.log('Error searching database');
   });
 };


});
