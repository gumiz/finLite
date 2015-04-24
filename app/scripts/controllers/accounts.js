'use strict';
angular.module('finLiteApp').controller('AccountsCtrl', ['$scope', 'repositoryService', function ($scope, repositoryService) {

  var gotAccounts = function(accounts){
    $scope.accounts = accounts;
    $scope.$apply();
  };
  var refresh = function() {
    repositoryService.getAccounts(gotAccounts);
  };

  repositoryService.init(refresh);

  $scope.addAccount = function() {
    repositoryService.addAccount($scope.newAccount, refresh);
  };


}]);
