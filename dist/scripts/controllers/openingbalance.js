'use strict';

angular.module('finLiteApp')
  .controller('OpeningBalanceCtrl', ['$scope', 'repositoryService', 'dialogService', function ($scope, repositoryService, dialogService) {

    //repositoryService.getAccounts( function(data){
    //  $scope.openings = data;
    //});

    repositoryService.getOpenings( function(data){
      debugger;
      $scope.openings = data;
    });

    $scope.saveOpenings = function() {
      repositoryService.saveOpenings($scope.openings, confirmSaved);
    };

    var confirmSaved = function() {
      dialogService.showMessage("Zapisano bilans otwarcia");
    }
  }]);
