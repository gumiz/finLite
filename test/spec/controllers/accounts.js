'use strict';

describe('Controller: AccountsctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('finLiteApp'));

  var AccountsctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AccountsctrlCtrl = $controller('AccountsctrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
