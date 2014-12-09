'use strict';

/* Factories */

angular.module('myAppRename.factories', []).
  factory('InfoFactory', function () {
    var info = "Hello World from a Factory";
    var getInfo = function getInfo(){
      return info;
    }
    return {
      getInfo: getInfo
    }
  })
  .factory('authInterceptor', function ($rootScope, $q, $window) {
    return {
      request: function (config) {
        config.headers = config.headers || {};
        if ($window.sessionStorage.token) {
          config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
        }
        return config;
      },
      responseError: function (rejection) {
        if (rejection.status === 401) {
          // handle the case where the user is not authenticated
        }
        return $q.reject(rejection);
      }
    };
  })

    .factory('BasketArrayFactory', function () {
      var info = new Array();
      var getInfo = function getInfo() {
        return info;
      }
      var setUser = function(newProduct) {
        info.push(newProduct);
      }
      var changeList = function(newList) {
        info = newList;
      }
      var deleteFromList = function(deleteOrder){
        var index = info.indexOf(deleteOrder);
        info.splice(index,1);
      }
      var clearList = function(){
        info = new Array();
      }
      return {
        setInfo: setUser,
        getInfo: getInfo,
        changeList : changeList,
        deleteFromList : deleteFromList,
        clearList : clearList
      }
    })

    .factory('editParticularObject', function () {
      var curObject;
      var getObject = function() {
        return curObject;
      }
      var setObject = function(newObject) {
        curObject = newObject
      }
      return {
        setObject: setObject,
        getObject: getObject
      }
    })

    .factory('userInformation', function () {
      var curObject;
      var getObject = function() {
        return curObject;
      }
      var setObject = function(newObject) {
        curObject = newObject
      }
      return {
        setObject: setObject,
        getObject: getObject
      }
    });