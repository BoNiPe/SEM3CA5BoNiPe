'use strict';

angular.module('myAppRename.viewAdmin', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/adminHome', {
            templateUrl: 'app/viewAdmin/adminHome.html',
            controller: 'AdminHomeController'
        })
            //Personal user
            .when('/control/account', {
                templateUrl: 'app/viewAdmin/adminProfile.html',
                controller: 'AdminAccountController'
            })
            //Users - GET(1),GET(ALL),PUSH,PUT,DELETE
            .when('/control/users', {
                templateUrl: 'app/viewAdmin/users.html',
                controller: 'UsersController'
            })
            .when('/control/users/new', {
                templateUrl: 'app/viewAdmin/newUser.html',
                controller: 'NewUserController'
            })
            .when('/control/users/edit', {
                templateUrl: 'app/viewAdmin/editUser.html',
                controller: 'EditUserController'
            })
            .when('/control/users/particular/:userAlias', {
                templateUrl: 'app/viewAdmin/currentUser.html',
                controller: 'UserDetailsController'
            })
            //Products - GET(1),GET(ALL),PUSH,PUT,DELETE
            .when('/control/products', {
                templateUrl: 'app/viewAdmin/products.html',
                controller: 'ProductsController'
            })
            .when('/control/products/new', {
                templateUrl: 'app/viewAdmin/newProduct.html',
                controller: 'NewProductController'
            })
            .when('/control/products/edit', {
                templateUrl: 'app/viewAdmin/editProduct.html',
                controller: 'EditProductController'
            })
            .when('/control/product/particular/:id', {
                templateUrl: 'app/viewAdmin/currentProduct.html',
                controller: 'ProductDetailsController'
            })
            //Orders - GET(1),GET(ALL),PUT,DELETE
            .when('/control/orders', {
                templateUrl: 'app/viewAdmin/orders.html',
                controller: 'OrdersController'
            })
            .when('/control/orders/edit', {
                templateUrl: 'app/viewAdmin/editOrder.html',
                controller: 'EditCreatedOrderController'
            })
            .when('/control/orders/particular/:id', {
                templateUrl: 'app/viewAdmin/currentOrder.html',
                controller: 'OrderDetailsController'
            });
    }])

    .controller('AdminHomeController', ['$scope', '$http', 'userInformation', function ($scope, $http, userInformation) {
        var curUser = userInformation.getObject();
        $scope.fname = curUser.fname;
        $scope.lname = curUser.lname;
    }])

    .controller('AdminAccountController', ['$scope', '$http', 'userInformation', function ($scope, $http, userInformation) {
        $scope.account = userInformation.getObject();
    }])

    .controller('UsersController', ['$scope', '$http', 'editParticularObject', function ($scope, $http, editParticularObject) {
        $http({
            method: 'GET',
            url: 'admin/'
        }).
            success(function (data, status, headers, config) {
                $scope.users = data;
            }).
            error(function (data, status, headers, config) {
                if (status == 401) {
                    $scope.error = "You are not authenticated to request these data";
                    return;
                }
                $scope.error = data;
            });

        $scope.editUser = function (objectToEdit) {
            editParticularObject.setObject(objectToEdit);
            window.location = "#/control/users/edit";
        }

        $scope.detailsOfUser = function (objectToEdit) {
            editParticularObject.setObject(objectToEdit);
            window.location = "#/control/users/particular/" + objectToEdit.userAlias;
        }

        $scope.deleteUser = function (objectToDelete) {
            $http.delete('admin/' + objectToDelete.username);
            var index = $scope.users.indexOf(objectToDelete);
            $scope.users.splice(index, 1);
        }
    }])

    .controller('ProductsController', ['$scope', '$http', 'BasketArrayFactory', 'editParticularObject',
        function ($scope, $http, ProductInfoSaver, editParticularObject) {
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
                $scope.products.splice(index, 1);
            }
        }])

    .controller('EditProductController', ['$scope', '$http', 'editParticularObject',
        function ($scope, $http, editParticularObject) {
            $scope.product = editParticularObject.getObject();
            $scope.saveChangesInProduct = function (product) {
                $http.put('adminApi/product/' + product._id, product);
                window.location = "#/control/products";
            }
        }])

    .controller('EditCreatedOrderController', ['$scope', '$http', 'editParticularObject',
        function ($scope, $http, editParticularObject) {
            $scope.order = editParticularObject.getObject();
            $scope.saveChangesInOrder = function (order) {
                $http.put('adminApi/order/' + order._id, order);
                window.location = "#/control/orders";
            }
        }])

    .controller('EditUserController', ['$scope', '$http', 'editParticularObject', function ($scope, $http, editParticularObject) {
        $scope.user = editParticularObject.getObject();
        $scope.saveChangesInUser = function (curUser) {
            $http.put('admin/', curUser);
            window.location = "#/control/users";
        }
    }])

    .controller('NewProductController', ['$scope', '$http', 'userInformation', function ($scope, $http, userInformation) {
        $scope.postNewProduct = function () {
            $scope.newProduct.userAlias = userInformation.getObject().userAlias;
            $http.post('adminApi/product', $scope.newProduct);
            window.location = "#/control/products";
        }
    }])

    .controller('NewUserController', function ($scope, $http) {
        $scope.postUser = function () {
            $http.post('admin', $scope.newUser);
            window.location = "#/control/users";
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
            window.location = "#/control/orders/edit";
        }

        $scope.adminDeleteOrder = function (order) {
            $http.delete('adminApi/order/' + order._id, order);
            var index = $scope.orders.indexOf(order);
            $scope.orders.splice(index, 1);
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
                if (status == 401) {
                    $scope.error = "You are not authenticated to request these data";
                    return;
                }
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
                if (status == 401) {
                    $scope.error = "You are not authenticated to request these data";
                    return;
                }
                $scope.error = data;
            });
    }])

    .controller('UserDetailsController', ['$scope', '$http', '$location', 'editParticularObject',
        function ($scope, $http, $location, editParticularObject) {
            $scope.user = editParticularObject.getObject();
        }]);

