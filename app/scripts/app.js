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
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    growlProvider.globalTimeToLive(5000);
  }]);
