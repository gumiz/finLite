'use strict';
angular.module('finLiteApp').controller('ReportsCtrl', ['$scope', 'repositoryService', function ($scope, repositoryService) {

  var gotAccounts = function(accounts){
    $scope.accounts = accounts;
  };
  repositoryService.getAccounts(gotAccounts);

}]);
