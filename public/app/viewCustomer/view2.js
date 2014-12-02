'use strict';

angular.module('myAppRename.viewCustomer', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/viewCustomer', {
      templateUrl: 'app/viewCustomer/view2.html',
      controller: 'View2Ctrl'
    });
  }])
  .controller('View2Ctrl', ['$scope', '$http', function ($scope, $http) {
    $http({
      method: 'GET',
      url: 'userApi/test'
    })
      .success(function (data, status, headers, config) {
        $scope.info = data;
        $scope.error = null;
      }).
      error(function (data, status, headers, config) {
        if (status == 401) {
          $scope.error = "You are not authenticated to request these data";
          return;
        }
        $scope.error = data;
      });
  }]);