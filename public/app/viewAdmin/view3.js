'use strict';

angular.module('myAppRename.viewAdmin', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/adminHome', {
            templateUrl: 'app/viewAdmin/view3.html',
            controller: 'AdminHomeController'
        })
            .when('/control/products', {
                templateUrl: 'app/viewAdmin/products.html',
                controller: 'ProductsController'
            })
            .when('/control/products/edit', {
                templateUrl: 'app/viewAdmin/editProduct.html',
                controller: 'EditProductController'
            })
            .when('/control/orders', {
                templateUrl: 'app/viewAdmin/orders.html',
                controller: 'OrdersController'
            })
            .when('/control/orders/edit', {
                templateUrl: 'app/viewAdmin/editOrder.html',
                controller: 'EditCreatedOrderController'
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
    })

    .controller('EditProductController', ['$scope', '$http', 'editParticularObject', function ($scope, $http, editParticularObject) {
        $scope.product = editParticularObject.getObject();
        $scope.saveChangesInProduct = function (product) {
                $http.put('adminApi/product/' + product._id, product);
            window.location = "#/control/products";
        }
    }])

    .controller('EditCreatedOrderController', ['$scope', '$http', 'editParticularObject', function ($scope, $http, editParticularObject) {
        $scope.order = editParticularObject.getObject();
        $scope.saveChangesInOrder = function (order) {
            $http.put('adminApi/order/' + order._id, order);
            window.location = "#/control/orders";
        }
    }]);






