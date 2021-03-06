'use strict';
angular.module('finLiteApp').service('repositoryService', ['$http', 'ajaxService', function ($http, ajaxService) {

  var getIdFromUrl = function () {
    var elems = window.location.href.split("/");
    return elems[elems.length - 1];
  };

  var saveOpenings = function(item, successFunc) {
    ajaxService.doPostWithBlock('saveOpenings', item).then(successFunc);
  };

  var getOpenings = function(successFunc) {
    ajaxService.doGet('getOpenings').then(successFunc);
  };

  var getAccounts = function(successFun) {
    ajaxService.doGet('getAccounts').then(successFun);
  };

  var addAccount = function(item, successFunc) {
    ajaxService.doPostWithBlock('addAccounts', item).then(successFunc);
  };

  var deleteAccount = function(ident, successFunc) {
    ajaxService.doPostWithBlock('deleteAccounts', {id: ident}).then(successFunc);
  };

  var getDocuments = function(successFun) {
    ajaxService.doGet('getDocuments').then(successFun);
  };

  var addDocument = function(item, successFunc) {
    ajaxService.doPostWithBlock('addDocuments', item).then(successFunc);
  };

  var deleteDocument = function(ident, successFunc) {
    ajaxService.doPostWithBlock('deleteDocuments', {id: ident}).then(successFunc);
  };

  var getReports = function(successFunc) {
    ajaxService.doGetWithBlock('getReports').then(successFunc);
  };

  var getClients = function(successFunc) {
    ajaxService.doGetWithBlock('getClients').then(successFunc);
  };

  var getClient = function(successFunc) {
    ajaxService.doGet('getClient').then(successFunc);
  };

  return {
    saveOpenings: saveOpenings,
    getOpenings: getOpenings,
    getClient: getClient,
    getIdFromUrl: getIdFromUrl,
    addAccount: addAccount,
    deleteAccount: deleteAccount,
    getAccounts: getAccounts,
    addDocument: addDocument,
    deleteDocument: deleteDocument,
    getDocuments: getDocuments,
    getReports: getReports,
    getClients: getClients
  }
}]);
