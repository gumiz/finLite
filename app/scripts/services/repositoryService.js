'use strict';
angular.module('finLiteApp').service('repositoryService', ['$http', 'ajaxService', function ($http, ajaxService) {

  var getAccounts = function(successFun) {
    debugger;
    ajaxService.doGetWithBlock('getAccounts').then(successFun);
  };

  var addAccount = function(item, successFunc) {
    debugger;
    ajaxService.doPostWithBlock('addAccounts', item).then(successFunc);
  };

  var deleteAccount = function(ident, successFunc) {
    debugger;
    ajaxService.doPostWithBlock('deleteAccounts', {id: ident}).then(successFunc);
  };

  function init(success) {
  };

  return {
    addAccount: addAccount,
    deleteAccount: deleteAccount,
    getAccounts: getAccounts,
    init: init
  }
}]);
