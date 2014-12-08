'use strict';

angular.module('myAppRename.viewHome', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/viewHome', {
    templateUrl: 'app/viewHome/viewHome.html'
  });
}])

.controller('View1Ctrl', function() {
});