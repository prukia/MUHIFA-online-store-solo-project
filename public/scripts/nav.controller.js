angular.module('muhifaApp').controller('NavController', function (SearchService, $location){
console.log('NavController is loaded');

//created nav controller so home controller and cart controller doesn't load twice
//search function should work on search page now
var ctrl= this;
//ctrl equals object inside of service
ctrl.results = SearchService.sKey;
ctrl.postResults = [];

ctrl.getSearchResults = function (key){
  console.log('loading search results');

  SearchService.getSearchResults(key).then(function(response){
    ctrl.results = response;
    console.log(ctrl.results);
    //no longer need this line to post results
    // ctrl.results =  SearchService.sKey();
  });
};
 // ctrl.results =  SearchService.sKey();


 // ctrl.postSearchResults = function (data){
 //
 //
 //   SearchService.postSearchResults(data).then(function (){
 //
 //     console.log('Your item posted to the cart', data);
 //
 //   });
 // };





});
