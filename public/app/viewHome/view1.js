'use strict';

angular.module('myAppRename.viewHome', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/viewHome', {
    templateUrl: 'app/viewHome/view1.html'
  });
}])

.controller('View1Ctrl', function() {
});