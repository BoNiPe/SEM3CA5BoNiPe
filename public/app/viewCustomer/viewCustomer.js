'use strict';

angular.module('myAppRename.viewCustomer', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/viewCustomer', {
            templateUrl: 'app/viewCustomer/view2.html',
            controller: 'CustomerController'
        })
        $routeProvider.when('/basket', {
            templateUrl: 'app/viewCustomer/basket.html',
            controller: 'BasketController'
        });
    }])
    .controller('CustomerController', ['$scope', '$http', function ($scope, $http) {
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
    }])
    .controller('BasketController', ['$scope', '$http', 'ProductInfoSaver', function ($scope, $http, ProductInfoSaver) {
        $scope.productsToOrder = ProductInfoSaver.getInfo();
        $scope.postOrders = function () {
            var toBePushed = new Array();
            for (var i = 0; i < $scope.productsToOrder.length; i++) {
                var objectToBePushed = {
                    productID: $scope.productsToOrder[i].productID,
                    quantity: $scope.productsToOrder[i].productAmount,
                    userAlias: "bobkoo"
                };
                $http({
                    method: 'POST',
                    url: 'adminApi/order',
                    data: objectToBePushed
                }).
                    success(function (data, status, headers, config) {
                        $scope.users = data;
                    }).
                    error(function (data, status, headers, config) {
                        $scope.error = data;
                    });
                objectToBePushed = {}
            }
        }
    }]);