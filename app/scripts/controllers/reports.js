'use strict';
angular.module('finLiteApp').controller('ReportsCtrl', ['$scope', 'repositoryService', 'dialogService', function ($scope, repositoryService, dialogService) {

  var gotReports = function(reports){
    $scope.reports = reports;
  };
  repositoryService.getReports(gotReports);
}]);
