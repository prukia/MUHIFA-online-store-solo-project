angular.module('muhifaApp').controller('ProfileController', function (AuthService, $location){
console.log('ProfileController is loaded');

var ctrl = this;

ctrl.user=[];

ctrl.getProfileInfo = function() {
  console.log('loading user profile');

  AuthService.getProfileInfo().then(function (profile){
    ctrl.user = profile;
  });
};
ctrl.getProfileInfo();
});




// $http.get('/profile', {
//   username: ctrl.username,
//   first_name: ctrl.first_name,
//   last_name: ctrl.last_name,
//   street: ctrl.street,
//   city: ctrl.city,
//   state: ctrl.state,
//   zip: ctrl.zip
//   }).then(function(response){
//     console.log(response);
//     // $location.path('/home');
//   }, function(error) {
//     console.log('error loading user profile', error);
//   });
// };
