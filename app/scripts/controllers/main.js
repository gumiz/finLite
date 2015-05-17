'use strict';

angular.module('finLiteApp').controller('MainCtrl', ['$scope', '$location', 'repositoryService', function ($scope, $location, repositoryService) {
    $scope.getClass = function(path) {
      if ($location.path().substr(0, path.length) == path) {
        return "active"
      } else {
        return ""
      }
    };
    repositoryService.getClient(function(data){
      $scope.client = data;
    });
  }]);
