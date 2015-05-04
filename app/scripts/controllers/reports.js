'use strict';
angular.module('finLiteApp').controller('ReportsCtrl', ['$scope', 'repositoryService', 'dialogService', function ($scope, repositoryService, dialogService) {

  repositoryService.getReports(function(reports){
    $scope.reports = reports;
  });

}]);
