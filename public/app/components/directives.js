'use strict';

/* Directives */

angular.module('myAppRename.directives', [])

    .directive('angularLinks', function () {
        return {
            restrict: 'AE',
            replace: 'true',
            template: '<ul style="list-style-type: none">' +
            '<li><a href="http://www.sitepoint.com/practical-guide-angularjs-directives/">A practical Guide</a></li>' +
            '<li><a href="http://weblogs.asp.net/dwahlin/creating-custom-angularjs-directives-part-i-the-fundamentals">Creating Custom Directives</a></li>' +
            '</ul>'
        };


    })

    .directive("boyko", function () {
        return {
            restrict: "EA",
            template: '***Testing Directives and Some SWAG FROM Boyko!***<br/>' +
        '<iframe width="560" height="315" src="//www.youtube.com/embed/zF5Ht7dwT3s" frameborder="0" allowfullscreen></iframe>'
        }
    });