'use strict';

angular.module('finLiteApp').controller('DocumentsCtrl', ['$scope', 'repositoryService', 'dialogService', 'notify', function ($scope, repositoryService, dialogService, notify) {
  var gotDocuments = function(documents){
    $scope.documents = documents;
    notify.info('odświeżono dane');
  };
  var refresh = function() {
    repositoryService.getDocument(gotDocuments);
  };
  $scope.refresh = refresh;

  $scope.addDocument = function() {
    repositoryService.addDocument($scope.newDocument, refresh);
  };

  var deleteAccount = function(id){
    return function() {return repositoryService.deleteDocument(id, refresh)};
  };

  $scope.deleteDocument = function(id) {
    dialogService.confirmation('Czy na pewno chcesz usunąć dokument?', deleteAccount(id));
  };

  refresh();
}]);
