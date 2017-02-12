angular.module('muhifaApp').service('AuthService', function ($http, $location){

console.log('AuthService is loaded');

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
});
