'use strict';

describe('Controller: OpeningbalanceCtrl', function () {

  // load the controller's module
  beforeEach(module('finLiteApp'));

  var OpeningbalanceCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OpeningbalanceCtrl = $controller('OpeningbalanceCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
