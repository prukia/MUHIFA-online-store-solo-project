angular.module('muhifaApp').service('AuthService', function ($http, $location){

console.log('AuthService is loaded');

var uniqueId = 0;

this.checkLoginStatus = function (){
    console.log('Checking login status');
  return $http.get('/loginStatus').then(function (res){
      if (res.data){
        console.log('User is logged in');
        return true;
      } else {
        console.log('User is not logged in');
        // send them to the login view
        return false;
      }
    });
  }

this.getProfileInfo = function (){
  console.log('Getting user profile');
  return $http.get('/person').then(function (res){
    console.log('this is the user id', res.data[0].id);
    console.log('got response from the DB', res);
    uniqueId = res.data[0].id;
    console.log(uniqueId);
    return res.data;
  }).catch(function(err){
    console.log("error getting info from DB", err);
  });
};
//to get user_id that is logged in at the time.
this.uniqueId = function (){

  return uniqueId;

};


});
