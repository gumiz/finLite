'use strict';
angular.module('finLiteApp').controller('LoginCtrl', ['$scope', 'repositoryService', function ($scope, repositoryService) {

  $scope.user = {name: "", pass: ""};
  repositoryService.getClients(function(items){
    $scope.clients = items
  });

}]);
