'use strict';

angular.module('myAppRename.viewCustomer', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/viewCustomer', {
            templateUrl: 'app/viewCustomer/view2.html',
            controller: 'CustomerController'
        })
            .when('/basket', {
                templateUrl: 'app/viewCustomer/basket.html',
                controller: 'BasketController'
            })
            .when('/editOrder', {
                templateUrl: 'app/viewCustomer/editOrder.html',
                controller: 'EditOrderController'
            })
            .when('/products', {
                templateUrl: 'app/viewCustomer/products.html',
                controller: 'ProductsController'
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
    .controller('BasketController', ['$scope', '$http', 'ProductInfoSaver', 'editParticularOrder', function ($scope, $http, ProductInfoSaver, editParticularOrder) {
        $scope.currentOrders = ProductInfoSaver.getInfo();
        $scope.editOrder = function (order) {
            console.log('order: ' + order);
            editParticularOrder.setInfo(order);
            window.location = "#/editOrder";
        };

        $scope.deleteOrder = function (order) {
            console.log('order: ' + order);
            ProductInfoSaver.deleteFromList(order);
        };

        $scope.postOrders = function () {
            var toBePushed = new Array();
            for (var i = 0; i < $scope.currentOrders.length; i++) {
                var objectToBePushed = {
                    productID: $scope.currentOrders[i].productID,
                    quantity: $scope.currentOrders[i].productAmount,
                    userAlias: "bobkoo"
                };
                $http({
                    method: 'POST',
                    url: 'adminApi/order',
                    data: objectToBePushed
                }).
                    success(function (data, status, headers, config) {
                        $scope.success = data;
                    }).
                    error(function (data, status, headers, config) {
                        $scope.error = data;
                    });
                objectToBePushed = {}
            }
        }
    }])

    .controller('EditOrderController', ['$scope', '$http', 'ProductInfoSaver', 'editParticularOrder', function ($scope, $http, ProductInfoSaver, editParticularOrder) {
        var allOrders = ProductInfoSaver.getInfo();
        $scope.orderToEdit = editParticularOrder.getInfo();

        $scope.editBasket = function (quantity) {
            for (var i = 0; i < allOrders.length; i++) {
                if (allOrders[i].productID === $scope.orderToEdit.productID) {
                    allOrders[i].productAmount = quantity;
                }
            }
            ProductInfoSaver.changeList(allOrders);
            window.location = "#/basket";
        }

    }]);