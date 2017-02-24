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
  }).when('/viscose',{
    templateUrl: 'views/viscose.html',
    controller: 'ViscoseController as vis'
  }).when('/embroidered',{
    templateUrl: 'views/embroidered.html',
    controller: 'EmbroideredController as em'
  }).when('/ombre',{
    templateUrl: 'views/ombre.html',
    controller: 'OmbreController as om'
  }).when('/search',{
    templateUrl: 'views/search.html',
    controller: 'HomeController as home'
  }).otherwise({
    templateUrl: 'views/home.html',
    controller: 'HomeController as home'
  });
});
