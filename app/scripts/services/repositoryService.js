'use strict';
angular.module('finLiteApp').service('repositoryService', ['$http', 'ajaxService', function ($http, ajaxService) {

  var getAccounts = function(successFun) {
    ajaxService.doGetWithBlock('accounts').then(successFun);
  };

  var addAccount = function(item, successFunc) {
    ajaxService.doPostWithBlock('addAccount', item).then(successFunc);
  };

  var deleteAccount = function(ident, successFunc) {
    debugger;
    ajaxService.doPostWithBlock('deleteAccount', {id: ident}).then(successFunc);
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
