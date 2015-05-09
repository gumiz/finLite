'use strict';
angular.module('finLiteApp').controller('LoginCtrl', ['$scope', 'ajaxService', 'notify', function ($scope, ajaxService, notify) {
    $scope.user = {name: "", pass: ""};

  //$scope.login = function() {
  //  debugger;
  //    var params = {username: $scope.user.name, password: $scope.user.pass};
  //    ajaxService.doPost('login', params);
  //  };
}]);
