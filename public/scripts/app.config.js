//routing
angular.module('muhifaApp').config(function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $routeProvider.when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginController as login'
  }).when('/newUser', {
    templateUrl: 'views/register.html',
    controller: 'RegisterController as register'

  }).otherwise({
    templateUrl: 'views/home.html',
    controller: 'HomeController as home'
  });
});
