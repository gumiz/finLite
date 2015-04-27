'use strict';
angular.module('finLiteApp').controller('AccountsCtrl', ['$scope', 'repositoryService', function ($scope, repositoryService) {

  var gotAccounts = function(accounts){
    $scope.accounts = accounts;
    //$scope.$apply();
  };
  var refresh = function() {
    repositoryService.getAccounts(gotAccounts);
  };
  $scope.refresh = refresh;

  $scope.addAccount = function() {
    debugger;
    repositoryService.addAccount($scope.newAccount, refresh);
  };

  refresh();
}]);
