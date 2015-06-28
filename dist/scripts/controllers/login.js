'use strict';
angular.module('finLiteApp').controller('LoginCtrl', ['$scope', 'repositoryService', function ($scope, repositoryService) {

  $scope.clientId = 2;

  repositoryService.getClients(function(items){
    $scope.clients = items
  });

}]);
