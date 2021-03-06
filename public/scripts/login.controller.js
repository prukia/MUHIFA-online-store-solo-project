angular.module('muhifaApp').controller('LoginController', LoginController);


//function for users to log in
function LoginController($http, $location) {
  console.log('LoginController loaded');
  var ctrl = this;

  ctrl.login = function() {
    console.log('logging in');
    $http.post('/login', {
      username: ctrl.username,
      password: ctrl.password
    }).then(function(response){
      console.log(response);
      $location.path('/home');
    }, function(error) {
      console.log('error loggin in', error);
      swal("Oops!", "Something went wrong on the page, possibly wrong password?", "error");
    });
  };
}
