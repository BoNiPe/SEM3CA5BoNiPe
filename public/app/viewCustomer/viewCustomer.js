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
                controller: 'UserProductController'
            })
            .when('/products/:id', {
                templateUrl: 'app/viewCustomer/currentProduct.html',
                controller: 'currentProductControllerUser'
            })
            .when('/profile', {
                templateUrl: 'app/viewCustomer/clientProfile.html',
                controller: 'AccountController'
            })
            .when('/profile/edit', {
                templateUrl: 'app/viewCustomer/editProfile.html',
                controller: 'EditUserController'
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
                    window.location = "#/viewHome";
                    return;
                }
                $scope.error = data;
            });
    }])

    .controller('BasketController', ['$scope', '$http', 'ProductInfoSaver', 'editParticularObject', function ($scope, $http, ProductInfoSaver, editParticularObject) {
        $scope.currentOrders = ProductInfoSaver.getInfo();
        $scope.editOrder = function (order) {
            console.log('order: ' + order);
            editParticularObject.setObject(order);
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
                    userAlias: "betaversion"
                };
                $http({
                    method: 'POST',
                    url: 'userApi/order',
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
            ProductInfoSaver.clearList();
            window.location = "#/viewCustomer";
        }
    }])

    .controller('EditOrderController', ['$scope', '$http', 'ProductInfoSaver', 'editParticularObject', function ($scope, $http, ProductInfoSaver, editParticularObject) {
        var allOrders = ProductInfoSaver.getInfo();
        $scope.orderToEdit = editParticularObject.getObject();

        $scope.editBasket = function (quantity) {
            for (var i = 0; i < allOrders.length; i++) {
                if (allOrders[i].productID === $scope.orderToEdit.productID) {
                    allOrders[i].productAmount = quantity;
                }
            }
            ProductInfoSaver.changeList(allOrders);
            window.location = "#/basket";
        }

    }])

    .controller('UserProductController', ['$scope', '$http', 'ProductInfoSaver','editParticularObject', function ($scope, $http, ProductInfoSaver, editParticularObject) {

        $http({
            method: 'GET',
            url: 'userApi/product'
        }).
            success(function (data, status, headers, config) {
                $scope.products = data;
            }).
            error(function (data, status, headers, config) {
                $scope.error = data;
            });

        $scope.addProductToBasket = function (product, productAmount) {
            var productToBasket = {
                productID: product._id,
                productName: product.productName,
                productAmount: productAmount,
                productPrice: productAmount * product.unitPrice
            };
            ProductInfoSaver.setInfo(productToBasket);
            window.location = "#/basket";
        }
    }])

    .controller('currentProductControllerUser', ['$scope', '$http', '$location', function ($scope, $http, $location) {
        $http({
            method: 'GET',
            url: 'userApi/product/' + $location.path().split("/")[2]
        }).
            success(function (data, status, headers, config) {
                $scope.currentProduct = data;
            }).
            error(function (data, status, headers, config) {
                $scope.error = data;
            });
    }])

    .controller('AccountController', ['$scope', '$http', 'userInformation', function ($scope, $http, userInformation) {
        var curUser = userInformation.getObject();
        $scope.account = curUser;

        $scope.deleteClientUser = function () {
            console.log('Deleting yourself');
            $http.delete('admin/' + curUser.username);
            $scope.isAuthenticated = false;
            $scope.isAdmin = false;
            $scope.isUser = false;
            delete $window.sessionStorage.token;
            $location.path("#/viewHome");
        }
    }])

    .controller('EditUserController', ['$scope', '$http', 'userInformation', function ($scope, $http, userInformation) {
        $scope.user = userInformation.getObject();
        $scope.saveChangesInUser = function (curUser) {
            $http.put('admin/', curUser);
            window.location = "#/profile";
        }
    }]);