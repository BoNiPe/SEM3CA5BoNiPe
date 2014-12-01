'use strict';

angular.module('myAppRename.viewAdmin', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/adminHome', {
            templateUrl: 'app/viewAdmin/view3.html',
            controller: 'AdminHomeController'
        })
            .when('/products', {
                templateUrl: 'app/viewAdmin/products.html',
                controller: 'ProductsController'
            })
            .when('/orders', {
                templateUrl: 'app/viewAdmin/orders.html',
                controller: 'OrdersController'
            })
            .when('/orders/:id', {
                templateUrl: 'app/viewAdmin/particularOrder.html',
                controller: 'OrderDetailsController'
            })
            .when('/payments', {
                templateUrl: 'app/viewAdmin/payments.html',
                controller: 'PaymentsController'
            });
    }])

    .controller('AdminHomeController', function ($scope, $http) {
        $http({
            method: 'GET',
            url: 'adminApi/user'
        }).
            success(function (data, status, headers, config) {
                $scope.users = data;
                $scope.error = null;
            }).
            error(function (data, status, headers, config) {
                if (status == 401) {
                    $scope.error = "You are not authenticated to request these data";
                    return;
                }
                $scope.error = data;
            });
    });






