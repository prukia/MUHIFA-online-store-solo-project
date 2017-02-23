angular.module('muhifaApp').service('SearchService', function ($http, $location){

console.log('SearchService is loaded');

var sKey = [];


this.getSearchResults = function (key){
  console.log('this is the', key);
  console.log('Getting search results');
  return $http.get('scarf/search/?q=' + key).then(function (response){

       console.log('This is the search data: ',response.data);

        $location.path('/search');
        sKey = response.data;
        return response.data;
     }).catch(function(err){
       console.log(err);
       console.log('Error searching database');
     });

};

this.sKey = function (){
  return sKey;

};
this.postSearchResults = function (data){
  console.log(data);
  return $http.post('/scarf', data).then(function(response){
      console.log("Successfully posted to cart", response);


    }).catch(function(err){
      console.log('error posting response from the carts', err);
    });


};


});
