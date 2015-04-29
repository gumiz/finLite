'use strict';
angular.module('finLiteApp').controller('AccountsCtrl', ['$scope', 'repositoryService', 'dialogService', 'notify', function ($scope, repositoryService, dialogService, notify) {

  var gotAccounts = function(accounts){
    $scope.accounts = accounts;
    notify.info('odświeżono dane');
  };
  var refresh = function() {
    repositoryService.getAccount(gotAccounts);
  };
  $scope.refresh = refresh;

  $scope.addAccount = function() {
    repositoryService.addAccount($scope.newAccount, refresh);
  };

  var deleteAccount = function(id){
    return function() {return repositoryService.deleteAccount(id, refresh)};
  };

  $scope.deleteAccount = function(id) {
    dialogService.confirmation('Czy na pewno chcesz usunąć to konto?', deleteAccount(id));
  };

  refresh();
}]);
