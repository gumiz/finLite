'use strict';

/**
 * @ngdoc function
 * @name finliteApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the finliteApp
 */
angular.module('finliteApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
