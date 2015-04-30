'use strict';

angular.module('finLiteApp').controller('DocumentsCtrl', ['$scope', 'repositoryService', 'dialogService', 'notify', 'datepickerService', 'dateUtils', function ($scope, repositoryService, dialogService, notify, datepickerService, dateUtils) {
  $scope.newDocument = {};
  var gotDocuments = function(documents){
    $scope.documents = documents;
    notify.info('odświeżono dane');
  };
  var refresh = function() {
    repositoryService.getDocuments(gotDocuments);
  };
  $scope.refresh = refresh;

  $scope.addDocument = function() {
    setAutoNumber();
    fixPrice();
    $scope.newDocument.date = dateUtils.dateToString($scope.newDocument.date);
    repositoryService.addDocument($scope.newDocument, refresh);
  };

  var deleteAccount = function(id){
    return function() {return repositoryService.deleteDocument(id, refresh)};
  };

  $scope.deleteDocument = function(id) {
    dialogService.confirmation('Czy na pewno chcesz usunąć dokument?', deleteAccount(id));
  };

  var gotAccounts = function(items){
    $scope.accounts = items;
  };
  repositoryService.getAccounts(gotAccounts);
  $scope.datepicker = datepickerService.initDatePicker($scope.newDocument.date);
  refresh();

  function setAutoNumber() {
    var maxNumber = _.max($scope.documents, function(item){
      var result =  isNaN(item.autoNumber) ? 0 : item.autoNumber;
      return result;
    });
    $scope.newDocument.autoNumber = Number(maxNumber.autoNumber) + 1;
  }

  function fixPrice() {
    $scope.newDocument.price = $scope.newDocument.price.replace(',', '.');
  }

}]);
