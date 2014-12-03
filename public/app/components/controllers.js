angular.module('myAppRename.controllers', []).
    controller('AppCtrl', function ($scope, $http, $window, $location) {

        function url_base64_decode(str) {
            console.log('Hello from url_base_64_decode with: ' + str);
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
        }


        $scope.title = "Semester Project";
        $scope.username = "";
        $scope.isAuthenticated = false;
        $scope.isAdmin = false;
        $scope.isUser = false;
        $scope.message = '';
        $scope.error = null;

        $scope.submit = function () {
            $http
                .post('/authenticate', $scope.user)
                .success(function (data, status, headers, config) {
                    console.log('The data when /authenticate successes is ' + data);
                    $window.sessionStorage.token = data.token;
                    $scope.isAuthenticated = true;
                    var encodedProfile = data.token.split('.')[1];
                    var profile = JSON.parse(url_base64_decode(encodedProfile));
                    $scope.username = profile.username;
                    console.log('Username (taken from Profile, parsed from base64.. via json parse) :' + $scope.username);
                    $scope.isAdmin = profile.role == "admin";
                    console.log('isAdmin variable becomes: ' + $scope.isAdmin);
                    $scope.isUser = !$scope.isAdmin;
                    $scope.error = null;
                })
                .error(function (data, status, headers, config) {
                    // Erase the token if the user fails to log in
                    delete $window.sessionStorage.token;
                    $scope.isAuthenticated = false;

                    $scope.error = 'You failed to login. Invalid User or Password';
                });
        };

        $scope.logout = function () {
            $scope.isAuthenticated = false;
            $scope.isAdmin = false;
            $scope.isUser = false;
            delete $window.sessionStorage.token;
            $location.path("/view1");
        }
    })

    .controller('MyCtrl2', function ($scope) {
        // write MyCtrl2 here
    })

    .controller('ProductsController', ['$scope', '$http', 'ProductInfoSaver', function ($scope, $http, ProductInfoSaver) {

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

        $scope.saveProduct = function (productName, productAmount){
            $scope.productToBasket = {productName: productName,
            productAmount: productAmount};
            console.log('hello: '+$scope.productToBasket.productName + ' and amount ' + $scope.productToBasket.productAmount);
            //ProductInfoSaver.setInfo(chosenProduct);
        }
    }])

    .controller('OrdersController', function ($scope, $http) {
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
    })

    .controller('OrderDetailsController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
        $http({
            method: 'GET',
            url: 'adminApi/order/' + $location.path().split("/")[2]
        }).
            success(function (data, status, headers, config) {
                $scope.orderInformation = data;
            }).
            error(function (data, status, headers, config) {
                $scope.error = data;
            });
    }])

    .controller('OrderProductController', ['$scope', '$http', 'ProductInfoSaver', function ($scope, $http, ProductInfoSaver) {
        console.log(ProductInfoSaver.getInfo());
        $scope.chosenProduct = ProductInfoSaver.getInfo();
        $scope.newOrder = {};

        $scope.postWiki = function () {
            console.log(JSON.stringify($scope.newOrder));
            var postWiki = $scope.newOrder;
            $http({
                method: 'POST',
                url: 'api/product',
                data: postWiki
            }).
                success(function (data, status, headers, config) {
                    $scope.users = data;
                }).
                error(function (data, status, headers, config) {
                    $scope.error = data;
                });
        }
    }])

    .controller('PaymentsController', function ($scope, $http) {
        $http({
            method: 'GET',
            url: 'adminApi/payment'
        }).
            success(function (data, status, headers, config) {
                $scope.payments = data;
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