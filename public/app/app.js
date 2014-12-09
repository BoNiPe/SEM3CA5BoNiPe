'use strict';

// Declare app level module which depends on views, and components
angular.module('myAppRename', [
  'ngRoute','ui.bootstrap',
  'myAppRename.controllers',
  'myAppRename.directives',
  'myAppRename.services',
  'myAppRename.factories',
  'myAppRename.filters',
  'myAppRename.viewHome',
  'myAppRename.viewCustomer',
  'myAppRename.viewAdmin'
])
    .config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/viewHome'});
}])
    .config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });



