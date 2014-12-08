'use strict';

angular.module('myAppRename.viewHome', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/viewHome', {
    templateUrl: 'app/viewHome/viewHome.html'
  })
      .when('/registration', {
        templateUrl: 'app/viewHome/register.html',
        controller: 'RegistrationController'
      });
}])

.controller('View1Ctrl', function() {
})

    .controller('RegistrationController', function ($scope, $http) {
      $scope.postUser = function () {
        $http.post('admin', $scope.newUser);
        window.location = "#/viewHome";
      }
    });