angular.module('muhifaApp').controller('RegisterController', function ($http, $location){
console.log('RegisterController is loaded');

var ctrl = this;

ctrl.register = function() {
  console.log('creating a new user');
  $http.post('/register', {
    username: ctrl.username,
    password: ctrl.password,
    first_name: ctrl.first_name,
    last_name: ctrl.last_name,
    street: ctrl.street,
    city: ctrl.city,
    state: ctrl.state,
    zip: ctrl.zip
  }).then(function(response){
    console.log(response);
    $location.path('/home');
  }, function(error) {
    console.log('error registering new user', error);
  });
};
});
