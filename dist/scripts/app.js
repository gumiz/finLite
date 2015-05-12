'use strict';

angular
  .module('finLiteApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngDialog',
    'angular-growl',
    'ui.bootstrap'
  ])
  .config(['$routeProvider', 'growlProvider', '$locationProvider', function ($routeProvider, growlProvider, $locationProvider) {
    growlProvider.globalTimeToLive(5000);
    $routeProvider
      .when('/finlite', {
        templateUrl: 'views/reports.html',
        controller: 'ReportsCtrl'
      })
      .when('/accounts', {
        templateUrl: 'views/accounts.html',
        controller: 'AccountsCtrl'
      })
      .when('/documents', {
        templateUrl: 'views/documents.html',
        controller: 'DocumentsCtrl'
      })
      .when('/reports', {
        templateUrl: 'views/reports.html',
        controller: 'ReportsCtrl'
      })
      .otherwise({
        templateUrl: 'views/reports.html',
        controller: 'ReportsCtrl'
      });
  }])
  .directive('autoActive', ['$location', function ($location) {
    return {
      restrict: 'A',
      scope: false,
      link: function (scope, element) {
        function setActive() {
          var path = $location.path();
          if (path) {
            angular.forEach(element.find('li'), function (li) {
              var anchor = li.querySelector('a');
              if (anchor.href.match('#' + path + '(?=\\?|$)')) {
                angular.element(li).addClass('active');
              } else {
                angular.element(li).removeClass('active');
              }
            });
          }
        }

        setActive();

        scope.$on('$locationChangeSuccess', setActive);
      }
    }
  }])
  .filter('total', function () {
    return function (input, property) {
      var i = input instanceof Array ? input.length : 0;
      if (typeof property === 'undefined' || i === 0) {
        return i;
      } else if (isNaN(input[0][property])) {
        throw 'filter total can count only numeric values';
      } else {
        var total = 0;
        while (i--)
          total += Number(input[i][property]);
        return total;
      }
    };
  });
