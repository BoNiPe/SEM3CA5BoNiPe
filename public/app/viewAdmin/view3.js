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
            .when('/control/products/new', {
                templateUrl: 'app/viewAdmin/newProduct.html',
                controller: 'NewProductController'
            })
            .when('/control/orders/edit', {
                templateUrl: 'app/viewAdmin/editOrder.html',
                controller: 'EditCreatedOrderController'
            })

            .when('/control/orders', {
                templateUrl: 'app/viewAdmin/orders.html',
                controller: 'OrdersController'
            })
            .when('/control/orders/particular/:id', {
                templateUrl: 'app/viewAdmin/currentOrder.html',
                controller: 'OrderDetailsController'
            })
            .when('/control/product/particular/:id', {
                templateUrl: 'app/viewAdmin/currentProduct.html',
                controller: 'ProductDetailsController'
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
                    window.location = "#/viewHome";
                    return;
                }
                $scope.error = data;
            });
    })

    .controller('ProductsController', ['$scope', '$http', 'ProductInfoSaver','editParticularObject', function ($scope, $http, ProductInfoSaver, editParticularObject) {
        $http({
            method: 'GET',
            url: 'adminApi/product'
        }).
            success(function (data, status, headers, config) {
                $scope.products = data;
            }).
            error(function (data, status, headers, config) {
                $scope.error = data;
            });

        $scope.editProduct = function (product) {
            editParticularObject.setObject(product);
            window.location = "#/control/products/edit";
        }

        $scope.deleteProduct = function (product) {
            $http.delete('adminApi/product/' + product._id, product);
            var index = $scope.products.indexOf(product);
            $scope.products.splice(index,1);
        }
    }])

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
    }])

    .controller('NewProductController', function ($scope, $http) {
        $scope.postnewProduct = function () {
            $http({
                method: 'POST',
                url: 'adminApi/product',
                data: $scope.newProduct
            }).
                success(function (data, status, headers, config) {
                    $scope.success = data;
                }).
                error(function (data, status, headers, config) {
                    $scope.error = data;
                });
            $scope.postnewProduct = {}
            window.location = "#/control/products";
        }

    })

    .controller('OrdersController', ['$scope', '$http', 'editParticularObject', function ($scope, $http, editParticularObject) {
        $http({
            method: 'GET',
            url: 'adminApi/order'
        }).
            success(function (data, status, headers, config) {
                $scope.orders = data;
                $scope.error = null;
            }).
            error(function (data, status, headers, config) {
                if (status == 401) {
                    $scope.error = "You are not authenticated to request these data";
                    return;
                }
                $scope.error = data;
            });

        $scope.adminEditOrder = function (order) {
            editParticularObject.setObject(order);
            console.log('HEy, I will change to :' + "#/control/orders/edit")
            window.location = "#/control/orders/edit";
        }

        $scope.adminDeleteOrder = function (order) {
            $http.delete('adminApi/order/' + order._id, order);
            var index = $scope.orders.indexOf(order);
            $scope.orders.splice(index,1);
        }
    }])


    .controller('ProductDetailsController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
        $http({
            method: 'GET',
            url: 'adminApi/product/' + $location.path().split("/")[4]
        }).
            success(function (data, status, headers, config) {
                $scope.curProduct = data;
            }).
            error(function (data, status, headers, config) {
                $scope.error = data;
            });
    }])

    .controller('OrderDetailsController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
        $http({
            method: 'GET',
            url: 'adminApi/order/' + $location.path().split("/")[4]
        }).
            success(function (data, status, headers, config) {
                $scope.curOrder = data;
            }).
            error(function (data, status, headers, config) {
                $scope.error = data;
            });
    }]);