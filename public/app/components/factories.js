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

    .factory('ProductInfoSaver', function () {
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
      return {
        setInfo: setUser,
        getInfo: getInfo,
        changeList : changeList,
        deleteFromList : deleteFromList
      }
    })

    .factory('editParticularProduct', function () {
      var curProduct;
      var getProduct = function() {
        return curProduct;
      }
      var setProduct = function(product) {
        curProduct = product
      }
      return {
        setProduct: setProduct,
        getProduct: getProduct
      }
    })

    .factory('editParticularOrder', function () {
      var curOrder;
      var getOrder = function() {
        return curOrder;
      }
      var setOrder = function(order) {
        curOrder = order
      }
      return {
        setInfo: setOrder,
        getInfo: getOrder
      }
    });