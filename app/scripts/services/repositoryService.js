'use strict';
angular.module('finLiteApp').service('repositoryService', ['$http', 'ajaxService', function ($http, ajaxService) {

  var getAccounts = function(successFun) {
    ajaxService.doGetWithBlock('accounts').then(successFun);
  };

  var addAccount = function(item, successFunc) {
    debugger;
    ajaxService.doPostWithBlock('addAccount', item).then(successFunc);
  };

  function init(success) {
  };

  return {
    addAccount: addAccount,
    getAccounts: getAccounts,
    init: init
  }
}]);
