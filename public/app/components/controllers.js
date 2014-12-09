angular.module('myAppRename.controllers', [])
    .controller('AppCtrl', ['$scope', '$http', '$window', '$location', 'userInformation', function ($scope, $http, $window, $location, userInformation) {

        //This method is not doing anything ( I triple checked it with console.logs... Whatever goes in comes out.. Exactly the same..LOL?
        function url_base64_decode(str) {
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

        $scope.title = "BoNiPe Store";
        $scope.username = "";
        $scope.isAuthenticated = false;
        $scope.isAdmin = false;
        $scope.isUser = false;
        $scope.message = '';
        $scope.error = null;

        $scope.register = function () {
            window.location = "#/registration";
        };

        $scope.submit = function () {
            $http.post('/authenticate', $scope.user)
                .success(function (data, status, headers, config) {
                    $window.sessionStorage.token = data.token;
                    $scope.isAuthenticated = true;
                    var encodedProfile = data.token.split('.')[1];
                    var profile = JSON.parse(url_base64_decode(encodedProfile));
                    $scope.username = profile.userAlias;
                    $scope.isAdmin = profile.role == "admin";
                    console.log('/authenticate SUCCESS : ' + profile.username + ' as ' + profile.role);
                    $scope.isUser = !$scope.isAdmin;
                    $scope.error = null;
                    userInformation.setObject(profile);
                    if (profile.role == "admin") {
                        window.location = "#/adminHome";
                    } else {
                        window.location = "#/customerHome";
                    }
                })
                .error(function (data, status, headers, config) {
                    // Erase the token if the user fails to log in
                    delete $window.sessionStorage.token;
                    $scope.isAuthenticated = false;
                    $scope.error = 'You failed to login. Invalid User or Password';
                });
        };

        function init() {
            if ($window.sessionStorage.token) {
                $scope.isAuthenticated = true;
                var encodedProfile = sessionStorage.token.split('.')[1];
                var profile = JSON.parse(url_base64_decode(encodedProfile));
                $scope.username = profile.userAlias;
                $scope.isAdmin = profile.role == "admin";
                console.log('/authenticate SUCCESS : ' + profile.username + ' as ' + profile.role);
                $scope.isUser = !$scope.isAdmin;
                $scope.error = null;
                userInformation.setObject(profile);
            }
        }

        init();

        $scope.logout = function () {
            $scope.isAuthenticated = false;
            $scope.isAdmin = false;
            $scope.isUser = false;
            delete $window.sessionStorage.token;
            $location.path("#/viewHome");
        }
    }]);