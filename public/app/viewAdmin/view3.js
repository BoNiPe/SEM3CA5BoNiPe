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
            .when('/control/products/:id', {
                templateUrl: 'app/viewAdmin/editProduct.html',
                controller: 'EditProductController'
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
    })

    .controller('EditProductController', ['$scope', '$http', 'editParticularProduct', function ($scope, $http, editParticularProduct) {
        $scope.toBeEditedProduct = editParticularProduct.getProduct();
        $scope.saveChangesofProduct = function (product) {
            console.log('Hello my product is : ' + product.productName);
                $http.put('adminApi/product/' + product._id, product);
            window.location = "#/control/products";
        }
    }]);






