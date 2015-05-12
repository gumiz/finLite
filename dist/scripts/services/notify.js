'use strict';
angular.module('finLiteApp').service('notify', ['growl', function (growl) {
  var info = function (message) {
    growl.info(message, {title: "FinLite informuje"});
  };

  var error = function (message) {
    growl.error(message, {title: "Błąd!"});
  };
  return {
    info: info,
    error: error
  }
}]);
