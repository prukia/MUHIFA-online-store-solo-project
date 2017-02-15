//routing
angular.module('muhifaApp').config(function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $routeProvider.when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginController as login'
  }).when('/newUser', {
    templateUrl: 'views/register.html',
    controller: 'RegisterController as register'

  }).when('/profile', {
    templateUrl: 'views/profile.html',
    controller: 'ProfileController as profile'

  }).when('/cart',{
    templateUrl: 'views/cart.html',
    controller: 'CartController as cart'
  }).when('/scarves',{
    templateUrl: 'views/scarves.html',
    controller: 'ScarvesController as scar'
  }).otherwise({
    templateUrl: 'views/home.html',
    controller: 'HomeController as home'
  });
});
