'use strict';

angular.module('myAppRename.viewCustomer', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/customerHome', {
            templateUrl: 'app/viewCustomer/customerHome.html',
            controller: 'CustomerController'
        })
            //Personal User
            .when('/profile', {
                templateUrl: 'app/viewCustomer/customerProfile.html',
                controller: 'AccountController'
            })
            .when('/profile/edit', {
                templateUrl: 'app/viewCustomer/editProfile.html',
                controller: 'EditAccountController'
            })
            //Basket(array) SHOW(1),SHOW(ALL),ADD,EDIT,REMOVE
            //Orders - PUSH
            .when('/basket', {
                templateUrl: 'app/viewCustomer/basket.html',
                controller: 'BasketController'
            })
            .when('/basket/edit', {
                templateUrl: 'app/viewCustomer/editBasket.html',
                controller: 'EditBasketController'
            })
            //Products - GET(1),GET(ALL)
            .when('/products', {
                templateUrl: 'app/viewCustomer/products.html',
                controller: 'UserProductController'
            })
            .when('/products/:id', {
                templateUrl: 'app/viewCustomer/currentProduct.html',
                controller: 'currentProductControllerUser'
            })
             .when('/myOrders', {
            templateUrl: 'app/viewCustomer/myOrders.html',
            controller: 'UserAliasOrdersControllerUser'
            })
            .when('/editOrder', {
            templateUrl: 'app/viewCustomer/editOrder.html',
             controller: 'UserAliasOrdersControllerChangeQuantity'
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

    .controller('BasketController', ['$scope', '$http', 'BasketArrayFactory', 'editParticularObject', 'userInformation',
        function ($scope, $http, BasketArrayFactory, editParticularObject, userInformation) {
            $scope.alert = null;
            $scope.currentOrders = BasketArrayFactory.getInfo();
            $scope.editOrder = function (order) {
                editParticularObject.setObject(order);
                $scope.alert = "Redirecting to edit item in basket of product : " + order.productName;
                window.setTimeout(
                    function () {
                        $scope.alert = null;
                        window.location = "#/basket/edit";
                    }, 3000);
            };

            $scope.deleteOrder = function (order) {
                $scope.alert = "Deleted item in basket of product : " + order.productName;
                BasketArrayFactory.deleteFromList(order);
            };

            $scope.postOrders = function () {
                if ($scope.currentOrders.length > 0) {
                    var toBePushed = new Array();
                    for (var i = 0; i < $scope.currentOrders.length; i++) {
                        var objectToBePushed = {
                            productID: $scope.currentOrders[i].productID,
                            quantity: $scope.currentOrders[i].productAmount,
                            userAlias: userInformation.getObject().userAlias
                        };
                        $scope.success = 'You successfully made ' + toBePushed.length + ' order(s).';
                        window.setTimeout(
                            function () {
                                $http.post('userApi/order', objectToBePushed);
                                objectToBePushed = {}
                                BasketArrayFactory.clearList();
                                window.location = "#/customerHome";
                            }, 3000);

                    }
                } else {
                    $scope.alert = 'Nothing to save';
                }
            }
        }])

    .controller('EditBasketController', ['$scope', '$http', 'BasketArrayFactory', 'editParticularObject',
        function ($scope, $http, BasketArrayFactory, editParticularObject) {
            var allOrders = BasketArrayFactory.getInfo();
            $scope.orderToEdit = editParticularObject.getObject();
            var amountBeforeEdit = editParticularObject.getObject().productAmount;
            $scope.editBasket = function (quantity) {
                if (!isNaN(quantity) && quantity >= 1 && quantity <= 6) {
                    var unitPrice = (editParticularObject.getObject().productPrice / amountBeforeEdit);
                    for (var i = 0; i < allOrders.length; i++) {

                        if (allOrders[i].productID === $scope.orderToEdit.productID) {
                            allOrders[i].productAmount = quantity;
                            allOrders[i].productPrice = quantity * unitPrice;
                            //console.log(unitPrice + "=" + editParticularObject.getObject().productPrice + "/"
                            //+ editParticularObject.getObject().productAmount);
                            //console.log(allOrders[i].productPrice + "=" + quantity + "*" + unitPrice);
                        }
                    }
                    $scope.success = 'You successfully made an update.';
                    window.setTimeout(
                        function () {
                            BasketArrayFactory.changeList(allOrders);
                            window.location = "#/basket";
                        }, 3000);

                } else {
                    $scope.error = 'You failed to write an actual number between 1 and 5. I think you are also failing in life.';
                }
            }

        }])

    .controller('UserProductController', ['$scope', '$http', 'BasketArrayFactory',
        function ($scope, $http, BasketArrayFactory) {

            $http({
                method: 'GET',
                url: 'userApi/product'
            }).
                success(function (data, status, headers, config) {
                    $scope.products = data;
                }).
                error(function (data, status, headers, config) {
                    if (status == 401) {
                        $scope.externalError = "Your swag level is below 9000, which should logically lead you to the conclusion that you are not good enough ... still!";
                        return;
                    }
                    $scope.error = data;
                });

            $scope.amount = 1;
            $scope.addProductToBasket = function (product, chosenAmount) {
                $scope.success = null;
                $scope.error = null;
                if (!isNaN(chosenAmount) && chosenAmount >= 1 && chosenAmount <= 6) {
                    var basketArray = BasketArrayFactory.getInfo();
                    var isExisting = false;
                    for (var i = 0; i < basketArray.length; i++) {
                        if (basketArray[i].productName == product.productName) {
                            isExisting = true;
                            $scope.error = "You already ordered this item.";
                        }
                    }
                    if (!isExisting) {
                        var productToBasket = {
                            productID: product._id,
                            productName: product.productName,
                            productAmount: chosenAmount,
                            productPrice: chosenAmount * product.unitPrice
                        };
                        BasketArrayFactory.setInfo(productToBasket);
                        $scope.success = 'You successfully ordered ' + productToBasket.productAmount + "x " + productToBasket.productName;
                        //window.location = "#/basket";
                    }
                } else {
                    $scope.error = 'You failed to write an actual number between 1 and 5. I think you are also failing in life.';
                }
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

    .controller('UserAliasOrdersControllerUser', ['$scope', '$http','userInformation', function ($scope, $http, userInformation) {
        $http({
            method: 'GET',
            url: 'userApi/order/' + userInformation.getObject().userAlias
        }).
            success(function (data, status, headers, config) {
                $scope.ordersForSpecificUser = data;
            }).
            error(function (data, status, headers, config) {
                $scope.error = data;
            });

        $scope.userDeleteOrder = function (order) {
            $http.delete('userApi/order/' + order._id, order);
            var index = $scope.ordersForSpecificUser.indexOf(order);
            $scope.ordersForSpecificUser.splice(index, 1);
        }

        $scope.saveChangesInOrderForCustomerQuantity = function (order) {
            userInformation.setObject(order);
            window.location = "#/editOrder";
        }

    }])



    .controller('UserAliasOrdersControllerChangeQuantity', ['$scope', '$http', 'userInformation',
        function ($scope, $http, userInformation) {
            $scope.order = userInformation.getObject();
            $scope.saveChangesInOrderForCustomerQuantity = function (order) {
                $http.put('userApi/order/' + order._id, order);
                window.location = "#/myOrders";
            }
        }])


    .controller('AccountController', ['$scope', '$http', '$window', '$location', 'userInformation',
        function ($scope, $http, $window, $location, userInformation) {
            var curUser = userInformation.getObject();
            $scope.account = curUser;
            $scope.deleteClientUser = function () {
                $http.delete('admin/' + curUser.username);
                $scope.isAuthenticated = false;
                $scope.isAdmin = false;
                $scope.isUser = false;
                delete $window.sessionStorage.token;
                $location.path("#/viewHome");
            }
        }])

    .controller('EditAccountController', ['$scope', '$http', 'userInformation', function ($scope, $http, userInformation) {
        $scope.user = userInformation.getObject();
        $scope.saveChangesInUser = function (curUser) {
            if (curUser.fname && curUser.lname && curUser.adress) {
                $scope.success = 'You successfully made an update';
                window.setTimeout(
                    function () {
                        $http.put('admin/', curUser);
                        window.location = "#/profile";
                    }, 3000);
            } else {
                $scope.error = 'You have null values';
            }
        }
    }]);