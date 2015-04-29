'use strict';
angular.module('finLiteApp').service('repositoryService', ['$http', 'ajaxService', function ($http, ajaxService) {

  var getAccount = function(successFun) {
    ajaxService.doGetWithBlock('getAccounts').then(successFun);
  };

  var addAccount = function(item, successFunc) {
    ajaxService.doPostWithBlock('addAccounts', item).then(successFunc);
  };

  var deleteAccount = function(ident, successFunc) {
    ajaxService.doPostWithBlock('deleteAccounts', {id: ident}).then(successFunc);
  };

  var getDocument = function(successFun) {
    ajaxService.doGetWithBlock('getDocuments').then(successFun);
  };

  var addDocument = function(item, successFunc) {
    ajaxService.doPostWithBlock('addDocuments', item).then(successFunc);
  };

  var deleteDocument = function(ident, successFunc) {
    ajaxService.doPostWithBlock('deleteDocuments', {id: ident}).then(successFunc);
  };

  return {
    addAccount: addAccount,
    deleteAccount: deleteAccount,
    getAccount: getAccount,
    addDocument: addDocument,
    deleteDocument: deleteDocument,
    getDocument: getDocument
  }
}]);
