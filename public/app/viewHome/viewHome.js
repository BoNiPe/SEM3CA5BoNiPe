'use strict';

angular.module('myAppRename.viewHome', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/viewHome', {
            templateUrl: 'app/viewHome/viewHome.html'
        })
            .when('/registration', {
                templateUrl: 'app/viewHome/register.html',
                controller: 'RegistrationController'
            });
    }])

    .controller('View1Ctrl', function () {
    })

    .controller('RegistrationController', function ($scope, $http) {
        $scope.postUser = function () {
            if ($scope.newUser) {
                $scope.success = 'You successfully made an account, now you can log in! :)';
                window.setTimeout(
                    function () {
                        $http.post('admin', $scope.newUser);
                        window.location = "#/viewHome";
                    }, 3000);
            } else {
                $scope.error = 'Mistake in login form - null fields,'
            }
        }
    });