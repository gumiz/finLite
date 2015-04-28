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
    'angular-growl'
  ])
  .config(['$routeProvider', 'growlProvider', function ($routeProvider, growlProvider) {
    growlProvider.globalTimeToLive(5000);
    $routeProvider
      .when('/documents', {
        templateUrl: 'views/documents.html',
        controller: 'DocumentsCtrl'
      })
      .when('/accounts', {
        templateUrl: 'views/accounts.html',
        controller: 'AccountsCtrl'
      })
      .when('/reports', {
        templateUrl: 'views/reports.html',
        controller: 'ReportsCtrl'
      })
      .otherwise({
        redirectTo: '/accounts'
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
  }]);
