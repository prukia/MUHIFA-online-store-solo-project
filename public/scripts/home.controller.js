angular.module('muhifaApp').controller('HomeController', function (SearchService, $location){
console.log('HomeController is loaded');

var ctrl= this;
ctrl.results = [];

this.logout = function() {
  console.log('is this working');
   $http.delete('/login').then(function(){
     console.log('Successfully logged out!');
     $location.path('/');
   }).catch(function(err){
     console.log('Error logging out');
   });
 };


 ctrl.getSearchResults = function (key){
   console.log('loading search results');

   SearchService.getSearchResults(key).then(function(response){
     ctrl.results = response;
     console.log(ctrl.results);
    
   });
 };
  ctrl.results =  SearchService.sKey();
// console.log('this is the input', ctrl.input);
 // $http.get('scarf/search/?q=' + key).then(function (response){
 //   ctrl.getResults = response.data;
 //   console.log('This is the search data: ',response.data);
 //    $location.path('/search');
 // }).catch(function(err){
 //   console.log('Error searching database');
 // });
// ctrl.search();

});
